/* ---------- 온보딩 — 회원가입 → LMS 연결 → 과목 스캔 → 자동 임포트 ----------
   해시가 없거나 #onboarding이면 자동으로 열린다 (첫 방문 컨셉).
   #onboarding-0 ~ #onboarding-5 로 특정 스텝에 바로 진입할 수 있다 (검증·공유용).
   임포트 "결과"는 03-data.js·11-projects.js에 이미 상수로 들어 있으므로,
   이 파일은 그 상태에 도달하는 과정을 연출하는 역할만 한다. */

const OB_LMS=[
 {id:'etl',name:'eTL',org:'서울대학교',mark:'eTL',bg:'#1C4587',mode:'sso',
  desc:'mySNU 통합 로그인으로 연결',domain:'etl.snu.ac.kr'},
 {id:'canvas',name:'Canvas',org:'Instructure',mark:'C',bg:'#E72429',mode:'token',
  desc:'학교 주소와 액세스 토큰으로 연결',domain:'university.instructure.com',
  hint:'토큰은 Canvas 설정 → 승인된 통합 → "새 액세스 토큰"에서 발급받을 수 있어요.'},
 {id:'moodle',name:'Moodle',org:'오픈소스 LMS',mark:'m',bg:'#F98012',mode:'token',
  desc:'학교 주소와 보안 키로 연결',domain:'moodle.university.ac.kr',
  hint:'보안 키는 Moodle 환경설정 → 보안 키 페이지에서 확인할 수 있어요.'},
 {id:'blackboard',name:'Blackboard',org:'Anthology',mark:'Bb',bg:'#1F1F1D',mode:'token',
  desc:'학교 주소와 앱 토큰으로 연결',domain:'university.blackboard.com',
  hint:'토큰은 Blackboard 도구 → 애플리케이션 인증에서 발급받을 수 있어요.'},
 {id:'brightspace',name:'Brightspace',org:'D2L',mark:'D2L',bg:'#E87511',mode:'token',
  desc:'학교 주소와 액세스 토큰으로 연결',domain:'university.brightspace.com',
  hint:'토큰은 계정 설정 → API 액세스에서 발급받을 수 있어요.'},
];

/* 스캔 결과 — pj는 11-projects.js의 프로젝트와, name은 드라이브 폴더와 1:1 대응 */
const OB_COURSES=[
 {pj:'p1',name:'일반물리학',prof:'박정호 교수',files:24,parts:'강의자료 14 · 과제 5 · 공지 5'},
 {pj:'p2',name:'자료구조',prof:'김선영 교수',files:21,parts:'슬라이드 9 · 과제 6 · 공지 6'},
 {pj:'p3',name:'공학수학 2',prof:'이도윤 교수',files:18,parts:'강의노트 10 · 과제 4 · 해답 4'},
 {pj:'p4',name:'대학영어',prof:'Angela Park 교수',files:12,parts:'읽기 자료 6 · 과제 3 · 공지 3'},
 {pj:'p5',name:'심리학개론',prof:'유하은 교수',files:12,parts:'슬라이드 8 · 퀴즈 2 · 공지 2'},
];
const OB_PAST=[
 {name:'일반화학',prof:'2026년 1학기',files:31},
 {name:'컴퓨팅 기초',prof:'2026년 1학기',files:28},
 {name:'글쓰기의 기초',prof:'2026년 1학기',files:14},
];
const OB_LOGS={
 '일반물리학':['일반물리학/강의자료/06_포물선_운동.pdf','일반물리학/과제/HW3_문제지.pdf','일반물리학/공지/실험조_편성_안내.pdf','실라버스에서 마감일 3건 추출'],
 '자료구조':['자료구조/강의 슬라이드/03_재귀.pdf','자료구조/과제/HW1_연결_리스트_명세.pdf','자료구조/C_코딩_스타일_가이드.pdf','중복 파일 2개 건너뜀'],
 '공학수학 2':['공학수학 2/주차별 강의노트/1주차_라플라스_변환.pdf','공학수학 2/과제_1_문제지.pdf','공학수학 2/연습문제_해답집.pdf','주차별 폴더 구조 감지 — 그대로 유지'],
 '대학영어':['대학영어/읽기 자료/Unit_1_Habit.pdf','대학영어/에세이_1_과제_안내.docx','대학영어/발표_평가_루브릭.pdf','실라버스에서 마감일 2건 추출'],
 '심리학개론':['심리학개론/강의 슬라이드/1장_심리학의_본질.pptx','심리학개론/퀴즈_1_안내.pdf','심리학개론/용어_정리_핸드아웃.pdf','슬라이드 노트 텍스트 인덱싱'],
 '일반화학':['일반화학/강의자료_전체.zip 압축 해제','일반화학/기출/중간_2026-1.pdf','일반화학/실험/보고서_양식.docx'],
 '컴퓨팅 기초':['컴퓨팅 기초/실습/week3_loops.py','컴퓨팅 기초/강의 슬라이드/02_변수와_자료형.pdf','컴퓨팅 기초/과제/프로젝트_명세.pdf'],
 '글쓰기의 기초':['글쓰기의 기초/첨삭/에세이1_피드백.docx','글쓰기의 기초/강의자료/인용과_표절.pdf','글쓰기의 기초/최종_에세이_안내.pdf'],
};
const OB_STEP_LBL=['계정','시작 방법','과목 선택','가져오기'];
const OB_STEP_OF={0:0,1:1,2:1,3:2,4:3,5:3};

let obLms=OB_LMS[0];          /* 선택된 LMS (기본: 추천 eTL) */
let obSel=null;               /* 체크된 과목 — {cur:Set, past:Set} */
let obTimers=[];              /* 스텝 이탈 시 정리할 타이머/인터벌 취소 함수들 */
let obImported=null;          /* 마지막 임포트에 포함된 과목 목록 (완료 화면용) */

function obT(fn,ms){const id=setTimeout(fn,ms);obTimers.push(()=>clearTimeout(id));return id;}
function obI(fn,ms){const id=setInterval(fn,ms);obTimers.push(()=>clearInterval(id));return id;}
function obClear(){obTimers.forEach(c=>c());obTimers=[];}

function obLmsMark(l,size){
  return '<span class="ob-lmsmk" style="background:'+l.bg+';width:'+(size||38)+'px;height:'+(size||38)+'px">'+l.mark+'</span>';
}
function obSnu(){return /@snu\.ac\.kr\s*$/.test(($('#obEmail').value||'').trim());}

/* ---- 스텝 전환 ---- */
function obGo(n){
  obClear();
  const root=$('#obRoot');
  $$('.ob-pane',root).forEach(p=>{p.classList.toggle('on',+p.dataset.ob===n);if(+p.dataset.ob===n)p.scrollTop=0;});
  const cur=n===5?OB_STEP_LBL.length:OB_STEP_OF[n];  /* 완료 화면은 전 단계 done */
  $('#obSteps').innerHTML=OB_STEP_LBL.map((t,i)=>{
    const cls=i<cur?' done':(i===cur?' on':'');
    const inner=i<cur?'✓':(i+1);
    return '<span class="ob-step'+cls+'"><span class="n">'+inner+'</span>'+t+'</span>';
  }).join('');
  $('#obSkip').style.display=n<=3?'block':'none';
  if(n===1)obRenderLms();
  if(n===2)obRenderConn();
  if(n===3)obRenderCourses();
  if(n===4)obStartImport();
  if(n===5)obRenderDone();
  if(typeof renderNoteCtx==='function')renderNoteCtx();
}
function openOnboard(n){state.onboard=true;$('#obRoot').classList.add('on');obGo(n);}
function closeOnboard(dest,skipped){
  obClear();
  state.onboard=false;
  $('#obRoot').classList.remove('on');
  $('#obBanner').classList.toggle('on',!!skipped);
  if(!skipped){
    /* 방금 가져온 과목 폴더를 잠깐 하이라이트 */
    const names=OB_COURSES.map(c=>c.name);
    driveItems.forEach(d=>{if(d.type==='folder'&&names.includes(d.name))d.fresh=true;});
    obT(()=>{driveItems.forEach(d=>{delete d.fresh;});renderDrive();},2600);
  }
  go(dest||'drive');
}

/* ---- 1 · LMS 선택 ---- */
function obRenderLms(){
  const snu=obSnu();
  $('#obLmsHint').innerHTML=snu
    ?'<b>@snu.ac.kr</b> 계정을 확인했어요 — 서울대는 <b>eTL</b>을 써요. 대학생이라면 LMS 연결이 가장 빨라요: 수강 과목과 자료를 통째로 가져와 과목별 폴더와 전담 AI까지 만들어 드려요. 물론 <b>LMS 없이 시작해도</b> 돼요.'
    :'대학생이라면 학교 LMS 연결이 가장 빨라요 — 수강 과목과 자료를 통째로 가져와 과목별 폴더와 전담 AI까지 만들어 드려요. 대학생이 아니거나 LMS가 없다면 <b>아래에서 바로 시작</b>하세요.';
  $('#obLmsGrid').innerHTML=OB_LMS.map(l=>{
    const rec=snu&&l.id==='etl';
    return '<button class="ob-lmscard'+(rec?' rec':'')+'" data-lms="'+l.id+'">'
     +(rec?'<span class="ob-recbadge">내 학교 LMS</span>':'')
     +obLmsMark(l)+'<b>'+l.name+'</b><span class="d">'+l.org+' · '+l.desc+'</span></button>';
  }).join('');
  $$('#obLmsGrid .ob-lmscard').forEach(b=>b.addEventListener('click',()=>{
    obLms=OB_LMS.find(l=>l.id===b.dataset.lms)||OB_LMS[0];
    obGo(2);
  }));
}

/* ---- 2 · 연결 폼 (LMS별) ---- */
function obRenderConn(){
  const l=obLms;
  const head='<div class="ob-connh">'+obLmsMark(l,42)+'<div><b>'+l.name+' 연결</b><span class="sub">'+l.org+' · 읽기 전용으로 가져와요</span></div></div>';
  let body;
  if(l.mode==='sso'){
    body='<label class="ob-lb">mySNU 아이디</label><input class="ob-in" value="turing" spellcheck="false">'
     +'<label class="ob-lb">비밀번호</label><input class="ob-in" type="password" value="prototype-demo" readonly>'
     +'<div class="ob-help">mySNU 통합 로그인으로 eTL('+l.domain+')에 연결돼요. 로그인 정보는 가져오기에만 쓰고 저장하지 않아요.</div>';
  }else{
    body='<label class="ob-lb">학교 '+l.name+' 주소</label><input class="ob-in" value="'+l.domain+'" spellcheck="false">'
     +'<label class="ob-lb">액세스 토큰</label><input class="ob-in" value="lms_pat_9f2k…hq7" spellcheck="false">'
     +'<div class="ob-help">'+l.hint+' 토큰은 가져오기에만 쓰고 저장하지 않아요.</div>';
  }
  $('#obConnCard').innerHTML=head+body
   +'<button class="ob-cta" id="obConnGo" style="width:100%;margin-top:22px">연결하고 과목 불러오기</button>';
  $('#obConnGo').addEventListener('click',()=>{
    const b=$('#obConnGo');
    b.disabled=true;
    b.innerHTML='<span class="ob-spin"></span>'+l.name+'에서 과목을 스캔하는 중…';
    obT(()=>obGo(3),1200);
  });
}

/* ---- 3 · 과목 선택 ---- */
function obRenderCourses(){
  if(!obSel)obSel={cur:new Set(OB_COURSES.map((c,i)=>i)),past:new Set()};
  const row=(c,i,grp)=>{
    const on=obSel[grp].has(i);
    return '<button class="ob-crow'+(on?' on':'')+'" data-g="'+grp+'" data-i="'+i+'">'
     +'<span class="ob-ck">'+(on?SVG_CK12:'')+'</span>'
     +'<span><b>'+c.name+'</b><span class="sub">'+c.prof+(c.parts?' · '+c.parts:'')+'</span></span>'
     +'<span class="cnt">파일 '+c.files+'개</span></button>';
  };
  $('#obCoursePane').innerHTML=
   '<h2 class="ob-h2">2026년 2학기 과목 '+OB_COURSES.length+'개를 찾았어요</h2>'
   +'<p class="ob-p">체크한 과목만 가져와요. 과목마다 드라이브에 폴더가 만들어지고, 그 폴더를 관장하는 전담 프로젝트 AI가 붙어요.</p>'
   +'<div class="ob-clist">'+OB_COURSES.map((c,i)=>row(c,i,'cur')).join('')+'</div>'
   +'<div class="ob-sec">지난 학기 — 나중에 언제든 가져올 수 있어요</div>'
   +'<div class="ob-clist" style="margin-top:10px">'+OB_PAST.map((c,i)=>row(c,i,'past')).join('')+'</div>'
   +'<div class="ob-foot"><button class="ob-cta" id="obImportGo"></button><span class="note">가져온 뒤에도 과목은 추가·제거할 수 있어요</span></div>';
  const syncCta=()=>{
    const list=obSelectedCourses();
    const files=list.reduce((s,c)=>s+c.files,0);
    const b=$('#obImportGo');
    b.disabled=!list.length;
    b.textContent=list.length?('선택한 '+list.length+'개 과목 가져오기 — 파일 '+files+'개'):'과목을 선택해 주세요';
  };
  $$('#obCoursePane .ob-crow').forEach(r=>r.addEventListener('click',()=>{
    const g=r.dataset.g,i=+r.dataset.i;
    obSel[g].has(i)?obSel[g].delete(i):obSel[g].add(i);
    r.classList.toggle('on');
    r.querySelector('.ob-ck').innerHTML=obSel[g].has(i)?SVG_CK12:'';
    syncCta();
  }));
  $('#obImportGo').addEventListener('click',()=>obGo(4));
  syncCta();
}
function obSelectedCourses(){
  if(!obSel)obSel={cur:new Set(OB_COURSES.map((c,i)=>i)),past:new Set()};
  return OB_COURSES.filter((c,i)=>obSel.cur.has(i)).concat(OB_PAST.filter((c,i)=>obSel.past.has(i)));
}

/* ---- 4 · 임포트 연출 ---- */
function obStartImport(){
  const list=obSelectedCourses();
  obImported=list;
  const total=list.reduce((s,c)=>s+c.files,0);
  $('#obImportPane').innerHTML=
   '<h2 class="ob-h2">가져오는 중이에요 — 정리는 저희가 할게요</h2>'
   +'<p class="ob-p">'+obLms.name+'에서 파일을 가져와 과목별 폴더로 정리하고, 과목마다 전담 프로젝트 AI를 만들고 있어요. 실라버스에서 마감일과 평가 기준도 뽑아 둘게요.</p>'
   +'<div class="ob-ibar"><i id="obIBar"></i></div>'
   +'<div class="ob-isum"><span id="obISum">0 / '+total+'개 파일</span><span>'+obLms.name+' → AI 드라이브</span></div>'
   +'<div class="ob-irows">'+list.map((c,i)=>'<div class="ob-irow" id="obIRow'+i+'"><span class="ob-ifi">'+MINI_FOLDER+'</span><span class="nm">'+c.name+'</span><span class="st">대기 중</span></div>').join('')+'</div>'
   +'<div class="ob-ilog" id="obILog"></div>';
  const logs=[];
  const pushLog=(t,ok)=>{
    logs.push('<div'+(ok?' class="ok"':'')+'>'+t+'</div>');
    if(logs.length>6)logs.shift();
    $('#obILog').innerHTML=logs.join('');
  };
  let ci=0,done=0,fdone=0,logIdx=0;
  const startCourse=()=>{
    if(ci>=list.length){
      pushLog('프로젝트 AI '+list.length+'개 준비 완료 — 과목 채널이 열렸어요',true);
      obT(()=>obGo(5),900);
      return;
    }
    const i=ci++,c=list[i],row=$('#obIRow'+i),st=row.querySelector('.st');
    row.classList.add('doing');
    let got=0;
    const pool=OB_LOGS[c.name]||[];
    const iv=obI(()=>{
      got=Math.min(c.files,got+1+Math.floor(Math.random()*3));
      fdone=done+got;
      st.innerHTML='<span class="ob-dotspin"></span>가져오는 중 · '+got+'/'+c.files;
      $('#obIBar').style.width=(fdone/total*100)+'%';
      $('#obISum').textContent=fdone+' / '+total+'개 파일';
      if(Math.random()<.5&&pool.length)pushLog(pool[(logIdx++)%pool.length]+' ✓');
      if(got>=c.files){
        clearInterval(iv);
        done+=c.files;
        st.innerHTML='<span class="ob-dotspin"></span>폴더로 정리 중';
        obT(()=>{
          st.innerHTML='<span class="ob-dotspin"></span>'+c.name+' AI 생성 중';
          pushLog('"'+c.name+'" 폴더 정리 완료 → 프로젝트 AI 생성',true);
          obT(()=>{
            row.classList.remove('doing');row.classList.add('ok');
            st.innerHTML=SVG_CK12+'완료 · '+c.name+' AI';
            startCourse();
          },650);
        },550);
      }
    },95);
  };
  startCourse();
}

/* ---- 5 · 완료 ---- */
function obRenderDone(){
  const list=obImported||OB_COURSES;
  const files=list.reduce((s,c)=>s+c.files,0);
  const cards=list.map(c=>{
    const nav=c.pj?' data-nav="project-'+c.pj+'"':'';
    return '<button class="ob-pcard"'+nav+'><span class="hash">#</span><b>'+c.name+'</b><span class="ai">'+c.name+' AI</span></button>';
  }).join('');
  $('#obDonePane').innerHTML='<div class="ob-done">'
   +'<div class="ob-doneic"><svg width="30" height="30" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 10.5 4 4 8-8.5"/></svg></div>'
   +'<h2 class="ob-h2">준비가 끝났어요</h2>'
   +'<p class="ob-p" style="max-width:560px;margin:14px auto 0">'+obLms.name+'의 파일 '+files+'개를 과목별 폴더로 정리하고, 과목마다 전담 프로젝트 AI를 만들었어요.<br>이제 채널에서 시키기만 하면 돼요.</p>'
   +'<div class="ob-stats">'
   +'<div class="ob-stat"><b>'+list.length+'</b><span>과목 폴더</span></div>'
   +'<div class="ob-stat"><b>'+files+'</b><span>가져온 파일</span></div>'
   +'<div class="ob-stat"><b>'+list.length+'</b><span>프로젝트 AI</span></div>'
   +'</div>'
   +'<div class="ob-pcards">'+cards+'</div>'
   +'<div class="ob-ctas"><button class="ob-cta" id="obDoneDrive">드라이브에서 확인하기</button><button class="ob-cta2" id="obDoneMaster">마스터 AI 브리핑 받기</button></div>'
   +'</div>';
  $('#obDoneDrive').addEventListener('click',()=>closeOnboard('drive'));
  $('#obDoneMaster').addEventListener('click',()=>closeOnboard('master'));
  $$('#obDonePane .ob-pcard[data-nav]').forEach(b=>b.addEventListener('click',()=>closeOnboard(b.dataset.nav)));
}

/* ---- 고정 버튼들 ---- */
$('#obGoogle').addEventListener('click',()=>obGo(1));
$('#obSignup').addEventListener('click',()=>obGo(1));
$('#obBack').addEventListener('click',()=>obGo(1));
$('#obSkip').addEventListener('click',()=>closeOnboard('drive',true));
$('#obLater').addEventListener('click',()=>closeOnboard('drive',true));
$('#obBannerGo').addEventListener('click',()=>openOnboard(1));
$('#obBannerX').addEventListener('click',()=>$('#obBanner').classList.remove('on'));

/* ---- 드라이브 「신규」 메뉴 — 업로드 / LMS 가져오기 재진입점 ----
   첨부 메뉴(10-attach-picker.js)와 같은 열기·측정·바깥클릭 닫기 패턴 */
function closeDnMenu(){$('#dnMenu').classList.remove('open');}
$('#btnNew').addEventListener('click',()=>{
  const m=$('#dnMenu'),b=$('#btnNew');
  if(m.classList.contains('open')){closeDnMenu();return;}
  m.classList.add('open');
  const r=b.getBoundingClientRect(),mw=m.offsetWidth;
  m.style.left=Math.min(r.right-mw,innerWidth-mw-8)+'px';
  m.style.top=(r.bottom+8)+'px';
});
document.addEventListener('click',e=>{if(!e.target.closest('#dnMenu,#btnNew'))closeDnMenu();});
$('#dnUpload').addEventListener('click',()=>{closeDnMenu();$('#driveUp').click();});
$('#dnLms').addEventListener('click',()=>{closeDnMenu();$('#obBanner').classList.remove('on');openOnboard(1);});

/* ---- 진입 판단 — 해시는 초기화 시점에만 읽힌다 (라우팅 규칙과 동일) ---- */
(function(){
  const m=(location.hash||'').replace('#','');
  if(m===''||m==='onboarding'){openOnboard(0);return;}
  if(m.indexOf('onboarding-')===0){
    const n=parseInt(m.slice('onboarding-'.length),10);
    if(n>=0&&n<=5)openOnboard(n);
  }
})();

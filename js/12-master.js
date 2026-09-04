/* ---------- 내 AI(마스터) 화면 — 1:1 채팅 + 오른쪽 「내 AI」 패널 ----------
   가운데: Claude·ChatGPT식 대화 한 열(헤더 · 스레드 · 컴포저). 데모 스레드는 index.html의 정적 마크업이고
   (오늘 브리핑 → 활동 알림 → 크로스 프로젝트 질의 → 위임 카드), 「새 대화」는 빈 상태(인사 + 할 수 있는 것 6개)로
   바꾼다. 입력은 목업 응답이 붙는다. 데모 버튼은 data-ma 위임 하나로 처리해 스레드를 갈아끼워도 다시 안 묶는다.
   오른쪽: 이 AI를 설명하는 패널 = 이 AI의 프로필. 정체성 블록(이름 수정 바인딩은 18-profile.js) · 역할 ·
   할 수 있는 것(MA_CAPS) · 지금 하는 일 · 메모리(MA_MEMORY) · 부리는 에이전트(renderProjects가 채움) · 경계 · 설정.
   섹션은 <details>라 JS 없이 접고 편다. data-pf="master" 트리거는 maFocusPane()으로 이 패널을 가리킨다. */

const MA_STAR=(s)=>'<svg viewBox="0 0 20 20" width="'+s+'" height="'+s+'" fill="currentColor"><path d="M10 2.4l1.9 5.2 5.2 1.9-5.2 1.9L10 16.6l-1.9-5.2-5.2-1.9 5.2-1.9z"/></svg>';
const MA_ICON_PLUS='<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 4.5v11M4.5 10h11"/></svg>';
const MA_ICON_BACK='<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 4.5 7 10l5.5 5.5"/></svg>';
/* 할 수 있는 것 — 패널 목록과 빈 상태 칩이 같은 데이터를 쓴다. ex는 누르면 그대로 전송되는 예시 요청 */
const MA_CAPS=[
 {t:'오늘 브리핑',d:'마감·확인 대기·진행 중인 일을 아침마다 정리해요',ex:'이번 주 마감 정리해줘'},
 {t:'크로스 프로젝트 질의',d:'여러 과목 AI에 물어보고 종합해요. 근거가 함께 붙어요',ex:'지금 뭐 하고 있어?'},
 {t:'프로젝트 AI에게 위임',d:'과목 일은 그 과목 AI에게 시키고 결과를 받아와요',ex:'일반물리학 AI한테 요약 노트를 시켜줘'},
 {t:'드라이브 전체 검색',d:'자료와 대화 원문을 학기 전체에서 찾아요',ex:'지난주 실험 대화 찾아줘'},
 {t:'툴 직접 실행',d:'문제 풀이·생성·시각화·문서·PPT를 프로젝트 없이도 바로 써요',ex:'중간고사 기출.pdf 3번 풀어줘'},
 {t:'확인 대기 처리',d:'결과물을 보고 확인하거나 되돌려 보내요',ex:'확인 대기 보여줘'},
];
/* 내 AI가 기억하는 것 — 브리핑·타임라인과 같은 데모 데이터 */
const MA_MEMORY=['실험 보고서 마감 D-1 · 일반물리학 AI가 초안 v2를 완성해 내 확인 대기','중간고사 기출.pdf 3번 풀이를 이어서 하기로 함 · 중간고사 대비 폴더는 아직 프로젝트 미연결','성적 관리.xlsx에 미입력 점수 2건'];
const MA_REPLY='확인했어요. 관련 프로젝트 AI에 질의하고 드라이브 전체를 검색해 종합할게요 — 진행 상황은 오른쪽 「지금 하는 일」에, 결과는 이 대화로 보고돼요.';

let maFresh=false,maPaneOpen=true,maReplyT=null;
const maDemoHTML=$('#maMsgs').innerHTML;   /* 정적 데모 스레드 — 「오늘 대화로」가 되돌릴 때 쓴다 */

function maNow(){const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function maClock(){const d=new Date();let h=d.getHours();const m=String(d.getMinutes()).padStart(2,'0');return (h<12?'오전 ':'오후 ')+(h%12||12)+':'+m;}
function maMsgAI(inner){
  return '<div class="ma-m ai"><span class="ma-ava sm">'+MA_STAR(15)+'</span><div class="ma-mb"><div class="ma-mh"><b data-ainame>'+escapeHtml(aiName())+'</b><time>'+maNow()+'</time></div><div class="ma-mt">'+inner+'</div></div></div>';
}
function maMsgMe(t){return '<div class="ma-m me"><time>'+maNow()+'</time><div class="ma-bub-u">'+escapeHtml(t)+'</div></div>';}
function maScrollEnd(){const th=$('#maThread');th.scrollTop=th.scrollHeight;}

function maSend(text){
  const t=(text||'').trim();if(!t)return;
  const w=$('#maMsgs');
  const empty=w.querySelector('.ma-empty');if(empty)empty.remove();
  $('#maChips').style.display='none';
  w.insertAdjacentHTML('beforeend',maMsgMe(t));maScrollEnd();
  clearTimeout(maReplyT);
  maReplyT=setTimeout(()=>{
    w.insertAdjacentHTML('beforeend',maMsgAI('<p>'+MA_REPLY+'</p><div class="ma-srcs"><span class="ma-src">근거: 프로젝트 AI 질의</span><span class="ma-src">근거: 드라이브 검색</span></div>'));
    maScrollEnd();
  },650);
}
/* 빈 상태 — 인사 + 할 수 있는 것 6개. 이름 자리는 data-uname이라 이름을 바꿔도 따라온다 */
function maEmptyHTML(){
  return '<div class="ma-empty"><span class="ma-ava xl">'+MA_STAR(26)+'</span><h2>안녕하세요, <span data-uname>'+escapeHtml(USER.username)+'</span>님.</h2><p>무엇이든 시켜보세요. 드라이브 전체를 알고, 과목 AI들을 부려요.</p>'
   +'<div class="ma-capchips">'+MA_CAPS.map(c=>'<button class="ma-cap" data-ex="'+escapeHtml(c.ex)+'"><b>'+c.t+'</b><span>'+escapeHtml(c.ex)+'</span></button>').join('')+'</div></div>';
}
function maBindDemo(){
  const av=$('#maDcAva');if(av)av.innerHTML=avatarFor(PROJECTS.find(p=>p.id==='p1')||{name:'일반물리학'},20);
}
function maRenderThread(){
  clearTimeout(maReplyT);   /* 스레드를 갈아끼우는데 목업 응답 타이머가 살아 있으면 엉뚱한 스레드에 붙는다 */
  $('#maMsgs').innerHTML=maFresh?maEmptyHTML():maDemoHTML;
  $('#maChips').style.display=maFresh?'none':'flex';
  $('#maNew').innerHTML=maFresh?MA_ICON_BACK+'오늘 대화로':MA_ICON_PLUS+'새 대화';
  maBindDemo();
  if(typeof renderUser==='function')renderUser();   /* 갈아끼운 마크업의 data-ainame / data-uname 채우기 */
  $('#maThread').scrollTop=0;
}
function maAction(k){
  if(k==='doc')openEditor('doc','실험 보고서.docx');
  else if(k==='pdf')openEditor('pdf','변형문제_2차.pdf');
  else if(k==='pj')maGoQuizThread();
}
/* "#일반물리학에서 보기" — 채널로 가서 그 위임(10:16 게시글)의 쓰레드를 연다 */
function maGoQuizThread(){
  state.pjTab='msg';go('project-p1');
  const p=PROJECTS.find(x=>x.id==='p1');const post=p&&(p.posts||[]).find(x=>x.key==='quiz');
  if(post&&typeof openThread==='function')openThread(p,post.id);
}
function maPaneToggle(force){
  maPaneOpen=typeof force==='boolean'?force:!maPaneOpen;
  $('#maPane').style.display=maPaneOpen?'block':'none';
  $('#maPaneTg').classList.toggle('on',maPaneOpen);
}
/* 헤더 아이콘·이름 / 말풍선 라벨 / 내 프로필의 「내 AI」 행 → 이 화면의 패널 맨 위(정체성 블록)로 */
function maFocusPane(){
  if(state.profile)closeProfile();   /* 오른쪽 패널이 둘 뜨지 않게 — 내 프로필의 「내 AI」 행에서 올 때 */
  if(state.view!=='master')go('master');
  if(!maPaneOpen)maPaneToggle(true);
  $('#maPane').scrollTop=0;
  const id=$('#mpId');id.classList.remove('mp-flash');void id.offsetWidth;id.classList.add('mp-flash');
}
function maRenderPane(){
  $('#mpCaps').innerHTML=MA_CAPS.map(c=>'<button class="mp-cap" data-ex="'+escapeHtml(c.ex)+'"><b>'+c.t+'</b><span>'+c.d+'</span><em>“'+escapeHtml(c.ex)+'”</em></button>').join('');
  $('#mpMem').innerHTML=MA_MEMORY.map(m=>'<li>'+escapeHtml(m)+'</li>').join('');
  $('#mpTime').textContent=maClock();
}

/* ---- 바인딩 ---- */
$('#maMsgs').addEventListener('click',e=>{
  const c=e.target.closest('.ma-cap');if(c){maSend(c.dataset.ex);return;}
  const a=e.target.closest('[data-ma]');if(a)maAction(a.dataset.ma);
});
$('#mpCaps').addEventListener('click',e=>{const c=e.target.closest('.mp-cap');if(c){maSend(c.dataset.ex);$('#maTa').focus();}});
$('#maNew').addEventListener('click',()=>{maFresh=!maFresh;maRenderThread();});
$('#maPaneTg').addEventListener('click',()=>maPaneToggle());
const maTa=$('#maTa');
function maSubmit(){maSend(maTa.value);maTa.value='';$('#maSendBtn').classList.remove('ready');}
$('#maSendBtn').addEventListener('click',maSubmit);
maTa.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();maSubmit();}});
$$('.ma-sugg').forEach(s=>s.addEventListener('click',()=>maSend(s.textContent.trim())));
$('#maView1').addEventListener('click',()=>openEditor('doc','실험 보고서.docx'));
$('#tlOpenDoc').addEventListener('click',()=>openEditor('doc','실험 보고서.docx'));
$('#maGoPj1').addEventListener('click',maGoQuizThread);
$('#tlSeePj').addEventListener('click',()=>openEditor('pdf','변형문제_2차.pdf'));
$('#maOk1').addEventListener('click',()=>{
  $('#maOkCard').innerHTML='<div class="rail-file"><span class="ed-badge" style="background:#2B7CD3">W</span><b>실험 보고서 초안 v2</b></div>'
   +'<div class="rail-done">'+SVG_CK12+'확인 완료 — 일반물리학 AI에 전달됐어요</div>';
  $('#maBadge').textContent='1';
});
maRenderPane();maBindDemo();
setInterval(()=>{const t=$('#mpTime');if(t)t.textContent=maClock();},30000);

/* ================= 사이드바 업로드 → AI 드라이브 ================= */

/* ---------- PPT 제작 (BETA) — 자료 선택 → 개요 확인 → 슬라이드 생성 ----------
   흐름이 3단계인 이유: 완성본을 한 번에 주면 수정 엄두가 안 나므로,
   수정 비용이 가장 싼 "개요" 단계에서 유저 확인을 한 번 받는다.
   클래스 접두사는 .pmk- (.ppt-는 편집기 슬라이드 UI가 사용 중) */

const PMK_DEFAULT_REQ='일반물리학 실험 보고서와 3장 필기를 바탕으로 조별 발표 자료를 만들어줘. 포물선 운동 실험이 중심이고, 10분 발표라 8장 정도면 좋겠어.';

const PMK_DECKS=[
 {name:'중간고사 정리 — 벡터와 운동량',n:12,date:'8월 24일',cover:'dark'},
 {name:'자료구조 발표 — 스택과 큐',n:10,date:'8월 21일',cover:'light'},
 {name:'대학영어 Final Presentation',n:6,date:'8월 15일',cover:'sand'},
 {name:'심리학개론 — 기억의 구조',n:9,date:'8월 9일',cover:'plain'},
];

const PMK_STYLES=[
 {k:'report',name:'보고서',
  svg:'<svg viewBox="0 0 150 64"><g fill="#C9C9C7"><rect x="14" y="9" width="66" height="4" rx="2"/><rect x="14" y="18" width="52" height="2.5" rx="1.25"/><rect x="14" y="24" width="58" height="2.5" rx="1.25"/><rect x="14" y="30" width="46" height="2.5" rx="1.25"/></g><g fill="#9C9C9A"><rect x="16" y="48" width="6" height="8"/><rect x="26" y="43" width="6" height="13"/><rect x="36" y="39" width="6" height="17"/><rect x="46" y="44" width="6" height="12"/></g><path d="M92 56 l12 -10 10 5 14 -13 8 4" stroke="#8A8A88" fill="none" stroke-width="1.4"/><g fill="#C9C9C7"><rect x="92" y="12" width="44" height="2.5" rx="1.25"/><rect x="92" y="18" width="36" height="2.5" rx="1.25"/></g></svg>'},
 {k:'standard',name:'표준',
  svg:'<svg viewBox="0 0 150 64"><g fill="#C9C9C7"><rect x="14" y="10" width="58" height="4" rx="2"/><rect x="14" y="20" width="46" height="2.5" rx="1.25"/></g><rect x="14" y="28" width="62" height="26" rx="3" fill="#E6E6E4"/><circle cx="112" cy="36" r="16" fill="none" stroke="#DADAD8" stroke-width="7"/><path d="M112 20 a16 16 0 0 1 15 21" fill="none" stroke="#EE7732" stroke-width="7"/><circle cx="134" cy="52" r="3" fill="#9C9C9A"/></svg>'},
 {k:'presentation',name:'프레젠테이션',
  svg:'<svg viewBox="0 0 150 64"><g fill="#C9C9C7"><rect x="14" y="8" width="64" height="4" rx="2"/><rect x="14" y="16" width="42" height="2.5" rx="1.25"/></g><g><rect x="14" y="25" width="36" height="17" rx="3" fill="#F1F1EF"/><rect x="55" y="25" width="36" height="17" rx="3" fill="#F1F1EF"/><rect x="96" y="25" width="36" height="17" rx="3" fill="#F1F1EF"/></g><g font-family="Arial" font-size="7" font-weight="700" fill="#3C3C3A"><text x="19" y="36">42%</text><text x="60" y="36">3.1x</text><text x="101" y="36">2.3m</text></g><rect x="14" y="50" width="80" height="5" rx="2.5" fill="#EE7732"/><rect x="98" y="50" width="34" height="5" rx="2.5" fill="#EFEFED"/></svg>'},
 {k:'keynote',name:'키노트',
  svg:'<svg viewBox="0 0 150 64"><g fill="#C9C9C7"><rect x="14" y="10" width="52" height="4" rx="2"/><rect x="14" y="19" width="38" height="2.5" rx="1.25"/></g><rect x="76" y="8" width="60" height="48" rx="5" fill="#E6E6E4"/><circle cx="106" cy="32" r="13" fill="#F7F7F5"/><circle cx="113" cy="26" r="5" fill="#EE7732"/><rect x="14" y="46" width="46" height="2.5" rx="1.25" fill="#C9C9C7"/><rect x="14" y="52" width="32" height="2.5" rx="1.25" fill="#DADAD8"/></svg>'},
];

const PMK_TPLS=[
 {k:'light',   name:'라이트', bg:'#FFFFFF',ink:'#1F1F1D',accent:'#3A6FE0',bar:'#E4E4E2'},
 {k:'mono',    name:'모노',   bg:'#FFFFFF',ink:'#111110',accent:'#222220',bar:'#DCDCDA'},
 {k:'charcoal',name:'차콜',   bg:'#26262A',ink:'#F4F4F2',accent:'#F4F4F2',bar:'#4A4A50'},
 {k:'cobalt',  name:'코발트', bg:'#F4F7FC',ink:'#182238',accent:'#2E5FD4',bar:'#C9D6EE'},
 {k:'sand',    name:'샌드',   bg:'#FAF4EA',ink:'#3A3226',accent:'#C4713B',bar:'#E6D9C4'},
 {k:'graphite',name:'그라파이트',bg:'#1E1E20',ink:'#EDEDEB',accent:'#8FA6C8',bar:'#3C3C40'},
 {k:'sage',    name:'세이지', bg:'#F3F7F0',ink:'#26301F',accent:'#4E7A45',bar:'#D2E0C9'},
 {k:'clay',    name:'클레이', bg:'#FBF2EE',ink:'#38251E',accent:'#B4543A',bar:'#E9D2C8'},
];

const PMK_OUTLINE=[
 {t:'포물선 운동 실험: 발사각과 수평 도달 거리',
  b:['일반물리학 3조 · 조별 실험 발표','발표 10분 · 질의응답 5분 · 2026년 9월']},
 {t:'실험 개요 — 무엇을 확인하려 했나',
  b:['목적: 발사각이 수평 도달 거리에 미치는 영향을 정량 측정','가설: 발사 속도가 같다면 45°에서 도달 거리가 최대','근거 자료: 실험 보고서.docx · 3장 필기.pdf']},
 {t:'이론 배경 — 속도의 벡터 분해',
  b:['초기 속도를 수평·수직 성분으로 분해: vx = v·cosθ, vy = v·sinθ','공기 저항을 무시하면 도달 거리 R = v²·sin2θ / g','sin2θ가 최대가 되는 θ = 45°가 이론적 최적각'],chart:'diagram',cap:'벡터 분해 다이어그램 — 시각화 툴이 생성'},
 {t:'실험 설계 — 변인 통제',
  b:['발사 속도 고정(스프링 압축 2단) · 발사각 15°~75°를 15° 간격으로 변경','각 조건 5회 반복 측정 후 평균 — 총 25회','낙하점은 모래판으로 고정 · 줄자 측정 오차 ±0.5cm']},
 {t:'측정 결과 — 각도별 평균 도달 거리',
  b:['45°에서 평균 2.31m로 최대 — 가설과 일치','30°(2.02m)와 60°(1.98m)가 이론대로 거의 같은 거리','전 구간에서 이론 곡선과 같은 경향'],chart:'bar',cap:'차트 — 실험 데이터.xlsx의 측정값 사용'},
 {t:'오차 분석 — 이론값과의 차이',
  b:['평균 오차 -4.2%: 측정값이 이론값보다 일관되게 짧음','주원인 추정: 공기 저항, 발사 순간 마찰로 인한 초기 속도 손실','반복 측정 표준편차 3cm 이내 — 측정 자체는 안정적'],chart:'table',cap:'표 — 각도별 이론값·측정값·오차'},
 {t:'결론',
  b:['발사각 45°에서 도달 거리 최대 — 이론 예측을 실험으로 검증','도달 거리가 sin2θ에 비례하는 경향 확인','개선안: 초고속 카메라로 초기 속도 직접 측정']},
 {t:'Q&A — 예상 질문',
  b:['공기 저항을 고려하면 최적각은? → 45°보다 약간 작아짐','발사 높이가 0이 아니면? → 최적각이 낮아지는 방향','오차 막대의 의미와 계산 방법']},
];

const PMK_CHARTS={
 diagram:'<svg viewBox="0 0 240 96" width="240" height="96"><g stroke="#8A8A88" stroke-width="1.2" fill="none"><path d="M28 82 h188"/><path d="M28 82 v-66"/></g><path d="M28 82 L138 30" stroke="#3C3C3A" stroke-width="1.6" fill="none"/><path d="M132 28 l8 1 -4 7z" fill="#3C3C3A"/><g stroke="#ABABA9" stroke-width="1.2" stroke-dasharray="3 3" fill="none"><path d="M28 30 h110"/><path d="M138 30 v52"/></g><path d="M56 82 a30 30 0 0 0 -4 -14" stroke="#EE7732" fill="none" stroke-width="1.3"/><g font-family="Georgia,serif" font-size="9" font-style="italic" fill="#3C3C3A"><text x="98" y="44">v</text><text x="86" y="92">vx</text><text x="12" y="58">vy</text><text x="60" y="76">θ</text></g></svg>',
 bar:'<svg viewBox="0 0 240 96" width="240" height="96"><g stroke="#E0E0DE" stroke-width="1"><path d="M30 76 h190"/><path d="M30 54 h190"/><path d="M30 32 h190"/></g><g fill="#C9C9C7"><rect x="44" y="56" width="18" height="20" rx="2"/><rect x="80" y="42" width="18" height="34" rx="2"/><rect x="152" y="43" width="18" height="33" rx="2"/><rect x="188" y="58" width="18" height="18" rx="2"/></g><rect x="116" y="30" width="18" height="46" rx="2" fill="#EE7732"/><g font-family="Arial" font-size="8" fill="#8A8A88" text-anchor="middle"><text x="53" y="88">15°</text><text x="89" y="88">30°</text><text x="125" y="88">45°</text><text x="161" y="88">60°</text><text x="197" y="88">75°</text></g><text x="125" y="24" font-family="Arial" font-size="8.5" font-weight="700" fill="#D8681B" text-anchor="middle">2.31m</text></svg>',
 table:'<svg viewBox="0 0 240 84" width="240" height="84"><g fill="#DADAD8"><rect x="12" y="10" width="50" height="4" rx="2"/><rect x="96" y="10" width="40" height="4" rx="2"/><rect x="168" y="10" width="40" height="4" rx="2"/></g><path d="M12 22 h216" stroke="#C9C9C7" stroke-width="1"/><g fill="#E6E6E4"><rect x="12" y="30" width="40" height="3.5" rx="1.75"/><rect x="96" y="30" width="34" height="3.5" rx="1.75"/><rect x="168" y="30" width="30" height="3.5" rx="1.75"/><rect x="12" y="44" width="44" height="3.5" rx="1.75"/><rect x="96" y="44" width="30" height="3.5" rx="1.75"/><rect x="168" y="44" width="34" height="3.5" rx="1.75"/><rect x="12" y="58" width="38" height="3.5" rx="1.75"/><rect x="96" y="58" width="36" height="3.5" rx="1.75"/></g><rect x="168" y="58" width="26" height="3.5" rx="1.75" fill="#F2C29B"/></svg>',
};

/* 덱 커버 — 인라인 SVG (절대 원칙 2) */
function pmkCover(kind){
  if(kind==='dark')return '<svg viewBox="0 0 160 90" preserveAspectRatio="none"><rect width="160" height="90" fill="#23252E"/><path d="M0 66 C40 50 70 84 160 58 L160 90 L0 90 Z" fill="#2C3040"/><path d="M0 76 C50 62 90 92 160 70 L160 90 L0 90 Z" fill="#343A50"/><rect x="14" y="18" width="76" height="5" rx="2.5" fill="#EDEDEB"/><rect x="14" y="28" width="52" height="3" rx="1.5" fill="#8A8FA5"/><rect x="14" y="40" width="22" height="2.5" rx="1.25" fill="#EE7732"/></svg>';
  if(kind==='sand')return '<svg viewBox="0 0 160 90" preserveAspectRatio="none"><rect width="160" height="90" fill="#F6EFE2"/><circle cx="128" cy="64" r="26" fill="#EADFC9"/><circle cx="146" cy="78" r="14" fill="#E0D2B6"/><rect x="14" y="18" width="70" height="5" rx="2.5" fill="#4A4034"/><rect x="14" y="28" width="48" height="3" rx="1.5" fill="#A8987E"/></svg>';
  if(kind==='light')return '<svg viewBox="0 0 160 90" preserveAspectRatio="none"><rect width="160" height="90" fill="#fff"/><rect x="14" y="16" width="64" height="5" rx="2.5" fill="#3C3C3A"/><rect x="14" y="26" width="44" height="3" rx="1.5" fill="#C9C9C7"/><g fill="#DCE6F4"><rect x="14" y="44" width="38" height="30" rx="3"/><rect x="58" y="44" width="38" height="30" rx="3"/><rect x="102" y="44" width="38" height="30" rx="3"/></g><path d="M20 66 l8 -8 7 4 9 -9" stroke="#2E5FD4" fill="none" stroke-width="1.4"/></svg>';
  if(kind==='new')return '<svg viewBox="0 0 160 90" preserveAspectRatio="none"><rect width="160" height="90" fill="#F4F7FC"/><path d="M0 58 C46 44 84 76 160 52 L160 90 L0 90 Z" fill="#DCE6F6"/><rect x="14" y="16" width="84" height="5" rx="2.5" fill="#182238"/><rect x="14" y="26" width="56" height="3" rx="1.5" fill="#8CA3CE"/><rect x="14" y="38" width="22" height="2.5" rx="1.25" fill="#2E5FD4"/><g fill="#C9D6EE"><rect x="112" y="58" width="7" height="16" rx="1.5"/><rect x="123" y="50" width="7" height="24" rx="1.5"/><rect x="134" y="54" width="7" height="20" rx="1.5"/></g></svg>';
  return '<svg viewBox="0 0 160 90" preserveAspectRatio="none"><rect width="160" height="90" fill="#F7F7F5"/><rect x="46" y="30" width="68" height="6" rx="3" fill="#E0E0DE"/><rect x="56" y="44" width="48" height="4" rx="2" fill="#E9E9E7"/></svg>';
}

let pmkStyle='presentation',pmkTpl='cobalt',pmkBusy=false,pmkDone=false,pmkResult=null;
const PMK_TIMERS=[];
function pmkDelay(fn,ms){PMK_TIMERS.push(setTimeout(fn,ms));}
function pmkClearTimers(){while(PMK_TIMERS.length)clearTimeout(PMK_TIMERS.pop());}

function pmkRenderDecks(){
  $('#pmkDecks').innerHTML=PMK_DECKS.map((d,i)=>
    '<button class="pmk-deck" data-i="'+i+'"><span class="pmk-deck-th">'+pmkCover(d.cover)
    +'<span class="pmk-deck-n">'+d.n+'장</span></span>'
    +'<span class="pmk-deck-name">'+escapeHtml(d.name)+'</span>'
    +'<span class="pmk-deck-date">'+d.date+(d.ai?'<span class="pmk-deck-ai">AI 생성</span>':'')+'</span></button>').join('');
}
function pmkRenderStyles(){
  $('#pmkStyles').innerHTML=PMK_STYLES.map(s=>
    '<button class="pmk-style'+(s.k===pmkStyle?' on':'')+'" data-k="'+s.k+'">'+s.svg+'<b>'+s.name+'</b></button>').join('');
}
function pmkRenderTpls(){
  $('#pmkTpls').innerHTML='<button class="pmk-tpl up"><span class="pmk-swatch">+ 내 템플릿 업로드</span><span class="pmk-tpl-name">오리지널</span><span class="pmk-tpl-by">PPTX 템플릿 사용</span></button>'
   +PMK_TPLS.map(t=>
    '<button class="pmk-tpl'+(t.k===pmkTpl?' on':'')+'" data-k="'+t.k+'">'
    +'<span class="pmk-swatch" style="background:'+t.bg+'">'
    +'<span class="pmk-sw-dot" style="background:'+t.accent+'"></span>'
    +'<span class="aa" style="color:'+t.ink+'">Aa</span>'
    +'<span class="pmk-sw-bar" style="background:'+t.bar+';width:78%"></span>'
    +'<span class="pmk-sw-bar" style="background:'+t.accent+';width:46%"></span>'
    +'</span><span class="pmk-tpl-name">'+t.name+'</span><span class="pmk-tpl-by">GPAI 제공</span></button>').join('');
}
function pmkSlideHTML(s,i){
  return '<div class="pmk-slide"><div class="pmk-sl-no">'+(i+1)+'</div><div class="pmk-sl-body">'
   +'<div class="pmk-sl-t">'+escapeHtml(s.t)+'</div>'
   +'<ul class="pmk-sl-b">'+s.b.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul>'
   +(s.chart?'<div class="pmk-sl-chart">'+PMK_CHARTS[s.chart]+'<div class="pmk-sl-cap"><b>포함될 그래픽</b>'+escapeHtml(s.cap)+'</div></div>':'')
   +'</div></div>';
}
function pmkMsg(html){
  const m=$('#pmkMsgs');
  m.insertAdjacentHTML('beforeend',html);
  m.scrollTop=m.scrollHeight;
  return m.lastElementChild;
}
const PMK_CK='<svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="ok"><path d="m4.5 10.5 3.5 3.5 7.5-8"/></svg>';
function pmkStep(text,done){
  return pmkMsg('<div class="pmk-step">'+(done?PMK_CK:'<span class="pmk-spin"></span>')+'<span>'+text+'</span></div>');
}
function pmkStepDone(el){if(el)el.firstChild.outerHTML=PMK_CK;}

/* 랜딩 → 개요 */
function pmkStart(){
  pmkClearTimers();
  pmkBusy=false;pmkDone=false;pmkResult=null;
  const txt=$('#pmkCtx').value.trim()||PMK_DEFAULT_REQ;
  $('#pmkHome').style.display='none';
  $('#pmkFlow').style.display='flex';
  $('#main').scrollTop=0;
  const gen=$('#pmkGen');gen.disabled=true;gen.textContent='슬라이드 생성';
  pmkRenderStyles();pmkRenderTpls();
  $('#pmkOutline').innerHTML='';$('#pmkCount').textContent='';
  $('#pmkMsgs').innerHTML='';
  pmkMsg('<div class="pmk-m-user">'+escapeHtml(txt)+'</div>');
  const atts=$$('#view-ppt .att-row .att-name').map(n=>n.textContent).slice(0,3);
  const srcs=atts.length?atts.join(' · '):'실험 보고서.docx · 3장 필기.pdf · 실험 데이터.xlsx';
  let st1,st2;
  pmkDelay(()=>{st1=pmkStep('자료 분석 — '+srcs,false);},450);
  pmkDelay(()=>{pmkStepDone(st1);st2=pmkStep('개요 작성 — 발표 10분 기준 8장 구성',false);},1250);
  PMK_OUTLINE.forEach((s,i)=>pmkDelay(()=>{
    $('#pmkOutline').insertAdjacentHTML('beforeend',pmkSlideHTML(s,i));
    $('#pmkCount').textContent=(i+1)+'장';
  },1700+i*220));
  pmkDelay(()=>{
    pmkStepDone(st2);
    pmkMsg('<div class="pmk-m-ai"><b>개요 초안이 나왔어요.</b> 실험 보고서의 결과 표와 측정 데이터를 바탕으로 8장을 구성했어요.'
     +'<ol><li><b>표지 · 개요</b> — 목적과 가설 (1~2장)</li>'
     +'<li><b>이론</b> — 벡터 분해, R = v²·sin2θ/g (3장)</li>'
     +'<li><b>설계 · 결과</b> — 각도별 도달 거리 차트 (4~5장)</li>'
     +'<li><b>오차 · 결론 · Q&amp;A</b> — 이론 대비 -4.2% 분석 (6~8장)</li></ol>'
     +'덱 스타일과 템플릿을 고른 뒤 위의 <b>「슬라이드 생성」</b>을 눌러주세요.</div>');
    $('#pmkGen').disabled=false;
  },1700+PMK_OUTLINE.length*220+400);
}
function pmkReset(){
  pmkClearTimers();
  pmkBusy=false;
  $('#pmkFlow').style.display='none';
  $('#pmkHome').style.display='block';
  $('#main').scrollTop=0;
}

/* 슬라이드 생성 연출 → 드라이브 저장 → 편집기 */
function pmkGenerate(){
  if(pmkDone){openEditor('ppt',pmkResult+'.pptx');return;}
  if(pmkBusy)return;
  pmkBusy=true;
  const gen=$('#pmkGen');gen.disabled=true;gen.textContent='생성 중…';
  const tpl=PMK_TPLS.find(t=>t.k===pmkTpl),sty=PMK_STYLES.find(s=>s.k===pmkStyle);
  const prog=pmkMsg('<div class="pmk-prog"><span class="pmk-prog-t">슬라이드 1/8 렌더링 — '+sty.name+' · '+tpl.name+' 템플릿</span><div class="pmk-prog-bar"><i></i></div></div>');
  for(let i=1;i<=8;i++)pmkDelay(()=>{
    prog.querySelector('.pmk-prog-t').textContent='슬라이드 '+i+'/8 렌더링 — '+sty.name+' · '+tpl.name+' 템플릿';
    prog.querySelector('.pmk-prog-bar i').style.width=(i/8*100)+'%';
  },i*260);
  pmkDelay(()=>{
    pmkResult='포물선 운동 실험 발표';
    prog.outerHTML='<div class="pmk-step">'+PMK_CK+'<span>슬라이드 8장 생성 완료 — '+sty.name+' · '+tpl.name+' 템플릿</span></div>';
    /* 결과물 축적: 드라이브 홈 + 내 덱 (설계 원칙 — 결과물은 드라이브에 자동 저장) */
    driveItems.push({type:'file',kind:'ppt',name:pmkResult,meta:'PPTX · 3.4MB'});
    if(state.view==='drive')renderDrive();
    PMK_DECKS.unshift({name:pmkResult,n:8,date:'방금',cover:'new',ai:true});
    pmkRenderDecks();
    pmkMsg('<button class="pmk-file" data-open="'+escapeHtml(pmkResult)+'"><span class="ed-badge" style="background:#D04423;font-size:8px">P</span>'+escapeHtml(pmkResult)+'.pptx · AI 드라이브에 저장됨 — 클릭해서 열기</button>');
    pmkMsg('<div class="pmk-m-ai">완료했어요. 세부 문구나 도형은 <b>PPTX 편집기</b>에서 이어서 다듬을 수 있고, 발표 대본이 필요하면 문서 작성 툴을 불러올게요.</div>');
    pmkDone=true;pmkBusy=false;
    gen.textContent='편집기에서 열기';gen.disabled=false;
  },8*260+500);
}

/* 이벤트 바인딩 (전역 셀렉터는 #view-ppt로 스코프 — 지뢰 5) */
$('#pmkGo').addEventListener('click',pmkStart);
$('#pmkBack').addEventListener('click',pmkReset);
$('#pmkGen').addEventListener('click',pmkGenerate);
function pmkSyncGo(){
  const has=$('#pmkCtx').value.trim().length>0||$$('#view-ppt .att-row .att-chip').length>0;
  $('#pmkGo').disabled=!has;
}
$('#pmkCtx').addEventListener('input',pmkSyncGo);
$('#view-ppt').addEventListener('click',e=>{
  const sg=e.target.closest('.pmk-sugg');
  if(sg){$('#pmkCtx').value=sg.dataset.req;pmkSyncGo();$('#pmkCtx').focus();return;}
  const st=e.target.closest('.pmk-style[data-k]');
  if(st){pmkStyle=st.dataset.k;pmkRenderStyles();return;}
  const tp=e.target.closest('.pmk-tpl[data-k]');
  if(tp){pmkTpl=tp.dataset.k;pmkRenderTpls();return;}
  const dk=e.target.closest('.pmk-deck');
  if(dk){openEditor('ppt',PMK_DECKS[+dk.dataset.i].name+'.pptx');return;}
  const fc=e.target.closest('.pmk-file');
  if(fc){openEditor('ppt',fc.dataset.open+'.pptx');return;}
  pmkSyncGo(); /* 첨부 칩 추가·제거도 클릭 경유 — 버튼 활성화 동기화 */
});

/* 진행 로그 입력 — 개요 수정 요청 (연출) */
const pmkTa=$('#pmkChatTa'),pmkSend=$('#pmkSendBtn');
pmkTa.addEventListener('input',()=>pmkSend.classList.toggle('on',pmkTa.value.trim().length>0));
function pmkChatSend(){
  const t=pmkTa.value.trim();if(!t)return;
  pmkTa.value='';pmkSend.classList.remove('on');
  pmkMsg('<div class="pmk-m-user">'+escapeHtml(t)+'</div>');
  pmkDelay(()=>pmkMsg('<div class="pmk-m-ai">반영했어요 — 해당 슬라이드 개요를 수정해뒀어요. <b>「슬라이드 생성」</b> 시 적용돼요.</div>'),600);
}
pmkSend.addEventListener('click',pmkChatSend);
pmkTa.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();pmkChatSend();}});

pmkRenderDecks();

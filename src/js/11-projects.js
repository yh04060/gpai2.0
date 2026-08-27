const SVG_MEM='<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="10" cy="5" rx="6" ry="2.5"/><path d="M4 5v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5"/><path d="M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5"/></svg>';
const SVG_TOOL='<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.6 3.1a4.2 4.2 0 0 0-5.2 5.2L3 12.7V17h4.3l4.4-4.4a4.2 4.2 0 0 0 5.2-5.2l-2.5 2.5-2.9-2.9z"/></svg>';
const SVG_LOCK='<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="4.5" y="9" width="11" height="8" rx="2"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9"/></svg>';
const SVG_FLD='<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.75" y="3.75" width="14.5" height="12.5" rx="2.5"/><path d="M2.75 11h3.7l1.3 1.9h4.5l1.3-1.9h3.7"/></svg>';
const SVG_CK12='<svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 10.5 3.5 3.5 7.5-8"/></svg>';
const PLUS_SVG='<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 4.5v11M4.5 10h11"/></svg>';
const SEND_SVG='<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15.5v-11M5.5 9 10 4.5 14.5 9"/></svg>';

const PROJECTS=[{id:'p1',name:'일반물리학',agent:'일반물리학 AI',folder:'일반물리학',items:6,msgs:[],cwd:null,fq:'',
  files:[
   {type:'folder',name:'강의 노트',meta:'항목 4개',time:'8월 24일',open:true,children:[
    {type:'folder',name:'스캔본',meta:'항목 2개',time:'8월 12일',children:[
     {kind:'png',name:'1장 판서 스캔',meta:'PNG · 2.1MB',time:'8월 5일'},
     {kind:'png',name:'2장 판서 스캔',meta:'PNG · 1.9MB',time:'8월 12일'},
    ]},
    {kind:'pdf',name:'3장 필기',meta:'PDF · 1.2MB',time:'8월 12일'},
    {kind:'pdf',name:'4장 필기',meta:'PDF · 980KB',time:'8월 19일'},
    {kind:'doc',name:'5장 요약 노트',meta:'DOCX · 22KB',time:'8월 24일',ai:'문서 작성 툴'},
   ]},
   {kind:'doc',name:'실험 보고서',meta:'DOCX · 18KB',time:'오늘 09:52',ai:'일반물리학 AI 초안 v2'},
   {kind:'pdf',name:'변형문제_2차',meta:'PDF · 84KB',time:'오늘 1:33',ai:'문제 생성 툴'},
   {kind:'xlsx',name:'실험 데이터',meta:'XLSX · 24KB',time:'8월 21일'},
   {kind:'pdf',name:'3장 연습문제',meta:'PDF · 1.1MB',time:'8월 18일'},
   {kind:'png',name:'포물선 운동 실험 그래프',meta:'PNG · 16KB',time:'8월 20일'},
  ],
  pins:[
   {kind:'doc',name:'실험 보고서',meta:'DOCX · 18KB',time:'오늘 09:52',ai:'일반물리학 AI 초안 v2'},
   {kind:'pdf',name:'변형문제_2차',meta:'PDF · 84KB',time:'오늘 1:33',ai:'문제 생성 툴'},
  ],
  memory:['중간시험 범위: 3~5장 (지난주 대화)','실험 보고서 — 금요일(8/28) 마감','취약 유형: 포물선 운동 벡터 분해','보고서 결과 표는 3개 구성 선호'],memUpdated:'오늘 10:00'}];
const FOLDER_FILES={
 '중간고사 대비':[
  {kind:'pdf',name:'중간고사 기출 모음',meta:'PDF · 2.4MB',time:'8월 10일'},
  {kind:'pdf',name:'작년 중간 문제지',meta:'PDF · 1.8MB',time:'8월 10일'},
  {kind:'doc',name:'오답노트',meta:'DOCX · 33KB',time:'8월 22일'},
  {kind:'xlsx',name:'단원별 취약 정리',meta:'XLSX · 15KB',time:'8월 24일'},
 ],
};
const UP_SVG_S='<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13.2V4.6M6.6 8 10 4.6 13.4 8"/><path d="M4 13.5V15a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 16 15v-1.5"/></svg>';
const CHEV_R='<svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5"/></svg>';
const FLD_OPEN='<svg viewBox="0 0 24 20" width="20" height="17"><path d="M2 8V4.5A2.5 2.5 0 0 1 4.5 2h4.6a2.5 2.5 0 0 1 2 1l1 1.4h7.4A2.5 2.5 0 0 1 22 6.9V8z" fill="#9CBAEA"/><path d="M4.4 8H21.8a1.9 1.9 0 0 1 1.8 2.5l-1.9 5.7A2.5 2.5 0 0 1 19.3 18H5a2.5 2.5 0 0 1-2.4-1.8L1.1 10.4A1.9 1.9 0 0 1 3 8z" fill="#ACC7F0"/></svg>';
const FOLD_SVG='<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="7" y="3.5" width="9.5" height="9.5" rx="1.5"/><path d="M9.6 8.2h4.3" stroke-linecap="round"/><path d="M3.5 7v8a1.5 1.5 0 0 0 1.5 1.5h8" stroke-linecap="round"/></svg>';
let pjSeq=0,pjUpDest=null;

function renderProjects(){
  $('#projNav').innerHTML=PROJECTS.map(p=>'<button class="nav-item" data-nav="project-'+p.id+'"><span class="pj-hash">#</span><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+escapeHtml(p.name)+'</span></button>').join('')
   +'<button class="nav-item nav-new" id="projNewBtn"><svg class="ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 4.5v11M4.5 10h11"/></svg><span>새 프로젝트</span></button>';
  const tier=$('#maTierProj');
  if(tier)tier.innerHTML=PROJECTS.map(p=>'<div class="tier-box"><b>'+escapeHtml(p.agent)+'</b><span class="sub">폴더: '+escapeHtml(p.folder)+'</span></div>').join('')
   +'<div class="tier-box dashed" id="maNewProj">+ 새 프로젝트</div>';
}
$('#projNav').addEventListener('click',e=>{
  if(e.target.closest('#projNewBtn')){openProjModal();return;}
  const b=e.target.closest('[data-nav]');
  if(b){state.pjTab='msg';go(b.dataset.nav);}
});
$('#maTierProj').addEventListener('click',e=>{if(e.target.closest('#maNewProj'))openProjModal();});

function pjFmt(p,t){
  const s=escapeHtml(t),m=escapeHtml('@'+p.agent);
  return s.split(m).join('<span class="mention">'+m+'</span>');
}
function pjUserPost(p,time,text,extra){
  return '<div class="pj-post"><div class="pj-pava">김</div><div class="pj-body">'
   +'<div class="pj-who"><b>김튜링</b><span class="pj-time">'+time+'</span></div>'
   +'<div class="pj-text">'+pjFmt(p,text)+'</div>'+(extra||'')+'</div></div>';
}
function pjTsum(n,when){
  return '<div class="pj-treply"><span class="pj-mini">g(π)</span>'+n+'개의 답글<em> · 마지막 답글 '+when+'</em></div>';
}
function pjThreadReply(p,time,inner){
  return '<div><div class="pj-who"><span class="pj-mini">g(π)</span><b>'+escapeHtml(p.agent)+'</b><span class="pj-time">'+time+'</span></div><div class="pj-text">'+inner+'</div></div>';
}
function pjP1HTML(p){
  const thread='<div class="pj-thread">'
   +pjThreadReply(p,'1:31','메모리에서 중간시험 범위를 확인했어요 (3~5장 · 지난주 대화). 요약 노트를 만든 뒤 문제 생성 툴을 호출할게요.')
   +pjThreadReply(p,'1:33','<div class="tool-card" style="margin-top:2px"><b>'+SVG_TOOL+'문제 생성 툴 실행</b><div class="rail-meta" style="margin-top:5px">범위 3~5장 · 20문항 · 난이도 혼합 — '+escapeHtml(p.agent)+'가 호출</div></div>'
     +'<span class="file-chip" data-open="pdf" data-name="변형문제_2차.pdf" title="열기"><span class="ed-badge" style="background:#E2574C;font-size:8px">PDF</span>변형문제_2차.pdf · 프로젝트 폴더에 저장됨 — 클릭해서 열기</span>')
   +pjThreadReply(p,'1:35','<div class="mem-note" style="margin-top:2px">'+SVG_MEM+'<span>메모리 업데이트 — "중간시험 범위 3~5장 · 취약 유형: 포물선 벡터 분해" · 다음 대화부터 반영돼요</span></div>')
   +'</div>';
  return '<div class="pj-day">어제</div>'
   +pjUserPost(p,'12:31','@일반물리학 AI 실험 데이터.xlsx 기반으로 실험 보고서 초안 잡아줘. 결과 표는 3개로 정리해줘.',pjTsum(2,'어제'))
   +pjUserPost(p,'4:02','@일반물리학 AI 3장 연습문제에서 내가 자주 틀리는 유형 분석해줘.',pjTsum(3,'어제'))
   +'<div class="pj-day">오늘</div>'
   +'<div class="pj-post"><div class="pj-pava ai">g(π)</div><div class="pj-body">'
   +'<div class="pj-who"><b>'+escapeHtml(p.agent)+'</b><span class="pj-app">APP</span><span class="pj-time">10:00</span></div>'
   +'<div class="pj-text"><span class="mono-badge">memory.md</span> 일일 업데이트 — 어제 대화 2건을 요약해 반영했어요</div></div></div>'
   +pjUserPost(p,'1:30','@일반물리학 AI 다음 주 중간시험 범위(3~5장) 요약하고, 그 범위에서 변형 문제 20개 만들어줘.',thread);
}
function pjWelcome(p){
  return '<div class="pj-day">오늘</div>'
   +'<div class="pj-post"><div class="pj-pava ai">g(π)</div><div class="pj-body">'
   +'<div class="pj-who"><b>'+escapeHtml(p.agent)+'</b><span class="pj-app">APP</span><span class="pj-time">방금</span></div>'
   +'<div class="pj-text">안녕하세요, <b>'+escapeHtml(p.agent)+'</b>예요. 방금 만들어졌어요.</div>'
   +'<div class="tool-card"><b>'+SVG_MEM+'폴더 파악 완료</b><div class="rail-meta" style="margin-top:5px">'+escapeHtml(p.folder)+' 폴더 하위 항목 '+p.items+'개 인덱싱 · memory.md 생성</div></div>'
   +'<div class="pj-text" style="margin-top:8px">이 채널에서 무엇이든 시켜보세요. 게시글마다 쓰레드로 답하고, 대화 요약은 제 메모리에 쌓여요. 저는 이 폴더 밖에는 접근할 수 없어요.</div>'
   +'</div></div>';
}
function pjLiveThreadHTML(p){
  return '<div class="pj-thread">'
   +pjThreadReply(p,'방금','확인했어요. '+escapeHtml(p.folder)+' 폴더와 메모리를 바탕으로 처리할게요. 필요하면 툴 에이전트를 호출하고, 완료되면 이 쓰레드에 결과를 올려드려요.'
     +'<div class="mem-note">'+SVG_MEM+'<span>메모리에 반영 예정 — 이 요청의 요약</span></div>')
   +'</div>';
}
function pjStoredMsgs(p){
  return (p.msgs||[]).map(m=>pjUserPost(p,'오늘',m.text,'<div class="pj-slot">'+(m.replied?pjLiveThreadHTML(p):'')+'</div>')).join('');
}
function pjRailHTML(p){
  const mem=(p.memory&&p.memory.length)?p.memory.map(m=>'<div>'+escapeHtml(m)+'</div>').join(''):'<div style="color:#9C9C9A">아직 비어 있어요 — 대화할수록 채워져요</div>';
  const tools=[['solver','문제 풀이'],['generator','문제 생성'],['figure','시각화'],['canvas','캔버스'],['report-writer','문서 작성'],['chat','채팅']]
    .map(t=>'<span class="tool-chip" data-nav="'+t[0]+'">'+t[1]+'</span>').join('');
  return '<aside class="ma-rail">'
   +'<div class="rail-h">프로젝트 정보</div>'
   +'<div class="rail-card" style="margin-top:12px"><div style="display:flex;gap:10px;align-items:center"><div class="pj-pava ai" style="width:34px;height:34px">g(π)</div><div style="min-width:0"><b id="pjAgName" style="font-size:13.5px;outline:none">'+escapeHtml(p.agent)+'</b><div class="rail-meta" style="margin-top:2px">이 프로젝트를 관장하는 AI · 온라인</div></div></div>'
   +'<div class="rail-btns"><button class="b1" id="pjRename">이름 수정</button></div></div>'
   +'<div class="rail-card"><b style="display:flex;align-items:center;gap:7px">'+SVG_FLD+'연결 폴더</b><div class="rail-meta">'+escapeHtml(p.folder)+' — 하위 항목 '+p.items+'개 접근</div>'
   +'<div class="rail-btns"><button class="b1" id="pjSeeFiles">프로젝트 파일 보기</button></div></div>'
   +'<div class="rail-card" style="background:#FAFAF8"><b style="display:flex;align-items:center;gap:7px">'+SVG_LOCK+'접근 범위</b><div class="rail-meta">이 폴더 밖 데이터에는 접근할 수 없어요. 맥락은 이 채널에서 나눈 대화만 사용해요.</div></div>'
   +'<div class="rail-sec">에이전트 메모리 <span class="mono-badge">memory.md</span></div>'
   +'<div class="rail-card"><div class="mem-ul">'+mem+'</div><div class="rail-meta" style="margin-top:10px">대화가 끝나면 요약이 자동 반영돼요 · 마지막 업데이트 '+(p.memUpdated||'방금')+'</div></div>'
   +'<div class="rail-sec">부리는 툴 에이전트</div>'
   +'<div class="tier-tools" style="justify-content:flex-start">'+tools+'</div>'
   +'</aside>';
}
function pjFileRow(f,i){
  const ic=f.type==='folder'?MINI_FOLDER:fIcon(f.kind,f.kind==='yt'?22:18);
  return '<div class="pjf-row'+(f.fresh?' fresh':'')+'" data-fi="'+i+'">'
   +'<span class="pjf-ic">'+ic+'</span>'
   +'<span class="pjf-name"><span>'+escapeHtml(f.name)+'</span>'+(f.ai?'<span class="ai-tag">✦ '+escapeHtml(f.ai)+'</span>':'')+'</span>'
   +'<span class="pjf-meta">'+escapeHtml(f.meta||'')+'</span>'
   +'<span class="pjf-time">'+escapeHtml(f.time||'')+'</span>'
   +'<button class="tdots" title="더보기">'+ICON_DOTS+'</button></div>';
}
let pjFlat=[];
function pjTreeFlat(p){
  const q=(p.fq||'').trim().toLowerCase();
  const out=[{root:true,depth:0,isF:true}];
  const match=f=>f.name.toLowerCase().includes(q);
  const anyMatch=f=>match(f)||((f.children||[]).some(anyMatch));
  function walk(list,depth){
    const fo=list.filter(x=>x.type==='folder'),fi=list.filter(x=>x.type!=='folder');
    fo.concat(fi).forEach(f=>{
      if(q&&!anyMatch(f))return;
      const isF=f.type==='folder';
      out.push({f:f,depth:depth,isF:isF});
      if(isF&&(f.open||q))walk(f.children||[],depth+1);
    });
  }
  if(p.rootOpen!==false||q)walk(p.files||[],1);
  return out;
}
function renderPjfList(p){
  pjFlat=pjTreeFlat(p);
  const q=(p.fq||'').trim();
  const rows=pjFlat.map((n,i)=>{
    if(n.root){
      const open=(p.rootOpen!==false);
      return '<div class="pjf-row pjt-row pjt-root'+(open?' open':'')+'" data-fi="'+i+'">'
       +'<span class="pjt-chev">'+CHEV_R+'</span>'
       +'<span class="pjf-ic">'+(open?FLD_OPEN:MINI_FOLDER)+'</span>'
       +'<span class="pjf-name"><span>'+escapeHtml(p.folder)+'</span></span>'
       +'<span class="pjf-meta">항목 '+p.items+'개</span><span class="pjf-time"></span><span style="width:28px"></span></div>';
    }
    const f=n.f;
    let guides='';for(let d=1;d<n.depth;d++)guides+='<span class="tg"></span>';
    if(n.isF){
      const open=!!(f.open||q);
      return '<div class="pjf-row pjt-row'+(open?' open':'')+(f.fresh?' fresh':'')+'" data-fi="'+i+'">'
       +guides+'<span class="pjt-chev">'+CHEV_R+'</span>'
       +'<span class="pjf-ic">'+(open?FLD_OPEN:MINI_FOLDER)+'</span>'
       +'<span class="pjf-name"><span>'+escapeHtml(f.name)+'</span></span>'
       +'<span class="pjf-meta">'+escapeHtml(f.meta||'')+'</span>'
       +'<span class="pjf-time">'+escapeHtml(f.time||'')+'</span>'
       +'<button class="tdots" title="더보기">'+ICON_DOTS+'</button></div>';
    }
    return '<div class="pjf-row pjt-row'+(f.fresh?' fresh':'')+'" data-fi="'+i+'">'
     +guides+'<span class="pjt-sp"></span>'
     +'<span class="pjf-ic">'+fIcon(f.kind,f.kind==='yt'?20:17)+'</span>'
     +'<span class="pjf-name"><span>'+escapeHtml(f.name)+'</span>'+(f.ai?'<span class="ai-tag">✦ '+escapeHtml(f.ai)+'</span>':'')+'</span>'
     +'<span class="pjf-meta">'+escapeHtml(f.meta||'')+'</span>'
     +'<span class="pjf-time">'+escapeHtml(f.time||'')+'</span>'
     +'<button class="tdots" title="더보기">'+ICON_DOTS+'</button></div>';
  }).join('');
  const empty=(pjFlat.length<=1)?'<div class="pjf-empty">'+(q?'검색 결과가 없어요':'아직 파일이 없어요<br>업로드하거나 에이전트 결과물이 쌓이면 여기에 보여요')+'</div>':'';
  $('#pjfList').innerHTML='<div class="pjf-head"><span style="flex:1;padding-left:8px">이름</span><span class="pjf-meta">유형 · 크기</span><span class="pjf-time">수정</span><span style="width:28px"></span></div>'+rows+empty;
}
function pjFilesPaneHTML(p){
  return '<div class="pjf-top"><div class="pjf-crumb">'+SVG_FLD+'<span>'+escapeHtml(p.folder)+'</span><span class="sep">·</span><span style="color:#9C9C9A;font-weight:400">항목 '+p.items+'개</span></div>'
   +'<div class="pjf-search"><svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="9" cy="9" r="5.5"/><path d="m13.2 13.2 3.3 3.3"/></svg><input id="pjfSearch" placeholder="파일 검색" value="'+escapeHtml(p.fq||'')+'"></div>'
   +'<button class="pjf-up pjf-fold" id="pjfFold" title="모두 접기 / 펼치기">'+FOLD_SVG+'</button>'
   +'<button class="pjf-up" id="pjfUp">'+UP_SVG_S+'업로드</button></div>'
   +'<div class="pjf-hint">'+SVG_LOCK+'<span>'+escapeHtml(p.agent)+'의 접근 범위 — 드라이브의 "'+escapeHtml(p.folder)+'" 폴더와 항상 같아요 · 에이전트 결과물도 여기에 자동 저장돼요</span></div>'
   +'<div class="pjf-list" id="pjfList"></div>';
}
function renderProject(p){
  const tab=state.pjTab||'msg';
  const head='<div class="pj-head">'
   +'<div class="pj-title"><span class="hash">#</span>'+escapeHtml(p.name)
   +'<span class="pj-badge ai" style="margin-left:8px"><span class="pj-mini" style="width:16px;height:16px;font-size:6px">g(π)</span>'+escapeHtml(p.agent)+'</span></div>'
   +'<div class="pj-badges">'
   +'<span class="pj-badge" id="pjBadgeFolder" style="cursor:pointer" title="프로젝트 파일 보기">'+SVG_FLD+escapeHtml(p.folder)+' 폴더 연결</span>'
   +'<span class="pj-badge">하위 항목 '+p.items+'개 접근</span>'
   +'<span class="pj-badge">'+SVG_LOCK+'폴더 밖 접근 불가</span>'
   +'</div>'
   +'<div class="pj-tabs">'
   +'<span class="pj-tab'+(tab==='msg'?' on':'')+'" data-tab="msg">메시지</span>'
   +'<span class="pj-tab'+(tab==='files'?' on':'')+'" data-tab="files">파일<em>'+p.items+'</em></span>'
   +'<span class="pj-tab'+(tab==='pins'?' on':'')+'" data-tab="pins">고정됨<em>'+((p.pins||[]).length)+'</em></span>'
   +'</div></div>';
  const msgs=(p.id==='p1'?pjP1HTML(p):pjWelcome(p))+pjStoredMsgs(p);
  const composer='<div class="pj-composer"><div class="ccard" data-attach><div class="att-row"></div>'
   +'<textarea id="pjTa" placeholder="#'+escapeHtml(p.name)+'에 메시지 보내기 — @'+escapeHtml(p.agent)+' 멘션으로 일을 시켜보세요"></textarea>'
   +'<div class="crow"><button class="plus" title="첨부">'+PLUS_SVG+'</button><button class="send" id="pjSendBtn" style="margin-left:auto" title="보내기">'+SEND_SVG+'</button></div></div>'
   +'<div class="pj-hint">게시글당 1이슈 — 답변은 쓰레드로 정리되고, 대화 요약은 '+escapeHtml(p.agent)+' 메모리에 쌓여요</div></div>';
  $('#view-project').innerHTML='<div class="pj-main">'+head
   +'<div class="pj-pane'+(tab==='msg'?' on':'')+'"><div class="pj-msgs" id="pjMsgs">'+msgs+'</div>'+composer+'</div>'
   +'<div class="pj-pane'+(tab==='files'?' on':'')+'">'+pjFilesPaneHTML(p)+'</div>'
   +'<div class="pj-pane'+(tab==='pins'?' on':'')+'"><div class="pjf-hint" style="padding-top:14px">채널에서 고정한 항목이 모여요 — 시험 전에 바로 찾는 용도예요</div><div class="pjf-list" id="pjPinList"></div></div>'
   +'</div>'+pjRailHTML(p);
  if(tab==='files')renderPjfList(p);
  if(tab==='pins')$('#pjPinList').innerHTML=((p.pins&&p.pins.length)?p.pins.map(pjFileRow).join(''):'<div class="pjf-empty">아직 고정한 항목이 없어요</div>');
  $$('#view-project .pj-tab').forEach(t=>t.addEventListener('click',()=>{state.pjTab=t.dataset.tab;renderProject(p);}));
  $('#pjBadgeFolder').addEventListener('click',()=>{state.pjTab='files';renderProject(p);});
  const ta=$('#pjTa'),btn=$('#pjSendBtn');
  if(ta){
    ta.addEventListener('input',()=>btn.classList.toggle('ready',ta.value.trim().length>0));
    const doSend=()=>{const t=ta.value.trim();if(!t)return;pjSendMsg(p,t);ta.value='';btn.classList.remove('ready');};
    btn.addEventListener('click',doSend);
    ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doSend();}});
  }
  const fs=$('#pjfSearch');
  if(fs){
    fs.addEventListener('input',e=>{p.fq=e.target.value;renderPjfList(p);});
    $('#pjfUp').addEventListener('click',()=>{pjUpDest=p.id;$('#pjUpFile').click();});
    $('#pjfFold').addEventListener('click',()=>{
      const hasOpen=list=>list.some(f=>f.type==='folder'&&(f.open||hasOpen(f.children||[])));
      const anyOpen=hasOpen(p.files||[]);
      const setAll=(list,v)=>list.forEach(f=>{if(f.type==='folder'){f.open=v;setAll(f.children||[],v);}});
      setAll(p.files||[],!anyOpen);
      if(!anyOpen)p.rootOpen=true;
      renderPjfList(p);
    });
    $('#pjfList').addEventListener('click',e=>{
      if(e.target.closest('.tdots'))return;
      const r=e.target.closest('[data-fi]');if(!r)return;
      const n=pjFlat[+r.dataset.fi];if(!n)return;
      if(n.root){p.rootOpen=(p.rootOpen===false);renderPjfList(p);return;}
      if(n.isF){n.f.open=!n.f.open;renderPjfList(p);return;}
      if(OPEN_KINDS[n.f.kind])openEditor(n.f.kind,n.f.name+(ED_EXT[n.f.kind]||''));
    });
  }
  const pins=$('#pjPinList');
  if(pins)pins.addEventListener('click',e=>{
    const r=e.target.closest('[data-fi]');if(!r)return;
    const f=(p.pins||[])[+r.dataset.fi];
    if(f&&OPEN_KINDS[f.kind])openEditor(f.kind,f.name+(ED_EXT[f.kind]||''));
  });
  $$('#view-project .file-chip[data-open]').forEach(c=>c.addEventListener('click',()=>openEditor(c.dataset.open,c.dataset.name)));
  $$('#view-project [data-nav]').forEach(n=>n.addEventListener('click',()=>go(n.dataset.nav)));
  $('#pjSeeFiles').addEventListener('click',()=>{state.pjTab='files';renderProject(p);});
  const nameEl=$('#pjAgName');
  $('#pjRename').addEventListener('click',()=>{nameEl.contentEditable='true';nameEl.focus();});
  nameEl.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();nameEl.blur();}});
  nameEl.addEventListener('blur',()=>{
    nameEl.contentEditable='false';
    const v=nameEl.textContent.trim();
    if(v&&v!==p.agent){p.agent=v;renderProjects();renderProject(p);sync();}
  });
  if(tab==='msg'){const mw=$('#pjMsgs');mw.scrollTop=mw.scrollHeight;}
}
function pjSendMsg(p,text){
  p.msgs=p.msgs||[];
  const entry={text:text,replied:false};
  p.msgs.push(entry);
  const idx=++pjSeq;
  const wrap=$('#pjMsgs');
  wrap.insertAdjacentHTML('beforeend','<div class="pj-post"><div class="pj-pava">김</div><div class="pj-body"><div class="pj-who"><b>김튜링</b><span class="pj-time">방금</span></div><div class="pj-text">'+pjFmt(p,text)+'</div><div class="pj-slot" id="pjSlot'+idx+'"></div></div></div>');
  wrap.scrollTop=wrap.scrollHeight;
  setTimeout(()=>{
    entry.replied=true;
    const slot=$('#pjSlot'+idx);
    if(slot)slot.innerHTML=pjLiveThreadHTML(p);
    const w=$('#pjMsgs');if(w)w.scrollTop=w.scrollHeight;
  },750);
}

/* 새 프로젝트 만들기 */
let projSel=null;
function openProjModal(){
  projSel=null;
  $('#projName').value='';
  $('#projCreate').disabled=true;
  const linked={};PROJECTS.forEach(p=>linked[p.folder]=p.agent);
  const folders=driveItems.filter(i=>i.type==='folder');
  $('#projFolders').innerHTML=folders.map(f=>{
    const used=linked[f.name];
    return '<div class="pick-row'+(used?' dis':'')+'" data-f="'+(used?'':escapeHtml(f.name))+'">'
     +'<span class="pick-ic">'+MINI_FOLDER+'</span>'
     +'<span class="pick-name">'+escapeHtml(f.name)+'</span>'
     +'<span class="pick-meta">'+(used?'이미 연결됨 · '+escapeHtml(used):escapeHtml(f.meta)+' 접근')+'</span>'
     +'<svg class="pck" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 10.5 3.5 3.5 7.5-8"/></svg>'
     +'</div>';
  }).join('')||'<div style="padding:28px 12px;color:#9C9C9A;font-size:13px;text-align:center">드라이브에 폴더가 없어요 — 먼저 폴더를 만들어 주세요</div>';
  $('#projDim').classList.add('on');
}
function closeProjModal(){$('#projDim').classList.remove('on');}
$('#projFolders').addEventListener('click',e=>{
  const r=e.target.closest('.pick-row');
  if(!r||r.classList.contains('dis'))return;
  $$('#projFolders .pick-row').forEach(x=>x.classList.remove('on'));
  r.classList.add('on');
  projSel=r.dataset.f;
  $('#projName').value=projSel+' AI';
  $('#projCreate').disabled=false;
});
$('#projClose').addEventListener('click',closeProjModal);
$('#projCancel').addEventListener('click',closeProjModal);
$('#projDim').addEventListener('click',e=>{if(e.target===$('#projDim'))closeProjModal();});
$('#projCreate').addEventListener('click',()=>{
  if(!projSel)return;
  const f=driveItems.find(i=>i.type==='folder'&&i.name===projSel);
  const items=f?parseInt((f.meta.match(/\d+/)||['0'])[0],10):0;
  const id='p'+(PROJECTS.length+1);
  const agent=($('#projName').value.trim()||projSel+' AI');
  const preset=(FOLDER_FILES[projSel]||[]).map(f=>Object.assign({},f));
  const cnt=preset.length||items;
  PROJECTS.push({id:id,name:projSel,agent:agent,folder:projSel,items:cnt,msgs:[],files:preset,pins:[],cwd:null,fq:'',
    memory:[projSel+' 폴더 구조 파악 완료 — 하위 항목 '+cnt+'개'],memUpdated:'방금'});
  renderProjects();
  closeProjModal();
  go('project-'+id);
});

/* ================= 나의 마스터 AI (1:1 커맨드 센터) ================= */

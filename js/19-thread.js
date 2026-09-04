/* ---------- 프로젝트 채널 · 쓰레드 패널(.th-) + 임베디드 아티팩트(.art-) ----------
   가운데 채널은 슬랙처럼 게시글만 보이고(11-projects.js), 게시글을 누르면 오른쪽에 이 패널이 슬라이드로 뜬다.
   원글 → "답글 N개" 구분선 → 답글 목록 → 답글 입력창. 답글은 사람의 댓글일 수도, 툴 AI의 GUI 결과물(아티팩트)일
   수도 있다 — 문서 · 문제 세트 · 문제 풀이 · 도식 · PPT · 표 · 분석. AI 리턴 하나가 답글 하나이고 답글 수에도 센다.
   상태는 state.thread = {pid, postId} 하나. 표시/숨김은 sync()가 하고, 프로필 패널이 열리면 잠시 숨었다가 돌아온다.
   AI의 단계별 답글 연출(pjRunAI)도 여기 — 게시글의 @멘션과 쓰레드 안 후속 요청이 같은 경로를 탄다. */

function thProject(){return state.thread?PROJECTS.find(x=>x.id===state.thread.pid):null;}
function thPost(){const p=thProject();return p?((p.posts||[]).find(x=>x.id===state.thread.postId)||null):null;}
function thOpenOn(p,post){return !!(state.thread&&state.thread.pid===p.id&&state.thread.postId===post.id);}

/* ================= 아티팩트 ================= */
const ART_BADGE={doc:['W','#4E86D8'],pdf:['PDF','#E2574C'],ppt:['P','#D8681B'],xlsx:['X','#2E9E5B'],png:['PNG','#8A65C9']};
function artFileName(f){return f?f.name+(ED_EXT[f.kind]||(f.kind==='png'?'.png':'')):'';}
function artIcon(a){
  const f=a.file;
  if(f&&ART_BADGE[f.kind]){const b=ART_BADGE[f.kind];return '<span class="ed-badge" style="background:'+b[1]+(b[0].length>1?';font-size:8px':'')+'">'+b[0]+'</span>';}
  return '<span class="ed-badge" style="background:#1F1F1D">'+SVG_TOOL+'</span>';
}
function artHTML(p,a){
  const fn=artFileName(a.file);
  const btns=[];
  if(a.file&&OPEN_KINDS[a.file.kind])btns.push('<button class="pri" data-art-open="'+a.file.kind+'" data-name="'+escapeHtml(fn)+'">편집기에서 열기</button>');
  if(a.file)btns.push('<button data-art-drive>드라이브에서 보기</button>');
  if(a.kind==='solve')btns.push('<button data-nav="solver">문제 풀이에서 열기</button>');
  return '<div class="art art-k-'+a.kind+'"><div class="art-h">'+artIcon(a)+'<b>'+escapeHtml(a.title)+'</b>'
   +'<span class="art-tool">'+escapeHtml(a.tool||'')+(fn?' · '+escapeHtml(fn)+' · 프로젝트 폴더에 저장됨':'')+'</span></div>'
   +'<div class="art-b">'+artBody(p,a)+'</div>'
   +(btns.length?'<div class="art-f">'+btns.join('')+'</div>':'')+'</div>';
}
function artBody(p,a){
  if(a.kind==='doc'){
    const blocks=(a.blocks||[]).map(b=>{
      if(b.h)return '<h5>'+escapeHtml(b.h)+'</h5>';
      if(b.p)return '<p>'+escapeHtml(b.p)+'</p>';
      if(b.table)return '<table class="art-table"><thead><tr>'+b.table.head.map(h=>'<th>'+escapeHtml(h)+'</th>').join('')+'</tr></thead><tbody>'+b.table.rows.map(r=>'<tr>'+r.map(c=>'<td>'+escapeHtml(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
      if(b.more)return '<div class="more">'+escapeHtml(b.more)+'</div>';
      return '';
    }).join('');
    return '<div class="art-doc"><div class="art-page"><h4>'+escapeHtml(a.title)+'</h4><div class="meta"><span data-uname>'+escapeHtml(USER.username)+'</span> · '+escapeHtml(a.meta||p.name)+'</div>'+blocks+'</div></div>';
  }
  if(a.kind==='quiz'){
    return '<div class="art-quiz"><ol>'+a.items.map(it=>'<li><span class="n">'+it.n+'</span><span>'+escapeHtml(it.q)+'</span></li>').join('')+'</ol>'
     +'<div class="more">외 '+(a.total-a.items.length)+'문항 · '+escapeHtml(a.note||'난이도 혼합 · 정답·해설 포함')+'</div></div>';
  }
  if(a.kind==='solve'){
    return '<div class="art-solve"><div class="prob">'+escapeHtml(a.problem)+'</div><div class="art-steps">'
     +a.steps.map((s,i)=>'<div class="art-step"><span class="n">'+(i+1)+'</span><div><b>'+escapeHtml(s.t)+'</b><span>'+escapeHtml(s.f)+'</span></div></div>').join('')
     +'</div><div class="art-ans">답: '+escapeHtml(a.answer)+'</div></div>';
  }
  if(a.kind==='figure'){
    return '<div class="art-fig">'+artFigureSVG(a.svg)+'<div class="cap">'+escapeHtml(a.cap||'')+'</div></div>';
  }
  if(a.kind==='ppt'){
    return '<div class="art-ppt">'+a.slides.map((k,i)=>'<div class="art-slide">'+pmkCover(k)+'<i>'+(i+1)+'</i></div>').join('')
     +'<div class="art-ppt-cap">'+a.n+'장 중 '+a.slides.length+'장 미리보기 · '+escapeHtml(a.note||'덱 스타일·템플릿은 편집기에서')+'</div></div>';
  }
  if(a.kind==='sheet'){
    return '<table class="art-sheet"><thead><tr>'+a.head.map(h=>'<th>'+escapeHtml(h)+'</th>').join('')+'</tr></thead><tbody>'
     +a.rows.map(r=>'<tr>'+r.map(c=>'<td>'+escapeHtml(String(c))+'</td>').join('')+'</tr>').join('')+'</tbody></table>'
     +(a.note?'<div class="art-note">'+escapeHtml(a.note)+'</div>':'');
  }
  if(a.kind==='analysis'){
    return '<div class="art-ana">'+a.bars.map(b=>'<div class="art-bar"><span>'+escapeHtml(b.l)+'</span><i><b style="width:'+b.v+'%"></b></i><em>'+b.v+'%</em></div>').join('')
     +(a.note?'<div class="note">'+escapeHtml(a.note)+'</div>':'')+'</div>';
  }
  return '';
}
/* 도식 — 인라인 SVG. projectile: 포물선 운동의 초기 속도 벡터 분해 / concept: 일반 개념 다이어그램 */
function artFigureSVG(key){
  if(key==='projectile')return '<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard,system-ui,sans-serif">'
   +'<defs><marker id="arA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5 0 10z" fill="#1F1F1D"/></marker><marker id="arB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5 0 10z" fill="#EE7732"/></marker></defs>'
   +'<line x1="40" y1="210" x2="500" y2="210" stroke="#1F1F1D" stroke-width="1.5" marker-end="url(#arA)"/><line x1="40" y1="210" x2="40" y2="20" stroke="#1F1F1D" stroke-width="1.5" marker-end="url(#arA)"/>'
   +'<text x="492" y="232" font-size="12" fill="#55554F">x</text><text x="26" y="24" font-size="12" fill="#55554F">y</text>'
   +'<path d="M40 210 Q 240 -40 440 210" fill="none" stroke="#C9C9C7" stroke-width="2" stroke-dasharray="5 5"/>'
   +'<line x1="40" y1="210" x2="176" y2="132" stroke="#EE7732" stroke-width="2.5" marker-end="url(#arB)"/>'
   +'<line x1="40" y1="210" x2="176" y2="210" stroke="#EE7732" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arB)"/>'
   +'<line x1="176" y1="210" x2="176" y2="132" stroke="#EE7732" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arB)"/>'
   +'<path d="M78 210 A 38 38 0 0 0 73 191" fill="none" stroke="#1F1F1D" stroke-width="1.2"/><text x="84" y="200" font-size="12" fill="#1F1F1D">θ = 30°</text>'
   +'<text x="98" y="160" font-size="12.5" font-weight="600" fill="#B45816">v₀ = 20 m/s</text><text x="96" y="228" font-size="12" fill="#B45816">vₓ = v₀cosθ ≈ 17.3 m/s</text><text x="184" y="176" font-size="12" fill="#B45816">v_y = v₀sinθ = 10 m/s</text>'
   +'<line x1="240" y1="210" x2="240" y2="85" stroke="#9C9C9A" stroke-width="1" stroke-dasharray="3 3"/><text x="246" y="96" font-size="11.5" fill="#55554F">H ≈ 5.1 m</text>'
   +'<line x1="40" y1="242" x2="440" y2="242" stroke="#9C9C9A" stroke-width="1"/><text x="216" y="238" font-size="11.5" fill="#55554F" text-anchor="middle">R ≈ 35.3 m</text>'
   +'</svg>';
  return '<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard,system-ui,sans-serif">'
   +'<defs><marker id="arC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5 0 10z" fill="#9C9C9A"/></marker></defs>'
   +[['핵심 개념',40],['정의·성질',200],['적용 예시',360]].map((b,i)=>'<rect x="'+b[1]+'" y="70" width="120" height="56" rx="10" fill="'+(i===0?'#FDEEE0':'#F7F7F5')+'" stroke="'+(i===0?'#F2C29B':'#E3E3E1')+'"/><text x="'+(b[1]+60)+'" y="103" font-size="13" text-anchor="middle" fill="#1F1F1D" font-weight="600">'+b[0]+'</text>').join('')
   +'<line x1="160" y1="98" x2="198" y2="98" stroke="#9C9C9A" stroke-width="1.5" marker-end="url(#arC)"/><line x1="320" y1="98" x2="358" y2="98" stroke="#9C9C9A" stroke-width="1.5" marker-end="url(#arC)"/>'
   +'<text x="260" y="170" font-size="11.5" text-anchor="middle" fill="#9C9C9A">강의 자료 기준 · 편집 가능한 SVG</text></svg>';
}
/* 라이브 라우트 → 아티팩트. p1(일반물리학)은 구체적인 내용, 다른 과목은 과목 이름을 채운 일반 템플릿 */
function artFromRoute(p,route,fname){
  const phys=p.id==='p1';
  if(route.art==='solve')return phys
    ?{kind:'solve',tool:'문제 풀이 툴',title:'3번 풀이',problem:'3. 초기 속도 20 m/s, 발사각 30°로 던진 물체의 최고 높이와 수평 도달 거리를 구하시오. (g = 9.8 m/s²)',
      steps:[{t:'속도 분해',f:'vₓ = 20cos30° ≈ 17.3 m/s · v_y = 20sin30° = 10 m/s'},{t:'최고 높이',f:'H = v_y² / 2g = 100 / 19.6 ≈ 5.10 m'},{t:'비행 시간과 도달 거리',f:'T = 2v_y / g ≈ 2.04 s · R = vₓ·T ≈ 35.3 m'}],answer:'H ≈ 5.1 m, R ≈ 35.3 m'}
    :{kind:'solve',tool:'문제 풀이 툴',title:'1번 풀이',problem:'1. '+p.name+' 연습문제 1번 — 폴더의 문제지에서 가져왔어요.',
      steps:[{t:'조건 정리',f:'문제에서 주어진 값과 구할 값을 구분'},{t:'핵심 개념 적용',f:p.name+' 강의 노트의 정의를 그대로 적용'},{t:'검산',f:'단위와 부호 확인 · 극단값 대입'}],answer:'풀이 완료 — 자세한 과정은 문제 풀이 화면에서'};
  if(route.art==='quiz')return {kind:'quiz',tool:route.tool,title:fname+' · 20문항',total:20,file:{kind:'pdf',name:fname},
    items:phys?[{n:1,q:'포물선 운동에서 발사각이 45°일 때 수평 도달 거리가 최대가 되는 이유를 식으로 보이시오.'},{n:2,q:'질량 2 kg의 물체가 마찰 없는 30° 경사면을 내려올 때 가속도의 크기는?'},{n:3,q:'용수철 상수 200 N/m인 용수철을 0.1 m 압축했을 때 저장된 탄성 퍼텐셜 에너지는?'}]
     :[{n:1,q:p.name+' 핵심 개념의 정의를 쓰고, 성립 조건을 설명하시오.'},{n:2,q:'강의 노트의 예제를 변형한 계산 문제 — 조건이 바뀌면 결과가 어떻게 달라지는가?'},{n:3,q:'두 개념의 차이를 예시와 함께 비교하시오.'}]};
  if(route.art==='figure')return {kind:'figure',tool:route.tool,title:fname,file:{kind:'png',name:fname},svg:phys?'projectile':'concept',cap:phys?'초기 속도 v₀를 x·y 성분으로 분해 — 최고 높이 H와 도달 거리 R':p.name+' 핵심 개념의 관계도'};
  if(route.art==='ppt')return {kind:'ppt',tool:route.tool,title:fname+' · 8장',n:8,file:{kind:'ppt',name:fname},slides:['dark','light','sand','plain'],note:'개요 8장 → 슬라이드 · 폴더 자료·메모리 기준'};
  /* doc — 보고서 / 요약 */
  const summary=/요약/.test(route.base);
  return {kind:'doc',tool:route.tool,title:fname,meta:p.name+' · 오늘',file:{kind:'doc',name:fname},
    blocks:summary
     ?[{h:'1. 범위와 핵심 개념'},{p:'"'+p.folder+'" 폴더의 강의 자료와 메모리를 바탕으로 시험 범위의 핵심만 추렸어요.'},{h:'2. 개념 정리'},{table:{head:['개념','한 줄 정리','출처'],rows:[['핵심 개념 A','정의와 성립 조건','강의 노트'],['핵심 개념 B','대표 공식과 단위','연습문제'],['핵심 개념 C','자주 틀리는 포인트','메모리']]}},{more:'3. 예제 · 4. 체크리스트 — 이하 본문은 편집기에서 확인하세요'}]
     :[{h:'1. 개요'},{p:'"'+p.folder+'" 폴더의 자료와 메모리를 바탕으로 초안을 구성했어요. 결과 표와 논의는 자료 기준으로 채웠어요.'},{h:'2. 결과'},{table:{head:['항목','값','비고'],rows:[['측정 1','—','자료 기준'],['측정 2','—','자료 기준'],['측정 3','—','자료 기준']]}},{more:'3. 논의 · 4. 결론 — 이하 본문은 편집기에서 확인하세요'}]};
}

/* ================= 쓰레드 패널 ================= */
function thReplyBody(p,r){
  const txt=r.who==='user'?pjFmt(p,r.text||''):(r.text||'');
  if(r.type==='tool')return (txt?'<div class="pj-text">'+txt+'</div>':'')+pjToolCardHTML(p,r.tool);
  if(r.type==='artifact')return (txt?'<div class="pj-text">'+txt+'</div>':'')+artHTML(p,r.art);
  if(r.type==='file')return (txt?'<div class="pj-text">'+txt+'</div>':'')+pjFileChipHTML(r.file);
  if(r.type==='memory')return '<div class="mem-note" style="margin-top:2px">'+SVG_MEM+'<span>'+txt+'</span></div>';
  return '<div class="pj-text">'+txt+'</div>';
}
function thReplyHTML(p,r){
  const ai=r.who==='ai';
  return '<div class="th-r">'+(ai?'<div class="pj-pava ai av" data-pf="agent">'+avatarFor(p,36)+'</div>':'<div class="pj-pava user" data-pf="user">'+userAvatar(36)+'</div>')
   +'<div class="th-rb"><div class="pj-who">'+(ai?'<b data-pf="agent" class="pf-link">'+escapeHtml(p.agent)+'</b><span class="pj-app">APP</span>':'<b data-pf="user" class="pf-link" data-uname>'+escapeHtml(USER.username)+'</b>')
   +'<span class="pj-time">'+escapeHtml(r.time)+'</span></div><div class="th-rt">'+thReplyBody(p,r)+'</div></div></div>';
}
function renderThread(){
  const p=thProject(),post=thPost();
  if(!p||!post){closeThread();return;}
  $('#thSub').textContent='#'+p.name;
  $('#thBody').innerHTML=pjPostHTML(p,post,true)
   +'<div class="th-div" id="thDiv"><span>답글 '+post.replies.length+'개</span></div>'
   +'<div id="thList">'+post.replies.map(r=>thReplyHTML(p,r)).join('')+'</div>';
  const ta=$('#thTa');if(ta)ta.placeholder='답글 달기 — '+p.agent+'에게 이어서 시킬 수도 있어요';
}
/* 답글 추가 = 데이터 + 가운데 요약 + (열려 있으면) 패널. 패널이 다른 화면에 있어도 데이터는 항상 쌓인다 */
function thAddReply(p,post,r){
  post.replies.push(r);
  pjRefreshPost(p,post);
  if(thOpenOn(p,post)){
    const l=$('#thList');
    if(l){l.insertAdjacentHTML('beforeend',thReplyHTML(p,r));const d=$('#thDiv span');if(d)d.textContent='답글 '+post.replies.length+'개';const b=$('#thBody');b.scrollTop=b.scrollHeight;}
  }
  return r;
}
function openThread(p,postId,opts){
  opts=opts||{};
  if(state.profile)closeProfile();            /* 오른쪽 슬롯은 하나 — 게시글을 눌렀으면 쓰레드가 이긴다 */
  state.thread={pid:p.id,postId:postId};
  renderThread();sync();pjMarkSel(p);
  const b=$('#thBody');if(b)b.scrollTop=opts.bottom?b.scrollHeight:0;
  if(opts.focus){const ta=$('#thTa');if(ta)ta.focus();}
}
function closeThread(){state.thread=null;sync();pjMarkSel(state.view==='project'?PROJECTS.find(x=>x.id===state.project):null);}
function pjMarkSel(p){
  $$('#pjMsgs .pj-post').forEach(el=>el.classList.toggle('sel',!!(p&&state.thread&&state.thread.pid===p.id&&el.dataset.post===state.thread.postId)));
}

/* ---- 쓰레드 안 답글 보내기 — AI가 이미 답한 쓰레드에서는 멘션 없이도 이어서 답한다 ---- */
function thSend(){
  const p=thProject(),post=thPost(),ta=$('#thTa');if(!p||!post||!ta)return;
  const t=ta.value.trim();if(!t)return;
  ta.value='';$('#thSendBtn').classList.remove('ready');pjMentionPop(p,ta,false);
  thAddReply(p,post,{who:'user',time:pjTime(),type:'text',text:t});
  if(post.replies.some(r=>r.who==='ai')||pjMentions(p,t))pjRunAI(p,post,t,{inThread:true});
}

/* ---- AI의 단계별 답글 연출 — 확인 → (툴 실행 → 아티팩트) → 메모리 반영 ----
   결과 파일은 프로젝트 폴더(= 드라이브)에 실제로 쌓이고 파일 탭·드라이브·사이드바 개수가 따라온다 */
function pjRunAI(p,post,text,opts){
  opts=opts||{};
  const ri=PJ_ROUTES.findIndex(r=>r.re.test(text));
  const route=ri>=0?PJ_ROUTES[ri]:null;
  let fname=null;
  if(route&&route.kind){let nm=route.base,k=2;while((p.files||[]).some(f=>f.name===nm))nm=route.base+' '+(k++);fname=nm;}
  const ai=(type,extra)=>Object.assign({who:'ai',time:pjTime(),type:type},extra);
  setTimeout(()=>{
    thAddReply(p,post,ai('text',{text:route
      ?(opts.inThread?'이어서 볼게요 — ':'확인했어요 — ')+'"'+escapeHtml(p.folder)+'" 폴더의 자료와 메모리를 바탕으로 <b>'+escapeHtml(route.tool)+'</b>을 호출할게요.'
      :'확인했어요. "'+escapeHtml(p.folder)+'" 폴더의 자료와 메모리를 바탕으로 정리해서 이 쓰레드에 올릴게요.'}));
    if(opts.autoOpen&&!state.thread&&state.view==='project'&&state.project===p.id)openThread(p,post.id,{bottom:true});
    if(!route){
      setTimeout(()=>thAddReply(p,post,ai('memory',{text:'메모리 업데이트 — 이 요청의 요약을 반영했어요 · 다음 대화부터 적용돼요'})),1100);
      return;
    }
    setTimeout(()=>{
      thAddReply(p,post,ai('tool',{tool:route}));
      setTimeout(()=>{
        if(route.kind){
          const nf={kind:route.kind,name:fname,meta:(UP_LBL[route.kind]||'파일')+' · '+fmtSize(route.size),time:'방금',ai:p.agent,fresh:true};
          p.files=p.files||[];p.files.unshift(nf);
          setTimeout(()=>{nf.fresh=false;},2600);
          p.items=p.files.length;
          const df=driveItems.find(d=>d.type==='folder'&&d.name===p.folder);
          if(df)df.meta='항목 '+p.items+'개'+(p.src==='etl'?' · eTL':'');
          renderDrive();renderProjects();
          const em=$('#view-project .pj-tab[data-tab="files"] em');if(em)em.textContent=p.items;
          const bd=$('#view-project .pj-badges .pj-badge:nth-child(2)');if(bd)bd.textContent='하위 항목 '+p.items+'개 접근';
        }
        thAddReply(p,post,ai('artifact',{text:route.done||'',art:artFromRoute(p,route,fname)}));
        setTimeout(()=>{
          p.memory=p.memory||[];
          p.memory.push((fname?'"'+fname+'" 생성':route.tool+' 호출')+' — 채널 요청('+route.tool+')');
          p.memUpdated='방금';
          thAddReply(p,post,ai('memory',{text:'메모리 업데이트 — '+(fname?'"'+escapeHtml(fname)+'" 요청·결과를':'이 요청을')+' 반영했어요 · 다음 대화부터 적용돼요'}));
        },900);
      },1500);
    },1200);
  },700);
}

/* ---- 바인딩 ---- */
$('#thClose').addEventListener('click',closeThread);
$('#thBody').addEventListener('click',e=>{
  const o=e.target.closest('[data-art-open]');if(o){openEditor(o.dataset.artOpen,o.dataset.name);return;}
  if(e.target.closest('[data-art-drive]')){state.pjTab='files';const p=thProject();if(p)renderProject(p);return;}
  const n=e.target.closest('[data-nav]');if(n){go(n.dataset.nav);return;}
  const c=e.target.closest('.file-chip[data-open]');if(c)openEditor(c.dataset.open,c.dataset.name);
});
(function(){
  const ta=$('#thTa'),btn=$('#thSendBtn');
  ta.addEventListener('input',()=>{btn.classList.toggle('ready',ta.value.trim().length>0);const p=thProject();if(p)pjMentionPop(p,ta,/(^|\s)@$/.test(ta.value));});
  ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();thSend();}});
  btn.addEventListener('click',thSend);
  $('#thAt').addEventListener('click',()=>{const p=thProject();if(p)pjInsertMention(p,ta);});
})();

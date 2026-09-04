/* ---------- 프로필 패널 (슬랙형) ----------
   프로젝트 채널에서 AI의 얼굴·이름을 누르면 오른쪽에 "사람 프로필"처럼 패널이 열린다.
   상시 레일이던 프로젝트 정보(연결 폴더·접근 범위·메모리·툴)는 전부 여기로 옮겼고,
   AI를 의인화하기 위해 온라인 상태·현지 시간·메시지 버튼을 사람 프로필과 같은 자리에 둔다.
   내 아바타(사이드바·게시글)를 누르면 내 프로필 — 여기서 사진과 이름(username)을 바꾼다.
   내 AI(마스터)의 프로필은 별도 패널이 아니라 마스터 화면 오른쪽 「내 AI」 패널이 겸한다(12-master.js).
   data-pf="master"(헤더 아이콘·이름 · 말풍선 라벨 · 내 프로필의 「내 AI」 행)는 maFocusPane()으로 그 패널을 가리키고,
   그 패널 정체성 블록의 「이름 수정」「기본 이름으로」 바인딩은 이 파일 하단에 있다(pfInlineRename 재사용).
   상태는 state.profile = {type:'agent'|'user', pid} 하나. 표시/숨김은 sync()가 한다. */

const PF_SVG_CLOCK='<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l2.6 1.6"/></svg>';
const PF_SVG_MAIL='<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="14" height="10" rx="2"/><path d="m3.5 6 6.5 5 6.5-5"/></svg>';
const PF_SVG_CAM='<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5a1.5 1.5 0 0 1 1.5-1.5h1.8l1.2-2h5l1.2 2h1.8A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5z"/><circle cx="10" cy="11" r="2.8"/></svg>';
const PF_TOOLS=[['solver','문제 풀이'],['generator','문제 생성'],['figure','시각화'],['canvas','캔버스'],['report-writer','문서 작성'],['ppt','PPT 제작'],['chat','채팅']];

/* 내 AI의 얼굴 — 사이드바·마스터 헤더와 같은 별 아이콘. size는 바깥 원 지름(px) */
function aiIcon(size){
  size=size||32;const s=Math.round(size*.5);
  return '<span class="ma-ava" style="width:'+size+'px;height:'+size+'px"><svg viewBox="0 0 20 20" width="'+s+'" height="'+s+'" fill="currentColor"><path d="M10 2.4l1.9 5.2 5.2 1.9-5.2 1.9L10 16.6l-1.9-5.2-5.2-1.9 5.2-1.9z"/></svg></span>';
}
function pfTime(){
  const d=new Date();let h=d.getHours();const m=String(d.getMinutes()).padStart(2,'0');
  const ap=h<12?'오전':'오후';h=h%12||12;return ap+' '+h+':'+m;
}
function pfAvGrid(cur){
  return '<div class="pf-avgrid">'+AVATARS.map(a=>'<button type="button" class="pf-avb'+(a.k===cur?' on':'')+'" data-k="'+a.k+'" title="'+a.n+'">'+avatarSVG(a.k,30)+'</button>').join('')+'</div>';
}
/* 이름 인라인 편집 — 「이름 수정」 버튼 → contenteditable, Enter/blur로 확정, Escape는 취소(원래 이름으로 되돌리고
   ESC 체인(07-editor-open)에는 전달하지 않아 패널이 닫히지 않는다). commit(v)이 저장과 재렌더를 맡는다 */
function pfInlineRename(btn,el,commit,revert){
  let cancel=false;
  btn.addEventListener('click',()=>{el.contentEditable='true';el.focus();document.getSelection().selectAllChildren(el);});
  el.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();el.blur();}
    else if(e.key==='Escape'&&el.isContentEditable){e.preventDefault();e.stopPropagation();cancel=true;el.textContent=revert();el.blur();}
  });
  el.addEventListener('blur',()=>{
    el.contentEditable='false';
    if(cancel){cancel=false;el.textContent=revert();return;}
    const v=el.textContent.trim().slice(0,40);   /* 이름 길이 상한 40 — 사이드바·헤더가 말줄임되는 선 */
    if(v)commit(v);else el.textContent=revert();
  });
}

function openProfile(type,pid){
  state.profile={type:type,pid:type==='agent'?(pid||state.project||null):null};   /* type: 'agent' | 'user' */
  renderProfile();sync();
  $('#pfBody').scrollTop=0;
}
function closeProfile(){state.profile=null;sync();}

/* ---- 프로젝트 AI 프로필 ---- */
function pfAgentHTML(p){
  const mem=(p.memory&&p.memory.length)?'<ul class="pf-mem">'+p.memory.map(m=>'<li>'+escapeHtml(m)+'</li>').join('')+'</ul>':'<div class="pf-tip">아직 비어 있어요 — 대화할수록 채워져요</div>';
  const tools=PF_TOOLS.map(t=>'<span class="tool-chip" data-nav="'+t[0]+'">'+t[1]+'</span>').join('');
  return '<div class="pf-photo">'+avatarFor(p,300)+'</div>'
   +'<div class="pf-name" id="pfAgName" spellcheck="false">'+escapeHtml(p.agent)+'</div>'
   +'<div class="pf-sub">프로젝트 AI · #'+escapeHtml(p.name)+' 담당</div>'
   +'<div class="pf-row"><i class="pf-dot on"></i>온라인 · 지금 활동 중</div>'
   +'<div class="pf-row">'+PF_SVG_CLOCK+'현지 시간 '+pfTime()+' · 마지막 메모리 업데이트 '+escapeHtml(p.memUpdated||'방금')+'</div>'
   +'<div class="pf-btns"><button class="pf-b primary" id="pfMsg">메시지</button><button class="pf-b" id="pfAvChange">'+PF_SVG_CAM+'프로필 사진</button><button class="pf-b" id="pfRename">이름 수정</button></div>'
   +'<div id="pfAvWrap" style="display:none">'+pfAvGrid(p.avatar||avatarDefault(p.name))+'<div class="pf-tip">캐릭터를 고르면 채널·내 AI 화면·드라이브 배지에 바로 반영돼요</div></div>'
   +'<div class="pf-sec"><h4>담당 정보</h4>'
   +'<div class="pf-info"><span class="pf-ic">'+SVG_FLD+'</span><div><b>연결 폴더</b><span>'+escapeHtml(p.folder)+' — 하위 항목 '+p.items+'개 접근 · <a class="pf-link" id="pfFiles">파일 보기</a></span></div></div>'
   +'<div class="pf-info"><span class="pf-ic">'+SVG_LOCK+'</span><div><b>접근 범위</b><span>이 폴더 밖 데이터에는 접근할 수 없어요. 맥락은 이 채널에서 나눈 대화만 써요.</span></div></div>'
   +'<div class="pf-info"><span class="pf-ic">'+SVG_MEM+'</span><div><b>메모리</b><span>memory.md · 항목 '+((p.memory||[]).length)+'개 · 대화가 끝나면 요약이 자동 반영돼요</span></div></div>'
   +'</div>'
   +'<div class="pf-sec"><h4>기억하고 있는 것 <span class="mono-badge">memory.md</span></h4>'+mem+'</div>'
   +'<div class="pf-sec"><h4>부리는 툴 에이전트</h4><div class="tier-tools" style="justify-content:flex-start">'+tools+'</div></div>';
}
function pfBindAgent(p){
  const inProj=()=>state.view==='project'&&state.project===p.id;
  const rerender=()=>{renderProjects();if(inProj())renderProject(p);if(state.thread&&typeof renderThread==='function')renderThread();renderProfile();};
  $('#pfMsg').addEventListener('click',()=>{
    if(!inProj()){state.pjTab='msg';go('project-'+p.id);}
    const ta=$('#pjTa');if(ta)ta.focus();
  });
  $('#pfFiles').addEventListener('click',()=>{state.pjTab='files';if(inProj())renderProject(p);else go('project-'+p.id);});
  $('#pfAvChange').addEventListener('click',()=>{const w=$('#pfAvWrap');w.style.display=w.style.display==='none'?'block':'none';});
  $$('#pfBody .pf-avb').forEach(b=>b.addEventListener('click',()=>{p.avatar=b.dataset.k;rerender();$('#pfAvWrap').style.display='block';}));
  /* 이름 확정은 패널을 통째로 다시 그리지 않는다 — blur 직후 다른 버튼을 누르면 그 버튼이 교체돼 클릭이 삼켜지므로 */
  pfInlineRename($('#pfRename'),$('#pfAgName'),v=>{if(v!==p.agent){p.agent=v;renderProjects();if(inProj())renderProject(p);if(state.thread&&typeof renderThread==='function')renderThread();}$('#pfAgName').textContent=p.agent;},()=>p.agent);
}

/* ---- 내 프로필 ---- */
function pfUserHTML(){
  const cur=AVATARS.find(a=>a.src===USER.photo);
  const list=PROJECTS.map(p=>'<div class="pf-li" data-nav="project-'+p.id+'">'+avatarFor(p,22)+'<span>'+escapeHtml(p.agent)+'</span><em>#'+escapeHtml(p.name)+'</em></div>').join('');
  return '<div class="pf-photo user">'+userAvatar(300)+'</div>'
   +'<div class="pf-name" id="pfUserName" spellcheck="false">'+escapeHtml(USER.username)+'</div>'
   +'<div class="pf-sub">나 · 이 계정의 주인 · 내 AI가 나를 의인화해요</div>'
   +'<div class="pf-row"><i class="pf-dot on"></i>온라인</div>'
   +'<div class="pf-row">'+PF_SVG_CLOCK+'현지 시간 '+pfTime()+'</div>'
   +'<div class="pf-btns"><button class="pf-b primary" id="pfPhoto">'+PF_SVG_CAM+'프로필 사진 변경</button><button class="pf-b" id="pfRenameUser">이름 수정</button></div>'
   +'<div id="pfPhotoOpts" style="display:none"><div class="pf-opts">'
   +'<button class="pf-b" id="pfUpload">내 컴퓨터에서 업로드</button>'
   +pfAvGrid(cur?cur.k:null)
   +'<button class="pf-b" id="pfPhotoReset">기본 사진으로 되돌리기</button>'
   +'<button class="pf-b" id="pfPhotoClear">사진 없이 이니셜로</button>'
   +'<div class="pf-tip">업로드한 사진은 이 프로토타입 안에서만 쓰이고 어디에도 저장되지 않아요 — 새로고침하면 기본으로 돌아가요</div></div></div>'
   +'<div class="pf-sec"><h4>내 AI</h4><div class="pf-list"><div class="pf-li" data-pf="master" title="내 AI 패널로">'+aiIcon(22)+'<span data-ainame>'+escapeHtml(aiName())+'</span><em data-aikind>'+(USER.aiName?'직접 정한 이름':'내 이름 + AI')+'</em></div></div>'
   +'<div class="pf-tip">내 이름을 바꾸면, 직접 정한 AI 이름이 없을 때 AI 이름도 따라 바뀌어요</div></div>'
   +'<div class="pf-sec"><h4>연락처 정보</h4>'
   +'<div class="pf-info"><span class="pf-ic">'+PF_SVG_MAIL+'</span><div><b>이메일</b><span><a href="mailto:'+escapeHtml(USER.email)+'">'+escapeHtml(USER.email)+'</a></span></div></div></div>'
   +'<div class="pf-sec"><h4>내 프로젝트 AI</h4><div class="pf-list">'+list+'</div></div>';
}
function pfBindUser(){
  $('#pfPhoto').addEventListener('click',()=>{const w=$('#pfPhotoOpts');w.style.display=w.style.display==='none'?'block':'none';});
  $('#pfUpload').addEventListener('click',()=>$('#pfFile').click());
  $('#pfPhotoReset').addEventListener('click',()=>{USER.photo=USER.basePhoto;renderUser();});
  $('#pfPhotoClear').addEventListener('click',()=>{USER.photo=null;renderUser();});
  $$('#pfBody .pf-avb').forEach(b=>b.addEventListener('click',()=>{USER.photo=AVATAR_MAP[b.dataset.k].src;renderUser();}));
  pfInlineRename($('#pfRenameUser'),$('#pfUserName'),v=>{if(v!==USER.username){USER.username=v;renderUser();}else $('#pfUserName').textContent=USER.username;},()=>USER.username);
}
$('#pfFile').addEventListener('change',e=>{
  const f=e.target.files&&e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{USER.photo=r.result;renderUser();};
  r.readAsDataURL(f);
  e.target.value='';
});

function renderProfile(){
  const s=state.profile;if(!s)return;
  const body=$('#pfBody');
  if(s.type==='agent'){
    const p=PROJECTS.find(x=>x.id===s.pid);
    if(!p){closeProfile();return;}
    body.innerHTML=pfAgentHTML(p);pfBindAgent(p);
  }else{
    body.innerHTML=pfUserHTML();pfBindUser();
  }
  $$('#pfBody [data-nav]').forEach(n=>n.addEventListener('click',()=>go(n.dataset.nav)));
}

/* 내 이름·내 AI 이름·내 아바타가 그려지는 모든 곳을 다시 그린다 — 사이드바 카드 · 사이드바 내 AI 항목 ·
   마스터 화면의 이름 자리([data-ainame])와 입력창 안내문 · 문서 메타([data-uname]) · 편집기 상단 ·
   채널 게시글 · 드라이브 리스트 · 온보딩 완료 버튼 · 열려 있는 프로필 패널.
   이름을 박아야 하는 새 문구는 하드코딩하지 말고 data-ainame / data-uname 빈 요소로 두면 여기서 채워진다 */
function renderUser(){
  const nm=USER.username,ai=aiName();
  $('#sbMeAva').innerHTML=userAvatar(30);
  $('#sbMeName').textContent=nm;
  $('#sbMeMail').textContent=USER.email;
  const sbAi=$('#sbAiName');if(sbAi)sbAi.textContent=ai;
  $$('[data-ainame]').forEach(n=>{n.textContent=ai;});
  $$('[data-uname]').forEach(n=>{n.textContent=nm;});
  $$('[data-aidefault]').forEach(n=>{n.textContent=String(nm||'').trim()+' AI';});   /* "기본 이름" 예시 — 직접 정한 이름과 무관하게 항상 기본값 */
  const ta=$('#maTa');if(ta)ta.placeholder=ai+'에게 무엇이든 시켜보세요 — 드라이브 전체 검색, 크로스 프로젝트 질의, 툴 실행...';
  const ob=$('#obDoneMaster');if(ob)ob.textContent=ai+' 브리핑 받기';
  const ed=$('#edUserAva');if(ed)ed.innerHTML=userAvatar(28);
  if(state.view==='project'){const p=PROJECTS.find(x=>x.id===state.project);if(p)renderProject(p);}
  if(state.thread&&typeof renderThread==='function')renderThread();   /* 쓰레드 패널의 내 아바타·이름 */
  if(state.view==='drive'&&state.layout==='list')renderDrive();
  $$('[data-aikind]').forEach(n=>{n.textContent=USER.aiName?'직접 정한 이름':'내 이름 + AI';});
  /* 열려 있는 내 프로필은 통째로 다시 그리지 않고 제자리에서 갱신한다 — 이름 편집 blur 직후의 클릭이 삼켜지지 않게 */
  if(state.profile&&state.profile.type==='user'){
    const ph=$('#pfBody .pf-photo.user');if(ph)ph.innerHTML=userAvatar(300);
    const pn=$('#pfUserName');if(pn&&!pn.isContentEditable)pn.textContent=nm;
    const cur=AVATARS.find(a=>a.src===USER.photo);
    $$('#pfBody .pf-avb').forEach(b=>b.classList.toggle('on',!!cur&&b.dataset.k===cur.k));
  }
  /* 내 AI 화면 오른쪽 패널의 정체성 블록 — 이름 종류 표시와 「기본 이름으로」 노출 */
  const kind=$('#mpNameKind');if(kind)kind.textContent=USER.aiName?'직접 정한 이름':'기본 이름 = 내 이름 + AI';
  const rs=$('#mpReset');if(rs)rs.style.display=USER.aiName?'':'none';
}

/* 클릭 위임 — data-pf="user" / data-pf="master" / data-pf="agent"(data-pid 없으면 현재 프로젝트) */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-pf]');if(!t)return;
  if(t.dataset.pf==='user'){openProfile('user');return;}
  if(t.dataset.pf==='master'){if(typeof maFocusPane==='function')maFocusPane();return;}
  const pid=t.dataset.pid||state.project;
  if(pid)openProfile('agent',pid);
});
$('#pfClose').addEventListener('click',closeProfile);

/* ---- 내 AI 화면 오른쪽 패널의 정체성 블록 — 이름 수정 · 기본 이름으로 (패널 본문은 12-master.js) ---- */
(function(){
  const nameEl=$('#mpName');if(!nameEl)return;
  pfInlineRename($('#mpRename'),nameEl,v=>{
    if(v===aiName()){nameEl.textContent=v;return;}
    /* 기본값(내 이름 + AI)과 같으면 "직접 정한 이름"이 아니다 — 다시 username을 따라가게 null */
    USER.aiName=(v===String(USER.username||'').trim()+' AI')?null:v;
    renderUser();
  },()=>aiName());
  $('#mpReset').addEventListener('click',()=>{USER.aiName=null;renderUser();});
})();
renderUser();

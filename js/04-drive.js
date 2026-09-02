/* ---------- drive render ---------- */
function thumbFor(it){
  if(it.type==='folder')return SVG_FOLDER;
  if(it.kind==='png')return SVG_PNG;
  if(it.kind==='yt')return SVG_YT;
  return fIcon(it.kind,58);
}
function tileHTML(it,i){
  return '<div class="tile" data-idx="'+i+'"><div class="tcard'+(it.fresh?' fresh':'')+'">'+thumbFor(it)+'</div>'
    +'<div class="trow"><div class="tname">'+it.name+'</div><button class="tdots" title="더보기">'+ICON_DOTS+'</button></div>'
    +'<div class="tmeta">'+it.meta+'</div></div>';
}
function rowHTML(it,i){
  const ic=it.type==='folder'?MINI_FOLDER:fIcon(it.kind,it.kind==='yt'?22:18);
  return '<div class="lrow'+(it.fresh?' fresh':'')+'" data-idx="'+i+'">'
    +'<span class="lic">'+ic+'</span>'
    +'<span class="lname">'+it.name+'</span>'
    +'<span class="lcell lc-meta">'+it.meta+'</span>'
    +'<span class="lcell lc-owner"><span class="lava">김</span>나</span>'
    +'<span class="lcell lc-loc">'+LOC_IC+'AI 드라이브</span>'
    +'<button class="tdots">'+ICON_DOTS+'</button></div>';
}
/* 폴더 내부 탐색 — state.drivePath가 현재 위치 (빈 배열 = 루트).
   1단계 폴더의 내용물은 연결 프로젝트의 files가 정본이고, 미연결 폴더는 FOLDER_FILES를 쓴다 */
function driveResolve(){
  let list=driveItems;
  const path=state.drivePath||[];
  for(let d=0;d<path.length;d++){
    if(d===0){
      const p=PROJECTS.find(x=>x.folder===path[0]);
      list=p?(p.files||[]):(FOLDER_FILES[path[0]]||[]);
    }else{
      const f=list.find(x=>x.type==='folder'&&x.name===path[d]);
      list=f?(f.children||[]):[];
    }
  }
  return list;
}
function driveOpenFolder(name){
  state.drivePath=(state.drivePath||[]).concat(name);
  renderDrive();
  $('#main').scrollTop=0;
}
function renderDrive(){
  const path=state.drivePath||[];
  const src=path.length?driveResolve():driveItems;
  const list=src.filter(i=>i.name.toLowerCase().includes(state.q));
  driveLast=list;
  /* 브레드크럼 · 타이틀 · 프로젝트 관장 배지 */
  const crumb=$('#driveCrumb');
  if(path.length){
    crumb.innerHTML='<span class="crumb-seg" data-ci="-1">AI 드라이브</span>'
      +path.map((nm,i)=>'<span class="crumb-sep">›</span>'
        +(i===path.length-1?'<span class="crumb-cur">'+escapeHtml(nm)+'</span>'
          :'<span class="crumb-seg" data-ci="'+i+'">'+escapeHtml(nm)+'</span>')).join('');
  }else crumb.textContent='AI 드라이브';
  $('#driveTitle').textContent=path.length?path[path.length-1]:'AI 드라이브';
  const pjEl=$('#drivePj');
  if(path.length){
    const p=PROJECTS.find(x=>x.folder===path[0]);
    pjEl.style.display='inline-flex';
    if(p){
      pjEl.innerHTML='<span class="pj-mini av">'+avatarFor(p,20)+'</span>'+escapeHtml(p.agent)+'가 관장 · #'+escapeHtml(p.name)+' 채널 열기';
      pjEl.onclick=()=>go('project-'+p.id);
    }else{
      pjEl.innerHTML='프로젝트 미연결 — 이 폴더로 새 프로젝트 만들기';
      pjEl.onclick=()=>openProjModal();
    }
  }else{pjEl.style.display='none';pjEl.onclick=null;}
  const box=$('#driveItems');
  box.className=state.layout==='grid'?'grid':'listwrap';
  if(state.layout==='grid')box.innerHTML=list.map(tileHTML).join('');
  else box.innerHTML=LIST_HEAD+list.map(rowHTML).join('');
  const empty=$('#driveEmpty');
  empty.style.display=list.length?'none':'block';
  if(!list.length)empty.textContent=state.q
    ?('"'+$('#driveSearch').value+'" 검색 결과가 없어요')
    :'폴더가 비어 있어요 — 업로드하거나 에이전트 결과물이 쌓이면 여기에 보여요';
}
/* ---- 파일 ⋯ 메뉴 — 열기 / 삭제 (드라이브 루트·폴더 뷰 공용) ---- */
let fiIt=null,fiSrc=null;
function fiClose(){$('#fiMenu').classList.remove('open');}
function fiOpenMenu(btn,it){
  fiIt=it;
  fiSrc=(state.drivePath&&state.drivePath.length)?driveResolve():driveItems;
  const openable=it.type==='folder'||OPEN_KINDS[it.kind];
  $('#fiOpen').style.display=openable?'flex':'none';
  $('#fiOpenLbl').textContent=it.type==='folder'?'폴더 열기':'편집기에서 열기';
  const m=$('#fiMenu');
  m.classList.add('open');
  const r=btn.getBoundingClientRect(),mw=m.offsetWidth,mh=m.offsetHeight;
  m.style.left=Math.min(r.left,innerWidth-mw-8)+'px';
  m.style.top=(r.top>innerHeight*0.6?r.top-mh-8:r.bottom+8)+'px';
}
document.addEventListener('click',e=>{
  const td=e.target.closest('#driveItems .tdots');
  if(td){
    const row=td.closest('[data-idx]');
    if(row&&driveLast[+row.dataset.idx]){fiOpenMenu(td,driveLast[+row.dataset.idx]);return;}
  }
  if(!e.target.closest('#fiMenu'))fiClose();
});
$('#fiOpen').addEventListener('click',()=>{
  fiClose();
  if(!fiIt)return;
  if(fiIt.type==='folder')driveOpenFolder(fiIt.name);
  else if(OPEN_KINDS[fiIt.kind])openEditor(fiIt.kind,fiIt.name+ED_EXT[fiIt.kind]);
});
$('#fiDel').addEventListener('click',()=>{
  fiClose();
  if(!fiIt||!fiSrc)return;
  const i=fiSrc.indexOf(fiIt);
  if(i>=0)fiSrc.splice(i,1);
  const path=state.drivePath||[];
  if(path.length){
    /* 최상위 항목 수를 프로젝트·드라이브 폴더 meta에 동기화 (upFinish와 같은 규약) */
    const pj=PROJECTS.find(x=>x.folder===path[0]);
    const cnt=pj?(pj.files||[]).length:(FOLDER_FILES[path[0]]||[]).length;
    if(pj)pj.items=cnt;
    const df=driveItems.find(d=>d.type==='folder'&&d.name===path[0]);
    if(df)df.meta='항목 '+cnt+'개';
  }
  fiIt=null;fiSrc=null;
  renderDrive();
});

$('#driveCrumb').addEventListener('click',e=>{
  const s=e.target.closest('.crumb-seg');if(!s)return;
  const ci=+s.dataset.ci;
  state.drivePath=ci<0?[]:(state.drivePath||[]).slice(0,ci+1);
  renderDrive();
});


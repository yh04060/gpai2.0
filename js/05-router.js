/* ---------- view switching ---------- */
function sync(){
  const navKey=state.view==='project'?('project-'+state.project):state.view;
  $$('.nav-item').forEach(n=>n.classList.toggle('on',n.dataset.nav===navKey));
  VIEWS.forEach(v=>$('#view-'+v).classList.toggle('on',state.view===v));
  $('#view-project').classList.toggle('on',state.view==='project');
  const g=AGENTS[state.view];
  $('#view-generic').classList.toggle('on',!!g);
  if(g)$('#gName').textContent=g;
  const drive=state.view==='drive';
  $('#chatPanel').style.display=drive&&state.chat&&!state.profile?'flex':'none';
  $('#pfPanel').style.display=state.profile?'flex':'none';
  /* 쓰레드 패널 — 프로젝트 화면 + 그 프로젝트의 쓰레드일 때만. 프로필이 열리면 잠시 숨고 닫히면 돌아온다(오른쪽 슬롯 하나) */
  const th=$('#thPanel');if(th)th.style.display=(state.view==='project'&&state.thread&&state.thread.pid===state.project&&!state.profile)?'flex':'none';
  $('#chatFab').style.display=drive&&!state.chat?'grid':'none';
  $('#main').scrollTop=0;
  renderNoteCtx();
  if(upItems.length)upTitleSync();
}
function go(v){
  if(v&&v.indexOf('project-')===0){
    const p=PROJECTS.find(x=>('project-'+x.id)===v);
    if(!p)return;
    state.view='project';state.project=p.id;renderProject(p);
  }else{
    if(v==='drive'&&state.drivePath&&state.drivePath.length){state.drivePath=[];renderDrive();}
    state.view=v;
  }
  try{location.hash=v;}catch(e){}
  sync();
}
$$('[data-nav]').forEach(n=>n.addEventListener('click',()=>go(n.dataset.nav)));


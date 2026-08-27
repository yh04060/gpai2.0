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
  $('#chatPanel').style.display=drive&&state.chat?'flex':'none';
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
    state.view=v;
  }
  try{location.hash=v;}catch(e){}
  sync();
}
$$('[data-nav]').forEach(n=>n.addEventListener('click',()=>go(n.dataset.nav)));


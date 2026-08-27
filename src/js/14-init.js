/* ---------- init ---------- */
renderDrive();
renderCanvas();
buildSheet();
renderModelMenu();
renderProjects();
const h=(location.hash||'').replace('#','');
if(VIEWS.includes(h)||AGENTS[h])state.view=h;
if(h&&h.indexOf('project-')===0){
  const p=PROJECTS.find(x=>('project-'+x.id)===h);
  if(p){state.view='project';state.project=p.id;renderProject(p);}
}
if(h==='drive-list'){
  state.view='drive';state.layout='list';
  $('#tgList').classList.add('on');$('#tgGrid').classList.remove('on');
  renderDrive();
}
sync();
if(h.startsWith('edit-')){
  const k=h.slice(5);
  if(ED_NAMES[k]){state.view='drive';sync();openEditor(k);}
}
if(h==='guide')$('#noteDrawer').classList.add('on');

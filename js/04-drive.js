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
function renderDrive(){
  const list=driveItems.filter(i=>i.name.toLowerCase().includes(state.q));
  driveLast=list;
  const box=$('#driveItems');
  box.className=state.layout==='grid'?'grid':'listwrap';
  if(state.layout==='grid')box.innerHTML=list.map(tileHTML).join('');
  else box.innerHTML=LIST_HEAD+list.map(rowHTML).join('');
  const empty=$('#driveEmpty');
  empty.style.display=list.length?'none':'block';
  if(!list.length)empty.textContent='"'+$('#driveSearch').value+'" 검색 결과가 없어요';
}


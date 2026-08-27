let attTarget=null,pickFiles=[],pickSel=-1;
function extKind(n){
  n=(n||'').toLowerCase();
  if(/\.pdf$/.test(n))return 'pdf';
  if(/\.docx?$/.test(n))return 'doc';
  if(/\.(xlsx?|csv)$/.test(n))return 'xlsx';
  if(/\.pptx?$/.test(n))return 'ppt';
  if(/\.(png|jpe?g|gif|webp|svg)$/.test(n))return 'png';
  return 'file';
}
function addChip(name,kind){
  if(!attTarget)return;
  const chip=document.createElement('span');
  chip.className='att-chip';
  chip.innerHTML=fIcon(kind,16)+'<span class="att-name">'+escapeHtml(name)+'</span><button class="att-x" title="제거">×</button>';
  chip.querySelector('.att-x').addEventListener('click',()=>chip.remove());
  attTarget.appendChild(chip);
}
function openAttMenu(btn){
  const ctx=btn.closest('[data-attach]');
  attTarget=ctx?ctx.querySelector('.att-row'):attTarget;
  const m=$('#attMenu');
  m.classList.add('open');
  const r=btn.getBoundingClientRect(),mw=m.offsetWidth,mh=m.offsetHeight;
  const x=Math.min(Math.max(8,r.left),innerWidth-mw-8);
  const y=r.top>innerHeight*0.55?r.top-mh-10:r.bottom+10;
  m.style.left=x+'px';m.style.top=y+'px';
}
document.addEventListener('click',e=>{
  const trg=e.target.closest('.plus,.btn-chip');
  if(trg){openAttMenu(trg);return;}
  if(!e.target.closest('#attMenu'))$('#attMenu').classList.remove('open');
});
$('#attLocal').addEventListener('click',()=>{$('#attMenu').classList.remove('open');$('#attFile').click();});
$('#attFile').addEventListener('change',e=>{
  [...e.target.files].forEach(f=>addChip(f.name,extKind(f.name)));
  e.target.value='';
});
$('#attDrive').addEventListener('click',()=>{$('#attMenu').classList.remove('open');openPicker();});

/* AI Drive picker */
function openPicker(){pickSel=-1;$('#pickSearch').value='';renderPick('');$('#pickDim').classList.add('on');}
function closePicker(){$('#pickDim').classList.remove('on');}
function renderPick(q){
  pickFiles=driveItems.filter(i=>i.type==='file'&&i.name.toLowerCase().includes(q));
  $('#pickList').innerHTML=pickFiles.map((f,i)=>
    '<div class="pick-row'+(i===pickSel?' on':'')+'" data-i="'+i+'">'
    +'<span class="pick-ic">'+fIcon(f.kind,f.kind==='yt'?22:19)+'</span>'
    +'<span class="pick-name">'+f.name+'</span>'
    +'<span class="pick-meta">'+f.meta+'</span>'
    +'<svg class="pck" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 10.5 3.5 3.5 7.5-8"/></svg>'
    +'</div>').join('')
    ||'<div style="padding:32px 12px;color:#9C9C9A;font-size:13px;text-align:center">검색 결과가 없어요</div>';
  $('#pickAdd').disabled=pickSel<0;
}
$('#pickList').addEventListener('click',e=>{
  const r=e.target.closest('.pick-row');if(!r)return;
  pickSel=+r.dataset.i;
  renderPick($('#pickSearch').value.trim().toLowerCase());
});
$('#pickSearch').addEventListener('input',e=>{pickSel=-1;renderPick(e.target.value.trim().toLowerCase());});
$('#pickAdd').addEventListener('click',()=>{
  const f=pickFiles[pickSel];
  if(f)addChip(f.name+(f.kind==='png'?'.png':(ED_EXT[f.kind]||'')),f.kind);
  closePicker();
});
$('#pickCancel').addEventListener('click',closePicker);
$('#pickClose').addEventListener('click',closePicker);
$('#pickDim').addEventListener('click',e=>{if(e.target===$('#pickDim'))closePicker();});

/* ================= 프로젝트 · 프로젝트 AI (폴더 샌드박스) ================= */

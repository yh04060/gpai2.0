/* ---------- chat panel ---------- */
$('#chatClose').addEventListener('click',()=>{state.chat=false;sync();});
$('#chatFab').addEventListener('click',()=>{state.chat=true;sync();});

/* ---------- drive controls ---------- */
$('#tgGrid').addEventListener('click',()=>{state.layout='grid';$('#tgGrid').classList.add('on');$('#tgList').classList.remove('on');renderDrive();});
$('#tgList').addEventListener('click',()=>{state.layout='list';$('#tgList').classList.add('on');$('#tgGrid').classList.remove('on');renderDrive();});
$('#driveSearch').addEventListener('input',e=>{state.q=e.target.value.trim().toLowerCase();renderDrive();});

/* ---------- deep-explain toggle (chat) ---------- */
$('#deepBtn').addEventListener('click',()=>$('#deepBtn').classList.toggle('on'));

/* ---------- send buttons ---------- */
$$('textarea[data-send]').forEach(t=>{
  const box=t.closest('.pcard,.ccard,.vform,.cv-input,.chat-inputbar');
  const btn=box&&box.querySelector('.send,.btn-gen');
  if(btn)t.addEventListener('input',()=>btn.classList.toggle('ready',t.value.trim().length>0));
});

/* ================= File Editor ================= */

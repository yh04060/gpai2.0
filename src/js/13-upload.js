const UP_LBL={pdf:'PDF',doc:'DOCX',xlsx:'XLSX',ppt:'PPTX',png:'PNG',file:'파일'};
function fmtSize(b){if(!b)return '0KB';if(b>=1048576)return (b/1048576).toFixed(1).replace(/\.0$/,'')+'MB';return Math.max(1,Math.round(b/1024))+'KB';}
let upItems=[];
function upTitleSync(){
  const total=upItems.length,done=upItems.filter(i=>i.done).length;
  if(!total)return;
  $('#upTitle').textContent=done<total?(total-done)+'개 항목 업로드 중…':total+'개 항목 업로드 완료';
  let show=false,label='AI 드라이브에 저장됐어요',btn='드라이브에서 보기';
  if(done===total){
    if(upLastDest==='drive'){show=state.view!=='drive';}
    else{
      const p=PROJECTS.find(x=>x.id===upLastDest);
      if(p){
        label='프로젝트 폴더에 저장됐어요 — '+p.folder;
        btn='#'+p.name+'의 파일에서 보기';
        show=!(state.view==='project'&&state.project===p.id);
      }
    }
  }
  $('#upFoot').style.display=show?'flex':'none';
  if(show){$('#upFootLbl').textContent=label;$('#upGoDrive').textContent=btn;}
}
function upFinish(it){
  it.done=true;
  it.row.querySelector('.up-st').innerHTML='<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="9" fill="#2E9E5B"/><path d="m5.9 10.4 2.6 2.6 5.6-5.9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const base=it.name.replace(/\.[^.]+$/,''),label=(UP_LBL[it.kind]||'파일')+' · '+fmtSize(it.size);
  if(it.dest&&it.dest!=='drive'){
    const p=PROJECTS.find(x=>x.id===it.dest);
    if(p){
      p.files=p.files||[];
      const nf={kind:it.kind,name:base,meta:label,time:'방금',fresh:true};
      p.files.unshift(nf);
      setTimeout(()=>{nf.fresh=false;},2600);
      p.items=p.files.length;
      const df=driveItems.find(d=>d.type==='folder'&&d.name===p.folder);
      if(df)df.meta='항목 '+p.items+'개';
      renderDrive();
      if(state.view==='project'&&state.project===p.id)renderProject(p);
    }
  }else{
    const item={type:'file',kind:it.kind,name:base,meta:label,fresh:true};
    driveItems.splice(driveItems.filter(d=>d.type==='folder').length,0,item);
    setTimeout(()=>{item.fresh=false;},2600);
    renderDrive();
  }
  upTitleSync();
}
let upLastDest='drive';
function startDriveUpload(files,dest){
  if(!files.length)return;
  dest=dest||'drive';upLastDest=dest;
  const t=$('#upToast');t.style.display='block';t.classList.remove('min');
  files.forEach((f,idx)=>{
    const it={name:f.name,kind:extKind(f.name),size:f.size||0,done:false,dest:dest};
    const row=document.createElement('div');
    row.className='up-row';
    row.innerHTML='<span class="up-ic">'+fIcon(it.kind,15)+'</span><span class="up-name">'+escapeHtml(it.name)+'</span>'
      +'<span class="up-st"><svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="8" fill="none" stroke="#EFEFED" stroke-width="2.4"/><circle class="arc" cx="10" cy="10" r="8" fill="none" stroke="#EE7732" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="50.3" stroke-dashoffset="50.3" transform="rotate(-90 10 10)"/></svg></span>';
    it.row=row;
    $('#upBody').appendChild(row);
    upItems.push(it);
    const dur=900+Math.min(1600,it.size/700)+idx*420;
    const t0=performance.now();
    (function step(){
      const p=Math.min(1,(performance.now()-t0)/dur);
      const e=1-Math.pow(1-p,2.2);
      const arc=row.querySelector('.arc');
      if(arc)arc.style.strokeDashoffset=String(50.3*(1-e));
      if(p<1)requestAnimationFrame(step);else upFinish(it);
    })();
  });
  upTitleSync();
}
$('#sbUpload').addEventListener('click',()=>$('#driveUp').click());
$('#btnNew').addEventListener('click',()=>$('#driveUp').click());
$('#driveUp').addEventListener('change',e=>{startDriveUpload([...e.target.files]);e.target.value='';});
$('#upChev').addEventListener('click',()=>$('#upToast').classList.toggle('min'));
$('#upClose').addEventListener('click',()=>{$('#upToast').style.display='none';$('#upBody').innerHTML='';upItems=[];});
$('#upGoDrive').addEventListener('click',()=>{
  if(upLastDest!=='drive'){
    const p=PROJECTS.find(x=>x.id===upLastDest);
    if(p){
      state.view='project';state.project=p.id;state.pjTab='files';
      renderProject(p);
      try{location.hash='project-'+p.id;}catch(e){}
      sync();upTitleSync();
      return;
    }
  }
  go('drive');upTitleSync();
});
$('#pjUpFile').addEventListener('change',e=>{startDriveUpload([...e.target.files],pjUpDest);e.target.value='';});


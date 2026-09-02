const ED_NAMES={doc:'실험 보고서.docx',xlsx:'성적 관리.xlsx',ppt:'물리학 발표.pptx',pdf:'중간고사 기출.pdf',yt:'한때 몸값 3000억 왓챠는 왜 42억원에 팔리게 됐을까?'};
const ED_EXT={doc:'.docx',xlsx:'.xlsx',ppt:'.pptx',pdf:'.pdf',yt:''};
const ED_MENUS_DEF={
  doc:{items:['홈','삽입','그리기','디자인','레이아웃','참조','검토','보기'],on:0},
  xlsx:{items:['홈','삽입','페이지 레이아웃','수식','데이터','검토','보기'],on:0},
  ppt:{items:['홈','삽입','그리기','디자인','전환','애니메이션','슬라이드 쇼','검토','보기','도형 서식'],on:9},
  pdf:{items:['홈','주석','편집','페이지','보기','양식 작성'],on:0},
  yt:null,
};
const ED_BADGE={doc:['W','#2B7CD3'],xlsx:['X','#217346'],ppt:['P','#D04423'],pdf:['PDF','#E2574C'],yt:['▶','#E62117']};
const ED_STATUS={doc:'1/1페이지 · 128단어 · 한국어',xlsx:'시트1 · 준비됨',ppt:'슬라이드 1 / 1 · GPAI 테마',pdf:'1/1페이지',yt:'YouTube 원본 보기 · 자동 전사 완료'};

function openEditor(kind,name){
  state.editor=kind;
  $('#editor').classList.add('on');
  $('#edName').textContent=name||ED_NAMES[kind];
  const b=ED_BADGE[kind];$('#edBadge').textContent=b[0];$('#edBadge').style.background=b[1];
  const m=ED_MENUS_DEF[kind],mn=$('#edMenus');
  if(m){mn.style.display='flex';mn.innerHTML=m.items.map((t,i)=>'<button class="ed-menu'+(i===m.on?' on':'')+'">'+t+'</button>').join('');}
  else{mn.style.display='none';}
  ['doc','xlsx','ppt','pdf','yt'].forEach(k=>{
    const r=$('#rb-'+k);if(r)r.classList.toggle('on',k===kind);
    $('#edv-'+k).classList.toggle('on',k===kind);
  });
  $('#edRibbon').style.display=(kind==='yt')?'none':'flex';
  $('#edStatus').textContent=ED_STATUS[kind];
  try{location.hash='edit-'+kind;}catch(e){}
  renderNoteCtx();
}
function closeEditor(){
  state.editor=null;
  $('#editor').classList.remove('on');
  try{location.hash=state.view;}catch(e){}
  renderNoteCtx();
}
$('#edBack').addEventListener('click',closeEditor);
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if($('#pickDim').classList.contains('on')){closePicker();return;}
  if($('#gdDim').classList.contains('on')){closeGdPicker();return;}
  if($('#projDim').classList.contains('on')){closeProjModal();return;}
  if($('#fiMenu').classList.contains('open')){$('#fiMenu').classList.remove('open');return;}
  if($('#dnMenu').classList.contains('open')){$('#dnMenu').classList.remove('open');return;}
  if($('#attMenu').classList.contains('open')){$('#attMenu').classList.remove('open');return;}
  if($('#noteDrawer').classList.contains('on')){$('#noteDrawer').classList.remove('on');return;}
  if(state.profile){closeProfile();return;}
  if(state.editor)closeEditor();
});

/* prototype notes drawer — 화면별 컨텍스트 가이드 */

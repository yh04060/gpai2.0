const OPEN_KINDS={doc:1,xlsx:1,ppt:1,pdf:1,yt:1};
$('#driveItems').addEventListener('click',e=>{
  if(e.target.closest('.tdots'))return;
  const el=e.target.closest('[data-idx]');if(!el)return;
  const it=driveLast[+el.dataset.idx];
  if(!it)return;
  if(it.type==='folder'){driveOpenFolder(it.name);return;}
  if(OPEN_KINDS[it.kind])openEditor(it.kind,it.name+ED_EXT[it.kind]);
});

/* formatting commands (doc/pdf) */
$$('#editor [data-cmd]').forEach(b=>b.addEventListener('mousedown',e=>{
  e.preventDefault();
  document.execCommand(b.dataset.cmd,false,b.dataset.val||null);
  if(b.classList.contains('style-card')){$$('#rb-doc .style-card').forEach(c=>c.classList.toggle('on',c===b));}
}));
$('#pdfEditText').addEventListener('click',()=>$('#pdfPage').focus());

/* xlsx sheet */
const XCOLS='ABCDEFGHIJKLMNOPQRST'.split('');
const XDATA={B4:'항목',C4:'점수',B5:'과제 1',B6:'과제 2',B7:'과제 3',B8:'과제 4',B9:'과제 5',B10:'과제 6',B11:'합계',C5:'500',C6:'500',C7:'500',C8:'500',C9:'500',C10:'500',C11:'3000'};
function buildSheet(){
  let h='<thead><tr><th class="rh"></th>'+XCOLS.map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>';
  for(let r=1;r<=36;r++){
    h+='<tr><th class="rh">'+r+'</th>'+XCOLS.map(c=>{
      const k=c+r,v=XDATA[k]||'';
      return '<td contenteditable="true" spellcheck="false" data-ref="'+k+'"'+(v&&/^\d+$/.test(v)?' class="num"':'')+'>'+v+'</td>';
    }).join('')+'</tr>';
  }
  $('#xlTable').innerHTML=h+'</tbody>';
  const c5=$('#xlTable td[data-ref="C5"]');
  if(c5){if(xSel)xSel.classList.remove('sel');xSel=c5;c5.classList.add('sel');$('#xlName').textContent='C5';$('#xlFx').value=c5.textContent;}
}
let xSel=null;
$('#xlTable').addEventListener('focusin',e=>{
  const td=e.target.closest('td[data-ref]');if(!td)return;
  if(xSel)xSel.classList.remove('sel');
  xSel=td;td.classList.add('sel');
  $('#xlName').textContent=td.dataset.ref;
  $('#xlFx').value=td.textContent;
});
$('#xlTable').addEventListener('input',e=>{
  const td=e.target.closest('td[data-ref]');if(!td)return;
  td.classList.toggle('num',/^\d+(\.\d+)?$/.test(td.textContent.trim()));
  $('#xlFx').value=td.textContent;
});
$('#xlFx').addEventListener('input',e=>{
  if(!xSel)return;
  xSel.textContent=e.target.value;
  xSel.classList.toggle('num',/^\d+(\.\d+)?$/.test(e.target.value.trim()));
});

/* ppt shape */
const pptShape=$('#pptShape');
pptShape.addEventListener('mousedown',e=>{
  if(e.target.closest('.ppt-ask')||e.target.closest('.stxt')&&document.activeElement===e.target)return;
  pptShape.classList.add('sel');
  const sr=pptShape.getBoundingClientRect(),pr=$('#pptSlide').getBoundingClientRect();
  const ox=e.clientX-sr.left,oy=e.clientY-sr.top;
  function mv(ev){
    let x=ev.clientX-pr.left-ox,y=ev.clientY-pr.top-oy;
    x=Math.max(0,Math.min(x,pr.width-sr.width));
    y=Math.max(0,Math.min(y,pr.height-sr.height));
    pptShape.style.left=x+'px';pptShape.style.top=y+'px';
  }
  function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);}
  document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);
});
$('#pptSlide').addEventListener('mousedown',e=>{if(!e.target.closest('#pptShape'))pptShape.classList.remove('sel');});
$('#pptAsk').addEventListener('click',()=>edSend('이 슬라이드를 더 보기 좋게 다듬어줘'));

/* pdf zoom */
let pdfZoom=1;
function setPdfZoom(z){
  pdfZoom=Math.max(.5,Math.min(2,z));
  $('#pdfPage').style.transform='scale('+pdfZoom+')';
  $('#pdfZoomLbl').textContent=Math.round(pdfZoom*100)+'%';
}
$('#pdfZoomIn').addEventListener('click',()=>setPdfZoom(pdfZoom+.1));
$('#pdfZoomOut').addEventListener('click',()=>setPdfZoom(pdfZoom-.1));

/* youtube */
const YT_TR=[
  ['00:00','오늘은 왓챠 매각 소식을 집중적으로 다뤄보겠습니다. 이성봉 기자님 나와 주셨습니다.'],
  ['00:24','네, 안녕하세요. 아웃스탠딩 이성봉 기자입니다.'],
  ['00:41','한때 기업가치 3000억 원을 인정받았던 왓챠가 42억 5천만 원에 매각됐습니다.'],
  ['01:05','청산 가치가 42억 2천만 원으로 산정됐고, 키노라이츠가 이보다 약간 높은 가격에 인수했죠.'],
  ['01:32','핵심은 부채 부담을 거의 떠안지 않는 구조로 거래가 설계됐다는 점입니다.'],
  ['02:10','왓챠는 원래 OTT가 아니라 영화 평점·리뷰 플랫폼 왓챠피디아로 시작했습니다.'],
  ['02:48','2016년 왓챠플레이를 출시하며 OTT 시장에 본격적으로 진입했고요.'],
  ['03:21','넷플릭스, 티빙, 쿠팡플레이와의 경쟁이 심화되면서 적자가 누적됐습니다.'],
  ['04:02','2022년부터 투자 유치가 막히며 기업 회생 절차까지 검토하게 됩니다.'],
  ['04:39','키노라이츠는 콘텐츠 큐레이션 데이터와의 시너지를 노리고 인수를 결정했습니다.'],
  ['05:15','향후 절차와 시나리오는 크게 세 가지로 정리할 수 있습니다.'],
];
$('#ytTr').innerHTML=YT_TR.map(t=>'<div class="tr-row"><span class="tr-t">'+t[0]+'</span><span>'+t[1]+'</span></div>').join('');
$('#ytPlay').addEventListener('click',()=>$('#ytPlayer').classList.add('playing'));

/* GPAI Chat (editor) */
let edModel='GPAI Pro';
const MODELS=[['GPAI Fast','#EE7732'],['GPAI Pro','#EE7732'],['ChatGPT 5.6 sol','#111110'],['Gemini 3.1 Pro','#3B78E7'],['Claude Opus 5','#D97757']];
function renderModelMenu(){
  $('#mMenu').innerHTML=MODELS.map(m=>'<div class="mitem'+(m[0]===edModel?' on':'')+'" data-m="'+m[0]+'"><span class="dot" style="background:'+m[1]+'"></span>'+m[0]+'<span class="ck">✓</span></div>').join('');
  $('#mLabel').textContent=edModel;
}
$('#mBtn').addEventListener('click',e=>{e.stopPropagation();$('#mMenu').classList.toggle('open');});
$('#mMenu').addEventListener('click',e=>{
  const it=e.target.closest('.mitem');if(!it)return;
  edModel=it.dataset.m;renderModelMenu();$('#mMenu').classList.remove('open');
});
document.addEventListener('click',e=>{if(!e.target.closest('.msel-wrap'))$('#mMenu').classList.remove('open');});

const ED_REPLY={
  doc:'문서를 읽어봤어요. 요약, 문체 다듬기, 이어쓰기를 도와드릴 수 있어요. 원하는 부분을 드래그해서 알려주셔도 좋아요.',
  xlsx:'시트 데이터를 확인했어요. C11(3000)은 C5:C10의 합계로 보여요. 수식 정리, 차트 생성, 조건부 서식을 도와드릴까요?',
  ppt:'슬라이드 구성을 확인했어요. 레이아웃 정리, 색 보정, 텍스트 다듬기를 도와드릴 수 있어요.',
  pdf:'이 PDF의 문항을 읽어봤어요. 풀이 과정 요약이나 핵심 개념 설명, 유사 문제 생성을 도와드릴 수 있어요.',
  yt:'스크립트 전사를 마쳤어요. 영상 핵심 요약, 타임라인 정리, 이 내용 기반 퀴즈 생성을 도와드릴 수 있어요.',
};
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function edSend(text){
  const t=(text||'').trim();if(!t)return;
  $('#edEmpty').style.display='none';
  const wrap=$('#edMsgs');
  wrap.insertAdjacentHTML('beforeend','<div class="msg user">'+escapeHtml(t)+'</div>');
  wrap.scrollTop=wrap.scrollHeight;
  setTimeout(()=>{
    const mc=(MODELS.find(m=>m[0]===edModel)||MODELS[1])[1];
    wrap.insertAdjacentHTML('beforeend','<div class="msg ai"><span class="msg-model"><i style="background:'+mc+'"></i>'+edModel+'</span><p>'+ED_REPLY[state.editor||'doc']+'</p></div>');
    wrap.scrollTop=wrap.scrollHeight;
  },600);
}
const edTa=$('#edChatTa');
edTa.addEventListener('input',()=>$('#edSendBtn').classList.toggle('ready',edTa.value.trim().length>0));
edTa.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();edSend(edTa.value);edTa.value='';$('#edSendBtn').classList.remove('ready');}
});
$('#edSendBtn').addEventListener('click',()=>{edSend(edTa.value);edTa.value='';$('#edSendBtn').classList.remove('ready');});
$$('#editor .sugg').forEach(s=>s.addEventListener('click',()=>edSend(s.textContent.trim())));

/* ================= Attach: 내 컴퓨터 업로드 / AI 드라이브에서 선택 ================= */

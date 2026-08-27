const MA_REPLY='확인했어요. 관련 프로젝트 AI에 질의하고 드라이브 전체를 검색해 종합할게요 — 진행 상황은 우측 작업 현황에, 결과는 이 대화로 보고돼요.';
function maSend(text){
  const t=(text||'').trim();if(!t)return;
  const w=$('#maMsgs');
  w.insertAdjacentHTML('beforeend','<div class="ma-bub-u">'+escapeHtml(t)+'</div>');
  setTimeout(()=>{
    w.insertAdjacentHTML('beforeend','<div class="ma-bub-a"><span class="msg-model"><i style="background:#EE7732"></i>마스터 AI</span><p style="margin-top:6px">'+MA_REPLY+'</p><div><span class="ma-src">근거: 프로젝트 AI 질의</span><span class="ma-src">근거: 드라이브 검색</span></div></div>');
    const last=w.lastElementChild;if(last)last.scrollIntoView({block:'nearest'});
  },650);
}
const maTa=$('#maTa');
function maSubmit(){maSend(maTa.value);maTa.value='';$('#maSendBtn').classList.remove('ready');}
$('#maSendBtn').addEventListener('click',maSubmit);
maTa.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();maSubmit();}});
$$('.ma-sugg').forEach(s=>s.addEventListener('click',()=>maSend(s.textContent.trim())));
$('#maView1').addEventListener('click',()=>openEditor('doc'));
$('#tlOpenDoc').addEventListener('click',()=>openEditor('doc'));
$('#maGoPj1').addEventListener('click',()=>{state.pjTab='msg';go('project-p1');});
$('#tlSeePj').addEventListener('click',()=>{state.pjTab='msg';go('project-p1');});
$('#maOk1').addEventListener('click',()=>{
  $('#maOkCard').innerHTML='<div class="rail-file"><span class="ed-badge" style="background:#2B7CD3">W</span><b>실험 보고서 초안 v2</b></div>'
   +'<div class="rail-done">'+SVG_CK12+'확인 완료 — 일반물리학 AI에 전달됐어요</div>';
  $('#maBadge').textContent='1';
});

/* ================= 사이드바 업로드 → AI 드라이브 ================= */

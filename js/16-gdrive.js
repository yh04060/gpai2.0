/* ---------- Google Drive 가져오기 모달 ----------
   드라이브 「신규」 메뉴의 항목. 비대학생 유저(LMS 없음)의 개인 자료 반입 경로다.
   첫 열기에 계정 연결을 짧게 연출한 뒤 파일 목록을 보여주고,
   선택한 파일은 기존 업로드 토스트(startDriveUpload)를 그대로 타고 드라이브에 쌓인다.
   #gdrive 해시로 모달에 바로 진입할 수 있다 (검증·공유용). */

const GD_FILES=[
 {name:'자기소개서_최종본.docx',size:49152},
 {name:'2026 겨울 인턴 이력서.pdf',size:225280},
 {name:'동아리 발표자료.pptx',size:4404019},
 {name:'가계부 2026.xlsx',size:18432},
 {name:'봉사활동 확인서.pdf',size:184320},
 {name:'스터디 노트 스캔.png',size:1258291},
 {name:'토익 성적표.pdf',size:96256},
];
const GD_CHECK='<svg class="pck" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 10.5 3.5 3.5 7.5-8"/></svg>';

let gdConnected=false;
let gdSel=new Set();

function gdSyncFoot(){
  const b=$('#gdGo');
  b.disabled=!gdSel.size;
  b.textContent=gdSel.size?(gdSel.size+'개 가져오기'):'가져오기';
}
function gdRenderList(){
  $('#gdAcct').innerHTML='<b>내 드라이브</b> · kim.turing@gmail.com 연결됨 · 최근 파일';
  $('#gdList').innerHTML=GD_FILES.map((f,i)=>'<div class="pick-row'+(gdSel.has(i)?' on':'')+'" data-i="'+i+'">'
   +'<span class="pick-ic">'+fIcon(extKind(f.name),18)+'</span>'
   +'<span class="pick-name">'+escapeHtml(f.name)+'</span>'
   +'<span class="pick-meta">'+fmtSize(f.size)+'</span>'
   +GD_CHECK+'</div>').join('');
}
function openGdPicker(){
  gdSel=new Set();
  gdSyncFoot();
  $('#gdDim').classList.add('on');
  if(gdConnected){gdRenderList();return;}
  $('#gdAcct').innerHTML='';
  $('#gdList').innerHTML='<div class="gd-conn"><span class="gd-spin"></span>Google 계정을 연결하는 중…</div>';
  setTimeout(()=>{
    gdConnected=true;
    if($('#gdDim').classList.contains('on'))gdRenderList();
  },800);
}
function closeGdPicker(){$('#gdDim').classList.remove('on');}

$('#gdList').addEventListener('click',e=>{
  const r=e.target.closest('.pick-row');if(!r)return;
  const i=+r.dataset.i;
  gdSel.has(i)?gdSel.delete(i):gdSel.add(i);
  r.classList.toggle('on',gdSel.has(i));
  gdSyncFoot();
});
$('#gdGo').addEventListener('click',()=>{
  if(!gdSel.size)return;
  const files=GD_FILES.filter((f,i)=>gdSel.has(i)).map(f=>({name:f.name,size:f.size}));
  closeGdPicker();
  startDriveUpload(files);   /* 기존 업로드 토스트 → 드라이브 루트에 안착 */
});
$('#gdClose').addEventListener('click',closeGdPicker);
$('#gdCancel').addEventListener('click',closeGdPicker);
$('#gdDim').addEventListener('click',e=>{if(e.target===$('#gdDim'))closeGdPicker();});
$('#dnGd').addEventListener('click',()=>{closeDnMenu();openGdPicker();});

/* 해시 직행 — 라우팅 규칙과 동일하게 초기화 시점에만 읽는다 */
if((location.hash||'')==='#gdrive')openGdPicker();

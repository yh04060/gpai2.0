/* ---------- data ---------- */
/* 온보딩(eTL 임포트) 완료 후의 드라이브 상태가 기본값 —
   과목 폴더 5개는 LMS에서 가져온 것, 나머지는 유저 개인 파일 */
const driveItems=[
  {type:'folder',name:'일반물리학',meta:'항목 6개 · eTL'},
  {type:'folder',name:'자료구조',meta:'항목 5개 · eTL'},
  {type:'folder',name:'공학수학 2',meta:'항목 4개 · eTL'},
  {type:'folder',name:'대학영어',meta:'항목 4개 · eTL'},
  {type:'folder',name:'심리학개론',meta:'항목 3개 · eTL'},
  {type:'folder',name:'중간고사 대비',meta:'항목 4개'},
  {type:'file',kind:'doc',name:'실험 보고서',meta:'DOCX · 18KB'},
  {type:'file',kind:'xlsx',name:'성적 관리',meta:'XLSX · 12KB'},
  {type:'file',kind:'ppt',name:'물리학 발표',meta:'PPTX · 2.1MB'},
  {type:'file',kind:'pdf',name:'중간고사 기출',meta:'PDF · 26KB'},
  {type:'file',kind:'yt',name:'한때 몸값 3000억 왓챠는 왜 42억원에 팔리게 됐을까?',meta:'YouTube · 24:34'},
];
let driveLast=[];

const AGENTS={'report-writer':'문서 작성'};
const VIEWS=['drive','master','solver','generator','figure','canvas','chat','ppt'];

/* 데모 계정 — photo는 파일 경로 또는 업로드한 data URL, null이면 이니셜.
   basePhoto는 「기본 사진으로 되돌리기」가 복원하는 계정 원본 */
const USER={name:'최민규',email:'theminq@teamturing.com',initial:'최',
  photo:'assets/profile/me.png',basePhoto:'assets/profile/me.png'};
const state={view:'drive',chat:true,layout:'grid',q:'',pjTab:'msg',drivePath:[],profile:null};


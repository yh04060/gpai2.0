/* ---------- data ---------- */
const driveItems=[
  {type:'folder',name:'중간고사 대비',meta:'항목 4개'},
  {type:'folder',name:'일반물리학',meta:'항목 6개'},
  {type:'file',kind:'png',name:'설계 진화 다이어그램',meta:'PNG · 16KB'},
  {type:'file',kind:'pdf',name:'중간고사 기출',meta:'PDF · 26KB'},
  {type:'file',kind:'doc',name:'실험 보고서',meta:'DOCX · 18KB'},
  {type:'file',kind:'xlsx',name:'성적 관리',meta:'XLSX · 12KB'},
  {type:'file',kind:'ppt',name:'물리학 발표',meta:'PPTX · 2.1MB'},
  {type:'file',kind:'yt',name:'한때 몸값 3000억 왓챠는 왜 42억원에 팔리게 됐을까?',meta:'YouTube · 24:34'},
];
let driveLast=[];

const AGENTS={'report-writer':'문서 작성'};
const VIEWS=['drive','master','solver','generator','figure','canvas','chat'];

const state={view:'drive',chat:true,layout:'grid',q:'',pjTab:'msg'};


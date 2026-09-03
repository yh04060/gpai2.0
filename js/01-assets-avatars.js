/* ---------- 프로젝트 AI 프로필 캐릭터 20종 ----------
   프로젝트 채널은 슬랙형 UX라, 프로젝트 AI가 "사람처럼" 말하려면 얼굴이 있어야 한다.
   Q가 제공한 수학대왕 아바타 PNG(512×512, 배경 포함)를 assets/avatars/a01~a20.png 로
   두고 여기서 키로 참조한다. 화면 코드는 키만 다루므로(p.avatar='a07') 파일을
   갈아끼워도 화면 코드 수정은 0이다.
   항목에 src 대신 draw:()=>'<svg 내부>' 를 주면 인라인 SVG로도 그릴 수 있다(예비 경로). */

const AVATARS=[
 {k:'a01',n:'수학 정령',src:'assets/avatars/a01.png'},
 {k:'a02',n:'파마머리',src:'assets/avatars/a02.png'},
 {k:'a03',n:'종이 박스',src:'assets/avatars/a03.png'},
 {k:'a04',n:'외계인 안경',src:'assets/avatars/a04.png'},
 {k:'a05',n:'스포츠머리',src:'assets/avatars/a05.png'},
 {k:'a06',n:'악마 뿔',src:'assets/avatars/a06.png'},
 {k:'a07',n:'학사모 판사',src:'assets/avatars/a07.png'},
 {k:'a08',n:'바가지머리',src:'assets/avatars/a08.png'},
 {k:'a09',n:'천사 링',src:'assets/avatars/a09.png'},
 {k:'a10',n:'의사 가운',src:'assets/avatars/a10.png'},
 {k:'a11',n:'콧수염 똥머리',src:'assets/avatars/a11.png'},
 {k:'a12',n:'고양이 귀',src:'assets/avatars/a12.png'},
 {k:'a13',n:'한복',src:'assets/avatars/a13.png'},
 {k:'a14',n:'학사모 안경',src:'assets/avatars/a14.png'},
 {k:'a15',n:'롱 웨이브',src:'assets/avatars/a15.png'},
 {k:'a16',n:'힙합 선글라스',src:'assets/avatars/a16.png'},
 {k:'a17',n:'노랑 후드',src:'assets/avatars/a17.png'},
 {k:'a18',n:'빨강 비니',src:'assets/avatars/a18.png'},
 {k:'a19',n:'나그랑티',src:'assets/avatars/a19.png'},
 {k:'a20',n:'민머리',src:'assets/avatars/a20.png'},
];
const AVATAR_MAP={};AVATARS.forEach(a=>{AVATAR_MAP[a.k]=a;});

/* 렌더 — 항목이 src를 가지면 이미지 파일, draw를 가지면 인라인 SVG.
   이름은 예전 그대로 avatarSVG 로 두어 호출부(11-projects 등)를 안 건드린다 */
function avatarSVG(k,size){
  const a=AVATAR_MAP[k]||AVATARS[0];size=size||36;
  if(a.src)return '<img class="av" src="'+a.src+'" width="'+size+'" height="'+size+'" alt="'+a.n+'" draggable="false" style="border-radius:25%;display:block;object-fit:cover">';
  return '<svg class="av" viewBox="0 0 64 64" width="'+size+'" height="'+size+'" aria-label="'+a.n+'">'+a.draw()+'</svg>';
}
/* 내(유저) 아바타 — 사진이 있으면 <img>, 없으면 이니셜. 컨테이너가 크기를 정한다 */
function userAvatar(size){
  size=size||36;
  if(USER.photo)return '<img class="uav" src="'+USER.photo+'" width="'+size+'" height="'+size+'" alt="'+String(USER.username||'').replace(/"/g,'&quot;')+'" draggable="false">';
  return '<span class="uav-init">'+userInitial()+'</span>';
}
/* 프로젝트/에이전트 객체에서 바로 — avatar가 없으면 이름으로 기본 배정 */
function avatarFor(o,size){return avatarSVG((o&&o.avatar)||avatarDefault(o&&o.name),size);}
/* 프로필을 안 고르면 이름으로 결정적 배정 — 같은 이름은 항상 같은 캐릭터 */
function avatarDefault(seed){
  let h=7;for(const c of String(seed||''))h=(h*31+c.charCodeAt(0))>>>0;
  return AVATARS[h%AVATARS.length].k;
}

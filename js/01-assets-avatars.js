/* ---------- 프로젝트 AI 프로필 캐릭터 20종 ----------
   프로젝트 채널은 슬랙형 UX라, 프로젝트 AI가 "사람처럼" 말하려면 얼굴이 있어야 한다.
   각 캐릭터는 64×64 그리드의 인라인 SVG 조각이고 배경(둥근 사각)까지 자체 포함이라
   어느 컨테이너에 넣어도 같은 모습이다. 나중에 일러스트 파일로 바꾸고 싶으면
   항목에 draw 대신 src:'assets/avatars/xxx.png' 을 주면 avatarSVG()가 <img>로 렌더한다. */

const AV_INK='#2D2D2B';
function avEyes(lx,rx,y,r){
  r=r||2.4;
  const one=x=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+AV_INK+'"/><circle cx="'+(x-r*.3)+'" cy="'+(y-r*.3)+'" r="'+(r*.34)+'" fill="#fff"/>';
  return one(lx)+one(rx);
}
function avBlush(lx,rx,y){
  const one=x=>'<ellipse cx="'+x+'" cy="'+y+'" rx="3.2" ry="1.9" fill="#F4A3A3" opacity=".72"/>';
  return one(lx)+one(rx);
}
/* ω 모양 입 — 코 아래에서 양쪽으로 */
function avW(x,y){return '<path d="M'+x+' '+y+' q-1.6 2.6 -3.8 1.2 M'+x+' '+y+' q1.6 2.6 3.8 1.2" fill="none" stroke="'+AV_INK+'" stroke-width="1.4" stroke-linecap="round"/>';}
/* 한 줄 미소 */
function avArc(x,y,w,d){return '<path d="M'+(x-w)+' '+y+' q'+w+' '+(d||w*.75)+' '+(2*w)+' 0" fill="none" stroke="'+AV_INK+'" stroke-width="1.5" stroke-linecap="round"/>';}
function avRing(cx,cy,R,n,r,fill){let s='';for(let i=0;i<n;i++){const a=Math.PI*2*i/n-Math.PI/2;s+='<circle cx="'+(cx+R*Math.cos(a)).toFixed(1)+'" cy="'+(cy+R*Math.sin(a)).toFixed(1)+'" r="'+r+'" fill="'+fill+'"/>';}return s;}

const AVATARS=[
 {k:'owl',n:'부엉이',bg:'#EFE6DA',draw:()=>
   '<path d="M17 25 L13 10 L27 19 Z M47 25 L51 10 L37 19 Z" fill="#B48A66"/>'
  +'<ellipse cx="32" cy="36" rx="18" ry="17" fill="#B48A66"/>'
  +'<circle cx="24" cy="36" r="8.6" fill="#F6E7D3"/><circle cx="40" cy="36" r="8.6" fill="#F6E7D3"/>'
  +avEyes(24,40,36,3.6)
  +'<path d="M30 41 h4 l-2 4.2z" fill="#F5A54A"/>'
  +'<path d="M25 49 l2.5 -2.5 2.5 2.5 M34 49 l2.5 -2.5 2.5 2.5" fill="none" stroke="#9E7452" stroke-width="1.2" stroke-linecap="round"/>'},
 {k:'robot',n:'로봇',bg:'#E4EAF2',draw:()=>
   '<path d="M32 18 v-6" stroke="#8FA3B8" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="10.5" r="2.8" fill="#EE7732"/>'
  +'<rect x="12" y="29" width="4" height="9" rx="1.5" fill="#8FA3B8"/><rect x="48" y="29" width="4" height="9" rx="1.5" fill="#8FA3B8"/>'
  +'<rect x="16" y="18" width="32" height="31" rx="8" fill="#8FA3B8"/>'
  +'<rect x="20" y="23" width="24" height="18" rx="5" fill="#2E3A4A"/>'
  +'<circle cx="26" cy="31" r="2.9" fill="#7FE3FF"/><circle cx="38" cy="31" r="2.9" fill="#7FE3FF"/>'
  +'<rect x="27" y="36.5" width="10" height="2" rx="1" fill="#7FE3FF"/>'
  +'<rect x="24" y="44" width="16" height="2.2" rx="1.1" fill="#6F8397"/>'},
 {k:'fox',n:'여우',bg:'#FFE9D6',draw:()=>
   '<path d="M14 32 L17 10 L30 21 Z M50 32 L47 10 L34 21 Z" fill="#F08C4A"/>'
  +'<path d="M19 27 L20 15 L27 21 Z M45 27 L44 15 L37 21 Z" fill="#3A2A22"/>'
  +'<circle cx="32" cy="36" r="18" fill="#F08C4A"/>'
  +'<ellipse cx="25" cy="43" rx="8" ry="6.5" fill="#FFF6EE"/><ellipse cx="39" cy="43" rx="8" ry="6.5" fill="#FFF6EE"/>'
  +avEyes(25,39,34)
  +'<ellipse cx="32" cy="40.5" rx="2.4" ry="1.8" fill="'+AV_INK+'"/>'+avW(32,42.3)},
 {k:'penguin',n:'펭귄',bg:'#DCE9F5',draw:()=>
   '<ellipse cx="32" cy="37" rx="17" ry="19" fill="#2E3A4A"/>'
  +'<ellipse cx="32" cy="39" rx="11.5" ry="12.5" fill="#fff"/>'
  +'<ellipse cx="13" cy="40" rx="3.5" ry="7" fill="#2E3A4A" transform="rotate(18 13 40)"/><ellipse cx="51" cy="40" rx="3.5" ry="7" fill="#2E3A4A" transform="rotate(-18 51 40)"/>'
  +avEyes(27,37,36)
  +'<path d="M28 41 L32 45.5 L36 41 L32 39.2 Z" fill="#F5A54A"/>'
  +avBlush(22,42,42)},
 {k:'bear',n:'곰',bg:'#F3E6D8',draw:()=>
   '<circle cx="17" cy="20" r="6.5" fill="#B98A5E"/><circle cx="47" cy="20" r="6.5" fill="#B98A5E"/>'
  +'<circle cx="17" cy="20" r="3.2" fill="#D9AE82"/><circle cx="47" cy="20" r="3.2" fill="#D9AE82"/>'
  +'<circle cx="32" cy="36" r="18" fill="#B98A5E"/>'
  +'<ellipse cx="32" cy="42" rx="7.5" ry="5.8" fill="#D9AE82"/>'
  +avEyes(25,39,33)
  +'<ellipse cx="32" cy="40" rx="2.7" ry="2" fill="'+AV_INK+'"/>'+avW(32,42)
  +avBlush(21,43,39)},
 {k:'cat',n:'고양이',bg:'#FDE7D2',draw:()=>
   '<path d="M16 31 L19 12 L31 22 Z M48 31 L45 12 L33 22 Z" fill="#F5B078"/>'
  +'<path d="M20 27 L21 17 L28 22 Z M44 27 L43 17 L36 22 Z" fill="#F7CFCB"/>'
  +'<circle cx="32" cy="36" r="18" fill="#F5B078"/>'
  +'<path d="M27 21 l1 5 M32 20 v5 M37 21 l-1 5" stroke="#D98B4A" stroke-width="1.6" stroke-linecap="round"/>'
  +avEyes(25,39,35)
  +'<path d="M30.4 39.5 h3.2 l-1.6 2.2z" fill="#E88A8A"/>'+avW(32,41.7)
  +'<path d="M12 39 l7 1 M12 44 l7 -1 M52 39 l-7 1 M52 44 l-7 -1" stroke="#D98B4A" stroke-width="1.1" stroke-linecap="round"/>'
  +avBlush(22,42,41)},
 {k:'dog',n:'강아지',bg:'#E6EEF9',draw:()=>
   '<rect x="8.5" y="22" width="11" height="23" rx="5.5" fill="#C9955E"/><rect x="44.5" y="22" width="11" height="23" rx="5.5" fill="#C9955E"/>'
  +'<circle cx="32" cy="36" r="18" fill="#E8C39E"/>'
  +'<ellipse cx="32" cy="42.5" rx="8" ry="6" fill="#F6E1C8"/>'
  +avEyes(25,39,34)
  +'<ellipse cx="32" cy="40" rx="3" ry="2.2" fill="'+AV_INK+'"/>'+avW(32,42.2)
  +'<ellipse cx="32" cy="46.5" rx="2.2" ry="1.6" fill="#F08FA8"/>'
  +avBlush(21,43,40)},
 {k:'rabbit',n:'토끼',bg:'#FCE4EC',draw:()=>
   '<ellipse cx="24" cy="15" rx="5" ry="13" fill="#fff" transform="rotate(-8 24 15)"/><ellipse cx="40" cy="15" rx="5" ry="13" fill="#fff" transform="rotate(8 40 15)"/>'
  +'<ellipse cx="24" cy="16" rx="2.4" ry="9" fill="#F9C0CB" transform="rotate(-8 24 16)"/><ellipse cx="40" cy="16" rx="2.4" ry="9" fill="#F9C0CB" transform="rotate(8 40 16)"/>'
  +'<circle cx="32" cy="37" r="17" fill="#fff"/>'
  +avEyes(25,39,36)
  +'<path d="M30.6 40.4 h2.8 l-1.4 2z" fill="#F08FA8"/>'+avW(32,42.4)
  +avBlush(22,42,41)},
 {k:'panda',n:'판다',bg:'#E8F0E4',draw:()=>
   '<circle cx="17" cy="20" r="6.5" fill="'+AV_INK+'"/><circle cx="47" cy="20" r="6.5" fill="'+AV_INK+'"/>'
  +'<circle cx="32" cy="36" r="18" fill="#fff"/>'
  +'<ellipse cx="25" cy="35" rx="5.2" ry="6.4" fill="'+AV_INK+'" transform="rotate(-14 25 35)"/><ellipse cx="39" cy="35" rx="5.2" ry="6.4" fill="'+AV_INK+'" transform="rotate(14 39 35)"/>'
  +'<circle cx="25.5" cy="35.5" r="2" fill="#fff"/><circle cx="38.5" cy="35.5" r="2" fill="#fff"/><circle cx="25.8" cy="35.8" r="1" fill="'+AV_INK+'"/><circle cx="38.2" cy="35.8" r="1" fill="'+AV_INK+'"/>'
  +'<ellipse cx="32" cy="42" rx="2.6" ry="1.9" fill="'+AV_INK+'"/>'+avW(32,43.9)
  +avBlush(20,44,42)},
 {k:'frog',n:'개구리',bg:'#E3F4E3',draw:()=>
   '<circle cx="23" cy="25" r="7.2" fill="#7CC66C"/><circle cx="41" cy="25" r="7.2" fill="#7CC66C"/>'
  +'<ellipse cx="32" cy="39" rx="19" ry="15" fill="#7CC66C"/>'
  +'<circle cx="23" cy="25" r="4.4" fill="#fff"/><circle cx="41" cy="25" r="4.4" fill="#fff"/>'
  +'<circle cx="23.6" cy="25.6" r="2.2" fill="'+AV_INK+'"/><circle cx="40.4" cy="25.6" r="2.2" fill="'+AV_INK+'"/>'
  +'<circle cx="29.5" cy="37" r="1" fill="#4F9A42"/><circle cx="34.5" cy="37" r="1" fill="#4F9A42"/>'
  +avArc(32,42,9,7)
  +avBlush(20,43,44)},
 {k:'lion',n:'사자',bg:'#FBE9C8',draw:()=>
   avRing(32,36,19.5,10,6,'#D98B3F')+'<circle cx="32" cy="36" r="20.5" fill="#D98B3F"/>'
  +'<circle cx="32" cy="36" r="15" fill="#F3C27A"/>'
  +'<circle cx="21" cy="25" r="4" fill="#F3C27A"/><circle cx="43" cy="25" r="4" fill="#F3C27A"/>'
  +avEyes(26,38,34)
  +'<ellipse cx="32" cy="39.5" rx="2.5" ry="1.9" fill="#8B5A2B"/>'+avW(32,41.4)
  +avBlush(23,41,40)},
 {k:'tiger',n:'호랑이',bg:'#FFEAD9',draw:()=>
   '<circle cx="18" cy="20" r="6.2" fill="#F09A4A"/><circle cx="46" cy="20" r="6.2" fill="#F09A4A"/>'
  +'<circle cx="18" cy="20" r="3" fill="#FFD9BF"/><circle cx="46" cy="20" r="3" fill="#FFD9BF"/>'
  +'<circle cx="32" cy="36" r="18" fill="#F09A4A"/>'
  +'<path d="M27 20.5 l2 6 M32 19 v7 M37 20.5 l-2 6 M15 33 l5 2 M15 40 l5 -1 M49 33 l-5 2 M49 40 l-5 -1" stroke="'+AV_INK+'" stroke-width="1.7" stroke-linecap="round"/>'
  +'<ellipse cx="32" cy="43" rx="8.5" ry="5.6" fill="#FFF6EE"/>'
  +avEyes(25,39,34)
  +'<path d="M30.4 40 h3.2 l-1.6 2.2z" fill="#E88A8A"/>'+avW(32,42.2)},
 {k:'pig',n:'돼지',bg:'#FDE2EC',draw:()=>
   '<path d="M16 31 L18 14 L31 23 Z M48 31 L46 14 L33 23 Z" fill="#F7B4C4"/>'
  +'<path d="M20 27 L21 19 L28 24 Z M44 27 L43 19 L36 24 Z" fill="#F08FA8"/>'
  +'<circle cx="32" cy="36" r="18" fill="#F7B4C4"/>'
  +avEyes(25,39,33)
  +'<ellipse cx="32" cy="41.5" rx="7" ry="5" fill="#F08FA8"/>'
  +'<ellipse cx="29.6" cy="41.5" rx="1.3" ry="1.8" fill="#C9536F"/><ellipse cx="34.4" cy="41.5" rx="1.3" ry="1.8" fill="#C9536F"/>'
  +avBlush(20,44,39)},
 {k:'koala',n:'코알라',bg:'#E7EEF3',draw:()=>
   '<circle cx="14" cy="29" r="10" fill="#A9B4BC"/><circle cx="50" cy="29" r="10" fill="#A9B4BC"/>'
  +'<circle cx="14" cy="29" r="5.5" fill="#E9C9CF"/><circle cx="50" cy="29" r="5.5" fill="#E9C9CF"/>'
  +'<circle cx="32" cy="36" r="17.5" fill="#A9B4BC"/>'
  +avEyes(24.5,39.5,33)
  +'<rect x="27.6" y="36" width="8.8" height="9.5" rx="4.4" fill="'+AV_INK+'"/>'
  +avBlush(20,44,41)},
 {k:'hamster',n:'햄스터',bg:'#FFF1D6',draw:()=>
   '<circle cx="20" cy="21" r="5.6" fill="#E9B978"/><circle cx="44" cy="21" r="5.6" fill="#E9B978"/>'
  +'<circle cx="20" cy="21" r="2.8" fill="#F5D5A8"/><circle cx="44" cy="21" r="2.8" fill="#F5D5A8"/>'
  +'<ellipse cx="32" cy="37" rx="19" ry="16.5" fill="#E9B978"/>'
  +'<ellipse cx="20.5" cy="42" rx="7.5" ry="6.2" fill="#F5D5A8"/><ellipse cx="43.5" cy="42" rx="7.5" ry="6.2" fill="#F5D5A8"/>'
  +avEyes(26,38,34)
  +'<path d="M30.8 38.6 h2.4 l-1.2 1.8z" fill="#E88A8A"/>'+avW(32,40.4)
  +avBlush(20.5,43.5,42.5)},
 {k:'chick',n:'병아리',bg:'#FFF6CC',draw:()=>
   '<path d="M28 22 q0 -7 2 -9 M32 21 q0 -8 0 -10 M36 22 q0 -7 -2 -9" fill="none" stroke="#E6B800" stroke-width="2" stroke-linecap="round"/>'
  +'<circle cx="32" cy="37" r="17" fill="#FFD84A"/>'
  +'<ellipse cx="15.5" cy="40" rx="4" ry="7" fill="#F2C93A" transform="rotate(18 15.5 40)"/><ellipse cx="48.5" cy="40" rx="4" ry="7" fill="#F2C93A" transform="rotate(-18 48.5 40)"/>'
  +avEyes(26,38,35)
  +'<path d="M28.5 40 L32 43 L35.5 40 L32 38.2 Z" fill="#F5A54A"/>'
  +avBlush(22,42,41)},
 {k:'octopus',n:'문어',bg:'#EEE6F7',draw:()=>
   '<circle cx="15" cy="47" r="5.5" fill="#B48AD9"/><circle cx="23.5" cy="50" r="5.5" fill="#B48AD9"/><circle cx="32" cy="51" r="5.5" fill="#B48AD9"/><circle cx="40.5" cy="50" r="5.5" fill="#B48AD9"/><circle cx="49" cy="47" r="5.5" fill="#B48AD9"/>'
  +'<rect x="14" y="30" width="36" height="17" fill="#B48AD9"/>'
  +'<ellipse cx="32" cy="31" rx="18" ry="16" fill="#B48AD9"/>'
  +'<circle cx="15" cy="49" r="1.6" fill="#D6BEEB"/><circle cx="23.5" cy="52" r="1.6" fill="#D6BEEB"/><circle cx="32" cy="53" r="1.6" fill="#D6BEEB"/><circle cx="40.5" cy="52" r="1.6" fill="#D6BEEB"/><circle cx="49" cy="49" r="1.6" fill="#D6BEEB"/>'
  +avEyes(25,39,31)
  +avArc(32,37,4,3.2)
  +avBlush(20,44,36)},
 {k:'alien',n:'외계인',bg:'#E6F5EA',draw:()=>
   '<path d="M26 17 l-4.5 -8 M38 17 l4.5 -8" stroke="#6FB86A" stroke-width="1.8" stroke-linecap="round"/><circle cx="21" cy="8" r="2.6" fill="#6FB86A"/><circle cx="43" cy="8" r="2.6" fill="#6FB86A"/>'
  +'<path d="M32 15 c12 0 18 9 18 18 c0 11 -8 20 -18 20 c-10 0 -18 -9 -18 -20 c0 -9 6 -18 18 -18z" fill="#9ED88E"/>'
  +'<ellipse cx="25" cy="34" rx="4.2" ry="6.4" fill="'+AV_INK+'" transform="rotate(16 25 34)"/><ellipse cx="39" cy="34" rx="4.2" ry="6.4" fill="'+AV_INK+'" transform="rotate(-16 39 34)"/>'
  +'<circle cx="24" cy="31.5" r="1.3" fill="#fff"/><circle cx="38" cy="31.5" r="1.3" fill="#fff"/>'
  +avArc(32,44,3.4,2.6)
  +avBlush(19,45,41)},
 {k:'ghost',n:'유령',bg:'#ECEBF3',draw:()=>
   '<path d="M15 50 V33 a17 17 0 0 1 34 0 V50 l-5.7 -4.2 -5.6 4.2 -5.7 -4.2 -5.6 4.2 -5.7 -4.2z" fill="#fff" stroke="#DDDCE4" stroke-width="1"/>'
  +avEyes(25,39,33,2.7)
  +'<ellipse cx="32" cy="40.5" rx="2.1" ry="2.9" fill="'+AV_INK+'"/>'
  +avBlush(21,43,39)},
 {k:'dino',n:'공룡',bg:'#E4F3EE',draw:()=>
   '<path d="M20 25 l4 -9 4 9z M29 21 l3.5 -10 3.5 10z M38 25 l4 -9 4 9z" fill="#4FA982"/>'
  +'<ellipse cx="32" cy="37" rx="18" ry="16" fill="#6FC7A0"/>'
  +'<ellipse cx="32" cy="46" rx="10" ry="5" fill="#A8E3C8"/>'
  +avEyes(25,39,34)
  +'<circle cx="29.5" cy="40" r="1" fill="#3E8F6C"/><circle cx="34.5" cy="40" r="1" fill="#3E8F6C"/>'
  +avArc(32,43.5,7,5)
  +avBlush(20,44,41)},
];
const AVATAR_MAP={};AVATARS.forEach(a=>{AVATAR_MAP[a.k]=a;});

/* 렌더 — 항목이 src를 가지면 이미지 파일, 아니면 인라인 SVG */
function avatarSVG(k,size){
  const a=AVATAR_MAP[k]||AVATARS[0];size=size||36;
  if(a.src)return '<img class="av" src="'+a.src+'" width="'+size+'" height="'+size+'" alt="'+a.n+'" style="border-radius:25%;display:block">';
  return '<svg class="av" viewBox="0 0 64 64" width="'+size+'" height="'+size+'" aria-label="'+a.n+'"><rect width="64" height="64" rx="16" fill="'+a.bg+'"/>'+a.draw()+'</svg>';
}
/* 프로젝트/에이전트 객체에서 바로 — avatar가 없으면 이름으로 기본 배정 */
function avatarFor(o,size){return avatarSVG((o&&o.avatar)||avatarDefault(o&&o.name),size);}
/* 프로필을 안 고르면 이름으로 결정적 배정 — 같은 이름은 항상 같은 캐릭터 */
function avatarDefault(seed){
  let h=7;for(const c of String(seed||''))h=(h*31+c.charCodeAt(0))>>>0;
  return AVATARS[h%AVATARS.length].k;
}

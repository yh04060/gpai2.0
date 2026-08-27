/* ---------- canvas thumbnails ---------- */
function gaussSVG(fill,stroke,extra){return '<svg viewBox="0 0 200 120">'
 +'<g stroke="#F0F3F6" stroke-width="1">'+[40,80,120,160].map(x=>'<line x1="'+x+'" y1="24" x2="'+x+'" y2="100"/>').join('')+[44,62,80].map(y=>'<line x1="16" y1="'+y+'" x2="184" y2="'+y+'"/>').join('')+'</g>'
 +'<text x="100" y="14" text-anchor="middle" font-size="6.5" fill="#55606E">가우스 정규분포 곡선</text>'
 +'<path d="M18 100 C 58 100, 74 28, 100 28 C 126 28, 142 100, 182 100 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.4"/>'
 +'<line x1="100" y1="26" x2="100" y2="100" stroke="#D64541" stroke-width="1" stroke-dasharray="3 2.5"/>'
 +'<line x1="14" y1="100" x2="186" y2="100" stroke="#B8C0CA" stroke-width="1"/>'
 +(extra||'')+'</svg>';}
const G_LEGEND='<rect x="132" y="22" width="52" height="24" fill="#fff" stroke="#E4E8EC"/><line x1="136" y1="28" x2="146" y2="28" stroke="#6C93C4" stroke-width="1.4"/><rect x="136" y="32" width="10" height="4" fill="#C9DCEF"/><line x1="136" y1="41" x2="146" y2="41" stroke="#D64541" stroke-width="1" stroke-dasharray="2 2"/>';
const G_ANNOT='<path d="M104 32 L146 20" stroke="#D64541" stroke-width=".9" fill="none"/><text x="148" y="20" font-size="5.5" fill="#D64541">최댓값 σ</text>';

const CV_SVGS={
 gauss1:gaussSVG('#C7DCEE','#5B84AE',''),
 gauss2:gaussSVG('#C7DCEE','#5B84AE',G_LEGEND),
 gauss3:gaussSVG('#DCEAF5','#7BA1C4',G_LEGEND),
 gauss4:gaussSVG('#E4EEF7','#3E76D6',G_ANNOT),
 gauss5:gaussSVG('#D8ECF6','#86B7D4',''),
 atp:'<svg viewBox="0 0 200 120"><g stroke="#4A4A48" stroke-width="1.1" fill="none">'
  +'<path d="M28 46 l12-8 14 4 2 14 -12 8 -14-4z"/><path d="M54 42 l12-10 12 6 -2 12"/><path d="M56 64 l10 12 14-2 4-14"/><path d="M84 60 l12 6 12-6 12 6 12-6"/>'
  +'<circle cx="146" cy="58" r="7"/><circle cx="164" cy="50" r="7"/><circle cx="180" cy="42" r="7"/></g>'
  +'<g font-size="6" fill="#4A4A48" font-family="Arial" text-anchor="middle"><text x="146" y="60">P</text><text x="164" y="52">P</text><text x="180" y="44">P</text></g>'
  +'<g font-size="5.5" fill="#8A8A88" font-family="Arial"><text x="18" y="34">NH₂</text><text x="52" y="90">HO</text><text x="74" y="94">OH</text></g></svg>',
 b12:'<svg viewBox="0 0 200 120"><g stroke="#4A4A48" stroke-width="1" fill="none">'
  +'<path d="M78 34l12-7 12 7v14l-12 7-12-7z"/><path d="M110 42l12-7 12 7v14l-12 7-12-7z"/><path d="M78 62l12-7 12 7v14l-12 7-12-7z"/><path d="M110 70l12-7 12 7v14l-12 7-12-7z"/>'
  +'<path d="M102 48 L108 52 M102 76 L108 80 M92 55 L92 60 M132 63 L132 68"/><circle cx="104" cy="60" r="3.4"/>'
  +'<path d="M66 40 l-14-6 M66 78 l-14 8 M146 48 l14-8 M146 86 l12 6 M96 22 l-4-10 M120 98 l4 10"/></g>'
  +'<g font-size="5.5" fill="#8A8A88" font-family="Arial"><text x="34" y="30">H₂N</text><text x="162" y="36">NH₂</text><text x="34" y="94">O</text><text x="162" y="98">N</text></g>'
  +'<text x="104" y="62" font-size="4.6" fill="#4A4A48" text-anchor="middle">Co</text></svg>',
 circuit:'<svg viewBox="0 0 200 120"><g stroke="#3C3C3A" stroke-width="1" fill="none">'
  +'<path d="M40 34 h30 l4-6 6 12 6-12 6 12 4-6 h14"/><path d="M110 34 h14 l4-6 6 12 6-12 6 12 4-6 h10"/>'
  +'<path d="M40 34 v52 h120 v-52"/><path d="M110 34 v18 l-5 3 10 4 -10 4 10 4 -5 3 v14"/>'
  +'<circle cx="40" cy="60" r="8" fill="#fff"/><path d="M36.5 60 h7 M40 56.5 v7"/>'
  +'<path d="M100 86 v10 m-6 0 h12 m-9 4 h6 m-4.5 3.5 h3"/></g>'
  +'<g font-size="6" fill="#55554F" font-family="Georgia,serif" font-style="italic"><text x="58" y="24">R₁</text><text x="132" y="24">R₂</text><text x="118" y="60">R₃</text><text x="24" y="50">V</text><text x="62" y="64">루프 1</text><text x="132" y="64">루프 2</text></g>'
  +'<path d="M68 70 a8 8 0 1 1 3 5" stroke="#9C9C9A" fill="none" stroke-width=".8"/><path d="M138 70 a8 8 0 1 1 3 5" stroke="#9C9C9A" fill="none" stroke-width=".8"/></svg>',
 reaction:'<svg viewBox="0 0 200 120"><g font-family="Georgia,serif" font-size="13" fill="#2A2A28">'
  +'<text x="22" y="66">+</text><text x="44" y="66">O</text><text x="72" y="66">O</text>'
  +'<text x="126" y="66">O</text><text x="150" y="66">C</text><text x="174" y="66">O</text></g>'
  +'<g stroke="#2A2A28" stroke-width="1.2"><path d="M56 59 h14 M56 63 h14"/><path d="M138 59 h10 M138 63 h10 M161 59 h11 M161 63 h11"/></g>'
  +'<path d="M92 61 h20 m-6-4 6 4 -6 4" stroke="#2A2A28" stroke-width="1.2" fill="none"/>'
  +'<text x="98" y="78" font-size="6.5" fill="#8A8A88" font-family="Georgia,serif">Δ</text></svg>',
 stem:'<svg viewBox="0 0 200 120"><defs><linearGradient id="gStem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1838"/><stop offset="1" stop-color="#1C2B5E"/></linearGradient></defs>'
  +'<rect width="200" height="120" fill="url(#gStem)"/>'
  +'<text x="14" y="20" font-size="7" fill="#CFE4FF" font-weight="600" letter-spacing="1">줄기세포 클러스터</text>'
  +'<g fill="rgba(110,200,255,.16)" stroke="rgba(140,215,255,.75)" stroke-width="1.2"><circle cx="86" cy="62" r="16"/><circle cx="110" cy="52" r="15"/><circle cx="118" cy="74" r="14"/><circle cx="94" cy="84" r="13"/><circle cx="72" cy="78" r="12"/><circle cx="100" cy="66" r="15"/></g>'
  +'<g fill="rgba(190,235,255,.55)"><circle cx="86" cy="62" r="5"/><circle cx="110" cy="52" r="4.5"/><circle cx="118" cy="74" r="4"/><circle cx="94" cy="84" r="4"/><circle cx="72" cy="78" r="3.5"/><circle cx="100" cy="66" r="4.5"/></g>'
  +'<path d="M126 50 L156 40" stroke="rgba(160,210,255,.6)" stroke-width=".8"/><text x="158" y="40" font-size="5.5" fill="#AFCDF2">핵</text>'
  +'<path d="M124 80 L156 92" stroke="rgba(160,210,255,.6)" stroke-width=".8"/><text x="144" y="101" font-size="5.5" fill="#AFCDF2">세포막</text></svg>',
 dna:'<svg viewBox="0 0 200 120"><defs><linearGradient id="gDna" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050D28"/><stop offset="1" stop-color="#0E2352"/></linearGradient></defs>'
  +'<rect width="200" height="120" fill="url(#gDna)"/>'
  +'<g fill="none" stroke-linecap="round"><path d="M70 6 C110 34 110 86 70 114" stroke="#5FA8F0" stroke-width="4"/><path d="M130 6 C90 34 90 86 130 114" stroke="#2E6BC8" stroke-width="4"/></g>'
  +'<g stroke="#9CC8F5" stroke-width="2" opacity=".85"><path d="M84 22 h32"/><path d="M93 38 h14"/><path d="M93 82 h14"/><path d="M84 98 h32"/></g>'
  +'<text x="128" y="102" font-size="5.5" fill="#9FBEE8">당-인산 골격</text></svg>',
 bridge:'<svg viewBox="0 0 200 120"><defs><path id="zz" d="M-11 0 H-8 L-6 -5 L-2 5 L2 -5 L6 5 L8 0 H11" stroke="#3C3C3A" stroke-width="1" fill="none"/></defs>'
  +'<g stroke="#3C3C3A" stroke-width="1" fill="none"><path d="M100 18 L152 60 L100 102 L48 60 Z"/><circle cx="100" cy="60" r="9" fill="#fff"/><path d="M48 60 h43 M109 60 h43"/><path d="M48 60 H31"/><path d="M100 102 v12 H24 V67"/><circle cx="24" cy="60" r="7" fill="#fff"/><path d="M21 60 h6 M24 57 v6"/></g>'
  +'<use href="#zz" transform="translate(74 39) rotate(-39)"/><use href="#zz" transform="translate(126 39) rotate(39)"/><use href="#zz" transform="translate(74 81) rotate(39)"/><use href="#zz" transform="translate(126 81) rotate(-39)"/>'
  +'<text x="100" y="63" text-anchor="middle" font-size="5.5" fill="#3C3C3A" font-family="Georgia,serif">G</text>'
  +'<g font-size="6" font-family="Georgia,serif" font-style="italic" fill="#55554F"><text x="58" y="26">R₁</text><text x="132" y="26">R₂</text><text x="58" y="102">R₃</text><text x="132" y="102">R₄</text><text x="10" y="50">V</text></g></svg>',
 methanol:'<svg viewBox="0 0 200 120"><line x1="16" y1="62" x2="184" y2="62" stroke="#55554F" stroke-width="1"/>'
  +[38,50,62,86,98,122,134,146,160].map(x=>'<line x1="'+x+'" y1="56" x2="'+x+'" y2="68" stroke="#C0392B" stroke-width="1.2"/>').join('')
  +[44,92,140,166].map(x=>'<circle cx="'+x+'" cy="62" r="1.6" fill="#2A2A28"/>').join('')
  +'<text x="16" y="50" font-size="5.5" fill="#8A8A88" font-family="Arial">CH₃OH</text><text x="166" y="50" font-size="5.5" fill="#8A8A88" font-family="Arial">CO₂</text></svg>',
 atp3d:'<svg viewBox="0 0 200 120"><g stroke="#9A9A98" stroke-width="1"><path d="M58 52 L84 64 M108 66 L132 54 L152 46 L172 38" fill="none"/></g>'
  +'<g fill="#4A7BD0" stroke="#2E5AA8" stroke-width="1"><circle cx="34" cy="52" r="5"/><circle cx="46" cy="42" r="5"/><circle cx="58" cy="52" r="5"/><circle cx="46" cy="62" r="5"/><circle cx="58" cy="66" r="4.4"/></g>'
  +'<g fill="#E06040" stroke="#B84A30" stroke-width="1"><circle cx="84" cy="64" r="5"/><circle cx="96" cy="56" r="5"/><circle cx="108" cy="66" r="5"/><circle cx="92" cy="74" r="4.4"/><circle cx="104" cy="76" r="4.4"/></g>'
  +'<g fill="#EFBB2A" stroke="#C79614" stroke-width="1"><circle cx="132" cy="54" r="6.4"/><circle cx="152" cy="46" r="6.4"/><circle cx="172" cy="38" r="6.4"/></g>'
  +'<g fill="#E06040"><circle cx="142" cy="50" r="2.6"/><circle cx="162" cy="42" r="2.6"/><circle cx="128" cy="64" r="2.6"/><circle cx="148" cy="56" r="2.6"/></g>'
  +'<g font-size="5.5" fill="#6B6B69" font-family="Arial"><text x="24" y="86">아데닌</text><text x="84" y="92">리보스</text><text x="128" y="80">삼인산기</text></g>'
  +'<rect x="30" y="100" width="140" height="12" rx="2" fill="#F1F1EF"/><text x="100" y="108.5" text-anchor="middle" font-size="6" fill="#3C3C3A" font-family="Arial">ATP (아데노신 삼인산)</text></svg>',
};
const CV_PLUS='<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 4.5v11M4.5 10h11"/></svg>';

const CV_ITEMS=[
 {kind:'plus',name:'새 캔버스',date:'처음부터 시작하기'},
 {kind:'empty',name:'제목 없음',date:'2026년 6월 11일'},
 {kind:'gauss1',name:'가우스정규분포 곡선 만들어줘.',date:'2026년 6월 10일'},
 {kind:'atp',name:'ATP 분자구조 그려줘.',date:'2026년 5월 31일'},
 {kind:'gauss2',name:'가우스정규분포 곡선 만들어줘.',date:'2026년 5월 31일'},
 {kind:'gauss3',name:'가우스 정규분포 곡선 그려줘.',date:'2026년 5월 27일'},
 {kind:'gauss4',name:'가우스 정규분포 곡선 그려줘.',date:'2026년 5월 27일'},
 {kind:'stem',name:'줄기세포 그려줘.',date:'2026년 5월 26일'},
 {kind:'circuit',name:'키르히호프 법칙 설명해줘',date:'2026년 5월 12일'},
 {kind:'reaction',name:'메테인 연소 반응에 대한 반응식',date:'2026년 5월 12일'},
 {kind:'empty',name:'제목 없음',date:'2026년 5월 12일'},
 {kind:'atp',name:'ATP 구조 그려줘',date:'2026년 5월 12일'},
 {kind:'gauss5',name:'정규분포에 대해서 시각화 해줘',date:'2026년 5월 5일'},
 {kind:'dna',name:'DNA 이중나선 그려줘.',date:'2026년 5월 5일'},
 {kind:'empty',name:'제목 없음',date:'2026년 4월 30일'},
 {kind:'atp3d',name:'ATP 구조 그려줘.',date:'2026년 3월 15일'},
 {kind:'bridge',name:'휘트스톤 브릿지 그려줘.',date:'2026년 3월 14일'},
 {kind:'atp',name:'ATP 구조 그려줘.',date:'2026년 3월 12일'},
 {kind:'methanol',name:'메탄올의 연소 과정에 대한 화학반응 설명해줘.',date:'2026년 3월 10일'},
 {kind:'b12',name:'비타민 B12 분자 구조 그려줘.',date:'2026년 3월 8일'},
];
function renderCanvas(){
 $('#cvGrid').innerHTML=CV_ITEMS.map(it=>{
  let thumb;
  if(it.kind==='plus')thumb='<div class="cvc-thumb tplus">'+CV_PLUS+'</div>';
  else if(it.kind==='empty')thumb='<div class="cvc-thumb tempty"></div>';
  else thumb='<div class="cvc-thumb">'+CV_SVGS[it.kind]+'</div>';
  return '<div class="cvc">'+thumb+'<div class="cvc-name">'+it.name+'</div><div class="cvc-date">'+it.date+'</div></div>';
 }).join('');
}


/* ---------- drive item assets ---------- */
const ICON_DOTS='<svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor"><circle cx="4.5" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="15.5" cy="10" r="1.5"/></svg>';

const SVG_FOLDER='<svg class="folder-ic" viewBox="0 0 64 50"><path d="M6 25V11a5 5 0 0 1 5-5h11.8a5 5 0 0 1 4.1 2.1L29 11h24a5 5 0 0 1 5 5v9z" fill="#9CBAEA"/><rect x="6" y="15.5" width="52" height="29.5" rx="5" fill="#ACC7F0"/></svg>';

const SVG_PNG='<svg class="thumb" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice">'
+'<rect width="300" height="240" fill="#D9E7F4"/>'
+'<text x="150" y="36" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="600" fill="#2E4E6E">제품 형태 진화 예시</text>'
+'<g fill="#4A6A8A" font-family="Arial" font-size="9" text-anchor="middle"><text x="62" y="60">저장 용기</text><text x="150" y="60">자전거 프레임</text><text x="238" y="60">항공기 동체</text></g>'
+'<g stroke="#3E5F80" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">'
+'<ellipse cx="62" cy="86" rx="24" ry="8"/><path d="M38 86v50a24 8 0 0 0 48 0V86"/><path d="M38 116c6 5 42 5 48 0"/>'
+'<path d="M128 148l22-46 24 46z"/><path d="M150 102l-13-9"/><circle cx="128" cy="148" r="7"/><circle cx="174" cy="148" r="7"/>'
+'<path d="M214 148c1-36 14-58 24-62 10 4 23 26 24 62"/><path d="M222 118h32"/><path d="M218 134h40"/>'
+'</g>'
+'<g stroke="#7C99B5" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M92 100h12M99 95l6 5-6 5"/><path d="M186 100h12M193 95l6 5-6 5"/></g>'
+'</svg>';

const SVG_PDF='<svg class="thumb" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice">'
+'<rect width="300" height="240" fill="#F4F4F2"/>'
+'<rect x="88" y="14" width="124" height="212" rx="3" fill="#fff" stroke="#E2E2E0"/>'
+'<rect x="98" y="26" width="13" height="13" rx="2" fill="#1F1F1D"/><text x="104.5" y="36" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff" font-family="Arial">3</text>'
+'<rect x="156" y="26" width="13" height="13" rx="2" fill="#1F1F1D"/><text x="162.5" y="36" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff" font-family="Arial">3</text>'
+'<g fill="#CFCFCD">'
+'<rect x="98" y="48" width="44" height="3" rx="1.5"/><rect x="98" y="56" width="38" height="3" rx="1.5"/><rect x="98" y="64" width="42" height="3" rx="1.5"/><rect x="98" y="72" width="30" height="3" rx="1.5"/><rect x="98" y="88" width="40" height="3" rx="1.5"/><rect x="98" y="96" width="44" height="3" rx="1.5"/><rect x="98" y="104" width="34" height="3" rx="1.5"/>'
+'<rect x="156" y="48" width="44" height="3" rx="1.5"/><rect x="156" y="56" width="40" height="3" rx="1.5"/><rect x="156" y="64" width="32" height="3" rx="1.5"/><rect x="156" y="80" width="42" height="3" rx="1.5"/><rect x="156" y="88" width="36" height="3" rx="1.5"/>'
+'</g>'
+'<g stroke="#5B79C9" stroke-width="1.5" fill="none" stroke-linecap="round">'
+'<path d="M98 128c5-5 9 3 14-1s8 2 13-2 9 1 13-2"/><path d="M98 140c6-4 10 2 16-1s9 2 14-2"/><path d="M156 108c5-4 9 2 14-1s8 2 12-2"/>'
+'</g>'
+'<rect x="156" y="126" width="44" height="30" rx="2" fill="none" stroke="#D8D8D6"/>'
+'<g stroke="#5B79C9" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M162 140c4-3 8 2 12-1s8 1 12-2"/></g>'
+'<rect x="98" y="200" width="60" height="8" rx="2" fill="#2B2B29"/>'
+'</svg>';

const SVG_DOC='<svg class="thumb" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice">'
+'<rect width="300" height="240" fill="#F4F4F2"/>'
+'<rect x="88" y="14" width="124" height="212" rx="3" fill="#fff" stroke="#E2E2E0"/>'
+'<rect x="98" y="26" width="15" height="15" rx="3" fill="#2B7CD3"/><text x="105.5" y="37.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" font-family="Arial">W</text>'
+'<rect x="98" y="52" width="80" height="5" rx="2.5" fill="#9C9C9A"/>'
+'<g fill="#D8D8D6"><rect x="98" y="68" width="104" height="3" rx="1.5"/><rect x="98" y="76" width="96" height="3" rx="1.5"/><rect x="98" y="84" width="100" height="3" rx="1.5"/><rect x="98" y="92" width="70" height="3" rx="1.5"/></g>'
+'<rect x="98" y="108" width="56" height="4" rx="2" fill="#2B7CD3" opacity=".55"/>'
+'<g fill="#D8D8D6"><rect x="98" y="120" width="104" height="3" rx="1.5"/><rect x="98" y="128" width="88" height="3" rx="1.5"/><rect x="98" y="136" width="98" height="3" rx="1.5"/></g>'
+'<rect x="98" y="152" width="48" height="4" rx="2" fill="#2B7CD3" opacity=".55"/>'
+'<g fill="#D8D8D6"><rect x="98" y="164" width="100" height="3" rx="1.5"/><rect x="98" y="172" width="92" height="3" rx="1.5"/><rect x="98" y="180" width="60" height="3" rx="1.5"/></g>'
+'</svg>';

const SVG_XLSX='<svg class="thumb" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice">'
+'<rect width="300" height="240" fill="#F4F4F2"/>'
+'<rect x="88" y="14" width="124" height="212" rx="3" fill="#fff" stroke="#E2E2E0"/>'
+'<rect x="98" y="26" width="15" height="15" rx="3" fill="#217346"/><text x="105.5" y="37.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" font-family="Arial">X</text>'
+'<rect x="98" y="52" width="104" height="13" fill="#E4F0E9"/>'
+'<g stroke="#DCE3DE" stroke-width="1">'
+[0,13,26,39,52,65,78,91,104,117].map(dy=>'<line x1="98" y1="'+(52+dy)+'" x2="202" y2="'+(52+dy)+'"/>').join('')
+[0,26,52,78,104].map(dx=>'<line x1="'+(98+dx)+'" y1="52" x2="'+(98+dx)+'" y2="169"/>').join('')
+'</g>'
+'<g font-size="7.5" fill="#4A4A48" font-family="Arial" text-anchor="end"><text x="148" y="75">500</text><text x="148" y="88">500</text><text x="148" y="101">500</text><text x="148" y="127">3000</text></g>'
+'<g fill="#C9C9C7"><rect x="102" y="70" width="16" height="3" rx="1.5"/><rect x="102" y="83" width="14" height="3" rx="1.5"/><rect x="102" y="96" width="18" height="3" rx="1.5"/></g>'
+'<g fill="#D8D8D6"><rect x="98" y="184" width="70" height="3" rx="1.5"/><rect x="98" y="192" width="90" height="3" rx="1.5"/></g>'
+'</svg>';

const SVG_PPT='<svg class="thumb" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice">'
+'<rect width="300" height="240" fill="#F4F4F2"/>'
+'<rect x="52" y="46" width="90" height="5" rx="2.5" fill="#9C9C9A"/>'
+'<rect x="52" y="64" width="196" height="110" rx="4" fill="#fff" stroke="#E2E2E0"/>'
+'<rect x="60" y="72" width="15" height="15" rx="3" fill="#D04423"/><text x="67.5" y="83.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" font-family="Arial">P</text>'
+'<rect x="106" y="90" width="88" height="56" fill="#BF4B2C"/>'
+'<rect x="84" y="184" width="132" height="4" rx="2" fill="#D8D8D6"/>'
+'<rect x="100" y="194" width="100" height="4" rx="2" fill="#E4E4E2"/>'
+'</svg>';

const SVG_YT='<svg class="thumb" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice">'
+'<defs><linearGradient id="gYt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#17233C"/><stop offset="1" stop-color="#060A14"/></linearGradient></defs>'
+'<rect width="300" height="240" fill="url(#gYt)"/>'
+'<rect x="16" y="16" width="56" height="19" rx="4" fill="rgba(255,255,255,.14)"/><text x="44" y="29.5" text-anchor="middle" font-size="10" fill="#fff" font-family="Arial">아스쇼</text>'
+'<rect x="252" y="14" width="26" height="26" rx="6" fill="#FF0558"/><text x="265" y="32" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="Arial">W</text>'
+'<text x="20" y="112" font-size="23" font-weight="800" fill="#fff" font-family="Arial">한때 몸값 3000억</text>'
+'<text x="20" y="142" font-size="23" font-weight="800" fill="#7ED3F2" font-family="Arial">왓챠는 왜 42억원에?</text>'
+'<rect x="122" y="164" width="56" height="38" rx="10" fill="#E62117"/><path d="M141 174 l20 9 -20 9z" fill="#fff"/>'
+'<rect x="234" y="206" width="50" height="20" rx="4" fill="rgba(0,0,0,.72)"/><text x="259" y="220" text-anchor="middle" font-size="11" fill="#fff" font-family="Arial">24:34</text>'
+'</svg>';

/* file-type icons (Google Drive style) */
function fIcon(kind,w){
  if(kind==='yt')return '<svg width="'+w+'" height="'+Math.round(w*0.72)+'" viewBox="0 0 40 29"><rect width="40" height="29" rx="7.5" fill="#E62117"/><path d="M16 8.5l12 6-12 6z" fill="#fff"/></svg>';
  const C={pdf:'#E2574C',doc:'#2B7CD3',xlsx:'#217346',ppt:'#D04423',png:'#C5221F'}[kind]||'#8A8A88';
  let g='';
  if(kind==='pdf')g='<text x="20" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="Arial">PDF</text>';
  else if(kind==='doc')g='<g fill="#fff"><rect x="11" y="22" width="18" height="2.6" rx="1.3"/><rect x="11" y="27.5" width="18" height="2.6" rx="1.3"/><rect x="11" y="33" width="18" height="2.6" rx="1.3"/><rect x="11" y="38.5" width="11" height="2.6" rx="1.3"/></g>';
  else if(kind==='xlsx')g='<g stroke="#fff" stroke-width="1.6" fill="none"><rect x="11.5" y="22" width="17" height="15" rx="1"/><path d="M11.5 27h17M11.5 32h17M17.2 22v15M22.9 22v15"/></g>';
  else if(kind==='ppt')g='<rect x="11" y="22.5" width="18" height="13.5" rx="1.5" fill="none" stroke="#fff" stroke-width="1.8"/><rect x="14" y="26" width="9" height="3.2" fill="#fff"/><rect x="14" y="30.8" width="12" height="2" fill="#fff"/>';
  else if(kind==='png')g='<circle cx="15.5" cy="24.5" r="2.6" fill="#fff"/><path d="M11 39.5 18 30l4.8 5.6 3.2-3.4 4 7.3z" fill="#fff"/>';
  return '<svg width="'+w+'" height="'+Math.round(w*1.2)+'" viewBox="0 0 40 48"><path d="M4 6a4 4 0 0 1 4-4h16.5L36 13.5V42a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="'+C+'"/><path d="M24.5 2 36 13.5h-8.5a3 3 0 0 1-3-3z" fill="rgba(255,255,255,.38)"/>'+g+'</svg>';
}
const LOC_IC='<svg class="ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.75" y="3.75" width="14.5" height="12.5" rx="2.5"/><path d="M2.75 11h3.7l1.3 1.9h4.5l1.3-1.9h3.7"/></svg>';
const LIST_HEAD='<div class="lhead"><span class="lc-name">이름</span><span class="lc-meta">유형 · 크기</span><span class="lc-owner">소유자</span><span class="lc-loc">위치</span><span style="width:28px"></span></div>';

const MINI_FOLDER='<svg viewBox="0 0 24 20" width="22" height="18"><path d="M2 8V4.5A2.5 2.5 0 0 1 4.5 2h4.6a2.5 2.5 0 0 1 2 1l1 1.4h7.4A2.5 2.5 0 0 1 22 6.9V8z" fill="#9CBAEA"/><rect x="2" y="6" width="20" height="12" rx="2.5" fill="#ACC7F0"/></svg>';
const MINI_FILE='<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#8A8A88" stroke-width="1.6" stroke-linejoin="round"><path d="M6 2.8h7.2L19 8.6v12.6H6z"/><path d="M13.2 2.8v5.8H19"/></svg>';


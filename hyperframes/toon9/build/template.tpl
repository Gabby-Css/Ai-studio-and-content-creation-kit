<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>Bo and the Pancake 9 - Blip and Zap</title>
<script src="vendor/gsap.min.js"></script>
<style>
@font-face{font-family:'Baloo2';src:url('assets/fonts/baloo-2-latin-800-normal.woff2') format('woff2');font-weight:800}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#FBCB93}
#root{position:relative;width:100%;height:100%;overflow:hidden;background:#FBCB93;font-family:'Baloo2',sans-serif;font-weight:800}
#shake{position:absolute;left:0;top:0;width:1080px;height:1920px}
#cam{position:absolute;left:0;top:0;width:2600px;height:2200px}
#world{display:block;overflow:visible}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 55%,rgba(60,28,10,.38) 100%);pointer-events:none}
#dim{position:absolute;inset:0;background:rgba(36,24,78,.30);opacity:0;pointer-events:none}
.caps{position:absolute;left:0;right:0;height:380px;pointer-events:none}
#caps{top:215px}
#capsB{top:1470px}
.cg{position:absolute;left:24px;right:24px;top:70px;text-align:center;font-size:86px;line-height:1.0;letter-spacing:0;color:#fff;opacity:0}
.cg .w{display:inline-block;margin:0 12px;color:#fff;-webkit-text-stroke:16px #2b1a14;paint-order:stroke fill;text-shadow:0 8px 0 rgba(43,26,20,.55)}
.cg .tag{display:block;font-size:50px;margin:0 0 4px;-webkit-text-stroke:11px #2b1a14;paint-order:stroke fill;letter-spacing:2px}
#sticker{position:absolute;left:50%;bottom:90px;width:940px;margin-left:-470px;text-align:center;opacity:0}
.stk1{display:block;background:#FFE14D;border:12px solid #2b1a14;border-radius:60px;padding:22px 20px 16px;font-size:98px;line-height:.98;color:#2b1a14;box-shadow:0 14px 0 rgba(43,26,20,.5)}
.stk2{display:inline-block;margin-top:26px;background:#2EBE85;border:10px solid #2b1a14;border-radius:44px;padding:6px 30px 10px;font-size:48px;color:#fff;text-shadow:3px 3px 0 #2b1a14}
#flash{position:absolute;inset:0;background:#FFF3DC;opacity:0;pointer-events:none}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="30" data-width="1080" data-height="1920" data-fps="30">
<div id="shake"><div id="cam">
<svg id="world" width="2600" height="2200" viewBox="0 0 2600 2200" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE6BE"/><stop offset="1" stop-color="#FBC98E"/></linearGradient>
<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FD3FF"/><stop offset="1" stop-color="#D5F1FF"/></linearGradient>
<radialGradient id="gFridgeIn" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#FFFDEB"/><stop offset="1" stop-color="#FFE9A8"/></radialGradient>
<pattern id="pDots" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="10" fill="#FFF3DA" opacity=".75"/><circle cx="0" cy="0" r="10" fill="#FFF3DA" opacity=".75"/><circle cx="100" cy="0" r="10" fill="#FFF3DA" opacity=".75"/><circle cx="0" cy="100" r="10" fill="#FFF3DA" opacity=".75"/><circle cx="100" cy="100" r="10" fill="#FFF3DA" opacity=".75"/></pattern>
<pattern id="pTile" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#BFEBDD"/><rect x="4" y="4" width="112" height="112" rx="10" fill="#D4F4E8"/></pattern>
<pattern id="pFloor" width="260" height="260" patternUnits="userSpaceOnUse"><rect width="260" height="260" fill="#F7EEDF"/><rect width="130" height="130" fill="#E4CFAE"/><rect x="130" y="130" width="130" height="130" fill="#E4CFAE"/></pattern>
<pattern id="pGing" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#fff"/><rect width="60" height="30" fill="#E8484F" opacity=".55"/><rect width="30" height="60" fill="#E8484F" opacity=".55"/></pattern>
<radialGradient id="gGlow"><stop offset="0" stop-color="#EAF3FF" stop-opacity=".95"/><stop offset=".42" stop-color="#BBD7FF" stop-opacity=".38"/><stop offset="1" stop-color="#BBD7FF" stop-opacity="0"/></radialGradient>
<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>
<clipPath id="cpFridge"><rect x="1996" y="880" width="348" height="700" rx="22"/></clipPath>
<clipPath id="cpHole"><path d="M1520,1358 L1520,1272 Q1520,1156 1640,1156 Q1760,1156 1760,1272 L1760,1358Z"/></clipPath>
<!-- everything except the table top/apron/legs: characters standing behind the table are hidden by it -->
<clipPath id="cpNoTable"><path clip-rule="evenodd" d="M-300,-300 H2900 V2500 H-300Z M520,1170 H1480 V1300 H520Z M560,1300 H608 V1640 H560Z M1432,1300 H1480 V1640 H1432Z"/></clipPath>
</defs>

<!-- ============ KITCHEN ============ -->
<rect x="-1800" y="-1800" width="6200" height="3160" fill="url(#gWall)"/>
<rect x="-1800" y="-1800" width="6200" height="2800" fill="url(#pDots)"/>
<rect x="-1800" y="1000" width="6200" height="360" fill="url(#pTile)"/>
<rect x="-1800" y="990" width="6220" height="22" fill="#fff" stroke="#2b1a14" stroke-width="6"/>
<rect x="-1800" y="1360" width="6200" height="2400" fill="url(#pFloor)"/>
<rect x="-1800" y="1340" width="6220" height="36" fill="#fff" stroke="#2b1a14" stroke-width="7"/>
<g id="mouseHole"><path d="M1515,1358 L1515,1270 Q1515,1150 1640,1150 Q1765,1150 1765,1270 L1765,1358Z" fill="#2a1810" stroke="#2b1a14" stroke-width="8" stroke-linejoin="round"/></g>
<g clip-path="url(#cpHole)"><g id="nbMount"></g></g>
<path d="M1500,1360 L1780,1360" stroke="#2b1a14" stroke-width="8" stroke-linecap="round"/>

<!-- window (Rocky peeks in, Barnaby knocks) -->
<g id="window">
 <rect x="300" y="300" width="500" height="470" rx="26" fill="#fff" stroke="#2b1a14" stroke-width="9"/>
 <rect x="334" y="334" width="432" height="402" rx="12" fill="url(#gSky)" stroke="#2b1a14" stroke-width="6"/>
 <circle cx="660" cy="430" r="52" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <g fill="#fff" stroke="#2b1a14" stroke-width="5"><ellipse cx="440" cy="490" rx="70" ry="30"/><ellipse cx="500" cy="470" rx="52" ry="34"/></g>
 <g id="pigMount"></g>
 <g clip-path="url(#cpGlass)"><g id="twMount"></g><g id="ufoMount"></g><g id="peanutMount"></g></g>
 <rect x="544" y="334" width="14" height="402" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <rect x="334" y="522" width="432" height="14" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <rect x="280" y="760" width="540" height="34" rx="12" fill="#fff" stroke="#2b1a14" stroke-width="8"/>
 <path d="M300,300 Q250,520 292,770 L350,770 Q330,540 372,300Z" fill="#26A69A" stroke="#2b1a14" stroke-width="7"/>
 <path d="M800,300 Q850,520 808,770 L750,770 Q770,540 728,300Z" fill="#26A69A" stroke="#2b1a14" stroke-width="7"/>
</g>
<!-- clock + shelf -->
<g id="decor">
 <circle cx="1180" cy="330" r="96" fill="#fff" stroke="#2b1a14" stroke-width="9"/>
 <g stroke="#2b1a14" stroke-width="8" stroke-linecap="round"><line x1="1180" y1="330" x2="1180" y2="270"/><line x1="1180" y1="330" x2="1222" y2="350"/></g>
 <circle cx="1180" cy="330" r="9" fill="#E8484F"/>
 <g fill="#2b1a14"><circle cx="1180" cy="252" r="6"/><circle cx="1180" cy="408" r="6"/><circle cx="1102" cy="330" r="6"/><circle cx="1258" cy="330" r="6"/></g>
 <rect x="1420" y="560" width="480" height="30" rx="10" fill="#C98A4B" stroke="#2b1a14" stroke-width="7"/>
 <rect x="1450" y="450" width="86" height="110" rx="18" fill="#FF9AA8" stroke="#2b1a14" stroke-width="6"/><rect x="1460" y="426" width="66" height="30" rx="8" fill="#fff" stroke="#2b1a14" stroke-width="6"/>
 <rect x="1570" y="470" width="96" height="90" rx="16" fill="#8ED8FF" stroke="#2b1a14" stroke-width="6"/><rect x="1580" y="446" width="76" height="30" rx="8" fill="#fff" stroke="#2b1a14" stroke-width="6"/>
 <rect x="1700" y="430" width="80" height="130" rx="18" fill="#FFE14D" stroke="#2b1a14" stroke-width="6"/><rect x="1708" y="406" width="64" height="30" rx="8" fill="#fff" stroke="#2b1a14" stroke-width="6"/>
 <rect x="1810" y="500" width="70" height="60" rx="14" fill="#B28CFF" stroke="#2b1a14" stroke-width="6"/>
 <rect x="1500" y="250" width="190" height="150" rx="14" fill="#fff" stroke="#2b1a14" stroke-width="9"/>
 <path d="M1595,290 l16,38 40,4 -30,26 10,40 -36,-20 -36,20 10,-40 -30,-26 40,-4z" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
</g>

<!-- ============ FRIDGE ============ -->
<ellipse cx="2170" cy="1612" rx="240" ry="30" fill="rgba(60,30,10,.2)"/>
<g id="fridgeBack">
 <rect x="1980" y="420" width="380" height="1180" rx="46" fill="#8FD9C0" stroke="#2b1a14" stroke-width="9"/>
 <rect x="2000" y="440" width="340" height="420" rx="26" fill="#A6E6CF" stroke="#2b1a14" stroke-width="7"/>
 <rect x="2010" y="560" width="22" height="200" rx="11" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <circle cx="2160" cy="540" r="34" fill="#FF6B8B" stroke="#2b1a14" stroke-width="5"/>
</g>
<g id="fridgeInner"></g>
<g id="fridgeDoor">
 <rect x="1980" y="880" width="380" height="720" rx="34" fill="#A6E6CF" stroke="#2b1a14" stroke-width="9"/>
 <rect x="2008" y="1000" width="22" height="230" rx="11" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <path d="M2150,960 l14,32 34,3 -26,22 8,34 -30,-18 -30,18 8,-34 -26,-22 34,-3z" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <rect x="2200" y="1240" width="110" height="130" rx="8" fill="#fff" stroke="#2b1a14" stroke-width="5" transform="rotate(4 2255 1305)"/>
 <path d="M2220,1330 q20,-40 40,0 t40,0" fill="none" stroke="#FF8F5A" stroke-width="7" stroke-linecap="round" transform="rotate(4 2255 1305)"/>
</g>

<g id="partyFloor"></g>
<g id="ufoLMount"></g>
<g id="gmMount"></g>
<!-- ============ TABLE ============ -->
<ellipse cx="1000" cy="1650" rx="560" ry="32" fill="rgba(60,30,10,.2)"/>
<g id="table">
 <rect x="560" y="1262" width="48" height="378" rx="10" fill="#B4733A" stroke="#2b1a14" stroke-width="7"/>
 <rect x="1432" y="1262" width="48" height="378" rx="10" fill="#B4733A" stroke="#2b1a14" stroke-width="7"/>
 <rect x="520" y="1170" width="960" height="40" rx="16" fill="#D79A55" stroke="#2b1a14" stroke-width="7"/>
 <rect x="548" y="1196" width="904" height="104" rx="20" fill="url(#pGing)" stroke="#2b1a14" stroke-width="7"/>
</g>
<g id="plate">
 <ellipse cx="690" cy="1166" rx="160" ry="22" fill="#fff" stroke="#6FB7E9" stroke-width="7"/>
 <ellipse cx="690" cy="1165" rx="112" ry="12" fill="#E3F4FF"/>
</g>

<g id="cheeseMount"></g>
<g id="mcMount"></g>
<g id="wedgeMount"></g>
<g id="panMount"></g>
<g id="cmMount"></g>
<g id="tfMount"></g>
<g id="pizzaMount"></g>
<g id="ovenMount"></g>
<g id="feastMount"></g>
<g id="nmMount"></g>
<g id="bananaMount"></g>
<g id="zpMount"></g>
<g id="bpMount"></g>
<g id="boMount"></g>
<g id="bowlMount"></g>
<g id="cocoMount"></g>
<rect id="night" x="-2500" y="-2500" width="9000" height="9000" fill="#070625" opacity="0"/>
<g id="partyTop"></g>
<g id="ghMount"></g>
<g id="fxMount"></g>
</svg>
</div></div>

<div id="vig"></div>
<div id="dim"></div>
<div id="caps" class="caps"></div>
<div id="capsB" class="caps"></div>
<div id="sticker"><span class="stk1">WHO'S THE PARTY GUEST?</span><span class="stk2">GUESS IN THE COMMENTS!</span></div>
<div id="flash"></div>

<audio id="a-vo" src="assets/vo.wav" data-start="0" data-duration="30" data-track-index="1" data-volume="1"></audio>
<audio id="a-music" src="assets/music.wav" data-start="0" data-duration="30" data-track-index="2" data-volume="1"></audio>
<audio id="a-sfx" src="assets/sfx.wav" data-start="0" data-duration="30" data-track-index="3" data-volume="1"></audio>
</div>

<script>
const OL='#2b1a14', OR='#F58A2B', CR='#FFEBCB', GR='#2EBE85', BR='#7A3E1D', MW='#7B1E2C';
const sw=(w)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const PLAN=__PLAN__;
const WD=PLAN.words, L=PLAN.LINE_T, DU=PLAN.dur;

/* ---------------- BO THE FOX (same rig as video 1) ---------------- */
const earPaths=`<path d="M-60,8 Q-100,-100 -42,-150 Q22,-104 46,2 Z" fill="${OR}" ${sw(7)}/><path d="M-38,-4 Q-62,-78 -40,-108 Q-2,-80 12,-6 Z" fill="#FFC8A2"/><path d="M-74,-100 Q-60,-132 -42,-150 Q-20,-130 -8,-104 Q-38,-122 -74,-100Z" fill="${BR}"/>`;
const eye=(x)=>`<g transform="translate(${x},-112)"><g class="boEyeW"><g class="boEye"><ellipse rx="38" ry="46" fill="#fff" ${sw(6)}/><g class="boPupil"><circle r="22" fill="${OL}"/><circle cx="-7" cy="-9" r="8" fill="#fff"/></g></g></g></g>`;
const heart=(x)=>`<g transform="translate(${x},-108) scale(1.7)"><path d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" ${sw(3.5)}/></g>`;
document.getElementById('boMount').innerHTML=`
<g id="bo"><g id="boSq"><g id="boLean">
 <ellipse cx="0" cy="6" rx="175" ry="26" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(-100,-120)"><g id="boTail">
  <path d="M0,20 C-60,50 -150,10 -170,-70 C-185,-130 -140,-200 -85,-215 C-100,-160 -80,-110 -30,-80 C0,-62 20,-30 0,20Z" fill="${OR}" ${sw(7)}/>
  <path d="M-170,-70 C-185,-130 -140,-200 -85,-215 C-95,-185 -118,-165 -140,-150 C-160,-130 -172,-100 -170,-70Z" fill="${CR}" ${sw(7)}/>
 </g></g>
 <g transform="translate(-62,-62)"><g id="boLegL"><ellipse cx="0" cy="24" rx="34" ry="30" fill="${OR}" ${sw(7)}/><ellipse cx="4" cy="46" rx="52" ry="23" fill="${BR}" ${sw(7)}/></g></g>
 <g transform="translate(62,-62)"><g id="boLegR"><ellipse cx="0" cy="24" rx="34" ry="30" fill="${OR}" ${sw(7)}/><ellipse cx="4" cy="46" rx="52" ry="23" fill="${BR}" ${sw(7)}/></g></g>
 <g id="boBody">
  <ellipse cx="0" cy="-185" rx="140" ry="150" fill="${OR}" ${sw(7)}/>
  <ellipse cx="0" cy="-170" rx="86" ry="104" fill="${CR}"/>
  <g transform="translate(-122,-250)"><g id="boArmL"><ellipse cx="-4" cy="55" rx="30" ry="60" fill="${OR}" ${sw(7)}/><ellipse cx="-4" cy="112" rx="28" ry="24" fill="${BR}" ${sw(7)}/></g></g>
  <g transform="translate(122,-250)"><g id="boArmR"><ellipse cx="4" cy="55" rx="30" ry="60" fill="${OR}" ${sw(7)}/><ellipse cx="4" cy="112" rx="28" ry="24" fill="${BR}" ${sw(7)}/></g></g>
  <g transform="translate(0,-356)"><g id="boHead">
   <g transform="translate(-96,-200)"><g id="boEarL">${earPaths}</g></g>
   <g transform="translate(96,-200) scale(-1,1)"><g id="boEarR">${earPaths}</g></g>
   <ellipse cx="0" cy="-100" rx="172" ry="130" fill="${OR}" ${sw(7)}/>
   <ellipse cx="-84" cy="-50" rx="70" ry="52" fill="${CR}"/><ellipse cx="84" cy="-50" rx="70" ry="52" fill="${CR}"/><ellipse cx="0" cy="-38" rx="84" ry="56" fill="${CR}"/>
   <g id="boEyes">${eye(-64)}${eye(64)}</g>
   <g id="boHeartEyes" opacity="0">${heart(-64)}${heart(64)}</g>
   <g transform="translate(-64,-176)"><path class="boBrow" id="boBrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-176)"><path class="boBrow" id="boBrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-62" rx="24" ry="16" fill="${OL}"/><circle cx="-8" cy="-67" r="5" fill="#fff"/>
   <ellipse cx="-102" cy="-72" rx="22" ry="12" fill="#FF7A7A" opacity=".45"/><ellipse cx="102" cy="-72" rx="22" ry="12" fill="#FF7A7A" opacity=".45"/>
   <g transform="translate(0,-46)" id="boMouth">
    <g id="mSmile"><path d="M0,-14 L0,6" fill="none" ${sw(6)}/><path d="M-38,0 Q0,30 38,0" fill="none" ${sw(7)}/></g>
    <g id="mOpen" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="mBig" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="mFrown" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g transform="translate(0,-232)">${panSVG('bh')}</g>
   <g id="boSweat" opacity="0" transform="translate(138,-196)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
  <ellipse cx="0" cy="-312" rx="134" ry="32" fill="${GR}" ${sw(7)}/>
  <g fill="${CR}" opacity=".9"><ellipse cx="-80" cy="-300" rx="9" ry="14"/><ellipse cx="-30" cy="-288" rx="9" ry="14"/><ellipse cx="30" cy="-288" rx="9" ry="14"/><ellipse cx="80" cy="-300" rx="9" ry="14"/></g>
  <g transform="translate(78,-300)"><g id="boScarfTail"><path d="M-24,0 L36,4 Q62,60 48,128 L-14,132 Q-2,60 -24,0Z" fill="${GR}" ${sw(7)}/><path d="M-10,60 L50,64 M-14,98 L48,100" fill="none" stroke="${CR}" stroke-width="9" stroke-linecap="round"/></g></g>
 </g>
</g></g></g>`;

/* ---------------- FLAPJACK THE PANCAKE (one markup, two instances: 'pan' in the world, 'ph' riding Rocky's head) ---------------- */
function panSVG(p){
 const leg=(x,s)=>`<g transform="translate(${x},-8)"><g id="${p}${s}"><path d="M0,0 L${x<0?-6:6},50" fill="none" ${sw(10)}/><ellipse cx="${x<0?-14:14}" cy="56" rx="26" ry="12" fill="#fff" ${sw(5)}/></g></g>`;
 const arm=(x,s,d)=>`<g transform="translate(${x},-62)"><g id="${p}${s}"><path d="M0,0 Q${d*40},0 ${d*52},-34" fill="none" ${sw(9)}/><circle cx="${d*52}" cy="-34" r="11" fill="#FFE3B8" ${sw(5)}/></g></g>`;
 const pe=(x)=>`<g transform="translate(${x},-62)"><g class="${p}EyeW"><g class="${p}Eye"><circle r="21" fill="#fff" ${sw(5)}/><g class="${p}Pupil"><circle r="10" fill="${OL}"/><circle cx="-3" cy="-4" r="4" fill="#fff"/></g></g></g></g>`;
 return `<g id="${p}"><g id="${p}Shake"><g id="${p}Sq">
 <g id="${p}Legs">${leg(-52,'LegL')}${leg(52,'LegR')}</g>
 <path d="M-130,-118 L-130,-48 Q-130,-6 -86,-6 L86,-6 Q130,-6 130,-48 L130,-118Z" fill="#D9902F" ${sw(7)}/>
 <ellipse cx="0" cy="-118" rx="130" ry="38" fill="#F9CE72" ${sw(7)}/>
 <ellipse cx="0" cy="-118" rx="98" ry="25" fill="#EDB04A" opacity=".8"/>
 <ellipse cx="-60" cy="-122" rx="14" ry="6" fill="#D9902F" opacity=".7"/><ellipse cx="70" cy="-112" rx="12" ry="5" fill="#D9902F" opacity=".7"/>
 <ellipse cx="10" cy="-124" rx="74" ry="20" fill="#B35A12" opacity=".95"/>
 <path d="M-40,-120 L-40,-92 Q-30,-84 -20,-92 L-20,-116Z M36,-118 L36,-84 Q46,-76 56,-84 L56,-114Z" fill="#B35A12"/>
 <rect x="-34" y="-158" width="68" height="40" rx="9" fill="#FFE98A" ${sw(5)}/><path d="M-22,-146 L8,-146" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>
 <g id="${p}Glaze" opacity="0"><ellipse cx="0" cy="-122" rx="124" ry="31" fill="#F6B21E" opacity=".72"/><path d="M-122,-116 q-8,42 8,54 q16,-12 10,-54z M-38,-92 q-5,46 10,60 q15,-14 9,-60z M64,-96 q-4,38 9,48 q12,-10 8,-48z M116,-110 q10,34 0,46 q-13,-10 -9,-46z" fill="#F6B21E" ${sw(4)}/></g>
 <ellipse cx="-80" cy="-40" rx="14" ry="9" fill="#FF8A8A" opacity=".5"/><ellipse cx="80" cy="-40" rx="14" ry="9" fill="#FF8A8A" opacity=".5"/>
 <g id="${p}EyesClosed" opacity="0"><path d="M-62,-62 Q-42,-80 -22,-62" fill="none" ${sw(6)}/><path d="M22,-62 Q42,-80 62,-62" fill="none" ${sw(6)}/></g>
 <g id="${p}Eyes">${pe(-42)}${pe(42)}</g>
 <g transform="translate(-42,-100)"><path id="${p}BrowL" d="M-24,0 L24,0" fill="none" ${sw(8)} opacity="0"/></g>
 <g transform="translate(42,-100)"><path id="${p}BrowR" d="M-24,0 L24,0" fill="none" ${sw(8)} opacity="0"/></g>
 <g transform="translate(0,-30)">
  <g id="${p}Sm"><path d="M-24,0 Q0,22 24,0" fill="none" ${sw(6)}/></g>
  <g id="${p}Gr" opacity="0"><path d="M-28,-2 Q0,-6 28,-2 Q26,30 0,32 Q-26,30 -28,-2Z" fill="${MW}" ${sw(5)}/><ellipse cx="0" cy="22" rx="13" ry="8" fill="#FF8FA0"/></g>
  <g id="${p}Wo" opacity="0"><path d="M-22,10 Q0,-10 22,10" fill="none" ${sw(6)}/></g>
  <g id="${p}Oh" opacity="0"><ellipse cx="0" cy="6" rx="13" ry="15" fill="${MW}" ${sw(5)}/></g>
 </g>
 <g id="${p}Arms">${arm(-128,'ArmL',-1)}${arm(128,'ArmR',1)}</g>
</g></g></g>`;}

/* ---------------- ROCKY THE RACCOON (cast #17: grey fur, dark mask, black flat cap, ringed tail) ---------------- */
const GRY='#A3A9B5', DGR='#4B5160', BEL='#E4E7EC', MUZ='#F4F5F8', CAP='#2b2b33';
function rockySVG(p,hat){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const ring=[0,1,2,3,4].map(i=>`<g transform="translate(${i*17},${-i*22}) rotate(-35)"><ellipse rx="36" ry="27" fill="${i%2?DGR:GRY}" ${sw(6)}/></g>`).join('');
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${GRY}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${DGR}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(136,-76)"><g id="${p}Tail">${ring}</g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="128" ry="135" fill="${GRY}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="80" ry="102" fill="${BEL}"/></g>
  <g transform="translate(-112,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="28" ry="56" fill="${GRY}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="27" ry="24" fill="${DGR}" ${sw(7)}/></g></g>
  <g transform="translate(112,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="28" ry="56" fill="${GRY}" ${sw(7)}/><ellipse cx="4" cy="104" rx="27" ry="24" fill="${DGR}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-110,-211)"><g id="${p}EarL"><g transform="rotate(-12)"><ellipse rx="44" ry="51" fill="${GRY}" ${sw(7)}/><ellipse cy="5" rx="25" ry="30" fill="${DGR}"/></g></g></g>
   <g transform="translate(110,-211)"><g id="${p}EarR"><g transform="rotate(12)"><ellipse rx="44" ry="51" fill="${GRY}" ${sw(7)}/><ellipse cy="5" rx="25" ry="30" fill="${DGR}"/></g></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="118" fill="${GRY}" ${sw(7)}/>
   <path d="M-154,-130 Q0,-170 154,-130 Q134,-68 53,-73 Q0,-94 -53,-73 Q-134,-68 -154,-130Z" fill="${DGR}"/>
   <ellipse cx="0" cy="-47" rx="69" ry="44" fill="${MUZ}"/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M30,-100 Q64,-140 98,-100" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-73" rx="21" ry="14" fill="${OL}"/><circle cx="-7" cy="-77" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-40)">
    <g id="${p}mSm"><path d="M-34,0 Q-8,20 14,8 Q28,2 36,-12" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-170)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
   <g id="${p}Tear" opacity="0" transform="translate(-92,-70)"><path d="M0,-14 C9,-2 12,4 0,10 C-12,4 -9,-2 0,-14Z" fill="#8AD7FF" ${sw(3)}/></g>
   <path d="M-113,-188 Q0,-278 113,-188 Q0,-211 -113,-188Z" fill="${CAP}" ${sw(6)}/>
   <path d="M87,-208 L168,-199 L97,-179Z" fill="${CAP}" ${sw(6)}/>
   ${hat?`<g transform="translate(0,-244)">${panSVG('ph')}</g>`:''}
  </g></g>
 </g>
</g></g></g>`;}
document.getElementById('panMount').innerHTML=panSVG('pan');
/* ---------------- MOCHI THE CAT (cast #3: blue-grey tabby, white belly, pink ears, red collar + bell, curly tail) ---------------- */
const MCG='#A9B4C2', MCD='#7C8796';
function mochiSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const lid=(x)=>`<g transform="translate(${x},0)"><path d="M-44,-160 L44,-160 L44,-106 Q0,-90 -44,-106Z" fill="${MCG}"/><path d="M-42,-106 Q0,-90 42,-106" fill="none" ${sw(6)}/></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${MCG}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${MCD}" ${sw(7)}/></g></g>`;
 const ear=(sx)=>`<g transform="translate(${sx*-96},-196) scale(${sx},1)"><path d="M-52,14 L52,-124 L78,14Z" fill="${MCG}" ${sw(7)}/><path d="M-26,2 L48,-90 L62,2Z" fill="#FFB6C8"/></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(112,-120)"><g id="${p}Tail"><path d="M10,40 C150,40 190,-100 130,-210 C108,-248 70,-220 88,-190 C125,-120 85,-40 0,-40Z" fill="${MCG}" ${sw(7)}/></g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="134" ry="140" fill="${MCG}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="84" ry="106" fill="#fff"/></g>
  <g transform="translate(-114,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="30" ry="58" fill="${MCG}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="28" ry="25" fill="${MCD}" ${sw(7)}/></g></g>
  <g transform="translate(114,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="30" ry="58" fill="${MCG}" ${sw(7)}/><ellipse cx="4" cy="104" rx="28" ry="25" fill="${MCD}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g id="${p}EarL">${ear(1)}</g><g id="${p}EarR">${ear(-1)}</g>
   <ellipse cx="0" cy="-98" rx="172" ry="130" fill="${MCG}" ${sw(7)}/>
   <path d="M0,-226 L0,-190 M-42,-218 L-35,-186 M42,-218 L35,-186" fill="none" ${sw(9)}/>
   <ellipse cx="0" cy="-54" rx="64" ry="42" fill="#fff"/>
   <g fill="none" ${sw(4)}><path d="M-136,-76 L-238,-94"/><path d="M-136,-56 L-238,-52"/><path d="M136,-76 L238,-94"/><path d="M136,-56 L238,-52"/></g>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}Lids" opacity="0">${lid(-64)}${lid(64)}</g>
   <g id="${p}EyesSleep" opacity="0"><path d="M-98,-112 Q-64,-80 -30,-112" fill="none" ${sw(11)}/><path d="M30,-112 Q64,-80 98,-112" fill="none" ${sw(11)}/></g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <path d="M-20,-78 Q0,-84 20,-78 Q0,-54 -20,-78Z" fill="#FF8FA0" ${sw(5)}/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-38)">
    <g id="${p}mSm"><path d="M-34,0 Q-17,20 0,2 Q17,20 34,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-28,14 Q0,6 28,14" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
  </g></g>
  <g transform="translate(0,-282)"><path d="M-100,-8 Q0,32 100,-8 Q0,50 -100,-8Z" fill="#E8484F" ${sw(6)}/><circle cx="0" cy="34" r="20" fill="#FFD84A" ${sw(5)}/><path d="M0,34 L0,48" fill="none" ${sw(4)}/></g>
 </g>
</g></g></g>`;}

/* ---------------- NIBBLES THE MOUSE, full body (cast #20): big round ears, buck teeth, pink paws, curly tail ---------------- */
const MGR='#CFD3DC', MPK='#F4A6B7';
const wedgeSVG=(extra='')=>`<path d="M-72,26 L78,-18 L50,52Z" fill="#FFD84A" ${sw(6)}/><path d="M-72,26 L50,52 L50,70 L-72,44Z" fill="#E8B52E" ${sw(5)}/><path d="M50,52 L78,-18 L78,0 L50,70Z" fill="#E8B52E" ${sw(5)}/><circle cx="26" cy="12" r="8" fill="#E8B52E"/><circle cx="-6" cy="28" r="6" fill="#E8B52E"/><circle cx="46" cy="30" r="5" fill="#E8B52E"/>${extra}`;
function mouseSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const teeth=`<rect x="-24" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/><rect x="2" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/>`;
 const legG=(s,x)=>`<g transform="translate(${x},-50)"><g id="${p}${s}"><ellipse cx="0" cy="20" rx="26" ry="24" fill="${MGR}" ${sw(7)}/><ellipse cx="2" cy="38" rx="50" ry="22" fill="${MPK}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="130" ry="22" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(92,-78)"><g id="${p}Tail"><path d="M0,0 q112,22 112,-84 q0,-72 -52,-92" fill="none" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M0,0 q112,22 112,-84 q0,-72 -52,-92" fill="none" stroke="${MPK}" stroke-width="9" stroke-linecap="round"/></g></g>
 ${legG('LegL',-54)}${legG('LegR',54)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-168" rx="124" ry="132" fill="${MGR}" ${sw(7)}/>
  <ellipse cx="0" cy="-150" rx="78" ry="98" fill="#fff"/>
  <g id="${p}WedgeG" opacity="0" transform="translate(0,-132) scale(1.55)">${wedgeSVG()}</g>
  <g transform="translate(-106,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="48" rx="25" ry="52" fill="${MGR}" ${sw(7)}/><ellipse cx="-4" cy="96" rx="24" ry="22" fill="${MPK}" ${sw(7)}/></g></g>
  <g transform="translate(106,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="48" rx="25" ry="52" fill="${MGR}" ${sw(7)}/><ellipse cx="4" cy="96" rx="24" ry="22" fill="${MPK}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-146,-201)"><g id="${p}EarL"><circle r="76" fill="${MGR}" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <g transform="translate(146,-201)"><g id="${p}EarR"><circle r="76" fill="${MGR}" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="133" fill="${MGR}" ${sw(7)}/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-76" rx="22" ry="14" fill="#FF8FA0"/><circle cx="-7" cy="-80" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-44)">
    <g id="${p}mSm"><path d="M-30,0 Q0,22 30,0" fill="none" ${sw(7)}/>${teeth}</g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/>${teeth}</g>
    <g id="${p}mBg" opacity="0"><path d="M-48,-4 Q0,-10 48,-4 Q52,50 0,56 Q-52,50 -48,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="40" rx="26" ry="13" fill="#FF8FA0"/>${teeth}</g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/>${teeth}</g>
   </g>
   <g id="${p}Cheese" transform="translate(0,64)" opacity="0">
    ${wedgeSVG('<ellipse cx="-34" cy="24" rx="26" ry="20" fill="#F4A6B7" stroke="'+OL+'" stroke-width="6"/><ellipse cx="40" cy="6" rx="26" ry="20" fill="#F4A6B7" stroke="'+OL+'" stroke-width="6"/>')}
   </g>
  </g></g>
 </g>
</g></g></g>`;}

/* ---------------- the big cheese wheel + the cut wedge, on the table ---------------- */
const CHX=1160, CHTOP=1062;          // wheel centre x, y of the top face (Mochi's feet rest on it)
const cheeseBigSVG=`<g id="cheeseWheel">
 <ellipse cx="${CHX}" cy="1168" rx="190" ry="16" fill="rgba(60,30,10,.2)"/>
 <path d="M${CHX-168},${CHTOP} L${CHX-168},1138 Q${CHX-168},1176 ${CHX},1176 Q${CHX+168},1176 ${CHX+168},1138 L${CHX+168},${CHTOP}Z" fill="#F2B632" ${sw(7)}/>
 <ellipse cx="${CHX}" cy="${CHTOP}" rx="168" ry="38" fill="#FFD84A" ${sw(7)}/>
 <ellipse cx="${CHX}" cy="${CHTOP}" rx="132" ry="26" fill="#FFE382" opacity=".8"/>
 <g fill="#E8A92A"><ellipse cx="${CHX-60}" cy="${CHTOP-4}" rx="17" ry="7"/><ellipse cx="${CHX+64}" cy="${CHTOP+8}" rx="14" ry="6"/><ellipse cx="${CHX+6}" cy="${CHTOP+2}" rx="9" ry="4"/>
  <circle cx="${CHX-118}" cy="1110" r="12"/><circle cx="${CHX-30}" cy="1138" r="9"/><circle cx="${CHX+52}" cy="1108" r="14"/><circle cx="${CHX+124}" cy="1136" r="9"/></g>
 <path d="M${CHX-150},1096 Q${CHX-150},1146 ${CHX-110},1160" fill="none" stroke="#FFF2B0" stroke-width="9" stroke-linecap="round" opacity=".7"/>
</g>`;
const WDX=1060, WDY=1098;           // the cut wedge lying in front of the wheel
const wedgeBigSVG=`<g id="wedgeBig" transform="translate(${WDX},${WDY}) scale(1.25)"><g id="wedgeBigIn">${wedgeSVG()}</g></g>`;

/* ---------------- Truffle the Pig as a window silhouette (chef hat!) ---------------- */
const pigSilSVG=`<g id="pigG" opacity="0" clip-path="url(#cpGlass)"><g id="pigIn">
  <g fill="#3A2B3C">
   <path d="M432,560 L404,448 L522,512Z"/><path d="M668,560 L696,448 L578,512Z"/>
   <ellipse cx="550" cy="672" rx="180" ry="150"/>
  </g>
  <g id="pigSnout"><ellipse cx="550" cy="716" rx="76" ry="50" fill="#5B4660"/><ellipse cx="528" cy="716" rx="11" ry="17" fill="#2A1E2C"/><ellipse cx="572" cy="716" rx="11" ry="17" fill="#2A1E2C"/></g>
  <g id="pigEyes"><g class="pEye"><ellipse cx="490" cy="640" rx="19" ry="23" fill="#fff"/><circle cx="494" cy="644" r="9" fill="#1E120A"/></g><g class="pEye"><ellipse cx="610" cy="640" rx="19" ry="23" fill="#fff"/><circle cx="606" cy="644" r="9" fill="#1E120A"/></g></g>
  <g fill="#D6D9EA" stroke="#2b1a14" stroke-width="6" stroke-linejoin="round"><circle cx="484" cy="470" r="46"/><circle cx="550" cy="440" r="58"/><circle cx="616" cy="470" r="46"/><rect x="456" y="480" width="188" height="52" rx="14"/></g>
 </g></g>`;

document.getElementById('nbMount').innerHTML=mouseSVG('nb');
document.getElementById('mcMount').innerHTML=mochiSVG('mc');
document.getElementById('nmMount').innerHTML=mouseSVG('nm');
document.getElementById('cheeseMount').innerHTML=cheeseBigSVG;
document.getElementById('wedgeMount').innerHTML=wedgeBigSVG;
document.getElementById('pigMount').innerHTML=pigSilSVG;
/* ================= episode 5 additions: TRUFFLE THE PIG (cast #11), pizza, oven, Coco's silhouette swing ================= */
const PKB='#FFA6B8', PKD='#E0788F', PKL='#FFC7D3', SNO='#FF8FA8';
function pigSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="32" ry="26" fill="${PKB}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${PKD}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="165" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(122,-98)"><g id="${p}Tail"><path d="M0,0 q64,-20 42,-62 q-22,-30 -50,0" fill="none" stroke="${OL}" stroke-width="17" stroke-linecap="round"/><path d="M0,0 q64,-20 42,-62 q-22,-30 -50,0" fill="none" stroke="${PKD}" stroke-width="9" stroke-linecap="round"/></g></g>
 ${legG('LegL',-60)}${legG('LegR',60)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-165" rx="146" ry="138" fill="${PKB}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-143" rx="96" ry="108" fill="${PKL}"/>
   <path d="M-62,-236 L62,-236 L88,-70 Q0,-44 -88,-70Z" fill="#fff" ${sw(6)}/>
   <rect x="-34" y="-142" width="68" height="40" rx="9" fill="#fff" ${sw(5)}/><path d="M-34,-128 L34,-128" stroke="#C9CED6" stroke-width="5"/></g>
  <g transform="translate(-126,-228)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="30" ry="58" fill="${PKB}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="28" ry="25" fill="${PKD}" ${sw(7)}/></g></g>
  <g transform="translate(126,-228)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="30" ry="58" fill="${PKB}" ${sw(7)}/><ellipse cx="4" cy="104" rx="28" ry="25" fill="${PKD}" ${sw(7)}/>
   <g id="${p}Ladle" opacity="0" transform="translate(4,104)"><path d="M0,0 L0,-170" stroke="#C9CED6" stroke-width="13" stroke-linecap="round"/><ellipse cx="0" cy="-178" rx="34" ry="24" fill="#E5E9F0" ${sw(6)}/><ellipse cx="0" cy="-182" rx="24" ry="14" fill="#E8484F"/></g></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g id="${p}EarL"><path d="M-61,-204 L-150,-252 L-132,-143Z" fill="${PKD}" ${sw(7)}/></g>
   <g id="${p}EarR"><path d="M61,-204 L150,-252 L132,-143Z" fill="${PKD}" ${sw(7)}/></g>
   <ellipse cx="0" cy="-98" rx="176" ry="130" fill="${PKB}" ${sw(7)}/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="-110" cy="-70" rx="21" ry="12" fill="#FF7A7A" opacity=".5"/><ellipse cx="110" cy="-70" rx="21" ry="12" fill="#FF7A7A" opacity=".5"/>
   <g id="${p}Snout"><ellipse cx="0" cy="-56" rx="66" ry="41" fill="${SNO}" ${sw(6)}/><ellipse cx="-20" cy="-56" rx="9" ry="14" fill="${OL}"/><ellipse cx="20" cy="-56" rx="9" ry="14" fill="${OL}"/></g>
   <g transform="translate(0,-4)">
    <g id="${p}mSm"><path d="M-26,0 Q0,18 26,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-28,-2 Q0,-6 28,-2 Q28,32 0,36 Q-28,32 -28,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="26" rx="16" ry="9" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-44,-4 Q0,-10 44,-4 Q48,48 0,54 Q-48,48 -44,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="38" rx="24" ry="12" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-26,14 Q0,-6 26,14" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="12" rx="13" ry="17" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-170)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
   <g id="${p}Hat"><g fill="#fff" ${sw(7)}><circle cx="-60" cy="-246" r="46"/><circle cx="0" cy="-270" r="55"/><circle cx="60" cy="-246" r="46"/><rect x="-106" y="-218" width="212" height="46" rx="13"/></g></g>
  </g></g>
 </g>
</g></g></g>`;}

/* ---------------- the pizza (on a wooden board) ---------------- */
const PZX=1070, PZY=1152;
const pepp=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="17" ry="8" fill="#C93A40" stroke="${OL}" stroke-width="3"/>`;
const boardSVG=`<g id="board" opacity="0"><g transform="translate(${PZX},${PZY})"><ellipse cx="0" cy="22" rx="214" ry="54" fill="#D9A25B" ${sw(6)}/><ellipse cx="-30" cy="14" rx="150" ry="30" fill="#E8BC7A" opacity=".7"/></g></g>`;
const pizzaSVG=`<g id="pizza"><g id="pizzaIn">
 <ellipse cx="0" cy="10" rx="196" ry="46" fill="#E8B15A" ${sw(6)}/>
 <ellipse cx="0" cy="8" rx="168" ry="37" fill="#F4C97A"/>
 <g id="pzSauce" opacity="0"><ellipse cx="0" cy="8" rx="154" ry="33" fill="#E8484F"/><ellipse cx="-44" cy="2" rx="62" ry="10" fill="#F26B6F" opacity=".65"/></g>
 <g id="pzCheese" opacity="0"><ellipse cx="0" cy="7" rx="146" ry="30" fill="#FFD84A"/><ellipse cx="-30" cy="1" rx="70" ry="11" fill="#FFE98A" opacity=".8"/><g fill="#E8B52E"><ellipse cx="-86" cy="10" rx="14" ry="5"/><ellipse cx="62" cy="14" rx="16" ry="6"/><ellipse cx="20" cy="-4" rx="10" ry="4"/></g></g>
 <g id="pzTop" opacity="0">${pepp(-88,4)}${pepp(-34,16)}${pepp(30,0)}${pepp(82,14)}${pepp(-4,6)}${pepp(116,0)}${pepp(-120,16)}
  <g fill="#4FBF6B" stroke="${OL}" stroke-width="3"><ellipse cx="-62" cy="-8" rx="12" ry="6"/><ellipse cx="58" cy="22" rx="12" ry="6"/><ellipse cx="2" cy="22" rx="11" ry="5"/></g></g>
 <g id="pzLove" opacity="0"><path transform="translate(-70,6) scale(.8)" d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" stroke="#2b1a14" stroke-width="4" stroke-linejoin="round"/><path transform="translate(0,16) scale(.8)" d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" stroke="#2b1a14" stroke-width="4" stroke-linejoin="round"/><path transform="translate(76,2) scale(.8)" d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" stroke="#2b1a14" stroke-width="4" stroke-linejoin="round"/><path transform="translate(-20,-6) scale(.8)" d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" stroke="#2b1a14" stroke-width="4" stroke-linejoin="round"/><path transform="translate(40,22) scale(.8)" d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" stroke="#2b1a14" stroke-width="4" stroke-linejoin="round"/></g>
 <g id="pzBaked" opacity="0"><ellipse cx="0" cy="8" rx="196" ry="46" fill="none" stroke="#FFC24A" stroke-width="9" opacity=".8"/><ellipse cx="0" cy="8" rx="150" ry="30" fill="#FF9A2E" opacity=".28"/></g>
</g></g>`;
const sliceSVG=(i)=>`<g id="slw${i}"><g id="sl${i}" class="slc" opacity="0"><path d="M0,-44 L-34,34 Q0,52 34,34Z" fill="#F4C97A" ${sw(5)}/><path d="M0,-30 L-24,26 Q0,38 24,26Z" fill="#FFD84A"/><ellipse cx="-4" cy="2" rx="10" ry="8" fill="#C93A40" stroke="${OL}" stroke-width="3"/><ellipse cx="6" cy="22" rx="8" ry="6" fill="#C93A40" stroke="${OL}" stroke-width="3"/></g></g>`;

/* ---------------- the oven (on the table, right end) ---------------- */
const OVX=1372;
const ovenSVG=`<g id="oven"><g id="ovenIn">
 <ellipse cx="0" cy="8" rx="130" ry="16" fill="rgba(60,30,10,.2)"/>
 <rect x="-112" y="-212" width="224" height="214" rx="26" fill="#7DC4F2" ${sw(7)}/>
 <rect x="-112" y="-212" width="224" height="48" rx="22" fill="#5BA9DC" ${sw(7)}/>
 <circle cx="-72" cy="-188" r="13" fill="#FFE14D" ${sw(5)}/><circle cx="-28" cy="-188" r="13" fill="#FFE14D" ${sw(5)}/>
 <rect x="22" y="-202" width="72" height="28" rx="8" fill="#2a1a30" ${sw(4)}/><text x="58" y="-181" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="24" fill="#6FE08A" id="ovenTxt">00</text>
 <rect x="-88" y="-150" width="176" height="108" rx="14" fill="#2a1a30" ${sw(6)}/>
 <rect id="ovenGlow" x="-82" y="-144" width="164" height="96" rx="10" fill="#FFB347" opacity="0"/>
 <g id="ovenPz" opacity="0"><ellipse cx="0" cy="-70" rx="64" ry="20" fill="#E8B15A" stroke="${OL}" stroke-width="4"/><ellipse cx="0" cy="-72" rx="50" ry="14" fill="#FFD84A"/><ellipse cx="-14" cy="-72" rx="9" ry="4" fill="#C93A40"/><ellipse cx="20" cy="-70" rx="9" ry="4" fill="#C93A40"/></g>
 <rect x="-62" y="-30" width="124" height="12" rx="6" fill="#fff" ${sw(4)}/>
 <rect x="-90" y="0" width="30" height="14" rx="5" fill="#2b1a14"/><rect x="60" y="0" width="30" height="14" rx="5" fill="#2b1a14"/>
 <g id="ovenDing" opacity="0"><path d="M60,-228 L66,-250 L74,-228 L96,-222 L74,-216 L66,-194 L60,-216 L38,-222Z" fill="#FFF6B0" stroke="#FFD84A" stroke-width="4"/></g>
</g></g>`;

/* ---------------- Coco the Monkey (cast #13): a silhouette swinging on a vine, pizza in his tail ---------------- */
const CPX=PZX, CPY=20, CVL=840;
const cocoSVG=`<g id="cocoSwing" opacity="0">
 <path d="M${CPX},${CPY} L${CPX},${CVL}" stroke="#2d2233" stroke-width="14" stroke-linecap="round" fill="none"/>
 <g fill="#2d2233">
  <ellipse cx="${CPX}" cy="${CVL+215}" rx="76" ry="108"/>
  <circle cx="${CPX}" cy="${CVL+78}" r="68"/>
  <circle cx="${CPX-70}" cy="${CVL+74}" r="30"/><circle cx="${CPX+70}" cy="${CVL+74}" r="30"/>
  <path d="M${CPX-60},${CVL+150} Q${CPX-100},${CVL+60} ${CPX-24},${CVL+16} L${CPX-18},${CVL+34} Q${CPX-62},${CVL+80} ${CPX-34},${CVL+140}Z"/>
  <path d="M${CPX+60},${CVL+150} Q${CPX+100},${CVL+60} ${CPX+24},${CVL+16} L${CPX+18},${CVL+34} Q${CPX+62},${CVL+80} ${CPX+34},${CVL+140}Z"/>
  <path d="M${CPX+50},${CVL+290} Q${CPX+160},${CVL+330} ${CPX+120},${CVL+410} Q${CPX+100},${CVL+450} ${CPX+60},${CVL+420}" fill="none" stroke="#2d2233" stroke-width="26" stroke-linecap="round"/>
  <ellipse cx="${CPX-40}" cy="${CVL+322}" rx="26" ry="16"/><ellipse cx="${CPX+40}" cy="${CVL+322}" rx="26" ry="16"/>
 </g>
 <ellipse cx="${CPX}" cy="${CVL+96}" rx="38" ry="28" fill="#5B4660"/>
 <g><ellipse cx="${CPX-26}" cy="${CVL+66}" rx="13" ry="16" fill="#fff"/><circle cx="${CPX-23}" cy="${CVL+69}" r="6" fill="#1E120A"/><ellipse cx="${CPX+26}" cy="${CVL+66}" rx="13" ry="16" fill="#fff"/><circle cx="${CPX+23}" cy="${CVL+69}" r="6" fill="#1E120A"/></g>
 <g id="cocoPz" opacity="0" transform="translate(${CPX},${PZY}) scale(.36)">
  <ellipse cx="0" cy="22" rx="214" ry="54" fill="#B4733A" ${sw(6)}/><ellipse cx="0" cy="10" rx="196" ry="46" fill="#E8B15A" ${sw(6)}/><ellipse cx="0" cy="8" rx="160" ry="34" fill="#FFD84A"/>${pepp(-60,4)}${pepp(0,14)}${pepp(60,2)}${pepp(-110,12)}${pepp(112,10)}</g>
</g>`;
const peelSVG=`<g id="peel" opacity="0"><g id="peelIn">
 <path d="M-40,0 Q-30,-46 6,-52 Q50,-54 56,-10 Q30,-30 4,-24 Q-20,-16 -40,0Z" fill="#FFE14D" ${sw(5)}/>
 <path d="M-40,0 Q-90,26 -70,60 Q-40,40 -30,10Z" fill="#FFE14D" ${sw(5)}/>
 <path d="M56,-10 Q96,30 70,64 Q46,42 40,6Z" fill="#FFE14D" ${sw(5)}/>
 <path d="M6,-24 Q4,10 -2,36 Q-24,30 -30,10Z" fill="#F2C94C" ${sw(5)}/>
</g></g>`;

document.getElementById('twMount').innerHTML=pigSVG('tw');
document.getElementById('tfMount').innerHTML=pigSVG('tf');
document.getElementById('pizzaMount').innerHTML=boardSVG+pizzaSVG;
document.getElementById('ovenMount').innerHTML=ovenSVG;
document.getElementById('cocoMount').innerHTML=cocoSVG+peelSVG;
/* ================= episode 6 additions: COCO THE MONKEY in colour (cast #13), the fridge's inside with Gumdrop's eye, banana bait ================= */
const CMB='#8B5A3C', CMD='#6B3F27', CMT='#F0C99A';
function monkeySVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const swirl=(x)=>`<g transform="translate(${x},-108)"><g class="${p}Swirl"><circle r="38" fill="#fff" ${sw(6)}/><path d="M0,0 m-7,0 a7,7 0 1,1 14,0 a14,14 0 1,1 -28,0 a21,21 0 1,1 42,0 a28,28 0 1,1 -56,0" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/></g></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${CMB}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${CMD}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g id="${p}Flip">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(120,-80)"><g id="${p}Tail"><path d="M0,0 q112,-10 100,-124 q-8,-72 -62,-60" fill="none" stroke="${OL}" stroke-width="26" stroke-linecap="round"/><path d="M0,0 q112,-10 100,-124 q-8,-72 -62,-60" fill="none" stroke="${CMB}" stroke-width="13" stroke-linecap="round"/></g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="134" ry="140" fill="${CMB}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="84" ry="106" fill="${CMT}"/></g>
  <g transform="translate(-114,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="30" ry="58" fill="${CMB}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="28" ry="25" fill="${CMD}" ${sw(7)}/></g></g>
  <g transform="translate(114,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="30" ry="58" fill="${CMB}" ${sw(7)}/><ellipse cx="4" cy="104" rx="28" ry="25" fill="${CMD}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g id="${p}EarL"><ellipse cx="-172" cy="-98" rx="52" ry="58" fill="${CMB}" ${sw(7)}/><ellipse cx="-172" cy="-96" rx="30" ry="36" fill="${CMT}"/></g>
   <g id="${p}EarR"><ellipse cx="172" cy="-98" rx="52" ry="58" fill="${CMB}" ${sw(7)}/><ellipse cx="172" cy="-96" rx="30" ry="36" fill="${CMT}"/></g>
   <ellipse cx="0" cy="-98" rx="172" ry="130" fill="${CMB}" ${sw(7)}/>
   <ellipse cx="-56" cy="-103" rx="64" ry="58" fill="${CMT}"/><ellipse cx="56" cy="-103" rx="64" ry="58" fill="${CMT}"/><ellipse cx="0" cy="-53" rx="88" ry="56" fill="${CMT}"/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesDizzy" opacity="0">${swirl(-64)}${swirl(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-74" rx="21" ry="14" fill="${OL}"/><circle cx="-7" cy="-78" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-38)">
    <g id="${p}mSm"><path d="M-34,0 Q0,24 34,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-170)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
 </g>
</g></g></g></g>`;}

/* ---------------- the fridge's inside: dark, with a monster's huge eye (Gumdrop, cast #26) ---------------- */
const gdFur='#8A7BFF', gdDark='#5F51D9', gdBelly='#C7C0FF';
const fridgeInnerSVG=`<g clip-path="url(#cpFridge)">
 <rect x="1996" y="880" width="348" height="700" rx="22" fill="#171028"/>
 <rect x="1996" y="1012" width="348" height="12" fill="#2a2148"/><rect x="1996" y="1250" width="348" height="12" fill="#2a2148"/><rect x="1996" y="1486" width="348" height="12" fill="#2a2148"/>
 <g id="gdPeek">
  <g id="gdBody">
   <ellipse cx="2088" cy="1400" rx="215" ry="330" fill="${gdFur}" ${sw(7)}/>
   <ellipse cx="2088" cy="1450" rx="130" ry="240" fill="${gdBelly}"/>
   <g fill="#A89BFF"><circle cx="1990" cy="1180" r="22"/><circle cx="2190" cy="1230" r="17"/><circle cx="2010" cy="1520" r="18"/><circle cx="2170" cy="1500" r="20"/></g>
   <path d="M2008,1000 L1948,872 L2078,930Z" fill="#FFF1D0" ${sw(7)}/><path d="M2168,1000 L2228,872 L2098,930Z" fill="#FFF1D0" ${sw(7)}/>
   <ellipse cx="2088" cy="1110" rx="205" ry="168" fill="${gdFur}" ${sw(7)}/>
   <g fill="#A89BFF"><circle cx="1960" cy="1050" r="20"/><circle cx="2200" cy="1060" r="16"/></g>
  </g>
  <g id="gdEyeG"><ellipse cx="2088" cy="1086" rx="84" ry="100" fill="#fff" ${sw(7)}/>
   <g id="gdPupil"><ellipse cx="2088" cy="1092" rx="46" ry="46" fill="${OL}"/><circle cx="2072" cy="1072" r="16" fill="#fff"/></g></g>
  <g id="gdBrow" transform="translate(2088,985)"><path d="M-70,6 Q0,-14 70,6" fill="none" ${sw(10)}/></g>
  <g id="gdMouthG" transform="translate(2088,1220)">
   <g id="gdSmile"><path d="M-58,0 Q0,28 58,0" fill="none" ${sw(8)}/></g>
   <g id="gdRoar" opacity="0"><path d="M-84,-6 Q0,-18 84,-6 Q90,86 0,98 Q-90,86 -84,-6Z" fill="${MW}" ${sw(7)}/><rect x="-60" y="-8" width="30" height="26" rx="5" fill="#fff" ${sw(4)}/><rect x="30" y="-8" width="30" height="26" rx="5" fill="#fff" ${sw(4)}/><ellipse cx="0" cy="68" rx="40" ry="20" fill="#FF8FA0"/></g>
  </g>
 </g>
</g>`;

/* ---------------- banana bait ---------------- */
const banana1=(r)=>`<g transform="rotate(${r})"><path d="M-70,6 Q-8,70 78,-22 Q10,30 -70,6Z" fill="#FFE04A" ${sw(5)}/><path d="M-72,4 l-16,-12 l14,-6z" fill="#8A6B22" ${sw(3)}/><path d="M78,-22 l10,-8 l4,12z" fill="#5a4010"/></g>`;
const bananasSVG=`<g id="bananas" opacity="0"><g id="bananasIn"><ellipse cx="0" cy="26" rx="112" ry="16" fill="rgba(60,30,10,.2)"/>${banana1(-16)}<g transform="translate(6,-16)">${banana1(0)}</g><g transform="translate(14,-32)">${banana1(14)}</g></g></g>`;

/* ---------------- light bulb (Mochi's idea) ---------------- */
const bulbSVG=`<g id="bulb" opacity="0"><g id="bulbIn">
 <g stroke="${OL}" stroke-width="7" stroke-linecap="round"><line x1="0" y1="-74" x2="0" y2="-98"/><line x1="-52" y1="-52" x2="-70" y2="-70"/><line x1="52" y1="-52" x2="70" y2="-70"/><line x1="-68" y1="-6" x2="-92" y2="-6"/><line x1="68" y1="-6" x2="92" y2="-6"/></g>
 <circle cx="0" cy="-8" r="46" fill="#FFE14D" ${sw(7)}/><path d="M-18,-10 q18,26 36,0" fill="none" stroke="#C9A82E" stroke-width="5" stroke-linecap="round"/>
 <rect x="-22" y="36" width="44" height="24" rx="8" fill="#C9CED6" ${sw(6)}/>
</g></g>`;
document.getElementById('cmMount').innerHTML=monkeySVG('cm');
document.getElementById('fridgeInner').innerHTML=fridgeInnerSVG;
document.getElementById('bananaMount').innerHTML=bananasSVG;
document.getElementById('cocoMount').innerHTML+=bulbSVG;


/* ---------------- cereal bowls + spoon ---------------- */
const bowlSVG=(id)=>`<g id="${id}" opacity="0"><g id="${id}In">
 <path d="M-100,-30 L100,-30 Q94,64 0,74 Q-94,64 -100,-30Z" fill="#fff" ${sw(7)}/>
 <path d="M-88,10 Q0,34 88,10" fill="none" stroke="#6FB7E9" stroke-width="10" stroke-linecap="round"/>
 <ellipse cx="0" cy="-30" rx="100" ry="22" fill="#fff" ${sw(7)}/><ellipse cx="0" cy="-30" rx="84" ry="15" fill="#FFF6DD"/>
 <g fill="none" stroke="#E7A33A" stroke-width="9"><circle cx="-40" cy="-34" r="9"/><circle cx="-6" cy="-30" r="9"/><circle cx="32" cy="-36" r="9"/><circle cx="58" cy="-28" r="8"/><circle cx="-62" cy="-26" r="8"/></g>
</g></g>`;
document.getElementById('bowlMount').innerHTML=bowlSVG('bowl')+bowlSVG('bowl2')+`<g id="spoon" opacity="0"><g id="spoonIn"><path d="M0,0 L70,-70" stroke="#C9CED6" stroke-width="12" stroke-linecap="round"/><ellipse cx="-4" cy="6" rx="26" ry="16" transform="rotate(-40 -4 6)" fill="#E5E9F0" ${sw(5)}/></g></g>`;

/* ---------------- fx pools: hearts, sparkles, syrup drops, cereal bits, bubbles, steam ---------------- */
const heartPath='M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z';
const starPath='M0,-26 Q4,-4 26,0 Q4,4 0,26 Q-4,4 -26,0 Q-4,-4 0,-26Z';
const NH=16, NS=14, ND=8, NB=10, NU=8;
let fx='';
for(let i=0;i<NH;i++) fx+=`<g id="hw${i}"><g id="hr${i}" class="hrt" opacity="0"><path d="${heartPath}" fill="#FF3D6E" ${sw(3)}/></g></g>`;
for(let i=0;i<NS;i++) fx+=`<g id="sw${i}"><g id="sp${i}" class="spk" opacity="0"><path d="${starPath}" fill="#FFF6B0" stroke="#FFD84A" stroke-width="3"/></g></g>`;
for(let i=0;i<ND;i++) fx+=`<g id="dw${i}"><g id="dr${i}" class="drp" opacity="0"><path d="M0,-14 C9,-2 12,4 0,10 C-12,4 -9,-2 0,-14Z" fill="#D9821A" ${sw(3)}/></g></g>`;
for(let i=0;i<NB;i++) fx+=`<g id="bw${i}"><g id="bt${i}" class="bit" opacity="0"><circle r="10" fill="none" stroke="#E7A33A" stroke-width="8"/></g></g>`;
for(let i=0;i<NU;i++) fx+=`<g id="uw${i}"><g id="ub${i}" class="bub" opacity="0"><circle r="15" fill="#fff" fill-opacity=".6" ${sw(4)}/><circle cx="-5" cy="-5" r="4" fill="#fff"/></g></g>`;
for(let i=0;i<3;i++) fx+=`<g transform="translate(${1040+i*50},1030)"><path class="steam s${i}" opacity="0" d="M0,0 C14,-26 -14,-46 0,-76 C14,-106 -14,-126 0,-156" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>`;
for(let i=0;i<6;i++) fx+=`<g id="cw${i}"><g id="cc${i}" class="ccb" opacity="0"><rect x="-17" y="-17" width="34" height="34" rx="7" fill="#FFD84A" ${sw(5)}/><circle cx="-4" cy="-4" r="5" fill="#E8B52E"/><circle cx="7" cy="8" r="4" fill="#E8B52E"/></g></g>`;
for(let i=0;i<4;i++) fx+=`<g id="zw${i}"><text id="zz${i}" class="zzz" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="84" fill="#fff" stroke="#2b1a14" stroke-width="11" stroke-linejoin="round" paint-order="stroke" opacity="0">Z</text></g>`;
for(let i=0;i<6;i++) fx+=sliceSVG(i);
document.getElementById('fxMount').innerHTML=fx;
/* ================= episode 7 additions: GUMDROP the monster full rig (cast #26), BOO the ghost (cast #25), feast dishes, dust ================= */
const GF='#8A7BFF', GD='#5F51D9', GB='#C7C0FF', GHR='#FFF1D0', GT='#A89BFF';
function gumSVG(p){
 const legG=(s,x)=>`<g transform="translate(${x},-70)"><g id="${p}${s}"><ellipse cx="0" cy="26" rx="58" ry="46" fill="${GF}" ${sw(7)}/><ellipse cx="6" cy="50" rx="80" ry="27" fill="${GD}" ${sw(7)}/></g></g>`;
 const arm=(s,x,sg)=>`<g transform="translate(${x},-364)"><g id="${p}${s}"><ellipse cx="${sg*6}" cy="76" rx="44" ry="100" fill="${GF}" ${sw(7)}/><ellipse cx="${sg*6}" cy="164" rx="46" ry="40" fill="${GD}" ${sw(7)}/><g fill="${GB}"><circle cx="${sg*6-18}" cy="150" r="6"/><circle cx="${sg*6+4}" cy="156" r="6"/><circle cx="${sg*6+24}" cy="150" r="6"/></g></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g id="${p}Flip">
 <ellipse cx="0" cy="6" rx="250" ry="34" fill="rgba(60,30,10,.22)"/>
 ${legG('LegL',-96)}${legG('LegR',96)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-250" rx="215" ry="235" fill="${GF}" ${sw(7)}/>
  <g fill="${GT}"><circle cx="-150" cy="-330" r="22"/><circle cx="165" cy="-290" r="17"/><circle cx="-170" cy="-130" r="18"/><circle cx="160" cy="-110" r="20"/><circle cx="-110" cy="-60" r="14"/></g>
  <g id="${p}Belly"><ellipse cx="0" cy="-205" rx="140" ry="178" fill="${GB}"/>
   <path d="M0,-168 C-30,-196 -64,-168 -42,-140 C-28,-122 0,-102 0,-102 C0,-102 28,-122 42,-140 C64,-168 30,-196 0,-168Z" fill="#FF9BC4" opacity=".8"/></g>
  ${arm('ArmL',-206,-1)}${arm('ArmR',206,1)}
  <g transform="translate(0,-400)"><g id="${p}Head">
   <path d="M-80,-230 L-140,-358 L-10,-300Z" fill="${GHR}" ${sw(7)}/><path d="M80,-230 L140,-358 L10,-300Z" fill="${GHR}" ${sw(7)}/>
   <ellipse cx="0" cy="-120" rx="205" ry="168" fill="${GF}" ${sw(7)}/>
   <g fill="${GT}"><circle cx="-128" cy="-190" r="20"/><circle cx="116" cy="-178" r="16"/></g>
   <ellipse cx="-142" cy="-50" rx="28" ry="16" fill="#FF8FB8" opacity=".55"/><ellipse cx="142" cy="-50" rx="28" ry="16" fill="#FF8FB8" opacity=".55"/>
   <g id="${p}Eyes"><g transform="translate(0,-144)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="84" ry="100" fill="#fff" ${sw(7)}/><g class="${p}Pupil"><ellipse cx="0" cy="6" rx="46" ry="46" fill="${OL}"/><circle cx="-16" cy="-14" r="16" fill="#fff"/></g></g></g></g></g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-84,-126 Q0,-236 84,-126" fill="none" ${sw(14)}/></g>
   <g transform="translate(84,-70) scale(1.9)"><g id="${p}Tear" opacity="0"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g></g>
   <g transform="translate(-48,-270)"><path id="${p}BrowL" d="M-40,6 Q0,-14 40,6" fill="none" ${sw(11)}/></g>
   <g transform="translate(48,-270)"><path id="${p}BrowR" d="M-40,6 Q0,-14 40,6" fill="none" ${sw(11)}/></g>
   <g transform="translate(0,-10)">
    <g id="${p}mSm"><path d="M-58,0 Q0,28 58,0" fill="none" ${sw(8)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-50,-2 Q0,-8 50,-2 Q52,48 0,52 Q-52,48 -50,-2Z" fill="${MW}" ${sw(7)}/><ellipse cx="0" cy="36" rx="26" ry="13" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-84,-6 Q0,-18 84,-6 Q90,86 0,98 Q-90,86 -84,-6Z" fill="${MW}" ${sw(7)}/><rect x="-60" y="-8" width="30" height="26" rx="5" fill="#fff" ${sw(4)}/><rect x="30" y="-8" width="30" height="26" rx="5" fill="#fff" ${sw(4)}/><ellipse cx="0" cy="68" rx="40" ry="20" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-52,24 Q0,-14 52,24" fill="none" ${sw(8)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="16" rx="22" ry="28" fill="${MW}" ${sw(6)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(170,-230)"><path d="M0,-30 C16,-6 24,8 0,20 C-24,8 -16,-6 0,-30Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
 </g>
</g></g></g></g>`;}

/* ---------------- Boo the ghost: shy, floaty, glowing (feet = the wavy bottom, origin at the middle of the bottom edge) ---------------- */
const GHW='#F4F8FF';
function ghostSVG(p){
 const eyeG=(x)=>`<g transform="translate(${x},-268)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="34" ry="44" fill="${OL}"/><g class="${p}Pupil"><circle cx="-9" cy="-14" r="12" fill="#fff"/><circle cx="9" cy="12" r="6" fill="#fff" opacity=".8"/></g></g></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g id="${p}Flip">
 <circle id="${p}Glow" cx="0" cy="-200" r="360" fill="url(#gGlow)" opacity="0"/>
 <ellipse id="${p}Shadow" cx="0" cy="60" rx="120" ry="16" fill="rgba(60,30,10,.16)"/>
 <g id="${p}Body">
  <g transform="translate(-142,-232)"><g id="${p}ArmL"><ellipse cx="-6" cy="44" rx="28" ry="56" fill="${GHW}" ${sw(7)}/></g></g>
  <g transform="translate(142,-232)"><g id="${p}ArmR"><ellipse cx="6" cy="44" rx="28" ry="56" fill="${GHW}" ${sw(7)}/></g></g>
  <path d="M-150,-30 C-176,-210 -140,-388 0,-388 C140,-388 176,-210 150,-30 Q122,24 92,-14 Q62,40 30,-14 Q0,40 -30,-14 Q-62,40 -92,-14 Q-122,24 -150,-30Z" fill="${GHW}" ${sw(7)}/>
  <path d="M-112,-250 C-122,-326 -92,-358 -44,-366" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
  <g id="${p}Head">
   <ellipse cx="-96" cy="-214" rx="26" ry="15" fill="#FFB3C6" opacity=".75"/><ellipse cx="96" cy="-214" rx="26" ry="15" fill="#FFB3C6" opacity=".75"/>
   <g id="${p}Eyes">${eyeG(-54)}${eyeG(54)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-90,-262 Q-54,-306 -18,-262" fill="none" ${sw(10)}/><path d="M18,-262 Q54,-306 90,-262" fill="none" ${sw(10)}/></g>
   <g transform="translate(-54,-330)"><path id="${p}BrowL" d="M-28,4 Q0,-10 28,4" fill="none" ${sw(8)}/></g>
   <g transform="translate(54,-330)"><path id="${p}BrowR" d="M-28,4 Q0,-10 28,4" fill="none" ${sw(8)}/></g>
   <g transform="translate(0,-196)">
    <g id="${p}mSm"><path d="M-20,0 Q0,14 20,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-18,-2 Q0,-4 18,-2 Q18,28 0,30 Q-18,28 -18,-2Z" fill="${MW}" ${sw(6)}/></g>
    <g id="${p}mBg" opacity="0"><path d="M-36,-4 Q0,-10 36,-4 Q40,52 0,56 Q-40,52 -36,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="40" rx="20" ry="10" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-24,12 Q-12,-6 0,8 Q12,-6 24,12" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="12" rx="13" ry="17" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-300)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g>
 </g>
</g></g></g></g>`;}

/* ---------------- the feast: a pancake stack and a big cupcake (the pizza from video #5 is the third dish) ---------------- */
const pcd=(y)=>`<g transform="translate(0,${y})"><path d="M-96,-6 L-96,-26 Q-96,-44 0,-44 Q96,-44 96,-26 L96,-6 Q96,12 0,12 Q-96,12 -96,-6Z" fill="#E9A64F" ${sw(6)}/><ellipse cx="0" cy="-30" rx="86" ry="15" fill="#F6C777"/></g>`;
const feastPcSVG=`<g id="feastPc" opacity="0"><g id="feastPcIn">
 <ellipse cx="0" cy="8" rx="112" ry="18" fill="rgba(60,30,10,.2)"/>
 ${pcd(0)}${pcd(-30)}${pcd(-60)}
 <path d="M-72,-102 Q-76,-86 -52,-84 Q-42,-62 -30,-84 Q10,-80 20,-96 Q50,-92 62,-84 Q86,-96 72,-108 Q0,-132 -72,-102Z" fill="#B8571D" ${sw(5)}/>
 <rect x="-18" y="-134" width="36" height="22" rx="5" fill="#FFE79A" ${sw(4)}/>
</g></g>`;
const feastCkSVG=`<g id="feastCk" opacity="0"><g id="feastCkIn">
 <ellipse cx="0" cy="8" rx="84" ry="14" fill="rgba(60,30,10,.2)"/>
 <path d="M-62,-70 L-48,2 Q0,14 48,2 L62,-70Z" fill="#FF8FB8" ${sw(6)}/>
 <path d="M-30,-68 L-24,4 M0,-66 L0,8 M30,-68 L24,4" stroke="#E8689A" stroke-width="5" stroke-linecap="round" fill="none"/>
 <path d="M-76,-70 Q-90,-110 -40,-112 Q-48,-150 4,-148 Q40,-170 50,-130 Q96,-120 74,-70Z" fill="#FFF3C4" ${sw(6)}/>
 <circle cx="6" cy="-168" r="17" fill="#E8484F" ${sw(5)}/>
</g></g>`;
document.getElementById('feastMount').innerHTML=feastPcSVG+feastCkSVG;

/* ---------------- dust puffs (Gumdrop's stomps) ---------------- */
const dustSVG=Array.from({length:8},(_,i)=>`<g id="dsw${i}"><g id="ds${i}" class="dst" opacity="0"><circle cx="-26" cy="0" r="30" fill="#F2E6D3" ${sw(4)}/><circle cx="14" cy="-10" r="38" fill="#F2E6D3" ${sw(4)}/><circle cx="48" cy="2" r="26" fill="#F2E6D3" ${sw(4)}/></g></g>`).join('');
document.getElementById('fxMount').innerHTML+=dustSVG;

document.getElementById('gmMount').innerHTML=gumSVG('gm');
document.getElementById('ghMount').innerHTML=ghostSVG('gh');
/* ================= episode 9 additions: BLIP the alien (cast #23), ZAP the robot (cast #22), the little landing saucer, Peanut's window silhouette ================= */
const BG_='#6EE08A', BD_='#3FB868', BL_='#C4F8D0', BP_='#B07CFF';
function blipSVG(p){
 const legG=(s,x)=>`<g transform="translate(${x},-44)"><g id="${p}${s}"><ellipse cx="0" cy="20" rx="22" ry="20" fill="${BG_}" ${sw(7)}/><ellipse cx="3" cy="40" rx="38" ry="16" fill="${BD_}" ${sw(7)}/></g></g>`;
 const arm=(s,x,sg)=>`<g transform="translate(${x},-190)"><g id="${p}${s}"><ellipse cx="${sg*4}" cy="38" rx="22" ry="46" fill="${BG_}" ${sw(7)}/><ellipse cx="${sg*4}" cy="86" rx="22" ry="20" fill="${BD_}" ${sw(7)}/></g></g>`;
 const eyeR=(x)=>`<g transform="translate(${x},-92)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="40" ry="50" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="20" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const ant=(s,x,sg,c)=>`<g transform="translate(${x},-196)"><g id="${p}${s}"><path d="M0,0 Q${sg*22},-50 ${sg*8},-92" fill="none" stroke="${OL}" stroke-width="15" stroke-linecap="round"/><path d="M0,0 Q${sg*22},-50 ${sg*8},-92" fill="none" stroke="${BD_}" stroke-width="7" stroke-linecap="round"/><circle cx="${sg*8}" cy="-100" r="16" fill="${c}" ${sw(5)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g id="${p}Flip">
 <ellipse cx="0" cy="6" rx="130" ry="20" fill="rgba(60,30,10,.22)"/>
 ${legG('LegL',-44)}${legG('LegR',44)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-128" rx="96" ry="102" fill="${BG_}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-112" rx="60" ry="70" fill="${BL_}"/></g>
  <g fill="${BP_}"><circle cx="-62" cy="-96" r="10"/><circle cx="68" cy="-70" r="8"/><circle cx="52" cy="-150" r="7"/></g>
  ${arm('ArmL',-96,-1)}${arm('ArmR',96,1)}
  <g transform="translate(0,-250)"><g id="${p}Head">
   ${ant('AntL',-54,-1,'#FFE14D')}${ant('AntR',54,1,'#FF8FC4')}
   <ellipse cx="0" cy="-86" rx="152" ry="124" fill="${BG_}" ${sw(7)}/>
   <g fill="${BP_}"><circle cx="-100" cy="-150" r="11"/><circle cx="104" cy="-140" r="9"/></g>
   <g id="${p}Eyes">${eyeR(-58)}${eyeR(58)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-84 Q-58,-130 -18,-84" fill="none" ${sw(11)}/><path d="M18,-84 Q58,-130 98,-84" fill="none" ${sw(11)}/></g>
   <g transform="translate(-58,-158)"><path id="${p}BrowL" d="M-28,4 Q0,-10 28,4" fill="none" ${sw(8)}/></g>
   <g transform="translate(58,-158)"><path id="${p}BrowR" d="M-28,4 Q0,-10 28,4" fill="none" ${sw(8)}/></g>
   <ellipse cx="-104" cy="-40" rx="20" ry="12" fill="#F4A6FF" opacity=".6"/><ellipse cx="104" cy="-40" rx="20" ry="12" fill="#F4A6FF" opacity=".6"/>
   <g transform="translate(0,-26)">
    <g id="${p}mSm"><path d="M-24,0 Q0,18 24,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-24,-2 Q0,-6 24,-2 Q24,34 0,38 Q-24,34 -24,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="26" rx="14" ry="8" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-40,-4 Q0,-10 40,-4 Q44,50 0,56 Q-44,50 -40,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="40" rx="22" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-24,14 Q0,-8 24,14" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="12" rx="13" ry="18" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-150)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
 </g>
</g></g></g></g>`;}

const ZM_='#B9C7DA', ZD_='#7388A3', ZL_='#E6EEF7', ZR_='#FF6B6B', ZY_='#FFD84A', ZS_='#1D2B44', ZC_='#6FF6FF';
function zapSVG(p){
 const legG=(s,x)=>`<g transform="translate(${x},-50)"><g id="${p}${s}"><rect x="-13" y="0" width="26" height="36" rx="8" fill="${ZD_}" ${sw(6)}/><rect x="-42" y="30" width="84" height="26" rx="13" fill="${ZM_}" ${sw(7)}/></g></g>`;
 const arm=(s,x,sg)=>`<g transform="translate(${x},-214)"><g id="${p}${s}"><rect x="-16" y="0" width="32" height="92" rx="14" fill="${ZD_}" ${sw(7)}/><circle cx="0" cy="116" r="26" fill="${ZM_}" ${sw(7)}/><path d="M${sg*-4},96 L${sg*-4},116" stroke="${OL}" stroke-width="6" stroke-linecap="round"/></g></g>`;
 const eyeR=(x)=>`<g transform="translate(${x},-112)"><g class="${p}EyeW"><g class="${p}Eye"><rect x="-28" y="-34" width="56" height="68" rx="22" fill="${ZC_}"/><g class="${p}Pupil"><circle r="11" fill="${ZS_}"/></g></g></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g id="${p}Flip">
 <ellipse cx="0" cy="6" rx="140" ry="20" fill="rgba(60,30,10,.22)"/>
 ${legG('LegL',-56)}${legG('LegR',56)}
 <g id="${p}Body">
  <rect x="-120" y="-252" width="240" height="206" rx="34" fill="${ZM_}" ${sw(7)}/>
  <rect x="-78" y="-212" width="156" height="102" rx="16" fill="${ZL_}" ${sw(6)}/>
  <circle cx="-44" cy="-178" r="12" fill="${ZR_}" ${sw(4)}/><circle cx="0" cy="-178" r="12" fill="${ZY_}" ${sw(4)}/><circle cx="44" cy="-178" r="12" fill="#5CE08A" ${sw(4)}/>
  <path d="M6,-152 L-14,-128 L-2,-128 L-8,-112 L16,-138 L2,-138Z" fill="${ZY_}" ${sw(4)}/>
  ${arm('ArmL',-138,-1)}${arm('ArmR',138,1)}
  <g stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"><path d="M-18,-252 q-8,-14 4,-22 q12,-8 6,-20"/><path d="M16,-252 q8,-14 -4,-22 q-12,-8 -6,-20"/></g>
  <rect x="-44" y="-266" width="88" height="22" rx="8" fill="${ZD_}" ${sw(6)}/>
  <g transform="translate(0,-262)"><g id="${p}Head">
   <rect x="-130" y="-190" width="260" height="176" rx="42" fill="${ZM_}" ${sw(7)}/>
   <circle cx="-132" cy="-100" r="17" fill="${ZD_}" ${sw(6)}/><circle cx="132" cy="-100" r="17" fill="${ZD_}" ${sw(6)}/>
   <rect x="-106" y="-168" width="212" height="124" rx="28" fill="${ZS_}" ${sw(6)}/>
   <g id="${p}Ant"><path d="M0,-190 L0,-236" stroke="${OL}" stroke-width="14" stroke-linecap="round"/><path d="M0,-190 L0,-236" stroke="${ZD_}" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="-248" r="15" fill="${ZR_}" ${sw(5)}/></g>
   <g id="${p}Eyes">${eyeR(-54)}${eyeR(54)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-84,-100 Q-54,-140 -24,-100" fill="none" stroke="${ZC_}" stroke-width="11" stroke-linecap="round"/><path d="M24,-100 Q54,-140 84,-100" fill="none" stroke="${ZC_}" stroke-width="11" stroke-linecap="round"/></g>
   <g transform="translate(-54,-160)"><rect id="${p}BrowL" x="-26" y="-5" width="52" height="10" rx="5" fill="${ZC_}"/></g>
   <g transform="translate(54,-160)"><rect id="${p}BrowR" x="-26" y="-5" width="52" height="10" rx="5" fill="${ZC_}"/></g>
   <g transform="translate(0,-64)">
    <g id="${p}mSm"><path d="M-30,0 Q0,18 30,0" fill="none" stroke="${ZC_}" stroke-width="9" stroke-linecap="round"/></g>
    <g id="${p}mOp" opacity="0"><rect x="-22" y="-4" width="44" height="26" rx="9" fill="${ZC_}"/></g>
    <g id="${p}mBg" opacity="0"><rect x="-34" y="-6" width="68" height="36" rx="12" fill="${ZC_}"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-30,16 Q0,-4 30,16" fill="none" stroke="${ZC_}" stroke-width="9" stroke-linecap="round"/></g>
    <g id="${p}mO" opacity="0"><circle cx="0" cy="10" r="13" fill="${ZC_}"/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(140,-150)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
 </g>
</g></g></g></g>`;}

/* ---------------- the little landing saucer (stands on the floor, ramp on the left) ---------------- */
const ufoLSVG=`<g id="ufoL" opacity="0"><g id="ufoLIn">
 <ellipse cx="0" cy="8" rx="190" ry="20" fill="rgba(60,30,10,.22)"/>
 <g stroke="${OL}" stroke-width="7" stroke-linecap="round"><path d="M-110,-70 L-140,0"/><path d="M110,-70 L140,0"/><path d="M0,-60 L0,0"/></g>
 <g fill="${ZD_}" ${sw(5)}><ellipse cx="-142" cy="2" rx="22" ry="9"/><ellipse cx="142" cy="2" rx="22" ry="9"/><ellipse cx="0" cy="2" rx="22" ry="9"/></g>
 <g id="ufoLRamp"><path d="M70,-120 L190,-4 L130,-4 L34,-120Z" fill="#8FA0B8" ${sw(6)}/></g>
 <path d="M-62,-150 Q-58,-232 0,-236 Q58,-232 62,-150Z" fill="#9FE3FF" ${sw(7)}/>
 <path d="M-34,-190 Q-30,-218 -8,-222" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".8"/>
 <ellipse cx="0" cy="-118" rx="170" ry="52" fill="#AEB8C8" ${sw(7)}/>
 <g fill="#FFE14D" ${sw(4)}><circle cx="-110" cy="-110" r="12"/><circle cx="-56" cy="-96" r="12"/><circle cx="0" cy="-92" r="12"/><circle cx="56" cy="-96" r="12"/><circle cx="110" cy="-110" r="12"/></g>
</g></g>`;

/* ---------------- Peanut the baby elephant: a silhouette in the window, party hat and balloons ---------------- */
const peanutSilSVG=`<g id="peanutG" opacity="0"><g id="peanutIn">
 <g fill="#FF8FB8" ${sw(4)}><path d="M420,470 Q410,420 440,410 Q448,440 438,478Z" opacity="0"/></g>
 <path d="M452,560 L452,400" stroke="#2d2233" stroke-width="4"/><ellipse cx="452" cy="378" rx="30" ry="38" fill="#FF8FB8" ${sw(5)}/>
 <path d="M648,560 L648,420" stroke="#2d2233" stroke-width="4"/><ellipse cx="648" cy="396" rx="30" ry="38" fill="#7FD3FF" ${sw(5)}/>
 <g fill="#3A3F5C">
  <ellipse cx="420" cy="640" rx="86" ry="118" transform="rotate(14 420 640)"/><ellipse cx="680" cy="640" rx="86" ry="118" transform="rotate(-14 680 640)"/>
  <circle cx="550" cy="650" r="128"/>
  <path d="M520,690 Q548,780 520,850 Q560,860 590,810 Q580,740 586,690Z"/>
 </g>
 <path d="M550,470 L498,560 L602,560Z" fill="#FFD84A" stroke="#2d2233" stroke-width="5" stroke-linejoin="round"/><circle cx="550" cy="468" r="16" fill="#FF8FB8" stroke="#2d2233" stroke-width="4"/>
 <g fill="#fff"><circle cx="508" cy="632" r="13"/><circle cx="592" cy="632" r="13"/></g><g fill="#1E120A"><circle cx="511" cy="635" r="6"/><circle cx="589" cy="635" r="6"/></g>
</g></g>`;
/* ---------------- scanner rings (Blip's gadget) ---------------- */
let ringSVG='';for(let i=0;i<4;i++)ringSVG+=`<g id="rgw${i}"><g id="rg${i}" class="rgc" opacity="0"><circle r="60" fill="none" stroke="#6FF6FF" stroke-width="10"/><circle r="60" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/></g></g>`;
document.getElementById('fxMount').innerHTML+=ringSVG;
document.getElementById('peanutMount').innerHTML=peanutSilSVG;
document.getElementById('bpMount').innerHTML=blipSVG('bp');
document.getElementById('zpMount').innerHTML=zapSVG('zp');
document.getElementById('ufoLMount').innerHTML=ufoLSVG;
/* ================= episode 8 additions: the glow-party dance floor, the disco ball + light beams, the UFO in the window ================= */
const PFC=['#FF5FA8','#3FD6FF','#FFE14D','#8BFF5A','#B07CFF'];
const PF_X=[[1050,1220,1390,1560,1730,1900],[1135,1305,1475,1645,1815,1985]], PF_Y=[1690,1630];
let pfSVG='';
PF_Y.forEach((y,r)=>PF_X[r].forEach((x,i)=>{pfSVG+=`<g id="pf${r*6+i}" opacity=".12"><ellipse cx="${x}" cy="${y}" rx="104" ry="32" fill="${PFC[(i+r*2)%5]}" ${sw(6)}/><ellipse cx="${x}" cy="${y-4}" rx="66" ry="15" fill="#fff" opacity=".5"/></g>`;}));
document.getElementById('partyFloor').innerHTML=pfSVG;

// disco ball on a string from the ceiling + five coloured light beams (above the dark overlay, so they glow)
const DBX=1400, DBY=150, DBR=88;
let facets='';
for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){if(a*a+b*b>10)continue;const c=['#fff','#CFE9FF','#FFD6EC','#DAFFD0','#FFF3B0'][(a+b+8)%5];facets+=`<rect x="${a*24-11}" y="${b*24-11}" width="22" height="22" rx="4" fill="${c}" opacity=".85" stroke="#8aa0b8" stroke-width="2"/>`;}
const BEAMC=['#FF5FA8','#3FD6FF','#FFE14D','#8BFF5A','#B07CFF'];
let beams='';
BEAMC.forEach((c,i)=>{beams+=`<g class="bm" transform="rotate(${-48+i*24})"><path d="M0,0 L-90,980 L90,980Z" fill="${c}" opacity=".16"/></g>`;});
document.getElementById('partyTop').innerHTML=`<g id="disco" opacity="0"><g id="discoIn">
 <path d="M${DBX},-600 L${DBX},${DBY-DBR}" stroke="#5b4a3c" stroke-width="9"/>
 <g transform="translate(${DBX},${DBY})"><g id="beams">${beams}</g></g>
 <g transform="translate(${DBX},${DBY})"><circle r="${DBR}" fill="#B9C4D6" ${sw(7)}/><g id="dbFacets">${facets}</g><circle r="${DBR}" fill="none" ${sw(7)}/></g>
 <g fill="#fff"><path transform="translate(${DBX-130},${DBY-40})" d="M0,-18 L5,-5 L18,0 L5,5 L0,18 L-5,5 L-18,0 L-5,-5Z"/><path transform="translate(${DBX+138},${DBY+30})" d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4Z"/></g>
</g></g>`;

// the UFO in the window (inside the glass clip)
const UFX=550, UFY=420;
document.getElementById('ufoMount').innerHTML=`<g id="ufo" opacity="0"><g id="ufoIn">
 <circle cx="${UFX}" cy="${UFY+20}" r="190" fill="url(#gGlow)" opacity=".7"/>
 <path id="ufoBeam" d="M${UFX-52},${UFY+24} L${UFX-190},760 L${UFX+190},760 L${UFX+52},${UFY+24}Z" fill="#D8FF9A" opacity=".75"/>
 <g transform="translate(${UFX},690)"><g id="ufoBlip"><ellipse cx="0" cy="-34" rx="34" ry="42" fill="#5CE08A" ${sw(5)}/><ellipse cx="-12" cy="-44" rx="9" ry="12" fill="#fff"/><ellipse cx="12" cy="-44" rx="9" ry="12" fill="#fff"/><circle cx="-10" cy="-42" r="4" fill="${OL}"/><circle cx="14" cy="-42" r="4" fill="${OL}"/><path d="M-10,-18 Q0,-10 10,-18" fill="none" ${sw(4)}/><path d="M-12,-72 Q-20,-100 -30,-96" fill="none" ${sw(5)}/><circle cx="-30" cy="-96" r="7" fill="#FFE14D" ${sw(3)}/></g></g>
 <ellipse cx="${UFX}" cy="${UFY}" rx="118" ry="30" fill="#AEB8C8" ${sw(6)}/>
 <path d="M${UFX-52},${UFY-8} Q${UFX-46},${UFY-62} ${UFX},${UFY-64} Q${UFX+46},${UFY-62} ${UFX+52},${UFY-8}Z" fill="#9FE3FF" ${sw(6)}/>
 <g fill="#FFE14D" ${sw(3)}><circle cx="${UFX-76}" cy="${UFY+6}" r="9"/><circle cx="${UFX-38}" cy="${UFY+14}" r="9"/><circle cx="${UFX}" cy="${UFY+17}" r="9"/><circle cx="${UFX+38}" cy="${UFY+14}" r="9"/><circle cx="${UFX+76}" cy="${UFY+6}" r="9"/></g>
</g></g>`;

/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6',COCO:'#C9A27A',GUMDROP:'#B9AEFF',BOO:'#CFE3FF',BLIP:'#8DF0A8',ZAP:'#9FD8FF',PEANUT:'#C9D2E6'};
const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);
const capsEl=document.getElementById('caps'), capsB=document.getElementById('capsB'), allChunks=[];
for(const ln of [1,2,3,4,5,6,7,8,9,10,11]){let idx=0;const ws=WD[ln], tag=PLAN.tags[ln], hl=HLC[tag];
 PLAN.chunks[ln].forEach((txt,ci)=>{const el=document.createElement('div');el.className='cg';
  if(tag){const tg=document.createElement('div');tg.className='tag';tg.textContent=tag+':';tg.style.color=hl;el.appendChild(tg);}
  const items=txt.split(' ').map(pt=>{const sp=document.createElement('span');sp.className='w';sp.textContent=pt;el.appendChild(sp);const w=ws[idx++];return{sp,s:L[ln]+w.s,e:L[ln]+w.e,hl};});
  (CAP_BOTTOM.has(ln)?capsB:capsEl).appendChild(el);allChunks.push({el,items});});}

/* ---------------- TIMELINE ---------------- */
const tl=gsap.timeline({paused:true});
// every fromTo starts at its own time (not at authoring time) so seeks are deterministic
{const _ft=tl.fromTo.bind(tl);tl.fromTo=(t,f,to,pos)=>_ft(t,f,Object.assign({immediateRender:false},to),pos);}
const BX=540, FLOOR=1640, TT=1165, PL=68, RKT=TT, RKB=1400, RKF=1600, TUBX=1090, TUBY=1110, RKX=1370;
const W=(ln,i)=>L[ln]+WD[ln][i].s, WE=(ln,i)=>L[ln]+WD[ln][i].e;

gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,.slc,.dst,.rgc,#wedgeBigIn,#pizza,#pizzaIn,#oven,#ovenIn,#peel,#peelIn,#bananas,#bananasIn,#pzTop,#pzSauce,#pzCheese,#pzLove,#pzBaked,#feastPc,#feastPcIn,#feastCk,#feastCkIn,#ufoIn,#beams,#ufoLIn,#peanutIn',{svgOrigin:'0 0'});
gsap.set('#discoIn',{svgOrigin:'1400 -600'});gsap.set('#ufoBlip',{svgOrigin:'0 0'});
gsap.set('#fridgeDoor',{svgOrigin:'2360 0'});gsap.set('#gdPupil,#gdEyeG,#gdBrow',{svgOrigin:'2088 1090'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm','tw','tf','cm','gm','gh','bp','zp']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Hat,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Snout,#${p}AntL,#${p}AntR,#${p}Ant,.${p}Eye,.${p}EyeW,.${p}Pupil,.${p}Swirl,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#cmFlip',{svgOrigin:'0 -170'});
gsap.set('#gmBelly',{svgOrigin:'0 -205'});gsap.set('#gmBody',{svgOrigin:'0 -250'});
gsap.set('#ghBody',{svgOrigin:'0 -200'});gsap.set('#ghHead',{svgOrigin:'0 -260'});gsap.set('#ghGlow',{svgOrigin:'0 -200'});gsap.set('#ghFlip',{svgOrigin:'0 -200'});
gsap.set('#zpHead',{svgOrigin:'0 0'});gsap.set('#bpBelly',{svgOrigin:'0 -112'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #8 (window shot: the UFO with a little alien in its beam, Boo floating, the gang frozen mid-party)
const MCS=.66, NSC=.46, BOX=500, BOS=.88, TFS=.68;
const FRIDGE=[1150,0,.84];
const GX=1960, GS=1.5;
gsap.set('#bo',{x:1740,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:1740,y:1112,scale:.78});gsap.set('#panGlaze',{opacity:1});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#cheeseWheel,#wedgeBig',{opacity:0});
gsap.set('#mc',{x:1570,y:FLOOR,scale:.68});gsap.set('#mcSq',{scaleY:1});gsap.set('#mcLids',{opacity:0});gsap.set('#mcArmL',{rotation:0});gsap.set('#mcArmR',{rotation:0});
gsap.set('#nb',{opacity:0});
gsap.set('#nm',{opacity:1,x:1250,y:FLOOR,scale:.5});gsap.set('#nmWedgeG',{opacity:1});gsap.set('#nmArmL',{rotation:0});gsap.set('#nmArmR',{rotation:0});
gsap.set('#tw',{opacity:0});
gsap.set('#tf',{opacity:1,x:1410,y:FLOOR,scale:.74});gsap.set('#tfArmL',{rotation:0});gsap.set('#tfArmR',{rotation:0});gsap.set('#tfSweat',{opacity:0});
gsap.set('#pizza',{opacity:0,x:1070,y:1139});
gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});
gsap.set('#oven',{x:OVX,y:TT});
gsap.set('#cocoSwing',{opacity:0});gsap.set('#peel',{opacity:0});
gsap.set('#pigG',{opacity:0});
gsap.set('#cm',{opacity:1,x:1090,y:FLOOR,scale:.76});gsap.set('#cmSq',{scaleY:1});gsap.set('#cmArmL',{rotation:0});gsap.set('#cmArmR',{rotation:0});
gsap.set('#bananas',{opacity:1,x:1990,y:1664,scale:1.35});gsap.set('#bananasIn',{scaleY:.7,scaleX:1.1});
gsap.set('#fridgeDoor',{scaleX:.16});
gsap.set('#gdPeek',{opacity:0});
gsap.set('#gm',{opacity:1,x:GX,y:FLOOR,scale:GS});gsap.set('#gmArmL',{rotation:0});gsap.set('#gmArmR',{rotation:0});
gsap.set('#gh',{opacity:1,x:800,y:1090,scale:.9});gsap.set('#ghGlow',{opacity:1,scale:1.6});
gsap.set('#feastPc,#feastCk',{opacity:0});
gsap.set('#night',{opacity:.32});
// party props as they were left
gsap.set('#disco',{opacity:1});gsap.set('#discoIn',{y:0});gsap.set('#beams',{opacity:0});
for(let i=0;i<12;i++) gsap.set('#pf'+i,{opacity:.12});
// the window saucer + alien
gsap.set('#ufo',{opacity:1});gsap.set('#ufoBeam',{opacity:.5});gsap.set('#ufoBlip',{opacity:1,scale:1.35});
gsap.set('#peanutG',{opacity:0});
// the new arrivals start hidden
gsap.set('#bp',{opacity:0,x:880,y:FLOOR,scale:.62});gsap.set('#zp',{opacity:0,x:880,y:FLOOR,scale:.6});
gsap.set('#ufoL',{opacity:0,x:880,y:FLOOR});

let camCur=null;
const camSet=(t,x0,y0,s)=>{camCur=[x0,y0,s];tl.set('#cam',{x:-x0*s,y:-y0*s,scale:s},t);};
const camTo=(t,d,x0,y0,s,ease='sine.inOut')=>{const [a,b,c]=camCur;tl.fromTo('#cam',{x:-a*c,y:-b*c,scale:c},{x:-x0*s,y:-y0*s,scale:s,duration:d,ease},t);camCur=[x0,y0,s];};
const shake=(t,amp=14,n=6)=>{for(let i=0;i<n;i++){tl.to('#shake',{x:(i%2?1:-1)*amp*(1-i/n),y:(i%2?-1:1)*amp*.7*(1-i/n),duration:.045},t+i*.045);}tl.to('#shake',{x:0,y:0,duration:.05},t+n*.045);};

/* --- Bo helpers (as in video 1) --- */
const MOUTHS=['mSmile','mOpen','mBig','mFrown','mO'];
const bm=(t,m)=>MOUTHS.forEach(k=>tl.set('#'+k,{opacity:k===m?1:0},t));
const blink=(t)=>{tl.to('.boEye',{scaleY:.1,duration:.05},t).to('.boEye',{scaleY:1,duration:.07},t+.06);};
const look=(t,dx,dy,d=.14)=>tl.to('.boPupil',{x:dx,y:dy,duration:d,ease:'power2.out'},t);
const eyesMode=(t,m)=>{tl.set('#boEyes',{opacity:m==='hearts'?0:1},t);tl.set('#boHeartEyes',{opacity:m==='hearts'?1:0},t);
 if(m!=='hearts') tl.to('.boEyeW',{scale:m==='wide'?1.22:1,duration:.1,ease:'back.out(2)'},t);
 if(m!=='hearts') tl.to('.boPupil',{scale:m==='wide'?.62:1,duration:.1},t);};
const brows=(t,l,r,y=0,d=.15)=>{tl.to('#boBrowL',{rotation:l,y,duration:d},t);tl.to('#boBrowR',{rotation:r,y,duration:d},t);};
function cycle(legs,arms,t0,t1,period,legAmp,armAmp,sq,bob){
 const h=period/2;let k=0;
 tl.set(legs.concat(arms),{rotation:0},t0);
 for(let t=t0;t<t1-h+1e-6;t+=h,k++){const a=k%2?1:-1;
  tl.to(legs[0],{rotation:legAmp*a,duration:h,ease:'sine.inOut'},t);tl.to(legs[1],{rotation:-legAmp*a,duration:h,ease:'sine.inOut'},t);
  if(arms.length){tl.to(arms[0],{rotation:-armAmp*a,duration:h,ease:'sine.inOut'},t);tl.to(arms[1],{rotation:armAmp*a,duration:h,ease:'sine.inOut'},t);}
  tl.fromTo(sq,{y:0},{y:-bob,duration:h/2,ease:'power1.out'},t);tl.to(sq,{y:0,duration:h/2,ease:'power1.in'},t+h/2);}
 tl.to(legs.concat(arms),{rotation:0,duration:.15},t1);}

/* --- Flapjack helpers (one per instance) --- */
function mkPan(p){const MS=['Sm','Gr','Wo','Oh'];
 return{
  pm:(t,m)=>MS.forEach(k=>tl.set(`#${p}${k}`,{opacity:k===m?1:0},t)),
  blink:(t)=>{tl.to(`.${p}Eye`,{scaleY:.1,duration:.05},t).to(`.${p}Eye`,{scaleY:1,duration:.07},t+.06);},
  look:(t,dx,dy,d=.12)=>tl.to(`.${p}Pupil`,{x:dx,y:dy,duration:d,ease:'power2.out'},t),
  eyes:(t,open)=>{tl.set(`#${p}Eyes`,{opacity:open?1:0},t);tl.set(`#${p}EyesClosed`,{opacity:open?0:1},t);},
  brows:(t,on,l=16,r=-16)=>{tl.set(`#${p}BrowL,#${p}BrowR`,{opacity:on?1:0},t);if(on){tl.to(`#${p}BrowL`,{rotation:l,duration:.12},t);tl.to(`#${p}BrowR`,{rotation:r,duration:.12},t);}},
  talk:(t0,t1,a='Gr',b='Sm',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)tl.set(`#${p}${k%2?b:a}`,{opacity:1},t),tl.set(`#${p}${k%2?a:b}`,{opacity:0},t);tl.set(`#${p}${b}`,{opacity:1},t1);tl.set(`#${p}${a}`,{opacity:0},t1);}
 };}
const FJ=mkPan('pan'), FB=mkPan('bh');

/* --- Rocky helpers (one per instance) --- */
function mkRock(p){const MS=['mSm','mOp','mBg','mFr','mO'];
 return{
  m:(t,k)=>MS.forEach(s=>tl.set(`#${p}${s}`,{opacity:s===k?1:0},t)),
  blink:(t)=>{tl.to(`.${p}Eye`,{scaleY:.1,duration:.05},t).to(`.${p}Eye`,{scaleY:1,duration:.07},t+.06);},
  look:(t,dx,dy,d=.14)=>tl.to(`.${p}Pupil`,{x:dx,y:dy,duration:d,ease:'power2.out'},t),
  eyes:(t,mode)=>{tl.set(`#${p}Eyes`,{opacity:mode==='happy'?0:1},t);tl.set(`#${p}EyesHappy`,{opacity:mode==='happy'?1:0},t);
   if(mode!=='happy'){tl.to(`.${p}EyeW`,{scale:mode==='wide'?1.2:1,duration:.1,ease:'back.out(2)'},t);tl.to(`.${p}Pupil`,{scale:mode==='wide'?.62:1,duration:.1},t);}},
  brows:(t,l,r,y=0,d=.15)=>{tl.to(`#${p}BrowL`,{rotation:l,y,duration:d},t);tl.to(`#${p}BrowR`,{rotation:r,y,duration:d},t);},
  talk:(t0,t1,a='mOp',b='mSm',st=.12)=>{let k=0;for(let t=t0;t<t1;t+=st,k++){tl.set(`#${p}${k%2?b:a}`,{opacity:1},t);tl.set(`#${p}${k%2?a:b}`,{opacity:0},t);}tl.set(`#${p}${b}`,{opacity:1},t1);tl.set(`#${p}${a}`,{opacity:0},t1);}
 };}
const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm'), TF=mkRock('tf'), TW=mkRock('tw'), CM=mkRock('cm'), GM=mkRock('gm'), GH=mkRock('gh'), BP=mkRock('bp'), ZP=mkRock('zp');

/* --- fx --- */
const cnt={h:0,s:0,d:0,b:0,u:0};
function hearts(t,x,y,n=5,sp=60,rise=300,dly=.08){for(let k=0;k<n;k++){const i=(cnt.h++)%NH,tt=t+k*dly;
 tl.set('#hw'+i,{x:x+(k-(n-1)/2)*sp+(k%2?12:-12),y:y+(k%2?-24:0)},tt);
 tl.fromTo('#hr'+i,{opacity:0,y:0,scale:.3},{opacity:1,y:-rise*.25,scale:1,duration:.3,ease:'back.out(2)'},tt);
 tl.to('#hr'+i,{y:-rise,opacity:0,duration:1.0,ease:'sine.out'},tt+.3);}}
function sparks(t,x,y,n=6,r=120){for(let k=0;k<n;k++){const i=(cnt.s++)%NS,a=k/n*Math.PI*2+.4,tt=t+k*.04,rr=r*(.6+(k%2)*.5);
 tl.set('#sw'+i,{x:x+Math.cos(a)*rr,y:y+Math.sin(a)*rr},tt);
 tl.fromTo('#sp'+i,{opacity:0,scale:.2,rotation:0},{opacity:1,scale:1.1,rotation:40,duration:.22,ease:'back.out(3)'},tt);
 tl.to('#sp'+i,{opacity:0,scale:.2,duration:.28},tt+.5);}}
function drops(t,x,y,n=6){for(let k=0;k<n;k++){const i=(cnt.d++)%ND,dx=(k-(n-1)/2)*38;
 tl.set('#dw'+i,{x,y},t);
 tl.fromTo('#dr'+i,{opacity:1,x:0,y:0,scale:1},{x:dx,y:-150-(k%3)*40,duration:.28,ease:'power2.out'},t);
 tl.to('#dr'+i,{x:dx*1.5,y:30,opacity:0,duration:.3,ease:'power2.in'},t+.28);}}
function bits(t,x,y,n=6){for(let k=0;k<n;k++){const i=(cnt.b++)%NB,dx=(k%2?1:-1)*(40+k*18);
 tl.set('#bw'+i,{x,y},t+k*.02);
 tl.fromTo('#bt'+i,{opacity:1,x:0,y:0,rotation:0},{x:dx,y:-130-(k%3)*45,rotation:200,duration:.3,ease:'power2.out'},t+k*.02);
 tl.to('#bt'+i,{x:dx*1.4,y:60,opacity:0,duration:.35,ease:'power2.in'},t+k*.02+.3);}}
function bubbles(t,x,y,n=4){for(let k=0;k<n;k++){const i=(cnt.u++)%NU,tt=t+k*.18,dx=(k%2?1:-1)*(20+k*14);
 tl.set('#uw'+i,{x:x+dx,y},tt);
 tl.fromTo('#ub'+i,{opacity:0,scale:.3,y:0},{opacity:1,scale:1,y:-60,duration:.4,ease:'sine.out'},tt);
 tl.to('#ub'+i,{y:-130,scale:1.3,opacity:0,duration:.35,ease:'sine.in'},tt+.4);}}
function steam(a,b){for(let i=0;i<3;i++)for(let t=a+i*.45;t<b;t+=1.35){tl.fromTo('.s'+i,{opacity:0,y:0},{opacity:.75,y:-30,duration:.6,ease:'sine.out'},t).to('.s'+i,{opacity:0,y:-60,duration:.7},t+.6);}}

/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={win:[200,260,1.45], main:[700,-150,.72], blip:[1000,-40,.86]};
const LX=880;                                              // where the little saucer lands
const tSwish1=.45;                                         // away from the window shot
const tDesc=W(1,1)-.1, tLand=W(1,3)+.25;                   // the saucer comes down / touches the floor
const tRamp=tLand+.35, tBlipOut=tLand+.75, tZapOut=tLand+1.45;
const tFJ=L[3]-.1;                                         // Flapjack leaps off Bo's head
const tZapGo=L[5]-.4;                                      // Zap walks to the gang
const tPop=W(6,4)-.05;                                     // "HEAD": Zap's head pops off
const tFound=L[7]+DU[7]+.15;                               // ...and goes back on
const tBeep=[W(8,4),W(8,5),W(8,6)];                        // Blip's scanner: beep, beep, beep
const tCake=W(9,2)-.1;                                     // "BIRTHDAY!" cake icon
const tWow=L[10];
const tSwish2=L[11]-.55;                                   // swish back to the window: Peanut!
const tStk=L[11]+DU[11]+.35;

/* --- small helpers --- */
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const cmEyes=(t,mode)=>{
 tl.set('#cmEyes',{opacity:(mode==='happy'||mode==='dizzy')?0:1},t);
 tl.set('#cmEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#cmEyesDizzy',{opacity:mode==='dizzy'?1:0},t);
 if(mode==='normal'||mode==='wide'){tl.to('.cmEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.cmPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const run=(id,sq,legs,arms,x0,x1,t0,dur,amp,bob,ease='none')=>{tl.fromTo(id,{x:x0},{x:x1,duration:dur,ease},t0);cycle(legs,arms,t0,t0+dur,.2,amp,amp*.8,sq,bob);};
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);
 ['tf','nm','mc','cm','gm','bp','zp'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let rgn=0;
function ring(t,x,y,sc=1){const i=(rgn++)%4;tl.set('#rgw'+i,{x,y},t);tl.fromTo('#rg'+i,{opacity:.95,scale:.3*sc},{opacity:0,scale:2.4*sc,duration:.6,ease:'power1.out'},t);}

/* ================= SCENE 0: the last frame of video #8 — the window, the UFO and a little alien in its beam ================= */
camSet(0,...CAM.win);
eyesMode(0,'wide');bm(0,'mO');brows(0,-14,14,-10,.01);look(0,-30,-8,.01);FB.pm(0,'Oh');
TF.eyes(0,'wide');TF.m(0,'mO');NN.eyes(0,'wide');NN.m(0,'mO');cmEyes(0,'wide');CM.m(0,'mO');mcEyes(0,'wide');MC.m(0,'mO');
GM.eyes(0,'wide');GM.m(0,'mO');GH.eyes(0,'wide');GH.m(0,'mO');GH.look(0,-26,-8,.01);
tl.fromTo('#ufoIn',{y:0},{y:-6,duration:.3,yoyo:true,repeat:1},0);
tl.fromTo('#ufoBlip',{rotation:-8},{rotation:8,duration:.2,yoyo:true,repeat:1},0);
// swish back into the kitchen: the window saucer leaves, the lights come up
camTo(tSwish1,.7,...CAM.main,'power3.inOut');
tl.to('#ufo',{opacity:0,duration:.3},tSwish1);
tl.to('#night',{opacity:0,duration:.8},tSwish1+.3);
tl.to('#discoIn',{y:-420,duration:.7,ease:'power2.in'},tSwish1+.2);tl.set('#disco',{opacity:0},tSwish1+.95);
for(let i=0;i<12;i++) tl.to('#pf'+i,{opacity:0,duration:.4},tSwish1+.2);
tl.to('#gh',{x:1260,y:880,duration:.9,ease:'sine.inOut'},tSwish1);tl.to('#ghGlow',{scale:1.2,opacity:.55,duration:.6},tSwish1);
tl.fromTo('#ghSq',{y:0},{y:-18,duration:.7,yoyo:true,repeat:35,ease:'sine.inOut'},tSwish1+.9);
lookAll(tSwish1+.4,-12,-30);

/* ================= SCENE 1: "A tiny spaceship landed on the floor!" ================= */
tl.set('#ufoL',{opacity:1},tDesc);
tl.fromTo('#ufoLIn',{y:-1100,rotation:-12},{y:0,rotation:0,duration:tLand-tDesc,ease:'power2.in'},tDesc);
tl.fromTo('#ufoLIn',{scaleY:1,scaleX:1},{scaleY:.9,scaleX:1.06,duration:.12,yoyo:true,repeat:1},tLand);
dust(tLand,LX-170,FLOOR+6,1.4);dust(tLand+.03,LX+170,FLOOR+6,1.4);shake(tLand,9,5);
sparks(tLand+.05,LX,FLOOR-250,6,150);
// everybody stares, then crowds in
lookAll(tDesc,-22,-30);
tl.fromTo('#gmSq',{scaleY:1},{scaleY:1.04,duration:.2,yoyo:true,repeat:1},tLand);
eyesMode(tLand+.2,'wide');look(tLand+.2,-26,-4,.12);
// the ramp opens and Blip + Zap step out
tl.set('#ufoLRamp',{svgOrigin:'52 -120'},0);
tl.fromTo('#ufoLRamp',{scaleY:0},{scaleY:1,duration:.3,ease:'back.out(1.6)'},tRamp);
const RX=LX+60, RX2=LX+150;                                // top / bottom of the ramp
tl.set('#bp',{opacity:1,x:RX,y:FLOOR-110},tBlipOut);
tl.fromTo('#bp',{x:RX},{x:RX2+40,duration:.55,ease:'none'},tBlipOut);
tl.fromTo('#bp',{y:FLOOR-110},{y:FLOOR,duration:.55,ease:'none'},tBlipOut);
BP.m(tBlipOut,'mBg');BP.eyes(tBlipOut,'wide');BP.look(tBlipOut,-20,6,.1);
tl.set('#zp',{opacity:1,x:RX,y:FLOOR-110},tZapOut);
tl.fromTo('#zp',{x:RX},{x:RX2+130,duration:.6,ease:'none'},tZapOut);
tl.fromTo('#zp',{y:FLOOR-110},{y:FLOOR,duration:.6,ease:'none'},tZapOut);
ZP.m(tZapOut,'mSm');ZP.eyes(tZapOut,'normal');
cycle(['#zpLegL','#zpLegR'],['#zpArmL','#zpArmR'],tZapOut,tZapOut+.6,.3,14,10,'#zpSq',6);
tl.fromTo('#zpAnt',{rotation:-10},{rotation:10,duration:.2,yoyo:true,repeat:7},tZapOut);

/* ================= SCENE 2: Blip: "Greetings, Earth! Is this... a sandwich?" ================= */
const tBw=L[2]-.1, dBw=2.7;
tl.fromTo('#bp',{x:RX2+40},{x:1560,duration:dBw,ease:'sine.inOut'},tBw);
cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],tBw,tBw+dBw,.34,22,10,'#bpSq',9);
BP.talk(L[2]+.02,L[2]+DU[2]-.1,'mOp','mSm',.14);BP.eyes(L[2],'normal');BP.look(L[2],26,-14,.2);BP.brows(L[2],-6,6,-4,.15);
tl.fromTo('#bpAntL',{rotation:-8},{rotation:8,duration:.25,yoyo:true,repeat:9},L[2]);tl.fromTo('#bpAntR',{rotation:8},{rotation:-8,duration:.25,yoyo:true,repeat:9},L[2]);
tl.to('#bpArmR',{rotation:-120,duration:.2,ease:'back.out(2)'},W(2,4));tl.fromTo('#bpArmR',{rotation:-120},{rotation:-95,duration:.14,yoyo:true,repeat:5},W(2,4)+.2);
BP.m(WE(2,4)+.1,'mSm');
// the gang stares, confused; Bo sweats
eyesMode(L[2],'normal');bm(L[2],'mO');brows(L[2],-8,8,-6,.15);look(L[2],-24,-4,.2);FB.pm(L[2],'Wo');
TF.eyes(L[2],'normal');NN.eyes(L[2],'normal');CM.m(L[2],'mFr');cmEyes(L[2],'normal');mcEyes(L[2],'lids');MC.m(L[2],'mFr');GM.eyes(L[2],'normal');GM.m(L[2],'mSm');
tl.set('#boSweat',{opacity:1},W(2,4));

/* ================= SCENE 3/4: Flapjack: "Catch me if you can!" — the chase ================= */
tl.set('#bh',{opacity:0},tFJ);
tl.set('#pan',{opacity:1,x:1740,y:1112,scale:.78},tFJ);
FJ.pm(tFJ,'Gr');FJ.look(tFJ,20,0,.1);FJ.eyes(tFJ,true);
tl.to('#boArmL',{rotation:-120,duration:.1},tFJ);tl.to('#boArmR',{rotation:120,duration:.1},tFJ);tl.to('#boArmL',{rotation:0,duration:.3},tFJ+.4);tl.to('#boArmR',{rotation:0,duration:.3},tFJ+.4);
const P=[[tFJ,1740,1800,.5,'arc'],[tFJ+.55,1800,1150,1.05],[tFJ+1.6,1150,1900,1.15],[tFJ+2.75,1900,1300,1.1],[tFJ+3.85,1300,1740,1.0,'up']];
tl.fromTo('#pan',{x:1740},{x:1800,duration:.5,ease:'none'},tFJ);arc('#pan',tFJ,.5,1112,120,FLOOR);
P.slice(1).forEach(([t,a,b,d,k],i)=>{
 tl.fromTo('#pan',{x:a},{x:b,duration:d,ease:'none'},t);
 cycle(['#panLegL','#panLegR'],['#panArmL','#panArmR'],t,t+d,.18,36,30,'#panSq',16);
 if(k==='up'){arc('#pan',t+d-.5,.5,FLOOR,200,1112);}
 FJ.pm(t,i%2?'Sm':'Gr');
 dust(t+.05,a,FLOOR+6,.7);});
tl.set('#bh',{opacity:1},tFJ+4.85);tl.set('#pan',{opacity:0},tFJ+4.85);
// Blip chases (a step behind, getting tired)
const B=[[tFJ+.45,1560,1780,.6],[tFJ+1.15,1780,1250,1.1],[tFJ+2.35,1250,1850,1.25],[tFJ+3.7,1850,1380,1.15],[tFJ+4.95,1380,1700,.9]];
B.forEach(([t,a,b,d])=>{tl.fromTo('#bp',{x:a},{x:b,duration:d,ease:'none'},t);cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],t,t+d,.2,30,26,'#bpSq',12);});
BP.m(tFJ+.4,'mBg');BP.eyes(tFJ+.4,'wide');BP.brows(tFJ+.4,10,-10,-4,.1);BP.look(tFJ+.4,-26,10,.1);
BP.talk(tFJ+1.2,tFJ+4.8,'mBg','mOp',.18);
tl.fromTo('#bpAntL',{rotation:-18},{rotation:18,duration:.1,yoyo:true,repeat:30},tFJ+.4);tl.fromTo('#bpAntR',{rotation:18},{rotation:-18,duration:.1,yoyo:true,repeat:30},tFJ+.4);
tl.set('#bpAntL,#bpAntR',{rotation:0},tFJ+3.6);
// the audience follows the chase with their eyes
[[tFJ+.6,-26],[tFJ+1.7,28],[tFJ+2.9,-26],[tFJ+4.0,28]].forEach(([t,dx])=>lookAll(t,dx,-6));
eyesMode(tFJ,'wide');bm(tFJ,'mBig');tl.set('#boSweat',{opacity:0},tFJ);
TF.m(tFJ,'mBg');NN.m(tFJ,'mBg');CM.m(tFJ,'mBg');MC.m(tFJ,'mO');mcEyes(tFJ,'wide');GM.m(tFJ,'mBg');GM.eyes(tFJ,'happy');
// Zap quietly records everything
tl.fromTo('#zpAnt',{rotation:-12},{rotation:12,duration:.3,yoyo:true,repeat:11},tFJ);tl.set('#zpAnt',{rotation:0},tFJ+3.9);

/* ================= SCENE 5: Zap: "Beep boop! Processing fun!" ================= */
camTo(tZapGo-.3,.8,...CAM.blip,'power2.inOut');
{const t0=tZapGo,d=.9;
 tl.fromTo('#zp',{x:RX2+130},{x:1450,duration:d,ease:'sine.inOut'},t0);
 cycle(['#zpLegL','#zpLegR'],['#zpArmL','#zpArmR'],t0,t0+d,.3,16,10,'#zpSq',6);}
ZP.m(L[5]-.05,'mBg');ZP.talk(L[5]+.02,L[5]+DU[5]-.1,'mBg','mSm',.13);ZP.eyes(L[5],'happy');ZP.brows(L[5],8,-8,-4,.1);
for(let k=0;k<6;k++){const t=L[5]+.1+k*.28,odd=k%2;
 tl.to('#zpArmL',{rotation:odd?30:150,duration:.14},t);tl.to('#zpArmR',{rotation:odd?-150:-30,duration:.14},t);
 hop('#zpSq',t,22,.1,.14);tl.to('#zpLean',{rotation:odd?5:-5,duration:.14},t);}
tl.to('#zpArmL',{rotation:0,duration:.2},L[5]+DU[5]);tl.to('#zpArmR',{rotation:0,duration:.2},L[5]+DU[5]);tl.set('#zpLean',{rotation:0},L[5]+DU[5]+.05);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[5]);tl.set('#zpAnt',{rotation:0},L[5]+DU[5]);
// everybody relaxes (Flapjack is back safe on Bo's head)
eyesMode(L[5],'normal');bm(L[5],'mSmile');brows(L[5],6,-6,-4,.15);FB.pm(L[5],'Gr');look(L[5],-18,-2,.2);
TF.m(L[5],'mSm');TF.eyes(L[5],'happy');NN.m(L[5],'mSm');NN.eyes(L[5],'happy');CM.m(L[5],'mSm');cmEyes(L[5],'happy');MC.m(L[5],'mSm');mcEyes(L[5],'lids');GM.m(L[5],'mSm');
BP.m(L[5],'mSm');BP.eyes(L[5],'happy');BP.brows(L[5],6,-6,-4,.1);
tl.to('#bpArmR',{rotation:0,duration:.2},L[5]);

/* ================= SCENE 6: Mochi: "Hmph. Don't lose your head. Obviously." — and Zap's head falls off ================= */
MC.m(L[6]-.05,'mFr');MC.talk(L[6],L[6]+DU[6]-.05,'mOp','mFr',.15);mcEyes(L[6],'lids');MC.brows(L[6],8,-8,2,.2);
tl.to('#mcArmR',{rotation:-95,duration:.25,ease:'back.out(1.8)'},W(6,3));
tl.to('#mcArmR',{rotation:0,duration:.3},WE(6,4)+.3);
// POP — the head flies off and rolls away
tl.fromTo('#zpHead',{y:0,x:0,rotation:0},{y:-250,x:-110,rotation:-200,duration:.3,ease:'power2.out'},tPop);
tl.to('#zpHead',{y:272,x:-230,rotation:-440,duration:.36,ease:'power2.in'},tPop+.3);
tl.to('#zpHead',{y:180,x:-290,rotation:-620,duration:.18,ease:'power2.out'},tPop+.66);
tl.to('#zpHead',{y:272,x:-340,rotation:-760,duration:.2,ease:'power2.in'},tPop+.84);
tl.to('#zpHead',{x:-370,rotation:-820,duration:.5,ease:'power2.out'},tPop+1.04);
sparks(tPop+.02,1450,1250,6,90);
shake(tPop+.95,6,4);dust(tPop+.98,1450-0.6*230,FLOOR+6,.8);
ZP.eyes(tPop,'wide');ZP.m(tPop,'mO');
// the headless body flails
tl.to('#zpArmL',{rotation:150,duration:.12},tPop+.05);tl.to('#zpArmR',{rotation:-150,duration:.12},tPop+.05);
tl.fromTo('#zpArmL',{rotation:150},{rotation:60,duration:.22,yoyo:true,repeat:11,ease:'sine.inOut'},tPop+.2);
tl.fromTo('#zpArmR',{rotation:-60},{rotation:-150,duration:.22,yoyo:true,repeat:11,ease:'sine.inOut'},tPop+.2);
// the others gasp
eyesMode(tPop,'wide');bm(tPop,'mO');brows(tPop,-16,16,-10,.08);FB.pm(tPop,'Oh');
TF.eyes(tPop,'wide');TF.m(tPop,'mO');NN.eyes(tPop,'wide');NN.m(tPop,'mBg');cmEyes(tPop,'wide');CM.m(tPop,'mBg');GM.eyes(tPop,'wide');GM.m(tPop,'mO');BP.eyes(tPop,'wide');BP.m(tPop,'mO');
GH.eyes(tPop,'wide');GH.m(tPop,'mO');
['#boSq','#tfSq','#nmSq','#cmSq'].forEach((s,i)=>hop(s,tPop+i*.03,70,.14,.2));

/* ================= SCENE 7: Zap's head, on the floor: "Head not found. Beep." ================= */
ZP.m(L[7]-.05,'mBg');ZP.talk(L[7]+.02,L[7]+DU[7]-.08,'mBg','mOp',.16);ZP.eyes(L[7],'wide');ZP.brows(L[7],-10,10,-4,.1);
ZP.look(L[7],-20,-6,.1);ZP.look(L[7]+.7,24,6,.15);ZP.look(L[7]+1.2,-14,10,.15);
tl.fromTo('#zpHead',{rotation:-820},{rotation:-800,duration:.2,yoyo:true,repeat:7},L[7]);
// the headless body wanders around
tl.to('#zp',{x:1380,duration:.8,ease:'sine.inOut'},L[7]);tl.to('#zp',{x:1520,duration:.9,ease:'sine.inOut'},L[7]+.8);
cycle(['#zpLegL','#zpLegR'],[],L[7],L[7]+1.7,.4,14,0,'#zpSq',5);
// the audience giggles
eyesMode(L[7],'normal');bm(L[7],'mBig');brows(L[7],6,-6,-4,.1);FB.pm(L[7],'Gr');
TF.m(L[7],'mBg');TF.eyes(L[7],'happy');NN.m(L[7],'mBg');NN.eyes(L[7],'happy');CM.m(L[7],'mBg');cmEyes(L[7],'happy');GM.m(L[7],'mSm');GM.eyes(L[7],'happy');BP.m(L[7],'mBg');BP.eyes(L[7],'happy');GH.m(L[7],'mBg');GH.eyes(L[7],'happy');
['#boSq','#nmSq','#cmSq'].forEach((s,i)=>tl.fromTo(s,{y:0},{y:-24,duration:.12,yoyo:true,repeat:5},L[7]+.3+i*.05));
// Mochi puts the head back (obviously)
tl.to('#mcArmR',{rotation:-60,duration:.2},tFound-.3);
tl.to('#zpHead',{x:0,y:0,rotation:0,duration:.4,ease:'back.out(1.6)'},tFound);
sparks(tFound+.35,1520,1250,8,100);
tl.to('#zp',{x:1450,duration:.3},tFound);
ZP.eyes(tFound+.35,'happy');ZP.m(tFound+.35,'mSm');ZP.brows(tFound+.35,6,-6,-4,.1);
tl.to('#zpArmL',{rotation:0,duration:.2},tFound-.1);tl.to('#zpArmR',{rotation:0,duration:.2},tFound-.1);
tl.set('#zpHead',{rotation:0},tFound+.45);

/* ================= SCENE 8: "Then Blip's scanner went beep, beep, beep!" ================= */
camTo(L[8]-.3,.8,...CAM.blip,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[8]);
BP.eyes(L[8],'wide');BP.m(L[8],'mO');BP.look(L[8],0,-20,.2);BP.brows(L[8],-8,8,-4,.1);
tl.to('#bp',{x:1640,duration:.7,ease:'sine.inOut'},L[8]-.2);
cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],L[8]-.2,L[8]+.5,.3,18,8,'#bpSq',6);
tBeep.forEach((t,i)=>{
 ring(t,1640,FLOOR-.62*430,1.2);
 tl.fromTo('#bpAntL',{rotation:-24},{rotation:0,duration:.25,ease:'elastic.out(1,.4)'},t);tl.fromTo('#bpAntR',{rotation:24},{rotation:0,duration:.25,ease:'elastic.out(1,.4)'},t);
 hop('#bpSq',t,34,.1,.14);BP.m(t,'mO');BP.m(t+.2,'mOp');});
sparks(tBeep[2]+.05,1640,FLOOR-330,6,120);
lookAll(L[8],12,-14);

/* ================= SCENE 9: Blip: "It is somebody's birthday!" ================= */
BP.eyes(L[9],'happy');BP.m(L[9]-.05,'mBg');BP.talk(L[9]+.02,L[9]+DU[9]-.1,'mBg','mSm',.14);BP.brows(L[9],6,-6,-4,.1);
tl.set('#feastCk',{opacity:1,x:1640,y:FLOOR-.62*450,scale:.2},tCake);
tl.fromTo('#feastCk',{scale:.2},{scale:.62,duration:.4,ease:'back.out(2.4)'},tCake);
tl.fromTo('#feastCkIn',{rotation:-6},{rotation:6,duration:.25,yoyo:true,repeat:7,ease:'sine.inOut'},tCake+.3);
sparks(tCake+.2,1640,FLOOR-.62*600,6,110);hearts(tCake+.4,1640,FLOOR-.62*660,3,70,160);
tl.to('#bpArmL',{rotation:140,duration:.2},tCake);tl.to('#bpArmR',{rotation:-140,duration:.2},tCake);
tl.to('#feastCk',{opacity:0,duration:.3},L[9]+DU[9]+.2);
// everybody perks up and looks at Bo
eyesMode(L[9],'normal');bm(L[9],'mBig');look(L[9],6,-8,.2);
TF.eyes(L[9],'wide');TF.m(L[9],'mBg');NN.eyes(L[9],'wide');NN.m(L[9],'mBg');cmEyes(L[9],'wide');CM.m(L[9],'mBg');GM.eyes(L[9],'wide');GM.m(L[9],'mBg');mcEyes(L[9],'happy');MC.m(L[9],'mSm');
GH.eyes(L[9],'happy');
tl.fromTo('#gmBelly',{scale:1},{scale:1.06,duration:.12,yoyo:true,repeat:7},L[9]);

/* ================= SCENE 10: Bo: "Wait... it's MY birthday?" ================= */
tl.to('#boArmL',{rotation:-150,duration:.12},tWow);tl.to('#boArmR',{rotation:150,duration:.12},tWow);
eyesMode(tWow-.05,'wide');bm(tWow-.05,'mO');brows(tWow-.05,-18,18,-12,.08);FB.pm(tWow-.05,'Oh');
tl.fromTo('#boSq',{y:0},{y:-50,duration:.16,yoyo:true,repeat:3,ease:'power1.out'},tWow);
bm(W(10,2),'mBig');eyesMode(W(10,2),'hearts');
hearts(W(10,2),1740,1000,6,100,260);
tl.to('#boArmL',{rotation:0,duration:.25},tWow+DU[10]+.1);tl.to('#boArmR',{rotation:0,duration:.25},tWow+DU[10]+.1);

/* ================= SCENE 11: Peanut at the window: "I remember everything!" ================= */
camTo(tSwish2,.7,...CAM.win,'power3.inOut');
tl.to('#gh',{x:870,y:1110,duration:.7,ease:'power2.inOut'},tSwish2);tl.to('#ghGlow',{scale:1.6,opacity:1,duration:.4},tSwish2);
tl.to('#night',{opacity:.3,duration:.5},tSwish2);
GH.eyes(tSwish2+.6,'wide');GH.m(tSwish2+.6,'mO');GH.look(tSwish2+.6,-26,-14,.1);
tl.set('#peanutG',{opacity:1},L[11]-.15);
tl.fromTo('#peanutIn',{y:260},{y:0,duration:.55,ease:'back.out(1.8)'},L[11]-.15);
tl.fromTo('#peanutIn',{rotation:-1.5},{rotation:1.5,duration:.35,yoyo:true,repeat:7,ease:'sine.inOut'},L[11]+.4);
sparks(L[11]+.3,550,520,6,120);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

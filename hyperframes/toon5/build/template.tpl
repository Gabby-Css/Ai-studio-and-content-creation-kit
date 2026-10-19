<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>Bo and the Pancake 5 - Pizza Party</title>
<script src="vendor/gsap.min.js"></script>
<style>
@font-face{font-family:'Baloo2';src:url('assets/fonts/baloo-2-latin-800-normal.woff2') format('woff2');font-weight:800}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#FBCB93}
#root{position:relative;width:100%;height:100%;overflow:hidden;background:#FBCB93;font-family:'Baloo2',sans-serif;font-weight:800}
#shake{position:absolute;left:0;top:0;width:1080px;height:1920px}
#cam{position:absolute;left:0;top:0;width:2600px;height:2200px}
#world{display:block}
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
<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>
<clipPath id="cpHole"><path d="M1520,1358 L1520,1272 Q1520,1156 1640,1156 Q1760,1156 1760,1272 L1760,1358Z"/></clipPath>
<!-- everything except the table top/apron/legs: characters standing behind the table are hidden by it -->
<clipPath id="cpNoTable"><path clip-rule="evenodd" d="M-300,-300 H2900 V2500 H-300Z M520,1170 H1480 V1300 H520Z M560,1300 H608 V1640 H560Z M1432,1300 H1480 V1640 H1432Z"/></clipPath>
</defs>

<!-- ============ KITCHEN ============ -->
<rect x="0" y="0" width="2600" height="1360" fill="url(#gWall)"/>
<rect x="0" y="0" width="2600" height="1000" fill="url(#pDots)"/>
<rect x="0" y="1000" width="2600" height="360" fill="url(#pTile)"/>
<rect x="-10" y="990" width="2620" height="22" fill="#fff" stroke="#2b1a14" stroke-width="6"/>
<rect x="0" y="1360" width="2600" height="840" fill="url(#pFloor)"/>
<rect x="-10" y="1340" width="2620" height="36" fill="#fff" stroke="#2b1a14" stroke-width="7"/>
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
 <g clip-path="url(#cpGlass)"><g id="twMount"></g></g>
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
<g id="fridgeDoor">
 <rect x="1980" y="880" width="380" height="720" rx="34" fill="#A6E6CF" stroke="#2b1a14" stroke-width="9"/>
 <rect x="2008" y="1000" width="22" height="230" rx="11" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <path d="M2150,960 l14,32 34,3 -26,22 8,34 -30,-18 -30,18 8,-34 -26,-22 34,-3z" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <rect x="2200" y="1240" width="110" height="130" rx="8" fill="#fff" stroke="#2b1a14" stroke-width="5" transform="rotate(4 2255 1305)"/>
 <path d="M2220,1330 q20,-40 40,0 t40,0" fill="none" stroke="#FF8F5A" stroke-width="7" stroke-linecap="round" transform="rotate(4 2255 1305)"/>
</g>

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
<g id="tfMount"></g>
<g id="pizzaMount"></g>
<g id="ovenMount"></g>
<g id="nmMount"></g>
<g id="boMount"></g>
<g id="bowlMount"></g>
<g id="cocoMount"></g>
<g id="fxMount"></g>
</svg>
</div></div>

<div id="vig"></div>
<div id="dim"></div>
<div id="caps" class="caps"></div>
<div id="capsB" class="caps"></div>
<div id="sticker"><span class="stk1">WHO TOOK THE PIZZA?</span><span class="stk2">GUESS IN THE COMMENTS!</span></div>
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

/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6',COCO:'#C9A27A'};
const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);
const capsEl=document.getElementById('caps'), capsB=document.getElementById('capsB'), allChunks=[];
for(const ln of [1,2,3,4,5,6,7,8,9,10]){let idx=0;const ws=WD[ln], tag=PLAN.tags[ln], hl=HLC[tag];
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
gsap.set('#boSq,#boLean,#boBody,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,.slc,#wedgeBigIn,#pizza,#pizzaIn,#oven,#ovenIn,#peel,#peelIn,#pzTop,#pzSauce,#pzCheese,#pzLove,#pzBaked',{svgOrigin:'0 0'});
gsap.set('#pigIn',{svgOrigin:'550 736'});gsap.set('#pigSnout',{svgOrigin:'550 716'});
gsap.set('#cocoSwing',{svgOrigin:CPX+' '+CPY});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm','tw','tf']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Body,#${p}Belly,#${p}Head,#${p}Hat,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Snout,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #4's window (the chef silhouette), the kitchen waits behind it
const MCS=.66, NSC=.46, BOX=500, BOS=.88, TFS=.68, MCX=690, NIX=840, OVT=TT-6;
gsap.set('#bo',{x:BOX,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:BOX,y:1122});gsap.set('#panLegs',{opacity:1});gsap.set('#panGlaze',{opacity:1});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#cheeseWheel,#wedgeBig',{opacity:0});
gsap.set('#mc',{x:MCX,y:TT,scale:MCS});gsap.set('#mcSq',{scaleY:.94});gsap.set('#mcLids',{opacity:1});gsap.set('#mcArmL',{rotation:-28});gsap.set('#mcArmR',{rotation:28});
gsap.set('#nb',{opacity:0});
gsap.set('#nm',{opacity:1,x:NIX,y:TT,scale:NSC});gsap.set('#nmWedgeG',{opacity:1});gsap.set('#nmArmL',{rotation:-38});gsap.set('#nmArmR',{rotation:38});
gsap.set('#tw',{opacity:0,x:550,y:1067,scale:.95});
gsap.set('#tf',{opacity:0,x:560,y:772,scale:.5});
gsap.set('#pizza',{opacity:0,x:PZX,y:PZY});
gsap.set('#oven',{x:OVX,y:TT});
gsap.set('#cocoSwing',{opacity:0});gsap.set('#peel',{opacity:0});
gsap.set('#pigG',{opacity:1});gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});

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
const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm'), TF=mkRock('tf'), TW=mkRock('tw');

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
const WIDE=[345,215,.97], WINC=[213,250,1.6];
const BOX2=BOX+90;                                        // Bo creeps towards the pizza
const tReveal=W(1,2)-.1;                                  // silhouette -> colour at "PIG"
const tSqz=W(1,3), tOut=W(1,6)+.3, tLand=tOut+.7;         // "SQUEEZED" ... out of the window ... lands
const tBase=W(2,3);                                       // "GIANT": the pizza base pops in
const tSauce=W(3,0)+.05, tCheese=W(3,1)+.05, tTopP=W(3,3)+.05;
const tTaste=[W(3,6),W(3,7),W(3,8),W(3,9)];               // "TASTED EVERY SINGLE ONE"
const tBo=W(4,0);
const tNot=W(5,0), tPinch=W(5,4);                         // "NOT YET!" / "...A PINCH more love"
const tBake=W(6,0)+.05, tDing=W(6,5), tOutPz=tDing+.2;
const tSl=[W(7,1)-.05,W(7,2),W(7,3)+.1,W(7,3)+.35,W(7,4)+.25];   // the slices fly
const tSw0=W(8,2)-.1, tGrab=tSw0+.55;                     // Coco swings in and snatches the pizza
const tPeel=W(9,1)-.15;
const tStk=L[10]+DU[10]+.2;

/* --- small helpers --- */
let ccn=0;
function chunk(t,x0,y0,x1,y1,dur=.6,hgt=220){const i=(ccn++)%6;
 tl.set('#cw'+i,{x:x0,y:y0},t);
 tl.fromTo('#cc'+i,{opacity:1,x:0,rotation:0,scale:1},{x:x1-x0,rotation:380,duration:dur,ease:'none'},t);
 tl.fromTo('#cc'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#cc'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#cc'+i,{opacity:0},t+dur);}
let sln=0;
function slice(t,x0,y0,x1,y1,dur=.6,hgt=200){const i=(sln++)%6;
 tl.set('#slw'+i,{x:x0,y:y0},t);
 tl.fromTo('#sl'+i,{opacity:1,x:0,rotation:-30,scale:.9},{x:x1-x0,rotation:330,duration:dur,ease:'none'},t);
 tl.fromTo('#sl'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#sl'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#sl'+i,{opacity:0},t+dur);}
function rain(t,x,y,n=7){for(let k=0;k<n;k++){const i=(cnt.h++)%NH,tt=t+k*.07,dx=(k-(n-1)/2)*44;
 tl.set('#hw'+i,{x:x+dx,y:y+(k%2)*22},tt);
 tl.fromTo('#hr'+i,{opacity:0,y:0,scale:.3},{opacity:1,y:60,scale:.8,duration:.25,ease:'power1.out'},tt);
 tl.to('#hr'+i,{y:170,opacity:0,duration:.45,ease:'power1.in'},tt+.25);}}
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);};

/* ================= SCENE 1: the silhouette is Truffle! He squeezes through the window ================= */
camSet(0,...WINC);
tl.fromTo('#pigSnout',{scale:1},{scale:1.2,duration:.1,yoyo:true,repeat:11},.1);
tl.fromTo('#pigIn',{y:0},{y:-12,duration:.12,yoyo:true,repeat:7},.15);
// colour reveal
tl.to('#pigG',{opacity:0,duration:.2},tReveal);
tl.set('#tw',{opacity:1},tReveal);
tl.fromTo('#tw',{scale:.82},{scale:.95,duration:.3,ease:'back.out(2.4)'},tReveal);
TW.m(tReveal,'mBg');TW.eyes(tReveal,'wide');TW.look(tReveal,0,6,.1);TW.brows(tReveal,-8,8,-6,.1);
sparks(tReveal+.1,550,640,7,170);
TW.eyes(tReveal+.45,'normal');TW.m(tReveal+.45,'mSm');TW.blink(tReveal+.9);
// "SQUEEZED THROUGH THE WINDOW": wriggles through the narrow frame
const nS=Math.round((tOut-tSqz)/.22);
tl.fromTo('#twSq',{scaleX:1,scaleY:1},{scaleX:.74,scaleY:1.14,duration:.11,yoyo:true,repeat:nS,ease:'sine.inOut'},tSqz);
tl.to('#tw',{y:1135,duration:tOut-tSqz,ease:'sine.in'},tSqz);
tl.fromTo('#twHead',{rotation:-6},{rotation:6,duration:.11,yoyo:true,repeat:nS},tSqz);
TW.m(tSqz,'mO');TW.eyes(tSqz,'wide');TW.m(tOut-.3,'mBg');
shake(tSqz+.1,4,3);shake(tSqz+.6,4,3);
// pops out onto the sill and hops down onto the table
tl.set('#tw',{opacity:0},tOut);
tl.set('#tf',{opacity:1,x:560,y:772,scale:.5},tOut);
camTo(tOut-.3,.9,...WIDE);
tl.fromTo('#tf',{x:560},{x:880,duration:.7,ease:'none'},tOut);
arc('#tf',tOut,.7,772,110,TT-10);
tl.fromTo('#tf',{scale:.5},{scale:TFS,duration:.7,ease:'none'},tOut);
tl.fromTo('#tfSq',{scaleX:.8,scaleY:1.25},{scaleX:1,scaleY:1,duration:.3,ease:'back.out(2)'},tOut);
TF.m(tOut,'mO');TF.eyes(tOut,'wide');TF.look(tOut,0,10,.1);
sparks(tOut+.05,560,780,6,90);
tl.fromTo('#tfSq',{scaleX:1.25,scaleY:.78},{scaleX:1,scaleY:1,duration:.5,ease:'elastic.out(1,.4)'},tLand);
shake(tLand,6,3);
TF.m(tLand,'mBg');TF.eyes(tLand,'normal');TF.look(tLand,0,0,.1);
// the kitchen gang is watching: everyone is wide-eyed for a second
eyesMode(tLand,'wide');bm(tLand,'mO');look(tLand,26,-10,.1);
FB.pm(tLand,'Oh');FB.look(tLand,16,-6,.1);
MC.m(tLand,'mFr');
NN.eyes(tLand,'wide');NN.look(tLand,-16,-6,.1);
// waddles to his cooking spot
const tW0=tLand+.2, tW1=L[2]-.1;
tl.fromTo('#tf',{x:880},{x:PZX,duration:tW1-tW0,ease:'sine.inOut'},tW0);
cycle(['#tfLegL','#tfLegR'],[],tW0,tW1,.34,24,0,'#tfSq',7);
TF.m(tW0,'mSm');
tl.fromTo('#board',{opacity:0,scale:.6},{opacity:1,scale:1,duration:.35,ease:'back.out(1.8)'},tW1-.2);

/* ================= SCENE 2: "Let's make a giant pizza!" ================= */
tl.set('#tf',{y:TT-10},L[2]);
TF.m(L[2],'mBg');TF.talk(L[2]+.03,L[2]+DU[2]-.08,'mBg','mSm',.13);
tl.to('#tfArmL',{rotation:150,duration:.2,ease:'back.out(2)'},W(2,2));tl.to('#tfArmR',{rotation:-150,duration:.2,ease:'back.out(2)'},W(2,2));
tl.fromTo('#tfHat',{y:0},{y:-14,duration:.12,yoyo:true,repeat:3},W(2,3));
tl.fromTo('#pizza',{opacity:0,scale:.2,y:PZY-140},{opacity:1,scale:1,y:PZY,duration:.45,ease:'back.out(2)'},tBase);
sparks(tBase+.2,PZX,PZY-20,8,210);
// everybody cheers
eyesMode(W(2,3),'hearts');bm(W(2,3),'mBig');
tl.fromTo('#boSq',{y:0},{y:-40,duration:.13,yoyo:true,repeat:5,ease:'power1.out'},W(2,3));
FB.pm(W(2,3),'Gr');tl.to('#bhArmL',{rotation:-150,duration:.2},W(2,3));tl.to('#bhArmR',{rotation:150,duration:.2},W(2,3));
MC.m(W(2,3),'mSm');MC.look(W(2,3),20,0,.15);
NN.eyes(W(2,3),'happy');NN.m(W(2,3),'mBg');
tl.fromTo('#nm',{y:TT},{y:TT-34,duration:.12,yoyo:true,repeat:5,ease:'power1.out'},W(2,3));
hearts(W(2,4),BOX,1000,3,70,220);

/* ================= SCENE 3: sauce, cheese, toppings ... and he tastes every single one ================= */
tl.to('#tfArmL',{rotation:0,duration:.25},tSauce-.35);
tl.set('#tfLadle',{opacity:1},tSauce-.3);
tl.to('#tfArmR',{rotation:-75,duration:.18,ease:'back.out(2)'},tSauce-.25);
tl.to('#tfArmR',{rotation:-25,duration:.2},tSauce+.1);
tl.fromTo('#pzSauce',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.4,ease:'back.out(1.8)'},tSauce+.1);
sparks(tSauce+.15,PZX,PZY-40,5,120);
TF.m(tSauce,'mBg');TF.eyes(tSauce,'happy');
// cheese: Nibbles shoots cubes onto the pizza
NN.eyes(tCheese-.1,'normal');NN.m(tCheese-.1,'mBg');
tl.to('#nmArmR',{rotation:-110,duration:.1},tCheese-.1);tl.to('#nmArmR',{rotation:38,duration:.25},tCheese+.35);
for(let k=0;k<3;k++){chunk(tCheese+k*.13,NIX+20,1000,PZX+(k-1)*60,PZY-10,.5,190);tl.to('#nmWedgeG',{scale:1.55-.16*(k+1),duration:.1},tCheese+k*.13);}
tl.fromTo('#pzCheese',{opacity:0,scale:.4},{opacity:1,scale:1,duration:.4,ease:'back.out(1.8)'},tCheese+.55);
tl.to('#tfArmR',{rotation:0,duration:.3},tCheese);
NN.m(tCheese+.6,'mSm');
// toppings rain down
tl.fromTo('#pzTop',{opacity:0,y:-130,scale:1.2},{opacity:1,y:0,scale:1,duration:.55,ease:'bounce.out'},tTopP);
sparks(tTopP+.5,PZX,PZY-30,6,150);
tl.fromTo('#tfHat',{rotation:-8},{rotation:8,duration:.13,yoyo:true,repeat:5},tTopP);
TF.eyes(tTopP,'normal');TF.m(tTopP,'mO');
// he tastes every single one (his belly grows each time)
tTaste.forEach((t,i)=>{
 TF.m(t-.06,'mBg');TF.eyes(t-.06,'happy');TF.m(t+.2,'mSm');
 tl.fromTo('#tfHead',{y:0},{y:16,duration:.1,yoyo:true,repeat:1},t);
 tl.to('#tfBelly',{scale:1.1+.1*i,duration:.2,ease:'back.out(2)'},t+.1);
 tl.to('#tfSq',{scaleX:1.04+.035*i,duration:.2},t+.1);
 sparks(t+.1,PZX,PZY-70,3,70);});
tl.fromTo('#tfHat',{y:0},{y:-20,duration:.12,yoyo:true,repeat:1},tTaste[3]+.15);       // burp!
bubbles(tTaste[3]+.2,PZX+60,880,3);

/* ================= SCENE 4: Bo: "Just one tiny bite!" ================= */
tl.to('#bo',{x:BOX2,duration:.9,ease:'sine.inOut'},tBo-.2);
cycle(['#boLegL','#boLegR'],[],tBo-.2,tBo+.7,.34,22,0,'#boSq',8);
tl.to('#boArmL',{rotation:-95,duration:.3,ease:'back.out(1.6)'},tBo);tl.to('#boArmR',{rotation:-100,duration:.3,ease:'back.out(1.6)'},tBo);
tl.to('#boLean',{rotation:12,duration:.3},tBo+.5);
eyesMode(tBo,'hearts');[0,1,2,3].forEach(i=>bm(W(4,i),['mOpen','mBig','mOpen','mBig'][i]));bm(WE(4,3)+.12,'mSmile');
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.14,duration:.2,yoyo:true,repeat:5},tBo);
FB.pm(tBo,'Wo');FB.brows(tBo,true,-14,14);FB.look(tBo,-18,6,.1);
tl.fromTo('#bhShake',{rotation:-5},{rotation:5,duration:.07,yoyo:true,repeat:10},tBo);tl.set('#bhShake',{rotation:0},tBo+.9);
TF.m(tBo+.5,'mO');TF.eyes(tBo+.5,'wide');TF.look(tBo+.5,-20,4,.1);
MC.look(tBo,-18,6,.1);MC.m(tBo,'mSm');

/* ================= SCENE 5: "Not yet! Needs a pinch more love!" ================= */
tl.to('#tfArmR',{rotation:-150,duration:.15,ease:'back.out(2)'},tNot);
tl.fromTo('#tfArmR',{rotation:-150},{rotation:-120,duration:.12,yoyo:true,repeat:5},tNot+.15);       // wagging finger
TF.brows(tNot,12,-12,-6,.1);TF.m(tNot,'mBg');TF.talk(tNot+.03,tNot+DU[5]*.2,'mBg','mFr',.12);
tl.fromTo('#tfHead',{rotation:-6},{rotation:6,duration:.12,yoyo:true,repeat:5},tNot);
TF.brows(tNot+.7,-6,6,0,.15);TF.m(tNot+.7,'mSm');TF.talk(tNot+.7,L[5]+DU[5]-.1,'mBg','mSm',.13);
// the pinch of love
tl.to('#tfArmR',{rotation:-60,duration:.2},tPinch-.25);tl.to('#tfArmL',{rotation:70,duration:.2},tPinch-.25);
rain(tPinch,PZX,PZY-230,8);
tl.fromTo('#pzLove',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.45,ease:'back.out(2)'},tPinch+.4);
hearts(tPinch+.55,PZX,PZY-80,4,90,200);sparks(tPinch+.5,PZX,PZY-40,8,190);
tl.to('#tfArmR',{rotation:0,duration:.3},tPinch+.9);tl.to('#tfArmL',{rotation:0,duration:.3},tPinch+.9);
// Bo sulks, Mochi rolls her eyes
eyesMode(tNot,'normal');bm(tNot,'mFrown');brows(tNot,-14,14,-8,.15);look(tNot,22,6,.1);
tl.to('#boArmL',{rotation:0,duration:.3},tNot);tl.to('#boArmR',{rotation:0,duration:.3},tNot);tl.to('#boLean',{rotation:0,duration:.3},tNot);
FB.pm(tNot,'Wo');
MC.look(tPinch,-24,-24,.15);MC.look(tPinch+.5,20,-20,.2);MC.m(tPinch,'mFr');
eyesMode(tPinch+.5,'hearts');bm(tPinch+.5,'mBig');

/* ================= SCENE 6: into the oven ... DING! ================= */
camTo(L[6]-.45,.7,560,330,1.15);
TF.m(L[6],'mBg');
tl.to('#tfArmL',{rotation:150,duration:.2},tBake-.1);tl.to('#tfArmR',{rotation:-150,duration:.2},tBake-.1);
tl.to('#pizza',{x:OVX,y:TT-96,scale:.4,duration:.7,ease:'power2.inOut'},tBake);
tl.to('#pizza',{opacity:0,duration:.1},tBake+.65);
tl.set('#ovenPz',{opacity:1},tBake+.65);
tl.to('#ovenGlow',{opacity:.75,duration:.3},tBake+.7);
tl.fromTo('#ovenGlow',{opacity:.55},{opacity:.95,duration:.14,yoyo:true,repeat:Math.max(1,Math.round((tDing-tBake-1)/.14))},tBake+1.0);
tl.fromTo('#ovenIn',{x:-3},{x:3,duration:.05,yoyo:true,repeat:Math.max(1,Math.round((tDing-tBake-.8)/.05))},tBake+.8);
tl.set('#ovenIn',{x:0},tDing);
tl.to('#tfArmL',{rotation:0,duration:.25},tBake+.4);tl.to('#tfArmR',{rotation:0,duration:.25},tBake+.4);
TF.look(tBake+.8,26,0,.2);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.04,duration:.2,yoyo:true,repeat:6},tBake+.9);
// DING!
tl.set('#ovenDing',{opacity:1},tDing);tl.to('#ovenDing',{opacity:0,duration:.45},tDing+.1);
tl.fromTo('#ovenIn',{y:0},{y:-18,duration:.08,yoyo:true,repeat:1},tDing);
shake(tDing,6,3);
tl.to('#ovenGlow',{opacity:0,duration:.3},tOutPz);
tl.set('#ovenPz',{opacity:0},tOutPz);tl.set('#pzBaked',{opacity:1},tOutPz);
tl.fromTo('#pizza',{opacity:0,x:OVX,y:TT-96,scale:.4},{opacity:1,x:PZX,y:PZY,scale:1,duration:.5,ease:'back.out(1.6)'},tOutPz);
sparks(tOutPz+.35,PZX,PZY-50,9,230);steam(tOutPz+.2,tOutPz+3);
TF.eyes(tOutPz,'happy');TF.m(tOutPz,'mBg');
tl.fromTo('#tfSq',{scaleY:.9},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tOutPz+.1);
eyesMode(tOutPz,'hearts');bm(tOutPz,'mBig');FB.pm(tOutPz,'Gr');
NN.eyes(tOutPz,'happy');MC.m(tOutPz,'mSm');

/* ================= SCENE 7: everyone gets a slice ================= */
camTo(L[7]-.4,.7,...WIDE);
const SL=[[BOX2,1287],[MCX,935],[NIX,1000],[BOX2,1097],[PZX,936]];   // Bo, Mochi, Nibbles, Flapjack, Truffle himself
tSl.forEach((t,i)=>slice(t,PZX+(i-2)*30,PZY-40,SL[i][0],SL[i][1],.62,260));
tl.to('#tfArmR',{rotation:-90,duration:.12},tSl[0]-.1);
for(let i=0;i<5;i++){tl.fromTo('#pzBaked',{scale:1},{scale:1.03,duration:.08,yoyo:true,repeat:1},tSl[i]);}
// Bo catches his
bm(tSl[0]+.5,'mBig');look(tSl[0]+.2,0,-30,.15);bm(tSl[0]+.7,'mSmile');
tl.fromTo('#boHead',{rotation:0},{rotation:-6,duration:.12,yoyo:true,repeat:5},tSl[0]+.7);
// Mochi
MC.m(tSl[1]+.45,'mOp');MC.m(tSl[1]+.6,'mFr');MC.talk(tSl[1]+.6,tSl[1]+1.3,'mSm','mFr',.13);mcEyes(tSl[1]+.9,'happy');
// Nibbles
NN.m(tSl[2]+.45,'mBg');NN.m(tSl[2]+.6,'mSm');NN.talk(tSl[2]+.6,tSl[2]+1.3,'mOp','mSm',.12);
// Flapjack on Bo's head
FB.pm(tSl[3]+.45,'Gr');FB.talk(tSl[3]+.6,tSl[3]+1.2,'Gr','Sm',.13);
// Truffle
TF.m(tSl[4]+.45,'mBg');TF.eyes(tSl[4]+.5,'happy');tl.to('#tfBelly',{scale:1.5,duration:.2},tSl[4]+.5);
// "DELICIOUS!"
hearts(W(7,7),PZX,PZY-100,5,100,260);hearts(W(7,7)+.1,BOX2,1000,3,80,240);
sparks(W(7,7),PZX,PZY-120,9,260);
tl.fromTo('#boSq',{y:0},{y:-36,duration:.13,yoyo:true,repeat:3},W(7,7));
tl.fromTo('#nm',{y:TT},{y:TT-30,duration:.12,yoyo:true,repeat:3},W(7,7)+.05);

/* ================= SCENE 8: "But then... something swung by!"  Coco snatches the pizza ================= */
// everybody freezes at "BUT THEN..."
const tFz=W(8,1)-.05;
eyesMode(tFz,'wide');bm(tFz,'mO');look(tFz,24,-18,.1);brows(tFz,-16,16,-12,.1);
FB.pm(tFz,'Oh');FB.look(tFz,16,-10,.1);
mcEyes(tFz,'wide');MC.m(tFz,'mO');MC.look(tFz,22,-18,.1);
NN.eyes(tFz,'wide');NN.m(tFz,'mO');NN.look(tFz,24,-12,.1);
TF.eyes(tFz,'wide');TF.m(tFz,'mO');TF.look(tFz,26,-14,.1);TF.brows(tFz,-14,14,-10,.1);
tl.fromTo('#boSq',{y:0},{y:-34,duration:.12,ease:'power2.out'},tFz).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},tFz+.12);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.08,duration:.12,yoyo:true,repeat:1},tFz);
// the swing: in from the right, snatch at the bottom of the arc, out to the left
tl.set('#cocoSwing',{opacity:1},tSw0-.02);
tl.fromTo('#cocoSwing',{rotation:-44},{rotation:0,duration:.55,ease:'power1.in'},tSw0);
tl.to('#cocoSwing',{rotation:52,duration:.7,ease:'power1.out'},tGrab);
tl.set('#cocoSwing',{opacity:0},tGrab+.72);
tl.to('#pizza',{scale:.36,duration:.07},tGrab-.07);
tl.set('#pizza',{opacity:0},tGrab);tl.set('#cocoPz',{opacity:1},tGrab);
tl.set('#pzBaked',{opacity:0},tGrab);
shake(tGrab,12,5);
// heads whip round to follow him
[tGrab+.05].forEach(t=>{lookAll(t,-30,-4);});
tl.to('#tfSq',{scaleX:.9,duration:.1},tGrab);tl.to('#tfSq',{scaleX:1.12,duration:.3},tGrab+.1);
tl.fromTo('#tfHat',{y:0},{y:-40,duration:.15,ease:'power2.out'},tGrab).to('#tfHat',{y:0,duration:.25,ease:'bounce.out'},tGrab+.15);

/* ================= SCENE 9/10: "Ooh-ooh, bananas!" ... a banana peel ... "My pizza!" ================= */
// everyone is frozen, jaws open
eyesMode(tGrab+.4,'wide');bm(tGrab+.4,'mBig');
tl.set('#peel',{opacity:1,x:PZX+20,y:150},tPeel);
tl.fromTo('#peel',{y:150,rotation:-200},{y:PZY-6,rotation:20,duration:.5,ease:'power2.in'},tPeel);
tl.fromTo('#peelIn',{scaleY:1,scaleX:1},{scaleY:.8,scaleX:1.12,duration:.15,yoyo:true,repeat:1},tPeel+.5);
sparks(tPeel+.5,PZX,PZY-20,5,80);
// "MY PIZZA!"
camTo(L[10]-.4,.7,500,260,1.1);
TF.m(L[10]-.05,'mBg');TF.eyes(L[10]-.05,'wide');TF.brows(L[10]-.05,-18,18,-14,.1);
tl.to('#tfArmL',{rotation:150,duration:.15,ease:'back.out(2)'},L[10]-.05);tl.to('#tfArmR',{rotation:-150,duration:.15,ease:'back.out(2)'},L[10]-.05);
TF.talk(L[10],L[10]+DU[10]-.05,'mBg','mO',.12);
tl.set('#tfSweat',{opacity:1},L[10]);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.08,duration:.1,yoyo:true,repeat:6},L[10]);
tl.fromTo('#tfHat',{rotation:-10},{rotation:10,duration:.08,yoyo:true,repeat:9},L[10]);
shake(L[10],8,4);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

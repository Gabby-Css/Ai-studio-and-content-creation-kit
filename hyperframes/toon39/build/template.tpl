<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>Bo and the Pancake 39 - The Wobbly Bridge</title>
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
#capsB{top:1250px}
.cg{position:absolute;left:24px;right:24px;top:70px;text-align:center;font-size:86px;line-height:1.0;letter-spacing:0;color:#fff;opacity:0}
.cg .w{display:inline-block;margin:0 12px;color:#fff;-webkit-text-stroke:16px #2b1a14;paint-order:stroke fill;text-shadow:0 8px 0 rgba(43,26,20,.55)}
.cg .tag{display:block;font-size:50px;margin:0 0 4px;-webkit-text-stroke:11px #2b1a14;paint-order:stroke fill;letter-spacing:2px}
#sticker{position:absolute;left:50%;bottom:380px;width:940px;margin-left:-470px;text-align:center;opacity:0}
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
<linearGradient id="gCock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E2B52"/><stop offset="1" stop-color="#3A5189"/></linearGradient>
<radialGradient id="gGloop" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#E7C8FF"/><stop offset=".55" stop-color="#A56CF2"/><stop offset="1" stop-color="#6A3FC4"/></radialGradient>
<pattern id="pMetal" width="200" height="200" patternUnits="userSpaceOnUse"><rect width="200" height="200" fill="#2B3768"/><rect width="100" height="100" fill="#35437A"/><rect x="100" y="100" width="100" height="100" fill="#35437A"/></pattern>
<clipPath id="cpPort"><circle cx="1400" cy="640" r="372"/></clipPath>
<linearGradient id="gSkyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B2285"/><stop offset=".45" stop-color="#C45CC4"/><stop offset=".8" stop-color="#FF9AD0"/><stop offset="1" stop-color="#FFD6A5"/></linearGradient>
<linearGradient id="gJelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BE8D0"/><stop offset="1" stop-color="#23988F"/></linearGradient>
<clipPath id="cpAbove"><rect x="-2000" y="-3000" width="7000" height="4700"/></clipPath>
<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>
<clipPath id="cpFridge"><rect x="1996" y="880" width="348" height="700" rx="22"/></clipPath>
<clipPath id="cpHole"><path d="M1520,1358 L1520,1272 Q1520,1156 1640,1156 Q1760,1156 1760,1272 L1760,1358Z"/></clipPath>
<!-- everything except the table top/apron/legs: characters standing behind the table are hidden by it -->
<clipPath id="cpNoTable"><path clip-rule="evenodd" d="M-300,-300 H2900 V2500 H-300Z M520,1170 H1480 V1300 H520Z M560,1300 H608 V1640 H560Z M1432,1300 H1480 V1640 H1432Z"/></clipPath>
</defs>

<!-- ============ KITCHEN ============ -->
<rect x="-1800" y="-1800" width="6200" height="3160" fill="url(#gWall)"/>
<rect x="-1800" y="-1800" width="6200" height="2800" fill="url(#pDots)"/>
<g id="ceiling">
 <rect x="-1800" y="-1800" width="6200" height="1556" fill="#FFF1D4"/>
 <rect x="-1800" y="-246" width="6220" height="34" fill="#fff" stroke="#2b1a14" stroke-width="7"/>
 <g id="lamp"><line x1="1450" y1="-212" x2="1450" y2="-120" stroke="#2b1a14" stroke-width="7"/>
  <path d="M1360,-20 Q1360,-130 1450,-130 Q1540,-130 1540,-20Z" fill="#FFD84A" stroke="#2b1a14" stroke-width="7" stroke-linejoin="round"/>
  <ellipse cx="1450" cy="-20" rx="92" ry="14" fill="#FFB020" stroke="#2b1a14" stroke-width="6"/><circle cx="1450" cy="-6" r="22" fill="#FFF7C2" stroke="#2b1a14" stroke-width="5"/></g>
</g>
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

<g id="bannerMount"></g>
<g id="setMount"></g>
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
<g id="gpMount"></g>
<g id="mcMount"></g>
<g id="wedgeMount"></g>
<g id="litterMount"></g>
<g id="panMount"></g>
<g id="cmMount"></g>
<g id="tfMount"></g>
<g id="pizzaMount"></g>
<g id="ovenMount"></g>
<g id="nmMount"></g>
<g id="bananaMount"></g>
<g id="zpMount"></g>
<g id="bpMount"></g>
<g id="ptMount"></g>
<g id="griddleMount"></g>
<g id="ckMount"></g>
<g id="boMount"></g>
<g id="g5Mount"></g>
<g id="rkMount"></g>
<g id="jgMount"></g>
<g id="feastMount"></g>
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
<div id="sticker"><span class="stk1">WHAT IS IN<br>THE CHEST?</span><span class="stk2">GUESS IN THE COMMENTS!</span></div>
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
/* ================= episode 11 additions: the saucer's cockpit (bigger on the inside!), the porthole view: stars, Earth, the moon, a banana comet, Planet Gloop ================= */
const PCX=1400, PCY=640, PRAD=372;                          // porthole centre + radius (world)
const rnd=(i,s)=>{const x=Math.sin(i*127.1+s*311.7)*43758.5453;return x-Math.floor(x);};
let stars1='',stars2='';
for(let i=0;i<80;i++){const x=980+rnd(i,1)*2500,y=240+rnd(i,2)*820,r=1.6+rnd(i,3)*3.6;stars1+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${i%5?'#fff':'#FFE98A'}"/>`;}
for(let i=0;i<34;i++){const x=980+rnd(i,7)*2500,y=240+rnd(i,8)*820,r=4+rnd(i,9)*5;stars2+=`<path transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${(r/6).toFixed(2)})" d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4Z" fill="${i%3?'#fff':'#9FE3FF'}"/>`;}
const earthSVG=`<g id="earth"><circle r="130" fill="#3F8CFF" ${sw(5)}/><path d="M-76,-44 Q-34,-98 22,-66 Q64,-32 32,12 Q-12,44 -64,22Z" fill="#5CD07A"/><path d="M44,52 Q84,32 104,74 Q72,104 44,52Z" fill="#5CD07A"/><path d="M-104,64 Q-62,52 -28,74" stroke="#fff" stroke-width="13" stroke-linecap="round" fill="none" opacity=".85"/><path d="M-22,-106 Q30,-116 74,-94" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".85"/></g>`;
const moonSVG=`<g id="moon"><circle r="190" fill="#DDE1EA" ${sw(6)}/><g fill="#B6BCCB"><circle cx="-60" cy="-50" r="38"/><circle cx="70" cy="30" r="52"/><circle cx="-20" cy="96" r="26"/><circle cx="96" cy="-84" r="22"/></g></g>`;
const cometSVG=`<g id="comet"><g stroke="#FFE98A" stroke-width="12" stroke-linecap="round" opacity=".85"><path d="M60,-30 L360,-130"/><path d="M70,0 L420,-20"/><path d="M60,30 L330,110"/></g><g transform="scale(2.6) rotate(-10)">${banana1(0)}</g></g>`;
const gloopSVG=`<g id="gloopP"><circle r="560" fill="url(#gGloop)" ${sw(8)}/>
 <g fill="#8BFF9A" opacity=".5"><circle cx="-210" cy="-170" r="120"/><circle cx="230" cy="40" r="150"/><circle cx="-60" cy="260" r="110"/><circle cx="120" cy="-290" r="80"/></g>
 <g fill="#FF8FD2" opacity=".55"><circle cx="-300" cy="90" r="90"/><circle cx="60" cy="130" r="70"/><circle cx="310" cy="-200" r="64"/></g>
 <ellipse cx="-190" cy="-250" rx="170" ry="84" transform="rotate(-30 -190 -250)" fill="#fff" opacity=".55"/><ellipse cx="260" cy="300" rx="90" ry="40" transform="rotate(-30 260 300)" fill="#fff" opacity=".3"/>
 <g fill="none" stroke="#fff" stroke-width="7" opacity=".7"><circle cx="-380" cy="-90" r="20"/><circle cx="360" cy="140" r="14"/><circle cx="-120" cy="400" r="16"/></g></g>`;
let rivets='';for(let x=520;x<2300;x+=120){rivets+=`<circle cx="${x}" cy="130" r="7"/><circle cx="${x}" cy="1560" r="7"/>`;}
let btns='';for(let i=0;i<14;i++){btns+=`<circle class="blk" cx="${940+i*66}" cy="${1260+(i%3)*34}" r="12" fill="${['#FF5F5F','#FFE14D','#5CE08A','#6FF6FF'][i%4]}" ${sw(3)}/>`;}
document.getElementById('setMount').innerHTML=`<g id="cockpit" opacity="0">
 <rect x="-1800" y="-1800" width="6200" height="4400" fill="url(#gCock)"/>
 <g stroke="#17203F" stroke-width="10" opacity=".55" fill="none"><path d="M560,-300 V1640 M1000,-300 V1640 M1800,-300 V1640 M2240,-300 V1640"/><path d="M-200,420 H900 M1900,420 H3000"/></g>
 <g fill="#9AA9C6" stroke="${OL}" stroke-width="3">${rivets}</g>
 <rect x="1020" y="1180" width="760" height="260" rx="30" fill="#4A5C8C" ${sw(8)}/>${btns}
 <rect x="1060" y="1340" width="300" height="70" rx="14" fill="#101733" ${sw(5)}/><path d="M1080,1385 L1130,1360 L1180,1380 L1240,1352 L1330,1376" fill="none" stroke="#6FF6FF" stroke-width="6" stroke-linecap="round"/>
 <rect x="1440" y="1340" width="300" height="70" rx="14" fill="#101733" ${sw(5)}/><circle cx="1590" cy="1375" r="26" fill="none" stroke="#5CE08A" stroke-width="6"/><path d="M1590,1375 L1612,1356" stroke="#5CE08A" stroke-width="6" stroke-linecap="round"/>
 <g><rect x="880" y="22" width="260" height="30" rx="15" fill="#FFF3B0" ${sw(5)}/><rect x="1660" y="22" width="260" height="30" rx="15" fill="#FFF3B0" ${sw(5)}/></g>
 <circle cx="${PCX}" cy="${PCY}" r="${PRAD+54}" fill="#9AA9C6" ${sw(10)}/><circle cx="${PCX}" cy="${PCY}" r="${PRAD+16}" fill="#5E6E92" ${sw(6)}/>
 <g clip-path="url(#cpPort)"><g id="portG">
  <rect x="900" y="200" width="1000" height="900" fill="#080A24"/>
  <g id="stars1">${stars1}</g><g id="stars2">${stars2}</g>
  <g transform="translate(1400,720)"><g id="earthW">${earthSVG}</g></g>
  <g transform="translate(2200,600)"><g id="moonW">${moonSVG}</g></g>
  <g transform="translate(2350,880)"><g id="cometW">${cometSVG}</g></g>
  <g transform="translate(1400,660)"><g id="gloopW">${gloopSVG}</g></g>
  <rect id="portFlash" x="900" y="200" width="1000" height="900" fill="#fff" opacity="0"/>
 </g></g>
 <path d="M1090,420 Q1170,300 1290,276" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".5"/>
 <circle cx="${PCX}" cy="${PCY}" r="${PRAD}" fill="none" ${sw(8)}/>
 ${['3','2','1','GO!'].map((tx,i)=>`<text id="cd${i}" x="1400" y="250" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="${i==3?230:300}" fill="${i==3?'#FFE14D':'#6FF6FF'}" stroke="${OL}" stroke-width="18" paint-order="stroke" stroke-linejoin="round" opacity="0">${tx}</text>`).join('')}
 <rect x="-1800" y="1640" width="6200" height="2000" fill="url(#pMetal)"/><rect x="-1800" y="1630" width="6200" height="24" fill="#7C8CB0" ${sw(6)}/>
</g>`;
/* ================= episode 10 additions: PEANUT the baby elephant (cast #14), the giant pancake birthday cake, sprinkles, confetti, cake slices, the banner ================= */
const PTB='#A9B8D0', PTD='#7F92B3', PTE='#F4B8C8', PTL='#D5DEEC';
function ptSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-112)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="30" ry="37" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="18" fill="${OL}"/><circle cx="-5" cy="-7" r="6" fill="#fff"/></g></g></g></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-54)"><g id="${p}${s}"><ellipse cx="0" cy="24" rx="38" ry="30" fill="${PTB}" ${sw(7)}/><ellipse cx="3" cy="44" rx="54" ry="22" fill="${PTD}" ${sw(7)}/></g></g>`;
 const arm=(s,x,sg)=>`<g transform="translate(${x},-236)"><g id="${p}${s}"><ellipse cx="${sg*4}" cy="52" rx="30" ry="58" fill="${PTB}" ${sw(7)}/><ellipse cx="${sg*4}" cy="104" rx="30" ry="26" fill="${PTD}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g id="${p}Flip">
 <ellipse cx="0" cy="6" rx="190" ry="26" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(150,-120)"><g id="${p}Tail"><path d="M0,0 q52,4 38,56" fill="none" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M0,0 q52,4 38,56" fill="none" stroke="${PTD}" stroke-width="8" stroke-linecap="round"/><circle cx="38" cy="60" r="12" fill="${PTD}" ${sw(4)}/></g></g>
 ${legG('LegL',-72)}${legG('LegR',72)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-168" rx="170" ry="148" fill="${PTB}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-146" rx="110" ry="112" fill="${PTL}"/></g>
  ${arm('ArmL',-142,-1)}${arm('ArmR',142,1)}
  <g transform="translate(0,-322)"><g id="${p}Head">
   <g id="${p}EarL"><ellipse cx="-196" cy="-98" rx="98" ry="114" fill="${PTB}" ${sw(7)}/><ellipse cx="-190" cy="-96" rx="64" ry="82" fill="${PTE}"/></g>
   <g id="${p}EarR"><ellipse cx="196" cy="-98" rx="98" ry="114" fill="${PTB}" ${sw(7)}/><ellipse cx="190" cy="-96" rx="64" ry="82" fill="${PTE}"/></g>
   <ellipse cx="0" cy="-98" rx="160" ry="128" fill="${PTB}" ${sw(7)}/>
   <ellipse cx="-104" cy="-60" rx="24" ry="14" fill="#FF8FA8" opacity=".5"/><ellipse cx="104" cy="-60" rx="24" ry="14" fill="#FF8FA8" opacity=".5"/>
   <g id="${p}Eyes">${eyeR(-62)}${eyeR(62)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-94,-104 Q-62,-142 -30,-104" fill="none" ${sw(11)}/><path d="M30,-104 Q62,-142 94,-104" fill="none" ${sw(11)}/></g>
   <g transform="translate(-62,-166)"><path id="${p}BrowL" d="M-26,4 Q0,-9 26,4" fill="none" ${sw(8)}/></g>
   <g transform="translate(62,-166)"><path id="${p}BrowR" d="M-26,4 Q0,-9 26,4" fill="none" ${sw(8)}/></g>
   <g transform="translate(-34,4)">
    <g id="${p}mSm"><path d="M-22,0 Q0,16 22,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-24,-2 Q0,-6 24,-2 Q24,32 0,36 Q-24,32 -24,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="24" rx="14" ry="8" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-36,-4 Q0,-10 36,-4 Q40,46 0,52 Q-40,46 -36,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="36" rx="20" ry="10" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-22,12 Q0,-6 22,12" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="10" rx="12" ry="16" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Trunk"><path d="M0,-84 C-6,-34 26,-4 58,-24 C74,-36 70,-62 54,-58" fill="none" stroke="${OL}" stroke-width="58" stroke-linecap="round"/><path d="M0,-84 C-6,-34 26,-4 58,-24 C74,-36 70,-62 54,-58" fill="none" stroke="${PTB}" stroke-width="42" stroke-linecap="round"/><path d="M-8,-60 q4,10 12,16 M-10,-40 q4,10 14,14" fill="none" stroke="${PTD}" stroke-width="4" stroke-linecap="round"/></g>
   <g id="${p}Hat"><path d="M-52,-222 L0,-336 L52,-222Z" fill="#FFD84A" ${sw(7)}/><path d="M-30,-262 L26,-276 M-38,-240 L36,-258" stroke="#FF8FB8" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="-340" r="17" fill="#FF8FB8" ${sw(5)}/></g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-190)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
 </g>
</g></g></g></g>`;}

/* ---------------- the giant pancake birthday cake (feet = bottom centre) ---------------- */
const ckLayer=(y,c)=>`<g transform="translate(0,${y})"><path d="M-150,0 L-150,-30 Q-150,-52 0,-52 Q150,-52 150,-30 L150,0 Q150,22 0,22 Q-150,22 -150,0Z" fill="${c}" ${sw(7)}/><ellipse cx="0" cy="-36" rx="134" ry="15" fill="#F7CF86" opacity=".8"/></g>`;
const CKCOL=['#E9A64F','#E4A04A','#EDAE58','#E4A04A','#E9A64F','#EDAE58'];
let ckCandles='';
[-92,-46,0,46,92].forEach((x,i)=>{const c=['#FF5FA8','#3FD6FF','#FFE14D','#8BFF5A','#B07CFF'][i];
 ckCandles+=`<g transform="translate(${x},-296)"><circle id="ckG${i}" cx="0" cy="-70" r="46" fill="${c}" opacity="0"/><rect x="-8" y="-52" width="16" height="56" rx="5" fill="${c}" ${sw(5)}/><path d="M-8,-36 L8,-28 M-8,-18 L8,-10" stroke="#fff" stroke-width="4" opacity=".8"/><g id="ckF${i}" opacity="0"><path d="M0,-92 Q-14,-72 0,-56 Q14,-72 0,-92Z" fill="#FFB347" ${sw(4)}/><path d="M0,-82 Q-6,-72 0,-64 Q6,-72 0,-82Z" fill="#FFE14D"/></g></g>`;});
const ckSVG=`<g id="ck" opacity="0"><g id="ckIn">
 <ellipse cx="0" cy="8" rx="190" ry="24" fill="rgba(60,30,10,.22)"/>
 ${[0,-44,-88,-132,-176,-220].map((y,i)=>ckLayer(y-2,CKCOL[i])).join('')}
 <path d="M-146,-262 Q-142,-228 -122,-232 Q-112,-206 -96,-232 Q-60,-224 -44,-244 Q-20,-206 -6,-240 Q22,-224 46,-246 Q62,-216 82,-238 Q108,-222 124,-240 Q150,-224 148,-262 Q0,-292 -146,-262Z" fill="#B8571D" ${sw(6)}/>
 <g fill="#fff" ${sw(5)}><ellipse cx="-104" cy="-276" rx="28" ry="20"/><ellipse cx="104" cy="-276" rx="28" ry="20"/><ellipse cx="0" cy="-282" rx="32" ry="22"/></g>
 <circle cx="-136" cy="-258" r="15" fill="#E8484F" ${sw(4)}/><circle cx="136" cy="-258" r="15" fill="#E8484F" ${sw(4)}/><circle cx="-70" cy="-274" r="11" fill="#5B7BFF" ${sw(4)}/><circle cx="70" cy="-274" r="11" fill="#5B7BFF" ${sw(4)}/>
 ${ckCandles}
 <g id="ckEyes" opacity="0"><g transform="translate(-44,-150)"><ellipse rx="19" ry="23" fill="#fff" ${sw(5)}/><circle id="ckPL" cx="2" cy="3" r="9" fill="${OL}"/></g><g transform="translate(44,-150)"><ellipse rx="19" ry="23" fill="#fff" ${sw(5)}/><circle id="ckPR" cx="-2" cy="3" r="9" fill="${OL}"/></g><ellipse cx="0" cy="-118" rx="12" ry="15" fill="${MW}" ${sw(4)}/></g>
</g></g>`;
document.getElementById('ckMount').innerHTML=ckSVG;

/* ---------------- sprinkles, confetti, cake slices (pools) ---------------- */
const SPC=['#FF5FA8','#3FD6FF','#FFE14D','#8BFF5A','#B07CFF','#FF9A3C'];
let sprSVG='',cfSVG='',ksSVG='';
for(let i=0;i<18;i++) sprSVG+=`<g id="spw${i}"><rect id="spr${i}" class="spr" x="-7" y="-3" width="14" height="6" rx="3" fill="${SPC[i%6]}" opacity="0"/></g>`;
for(let i=0;i<40;i++) cfSVG+=`<g id="cfw${i}"><rect id="cf${i}" class="cfp" x="-9" y="-5" width="18" height="10" rx="2" fill="${SPC[(i*5)%6]}" opacity="0"/></g>`;
for(let i=0;i<8;i++) ksSVG+=`<g id="ksw${i}"><g id="ks${i}" class="kss" opacity="0"><path d="M-36,-22 L36,-22 L36,22 L-36,22Z" fill="#E9A64F" ${sw(5)}/><path d="M-36,-22 Q0,-34 36,-22 L36,-8 L-36,-8Z" fill="#fff" ${sw(4)}/><path d="M-36,-8 Q-28,6 -18,-8" fill="#B8571D" ${sw(3)}/><circle cx="0" cy="-34" r="9" fill="#E8484F" ${sw(3)}/></g></g>`;
document.getElementById('fxMount').innerHTML+=sprSVG+cfSVG+ksSVG;

/* ---------------- the banner on the wall ---------------- */
let flags='';
for(let i=0;i<13;i++){const x=650+i*70;flags+=`<path d="M${x},150 L${x+62},150 L${x+31},204Z" fill="${SPC[i%6]}" ${sw(5)}/>`;}
document.getElementById('bannerMount').innerHTML=`<g id="banner">
 <path d="M600,60 Q1100,200 1600,60" fill="none" stroke="#5b4a3c" stroke-width="7"/>
 ${flags}
 <rect x="700" y="-40" width="800" height="150" rx="40" fill="#FF8FB8" ${sw(8)}/>
 <text x="1100" y="62" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="#fff" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">HAPPY BIRTHDAY!</text>
</g>`;
document.getElementById('ptMount').innerHTML=ptSVG('pt');
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

/* ================= episode 12 additions: PLANET GLOOP (the jelly landscape), the Gloopians (recoloured Blips), the Gloop King, a crown, a litter ================= */
const GLC=[['#FF8FC8','#E0529F','#FFD0E8','#7FE0FF'],['#FFE066','#E0B52E','#FFF3B0','#FF8F5A'],['#7FC8FF','#4A93E0','#C7E6FF','#FFB3E0'],['#FFAA66','#E07A2E','#FFD9B8','#7FFFB0']];
const KGC=['#FFD36B','#E0A52E','#FFF0B8','#FF8F4A'];
const tintBlip=(p,c)=>blipSVG(p).split(BG_).join(c[0]).split(BD_).join(c[1]).split(BL_).join(c[2]).split(BP_).join(c[3]);
const crownPath=(s)=>`<g transform="scale(${s})"><path d="M-60,0 L-60,-62 L-30,-30 L0,-78 L30,-30 L60,-62 L60,0Z" fill="#FFD84A" ${sw(7)}/><rect x="-60" y="-8" width="120" height="22" rx="6" fill="#E0A52E" ${sw(6)}/><circle cx="0" cy="-84" r="11" fill="#FF5F8B" ${sw(4)}/><circle cx="-60" cy="-68" r="9" fill="#6FF6FF" ${sw(4)}/><circle cx="60" cy="-68" r="9" fill="#8BFF5A" ${sw(4)}/></g>`;
document.getElementById('gpMount').innerHTML='<g clip-path="url(#cpAbove)">'+GLC.map((c,i)=>tintBlip('g'+(i+1),c)).join('')+tintBlip('kg',KGC)+'</g>'
 +`<g id="crwnW"><g id="crwn" opacity="0">${crownPath(.85)}</g></g><g id="kcrnW"><g id="kcrn" opacity="0">${crownPath(1.7)}</g></g>`;
document.getElementById('litterMount').innerHTML=`<g id="litter" opacity="0"><g id="litterIn">
 <path d="M-210,10 L-190,-14 L190,-14 L210,10Z" fill="#C98A4B" ${sw(7)}/><rect x="-176" y="-40" width="352" height="28" rx="12" fill="#FFB3E0" ${sw(7)}/>
 <g fill="#fff" opacity=".8"><circle cx="-120" cy="-26" r="6"/><circle cx="-40" cy="-26" r="6"/><circle cx="40" cy="-26" r="6"/><circle cx="120" cy="-26" r="6"/></g></g></g>`;

/* ---------------- the set: Planet Gloop (above the kitchen, below the characters) ---------------- */
const gStars=Array.from({length:50},(_,i)=>{const x=-200+rnd(i,21)*3200,y=-700+rnd(i,22)*1500,r=1.5+rnd(i,23)*3;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity=".8"/>`;}).join('');
const mush=(x,s,c1,c2)=>`<g transform="translate(${x},1400) scale(${s})"><g class="mush"><path d="M-30,0 Q-40,-170 -22,-250 L22,-250 Q40,-170 30,0Z" fill="#FFF0D6" ${sw(7)}/><path d="M-210,-250 Q-210,-480 0,-480 Q210,-480 210,-250 Q0,-210 -210,-250Z" fill="${c1}" ${sw(8)}/><g fill="${c2}"><circle cx="-110" cy="-340" r="34"/><circle cx="30" cy="-420" r="28"/><circle cx="120" cy="-320" r="38"/><circle cx="-20" cy="-300" r="22"/></g><ellipse cx="-90" cy="-430" rx="60" ry="26" transform="rotate(-25 -90 -430)" fill="#fff" opacity=".45"/></g></g>`;
const hill=(pts,c,o)=>`<path d="${pts}" fill="${c}" opacity="${o}" ${sw(7)}/>`;
let bubs='';for(let i=0;i<12;i++){const x=300+rnd(i,31)*2200,y=1000+rnd(i,32)*500,r=14+rnd(i,33)*30;bubs+=`<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><circle class="fb" r="${r.toFixed(0)}" fill="#fff" opacity=".35" stroke="#fff" stroke-width="4"/></g>`;}
let jb='';for(let i=0;i<26;i++){const x=-300+rnd(i,41)*3000,y=1480+rnd(i,42)*500,r=18+rnd(i,43)*46;jb+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${['#8BFFD2','#2FA99E','#B7FFF0'][i%3]}" opacity=".35"/>`;}
document.getElementById('setMount').innerHTML+=`<g id="gloopSet" opacity="0">
 <rect x="-1800" y="-1800" width="6200" height="3300" fill="url(#gSkyG)"/>${gStars}
 <g transform="translate(900,260)"><circle r="150" fill="#9FE3FF" ${sw(7)}/><g fill="#7CC4E6"><circle cx="-40" cy="-30" r="34"/><circle cx="50" cy="40" r="40"/></g><ellipse cx="-60" cy="-70" rx="50" ry="20" transform="rotate(-30)" fill="#fff" opacity=".5"/></g>
 <g transform="translate(2000,120)"><circle r="84" fill="#FFE98A" ${sw(6)}/><circle cx="20" cy="20" r="22" fill="#F0C94A"/></g>
 <ellipse cx="1500" cy="520" rx="240" ry="36" fill="#fff" opacity=".35"/><ellipse cx="1650" cy="480" rx="150" ry="28" fill="#fff" opacity=".35"/>
 ${hill('M-300,1400 Q100,900 500,1100 Q900,800 1300,1050 Q1700,780 2100,1050 Q2500,880 2900,1400Z','#B58CFF',.85)}
 ${hill('M-300,1450 Q200,1100 700,1250 Q1200,1000 1700,1250 Q2200,1050 2900,1450Z','#7DF0B0',.9)}
 ${mush(640,.8,'#FF8FD2','#FFE0F4')}${mush(1500,1.0,'#6FF6FF','#D8FFFF')}${mush(2200,.9,'#FFB46F','#FFE6C8')}
 <rect x="-1800" y="1380" width="6200" height="2400" fill="url(#gJelly)"/>
 <path d="M-1800,1380 Q-1500,1348 -1200,1380 T-600,1380 T0,1380 T600,1380 T1200,1380 T1800,1380 T2400,1380 T3000,1380 T3600,1380 T4400,1380" fill="none" stroke="#fff" stroke-width="12" opacity=".5" stroke-linecap="round"/>
 ${jb}${bubs}
 <ellipse cx="1000" cy="1700" rx="300" ry="40" fill="#fff" opacity=".18"/><ellipse cx="1900" cy="1760" rx="360" ry="46" fill="#fff" opacity=".14"/>
 <path id="crack" d="M1380,1650 L1440,1640 L1420,1670 L1500,1648 L1470,1690 L1560,1655 L1600,1650" fill="none" stroke="#17203F" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
</g>`;
/* ================= episode 13 additions: the big griddle for the biggest pancake in the universe ================= */
const flameP=(x,s)=>`<g transform="translate(${x},-6) scale(${s})"><g class="gfl"><path d="M0,-70 Q-34,-26 -20,0 Q0,12 20,0 Q34,-26 0,-70Z" fill="#FF8A2B" ${sw(5)}/><path d="M0,-44 Q-14,-18 -8,0 Q0,6 8,0 Q14,-18 0,-44Z" fill="#FFE14D"/></g></g>`;
document.getElementById('griddleMount').innerHTML=`<g id="griddle" opacity="0"><g id="griddleIn">
 <ellipse cx="0" cy="10" rx="340" ry="36" fill="rgba(60,30,10,.25)"/>
 <rect x="-250" y="-64" width="30" height="64" rx="8" fill="#6B7088" ${sw(6)}/><rect x="220" y="-64" width="30" height="64" rx="8" fill="#6B7088" ${sw(6)}/>
 ${[-170,-85,0,85,170].map(x=>flameP(x,1)).join('')}
 <ellipse cx="0" cy="-64" rx="320" ry="62" fill="#3F4357" ${sw(8)}/><ellipse cx="0" cy="-74" rx="290" ry="48" fill="#6B7088"/><ellipse cx="-40" cy="-82" rx="200" ry="26" fill="#9097B0" opacity=".6"/>
</g></g>`;
document.getElementById('g5Mount').innerHTML=tintBlip('g5',GLC[0]);   // the stowaway: same Gloopian as g1, but drawn in front of the kitchen crowd (no clip)
/* ================= episode 14 additions: Rocky (cast #17) returns, the four Jiggles (the Gloopian clones, now living in the kitchen), name tag, HIC! ================= */
document.getElementById('rkMount').innerHTML=rockySVG('rk',false);
document.getElementById('jgMount').innerHTML=GLC.map((c,i)=>tintBlip('j'+(i+1),c)).join('')+`
<g id="jgTag" opacity="0"><g id="jgTagIn">
 <path d="M-18,44 L0,92 L18,44Z" fill="#fff" ${sw(8)}/>
 <rect x="-178" y="-72" width="356" height="126" rx="34" fill="#fff" ${sw(8)}/>
 <text x="0" y="26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="#E0529F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">JIGGLE</text>
</g></g>
<g id="hic" opacity="0"><g id="hicIn"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="96" fill="#FFE14D" stroke="${OL}" stroke-width="13" paint-order="stroke" stroke-linejoin="round">HIC!</text></g></g>`;
/* ================= episode 15 additions: four name tags, the scan beam, "25%" tags, SQUISH!, and the King's eyes in the fridge ================= */
const JTC=['#E0529F','#C99A00','#2F7FD1','#E0702E'];          // pink, yellow, blue, orange = the order of GLC
document.getElementById('jgMount').insertAdjacentHTML('beforeend',
 JTC.map((c,i)=>`<g id="jt${i+1}" opacity="0"><g id="jt${i+1}In"><path d="M-14,34 L0,72 L14,34Z" fill="#fff" ${sw(7)}/><rect x="-132" y="-50" width="264" height="90" rx="26" fill="#fff" ${sw(7)}/><text x="0" y="20" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="66" fill="${c}" stroke="${OL}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">JIGGLE</text></g></g>`).join('')+
 JTC.map((c,i)=>`<g id="pc${i+1}" opacity="0"><g id="pc${i+1}In"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="96" fill="${c}" stroke="${OL}" stroke-width="13" paint-order="stroke" stroke-linejoin="round">25%</text></g></g>`).join('')+
 `<g id="scan" opacity="0"><rect x="-36" y="-560" width="72" height="650" rx="36" fill="#6FF6FF" opacity=".33"/><rect x="-9" y="-560" width="18" height="650" rx="9" fill="#E6FFFF" opacity=".95"/></g>
 <g id="squish" opacity="0"><g id="squishIn"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="120" fill="#FFE14D" stroke="${OL}" stroke-width="15" paint-order="stroke" stroke-linejoin="round">SQUISH!</text></g></g>`);
// the Gloop King peeks out of the dark fridge (eyes first, then the crown and the face)
document.getElementById('fridgeInner').insertAdjacentHTML('beforeend',`<g clip-path="url(#cpFridge)"><g id="kdPeek" opacity="0">
 <ellipse id="kdGlow" cx="2170" cy="1230" rx="270" ry="340" fill="#FFE9A8" opacity=".22"/>
 <g id="kdFace" opacity="0">
  <ellipse cx="2170" cy="1290" rx="198" ry="300" fill="#FFD36B" ${sw(8)}/>
  <ellipse cx="2170" cy="1340" rx="140" ry="200" fill="#FFEFB5"/>
  <g fill="#FF9A5A" opacity=".7"><circle cx="2052" cy="1150" r="18"/><circle cx="2292" cy="1180" r="14"/></g>
  <path d="M2090,1390 Q2170,1460 2250,1390" fill="none" ${sw(9)}/>
  <g id="kdCrown"><path d="M2056,1040 L2072,930 L2120,988 L2170,910 L2220,988 L2268,930 L2284,1040Z" fill="#FFC93C" ${sw(8)}/>
   <circle cx="2072" cy="930" r="13" fill="#FF6B8B" ${sw(4)}/><circle cx="2170" cy="910" r="14" fill="#6FD0FF" ${sw(4)}/><circle cx="2268" cy="930" r="13" fill="#7FE08A" ${sw(4)}/></g>
 </g>
 <g id="kdEyes">
  <ellipse cx="2100" cy="1182" rx="54" ry="72" fill="#fff" ${sw(7)}/><ellipse cx="2240" cy="1182" rx="54" ry="72" fill="#fff" ${sw(7)}/>
  <g id="kdPup"><circle cx="2106" cy="1192" r="29" fill="${OL}"/><circle cx="2096" cy="1176" r="10" fill="#fff"/><circle cx="2246" cy="1192" r="29" fill="${OL}"/><circle cx="2236" cy="1176" r="10" fill="#fff"/></g>
 </g>
</g></g>`);
/* ================= episode 16 additions: tears, the "EVERY SUNDAY" sign ================= */
let trSVG='';for(let i=0;i<8;i++) trSVG+=`<g id="trw${i}"><g id="tr${i}" class="trp" opacity="0"><path d="M0,-26 C15,-4 21,10 0,22 C-21,10 -15,-4 0,-26Z" fill="#8AD7FF" ${sw(5)}/><ellipse cx="-6" cy="4" rx="4" ry="7" fill="#fff" opacity=".7"/></g></g>`;
document.getElementById('jgMount').insertAdjacentHTML('beforeend', trSVG+`
<g id="sunTag" opacity="0"><g id="sunTagIn">
 <path d="M-18,86 L0,128 L18,86Z" fill="#fff" ${sw(8)}/>
 <rect x="-190" y="-96" width="380" height="188" rx="38" fill="#fff" ${sw(8)}/>
 <text x="0" y="-26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="60" fill="#FF8F5A" stroke="${OL}" stroke-width="8" paint-order="stroke" stroke-linejoin="round">EVERY</text>
 <text x="0" y="58" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="#E0529F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">SUNDAY!</text>
</g></g>`);
/* ================= episode 17 additions: the hologram call from Planet Zorp (the Commander = a cyan Blip), the wobbly 18-pancake tower with Rocky inside, Planet Zorp in the porthole ================= */
const HOC=['#7FEFFF','#2EB9DB','#D9FBFF','#B6F4FF'];
let hLines='';for(let i=0;i<34;i++) hLines+=`<rect x="-260" y="${-560+i*17}" width="520" height="5" fill="#DFFFFF"/>`;
let hStat='';for(let i=0;i<16;i++){const y=-540+rnd(i,51)*520,w=70+rnd(i,52)*300,x=-w/2+(rnd(i,53)-.5)*160;hStat+=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(6+rnd(i,54)*16).toFixed(0)}" fill="${i%3?'#BFF6FF':'#fff'}"/>`;}
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`
<defs><clipPath id="cpCone"><path d="M-84,0 L-250,-560 L250,-560 L84,0Z"/></clipPath>
 <linearGradient id="gHolo" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7FEFFF" stop-opacity=".62"/><stop offset="1" stop-color="#7FEFFF" stop-opacity=".04"/></linearGradient></defs>
<g id="holoW"><g id="holo" opacity="0">
 <path d="M-84,0 L-250,-560 L250,-560 L84,0Z" fill="url(#gHolo)"/>
 <g id="holoLines" clip-path="url(#cpCone)" opacity=".22">${hLines}</g>
 <g id="holoStat" clip-path="url(#cpCone)" opacity="0">${hStat}</g>
 <g id="holoMan" opacity="0">${tintBlip('hl',HOC)}</g>
 <ellipse cx="0" cy="4" rx="130" ry="22" fill="#7FEFFF" ${sw(5)}/><ellipse cx="0" cy="2" rx="86" ry="12" fill="#D9FBFF"/>
</g></g>`);

/* the tower: 18 pancakes (fifty, says Truffle), syrup + butter, Rocky hiding inside (head peeks out of the top), his feet under the bottom pancake */
const SKC=['#E9A64F','#EDAE58','#E4A04A'], NSL=18, SKP=26, STOP=-(NSL-1)*SKP-48;       // STOP = y of the top rim
const slabSVG=(i)=>`<g id="stl${i}" class="stl"><g transform="translate(0,${-i*SKP})"><path d="M-125,-6 L-125,-28 Q-125,-48 0,-48 Q125,-48 125,-28 L125,-6 Q125,14 0,14 Q-125,14 -125,-6Z" fill="${SKC[i%3]}" ${sw(6)}/><ellipse cx="0" cy="-33" rx="112" ry="17" fill="#F6C777"/></g></g>`;
let slabs='';for(let i=0;i<NSL;i++) slabs+=slabSVG(i);
const ft=(id,x)=>`<g transform="translate(${x},8)"><g id="${id}"><ellipse cx="0" cy="22" rx="22" ry="19" fill="${GRY}" ${sw(6)}/><ellipse cx="2" cy="38" rx="36" ry="16" fill="${DGR}" ${sw(6)}/></g></g>`;
document.getElementById('feastMount').insertAdjacentHTML('beforeend',`
<g id="stkW"><g id="stk" opacity="0"><g id="stkIn">
 <ellipse cx="0" cy="22" rx="170" ry="22" fill="rgba(60,30,10,.22)"/>
 <g id="stkFeet" opacity="0">${ft('stkFootL',-62)}${ft('stkFootR',62)}</g>
 <g id="stkRkW"><g id="stkRk"><g transform="translate(0,${STOP+138}) scale(.55)">${rockySVG('rkp',false)}</g></g></g>
 ${slabs}
 <g id="stkTop">
  <path d="M-118,${STOP+10} Q-132,${STOP+38} -106,${STOP+46} Q-100,${STOP+96} -80,${STOP+48} Q-30,${STOP+52} -10,${STOP+42} Q4,${STOP+124} 26,${STOP+44} Q70,${STOP+50} 84,${STOP+40} Q92,${STOP+84} 106,${STOP+38} Q134,${STOP+30} 122,${STOP+8} Q0,${STOP-34} -118,${STOP+10}Z" fill="#B8571D" ${sw(5)}/>
  <path d="M-70,${STOP-4} Q-30,${STOP-20} 20,${STOP-8}" fill="none" stroke="#E58A4B" stroke-width="9" stroke-linecap="round" opacity=".8"/>
  <rect x="-24" y="${STOP-40}" width="52" height="30" rx="6" fill="#FFE79A" ${sw(5)} transform="rotate(-6 0 ${STOP-25})"/>
 </g>
</g></g></g>`);

/* Planet Zorp: a purple ringed planet that grows in the porthole */
const zorpSVG=`<g transform="rotate(-16)"><ellipse rx="780" ry="130" fill="none" stroke="#FFC95A" stroke-width="44"/><ellipse rx="780" ry="130" fill="none" stroke="${OL}" stroke-width="6"/>
 <circle r="470" fill="#B07CFF" ${sw(8)}/><g fill="#8E5CE0" opacity=".75"><circle cx="-150" cy="-120" r="110"/><circle cx="170" cy="90" r="140"/><circle cx="-60" cy="230" r="90"/></g>
 <ellipse cx="-160" cy="-210" rx="150" ry="70" transform="rotate(-30 -160 -210)" fill="#fff" opacity=".45"/>
 <path d="M-780,0 A780,130 0 0 0 780,0" fill="none" stroke="#FFC95A" stroke-width="44"/></g>`;
document.getElementById('portFlash').insertAdjacentHTML('beforebegin',`<g transform="translate(1400,700)"><g id="zorpW" opacity="0">${zorpSVG}</g></g>`);

document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="fiftyTag" opacity="0"><g id="fiftyIn">
 <path d="M0,-110 L26,-62 L80,-84 L66,-28 L118,-6 L70,24 L92,78 L36,60 L10,112 L-18,64 L-70,92 L-62,34 L-116,10 L-64,-18 L-84,-76 L-30,-60Z" fill="#FFE14D" ${sw(8)}/>
 <text x="0" y="34" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="112" fill="#E0529F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">50</text>
</g></g>`);
/* ================= episode 18 additions: PLANET ZORP (a gray world that blooms into colour), the four Zorpians (gray Blips that turn colourful), the giant's silhouette ================= */
const ZG=['#9AA3AE','#6E7885','#CDD3DA','#B5BCC6'];                       // gray body / dark / light / accent
const ZCOL=[['#7FEFFF','#2EB9DB','#D9FBFF','#B6F4FF'],['#C9A8FF','#8F6CE0','#EBDDFF','#7FE0FF'],['#FFD36B','#E0A52E','#FFF0B8','#FF8F4A'],['#FF9A8B','#E0605A','#FFD3CC','#7FFFB0']];
// a Blip whose colours are tagged with classes (z<i>a body, b dark, c light, d spots, bs antenna stalk) so GSAP can fade gray -> colour
const zorpian=(p,i)=>{let s=blipSVG(p);
 [BG_,BD_,BL_,BP_].forEach((col,j)=>{s=s.split(`fill="${col}"`).join(`class="z${i}${'abcd'[j]}" fill="${ZG[j]}"`);});
 return s.split(`stroke="${BD_}"`).join(`class="z${i}bs" stroke="${ZG[1]}"`);};
document.getElementById('g5Mount').insertAdjacentHTML('beforeend',[1,2,3,4].map(i=>zorpian('z'+i,i)).join(''));

const zStars=Array.from({length:60},(_,i)=>{const x=-200+rnd(i,61)*3200,y=-700+rnd(i,62)*1500,r=1.5+rnd(i,63)*3;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity=".7"/>`;}).join('');
let zCr='';for(let i=0;i<10;i++){const x=150+rnd(i,71)*2800,y=1460+rnd(i,72)*400,rx=60+rnd(i,73)*90;zCr+=`<ellipse class="zCr" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${(rx*.26).toFixed(0)}" fill="#8E97A4" stroke="${OL}" stroke-width="5"/>`;}
const zfl=(x,s,c1,c2)=>mush(x,s,c1,c2).replace('class="mush"','class="zfl"');
document.getElementById('setMount').insertAdjacentHTML('beforeend',`<g id="zorpSet" opacity="0">
 <rect class="zSky" x="-1800" y="-1800" width="6200" height="3300" fill="#7C8593"/>${zStars}
 <g transform="translate(1900,170)"><g transform="rotate(-14)"><ellipse class="zRing" rx="440" ry="76" fill="none" stroke="#B7BEC9" stroke-width="30"/><circle class="zPl" r="180" fill="#B7BEC9" ${sw(8)}/><path class="zRing" d="M-440,0 A440,76 0 0 0 440,0" fill="none" stroke="#B7BEC9" stroke-width="30"/></g></g>
 <g transform="translate(560,300)"><circle class="zMoon" r="100" fill="#C9CFD8" ${sw(6)}/><circle cx="-30" cy="-20" r="24" fill="#fff" opacity=".35"/><circle cx="34" cy="30" r="30" fill="#fff" opacity=".28"/></g>
 <g id="zorpGiant" opacity="0"><g id="zorpGiantIn">
  <path d="M-430,0 Q-470,-420 -260,-700 Q-130,-890 0,-890 Q130,-890 260,-700 Q470,-420 430,0Z" fill="#2B2147"/>
  <path d="M-250,-720 L-340,-940 L-170,-810Z M250,-720 L340,-940 L170,-810Z" fill="#2B2147"/>
  <g id="zgEyes"><ellipse cx="-120" cy="-620" rx="64" ry="80" fill="#FFF3B0"/><ellipse cx="120" cy="-620" rx="64" ry="80" fill="#FFF3B0"/><circle cx="-108" cy="-608" r="28" fill="#2B2147"/><circle cx="132" cy="-608" r="28" fill="#2B2147"/></g>
 </g></g>
 <path class="zMtA" d="M-300,1400 Q100,900 500,1100 Q900,800 1300,1050 Q1700,780 2100,1050 Q2500,880 2900,1400Z" fill="#98A1AE" ${sw(7)}/>
 <path class="zMtB" d="M-300,1450 Q200,1100 700,1250 Q1200,1000 1700,1250 Q2200,1050 2900,1450Z" fill="#848D9A" ${sw(7)}/>
 <rect class="zGnd" x="-1800" y="1380" width="6200" height="2400" fill="#A3ABB7" stroke="${OL}" stroke-width="8"/>
 ${zCr}
 <g id="zFlowers" opacity="0">${zfl(700,.8,'#FF8FD2','#FFE0F4')}${zfl(1180,.5,'#B07CFF','#EBDDFF')}${zfl(1600,.62,'#6FF6FF','#D8FFFF')}${zfl(2480,.7,'#FFB46F','#FFE6C8')}${zfl(2800,.55,'#8BFF9A','#E8FFE0')}</g>
</g>`);
/* ================= episode 19 additions: MUNCH (the giant gray monster = a gray, huge Gumdrop), a hot space rock, smoke puffs, the rainbow burp ================= */
// Gumdrop now stands IN FRONT of the whole cast (so the others can hide behind him)
document.getElementById('ghMount').before(document.getElementById('gmMount'));
const MNC=['#8D96A3','#656E7C','#C3C9D2','#E8E3D5','#A9B0BB'];         // Munch is gray: body / dark / belly / horns / spots
const tintGum=(p,c)=>gumSVG(p).split(GF).join(c[0]).split(GD).join(c[1]).split(GB).join(c[2]).split(GHR).join(c[3]).split(GT).join(c[4]);
document.getElementById('gpMount').insertAdjacentHTML('beforeend',tintGum('mn',MNC));

// the hot space rock Truffle cooks on
document.getElementById('zorpSet').insertAdjacentHTML('beforeend',`<g id="hotRock" opacity="0"><g id="hotRockIn">
 <ellipse cx="0" cy="26" rx="240" ry="26" fill="rgba(60,30,10,.28)"/>
 <ellipse id="hrGlow" cx="0" cy="-40" rx="250" ry="96" fill="#FF8A2B" opacity=".38"/>
 <path d="M-200,22 Q-220,-70 -126,-104 Q-64,-156 42,-124 Q156,-136 198,-52 Q228,10 176,26Z" fill="#4B4040" ${sw(8)}/>
 <path d="M-130,-64 L-64,-34 L-96,0 M22,-96 L52,-44 L116,-66 M-14,-22 L32,10" stroke="#FF8A2B" stroke-width="11" fill="none" stroke-linecap="round"/>
 <path d="M-130,-64 L-64,-34 L-96,0 M22,-96 L52,-44 L116,-66 M-14,-22 L32,10" stroke="#FFE14D" stroke-width="4" fill="none" stroke-linecap="round"/>
</g></g>`);

// smoke puffs (the burnt pancake)
document.getElementById('jgMount').insertAdjacentHTML('beforeend',Array.from({length:8},(_,i)=>`<g id="smw${i}"><circle id="sm${i}" class="smk" r="34" fill="#7B7F8C" ${sw(5)} opacity="0"/></g>`).join(''));

// the rainbow burp: seven parallel arcs, revealed with a stroke-dash trick
const RBC=['#FF5F5F','#FF9A3C','#FFE14D','#8BFF5A','#3FD6FF','#5A7BFF','#B07CFF'];
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="rainbow" opacity="0">${RBC.map((c,i)=>`<path class="rbp" transform="translate(0,${i*34})" d="M2120,860 C1750,-330 520,-420 -500,330" pathLength="1" fill="none" stroke="${OL}" stroke-width="44" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}${RBC.map((c,i)=>`<path class="rbp" transform="translate(0,${i*34})" d="M2120,860 C1750,-330 520,-420 -500,330" pathLength="1" fill="none" stroke="${c}" stroke-width="30" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>`);
/* ================= episode 20 additions: Earth waiting at the end of the rainbow, more stars to the left of Zorp ================= */
let zS2='';for(let i=0;i<60;i++){const x=-2400+rnd(i,81)*2300,y=-800+rnd(i,82)*1600,r=1.5+rnd(i,83)*3;zS2+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity=".7"/>`;}
document.querySelector('.zSky').insertAdjacentHTML('afterend',zS2);
document.querySelector('.zMtA').insertAdjacentHTML('beforebegin',`<g transform="translate(-500,432) scale(1.6)">${earthSVG.replace('id="earth"','id="earthZ"')}</g>`);
/* ================= episode 21 additions (Season 5: the Great Pancake Festival): festival banner + bunting, a long pancake table, the Golden Spatula on its pedestal ================= */
{const t=document.querySelector('#banner text');t.textContent='PANCAKE FESTIVAL!';t.setAttribute('font-size','72');}
let flags2='';for(let i=0;i<14;i++){const x=1650+i*66;flags2+=`<path d="M${x},${150+Math.round(Math.sin(i/13*Math.PI)*-0)} L${x+60},150 L${x+30},202Z" fill="${SPC[(i+2)%6]}" ${sw(5)}/>`;}
document.getElementById('bannerMount').insertAdjacentHTML('beforeend',`<g id="banner2"><path d="M1600,60 Q2000,200 2600,60" fill="none" stroke="#5b4a3c" stroke-width="7"/>${flags2}</g>`);

// a long gingham table loaded with pancake stacks (behind the characters)
const fstack=(x,n,k)=>`<g transform="translate(${x},0)">${Array.from({length:n},(_,i)=>pcd(-i*26)).join('')}<path d="M-72,${-n*26-18} Q-76,${-n*26-2} -52,${-n*26} Q-42,${-n*26+22} -30,${-n*26} Q10,${-n*26+4} 20,${-n*26-12} Q50,${-n*26-8} 62,${-n*26} Q86,${-n*26-12} 72,${-n*26-24} Q0,${-n*26-48} -72,${-n*26-18}Z" fill="#B8571D" ${sw(5)}/><rect x="-16" y="${-n*26-50}" width="32" height="20" rx="5" fill="#FFE79A" ${sw(4)}/></g>`;
document.getElementById('cheeseMount').innerHTML=`<g id="fTable" opacity="0">
 <ellipse cx="1420" cy="1650" rx="640" ry="30" fill="rgba(60,30,10,.2)"/>
 <rect x="830" y="1300" width="40" height="340" rx="10" fill="#B4733A" ${sw(7)}/><rect x="1970" y="1300" width="40" height="340" rx="10" fill="#B4733A" ${sw(7)}/>
 <rect x="790" y="1230" width="1100" height="40" rx="16" fill="#D79A55" ${sw(7)}/>
 <rect x="810" y="1258" width="1060" height="110" rx="20" fill="url(#pGing)" ${sw(7)}/>
 <g transform="translate(0,1226)" id="fStacks">${fstack(940,4)}${fstack(1100,6)}${fstack(1260,3)}${fstack(1430,5)}${fstack(1590,4)}${fstack(1750,6)}</g>
</g>`;

// the Golden Spatula on its little rolling pedestal
document.getElementById('night').insertAdjacentHTML('beforebegin',`<g id="pedW" opacity="0"><g id="ped">
 <ellipse cx="0" cy="12" rx="120" ry="16" fill="rgba(60,30,10,.22)"/>
 <path d="M-76,-20 L-60,-250 L60,-250 L76,-20Z" fill="#B0263F" ${sw(7)}/><path d="M-70,-60 H70 M-66,-110 H66" stroke="#FFD84A" stroke-width="9"/>
 <rect x="-82" y="-274" width="164" height="30" rx="12" fill="#FFD84A" ${sw(7)}/>
 <g fill="#8A8FA3" ${sw(5)}><circle cx="-52" cy="-4" r="16"/><circle cx="52" cy="-4" r="16"/></g>
 <g id="spat">
  <path d="M-12,-270 L-12,-400 Q-12,-420 0,-420 Q12,-420 12,-400 L12,-270Z" fill="#FFC21E" ${sw(6)}/>
  <path d="M-74,-640 Q-74,-668 -46,-668 L46,-668 Q74,-668 74,-640 L74,-500 Q74,-420 12,-420 L-12,-420 Q-74,-420 -74,-500Z" fill="#FFE066" ${sw(7)}/>
  <path d="M-36,-640 V-540 M0,-640 V-540 M36,-640 V-540" stroke="#C9971A" stroke-width="12" stroke-linecap="round"/>
  <path d="M-52,-640 Q-60,-560 -48,-490" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>
 </g>
</g></g>`);

// two little glowing eyes that sneak away in the dark (they live above the night overlay)
document.getElementById('ghMount').insertAdjacentHTML('beforebegin',`<g id="sneakW"><g id="sneak" opacity="0"><ellipse cx="-20" cy="0" rx="13" ry="18" fill="#FFF7C2"/><ellipse cx="20" cy="0" rx="13" ry="18" fill="#FFF7C2"/><circle cx="-17" cy="2" r="6" fill="#2b1a14"/><circle cx="23" cy="2" r="6" fill="#2b1a14"/></g></g>`);
/* ================= episode 22 additions: detective Mochi (deerstalker + magnifying glass), sticky footprints, the Golden Spatula that gets tied to balloons ================= */
document.getElementById('mcHead').insertAdjacentHTML('beforeend',`<g id="mcHat" opacity="0"><g transform="translate(0,-222)">
 <path d="M-150,14 Q-176,50 -128,62 Q-108,40 -104,16Z" fill="#8A6A40" ${sw(6)}/><path d="M150,14 Q176,50 128,62 Q108,40 104,16Z" fill="#8A6A40" ${sw(6)}/>
 <path d="M-124,16 Q-136,-66 -42,-86 Q0,-100 42,-86 Q136,-66 124,16 Q0,46 -124,16Z" fill="#A98B5A" ${sw(7)}/>
 <path d="M-118,4 Q0,40 118,4" fill="none" stroke="#6E5230" stroke-width="12"/>
 <path d="M-60,-84 L-56,-6 M0,-96 V16 M60,-84 L56,-6" stroke="#7B5E36" stroke-width="7" fill="none"/>
 <circle cx="0" cy="-100" r="13" fill="#6E5230" ${sw(5)}/>
</g></g>`);
document.getElementById('mcArmR').insertAdjacentHTML('beforeend',`<g id="mcMag" opacity="0">
 <path d="M4,104 L4,176" stroke="${OL}" stroke-width="15" stroke-linecap="round"/><path d="M4,104 L4,176" stroke="#8A5A2B" stroke-width="8" stroke-linecap="round"/>
 <circle cx="4" cy="224" r="50" fill="rgba(200,240,255,.5)" stroke="${OL}" stroke-width="10"/><circle cx="4" cy="224" r="50" fill="none" stroke="#C9971A" stroke-width="5"/>
 <path d="M-22,206 Q-16,192 -2,188" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>
</g>`);
// sticky footprints on the floor (behind everybody)
let fps='';for(let i=0;i<12;i++){const x=1130+i*66,y=1640+78+(i%2?16:-12);fps+=`<g transform="translate(${x},${y})"><g id="fp${i}" class="fp" opacity="0"><ellipse rx="30" ry="17" fill="#B8571D" ${sw(4)}/><ellipse cx="-9" cy="-4" rx="9" ry="4" fill="#E58A4B" opacity=".8"/><circle cx="-34" cy="2" r="6" fill="#B8571D"/><circle cx="36" cy="-2" r="5" fill="#B8571D"/></g></g>`;}
document.getElementById('partyFloor').insertAdjacentHTML('beforeend',fps);
// the Golden Spatula, free: handle tip at the origin; it stands blade-up (rotated 180) until balloons turn it over
const BLC=['#FF5F5F','#FFE14D','#3FD6FF','#8BFF5A'];
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="flyW" opacity="0"><g id="fly">
 <g id="bals" opacity="0">${[[-86,-300,0],[0,-360,1],[84,-290,2],[-36,-250,3]].map(([x,y,c])=>`<path d="M0,0 L${x},${y+54}" stroke="${OL}" stroke-width="5" fill="none"/><g transform="translate(${x},${y})" class="bln"><ellipse rx="46" ry="56" fill="${BLC[c]}" ${sw(6)}/><ellipse cx="-14" cy="-20" rx="10" ry="16" fill="#fff" opacity=".6"/><path d="M-9,56 L9,56 L0,70Z" fill="${BLC[c]}" ${sw(4)}/></g>`).join('')}</g>
 <g id="gspIn">
  <path d="M-10,0 L-10,150 Q-10,166 0,166 Q10,166 10,150 L10,0Z" fill="#FFC21E" ${sw(6)}/>
  <path d="M-62,330 Q-62,358 -34,358 L34,358 Q62,358 62,330 L62,230 Q62,166 10,166 L-10,166 Q-62,166 -62,230Z" fill="#FFE066" ${sw(7)}/>
  <path d="M-28,336 V250 M0,336 V250 M28,336 V250" stroke="#C9971A" stroke-width="11" stroke-linecap="round"/>
  <path d="M-42,330 Q-48,270 -38,226" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>
 </g>
</g></g>`);
// a sunny sky + lawn for the chase (used from the end of this episode on)
document.getElementById('setMount').insertAdjacentHTML('beforeend',`<g id="skySet" opacity="0">
 <defs><linearGradient id="gSkyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E9BFF"/><stop offset=".55" stop-color="#8CD2FF"/><stop offset="1" stop-color="#E4F6FF"/></linearGradient></defs>
 <rect x="-1800" y="-3400" width="6200" height="4900" fill="url(#gSkyDay)"/>
 <g transform="translate(2350,-260)"><circle r="190" fill="#FFF3B0" opacity=".45"/><circle r="120" fill="#FFE14D" ${sw(6)}/></g>
 <g id="clouds">${[[300,200,1.0],[1500,-100,1.3],[2300,380,.9],[700,-700,1.2],[1900,-1000,1.0],[300,-1500,1.4],[1300,-1900,1.1],[2200,-2300,1.3],[700,-2600,1.0]].map(([x,y,s])=>`<g transform="translate(${x},${y}) scale(${s})"><g class="cld"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g></g>`).join('')}</g>
 <path d="M-300,1400 Q200,1000 700,1200 Q1200,900 1700,1180 Q2200,980 2900,1400Z" fill="#6FD38A" ${sw(7)}/>
 <path d="M-300,1450 Q300,1150 900,1300 Q1500,1080 2100,1300 Q2600,1180 2900,1450Z" fill="#52C27A" ${sw(7)}/>
 ${[[520,1.0],[2480,1.2],[1180,.7]].map(([x,s])=>`<g transform="translate(${x},1400) scale(${s})"><rect x="-22" y="-210" width="44" height="210" rx="10" fill="#9A6A3A" ${sw(7)}/><circle cx="0" cy="-290" r="130" fill="#3FAF6A" ${sw(8)}/><circle cx="-70" cy="-240" r="80" fill="#4BC079" ${sw(6)}/><circle cx="76" cy="-250" r="84" fill="#4BC079" ${sw(6)}/></g>`).join('')}
 <rect x="-1800" y="1380" width="6200" height="2400" fill="#8BE08B" stroke="${OL}" stroke-width="8"/>
 ${Array.from({length:14},(_,i)=>{const x=-100+rnd(i,91)*2900,y=1450+rnd(i,92)*380;return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><path d="M0,0 Q-8,-34 -20,-44 M0,0 Q4,-40 0,-52 M0,0 Q10,-34 22,-42" stroke="#4BAF5E" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;}).join('')}
</g>`);
/* ================= episode 23 additions: Zap's rocket flames, wind streaks (the sky set itself comes from #22) ================= */
// Zap's rocket flames (two teardrops that flicker under his feet)
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="zflW" opacity="0"><g id="zfl2">${[-34,34].map(x=>`<g transform="translate(${x},0)"><g class="zf"><path d="M0,0 Q-36,50 0,150 Q36,50 0,0Z" fill="#FF8A2B" ${sw(5)}/><path d="M0,10 Q-16,50 0,100 Q16,50 0,10Z" fill="#FFE14D"/></g></g>`).join('')}</g></g>`);
// speed streaks for the flying shots
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="streaks" opacity="0">${Array.from({length:10},(_,i)=>`<rect class="stk" x="${(i*173)%1000+60}" y="${(i*257)%1800}" width="7" height="${120+(i%3)*60}" rx="3" fill="#fff" opacity=".7"/>`).join('')}</g>`);
/* ================= episode 24 additions: the scoreboard, three flying pancakes (Mochi's has a little spaceship dome), the pancake stuck to the ceiling ================= */
document.getElementById('night').insertAdjacentHTML('beforebegin',`<g id="sbW" opacity="0"><g id="sb">
 <path d="M-150,-130 L-150,-250 M150,-130 L150,-250" stroke="#5b4a3c" stroke-width="8"/>
 <rect x="-240" y="-130" width="480" height="270" rx="30" fill="#1D2B5A" ${sw(9)}/><rect x="-220" y="-112" width="440" height="234" rx="22" fill="#27397A"/>
 <text x="0" y="-60" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="54" fill="#FFE14D" stroke="${OL}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">SCORES</text>
 ${[-146,0,146].map((x,i)=>`<g transform="translate(${x},40)"><rect x="-60" y="-56" width="120" height="116" rx="16" fill="#0F1838" ${sw(5)}/><text id="sbq${i}" x="0" y="26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="84" fill="#8EA2FF">?</text><g id="sbt${i}" opacity="0"><text x="0" y="24" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="74" fill="#FFE14D" stroke="${OL}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">10</text></g></g>`).join('')}
</g></g>`);
document.getElementById('jgMount').insertAdjacentHTML('beforeend',[0,1,2].map(i=>`<g id="pcw${i}" opacity="0"><g id="pcq${i}"><g id="pcs${i}">${pcd(0)}<path d="M-70,-44 Q-76,-32 -52,-30 Q-40,-8 -30,-30 Q10,-26 20,-42 Q54,-38 64,-30 Q84,-40 70,-52 Q0,-76 -70,-44Z" fill="#B8571D" ${sw(4)}/><g id="pcd${i}" opacity="${i===1?1:0}"><path d="M-44,-62 Q-40,-120 0,-124 Q40,-120 44,-62Z" fill="#9FE3FF" ${sw(5)}/><path d="M-26,-96 Q-22,-112 -6,-114" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/></g></g></g></g>`).join(''));
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="splatW" opacity="0"><g id="splat">
 <ellipse cx="0" cy="0" rx="112" ry="30" fill="#E9A64F" ${sw(6)}/><ellipse cx="0" cy="6" rx="86" ry="14" fill="#F6C777"/>
 <path d="M-60,12 Q-66,50 -56,90 M10,16 Q6,70 14,130 M64,10 Q70,44 62,76" stroke="#B8571D" stroke-width="16" stroke-linecap="round" fill="none"/>
 <g id="drips" fill="#B8571D"><circle cx="-56" cy="96" r="11"/><circle cx="14" cy="136" r="12"/><circle cx="62" cy="82" r="10"/></g>
</g></g>`);
/* ================= episode 25 additions: fireworks (6 colours), twinkling stars for the dusk sky ================= */
// fireworks live in the fx layer (above the dusk overlay so they glow)
document.getElementById('fxMount').insertAdjacentHTML('beforeend',['#FF5F5F','#FFE14D','#3FD6FF','#8BFF5A','#FF8FD2','#B07CFF'].map((c,i)=>`<g id="fwW${i}" opacity="0"><g id="fw${i}">${Array.from({length:14},(_,k)=>{const a=k/14*Math.PI*2,x0=Math.cos(a)*60,y0=Math.sin(a)*60,x1=Math.cos(a)*190,y1=Math.sin(a)*190;return `<path d="M${x0.toFixed(0)},${y0.toFixed(0)} L${x1.toFixed(0)},${y1.toFixed(0)}" stroke="${OL}" stroke-width="22" stroke-linecap="round"/><path d="M${x0.toFixed(0)},${y0.toFixed(0)} L${x1.toFixed(0)},${y1.toFixed(0)}" stroke="${c}" stroke-width="12" stroke-linecap="round"/><circle cx="${(Math.cos(a)*230).toFixed(0)}" cy="${(Math.sin(a)*230).toFixed(0)}" r="11" fill="${c}"/>`;}).join('')}<circle r="22" fill="#fff"/></g></g>`).join(''));
document.getElementById('fxMount').insertAdjacentHTML('beforeend',`<g id="nStars" opacity="0">${Array.from({length:46},(_,i)=>{const x=-100+rnd(i,101)*3000,y=-900+rnd(i,102)*1900,s=.5+rnd(i,103)*1.1;return `<path class="nst" transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${s.toFixed(2)})" d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4Z" fill="#FFF7C2"/>`;}).join('')}</g>`);
/* ================= episode 26 additions (Season 6, "The Mystery Egg"): Munch's big gray egg (cap + base, cracks, warm glow), his note, a gingham blanket, a banana thought bubble,
   and baby Pebble = a pink re-skin of the Gumdrop rig (a saturation filter keeps him gray until he tastes a pancake) ================= */
const EGGP='M0,-262 C128,-262 200,-96 200,34 C200,168 112,262 0,262 C-112,262 -200,168 -200,34 C-200,-96 -128,-262 0,-262Z';
const EGZZ='M-198,-30 L-150,-70 L-100,-22 L-50,-72 L0,-18 L50,-70 L100,-22 L150,-68 L198,-30';        // the seam the egg splits along (left to right)
const EGGART=`<path d="${EGGP}" fill="#CBD2DC"/>
 <g clip-path="url(#cpEggShape)">
  <g fill="#AEB8C6"><circle cx="-112" cy="-128" r="32"/><circle cx="98" cy="-176" r="22"/><circle cx="136" cy="-36" r="28"/><circle cx="-150" cy="28" r="24"/><circle cx="-56" cy="-214" r="14"/><circle cx="70" cy="132" r="30"/><circle cx="-104" cy="158" r="20"/><circle cx="22" cy="-118" r="12"/></g>
  <path d="M-214,84 L-150,46 L-100,86 L-50,46 L0,88 L50,46 L100,86 L150,46 L214,84" fill="none" stroke="#8D96A3" stroke-width="20" stroke-linejoin="round"/>
 </g>
 <g transform="translate(0,168) scale(.62) translate(0,135)"><path d="M0,-168 C-30,-196 -64,-168 -42,-140 C-28,-122 0,-102 0,-102 C0,-102 28,-122 42,-140 C64,-168 30,-196 0,-168Z" fill="#FF9BC4"/></g>
 <ellipse cx="-88" cy="-150" rx="30" ry="62" fill="#fff" opacity=".5" transform="rotate(22 -88 -150)"/>
 <path d="${EGGP}" fill="none" ${sw(8)}/>`;
document.getElementById('world').insertAdjacentHTML('afterbegin',`<defs>
 <radialGradient id="gEggGlow"><stop offset="0" stop-color="#FFF6B8" stop-opacity=".95"/><stop offset=".45" stop-color="#FFD36B" stop-opacity=".42"/><stop offset="1" stop-color="#FFD36B" stop-opacity="0"/></radialGradient>
 <clipPath id="cpEggShape"><path d="${EGGP}"/></clipPath>
 <clipPath id="cpEggTop"><path d="M-300,-330 L300,-330 L300,-30 L198,-30 L150,-68 L100,-22 L50,-70 L0,-18 L-50,-72 L-100,-22 L-150,-70 L-198,-30 L-300,-30Z"/></clipPath>
 <clipPath id="cpEggBot"><path d="M-300,330 L300,330 L300,-30 L198,-30 L150,-68 L100,-22 L50,-70 L0,-18 L-50,-72 L-100,-22 L-150,-70 L-198,-30 L-300,-30Z"/></clipPath>
 <filter id="fSat" color-interpolation-filters="sRGB" x="-30%" y="-30%" width="160%" height="160%"><feColorMatrix id="fSatM" type="saturate" values="1"/></filter>
</defs>`);
// the egg: origin = where it touches the ground; #eggWob rocks it around that point, #eggRoll turns it around its own centre (rolling), #eggHop lifts it
const EGG_HTML=`<g id="eggW" opacity="0">
 <ellipse cx="0" cy="8" rx="236" ry="30" fill="rgba(60,30,10,.22)"/>
 <g id="eggHop"><g id="eggWob"><g transform="translate(0,-262)"><g id="eggRoll">
  <circle id="eggGlow" r="430" fill="url(#gEggGlow)" opacity="0"/>
  <g id="eggFull">${EGGART}</g>
  <path id="eggHeat" d="${EGGP}" fill="#FF6A3D" opacity="0"/>
  <g id="eggBase" opacity="0"><g clip-path="url(#cpEggBot)">${EGGART}</g><path d="${EGZZ}" fill="none" ${sw(8)}/></g>
  <g id="eggCap" opacity="0"><g clip-path="url(#cpEggTop)">${EGGART}</g><path d="${EGZZ}" fill="none" ${sw(8)}/></g>
  <g id="eggCracks" fill="none" ${sw(9)}>
   <path id="ecr0" class="ecr" pathLength="1" d="M-26,-254 L-2,-200 L-40,-150 L-10,-98" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
   <path id="ecr1" class="ecr" pathLength="1" d="M-124,-176 L-74,-134 L-100,-76" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
   <path id="ecr2" class="ecr" pathLength="1" d="M74,-206 L42,-152 L98,-112 L68,-60" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
   <path id="ecr3" class="ecr" pathLength="1" d="${EGZZ}" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
  </g>
  <g id="noteW" opacity="0"><g id="note" transform="translate(66,-4) rotate(8)">
   <rect x="-82" y="-66" width="164" height="132" rx="8" fill="#FFF8DC" ${sw(6)}/>
   <rect x="-20" y="-80" width="40" height="26" rx="4" fill="#FF9BC4" opacity=".9" ${sw(4)}/>
   <g font-family="Baloo2,sans-serif" font-weight="800" text-anchor="middle" fill="#5b4a3c"><text x="0" y="-18" font-size="31">KEEP ME</text><text x="0" y="18" font-size="31">WARM!</text><text x="14" y="52" font-size="25" fill="#E0529F">MUNCH</text></g>
   <g transform="translate(-52,40) scale(.2) translate(0,135)"><path d="M0,-168 C-30,-196 -64,-168 -42,-140 C-28,-122 0,-102 0,-102 C0,-102 28,-122 42,-140 C64,-168 30,-196 0,-168Z" fill="#FF6FA8"/></g>
  </g></g></g>
  <g id="blanketW" opacity="0"><g id="blanket">
   <path d="M0,-292 C152,-292 238,-132 248,72 Q206,106 154,74 Q103,110 52,76 Q0,112 -52,76 Q-103,110 -154,74 Q-206,106 -248,72 C-238,-132 -152,-292 0,-292Z" fill="url(#pGing)" ${sw(8)}/>
   <path d="M-248,72 Q-206,106 -154,74 Q-103,110 -52,76 Q0,112 52,76 Q103,110 154,74 Q206,106 248,72" fill="none" stroke="#FF9BC4" stroke-width="16" stroke-linecap="round"/>
   <g transform="translate(0,-88)">${[0,1,2].map(i=>`<ellipse cx="0" cy="${-i*22}" rx="${74-i*4}" ry="17" fill="#E9A64F" ${sw(5)}/>`).join('')}<rect x="-14" y="-92" width="28" height="18" rx="4" fill="#FFE79A" ${sw(4)}/></g>
  </g></g>
 </g></g></g></g>
</g>`;
// the inside of the shell seen over the front rim (drawn behind baby Pebble when he pops out)
const EGGBACK_HTML=`<g id="eggBackW" opacity="0"><g transform="translate(0,-262)"><path d="${EGZZ} Q150,-146 0,-152 Q-150,-146 -198,-30Z" fill="#FFF3D6" ${sw(7)}/></g></g>`;
// baby Pebble: pink re-skin of the Gumdrop rig (the same colours as Munch, but pink), gray while the saturation filter is at 0
const PBC=['#FF9DC8','#E0629F','#FFE3F0','#FFE6A8','#FFC2DD'];
// a banana thought bubble (Coco's idea of what is inside)
const BN_HTML=`<g id="bnW" opacity="0"><g id="bn">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="60" cy="-62" rx="120" ry="86" fill="#fff" ${sw(6)}/>
 <path d="M-8,-112 Q66,-134 124,-64 Q134,-22 102,2 Q82,-62 -2,-78 Q-22,-94 -8,-112Z" fill="#FFE14D" ${sw(5)}/><path d="M-8,-112 L-18,-126" stroke="#7A3E1D" stroke-width="9" stroke-linecap="round"/>
</g></g>`;
/* ================= episode 27 additions: a little campfire (Truffle's toaster), Zap's "37°" thermometer bubble ================= */
const FIRE_HTML=`<g id="fireW" opacity="0"><g id="fire">
 <ellipse cx="0" cy="8" rx="150" ry="22" fill="rgba(60,30,10,.25)"/>
 <g transform="translate(-40,-22)"><g class="cfl"><path d="M0,0 Q-54,-70 -8,-196 Q10,-122 42,-98 Q74,-50 0,0Z" fill="#FF8A2B" ${sw(5)}/></g></g>
 <g transform="translate(40,-22)"><g class="cfl"><path d="M0,0 Q-46,-60 -4,-156 Q14,-98 38,-82 Q62,-40 0,0Z" fill="#FF8A2B" ${sw(5)}/></g></g>
 <g transform="translate(0,-18)"><g class="cfl"><path d="M0,0 Q-40,-52 0,-128 Q40,-52 0,0Z" fill="#FFE14D" ${sw(4)}/></g></g>
 <rect x="-112" y="-30" width="224" height="36" rx="15" fill="#8A5A2B" ${sw(6)} transform="rotate(-7)"/>
 <rect x="-112" y="-30" width="224" height="36" rx="15" fill="#A06A35" ${sw(6)} transform="rotate(7)"/>
</g></g>`;
const THERM_HTML=`<g id="thermW" opacity="0"><g id="therm">
 <rect x="-136" y="-84" width="272" height="136" rx="30" fill="#1D2B5A" ${sw(8)}/><rect x="-120" y="-70" width="240" height="108" rx="22" fill="#27397A"/>
 <text x="-26" y="20" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="88" fill="#7CFF9B" stroke="${OL}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">37°</text>
 <path id="thermOk" d="M60,-10 L82,16 L116,-28" fill="none" stroke="#7CFF9B" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
 <path d="M-22,50 L0,90 L22,50Z" fill="#1D2B5A" ${sw(6)}/>
</g></g>`;
/* ================= episode 28 additions: a stack of pancakes for the baby (re-used in #29), the egg's glow in the fx layer (it shines through the night), light rays for the hatching ================= */
const PILE_HTML=`<g id="pileW" opacity="0"><g id="pile">
 <ellipse cx="0" cy="10" rx="150" ry="22" fill="rgba(60,30,10,.22)"/>
 ${[0,1,2,3,4].map(i=>pcd(-i*30)).join('')}
 <path d="M-72,-170 Q-76,-154 -52,-152 Q-42,-130 -30,-152 Q10,-148 20,-164 Q50,-160 62,-152 Q86,-164 72,-176 Q0,-200 -72,-170Z" fill="#B8571D" ${sw(5)}/>
 <rect x="-18" y="-202" width="36" height="22" rx="5" fill="#FFE79A" ${sw(4)}/>
</g></g>`;
const EGFX_HTML=`<g id="egFxW" opacity="0"><circle r="480" fill="url(#gEggGlow)"/></g>
<g id="raysW" opacity="0"><g id="rays">${Array.from({length:12},(_,i)=>`<path d="M-26,0 L26,0 L0,-640Z" fill="#FFF3B0" opacity=".65" transform="rotate(${i*30})"/>`).join('')}</g></g>`;
/* ================= episode 29 additions: the name ribbon "PEBBLE", floating Z-z-z's, Zap's bouncing "here he is" arrow ================= */
const NAME_HTML=`<g id="nameW" opacity="0"><g id="nameS">
 <path d="M-200,-46 L200,-46 L176,0 L200,46 L-200,46 L-176,0Z" fill="#FF9BC4" ${sw(7)}/>
 <path d="M-200,-46 L-230,-70 L-230,24 L-200,46Z M200,-46 L230,-70 L230,24 L200,46Z" fill="#E0629F" ${sw(6)}/>
 <text x="0" y="22" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="70" fill="#fff" stroke="${OL}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">PEBBLE</text>
</g></g>`;
const ZZZ_HTML=`<g id="zzzW" opacity="0"><g id="zzz" font-family="Baloo2,sans-serif" font-weight="800" fill="#BFE6FF" stroke="${OL}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">
 <text x="0" y="0" font-size="64">Z</text><text x="52" y="-58" font-size="82">Z</text><text x="116" y="-128" font-size="104">Z</text></g></g>`;
const ARR_HTML=`<g id="arrW" opacity="0"><g id="arr"><path d="M-46,-120 L46,-120 L46,-50 L86,-50 L0,40 L-86,-50 L-46,-50Z" fill="#7CFF9B" ${sw(8)}/></g></g>`;
/* ================= episode 30 additions (Season 6 finale): the "HAPPY HATCHING DAY!" banner ================= */
const HB_HTML=`<g id="hbW" opacity="0"><g id="hb">
 <rect x="-500" y="-150" width="1000" height="300" rx="46" fill="#FF9BC4" ${sw(10)}/>
 <rect x="-470" y="-122" width="940" height="244" rx="34" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="4 18" stroke-linecap="round"/>
 <text x="0" y="-10" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="104" fill="#fff" stroke="${OL}" stroke-width="11" paint-order="stroke" stroke-linejoin="round">HAPPY HATCHING</text>
 <text x="0" y="104" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="104" fill="#FFE14D" stroke="${OL}" stroke-width="11" paint-order="stroke" stroke-linejoin="round">DAY!</text>
</g></g>`;
/* ================= episode 31 additions (Season 7, "The Great Pancake Race"): go-karts built from frying pans on pancake wheels, a scrolling race-track set,
   a start gantry with lights, speed lines. Race scenes keep the camera and the racers still and scroll the scenery behind them (modifiers wrap each layer seamlessly). ================= */
const KART_HTML=(id,c1,c2,bias=0)=>`<g id="${id}W" opacity="0"><g transform="translate(0,${-bias})"><g id="${id}"><g id="${id}S">
 <ellipse cx="0" cy="10" rx="250" ry="26" fill="rgba(60,30,10,.25)"/>
 <path d="M-330,-124 Q-336,-110 -322,-100 L-196,-100 L-196,-132Z" fill="#4A4F5C" ${sw(6)}/><rect x="-352" y="-134" width="84" height="40" rx="18" fill="${c2}" ${sw(6)}/>
 <rect x="-214" y="-104" width="26" height="42" rx="8" fill="#8A8FA3" ${sw(5)}/><g class="kfl" opacity="0"><path d="M-214,-84 Q-290,-120 -380,-84 Q-290,-50 -214,-84Z" fill="#FF8A2B" ${sw(5)}/><path d="M-214,-84 Q-262,-100 -318,-84 Q-262,-68 -214,-84Z" fill="#FFE14D"/></g>
 <path d="M-196,-76 L-178,-152 Q-150,-196 -80,-196 L100,-196 Q172,-190 202,-132 L218,-84 Q222,-48 182,-44 L-150,-44 Q-196,-44 -196,-76Z" fill="${c1}" ${sw(7)}/>
 <path d="M-192,-92 L212,-110 L218,-84 Q222,-48 182,-44 L-150,-44 Q-196,-44 -196,-76Z" fill="${c2}" ${sw(0)}/>
 <path d="M-196,-76 L-178,-152 Q-150,-196 -80,-196 L100,-196 Q172,-190 202,-132 L218,-84 Q222,-48 182,-44 L-150,-44 Q-196,-44 -196,-76Z" fill="none" ${sw(7)}/>
 <path d="M-130,-168 Q-100,-184 -40,-184" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/>
 <circle cx="206" cy="-122" r="15" fill="#FFF3B0" ${sw(5)}/>
 <path d="M70,-196 L96,-250" stroke="${OL}" stroke-width="14" stroke-linecap="round"/><path d="M70,-196 L96,-250" stroke="#8A8FA3" stroke-width="7" stroke-linecap="round"/>
 <ellipse cx="102" cy="-258" rx="30" ry="12" fill="${c2}" ${sw(6)}/>
 ${[-124,132].map(cx=>`<g transform="translate(${cx},-60)"><g class="wh"><circle r="62" fill="#E9A64F" ${sw(7)}/><circle r="46" fill="#F6C777"/><rect x="8" y="-30" width="34" height="22" rx="5" fill="#FFE79A" ${sw(4)}/><path d="M-46,8 Q-30,40 8,46" fill="none" stroke="#B8571D" stroke-width="10" stroke-linecap="round"/></g></g>`).join('')}
</g></g></g></g>`;
const RS_HTML=`<g id="raceSet" opacity="0">
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gSkyDay)"/>
 <g transform="translate(1900,-260)"><circle r="190" fill="#FFF3B0" opacity=".45"/><circle r="120" fill="#FFE14D" ${sw(6)}/></g>
 <g id="rsCloud">${Array.from({length:6},(_,i)=>{const x=i*2400;return [[300,160,1.0],[1400,-140,1.3],[2000,420,.9]].map(([cx,cy,s])=>`<g transform="translate(${x+cx},${cy}) scale(${s})"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g>`).join('');}).join('')}</g>
 <g id="rsFar">${Array.from({length:8},(_,i)=>`<path transform="translate(${i*1800-1800},0)" d="M0,1500 L0,1380 Q300,1020 640,1190 Q1000,880 1400,1140 Q1660,1010 1800,1380 L1800,1500Z" fill="#6FD38A" ${sw(7)}/>`).join('')}</g>
 <g id="rsMid">${Array.from({length:8},(_,i)=>`<g transform="translate(${i*1200-1200},0)"><path d="M0,1520 L0,1440 Q300,1190 620,1310 Q900,1170 1200,1440 L1200,1520Z" fill="#52C27A" ${sw(7)}/>
   <g transform="translate(300,1450)"><rect x="-22" y="-210" width="44" height="210" rx="10" fill="#9A6A3A" ${sw(7)}/><circle cx="0" cy="-290" r="130" fill="#3FAF6A" ${sw(8)}/><circle cx="-70" cy="-240" r="80" fill="#4BC079" ${sw(6)}/><circle cx="76" cy="-250" r="84" fill="#4BC079" ${sw(6)}/></g>
   <g transform="translate(930,1450) scale(.7)"><rect x="-22" y="-210" width="44" height="210" rx="10" fill="#9A6A3A" ${sw(7)}/><circle cx="0" cy="-290" r="130" fill="#3FAF6A" ${sw(8)}/><circle cx="-70" cy="-240" r="80" fill="#4BC079" ${sw(6)}/></g></g>`).join('')}</g>
 <rect x="-3000" y="1440" width="14000" height="3200" fill="#8BE08B" stroke="${OL}" stroke-width="8"/>
 <rect x="-3000" y="1740" width="14000" height="840" fill="#E7C78F"/><path d="M-3000,1740 H11000 M-3000,2580 H11000" stroke="#B98B4E" stroke-width="14"/>
 <g id="rsDash">${Array.from({length:9},(_,i)=>[1990,2130,2270,2410].map(y=>`<rect x="${i*300-300}" y="${y-6}" width="150" height="12" rx="6" fill="#fff" opacity=".85"/>`).join('')).join('')}</g>
 <g id="rsFence">${Array.from({length:9},(_,i)=>`<g transform="translate(${i*600-600},1740)"><rect x="-10" y="-150" width="20" height="150" rx="6" fill="#B4733A" ${sw(5)}/><path d="M-20,-90 H620 M-20,-130 H620" stroke="#D79A55" stroke-width="12" stroke-linecap="round"/><path d="M0,-150 Q150,-100 300,-150" fill="none" stroke="#5b4a3c" stroke-width="5"/>${[0,1,2].map(k=>`<path transform="translate(${50+k*100},-140)" d="M0,0 L60,0 L30,50Z" fill="${SPC[(i*3+k)%6]}" ${sw(4)}/>`).join('')}</g>`).join('')}</g>
 <g id="rsLand"></g>
</g>`;
const START_HTML=`<g id="startW" opacity="0"><g id="startG">
 <rect x="-34" y="1740" width="68" height="840" fill="#fff" ${sw(0)}/>${Array.from({length:28},(_,r)=>[0,1].map(c=>((r+c)%2?`<rect x="${-34+c*34}" y="${1740+r*30}" width="34" height="30" fill="${OL}"/>`:'')).join('')).join('')}
 <path d="M-34,1740 V2580 M34,1740 V2580" stroke="${OL}" stroke-width="6"/>
 <rect x="-14" y="1030" width="28" height="710" rx="8" fill="#B4733A" ${sw(7)}/>
 <rect x="-235" y="800" width="470" height="236" rx="30" fill="#FF5F5F" ${sw(9)}/><text x="0" y="888" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="86" fill="#fff" stroke="${OL}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">START</text>
 <rect x="-190" y="912" width="380" height="96" rx="40" fill="#2b2f45" ${sw(7)}/><circle id="ltA" cx="-110" cy="960" r="30" fill="#5a2a2a"/><circle id="ltB" cx="0" cy="960" r="30" fill="#5a2a2a"/><circle id="ltC" cx="110" cy="960" r="30" fill="#2a4a2f"/>
</g></g>`;
// the Golden Pan: the prize (also cooks the giant pancakes in #35)
const GP_HTML=`<g id="gpanW" opacity="0"><g id="gpan">
 <ellipse cx="0" cy="150" rx="140" ry="20" fill="rgba(60,30,10,.22)"/>
 <circle r="210" fill="url(#gEggGlow)" opacity=".8"/>
 <path d="M96,-6 L270,-38 Q292,-42 292,-18 Q292,2 270,6 L100,34Z" fill="#E0A52E" ${sw(7)}/><path d="M120,-2 L262,-28" stroke="#FFF3B0" stroke-width="8" stroke-linecap="round" opacity=".8"/>
 <ellipse cx="0" cy="12" rx="152" ry="62" fill="#C98A1E" ${sw(8)}/><ellipse cx="0" cy="-2" rx="126" ry="48" fill="#FFD84A" ${sw(5)}/>
 <path d="M-86,-14 Q-40,-40 20,-34" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".75"/>
 <circle cx="-70" cy="8" r="6" fill="#fff" opacity=".7"/><circle cx="-44" cy="20" r="4" fill="#fff" opacity=".6"/>
</g></g>`;
const SPD_HTML=`<g id="spdW" opacity="0">${[1830,1930,2020,2120,2230,2330,2430,2540].map((y,i)=>`<rect class="spl" x="${300+(i*337)%1200}" y="${y}" width="${230+(i%3)*90}" height="9" rx="4" fill="#fff" opacity=".6"/>`).join('')}</g>`;
/* ================= episode 32 additions: the syrup river (a ground object across the road), a slippery puddle, a falling syrup glob ================= */
const RIVW=500;
const SRV_HTML=`<g id="syrupR" opacity="0"><g id="syrupI">
 <path d="M0,1440 ${Array.from({length:22},(_,i)=>`Q${(i%2?-26:30)},${1440+i*100+50} 0,${1440+(i+1)*100}`).join(' ')} L${RIVW},${1440+22*100} ${Array.from({length:22},(_,i)=>`Q${RIVW+(i%2?30:-28)},${1440+(22-i)*100-50} ${RIVW},${1440+(21-i)*100}`).join(' ')}Z" fill="#C26A14" ${sw(8)}/>
 <path d="M70,1440 ${Array.from({length:21},(_,i)=>`Q${70+(i%2?-14:16)},${1440+i*104+52} 70,${1440+(i+1)*104}`).join(' ')} L${RIVW-70},${1440+21*104} ${Array.from({length:21},(_,i)=>`Q${RIVW-70+(i%2?16:-14)},${1440+(21-i)*104-52} ${RIVW-70},${1440+(20-i)*104}`).join(' ')}Z" fill="#E08A1F"/>
 <g class="sfl">${Array.from({length:14},(_,i)=>`<path d="M${90+(i*97)%320},${1480+i*150} q40,-40 90,0" fill="none" stroke="#FFD27A" stroke-width="14" stroke-linecap="round" opacity=".85"/><ellipse cx="${120+(i*131)%280}" cy="${1560+i*150}" rx="34" ry="10" fill="#fff" opacity=".4"/>`).join('')}</g>
 <g class="sfl" transform="translate(0,75)">${Array.from({length:14},(_,i)=>`<path d="M${60+(i*83)%360},${1480+i*150} q30,-30 70,0" fill="none" stroke="#F3B867" stroke-width="9" stroke-linecap="round" opacity=".7"/>`).join('')}</g>
 ${Array.from({length:9},(_,i)=>`<circle cx="${70+(i*173)%360}" cy="${1700+i*210}" r="${12+(i%3)*6}" fill="#FFC15A" ${sw(4)}/><circle cx="${64+(i*173)%360}" cy="${1694+i*210}" r="4" fill="#fff" opacity=".9"/>`).join('')}
</g></g>`;
const SPL_HTML=`<g id="spillW" opacity="0"><g id="spill"><ellipse cx="0" cy="0" rx="330" ry="150" fill="#C26A14" ${sw(8)}/><ellipse cx="-30" cy="-12" rx="250" ry="100" fill="#E08A1F"/><ellipse cx="-90" cy="-40" rx="110" ry="28" fill="#FFE2A0" opacity=".9"/><circle cx="150" cy="30" r="26" fill="#FFC15A" ${sw(4)}/></g></g>`;
const SGL_HTML=`<g id="sglobW" opacity="0"><g id="sglob">
 <path d="M-120,0 Q-130,-110 0,-120 Q130,-110 120,0 Q130,50 70,56 Q50,110 20,56 Q-10,130 -40,56 Q-130,60 -120,0Z" fill="#C26A14" ${sw(7)}/>
 <path d="M-80,-30 Q-70,-84 -10,-90" fill="none" stroke="#F3B867" stroke-width="14" stroke-linecap="round" opacity=".85"/>
 <g id="sgdrips" fill="#C26A14"><circle cx="-40" cy="150" r="20"/><circle cx="20" cy="190" r="24"/><circle cx="76" cy="140" r="18"/></g>
</g></g>`;
/* ================= episode 33 additions: a loose pancake wheel that rolls along the road, a POP! starburst, Zap's wrench ================= */
const WHL_HTML=`<g id="whlW" opacity="0"><g id="whl">
 <ellipse cx="0" cy="62" rx="70" ry="12" fill="rgba(60,30,10,.22)" transform="translate(0,0)"/>
 <g id="whlR"><circle r="70" fill="#E9A64F" ${sw(8)}/><circle r="52" fill="#F6C777"/><rect x="10" y="-34" width="38" height="24" rx="6" fill="#FFE79A" ${sw(4)}/><path d="M-52,10 Q-34,46 10,52" fill="none" stroke="#B8571D" stroke-width="11" stroke-linecap="round"/></g>
</g></g>`;
const POP_HTML=`<g id="popW" opacity="0"><g id="pop">
 <path d="M0,-150 L34,-62 L128,-92 L70,-12 L156,40 L56,48 L74,142 L6,78 L-62,146 L-52,52 L-150,64 L-82,-6 L-138,-84 L-40,-62Z" fill="#FFE14D" ${sw(9)}/>
 <path d="M0,-96 L22,-40 L82,-58 L46,-8 L100,26 L36,30 L48,90 L4,50 L-40,92 L-34,32 L-96,40 L-52,-4 L-86,-54 L-26,-40Z" fill="#FF8A2B"/>
 <text x="0" y="22" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="76" fill="#fff" stroke="${OL}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">POP!</text>
</g></g>`;
const WRN_HTML=`<g id="wrnW" opacity="0"><g id="wrn">
 <path d="M-12,40 L-12,-90 Q-48,-100 -44,-140 Q-40,-170 -14,-178 L-18,-146 L10,-146 L6,-178 Q32,-170 36,-140 Q40,-100 4,-90 L4,40Z" fill="#B8BFCC" ${sw(7)}/>
 <path d="M-4,30 L-4,-80" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>
</g></g>`;
/* ================= episode 34 additions: the tunnel (a side-on cross-section of a cliff: rock with a dark road tunnel cut through it), pink light from Pebble, a far-away sunshine light ================= */
// the tunnel is built per episode length: TUN_HTML(LEN) - local x 0 is the cliff's front edge, LEN is its back edge (the exit)
const TUN_HTML=(LEN)=>{const PT=(x0,x1,n,a,ph)=>Array.from({length:n+1},(_,i)=>[x0+(x1-x0)*i/n+Math.sin(i*1.7+ph)*a,(i/n)*4600]);const E=(pts)=>pts.map(([x,y])=>`L${x.toFixed(0)},${y.toFixed(0)}`).join(' ');
 const stal=Array.from({length:Math.ceil(LEN/260)},(_,i)=>`<path d="M${i*260+20},1480 L${i*260+90+(i%3)*18},${1560+(i%4)*36} L${i*260+160},1480Z" fill="#6D6359" ${sw(5)}/>`).join('');
 const blot=Array.from({length:Math.ceil(LEN/420)},(_,i)=>`<ellipse cx="${i*420+130}" cy="${900+(i*377)%500}" rx="${90+(i%4)*24}" ry="${46+(i%3)*14}" fill="#85796A"/><ellipse cx="${i*420+300}" cy="${2900+(i*251)%900}" rx="${110+(i%3)*28}" ry="${52+(i%4)*10}" fill="#85796A"/><path d="M${i*420+60},${1200+(i*131)%240} l30,60 l-20,50" fill="none" stroke="#6D6359" stroke-width="8" stroke-linecap="round"/>`).join('');
 return `<g id="tunW"><g id="tunI">
 <path d="M0,0 ${E(PT(10,30,23,26,0))} ${E(PT(LEN-8,LEN+14,23,24,2).reverse())} Z" fill="#9B8F7E" ${sw(9)}/>
 <g>${blot}</g>
 <rect x="0" y="1480" width="${LEN}" height="1180" fill="#2a2540"/>
 <rect x="0" y="1480" width="${LEN}" height="1180" fill="url(#pTunBand)"/>
 <rect x="0" y="1740" width="${LEN}" height="840" fill="#8B7A5E"/>
 <rect x="0" y="1740" width="${LEN}" height="840" fill="url(#pTunDash)"/>
 <path d="M0,1740 H${LEN} M0,2580 H${LEN}" stroke="#5E5240" stroke-width="12"/>
 <g>${stal}</g>
 <path d="M0,1480 H${LEN} M0,2660 H${LEN}" stroke="${OL}" stroke-width="10"/>
</g></g>`;};
const TUN_DEFS=`<defs>
 <pattern id="pTunDash" width="300" height="840" patternUnits="userSpaceOnUse" patternTransform="translate(0,1740)">${[250,390,530,670].map(y=>`<rect x="0" y="${y-6}" width="150" height="12" rx="6" fill="#fff" opacity=".8"/>`).join('')}</pattern>
 <pattern id="pTunBand" width="420" height="1180" patternUnits="userSpaceOnUse" patternTransform="translate(0,1480)"><ellipse cx="90" cy="120" rx="60" ry="24" fill="#3a3355"/><ellipse cx="300" cy="460" rx="80" ry="30" fill="#352f4d"/><ellipse cx="200" cy="1060" rx="70" ry="26" fill="#3a3355"/></pattern>
 <radialGradient id="gPinkGlow"><stop offset="0" stop-color="#FFE3F4" stop-opacity=".62"/><stop offset=".35" stop-color="#FF9BD0" stop-opacity=".3"/><stop offset="1" stop-color="#FF7BC0" stop-opacity="0"/></radialGradient>
 <radialGradient id="gSunGlow"><stop offset="0" stop-color="#FFFFFF" stop-opacity="1"/><stop offset=".4" stop-color="#FFF3B0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE14D" stop-opacity="0"/></radialGradient>
</defs>`;
const PGL_HTML=`<g id="pglW" opacity="0"><circle r="620" fill="url(#gPinkGlow)"/></g>`;
const EXG_HTML=`<g id="exgW" opacity="0"><circle r="360" fill="url(#gSunGlow)"/></g>`;
/* ================= episode 35 additions (Season 7 finale): the FINISH gantry (green board + checkered line, a ground object) and a "PHOTO FINISH!" stamp ================= */
const FIN_HTML=`<g id="finW"><g id="finG">
 <g transform="translate(0,1740) skewX(-35.5) translate(0,-1740)"><rect x="-34" y="1740" width="68" height="840" fill="#fff"/>${Array.from({length:28},(_,r)=>[0,1].map(c=>((r+c)%2?`<rect x="${-34+c*34}" y="${1740+r*30}" width="34" height="30" fill="${OL}"/>`:'')).join('')).join('')}
 <path d="M-34,1740 V2580 M34,1740 V2580" stroke="${OL}" stroke-width="6"/></g>
 <rect x="-14" y="1030" width="28" height="710" rx="8" fill="#B4733A" ${sw(7)}/>
 <rect x="-250" y="800" width="500" height="236" rx="30" fill="#2EBE85" ${sw(9)}/>
 ${Array.from({length:10},(_,i)=>`<rect x="${-236+i*47}" y="814" width="47" height="30" fill="${i%2?'#fff':OL}"/><rect x="${-236+i*47}" y="844" width="47" height="30" fill="${i%2?OL:'#fff'}"/>`).join('')}
 <rect x="-250" y="800" width="500" height="236" rx="30" fill="none" ${sw(9)}/>
 <text x="0" y="990" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="104" fill="#fff" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">FINISH</text>
</g></g>`;
const PHO_HTML=`<g id="phoW" opacity="0"><g id="pho">
 <rect x="-380" y="-92" width="760" height="184" rx="26" fill="#fff" ${sw(9)}/><rect x="-356" y="-70" width="712" height="140" rx="14" fill="#FFE14D"/>
 <text x="0" y="30" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="${OL}">PHOTO FINISH!</text>
 <path d="M-340,-60 l24,-24 M340,-60 l-24,-24 M-340,60 l24,24 M340,60 l-24,24" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>
</g></g>`;
/* ================= episode 36 additions (Season 8, "The Map in the Pan"): the treasure map that rises out of the Golden Pan, the pancake boat (three stacked pancakes, mast, sail, flag),
   a thought bubble for the boat idea. BOAT_HTML(p) makes one boat with the ids p+'W' (positioned wrapper), p (inner), pS0..pS2 (slabs), pMast, pSail, pFlag, pBut ================= */
const BOAT_HTML=(p,op=0,shadow=true)=>{
 const slab=(k,R,cy)=>{const ry=Math.round(R*.33);
  return `<g id="${p}S${k}"><ellipse cx="0" cy="${cy+64}" rx="${R}" ry="${ry}" fill="#C7801F" ${sw(8)}/><rect x="${-R}" y="${cy}" width="${2*R}" height="64" fill="#D9902F"/>
  <path d="M${-R},${cy} V${cy+64} M${R},${cy} V${cy+64}" stroke="${OL}" stroke-width="8" fill="none"/>
  <path d="M${-R*.72},${cy+30} Q0,${cy+ry*.9} ${R*.72},${cy+30}" fill="none" stroke="#B8701A" stroke-width="7" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="0" cy="${cy}" rx="${R}" ry="${ry}" fill="#F6C777" ${sw(8)}/><ellipse cx="0" cy="${cy+4}" rx="${Math.round(R*.8)}" ry="${Math.round(ry*.78)}" fill="#EDB04A" opacity=".75"/></g>`;};
 const drips=[-600,-390,-140,150,410,640].map((x,i)=>{const y=Math.round(Math.sqrt(1-(x/900)**2)*297);return `<path d="M${x-24},${y-6} q-4,${44+(i%3)*18} 24,${52+(i%2)*16} q30,-8 24,-${52+(i%2)*16} z" fill="#B35A12" ${sw(5)}/>`;}).join('');
 return `<g id="${p}W" opacity="${op}"><g id="${p}">
  ${shadow?`<ellipse cx="0" cy="330" rx="760" ry="150" fill="rgba(60,30,10,.22)"/>`:''}
  ${slab(0,640,128)}${slab(1,780,64)}${slab(2,900,0)}
  <g id="${p}Dr">${drips}</g>
  <path d="M-330,-8 Q-140,-86 70,-34 T420,-26" fill="none" stroke="#B35A12" stroke-width="20" stroke-linecap="round" opacity=".9"/>
  <g id="${p}But"><rect x="-210" y="-70" width="150" height="74" rx="16" fill="#FFE98A" ${sw(6)}/><path d="M-190,-52 L-110,-52" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".85"/></g>
  <g id="${p}Mast"><rect x="-17" y="-980" width="34" height="1000" rx="12" fill="#B4733A" ${sw(7)}/><path d="M-4,-960 V10" stroke="#D79A55" stroke-width="7" stroke-linecap="round"/></g>
  <g id="${p}Sail"><path d="M18,-940 Q440,-880 452,-520 Q440,-330 18,-296Z" fill="#FFF6DC" ${sw(8)}/><path d="M18,-760 Q250,-740 330,-700 M18,-560 Q250,-560 380,-520" fill="none" stroke="#E7D3A4" stroke-width="7" stroke-linecap="round"/>
   <g transform="translate(236,-612)"><ellipse cx="0" cy="40" rx="92" ry="26" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="12" rx="86" ry="24" fill="#F6C777" ${sw(6)}/><ellipse cx="0" cy="-16" rx="80" ry="22" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="-40" rx="76" ry="21" fill="#F6C777" ${sw(6)}/><rect x="-26" y="-62" width="52" height="26" rx="8" fill="#FFE98A" ${sw(5)}/></g></g>
  <g id="${p}Flag"><path d="M18,-1020 L236,-974 L18,-928Z" fill="#FF5F5F" ${sw(7)}/><circle cx="80" cy="-974" r="14" fill="#fff"/></g>
 </g></g>`;};

const MAP_HTML=(()=>{
 const P=[[-340,150],[-190,-70],[30,250],[250,-40]];                       // the dotted path: a bezier from our island to the X
 const B=(t)=>{const u=1-t;return [0,1].map(k=>u*u*u*P[0][k]+3*u*u*t*P[1][k]+3*u*t*t*P[2][k]+t*t*t*P[3][k]);};
 const dots=Array.from({length:15},(_,i)=>{const [x,y]=B(i/14*.94+.02);return `<circle id="mdot${i}" class="mdot" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="11" fill="#C0392B" ${sw(3)} opacity="0"/>`;}).join('');
 const waves=[[-180,-230],[-20,-250],[120,-210],[-250,-60],[-60,-110],[-420,40],[-130,300],[60,320],[420,230],[190,150],[-440,-120],[430,-250],[340,60]].map(([x,y])=>`<path d="M${x},${y} q14,-16 28,0 t28,0 t28,0" fill="none" stroke="#7FB5D9" stroke-width="8" stroke-linecap="round"/>`).join('');
 return `<g id="mapW" opacity="0"><g id="map">
 <ellipse cx="0" cy="388" rx="460" ry="30" fill="rgba(60,30,10,.2)"/>
 <g id="mapSc">
  <rect x="-500" y="-350" width="1000" height="700" rx="46" fill="#F4DFAA" ${sw(10)}/>
  <ellipse cx="-300" cy="-230" rx="130" ry="74" fill="#E3C27A" opacity=".45"/><ellipse cx="330" cy="260" rx="150" ry="80" fill="#E3C27A" opacity=".4"/>
  <rect x="-470" y="-320" width="940" height="640" rx="30" fill="none" stroke="#C99A4A" stroke-width="6" stroke-dasharray="26 16"/>
  ${waves}
  <g transform="translate(-340,170)"><ellipse rx="140" ry="74" fill="#F2D58A" ${sw(7)}/><ellipse cy="-8" rx="112" ry="54" fill="#7FD38A"/>
   <g transform="translate(-10,-30)"><ellipse cx="0" cy="20" rx="44" ry="13" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="4" rx="40" ry="12" fill="#F6C777" ${sw(5)}/><ellipse cx="0" cy="-12" rx="36" ry="11" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="-26" rx="32" ry="10" fill="#F6C777" ${sw(5)}/></g></g>
  <g id="mapIsl" transform="translate(300,-80)"><ellipse rx="230" ry="132" fill="#F2D58A" ${sw(8)}/><ellipse cy="-10" rx="196" ry="100" fill="#7FD38A"/>
   <path d="M-110,10 L-30,-110 L40,-30 L90,-90 L160,10Z" fill="#9AA0A6" ${sw(7)}/><path d="M-30,-110 L-6,-74 L-52,-70Z" fill="#fff"/>
   <g transform="translate(-150,30)"><rect x="-7" y="-64" width="14" height="64" rx="5" fill="#9A6A3A" ${sw(4)}/><path d="M0,-64 Q-50,-92 -70,-56 M0,-64 Q-6,-110 -44,-96 M0,-64 Q48,-100 74,-62 M0,-64 Q10,-112 52,-98" fill="none" stroke="#2EBE85" stroke-width="12" stroke-linecap="round"/></g>
   <g transform="translate(170,50)"><rect x="-7" y="-56" width="14" height="56" rx="5" fill="#9A6A3A" ${sw(4)}/><path d="M0,-56 Q-44,-82 -62,-50 M0,-56 Q4,-100 40,-88 M0,-56 Q42,-90 66,-54" fill="none" stroke="#2EBE85" stroke-width="11" stroke-linecap="round"/></g></g>
  <g id="mapDots">${dots}</g>
  <g id="mapX"><path class="mx1" d="M250,-120 L330,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="38" stroke-linecap="round" fill="none"/>
   <path class="mx2" d="M332,-120 L248,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="38" stroke-linecap="round" fill="none"/>
   <path class="mx1" d="M250,-120 L330,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="24" stroke-linecap="round" fill="none"/>
   <path class="mx2" d="M332,-120 L248,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="24" stroke-linecap="round" fill="none"/></g>
  <g transform="translate(-392,-256)"><circle r="64" fill="#FFF6DC" ${sw(6)}/><path d="M0,-52 L14,0 L0,52 L-14,0Z M-52,0 L0,-14 L52,0 L0,14Z" fill="#C0392B" ${sw(4)}/><circle r="9" fill="#fff" ${sw(3)}/></g>
 </g></g></g>`;})();

// thought bubble with the little boat inside (Truffle's idea)
const TH_HTML=`<g id="thW" opacity="0"><g id="th">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="60" cy="-62" rx="160" ry="116" fill="#fff" ${sw(6)}/>
 <g transform="translate(58,-8) scale(.15)">${BOAT_HTML('bb',1,false)}</g>
</g></g>`;
/* ================= episode 37 additions (Season 8, "Rough Seas"): the open sea (sky, sun, drifting clouds, 16 wave rows that scroll, foam ring), the big pancake boat with two oars,
   a far-away island that grows at the end, gusts of wind, water spray, the snack crate (Rocky hides in it) and an "ACHOO!" pop ================= */
const SEA_ROWS=[[1250,.4],[1300,.45],[1360,.5],[1430,.55],[1510,.6],[1600,.68],[1700,.76],[1810,.84],[1930,.92],[2060,1],[2200,1.06],[2350,1.12],[2520,1.2],[2710,1.28],[2920,1.36],[3150,1.45]];
const PALM=(x,y,s,r=0)=>`<g transform="translate(${x},${y}) scale(${s}) rotate(${r})"><path d="M0,0 Q18,-90 6,-190" fill="none" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M0,0 Q18,-90 6,-190" fill="none" stroke="#9A6A3A" stroke-width="18" stroke-linecap="round"/>
 <g transform="translate(6,-190)">${[-70,-35,0,35,70].map(a=>`<path d="M0,0 Q${Math.sin(a/57)*120+Math.sign(a||1)*30},-70 ${Math.sin(a/57)*190},${40-Math.abs(a)*.2}" fill="none" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M0,0 Q${Math.sin(a/57)*120+Math.sign(a||1)*30},-70 ${Math.sin(a/57)*190},${40-Math.abs(a)*.2}" fill="none" stroke="#2EBE85" stroke-width="18" stroke-linecap="round"/>`).join('')}<circle cx="-14" cy="14" r="14" fill="#7A3E1D" ${sw(4)}/><circle cx="16" cy="18" r="14" fill="#7A3E1D" ${sw(4)}/></g></g>`;
const ISLE_HTML=`<g id="isleW" opacity="0"><g id="isle">
 <ellipse cx="0" cy="40" rx="440" ry="74" fill="#F2D58A" ${sw(7)}/>
 <path d="M-330,34 Q-180,-190 40,-70 Q170,-250 330,34Z" fill="#59C27A" ${sw(7)}/><path d="M-120,-40 Q-60,-120 20,-96" fill="none" stroke="#7FD38A" stroke-width="16" stroke-linecap="round"/>
 ${PALM(-300,40,1.0,-4)}${PALM(250,44,.9,5)}${PALM(330,36,.62,12)}
 <g transform="translate(-20,-168)"><rect x="-5" y="-110" width="10" height="120" rx="4" fill="#9A6A3A" ${sw(4)}/><path d="M5,-108 L110,-80 L5,-52Z" fill="#FF5F5F" ${sw(5)}/></g>
</g></g>`;
const SEA_HTML=`<g id="seaSet" opacity="0">
 <defs><linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A6EBF7"/><stop offset=".1" stop-color="#52C6EC"/><stop offset="1" stop-color="#1B6FB6"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4580" fill="url(#gSkyDay)"/>
 <g transform="translate(2350,-260)"><circle r="190" fill="#FFF3B0" opacity=".45"/><circle r="120" fill="#FFE14D" ${sw(6)}/></g>
 <g id="seaClouds">${Array.from({length:6},(_,i)=>{const x=i*2400;return [[300,160,1.0],[1400,-140,1.3],[2000,520,.9]].map(([cx,cy,s])=>`<g transform="translate(${x+cx-2400},${cy}) scale(${s})"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g>`).join('');}).join('')}</g>
 <rect x="-3000" y="1180" width="14000" height="3200" fill="url(#gSea)"/>
 <path d="M-3000,1180 H11000" stroke="${OL}" stroke-width="8"/>
 ${ISLE_HTML}
 ${SEA_ROWS.map(([y,s],i)=>`<g id="swr${i}">${Array.from({length:11},(_,k)=>`<path transform="translate(${k*400-400+(i%2)*200},${y})" d="M0,0 Q100,${-34*s} 200,0 T400,0" fill="none" stroke="${i%3?'#E9FAFF':'#BDEBFA'}" stroke-width="${Math.round(7+s*4)}" stroke-linecap="round" opacity=".8"/>`).join('')}</g>`).join('')}
 <g id="foam"><ellipse cx="1300" cy="2215" rx="1010" ry="200" fill="#fff" opacity=".6"/><ellipse cx="1300" cy="2230" rx="930" ry="160" fill="#BDEBFA" opacity=".85"/></g>
 ${BOAT_HTML('bg',1,false)}
 <g transform="translate(520,1905)"><g id="oarL"><path d="M0,0 L-340,215" stroke="${OL}" stroke-width="28" stroke-linecap="round"/><path d="M0,0 L-340,215" stroke="#B4733A" stroke-width="15" stroke-linecap="round"/><ellipse cx="-372" cy="236" rx="70" ry="26" transform="rotate(32 -372 236)" fill="#D79A55" ${sw(7)}/></g></g>
 <g transform="translate(2080,1905)"><g id="oarR"><path d="M0,0 L340,215" stroke="${OL}" stroke-width="28" stroke-linecap="round"/><path d="M0,0 L340,215" stroke="#B4733A" stroke-width="15" stroke-linecap="round"/><ellipse cx="372" cy="236" rx="70" ry="26" transform="rotate(-32 372 236)" fill="#D79A55" ${sw(7)}/></g></g>
</g>`;
const WND_HTML=`<g id="wndW" opacity="0">${Array.from({length:8},(_,i)=>`<g transform="translate(-300,${900+i*115})"><path class="gust" d="M0,0 q70,-38 140,0 t140,0 t140,0 t140,0" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" opacity="0"/></g>`).join('')}</g>`;
const WSP_HTML=Array.from({length:3},(_,g)=>`<g id="wspW${g}" opacity="0">${Array.from({length:7},(_,k)=>`<circle id="wsp${g}_${k}" cx="0" cy="0" r="${13+(k%3)*5}" fill="#EAFBFF" ${sw(4)} opacity="0"/>`).join('')}</g>`).join('');
const SNK_HTML=`<g id="snkW" opacity="0"><g id="snk">
 <ellipse cx="0" cy="8" rx="200" ry="26" fill="rgba(40,70,100,.25)"/>
 <rect x="-150" y="-212" width="300" height="214" rx="14" fill="#C98A4B" ${sw(8)}/>
 <path d="M-150,-142 H150 M-150,-72 H150" stroke="${OL}" stroke-width="7"/><path d="M-108,-206 V-6 M108,-206 V-6" stroke="#A56D35" stroke-width="12"/>
 <g transform="translate(0,-108)"><ellipse cx="0" cy="18" rx="62" ry="17" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="2" rx="58" ry="16" fill="#F6C777" ${sw(5)}/><ellipse cx="0" cy="-14" rx="54" ry="15" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="-28" rx="50" ry="14" fill="#F6C777" ${sw(5)}/></g>
 <g id="snkLid"><rect x="-166" y="-246" width="332" height="40" rx="12" fill="#D79A55" ${sw(8)}/><path d="M-130,-234 H130" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".5"/></g>
</g></g>`;
const ACH_HTML=`<g id="achW" opacity="0"><g id="ach"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="150" fill="#FFE14D" stroke="${OL}" stroke-width="20" paint-order="stroke" stroke-linejoin="round">ACHOO!</text></g></g>`;
/* ================= episode 38 additions (Season 8, "The Riddle Gate"): a jungle trail set (canopy, trees, dirt path, a cliff edge far on the right), the giant riddle gate with a sign
   and two swinging doors, pancake trees, a leafy bush that hides the secret path, a cheese thought bubble and a falling pancake ================= */
const JTREE=(x,y,s,c1,c2)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,0 Q-26,-200 -16,-420 L18,-420 Q28,-200 34,0Z" fill="#8A5A2B" ${sw(8)}/><path d="M-4,-40 Q0,-200 6,-400" fill="none" stroke="#A8743A" stroke-width="10" stroke-linecap="round" opacity=".7"/>
 <circle cx="0" cy="-520" r="190" fill="${c1}" ${sw(9)}/><circle cx="-130" cy="-440" r="120" fill="${c2}" ${sw(7)}/><circle cx="140" cy="-450" r="125" fill="${c2}" ${sw(7)}/><circle cx="-40" cy="-600" r="100" fill="${c2}" ${sw(6)}/>
 <path d="M-90,-380 q-12,60 6,110 M70,-370 q10,70 -4,130" fill="none" stroke="#2E8B57" stroke-width="12" stroke-linecap="round"/></g>`;
const JUN_HTML=`<g id="junSet" opacity="0">
 <defs><linearGradient id="gJun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#59C9B5"/><stop offset=".55" stop-color="#B7EBC4"/><stop offset="1" stop-color="#EAF9D0"/></linearGradient>
 <linearGradient id="gChasm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A7F0"/><stop offset=".35" stop-color="#7C5BC0"/><stop offset="1" stop-color="#2C1E5E"/></linearGradient>
 <linearGradient id="gGate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3B0"/><stop offset="1" stop-color="#8FE0A0"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gJun)"/>
 <path d="M-1800,1500 Q-1200,1000 -600,1250 Q0,800 700,1220 Q1300,880 1900,1200 Q2500,860 3200,1240 Q3700,1000 4400,1450Z" fill="#2E9E6B" ${sw(7)}/>
 <path d="M-1800,1500 Q-1000,1160 -300,1330 Q400,1040 1100,1320 Q1700,1100 2400,1310 Q3000,1090 3600,1340 Q4000,1180 4400,1500Z" fill="#3FAF6A" ${sw(7)}/>
 ${[-900,-300,300,820,1780,2300,2900,3500].map((x,i)=>JTREE(x,1470,.62+(i%3)*.1,'#2F9E63','#3FB878')).join('')}
 <rect x="-3000" y="1400" width="14000" height="2600" fill="#6CC656" stroke="${OL}" stroke-width="8"/>
 <path d="M880,2900 L1160,1440 L1440,1440 L1720,2900Z" fill="#E9C98F" ${sw(8)}/><path d="M1000,2500 L1190,1500 M1600,2500 L1410,1500" fill="none" stroke="#D2AC6C" stroke-width="10" stroke-linecap="round"/>
 <path d="M1700,1700 Q2100,1650 2400,1760 Q2650,1840 2790,1800 L2790,1900 Q2650,1950 2400,1880 Q2100,1780 1740,1800Z" fill="#E9C98F" ${sw(8)}/>
 ${Array.from({length:30},(_,i)=>{const x=-200+rnd(i,81)*2900,y=1500+rnd(i,82)*1100;return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><path d="M0,0 Q-10,-40 -26,-56 M0,0 Q4,-50 0,-70 M0,0 Q12,-40 28,-54" stroke="#2E9E55" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;}).join('')}
 <g id="junCliff"><rect x="2790" y="1400" width="12000" height="2600" fill="url(#gChasm)"/><path d="M2790,1400 L2790,3800" stroke="${OL}" stroke-width="10"/><path d="M2790,1420 Q2830,1460 2800,1520 Q2840,1600 2800,1700 Q2840,1800 2796,1900 Q2830,2000 2796,2100 L2790,2100Z" fill="#B4733A" ${sw(8)}/>
  <path d="M3700,1900 L3760,1500 L3900,1560 L3960,1420 L4300,1440 L4400,1900Z" fill="#E8A05A" ${sw(8)}/><ellipse cx="3400" cy="2400" rx="900" ry="120" fill="#fff" opacity=".28"/><ellipse cx="3000" cy="2900" rx="700" ry="90" fill="#fff" opacity=".22"/></g>
 <g id="junTop"><path d="M-1800,-400 L-1800,220 Q-1500,320 -1200,160 Q-900,360 -600,180 Q-300,380 0,160 Q300,360 600,200 Q900,380 1200,170 Q1500,360 1800,190 Q2100,360 2400,170 Q2700,340 3000,190 L3000,-400Z" fill="#1F7A4D" ${sw(8)}/>
  ${[-1400,-800,-100,500,1150,1750,2350].map((x,i)=>`<path d="M${x},200 q${i%2?-20:20},120 0,${200+(i%3)*60}" fill="none" stroke="#2EBE85" stroke-width="16" stroke-linecap="round"/>`).join('')}</g>
</g>`;
const GATE_HTML=`<g id="gateW" opacity="0"><g id="gate">
 <ellipse cx="0" cy="12" rx="560" ry="42" fill="rgba(30,60,30,.3)"/>
 <rect id="gtOpen" x="-310" y="-700" width="620" height="700" fill="url(#gGate)" opacity="0"/>
 <g id="gtL"><rect x="-310" y="-700" width="310" height="700" rx="10" fill="#B4733A" ${sw(8)}/><path d="M-210,-690 V-6 M-110,-690 V-6" stroke="#8A5A2B" stroke-width="8"/><path d="M-310,-520 H0 M-310,-180 H0" stroke="#5B5F6B" stroke-width="16"/>
  <path d="M0,-470 A130,130 0 0 0 0,-210Z" fill="#F6C777" ${sw(8)}/><path d="M-40,-420 Q-70,-390 -40,-360" fill="none" stroke="#FFF3B0" stroke-width="12" stroke-linecap="round"/><circle cx="-26" cy="-300" r="12" fill="#5B5F6B"/></g>
 <g id="gtR"><rect x="0" y="-700" width="310" height="700" rx="10" fill="#B4733A" ${sw(8)}/><path d="M110,-690 V-6 M210,-690 V-6" stroke="#8A5A2B" stroke-width="8"/><path d="M0,-520 H310 M0,-180 H310" stroke="#5B5F6B" stroke-width="16"/>
  <path d="M0,-470 A130,130 0 0 1 0,-210Z" fill="#F6C777" ${sw(8)}/><circle cx="26" cy="-300" r="12" fill="#5B5F6B"/></g>
 <rect x="-400" y="-880" width="110" height="880" rx="22" fill="#A7ADB5" ${sw(9)}/><rect x="290" y="-880" width="110" height="880" rx="22" fill="#A7ADB5" ${sw(9)}/>
 <path d="M-380,-700 H-310 M-380,-500 H-310 M-380,-300 H-310 M310,-700 H380 M310,-500 H380 M310,-300 H380" stroke="#7D838C" stroke-width="10" stroke-linecap="round"/>
 <rect x="-440" y="-960" width="190" height="90" rx="22" fill="#C3C8CF" ${sw(9)}/><rect x="250" y="-960" width="190" height="90" rx="22" fill="#C3C8CF" ${sw(9)}/>
 <rect x="-420" y="-860" width="840" height="150" rx="30" fill="#B4733A" ${sw(9)}/><path d="M-380,-800 H380 M-380,-760 H380" stroke="#8A5A2B" stroke-width="8" stroke-linecap="round" opacity=".6"/>
 <g id="gtSign"><path d="M-250,-870 L-250,-980 M250,-870 L250,-980" stroke="${OL}" stroke-width="10"/><rect x="-370" y="-1170" width="740" height="210" rx="34" fill="#FFF0C4" ${sw(10)}/><rect x="-346" y="-1146" width="692" height="162" rx="22" fill="none" stroke="#C99A4A" stroke-width="6" stroke-dasharray="20 12"/>
  <g font-family="Baloo2,sans-serif" font-weight="800" text-anchor="middle" fill="#6A3A12">
   <text id="sgR" x="-190" y="-1042" font-size="78">ROUND,</text><text id="sgG" x="130" y="-1042" font-size="78">GOLDEN,</text><text id="sgF" x="0" y="-974" font-size="78">AND FLIPPED!</text></g></g>
</g></g>`;
const PTREE=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-24" y="-300" width="48" height="300" rx="14" fill="#9A6A3A" ${sw(8)}/>
 <g transform="translate(0,-300)"><ellipse cx="0" cy="62" rx="190" ry="44" fill="#D9902F" ${sw(8)}/><ellipse cx="0" cy="14" rx="178" ry="42" fill="#F6C777" ${sw(8)}/><ellipse cx="0" cy="-34" rx="160" ry="38" fill="#D9902F" ${sw(8)}/><ellipse cx="0" cy="-80" rx="140" ry="34" fill="#F6C777" ${sw(8)}/><ellipse cx="0" cy="-118" rx="108" ry="28" fill="#D9902F" ${sw(8)}/>
  <rect x="-34" y="-176" width="68" height="46" rx="12" fill="#FFE98A" ${sw(6)}/><path d="M-150,-60 q-6,56 14,70 M-40,-80 q-6,60 12,82 M70,-70 q-5,50 11,64 M140,-30 q4,40 -8,52" fill="none" stroke="#B35A12" stroke-width="16" stroke-linecap="round"/></g></g>`;
const PTRI_HTML=`<g id="ptrIn" opacity="0">${[[1130,1520,.5],[1470,1520,.5],[1300,1480,.42]].map(([x,y,s])=>PTREE(x,y,s)).join('')}</g>`;
const PTRO_HTML=`<g id="ptrOut" opacity="0">${[[620,1560,.85],[880,1500,.6],[1740,1500,.6],[1980,1580,.95],[2330,1520,.7]].map(([x,y,s])=>PTREE(x,y,s)).join('')}</g>`;
const BUSH_HTML=`<g id="bushW" opacity="0"><g id="bush"><ellipse cx="0" cy="10" rx="230" ry="30" fill="rgba(30,60,30,.3)"/>
 <circle cx="0" cy="-130" r="140" fill="#2E9E55" ${sw(9)}/><circle cx="-130" cy="-90" r="100" fill="#3FB868" ${sw(8)}/><circle cx="130" cy="-90" r="105" fill="#3FB868" ${sw(8)}/><circle cx="-40" cy="-190" r="70" fill="#4BC979" ${sw(7)}/>
 <path d="M-90,-60 q-10,40 4,70 M60,-70 q10,40 -4,70" fill="none" stroke="#1F7A4D" stroke-width="12" stroke-linecap="round"/></g></g>`;
const CHB_HTML=`<g id="chbW" opacity="0"><g id="chb">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="60" cy="-62" rx="130" ry="92" fill="#fff" ${sw(6)}/>
 <path d="M-30,-40 L150,-70 Q160,-110 120,-120 L-26,-120Z" fill="#FFD84A" ${sw(6)}/><circle cx="20" cy="-82" r="12" fill="#E0A52E"/><circle cx="82" cy="-96" r="9" fill="#E0A52E"/><circle cx="60" cy="-62" r="7" fill="#E0A52E"/>
</g></g>`;
const FCK_HTML=`<g id="fckW" opacity="0"><g id="fck"><ellipse cx="0" cy="14" rx="70" ry="20" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="0" rx="66" ry="19" fill="#F6C777" ${sw(6)}/><rect x="-18" y="-24" width="36" height="22" rx="7" fill="#FFE98A" ${sw(4)}/></g></g>`;
/* ================= episode 39 additions (Season 8, "The Wobbly Bridge"): the canyon set (warm sky, far mesas, a chasm that widens towards the camera, fog), the rope bridge whose planks wobble,
   a syrup splat for the map, a big red X in the sand, a left arrow and the treasure chest (back half with the lid, front half with a pan-handle lock - the same chest is opened in #40) ================= */
const CHASM=(y)=>[1250-690*(y-1450)/2350,1650+690*(y-1450)/2350];            // x of the chasm's left and right rim at world y (a trapezoid, widening towards the camera)
const BRG={n:14,y0:1840,sag:44,x0:1136,x1:1764};
const BRY=(u)=>BRG.y0+BRG.sag*4*u*(1-u);                                         // deck height at u (0..1) along the bridge
const CAN_HTML=`<g id="canSet" opacity="0">
 <defs><linearGradient id="gCanSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".6" stop-color="#FFE0B0"/><stop offset="1" stop-color="#FFC58F"/></linearGradient>
 <linearGradient id="gCanChasm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7C7F5"/><stop offset=".3" stop-color="#8A64C9"/><stop offset="1" stop-color="#1F1348"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gCanSky)"/>
 <g transform="translate(2350,1000)"><circle r="260" fill="#FFF3B0" opacity=".4"/><circle r="130" fill="#FFE14D" ${sw(6)}/></g>
 <g id="canClouds">${[[300,100,1.0],[1500,-160,1.3],[2300,380,.9],[700,-600,1.2],[1900,-900,1.0]].map(([x,y,s])=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g>`).join('')}</g>
 <path d="M-1800,1460 L-1800,1180 L-1500,1180 L-1400,980 L-1000,980 L-900,1240 L-500,1240 L-420,1060 L0,1060 L120,1300 L300,1460Z" fill="#E8955A" ${sw(8)}/>
 <path d="M1300,1460 L1400,1120 L1760,1120 L1840,900 L2300,900 L2380,1160 L2780,1160 L2860,1000 L3300,1000 L3400,1300 L3700,1460Z" fill="#D9744A" ${sw(8)}/>
 <path d="M-300,1460 L-200,1250 L300,1250 L420,1110 L900,1110 L1000,1300 L1500,1300 L1580,1460Z" fill="#F0A66A" ${sw(8)}/>
 <path d="M2500,1460 L2600,1240 L3000,1240 L3100,1090 L3600,1090 L3700,1330 L4200,1330 L4300,1460Z" fill="#F0A66A" ${sw(8)}/>
 <rect x="-3000" y="1450" width="14000" height="2600" fill="#EBC58B" stroke="${OL}" stroke-width="8"/>
 ${Array.from({length:26},(_,i)=>{const x=-300+rnd(i,71)*3800,y=1480+rnd(i,72)*1300;return (x>1000&&x<2000)?'':`<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><path d="M0,0 Q-8,-30 -22,-40 M0,0 Q3,-38 0,-52 M0,0 Q10,-30 24,-38" stroke="#B98B4E" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;}).join('')}
 <path d="M${CHASM(1450)[0]},1450 L${CHASM(1450)[1]},1450 L${CHASM(3800)[1]},3800 L${CHASM(3800)[0]},3800Z" fill="url(#gCanChasm)" ${sw(10)}/>
 <path d="M${CHASM(1450)[0]},1450 L${CHASM(1450)[1]},1450 L${CHASM(1700)[1]},1700 L${CHASM(1700)[0]},1700Z" fill="#C2704A" ${sw(0)}/><path d="M${CHASM(1450)[0]},1560 H${CHASM(1450)[1]} M${CHASM(1450)[0]},1640 H${CHASM(1450)[1]}" stroke="#A55A3A" stroke-width="10" opacity=".7"/>
 <g id="canFog">${[[1450,1760,430,56],[1380,2000,520,70],[1500,2300,640,86],[1300,2700,760,100],[1650,3100,860,110]].map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".3"/>`).join('')}</g>
 <path d="M${CHASM(1450)[0]},1450 L${CHASM(3800)[0]},3800 M${CHASM(1450)[1]},1450 L${CHASM(3800)[1]},3800" stroke="${OL}" stroke-width="14" stroke-linecap="round"/>
 <path d="M${CHASM(1460)[0]+16},1470 L${CHASM(3000)[0]+14},3000 M${CHASM(1460)[1]-16},1470 L${CHASM(3000)[1]-14},3000" stroke="#C98A4B" stroke-width="16" stroke-linecap="round" opacity=".8"/>
</g>`;
const BRIDGE_HTML=`<g id="brdgW" opacity="0"><g id="brdg">
 <path d="M${BRG.x0-36},1648 Q${(BRG.x0+BRG.x1)/2},${1648+BRG.sag*4+40} ${BRG.x1+36},1648" fill="none" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M${BRG.x0-36},1648 Q${(BRG.x0+BRG.x1)/2},${1648+BRG.sag*4+40} ${BRG.x1+36},1648" fill="none" stroke="#D79A55" stroke-width="8" stroke-linecap="round"/>
 ${Array.from({length:BRG.n},(_,i)=>{const u=(i+.5)/BRG.n,x=BRG.x0+(BRG.x1-BRG.x0)*u,y=BRY(u),ry=1648+(BRG.sag*4+40)*2*u*(1-u);return i%2?'':`<path d="M${x.toFixed(0)},${ry.toFixed(0)} L${x.toFixed(0)},${(y-70).toFixed(0)}" stroke="#D79A55" stroke-width="6" opacity=".9"/>`;}).join('')}
 <path d="M${BRG.x0-12},1900 Q${(BRG.x0+BRG.x1)/2},${1900+BRG.sag*4+60} ${BRG.x1+12},1900" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
 ${Array.from({length:BRG.n},(_,i)=>{const u=(i+.5)/BRG.n,x=BRG.x0+(BRG.x1-BRG.x0)*u,y=BRY(u),w=(BRG.x1-BRG.x0)/BRG.n;return `<g id="brp${i}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><g class="brpl"><rect x="${-w/2+2}" y="-74" width="${w-4}" height="74" rx="6" fill="${i%2?'#C98A4B':'#D79A55'}" ${sw(6)}/><rect x="${-w/2+2}" y="0" width="${w-4}" height="22" rx="5" fill="#8A5A2B" ${sw(6)}/></g></g>`;}).join('')}
 <g><rect x="${BRG.x0-60}" y="1640" width="46" height="290" rx="12" fill="#8A5A2B" ${sw(8)}/><rect x="${BRG.x1+14}" y="1640" width="46" height="290" rx="12" fill="#8A5A2B" ${sw(8)}/></g>
</g></g>`;
const SPLAT_HTML=(()=>{const pts=(n,r1,r2,rot)=>Array.from({length:n*2},(_,i)=>{const a=rot+i/(n*2)*Math.PI*2,r=(i%2?r1:r2)*(1+.1*Math.sin(i*2.7));return `${(Math.cos(a)*r*1.1).toFixed(0)},${(Math.sin(a)*r*.85).toFixed(0)}`;}).join(' ');
 return `<g id="msplat" opacity="0"><g transform="translate(110,10)">
  <path d="M-60,150 q-6,90 16,120 M70,170 q4,100 -12,130 M190,130 q8,70 -6,100" fill="none" stroke="${OL}" stroke-width="44" stroke-linecap="round"/><path d="M-60,150 q-6,90 16,120 M70,170 q4,100 -12,130 M190,130 q8,70 -6,100" fill="none" stroke="#C9741A" stroke-width="28" stroke-linecap="round"/>
  <polygon points="${pts(9,120,250,.2)}" fill="#C9741A" ${sw(14)}/><polygon points="${pts(9,70,160,.2)}" fill="#E39A3A" stroke="none"/>
  <ellipse cx="-40" cy="-70" rx="62" ry="24" fill="#FFD27A" opacity=".75" transform="rotate(-20 -40 -70)"/><circle cx="-190" cy="-150" r="24" fill="#C9741A" ${sw(8)}/><circle cx="270" cy="-130" r="20" fill="#C9741A" ${sw(8)}/><circle cx="250" cy="150" r="16" fill="#C9741A" ${sw(8)}/>
 </g></g>`;})();
const SYR_HTML=`<g id="syrW" opacity="0"><g id="syr"><path d="M0,-70 C30,-20 44,6 0,34 C-44,6 -30,-20 0,-70Z" fill="#8A4A12" ${sw(7)}/><path d="M-10,-20 Q-16,0 -6,12" fill="none" stroke="#C97A2A" stroke-width="8" stroke-linecap="round"/></g></g>`;
const BIGX_HTML=`<g id="bigxW" opacity="0"><g id="bigx"><ellipse cx="0" cy="20" rx="190" ry="40" fill="rgba(120,70,20,.25)"/>
 <path class="bx1" d="M-130,-60 L130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="58" stroke-linecap="round" fill="none"/><path class="bx2" d="M130,-60 L-130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="58" stroke-linecap="round" fill="none"/>
 <path class="bx1" d="M-130,-60 L130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="40" stroke-linecap="round" fill="none"/><path class="bx2" d="M130,-60 L-130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="40" stroke-linecap="round" fill="none"/></g></g>`;
const LFT_HTML=`<g id="lftW" opacity="0"><g id="lft"><path d="M120,-40 L-60,-40 L-60,-90 L-190,0 L-60,90 L-60,40 L120,40Z" fill="#E8303A" ${sw(8)}/><path d="M80,-18 L-40,-18" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/></g></g>`;
// the treasure chest: back half (interior, glow, lid) + front half (box, gold bands, the pan-handle lock). Positioned by chBW / chFW (same x,y); Grandma sits between them in #40
const CHEST_HTML=`<g id="chBW" opacity="0"><g id="chB">
 <ellipse cx="0" cy="12" rx="290" ry="34" fill="rgba(120,70,20,.3)"/>
 <circle id="chGlow" cx="0" cy="-200" r="330" fill="url(#gEggGlow)" opacity="0"/>
 <rect x="-224" y="-300" width="448" height="120" rx="20" fill="#7A3E1D" ${sw(8)}/><rect x="-200" y="-282" width="400" height="90" rx="14" fill="#FFB347" opacity=".95"/>
 <g id="chLid"><path d="M-240,-206 Q-240,-330 0,-340 Q240,-330 240,-206Z" fill="#B4733A" ${sw(9)}/><path d="M-240,-206 H240" stroke="${OL}" stroke-width="9"/><path d="M-150,-300 Q-150,-250 -150,-212 M0,-336 V-212 M150,-300 Q150,-250 150,-212" stroke="#E0A52E" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M-190,-290 Q-120,-318 -40,-322" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".45"/></g>
</g></g>
<g id="chFW" opacity="0"><g id="chF">
 <rect x="-240" y="-210" width="480" height="212" rx="22" fill="#B4733A" ${sw(9)}/><path d="M-240,-140 H240 M-240,-70 H240" stroke="#8A5A2B" stroke-width="7" opacity=".8"/>
 <rect x="-240" y="-222" width="480" height="40" rx="14" fill="#E0A52E" ${sw(8)}/><rect x="-196" y="-210" width="44" height="212" rx="8" fill="#E0A52E" ${sw(7)}/><rect x="152" y="-210" width="44" height="212" rx="8" fill="#E0A52E" ${sw(7)}/>
 <g id="chLock"><rect x="-64" y="-190" width="128" height="130" rx="26" fill="#FFD84A" ${sw(9)}/><circle cx="0" cy="-138" r="25" fill="#3A2A18"/><path d="M-9,-120 H9 V-70 H-9Z" fill="#3A2A18"/><path d="M-30,-176 Q-16,-186 0,-186" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/></g>
 <circle cx="-210" cy="-196" r="11" fill="#FFD84A" ${sw(4)}/><circle cx="210" cy="-196" r="11" fill="#FFD84A" ${sw(4)}/>
</g></g>`;
/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6',COCO:'#C9A27A',GUMDROP:'#B9AEFF',BOO:'#CFE3FF',BLIP:'#8DF0A8',ZAP:'#9FD8FF',PEANUT:'#C9D2E6',GLOOPIANS:'#FF8FC8',KING:'#FFD36B',GLOOPIAN:'#FF8FC8',JIGGLE:'#FF8FC8',JIGGLES:'#FF8FC8',ROCKY:'#B9C0CF',COMMANDER:'#8FF0FF',EVERYBODY:'#FFE14D',ZORPIANS:'#FFC8F0',MUNCH:'#CBB8FF',PEBBLE:'#FFA6D2',BABY:'#FFA6D2'};
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
gsap.set('#boSq,#boLean,#boBody,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,.slc,.dst,.rgc,.spr,.cfp,.kss,#wedgeBigIn,#pizza,#pizzaIn,#oven,#ovenIn,#peel,#peelIn,#bananas,#bananasIn,#pzTop,#pzSauce,#pzCheese,#pzLove,#pzBaked,#feastPc,#feastPcIn,#feastCk,#feastCkIn,#ufoIn,#beams,#ufoLIn,#peanutIn,#ckIn,#litterIn,#griddleIn,.gfl',{svgOrigin:'0 0'});
gsap.set('#discoIn',{svgOrigin:'1400 -600'});gsap.set('#ufoBlip',{svgOrigin:'0 0'});
gsap.set('#fridgeDoor',{svgOrigin:'2360 0'});gsap.set('#gdPupil,#gdEyeG,#gdBrow',{svgOrigin:'2088 1090'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm','tw','tf','cm','gm','gh','bp','zp','pt','g1','g2','g3','g4','g5','kg','rk','j1','j2','j3','j4']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Hat,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Snout,#${p}AntL,#${p}AntR,#${p}Ant,.${p}Eye,.${p}EyeW,.${p}Pupil,.${p}Swirl,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#cmFlip',{svgOrigin:'0 -170'});
gsap.set('#gmBelly',{svgOrigin:'0 -205'});gsap.set('#gmBody',{svgOrigin:'0 -250'});
gsap.set('#ghBody',{svgOrigin:'0 -200'});gsap.set('#ghHead',{svgOrigin:'0 -260'});gsap.set('#ghGlow',{svgOrigin:'0 -200'});gsap.set('#ghFlip',{svgOrigin:'0 -200'});
gsap.set('#zpHead',{svgOrigin:'0 0'});gsap.set('#bpBelly',{svgOrigin:'0 -112'});gsap.set('#kgBelly',{svgOrigin:'0 -112'});
gsap.set('#ptTrunk',{svgOrigin:'0 -84'});gsap.set('#ptBelly',{svgOrigin:'0 -146'});
gsap.set('#stars1,#stars2,#earth,#moon,#comet,#gloopP,#earthW,#moonW,#cometW,#gloopW',{svgOrigin:'0 0'});
gsap.set('.mush,#crwn,#kcrn,#crwnW,#kcrnW,#bulb,#bulbIn,#jgTag,#jgTagIn,#hic,#hicIn,#jt1,#jt2,#jt3,#jt4,#jt1In,#jt2In,#jt3In,#jt4In,#pc1,#pc2,#pc3,#pc4,#pc1In,#pc2In,#pc3In,#pc4In,#scan,#squish,#squishIn,.trp,#sunTag,#sunTagIn',{svgOrigin:'0 0'});gsap.set('#kdPup',{svgOrigin:'2170 1190'});gsap.set('#kdGlow,#kdFace,#kdCrown',{svgOrigin:'2170 1230'});gsap.set('#lamp',{svgOrigin:'1450 -212'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #13 (home in the kitchen; the pink Gloopian eats his pancake next to Bo)
const MCS=.66, NSC=.46, BOX=500, BOS=.88, TFS=.68;
const FRIDGE=[1150,0,.84];
const KITX={mc:960,cm:1050,nm:1135,tf:1225,zp:1315,bp:1400,bo:1530,pt:1960,gm:2030};
gsap.set('#bo',{x:KITX.bo,y:FLOOR,scale:BOS});gsap.set('#boArmL',{rotation:0});gsap.set('#boArmR',{rotation:0});gsap.set('#boSweat',{opacity:0});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:1530,y:1112,scale:.78});gsap.set('#panGlaze',{opacity:1});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#cheeseWheel,#wedgeBig',{opacity:0});
gsap.set('#mc',{opacity:1,x:760,y:FLOOR,scale:.68});gsap.set('#mcSq',{scaleY:1});gsap.set('#mcLids',{opacity:0});gsap.set('#mcArmL',{rotation:150});gsap.set('#mcArmR',{rotation:-150});
gsap.set('#nb',{opacity:0});
gsap.set('#nm',{opacity:1,x:KITX.nm,y:FLOOR,scale:.5});gsap.set('#nmWedgeG',{opacity:1});gsap.set('#nmArmL',{rotation:150});gsap.set('#nmArmR',{rotation:-150});
gsap.set('#tw',{opacity:0});
gsap.set('#tf',{opacity:1,x:KITX.tf,y:FLOOR,scale:.74});gsap.set('#tfArmL',{rotation:150});gsap.set('#tfArmR',{rotation:-150});gsap.set('#tfSweat',{opacity:0});
gsap.set('#pizza',{opacity:0,x:1070,y:1139});
gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});
gsap.set('#oven',{x:OVX,y:TT,opacity:1});
gsap.set('#cocoSwing',{opacity:0});gsap.set('#peel',{opacity:0});
gsap.set('#pigG',{opacity:0});
gsap.set('#cm',{opacity:1,x:KITX.cm,y:FLOOR,scale:.76});gsap.set('#cmSq',{scaleY:1});gsap.set('#cmArmL',{rotation:150});gsap.set('#cmArmR',{rotation:-150});
gsap.set('#bananas',{opacity:0,x:1990,y:1664,scale:1.35});gsap.set('#bananasIn',{scaleY:.7,scaleX:1.1});
gsap.set('#fridgeDoor',{scaleX:.16});
gsap.set('#gdPeek',{opacity:0});
gsap.set('#gm',{opacity:1,x:2650,y:FLOOR,scale:1.5});gsap.set('#gmArmL',{rotation:150});gsap.set('#gmArmR',{rotation:-150});
gsap.set('#gh',{opacity:1,x:1200,y:FLOOR-760,scale:.9});gsap.set('#ghGlow',{opacity:.3,scale:1});
gsap.set('#feastPc',{opacity:0,x:1620,y:FLOOR+170,scale:.8});gsap.set('#feastCk',{opacity:0});
gsap.set('#night',{opacity:0});
gsap.set('#disco',{opacity:0});gsap.set('#discoIn',{y:-420});gsap.set('#beams',{opacity:0});
for(let i=0;i<12;i++) gsap.set('#pf'+i,{opacity:0});
gsap.set('#ufo',{opacity:0});
gsap.set('#peanutG',{opacity:0});
gsap.set('#bp',{opacity:1,x:KITX.bp,y:FLOOR,scale:.62});gsap.set('#bpArmL',{rotation:150});gsap.set('#bpArmR',{rotation:-150});
gsap.set('#zp',{opacity:1,x:1190,y:FLOOR+90,scale:.68});gsap.set('#zpArmL',{rotation:0});gsap.set('#zpArmR',{rotation:0});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});gsap.set('#ufoLRamp',{svgOrigin:'52 -120',scaleY:1});
gsap.set('#pt',{opacity:1,x:1820,y:FLOOR,scale:.7});gsap.set('#ptArmL',{rotation:150});gsap.set('#ptArmR',{rotation:-150});
gsap.set('#ck',{opacity:0,x:1060,y:FLOOR,scale:1.15});gsap.set('#ckIn',{scaleY:.55,scaleX:.92});
for(let i=0;i<5;i++){gsap.set('#ckF'+i,{opacity:0});gsap.set('#ckG'+i,{opacity:0});}
gsap.set('#table,#plate',{opacity:1});
gsap.set('#cockpit',{opacity:0});
gsap.set('#gloopSet',{opacity:0});
for(const p of ['g1','g2','g3','g4','g5']) gsap.set('#'+p,{opacity:0,x:1300,y:FLOOR+300,scale:.5});
gsap.set('#kg',{opacity:0,x:2170,y:FLOOR,scale:1.9});gsap.set('#kgArmL',{rotation:0});gsap.set('#kgArmR',{rotation:0});
gsap.set('#crwn',{opacity:0});gsap.set('#kcrn',{opacity:0,scale:1});gsap.set('#kcrnW',{x:2170,y:FLOOR-505*1.5});gsap.set('#litter',{opacity:0,x:1300,y:FLOOR-235});
gsap.set('#griddle',{opacity:0,x:1150,y:FLOOR});gsap.set('#bulb',{opacity:0});
// ---- new in #14: Jiggle (pink, j1) is the Gloopian from the end of #13; j2-j4 wait offstage; Rocky waits off-screen left
const JT=[['j2',1300],['j1',1470],['j3',1650],['j4',1810]], JY=FLOOR+110, JS=.55;
gsap.set('#j1',{opacity:1,x:1700,y:FLOOR+120,scale:.62});gsap.set('#j1ArmL',{rotation:0});gsap.set('#j1ArmR',{rotation:0});
for(const p of ['j2','j3','j4']) gsap.set('#'+p,{opacity:0,x:1700,y:FLOOR,scale:.5});
gsap.set('#rk',{opacity:0,x:560,y:FLOOR+70,scale:.62});
gsap.set('#jgTag',{opacity:0});
gsap.set('#hic',{opacity:0});
gsap.set('#jt1,#jt2,#jt3,#jt4,#pc1,#pc2,#pc3,#pc4,#scan,#squish,#sunTag',{opacity:0});gsap.set('#kdPeek,#kdFace,#kdEyes',{opacity:1});gsap.set('.trp',{opacity:0});

/* ---- starting state of #17 = the last frame of #16: everybody hugs the crowned King, Jiggle sits on his head, the little saucer pings ---- */
const KX0=2170, KS0=1.9, K0=KS0/1.5;
const HUG0={mc:[1800,FLOOR+30,.68],cm:[1880,FLOOR+60,.76],nm:[1960,FLOOR+90,.5],bo:[2060,FLOOR+130,.88],pt:[2230,FLOOR+90,.7],tf:[2330,FLOOR+90,.8],zp:[2410,FLOOR+90,.68],bp:[2480,FLOOR+40,.62],gm:[2600,FLOOR,1.5]};
for(const [p,[x,y,s]] of Object.entries(HUG0)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#kg',{opacity:1,x:KX0,y:FLOOR,scale:KS0});gsap.set('#kgArmL',{rotation:140});gsap.set('#kgArmR',{rotation:-140});
gsap.set('#kcrnW',{x:KX0,y:FLOOR-505*KS0});gsap.set('#kcrn',{opacity:1,scale:K0,rotation:0});
gsap.set('#j1',{opacity:1,x:KX0,y:FLOOR-790*K0,scale:.62});gsap.set('#j1ArmL',{rotation:0});gsap.set('#j1ArmR',{rotation:0});
gsap.set('#gh',{opacity:1,x:1200,y:FLOOR-760,scale:.9});gsap.set('#feastPc',{opacity:0});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});
// ---- new in #17: the hologram, the pancake tower (+ Rocky inside), the "50" badge, Planet Zorp
for(const p of ['hl','rkp']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#holo,#stkW,#stkIn,#fiftyTag,#fiftyIn,#zorpW',{svgOrigin:'0 0'});
gsap.set('#holoW',{x:880,y:1330});gsap.set('#hl',{x:0,y:-8,scale:.92});gsap.set('#holo',{opacity:0});gsap.set('#holoMan',{opacity:0});gsap.set('#holoStat',{opacity:0});
gsap.set('#stkW',{x:1390,y:FLOOR+40,scale:1});gsap.set('#stk',{opacity:0});gsap.set('.stl',{opacity:0});gsap.set('#stkRk',{y:170});gsap.set('#stkRkW,#stkTop',{opacity:0});gsap.set('#stkFeet',{opacity:0});
gsap.set('#fiftyTag',{opacity:0});gsap.set('#zorpW',{opacity:0});

/* ---- starting state of #18 = the last frame of #17: inside the saucer, Rocky has just popped out of the tower, Planet Zorp fills the porthole ---- */
const CK0={cm:[880,.76],nm:[1000,.5],mc:[720,.68],tf:[1120,.74],zp:[1230,.68],bp:[1340,.62],bo:[1470,.88],pt:[1620,.7],gm:[1860,1.25]};
for(const [p,[x,s]] of Object.entries(CK0)){gsap.set('#'+p,{opacity:1,x,y:FLOOR,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#bpArmR',{rotation:-85});
gsap.set('#cockpit',{opacity:1});gsap.set('#table,#plate,#oven,#ck,#ufoL,#kg,#kcrnW,#kcrn,#j1',{opacity:0});
gsap.set('#gh',{opacity:1,x:880,y:600,scale:.9});gsap.set('#ghGlow',{opacity:.4,scale:1});
gsap.set('#stkW',{x:470,y:FLOOR+70,scale:.8});gsap.set('#stk',{opacity:1});gsap.set('.stl',{opacity:1});gsap.set('#stkRk',{y:0});gsap.set('#stkRkW,#stkTop',{opacity:1});gsap.set('#stkFeet',{opacity:0});
gsap.set('#zorpW',{opacity:1,scale:.95});gsap.set('#stars1',{x:-1220});gsap.set('#stars2',{x:-1800});
gsap.set('#holo',{opacity:0});gsap.set('#ufoLRamp',{svgOrigin:'52 -120',scaleY:1});
// ---- new in #18: the four Zorpians (gray), Planet Zorp's set, the giant behind the mountains
for(const p of ['z1','z2','z3','z4']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('.zfl,#zorpGiant,#zorpGiantIn,#zgEyes',{svgOrigin:'0 0'});
gsap.set('#z1,#z2,#z3,#z4',{opacity:0,y:FLOOR,scale:.62});
gsap.set('#zorpSet',{opacity:0});gsap.set('#zFlowers',{opacity:0});gsap.set('#zorpGiant',{opacity:0,x:1500,y:1760});

/* ---- starting state of #19 = the last frame of #18: colourful Planet Zorp, everybody (shaking) on the grass, the giant's eyes glowing behind the mountains ---- */
const OUT0={gm:[1130,1.25],tf:[1250,.74],mc:[1340,.68],bp:[1430,.62],cm:[1690,.76],nm:[1765,.5],zp:[1825,.68],pt:[1905,.7],bo:[2010,.88]};
for(const [p,[x,s]] of Object.entries(OUT0)){gsap.set('#'+p,{opacity:1,x,y:FLOOR,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
const ZX0={z1:2065,z2:2225,z3:2325,z4:2425};
for(const z of ['z1','z2','z3','z4']){gsap.set('#'+z,{opacity:1,x:ZX0[z],y:FLOOR,scale:.62});gsap.set(`#${z}ArmL`,{rotation:0});gsap.set(`#${z}ArmR`,{rotation:0});}
gsap.set('.zSky',{fill:'#7F63E8'});gsap.set('.zMtA',{fill:'#FF9A8B'});gsap.set('.zMtB',{fill:'#FFD36B'});gsap.set('.zGnd',{fill:'#7DF0B0'});gsap.set('.zCr',{fill:'#5FD19A'});gsap.set('.zMoon',{fill:'#FFE98A'});gsap.set('.zPl',{fill:'#FFC95A'});gsap.set('.zRing',{stroke:'#FF8FD2'});
[1,2,3,4].forEach(i=>{const c=ZCOL[i-1];['a','b','c','d'].forEach((k,j)=>gsap.set(`.z${i}${k}`,{fill:c[j]}));gsap.set(`.z${i}bs`,{stroke:c[1]});});
gsap.set('#zorpSet',{opacity:1});gsap.set('#zFlowers',{opacity:1});gsap.set('.zfl',{scaleY:1});gsap.set('#cockpit',{opacity:0});
gsap.set('#zorpGiant',{opacity:1,x:1500,y:1330});
gsap.set('#gh',{opacity:1,x:900,y:FLOOR-1150,scale:.9});gsap.set('#ghGlow',{opacity:.3,scale:1});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});gsap.set('#ufoLRamp',{svgOrigin:'52 -120',scaleY:1});
gsap.set('#stkW',{x:1520,y:FLOOR+40,scale:1});gsap.set('#stk',{opacity:1});gsap.set('.stl',{opacity:0});gsap.set('#stl0',{opacity:1});gsap.set('#stkRk',{y:348});gsap.set('#stkRkW',{opacity:1});gsap.set('#stkTop',{opacity:0});gsap.set('#stkFeet',{opacity:0});
// ---- new in #19: Munch, the hot rock, smoke, the rainbow
for(const p of ['mn']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#mnBelly',{svgOrigin:'0 -205'});gsap.set('#mnBody',{svgOrigin:'0 -250'});gsap.set('#mnHead',{svgOrigin:'0 -400'});
gsap.set('#mn',{opacity:0,x:3600,y:FLOOR,scale:2.0});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});
gsap.set('#hotRock,#hotRockIn',{svgOrigin:'0 0'});gsap.set('#hotRock',{opacity:0,x:1520,y:FLOOR+60});
gsap.set('.smk',{svgOrigin:'0 0',opacity:0});gsap.set('#rainbow',{opacity:0});

/* ---- starting state of #20 = the last frame of #19: the rainbow arcs over Planet Zorp, everybody cheers, Munch waves ---- */
const COME0={bo:[1830,.88],tf:[1600,.74],mc:[1520,.68],cm:[1420,.76],nm:[1330,.5],pt:[1700,.7],zp:[1760,.68],bp:[1250,.62],gm:[1300,1.25]};
for(const [p,[x,s]] of Object.entries(COME0)){gsap.set('#'+p,{opacity:1,x,y:FLOOR,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
const ZC0={z1:1960,z2:1900,z3:1560,z4:1640};
for(const z of ['z1','z2','z3','z4']){gsap.set('#'+z,{opacity:1,x:ZC0[z],y:FLOOR,scale:.62});gsap.set(`#${z}ArmL`,{rotation:150});gsap.set(`#${z}ArmR`,{rotation:-150});}
gsap.set('#mn',{opacity:1,x:2150,y:FLOOR,scale:2.0});gsap.set('#mnArmL',{rotation:140});gsap.set('#mnArmR',{rotation:-140});gsap.set('#mnTear',{opacity:0});
gsap.set('#zorpGiant',{opacity:0});gsap.set('#rainbow',{opacity:1});gsap.set('.rbp',{strokeDashoffset:0});
gsap.set('#hotRock',{opacity:1,x:1520,y:FLOOR+60});gsap.set('#stl0',{opacity:0});gsap.set('#stkW',{x:1520,y:FLOOR+40,scale:1});gsap.set('#stkRk',{y:348});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});
gsap.set('#kg,#kcrn,#j1,#table,#plate,#oven',{opacity:0});gsap.set('#sunTag',{opacity:0});

/* ---- starting state of #21: festival morning in the kitchen, the gang on their marks, the little saucer is parked, the King stands at the fridge ---- */
/* ===== Season 5 staging (ep21-25) =====
   - every character stands on a depth row: back (ROWB), front (ROWF), downstage (ROWD/ROWJ, featured characters + the Jiggles)
   - the front row stands in the gaps of the back row, so every face stays visible
   - depthSort(): whoever stands lower on the floor (closer to the camera) is drawn in front, re-sorted on every rendered frame
   - camOn(): frames a character's eyes at a fixed spot on screen (upper third), captions stay clear below */
const ROWB=FLOOR, ROWF=FLOOR+200, ROWD=FLOOR+420, ROWJ=FLOOR+530, BOY=70;      // Bo's rig stands ~70 higher than the others: add BOY to his y
const EYE={bo:[-37,-567],tf:[0,-422],mc:[0,-426],cm:[0,-422],nm:[0,-422],zp:[0,-371],bp:[0,-342],pt:[0,-432],gm:[0,-544],kg:[0,-342],gh:[0,-266],j1:[-18,-342],j2:[-18,-342],j3:[-18,-342],j4:[-18,-342]};
const eyeAt=(p,x,y,s)=>[x+EYE[p][0]*s,y+EYE[p][1]*s];
const camOn=(ex,ey,s,sx=540,sy=640)=>[Math.round(Math.max(0,Math.min(2600-1080/s,ex-sx/s))),Math.round(ey-sy/s),s];
const DEPTH=(()=>{const NSv='http://www.w3.org/2000/svg',lay=document.createElementNS(NSv,'g');lay.id='depthLayer';
 document.getElementById('boMount').before(lay);
 const items=['gm','tf','pt','cm','mc','nm','zp','bp','bo','j1','j2','j3','j4'].map((c,i)=>{const el=document.getElementById(c);let g;
  if(c[0]==='j'){g=document.createElementNS(NSv,'g');g.id=c+'DZ';el.before(g);g.appendChild(el);}else g=el.closest('[id$="Mount"]');
  lay.appendChild(g);return {g,el,i};});
 return {lay,items};})();
function depthSort(){const a=DEPTH.items.map(o=>({o,y:+gsap.getProperty(o.el,'y')||0}));a.sort((p,q)=>p.y-q.y||p.o.i-q.o.i);
 const kids=DEPTH.lay.children;let same=kids.length===a.length;for(let k=0;same&&k<a.length;k++)if(kids[k]!==a[k].o.g)same=false;
 if(!same)for(const {o} of a)DEPTH.lay.appendChild(o.g);}
// the scene timeline is wrapped so the depth sort runs after every render, whichever way the playhead moves
function wrapDepth(t){const m=gsap.timeline({paused:true}),mk=()=>{const z={_v:0};Object.defineProperty(z,'v',{get(){return this._v;},set(x){this._v=x;depthSort();}});return z;};
 m.to(mk(),{v:1,duration:t.duration(),ease:'none'},0);t.paused(false);m.add(t,0);m.to(mk(),{v:1,duration:t.duration(),ease:'none'},0);depthSort();return m;}
// home marks in the kitchen
const HOME21={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
              mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1730,ROWF,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(HOME21)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#zorpSet,#rainbow,#mn,#z1,#z2,#z3,#z4,#hotRock,#stk,#sunTag',{opacity:0});
gsap.set('#table,#plate,#oven,#kg,#kcrn,#j1',{opacity:1});gsap.set('#kg',{x:2170,y:ROWB,scale:1.5});gsap.set('#kgArmL',{rotation:140});gsap.set('#kgArmR',{rotation:-140});
gsap.set('#j1',{x:2170,y:950,scale:.5});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.3,scale:1});   // Boo floats up high: whole in the wide shots, out of the close-ups
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR,rotation:0,scale:1});gsap.set('#ufoLRamp',{scaleY:1});
// ---- new in #21
gsap.set('#fTable,#pedW,#sneak',{opacity:0});gsap.set('#pedW,#ped,#sneakW',{svgOrigin:'0 0'});gsap.set('#sneakW',{x:900,y:1000});

/* ---- starting state of #22 = the last frame of #21: the lights are back on, the Golden Spatula's pedestal (front of the stage) is empty, everybody gasps ---- */
const END21={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[820,ROWD,.74],bo:[1300,ROWF+BOY,.88],zp:[1230,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END21)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#kgArmL',{rotation:20});gsap.set('#kgArmR',{rotation:-20});
gsap.set('#fTable',{opacity:1});gsap.set('#pedW',{opacity:1,x:1040,y:ROWD,scale:.85});gsap.set('#spat',{opacity:0});gsap.set('#sneak',{opacity:0});gsap.set('#night',{opacity:0});
gsap.set('#ufoL',{opacity:0});
// ---- new in #22
gsap.set('.fp',{svgOrigin:'0 0',opacity:0});
// the sticky footprints: a trail along the front of the stage, from the pedestal to the right, where the Jiggles hide
for(let i=0;i<12;i++) gsap.set('#fp'+i,{x:(1180+i*100)-(1130+i*66),y:(ROWJ+30+(i%2?14:-14))-(1718+(i%2?16:-12))});
gsap.set('#mcHat,#mcMag',{opacity:0});gsap.set('#flyW,#fly,#gspIn,#bals,.bln',{svgOrigin:'0 0'});gsap.set('#flyW',{opacity:0});gsap.set('#bals',{opacity:0});
for(const p of ['j2','j3','j4']) gsap.set('#'+p,{opacity:0,x:2000,y:ROWJ,scale:.55});

/* ---- starting state of #23 = the last frame of #22: out on the sunny lawn, the Golden Spatula floats away on balloons, everybody stares up ---- */
const END22={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1350,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[820,ROWD,.74],zp:[1230,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66],bo:[1720,ROWD+BOY,.88]};
for(const [p,[x,y,s]] of Object.entries(END22)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#mcHat,#mcMag',{opacity:1});gsap.set('#mcArmR',{rotation:-100});
const JE={j1:1800,j2:1950,j3:2150,j4:2300};
for(const j of ['j1','j2','j3','j4']){gsap.set('#'+j,{opacity:1,x:JE[j],y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:150});gsap.set(`#${j}ArmR`,{rotation:-150});}
gsap.set('#flyW',{opacity:1,x:1850,y:-2300});gsap.set('#gspIn',{rotation:0});gsap.set('#bals',{opacity:1,scale:1});
gsap.set('#fTable,#table,#plate,#oven,#pedW,#kg,#kcrnW,#kcrn,.fp',{opacity:0});gsap.set('#skySet',{opacity:1});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});
// ---- new in #23: Zap's flames, streaks
gsap.set('#zflW,#streaks',{opacity:0});gsap.set('#zflW,#zfl2,.zf',{svgOrigin:'0 0'});gsap.set('.cld',{svgOrigin:'0 0'});

/* ---- starting state of #24 = the last frame of #23: out on the lawn, Bo has caught the Golden Spatula, Boo floats beside him, everybody cheers ---- */
const END23={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1350,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[820,ROWD,.74],zp:[1230,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66],bo:[1720,ROWD+BOY,.88]};
for(const [p,[x,y,s]] of Object.entries(END23)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-140:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?140:-150});}
gsap.set('#mcHat,#mcMag',{opacity:1});gsap.set('#mcArmR',{rotation:-100});
for(const [j,x] of Object.entries({j1:1800,j2:1950,j3:2150,j4:2300})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:150});gsap.set(`#${j}ArmR`,{rotation:-150});}
gsap.set('#flyW',{opacity:1,x:1810,y:ROWD+BOY-390,scale:.8});gsap.set('#gspIn',{rotation:180});gsap.set('#bals',{opacity:0});
gsap.set('#gh',{opacity:1,x:2120,y:1000,scale:.75});
gsap.set('#skySet',{opacity:1});gsap.set('#fTable,#table,#plate,#oven,#pedW,#kg,#kcrnW,#kcrn,.fp',{opacity:0});gsap.set('#zflW,#streaks',{opacity:0});
// ---- new in #24
gsap.set('#sbW,.fp,#pcw0,#pcw1,#pcw2,#splatW',{opacity:0});gsap.set('#sbW,#sb,#pcw0,#pcw1,#pcw2,#pcq0,#pcq1,#pcq2,#pcs0,#pcs1,#pcs2,#splatW,#splat,#drips',{svgOrigin:'0 0'});

/* ---- starting state of #25 = the last frame of #24: the scoreboard shows three perfect tens, everybody cheers on their marks in the festival kitchen ---- */
const END24={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1560,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END24)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#mcHat,#mcMag',{opacity:0});gsap.set('#mcArmR',{rotation:-150});
for(const [j,x] of Object.entries({j1:1800,j2:1950,j3:2150,j4:2300})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:150});gsap.set(`#${j}ArmR`,{rotation:-150});}
gsap.set('#flyW',{opacity:1,x:1390,y:ROWF+BOY-380,scale:.8});gsap.set('#gspIn',{rotation:180});gsap.set('#bals',{opacity:0});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#bh',{rotation:0,y:0});
gsap.set('#skySet',{opacity:0});gsap.set('#fTable,#table,#plate,#oven,#kg,#kcrnW,#kcrn',{opacity:1});
gsap.set('#sbW',{opacity:1,x:1560,y:430,scale:.8});[0,1,2].forEach(i=>{gsap.set('#sbq'+i,{opacity:0});gsap.set('#sbt'+i,{opacity:1});});
gsap.set('#splatW',{opacity:1,x:1300,y:-62,scale:.9});gsap.set('#kgArmL',{rotation:140});gsap.set('#kgArmR',{rotation:-140});
// the giant pancake goes up on the flip spot, between Mochi and Bo (its top stays below Bo's chin)
gsap.set('.stl',{opacity:0});gsap.set('#stk',{opacity:0});gsap.set('#stkW',{x:1150,y:ROWD,scale:.9});gsap.set('#stkRk',{y:170});gsap.set('#stkRkW,#stkTop',{opacity:0});gsap.set('#stkFeet',{opacity:0});
// ---- new in #25
gsap.set('#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5,#nStars',{opacity:0});gsap.set('#fw0,#fw1,#fw2,#fw3,#fw4,#fw5,.nst',{svgOrigin:'0 0'});
gsap.set('#mn',{opacity:0,x:2280,y:1280,scale:.42});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});   // Munch: small, far away on the hill

/* ---- starting state of #26 = the last frame of #25, the morning after: the gang on their lawn marks, Munch is walking away over the hill, and Munch's giant gray egg sits on the lawn ----
   Season-6 shared helpers live here (bodies #26-#30 must not redeclare them): runTo, confetti, bTalk, SQC, JQ, pingAt, eggWobble, eggBump, crack, lookAll2, faces2, EGX/EGY/EGS, MN, PB */
const EGX=1100, EGY=ROWD, EGS=.95, PBS=.42;                        // the egg's mark: front of the stage, between Mochi and Zap
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const JQ=['#j1Sq','#j2Sq','#j3Sq','#j4Sq'];
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
let rgn=0;
const pingAt=(t,x,y)=>{const i=(rgn++)%4;tl.set('#rgw'+i,{x,y},t);tl.fromTo('#rg'+i,{opacity:1,scale:.3},{opacity:0,scale:3.2,duration:.8,ease:'power1.out'},t);};
// the egg rocks around its ground point / hops / grows a crack (dash-reveal, `to` = how much of the crack is drawn)
function eggWobble(t,amp=4,n=6,d=.09){tl.fromTo('#eggWob',{rotation:-amp},{rotation:amp,duration:d,yoyo:true,repeat:n-1,ease:'sine.inOut'},t);tl.to('#eggWob',{rotation:0,duration:.1},t+n*d);}
function eggBump(t,h=36){tl.fromTo('#eggHop',{y:0},{y:-h,duration:.1,ease:'power2.out'},t);tl.to('#eggHop',{y:0,duration:.14,ease:'power2.in'},t+.1);}
const crack=(id,t,to=1,d=.35)=>{tl.set('#'+id,{opacity:1},t);tl.to('#'+id,{strokeDashoffset:1-to,duration:d,ease:'power1.out'},t);};

// ---- new props go into the depth layer so they sort with the characters (the egg, its inner back wall, baby Pebble)
DEPTH.lay.insertAdjacentHTML('beforeend',EGG_HTML+EGGBACK_HTML+`<g id="pbMount" filter="url(#fSat)">${tintGum('pb',PBC)}</g>`);
DEPTH.lay.insertAdjacentHTML('beforeend',BN_HTML);
DEPTH.items.push({g:document.getElementById('eggW'),el:document.getElementById('eggW'),i:20},{g:document.getElementById('eggBackW'),el:document.getElementById('eggBackW'),i:21},{g:document.getElementById('pbMount'),el:document.getElementById('pb'),i:22});
gsap.set('#eggW,#eggHop,#eggWob,#eggRoll,#eggCap,#eggBase,#blanket,#note',{svgOrigin:'0 0'});gsap.set('#eggBackW,#eggBackIn',{svgOrigin:'0 0'});
gsap.set('#eggW',{opacity:1,x:EGX,y:EGY,scale:EGS});gsap.set('#eggFull',{opacity:1});gsap.set('#eggBase,#eggCap,#eggGlow,#eggHeat,#noteW,#blanketW,.ecr',{opacity:0});gsap.set('#eggBackW',{opacity:0,x:EGX,y:EGY-30,scale:EGS});
gsap.set('#bnW',{opacity:0,x:2070,y:1180});gsap.set('#bn',{svgOrigin:'0 0'});
// baby Pebble: tiny, hidden until the egg hatches
for(const p of ['pb']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#pb',{opacity:0,x:EGX,y:EGY-20,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});gsap.set('#pbTear,#pbSweat',{opacity:0});
const MN=mkRock('mn'), PB=mkRock('pb');
const lookAll2=(t,dx,dy)=>{lookAll(t,dx,dy);PB.look(t,dx,dy,.12);MN.look(t,dx,dy,.12);};
const faces2=(t,eyes,mouth)=>{faces(t,eyes,mouth);PB.eyes(t,eyes);PB.m(t,{O:'mO',Big:'mBg',Sm:'mSm',Fr:'mFr'}[mouth]);};

// ---- the gang on their marks (the same marks as the end of #25), arms down; the Jiggles in their row
const END25={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1700,ROWB,.7],cm:[2050,ROWB,.76],
             mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1700,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END25)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1800,j2:1950,j3:2150,j4:2300})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.3});
// the lawn by day (the kitchen, the scoreboard, the fireworks and the night are gone)
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5',{opacity:0});
gsap.set('#fTable,#table,#plate,#oven,#kg,#kcrnW,#kcrn,#sbW,#splatW,#stk,#flyW,#mcHat,#mcMag',{opacity:0});
// Munch, tiny and far away on the right-hand hill (walking home)
gsap.set('#mn',{opacity:1,x:2280,y:1280,scale:.42});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});

/* ---- starting state of #27 = the last frame of #26: the egg tucked under its blanket on the lawn, the gang around it; Truffle and Zap have shuffled along to make room for the campfire ---- */
DEPTH.lay.insertAdjacentHTML('beforeend',FIRE_HTML);document.getElementById('fxMount').insertAdjacentHTML('beforeend',THERM_HTML);
DEPTH.items.push({g:document.getElementById('fireW'),el:document.getElementById('fireW'),i:23});
gsap.set('.cfl,#fire,#fireW,#thermW',{svgOrigin:'0 0'});gsap.set('#fireW',{opacity:0,x:1340,y:ROWD+12,scale:.9});
gsap.set('#thermW',{opacity:0,x:960,y:1480});gsap.set('#therm',{svgOrigin:'0 0'});
const END26={gm:[660,ROWB,1.05],tf:[1560,ROWD,.74],pt:[1780,ROWB,.7],cm:[2100,ROWB,.76],
             mc:[800,ROWD,.74],bo:[1500,ROWF+BOY,.88],zp:[1860,ROWD,.7],nm:[520,2210,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END26)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#eggW',{opacity:1,x:EGX,y:EGY,scale:EGS});gsap.set('#eggFull',{opacity:1});gsap.set('#eggHeat,#eggGlow,#noteW,.ecr',{opacity:0});
gsap.set('#eggHop,#eggWob,#eggRoll',{x:0,y:0,rotation:0,scale:1});
gsap.set('#blanketW',{opacity:1});gsap.set('#blanket',{x:0,y:0,rotation:0,scale:1,scaleY:1});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});gsap.set('#mn',{opacity:0});gsap.set('#kg',{opacity:0});

/* ---- starting state of #28 = night on the lawn: the gang sits in a ring around the egg (the blanket is off), the egg has started to glow ---- */
DEPTH.lay.insertAdjacentHTML('beforeend',PILE_HTML);
DEPTH.items.push({g:document.getElementById('pileW'),el:document.getElementById('pileW'),i:24});
document.getElementById('fxMount').insertAdjacentHTML('beforeend',EGFX_HTML);
gsap.set('#pileW,#pile,#egFxW,#raysW,#rays',{svgOrigin:'0 0'});gsap.set('#pileW',{opacity:0,x:1500,y:2300,scale:.62});
gsap.set('#egFxW',{opacity:0,x:EGX,y:EGY-262*EGS,scale:1});gsap.set('#raysW',{opacity:0,x:EGX,y:EGY-262*EGS});gsap.set('#rays',{svgOrigin:'0 0'});
const END27={gm:[660,ROWB,1.05],pt:[1000,ROWB,.7],cm:[1260,ROWB,.76],nm:[2250,2200,.54],bp:[2200,ROWF,.66],
             mc:[800,ROWD,.74],bo:[1500,ROWD+BOY,.88],tf:[1790,ROWD,.74],zp:[2020,ROWD,.7]};
for(const [p,[x,y,s]] of Object.entries(END27)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1640,j2:1790,j3:1940,j4:2090})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#eggW',{opacity:1,x:EGX,y:EGY,scale:EGS});gsap.set('#eggFull',{opacity:1});gsap.set('#eggBase,#eggCap,#eggHeat,#eggGlow,#noteW,#blanketW,.ecr',{opacity:0});
gsap.set('#eggHop,#eggWob,#eggRoll',{x:0,y:0,rotation:0,scale:1});gsap.set('#eggCap,#eggBase',{x:0,y:0,rotation:0,scale:1});gsap.set('#eggBackW',{opacity:0,x:EGX,y:EGY-30,scale:EGS});
gsap.set('#fireW,#thermW',{opacity:0});
gsap.set('#fSatM',{attr:{values:0}});                                 // baby Pebble is gray until his first pancake
gsap.set('#pb',{opacity:0,x:EGX,y:EGY-12,scale:PBS});gsap.set('#pbSq',{y:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night',{opacity:.34});gsap.set('#nStars',{opacity:1});gsap.set('#mn,#kg',{opacity:0});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.7});

/* ---- starting state of #29 = the morning after: Pebble (now pink!) stands by Bo on the lawn, the empty shell and the night are gone, a big pile of pancakes waits at the far right ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',NAME_HTML+ZZZ_HTML+ARR_HTML);
gsap.set('#nameW,#nameS,#zzzW,#zzz,#arrW,#arr',{svgOrigin:'0 0'});
gsap.set('#nameW',{opacity:0,x:1230,y:1775,scale:.7});gsap.set('#zzzW',{opacity:0,x:2270,y:1700});gsap.set('#arrW',{opacity:0,x:2250,y:1650});
const END28={gm:[640,ROWB,1.05],pt:[1080,ROWF,.7],cm:[1420,ROWB,.76],nm:[1330,2250,.54],bp:[2150,ROWF,.66],
             mc:[800,ROWD,.74],bo:[1360,ROWD+BOY,.88],tf:[1650,ROWD,.74],zp:[1900,ROWD,.7]};
for(const [p,[x,y,s]] of Object.entries(END28)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1560,j2:1700,j3:1840,j4:1980})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#eggW,#eggBackW,#egFxW,#raysW,#fireW,#thermW,#bnW',{opacity:0});gsap.set('#eggGlow',{opacity:0});
gsap.set('#fSatM',{attr:{values:1}});                                 // Pebble is pink from now on
gsap.set('#pb',{opacity:1,x:1250,y:ROWD+100,scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#pileW',{opacity:1,x:2250,y:2120,scale:1.8});gsap.set('#pile',{scale:1});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});gsap.set('#mn',{opacity:0,x:3300,y:1640,scale:1.8});gsap.set('#kg',{opacity:0});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.3});

/* ---- starting state of #30 (Season 6 finale): the gang on the lawn near the pile (it is still shaking), Pebble asleep behind the pancakes, a giant is about to step in from the right ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',HB_HTML);
gsap.set('#hbW,#hb',{svgOrigin:'0 0'});gsap.set('#hbW',{opacity:0,x:1950,y:380});
const END29={cm:[1700,ROWB,.76],gm:[2020,ROWB,1.05],pt:[1190,ROWD+60,.7],nm:[2140,2210,.54],bp:[2200,ROWF,.66],
             mc:[1500,ROWD,.74],bo:[1760,ROWD+BOY,.88],tf:[1990,ROWD,.74],zp:[2190,ROWD,.7]};
for(const [p,[x,y,s]] of Object.entries(END29)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1440,j2:1610,j3:1780,j4:1950})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#pileW',{opacity:1,x:2330,y:2170,scale:1.8});gsap.set('#pile',{x:0,y:0,scale:1});
gsap.set('#pb',{opacity:1,x:2330,y:2150,scale:PBS});gsap.set('#pbSq',{y:-330});gsap.set('#pbLean',{rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
gsap.set('#fSatM',{attr:{values:1}});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#mn',{opacity:1,x:3300,y:1640,scale:1.5});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});
gsap.set('#nameW,#zzzW,#arrW,#eggW,#eggBackW,#egFxW,#raysW,#fireW,#thermW,#bnW',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});gsap.set('#kg',{opacity:0});
gsap.set('#gh',{opacity:1,x:1350,y:700,scale:.75});gsap.set('#ghGlow',{opacity:.3});

/* ---- starting state of #31 (Season 7 opener): the race track by the lawn - the five racers' karts line up behind the START line, the spectators stand behind the fence ----
   Season-7 shared helpers (bodies #31-#35 must not redeclare them): LANE, KRC, place, chPos, drive, wheels, scrollBy, scrollLand, groundMove, trail, bumpKart, lights, RACE */
const RACE=[560,560,.66];                                   // the camera for the race scenes (x0,y0,scale)
// camera that puts a point (ex,ey) at screen (sx,sy) - no clamping, the race world is 14000 wide
const camE=(ex,ey,s,sx=540,sy=640)=>[Math.round(ex-sx/s),Math.round(ey-sy/s),s];
const EH={bo:465,tf:422,mc:426,cm:422,zp:371,nm:422,bp:342,pt:432,gm:544,kg:342,pb:544};   // eye height above the feet at scale 1 (Bo is measured at his real scale)
const LANE=[1920,2060,2200,2340,2480];
const KRC={cm:{k:'kcm',L:0,c:['#FFD84A','#E0A52E'],cs:.6,b:0},tf:{k:'ktf',L:1,c:['#FF8FC8','#E0529F'],cs:.6,b:0},zp:{k:'kzp',L:2,c:['#C7D0E0','#7C879B'],cs:.58,b:0},
          mc:{k:'kmc',L:3,c:['#6C8CFF','#3F57D8'],cs:.6,b:0},bo:{k:'kbo',L:4,c:['#FF8A2B','#D9561A'],cs:.6,b:300}};
const chPos=(p,x,y)=>p==='bo'?[x+(1-KRC.bo.cs)*274,y+(1-KRC.bo.cs)*746]:[x,y];   // Bo's rig is scaled around an offset pivot
const wrapPx=(P)=>gsap.utils.unitize(v=>parseFloat(v)%P);
// ---- the set, the start gantry, the karts, the speed lines
document.getElementById('setMount').insertAdjacentHTML('beforeend',RS_HTML);
document.getElementById('rsLand').insertAdjacentHTML('beforeend',START_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',SPD_HTML+GP_HTML);
for(const p of Object.keys(KRC)){const r=KRC[p];
 DEPTH.lay.insertAdjacentHTML('beforeend',KART_HTML(r.k,r.c[0],r.c[1],r.b/r.cs));
 DEPTH.items.push({g:document.getElementById(r.k+'W'),el:document.getElementById(r.k+'W'),i:40+r.L});}
gsap.set('.wh,.kfl,#spdW,.spl,#startW,#startG,#raceSet',{svgOrigin:'0 0'});gsap.set('#raceSet,#startW,#spdW,#gpanW',{opacity:0});gsap.set('#gpanW,#gpan',{svgOrigin:'0 0'});
for(const p of Object.keys(KRC)) gsap.set(`#${KRC[p].k}W,#${KRC[p].k}`,{svgOrigin:'0 0'});
for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'S',{svgOrigin:'0 -100'});
gsap.set('#rsDash,#rsFence,#rsMid,#rsFar,#rsCloud,#startG',{x:0});
function place(p,x,lane){const r=KRC[p],y=lane===undefined?LANE[r.L]:lane,[cx,cy]=chPos(p,x-6,y-34);
 gsap.set('#'+r.k+'W',{opacity:1,x,y:y+r.b,scale:r.cs});gsap.set('#'+r.k,{y:0});gsap.set('#'+r.k+'S',{rotation:0});
 gsap.set('#'+p,{opacity:1,x:cx,y:cy,scale:r.cs});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
// drive char + kart to x1 (kart centre)
function drive(p,t0,dur,x1,ease='sine.inOut'){const r=KRC[p],[cx]=chPos(p,x1-6,0);tl.to('#'+r.k+'W',{x:x1,duration:dur,ease},t0);tl.to('#'+p,{x:cx,duration:dur,ease},t0);}
function driveY(p,t0,dur,y1,ease='sine.inOut'){const r=KRC[p],[,cy]=chPos(p,0,y1-34);tl.to('#'+r.k+'W',{y:y1+r.b,duration:dur,ease},t0);tl.to('#'+p,{y:cy,duration:dur,ease},t0);}
const wheels=(t0,t1,rps=4)=>tl.fromTo('.wh',{rotation:0},{rotation:360*rps*(t1-t0),duration:t1-t0,ease:'none'},t0);
function bumpKart(p,t0,t1,amp=7,per=.16){const k='#'+KRC[p].k;for(let t=t0,j=0;t<t1-1e-6;t+=per,j++)tl.fromTo(k,{y:0},{y:-amp*(j%2?.6:1),duration:per/2,yoyo:true,repeat:1,ease:'sine.inOut'},t);}
// scenery scrolls behind the still racers: each layer wraps at its own tile width, D = near-layer distance
function scrollBy(t0,T,D,ease='none'){
 tl.to('#rsDash',{x:-D,duration:T,ease,modifiers:{x:wrapPx(300)}},t0);tl.to('#rsFence',{x:-D,duration:T,ease,modifiers:{x:wrapPx(600)}},t0);
 tl.to('#rsMid',{x:-D*.5,duration:T,ease,modifiers:{x:wrapPx(1200)}},t0);tl.to('#rsFar',{x:-D*.22,duration:T,ease,modifiers:{x:wrapPx(1800)}},t0);
 tl.to('#rsCloud',{x:-D*.1,duration:T,ease,modifiers:{x:wrapPx(2400)}},t0);}
// things that stand on the ground (landmarks, spectators) move with the near layer
function groundMove(ids,t0,T,D,ease='none'){ids.forEach(id=>tl.to(id,{x:'-='+D,duration:T,ease},t0));}
function trail(t,x,y,sc=1.2){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.9,scale:.3*sc,x:0,y:0},{opacity:0,scale:1.0*sc,x:-420,y:-30,duration:.6,ease:'power1.out'},t);}
const lights=(t,a,b,c)=>{tl.set('#ltA',{fill:a?'#FF3B3B':'#5a2a2a'},t);tl.set('#ltB',{fill:b?'#FF3B3B':'#5a2a2a'},t);tl.set('#ltC',{fill:c?'#5CFF7A':'#2a4a2f'},t);};
const speedLines=(t0,t1)=>{tl.set('#spdW',{opacity:1},t0);tl.fromTo('.spl',{x:900},{x:-1900,duration:.42,repeat:Math.ceil((t1-t0)/.77),ease:'none',stagger:.05},t0);tl.set('#spdW',{opacity:0},t1);};

// ---- the stage at the START line
gsap.set('#skySet',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});
gsap.set('#startW',{opacity:1});gsap.set('#startG',{x:1960});
gsap.set('#eggW,#eggBackW,#egFxW,#raysW,#fireW,#thermW,#bnW,#pileW,#nameW,#zzzW,#arrW,#hbW',{opacity:0});
gsap.set('#mn,#pb',{opacity:0});
const ST={cm:1560,tf:1380,zp:1200,mc:1020,bo:840};
for(const p of Object.keys(KRC)) place(p,ST[p]);
for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'W',{opacity:0});            // the karts arrive in scene 3 of #31
// the spectators stand behind the fence on the grass
const SPEC={gm:[880,1640,1.05],pt:[1180,1640,.7],nm:[1370,1640,.54],bp:[1540,1640,.66],kg:[1990,1640,1.0]};
for(const [p,[x,y,s]] of Object.entries(SPEC)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#kgArmL',{rotation:0});gsap.set('#kgArmR',{rotation:0});
for(const [j,x] of Object.entries({j1:640,j2:760,j3:1700,j4:1800})){gsap.set('#'+j,{opacity:1,x,y:1700,scale:.5});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#gh',{opacity:1,x:1300,y:1080,scale:.7});gsap.set('#ghGlow',{opacity:.3});
gsap.set('#fTable,#table,#plate,#oven,#kcrnW,#kcrn,#sbW,#splatW,#stk,#flyW,#mcHat,#mcMag',{opacity:0});

/* ---- starting state of #32 = mid-race on the Pancake Road: the five karts in a pack (Pebble rides with Bo), scenery scrolls behind them; nobody else is in the shot ---- */
// the syrup river is a ground object (it lives in the set); the puddle + glob are fx
document.getElementById('rsLand').insertAdjacentHTML('beforeend',SRV_HTML+SPL_HTML);               // river + puddle are ground: behind the karts
document.getElementById('fxMount').insertAdjacentHTML('beforeend',SGL_HTML);
gsap.set('#syrupR,#syrupI,#spillW,#spill,#sglobW,#sglob,.sfl',{svgOrigin:'0 0'});
const RIVX=2100;                                           // the river's left edge (world)
gsap.set('#syrupR',{opacity:0,x:RIVX});                   // appears when the camera pans to it (scene 4)gsap.set('#spillW',{opacity:0,x:1640,y:2060,scale:.05});gsap.set('#sglobW',{opacity:0});
// the spectators, the gantry and the golden pan stay at the start line
gsap.set('#gm,#pt,#nm,#bp,#kg,#j1,#j2,#j3,#j4,#gh,#gpanW,#startW',{opacity:0});
gsap.set('#skySet',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});
const PK=[105,4];                                          // Pebble's seat in Bo's kart: x offset, y offset from a seated racer's character origin
const KY=(p)=>LANE[KRC[p].L]+KRC[p].b;                     // kart origin (world y) of a racer
const FEET=(p)=>LANE[KRC[p].L]-34;                         // a racer's character origin (world y)
const EYEY=(p,s)=>FEET(p)-EH[p]*s;                         // ... and his eyes
const PX0={cm:1500,tf:1380,zp:1260,mc:1100,bo:940};
for(const p of Object.keys(KRC)) place(p,PX0[p]);
gsap.set('#pb',{opacity:1,x:PX0.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mBg');
gsap.set('#fSatM',{attr:{values:1}});
for(const p of Object.keys(KRC)){gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}

/* ---- starting state of #33 = the race goes on down the Pancake Road: a pack of five karts (Mochi in front, Pebble in Bo's kart), scenery scrolling, the syrup river is far behind ----
   shared helper for the scrolling scenes (#33-#35): scrollProfile(pts,T,Dmax) - ONE tween per scenery layer driven by a speed profile pts=[[t,speed],...] (piecewise linear) */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',WHL_HTML+POP_HTML+WRN_HTML);
gsap.set('#whlW,#whl,#whlR,#popW,#pop,#wrnW,#wrn',{svgOrigin:'0 0'});gsap.set('#whlW,#popW,#wrnW',{opacity:0});
function scrollProfile(pts,T){const N=600,s=[0];let tp=0;
 const v=(t)=>{for(let i=1;i<pts.length;i++)if(t<=pts[i][0]){const [t0,v0]=pts[i-1],[t1,v1]=pts[i];return v0+(v1-v0)*(t-t0)/Math.max(1e-6,t1-t0);}return pts[pts.length-1][1];};
 for(let i=1;i<=N;i++){const t=T*i/N;s.push(s[i-1]+(v(t-T/N/2))*T/N);}
 const D=s[N],ease=(p)=>{const f=p*N,i=Math.min(N-1,Math.floor(f));return (s[i]+(s[i+1]-s[i])*(f-i))/D;};
 const LAY=[['#rsDash',300,1],['#rsFence',600,1],['#rsMid',1200,.5],['#rsFar',1800,.22],['#rsCloud',2400,.1]];
 LAY.forEach(([id,P,m])=>tl.to(id,{x:-D*m,duration:T,ease,modifiers:{x:wrapPx(P)}},0));
 return {D,ease,T,dist:(t)=>ease(t/T)*D,ground:(id,x0)=>tl.fromTo(id,{x:x0},{x:x0-D,duration:T,ease},0)};}      // ground(id,x0): a ground object that moves with the scenery
// (FEET, KY, EYEY, PK come from #32's init)
const bx=(x)=>chPos('bo',x-6,0)[0];                        // Bo's character x for a kart centred at x
function driveBo(t0,dur,x1,ease='sine.inOut',y1){          // Bo's kart + Bo + Pebble together (y1 = new lane, optional)
 const ky=y1===undefined?KY('bo'):y1+KRC.bo.b, by=y1===undefined?chPos('bo',0,FEET('bo'))[1]:chPos('bo',0,y1-34)[1];
 tl.to('#kboW',{x:x1,duration:dur,ease},t0);tl.to('#bo',{x:bx(x1),duration:dur,ease},t0);tl.to('#pb',{x:x1+PK[0],duration:dur,ease},t0);
 if(y1!==undefined){tl.to('#kboW',{y:ky,duration:dur,ease},t0);tl.to('#bo',{y:by,duration:dur,ease},t0);tl.to('#pb',{y:y1-34+PK[1],duration:dur,ease},t0);}}
// ---- the stage: the road with no river, the whole pack in a tracking pose
gsap.set('#syrupR,#spillW,#sglobW,#gpanW,#startW',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#skySet',{opacity:0});
gsap.set('#gm,#pt,#nm,#bp,#kg,#j1,#j2,#j3,#j4,#gh',{opacity:0});
const P33={mc:1800,tf:1550,zp:1350,cm:1150,bo:950};
for(const p of Object.keys(KRC)){place(p,P33[p]);gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set('#'+KRC[p].k+'S',{rotation:0});}
gsap.set('#kfl,.kfl',{opacity:0});
gsap.set('#pb',{opacity:1,x:P33.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#fSatM',{attr:{values:1}});

/* ---- starting state of #34 = the race goes on: the pack is back at full speed (Mochi in front, Pebble in Bo's kart); a cliff with a road tunnel is coming up ---- */
document.getElementById('world').insertAdjacentHTML('afterbegin',TUN_DEFS);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',PGL_HTML+EXG_HTML);
gsap.set('#pglW,#exgW',{svgOrigin:'0 0'});gsap.set('#pglW,#exgW',{opacity:0});
gsap.set('#syrupR,#spillW,#sglobW,#gpanW,#startW,#whlW,#popW,#wrnW',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#skySet',{opacity:0});
gsap.set('#gm,#pt,#nm,#bp,#kg,#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#gh',{opacity:0,x:900,y:1500,scale:.7});gsap.set('#ghGlow',{opacity:0});
const P34={mc:1800,tf:1550,zp:1350,cm:1150,bo:950};
for(const p of Object.keys(KRC)){place(p,P34[p]);gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set('#'+KRC[p].k+'S',{rotation:0});}
gsap.set('.kfl',{opacity:0});
gsap.set('#kmcS',{rotation:0});gsap.set('#mcLean',{rotation:0});gsap.set('#mcSq',{y:0});
gsap.set('#pb',{opacity:1,x:P34.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#fSatM',{attr:{values:1}});
gsap.set('#night',{opacity:0});

/* ---- starting state of #35 (Season 7 finale): the five karts in the final sprint (Mochi in front), the finish line and the crowd still far ahead; Boo hovers over the pack ---- */
document.getElementById('rsLand').insertAdjacentHTML('beforeend',FIN_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',PHO_HTML);
gsap.set('#finW,#finG,#phoW,#pho',{svgOrigin:'0 0'});gsap.set('#phoW',{opacity:0});
gsap.set('#syrupR,#spillW,#sglobW,#gpanW,#startW,#whlW,#popW,#wrnW,#pglW,#exgW',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#skySet',{opacity:0});
gsap.set('#night,#nStars',{opacity:0});gsap.set('#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5',{opacity:0});
gsap.set('#gh',{opacity:1,x:1250,y:880,scale:.7});gsap.set('#ghGlow',{opacity:.25});
const P35={mc:1700,cm:1500,zp:1400,tf:1200,bo:1000};
for(const p of Object.keys(KRC)){place(p,P35[p]);gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set('#'+KRC[p].k+'S',{rotation:0});}
gsap.set('.kfl',{opacity:0});gsap.set('#kmcS,#kboS',{rotation:0});gsap.set('#mcLean,#boLean',{rotation:0});gsap.set('#mcSq,#boSq',{y:0});
gsap.set('#pb',{opacity:1,x:P35.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#fSatM',{attr:{values:1}});
// the crowd (ground objects: the body moves them in with the scenery), Munch (arrives later), the pancake tower (built in scene 9)
for(const p of ['gm','pt','nm','bp','kg','j1','j2','j3','j4']){gsap.set('#'+p,{opacity:1});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#gm',{y:1640,scale:1.05});gsap.set('#pt',{y:1640,scale:.7});gsap.set('#nm',{y:1640,scale:.54});gsap.set('#bp',{y:1640,scale:.66});gsap.set('#kg',{y:1640,scale:1.0});
for(const j of ['j1','j2','j3','j4']) gsap.set('#'+j,{y:1700,scale:.5});
gsap.set('#kgArmL',{rotation:0});gsap.set('#kgArmR',{rotation:0});
gsap.set('#mn',{opacity:0,x:3600,y:1640,scale:1.5});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});
gsap.set('#stk,.stl,#stkTop,#stkRkW,#stkFeet,#stkRk',{opacity:0});gsap.set('#stkW',{x:1850,y:2740,scale:1.0});

/* ---- starting state of #36 (Season 8 opener): a sunny morning on the lawn, the Golden Pan sits in the grass, Munch is walking away over the hill ----
   Season-8 shared helpers (bodies #36-#40 must not redeclare them): setMarks, resetStage, BOAT_HTML/MAP_HTML (defs) */
document.getElementById('fxMount').insertAdjacentHTML('afterbegin',`<rect id="duskR" x="-3000" y="-3000" width="9000" height="9000" fill="#FF7A2E" opacity="0"/>`);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',MAP_HTML+TH_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',BOAT_HTML('bt'));
DEPTH.items.push({g:document.getElementById('btW'),el:document.getElementById('btW'),i:60});
gsap.set('#mapW,#map,#mapSc,#mapIsl,.mdot,#thW,#th,#btW,#bt,#btS0,#btS1,#btS2,#btBut,#bbW,#bb',{svgOrigin:'0 0'});gsap.set('#btDr',{svgOrigin:'0 100'});
gsap.set('#btMast',{svgOrigin:'0 20'});gsap.set('#btSail',{svgOrigin:'18 -940'});gsap.set('#btFlag',{svgOrigin:'18 -974'});
gsap.set('#bbMast',{svgOrigin:'0 20'});gsap.set('#bbSail',{svgOrigin:'18 -940'});gsap.set('#bbFlag',{svgOrigin:'18 -974'});
gsap.set('#mapW,#thW,#btW,#duskR,#btS0,#btS1,#btS2,#btMast,#btSail,#btFlag,#btDr,#btBut',{opacity:0});
// put a cast on their marks (arms down, no lean/squash left over from the previous episode)
function setMarks(M){for(const [p,[x,y,s]] of Object.entries(M)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0,rotation:0});}
 gsap.set('#boLean,#mcLean,#pbLean,#mnLean',{rotation:0});}
// the common "clean stage": every scene set / race prop / night overlay of the earlier seasons off
function resetStage(){
 gsap.set('#raceSet,#startW,#spdW,#gpanW,#whlW,#popW,#wrnW,#syrupR,#spillW,#sglobW,#pglW,#exgW,#finW,#phoW,#night,#nStars,#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5',{opacity:0});
 gsap.set('#stkW,.kfl',{opacity:0});
 for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'W',{opacity:0});
 gsap.set('#kg,#rk,#pan,#nb,#fTable,#table,#plate,#oven,#kcrnW,#kcrn',{opacity:0});
 gsap.set('#shake',{x:0,y:0});}
resetStage();
gsap.set('#skySet',{opacity:1});
// ---- the cast on the lawn: a ring round the Golden Pan (front-centre stays free for the pan, the fire, the map and later the boat)
const M36={gm:[600,ROWB,1.05],pt:[900,ROWB,.7],cm:[2020,ROWB,.76],bp:[2230,ROWB,.66],nm:[2420,ROWB,.54],
           tf:[780,ROWF,.74],mc:[2060,ROWF,.74],bo:[620,ROWD+BOY,.88],zp:[1560,ROWD,.7]};
setMarks(M36);
for(const [j,x] of Object.entries({j1:2000,j2:2130,j3:2270,j4:2400})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#pb',{opacity:1,x:800,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#mn',{opacity:1,x:2300,y:1560,scale:.62});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});
gsap.set('#gh',{opacity:1,x:1960,y:700,scale:.7});gsap.set('#ghGlow',{opacity:.25});
gsap.set('#gpanW',{opacity:1,x:1300,y:1930,scale:.9});gsap.set('#gpan',{svgOrigin:'0 0'});
gsap.set('#fireW',{opacity:0,x:1300,y:ROWD-110,scale:.9});
gsap.set('#fSatM',{attr:{values:1}});

/* ---- starting state of #37 (Season 8, "Rough Seas"): the pancake boat on the open sea, the crew on deck, the treasure map pinned to the mast; Rocky is hidden in the snack crate ----
   shared helpers of the sea scenes (bodies #37-#40 must not redeclare them): spray, EYE.rk/EH.rk, the Rocky adoption into the depth layer */
document.getElementById('setMount').insertAdjacentHTML('beforeend',SEA_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',WND_HTML+WSP_HTML+ACH_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',SNK_HTML);
DEPTH.items.push({g:document.getElementById('snkW'),el:document.getElementById('snkW'),i:61},{g:document.getElementById('rkMount'),el:document.getElementById('rk'),i:62});
EYE.rk=[0,-400];EH.rk=400;                                  // Rocky's eye height (measured by the preflight)
gsap.set('#bgW,#bg,#bgS0,#bgS1,#bgS2,#bgBut,#oarL,#oarR,#snkW,#snk,#achW,#ach,#isleW',{svgOrigin:'0 0'});gsap.set('#bgDr',{svgOrigin:'0 100'});gsap.set('#isle',{svgOrigin:'0 40'});
gsap.set('#bgMast',{svgOrigin:'0 20'});gsap.set('#bgSail',{svgOrigin:'18 -940'});gsap.set('#bgFlag',{svgOrigin:'18 -974'});gsap.set('#snkLid',{svgOrigin:'-166 -226'});
gsap.set('.gust',{svgOrigin:'0 0'});
let wspn=0;
// a fountain of water drops at (x,y)
function spray(t,x,y,s=1){const g=(wspn++)%3;tl.set('#wspW'+g,{x,y,opacity:1},t);
 for(let k=0;k<7;k++){const dx=(k-3)*62*s,h=(170+(k%3)*80)*s;
  tl.fromTo(`#wsp${g}_${k}`,{x:0,y:0,opacity:1,scale:.6},{x:dx*.6,y:-h,duration:.28,ease:'power2.out'},t);
  tl.to(`#wsp${g}_${k}`,{x:dx,y:50*s,opacity:0,scale:.9,duration:.34,ease:'power2.in'},t+.28);}
 tl.set('#wspW'+g,{opacity:0},t+.75);}
resetStage();
gsap.set('#skySet,#raceSet,#isleW,#fireW,#btW,#thW,#wndW,#achW',{opacity:0});gsap.set('#seaSet',{opacity:1});
gsap.set('#bgW',{x:1300,y:1830,scale:1});gsap.set('#bgS0,#bgS1,#bgS2,#bgMast,#bgSail,#bgFlag,#bgDr,#bgBut',{opacity:1});
gsap.set('#isleW',{x:1950,y:1180,scale:.1});
// ---- the crew on deck (the deck is an ellipse around (1300,1830), 1800 wide, 600 deep: every mark below stands on it)
const M37={gm:[700,ROWB,1.05],pt:[1080,ROWB,.7],cm:[1500,ROWB,.76],bp:[1880,ROWB,.66],
           tf:[930,ROWF,.74],mc:[1300,ROWF,.74],nm:[1790,ROWF,.54],bo:[1130,ROWD+BOY,.88],zp:[1620,ROWD,.7]};
setMarks(M37);
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW',{opacity:0});
gsap.set('#pb',{opacity:1,x:900,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1050,y:1250,scale:.8});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#snkW',{opacity:1,x:1830,y:1930,scale:.9});gsap.set('#snkLid',{rotation:0,y:0});
gsap.set('#rk',{opacity:0,x:1830,y:1890,scale:.8});gsap.set('#rkSq',{y:260});gsap.set('#rkArmL',{rotation:0});gsap.set('#rkArmR',{rotation:0});
gsap.set('#mapW',{opacity:1,x:1300,y:1250});gsap.set('#map',{scale:.3,rotation:0,y:0});gsap.set('#mapSc',{scaleY:1});gsap.set('.mdot',{opacity:1,scale:1});gsap.set('.mx1,.mx2',{strokeDashoffset:0});

/* ---- starting state of #38 (Season 8, "The Riddle Gate"): the crew has landed on the island and stands on the jungle trail; the giant gate is NOT there yet (it drops in during scene 1) ----
   new shared bits (bodies #38-#40 must not redeclare them): Flapjack (#pan) and Nibbles (#nb) join the depth layer, EYE.pan/EYE.nb */
const SM=document.getElementById('setMount');
SM.insertAdjacentHTML('beforeend',JUN_HTML+PTRI_HTML+GATE_HTML+PTRO_HTML+BUSH_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',CHB_HTML+FCK_HTML);
DEPTH.items.push({g:document.getElementById('panMount'),el:document.getElementById('pan'),i:63},{g:document.getElementById('nbMount'),el:document.getElementById('nb'),i:64});
EYE.pan=[0,-62];EYE.nb=[0,-300];EH.pan=62;EH.nb=300;
gsap.set('#gateW,#gate,#ptrIn,#ptrOut,#bushW,#bush,#chbW,#chb,#fckW,#fck',{svgOrigin:'0 0'});
gsap.set('#gtL',{svgOrigin:'-310 0'});gsap.set('#gtR',{svgOrigin:'310 0'});gsap.set('#gtSign',{svgOrigin:'0 -1060'});
gsap.set('#sgR',{svgOrigin:'-190 -1070'});gsap.set('#sgG',{svgOrigin:'130 -1070'});gsap.set('#sgF',{svgOrigin:'0 -1002'});
resetStage();
gsap.set('#seaSet,#skySet,#raceSet,#wndW,#achW,#isleW,#mapW',{opacity:0});gsap.set('#junSet',{opacity:1});
const GS38=1.35;                                            // the gate is 1.35x its drawn size: it must look GIANT next to the crew
gsap.set('#gateW',{opacity:1,x:1300,y:1560,scale:GS38});gsap.set('#gtOpen,#ptrIn,#ptrOut',{opacity:0});gsap.set('#gtL,#gtR',{scaleX:1});
gsap.set('#bushW',{opacity:1,x:1900,y:1790,scale:1.1});gsap.set('#bush',{scale:1,rotation:0});
gsap.set('#chbW,#fckW',{opacity:0});
const M38={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],cm:[1700,ROWB,.76],bp:[2000,ROWB,.66],rk:[2400,ROWB,.8],
           tf:[820,ROWF,.74],mc:[1780,ROWF,.74],nm:[2100,ROWF,.54],pan:[1180,ROWF-50,.9],
           bo:[1480,ROWD+BOY,.88],zp:[1900,ROWD,.7],nb:[2250,ROWD+10,.8]};
setMarks(M38);
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW,#snkW',{opacity:0});
gsap.set('#rkSq',{y:0});
gsap.set('#pb',{opacity:1,x:1080,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:2150,y:1150,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#depthLayer',{y:0});

/* ---- starting state of #39 (Season 8, "The Wobbly Bridge"): the crew stands on the left rim of a canyon, a rope bridge in front of them ----
   shared by #39-#40 (do not redeclare): CHASM/BRG/BRY, LFT/RGT/GAT (the three line-ups), chest ids chBW/chFW/chLid/chLock, bigx, lft, msplat, syr */
const SM2=document.getElementById('setMount');
SM2.insertAdjacentHTML('beforeend',CAN_HTML+BRIDGE_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',BIGX_HTML+LFT_HTML+SYR_HTML);
document.getElementById('mapSc').insertAdjacentHTML('beforeend',SPLAT_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',CHEST_HTML);
DEPTH.items.push({g:document.getElementById('chBW'),el:document.getElementById('chBW'),i:66},{g:document.getElementById('chFW'),el:document.getElementById('chFW'),i:68});
gsap.set('#brdgW,#brdg,#bigxW,#bigx,#lftW,#lft,#syrW,#syr,#chBW,#chB,#chFW,#chF',{svgOrigin:'0 0'});gsap.set('#msplat',{svgOrigin:'120 -30'});gsap.set('.brpl',{svgOrigin:'0 0'});
gsap.set('#chLid',{svgOrigin:'0 -206'});gsap.set('#chLock',{svgOrigin:'0 -130'});
resetStage();
gsap.set('#seaSet,#junSet,#skySet,#raceSet,#gateW,#ptrIn,#ptrOut,#bushW,#chbW,#fckW,#wndW,#achW,#isleW,#thW',{opacity:0});gsap.set('#canSet,#brdgW',{opacity:1});
gsap.set('#bigxW,#lftW,#syrW,#msplat,#chBW,#chFW,#chGlow',{opacity:0});gsap.set('.bx1,.bx2',{strokeDashoffset:1});
gsap.set('#mapW',{opacity:0,x:2250,y:1450});gsap.set('#map',{scale:.5,rotation:0,y:0});gsap.set('#mapSc',{scaleY:1});gsap.set('#depthLayer',{y:0});
// the three line-ups: left rim (start), right rim (after the crossing), and gathered round the X (the chest stands at (2300,1980))
const LFT={gm:[1020,1720,1.05],zp:[1050,ROWF+30,.7],bo:[900,ROWF+BOY+30,.88],tf:[760,ROWF,.74],mc:[600,ROWF,.74],cm:[780,ROWB,.76],pt:[930,ROWB,.7],
           bp:[560,ROWB,.66],rk:[1090,ROWB,.8],nm:[470,ROWF,.54],pan:[690,ROWD-30,.9],nb:[500,ROWD+10,.8],pb:[820,ROWD+24,PBS]};
const RGT={gm:[1990,1700,1.05],zp:[2020,ROWF+20,.7],bo:[2160,ROWF+BOY,.88],tf:[2300,ROWF,.74],mc:[2440,ROWF,.74],cm:[2360,ROWB,.76],pt:[2330,ROWD,.7],
           bp:[2500,ROWB,.66],rk:[2620,ROWB,.8],nm:[2570,ROWF,.54],pan:[2250,ROWD-30,.9],nb:[2690,ROWD+10,.8],pb:[2060,ROWD+14,PBS]};
const GAT={gm:[2000,ROWB,1.05],rk:[2200,ROWB,.8],cm:[2420,ROWB,.76],bp:[2640,ROWB,.66],nm:[2800,ROWB,.54],tf:[2570,ROWF,.74],mc:[2790,ROWF,.74],pan:[2040,ROWF-50,.9],
           bo:[2030,ROWF+BOY,.88],pt:[1920,ROWD,.7],zp:[2640,ROWD,.7],pb:[2520,ROWD+14,PBS],nb:[2780,ROWD+10,.8]};
const CH0=[2300,1980,.8];                                   // the chest
gsap.set('#chBW',{opacity:0,x:CH0[0],y:CH0[1]-2,scale:CH0[2]});gsap.set('#chFW',{opacity:0,x:CH0[0],y:CH0[1]+2,scale:CH0[2]});
setMarks(Object.fromEntries(Object.entries(LFT).filter(([p])=>p!=='pb')));
gsap.set('#pb',{opacity:1,x:LFT.pb[0],y:LFT.pb[1],scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW,#snkW',{opacity:0});gsap.set('#rkSq',{y:0});
gsap.set('#gh',{opacity:1,x:640,y:1030,scale:.75});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});

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
const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm'), TF=mkRock('tf'), TW=mkRock('tw'), CM=mkRock('cm'), GM=mkRock('gm'), GH=mkRock('gh'), BP=mkRock('bp'), ZP=mkRock('zp'), PT=mkRock('pt'), G1=mkRock('g1'), G2=mkRock('g2'), G3=mkRock('g3'), G4=mkRock('g4'), KG=mkRock('kg'), G5=mkRock('g5'), RK=mkRock('rk'), J1=mkRock('j1'), J2=mkRock('j2'), J3=mkRock('j3'), J4=mkRock('j4');

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
const GS4=[J1,J2,J3,J4];
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);BP.look(t,dx,dy,.12);ZP.look(t,dx,dy,.12);PT.look(t,dx,dy,.12);GS4.forEach(g=>g.look(t,dx,dy,.12));RK.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const ALL=['tf','nm','mc','cm','gm','bp','zp','pt'];
const GN=['j1','j2','j3','j4'];
const SQALL=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
const armsUp=(t,d=.15)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
const faces=(t,eyes,mouth)=>{                              // eyes: wide|normal|happy   mouth: O|Big|Sm|Fr
 const m={O:['mO','mO'],Big:['mBg','mBig'],Sm:['mSm','mSmile'],Fr:['mFr','mFrown']}[mouth];
 eyesMode(t,eyes==='happy'?'hearts':eyes);bm(t,m[1]);FB.pm(t,{O:'Oh',Big:'Gr',Sm:'Sm',Fr:'Wo'}[mouth]);
 TF.eyes(t,eyes);TF.m(t,m[0]);NN.eyes(t,eyes);NN.m(t,m[0]);cmEyes(t,eyes);CM.m(t,m[0]);mcEyes(t,eyes);MC.m(t,m[0]);
 GM.eyes(t,eyes);GM.m(t,m[0]);BP.eyes(t,eyes);BP.m(t,m[0]);ZP.eyes(t,eyes);ZP.m(t,m[0]);PT.eyes(t,eyes);PT.m(t,m[0]);GH.eyes(t,eyes);GH.m(t,m[0]);
 GS4.forEach(g=>{g.eyes(t,eyes);g.m(t,m[0]);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let spn=0;
function sprinkle(t,x,yt,yb,n=8){for(let k=0;k<n;k++){const i=(spn++)%18,xx=x+((k*37)%160)-80,tt=t+k*.07;
 tl.set('#spw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#spr'+i,{opacity:1,y:0,rotation:0},{y:yb-yt,rotation:360+(k%3)*90,duration:.7,ease:'power1.in'},tt);
 tl.set('#spr'+i,{opacity:0},tt+.7);}}
let ksn=0;
function kslice(t,x0,y0,x1,y1,dur=.6,sc=1){const i=(ksn++)%8;
 tl.set('#ksw'+i,{x:x0,y:y0},t);
 tl.fromTo('#ks'+i,{opacity:1,x:0,rotation:-20,scale:sc*.9},{x:x1-x0,rotation:340,duration:dur,ease:'none'},t);
 tl.fromTo('#ks'+i,{y:0},{y:-220,duration:dur*.45,ease:'power2.out'},t).to('#ks'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#ks'+i,{opacity:0},t+dur);}

/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the crew queues on the left rim of the canyon, crosses the rope bridge two at a time (Gumdrop holds the post, then crosses last, Boo floats over the top),
// on the right rim syrup splashes on the map, Peanut remembers the way and leads everybody to a big X where a treasure chest pops out of the sand - locked tight
const ECAM=(p,m,s=.95,sx=540,sy=780)=>camE(m[0]+EYE[p][0]*m[2],m[1]+EYE[p][1]*m[2],s,sx,sy);   // a close-up on a character's eyes (m = [x,y,scale])
const FOFF={bo:BOY,pan:-50};                                // characters whose y is not their feet
const CAM={wide:[480,-100,.5], bridge:camE(1450,1700,.7,540,800), zp:ECAM('zp',LFT.zp), gm:ECAM('gm',LFT.gm,.9),
 gh1:camE(700,1030+EYE.gh[1]*.75,1.0,540,780), gh2:camE(2000,1180+EYE.gh[1]*.75,1.0,540,780), right:camE(2250,1700,.62,540,800),
 bo:ECAM('bo',RGT.bo), pt:ECAM('pt',RGT.pt), gather:camE(2350,1850,.55,540,800), tf:ECAM('tf',GAT.tf), lock:camE(2300,1840,1.3,540,740)};
const PAIRS=[['zp','bo',L[2]+.35],['tf','mc',L[2]+1.5],['cm','pan',L[3]+.55],['nm','pb',L[3]+1.5],['pt','bp',L[4]-.1],['rk','nb',L[4]+.8]];
const tGum=L[5]+.4, tBoo=L[5]-.1;
const tSyr=W(6,1), tBX=W(9,6)-.1, tCh=W(10,2)-.05;
const tStk=L[11]+DU[11]+.5;
function yAtX(p,x,xs,ys,xe,ye){const f=FOFF[p]||0,dk=BRY(0)-34+f,ek=BRY(1)-34+f;
 if(x<=BRG.x0) return ys+(dk-ys)*Math.min(1,Math.max(0,(x-xs)/Math.max(1,BRG.x0-xs)));
 if(x<=BRG.x1) return BRY((x-BRG.x0)/(BRG.x1-BRG.x0))-34+f;
 return ek+(ye-ek)*Math.min(1,Math.max(0,(x-BRG.x1)/Math.max(1,xe-BRG.x1)));}
function cross(p,t0,dur,K=12){const [xs,ys]=LFT[p],[xe,ye]=RGT[p],id='#'+p;
 tl.to(id,{x:xe,duration:dur,ease:'none'},t0);
 for(let k=0;k<K;k++) tl.to(id,{y:yAtX(p,xs+(xe-xs)*(k+1)/K,xs,ys,xe,ye),duration:dur/K,ease:'none'},t0+k*dur/K);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,16,8,`${id}Sq`,6);}

/* ---- ambient: the planks wobble in a travelling wave, fog and clouds drift, Boo floats ---- */
for(let i=0;i<BRG.n;i++) tl.fromTo('#brp'+i+' .brpl',{y:-6},{y:6,duration:.34,yoyo:true,repeat:85,ease:'sine.inOut'},i*.035);
tl.to('#canFog',{x:-140,duration:30,ease:'none'},0);tl.to('#canClouds',{x:-260,duration:30,ease:'none'},0);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#brdg',{y:0},{y:5,duration:.2,yoyo:true,repeat:40,ease:'sine.inOut'},L[2]+.8);   // the whole bridge sways while people cross

/* ================= SCENE 1: "A wobbly bridge crossed the canyon!" ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,34,-4);
tl.fromTo('#brdgW',{y:-30},{y:0,duration:.5,ease:'bounce.out'},.1);

/* ================= SCENE 2: Zap: "Beep boop! Two at a time!" — he and Bo step on first ================= */
camTo(L[2]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);ZP.eyes(L[2],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[2]);tl.set('#zpAnt',{rotation:0},L[2]+DU[2]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[2]+.2);tl.to('#zpArmL',{rotation:0,duration:.2},L[2]+.9);
faces2(L[2]+.2,'normal','Sm');lookAll2(L[2]+.3,30,0);
camTo(L[2]+.6,.9,...CAM.bridge,'sine.inOut');
PAIRS.forEach(([a,b,t])=>{cross(a,t,2.1);cross(b,t+.15,2.1);});

/* ================= SCENE 3: Gumdrop: "Roar! I'll hold the bridge!" — he grips the rope post ================= */
camTo(L[3]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);GM.eyes(L[3],'wide');
tl.to('#gmArmL',{rotation:110,duration:.2},L[3]+.1);tl.to('#gmArmR',{rotation:-110,duration:.2},L[3]+.1);
tl.fromTo('#gmLean',{x:-3},{x:3,duration:.06,yoyo:true,repeat:15},L[3]+.4);tl.set('#gmLean',{x:0},L[3]+1.4);hop('#gmSq',L[3]+.05,30,.1,.14);

/* ================= SCENE 4: "Step by step, they crossed." — wide montage ================= */
camTo(L[4]-.45,.8,...CAM.wide,'power2.inOut');
faces2(L[4]+.1,'normal','Sm');

/* ================= SCENE 5: Boo: "I'll float across. Boo." — he drifts over the chasm, Gumdrop follows ================= */
camTo(L[5]-.45,.7,...CAM.gh1,'power2.inOut');
GH.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);GH.eyes(L[5],'normal');
tl.to('#gh',{x:2300,duration:2.0,ease:'sine.inOut'},tBoo);tl.to('#ghArmL',{rotation:60,duration:.3},tBoo);tl.to('#ghArmR',{rotation:-60,duration:.3},tBoo);
camTo(L[5]+.5,1.0,...CAM.gh2,'sine.inOut');
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},tGum-.15);cross('gm',tGum,1.5);

/* ================= SCENE 6: "Syrup splashed on the map!" ================= */
camTo(L[6]-.45,.8,...CAM.right,'power2.inOut');
tl.to('#ghArmL,#ghArmR',{rotation:0,duration:.2},L[6]);
tl.set('#mapW',{opacity:1},L[6]-.15);tl.fromTo('#map',{scale:.05,rotation:-20},{scale:.5,rotation:0,duration:.4,ease:'back.out(2)'},L[6]-.15);
tl.fromTo('#map',{y:0},{y:-12,duration:.7,yoyo:true,repeat:9,ease:'sine.inOut'},L[6]+.3);
tl.set('#syrW',{opacity:1,x:2330,y:900},tSyr-.4);tl.to('#syrW',{y:1440,duration:.4,ease:'power2.in'},tSyr-.4);tl.set('#syrW',{opacity:0},tSyr);
tl.set('#msplat',{opacity:1},tSyr);tl.fromTo('#msplat',{scale:.1},{scale:1,duration:.35,ease:'back.out(2)'},tSyr);
sparks(tSyr+.05,2330,1440,8,120);shake(tSyr,9,5);faces2(tSyr,'wide','O');lookAll2(tSyr,0,-24);

/* ================= SCENE 7: Bo: "Oh no! We can't read it!" ================= */
camTo(L[7]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[7]+.02,L[7]+DU[7]-.06);eyesMode(L[7]+.02,'wide');brows(L[7]+.05,-10,10,2,.15);
tl.to('#boArmL',{rotation:-110,duration:.2},L[7]+.2);tl.to('#boArmR',{rotation:110,duration:.2},L[7]+.2);hop('#boSq',L[7]+.3,30,.1,.14);
faces2(L[7]+.1,'wide','Fr');lookAll2(L[7]+.2,-20,6);

/* ================= SCENE 8: Peanut: "I remember the map! Go left!" ================= */
camTo(L[8]-.45,.7,...CAM.pt,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[8]-.3);tl.to('#boArmR',{rotation:0,duration:.2},L[8]-.3);
PT.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);PT.eyes(L[8],'happy');hop('#ptSq',L[8]+.1,40,.12,.16);
tl.to('#ptArmL',{rotation:110,duration:.2},W(8,4)-.15);
tl.set('#lftW',{opacity:1,x:1890,y:1500},W(8,4));tl.fromTo('#lft',{scale:.1},{scale:.7,duration:.3,ease:'back.out(2.2)'},W(8,4));
tl.fromTo('#lft',{x:0},{x:-50,duration:.25,yoyo:true,repeat:5,ease:'sine.inOut'},W(8,4)+.3);tl.to('#lftW',{opacity:0,duration:.25},L[9]+.3);
lookAll2(W(8,4),-30,0);

/* ================= SCENE 9: "Peanut led them to the big X!" — everybody follows him to the sand ================= */
tl.to('#mapW',{opacity:0,duration:.3},L[9]-.3);tl.to('#ptArmL',{rotation:0,duration:.2},L[9]-.2);
camTo(L[9]-.45,.9,...CAM.gather,'power2.inOut');
const ORD=['pt','bo','zp','tf','pan','pb','gm','rk','cm','mc','nm','bp','nb'];
ORD.forEach((p,i)=>{const [x,y]=GAT[p],t=L[9]+.05+i*.07;runTo(p,x,y,t,1.5,.7,16);});
tl.set('#bigxW',{opacity:1,x:2300,y:2090},tBX);tl.to('.bx1',{strokeDashoffset:0,duration:.18,ease:'none'},tBX);tl.to('.bx2',{strokeDashoffset:0,duration:.18,ease:'none'},tBX+.2);
sparks(tBX+.4,2300,2060,8,150);faces2(tBX,'happy','Big');lookAll2(tBX,0,16);

/* ================= SCENE 10: Truffle: "A treasure chest! Open it!" — the chest pops up out of the sand ================= */
camTo(L[10]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);TF.eyes(L[10],'happy');
tl.set('#chBW,#chFW',{opacity:1},tCh);tl.fromTo('#chBW',{scale:.05,y:CH0[1]+120},{scale:CH0[2],y:CH0[1]-2,duration:.45,ease:'back.out(2)'},tCh);
tl.fromTo('#chFW',{scale:.05,y:CH0[1]+120},{scale:CH0[2],y:CH0[1]+2,duration:.45,ease:'back.out(2)'},tCh);
sparks(tCh+.3,2300,1850,10,230);dust(tCh+.3,2150,2000,2);dust(tCh+.32,2450,2000,2);shake(tCh+.3,9,5);hearts(tCh+.4,2300,1650,5,120,260);
tl.to('#tfArmL',{rotation:150,duration:.18},W(10,3)-.1);tl.to('#tfArmR',{rotation:-150,duration:.18},W(10,3)-.1);hop('#tfSq',W(10,3),50,.14,.18);
faces2(tCh+.1,'wide','Big');lookAll2(tCh+.1,-22,10);armsUp(W(10,3),.15);

/* ================= SCENE 11: "But the chest was locked tight!" — the lock rattles ================= */
camTo(L[11]-.4,.7,...CAM.lock,'power2.inOut');
armsDown(L[11]-.2,.2);
tl.fromTo('#chLock',{rotation:-9},{rotation:9,duration:.06,yoyo:true,repeat:11},L[11]+.2);tl.set('#chLock',{rotation:0},L[11]+1.0);
tl.fromTo('#chLid',{y:0},{y:-12,duration:.1,yoyo:true,repeat:3},L[11]+.3);
faces2(L[11]+.2,'normal','Fr');lookAll2(L[11]+.2,-6,12);sparks(L[11]+.25,2300,1870,4,70);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>Bo and the Pancake 19 - The Gray Muncher</title>
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
<div id="sticker"><span class="stk1">WHERE DOES<br>IT GO?</span><span class="stk2">GUESS IN THE COMMENTS!</span></div>
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
/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6',COCO:'#C9A27A',GUMDROP:'#B9AEFF',BOO:'#CFE3FF',BLIP:'#8DF0A8',ZAP:'#9FD8FF',PEANUT:'#C9D2E6',GLOOPIANS:'#FF8FC8',KING:'#FFD36B',GLOOPIAN:'#FF8FC8',JIGGLE:'#FF8FC8',JIGGLES:'#FF8FC8',ROCKY:'#B9C0CF',COMMANDER:'#8FF0FF',ZORPIANS:'#FFC8F0',MUNCH:'#CBB8FF'};
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
const CAM={w0:[700,-150,.6], wide:[700,-380,.56], pile:[520,-60,.78], tru:[1150,-40,.92], eat:[900,-300,.6], fin:[500,-450,.55]};
const HIDE={cm:700,bp:770,tf:850,mc:930,bo:1000,nm:1060,zp:1120,pt:1180};       // who hides where (behind / beside Gumdrop)
const ZH={z1:740,z2:820,z3:900,z4:980};
const GMX=1240, MNX=2150, MNS=2.0, MMY=FLOOR-380*MNS, MEY=FLOOR-544*MNS;       // Gumdrop's spot, Munch's spot / scale / mouth y / eye y
const HOTX=1520;                                            // the hot rock + the last pancake
const tBulb=L[6]+.3;
const tPlace=W(7,1)-.2;                                    // the pancake lands on the rock
const tSizz=W(7,2);                                        // "...CRISPY..."
const tThrow=L[9]-.5;                                      // the burnt pancake flies to Munch
const tCatch=tThrow+.7;
const tBurp=W(11,2);                                       // "...RAINBOW..."
const tStk=L[11]+DU[11]+.35;
const RP=mkRock('rkp');
const ZN=['z1','z2','z3','z4'], ZZ={z1:mkRock('z1'),z2:mkRock('z2'),z3:mkRock('z3'),z4:mkRock('z4')}, MN=mkRock('mn');
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
let trn=0;
function tears(t,x,y,n=3,dx=26,fall=260){for(let k=0;k<n;k++){const i=(trn++)%8,tt=t+k*.22,sx=(k%2?1:-1)*dx;
 tl.set('#trw'+i,{x:x+sx,y:y},tt);
 tl.fromTo('#tr'+i,{opacity:0,y:0,scale:.5},{opacity:1,y:fall*.12,scale:1,duration:.15},tt);
 tl.to('#tr'+i,{y:fall,opacity:0,duration:.65,ease:'power2.in'},tt+.15);}}
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
let smn=0;
function smoke(t,x,y,n=6){for(let k=0;k<n;k++){const i=(smn++)%8,tt=t+k*.22;
 tl.set('#smw'+i,{x:x+((k%3)-1)*22,y},tt);
 tl.fromTo('#sm'+i,{opacity:.9,scale:.4,y:0},{opacity:0,scale:1.8,y:-240,duration:1.1,ease:'power1.out'},tt);}}
const FLEE=(p,x,t0)=>{const cur=OUT0[p]?OUT0[p][0]:ZX0[p];runTo(p,x,FLOOR,t0,Math.max(.8,Math.abs(cur-x)/1000),.6,24);};

/* ================= SCENE 1: "A giant gray monster stomped over the hill!" — the silhouette steps into view ================= */
camSet(0,...CAM.w0);
faces(0,'wide','O');lookAll(0,30,-34);ZN.forEach(z=>{ZZ[z].eyes(0,'wide');ZZ[z].m(0,'mO');ZZ[z].look(0,30,-30,.1);});
for(let k=0;k<6;k++) shake(.05+k*.35,9+k,5);
tl.to('#zorpGiant',{y:1760,duration:.5,ease:'power2.in'},.2);tl.set('#zorpGiant',{opacity:0},.75);
camTo(.5,1.8,...CAM.wide,'power2.inOut');
// Munch walks in from the right, one earth-shaking step at a time
tl.set('#mn',{opacity:1},.4);MN.eyes(.4,'normal');MN.m(.4,'mFr');MN.brows(.4,14,-14,-4,.1);
tl.fromTo('#mn',{x:3600},{x:MNX,duration:2.0,ease:'none'},.4);
cycle(['#mnLegL','#mnLegR'],['#mnArmL','#mnArmR'],.4,2.4,.66,16,8,'#mnSq',26);
[.75,1.4,2.05].forEach((t,i)=>{shake(t,12+i*4,6);dust(t,3600-1450*(t-.4)/2.0-120,FLOOR+10,2.6);});
// the Zorpians scatter to the left
ZN.forEach((z,i)=>{FLEE(z,ZH[z],1.2+i*.08);});

/* ================= SCENE 2: Munch: "Who took my gray?!" — everybody runs for cover ================= */
MN.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mOp',.18);MN.eyes(L[2],'wide');MN.brows(L[2],16,-16,-6,.12);
tl.to('#mnArmL',{rotation:140,duration:.2},L[2]);tl.to('#mnArmR',{rotation:-140,duration:.2},L[2]);
tl.fromTo('#mnHead',{rotation:-4},{rotation:4,duration:.18,yoyo:true,repeat:9},L[2]);tl.set('#mnHead',{rotation:0},L[2]+DU[2]+.2);
tl.to('#mnArmL',{rotation:60,duration:.3},L[2]+DU[2]);tl.to('#mnArmR',{rotation:-60,duration:.3},L[2]+DU[2]);
shake(L[2],14,8);shake(L[2]+.8,10,6);
['bo','cm','nm','tf','mc','pt','zp','bp'].forEach((p,i)=>FLEE(p,HIDE[p],L[2]-.2+i*.06));
runTo('gm',GMX,FLOOR,L[2]+.1,.9,1.25,16);
faces(L[2]-.2,'wide','O');lookAll(L[2]-.2,36,-28);

/* ================= SCENE 3: "Everybody hid behind Gumdrop!" — Gumdrop trembles in front, the rest peek ================= */
tl.set('#gmSweat',{opacity:1},L[3]);tl.fromTo('#gmSq',{x:-5},{x:5,duration:.05,yoyo:true,repeat:31},L[3]);tl.set('#gmSq',{x:0},L[3]+1.7);
GM.eyes(L[3],'wide');GM.m(L[3],'mO');
faces(L[3],'wide','O');lookAll(L[3]+.1,34,-12);ZN.forEach(z=>{ZZ[z].look(L[3]+.1,34,-10,.1);});
['#cmSq','#bpSq','#tfSq','#mcSq','#nmSq','#ptSq','#zpSq','#z1Sq','#z2Sq','#z3Sq','#z4Sq'].forEach((s,i)=>tl.fromTo(s,{x:-2},{x:2,duration:.05,yoyo:true,repeat:27},L[3]+i*.02));
tl.set('#cmSq,#bpSq,#tfSq,#mcSq,#nmSq,#ptSq,#zpSq,#z1Sq,#z2Sq,#z3Sq,#z4Sq',{x:0},L[3]+1.6);
MN.look(L[3],-30,6,.2);

/* ================= SCENE 4: Gumdrop: "Roar! ...I mean, hello?" ================= */
tl.to('#gm',{x:1520,duration:.5,ease:'back.out(1.5)'},L[4]-.1);
GM.talk(L[4]+.02,W(4,1)-.05,'mBg','mOp',.12);GM.eyes(L[4],'wide');GM.brows(L[4],12,-12,-4,.1);
tl.to('#gmArmL',{rotation:150,duration:.12},L[4]);tl.to('#gmArmR',{rotation:-150,duration:.12},L[4]);
shake(W(4,0)+.05,12,6);
GM.m(W(4,1),'mO');tl.set('#gmSweat',{opacity:1},W(4,1));
tl.to('#gmArmL',{rotation:20,duration:.2},W(4,1));tl.to('#gmArmR',{rotation:-100,duration:.2},W(4,1));
tl.fromTo('#gmArmR',{rotation:-100},{rotation:-70,duration:.16,yoyo:true,repeat:5},W(4,3));       // a shy little wave
GM.talk(W(4,2),L[4]+DU[4]-.05,'mOp','mSm',.18);
MN.eyes(L[4]+.1,'wide');MN.m(L[4]+.1,'mO');MN.brows(L[4]+.1,0,0,0,.1);tl.fromTo('#mnHead',{rotation:0},{rotation:-8,duration:.4},L[4]+.5);   // Munch tilts his head

/* ================= SCENE 5: Munch (sad): "Sniff. I just love gray." ================= */
tl.to('#gm',{x:GMX,duration:.5},L[5]-.1);tl.set('#gmSweat',{opacity:0},L[5]);GM.m(L[5],'mSm');
MN.talk(L[5]+.02,L[5]+DU[5]-.05,'mFr','mO',.3);MN.eyes(L[5],'normal');MN.brows(L[5],-20,20,0,.2);
tl.to('#mnHead',{rotation:0,duration:.3},L[5]);tl.to('#mnArmL',{rotation:20,duration:.4},L[5]);tl.to('#mnArmR',{rotation:-20,duration:.4},L[5]);
tl.set('#mnTear',{opacity:1},L[5]+.1);
tears(L[5]+.15,MNX,MEY+60,8,150*MNS/2,620);
tl.fromTo('#mnSq',{scaleY:1},{scaleY:.94,duration:.4,yoyo:true,repeat:7,ease:'sine.inOut'},L[5]);
tl.fromTo('#mnBelly',{scale:1},{scale:1.06,duration:.2,yoyo:true,repeat:5},L[5]+.3);
faces(L[5]+.3,'normal','Fr');lookAll(L[5]+.3,30,-6);ZN.forEach(z=>{ZZ[z].m(L[5]+.3,'mFr');ZZ[z].eyes(L[5]+.3,'normal');ZZ[z].look(L[5]+.3,30,-6,.1);});

tl.to('#gm',{x:900,duration:.6,ease:'sine.inOut'},L[6]-.2);
/* ================= SCENE 6: "Then Truffle had a crunchy idea!" ================= */
camTo(L[6]-.35,.9,...CAM.pile,'power2.inOut');
tl.set('#bulb',{x:HIDE.tf,y:FLOOR-430},tBulb-.3);
tl.fromTo('#bulb',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},tBulb);
tl.fromTo('#bulbIn',{scale:1},{scale:1.12,duration:.15,yoyo:true,repeat:5},tBulb+.3);
sparks(tBulb+.2,HIDE.tf,FLOOR-480,6,90);tl.to('#bulb',{opacity:0,duration:.25},tBulb+1.2);
TF.eyes(tBulb,'happy');TF.m(tBulb,'mBg');
tl.to('#tfArmL',{rotation:150,duration:.12},tBulb);tl.to('#tfArmR',{rotation:-150,duration:.12},tBulb);
hop('#tfSq',tBulb+.2,60,.14,.2);hop('#tfSq',tBulb+.7,60,.14,.2);
faces(tBulb+.5,'normal','Sm');TF.eyes(tBulb+.5,'happy');
runTo('tf',HOTX-110,FLOOR,L[6]+1.3,.9,.74,20);

/* ================= SCENE 7: Truffle: "One extra crispy pancake!" — the last pancake gets burnt on a hot space rock ================= */
camTo(L[7]-.55,.9,...CAM.tru,'power2.inOut');
tl.fromTo('#hotRock',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},tPlace-.1);
tl.fromTo('#hrGlow',{opacity:.3},{opacity:.6,duration:.3,yoyo:true,repeat:9},tPlace);
sparks(tPlace,HOTX,FLOOR-60,8,140);
tl.to('#stl0',{y:-100,duration:.3,ease:'back.out(2)'},tPlace+.1);
TF.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);TF.eyes(L[7],'happy');
tl.to('#tfArmL',{rotation:105,duration:.25,ease:'back.out(2)'},L[7]);
tl.to('#stl0 path',{fill:'#454550',duration:1.7},tSizz);tl.to('#stl0 ellipse',{fill:'#6A6A78',duration:1.7},tSizz);
smoke(tSizz,HOTX,FLOOR-170,8);
RP.eyes(L[7]+.2,'wide');RP.look(L[7]+.2,24,-4,.1);
MN.eyes(L[7]+.2,'normal');MN.look(L[7]+.2,-34,18,.2);

/* ================= SCENE 8: Mochi: "Hmph. It's burnt. Obviously." ================= */
runTo('mc',HOTX+150,FLOOR,L[8]-.6,.9,.68,20);
MC.m(L[8]+.1,'mFr');MC.talk(L[8]+.12,L[8]+DU[8]-.08,'mOp','mFr',.16);mcEyes(L[8]+.15,'lids');MC.brows(L[8]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.2},WE(8,3));
smoke(L[8],HOTX,FLOOR-170,6);
RP.look(L[8]+.3,-20,0,.1);

/* ================= SCENE 9: Munch: "Crunchy gray! My favorite!" — the burnt pancake flies into his mouth ================= */
camTo(tThrow-.35,.9,...CAM.eat,'power2.inOut');
tl.to('#tfArmL',{rotation:-130,duration:.18},tThrow-.15);tl.to('#tfArmL',{rotation:30,duration:.15},tThrow+.05);
tl.fromTo('#stl0',{x:0},{x:MNX-HOTX,duration:.7,ease:'none'},tThrow);
arc('#stl0',tThrow,.7,-100,360,MMY-(FLOOR+40));
tl.fromTo('#stl0',{scale:1},{scale:.55,duration:.7},tThrow);tl.set('#stl0',{opacity:0},tCatch);
MN.m(tThrow,'mBg');MN.eyes(tThrow,'wide');MN.brows(tThrow,0,0,0,.1);tl.set('#mnTear',{opacity:0},tThrow);
tl.to('#mnHead',{rotation:-6,duration:.2},tThrow);
MN.talk(L[9]+.02,L[9]+DU[9]-.06,'mOp','mSm',.17);MN.eyes(tCatch,'happy');MN.brows(tCatch,0,0,0,.15);
tl.to('#mnArmL',{rotation:140,duration:.2},tCatch);tl.to('#mnArmR',{rotation:-140,duration:.2},tCatch);
tl.fromTo('#mnBelly',{scale:1},{scale:1.1,duration:.18,yoyo:true,repeat:9},tCatch);
tl.fromTo('#mnHead',{rotation:-5},{rotation:5,duration:.2,yoyo:true,repeat:9},tCatch+.1);tl.set('#mnHead',{rotation:0},tCatch+2.2);
hearts(tCatch,MNX,MMY-120,6,120,360);sparks(tCatch,MNX,MMY,12,320);
[0,.5,1.0,1.5].forEach((d,i)=>{hop('#mnSq',tCatch+.2+d,70,.16,.2);shake(tCatch+.2+d+.36,10,5);});
faces(tCatch,'wide','Big');ZN.forEach(z=>{ZZ[z].eyes(tCatch,'wide');ZZ[z].m(tCatch,'mBg');});RP.eyes(tCatch,'happy');

/* ================= SCENE 10: Bo: "He's not scary. He's just hungry!" — everybody comes out of hiding ================= */
camTo(L[10]-.4,.9,...CAM.wide,'power2.inOut');
const COME={bo:1830,tf:1600,mc:1520,cm:1420,nm:1330,pt:1700,zp:1760,bp:1250};
Object.entries(COME).forEach(([p,x],i)=>runTo(p,x,FLOOR,L[10]-.35+i*.07,1.1,.7,22));
const ZCOME={z1:1960,z2:1900,z3:1560,z4:1640};ZN.forEach((z,i)=>runTo(z,ZCOME[z],FLOOR,L[10]-.2+i*.08,1.1,.62,18));
runTo('gm',1300,FLOOR,L[10]-.2,.9,1.25,16);
bTalk(L[10]+.1,L[10]+DU[10]-.08);brows(L[10]+.1,0,0,0,.2);look(L[10]+.1,30,-10,.15);eyesMode(L[10]+.1,'normal');
tl.to('#boArmL',{rotation:-60,duration:.2},L[10]+.5);tl.to('#boArmR',{rotation:60,duration:.2},L[10]+.5);
faces(L[10]+.6,'happy','Big');ZN.forEach(z=>{ZZ[z].eyes(L[10]+.6,'happy');ZZ[z].m(L[10]+.6,'mBg');});GM.eyes(L[10]+.6,'happy');
MN.eyes(L[10]+.2,'happy');MN.m(L[10]+.2,'mSm');MN.look(L[10]+.2,-26,26,.2);
tl.fromTo('#mnSq',{scaleY:1},{scaleY:1.04,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},L[10]);

/* ================= SCENE 11: "And his rainbow burp lit the way home!" ================= */
camTo(L[11]-.4,1.0,...CAM.fin,'power2.inOut');
armsDown(L[11]-.3,.2);
tl.fromTo('#mnBelly',{scale:1},{scale:1.22,duration:.5,ease:'power2.in'},tBurp-.6);tl.to('#mnBelly',{scale:1,duration:.3},tBurp);
MN.m(tBurp-.1,'mO');MN.eyes(tBurp-.5,'happy');
shake(tBurp,12,6);dust(tBurp,MNX-160,MMY+150,2);sparks(tBurp,MNX,MMY,10,260);
tl.set('#rainbow',{opacity:1},tBurp);
tl.to('.rbp',{strokeDashoffset:0,duration:2.0,ease:'power1.out'},tBurp);
confetti(tBurp+.6,900,2300,FLOOR-1500,FLOOR+60,36,1.0);
faces(tBurp+.2,'happy','Big');lookAll(tBurp+.2,-14,-34);ZN.forEach(z=>{ZZ[z].eyes(tBurp+.2,'happy');ZZ[z].m(tBurp+.2,'mBg');ZZ[z].look(tBurp+.2,-14,-30,.1);});
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'].forEach((s,i)=>{hop(s,tBurp+.7+i*.05,48,.12,.18);hop(s,tBurp+1.5+i*.05,48,.12,.18);});
armsUp(tBurp+.6,.15);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>Bo and the Pancake 2 - Knock, Knock!</title>
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

<!-- window (Rocky peeks in, Barnaby knocks) -->
<g id="window">
 <rect x="300" y="300" width="500" height="470" rx="26" fill="#fff" stroke="#2b1a14" stroke-width="9"/>
 <rect x="334" y="334" width="432" height="402" rx="12" fill="url(#gSky)" stroke="#2b1a14" stroke-width="6"/>
 <circle cx="660" cy="430" r="52" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <g fill="#fff" stroke="#2b1a14" stroke-width="5"><ellipse cx="440" cy="490" rx="70" ry="30"/><ellipse cx="500" cy="470" rx="52" ry="34"/></g>
 <g clip-path="url(#cpGlass)"><g id="rwMount"></g></g>
 <g id="barnG" opacity="0" clip-path="url(#cpGlass)"><g id="barnIn">
  <g fill="#4A2E1B"><circle cx="412" cy="522" r="56"/><circle cx="688" cy="522" r="56"/><ellipse cx="550" cy="654" rx="172" ry="142"/></g>
  <g fill="#6B4528"><circle cx="412" cy="526" r="26"/><circle cx="688" cy="526" r="26"/><ellipse cx="550" cy="702" rx="86" ry="58"/></g>
  <ellipse cx="550" cy="672" rx="27" ry="19" fill="#1E120A"/>
  <g id="barnEyes"><g class="bEye"><ellipse cx="492" cy="616" rx="19" ry="23" fill="#fff"/><circle cx="496" cy="620" r="9" fill="#1E120A"/></g><g class="bEye"><ellipse cx="608" cy="616" rx="19" ry="23" fill="#fff"/><circle cx="604" cy="620" r="9" fill="#1E120A"/></g></g>
  <g id="knockFx" opacity="0" stroke="#fff" stroke-width="9" stroke-linecap="round"><line x1="720" y1="600" x2="752" y2="590"/><line x1="724" y1="632" x2="758" y2="636"/><line x1="712" y1="566" x2="738" y2="546"/></g>
 </g></g>
 <rect x="544" y="334" width="14" height="402" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <rect x="334" y="522" width="432" height="14" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <rect x="280" y="760" width="540" height="34" rx="12" fill="#fff" stroke="#2b1a14" stroke-width="8"/>
 <path d="M300,300 Q250,520 292,770 L350,770 Q330,540 372,300Z" fill="#26A69A" stroke="#2b1a14" stroke-width="7"/>
 <path d="M800,300 Q850,520 808,770 L750,770 Q770,540 728,300Z" fill="#26A69A" stroke="#2b1a14" stroke-width="7"/>
 <rect x="480" y="700" width="90" height="62" rx="12" fill="#D9703A" stroke="#2b1a14" stroke-width="6"/>
 <g fill="#4FBF6B" stroke="#2b1a14" stroke-width="5"><ellipse cx="500" cy="680" rx="22" ry="40" transform="rotate(-20 500 680)"/><ellipse cx="528" cy="668" rx="22" ry="46"/><ellipse cx="556" cy="680" rx="22" ry="40" transform="rotate(20 556 680)"/></g>
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

<!-- syrup bath (back half; the front wall is drawn above the characters) -->
<g id="tubBack" transform="translate(90,0)">
 <ellipse cx="1000" cy="1170" rx="160" ry="14" fill="rgba(60,30,10,.22)"/>
 <ellipse cx="1000" cy="1065" rx="172" ry="27" fill="#fff" stroke="#2b1a14" stroke-width="7"/>
 <ellipse cx="1000" cy="1068" rx="150" ry="18" fill="#B8620F"/>
 <ellipse cx="1000" cy="1063" rx="118" ry="9" fill="#E0962C" opacity=".8"/>
 <g id="duck">
  <ellipse cx="1092" cy="1066" rx="27" ry="16" fill="#FFE14D" stroke="#2b1a14" stroke-width="5"/>
  <circle cx="1106" cy="1043" r="15" fill="#FFE14D" stroke="#2b1a14" stroke-width="5"/>
  <path d="M1118,1043 l17,4 -17,6z" fill="#FF8F3A" stroke="#2b1a14" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="1108" cy="1039" r="3.5" fill="#2b1a14"/>
 </g>
</g>

<g id="panMount"></g>
<g id="rkClip" clip-path="url(#cpNoTable)"><g id="rkMount"></g></g>
<g id="tubFront" transform="translate(90,0)">
 <path d="M828,1065 A172,27 0 0 0 1172,1065 L1138,1160 Q1000,1192 862,1160 Z" fill="#8ED8FF" stroke="#2b1a14" stroke-width="7" stroke-linejoin="round"/>
 <path d="M828,1065 A172,27 0 0 0 1172,1065" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/>
 <path d="M884,1122 Q1000,1146 1116,1122" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".75"/>
 <path d="M1000,1096 c-16,-10 -14,-24 -4,-24 c4,0 4,3 4,4 c0,-1 0,-4 4,-4 c10,0 12,14 -4,24z" fill="#FF3D6E" stroke="#2b1a14" stroke-width="3.5" stroke-linejoin="round" transform="translate(0,40) scale(.8)" />
</g>
<g id="boMount"></g>
<g id="bowlMount"></g>
<g id="fxMount"></g>
</svg>
</div></div>

<div id="vig"></div>
<div id="dim"></div>
<div id="caps" class="caps"></div>
<div id="capsB" class="caps"></div>
<div id="sticker"><span class="stk1">WHO'S AT THE WINDOW?</span><span class="stk2">GUESS IN THE COMMENTS!</span></div>
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
document.getElementById('rkMount').innerHTML=rockySVG('rk',true);
document.getElementById('rwMount').innerHTML=rockySVG('rw',false);

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
document.getElementById('fxMount').innerHTML=fx;

/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',ROCKY:'#A9B8FF',FLAPJACK:'#FF8FC4',BARNABY:'#F0A868'};
const CAP_BOTTOM=new Set([3,7,6,9]);
const capsEl=document.getElementById('caps'), capsB=document.getElementById('capsB'), allChunks=[];
for(const ln of [1,2,3,7,4,8,5,6,9]){let idx=0;const ws=WD[ln], tag=PLAN.tags[ln], hl=HLC[tag];
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
const S2=L[2]-.12, S3=L[3]-.15, S4=L[4]-.15, S5=L[8]-.4, S6=L[6]-.1;
const K1=L[6]+DU[6]+.1, K2=K1+.28, L9E=L[9]+DU[9];

gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,#bowlIn,#bowl2In,.spk,.hrt,.drp,.bit,.bub,#duck',{svgOrigin:'0 0'});
gsap.set('#duck',{svgOrigin:'1092 1066'});gsap.set('#barnIn',{svgOrigin:'550 736'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','ph']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['rk','rw']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Body,#${p}Head,#${p}Belly,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
gsap.set('#bo',{x:BX,y:FLOOR});
gsap.set('#pan',{x:790,y:TT-PL});
gsap.set('#rk',{x:1420,y:RKT,scale:.78,opacity:0});
gsap.set('#ph',{opacity:0});
gsap.set('#rw',{x:655,y:1100,scale:.6});
gsap.set('#bowl',{x:BX+130,y:1500});gsap.set('#bowl2',{x:1235,y:1095});
gsap.set('#spoon',{x:BX+210,y:1470});
gsap.set('#panArmL,#phArmL',{rotation:-18});gsap.set('#panArmR,#phArmR',{rotation:18});

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
const FJ=mkPan('pan'), FH=mkPan('ph');

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
const RW=mkRock('rw'), RK=mkRock('rk');

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

/* eating (Bo) */
const bite=(t)=>{
 tl.fromTo('#spoon',{x:BX+210,y:1470},{x:BX+90,y:1290,duration:.2,ease:'power2.out'},t-.22);
 bm(t,'mOpen');tl.to('#boHead',{rotation:4,duration:.08},t);
 tl.to('#spoon',{x:BX+210,y:1470,duration:.14,ease:'power2.in'},t+.08);
 bm(t+.1,'mSmile');tl.to('#boHead',{rotation:-3,duration:.1,yoyo:true,repeat:1},t+.14);};
const wiggle=(sel,t,d,a=4,per=.35,rot='rotation')=>tl.fromTo(sel,{[rot]:-a},{[rot]:a,duration:per,yoyo:true,repeat:Math.max(1,Math.round(d/per)-1),ease:'sine.inOut'},t);

/* ================= SCENE 1: best friends ================= */
camSet(0,200,380,1.15);camTo(0,S2,250,420,1.22,'sine.inOut');
bm(0,'mSmile');look(.05,22,-14,.01);brows(.2,-8,8,-8);
wiggle('#boTail',0,S2,8,.5);
tl.fromTo('#boBody',{scaleY:1},{scaleY:1.02,duration:.6,yoyo:true,repeat:Math.round(S2/.6)-1,ease:'sine.inOut'},0);
// Flapjack bounces to the beat
for(let t=.2;t<W(1,7)-.15;t+=.5){tl.fromTo('#pan',{y:TT-PL},{y:TT-PL-24,duration:.17,ease:'power2.out'},t).to('#pan',{y:TT-PL,duration:.17,ease:'power2.in'},t+.17);
 tl.fromTo('#panSq',{scaleY:1,scaleX:1},{scaleY:.9,scaleX:1.06,duration:.07},t+.34).to('#panSq',{scaleY:1,scaleX:1,duration:.1},t+.41);}
FJ.pm(0,'Sm');
// "Remember": Flapjack waves hello
tl.to('#panArmR',{rotation:-50,duration:.2,ease:'back.out(2)'},W(1,0)).to('#panArmR',{rotation:-30,duration:.15,yoyo:true,repeat:5},W(1,0)+.25).to('#panArmR',{rotation:18,duration:.25},W(1,2)+.3);
// "Bo almost ate?": Bo goes guilty, Flapjack gives side-eye
eyesMode(W(1,3),'wide');bm(W(1,3)+.1,'mO');tl.set('#boSweat',{opacity:1},W(1,4));look(W(1,3),-16,-8,.1);brows(W(1,4),-16,16,-12);
FJ.brows(W(1,3),true,16,-16);FJ.pm(W(1,4),'Wo');FJ.look(W(1,3),-14,2,.1);
tl.to('#boHead',{rotation:-5,duration:.2},W(1,4));
// "Meet Flapjack": big grin, bow, sparkles
tl.set('#boSweat',{opacity:0},W(1,6));eyesMode(W(1,6),'normal');bm(W(1,6),'mBig');brows(W(1,6),0,0,0,.1);look(W(1,6),20,-12,.1);tl.to('#boHead',{rotation:0,duration:.2},W(1,6));
FJ.brows(W(1,6),false);FJ.pm(W(1,6),'Gr');FJ.look(W(1,6),0,0,.1);
tl.to('#panSq',{rotation:-8,duration:.1},W(1,6));
tl.fromTo('#panSq',{scaleY:1,rotation:0},{scaleY:.8,rotation:-14,duration:.2,ease:'power2.in'},W(1,7)).to('#panSq',{scaleY:1,rotation:0,duration:.35,ease:'back.out(2.4)'},W(1,7)+.2);
sparks(W(1,7)+.1,790,980,7,130);
tl.to('#boArmL',{rotation:-20,duration:.15},W(1,7)).to('#boArmR',{rotation:20,duration:.15},W(1,7));
tl.to('#boArmL,#boArmR',{rotation:0,duration:.3},W(1,8)+.2);
// "his new best friend!": hop next to Bo, snuggle, heart eyes
eyesMode(W(1,9),'hearts');bm(W(1,9),'mOpen');
tl.fromTo('#pan',{x:790},{x:840,duration:.4,ease:'none'},W(1,10)-.1);
tl.fromTo('#pan',{y:TT-PL},{y:TT-PL-95,duration:.2,ease:'power2.out'},W(1,10)-.1).to('#pan',{y:TT-PL,duration:.2,ease:'power2.in'},W(1,10)+.1);
tl.to('#panShake',{rotation:-9,duration:.25,ease:'back.out(2)'},W(1,10)+.3);
tl.to('#boHead',{rotation:7,duration:.3,ease:'back.out(2)'},W(1,10)+.3);
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.16,duration:.3,yoyo:true,repeat:7,ease:'sine.inOut'},W(1,9));
bm(W(1,10)+.3,'mSmile');FJ.pm(W(1,10)+.3,'Sm');
hearts(W(1,11)-.05,800,990,6,56,330);
blink(1.2);blink(2.9);

/* ================= SCENE 2: the morning routine ================= */
camSet(S2,335,500,1.13);camTo(S2,S3-S2,350,520,1.15,'sine.inOut');
tl.set('#boHeartEyes',{scale:1},S2);eyesMode(S2,'normal');bm(S2,'mSmile');brows(S2,0,0,0,.05);look(S2,12,10,.05);
tl.to('#boHead',{rotation:0,duration:.25},S2);
tl.set('#panShake',{rotation:0},S2);
// cereal for Bo
tl.set('#bowl',{opacity:1},S2);tl.set('#spoon',{opacity:1},S2);
tl.fromTo('#bowlIn',{scale:.2},{scale:1,duration:.3,ease:'back.out(2.4)'},W(2,5)-.45);
[W(2,5)+.1,W(2,5)+.55,W(2,5)+1.0,W(2,5)+1.45].forEach(bite);
// "syrup bath for Flapjack": she leaps into her tub
const hop=W(2,10)-.15;
tl.to('#panArmL',{rotation:-60,duration:.2},hop-.05);tl.to('#panArmR',{rotation:60,duration:.2},hop-.05);
tl.fromTo('#pan',{x:840},{x:TUBX-8,duration:.55,ease:'none'},hop);
tl.fromTo('#pan',{y:TT-PL},{y:TT-PL-210,duration:.28,ease:'power2.out'},hop).to('#pan',{y:TUBY,duration:.27,ease:'power2.in'},hop+.28);
tl.to('#panSq',{scaleX:.88,scaleY:1.18,duration:.15},hop).to('#panSq',{scaleX:1.18,scaleY:.82,duration:.07},hop+.55).to('#panSq',{scaleX:1,scaleY:1,duration:.3,ease:'elastic.out(1,.4)'},hop+.62);
tl.set('#panLegs',{opacity:0},hop+.5);
FJ.pm(hop,'Oh');FJ.pm(hop+.6,'Sm');
drops(hop+.5,TUBX,1060,7);bubbles(hop+.55,TUBX,1050,5);
FJ.eyes(hop+.85,false);
tl.to('#panArmL',{rotation:-82,duration:.3},hop+.8);tl.to('#panArmR',{rotation:82,duration:.3},hop+.8);
tl.fromTo('#panShake',{rotation:-2},{rotation:2,duration:.9,yoyo:true,repeat:Math.round((S4-hop)/.9),ease:'sine.inOut'},hop+1.0);
steam(hop+.7,S4);
tl.fromTo('#duck',{y:0,rotation:-4},{y:-7,rotation:4,duration:.7,yoyo:true,repeat:Math.round((S6-S2)/.7),ease:'sine.inOut'},S2);
bubbles(hop+1.6,TUBX-30,1050,4);bubbles(hop+2.6,TUBX+20,1050,4);
// Flapjack's sigh: heart
hearts(WE(2,13)-.1,TUBX,1000,3,60,260);
blink(S2+1.2);

/* ================= SCENE 3: someone sneaky is watching ================= */
camSet(S3,200,150,1.0);camTo(S3,S4-S3,240,175,1.06,'sine.inOut');
tl.fromTo('#dim',{opacity:0},{opacity:1,duration:.4},S3);
tl.set('#spoon',{opacity:1},S3);
[S3+.25,S3+.85,S3+1.45,S3+2.05,S3+2.65].forEach(bite);
look(S3+.1,10,10,.05);
// Rocky rises in the window, eyes darting
const rise=W(3,1)-.45;
tl.fromTo('#rw',{y:1100},{y:925,duration:.8,ease:'sine.out'},rise);
RW.m(rise,'mSm');RW.look(rise+.5,-12,10,.2);RW.look(W(3,3),10,12,.2);RW.look(W(3,4)+.1,-8,14,.2);
RW.brows(W(3,2),-12,12,-6);
tl.fromTo('#rw',{x:655},{x:672,duration:1.2,ease:'sine.inOut'},rise+.8);
tl.fromTo('#rwHead',{rotation:-4},{rotation:4,duration:.5,yoyo:true,repeat:Math.max(1,Math.floor((L[7]-rise-.9)/.5)),ease:'sine.inOut'},rise+.4);
// whisper quip "Nobody saw anything."
RW.talk(L[7],L[7]+DU[7]-.15);RW.look(L[7],0,6,.1);
tl.to('#rwHead',{rotation:-6,duration:.15},L[7]).to('#rwHead',{rotation:6,duration:.4,yoyo:true,repeat:3},L[7]+.2);
tl.to('#rw',{y:1100,duration:.28,ease:'power2.in'},S4-.3);
// bathing Flapjack keeps humming
FJ.pm(S3,'Sm');
blink(S3+1.0);

/* ================= SCENE 4: the grab + the chase ================= */
const gT=W(4,1)-.05;
camSet(S4,430,360,1.0);camTo(gT+.35,1.0,560,390,1.05);camTo(gT+1.2,1.3,950,450,1.12);camTo(gT+2.2,1.5,1250,520,1.15);camTo(S5,S6-S5,1290,540,1.22);
tl.fromTo('#dim',{opacity:1},{opacity:0,duration:.25},S4);
tl.set('#rk',{x:1420,y:RKT,scale:.78,opacity:1},S4);
tl.set('#spoon',{opacity:1},S4);tl.set('#rkLean',{rotation:0},S4);
RK.m(S4,'mSm');RK.look(S4,-14,6,.05);RK.brows(S4,-14,14,-6,.05);
// Rocky sneaks up to the tub
tl.fromTo('#rk',{x:1420},{x:RKX,duration:gT-S4,ease:'sine.inOut'},S4);
cycle(['#rkLegL','#rkLegR'],['#rkArmL','#rkArmR'],S4,gT,.5,10,14,'#rkSq',10);
tl.to('#rkArmL',{rotation:100,duration:.3,ease:'back.out(2)'},gT-.3);tl.to('#rkArmR',{rotation:-100,duration:.3,ease:'back.out(2)'},gT-.3);
tl.to('#rkLean',{rotation:-8,duration:.25,ease:'sine.in'},gT-.3);
// Bo is busy with his breakfast...
bite(S4+.15);bite(S4+.65);
// the snatch: Flapjack is flung onto Rocky's head
tl.set('#panEyesClosed',{opacity:0},gT);tl.set('#panEyes',{opacity:1},gT);FJ.pm(gT,'Oh');
tl.set('#panLegs',{opacity:1},gT);
tl.fromTo('#pan',{x:TUBX-8},{x:RKX,duration:.4,ease:'none'},gT);
tl.fromTo('#pan',{y:TUBY},{y:560,duration:.2,ease:'power2.out'},gT).to('#pan',{y:RKT-.78*562,duration:.2,ease:'power2.in'},gT+.2);
tl.fromTo('#pan',{scale:1},{scale:.78,duration:.4},gT);
tl.fromTo('#panArmL',{rotation:-82},{rotation:-150,duration:.15,yoyo:true,repeat:3},gT);tl.fromTo('#panArmR',{rotation:82},{rotation:150,duration:.15,yoyo:true,repeat:3},gT);
drops(gT+.05,TUBX,1060,6);
tl.set('#pan',{opacity:0},gT+.4);tl.set('#ph',{opacity:1},gT+.4);
FH.pm(gT+.4,'Wo');FH.eyes(gT+.4,true);FH.look(gT+.4,0,-4,.1);
tl.set('#phArmL',{rotation:-120},gT+.4);tl.set('#phArmR',{rotation:120},gT+.4);
RK.m(gT+.2,'mSm');tl.to('#rkLean',{rotation:0,duration:.2},gT+.4);
tl.to('#rkArmL',{rotation:20,duration:.2},gT+.45);tl.to('#rkArmR',{rotation:-20,duration:.2},gT+.45);
// Bo notices: gasp, hop back
eyesMode(gT+.3,'wide');bm(gT+.3,'mBig');brows(gT+.3,-18,18,-18);look(gT+.3,16,-6,.05);
tl.set('#boSweat',{opacity:1},gT+.55);
tl.fromTo('#boSq',{y:0},{y:-130,duration:.2,ease:'power2.out'},gT+.35).to('#boSq',{y:0,duration:.22,ease:'bounce.out'},gT+.55);
tl.to('#boArmL',{rotation:140,duration:.2,ease:'back.out(2)'},gT+.35);tl.to('#boArmR',{rotation:-140,duration:.2,ease:'back.out(2)'},gT+.35);
shake(gT+.78,8,4);
// Rocky bolts along the table (gT+.6 .. gT+1.15), leaps to the floor, sprints to the fridge
const rA=gT+.6, rB=gT+1.15, rC=rB+.5, rD=rC+.75;
cycle(['#rkLegL','#rkLegR'],['#rkArmL','#rkArmR'],rA,rB,.2,34,40,'#rkSq',14);
tl.fromTo('#rk',{x:RKX},{x:1455,duration:rB-rA,ease:'power1.in'},rA);
tl.fromTo('#rk',{x:1455},{x:1625,duration:rC-rB,ease:'none'},rB);
tl.fromTo('#rk',{y:RKT},{y:RKT-260,duration:.22,ease:'power2.out'},rB).to('#rk',{y:RKF,duration:.28,ease:'power2.in'},rB+.22);
tl.fromTo('#rk',{scale:.78},{scale:1,duration:rC-rB,ease:'sine.inOut'},rB);
tl.to('#rkSq',{scaleX:1.2,scaleY:.8,duration:.07},rC).to('#rkSq',{scaleX:1,scaleY:1,duration:.15,ease:'back.out(2)'},rC+.07);
cycle(['#rkLegL','#rkLegR'],['#rkArmL','#rkArmR'],rC+.1,rD,.17,38,45,'#rkSq',18);
tl.fromTo('#rk',{x:1625},{x:1860,duration:rD-rC,ease:'none'},rC);
tl.fromTo('#rkTail',{rotation:-12},{rotation:12,duration:.13,yoyo:true,repeat:14,ease:'sine.inOut'},rB);
RK.m(rA,'mOp');RK.eyes(rA,'wide');RK.look(rA,16,0,.05);
FH.pm(rB,'Gr');
tl.fromTo('#phShake',{rotation:-6},{rotation:6,duration:.12,yoyo:true,repeat:14},rA);
cycle(['#phLegL','#phLegR'],[],rA,rD,.24,40,0,'#phSq',6);
// Bo chases (starts after his gasp)
const bA=gT+.8, bB=bA+2.0;
tl.set('#boSweat',{opacity:0},bA);eyesMode(bA,'normal');bm(bA,'mOpen');brows(bA,16,-16,0);look(bA,18,-4,.06);
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},bA-.1);
tl.fromTo('#bo',{x:BX},{x:1480,duration:bB-bA,ease:'power1.in'},bA);
tl.fromTo('#bowl',{x:BX+130,y:1500},{x:1480+130,y:1500,duration:bB-bA,ease:'power1.in'},bA);
tl.fromTo('#spoon',{x:BX+210,y:1470},{x:1480+210,y:1470,duration:bB-bA,ease:'power1.in'},bA);
[.3,.55,.8].forEach(f=>bits(bA+f*(bB-bA),BX+(1480-BX)*f*f+130,1480,3));
tl.to('#boLean',{rotation:12,duration:.3},bA);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],bA,bB,.26,34,42,'#boSq',16);
tl.fromTo('#boTail',{rotation:-12},{rotation:12,duration:.13,yoyo:true,repeat:Math.round((bB-bA)/.13),ease:'sine.inOut'},bA);
tl.fromTo('#boScarfTail',{rotation:-20},{rotation:25,duration:.12,yoyo:true,repeat:Math.round((bB-bA)/.12),ease:'sine.inOut'},bA);
// both skid to a stop at the fridge
tl.to('#boLean',{rotation:-14,duration:.2,ease:'power2.out'},bB).to('#boLean',{rotation:0,duration:.4,ease:'back.out(2)'},bB+.2);
tl.to('#boSq',{scaleX:1.12,scaleY:.9,duration:.12},bB).to('#boSq',{scaleX:1,scaleY:1,duration:.3,ease:'elastic.out(1,.4)'},bB+.12);
tl.to('#rkLean',{rotation:-16,duration:.15,ease:'power2.out'},rD).to('#rkLean',{rotation:0,duration:.4,ease:'back.out(2)'},rD+.15);
tl.to('#rkSq',{scaleX:1.1,scaleY:.92,duration:.1},rD).to('#rkSq',{scaleX:1,scaleY:1,duration:.3,ease:'elastic.out(1,.4)'},rD+.1);
shake(bB,14,6);
eyesMode(bB+.1,'wide');bm(bB+.1,'mO');
bm(bB+.5,'mFrown');eyesMode(bB+.5,'normal');brows(bB+.5,18,-18,0);look(bB+.5,22,0,.1);
RK.m(rD,'mO');RK.eyes(rD,'wide');tl.set('#rkSweat',{opacity:1},rD+.2);RK.look(rD,-18,0,.1);

/* ================= SCENE 5: the taunt, the tummy, the cereal ================= */
// Flapjack taunts from Rocky's head: "Catch me if you can!"
const tA=L[8], tB=L[8]+DU[8];
FH.talk(tA,tB,'Gr','Sm');FH.brows(tA,false);FH.look(tA,-18,2,.1);
tl.fromTo('#phSq',{scaleY:1},{scaleY:.86,duration:.1,yoyo:true,repeat:11},tA);
tl.fromTo('#phArmL',{rotation:-120},{rotation:-160,duration:.16,yoyo:true,repeat:9},tA);tl.fromTo('#phArmR',{rotation:120},{rotation:160,duration:.16,yoyo:true,repeat:9},tA+.08);
tl.set('#phLegL,#phLegR',{rotation:0},tA);
tl.fromTo('#phShake',{rotation:-8},{rotation:8,duration:.2,yoyo:true,repeat:7,ease:'sine.inOut'},tA);
RK.m(tA,'mO');RK.look(tA,0,-14,.1);
tl.fromTo('#rkHead',{rotation:-3},{rotation:3,duration:.25,yoyo:true,repeat:5},tA);
// Bo huffs, determined
tl.fromTo('#boBody',{scaleY:1},{scaleY:1.05,duration:.3,yoyo:true,repeat:9,ease:'sine.inOut'},bB+.3);
tl.to('#boArmL',{rotation:-30,duration:.2},tA).to('#boArmR',{rotation:30,duration:.2},tA);
tl.set('#boSweat',{opacity:1},tA+.2);
// Bo steps forward... then Rocky's tummy rumbles
const rumble=W(5,3);
tl.fromTo('#bo',{x:1480},{x:1540,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);
tl.fromTo('#bowl',{x:1610},{x:1670,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);
tl.fromTo('#spoon',{x:1690},{x:1750,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},tB);
tl.fromTo('#rkBelly',{scaleX:1,scaleY:1},{scaleX:1.12,scaleY:1.1,duration:.1,yoyo:true,repeat:9},rumble);
tl.fromTo('#rkSq',{x:0},{x:5,duration:.05,yoyo:true,repeat:13},rumble);
shake(rumble+.1,8,6);
RK.m(rumble,'mFr');RK.eyes(rumble,'normal');RK.brows(rumble+.1,-22,22,-8);RK.look(rumble+.1,0,12,.2);
tl.set('#rkSweat',{opacity:0},rumble);tl.set('#rkTear',{opacity:1},rumble+.4);tl.fromTo('#rkTear',{y:0},{y:60,duration:.8,ease:'power1.in'},rumble+.4).to('#rkTear',{opacity:0,duration:.1},rumble+1.15);
tl.to('#rkEarL',{rotation:-25,duration:.3},rumble+.1);tl.to('#rkEarR',{rotation:25,duration:.3},rumble+.1);
tl.to('#rkHead',{rotation:0,y:16,duration:.3},rumble+.1);
// Flapjack softens, pats his head
FH.pm(rumble,'Wo');FH.look(rumble,0,10,.2);
tl.to('#phArmR',{rotation:60,duration:.25},rumble+.2).to('#phArmR',{rotation:30,duration:.2,yoyo:true,repeat:5},rumble+.45);
FH.pm(rumble+.8,'Sm');
// Bo softens: "awww"
eyesMode(W(5,4),'normal');bm(W(5,4),'mO');brows(W(5,4),-20,20,-10);look(W(5,4),12,0,.1);tl.set('#boSweat',{opacity:0},W(5,4));
tl.to('#boHead',{rotation:-5,duration:.3},W(5,4));
hearts(W(5,4)+.3,1700,1000,4,60,260);
// "So Bo shared his cereal": a bowl pops in, slides over to Rocky
const bw=W(5,6), eat=W(5,9);
bm(bw,'mSmile');brows(bw,-6,6,-10);
tl.set('#bowl2',{opacity:1,x:1695,y:1500},bw);
tl.fromTo('#bowl2In',{scale:.2},{scale:1,duration:.3,ease:'back.out(2.4)'},bw+.02);
sparks(bw+.1,1695,1440,6,100);
tl.fromTo('#bo',{x:1540},{x:1565,duration:.4,ease:'sine.inOut'},bw);
tl.fromTo('#bowl',{x:1670},{x:1695,duration:.4,ease:'sine.inOut'},bw);
tl.fromTo('#spoon',{x:1750},{x:1775,duration:.4,ease:'sine.inOut'},bw);
tl.fromTo('#bowl2',{x:1695,y:1500},{x:1860,y:1345,duration:.4,ease:'power2.inOut'},W(5,8));
tl.to('#boArmR',{rotation:-70,duration:.25},bw+.1).to('#boArmR',{rotation:0,duration:.3},W(5,8)+.4);
// Rocky digs in: four noisy bites
RK.m(eat-.1,'mBg');RK.eyes(eat-.1,'happy');RK.brows(eat-.1,0,0,0,.1);
tl.to('#rkEarL',{rotation:0,duration:.2},eat-.1);tl.to('#rkEarR',{rotation:0,duration:.2},eat-.1);
[eat,eat+.42,eat+.84,eat+1.26].forEach((t,i)=>{
 tl.fromTo('#rkHead',{y:16,rotation:0},{y:62,rotation:9,duration:.14,ease:'power2.in'},t).to('#rkHead',{y:20,rotation:-3,duration:.2,ease:'power2.out'},t+.14);
 bits(t+.1,1860,1300,4);tl.fromTo('#phSq',{scaleY:1},{scaleY:.9,duration:.1,yoyo:true,repeat:1},t);});
FH.pm(eat,'Gr');
tl.fromTo('#phShake',{rotation:-5},{rotation:5,duration:.18,yoyo:true,repeat:11,ease:'sine.inOut'},eat);
tl.fromTo('#rkTail',{rotation:-8},{rotation:12,duration:.2,yoyo:true,repeat:14,ease:'sine.inOut'},eat);
// Bo happy
bm(eat,'mBig');tl.to('#boHead',{rotation:3,duration:.3},eat);
hearts(eat+1.5,1700,1050,5,70,300);

/* ================= SCENE 6: three friends... and a knock ================= */
camSet(S6,335,215,.97);camTo(S6,L9E-S6+.4,350,230,1.0,'sine.inOut');
tl.set('#spoon',{opacity:1,x:BX+210,y:1470},S6);
tl.set('#bo',{x:BX},S6);tl.set('#boLean',{rotation:0},S6);tl.set('#boSq',{scaleX:1,scaleY:1,y:0},S6);tl.set('#boBody',{scaleY:1},S6);
tl.set('#boHead',{rotation:0},S6);tl.set('#boArmL,#boArmR',{rotation:0},S6);tl.set('#boSweat',{opacity:0},S6);
eyesMode(S6,'normal');bm(S6,'mSmile');brows(S6,0,0,0,.05);look(S6,14,8,.05);
tl.set('#bowl2',{opacity:1,x:1235,y:1095},S6);tl.set('#bowl2In',{scale:1},S6);
tl.set('#bowl',{opacity:1,x:BX+130,y:1500},S6);
// Flapjack is back in her bath, Rocky munches behind the table
tl.set('#ph',{opacity:0},S6);tl.set('#pan',{opacity:1,x:TUBX-8,y:TUBY,scale:1},S6);tl.set('#panLegs',{opacity:0},S6);
tl.set('#panEyes',{opacity:0},S6);tl.set('#panEyesClosed',{opacity:1},S6);FJ.pm(S6,'Sm');tl.set('#panShake',{rotation:0},S6);tl.set('#panSq',{scaleX:1,scaleY:1},S6);
tl.set('#panArmL',{rotation:-82},S6);tl.set('#panArmR',{rotation:82},S6);
tl.set('#rk',{x:1235,y:RKB,scale:.85,opacity:1},S6);tl.set('#rkLean',{rotation:0},S6);tl.set('#rkSq',{x:0,y:0,scaleX:1,scaleY:1},S6);
tl.set('#rkLegL,#rkLegR,#rkArmL,#rkArmR',{rotation:0},S6);tl.set('#rkHead',{y:0,rotation:0},S6);tl.set('#rkTear',{opacity:0},S6);tl.set('#rkSweat',{opacity:0},S6);
RK.m(S6,'mBg');RK.eyes(S6,'happy');RK.brows(S6,0,0,0,.05);
steam(S6,S6+4);
tl.fromTo('#panShake',{rotation:-2},{rotation:2,duration:.9,yoyo:true,repeat:Math.round((K1-S6)/.9),ease:'sine.inOut'},S6);
[S6+.35,S6+.95,S6+1.55].forEach(bite);
[S6+.2,S6+.7,S6+1.2,S6+1.7].forEach((t)=>{tl.fromTo('#rkHead',{y:0,rotation:0},{y:34,rotation:5,duration:.14,ease:'power2.in'},t).to('#rkHead',{y:0,rotation:-2,duration:.2},t+.14);});
bubbles(S6+.4,TUBX,1050,4);bubbles(S6+1.6,TUBX+20,1050,4);
blink(S6+.9);
// KNOCK, KNOCK
tl.set('#barnG',{opacity:1},K1-.05);
tl.fromTo('#barnIn',{y:340},{y:0,duration:.25,ease:'back.out(1.8)'},K1-.05);
[K1,K2].forEach((t)=>{tl.set('#knockFx',{opacity:1},t).set('#knockFx',{opacity:0},t+.12);tl.fromTo('#barnIn',{y:0},{y:-14,duration:.06,yoyo:true,repeat:1},t);});
shake(K1,6,3);shake(K2,6,3);
// everybody freezes and looks at the window
eyesMode(K1,'wide');bm(K1,'mO');look(K1,-20,-26,.08);brows(K1,-18,18,-16,.1);tl.to('#boHead',{rotation:-6,duration:.2},K1);
tl.fromTo('#boSq',{y:0},{y:-70,duration:.15,ease:'power2.out'},K1).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},K1+.15);
RK.m(K1,'mO');RK.eyes(K1,'wide');RK.look(K1,-16,-20,.08);RK.brows(K1,-20,20,-12,.1);
tl.fromTo('#rkSq',{y:0},{y:-40,duration:.15,ease:'power2.out'},K1).to('#rkSq',{y:0,duration:.2,ease:'bounce.out'},K1+.15);
tl.set('#panEyesClosed',{opacity:0},K1);tl.set('#panEyes',{opacity:1},K1);FJ.pm(K1,'Oh');FJ.look(K1,-10,-12,.08);
tl.fromTo('#panSq',{scaleY:1},{scaleY:1.12,duration:.15,yoyo:true,repeat:1},K1);
// Barnaby: "Is it snack time yet?"
const bn=W(9,0);
for(let i=0;i<WD[9].length;i++){tl.fromTo('#barnIn',{scaleY:1},{scaleY:1.06,duration:.1,yoyo:true,repeat:1},W(9,i));}
tl.fromTo('.bEye',{scaleY:1},{scaleY:.1,duration:.06,yoyo:true,repeat:1},K2+.5);
// reactions mellow into curiosity
bm(L[9],'mO');look(L[9],-20,-24,.1);RK.look(L[9],-16,-20,.1);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},L9E+.12);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},L9E+.55);
// final button: everyone hops on the last chord
tl.to('#boSq',{y:-60,duration:.15,ease:'power2.out'},29.4).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},29.55);
tl.to('#rkSq',{y:-50,duration:.15,ease:'power2.out'},29.4).to('#rkSq',{y:0,duration:.2,ease:'bounce.out'},29.55);
tl.to('#pan',{y:TUBY-50,duration:.15,ease:'power2.out'},29.4).to('#pan',{y:TUBY,duration:.2,ease:'bounce.out'},29.55);
bm(29.4,'mBig');

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

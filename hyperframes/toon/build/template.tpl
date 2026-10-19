<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>Bo and the Last Pancake</title>
<script src="vendor/gsap.min.js"></script>
<style>
@font-face{font-family:'ToonBlack';src:url('assets/fonts/ToonBlack.ttf');font-weight:900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#FBCB93}
#root{position:relative;width:100%;height:100%;overflow:hidden;background:#FBCB93;font-family:'ToonBlack',sans-serif;font-weight:900}
#shake{position:absolute;left:0;top:0;width:1080px;height:1920px}
#cam{position:absolute;left:0;top:0;width:2600px;height:2200px}
#world{display:block}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 55%,rgba(60,28,10,.38) 100%);pointer-events:none}
#caps{position:absolute;left:0;right:0;top:215px;height:380px;pointer-events:none}
.cg{position:absolute;left:30px;right:30px;top:90px;text-align:center;font-size:80px;line-height:1.08;letter-spacing:0;color:#fff;opacity:0}
.cg .w{display:inline-block;margin:0 20px;color:#fff;-webkit-text-stroke:15px #2b1a14;paint-order:stroke fill;text-shadow:0 8px 0 rgba(43,26,20,.55)}
#sticker{position:absolute;left:50%;top:260px;width:900px;margin-left:-450px;text-align:center;opacity:0}
.stk1{display:block;background:#FFE14D;border:12px solid #2b1a14;border-radius:60px;padding:30px 20px 24px;font-size:104px;line-height:1.02;color:#2b1a14;box-shadow:0 14px 0 rgba(43,26,20,.5)}
.stk2{display:inline-block;margin-top:26px;background:#2EBE85;border:10px solid #2b1a14;border-radius:44px;padding:12px 34px;font-size:50px;color:#fff;-webkit-text-stroke:0;text-shadow:3px 3px 0 #2b1a14}
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
</defs>

<!-- ============ KITCHEN ============ -->
<rect x="0" y="0" width="2600" height="1360" fill="url(#gWall)"/>
<rect x="0" y="0" width="2600" height="1000" fill="url(#pDots)"/>
<rect x="0" y="1000" width="2600" height="360" fill="url(#pTile)"/>
<rect x="-10" y="990" width="2620" height="22" fill="#fff" stroke="#2b1a14" stroke-width="6"/>
<rect x="0" y="1360" width="2600" height="840" fill="url(#pFloor)"/>
<rect x="-10" y="1340" width="2620" height="36" fill="#fff" stroke="#2b1a14" stroke-width="7"/>

<!-- window -->
<g id="window">
 <rect x="300" y="300" width="500" height="470" rx="26" fill="#fff" stroke="#2b1a14" stroke-width="9"/>
 <rect x="334" y="334" width="432" height="402" rx="12" fill="url(#gSky)" stroke="#2b1a14" stroke-width="6"/>
 <circle cx="660" cy="430" r="52" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <g fill="#fff" stroke="#2b1a14" stroke-width="5"><ellipse cx="440" cy="490" rx="70" ry="30"/><ellipse cx="500" cy="470" rx="52" ry="34"/></g>
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

<!-- ============ FRIDGE (back, interior) ============ -->
<ellipse cx="2170" cy="1612" rx="240" ry="30" fill="rgba(60,30,10,.2)"/>
<g id="fridgeBack">
 <rect x="1980" y="420" width="380" height="1180" rx="46" fill="#8FD9C0" stroke="#2b1a14" stroke-width="9"/>
 <rect x="1996" y="880" width="348" height="700" rx="22" fill="url(#gFridgeIn)" stroke="#2b1a14" stroke-width="6"/>
 <rect x="1996" y="1012" width="348" height="16" fill="#CFE9E0" stroke="#2b1a14" stroke-width="5"/>
 <rect x="1996" y="1190" width="348" height="16" fill="#CFE9E0" stroke="#2b1a14" stroke-width="5"/>
 <rect x="1996" y="1486" width="348" height="16" fill="#CFE9E0" stroke="#2b1a14" stroke-width="5"/>
 <rect x="2030" y="900" width="64" height="112" rx="10" fill="#fff" stroke="#2b1a14" stroke-width="5"/><rect x="2030" y="900" width="64" height="38" fill="#7FB4FF" stroke="#2b1a14" stroke-width="5"/>
 <rect x="2130" y="940" width="70" height="72" rx="14" fill="#FF8F5A" stroke="#2b1a14" stroke-width="5"/>
 <circle cx="2272" cy="978" r="34" fill="#E8484F" stroke="#2b1a14" stroke-width="5"/>
 <path d="M2040,1190 L2130,1190 L2086,1132Z" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <g fill="#FFF3DA" stroke="#2b1a14" stroke-width="5"><ellipse cx="2230" cy="1172" rx="22" ry="28"/><ellipse cx="2280" cy="1172" rx="22" ry="28"/></g>
 <rect x="2020" y="1508" width="300" height="60" rx="14" fill="#8FD9C0" stroke="#2b1a14" stroke-width="5"/>
 <rect x="2000" y="440" width="340" height="420" rx="26" fill="#A6E6CF" stroke="#2b1a14" stroke-width="7"/>
 <rect x="2010" y="560" width="22" height="200" rx="11" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <circle cx="2160" cy="540" r="34" fill="#FF6B8B" stroke="#2b1a14" stroke-width="5"/>
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
 <ellipse cx="680" cy="1166" rx="160" ry="22" fill="#fff" stroke="#6FB7E9" stroke-width="7"/>
 <ellipse cx="680" cy="1165" rx="112" ry="12" fill="#E3F4FF"/>
</g>

<!-- pancake lives here: in front of table/fridge-interior, behind fridge door -->
<g id="panLayer"><g id="panMount"></g></g>

<!-- fridge door: hinged on the right edge, opens by narrowing -->
<g id="fridgeDoor">
 <rect x="1980" y="880" width="380" height="720" rx="34" fill="#A6E6CF" stroke="#2b1a14" stroke-width="9"/>
 <rect x="2008" y="1000" width="22" height="230" rx="11" fill="#fff" stroke="#2b1a14" stroke-width="5"/>
 <path d="M2150,960 l14,32 34,3 -26,22 8,34 -30,-18 -30,18 8,-34 -26,-22 34,-3z" fill="#FFD84A" stroke="#2b1a14" stroke-width="5"/>
 <rect x="2200" y="1240" width="110" height="130" rx="8" fill="#fff" stroke="#2b1a14" stroke-width="5" transform="rotate(4 2255 1305)"/>
 <path d="M2220,1330 q20,-40 40,0 t40,0" fill="none" stroke="#FF8F5A" stroke-width="7" stroke-linecap="round" transform="rotate(4 2255 1305)"/>
</g>

<!-- speech bubble -->
<g id="bubble" opacity="0">
 <g transform="translate(2168,1180)"><g id="bubbleIn">
  <path d="M-160,-170 Q-180,-170 -180,-142 L-180,-72 Q-180,-44 -152,-44 L-70,-44 L-30,10 L-14,-44 L152,-44 Q180,-44 180,-72 L180,-142 Q180,-170 152,-170Z" fill="#fff" stroke="#2b1a14" stroke-width="7" stroke-linejoin="round"/>
  <text x="0" y="-92" text-anchor="middle" font-family="ToonBlack" font-size="42" fill="#2b1a14">please don't!</text>
 </g></g>
</g>

<g id="boMount"></g>
<g id="bowlMount"></g>
<g id="heartsMount"></g>
</svg>
</div></div>

<div id="vig"></div>
<div id="caps"></div>
<div id="sticker"><span class="stk1">WOULD YOU EAT IT?</span><span class="stk2">COMMENT YES OR NO!</span></div>
<div id="flash"></div>

<audio id="a-vo" src="assets/vo.wav" data-start="0" data-duration="30" data-track-index="1" data-volume="1"></audio>
<audio id="a-music" src="assets/music.wav" data-start="0" data-duration="30" data-track-index="2" data-volume="1"></audio>
<audio id="a-sfx" src="assets/sfx.wav" data-start="0" data-duration="30" data-track-index="3" data-volume="1"></audio>
</div>

<script>
const OL='#2b1a14', OR='#F58A2B', CR='#FFEBCB', GR='#2EBE85', BR='#7A3E1D', MW='#7B1E2C';
const sw=(w)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

/* ---------------- BO THE FOX ---------------- */
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

/* ---------------- THE PANCAKE ---------------- */
const leg=(x,s)=>`<g transform="translate(${x},-8)"><g id="${s}"><path d="M0,0 L${x<0?-6:6},50" fill="none" ${sw(10)}/><ellipse cx="${x<0?-14:14}" cy="56" rx="26" ry="12" fill="#fff" ${sw(5)}/></g></g>`;
const arm=(x,s,d)=>`<g transform="translate(${x},-62)"><g id="${s}"><path d="M0,0 Q${d*40},0 ${d*52},-34" fill="none" ${sw(9)}/><circle cx="${d*52}" cy="-34" r="11" fill="#FFE3B8" ${sw(5)}/></g></g>`;
const pe=(x)=>`<g transform="translate(${x},-62)"><g class="panEyeW"><g class="panEye"><circle r="21" fill="#fff" ${sw(5)}/><g class="panPupil"><circle r="10" fill="${OL}"/><circle cx="-3" cy="-4" r="4" fill="#fff"/></g></g></g></g>`;
document.getElementById('panMount').innerHTML=`
<g id="pan"><g id="panShake"><g id="panSq">
 <g id="panLegs" opacity="0">${leg(-52,'panLegL')}${leg(52,'panLegR')}</g>
 <path d="M-130,-118 L-130,-48 Q-130,-6 -86,-6 L86,-6 Q130,-6 130,-48 L130,-118Z" fill="#D9902F" ${sw(7)}/>
 <ellipse cx="0" cy="-118" rx="130" ry="38" fill="#F9CE72" ${sw(7)}/>
 <ellipse cx="0" cy="-118" rx="98" ry="25" fill="#EDB04A" opacity=".8"/>
 <ellipse cx="-60" cy="-122" rx="14" ry="6" fill="#D9902F" opacity=".7"/><ellipse cx="70" cy="-112" rx="12" ry="5" fill="#D9902F" opacity=".7"/>
 <ellipse cx="10" cy="-124" rx="74" ry="20" fill="#B35A12" opacity=".95"/>
 <path d="M-40,-120 L-40,-92 Q-30,-84 -20,-92 L-20,-116Z M36,-118 L36,-84 Q46,-76 56,-84 L56,-114Z" fill="#B35A12"/>
 <rect x="-34" y="-158" width="68" height="40" rx="9" fill="#FFE98A" ${sw(5)}/><path d="M-22,-146 L8,-146" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>
 <ellipse cx="-80" cy="-40" rx="14" ry="9" fill="#FF8A8A" opacity=".5"/><ellipse cx="80" cy="-40" rx="14" ry="9" fill="#FF8A8A" opacity=".5"/>
 <g id="panEyesClosed"><path d="M-62,-62 Q-42,-80 -22,-62" fill="none" ${sw(6)}/><path d="M22,-62 Q42,-80 62,-62" fill="none" ${sw(6)}/></g>
 <g id="panEyes" opacity="0">${pe(-42)}${pe(42)}</g>
 <g transform="translate(-42,-100)"><path id="panBrowL" d="M-24,0 L24,0" fill="none" ${sw(8)} opacity="0"/></g>
 <g transform="translate(42,-100)"><path id="panBrowR" d="M-24,0 L24,0" fill="none" ${sw(8)} opacity="0"/></g>
 <g transform="translate(0,-30)" id="panMouth">
  <g id="pmSmile"><path d="M-24,0 Q0,22 24,0" fill="none" ${sw(6)}/></g>
  <g id="pmGrin" opacity="0"><path d="M-28,-2 Q0,-6 28,-2 Q26,30 0,32 Q-26,30 -28,-2Z" fill="${MW}" ${sw(5)}/><ellipse cx="0" cy="22" rx="13" ry="8" fill="#FF8FA0"/></g>
  <g id="pmWorry" opacity="0"><path d="M-22,10 Q0,-10 22,10" fill="none" ${sw(6)}/></g>
  <g id="pmO" opacity="0"><ellipse cx="0" cy="6" rx="13" ry="15" fill="${MW}" ${sw(5)}/></g>
 </g>
 <g id="panArms" opacity="0">${arm(-128,'panArmL',-1)}${arm(128,'panArmR',1)}</g>
 <g id="panTear" opacity="0" transform="translate(-60,-40)"><path d="M0,-14 C9,-2 12,4 0,10 C-12,4 -9,-2 0,-14Z" fill="#8AD7FF" ${sw(3)}/></g>
</g></g></g>`;

/* ---------------- cereal bowl + spoon (final scene) ---------------- */
document.getElementById('bowlMount').innerHTML=`
<g id="bowl" opacity="0"><g id="bowlIn">
 <path d="M-100,-30 L100,-30 Q94,64 0,74 Q-94,64 -100,-30Z" fill="#fff" ${sw(7)}/>
 <path d="M-88,10 Q0,34 88,10" fill="none" stroke="#6FB7E9" stroke-width="10" stroke-linecap="round"/>
 <ellipse cx="0" cy="-30" rx="100" ry="22" fill="#fff" ${sw(7)}/><ellipse cx="0" cy="-30" rx="84" ry="15" fill="#FFF6DD"/>
 <g fill="none" stroke="#E7A33A" stroke-width="9"><circle cx="-40" cy="-34" r="9"/><circle cx="-6" cy="-30" r="9"/><circle cx="32" cy="-36" r="9"/><circle cx="58" cy="-28" r="8"/><circle cx="-62" cy="-26" r="8"/></g>
</g></g>
<g id="spoon" opacity="0"><g id="spoonIn"><path d="M0,0 L70,-70" stroke="#C9CED6" stroke-width="12" stroke-linecap="round"/><ellipse cx="-4" cy="6" rx="26" ry="16" transform="rotate(-40 -4 6)" fill="#E5E9F0" ${sw(5)}/></g></g>`;

/* ---------------- hearts + sparkles + steam ---------------- */
const heartPath='M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z';
const starPath='M0,-26 Q4,-4 26,0 Q4,4 0,26 Q-4,4 -26,0 Q-4,-4 0,-26Z';
let hm='';
for(let i=0;i<7;i++) hm+=`<g transform="translate(${430+i*52},1100)"><g class="hrt" opacity="0"><path d="${heartPath}" fill="#FF3D6E" ${sw(3)}/></g></g>`;
for(let i=0;i<6;i++) hm+=`<g transform="translate(${[610,760,640,730,690,560][i]},${[1020,1050,960,990,900,1060][i]})"><g class="spk" opacity="0"><path d="${starPath}" fill="#FFF6B0" stroke="#FFD84A" stroke-width="3"/></g></g>`;
for(let i=0;i<3;i++) hm+=`<g transform="translate(${640+i*40},1000)"><path class="steam s${i}" opacity="0" d="M0,0 C14,-26 -14,-46 0,-76 C14,-106 -14,-126 0,-156" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>`;
document.getElementById('heartsMount').innerHTML=hm;

/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const WORDS=__WORDS__;
const LINE_T={1:.30,2:3.70,3:9.45,4:13.45,5:18.20,6:22.50};
const CHUNKS={
 1:["WOULD YOU EAT","THE LAST PANCAKE?","BO THE FOX DID!"],
 2:["IT WAS WARM,","GOLDEN, AND","ABSOLUTELY PERFECT.","BO ONLY WANTED","ONE TINY BITE."],
 3:["BUT THE PANCAKE","HAD OTHER PLANS.","IT JUMPED OFF","THE PLATE, AND RAN!"],
 4:["BO CHASED IT","OVER THE TABLE,","THROUGH THE KITCHEN,","AND STRAIGHT INTO","THE FRIDGE!"],
 5:["FINALLY, BO","OPENED WIDE...","BUT THE PANCAKE","WHISPERED...","PLEASE DON'T!"],
 6:["SO BO ATE","CEREAL INSTEAD.","NOW, WOULD YOU","EAT THE LAST","PANCAKE?"]};
const capsEl=document.getElementById('caps'), allChunks=[];
for(const ln of [1,2,3,4,5,6]){let idx=0;const ws=WORDS[ln];
 for(const txt of CHUNKS[ln]){const el=document.createElement('div');el.className='cg';
  const items=txt.split(' ').map(p=>{const sp=document.createElement('span');sp.className='w';sp.textContent=p;el.appendChild(sp);const w=ws[idx++];return{sp,s:LINE_T[ln]+w.s,e:LINE_T[ln]+w.e};});
  capsEl.appendChild(el);allChunks.push({el,items});}}

/* ---------------- TIMELINE ---------------- */
const tl=gsap.timeline({paused:true});
// every fromTo starts at its own time (not at authoring time) so seeks are deterministic
{const _ft=tl.fromTo.bind(tl);tl.fromTo=(t,f,to,pos)=>_ft(t,f,Object.assign({immediateRender:false},to),pos);}
const FLOOR=1640, TT=1165, PL=68;
gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#bubbleIn',{svgOrigin:'0 0'});
gsap.set('#fridgeDoor',{svgOrigin:'2360 0'});
gsap.set('#boSq,#boLean,#boBody,#panSq,#panShake,#bowlIn,.spk,.hrt',{svgOrigin:'0 0'});
// pivots: every part is drawn around its own origin inside a translated parent
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil,#panLegL,#panLegR,#panArmL,#panArmR,.panEye,.panEyeW,.panPupil,#panBrowL,#panBrowR',{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
gsap.set('#pan',{x:680,y:TT-5});
gsap.set('#bo',{x:60,y:FLOOR});
gsap.set('#bowl',{x:510,y:1500});
gsap.set('#spoon',{x:590,y:1470});

let camCur=null;
const camSet=(t,x0,y0,s)=>{camCur=[x0,y0,s];tl.set('#cam',{x:-x0*s,y:-y0*s,scale:s},t);};
const camTo=(t,d,x0,y0,s,ease='sine.inOut')=>{const [a,b,c]=camCur;tl.fromTo('#cam',{x:-a*c,y:-b*c,scale:c},{x:-x0*s,y:-y0*s,scale:s,duration:d,ease},t);camCur=[x0,y0,s];};
const shake=(t,amp=14,n=6)=>{for(let i=0;i<n;i++){tl.to('#shake',{x:(i%2?1:-1)*amp*(1-i/n),y:(i%2?-1:1)*amp*.7*(1-i/n),duration:.045},t+i*.045);}tl.to('#shake',{x:0,y:0,duration:.05},t+n*.045);};
const MOUTHS=['mSmile','mOpen','mBig','mFrown','mO'], PMS=['pmSmile','pmGrin','pmWorry','pmO'];
const bm=(t,m)=>MOUTHS.forEach(k=>tl.set('#'+k,{opacity:k===m?1:0},t));
const pm=(t,m)=>PMS.forEach(k=>tl.set('#'+k,{opacity:k===m?1:0},t));
const blink=(t)=>{tl.to('.boEye',{scaleY:.1,duration:.05},t).to('.boEye',{scaleY:1,duration:.07},t+.06);};
const pBlink=(t)=>{tl.to('.panEye',{scaleY:.1,duration:.05},t).to('.panEye',{scaleY:1,duration:.07},t+.06);};
const look=(t,dx,dy,d=.14)=>tl.to('.boPupil',{x:dx,y:dy,duration:d,ease:'power2.out'},t);
const plook=(t,dx,dy,d=.12)=>tl.to('.panPupil',{x:dx,y:dy,duration:d,ease:'power2.out'},t);
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

/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.22;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:'#FFE14D',scale:1.16,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ================= SCENE 1  (0 – 3.5)  hook: Bo sneaks up on the last pancake ================= */
camSet(0,110,380,1.15);camTo(0,3.5,170,440,1.3,'sine.inOut');
tl.fromTo('#bo',{x:40},{x:380,duration:1.9,ease:'sine.out'},.15);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],.15,1.9,.34,18,10,'#boSq',12);
tl.fromTo('#boTail',{rotation:-6},{rotation:8,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},0);
look(.2,16,-12);bm(.1,'mSmile');brows(.4,-10,10,-8);
tl.fromTo('.spk',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.22,ease:'back.out(3)',stagger:.12},.3).to('.spk',{opacity:0,scale:.3,duration:.25,stagger:.1},1.5);
tl.fromTo('#panSq',{scaleY:1},{scaleY:1.025,duration:.7,yoyo:true,repeat:4,ease:'sine.inOut'},0);
tl.fromTo('#boBody',{scaleY:1},{scaleY:1.02,duration:.6,yoyo:true,repeat:5,ease:'sine.inOut'},0);
bm(2.1,'mOpen');brows(2.1,-16,16,-14);blink(1.2);
tl.to('#boHead',{rotation:-6,duration:.3,ease:'back.out(2)'},2.1);

/* ================= SCENE 2  (3.5 – 9.3)  yum: heart eyes, steam, "one tiny bite" ================= */
camSet(3.5,215,575,1.55);camTo(3.5,5.8,240,600,1.85,'sine.inOut');
shake(3.5,10,4);
tl.set('#bo',{x:380},3.5);tl.set('#boHead',{rotation:0},3.5);
eyesMode(3.7,'hearts');bm(3.7,'mOpen');look(3.5,0,0,.01);
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.14,duration:.35,yoyo:true,repeat:11,ease:'sine.inOut'},3.75);
tl.fromTo('#boHead',{rotation:-4},{rotation:5,duration:.8,yoyo:true,repeat:6,ease:'sine.inOut'},3.8);
tl.fromTo('#boEarL',{rotation:0},{rotation:-10,duration:.4,yoyo:true,repeat:11,ease:'sine.inOut'},3.8);
tl.fromTo('#boEarR',{rotation:0},{rotation:-10,duration:.4,yoyo:true,repeat:11,ease:'sine.inOut'},4.0);
tl.fromTo('#boScarfTail',{rotation:-4},{rotation:8,duration:.5,yoyo:true,repeat:10,ease:'sine.inOut'},3.5);
tl.fromTo('#boTail',{rotation:-8},{rotation:10,duration:.35,yoyo:true,repeat:15,ease:'sine.inOut'},3.5);
// steam
for(let i=0;i<3;i++){for(let r=0;r<4;r++){const t=3.9+i*.45+r*1.35;tl.fromTo('.s'+i,{opacity:0,y:0},{opacity:.75,y:-30,duration:.6,ease:'sine.out'},t).to('.s'+i,{opacity:0,y:-60,duration:.7},t+.6);}}
// sparkles on "golden" and "perfect"
[[4.55,0],[6.2,3]].forEach(([t,o])=>{tl.fromTo('.spk',{opacity:0,scale:.2,rotation:0},{opacity:1,scale:1.1,rotation:40,duration:.25,ease:'back.out(3)',stagger:.07},t).to('.spk',{opacity:0,scale:.2,duration:.3,stagger:.05},t+.55);});
tl.fromTo('#panSq',{scaleY:1,scaleX:1},{scaleY:1.04,scaleX:.99,duration:.6,yoyo:true,repeat:8,ease:'sine.inOut'},3.5);
// "one tiny bite": pinch gesture
tl.to('#boArmR',{rotation:-115,duration:.35,ease:'back.out(2)'},7.5).to('#boArmR',{rotation:-100,duration:.18,yoyo:true,repeat:3},7.9).to('#boArmR',{rotation:0,duration:.4},8.9);
bm(7.6,'mSmile');brows(7.6,-14,14,-12);
// licks lips / leans in
bm(8.5,'mBig');tl.to('#boLean',{rotation:5,duration:.5,ease:'sine.in'},8.5);tl.to('#boLean',{rotation:0,duration:.01},9.3);
blink(5.4);blink(7.1);

/* ================= SCENE 3  (9.3 – 13.3)  the pancake wakes up and RUNS ================= */
camSet(9.3,200,540,1.35);camTo(9.9,2,320,510,1.35,'sine.inOut');
shake(9.3,12,4);
tl.set('#boLean',{rotation:0},9.3);eyesMode(9.31,'normal');bm(9.3,'mSmile');brows(9.3,0,0,0,.01);look(9.3,10,-10,.01);
tl.set('#bo',{x:380},9.3);
// wake up
tl.set('#panEyesClosed',{opacity:0},10.3);tl.set('#panEyes',{opacity:1},10.3);
tl.fromTo('.panEyeW',{scale:.2},{scale:1,duration:.2,ease:'back.out(3)'},10.3);
tl.set('#panBrowL,#panBrowR',{opacity:1},10.45);tl.to('#panBrowL',{rotation:16,duration:.12},10.45);tl.to('#panBrowR',{rotation:-16,duration:.12},10.45);
pm(10.5,'pmGrin');plook(10.5,-9,2);plook(11.1,8,-3);
tl.fromTo('#panSq',{scaleX:1,scaleY:1},{scaleX:1.12,scaleY:.84,duration:.14,ease:'power2.out'},11.12);
// jump off the plate (11.3 – 11.95) onto the table, then run
tl.set('#panLegs',{opacity:1},11.28);tl.set('#panArms',{opacity:1},11.28);
tl.to('#panSq',{scaleX:.86,scaleY:1.22,duration:.16,ease:'power2.out'},11.28);
tl.fromTo('#pan',{x:680},{x:800,duration:.62,ease:'none'},11.3);
tl.fromTo('#pan',{y:TT-5},{y:900,duration:.33,ease:'power2.out'},11.3).to('#pan',{y:TT-PL,duration:.3,ease:'power2.in'},11.63);
tl.to('#panSq',{scaleX:1.18,scaleY:.82,duration:.08},11.93).to('#panSq',{scaleX:1,scaleY:1,duration:.16,ease:'back.out(2)'},12.01);
tl.fromTo('#panArmL',{rotation:0},{rotation:-30,duration:.3,ease:'back.out(2)'},11.3);tl.fromTo('#panArmR',{rotation:0},{rotation:30,duration:.3,ease:'back.out(2)'},11.3);
// Bo reacts: gasp + hop back
eyesMode(11.45,'wide');bm(11.45,'mBig');brows(11.45,-18,18,-18);look(11.45,10,-6,.05);
tl.set('#boSweat',{opacity:1},11.7);
tl.fromTo('#boSq',{y:0},{y:-130,duration:.2,ease:'power2.out'},11.5).to('#boSq',{y:0,duration:.22,ease:'bounce.out'},11.7);
tl.to('#boArmL',{rotation:140,duration:.2,ease:'back.out(2)'},11.5);tl.to('#boArmR',{rotation:-140,duration:.2,ease:'back.out(2)'},11.5);
tl.to('#boLean',{rotation:-9,duration:.25},11.5);
tl.to('#bo',{x:345,duration:.3,ease:'power2.out'},11.5);
shake(11.95,8,4);
// pancake runs along the table (12.0 – 14.35)
cycle(['#panLegL','#panLegR'],['#panArmL','#panArmR'],12.0,14.35,.2,34,40,'#panSq',16);
tl.fromTo('#pan',{x:800},{x:1455,duration:2.35,ease:'power1.in'},12.0);
pm(12.6,'pmGrin');plook(12.6,-10,0);
// Bo vows to chase
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},12.2);tl.to('#boLean',{rotation:0,duration:.2},12.2);
eyesMode(12.25,'normal');bm(12.25,'mFrown');brows(12.25,16,-16,0);tl.set('#boSweat',{opacity:0},12.3);look(12.25,18,-4,.06);

/* ================= SCENE 4  (13.3 – 18.0)  the chase ================= */
camTo(11.9,1.6,820,520,1.2,'sine.inOut');camTo(13.5,1.7,1150,480,1.15,'sine.inOut');camTo(15.2,1.7,1440,450,1.15,'sine.inOut');
// Bo runs after it (12.5 – 16.85)
tl.fromTo('#bo',{x:345},{x:1830,duration:4.35,ease:'power1.in'},12.5);
tl.to('#boLean',{rotation:12,duration:.3},12.5);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],12.5,16.7,.26,34,42,'#boSq',16);
tl.fromTo('#boTail',{rotation:-12},{rotation:12,duration:.13,yoyo:true,repeat:30,ease:'sine.inOut'},12.5);
tl.fromTo('#boScarfTail',{rotation:-20},{rotation:25,duration:.12,yoyo:true,repeat:34,ease:'sine.inOut'},12.5);
bm(14.0,'mOpen');
// pancake leaps off the table end (14.35 – 14.95) and sprints across the kitchen floor
tl.fromTo('#pan',{x:1455},{x:1640,duration:.6,ease:'none'},14.35);
tl.fromTo('#pan',{y:TT-PL},{y:900,duration:.3,ease:'power2.out'},14.35).to('#pan',{y:FLOOR-PL,duration:.3,ease:'power2.in'},14.65);
tl.to('#panSq',{scaleX:1.2,scaleY:.8,duration:.07},14.93).to('#panSq',{scaleX:1,scaleY:1,duration:.15,ease:'back.out(2)'},15.0);
cycle(['#panLegL','#panLegR'],['#panArmL','#panArmR'],14.95,16.05,.17,38,45,'#panSq',18);
tl.fromTo('#pan',{x:1640},{x:1960,duration:1.1,ease:'none'},14.95);
// the fridge door swings open, pancake hops in, door slams
tl.fromTo('#fridgeDoor',{scaleX:1},{scaleX:.12,duration:.38,ease:'back.out(1.6)'},15.6);
tl.fromTo('#pan',{x:1960},{x:2150,duration:.45,ease:'none'},16.05);
tl.fromTo('#pan',{y:FLOOR-PL},{y:1230,duration:.22,ease:'power2.out'},16.05).to('#pan',{y:1486-PL,duration:.23,ease:'power2.in'},16.27);
tl.fromTo('#fridgeDoor',{scaleX:.12},{scaleX:1,duration:.1,ease:'power3.in'},16.6);
shake(16.68,20,8);
tl.fromTo('#fridgeBack',{x:0},{x:5,duration:.05,yoyo:true,repeat:5},16.7);
// Bo skids and bumps the fridge
tl.to('#boLean',{rotation:-14,duration:.2,ease:'power2.out'},16.7);
tl.to('#boSq',{scaleX:1.12,scaleY:.9,duration:.12},16.88).to('#boSq',{scaleX:1,scaleY:1,duration:.3,ease:'elastic.out(1,.4)'},17.0);
tl.to('#boLean',{rotation:0,duration:.35,ease:'back.out(2)'},17.05);
eyesMode(17.0,'wide');bm(17.0,'mO');brows(17.0,-14,14,-16);look(17.0,16,0);
tl.to('#boHead',{rotation:-8,duration:.1},17.0).to('#boHead',{rotation:0,duration:.3,ease:'elastic.out(1,.4)'},17.1);
bm(17.5,'mFrown');eyesMode(17.5,'normal');brows(17.5,18,-18,0);

/* ================= SCENE 5  (18.0 – 22.3)  the fridge reveal: "please don't!" ================= */
camSet(18.0,1640,610,1.5);camTo(18.0,4.2,1700,750,1.65,'sine.inOut');
shake(18.0,10,4);
tl.set('#fridgeDoor',{scaleX:1},18.0);tl.set('#pan',{x:2150,y:1486-PL},18.0);tl.set('#panLegs',{opacity:0},18.0);
tl.set('#bo',{x:1830},18.0);tl.set('#boLean',{rotation:0},18.0);
brows(18.0,18,-18,0,.01);bm(18.0,'mFrown');look(18.0,16,0,.01);
tl.fromTo('#boScarfTail',{rotation:-6},{rotation:6,duration:.5,yoyo:true,repeat:6,ease:'sine.inOut'},18.0);
tl.to('#boArmR',{rotation:-98,duration:.3,ease:'back.out(2)'},18.3);
tl.fromTo('#fridgeDoor',{scaleX:1},{scaleX:.12,duration:.4,ease:'power2.out'},18.7);
tl.to('#boArmR',{rotation:-60,duration:.3},18.95);
// pancake trembles, eyes huge
pm(18.75,'pmWorry');tl.set('#panEyesClosed',{opacity:0},18.0);
plook(18.8,-6,0);
tl.fromTo('#panShake',{rotation:-2.2},{rotation:2.2,duration:.06,yoyo:true,repeat:35},18.9);tl.set('#panShake',{rotation:0},21.2);
tl.to('#panBrowL',{rotation:-18,duration:.2},18.8);tl.to('#panBrowR',{rotation:18,duration:.2},18.8);
tl.to('#panArmL',{rotation:-130,duration:.3,ease:'back.out(2)'},19.6);tl.to('#panArmR',{rotation:130,duration:.3,ease:'back.out(2)'},19.6);
// Bo "opened wide": big hungry mouth, leans in
bm(19.1,'mBig');eyesMode(19.1,'hearts');tl.to('#boLean',{rotation:9,duration:.5,ease:'sine.inOut'},19.2);
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.16,duration:.18,yoyo:true,repeat:7},19.2);
tl.fromTo('#boHead',{rotation:-3},{rotation:3,duration:.3,yoyo:true,repeat:4,ease:'sine.inOut'},19.2);
// pancake whispers: mouth flutters, tear, speech bubble
for(let i=0;i<5;i++){pm(20.45+i*.24,i%2?'pmO':'pmWorry');}
pm(21.4,'pmO');pm(21.55,'pmWorry');pm(21.7,'pmO');pm(21.85,'pmWorry');
tl.fromTo('.panPupil',{scale:1},{scale:1.5,duration:.3,ease:'back.out(2)'},20.4);
tl.set('#panTear',{opacity:1},20.7);tl.fromTo('#panTear',{y:0},{y:46,duration:.7,ease:'power1.in'},20.7).to('#panTear',{opacity:0,duration:.1},21.35);
tl.fromTo('#bubble',{opacity:0},{opacity:1,duration:.05},21.35);tl.fromTo('#bubbleIn',{scale:.3},{scale:1,duration:.25,ease:'back.out(2.6)'},21.35);
// Bo melts
bm(21.45,'mO');eyesMode(21.45,'normal');brows(21.5,-20,20,-10);
tl.set('#boSweat',{opacity:1},21.5);tl.to('#boLean',{rotation:0,duration:.5},21.5);tl.to('#boSq',{scaleY:.96,duration:.4},21.6);
look(21.5,-8,10);bm(21.9,'mFrown');
tl.fromTo('#flash',{opacity:0},{opacity:1,duration:.16,ease:'power1.in'},22.14).to('#flash',{opacity:0,duration:.35},22.3);

/* ================= SCENE 6  (22.3 – 30)  cereal instead + the loop question ================= */
camSet(22.3,110,380,1.15);camTo(22.3,7.7,175,450,1.28,'sine.inOut');
tl.set('#bubble',{opacity:0},22.3);tl.set('#boSweat',{opacity:0},22.3);tl.set('#boSq',{scaleX:1,scaleY:1,y:0},22.3);
tl.set('#bo',{x:380},22.3);tl.set('#pan',{x:680,y:TT-5},22.3);tl.set('#panShake',{rotation:0},22.3);
tl.set('#panLegs',{opacity:0},22.3);tl.set('#panArmL',{rotation:-20},22.3);tl.set('#panArmR',{rotation:20},22.3);
tl.set('#panBrowL,#panBrowR',{opacity:0},22.3);tl.set('.panPupil',{scale:1,x:0,y:0},22.3);
pm(22.3,'pmSmile');bm(22.3,'mSmile');brows(22.3,0,0,0,.01);look(22.3,0,0,.01);
tl.set('#bowl',{opacity:1},22.3);tl.set('#spoon',{opacity:1},22.3);
tl.fromTo('#bowlIn',{scale:.2},{scale:1,duration:.3,ease:'back.out(2.4)'},22.35);
tl.fromTo('#boScarfTail',{rotation:-4},{rotation:6,duration:.5,yoyo:true,repeat:14,ease:'sine.inOut'},22.3);
tl.fromTo('#boTail',{rotation:-8},{rotation:10,duration:.4,yoyo:true,repeat:16,ease:'sine.inOut'},22.3);
tl.fromTo('#panSq',{scaleY:1},{scaleY:1.03,duration:.5,yoyo:true,repeat:14,ease:'sine.inOut'},22.3);
// four happy bites
[22.95,23.4,23.85,24.3].forEach((t,i)=>{
 tl.fromTo('#spoon',{x:590,y:1470},{x:470,y:1290,duration:.2,ease:'power2.out'},t-.22);
 bm(t,'mOpen');tl.to('#boHead',{rotation:4,duration:.08},t);
 tl.to('#spoon',{x:590,y:1470,duration:.14,ease:'power2.in'},t+.08);
 bm(t+.1,'mSmile');tl.to('#boHead',{rotation:-3,duration:.1,yoyo:true,repeat:1},t+.14);});
blink(23.3);blink(25.1);
tl.to('#boArmR',{rotation:-38,duration:.3},22.5);tl.to('#boArmL',{rotation:38,duration:.3},22.5);
// "Now, would you eat the last pancake?": Bo looks at us; pancake winks
look(24.9,0,2);brows(24.9,-8,8,-12);bm(25.0,'mSmile');
tl.to('#boArmR',{rotation:0,duration:.3},24.7);tl.to('#boArmL',{rotation:0,duration:.3},24.7);
{const we=gsap.utils.toArray('.panEye')[1];tl.to(we,{scaleY:.1,duration:.06},26.0).to(we,{scaleY:1,duration:.1},26.4);}
pm(25.8,'pmGrin');
tl.to('#panArmR',{rotation:50,duration:.25,ease:'back.out(2)'},26.0).to('#panArmR',{rotation:20,duration:.2,yoyo:true,repeat:5},26.3);
// hearts float
tl.fromTo('.hrt',{opacity:0,y:0,scale:.3},{opacity:1,y:-80,scale:1,duration:.4,ease:'back.out(2)',stagger:.12},26.9);
tl.to('.hrt',{y:-420,opacity:0,duration:1.4,ease:'sine.out',stagger:.12},27.35);
// sticker + CTA
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-10},{opacity:1,scale:1,rotation:-3,duration:.35,ease:'back.out(2.4)'},26.75);
tl.fromTo('#sticker',{y:0},{y:-12,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},27.2);
// final button: little hop on the last chord
tl.to('#boSq',{y:-60,duration:.15,ease:'power2.out'},29.4).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},29.55);
tl.to('#pan',{y:TT-5-60,duration:.15,ease:'power2.out'},29.4).to('#pan',{y:TT-5,duration:.2,ease:'bounce.out'},29.55);
bm(29.4,'mBig');

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

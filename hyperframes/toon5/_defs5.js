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

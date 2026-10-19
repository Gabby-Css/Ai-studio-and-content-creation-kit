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

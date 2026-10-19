/* ---------------- BARNABY THE BEAR (cast #6: brown fur, tan muzzle, red bow tie) + the honey jar ---------------- */
const BRN='#B5722F', DBR='#8A4E1E', TAN='#F0CFA0';
const jarSVG=(id)=>`<g id="${id}"><g id="${id}In">
 <path d="M-58,-72 L-58,62 Q-58,80 -40,80 L40,80 Q58,80 58,62 L58,-72 Q58,-86 40,-86 L-40,-86 Q-58,-86 -58,-72Z" fill="#F2A900" ${sw(6)}/>
 <path d="M-40,-62 L-40,46" stroke="#FFE08A" stroke-width="11" stroke-linecap="round" opacity=".85"/>
 <rect x="-50" y="-116" width="100" height="34" rx="11" fill="#C9833A" ${sw(6)}/>
 <rect x="-42" y="-30" width="84" height="56" rx="9" fill="#FFF3D0" ${sw(4)}/>
 <text x="0" y="5" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="25" fill="#7A3E1D">HONEY</text>
 <path d="M-34,-86 q-5,34 9,38 q13,-4 7,-38z" fill="#FFC21A" ${sw(4)}/>
</g></g>`;
function bearSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${BRN}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${DBR}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(-100,-90)"><g id="${p}Tail"><circle r="30" fill="${BRN}" ${sw(6)}/></g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="133" ry="140" fill="${BRN}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="82" ry="104" fill="${TAN}"/></g>
  <g transform="translate(-116,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="30" ry="58" fill="${BRN}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="28" ry="25" fill="${DBR}" ${sw(7)}/></g></g>
  <g transform="translate(116,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="30" ry="58" fill="${BRN}" ${sw(7)}/><ellipse cx="4" cy="104" rx="28" ry="25" fill="${DBR}" ${sw(7)}/><g id="${p}JarG" transform="translate(4,196) scale(.85)">${jarSVG(p+'Jar')}</g></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-115,-211)"><g id="${p}EarL"><ellipse rx="51" ry="51" fill="${BRN}" ${sw(7)}/><ellipse cy="3" rx="28" ry="28" fill="${TAN}"/></g></g>
   <g transform="translate(115,-211)"><g id="${p}EarR"><ellipse rx="51" ry="51" fill="${BRN}" ${sw(7)}/><ellipse cy="3" rx="28" ry="28" fill="${TAN}"/></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="133" fill="${BRN}" ${sw(7)}/>
   <ellipse cx="0" cy="-52" rx="81" ry="55" fill="${TAN}"/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-73" rx="21" ry="14" fill="${OL}"/><circle cx="-7" cy="-77" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-40)">
    <g id="${p}mSm"><path d="M-34,0 Q0,24 34,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
  </g></g>
  <g transform="translate(0,-262)"><path d="M0,0 L-56,-30 L-56,30Z" fill="#E8484F" ${sw(6)}/><path d="M0,0 L56,-30 L56,30Z" fill="#E8484F" ${sw(6)}/><ellipse rx="16" ry="16" fill="#C93A40" ${sw(6)}/></g>
 </g>
</g></g></g>`;}

/* ---------------- NIBBLES THE MOUSE (cast #20) — head + paws + cheese, peeks out of a mouse hole ---------------- */
function nbSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const teeth=`<rect x="-24" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/><rect x="2" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-146,-201)"><g id="${p}EarL"><circle r="76" fill="#CFD3DC" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <g transform="translate(146,-201)"><g id="${p}EarR"><circle r="76" fill="#CFD3DC" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="133" fill="#CFD3DC" ${sw(7)}/>
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
   <g id="${p}Cheese" transform="translate(0,64)">
    <path d="M-72,26 L78,-18 L50,52Z" fill="#FFD84A" ${sw(6)}/><circle cx="26" cy="12" r="8" fill="#E8B52E"/><circle cx="-6" cy="28" r="6" fill="#E8B52E"/><circle cx="46" cy="30" r="5" fill="#E8B52E"/>
    <ellipse cx="-34" cy="24" rx="26" ry="20" fill="#F4A6B7" ${sw(6)}/><ellipse cx="40" cy="6" rx="26" ry="20" fill="#F4A6B7" ${sw(6)}/>
   </g>
  </g></g></g></g></g>`;}

/* ---------------- bees ---------------- */
const beeSVG=(i)=>`<g id="bee${i}w" opacity="0"><g id="bee${i}" class="beeB">
 <g id="bee${i}Wl"><ellipse cx="-4" cy="-17" rx="12" ry="19" transform="rotate(-22 -4 -17)" fill="#E8F6FF" stroke="${OL}" stroke-width="3" opacity=".92"/></g>
 <g id="bee${i}Wr"><ellipse cx="12" cy="-17" rx="12" ry="19" transform="rotate(22 12 -17)" fill="#E8F6FF" stroke="${OL}" stroke-width="3" opacity=".92"/></g>
 <ellipse cx="0" cy="0" rx="27" ry="19" fill="#FFD23F" ${sw(4)}/>
 <path d="M-7,-18 Q-1,0 -7,18 M11,-18 Q17,0 11,18" fill="none" stroke="${OL}" stroke-width="7"/>
 <circle cx="-28" cy="-1" r="12" fill="#FFD23F" ${sw(4)}/><circle cx="-32" cy="-4" r="3.6" fill="${OL}"/>
 <path d="M-36,-11 q-6,-10 -15,-8 M-30,-12 q-2,-12 -10,-15" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
 <path d="M27,0 l11,2 -11,4z" fill="${OL}"/>
</g></g>`;

document.getElementById('bwMount').innerHTML=bearSVG('bw');
document.getElementById('nbMount').innerHTML=nbSVG('nb');
document.getElementById('jarMount').innerHTML=jarSVG('jar');

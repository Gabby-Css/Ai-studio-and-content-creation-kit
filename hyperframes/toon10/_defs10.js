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

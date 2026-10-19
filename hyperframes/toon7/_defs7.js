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

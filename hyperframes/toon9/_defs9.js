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

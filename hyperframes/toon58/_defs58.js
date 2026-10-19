/* ================= #58 additions: the trapeze ladder with its small launch platform (base centre at 0,0, platform 740 px above) ================= */
const LDR_H=740;
const LDR_HTML=`<g id="ldrW" opacity="0"><g id="ldr"><ellipse cx="0" cy="14" rx="170" ry="24" fill="rgba(60,20,40,.28)"/>
 <path d="M-70,0 V${-LDR_H}" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M70,0 V${-LDR_H}" stroke="${OL}" stroke-width="30" stroke-linecap="round"/>
 <path d="M-70,0 V${-LDR_H}" stroke="#C98A4B" stroke-width="16" stroke-linecap="round"/><path d="M70,0 V${-LDR_H}" stroke="#C98A4B" stroke-width="16" stroke-linecap="round"/>
 ${Array.from({length:10},(_,i)=>`<path d="M-70,${-70-i*66} H70" stroke="${OL}" stroke-width="22" stroke-linecap="round"/><path d="M-70,${-70-i*66} H70" stroke="#E7B374" stroke-width="10" stroke-linecap="round"/>`).join('')}
 <g transform="translate(0,${-LDR_H})"><rect x="-210" y="-8" width="420" height="44" rx="12" fill="#8A5A2B" ${sw(8)}/><rect x="-170" y="-8" width="340" height="12" fill="#A9733A"/>
  <path d="M-190,-8 V-180 M190,-8 V-180 M-190,-120 H190" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M-190,-8 V-180 M190,-8 V-180 M-190,-120 H190" stroke="#E7B374" stroke-width="8" stroke-linecap="round"/>
  <path d="M-190,-180 V-290" stroke="${OL}" stroke-width="14" stroke-linecap="round"/><path d="M-190,-290 L-60,-250 L-190,-210Z" fill="#3FA3FF" ${sw(7)}/></g></g></g>`;

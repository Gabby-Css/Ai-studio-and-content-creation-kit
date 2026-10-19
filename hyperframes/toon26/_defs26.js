/* ================= episode 26 additions (Season 6, "The Mystery Egg"): Munch's big gray egg (cap + base, cracks, warm glow), his note, a gingham blanket, a banana thought bubble,
   and baby Pebble = a pink re-skin of the Gumdrop rig (a saturation filter keeps him gray until he tastes a pancake) ================= */
const EGGP='M0,-262 C128,-262 200,-96 200,34 C200,168 112,262 0,262 C-112,262 -200,168 -200,34 C-200,-96 -128,-262 0,-262Z';
const EGZZ='M-198,-30 L-150,-70 L-100,-22 L-50,-72 L0,-18 L50,-70 L100,-22 L150,-68 L198,-30';        // the seam the egg splits along (left to right)
const EGGART=`<path d="${EGGP}" fill="#CBD2DC"/>
 <g clip-path="url(#cpEggShape)">
  <g fill="#AEB8C6"><circle cx="-112" cy="-128" r="32"/><circle cx="98" cy="-176" r="22"/><circle cx="136" cy="-36" r="28"/><circle cx="-150" cy="28" r="24"/><circle cx="-56" cy="-214" r="14"/><circle cx="70" cy="132" r="30"/><circle cx="-104" cy="158" r="20"/><circle cx="22" cy="-118" r="12"/></g>
  <path d="M-214,84 L-150,46 L-100,86 L-50,46 L0,88 L50,46 L100,86 L150,46 L214,84" fill="none" stroke="#8D96A3" stroke-width="20" stroke-linejoin="round"/>
 </g>
 <g transform="translate(0,168) scale(.62) translate(0,135)"><path d="M0,-168 C-30,-196 -64,-168 -42,-140 C-28,-122 0,-102 0,-102 C0,-102 28,-122 42,-140 C64,-168 30,-196 0,-168Z" fill="#FF9BC4"/></g>
 <ellipse cx="-88" cy="-150" rx="30" ry="62" fill="#fff" opacity=".5" transform="rotate(22 -88 -150)"/>
 <path d="${EGGP}" fill="none" ${sw(8)}/>`;
document.getElementById('world').insertAdjacentHTML('afterbegin',`<defs>
 <radialGradient id="gEggGlow"><stop offset="0" stop-color="#FFF6B8" stop-opacity=".95"/><stop offset=".45" stop-color="#FFD36B" stop-opacity=".42"/><stop offset="1" stop-color="#FFD36B" stop-opacity="0"/></radialGradient>
 <clipPath id="cpEggShape"><path d="${EGGP}"/></clipPath>
 <clipPath id="cpEggTop"><path d="M-300,-330 L300,-330 L300,-30 L198,-30 L150,-68 L100,-22 L50,-70 L0,-18 L-50,-72 L-100,-22 L-150,-70 L-198,-30 L-300,-30Z"/></clipPath>
 <clipPath id="cpEggBot"><path d="M-300,330 L300,330 L300,-30 L198,-30 L150,-68 L100,-22 L50,-70 L0,-18 L-50,-72 L-100,-22 L-150,-70 L-198,-30 L-300,-30Z"/></clipPath>
 <filter id="fSat" color-interpolation-filters="sRGB" x="-30%" y="-30%" width="160%" height="160%"><feColorMatrix id="fSatM" type="saturate" values="1"/></filter>
</defs>`);
// the egg: origin = where it touches the ground; #eggWob rocks it around that point, #eggRoll turns it around its own centre (rolling), #eggHop lifts it
const EGG_HTML=`<g id="eggW" opacity="0">
 <ellipse cx="0" cy="8" rx="236" ry="30" fill="rgba(60,30,10,.22)"/>
 <g id="eggHop"><g id="eggWob"><g transform="translate(0,-262)"><g id="eggRoll">
  <circle id="eggGlow" r="430" fill="url(#gEggGlow)" opacity="0"/>
  <g id="eggFull">${EGGART}</g>
  <path id="eggHeat" d="${EGGP}" fill="#FF6A3D" opacity="0"/>
  <g id="eggBase" opacity="0"><g clip-path="url(#cpEggBot)">${EGGART}</g><path d="${EGZZ}" fill="none" ${sw(8)}/></g>
  <g id="eggCap" opacity="0"><g clip-path="url(#cpEggTop)">${EGGART}</g><path d="${EGZZ}" fill="none" ${sw(8)}/></g>
  <g id="eggCracks" fill="none" ${sw(9)}>
   <path id="ecr0" class="ecr" pathLength="1" d="M-26,-254 L-2,-200 L-40,-150 L-10,-98" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
   <path id="ecr1" class="ecr" pathLength="1" d="M-124,-176 L-74,-134 L-100,-76" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
   <path id="ecr2" class="ecr" pathLength="1" d="M74,-206 L42,-152 L98,-112 L68,-60" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
   <path id="ecr3" class="ecr" pathLength="1" d="${EGZZ}" opacity="0" stroke-dasharray="1" stroke-dashoffset="1"/>
  </g>
  <g id="noteW" opacity="0"><g id="note" transform="translate(66,-4) rotate(8)">
   <rect x="-82" y="-66" width="164" height="132" rx="8" fill="#FFF8DC" ${sw(6)}/>
   <rect x="-20" y="-80" width="40" height="26" rx="4" fill="#FF9BC4" opacity=".9" ${sw(4)}/>
   <g font-family="Baloo2,sans-serif" font-weight="800" text-anchor="middle" fill="#5b4a3c"><text x="0" y="-18" font-size="31">KEEP ME</text><text x="0" y="18" font-size="31">WARM!</text><text x="14" y="52" font-size="25" fill="#E0529F">MUNCH</text></g>
   <g transform="translate(-52,40) scale(.2) translate(0,135)"><path d="M0,-168 C-30,-196 -64,-168 -42,-140 C-28,-122 0,-102 0,-102 C0,-102 28,-122 42,-140 C64,-168 30,-196 0,-168Z" fill="#FF6FA8"/></g>
  </g></g></g>
  <g id="blanketW" opacity="0"><g id="blanket">
   <path d="M0,-292 C152,-292 238,-132 248,72 Q206,106 154,74 Q103,110 52,76 Q0,112 -52,76 Q-103,110 -154,74 Q-206,106 -248,72 C-238,-132 -152,-292 0,-292Z" fill="url(#pGing)" ${sw(8)}/>
   <path d="M-248,72 Q-206,106 -154,74 Q-103,110 -52,76 Q0,112 52,76 Q103,110 154,74 Q206,106 248,72" fill="none" stroke="#FF9BC4" stroke-width="16" stroke-linecap="round"/>
   <g transform="translate(0,-88)">${[0,1,2].map(i=>`<ellipse cx="0" cy="${-i*22}" rx="${74-i*4}" ry="17" fill="#E9A64F" ${sw(5)}/>`).join('')}<rect x="-14" y="-92" width="28" height="18" rx="4" fill="#FFE79A" ${sw(4)}/></g>
  </g></g>
 </g></g></g></g>
</g>`;
// the inside of the shell seen over the front rim (drawn behind baby Pebble when he pops out)
const EGGBACK_HTML=`<g id="eggBackW" opacity="0"><g transform="translate(0,-262)"><path d="${EGZZ} Q150,-146 0,-152 Q-150,-146 -198,-30Z" fill="#FFF3D6" ${sw(7)}/></g></g>`;
// baby Pebble: pink re-skin of the Gumdrop rig (the same colours as Munch, but pink), gray while the saturation filter is at 0
const PBC=['#FF9DC8','#E0629F','#FFE3F0','#FFE6A8','#FFC2DD'];
// a banana thought bubble (Coco's idea of what is inside)
const BN_HTML=`<g id="bnW" opacity="0"><g id="bn">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="60" cy="-62" rx="120" ry="86" fill="#fff" ${sw(6)}/>
 <path d="M-8,-112 Q66,-134 124,-64 Q134,-22 102,2 Q82,-62 -2,-78 Q-22,-94 -8,-112Z" fill="#FFE14D" ${sw(5)}/><path d="M-8,-112 L-18,-126" stroke="#7A3E1D" stroke-width="9" stroke-linecap="round"/>
</g></g>`;

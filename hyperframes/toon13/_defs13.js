/* ================= episode 13 additions: the big griddle for the biggest pancake in the universe ================= */
const flameP=(x,s)=>`<g transform="translate(${x},-6) scale(${s})"><g class="gfl"><path d="M0,-70 Q-34,-26 -20,0 Q0,12 20,0 Q34,-26 0,-70Z" fill="#FF8A2B" ${sw(5)}/><path d="M0,-44 Q-14,-18 -8,0 Q0,6 8,0 Q14,-18 0,-44Z" fill="#FFE14D"/></g></g>`;
document.getElementById('griddleMount').innerHTML=`<g id="griddle" opacity="0"><g id="griddleIn">
 <ellipse cx="0" cy="10" rx="340" ry="36" fill="rgba(60,30,10,.25)"/>
 <rect x="-250" y="-64" width="30" height="64" rx="8" fill="#6B7088" ${sw(6)}/><rect x="220" y="-64" width="30" height="64" rx="8" fill="#6B7088" ${sw(6)}/>
 ${[-170,-85,0,85,170].map(x=>flameP(x,1)).join('')}
 <ellipse cx="0" cy="-64" rx="320" ry="62" fill="#3F4357" ${sw(8)}/><ellipse cx="0" cy="-74" rx="290" ry="48" fill="#6B7088"/><ellipse cx="-40" cy="-82" rx="200" ry="26" fill="#9097B0" opacity=".6"/>
</g></g>`;
document.getElementById('g5Mount').innerHTML=tintBlip('g5',GLC[0]);   // the stowaway: same Gloopian as g1, but drawn in front of the kitchen crowd (no clip)

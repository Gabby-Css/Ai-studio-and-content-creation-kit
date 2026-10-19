/* ================= episode 28 additions: a stack of pancakes for the baby (re-used in #29), the egg's glow in the fx layer (it shines through the night), light rays for the hatching ================= */
const PILE_HTML=`<g id="pileW" opacity="0"><g id="pile">
 <ellipse cx="0" cy="10" rx="150" ry="22" fill="rgba(60,30,10,.22)"/>
 ${[0,1,2,3,4].map(i=>pcd(-i*30)).join('')}
 <path d="M-72,-170 Q-76,-154 -52,-152 Q-42,-130 -30,-152 Q10,-148 20,-164 Q50,-160 62,-152 Q86,-164 72,-176 Q0,-200 -72,-170Z" fill="#B8571D" ${sw(5)}/>
 <rect x="-18" y="-202" width="36" height="22" rx="5" fill="#FFE79A" ${sw(4)}/>
</g></g>`;
const EGFX_HTML=`<g id="egFxW" opacity="0"><circle r="480" fill="url(#gEggGlow)"/></g>
<g id="raysW" opacity="0"><g id="rays">${Array.from({length:12},(_,i)=>`<path d="M-26,0 L26,0 L0,-640Z" fill="#FFF3B0" opacity=".65" transform="rotate(${i*30})"/>`).join('')}</g></g>`;

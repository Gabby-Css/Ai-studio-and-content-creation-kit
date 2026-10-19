/* ================= episode 33 additions: a loose pancake wheel that rolls along the road, a POP! starburst, Zap's wrench ================= */
const WHL_HTML=`<g id="whlW" opacity="0"><g id="whl">
 <ellipse cx="0" cy="62" rx="70" ry="12" fill="rgba(60,30,10,.22)" transform="translate(0,0)"/>
 <g id="whlR"><circle r="70" fill="#E9A64F" ${sw(8)}/><circle r="52" fill="#F6C777"/><rect x="10" y="-34" width="38" height="24" rx="6" fill="#FFE79A" ${sw(4)}/><path d="M-52,10 Q-34,46 10,52" fill="none" stroke="#B8571D" stroke-width="11" stroke-linecap="round"/></g>
</g></g>`;
const POP_HTML=`<g id="popW" opacity="0"><g id="pop">
 <path d="M0,-150 L34,-62 L128,-92 L70,-12 L156,40 L56,48 L74,142 L6,78 L-62,146 L-52,52 L-150,64 L-82,-6 L-138,-84 L-40,-62Z" fill="#FFE14D" ${sw(9)}/>
 <path d="M0,-96 L22,-40 L82,-58 L46,-8 L100,26 L36,30 L48,90 L4,50 L-40,92 L-34,32 L-96,40 L-52,-4 L-86,-54 L-26,-40Z" fill="#FF8A2B"/>
 <text x="0" y="22" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="76" fill="#fff" stroke="${OL}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">POP!</text>
</g></g>`;
const WRN_HTML=`<g id="wrnW" opacity="0"><g id="wrn">
 <path d="M-12,40 L-12,-90 Q-48,-100 -44,-140 Q-40,-170 -14,-178 L-18,-146 L10,-146 L6,-178 Q32,-170 36,-140 Q40,-100 4,-90 L4,40Z" fill="#B8BFCC" ${sw(7)}/>
 <path d="M-4,30 L-4,-80" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>
</g></g>`;

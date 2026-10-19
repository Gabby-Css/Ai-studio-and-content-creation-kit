/* ================= episode 27 additions: a little campfire (Truffle's toaster), Zap's "37°" thermometer bubble ================= */
const FIRE_HTML=`<g id="fireW" opacity="0"><g id="fire">
 <ellipse cx="0" cy="8" rx="150" ry="22" fill="rgba(60,30,10,.25)"/>
 <g transform="translate(-40,-22)"><g class="cfl"><path d="M0,0 Q-54,-70 -8,-196 Q10,-122 42,-98 Q74,-50 0,0Z" fill="#FF8A2B" ${sw(5)}/></g></g>
 <g transform="translate(40,-22)"><g class="cfl"><path d="M0,0 Q-46,-60 -4,-156 Q14,-98 38,-82 Q62,-40 0,0Z" fill="#FF8A2B" ${sw(5)}/></g></g>
 <g transform="translate(0,-18)"><g class="cfl"><path d="M0,0 Q-40,-52 0,-128 Q40,-52 0,0Z" fill="#FFE14D" ${sw(4)}/></g></g>
 <rect x="-112" y="-30" width="224" height="36" rx="15" fill="#8A5A2B" ${sw(6)} transform="rotate(-7)"/>
 <rect x="-112" y="-30" width="224" height="36" rx="15" fill="#A06A35" ${sw(6)} transform="rotate(7)"/>
</g></g>`;
const THERM_HTML=`<g id="thermW" opacity="0"><g id="therm">
 <rect x="-136" y="-84" width="272" height="136" rx="30" fill="#1D2B5A" ${sw(8)}/><rect x="-120" y="-70" width="240" height="108" rx="22" fill="#27397A"/>
 <text x="-26" y="20" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="88" fill="#7CFF9B" stroke="${OL}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">37°</text>
 <path id="thermOk" d="M60,-10 L82,16 L116,-28" fill="none" stroke="#7CFF9B" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
 <path d="M-22,50 L0,90 L22,50Z" fill="#1D2B5A" ${sw(6)}/>
</g></g>`;

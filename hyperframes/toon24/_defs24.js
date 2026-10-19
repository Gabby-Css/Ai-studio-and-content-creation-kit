/* ================= episode 24 additions: the scoreboard, three flying pancakes (Mochi's has a little spaceship dome), the pancake stuck to the ceiling ================= */
document.getElementById('night').insertAdjacentHTML('beforebegin',`<g id="sbW" opacity="0"><g id="sb">
 <path d="M-150,-130 L-150,-250 M150,-130 L150,-250" stroke="#5b4a3c" stroke-width="8"/>
 <rect x="-240" y="-130" width="480" height="270" rx="30" fill="#1D2B5A" ${sw(9)}/><rect x="-220" y="-112" width="440" height="234" rx="22" fill="#27397A"/>
 <text x="0" y="-60" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="54" fill="#FFE14D" stroke="${OL}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">SCORES</text>
 ${[-146,0,146].map((x,i)=>`<g transform="translate(${x},40)"><rect x="-60" y="-56" width="120" height="116" rx="16" fill="#0F1838" ${sw(5)}/><text id="sbq${i}" x="0" y="26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="84" fill="#8EA2FF">?</text><g id="sbt${i}" opacity="0"><text x="0" y="24" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="74" fill="#FFE14D" stroke="${OL}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">10</text></g></g>`).join('')}
</g></g>`);
document.getElementById('jgMount').insertAdjacentHTML('beforeend',[0,1,2].map(i=>`<g id="pcw${i}" opacity="0"><g id="pcq${i}"><g id="pcs${i}">${pcd(0)}<path d="M-70,-44 Q-76,-32 -52,-30 Q-40,-8 -30,-30 Q10,-26 20,-42 Q54,-38 64,-30 Q84,-40 70,-52 Q0,-76 -70,-44Z" fill="#B8571D" ${sw(4)}/><g id="pcd${i}" opacity="${i===1?1:0}"><path d="M-44,-62 Q-40,-120 0,-124 Q40,-120 44,-62Z" fill="#9FE3FF" ${sw(5)}/><path d="M-26,-96 Q-22,-112 -6,-114" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/></g></g></g></g>`).join(''));
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="splatW" opacity="0"><g id="splat">
 <ellipse cx="0" cy="0" rx="112" ry="30" fill="#E9A64F" ${sw(6)}/><ellipse cx="0" cy="6" rx="86" ry="14" fill="#F6C777"/>
 <path d="M-60,12 Q-66,50 -56,90 M10,16 Q6,70 14,130 M64,10 Q70,44 62,76" stroke="#B8571D" stroke-width="16" stroke-linecap="round" fill="none"/>
 <g id="drips" fill="#B8571D"><circle cx="-56" cy="96" r="11"/><circle cx="14" cy="136" r="12"/><circle cx="62" cy="82" r="10"/></g>
</g></g>`);

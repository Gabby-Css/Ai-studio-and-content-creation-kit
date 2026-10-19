/* ================= episode 16 additions: tears, the "EVERY SUNDAY" sign ================= */
let trSVG='';for(let i=0;i<8;i++) trSVG+=`<g id="trw${i}"><g id="tr${i}" class="trp" opacity="0"><path d="M0,-26 C15,-4 21,10 0,22 C-21,10 -15,-4 0,-26Z" fill="#8AD7FF" ${sw(5)}/><ellipse cx="-6" cy="4" rx="4" ry="7" fill="#fff" opacity=".7"/></g></g>`;
document.getElementById('jgMount').insertAdjacentHTML('beforeend', trSVG+`
<g id="sunTag" opacity="0"><g id="sunTagIn">
 <path d="M-18,86 L0,128 L18,86Z" fill="#fff" ${sw(8)}/>
 <rect x="-190" y="-96" width="380" height="188" rx="38" fill="#fff" ${sw(8)}/>
 <text x="0" y="-26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="60" fill="#FF8F5A" stroke="${OL}" stroke-width="8" paint-order="stroke" stroke-linejoin="round">EVERY</text>
 <text x="0" y="58" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="#E0529F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">SUNDAY!</text>
</g></g>`);

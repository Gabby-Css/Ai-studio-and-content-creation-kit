/* ================= episode 14 additions: Rocky (cast #17) returns, the four Jiggles (the Gloopian clones, now living in the kitchen), name tag, HIC! ================= */
document.getElementById('rkMount').innerHTML=rockySVG('rk',false);
document.getElementById('jgMount').innerHTML=GLC.map((c,i)=>tintBlip('j'+(i+1),c)).join('')+`
<g id="jgTag" opacity="0"><g id="jgTagIn">
 <path d="M-18,44 L0,92 L18,44Z" fill="#fff" ${sw(8)}/>
 <rect x="-178" y="-72" width="356" height="126" rx="34" fill="#fff" ${sw(8)}/>
 <text x="0" y="26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="#E0529F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">JIGGLE</text>
</g></g>
<g id="hic" opacity="0"><g id="hicIn"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="96" fill="#FFE14D" stroke="${OL}" stroke-width="13" paint-order="stroke" stroke-linejoin="round">HIC!</text></g></g>`;

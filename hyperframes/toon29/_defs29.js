/* ================= episode 29 additions: the name ribbon "PEBBLE", floating Z-z-z's, Zap's bouncing "here he is" arrow ================= */
const NAME_HTML=`<g id="nameW" opacity="0"><g id="nameS">
 <path d="M-200,-46 L200,-46 L176,0 L200,46 L-200,46 L-176,0Z" fill="#FF9BC4" ${sw(7)}/>
 <path d="M-200,-46 L-230,-70 L-230,24 L-200,46Z M200,-46 L230,-70 L230,24 L200,46Z" fill="#E0629F" ${sw(6)}/>
 <text x="0" y="22" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="70" fill="#fff" stroke="${OL}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">PEBBLE</text>
</g></g>`;
const ZZZ_HTML=`<g id="zzzW" opacity="0"><g id="zzz" font-family="Baloo2,sans-serif" font-weight="800" fill="#BFE6FF" stroke="${OL}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">
 <text x="0" y="0" font-size="64">Z</text><text x="52" y="-58" font-size="82">Z</text><text x="116" y="-128" font-size="104">Z</text></g></g>`;
const ARR_HTML=`<g id="arrW" opacity="0"><g id="arr"><path d="M-46,-120 L46,-120 L46,-50 L86,-50 L0,40 L-86,-50 L-46,-50Z" fill="#7CFF9B" ${sw(8)}/></g></g>`;

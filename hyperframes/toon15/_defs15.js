/* ================= episode 15 additions: four name tags, the scan beam, "25%" tags, SQUISH!, and the King's eyes in the fridge ================= */
const JTC=['#E0529F','#C99A00','#2F7FD1','#E0702E'];          // pink, yellow, blue, orange = the order of GLC
document.getElementById('jgMount').insertAdjacentHTML('beforeend',
 JTC.map((c,i)=>`<g id="jt${i+1}" opacity="0"><g id="jt${i+1}In"><path d="M-14,34 L0,72 L14,34Z" fill="#fff" ${sw(7)}/><rect x="-132" y="-50" width="264" height="90" rx="26" fill="#fff" ${sw(7)}/><text x="0" y="20" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="66" fill="${c}" stroke="${OL}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">JIGGLE</text></g></g>`).join('')+
 JTC.map((c,i)=>`<g id="pc${i+1}" opacity="0"><g id="pc${i+1}In"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="96" fill="${c}" stroke="${OL}" stroke-width="13" paint-order="stroke" stroke-linejoin="round">25%</text></g></g>`).join('')+
 `<g id="scan" opacity="0"><rect x="-36" y="-560" width="72" height="650" rx="36" fill="#6FF6FF" opacity=".33"/><rect x="-9" y="-560" width="18" height="650" rx="9" fill="#E6FFFF" opacity=".95"/></g>
 <g id="squish" opacity="0"><g id="squishIn"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="120" fill="#FFE14D" stroke="${OL}" stroke-width="15" paint-order="stroke" stroke-linejoin="round">SQUISH!</text></g></g>`);
// the Gloop King peeks out of the dark fridge (eyes first, then the crown and the face)
document.getElementById('fridgeInner').insertAdjacentHTML('beforeend',`<g clip-path="url(#cpFridge)"><g id="kdPeek" opacity="0">
 <ellipse id="kdGlow" cx="2170" cy="1230" rx="270" ry="340" fill="#FFE9A8" opacity=".22"/>
 <g id="kdFace" opacity="0">
  <ellipse cx="2170" cy="1290" rx="198" ry="300" fill="#FFD36B" ${sw(8)}/>
  <ellipse cx="2170" cy="1340" rx="140" ry="200" fill="#FFEFB5"/>
  <g fill="#FF9A5A" opacity=".7"><circle cx="2052" cy="1150" r="18"/><circle cx="2292" cy="1180" r="14"/></g>
  <path d="M2090,1390 Q2170,1460 2250,1390" fill="none" ${sw(9)}/>
  <g id="kdCrown"><path d="M2056,1040 L2072,930 L2120,988 L2170,910 L2220,988 L2268,930 L2284,1040Z" fill="#FFC93C" ${sw(8)}/>
   <circle cx="2072" cy="930" r="13" fill="#FF6B8B" ${sw(4)}/><circle cx="2170" cy="910" r="14" fill="#6FD0FF" ${sw(4)}/><circle cx="2268" cy="930" r="13" fill="#7FE08A" ${sw(4)}/></g>
 </g>
 <g id="kdEyes">
  <ellipse cx="2100" cy="1182" rx="54" ry="72" fill="#fff" ${sw(7)}/><ellipse cx="2240" cy="1182" rx="54" ry="72" fill="#fff" ${sw(7)}/>
  <g id="kdPup"><circle cx="2106" cy="1192" r="29" fill="${OL}"/><circle cx="2096" cy="1176" r="10" fill="#fff"/><circle cx="2246" cy="1192" r="29" fill="${OL}"/><circle cx="2236" cy="1176" r="10" fill="#fff"/></g>
 </g>
</g></g>`);

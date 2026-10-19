/* ================= episode 50 additions ("The Snow Day Party"): five hot-cocoa mugs (copies of #46's mug with their own ids), a plate of warm pancakes with steam ================= */
const MUG5_HTML=[0,1,2,3,4].map(i=>MUG_HTML.replace('id="mgW"',`id="mgW${i}"`).replace('id="mg"',`id="mg${i}"`).replace('id="mgS0"',`id="mg${i}S0"`).replace('id="mgS1"',`id="mg${i}S1"`)).join('');
const PSTK_HTML=`<g id="pstW" opacity="0"><g id="pst">
 <ellipse cx="0" cy="16" rx="170" ry="24" fill="rgba(60,30,10,.25)"/>
 <ellipse cx="0" cy="0" rx="140" ry="30" fill="#fff" ${sw(7)}/><ellipse cx="0" cy="-4" rx="100" ry="18" fill="#E3ECF7" stroke="none"/>
 ${[0,1,2,3].map(i=>`<ellipse cx="0" cy="${-24-i*30}" rx="${104-i*4}" ry="27" fill="${i%2?'#F6C777':'#D9902F'}" ${sw(7)}/>`).join('')}
 <path d="M-64,-140 Q-44,-98 -56,-64 M34,-150 Q64,-106 48,-62" stroke="#B35A12" stroke-width="15" fill="none" stroke-linecap="round"/>
 <rect x="-30" y="-186" width="60" height="32" rx="8" fill="#FFE98A" ${sw(5)}/>
 <path id="pstS0" d="M-44,-200 q-14,-24 0,-48 q14,-24 0,-48" fill="none" stroke="#9FB0C8" stroke-width="16" stroke-linecap="round" opacity="0"/><path id="pstS1" d="M44,-200 q-14,-24 0,-48 q14,-24 0,-48" fill="none" stroke="#9FB0C8" stroke-width="16" stroke-linecap="round" opacity="0"/>
 <path id="pstS2" d="M-44,-200 q-14,-24 0,-48 q14,-24 0,-48" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0"/><path id="pstS3" d="M44,-200 q-14,-24 0,-48 q14,-24 0,-48" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0"/>
</g></g>`;

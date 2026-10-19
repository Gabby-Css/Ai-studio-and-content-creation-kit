/* ================= episode 34 additions: the tunnel (a side-on cross-section of a cliff: rock with a dark road tunnel cut through it), pink light from Pebble, a far-away sunshine light ================= */
// the tunnel is built per episode length: TUN_HTML(LEN) - local x 0 is the cliff's front edge, LEN is its back edge (the exit)
const TUN_HTML=(LEN)=>{const PT=(x0,x1,n,a,ph)=>Array.from({length:n+1},(_,i)=>[x0+(x1-x0)*i/n+Math.sin(i*1.7+ph)*a,(i/n)*4600]);const E=(pts)=>pts.map(([x,y])=>`L${x.toFixed(0)},${y.toFixed(0)}`).join(' ');
 const stal=Array.from({length:Math.ceil(LEN/260)},(_,i)=>`<path d="M${i*260+20},1480 L${i*260+90+(i%3)*18},${1560+(i%4)*36} L${i*260+160},1480Z" fill="#6D6359" ${sw(5)}/>`).join('');
 const blot=Array.from({length:Math.ceil(LEN/420)},(_,i)=>`<ellipse cx="${i*420+130}" cy="${900+(i*377)%500}" rx="${90+(i%4)*24}" ry="${46+(i%3)*14}" fill="#85796A"/><ellipse cx="${i*420+300}" cy="${2900+(i*251)%900}" rx="${110+(i%3)*28}" ry="${52+(i%4)*10}" fill="#85796A"/><path d="M${i*420+60},${1200+(i*131)%240} l30,60 l-20,50" fill="none" stroke="#6D6359" stroke-width="8" stroke-linecap="round"/>`).join('');
 return `<g id="tunW"><g id="tunI">
 <path d="M0,0 ${E(PT(10,30,23,26,0))} ${E(PT(LEN-8,LEN+14,23,24,2).reverse())} Z" fill="#9B8F7E" ${sw(9)}/>
 <g>${blot}</g>
 <rect x="0" y="1480" width="${LEN}" height="1180" fill="#2a2540"/>
 <rect x="0" y="1480" width="${LEN}" height="1180" fill="url(#pTunBand)"/>
 <rect x="0" y="1740" width="${LEN}" height="840" fill="#8B7A5E"/>
 <rect x="0" y="1740" width="${LEN}" height="840" fill="url(#pTunDash)"/>
 <path d="M0,1740 H${LEN} M0,2580 H${LEN}" stroke="#5E5240" stroke-width="12"/>
 <g>${stal}</g>
 <path d="M0,1480 H${LEN} M0,2660 H${LEN}" stroke="${OL}" stroke-width="10"/>
</g></g>`;};
const TUN_DEFS=`<defs>
 <pattern id="pTunDash" width="300" height="840" patternUnits="userSpaceOnUse" patternTransform="translate(0,1740)">${[250,390,530,670].map(y=>`<rect x="0" y="${y-6}" width="150" height="12" rx="6" fill="#fff" opacity=".8"/>`).join('')}</pattern>
 <pattern id="pTunBand" width="420" height="1180" patternUnits="userSpaceOnUse" patternTransform="translate(0,1480)"><ellipse cx="90" cy="120" rx="60" ry="24" fill="#3a3355"/><ellipse cx="300" cy="460" rx="80" ry="30" fill="#352f4d"/><ellipse cx="200" cy="1060" rx="70" ry="26" fill="#3a3355"/></pattern>
 <radialGradient id="gPinkGlow"><stop offset="0" stop-color="#FFE3F4" stop-opacity=".62"/><stop offset=".35" stop-color="#FF9BD0" stop-opacity=".3"/><stop offset="1" stop-color="#FF7BC0" stop-opacity="0"/></radialGradient>
 <radialGradient id="gSunGlow"><stop offset="0" stop-color="#FFFFFF" stop-opacity="1"/><stop offset=".4" stop-color="#FFF3B0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE14D" stop-opacity="0"/></radialGradient>
</defs>`;
const PGL_HTML=`<g id="pglW" opacity="0"><circle r="620" fill="url(#gPinkGlow)"/></g>`;
const EXG_HTML=`<g id="exgW" opacity="0"><circle r="360" fill="url(#gSunGlow)"/></g>`;

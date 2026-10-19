/* ================= episode 19 additions: MUNCH (the giant gray monster = a gray, huge Gumdrop), a hot space rock, smoke puffs, the rainbow burp ================= */
// Gumdrop now stands IN FRONT of the whole cast (so the others can hide behind him)
document.getElementById('ghMount').before(document.getElementById('gmMount'));
const MNC=['#8D96A3','#656E7C','#C3C9D2','#E8E3D5','#A9B0BB'];         // Munch is gray: body / dark / belly / horns / spots
const tintGum=(p,c)=>gumSVG(p).split(GF).join(c[0]).split(GD).join(c[1]).split(GB).join(c[2]).split(GHR).join(c[3]).split(GT).join(c[4]);
document.getElementById('gpMount').insertAdjacentHTML('beforeend',tintGum('mn',MNC));

// the hot space rock Truffle cooks on
document.getElementById('zorpSet').insertAdjacentHTML('beforeend',`<g id="hotRock" opacity="0"><g id="hotRockIn">
 <ellipse cx="0" cy="26" rx="240" ry="26" fill="rgba(60,30,10,.28)"/>
 <ellipse id="hrGlow" cx="0" cy="-40" rx="250" ry="96" fill="#FF8A2B" opacity=".38"/>
 <path d="M-200,22 Q-220,-70 -126,-104 Q-64,-156 42,-124 Q156,-136 198,-52 Q228,10 176,26Z" fill="#4B4040" ${sw(8)}/>
 <path d="M-130,-64 L-64,-34 L-96,0 M22,-96 L52,-44 L116,-66 M-14,-22 L32,10" stroke="#FF8A2B" stroke-width="11" fill="none" stroke-linecap="round"/>
 <path d="M-130,-64 L-64,-34 L-96,0 M22,-96 L52,-44 L116,-66 M-14,-22 L32,10" stroke="#FFE14D" stroke-width="4" fill="none" stroke-linecap="round"/>
</g></g>`);

// smoke puffs (the burnt pancake)
document.getElementById('jgMount').insertAdjacentHTML('beforeend',Array.from({length:8},(_,i)=>`<g id="smw${i}"><circle id="sm${i}" class="smk" r="34" fill="#7B7F8C" ${sw(5)} opacity="0"/></g>`).join(''));

// the rainbow burp: seven parallel arcs, revealed with a stroke-dash trick
const RBC=['#FF5F5F','#FF9A3C','#FFE14D','#8BFF5A','#3FD6FF','#5A7BFF','#B07CFF'];
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="rainbow" opacity="0">${RBC.map((c,i)=>`<path class="rbp" transform="translate(0,${i*34})" d="M2120,860 C1750,-330 520,-420 -500,330" pathLength="1" fill="none" stroke="${OL}" stroke-width="44" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}${RBC.map((c,i)=>`<path class="rbp" transform="translate(0,${i*34})" d="M2120,860 C1750,-330 520,-420 -500,330" pathLength="1" fill="none" stroke="${c}" stroke-width="30" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>`);

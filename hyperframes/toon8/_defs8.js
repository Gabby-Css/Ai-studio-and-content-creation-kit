/* ================= episode 8 additions: the glow-party dance floor, the disco ball + light beams, the UFO in the window ================= */
const PFC=['#FF5FA8','#3FD6FF','#FFE14D','#8BFF5A','#B07CFF'];
const PF_X=[[1050,1220,1390,1560,1730,1900],[1135,1305,1475,1645,1815,1985]], PF_Y=[1690,1630];
let pfSVG='';
PF_Y.forEach((y,r)=>PF_X[r].forEach((x,i)=>{pfSVG+=`<g id="pf${r*6+i}" opacity=".12"><ellipse cx="${x}" cy="${y}" rx="104" ry="32" fill="${PFC[(i+r*2)%5]}" ${sw(6)}/><ellipse cx="${x}" cy="${y-4}" rx="66" ry="15" fill="#fff" opacity=".5"/></g>`;}));
document.getElementById('partyFloor').innerHTML=pfSVG;

// disco ball on a string from the ceiling + five coloured light beams (above the dark overlay, so they glow)
const DBX=1400, DBY=150, DBR=88;
let facets='';
for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){if(a*a+b*b>10)continue;const c=['#fff','#CFE9FF','#FFD6EC','#DAFFD0','#FFF3B0'][(a+b+8)%5];facets+=`<rect x="${a*24-11}" y="${b*24-11}" width="22" height="22" rx="4" fill="${c}" opacity=".85" stroke="#8aa0b8" stroke-width="2"/>`;}
const BEAMC=['#FF5FA8','#3FD6FF','#FFE14D','#8BFF5A','#B07CFF'];
let beams='';
BEAMC.forEach((c,i)=>{beams+=`<g class="bm" transform="rotate(${-48+i*24})"><path d="M0,0 L-90,980 L90,980Z" fill="${c}" opacity=".16"/></g>`;});
document.getElementById('partyTop').innerHTML=`<g id="disco" opacity="0"><g id="discoIn">
 <path d="M${DBX},-600 L${DBX},${DBY-DBR}" stroke="#5b4a3c" stroke-width="9"/>
 <g transform="translate(${DBX},${DBY})"><g id="beams">${beams}</g></g>
 <g transform="translate(${DBX},${DBY})"><circle r="${DBR}" fill="#B9C4D6" ${sw(7)}/><g id="dbFacets">${facets}</g><circle r="${DBR}" fill="none" ${sw(7)}/></g>
 <g fill="#fff"><path transform="translate(${DBX-130},${DBY-40})" d="M0,-18 L5,-5 L18,0 L5,5 L0,18 L-5,5 L-18,0 L-5,-5Z"/><path transform="translate(${DBX+138},${DBY+30})" d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4Z"/></g>
</g></g>`;

// the UFO in the window (inside the glass clip)
const UFX=550, UFY=420;
document.getElementById('ufoMount').innerHTML=`<g id="ufo" opacity="0"><g id="ufoIn">
 <circle cx="${UFX}" cy="${UFY+20}" r="190" fill="url(#gGlow)" opacity=".7"/>
 <path id="ufoBeam" d="M${UFX-52},${UFY+24} L${UFX-190},760 L${UFX+190},760 L${UFX+52},${UFY+24}Z" fill="#D8FF9A" opacity=".75"/>
 <g transform="translate(${UFX},690)"><g id="ufoBlip"><ellipse cx="0" cy="-34" rx="34" ry="42" fill="#5CE08A" ${sw(5)}/><ellipse cx="-12" cy="-44" rx="9" ry="12" fill="#fff"/><ellipse cx="12" cy="-44" rx="9" ry="12" fill="#fff"/><circle cx="-10" cy="-42" r="4" fill="${OL}"/><circle cx="14" cy="-42" r="4" fill="${OL}"/><path d="M-10,-18 Q0,-10 10,-18" fill="none" ${sw(4)}/><path d="M-12,-72 Q-20,-100 -30,-96" fill="none" ${sw(5)}/><circle cx="-30" cy="-96" r="7" fill="#FFE14D" ${sw(3)}/></g></g>
 <ellipse cx="${UFX}" cy="${UFY}" rx="118" ry="30" fill="#AEB8C8" ${sw(6)}/>
 <path d="M${UFX-52},${UFY-8} Q${UFX-46},${UFY-62} ${UFX},${UFY-64} Q${UFX+46},${UFY-62} ${UFX+52},${UFY-8}Z" fill="#9FE3FF" ${sw(6)}/>
 <g fill="#FFE14D" ${sw(3)}><circle cx="${UFX-76}" cy="${UFY+6}" r="9"/><circle cx="${UFX-38}" cy="${UFY+14}" r="9"/><circle cx="${UFX}" cy="${UFY+17}" r="9"/><circle cx="${UFX+38}" cy="${UFY+14}" r="9"/><circle cx="${UFX+76}" cy="${UFY+6}" r="9"/></g>
</g></g>`;

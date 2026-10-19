/* ================= episode 21 additions (Season 5: the Great Pancake Festival): festival banner + bunting, a long pancake table, the Golden Spatula on its pedestal ================= */
{const t=document.querySelector('#banner text');t.textContent='PANCAKE FESTIVAL!';t.setAttribute('font-size','72');}
let flags2='';for(let i=0;i<14;i++){const x=1650+i*66;flags2+=`<path d="M${x},${150+Math.round(Math.sin(i/13*Math.PI)*-0)} L${x+60},150 L${x+30},202Z" fill="${SPC[(i+2)%6]}" ${sw(5)}/>`;}
document.getElementById('bannerMount').insertAdjacentHTML('beforeend',`<g id="banner2"><path d="M1600,60 Q2000,200 2600,60" fill="none" stroke="#5b4a3c" stroke-width="7"/>${flags2}</g>`);

// a long gingham table loaded with pancake stacks (behind the characters)
const fstack=(x,n,k)=>`<g transform="translate(${x},0)">${Array.from({length:n},(_,i)=>pcd(-i*26)).join('')}<path d="M-72,${-n*26-18} Q-76,${-n*26-2} -52,${-n*26} Q-42,${-n*26+22} -30,${-n*26} Q10,${-n*26+4} 20,${-n*26-12} Q50,${-n*26-8} 62,${-n*26} Q86,${-n*26-12} 72,${-n*26-24} Q0,${-n*26-48} -72,${-n*26-18}Z" fill="#B8571D" ${sw(5)}/><rect x="-16" y="${-n*26-50}" width="32" height="20" rx="5" fill="#FFE79A" ${sw(4)}/></g>`;
document.getElementById('cheeseMount').innerHTML=`<g id="fTable" opacity="0">
 <ellipse cx="1420" cy="1650" rx="640" ry="30" fill="rgba(60,30,10,.2)"/>
 <rect x="830" y="1300" width="40" height="340" rx="10" fill="#B4733A" ${sw(7)}/><rect x="1970" y="1300" width="40" height="340" rx="10" fill="#B4733A" ${sw(7)}/>
 <rect x="790" y="1230" width="1100" height="40" rx="16" fill="#D79A55" ${sw(7)}/>
 <rect x="810" y="1258" width="1060" height="110" rx="20" fill="url(#pGing)" ${sw(7)}/>
 <g transform="translate(0,1226)" id="fStacks">${fstack(940,4)}${fstack(1100,6)}${fstack(1260,3)}${fstack(1430,5)}${fstack(1590,4)}${fstack(1750,6)}</g>
</g>`;

// the Golden Spatula on its little rolling pedestal
document.getElementById('night').insertAdjacentHTML('beforebegin',`<g id="pedW" opacity="0"><g id="ped">
 <ellipse cx="0" cy="12" rx="120" ry="16" fill="rgba(60,30,10,.22)"/>
 <path d="M-76,-20 L-60,-250 L60,-250 L76,-20Z" fill="#B0263F" ${sw(7)}/><path d="M-70,-60 H70 M-66,-110 H66" stroke="#FFD84A" stroke-width="9"/>
 <rect x="-82" y="-274" width="164" height="30" rx="12" fill="#FFD84A" ${sw(7)}/>
 <g fill="#8A8FA3" ${sw(5)}><circle cx="-52" cy="-4" r="16"/><circle cx="52" cy="-4" r="16"/></g>
 <g id="spat">
  <path d="M-12,-270 L-12,-400 Q-12,-420 0,-420 Q12,-420 12,-400 L12,-270Z" fill="#FFC21E" ${sw(6)}/>
  <path d="M-74,-640 Q-74,-668 -46,-668 L46,-668 Q74,-668 74,-640 L74,-500 Q74,-420 12,-420 L-12,-420 Q-74,-420 -74,-500Z" fill="#FFE066" ${sw(7)}/>
  <path d="M-36,-640 V-540 M0,-640 V-540 M36,-640 V-540" stroke="#C9971A" stroke-width="12" stroke-linecap="round"/>
  <path d="M-52,-640 Q-60,-560 -48,-490" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>
 </g>
</g></g>`);

// two little glowing eyes that sneak away in the dark (they live above the night overlay)
document.getElementById('ghMount').insertAdjacentHTML('beforebegin',`<g id="sneakW"><g id="sneak" opacity="0"><ellipse cx="-20" cy="0" rx="13" ry="18" fill="#FFF7C2"/><ellipse cx="20" cy="0" rx="13" ry="18" fill="#FFF7C2"/><circle cx="-17" cy="2" r="6" fill="#2b1a14"/><circle cx="23" cy="2" r="6" fill="#2b1a14"/></g></g>`);

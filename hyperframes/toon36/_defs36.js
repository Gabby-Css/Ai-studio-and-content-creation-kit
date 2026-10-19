/* ================= episode 36 additions (Season 8, "The Map in the Pan"): the treasure map that rises out of the Golden Pan, the pancake boat (three stacked pancakes, mast, sail, flag),
   a thought bubble for the boat idea. BOAT_HTML(p) makes one boat with the ids p+'W' (positioned wrapper), p (inner), pS0..pS2 (slabs), pMast, pSail, pFlag, pBut ================= */
const BOAT_HTML=(p,op=0,shadow=true)=>{
 const slab=(k,R,cy)=>{const ry=Math.round(R*.33);
  return `<g id="${p}S${k}"><ellipse cx="0" cy="${cy+64}" rx="${R}" ry="${ry}" fill="#C7801F" ${sw(8)}/><rect x="${-R}" y="${cy}" width="${2*R}" height="64" fill="#D9902F"/>
  <path d="M${-R},${cy} V${cy+64} M${R},${cy} V${cy+64}" stroke="${OL}" stroke-width="8" fill="none"/>
  <path d="M${-R*.72},${cy+30} Q0,${cy+ry*.9} ${R*.72},${cy+30}" fill="none" stroke="#B8701A" stroke-width="7" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="0" cy="${cy}" rx="${R}" ry="${ry}" fill="#F6C777" ${sw(8)}/><ellipse cx="0" cy="${cy+4}" rx="${Math.round(R*.8)}" ry="${Math.round(ry*.78)}" fill="#EDB04A" opacity=".75"/></g>`;};
 const drips=[-600,-390,-140,150,410,640].map((x,i)=>{const y=Math.round(Math.sqrt(1-(x/900)**2)*297);return `<path d="M${x-24},${y-6} q-4,${44+(i%3)*18} 24,${52+(i%2)*16} q30,-8 24,-${52+(i%2)*16} z" fill="#B35A12" ${sw(5)}/>`;}).join('');
 return `<g id="${p}W" opacity="${op}"><g id="${p}">
  ${shadow?`<ellipse cx="0" cy="330" rx="760" ry="150" fill="rgba(60,30,10,.22)"/>`:''}
  ${slab(0,640,128)}${slab(1,780,64)}${slab(2,900,0)}
  <g id="${p}Dr">${drips}</g>
  <path d="M-330,-8 Q-140,-86 70,-34 T420,-26" fill="none" stroke="#B35A12" stroke-width="20" stroke-linecap="round" opacity=".9"/>
  <g id="${p}But"><rect x="-210" y="-70" width="150" height="74" rx="16" fill="#FFE98A" ${sw(6)}/><path d="M-190,-52 L-110,-52" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".85"/></g>
  <g id="${p}Mast"><rect x="-17" y="-980" width="34" height="1000" rx="12" fill="#B4733A" ${sw(7)}/><path d="M-4,-960 V10" stroke="#D79A55" stroke-width="7" stroke-linecap="round"/></g>
  <g id="${p}Sail"><path d="M18,-940 Q440,-880 452,-520 Q440,-330 18,-296Z" fill="#FFF6DC" ${sw(8)}/><path d="M18,-760 Q250,-740 330,-700 M18,-560 Q250,-560 380,-520" fill="none" stroke="#E7D3A4" stroke-width="7" stroke-linecap="round"/>
   <g transform="translate(236,-612)"><ellipse cx="0" cy="40" rx="92" ry="26" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="12" rx="86" ry="24" fill="#F6C777" ${sw(6)}/><ellipse cx="0" cy="-16" rx="80" ry="22" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="-40" rx="76" ry="21" fill="#F6C777" ${sw(6)}/><rect x="-26" y="-62" width="52" height="26" rx="8" fill="#FFE98A" ${sw(5)}/></g></g>
  <g id="${p}Flag"><path d="M18,-1020 L236,-974 L18,-928Z" fill="#FF5F5F" ${sw(7)}/><circle cx="80" cy="-974" r="14" fill="#fff"/></g>
 </g></g>`;};

const MAP_HTML=(()=>{
 const P=[[-340,150],[-190,-70],[30,250],[250,-40]];                       // the dotted path: a bezier from our island to the X
 const B=(t)=>{const u=1-t;return [0,1].map(k=>u*u*u*P[0][k]+3*u*u*t*P[1][k]+3*u*t*t*P[2][k]+t*t*t*P[3][k]);};
 const dots=Array.from({length:15},(_,i)=>{const [x,y]=B(i/14*.94+.02);return `<circle id="mdot${i}" class="mdot" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="11" fill="#C0392B" ${sw(3)} opacity="0"/>`;}).join('');
 const waves=[[-180,-230],[-20,-250],[120,-210],[-250,-60],[-60,-110],[-420,40],[-130,300],[60,320],[420,230],[190,150],[-440,-120],[430,-250],[340,60]].map(([x,y])=>`<path d="M${x},${y} q14,-16 28,0 t28,0 t28,0" fill="none" stroke="#7FB5D9" stroke-width="8" stroke-linecap="round"/>`).join('');
 return `<g id="mapW" opacity="0"><g id="map">
 <ellipse cx="0" cy="388" rx="460" ry="30" fill="rgba(60,30,10,.2)"/>
 <g id="mapSc">
  <rect x="-500" y="-350" width="1000" height="700" rx="46" fill="#F4DFAA" ${sw(10)}/>
  <ellipse cx="-300" cy="-230" rx="130" ry="74" fill="#E3C27A" opacity=".45"/><ellipse cx="330" cy="260" rx="150" ry="80" fill="#E3C27A" opacity=".4"/>
  <rect x="-470" y="-320" width="940" height="640" rx="30" fill="none" stroke="#C99A4A" stroke-width="6" stroke-dasharray="26 16"/>
  ${waves}
  <g transform="translate(-340,170)"><ellipse rx="140" ry="74" fill="#F2D58A" ${sw(7)}/><ellipse cy="-8" rx="112" ry="54" fill="#7FD38A"/>
   <g transform="translate(-10,-30)"><ellipse cx="0" cy="20" rx="44" ry="13" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="4" rx="40" ry="12" fill="#F6C777" ${sw(5)}/><ellipse cx="0" cy="-12" rx="36" ry="11" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="-26" rx="32" ry="10" fill="#F6C777" ${sw(5)}/></g></g>
  <g id="mapIsl" transform="translate(300,-80)"><ellipse rx="230" ry="132" fill="#F2D58A" ${sw(8)}/><ellipse cy="-10" rx="196" ry="100" fill="#7FD38A"/>
   <path d="M-110,10 L-30,-110 L40,-30 L90,-90 L160,10Z" fill="#9AA0A6" ${sw(7)}/><path d="M-30,-110 L-6,-74 L-52,-70Z" fill="#fff"/>
   <g transform="translate(-150,30)"><rect x="-7" y="-64" width="14" height="64" rx="5" fill="#9A6A3A" ${sw(4)}/><path d="M0,-64 Q-50,-92 -70,-56 M0,-64 Q-6,-110 -44,-96 M0,-64 Q48,-100 74,-62 M0,-64 Q10,-112 52,-98" fill="none" stroke="#2EBE85" stroke-width="12" stroke-linecap="round"/></g>
   <g transform="translate(170,50)"><rect x="-7" y="-56" width="14" height="56" rx="5" fill="#9A6A3A" ${sw(4)}/><path d="M0,-56 Q-44,-82 -62,-50 M0,-56 Q4,-100 40,-88 M0,-56 Q42,-90 66,-54" fill="none" stroke="#2EBE85" stroke-width="11" stroke-linecap="round"/></g></g>
  <g id="mapDots">${dots}</g>
  <g id="mapX"><path class="mx1" d="M250,-120 L330,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="38" stroke-linecap="round" fill="none"/>
   <path class="mx2" d="M332,-120 L248,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="38" stroke-linecap="round" fill="none"/>
   <path class="mx1" d="M250,-120 L330,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="24" stroke-linecap="round" fill="none"/>
   <path class="mx2" d="M332,-120 L248,-36" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="24" stroke-linecap="round" fill="none"/></g>
  <g transform="translate(-392,-256)"><circle r="64" fill="#FFF6DC" ${sw(6)}/><path d="M0,-52 L14,0 L0,52 L-14,0Z M-52,0 L0,-14 L52,0 L0,14Z" fill="#C0392B" ${sw(4)}/><circle r="9" fill="#fff" ${sw(3)}/></g>
 </g></g></g>`;})();

// thought bubble with the little boat inside (Truffle's idea)
const TH_HTML=`<g id="thW" opacity="0"><g id="th">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="60" cy="-62" rx="160" ry="116" fill="#fff" ${sw(6)}/>
 <g transform="translate(58,-8) scale(.15)">${BOAT_HTML('bb',1,false)}</g>
</g></g>`;

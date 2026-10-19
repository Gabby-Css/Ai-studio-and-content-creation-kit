/* ================= episode 39 additions (Season 8, "The Wobbly Bridge"): the canyon set (warm sky, far mesas, a chasm that widens towards the camera, fog), the rope bridge whose planks wobble,
   a syrup splat for the map, a big red X in the sand, a left arrow and the treasure chest (back half with the lid, front half with a pan-handle lock - the same chest is opened in #40) ================= */
const CHASM=(y)=>[1250-690*(y-1450)/2350,1650+690*(y-1450)/2350];            // x of the chasm's left and right rim at world y (a trapezoid, widening towards the camera)
const BRG={n:14,y0:1840,sag:44,x0:1136,x1:1764};
const BRY=(u)=>BRG.y0+BRG.sag*4*u*(1-u);                                         // deck height at u (0..1) along the bridge
const CAN_HTML=`<g id="canSet" opacity="0">
 <defs><linearGradient id="gCanSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FB6EE"/><stop offset=".6" stop-color="#FFE0B0"/><stop offset="1" stop-color="#FFC58F"/></linearGradient>
 <linearGradient id="gCanChasm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7C7F5"/><stop offset=".3" stop-color="#8A64C9"/><stop offset="1" stop-color="#1F1348"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gCanSky)"/>
 <g transform="translate(2350,1000)"><circle r="260" fill="#FFF3B0" opacity=".4"/><circle r="130" fill="#FFE14D" ${sw(6)}/></g>
 <g id="canClouds">${[[300,100,1.0],[1500,-160,1.3],[2300,380,.9],[700,-600,1.2],[1900,-900,1.0]].map(([x,y,s])=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g>`).join('')}</g>
 <path d="M-1800,1460 L-1800,1180 L-1500,1180 L-1400,980 L-1000,980 L-900,1240 L-500,1240 L-420,1060 L0,1060 L120,1300 L300,1460Z" fill="#E8955A" ${sw(8)}/>
 <path d="M1300,1460 L1400,1120 L1760,1120 L1840,900 L2300,900 L2380,1160 L2780,1160 L2860,1000 L3300,1000 L3400,1300 L3700,1460Z" fill="#D9744A" ${sw(8)}/>
 <path d="M-300,1460 L-200,1250 L300,1250 L420,1110 L900,1110 L1000,1300 L1500,1300 L1580,1460Z" fill="#F0A66A" ${sw(8)}/>
 <path d="M2500,1460 L2600,1240 L3000,1240 L3100,1090 L3600,1090 L3700,1330 L4200,1330 L4300,1460Z" fill="#F0A66A" ${sw(8)}/>
 <rect x="-3000" y="1450" width="14000" height="2600" fill="#EBC58B" stroke="${OL}" stroke-width="8"/>
 ${Array.from({length:26},(_,i)=>{const x=-300+rnd(i,71)*3800,y=1480+rnd(i,72)*1300;return (x>1000&&x<2000)?'':`<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><path d="M0,0 Q-8,-30 -22,-40 M0,0 Q3,-38 0,-52 M0,0 Q10,-30 24,-38" stroke="#B98B4E" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;}).join('')}
 <path d="M${CHASM(1450)[0]},1450 L${CHASM(1450)[1]},1450 L${CHASM(3800)[1]},3800 L${CHASM(3800)[0]},3800Z" fill="url(#gCanChasm)" ${sw(10)}/>
 <path d="M${CHASM(1450)[0]},1450 L${CHASM(1450)[1]},1450 L${CHASM(1700)[1]},1700 L${CHASM(1700)[0]},1700Z" fill="#C2704A" ${sw(0)}/><path d="M${CHASM(1450)[0]},1560 H${CHASM(1450)[1]} M${CHASM(1450)[0]},1640 H${CHASM(1450)[1]}" stroke="#A55A3A" stroke-width="10" opacity=".7"/>
 <g id="canFog">${[[1450,1760,430,56],[1380,2000,520,70],[1500,2300,640,86],[1300,2700,760,100],[1650,3100,860,110]].map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".3"/>`).join('')}</g>
 <path d="M${CHASM(1450)[0]},1450 L${CHASM(3800)[0]},3800 M${CHASM(1450)[1]},1450 L${CHASM(3800)[1]},3800" stroke="${OL}" stroke-width="14" stroke-linecap="round"/>
 <path d="M${CHASM(1460)[0]+16},1470 L${CHASM(3000)[0]+14},3000 M${CHASM(1460)[1]-16},1470 L${CHASM(3000)[1]-14},3000" stroke="#C98A4B" stroke-width="16" stroke-linecap="round" opacity=".8"/>
</g>`;
const BRIDGE_HTML=`<g id="brdgW" opacity="0"><g id="brdg">
 <path d="M${BRG.x0-36},1648 Q${(BRG.x0+BRG.x1)/2},${1648+BRG.sag*4+40} ${BRG.x1+36},1648" fill="none" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M${BRG.x0-36},1648 Q${(BRG.x0+BRG.x1)/2},${1648+BRG.sag*4+40} ${BRG.x1+36},1648" fill="none" stroke="#D79A55" stroke-width="8" stroke-linecap="round"/>
 ${Array.from({length:BRG.n},(_,i)=>{const u=(i+.5)/BRG.n,x=BRG.x0+(BRG.x1-BRG.x0)*u,y=BRY(u),ry=1648+(BRG.sag*4+40)*2*u*(1-u);return i%2?'':`<path d="M${x.toFixed(0)},${ry.toFixed(0)} L${x.toFixed(0)},${(y-70).toFixed(0)}" stroke="#D79A55" stroke-width="6" opacity=".9"/>`;}).join('')}
 <path d="M${BRG.x0-12},1900 Q${(BRG.x0+BRG.x1)/2},${1900+BRG.sag*4+60} ${BRG.x1+12},1900" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
 ${Array.from({length:BRG.n},(_,i)=>{const u=(i+.5)/BRG.n,x=BRG.x0+(BRG.x1-BRG.x0)*u,y=BRY(u),w=(BRG.x1-BRG.x0)/BRG.n;return `<g id="brp${i}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><g class="brpl"><rect x="${-w/2+2}" y="-74" width="${w-4}" height="74" rx="6" fill="${i%2?'#C98A4B':'#D79A55'}" ${sw(6)}/><rect x="${-w/2+2}" y="0" width="${w-4}" height="22" rx="5" fill="#8A5A2B" ${sw(6)}/></g></g>`;}).join('')}
 <g><rect x="${BRG.x0-60}" y="1640" width="46" height="290" rx="12" fill="#8A5A2B" ${sw(8)}/><rect x="${BRG.x1+14}" y="1640" width="46" height="290" rx="12" fill="#8A5A2B" ${sw(8)}/></g>
</g></g>`;
const SPLAT_HTML=(()=>{const pts=(n,r1,r2,rot)=>Array.from({length:n*2},(_,i)=>{const a=rot+i/(n*2)*Math.PI*2,r=(i%2?r1:r2)*(1+.1*Math.sin(i*2.7));return `${(Math.cos(a)*r*1.1).toFixed(0)},${(Math.sin(a)*r*.85).toFixed(0)}`;}).join(' ');
 return `<g id="msplat" opacity="0"><g transform="translate(110,10)">
  <path d="M-60,150 q-6,90 16,120 M70,170 q4,100 -12,130 M190,130 q8,70 -6,100" fill="none" stroke="${OL}" stroke-width="44" stroke-linecap="round"/><path d="M-60,150 q-6,90 16,120 M70,170 q4,100 -12,130 M190,130 q8,70 -6,100" fill="none" stroke="#C9741A" stroke-width="28" stroke-linecap="round"/>
  <polygon points="${pts(9,120,250,.2)}" fill="#C9741A" ${sw(14)}/><polygon points="${pts(9,70,160,.2)}" fill="#E39A3A" stroke="none"/>
  <ellipse cx="-40" cy="-70" rx="62" ry="24" fill="#FFD27A" opacity=".75" transform="rotate(-20 -40 -70)"/><circle cx="-190" cy="-150" r="24" fill="#C9741A" ${sw(8)}/><circle cx="270" cy="-130" r="20" fill="#C9741A" ${sw(8)}/><circle cx="250" cy="150" r="16" fill="#C9741A" ${sw(8)}/>
 </g></g>`;})();
const SYR_HTML=`<g id="syrW" opacity="0"><g id="syr"><path d="M0,-70 C30,-20 44,6 0,34 C-44,6 -30,-20 0,-70Z" fill="#8A4A12" ${sw(7)}/><path d="M-10,-20 Q-16,0 -6,12" fill="none" stroke="#C97A2A" stroke-width="8" stroke-linecap="round"/></g></g>`;
const BIGX_HTML=`<g id="bigxW" opacity="0"><g id="bigx"><ellipse cx="0" cy="20" rx="190" ry="40" fill="rgba(120,70,20,.25)"/>
 <path class="bx1" d="M-130,-60 L130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="58" stroke-linecap="round" fill="none"/><path class="bx2" d="M130,-60 L-130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="${OL}" stroke-width="58" stroke-linecap="round" fill="none"/>
 <path class="bx1" d="M-130,-60 L130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="40" stroke-linecap="round" fill="none"/><path class="bx2" d="M130,-60 L-130,70" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke="#E8303A" stroke-width="40" stroke-linecap="round" fill="none"/></g></g>`;
const LFT_HTML=`<g id="lftW" opacity="0"><g id="lft"><path d="M120,-40 L-60,-40 L-60,-90 L-190,0 L-60,90 L-60,40 L120,40Z" fill="#E8303A" ${sw(8)}/><path d="M80,-18 L-40,-18" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/></g></g>`;
// the treasure chest: back half (interior, glow, lid) + front half (box, gold bands, the pan-handle lock). Positioned by chBW / chFW (same x,y); Grandma sits between them in #40
const CHEST_HTML=`<g id="chBW" opacity="0"><g id="chB">
 <ellipse cx="0" cy="12" rx="290" ry="34" fill="rgba(120,70,20,.3)"/>
 <circle id="chGlow" cx="0" cy="-200" r="330" fill="url(#gEggGlow)" opacity="0"/>
 <rect x="-224" y="-300" width="448" height="120" rx="20" fill="#7A3E1D" ${sw(8)}/><rect x="-200" y="-282" width="400" height="90" rx="14" fill="#FFB347" opacity=".95"/>
 <g id="chLid"><path d="M-240,-206 Q-240,-330 0,-340 Q240,-330 240,-206Z" fill="#B4733A" ${sw(9)}/><path d="M-240,-206 H240" stroke="${OL}" stroke-width="9"/><path d="M-150,-300 Q-150,-250 -150,-212 M0,-336 V-212 M150,-300 Q150,-250 150,-212" stroke="#E0A52E" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M-190,-290 Q-120,-318 -40,-322" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".45"/></g>
</g></g>
<g id="chFW" opacity="0"><g id="chF">
 <rect x="-240" y="-210" width="480" height="212" rx="22" fill="#B4733A" ${sw(9)}/><path d="M-240,-140 H240 M-240,-70 H240" stroke="#8A5A2B" stroke-width="7" opacity=".8"/>
 <rect x="-240" y="-222" width="480" height="40" rx="14" fill="#E0A52E" ${sw(8)}/><rect x="-196" y="-210" width="44" height="212" rx="8" fill="#E0A52E" ${sw(7)}/><rect x="152" y="-210" width="44" height="212" rx="8" fill="#E0A52E" ${sw(7)}/>
 <g id="chLock"><rect x="-64" y="-190" width="128" height="130" rx="26" fill="#FFD84A" ${sw(9)}/><circle cx="0" cy="-138" r="25" fill="#3A2A18"/><path d="M-9,-120 H9 V-70 H-9Z" fill="#3A2A18"/><path d="M-30,-176 Q-16,-186 0,-186" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/></g>
 <circle cx="-210" cy="-196" r="11" fill="#FFD84A" ${sw(4)}/><circle cx="210" cy="-196" r="11" fill="#FFD84A" ${sw(4)}/>
</g></g>`;

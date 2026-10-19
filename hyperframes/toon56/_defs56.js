/* ================= Season 12 shared props (defined in #56, accumulate into #57-#60): the CIRCUS tent interior (striped roof wedges, scalloped valance, bunting, bleachers + crowd, velvet curtain, sawdust ring + barrier, two spotlights),
   the big-top tent that appears on the beach, twelve flat pancakes (juggling / pancake rain), a trapeze, a pancake trampoline, a magic table + hat + wand, a popcorn cart + popcorn, a hanging banner and a pancake tower ================= */
const crcWedgeSvg=Array.from({length:48},(_,i)=>{const x0=-3000+i*300;return `<path d="M1400,-2700 L${x0},720 L${x0+300},720Z" fill="${i%2?'#FFF3D1':'#E8483F'}" stroke="rgba(43,26,20,.28)" stroke-width="4"/>`;}).join('');
const crcValance=Array.from({length:48},(_,i)=>{const x0=-3000+i*300;return `<path d="M${x0},700 H${x0+300} V760 Q${x0+150},960 ${x0},760Z" fill="${i%2?'#FFF3D1':'#E8483F'}" ${sw(6)}/>`;}).join('');
const crcWall=Array.from({length:48},(_,i)=>{const x0=-3000+i*300;return `<rect x="${x0}" y="740" width="300" height="780" fill="${i%2?'#EFD9A6':'#C73A34'}"/>`;}).join('');
const crcBunt=(()=>{const cols=['#3FA3FF','#FFD93D','#FF5FA8','#2EBE85','#FF8A2B','#B07CFF'];let s='',k=0;
 for(let x0=-3000;x0<11000;x0+=600){const y0=800,sag=110;s+=`<path d="M${x0},${y0} Q${x0+300},${y0+sag*2} ${x0+600},${y0}" fill="none" stroke="${OL}" stroke-width="7"/>`;
  for(let j=1;j<8;j++){const t=j/8,px=(1-t)*(1-t)*x0+2*(1-t)*t*(x0+300)+t*t*(x0+600),py=(1-t)*(1-t)*y0+2*(1-t)*t*(y0+sag*2)+t*t*y0;
   s+=`<path d="M${(px-36).toFixed(0)},${py.toFixed(0)} L${(px+36).toFixed(0)},${py.toFixed(0)} L${px.toFixed(0)},${(py+84).toFixed(0)}Z" fill="${cols[(k++)%6]}" ${sw(5)}/>`;}}
 return s;})();
const crcSeatRows=[1128,1278,1440];
const crcSeats=`<rect x="-3000" y="940" width="14000" height="600" fill="#3E2257"/>
 <rect x="-3000" y="1000" width="14000" height="130" fill="#6B3C86" ${sw(5)}/><rect x="-3000" y="1130" width="14000" height="150" fill="#7C4799" ${sw(5)}/><rect x="-3000" y="1280" width="14000" height="230" fill="#8E55AB" ${sw(5)}/>
 ${crcSeatRows.map((y,r)=>Array.from({length:75},(_,i)=>`<rect x="${-3000+i*190+r*60}" y="${y-44}" width="140" height="44" rx="16" fill="#E8483F" ${sw(5)}/>`).join('')).join('')}`;
const crcCurtain=`<g id="crcCurt"><path d="M1090,1500 L1090,880 Q1090,760 1400,740 Q1710,760 1710,880 L1710,1500Z" fill="#7B1E2C" ${sw(9)}/>
 <path d="M1180,1500 L1180,860 M1270,1500 L1270,800 M1400,1500 L1400,780 M1530,1500 L1530,800 M1620,1500 L1620,860" stroke="#5A1220" stroke-width="12" stroke-linecap="round" opacity=".7"/>
 <path d="M1070,760 Q1400,700 1730,760 L1730,830 Q1400,770 1070,830Z" fill="#FFD23F" ${sw(8)}/><circle cx="1070" cy="840" r="22" fill="#FFD23F" ${sw(6)}/><circle cx="1730" cy="840" r="22" fill="#FFD23F" ${sw(6)}/></g>`;
const crcPeople=(()=>{const cols=['#FF8FC8','#7FE3B8','#FFD93D','#8FD0FF','#C9B7FF','#FFA46B','#B9E86B'];let s=['','',''];
 crcSeatRows.forEach((y,r)=>{for(let i=0;i<31;i++){const x=-800+i*150+(r%2)*75+Math.round((rnd(i,r+7)-.5)*30);if(x>1000&&x<1800)continue;const c=cols[Math.floor(rnd(i,r+30)*cols.length)];
  s[r]+=`<g transform="translate(${x},${y-36})"><ellipse cx="0" cy="-34" rx="56" ry="62" fill="${c}" ${sw(6)}/><circle cx="-18" cy="-52" r="12" fill="#fff"/><circle cx="18" cy="-52" r="12" fill="#fff"/><circle cx="-16" cy="-50" r="5.5" fill="${OL}"/><circle cx="20" cy="-50" r="5.5" fill="${OL}"/><path d="M-20,-24 Q0,-4 20,-24" fill="${OL}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><path d="M-62,-40 Q-82,-84 -60,-96 M62,-40 Q82,-84 60,-96" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-62,-40 Q-82,-84 -60,-96 M62,-40 Q82,-84 60,-96" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/></g>`;}});
 return s;})();
const CIRCUS_HTML=`<g id="crcSet" opacity="0">
 <defs><linearGradient id="gCrcFlr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A33F6C"/><stop offset="1" stop-color="#5E2250"/></linearGradient>
  <radialGradient id="gCrcSaw" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#FFE3A6"/><stop offset="1" stop-color="#EBB968"/></radialGradient>
  <linearGradient id="gCrcBeam" gradientUnits="userSpaceOnUse" x1="0" y1="-380" x2="0" y2="2250"><stop offset="0" stop-color="#FFF6BE" stop-opacity=".72"/><stop offset="1" stop-color="#FFF6BE" stop-opacity=".12"/></linearGradient>
  <linearGradient id="gCrcTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B0B3A" stop-opacity=".62"/><stop offset="1" stop-color="#1B0B3A" stop-opacity="0"/></linearGradient>
  <clipPath id="cpCrcRing"><ellipse cx="1400" cy="2240" rx="2170" ry="700"/></clipPath></defs>
 <g>${crcWedgeSvg}</g><g>${crcValance}</g><g>${crcWall}</g>
 <rect x="-3000" y="-2800" width="14000" height="3600" fill="url(#gCrcTop)"/>
 <g id="crcBuntG">${crcBunt}</g>
 <g>${crcSeats}</g>${crcCurtain}
 <rect x="-3000" y="740" width="14000" height="760" fill="rgba(25,10,50,.30)"/>
 <g id="crcCrowd" opacity="0"><g id="crcRow0">${crcPeople[0]}</g><g id="crcRow1">${crcPeople[1]}</g><g id="crcRow2">${crcPeople[2]}</g></g>
 <rect x="-3000" y="1500" width="14000" height="3400" fill="url(#gCrcFlr)" stroke="${OL}" stroke-width="8"/>
 <ellipse cx="1400" cy="2240" rx="2200" ry="722" fill="none" stroke="${OL}" stroke-width="10"/>
 <ellipse cx="1400" cy="2240" rx="2186" ry="708" fill="url(#gCrcSaw)" stroke="#E8483F" stroke-width="58"/><ellipse cx="1400" cy="2240" rx="2186" ry="708" fill="none" stroke="#fff" stroke-width="18" stroke-dasharray="130 130"/>
 <g clip-path="url(#cpCrcRing)">${Array.from({length:70},(_,i)=>{const x=Math.round(-700+rnd(i,41)*4200),y=Math.round(1560+rnd(i,42)*1380);return `<ellipse cx="${x}" cy="${y}" rx="${Math.round(16+rnd(i,43)*26)}" ry="${Math.round(6+rnd(i,44)*8)}" fill="#DDA356" opacity=".5"/>`;}).join('')}</g>
 <g>${Array.from({length:75},(_,i)=>`<rect x="${-3000+i*190}" y="1440" width="95" height="100" fill="${i%2?'#fff':'#E8483F'}"/>`).join('')}<rect x="-3000" y="1440" width="14000" height="100" fill="none" stroke="${OL}" stroke-width="9"/></g>
 <g id="crcSpotW" opacity="0"><g id="crcSpL"><path d="M640,-380 L760,-380 L1600,2250 L900,2250Z" fill="url(#gCrcBeam)"/></g><g id="crcSpR"><path d="M2040,-380 L2160,-380 L1900,2250 L1200,2250Z" fill="url(#gCrcBeam)"/></g>
  <ellipse cx="1250" cy="2250" rx="520" ry="120" fill="#FFF6BE" opacity=".34"/><ellipse cx="1550" cy="2250" rx="520" ry="120" fill="#FFF6BE" opacity=".34"/></g>
</g>`;
const DARK_HTML=`<g id="crcDarkW" opacity="0"><rect x="-3000" y="-3400" width="14000" height="8000" fill="rgba(25,10,60,.42)"/></g><g id="crcBlkW" opacity="0"><rect x="-3000" y="-3400" width="14000" height="8000" fill="#120A26"/></g>`;
/* ---- the big top that appears on the beach (base centre at 0,0; about 1900 wide, 1270 high with its flag) ---- */
const TENT_SIL='M-960,0 L-960,-470 Q-960,-560 -820,-640 Q-420,-900 0,-1080 Q420,-900 820,-640 Q960,-560 960,-470 L960,0Z';
const TENT_HTML=`<g id="tentW" opacity="0"><g id="tent"><ellipse cx="0" cy="22" rx="1100" ry="60" fill="rgba(120,80,20,.25)"/>
 <defs><clipPath id="cpTent"><path d="${TENT_SIL}"/></clipPath></defs>
 <g clip-path="url(#cpTent)">${Array.from({length:20},(_,i)=>{const x0=-3000+i*300;return `<path d="M0,-1080 L${x0},60 L${x0+300},60Z" fill="${i%2?'#FFF3D1':'#E8483F'}"/>`;}).join('')}</g>
 <path d="${TENT_SIL}" fill="none" ${sw(10)}/>
 ${Array.from({length:13},(_,i)=>`<path d="M${-975+i*150},-476 h150 v40 q-75,86 -150,0Z" fill="${i%2?'#3FA3FF':'#FFD23F'}" ${sw(6)}/>`).join('')}
 <path d="M-200,0 L-200,-300 Q-200,-440 0,-440 Q200,-440 200,-300 L200,0Z" fill="#3A1E55" ${sw(9)}/><ellipse cx="0" cy="-20" rx="150" ry="34" fill="#FFD76A" opacity=".55"/>
 <path d="M-200,0 L-200,-300 Q-200,-440 0,-440 L-70,-440 Q-150,-380 -160,0Z" fill="#E8483F" ${sw(7)}/><path d="M200,0 L200,-300 Q200,-440 0,-440 L70,-440 Q150,-380 160,0Z" fill="#E8483F" ${sw(7)}/>
 <circle cx="-172" cy="-200" r="16" fill="#FFD23F" ${sw(5)}/><circle cx="172" cy="-200" r="16" fill="#FFD23F" ${sw(5)}/>
 <g transform="translate(0,-640)"><rect x="-380" y="-70" width="760" height="140" rx="26" fill="#2A1E5C" ${sw(9)}/><rect x="-362" y="-54" width="724" height="108" rx="18" fill="none" stroke="#FFD23F" stroke-width="6"/>
  <text y="30" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="84" fill="#FFD23F" stroke="${OL}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">PENGUIN CIRCUS</text></g>
 <path d="M0,-1080 V-1270" stroke="${OL}" stroke-width="22" stroke-linecap="round"/><path d="M0,-1080 V-1270" stroke="#C9B58A" stroke-width="10" stroke-linecap="round"/>
 <g id="tentFlag"><path d="M0,-1270 L190,-1220 L0,-1170Z" fill="#FF5FA8" ${sw(8)}/><circle cx="62" cy="-1220" r="22" fill="#FFD23F" ${sw(5)}/></g></g></g>`;
/* ---- twelve flat pancakes (juggling #57, pancake rain #60) ---- */
const JPC_HTML=Array.from({length:12},(_,i)=>`<g id="jpcW${i}" opacity="0"><g id="jpc${i}"><g transform="scale(.62)">${pcd(0)}<rect x="-26" y="-54" width="52" height="22" rx="6" fill="#FFE98A" ${sw(5)}/></g></g></g>`).join('');
/* ---- the trapeze: ropes + bar hang from a pivot above the frame; #trp rotates around the pivot (bar centre = 0,1302 in its own coordinates) ---- */
const TRP_HTML=`<g id="trpW" opacity="0"><g id="trp">
 <path d="M-70,0 L-96,1290 M70,0 L96,1290" stroke="${OL}" stroke-width="26" stroke-linecap="round"/><path d="M-70,0 L-96,1290 M70,0 L96,1290" stroke="#E9D9A8" stroke-width="14" stroke-linecap="round"/>
 <rect x="-170" y="1280" width="340" height="44" rx="22" fill="#E8483F" ${sw(8)}/><rect x="-140" y="1290" width="280" height="12" rx="6" fill="#fff" opacity=".6"/>
 <circle cx="-170" cy="1302" r="26" fill="#FFD23F" ${sw(6)}/><circle cx="170" cy="1302" r="26" fill="#FFD23F" ${sw(6)}/></g></g>`;
/* ---- the pancake trampoline that catches Coco ---- */
const TRM_HTML=`<g id="trmW" opacity="0"><g id="trm"><ellipse cx="0" cy="40" rx="440" ry="84" fill="rgba(60,20,40,.28)"/>
 <path d="M-380,0 Q-380,60 0,70 Q380,60 380,0 L380,-20 Q380,-80 0,-84 Q-380,-80 -380,-20Z" fill="#E9A64F" ${sw(9)}/><ellipse cx="0" cy="-22" rx="360" ry="62" fill="#F6C777" ${sw(8)}/>
 <rect x="-44" y="-52" width="88" height="34" rx="9" fill="#FFE98A" ${sw(6)} transform="rotate(-6)"/><path d="M-250,-30 Q-200,-60 -140,-34 M120,-30 Q190,-62 250,-34" fill="none" stroke="#B8571D" stroke-width="10" stroke-linecap="round" opacity=".65"/></g></g>`;
/* ---- Mochi's magic: starry table with the black hat on it, and the wand ---- */
const MTB_HTML=`<g id="mtbW" opacity="0"><g id="mtb"><ellipse cx="0" cy="12" rx="210" ry="28" fill="rgba(60,20,40,.28)"/>
 <path d="M-120,0 L-90,-250 M120,0 L90,-250 M0,0 L0,-250" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M-120,0 L-90,-250 M120,0 L90,-250" stroke="#8A5A2B" stroke-width="8" stroke-linecap="round"/>
 <path d="M-190,-250 L190,-250 L240,-110 Q0,-70 -240,-110Z" fill="#2A3A8A" ${sw(9)}/><ellipse cx="0" cy="-252" rx="190" ry="34" fill="#3A4FB4" ${sw(8)}/>
 ${[[-110,-170],[0,-130],[110,-170],[-50,-200],[70,-215]].map(([x,y])=>`<path transform="translate(${x},${y}) scale(.9)" d="M0,-16 L5,-5 L16,0 L5,5 L0,16 L-5,5 L-16,0 L-5,-5Z" fill="#FFD23F"/>`).join('')}
 <g id="mhatW" transform="translate(0,-262)"><g id="mhat"><ellipse cx="0" cy="0" rx="130" ry="30" fill="#1E1B2E" ${sw(8)}/><path d="M-84,-12 L-76,-170 Q0,-196 76,-170 L84,-12Z" fill="#2B2742" ${sw(8)}/><ellipse cx="0" cy="-172" rx="76" ry="20" fill="#0D0B16" ${sw(7)}/><rect x="-82" y="-62" width="164" height="34" fill="#B07CFF" ${sw(6)}/></g></g></g></g>`;
const WAND_HTML=`<g id="wandW" opacity="0"><g id="wand"><path d="M0,0 L0,-230" stroke="${OL}" stroke-width="26" stroke-linecap="round"/><path d="M0,0 L0,-230" stroke="#2B2742" stroke-width="14" stroke-linecap="round"/><path d="M0,-196 V-230" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M0,-34 V-6" stroke="#fff" stroke-width="14" stroke-linecap="round"/></g></g>`;
/* ---- Truffle's popcorn cart + eight flying popcorn puffs ---- */
const POPC_HTML=`<g id="pcnW" opacity="0"><g id="pcn"><ellipse cx="0" cy="14" rx="230" ry="28" fill="rgba(60,20,40,.28)"/>
 <circle cx="-120" cy="-30" r="36" fill="#6B3C86" ${sw(8)}/><circle cx="120" cy="-30" r="36" fill="#6B3C86" ${sw(8)}/><circle cx="-120" cy="-30" r="12" fill="#FFD23F"/><circle cx="120" cy="-30" r="12" fill="#FFD23F"/>
 <path d="M-170,-50 L-150,-260 L150,-260 L170,-50Z" fill="#FFF3D1" ${sw(9)}/>${[-100,0,100].map(x=>`<path d="M${x-26},-260 L${x-30},-50 L${x+30},-50 L${x+26},-260Z" fill="#E8483F"/>`).join('')}<path d="M-170,-50 L-150,-260 L150,-260 L170,-50Z" fill="none" ${sw(9)}/>
 <path d="M-165,-262 Q-165,-420 0,-430 Q165,-420 165,-262Z" fill="rgba(215,243,255,.6)" ${sw(8)}/>
 ${Array.from({length:14},(_,i)=>`<circle cx="${Math.round(-120+rnd(i,51)*240)}" cy="${Math.round(-290-rnd(i,52)*90)}" r="${Math.round(20+rnd(i,53)*10)}" fill="${i%3?'#FFF8E1':'#FFE98A'}" ${sw(4)}/>`).join('')}
 <path d="M-180,-430 L180,-430 L150,-480 L-150,-480Z" fill="#E8483F" ${sw(8)}/><circle cx="0" cy="-492" r="18" fill="#FFD23F" ${sw(5)}/></g></g>`;
const PCK_HTML=Array.from({length:8},(_,i)=>`<g id="pckW${i}" opacity="0"><g id="pck${i}"><circle r="20" fill="#FFF8E1" ${sw(5)}/><circle cx="16" cy="-9" r="15" fill="#FFF8E1" ${sw(5)}/><circle cx="-14" cy="-10" r="14" fill="#FFE98A" ${sw(5)}/><circle cx="2" cy="-22" r="12" fill="#FFF8E1" ${sw(4)}/></g></g>`).join('');
/* ---- a hanging banner (the two text lines are changed with textContent per episode) ---- */
const BNR_HTML=`<g id="bnrW" opacity="0"><g id="bnr"><path d="M-300,-900 L-280,0 M300,-900 L280,0" stroke="${OL}" stroke-width="16"/><path d="M-300,-900 L-280,0 M300,-900 L280,0" stroke="#E9D9A8" stroke-width="8"/>
 <rect x="-400" y="-20" width="800" height="300" rx="30" fill="#E8483F" ${sw(12)}/><rect x="-376" y="4" width="752" height="252" rx="20" fill="none" stroke="#FFD23F" stroke-width="8"/>
 <text id="bnrT1" x="0" y="112" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="104" fill="#fff" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">SHOW IN</text>
 <text id="bnrT2" x="0" y="232" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="120" fill="#FFD23F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">3 DAYS!</text></g></g>`;
/* ---- Munch's pancake tower (nine pancakes, syrup and a cherry) ---- */
const TWR_HTML=`<g id="twrW" opacity="0"><g id="twr"><ellipse cx="0" cy="14" rx="140" ry="22" fill="rgba(60,20,40,.28)"/>${Array.from({length:9},(_,i)=>pcd(-i*38)).join('')}
 <path d="M-92,-346 Q-84,-300 -62,-296 Q-42,-338 -22,-298 Q8,-330 30,-296 Q60,-310 72,-346 Q0,-368 -92,-346Z" fill="#B8571D" ${sw(5)}/><circle cx="0" cy="-374" r="18" fill="#E8303A" ${sw(5)}/></g></g>`;

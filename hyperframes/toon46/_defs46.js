/* ================= Season 10 shared props (defined in #46, accumulate into #47-#50): the SNOW set (pale sky, snowy hills, pines, white ground; three scrolling layers + three layers of falling flakes), a cold-blue tint,
   Waddles the penguin (a re-coloured Flapjack rig: white face patch, beak, scarf, orange feet), the big red sled, the frozen syrup bottle + its splash, a waffle stand with icicles, icicle waffles,
   the snowman + a green striped scarf, the gray snow castle (with a pancake tower on top), a snowball, cocoa mugs, music notes ================= */
const snPine=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-16" y="-40" width="32" height="60" rx="6" fill="#7A4E2A" ${sw(6)}/><path d="M-120,-30 L0,-250 L120,-30Z" fill="#2F8F5B" ${sw(8)}/><path d="M-90,-140 L0,-320 L90,-140Z" fill="#37A06A" ${sw(8)}/><path d="M-60,-250 L0,-390 L60,-250Z" fill="#3FB074" ${sw(8)}/>
 <path d="M-62,-96 Q-30,-70 0,-100 Q30,-70 62,-96 L90,-140 L-90,-140Z M-36,-200 Q-12,-176 0,-206 Q14,-176 36,-200 L60,-250 L-60,-250Z M-18,-322 Q0,-300 18,-322 L0,-390Z" fill="#fff" ${sw(5)}/></g>`;
const SNOW_HTML=`<g id="snowSet" opacity="0">
 <defs><linearGradient id="gSnowSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FB8D6"/><stop offset=".55" stop-color="#D5E5F4"/><stop offset="1" stop-color="#F3F9FF"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gSnowSky)"/>
 <g id="snFar">${Array.from({length:8},(_,i)=>`<path transform="translate(${i*1800-1800},0)" d="M0,1500 L0,1380 Q300,1020 640,1190 Q1000,880 1400,1140 Q1660,1010 1800,1380 L1800,1500Z" fill="#F4F9FF" ${sw(7)}/><path transform="translate(${i*1800-1800},0)" d="M300,1250 Q500,1130 640,1190 Q820,1090 980,1180 Q760,1230 600,1290Z" fill="#D5E5F4"/>`).join('')}</g>
 <g id="snMid">${Array.from({length:8},(_,i)=>`<g transform="translate(${i*1200-1200},0)">${snPine(260,1470,.85)}${snPine(560,1450,1.1)}${snPine(900,1480,.7)}</g>`).join('')}</g>
 <rect x="-3000" y="1440" width="14000" height="3200" fill="#F7FBFF" stroke="${OL}" stroke-width="8"/>
 <g id="snGnd">${Array.from({length:10},(_,i)=>`<g transform="translate(${i*600-600},0)"><ellipse cx="140" cy="1700" rx="170" ry="26" fill="#DCE9F6"/><ellipse cx="430" cy="1980" rx="210" ry="30" fill="#DCE9F6"/><ellipse cx="300" cy="2300" rx="260" ry="36" fill="#E3EEF9"/>
  <path d="M60,1560 q10,-30 24,-40 M60,1560 q14,-34 0,-56 M60,1560 q22,-24 40,-30" stroke="#B9CDE2" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M470,1840 q10,-30 24,-40 M470,1840 q14,-34 0,-56 M470,1840 q22,-24 40,-30" stroke="#B9CDE2" stroke-width="7" fill="none" stroke-linecap="round"/></g>`).join('')}</g>
</g>`;
const SNF_HTML=[0,1,2].map(L=>`<g id="snf${L}" opacity=".95">${Array.from({length:[70,50,34][L]},(_,i)=>`<circle cx="${Math.round(-400+rnd(i,200+L)*3800)}" cy="${Math.round(-800+rnd(i,300+L)*4000)}" r="${[6,9,13][L]+Math.round(rnd(i,400+L)*[3,4,5][L])}" fill="#fff" stroke="#BFD3EA" stroke-width="2"/>`).join('')}</g>`).join('');
const COLD_HTML=`<rect id="coldR" x="-3000" y="-3000" width="9000" height="9000" fill="#5C9BFF" opacity="0"/>`;
function penguinSVG(p){let s=panSVG(p);
 s=s.split('#D9902F').join('#2A3150').split('#F9CE72').join('#3B4575').split('#EDB04A').join('#323A68').split('#B35A12').join('#151A33').split('#FFE98A').join('#FFFFFF');
 s=s.split('rx="26" ry="12" fill="#fff"').join('rx="32" ry="14" fill="#FF9A2B"').split('fill="#FFE3B8"').join('fill="#2A3150"');
 return s.replace(`<g id="${p}EyesClosed"`,`<ellipse cx="0" cy="-60" rx="106" ry="56" fill="#fff" stroke="${OL}" stroke-width="6"/><g id="${p}EyesClosed"`);}
const WD_ACC=`<path d="M-22,-62 L22,-62 L0,-36Z" fill="#FFB300" ${sw(5)}/><path d="M-12,-56 L12,-56" stroke="#FFE08A" stroke-width="5" stroke-linecap="round"/>
 <path d="M-128,-112 Q0,-80 128,-112 L128,-92 Q0,-58 -128,-92Z" fill="#E8303A" ${sw(6)}/><path d="M70,-92 q18,46 6,84 l34,0 q10,-40 -6,-86Z" fill="#E8303A" ${sw(6)}/><path d="M80,-60 H112 M80,-36 H108" stroke="#fff" stroke-width="7" opacity=".8"/>`;
const SLED_HTML=`<g id="sldW" opacity="0"><g id="sld">
 <ellipse cx="0" cy="300" rx="760" ry="64" fill="rgba(60,90,130,.25)"/>
 <path d="M-700,270 Q-760,270 -760,200 Q-760,150 -690,160 L-690,230Z M700,270 Q760,270 760,200 Q760,150 690,160 L690,230Z" fill="#6A3A12" ${sw(8)}/>
 <path d="M-720,270 H720" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M-720,270 H720" stroke="#C9CED6" stroke-width="16" stroke-linecap="round"/>
 <path d="M-560,180 V270 M-170,180 V270 M170,180 V270 M560,180 V270" stroke="#6A3A12" stroke-width="30" stroke-linecap="round"/>
 <path d="M-700,-210 L700,-210 Q760,-210 760,-150 L760,110 Q760,170 700,170 L-700,170 Q-760,170 -760,110 L-760,-150 Q-760,-210 -700,-210Z" fill="#E84C3D" ${sw(10)}/>
 <path d="M-700,100 H700 M-700,-90 H700" stroke="#B83A2D" stroke-width="10" opacity=".6"/><rect x="-690" y="-190" width="1380" height="46" rx="20" fill="#F07A6C" opacity=".6"/>
 <path d="M700,-150 Q820,-190 830,-90 Q700,-60 700,-60" fill="none" stroke="#6A3A12" stroke-width="22" stroke-linecap="round"/>
</g></g>`;
const BTL_HTML=`<g id="btlW" opacity="0"><g id="btl">
 <ellipse cx="0" cy="14" rx="130" ry="20" fill="rgba(60,90,130,.25)"/>
 <path d="M-70,0 L-70,-170 Q-70,-210 -40,-250 L-30,-300 L30,-300 L40,-250 Q70,-210 70,-170 L70,0Z" fill="#C97A2A" ${sw(8)}/><path d="M-50,-30 V-170 M-50,-200 Q-50,-220 -38,-240" stroke="#FFD27A" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/>
 <rect x="-82" y="-130" width="164" height="90" rx="14" fill="#FFF0C4" ${sw(6)}/><text x="0" y="-70" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="46" fill="#B8571D">SYRUP</text>
 <g id="btlCap"><rect x="-38" y="-336" width="76" height="42" rx="10" fill="#E8483F" ${sw(7)}/></g>
 <g id="btlIce"><path d="M-84,10 L-84,-250 Q-60,-300 -44,-260 L-44,-330 L-10,-290 L0,-340 L20,-290 L50,-330 L46,-260 Q70,-300 84,-250 L84,10Z" fill="#CFEFFF" fill-opacity=".72" ${sw(7)}/><path d="M-60,-40 L-40,-120 M20,-60 L50,-170 M-20,-200 L-50,-260" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/>
  ${[[-90,-20],[84,-80],[-86,-170],[88,-210]].map(([x,y])=>`<path d="M${x},${y} l${x<0?-26:26},-30 l${x<0?4:-4},34Z" fill="#CFEFFF" ${sw(5)}/>`).join('')}</g>
</g></g>`;
const SYS_HTML=(()=>{const pts=(n,r1,r2,rot)=>Array.from({length:n*2},(_,i)=>{const a=rot+i/(n*2)*Math.PI*2,r=(i%2?r1:r2)*(1+.1*Math.sin(i*2.7));return `${(Math.cos(a)*r*1.1).toFixed(0)},${(Math.sin(a)*r*.85).toFixed(0)}`;}).join(' ');
 return `<g id="sysW" opacity="0"><g id="sys"><polygon points="${pts(9,110,250,.2)}" fill="#C9741A" ${sw(12)}/><polygon points="${pts(9,64,150,.2)}" fill="#E39A3A" stroke="none"/><ellipse cx="-40" cy="-60" rx="56" ry="22" fill="#FFD27A" opacity=".75" transform="rotate(-20 -40 -60)"/>
 <path d="M-60,150 q-6,80 14,110 M70,160 q4,90 -12,120 M180,120 q8,60 -6,90" fill="none" stroke="#C9741A" stroke-width="28" stroke-linecap="round"/></g></g>`;})();
const STAND_HTML=`<g id="standW" opacity="0"><g id="stand">
 <ellipse cx="0" cy="14" rx="360" ry="30" fill="rgba(60,90,130,.25)"/>
 <rect x="-300" y="-330" width="40" height="340" rx="10" fill="#8A5A2B" ${sw(8)}/><rect x="260" y="-330" width="40" height="340" rx="10" fill="#8A5A2B" ${sw(8)}/>
 <rect x="-320" y="-110" width="640" height="120" rx="14" fill="#C98A4B" ${sw(9)}/><path d="M-300,-70 H300" stroke="#8A5A2B" stroke-width="7"/>
 <path d="M-360,-330 L360,-330 L330,-440 L-330,-440Z" fill="#fff" ${sw(9)}/>${Array.from({length:6},(_,i)=>`<path d="M${-360+i*120},-330 L${-300+i*120},-330 L${-270+i*110},-440 L${-330+i*110},-440Z" fill="#E8483F" ${sw(0)}/>`).join('')}<path d="M-360,-330 L360,-330 L330,-440 L-330,-440Z" fill="none" ${sw(9)}/>
 <path d="M-360,-330 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34 q0,34 30,34 q30,0 30,-34" fill="#fff" ${sw(6)}/>
 ${Array.from({length:9},(_,i)=>`<g id="ic${i}"><path d="M${-320+i*80},-296 L${-296+i*80},-296 L${-308+i*80},${-296+90+(i%3)*50}Z" fill="#CFEFFF" ${sw(6)}/><path d="M${-312+i*80},-286 L${-306+i*80},${-296+60+(i%3)*40}" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`).join('')}
 <text x="0" y="-50" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="46" fill="#fff" stroke="${OL}" stroke-width="8" paint-order="stroke">WAFFLES</text>
</g></g>`;
const WAF_HTML=`<g id="wfW" opacity="0"><g id="wf"><rect x="-70" y="-50" width="140" height="100" rx="18" fill="#E7B04A" ${sw(8)}/><path d="M-70,-16 H70 M-70,18 H70 M-24,-50 V50 M24,-50 V50" stroke="#B8751D" stroke-width="8"/><path d="M0,-50 L18,-190 L-18,-190Z" fill="#CFEFFF" ${sw(6)} transform="translate(0,-14)"/><circle cx="-36" cy="-32" r="7" fill="#FFF3B0"/></g></g>`;
const SNM_HTML=`<g id="snmW" opacity="0"><g id="snm">
 <ellipse cx="0" cy="14" rx="260" ry="34" fill="rgba(60,90,130,.25)"/>
 <circle cx="0" cy="-130" r="170" fill="#fff" ${sw(9)}/><circle cx="0" cy="-390" r="128" fill="#fff" ${sw(9)}/><circle cx="0" cy="-596" r="94" fill="#fff" ${sw(9)}/>
 <path d="M-170,-150 Q-250,-260 -330,-250 M170,-150 Q250,-260 330,-250" fill="none" stroke="#7A4E2A" stroke-width="16" stroke-linecap="round"/>
 ${[-60,-10,40].map((y,i)=>`<circle cx="0" cy="${-210+i*80}" r="14" fill="#2A1F3A"/>`).join('')}
 <circle cx="-34" cy="-616" r="12" fill="#2A1F3A"/><circle cx="34" cy="-616" r="12" fill="#2A1F3A"/><path d="M0,-596 L90,-580 L0,-566Z" fill="#FF8A2B" ${sw(5)}/>
 <path d="M-50,-560 Q0,-530 50,-560" fill="none" stroke="#2A1F3A" stroke-width="8" stroke-linecap="round"/>
 <path d="M-96,-660 L96,-660 L70,-690 L-70,-690Z" fill="#2A1F3A" ${sw(5)}/><rect x="-60" y="-780" width="120" height="100" rx="12" fill="#2A1F3A" ${sw(6)}/><rect x="-60" y="-710" width="120" height="22" fill="#E8303A"/>
</g></g>`;
const SCF_HTML=`<g id="scfW" opacity="0"><g id="scf"><path d="M-130,-470 Q0,-410 130,-470 L130,-426 Q0,-366 -130,-426Z" fill="#2EBE85" ${sw(8)}/><path d="M60,-410 q26,90 6,160 l56,0 q10,-80 -10,-170Z" fill="#2EBE85" ${sw(8)}/><path d="M-90,-452 L-60,-398 M-30,-448 L0,-390 M30,-448 L60,-396 M90,-452 L110,-404 M72,-330 H118 M74,-290 H112" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/></g></g>`;
const CASTLE_HTML=`<g id="castW" opacity="0"><g id="cast">
 <ellipse cx="0" cy="20" rx="760" ry="50" fill="rgba(60,90,130,.28)"/>
 <path d="M-560,0 L-560,-420 L-500,-420 L-500,-460 L-440,-460 L-440,-420 L-380,-420 L-380,-460 L-320,-460 L-320,-420 L320,-420 L320,-460 L380,-460 L380,-420 L440,-420 L440,-460 L500,-460 L500,-420 L560,-420 L560,0Z" fill="#E7EEF5" ${sw(10)}/>
 <path d="M-540,-300 H540 M-540,-160 H540" stroke="#C3D0DE" stroke-width="7" opacity=".8"/>
 ${[[-460,-620,170],[460,-620,170],[0,-860,210]].map(([x,y,w])=>`<rect x="${x-w/2}" y="${y}" width="${w}" height="${-y-0}" rx="14" fill="#F4F8FC" ${sw(10)}/><path d="M${x-w/2-24},${y} L${x},${y-190} L${x+w/2+24},${y}Z" fill="#8FA4C0" ${sw(10)}/><path d="M${x},${y-190} V${y-290}" stroke="${OL}" stroke-width="8"/><path d="M${x},${y-290} L${x+80},${y-262} L${x},${y-234}Z" fill="#E8303A" ${sw(6)}/><rect x="${x-24}" y="${y+60}" width="48" height="84" rx="22" fill="#FFE79A" ${sw(7)}/>`).join('')}
 <path d="M-130,0 L-130,-190 Q0,-300 130,-190 L130,0Z" fill="#5C6C86" ${sw(10)}/><path d="M-100,0 L-100,-176 Q0,-260 100,-176 L100,0Z" fill="#FFD27A" opacity=".85"/>
 <g transform="translate(0,-1100)"><g id="castTop"><ellipse cx="0" cy="40" rx="96" ry="26" fill="#D9902F" ${sw(7)}/><ellipse cx="0" cy="12" rx="90" ry="25" fill="#F6C777" ${sw(7)}/><ellipse cx="0" cy="-14" rx="84" ry="23" fill="#D9902F" ${sw(7)}/><ellipse cx="0" cy="-38" rx="76" ry="21" fill="#F6C777" ${sw(7)}/><rect x="-26" y="-66" width="52" height="30" rx="8" fill="#FFE98A" ${sw(5)}/></g></g>
</g></g>`;
const SNB_HTML=`<g id="sbW" opacity="0"><g id="sb"><circle r="30" fill="#fff" ${sw(6)}/><path d="M-14,10 Q4,22 18,6" fill="none" stroke="#BFD3EA" stroke-width="7" stroke-linecap="round"/></g></g>`;
const MUG_HTML=`<g id="mgW" opacity="0"><g id="mg"><path id="mgS0" d="M-14,-90 q-14,-24 0,-48 q14,-24 0,-48" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0"/><path id="mgS1" d="M16,-90 q-14,-24 0,-48 q14,-24 0,-48" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0"/>
 <path d="M-60,-84 H60 L50,0 Q0,18 -50,0Z" fill="#E8483F" ${sw(8)}/><ellipse cx="0" cy="-84" rx="60" ry="14" fill="#7A3E1D" ${sw(7)}/><path d="M58,-64 q46,6 40,40 q-6,24 -44,20" fill="none" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M58,-64 q46,6 40,40 q-6,24 -44,20" fill="none" stroke="#E8483F" stroke-width="8" stroke-linecap="round"/><circle cx="-20" cy="-84" r="9" fill="#fff" ${sw(3)}/></g></g>`;
const NOTE_HTML=`<g id="ntW" opacity="0">${[0,1,2,3,4].map(i=>{const c=['#FF8FC8','#FFE14D','#8FD9FF','#B9AEFF','#8BFF5A'][i];return `<g id="nt${i}" opacity="0" transform="translate(${i*110-220},${(i%2)*-30})"><g id="ntg${i}">${i%2?`<ellipse cx="0" cy="0" rx="26" ry="19" transform="rotate(-22)" fill="${c}" ${sw(7)}/><ellipse cx="62" cy="-14" rx="26" ry="19" transform="rotate(-22 62 -14)" fill="${c}" ${sw(7)}/><path d="M20,-10 V-112 M82,-24 V-126 M20,-112 L82,-126" stroke="${OL}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M20,-10 V-112 M82,-24 V-126 M20,-112 L82,-126" stroke="${c}" stroke-width="6" stroke-linecap="round" fill="none"/>`:`<ellipse cx="0" cy="0" rx="28" ry="21" transform="rotate(-22)" fill="${c}" ${sw(7)}/><path d="M22,-10 V-118 q42,12 38,52" stroke="${OL}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M22,-10 V-118 q42,12 38,52" stroke="${c}" stroke-width="6" stroke-linecap="round" fill="none"/>`}</g></g>`;}).join('')}</g>`;

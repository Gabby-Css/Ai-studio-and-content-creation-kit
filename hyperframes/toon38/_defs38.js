/* ================= episode 38 additions (Season 8, "The Riddle Gate"): a jungle trail set (canopy, trees, dirt path, a cliff edge far on the right), the giant riddle gate with a sign
   and two swinging doors, pancake trees, a leafy bush that hides the secret path, a cheese thought bubble and a falling pancake ================= */
const JTREE=(x,y,s,c1,c2)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,0 Q-26,-200 -16,-420 L18,-420 Q28,-200 34,0Z" fill="#8A5A2B" ${sw(8)}/><path d="M-4,-40 Q0,-200 6,-400" fill="none" stroke="#A8743A" stroke-width="10" stroke-linecap="round" opacity=".7"/>
 <circle cx="0" cy="-520" r="190" fill="${c1}" ${sw(9)}/><circle cx="-130" cy="-440" r="120" fill="${c2}" ${sw(7)}/><circle cx="140" cy="-450" r="125" fill="${c2}" ${sw(7)}/><circle cx="-40" cy="-600" r="100" fill="${c2}" ${sw(6)}/>
 <path d="M-90,-380 q-12,60 6,110 M70,-370 q10,70 -4,130" fill="none" stroke="#2E8B57" stroke-width="12" stroke-linecap="round"/></g>`;
const JUN_HTML=`<g id="junSet" opacity="0">
 <defs><linearGradient id="gJun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#59C9B5"/><stop offset=".55" stop-color="#B7EBC4"/><stop offset="1" stop-color="#EAF9D0"/></linearGradient>
 <linearGradient id="gChasm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A7F0"/><stop offset=".35" stop-color="#7C5BC0"/><stop offset="1" stop-color="#2C1E5E"/></linearGradient>
 <linearGradient id="gGate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3B0"/><stop offset="1" stop-color="#8FE0A0"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gJun)"/>
 <path d="M-1800,1500 Q-1200,1000 -600,1250 Q0,800 700,1220 Q1300,880 1900,1200 Q2500,860 3200,1240 Q3700,1000 4400,1450Z" fill="#2E9E6B" ${sw(7)}/>
 <path d="M-1800,1500 Q-1000,1160 -300,1330 Q400,1040 1100,1320 Q1700,1100 2400,1310 Q3000,1090 3600,1340 Q4000,1180 4400,1500Z" fill="#3FAF6A" ${sw(7)}/>
 ${[-900,-300,300,820,1780,2300,2900,3500].map((x,i)=>JTREE(x,1470,.62+(i%3)*.1,'#2F9E63','#3FB878')).join('')}
 <rect x="-3000" y="1400" width="14000" height="2600" fill="#6CC656" stroke="${OL}" stroke-width="8"/>
 <path d="M880,2900 L1160,1440 L1440,1440 L1720,2900Z" fill="#E9C98F" ${sw(8)}/><path d="M1000,2500 L1190,1500 M1600,2500 L1410,1500" fill="none" stroke="#D2AC6C" stroke-width="10" stroke-linecap="round"/>
 <path d="M1700,1700 Q2100,1650 2400,1760 Q2650,1840 2790,1800 L2790,1900 Q2650,1950 2400,1880 Q2100,1780 1740,1800Z" fill="#E9C98F" ${sw(8)}/>
 ${Array.from({length:30},(_,i)=>{const x=-200+rnd(i,81)*2900,y=1500+rnd(i,82)*1100;return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><path d="M0,0 Q-10,-40 -26,-56 M0,0 Q4,-50 0,-70 M0,0 Q12,-40 28,-54" stroke="#2E9E55" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;}).join('')}
 <g id="junCliff"><rect x="2790" y="1400" width="12000" height="2600" fill="url(#gChasm)"/><path d="M2790,1400 L2790,3800" stroke="${OL}" stroke-width="10"/><path d="M2790,1420 Q2830,1460 2800,1520 Q2840,1600 2800,1700 Q2840,1800 2796,1900 Q2830,2000 2796,2100 L2790,2100Z" fill="#B4733A" ${sw(8)}/>
  <path d="M3700,1900 L3760,1500 L3900,1560 L3960,1420 L4300,1440 L4400,1900Z" fill="#E8A05A" ${sw(8)}/><ellipse cx="3400" cy="2400" rx="900" ry="120" fill="#fff" opacity=".28"/><ellipse cx="3000" cy="2900" rx="700" ry="90" fill="#fff" opacity=".22"/></g>
 <g id="junTop"><path d="M-1800,-400 L-1800,220 Q-1500,320 -1200,160 Q-900,360 -600,180 Q-300,380 0,160 Q300,360 600,200 Q900,380 1200,170 Q1500,360 1800,190 Q2100,360 2400,170 Q2700,340 3000,190 L3000,-400Z" fill="#1F7A4D" ${sw(8)}/>
  ${[-1400,-800,-100,500,1150,1750,2350].map((x,i)=>`<path d="M${x},200 q${i%2?-20:20},120 0,${200+(i%3)*60}" fill="none" stroke="#2EBE85" stroke-width="16" stroke-linecap="round"/>`).join('')}</g>
</g>`;
const GATE_HTML=`<g id="gateW" opacity="0"><g id="gate">
 <ellipse cx="0" cy="12" rx="560" ry="42" fill="rgba(30,60,30,.3)"/>
 <rect id="gtOpen" x="-310" y="-700" width="620" height="700" fill="url(#gGate)" opacity="0"/>
 <g id="gtL"><rect x="-310" y="-700" width="310" height="700" rx="10" fill="#B4733A" ${sw(8)}/><path d="M-210,-690 V-6 M-110,-690 V-6" stroke="#8A5A2B" stroke-width="8"/><path d="M-310,-520 H0 M-310,-180 H0" stroke="#5B5F6B" stroke-width="16"/>
  <path d="M0,-470 A130,130 0 0 0 0,-210Z" fill="#F6C777" ${sw(8)}/><path d="M-40,-420 Q-70,-390 -40,-360" fill="none" stroke="#FFF3B0" stroke-width="12" stroke-linecap="round"/><circle cx="-26" cy="-300" r="12" fill="#5B5F6B"/></g>
 <g id="gtR"><rect x="0" y="-700" width="310" height="700" rx="10" fill="#B4733A" ${sw(8)}/><path d="M110,-690 V-6 M210,-690 V-6" stroke="#8A5A2B" stroke-width="8"/><path d="M0,-520 H310 M0,-180 H310" stroke="#5B5F6B" stroke-width="16"/>
  <path d="M0,-470 A130,130 0 0 1 0,-210Z" fill="#F6C777" ${sw(8)}/><circle cx="26" cy="-300" r="12" fill="#5B5F6B"/></g>
 <rect x="-400" y="-880" width="110" height="880" rx="22" fill="#A7ADB5" ${sw(9)}/><rect x="290" y="-880" width="110" height="880" rx="22" fill="#A7ADB5" ${sw(9)}/>
 <path d="M-380,-700 H-310 M-380,-500 H-310 M-380,-300 H-310 M310,-700 H380 M310,-500 H380 M310,-300 H380" stroke="#7D838C" stroke-width="10" stroke-linecap="round"/>
 <rect x="-440" y="-960" width="190" height="90" rx="22" fill="#C3C8CF" ${sw(9)}/><rect x="250" y="-960" width="190" height="90" rx="22" fill="#C3C8CF" ${sw(9)}/>
 <rect x="-420" y="-860" width="840" height="150" rx="30" fill="#B4733A" ${sw(9)}/><path d="M-380,-800 H380 M-380,-760 H380" stroke="#8A5A2B" stroke-width="8" stroke-linecap="round" opacity=".6"/>
 <g id="gtSign"><path d="M-250,-870 L-250,-980 M250,-870 L250,-980" stroke="${OL}" stroke-width="10"/><rect x="-370" y="-1170" width="740" height="210" rx="34" fill="#FFF0C4" ${sw(10)}/><rect x="-346" y="-1146" width="692" height="162" rx="22" fill="none" stroke="#C99A4A" stroke-width="6" stroke-dasharray="20 12"/>
  <g font-family="Baloo2,sans-serif" font-weight="800" text-anchor="middle" fill="#6A3A12">
   <text id="sgR" x="-190" y="-1042" font-size="78">ROUND,</text><text id="sgG" x="130" y="-1042" font-size="78">GOLDEN,</text><text id="sgF" x="0" y="-974" font-size="78">AND FLIPPED!</text></g></g>
</g></g>`;
const PTREE=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-24" y="-300" width="48" height="300" rx="14" fill="#9A6A3A" ${sw(8)}/>
 <g transform="translate(0,-300)"><ellipse cx="0" cy="62" rx="190" ry="44" fill="#D9902F" ${sw(8)}/><ellipse cx="0" cy="14" rx="178" ry="42" fill="#F6C777" ${sw(8)}/><ellipse cx="0" cy="-34" rx="160" ry="38" fill="#D9902F" ${sw(8)}/><ellipse cx="0" cy="-80" rx="140" ry="34" fill="#F6C777" ${sw(8)}/><ellipse cx="0" cy="-118" rx="108" ry="28" fill="#D9902F" ${sw(8)}/>
  <rect x="-34" y="-176" width="68" height="46" rx="12" fill="#FFE98A" ${sw(6)}/><path d="M-150,-60 q-6,56 14,70 M-40,-80 q-6,60 12,82 M70,-70 q-5,50 11,64 M140,-30 q4,40 -8,52" fill="none" stroke="#B35A12" stroke-width="16" stroke-linecap="round"/></g></g>`;
const PTRI_HTML=`<g id="ptrIn" opacity="0">${[[1130,1520,.5],[1470,1520,.5],[1300,1480,.42]].map(([x,y,s])=>PTREE(x,y,s)).join('')}</g>`;
const PTRO_HTML=`<g id="ptrOut" opacity="0">${[[620,1560,.85],[880,1500,.6],[1740,1500,.6],[1980,1580,.95],[2330,1520,.7]].map(([x,y,s])=>PTREE(x,y,s)).join('')}</g>`;
const BUSH_HTML=`<g id="bushW" opacity="0"><g id="bush"><ellipse cx="0" cy="10" rx="230" ry="30" fill="rgba(30,60,30,.3)"/>
 <circle cx="0" cy="-130" r="140" fill="#2E9E55" ${sw(9)}/><circle cx="-130" cy="-90" r="100" fill="#3FB868" ${sw(8)}/><circle cx="130" cy="-90" r="105" fill="#3FB868" ${sw(8)}/><circle cx="-40" cy="-190" r="70" fill="#4BC979" ${sw(7)}/>
 <path d="M-90,-60 q-10,40 4,70 M60,-70 q10,40 -4,70" fill="none" stroke="#1F7A4D" stroke-width="12" stroke-linecap="round"/></g></g>`;
const CHB_HTML=`<g id="chbW" opacity="0"><g id="chb">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="60" cy="-62" rx="130" ry="92" fill="#fff" ${sw(6)}/>
 <path d="M-30,-40 L150,-70 Q160,-110 120,-120 L-26,-120Z" fill="#FFD84A" ${sw(6)}/><circle cx="20" cy="-82" r="12" fill="#E0A52E"/><circle cx="82" cy="-96" r="9" fill="#E0A52E"/><circle cx="60" cy="-62" r="7" fill="#E0A52E"/>
</g></g>`;
const FCK_HTML=`<g id="fckW" opacity="0"><g id="fck"><ellipse cx="0" cy="14" rx="70" ry="20" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="0" rx="66" ry="19" fill="#F6C777" ${sw(6)}/><rect x="-18" y="-24" width="36" height="22" rx="7" fill="#FFE98A" ${sw(4)}/></g></g>`;

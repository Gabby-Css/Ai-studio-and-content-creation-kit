/* ================= episode 22 additions: detective Mochi (deerstalker + magnifying glass), sticky footprints, the Golden Spatula that gets tied to balloons ================= */
document.getElementById('mcHead').insertAdjacentHTML('beforeend',`<g id="mcHat" opacity="0"><g transform="translate(0,-222)">
 <path d="M-150,14 Q-176,50 -128,62 Q-108,40 -104,16Z" fill="#8A6A40" ${sw(6)}/><path d="M150,14 Q176,50 128,62 Q108,40 104,16Z" fill="#8A6A40" ${sw(6)}/>
 <path d="M-124,16 Q-136,-66 -42,-86 Q0,-100 42,-86 Q136,-66 124,16 Q0,46 -124,16Z" fill="#A98B5A" ${sw(7)}/>
 <path d="M-118,4 Q0,40 118,4" fill="none" stroke="#6E5230" stroke-width="12"/>
 <path d="M-60,-84 L-56,-6 M0,-96 V16 M60,-84 L56,-6" stroke="#7B5E36" stroke-width="7" fill="none"/>
 <circle cx="0" cy="-100" r="13" fill="#6E5230" ${sw(5)}/>
</g></g>`);
document.getElementById('mcArmR').insertAdjacentHTML('beforeend',`<g id="mcMag" opacity="0">
 <path d="M4,104 L4,176" stroke="${OL}" stroke-width="15" stroke-linecap="round"/><path d="M4,104 L4,176" stroke="#8A5A2B" stroke-width="8" stroke-linecap="round"/>
 <circle cx="4" cy="224" r="50" fill="rgba(200,240,255,.5)" stroke="${OL}" stroke-width="10"/><circle cx="4" cy="224" r="50" fill="none" stroke="#C9971A" stroke-width="5"/>
 <path d="M-22,206 Q-16,192 -2,188" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>
</g>`);
// sticky footprints on the floor (behind everybody)
let fps='';for(let i=0;i<12;i++){const x=1130+i*66,y=1640+78+(i%2?16:-12);fps+=`<g transform="translate(${x},${y})"><g id="fp${i}" class="fp" opacity="0"><ellipse rx="30" ry="17" fill="#B8571D" ${sw(4)}/><ellipse cx="-9" cy="-4" rx="9" ry="4" fill="#E58A4B" opacity=".8"/><circle cx="-34" cy="2" r="6" fill="#B8571D"/><circle cx="36" cy="-2" r="5" fill="#B8571D"/></g></g>`;}
document.getElementById('partyFloor').insertAdjacentHTML('beforeend',fps);
// the Golden Spatula, free: handle tip at the origin; it stands blade-up (rotated 180) until balloons turn it over
const BLC=['#FF5F5F','#FFE14D','#3FD6FF','#8BFF5A'];
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="flyW" opacity="0"><g id="fly">
 <g id="bals" opacity="0">${[[-86,-300,0],[0,-360,1],[84,-290,2],[-36,-250,3]].map(([x,y,c])=>`<path d="M0,0 L${x},${y+54}" stroke="${OL}" stroke-width="5" fill="none"/><g transform="translate(${x},${y})" class="bln"><ellipse rx="46" ry="56" fill="${BLC[c]}" ${sw(6)}/><ellipse cx="-14" cy="-20" rx="10" ry="16" fill="#fff" opacity=".6"/><path d="M-9,56 L9,56 L0,70Z" fill="${BLC[c]}" ${sw(4)}/></g>`).join('')}</g>
 <g id="gspIn">
  <path d="M-10,0 L-10,150 Q-10,166 0,166 Q10,166 10,150 L10,0Z" fill="#FFC21E" ${sw(6)}/>
  <path d="M-62,330 Q-62,358 -34,358 L34,358 Q62,358 62,330 L62,230 Q62,166 10,166 L-10,166 Q-62,166 -62,230Z" fill="#FFE066" ${sw(7)}/>
  <path d="M-28,336 V250 M0,336 V250 M28,336 V250" stroke="#C9971A" stroke-width="11" stroke-linecap="round"/>
  <path d="M-42,330 Q-48,270 -38,226" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>
 </g>
</g></g>`);
// a sunny sky + lawn for the chase (used from the end of this episode on)
document.getElementById('setMount').insertAdjacentHTML('beforeend',`<g id="skySet" opacity="0">
 <defs><linearGradient id="gSkyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E9BFF"/><stop offset=".55" stop-color="#8CD2FF"/><stop offset="1" stop-color="#E4F6FF"/></linearGradient></defs>
 <rect x="-1800" y="-3400" width="6200" height="4900" fill="url(#gSkyDay)"/>
 <g transform="translate(2350,-260)"><circle r="190" fill="#FFF3B0" opacity=".45"/><circle r="120" fill="#FFE14D" ${sw(6)}/></g>
 <g id="clouds">${[[300,200,1.0],[1500,-100,1.3],[2300,380,.9],[700,-700,1.2],[1900,-1000,1.0],[300,-1500,1.4],[1300,-1900,1.1],[2200,-2300,1.3],[700,-2600,1.0]].map(([x,y,s])=>`<g transform="translate(${x},${y}) scale(${s})"><g class="cld"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g></g>`).join('')}</g>
 <path d="M-300,1400 Q200,1000 700,1200 Q1200,900 1700,1180 Q2200,980 2900,1400Z" fill="#6FD38A" ${sw(7)}/>
 <path d="M-300,1450 Q300,1150 900,1300 Q1500,1080 2100,1300 Q2600,1180 2900,1450Z" fill="#52C27A" ${sw(7)}/>
 ${[[520,1.0],[2480,1.2],[1180,.7]].map(([x,s])=>`<g transform="translate(${x},1400) scale(${s})"><rect x="-22" y="-210" width="44" height="210" rx="10" fill="#9A6A3A" ${sw(7)}/><circle cx="0" cy="-290" r="130" fill="#3FAF6A" ${sw(8)}/><circle cx="-70" cy="-240" r="80" fill="#4BC079" ${sw(6)}/><circle cx="76" cy="-250" r="84" fill="#4BC079" ${sw(6)}/></g>`).join('')}
 <rect x="-1800" y="1380" width="6200" height="2400" fill="#8BE08B" stroke="${OL}" stroke-width="8"/>
 ${Array.from({length:14},(_,i)=>{const x=-100+rnd(i,91)*2900,y=1450+rnd(i,92)*380;return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><path d="M0,0 Q-8,-34 -20,-44 M0,0 Q4,-40 0,-52 M0,0 Q10,-34 22,-42" stroke="#4BAF5E" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;}).join('')}
</g>`);

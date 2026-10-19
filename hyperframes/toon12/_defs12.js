/* ================= episode 12 additions: PLANET GLOOP (the jelly landscape), the Gloopians (recoloured Blips), the Gloop King, a crown, a litter ================= */
const GLC=[['#FF8FC8','#E0529F','#FFD0E8','#7FE0FF'],['#FFE066','#E0B52E','#FFF3B0','#FF8F5A'],['#7FC8FF','#4A93E0','#C7E6FF','#FFB3E0'],['#FFAA66','#E07A2E','#FFD9B8','#7FFFB0']];
const KGC=['#FFD36B','#E0A52E','#FFF0B8','#FF8F4A'];
const tintBlip=(p,c)=>blipSVG(p).split(BG_).join(c[0]).split(BD_).join(c[1]).split(BL_).join(c[2]).split(BP_).join(c[3]);
const crownPath=(s)=>`<g transform="scale(${s})"><path d="M-60,0 L-60,-62 L-30,-30 L0,-78 L30,-30 L60,-62 L60,0Z" fill="#FFD84A" ${sw(7)}/><rect x="-60" y="-8" width="120" height="22" rx="6" fill="#E0A52E" ${sw(6)}/><circle cx="0" cy="-84" r="11" fill="#FF5F8B" ${sw(4)}/><circle cx="-60" cy="-68" r="9" fill="#6FF6FF" ${sw(4)}/><circle cx="60" cy="-68" r="9" fill="#8BFF5A" ${sw(4)}/></g>`;
document.getElementById('gpMount').innerHTML='<g clip-path="url(#cpAbove)">'+GLC.map((c,i)=>tintBlip('g'+(i+1),c)).join('')+tintBlip('kg',KGC)+'</g>'
 +`<g id="crwnW"><g id="crwn" opacity="0">${crownPath(.85)}</g></g><g id="kcrnW"><g id="kcrn" opacity="0">${crownPath(1.7)}</g></g>`;
document.getElementById('litterMount').innerHTML=`<g id="litter" opacity="0"><g id="litterIn">
 <path d="M-210,10 L-190,-14 L190,-14 L210,10Z" fill="#C98A4B" ${sw(7)}/><rect x="-176" y="-40" width="352" height="28" rx="12" fill="#FFB3E0" ${sw(7)}/>
 <g fill="#fff" opacity=".8"><circle cx="-120" cy="-26" r="6"/><circle cx="-40" cy="-26" r="6"/><circle cx="40" cy="-26" r="6"/><circle cx="120" cy="-26" r="6"/></g></g></g>`;

/* ---------------- the set: Planet Gloop (above the kitchen, below the characters) ---------------- */
const gStars=Array.from({length:50},(_,i)=>{const x=-200+rnd(i,21)*3200,y=-700+rnd(i,22)*1500,r=1.5+rnd(i,23)*3;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity=".8"/>`;}).join('');
const mush=(x,s,c1,c2)=>`<g transform="translate(${x},1400) scale(${s})"><g class="mush"><path d="M-30,0 Q-40,-170 -22,-250 L22,-250 Q40,-170 30,0Z" fill="#FFF0D6" ${sw(7)}/><path d="M-210,-250 Q-210,-480 0,-480 Q210,-480 210,-250 Q0,-210 -210,-250Z" fill="${c1}" ${sw(8)}/><g fill="${c2}"><circle cx="-110" cy="-340" r="34"/><circle cx="30" cy="-420" r="28"/><circle cx="120" cy="-320" r="38"/><circle cx="-20" cy="-300" r="22"/></g><ellipse cx="-90" cy="-430" rx="60" ry="26" transform="rotate(-25 -90 -430)" fill="#fff" opacity=".45"/></g></g>`;
const hill=(pts,c,o)=>`<path d="${pts}" fill="${c}" opacity="${o}" ${sw(7)}/>`;
let bubs='';for(let i=0;i<12;i++){const x=300+rnd(i,31)*2200,y=1000+rnd(i,32)*500,r=14+rnd(i,33)*30;bubs+=`<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><circle class="fb" r="${r.toFixed(0)}" fill="#fff" opacity=".35" stroke="#fff" stroke-width="4"/></g>`;}
let jb='';for(let i=0;i<26;i++){const x=-300+rnd(i,41)*3000,y=1480+rnd(i,42)*500,r=18+rnd(i,43)*46;jb+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${['#8BFFD2','#2FA99E','#B7FFF0'][i%3]}" opacity=".35"/>`;}
document.getElementById('setMount').innerHTML+=`<g id="gloopSet" opacity="0">
 <rect x="-1800" y="-1800" width="6200" height="3300" fill="url(#gSkyG)"/>${gStars}
 <g transform="translate(900,260)"><circle r="150" fill="#9FE3FF" ${sw(7)}/><g fill="#7CC4E6"><circle cx="-40" cy="-30" r="34"/><circle cx="50" cy="40" r="40"/></g><ellipse cx="-60" cy="-70" rx="50" ry="20" transform="rotate(-30)" fill="#fff" opacity=".5"/></g>
 <g transform="translate(2000,120)"><circle r="84" fill="#FFE98A" ${sw(6)}/><circle cx="20" cy="20" r="22" fill="#F0C94A"/></g>
 <ellipse cx="1500" cy="520" rx="240" ry="36" fill="#fff" opacity=".35"/><ellipse cx="1650" cy="480" rx="150" ry="28" fill="#fff" opacity=".35"/>
 ${hill('M-300,1400 Q100,900 500,1100 Q900,800 1300,1050 Q1700,780 2100,1050 Q2500,880 2900,1400Z','#B58CFF',.85)}
 ${hill('M-300,1450 Q200,1100 700,1250 Q1200,1000 1700,1250 Q2200,1050 2900,1450Z','#7DF0B0',.9)}
 ${mush(640,.8,'#FF8FD2','#FFE0F4')}${mush(1500,1.0,'#6FF6FF','#D8FFFF')}${mush(2200,.9,'#FFB46F','#FFE6C8')}
 <rect x="-1800" y="1380" width="6200" height="2400" fill="url(#gJelly)"/>
 <path d="M-1800,1380 Q-1500,1348 -1200,1380 T-600,1380 T0,1380 T600,1380 T1200,1380 T1800,1380 T2400,1380 T3000,1380 T3600,1380 T4400,1380" fill="none" stroke="#fff" stroke-width="12" opacity=".5" stroke-linecap="round"/>
 ${jb}${bubs}
 <ellipse cx="1000" cy="1700" rx="300" ry="40" fill="#fff" opacity=".18"/><ellipse cx="1900" cy="1760" rx="360" ry="46" fill="#fff" opacity=".14"/>
 <path id="crack" d="M1380,1650 L1440,1640 L1420,1670 L1500,1648 L1470,1690 L1560,1655 L1600,1650" fill="none" stroke="#17203F" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
</g>`;

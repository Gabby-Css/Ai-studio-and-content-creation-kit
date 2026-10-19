/* ================= episode 11 additions: the saucer's cockpit (bigger on the inside!), the porthole view: stars, Earth, the moon, a banana comet, Planet Gloop ================= */
const PCX=1400, PCY=640, PRAD=372;                          // porthole centre + radius (world)
const rnd=(i,s)=>{const x=Math.sin(i*127.1+s*311.7)*43758.5453;return x-Math.floor(x);};
let stars1='',stars2='';
for(let i=0;i<80;i++){const x=980+rnd(i,1)*2500,y=240+rnd(i,2)*820,r=1.6+rnd(i,3)*3.6;stars1+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${i%5?'#fff':'#FFE98A'}"/>`;}
for(let i=0;i<34;i++){const x=980+rnd(i,7)*2500,y=240+rnd(i,8)*820,r=4+rnd(i,9)*5;stars2+=`<path transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${(r/6).toFixed(2)})" d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4Z" fill="${i%3?'#fff':'#9FE3FF'}"/>`;}
const earthSVG=`<g id="earth"><circle r="130" fill="#3F8CFF" ${sw(5)}/><path d="M-76,-44 Q-34,-98 22,-66 Q64,-32 32,12 Q-12,44 -64,22Z" fill="#5CD07A"/><path d="M44,52 Q84,32 104,74 Q72,104 44,52Z" fill="#5CD07A"/><path d="M-104,64 Q-62,52 -28,74" stroke="#fff" stroke-width="13" stroke-linecap="round" fill="none" opacity=".85"/><path d="M-22,-106 Q30,-116 74,-94" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".85"/></g>`;
const moonSVG=`<g id="moon"><circle r="190" fill="#DDE1EA" ${sw(6)}/><g fill="#B6BCCB"><circle cx="-60" cy="-50" r="38"/><circle cx="70" cy="30" r="52"/><circle cx="-20" cy="96" r="26"/><circle cx="96" cy="-84" r="22"/></g></g>`;
const cometSVG=`<g id="comet"><g stroke="#FFE98A" stroke-width="12" stroke-linecap="round" opacity=".85"><path d="M60,-30 L360,-130"/><path d="M70,0 L420,-20"/><path d="M60,30 L330,110"/></g><g transform="scale(2.6) rotate(-10)">${banana1(0)}</g></g>`;
const gloopSVG=`<g id="gloopP"><circle r="560" fill="url(#gGloop)" ${sw(8)}/>
 <g fill="#8BFF9A" opacity=".5"><circle cx="-210" cy="-170" r="120"/><circle cx="230" cy="40" r="150"/><circle cx="-60" cy="260" r="110"/><circle cx="120" cy="-290" r="80"/></g>
 <g fill="#FF8FD2" opacity=".55"><circle cx="-300" cy="90" r="90"/><circle cx="60" cy="130" r="70"/><circle cx="310" cy="-200" r="64"/></g>
 <ellipse cx="-190" cy="-250" rx="170" ry="84" transform="rotate(-30 -190 -250)" fill="#fff" opacity=".55"/><ellipse cx="260" cy="300" rx="90" ry="40" transform="rotate(-30 260 300)" fill="#fff" opacity=".3"/>
 <g fill="none" stroke="#fff" stroke-width="7" opacity=".7"><circle cx="-380" cy="-90" r="20"/><circle cx="360" cy="140" r="14"/><circle cx="-120" cy="400" r="16"/></g></g>`;
let rivets='';for(let x=520;x<2300;x+=120){rivets+=`<circle cx="${x}" cy="130" r="7"/><circle cx="${x}" cy="1560" r="7"/>`;}
let btns='';for(let i=0;i<14;i++){btns+=`<circle class="blk" cx="${940+i*66}" cy="${1260+(i%3)*34}" r="12" fill="${['#FF5F5F','#FFE14D','#5CE08A','#6FF6FF'][i%4]}" ${sw(3)}/>`;}
document.getElementById('setMount').innerHTML=`<g id="cockpit" opacity="0">
 <rect x="-1800" y="-1800" width="6200" height="4400" fill="url(#gCock)"/>
 <g stroke="#17203F" stroke-width="10" opacity=".55" fill="none"><path d="M560,-300 V1640 M1000,-300 V1640 M1800,-300 V1640 M2240,-300 V1640"/><path d="M-200,420 H900 M1900,420 H3000"/></g>
 <g fill="#9AA9C6" stroke="${OL}" stroke-width="3">${rivets}</g>
 <rect x="1020" y="1180" width="760" height="260" rx="30" fill="#4A5C8C" ${sw(8)}/>${btns}
 <rect x="1060" y="1340" width="300" height="70" rx="14" fill="#101733" ${sw(5)}/><path d="M1080,1385 L1130,1360 L1180,1380 L1240,1352 L1330,1376" fill="none" stroke="#6FF6FF" stroke-width="6" stroke-linecap="round"/>
 <rect x="1440" y="1340" width="300" height="70" rx="14" fill="#101733" ${sw(5)}/><circle cx="1590" cy="1375" r="26" fill="none" stroke="#5CE08A" stroke-width="6"/><path d="M1590,1375 L1612,1356" stroke="#5CE08A" stroke-width="6" stroke-linecap="round"/>
 <g><rect x="880" y="22" width="260" height="30" rx="15" fill="#FFF3B0" ${sw(5)}/><rect x="1660" y="22" width="260" height="30" rx="15" fill="#FFF3B0" ${sw(5)}/></g>
 <circle cx="${PCX}" cy="${PCY}" r="${PRAD+54}" fill="#9AA9C6" ${sw(10)}/><circle cx="${PCX}" cy="${PCY}" r="${PRAD+16}" fill="#5E6E92" ${sw(6)}/>
 <g clip-path="url(#cpPort)"><g id="portG">
  <rect x="900" y="200" width="1000" height="900" fill="#080A24"/>
  <g id="stars1">${stars1}</g><g id="stars2">${stars2}</g>
  <g transform="translate(1400,720)"><g id="earthW">${earthSVG}</g></g>
  <g transform="translate(2200,600)"><g id="moonW">${moonSVG}</g></g>
  <g transform="translate(2350,880)"><g id="cometW">${cometSVG}</g></g>
  <g transform="translate(1400,660)"><g id="gloopW">${gloopSVG}</g></g>
  <rect id="portFlash" x="900" y="200" width="1000" height="900" fill="#fff" opacity="0"/>
 </g></g>
 <path d="M1090,420 Q1170,300 1290,276" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".5"/>
 <circle cx="${PCX}" cy="${PCY}" r="${PRAD}" fill="none" ${sw(8)}/>
 ${['3','2','1','GO!'].map((tx,i)=>`<text id="cd${i}" x="1400" y="250" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="${i==3?230:300}" fill="${i==3?'#FFE14D':'#6FF6FF'}" stroke="${OL}" stroke-width="18" paint-order="stroke" stroke-linejoin="round" opacity="0">${tx}</text>`).join('')}
 <rect x="-1800" y="1640" width="6200" height="2000" fill="url(#pMetal)"/><rect x="-1800" y="1630" width="6200" height="24" fill="#7C8CB0" ${sw(6)}/>
</g>`;

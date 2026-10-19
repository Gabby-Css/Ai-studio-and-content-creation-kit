/* ================= episode 17 additions: the hologram call from Planet Zorp (the Commander = a cyan Blip), the wobbly 18-pancake tower with Rocky inside, Planet Zorp in the porthole ================= */
const HOC=['#7FEFFF','#2EB9DB','#D9FBFF','#B6F4FF'];
let hLines='';for(let i=0;i<34;i++) hLines+=`<rect x="-260" y="${-560+i*17}" width="520" height="5" fill="#DFFFFF"/>`;
let hStat='';for(let i=0;i<16;i++){const y=-540+rnd(i,51)*520,w=70+rnd(i,52)*300,x=-w/2+(rnd(i,53)-.5)*160;hStat+=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(6+rnd(i,54)*16).toFixed(0)}" fill="${i%3?'#BFF6FF':'#fff'}"/>`;}
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`
<defs><clipPath id="cpCone"><path d="M-84,0 L-250,-560 L250,-560 L84,0Z"/></clipPath>
 <linearGradient id="gHolo" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7FEFFF" stop-opacity=".62"/><stop offset="1" stop-color="#7FEFFF" stop-opacity=".04"/></linearGradient></defs>
<g id="holoW"><g id="holo" opacity="0">
 <path d="M-84,0 L-250,-560 L250,-560 L84,0Z" fill="url(#gHolo)"/>
 <g id="holoLines" clip-path="url(#cpCone)" opacity=".22">${hLines}</g>
 <g id="holoStat" clip-path="url(#cpCone)" opacity="0">${hStat}</g>
 <g id="holoMan" opacity="0">${tintBlip('hl',HOC)}</g>
 <ellipse cx="0" cy="4" rx="130" ry="22" fill="#7FEFFF" ${sw(5)}/><ellipse cx="0" cy="2" rx="86" ry="12" fill="#D9FBFF"/>
</g></g>`);

/* the tower: 18 pancakes (fifty, says Truffle), syrup + butter, Rocky hiding inside (head peeks out of the top), his feet under the bottom pancake */
const SKC=['#E9A64F','#EDAE58','#E4A04A'], NSL=18, SKP=26, STOP=-(NSL-1)*SKP-48;       // STOP = y of the top rim
const slabSVG=(i)=>`<g id="stl${i}" class="stl"><g transform="translate(0,${-i*SKP})"><path d="M-125,-6 L-125,-28 Q-125,-48 0,-48 Q125,-48 125,-28 L125,-6 Q125,14 0,14 Q-125,14 -125,-6Z" fill="${SKC[i%3]}" ${sw(6)}/><ellipse cx="0" cy="-33" rx="112" ry="17" fill="#F6C777"/></g></g>`;
let slabs='';for(let i=0;i<NSL;i++) slabs+=slabSVG(i);
const ft=(id,x)=>`<g transform="translate(${x},8)"><g id="${id}"><ellipse cx="0" cy="22" rx="22" ry="19" fill="${GRY}" ${sw(6)}/><ellipse cx="2" cy="38" rx="36" ry="16" fill="${DGR}" ${sw(6)}/></g></g>`;
document.getElementById('feastMount').insertAdjacentHTML('beforeend',`
<g id="stkW"><g id="stk" opacity="0"><g id="stkIn">
 <ellipse cx="0" cy="22" rx="170" ry="22" fill="rgba(60,30,10,.22)"/>
 <g id="stkFeet" opacity="0">${ft('stkFootL',-62)}${ft('stkFootR',62)}</g>
 <g id="stkRkW"><g id="stkRk"><g transform="translate(0,${STOP+138}) scale(.55)">${rockySVG('rkp',false)}</g></g></g>
 ${slabs}
 <g id="stkTop">
  <path d="M-118,${STOP+10} Q-132,${STOP+38} -106,${STOP+46} Q-100,${STOP+96} -80,${STOP+48} Q-30,${STOP+52} -10,${STOP+42} Q4,${STOP+124} 26,${STOP+44} Q70,${STOP+50} 84,${STOP+40} Q92,${STOP+84} 106,${STOP+38} Q134,${STOP+30} 122,${STOP+8} Q0,${STOP-34} -118,${STOP+10}Z" fill="#B8571D" ${sw(5)}/>
  <path d="M-70,${STOP-4} Q-30,${STOP-20} 20,${STOP-8}" fill="none" stroke="#E58A4B" stroke-width="9" stroke-linecap="round" opacity=".8"/>
  <rect x="-24" y="${STOP-40}" width="52" height="30" rx="6" fill="#FFE79A" ${sw(5)} transform="rotate(-6 0 ${STOP-25})"/>
 </g>
</g></g></g>`);

/* Planet Zorp: a purple ringed planet that grows in the porthole */
const zorpSVG=`<g transform="rotate(-16)"><ellipse rx="780" ry="130" fill="none" stroke="#FFC95A" stroke-width="44"/><ellipse rx="780" ry="130" fill="none" stroke="${OL}" stroke-width="6"/>
 <circle r="470" fill="#B07CFF" ${sw(8)}/><g fill="#8E5CE0" opacity=".75"><circle cx="-150" cy="-120" r="110"/><circle cx="170" cy="90" r="140"/><circle cx="-60" cy="230" r="90"/></g>
 <ellipse cx="-160" cy="-210" rx="150" ry="70" transform="rotate(-30 -160 -210)" fill="#fff" opacity=".45"/>
 <path d="M-780,0 A780,130 0 0 0 780,0" fill="none" stroke="#FFC95A" stroke-width="44"/></g>`;
document.getElementById('portFlash').insertAdjacentHTML('beforebegin',`<g transform="translate(1400,700)"><g id="zorpW" opacity="0">${zorpSVG}</g></g>`);

document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="fiftyTag" opacity="0"><g id="fiftyIn">
 <path d="M0,-110 L26,-62 L80,-84 L66,-28 L118,-6 L70,24 L92,78 L36,60 L10,112 L-18,64 L-70,92 L-62,34 L-116,10 L-64,-18 L-84,-76 L-30,-60Z" fill="#FFE14D" ${sw(8)}/>
 <text x="0" y="34" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="112" fill="#E0529F" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">50</text>
</g></g>`);

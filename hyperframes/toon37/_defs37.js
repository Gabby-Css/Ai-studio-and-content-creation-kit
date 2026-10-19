/* ================= episode 37 additions (Season 8, "Rough Seas"): the open sea (sky, sun, drifting clouds, 16 wave rows that scroll, foam ring), the big pancake boat with two oars,
   a far-away island that grows at the end, gusts of wind, water spray, the snack crate (Rocky hides in it) and an "ACHOO!" pop ================= */
const SEA_ROWS=[[1250,.4],[1300,.45],[1360,.5],[1430,.55],[1510,.6],[1600,.68],[1700,.76],[1810,.84],[1930,.92],[2060,1],[2200,1.06],[2350,1.12],[2520,1.2],[2710,1.28],[2920,1.36],[3150,1.45]];
const PALM=(x,y,s,r=0)=>`<g transform="translate(${x},${y}) scale(${s}) rotate(${r})"><path d="M0,0 Q18,-90 6,-190" fill="none" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M0,0 Q18,-90 6,-190" fill="none" stroke="#9A6A3A" stroke-width="18" stroke-linecap="round"/>
 <g transform="translate(6,-190)">${[-70,-35,0,35,70].map(a=>`<path d="M0,0 Q${Math.sin(a/57)*120+Math.sign(a||1)*30},-70 ${Math.sin(a/57)*190},${40-Math.abs(a)*.2}" fill="none" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M0,0 Q${Math.sin(a/57)*120+Math.sign(a||1)*30},-70 ${Math.sin(a/57)*190},${40-Math.abs(a)*.2}" fill="none" stroke="#2EBE85" stroke-width="18" stroke-linecap="round"/>`).join('')}<circle cx="-14" cy="14" r="14" fill="#7A3E1D" ${sw(4)}/><circle cx="16" cy="18" r="14" fill="#7A3E1D" ${sw(4)}/></g></g>`;
const ISLE_HTML=`<g id="isleW" opacity="0"><g id="isle">
 <ellipse cx="0" cy="40" rx="440" ry="74" fill="#F2D58A" ${sw(7)}/>
 <path d="M-330,34 Q-180,-190 40,-70 Q170,-250 330,34Z" fill="#59C27A" ${sw(7)}/><path d="M-120,-40 Q-60,-120 20,-96" fill="none" stroke="#7FD38A" stroke-width="16" stroke-linecap="round"/>
 ${PALM(-300,40,1.0,-4)}${PALM(250,44,.9,5)}${PALM(330,36,.62,12)}
 <g transform="translate(-20,-168)"><rect x="-5" y="-110" width="10" height="120" rx="4" fill="#9A6A3A" ${sw(4)}/><path d="M5,-108 L110,-80 L5,-52Z" fill="#FF5F5F" ${sw(5)}/></g>
</g></g>`;
const SEA_HTML=`<g id="seaSet" opacity="0">
 <defs><linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A6EBF7"/><stop offset=".1" stop-color="#52C6EC"/><stop offset="1" stop-color="#1B6FB6"/></linearGradient></defs>
 <rect x="-3000" y="-3400" width="14000" height="4580" fill="url(#gSkyDay)"/>
 <g transform="translate(2350,-260)"><circle r="190" fill="#FFF3B0" opacity=".45"/><circle r="120" fill="#FFE14D" ${sw(6)}/></g>
 <g id="seaClouds">${Array.from({length:6},(_,i)=>{const x=i*2400;return [[300,160,1.0],[1400,-140,1.3],[2000,520,.9]].map(([cx,cy,s])=>`<g transform="translate(${x+cx-2400},${cy}) scale(${s})"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g>`).join('');}).join('')}</g>
 <rect x="-3000" y="1180" width="14000" height="3200" fill="url(#gSea)"/>
 <path d="M-3000,1180 H11000" stroke="${OL}" stroke-width="8"/>
 ${ISLE_HTML}
 ${SEA_ROWS.map(([y,s],i)=>`<g id="swr${i}">${Array.from({length:11},(_,k)=>`<path transform="translate(${k*400-400+(i%2)*200},${y})" d="M0,0 Q100,${-34*s} 200,0 T400,0" fill="none" stroke="${i%3?'#E9FAFF':'#BDEBFA'}" stroke-width="${Math.round(7+s*4)}" stroke-linecap="round" opacity=".8"/>`).join('')}</g>`).join('')}
 <g id="foam"><ellipse cx="1300" cy="2215" rx="1010" ry="200" fill="#fff" opacity=".6"/><ellipse cx="1300" cy="2230" rx="930" ry="160" fill="#BDEBFA" opacity=".85"/></g>
 ${BOAT_HTML('bg',1,false)}
 <g transform="translate(520,1905)"><g id="oarL"><path d="M0,0 L-340,215" stroke="${OL}" stroke-width="28" stroke-linecap="round"/><path d="M0,0 L-340,215" stroke="#B4733A" stroke-width="15" stroke-linecap="round"/><ellipse cx="-372" cy="236" rx="70" ry="26" transform="rotate(32 -372 236)" fill="#D79A55" ${sw(7)}/></g></g>
 <g transform="translate(2080,1905)"><g id="oarR"><path d="M0,0 L340,215" stroke="${OL}" stroke-width="28" stroke-linecap="round"/><path d="M0,0 L340,215" stroke="#B4733A" stroke-width="15" stroke-linecap="round"/><ellipse cx="372" cy="236" rx="70" ry="26" transform="rotate(-32 372 236)" fill="#D79A55" ${sw(7)}/></g></g>
</g>`;
const WND_HTML=`<g id="wndW" opacity="0">${Array.from({length:8},(_,i)=>`<g transform="translate(-300,${900+i*115})"><path class="gust" d="M0,0 q70,-38 140,0 t140,0 t140,0 t140,0" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" opacity="0"/></g>`).join('')}</g>`;
const WSP_HTML=Array.from({length:3},(_,g)=>`<g id="wspW${g}" opacity="0">${Array.from({length:7},(_,k)=>`<circle id="wsp${g}_${k}" cx="0" cy="0" r="${13+(k%3)*5}" fill="#EAFBFF" ${sw(4)} opacity="0"/>`).join('')}</g>`).join('');
const SNK_HTML=`<g id="snkW" opacity="0"><g id="snk">
 <ellipse cx="0" cy="8" rx="200" ry="26" fill="rgba(40,70,100,.25)"/>
 <rect x="-150" y="-212" width="300" height="214" rx="14" fill="#C98A4B" ${sw(8)}/>
 <path d="M-150,-142 H150 M-150,-72 H150" stroke="${OL}" stroke-width="7"/><path d="M-108,-206 V-6 M108,-206 V-6" stroke="#A56D35" stroke-width="12"/>
 <g transform="translate(0,-108)"><ellipse cx="0" cy="18" rx="62" ry="17" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="2" rx="58" ry="16" fill="#F6C777" ${sw(5)}/><ellipse cx="0" cy="-14" rx="54" ry="15" fill="#D9902F" ${sw(5)}/><ellipse cx="0" cy="-28" rx="50" ry="14" fill="#F6C777" ${sw(5)}/></g>
 <g id="snkLid"><rect x="-166" y="-246" width="332" height="40" rx="12" fill="#D79A55" ${sw(8)}/><path d="M-130,-234 H130" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".5"/></g>
</g></g>`;
const ACH_HTML=`<g id="achW" opacity="0"><g id="ach"><text x="0" y="0" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="150" fill="#FFE14D" stroke="${OL}" stroke-width="20" paint-order="stroke" stroke-linejoin="round">ACHOO!</text></g></g>`;

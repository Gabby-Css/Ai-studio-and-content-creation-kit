/* ================= episode 31 additions (Season 7, "The Great Pancake Race"): go-karts built from frying pans on pancake wheels, a scrolling race-track set,
   a start gantry with lights, speed lines. Race scenes keep the camera and the racers still and scroll the scenery behind them (modifiers wrap each layer seamlessly). ================= */
const KART_HTML=(id,c1,c2,bias=0)=>`<g id="${id}W" opacity="0"><g transform="translate(0,${-bias})"><g id="${id}"><g id="${id}S">
 <ellipse cx="0" cy="10" rx="250" ry="26" fill="rgba(60,30,10,.25)"/>
 <path d="M-330,-124 Q-336,-110 -322,-100 L-196,-100 L-196,-132Z" fill="#4A4F5C" ${sw(6)}/><rect x="-352" y="-134" width="84" height="40" rx="18" fill="${c2}" ${sw(6)}/>
 <rect x="-214" y="-104" width="26" height="42" rx="8" fill="#8A8FA3" ${sw(5)}/><g class="kfl" opacity="0"><path d="M-214,-84 Q-290,-120 -380,-84 Q-290,-50 -214,-84Z" fill="#FF8A2B" ${sw(5)}/><path d="M-214,-84 Q-262,-100 -318,-84 Q-262,-68 -214,-84Z" fill="#FFE14D"/></g>
 <path d="M-196,-76 L-178,-152 Q-150,-196 -80,-196 L100,-196 Q172,-190 202,-132 L218,-84 Q222,-48 182,-44 L-150,-44 Q-196,-44 -196,-76Z" fill="${c1}" ${sw(7)}/>
 <path d="M-192,-92 L212,-110 L218,-84 Q222,-48 182,-44 L-150,-44 Q-196,-44 -196,-76Z" fill="${c2}" ${sw(0)}/>
 <path d="M-196,-76 L-178,-152 Q-150,-196 -80,-196 L100,-196 Q172,-190 202,-132 L218,-84 Q222,-48 182,-44 L-150,-44 Q-196,-44 -196,-76Z" fill="none" ${sw(7)}/>
 <path d="M-130,-168 Q-100,-184 -40,-184" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/>
 <circle cx="206" cy="-122" r="15" fill="#FFF3B0" ${sw(5)}/>
 <path d="M70,-196 L96,-250" stroke="${OL}" stroke-width="14" stroke-linecap="round"/><path d="M70,-196 L96,-250" stroke="#8A8FA3" stroke-width="7" stroke-linecap="round"/>
 <ellipse cx="102" cy="-258" rx="30" ry="12" fill="${c2}" ${sw(6)}/>
 ${[-124,132].map(cx=>`<g transform="translate(${cx},-60)"><g class="wh"><circle r="62" fill="#E9A64F" ${sw(7)}/><circle r="46" fill="#F6C777"/><rect x="8" y="-30" width="34" height="22" rx="5" fill="#FFE79A" ${sw(4)}/><path d="M-46,8 Q-30,40 8,46" fill="none" stroke="#B8571D" stroke-width="10" stroke-linecap="round"/></g></g>`).join('')}
</g></g></g></g>`;
const RS_HTML=`<g id="raceSet" opacity="0">
 <rect x="-3000" y="-3400" width="14000" height="4900" fill="url(#gSkyDay)"/>
 <g transform="translate(1900,-260)"><circle r="190" fill="#FFF3B0" opacity=".45"/><circle r="120" fill="#FFE14D" ${sw(6)}/></g>
 <g id="rsCloud">${Array.from({length:6},(_,i)=>{const x=i*2400;return [[300,160,1.0],[1400,-140,1.3],[2000,420,.9]].map(([cx,cy,s])=>`<g transform="translate(${x+cx},${cy}) scale(${s})"><ellipse cx="0" cy="0" rx="190" ry="62" fill="#fff" ${sw(6)}/><circle cx="-80" cy="-40" r="64" fill="#fff" ${sw(6)}/><circle cx="30" cy="-62" r="82" fill="#fff" ${sw(6)}/><circle cx="110" cy="-28" r="58" fill="#fff" ${sw(6)}/><ellipse cx="0" cy="8" rx="196" ry="52" fill="#fff"/></g>`).join('');}).join('')}</g>
 <g id="rsFar">${Array.from({length:8},(_,i)=>`<path transform="translate(${i*1800-1800},0)" d="M0,1500 L0,1380 Q300,1020 640,1190 Q1000,880 1400,1140 Q1660,1010 1800,1380 L1800,1500Z" fill="#6FD38A" ${sw(7)}/>`).join('')}</g>
 <g id="rsMid">${Array.from({length:8},(_,i)=>`<g transform="translate(${i*1200-1200},0)"><path d="M0,1520 L0,1440 Q300,1190 620,1310 Q900,1170 1200,1440 L1200,1520Z" fill="#52C27A" ${sw(7)}/>
   <g transform="translate(300,1450)"><rect x="-22" y="-210" width="44" height="210" rx="10" fill="#9A6A3A" ${sw(7)}/><circle cx="0" cy="-290" r="130" fill="#3FAF6A" ${sw(8)}/><circle cx="-70" cy="-240" r="80" fill="#4BC079" ${sw(6)}/><circle cx="76" cy="-250" r="84" fill="#4BC079" ${sw(6)}/></g>
   <g transform="translate(930,1450) scale(.7)"><rect x="-22" y="-210" width="44" height="210" rx="10" fill="#9A6A3A" ${sw(7)}/><circle cx="0" cy="-290" r="130" fill="#3FAF6A" ${sw(8)}/><circle cx="-70" cy="-240" r="80" fill="#4BC079" ${sw(6)}/></g></g>`).join('')}</g>
 <rect x="-3000" y="1440" width="14000" height="3200" fill="#8BE08B" stroke="${OL}" stroke-width="8"/>
 <rect x="-3000" y="1740" width="14000" height="840" fill="#E7C78F"/><path d="M-3000,1740 H11000 M-3000,2580 H11000" stroke="#B98B4E" stroke-width="14"/>
 <g id="rsDash">${Array.from({length:9},(_,i)=>[1990,2130,2270,2410].map(y=>`<rect x="${i*300-300}" y="${y-6}" width="150" height="12" rx="6" fill="#fff" opacity=".85"/>`).join('')).join('')}</g>
 <g id="rsFence">${Array.from({length:9},(_,i)=>`<g transform="translate(${i*600-600},1740)"><rect x="-10" y="-150" width="20" height="150" rx="6" fill="#B4733A" ${sw(5)}/><path d="M-20,-90 H620 M-20,-130 H620" stroke="#D79A55" stroke-width="12" stroke-linecap="round"/><path d="M0,-150 Q150,-100 300,-150" fill="none" stroke="#5b4a3c" stroke-width="5"/>${[0,1,2].map(k=>`<path transform="translate(${50+k*100},-140)" d="M0,0 L60,0 L30,50Z" fill="${SPC[(i*3+k)%6]}" ${sw(4)}/>`).join('')}</g>`).join('')}</g>
 <g id="rsLand"></g>
</g>`;
const START_HTML=`<g id="startW" opacity="0"><g id="startG">
 <rect x="-34" y="1740" width="68" height="840" fill="#fff" ${sw(0)}/>${Array.from({length:28},(_,r)=>[0,1].map(c=>((r+c)%2?`<rect x="${-34+c*34}" y="${1740+r*30}" width="34" height="30" fill="${OL}"/>`:'')).join('')).join('')}
 <path d="M-34,1740 V2580 M34,1740 V2580" stroke="${OL}" stroke-width="6"/>
 <rect x="-14" y="1030" width="28" height="710" rx="8" fill="#B4733A" ${sw(7)}/>
 <rect x="-235" y="800" width="470" height="236" rx="30" fill="#FF5F5F" ${sw(9)}/><text x="0" y="888" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="86" fill="#fff" stroke="${OL}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">START</text>
 <rect x="-190" y="912" width="380" height="96" rx="40" fill="#2b2f45" ${sw(7)}/><circle id="ltA" cx="-110" cy="960" r="30" fill="#5a2a2a"/><circle id="ltB" cx="0" cy="960" r="30" fill="#5a2a2a"/><circle id="ltC" cx="110" cy="960" r="30" fill="#2a4a2f"/>
</g></g>`;
// the Golden Pan: the prize (also cooks the giant pancakes in #35)
const GP_HTML=`<g id="gpanW" opacity="0"><g id="gpan">
 <ellipse cx="0" cy="150" rx="140" ry="20" fill="rgba(60,30,10,.22)"/>
 <circle r="210" fill="url(#gEggGlow)" opacity=".8"/>
 <path d="M96,-6 L270,-38 Q292,-42 292,-18 Q292,2 270,6 L100,34Z" fill="#E0A52E" ${sw(7)}/><path d="M120,-2 L262,-28" stroke="#FFF3B0" stroke-width="8" stroke-linecap="round" opacity=".8"/>
 <ellipse cx="0" cy="12" rx="152" ry="62" fill="#C98A1E" ${sw(8)}/><ellipse cx="0" cy="-2" rx="126" ry="48" fill="#FFD84A" ${sw(5)}/>
 <path d="M-86,-14 Q-40,-40 20,-34" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".75"/>
 <circle cx="-70" cy="8" r="6" fill="#fff" opacity=".7"/><circle cx="-44" cy="20" r="4" fill="#fff" opacity=".6"/>
</g></g>`;
const SPD_HTML=`<g id="spdW" opacity="0">${[1830,1930,2020,2120,2230,2330,2430,2540].map((y,i)=>`<rect class="spl" x="${300+(i*337)%1200}" y="${y}" width="${230+(i%3)*90}" height="9" rx="4" fill="#fff" opacity=".6"/>`).join('')}</g>`;

/* ================= episode 32 additions: the syrup river (a ground object across the road), a slippery puddle, a falling syrup glob ================= */
const RIVW=500;
const SRV_HTML=`<g id="syrupR" opacity="0"><g id="syrupI">
 <path d="M0,1440 ${Array.from({length:22},(_,i)=>`Q${(i%2?-26:30)},${1440+i*100+50} 0,${1440+(i+1)*100}`).join(' ')} L${RIVW},${1440+22*100} ${Array.from({length:22},(_,i)=>`Q${RIVW+(i%2?30:-28)},${1440+(22-i)*100-50} ${RIVW},${1440+(21-i)*100}`).join(' ')}Z" fill="#C26A14" ${sw(8)}/>
 <path d="M70,1440 ${Array.from({length:21},(_,i)=>`Q${70+(i%2?-14:16)},${1440+i*104+52} 70,${1440+(i+1)*104}`).join(' ')} L${RIVW-70},${1440+21*104} ${Array.from({length:21},(_,i)=>`Q${RIVW-70+(i%2?16:-14)},${1440+(21-i)*104-52} ${RIVW-70},${1440+(20-i)*104}`).join(' ')}Z" fill="#E08A1F"/>
 <g class="sfl">${Array.from({length:14},(_,i)=>`<path d="M${90+(i*97)%320},${1480+i*150} q40,-40 90,0" fill="none" stroke="#FFD27A" stroke-width="14" stroke-linecap="round" opacity=".85"/><ellipse cx="${120+(i*131)%280}" cy="${1560+i*150}" rx="34" ry="10" fill="#fff" opacity=".4"/>`).join('')}</g>
 <g class="sfl" transform="translate(0,75)">${Array.from({length:14},(_,i)=>`<path d="M${60+(i*83)%360},${1480+i*150} q30,-30 70,0" fill="none" stroke="#F3B867" stroke-width="9" stroke-linecap="round" opacity=".7"/>`).join('')}</g>
 ${Array.from({length:9},(_,i)=>`<circle cx="${70+(i*173)%360}" cy="${1700+i*210}" r="${12+(i%3)*6}" fill="#FFC15A" ${sw(4)}/><circle cx="${64+(i*173)%360}" cy="${1694+i*210}" r="4" fill="#fff" opacity=".9"/>`).join('')}
</g></g>`;
const SPL_HTML=`<g id="spillW" opacity="0"><g id="spill"><ellipse cx="0" cy="0" rx="330" ry="150" fill="#C26A14" ${sw(8)}/><ellipse cx="-30" cy="-12" rx="250" ry="100" fill="#E08A1F"/><ellipse cx="-90" cy="-40" rx="110" ry="28" fill="#FFE2A0" opacity=".9"/><circle cx="150" cy="30" r="26" fill="#FFC15A" ${sw(4)}/></g></g>`;
const SGL_HTML=`<g id="sglobW" opacity="0"><g id="sglob">
 <path d="M-120,0 Q-130,-110 0,-120 Q130,-110 120,0 Q130,50 70,56 Q50,110 20,56 Q-10,130 -40,56 Q-130,60 -120,0Z" fill="#C26A14" ${sw(7)}/>
 <path d="M-80,-30 Q-70,-84 -10,-90" fill="none" stroke="#F3B867" stroke-width="14" stroke-linecap="round" opacity=".85"/>
 <g id="sgdrips" fill="#C26A14"><circle cx="-40" cy="150" r="20"/><circle cx="20" cy="190" r="24"/><circle cx="76" cy="140" r="18"/></g>
</g></g>`;

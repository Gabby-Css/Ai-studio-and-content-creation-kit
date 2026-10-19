/* ================= episode 23 additions: Zap's rocket flames, wind streaks (the sky set itself comes from #22) ================= */
// Zap's rocket flames (two teardrops that flicker under his feet)
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="zflW" opacity="0"><g id="zfl2">${[-34,34].map(x=>`<g transform="translate(${x},0)"><g class="zf"><path d="M0,0 Q-36,50 0,150 Q36,50 0,0Z" fill="#FF8A2B" ${sw(5)}/><path d="M0,10 Q-16,50 0,100 Q16,50 0,10Z" fill="#FFE14D"/></g></g>`).join('')}</g></g>`);
// speed streaks for the flying shots
document.getElementById('jgMount').insertAdjacentHTML('beforeend',`<g id="streaks" opacity="0">${Array.from({length:10},(_,i)=>`<rect class="stk" x="${(i*173)%1000+60}" y="${(i*257)%1800}" width="7" height="${120+(i%3)*60}" rx="3" fill="#fff" opacity=".7"/>`).join('')}</g>`);

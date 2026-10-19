/* ================= episode 20 additions: Earth waiting at the end of the rainbow, more stars to the left of Zorp ================= */
let zS2='';for(let i=0;i<60;i++){const x=-2400+rnd(i,81)*2300,y=-800+rnd(i,82)*1600,r=1.5+rnd(i,83)*3;zS2+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity=".7"/>`;}
document.querySelector('.zSky').insertAdjacentHTML('afterend',zS2);
document.querySelector('.zMtA').insertAdjacentHTML('beforebegin',`<g transform="translate(-500,432) scale(1.6)">${earthSVG.replace('id="earth"','id="earthZ"')}</g>`);

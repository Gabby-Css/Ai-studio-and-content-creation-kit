/* ================= episode 18 additions: PLANET ZORP (a gray world that blooms into colour), the four Zorpians (gray Blips that turn colourful), the giant's silhouette ================= */
const ZG=['#9AA3AE','#6E7885','#CDD3DA','#B5BCC6'];                       // gray body / dark / light / accent
const ZCOL=[['#7FEFFF','#2EB9DB','#D9FBFF','#B6F4FF'],['#C9A8FF','#8F6CE0','#EBDDFF','#7FE0FF'],['#FFD36B','#E0A52E','#FFF0B8','#FF8F4A'],['#FF9A8B','#E0605A','#FFD3CC','#7FFFB0']];
// a Blip whose colours are tagged with classes (z<i>a body, b dark, c light, d spots, bs antenna stalk) so GSAP can fade gray -> colour
const zorpian=(p,i)=>{let s=blipSVG(p);
 [BG_,BD_,BL_,BP_].forEach((col,j)=>{s=s.split(`fill="${col}"`).join(`class="z${i}${'abcd'[j]}" fill="${ZG[j]}"`);});
 return s.split(`stroke="${BD_}"`).join(`class="z${i}bs" stroke="${ZG[1]}"`);};
document.getElementById('g5Mount').insertAdjacentHTML('beforeend',[1,2,3,4].map(i=>zorpian('z'+i,i)).join(''));

const zStars=Array.from({length:60},(_,i)=>{const x=-200+rnd(i,61)*3200,y=-700+rnd(i,62)*1500,r=1.5+rnd(i,63)*3;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity=".7"/>`;}).join('');
let zCr='';for(let i=0;i<10;i++){const x=150+rnd(i,71)*2800,y=1460+rnd(i,72)*400,rx=60+rnd(i,73)*90;zCr+=`<ellipse class="zCr" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${(rx*.26).toFixed(0)}" fill="#8E97A4" stroke="${OL}" stroke-width="5"/>`;}
const zfl=(x,s,c1,c2)=>mush(x,s,c1,c2).replace('class="mush"','class="zfl"');
document.getElementById('setMount').insertAdjacentHTML('beforeend',`<g id="zorpSet" opacity="0">
 <rect class="zSky" x="-1800" y="-1800" width="6200" height="3300" fill="#7C8593"/>${zStars}
 <g transform="translate(1900,170)"><g transform="rotate(-14)"><ellipse class="zRing" rx="440" ry="76" fill="none" stroke="#B7BEC9" stroke-width="30"/><circle class="zPl" r="180" fill="#B7BEC9" ${sw(8)}/><path class="zRing" d="M-440,0 A440,76 0 0 0 440,0" fill="none" stroke="#B7BEC9" stroke-width="30"/></g></g>
 <g transform="translate(560,300)"><circle class="zMoon" r="100" fill="#C9CFD8" ${sw(6)}/><circle cx="-30" cy="-20" r="24" fill="#fff" opacity=".35"/><circle cx="34" cy="30" r="30" fill="#fff" opacity=".28"/></g>
 <g id="zorpGiant" opacity="0"><g id="zorpGiantIn">
  <path d="M-430,0 Q-470,-420 -260,-700 Q-130,-890 0,-890 Q130,-890 260,-700 Q470,-420 430,0Z" fill="#2B2147"/>
  <path d="M-250,-720 L-340,-940 L-170,-810Z M250,-720 L340,-940 L170,-810Z" fill="#2B2147"/>
  <g id="zgEyes"><ellipse cx="-120" cy="-620" rx="64" ry="80" fill="#FFF3B0"/><ellipse cx="120" cy="-620" rx="64" ry="80" fill="#FFF3B0"/><circle cx="-108" cy="-608" r="28" fill="#2B2147"/><circle cx="132" cy="-608" r="28" fill="#2B2147"/></g>
 </g></g>
 <path class="zMtA" d="M-300,1400 Q100,900 500,1100 Q900,800 1300,1050 Q1700,780 2100,1050 Q2500,880 2900,1400Z" fill="#98A1AE" ${sw(7)}/>
 <path class="zMtB" d="M-300,1450 Q200,1100 700,1250 Q1200,1000 1700,1250 Q2200,1050 2900,1450Z" fill="#848D9A" ${sw(7)}/>
 <rect class="zGnd" x="-1800" y="1380" width="6200" height="2400" fill="#A3ABB7" stroke="${OL}" stroke-width="8"/>
 ${zCr}
 <g id="zFlowers" opacity="0">${zfl(700,.8,'#FF8FD2','#FFE0F4')}${zfl(1180,.5,'#B07CFF','#EBDDFF')}${zfl(1600,.62,'#6FF6FF','#D8FFFF')}${zfl(2480,.7,'#FFB46F','#FFE6C8')}${zfl(2800,.55,'#8BFF9A','#E8FFE0')}</g>
</g>`);

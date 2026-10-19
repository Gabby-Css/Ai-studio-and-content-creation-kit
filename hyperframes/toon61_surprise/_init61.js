/* ---- starting state of #61 ("The Surprise Party", Season-13 opener): Bo's birthday morning. The circus tent is DARK and EMPTY: only Bo (with Flapjack on his head) stands in the ring.
   Everybody else is hidden until the lights snap on (M61 = their marks for the turn). One room, no montage.
   Season-13 shared bits (bodies #62+ must not redeclare them): M61, HIDE61, the cake candles (cd1/cd2 + flames cdF1/cdF2, class cdFl) inside #twr ---- */
const M61={bo:[1250,ROWD+BOY,.88],
           gm:[560,ROWB,1.05],pt:[880,ROWB,.7],mn:[1500,ROWB,1.0],bp:[1950,ROWB,.66],nm:[2350,ROWB,.54],
           tf:[780,ROWF,.74],mc:[1720,ROWF,.74],cm:[2130,ROWF,.76],
           zp:[640,ROWD,.7],pb:[860,ROWD+14,PBS],wd:[1830,ROWD-50,.9],pd:[2010,ROWD-50,1.05],pm:[2190,ROWD-50,.95],pk:[2330,ROWD-30,.62],
           gh:[1500,700,.7]};
const HIDE61='#tf,#nm,#mc,#cm,#gm,#bp,#zp,#pt,#gh,#wd,#pd,#pm,#pk,#nb,#pb,#mn,#rk,#pan,#kg,#cz1,#cz2,#cz3,#gma,#j1,#j2,#j3,#j4';
startCircus({bo:M61.bo});
gsap.set(HIDE61,{opacity:0});
gsap.set('#cm',{rotation:0});gsap.set('#cmArmL,#cmArmR',{rotation:0});
// the dark tent: the purple veil on top of a second, black one; no spotlights, no crowd
gsap.set('#crcSpotW',{opacity:0});gsap.set('#crcCrowd',{opacity:0});
gsap.set('#crcDarkW',{opacity:1});gsap.set('#crcBlkW',{opacity:.42});
gsap.set('#jpcW0,#jpcW1,#jpcW2,#jpcW3,#jpcW4,#jpcW5,#jpcW6,#jpcW7,#jpcW8,#jpcW9,#jpcW10,#jpcW11',{opacity:0});
// the banner (re-worded) waits above the ring
document.getElementById('bnrT1').textContent='HAPPY';document.getElementById('bnrT2').textContent='BIRTHDAY!';
gsap.set('#bnrW',{opacity:0,x:1400,y:110,scale:1.5});gsap.set('#bnr',{rotation:0});
// the cake = Munch's pancake tower (hidden, waiting above Munch) + two birthday candles with flames (they live inside #twr so they scale with it)
const CANDLES_HTML=[-62,62].map((x,i)=>`<g id="cd${i+1}"><rect x="${x-9}" y="-436" width="18" height="96" rx="5" fill="#fff" ${sw(5)}/><path d="M${x-9},-418 L${x+9},-404 M${x-9},-392 L${x+9},-378 M${x-9},-366 L${x+9},-352" stroke="#4FA3FF" stroke-width="7"/>
 <g id="cdF${i+1}" transform="translate(${x},-436)"><g class="cdFl"><ellipse cx="0" cy="-34" rx="30" ry="40" fill="rgba(255,210,90,.30)"/><path d="M0,-66 C20,-42 20,-18 0,-8 C-20,-18 -20,-42 0,-66Z" fill="#FFB300" ${sw(4)}/><path d="M0,-44 C9,-32 9,-20 0,-14 C-9,-20 -9,-32 0,-44Z" fill="#FFF3A0"/></g></g></g>`).join('');
document.getElementById('twr').insertAdjacentHTML('beforeend',CANDLES_HTML);
gsap.set('.cdFl',{transformOrigin:'50% 100%'});
gsap.set('#twrW',{opacity:0,x:M61.mn[0],y:960,scale:1.2});gsap.set('#twr',{scale:1});
gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});

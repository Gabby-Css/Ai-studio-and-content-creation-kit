/* ---- starting state of #32 = mid-race on the Pancake Road: the five karts in a pack (Pebble rides with Bo), scenery scrolls behind them; nobody else is in the shot ---- */
// the syrup river is a ground object (it lives in the set); the puddle + glob are fx
document.getElementById('rsLand').insertAdjacentHTML('beforeend',SRV_HTML+SPL_HTML);               // river + puddle are ground: behind the karts
document.getElementById('fxMount').insertAdjacentHTML('beforeend',SGL_HTML);
gsap.set('#syrupR,#syrupI,#spillW,#spill,#sglobW,#sglob,.sfl',{svgOrigin:'0 0'});
const RIVX=2100;                                           // the river's left edge (world)
gsap.set('#syrupR',{opacity:0,x:RIVX});                   // appears when the camera pans to it (scene 4)gsap.set('#spillW',{opacity:0,x:1640,y:2060,scale:.05});gsap.set('#sglobW',{opacity:0});
// the spectators, the gantry and the golden pan stay at the start line
gsap.set('#gm,#pt,#nm,#bp,#kg,#j1,#j2,#j3,#j4,#gh,#gpanW,#startW',{opacity:0});
gsap.set('#skySet',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});
const PK=[105,4];                                          // Pebble's seat in Bo's kart: x offset, y offset from a seated racer's character origin
const KY=(p)=>LANE[KRC[p].L]+KRC[p].b;                     // kart origin (world y) of a racer
const FEET=(p)=>LANE[KRC[p].L]-34;                         // a racer's character origin (world y)
const EYEY=(p,s)=>FEET(p)-EH[p]*s;                         // ... and his eyes
const PX0={cm:1500,tf:1380,zp:1260,mc:1100,bo:940};
for(const p of Object.keys(KRC)) place(p,PX0[p]);
gsap.set('#pb',{opacity:1,x:PX0.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mBg');
gsap.set('#fSatM',{attr:{values:1}});
for(const p of Object.keys(KRC)){gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}

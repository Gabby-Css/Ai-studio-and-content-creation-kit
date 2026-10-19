/* ---- starting state of #34 = the race goes on: the pack is back at full speed (Mochi in front, Pebble in Bo's kart); a cliff with a road tunnel is coming up ---- */
document.getElementById('world').insertAdjacentHTML('afterbegin',TUN_DEFS);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',PGL_HTML+EXG_HTML);
gsap.set('#pglW,#exgW',{svgOrigin:'0 0'});gsap.set('#pglW,#exgW',{opacity:0});
gsap.set('#syrupR,#spillW,#sglobW,#gpanW,#startW,#whlW,#popW,#wrnW',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#skySet',{opacity:0});
gsap.set('#gm,#pt,#nm,#bp,#kg,#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#gh',{opacity:0,x:900,y:1500,scale:.7});gsap.set('#ghGlow',{opacity:0});
const P34={mc:1800,tf:1550,zp:1350,cm:1150,bo:950};
for(const p of Object.keys(KRC)){place(p,P34[p]);gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set('#'+KRC[p].k+'S',{rotation:0});}
gsap.set('.kfl',{opacity:0});
gsap.set('#kmcS',{rotation:0});gsap.set('#mcLean',{rotation:0});gsap.set('#mcSq',{y:0});
gsap.set('#pb',{opacity:1,x:P34.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#fSatM',{attr:{values:1}});
gsap.set('#night',{opacity:0});

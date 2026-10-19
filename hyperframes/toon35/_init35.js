/* ---- starting state of #35 (Season 7 finale): the five karts in the final sprint (Mochi in front), the finish line and the crowd still far ahead; Boo hovers over the pack ---- */
document.getElementById('rsLand').insertAdjacentHTML('beforeend',FIN_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',PHO_HTML);
gsap.set('#finW,#finG,#phoW,#pho',{svgOrigin:'0 0'});gsap.set('#phoW',{opacity:0});
gsap.set('#syrupR,#spillW,#sglobW,#gpanW,#startW,#whlW,#popW,#wrnW,#pglW,#exgW',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#skySet',{opacity:0});
gsap.set('#night,#nStars',{opacity:0});gsap.set('#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5',{opacity:0});
gsap.set('#gh',{opacity:1,x:1250,y:880,scale:.7});gsap.set('#ghGlow',{opacity:.25});
const P35={mc:1700,cm:1500,zp:1400,tf:1200,bo:1000};
for(const p of Object.keys(KRC)){place(p,P35[p]);gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set('#'+KRC[p].k+'S',{rotation:0});}
gsap.set('.kfl',{opacity:0});gsap.set('#kmcS,#kboS',{rotation:0});gsap.set('#mcLean,#boLean',{rotation:0});gsap.set('#mcSq,#boSq',{y:0});
gsap.set('#pb',{opacity:1,x:P35.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#fSatM',{attr:{values:1}});
// the crowd (ground objects: the body moves them in with the scenery), Munch (arrives later), the pancake tower (built in scene 9)
for(const p of ['gm','pt','nm','bp','kg','j1','j2','j3','j4']){gsap.set('#'+p,{opacity:1});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#gm',{y:1640,scale:1.05});gsap.set('#pt',{y:1640,scale:.7});gsap.set('#nm',{y:1640,scale:.54});gsap.set('#bp',{y:1640,scale:.66});gsap.set('#kg',{y:1640,scale:1.0});
for(const j of ['j1','j2','j3','j4']) gsap.set('#'+j,{y:1700,scale:.5});
gsap.set('#kgArmL',{rotation:0});gsap.set('#kgArmR',{rotation:0});
gsap.set('#mn',{opacity:0,x:3600,y:1640,scale:1.5});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});
gsap.set('#stk,.stl,#stkTop,#stkRkW,#stkFeet,#stkRk',{opacity:0});gsap.set('#stkW',{x:1850,y:2740,scale:1.0});

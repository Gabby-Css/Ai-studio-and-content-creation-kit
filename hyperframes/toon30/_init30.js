/* ---- starting state of #30 (Season 6 finale): the gang on the lawn near the pile (it is still shaking), Pebble asleep behind the pancakes, a giant is about to step in from the right ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',HB_HTML);
gsap.set('#hbW,#hb',{svgOrigin:'0 0'});gsap.set('#hbW',{opacity:0,x:1950,y:380});
const END29={cm:[1700,ROWB,.76],gm:[2020,ROWB,1.05],pt:[1190,ROWD+60,.7],nm:[2140,2210,.54],bp:[2200,ROWF,.66],
             mc:[1500,ROWD,.74],bo:[1760,ROWD+BOY,.88],tf:[1990,ROWD,.74],zp:[2190,ROWD,.7]};
for(const [p,[x,y,s]] of Object.entries(END29)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1440,j2:1610,j3:1780,j4:1950})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#pileW',{opacity:1,x:2330,y:2170,scale:1.8});gsap.set('#pile',{x:0,y:0,scale:1});
gsap.set('#pb',{opacity:1,x:2330,y:2150,scale:PBS});gsap.set('#pbSq',{y:-330});gsap.set('#pbLean',{rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
gsap.set('#fSatM',{attr:{values:1}});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#mn',{opacity:1,x:3300,y:1640,scale:1.5});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});
gsap.set('#nameW,#zzzW,#arrW,#eggW,#eggBackW,#egFxW,#raysW,#fireW,#thermW,#bnW',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});gsap.set('#kg',{opacity:0});
gsap.set('#gh',{opacity:1,x:1350,y:700,scale:.75});gsap.set('#ghGlow',{opacity:.3});

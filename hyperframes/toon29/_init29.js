/* ---- starting state of #29 = the morning after: Pebble (now pink!) stands by Bo on the lawn, the empty shell and the night are gone, a big pile of pancakes waits at the far right ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',NAME_HTML+ZZZ_HTML+ARR_HTML);
gsap.set('#nameW,#nameS,#zzzW,#zzz,#arrW,#arr',{svgOrigin:'0 0'});
gsap.set('#nameW',{opacity:0,x:1230,y:1775,scale:.7});gsap.set('#zzzW',{opacity:0,x:2270,y:1700});gsap.set('#arrW',{opacity:0,x:2250,y:1650});
const END28={gm:[640,ROWB,1.05],pt:[1080,ROWF,.7],cm:[1420,ROWB,.76],nm:[1330,2250,.54],bp:[2150,ROWF,.66],
             mc:[800,ROWD,.74],bo:[1360,ROWD+BOY,.88],tf:[1650,ROWD,.74],zp:[1900,ROWD,.7]};
for(const [p,[x,y,s]] of Object.entries(END28)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1560,j2:1700,j3:1840,j4:1980})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#eggW,#eggBackW,#egFxW,#raysW,#fireW,#thermW,#bnW',{opacity:0});gsap.set('#eggGlow',{opacity:0});
gsap.set('#fSatM',{attr:{values:1}});                                 // Pebble is pink from now on
gsap.set('#pb',{opacity:1,x:1250,y:ROWD+100,scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#pileW',{opacity:1,x:2250,y:2120,scale:1.8});gsap.set('#pile',{scale:1});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});gsap.set('#mn',{opacity:0,x:3300,y:1640,scale:1.8});gsap.set('#kg',{opacity:0});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.3});

/* ---- starting state of #28 = night on the lawn: the gang sits in a ring around the egg (the blanket is off), the egg has started to glow ---- */
DEPTH.lay.insertAdjacentHTML('beforeend',PILE_HTML);
DEPTH.items.push({g:document.getElementById('pileW'),el:document.getElementById('pileW'),i:24});
document.getElementById('fxMount').insertAdjacentHTML('beforeend',EGFX_HTML);
gsap.set('#pileW,#pile,#egFxW,#raysW,#rays',{svgOrigin:'0 0'});gsap.set('#pileW',{opacity:0,x:1500,y:2300,scale:.62});
gsap.set('#egFxW',{opacity:0,x:EGX,y:EGY-262*EGS,scale:1});gsap.set('#raysW',{opacity:0,x:EGX,y:EGY-262*EGS});gsap.set('#rays',{svgOrigin:'0 0'});
const END27={gm:[660,ROWB,1.05],pt:[1000,ROWB,.7],cm:[1260,ROWB,.76],nm:[2250,2200,.54],bp:[2200,ROWF,.66],
             mc:[800,ROWD,.74],bo:[1500,ROWD+BOY,.88],tf:[1790,ROWD,.74],zp:[2020,ROWD,.7]};
for(const [p,[x,y,s]] of Object.entries(END27)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1640,j2:1790,j3:1940,j4:2090})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#eggW',{opacity:1,x:EGX,y:EGY,scale:EGS});gsap.set('#eggFull',{opacity:1});gsap.set('#eggBase,#eggCap,#eggHeat,#eggGlow,#noteW,#blanketW,.ecr',{opacity:0});
gsap.set('#eggHop,#eggWob,#eggRoll',{x:0,y:0,rotation:0,scale:1});gsap.set('#eggCap,#eggBase',{x:0,y:0,rotation:0,scale:1});gsap.set('#eggBackW',{opacity:0,x:EGX,y:EGY-30,scale:EGS});
gsap.set('#fireW,#thermW',{opacity:0});
gsap.set('#fSatM',{attr:{values:0}});                                 // baby Pebble is gray until his first pancake
gsap.set('#pb',{opacity:0,x:EGX,y:EGY-12,scale:PBS});gsap.set('#pbSq',{y:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night',{opacity:.34});gsap.set('#nStars',{opacity:1});gsap.set('#mn,#kg',{opacity:0});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.7});

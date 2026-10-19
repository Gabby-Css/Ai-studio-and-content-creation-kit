/* ---- starting state of #27 = the last frame of #26: the egg tucked under its blanket on the lawn, the gang around it; Truffle and Zap have shuffled along to make room for the campfire ---- */
DEPTH.lay.insertAdjacentHTML('beforeend',FIRE_HTML);document.getElementById('fxMount').insertAdjacentHTML('beforeend',THERM_HTML);
DEPTH.items.push({g:document.getElementById('fireW'),el:document.getElementById('fireW'),i:23});
gsap.set('.cfl,#fire,#fireW,#thermW',{svgOrigin:'0 0'});gsap.set('#fireW',{opacity:0,x:1340,y:ROWD+12,scale:.9});
gsap.set('#thermW',{opacity:0,x:960,y:1480});gsap.set('#therm',{svgOrigin:'0 0'});
const END26={gm:[660,ROWB,1.05],tf:[1560,ROWD,.74],pt:[1780,ROWB,.7],cm:[2100,ROWB,.76],
             mc:[800,ROWD,.74],bo:[1500,ROWF+BOY,.88],zp:[1860,ROWD,.7],nm:[520,2210,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END26)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#eggW',{opacity:1,x:EGX,y:EGY,scale:EGS});gsap.set('#eggFull',{opacity:1});gsap.set('#eggHeat,#eggGlow,#noteW,.ecr',{opacity:0});
gsap.set('#eggHop,#eggWob,#eggRoll',{x:0,y:0,rotation:0,scale:1});
gsap.set('#blanketW',{opacity:1});gsap.set('#blanket',{x:0,y:0,rotation:0,scale:1,scaleY:1});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});gsap.set('#mn',{opacity:0});gsap.set('#kg',{opacity:0});

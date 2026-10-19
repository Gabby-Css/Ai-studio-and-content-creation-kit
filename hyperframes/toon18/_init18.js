/* ---- starting state of #18 = the last frame of #17: inside the saucer, Rocky has just popped out of the tower, Planet Zorp fills the porthole ---- */
const CK0={cm:[880,.76],nm:[1000,.5],mc:[720,.68],tf:[1120,.74],zp:[1230,.68],bp:[1340,.62],bo:[1470,.88],pt:[1620,.7],gm:[1860,1.25]};
for(const [p,[x,s]] of Object.entries(CK0)){gsap.set('#'+p,{opacity:1,x,y:FLOOR,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#bpArmR',{rotation:-85});
gsap.set('#cockpit',{opacity:1});gsap.set('#table,#plate,#oven,#ck,#ufoL,#kg,#kcrnW,#kcrn,#j1',{opacity:0});
gsap.set('#gh',{opacity:1,x:880,y:600,scale:.9});gsap.set('#ghGlow',{opacity:.4,scale:1});
gsap.set('#stkW',{x:470,y:FLOOR+70,scale:.8});gsap.set('#stk',{opacity:1});gsap.set('.stl',{opacity:1});gsap.set('#stkRk',{y:0});gsap.set('#stkRkW,#stkTop',{opacity:1});gsap.set('#stkFeet',{opacity:0});
gsap.set('#zorpW',{opacity:1,scale:.95});gsap.set('#stars1',{x:-1220});gsap.set('#stars2',{x:-1800});
gsap.set('#holo',{opacity:0});gsap.set('#ufoLRamp',{svgOrigin:'52 -120',scaleY:1});
// ---- new in #18: the four Zorpians (gray), Planet Zorp's set, the giant behind the mountains
for(const p of ['z1','z2','z3','z4']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('.zfl,#zorpGiant,#zorpGiantIn,#zgEyes',{svgOrigin:'0 0'});
gsap.set('#z1,#z2,#z3,#z4',{opacity:0,y:FLOOR,scale:.62});
gsap.set('#zorpSet',{opacity:0});gsap.set('#zFlowers',{opacity:0});gsap.set('#zorpGiant',{opacity:0,x:1500,y:1760});

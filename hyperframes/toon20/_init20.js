/* ---- starting state of #20 = the last frame of #19: the rainbow arcs over Planet Zorp, everybody cheers, Munch waves ---- */
const COME0={bo:[1830,.88],tf:[1600,.74],mc:[1520,.68],cm:[1420,.76],nm:[1330,.5],pt:[1700,.7],zp:[1760,.68],bp:[1250,.62],gm:[1300,1.25]};
for(const [p,[x,s]] of Object.entries(COME0)){gsap.set('#'+p,{opacity:1,x,y:FLOOR,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
const ZC0={z1:1960,z2:1900,z3:1560,z4:1640};
for(const z of ['z1','z2','z3','z4']){gsap.set('#'+z,{opacity:1,x:ZC0[z],y:FLOOR,scale:.62});gsap.set(`#${z}ArmL`,{rotation:150});gsap.set(`#${z}ArmR`,{rotation:-150});}
gsap.set('#mn',{opacity:1,x:2150,y:FLOOR,scale:2.0});gsap.set('#mnArmL',{rotation:140});gsap.set('#mnArmR',{rotation:-140});gsap.set('#mnTear',{opacity:0});
gsap.set('#zorpGiant',{opacity:0});gsap.set('#rainbow',{opacity:1});gsap.set('.rbp',{strokeDashoffset:0});
gsap.set('#hotRock',{opacity:1,x:1520,y:FLOOR+60});gsap.set('#stl0',{opacity:0});gsap.set('#stkW',{x:1520,y:FLOOR+40,scale:1});gsap.set('#stkRk',{y:348});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});
gsap.set('#kg,#kcrn,#j1,#table,#plate,#oven',{opacity:0});gsap.set('#sunTag',{opacity:0});

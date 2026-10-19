/* ---- starting state of #17 = the last frame of #16: everybody hugs the crowned King, Jiggle sits on his head, the little saucer pings ---- */
const KX0=2170, KS0=1.9, K0=KS0/1.5;
const HUG0={mc:[1800,FLOOR+30,.68],cm:[1880,FLOOR+60,.76],nm:[1960,FLOOR+90,.5],bo:[2060,FLOOR+130,.88],pt:[2230,FLOOR+90,.7],tf:[2330,FLOOR+90,.8],zp:[2410,FLOOR+90,.68],bp:[2480,FLOOR+40,.62],gm:[2600,FLOOR,1.5]};
for(const [p,[x,y,s]] of Object.entries(HUG0)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#kg',{opacity:1,x:KX0,y:FLOOR,scale:KS0});gsap.set('#kgArmL',{rotation:140});gsap.set('#kgArmR',{rotation:-140});
gsap.set('#kcrnW',{x:KX0,y:FLOOR-505*KS0});gsap.set('#kcrn',{opacity:1,scale:K0,rotation:0});
gsap.set('#j1',{opacity:1,x:KX0,y:FLOOR-790*K0,scale:.62});gsap.set('#j1ArmL',{rotation:0});gsap.set('#j1ArmR',{rotation:0});
gsap.set('#gh',{opacity:1,x:1200,y:FLOOR-760,scale:.9});gsap.set('#feastPc',{opacity:0});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});
// ---- new in #17: the hologram, the pancake tower (+ Rocky inside), the "50" badge, Planet Zorp
for(const p of ['hl','rkp']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#holo,#stkW,#stkIn,#fiftyTag,#fiftyIn,#zorpW',{svgOrigin:'0 0'});
gsap.set('#holoW',{x:880,y:1330});gsap.set('#hl',{x:0,y:-8,scale:.92});gsap.set('#holo',{opacity:0});gsap.set('#holoMan',{opacity:0});gsap.set('#holoStat',{opacity:0});
gsap.set('#stkW',{x:1390,y:FLOOR+40,scale:1});gsap.set('#stk',{opacity:0});gsap.set('.stl',{opacity:0});gsap.set('#stkRk',{y:170});gsap.set('#stkRkW,#stkTop',{opacity:0});gsap.set('#stkFeet',{opacity:0});
gsap.set('#fiftyTag',{opacity:0});gsap.set('#zorpW',{opacity:0});

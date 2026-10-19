/* ---- starting state of #19 = the last frame of #18: colourful Planet Zorp, everybody (shaking) on the grass, the giant's eyes glowing behind the mountains ---- */
const OUT0={gm:[1130,1.25],tf:[1250,.74],mc:[1340,.68],bp:[1430,.62],cm:[1690,.76],nm:[1765,.5],zp:[1825,.68],pt:[1905,.7],bo:[2010,.88]};
for(const [p,[x,s]] of Object.entries(OUT0)){gsap.set('#'+p,{opacity:1,x,y:FLOOR,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
const ZX0={z1:2065,z2:2225,z3:2325,z4:2425};
for(const z of ['z1','z2','z3','z4']){gsap.set('#'+z,{opacity:1,x:ZX0[z],y:FLOOR,scale:.62});gsap.set(`#${z}ArmL`,{rotation:0});gsap.set(`#${z}ArmR`,{rotation:0});}
gsap.set('.zSky',{fill:'#7F63E8'});gsap.set('.zMtA',{fill:'#FF9A8B'});gsap.set('.zMtB',{fill:'#FFD36B'});gsap.set('.zGnd',{fill:'#7DF0B0'});gsap.set('.zCr',{fill:'#5FD19A'});gsap.set('.zMoon',{fill:'#FFE98A'});gsap.set('.zPl',{fill:'#FFC95A'});gsap.set('.zRing',{stroke:'#FF8FD2'});
[1,2,3,4].forEach(i=>{const c=ZCOL[i-1];['a','b','c','d'].forEach((k,j)=>gsap.set(`.z${i}${k}`,{fill:c[j]}));gsap.set(`.z${i}bs`,{stroke:c[1]});});
gsap.set('#zorpSet',{opacity:1});gsap.set('#zFlowers',{opacity:1});gsap.set('.zfl',{scaleY:1});gsap.set('#cockpit',{opacity:0});
gsap.set('#zorpGiant',{opacity:1,x:1500,y:1330});
gsap.set('#gh',{opacity:1,x:900,y:FLOOR-1150,scale:.9});gsap.set('#ghGlow',{opacity:.3,scale:1});
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR});gsap.set('#ufoLRamp',{svgOrigin:'52 -120',scaleY:1});
gsap.set('#stkW',{x:1520,y:FLOOR+40,scale:1});gsap.set('#stk',{opacity:1});gsap.set('.stl',{opacity:0});gsap.set('#stl0',{opacity:1});gsap.set('#stkRk',{y:348});gsap.set('#stkRkW',{opacity:1});gsap.set('#stkTop',{opacity:0});gsap.set('#stkFeet',{opacity:0});
// ---- new in #19: Munch, the hot rock, smoke, the rainbow
for(const p of ['mn']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#mnBelly',{svgOrigin:'0 -205'});gsap.set('#mnBody',{svgOrigin:'0 -250'});gsap.set('#mnHead',{svgOrigin:'0 -400'});
gsap.set('#mn',{opacity:0,x:3600,y:FLOOR,scale:2.0});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});
gsap.set('#hotRock,#hotRockIn',{svgOrigin:'0 0'});gsap.set('#hotRock',{opacity:0,x:1520,y:FLOOR+60});
gsap.set('.smk',{svgOrigin:'0 0',opacity:0});gsap.set('#rainbow',{opacity:0});

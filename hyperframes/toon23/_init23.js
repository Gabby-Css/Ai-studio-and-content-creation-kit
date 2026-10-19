/* ---- starting state of #23 = the last frame of #22: out on the sunny lawn, the Golden Spatula floats away on balloons, everybody stares up ---- */
const END22={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1350,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[820,ROWD,.74],zp:[1230,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66],bo:[1720,ROWD+BOY,.88]};
for(const [p,[x,y,s]] of Object.entries(END22)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#mcHat,#mcMag',{opacity:1});gsap.set('#mcArmR',{rotation:-100});
const JE={j1:1800,j2:1950,j3:2150,j4:2300};
for(const j of ['j1','j2','j3','j4']){gsap.set('#'+j,{opacity:1,x:JE[j],y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:150});gsap.set(`#${j}ArmR`,{rotation:-150});}
gsap.set('#flyW',{opacity:1,x:1850,y:-2300});gsap.set('#gspIn',{rotation:0});gsap.set('#bals',{opacity:1,scale:1});
gsap.set('#fTable,#table,#plate,#oven,#pedW,#kg,#kcrnW,#kcrn,.fp',{opacity:0});gsap.set('#skySet',{opacity:1});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});
// ---- new in #23: Zap's flames, streaks
gsap.set('#zflW,#streaks',{opacity:0});gsap.set('#zflW,#zfl2,.zf',{svgOrigin:'0 0'});gsap.set('.cld',{svgOrigin:'0 0'});

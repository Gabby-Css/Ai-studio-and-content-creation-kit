/* ---- starting state of #22 = the last frame of #21: the lights are back on, the Golden Spatula's pedestal (front of the stage) is empty, everybody gasps ---- */
const END21={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[820,ROWD,.74],bo:[1300,ROWF+BOY,.88],zp:[1230,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END21)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#kgArmL',{rotation:20});gsap.set('#kgArmR',{rotation:-20});
gsap.set('#fTable',{opacity:1});gsap.set('#pedW',{opacity:1,x:1040,y:ROWD,scale:.85});gsap.set('#spat',{opacity:0});gsap.set('#sneak',{opacity:0});gsap.set('#night',{opacity:0});
gsap.set('#ufoL',{opacity:0});
// ---- new in #22
gsap.set('.fp',{svgOrigin:'0 0',opacity:0});
// the sticky footprints: a trail along the front of the stage, from the pedestal to the right, where the Jiggles hide
for(let i=0;i<12;i++) gsap.set('#fp'+i,{x:(1180+i*100)-(1130+i*66),y:(ROWJ+30+(i%2?14:-14))-(1718+(i%2?16:-12))});
gsap.set('#mcHat,#mcMag',{opacity:0});gsap.set('#flyW,#fly,#gspIn,#bals,.bln',{svgOrigin:'0 0'});gsap.set('#flyW',{opacity:0});gsap.set('#bals',{opacity:0});
for(const p of ['j2','j3','j4']) gsap.set('#'+p,{opacity:0,x:2000,y:ROWJ,scale:.55});

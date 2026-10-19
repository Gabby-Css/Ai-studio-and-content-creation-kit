/* ---- starting state of #24 = the last frame of #23: out on the lawn, Bo has caught the Golden Spatula, Boo floats beside him, everybody cheers ---- */
const END23={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1350,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[820,ROWD,.74],zp:[1230,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66],bo:[1720,ROWD+BOY,.88]};
for(const [p,[x,y,s]] of Object.entries(END23)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-140:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?140:-150});}
gsap.set('#mcHat,#mcMag',{opacity:1});gsap.set('#mcArmR',{rotation:-100});
for(const [j,x] of Object.entries({j1:1800,j2:1950,j3:2150,j4:2300})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:150});gsap.set(`#${j}ArmR`,{rotation:-150});}
gsap.set('#flyW',{opacity:1,x:1810,y:ROWD+BOY-390,scale:.8});gsap.set('#gspIn',{rotation:180});gsap.set('#bals',{opacity:0});
gsap.set('#gh',{opacity:1,x:2120,y:1000,scale:.75});
gsap.set('#skySet',{opacity:1});gsap.set('#fTable,#table,#plate,#oven,#pedW,#kg,#kcrnW,#kcrn,.fp',{opacity:0});gsap.set('#zflW,#streaks',{opacity:0});
// ---- new in #24
gsap.set('#sbW,.fp,#pcw0,#pcw1,#pcw2,#splatW',{opacity:0});gsap.set('#sbW,#sb,#pcw0,#pcw1,#pcw2,#pcq0,#pcq1,#pcq2,#pcs0,#pcs1,#pcs2,#splatW,#splat,#drips',{svgOrigin:'0 0'});

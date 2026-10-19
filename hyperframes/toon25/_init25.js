/* ---- starting state of #25 = the last frame of #24: the scoreboard shows three perfect tens, everybody cheers on their marks in the festival kitchen ---- */
const END24={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
             mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1560,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END24)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#mcHat,#mcMag',{opacity:0});gsap.set('#mcArmR',{rotation:-150});
for(const [j,x] of Object.entries({j1:1800,j2:1950,j3:2150,j4:2300})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:150});gsap.set(`#${j}ArmR`,{rotation:-150});}
gsap.set('#flyW',{opacity:1,x:1390,y:ROWF+BOY-380,scale:.8});gsap.set('#gspIn',{rotation:180});gsap.set('#bals',{opacity:0});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#bh',{rotation:0,y:0});
gsap.set('#skySet',{opacity:0});gsap.set('#fTable,#table,#plate,#oven,#kg,#kcrnW,#kcrn',{opacity:1});
gsap.set('#sbW',{opacity:1,x:1560,y:430,scale:.8});[0,1,2].forEach(i=>{gsap.set('#sbq'+i,{opacity:0});gsap.set('#sbt'+i,{opacity:1});});
gsap.set('#splatW',{opacity:1,x:1300,y:-62,scale:.9});gsap.set('#kgArmL',{rotation:140});gsap.set('#kgArmR',{rotation:-140});
// the giant pancake goes up on the flip spot, between Mochi and Bo (its top stays below Bo's chin)
gsap.set('.stl',{opacity:0});gsap.set('#stk',{opacity:0});gsap.set('#stkW',{x:1150,y:ROWD,scale:.9});gsap.set('#stkRk',{y:170});gsap.set('#stkRkW,#stkTop',{opacity:0});gsap.set('#stkFeet',{opacity:0});
// ---- new in #25
gsap.set('#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5,#nStars',{opacity:0});gsap.set('#fw0,#fw1,#fw2,#fw3,#fw4,#fw5,.nst',{svgOrigin:'0 0'});
gsap.set('#mn',{opacity:0,x:2280,y:1280,scale:.42});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});   // Munch: small, far away on the hill

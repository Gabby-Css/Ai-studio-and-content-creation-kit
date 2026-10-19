/* ---- starting state of #36 (Season 8 opener): a sunny morning on the lawn, the Golden Pan sits in the grass, Munch is walking away over the hill ----
   Season-8 shared helpers (bodies #36-#40 must not redeclare them): setMarks, resetStage, BOAT_HTML/MAP_HTML (defs) */
document.getElementById('fxMount').insertAdjacentHTML('afterbegin',`<rect id="duskR" x="-3000" y="-3000" width="9000" height="9000" fill="#FF7A2E" opacity="0"/>`);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',MAP_HTML+TH_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',BOAT_HTML('bt'));
DEPTH.items.push({g:document.getElementById('btW'),el:document.getElementById('btW'),i:60});
gsap.set('#mapW,#map,#mapSc,#mapIsl,.mdot,#thW,#th,#btW,#bt,#btS0,#btS1,#btS2,#btBut,#bbW,#bb',{svgOrigin:'0 0'});gsap.set('#btDr',{svgOrigin:'0 100'});
gsap.set('#btMast',{svgOrigin:'0 20'});gsap.set('#btSail',{svgOrigin:'18 -940'});gsap.set('#btFlag',{svgOrigin:'18 -974'});
gsap.set('#bbMast',{svgOrigin:'0 20'});gsap.set('#bbSail',{svgOrigin:'18 -940'});gsap.set('#bbFlag',{svgOrigin:'18 -974'});
gsap.set('#mapW,#thW,#btW,#duskR,#btS0,#btS1,#btS2,#btMast,#btSail,#btFlag,#btDr,#btBut',{opacity:0});
// put a cast on their marks (arms down, no lean/squash left over from the previous episode)
function setMarks(M){for(const [p,[x,y,s]] of Object.entries(M)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0,rotation:0});}
 gsap.set('#boLean,#mcLean,#pbLean,#mnLean',{rotation:0});}
// the common "clean stage": every scene set / race prop / night overlay of the earlier seasons off
function resetStage(){
 gsap.set('#raceSet,#startW,#spdW,#gpanW,#whlW,#popW,#wrnW,#syrupR,#spillW,#sglobW,#pglW,#exgW,#finW,#phoW,#night,#nStars,#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5',{opacity:0});
 gsap.set('#stkW,.kfl',{opacity:0});
 for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'W',{opacity:0});
 gsap.set('#kg,#rk,#pan,#nb,#fTable,#table,#plate,#oven,#kcrnW,#kcrn',{opacity:0});
 gsap.set('#shake',{x:0,y:0});}
resetStage();
gsap.set('#skySet',{opacity:1});
// ---- the cast on the lawn: a ring round the Golden Pan (front-centre stays free for the pan, the fire, the map and later the boat)
const M36={gm:[600,ROWB,1.05],pt:[900,ROWB,.7],cm:[2020,ROWB,.76],bp:[2230,ROWB,.66],nm:[2420,ROWB,.54],
           tf:[780,ROWF,.74],mc:[2060,ROWF,.74],bo:[620,ROWD+BOY,.88],zp:[1560,ROWD,.7]};
setMarks(M36);
for(const [j,x] of Object.entries({j1:2000,j2:2130,j3:2270,j4:2400})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#pb',{opacity:1,x:800,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#mn',{opacity:1,x:2300,y:1560,scale:.62});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});
gsap.set('#gh',{opacity:1,x:1960,y:700,scale:.7});gsap.set('#ghGlow',{opacity:.25});
gsap.set('#gpanW',{opacity:1,x:1300,y:1930,scale:.9});gsap.set('#gpan',{svgOrigin:'0 0'});
gsap.set('#fireW',{opacity:0,x:1300,y:ROWD-110,scale:.9});
gsap.set('#fSatM',{attr:{values:1}});

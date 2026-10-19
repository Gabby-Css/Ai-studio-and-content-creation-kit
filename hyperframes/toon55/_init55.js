/* ---- starting state of #55 ("The Penguin Family", Season 11 finale): the sunny beach, the welcome sign stands, the crew on the sand; the iceberg with Waddles' family floats near the shore ---- */
resetStage();
gsap.set(S11_OFF,{opacity:0});
gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2',{opacity:0});gsap.set('#beachSet',{opacity:1});
const M55={gm:[560,ROWB,1.05],pt:[880,ROWB,.7],rk:[1240,ROWB,.8],nm:[2350,ROWB,.54],
           tf:[820,ROWF,.74],mc:[1090,ROWF,.74],bp:[1420,ROWF,.66],zp:[1720,ROWF,.7],cm:[2000,ROWF,.76],
           bo:[600,ROWD+BOY,.88],pan:[1010,ROWD-50,.9],nb:[2260,ROWD+10,.8]};
const PB55=[830,ROWD+14,PBS], WD55=[1290,ROWD-50,.9];
const FAM55={pd:[1550,ROWD-50,1.05],pm:[1790,ROWD-50,.95],pk:[2010,ROWD-30,.62]};                 // where the penguin family ends up on the sand
const ICB55=[1500,1390,.85], SGN55=[1160,1650,.78];
const TOP55={wd:[2030,1700,.55],pd:[2200,1690,.62],pm:[1960,1690,.56],pk:[2110,1700,.36]};         // the top of the dune (#8), small because it is far away
const DUN55=[1950,2000,.8];
setMarks(M55);
gsap.set('#wd',{opacity:1,x:WD55[0],y:WD55[1],scale:WD55[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB55[0],y:PB55[1],scale:PB55[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:760,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
// the iceberg with the family standing on it (small and far away: they grow as it slides up to the shore)
gsap.set('#icbW',{opacity:1,x:ICB55[0],y:ICB55[1],scale:ICB55[2]});gsap.set('#icb',{rotation:0});
const PGON={pd:[1330,1330,.92],pm:[1500,1337,.82],pk:[1690,1350,.56]};
for(const p of ['pd','pm','pk']){gsap.set('#'+p,{opacity:1,x:PGON[p][0],y:PGON[p][1],scale:PGON[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0});gsap.set(`#${p}Shake`,{rotation:0});}
// the welcome sign from #54 stands behind the crew; the dune waits at the right
gsap.set('#sgnW',{opacity:1,x:SGN55[0],y:SGN55[1],scale:SGN55[2]});gsap.set('#sgnPL,#sgnPR',{scaleY:1});gsap.set('#sgnB',{y:0,opacity:1});
gsap.set('#duneW',{opacity:0,x:DUN55[0],y:DUN55[1],scale:DUN55[2]});
gsap.set('#ballW',{opacity:0});gsap.set('#bcSunM',{y:0});
gsap.set('#depthLayer',{y:0});

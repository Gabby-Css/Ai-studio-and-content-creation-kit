/* ---- starting state of #52 ("The Ice Cream Stand"): the sunny beach, the crew on the sand, the stand is built during scene 1 ---- */
resetStage();
gsap.set(S11_OFF,{opacity:0});
gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2',{opacity:0});gsap.set('#beachSet',{opacity:1});
const M52={gm:[560,ROWB,1.05],pt:[880,ROWB,.7],rk:[2020,ROWB,.8],cm:[2260,ROWB,.76],nm:[2450,ROWB,.54],
           mc:[890,ROWF,.74],tf:[1930,ROWF,.74],zp:[2160,ROWF,.7],bp:[2330,ROWF,.66],
           bo:[640,ROWD+BOY,.88],pan:[1230,ROWD-50,.9],nb:[1760,ROWD+10,.8]};
const PB52=[930,ROWD+14,PBS], WD52=[1560,ROWD-50,.9], STD52=[1500,1700,1.0];
const CNP=[[1290,1620],[1430,1620],[1570,1620],[1710,1620]];        // the four cones on the counter
const PDP=[[1250,1830],[1450,1850],[1650,1840],[1800,1830]];        // the puddles when they melt
setMarks(M52);
gsap.set('#wd',{opacity:1,x:WD52[0],y:WD52[1],scale:WD52[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB52[0],y:PB52[1],scale:PB52[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:760,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
// the stand (the waffle stand of #47 with a new sign and no icicles)
document.querySelector('#stand text').textContent='ICE CREAM';gsap.set('#ic0,#ic1,#ic2,#ic3,#ic4,#ic5,#ic6,#ic7,#ic8',{opacity:0});
gsap.set('#standW',{opacity:0,x:STD52[0],y:STD52[1],scale:STD52[2]});
CNP.forEach(([x,y],i)=>gsap.set('#cnW'+i,{opacity:0,x,y,scale:.5}));
for(let i=0;i<8;i++) gsap.set(`#cn${i}S1,#cn${i}S2,#cn${i}S3`,{svgOrigin:'0 -150'});
PDP.forEach(([x,y],i)=>gsap.set(`#pud${i}W`,{opacity:0,x,y,scale:1}));gsap.set('#pud0,#pud1,#pud2,#pud3',{scale:.1});
document.querySelector('#thermW text').textContent='95°';document.querySelector('#thermW text').setAttribute('font-size','88');gsap.set('#thermW',{opacity:0,x:M52.zp[0],y:M52.zp[1]-400});
gsap.set('#depthLayer',{y:0});

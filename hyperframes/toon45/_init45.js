/* ---- starting state of #45 ("The Family Photo"): the picnic lawn, everybody scattered; the camera on its tripod at the front-left; the King has joined ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',FRAME_HTML+CNT_HTML);
gsap.set('#vfW,#vf,#cntW,#cnt10,#cnt3,#cnt2,#cnt1',{svgOrigin:'0 0'});
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#mn',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#duskR',{opacity:0});
const M45={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],cm:[1700,ROWB,.76],nm:[1960,ROWB,.54],kg:[2300,ROWB,1.4],
           tf:[1100,ROWF,.74],mc:[1550,ROWF,.74],bp:[1850,ROWF,.66],zp:[800,ROWD,.7],bo:[1050,ROWD+BOY,.88],pan:[1280,ROWD-50,.9],nb:[2200,ROWD+10,.8]};
const CZ45={cz1:[1500,ROWD-50,.9],cz2:[1720,ROWD-50,.9],cz3:[1940,ROWD-50,.9]};
const GM45=[1330,ROWF-34,.62];
// the tight family photo (back row / middle row / front row), seen through the viewfinder at (1560,1560)
const F45={gm:[1000,ROWB,1.05],pt:[1250,ROWB,.7],kg:[1520,ROWB,1.35],cm:[1800,ROWB,.76],nm:[2030,ROWB,.54],
           tf:[1120,ROWF,.74],mc:[1430,ROWF,.74],bp:[1860,ROWF,.66],rk:[2110,ROWF,.8],
           zp:[1060,ROWD,.7],bo:[1240,ROWD+BOY,.88],pan:[1500,ROWD-50,.9],nb:[2240,ROWD+10,.8],
           cz1:[1690,ROWD-50,.9],cz2:[1870,ROWD-50,.9],cz3:[2050,ROWD-50,.9]};
const GF45=[1620,ROWF-34,.62];
setMarks(M45);
for(const p of ['cz1','cz2','cz3']){gsap.set('#'+p,{opacity:1,x:CZ45[p][0],y:CZ45[p][1],scale:CZ45[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0});gsap.set(`#${p}Shake`,{rotation:0});}
gsap.set('#kgArmL',{rotation:0});gsap.set('#kgArmR',{rotation:0});
gsap.set('#gma',{opacity:1,x:GM45[0],y:GM45[1],scale:GM45[2]});gsap.set('#gmaK',{y:ROWF});gsap.set('#gmaArmL',{rotation:0});gsap.set('#gmaArmR',{rotation:0});gsap.set('#gmaSq',{y:0});gsap.set('#gmaCap,#gmaBlk',{opacity:0});GMAN.eyes(0,true);GMAN.pm(0,'Sm');
gsap.set('#pb',{opacity:1,x:1180,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1400,y:1000,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#rk',{opacity:1,x:3400,y:ROWF,scale:.8});gsap.set('#rkSq',{y:0});gsap.set('#rkArmL',{rotation:0});gsap.set('#rkArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#mcHat,#mcMag',{opacity:0});
// the picnic stays, the camera (front-left) waits, the viewfinder/countdown/photo are hidden
gsap.set('#pkW',{opacity:1,x:1480,y:1990});gsap.set('#pk',{scaleX:1});gsap.set('#bskW',{opacity:1,x:1010,y:2030,scale:.65});gsap.set('#bskLid',{rotation:-110});gsap.set('#bskPc,#bskCup0,#bskCup1',{opacity:1});
gsap.set('#cmrW',{opacity:0,x:600,y:2400,scale:.75});gsap.set('#vfW',{opacity:0,x:1560,y:1560,scale:1});gsap.set('#cntW',{opacity:0,x:1560,y:1000});gsap.set('#cnt10,#cnt3,#cnt2,#cnt1',{opacity:0});
gsap.set('#polW',{opacity:0,x:700,y:2200,scale:.2});gsap.set('#flash',{opacity:0});
gsap.set('#depthLayer',{y:0});

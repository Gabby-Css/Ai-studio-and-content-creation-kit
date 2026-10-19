/* ---- starting state of #39 (Season 8, "The Wobbly Bridge"): the crew stands on the left rim of a canyon, a rope bridge in front of them ----
   shared by #39-#40 (do not redeclare): CHASM/BRG/BRY, LFT/RGT/GAT (the three line-ups), chest ids chBW/chFW/chLid/chLock, bigx, lft, msplat, syr */
const SM2=document.getElementById('setMount');
SM2.insertAdjacentHTML('beforeend',CAN_HTML+BRIDGE_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',BIGX_HTML+LFT_HTML+SYR_HTML);
document.getElementById('mapSc').insertAdjacentHTML('beforeend',SPLAT_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',CHEST_HTML);
DEPTH.items.push({g:document.getElementById('chBW'),el:document.getElementById('chBW'),i:66},{g:document.getElementById('chFW'),el:document.getElementById('chFW'),i:68});
gsap.set('#brdgW,#brdg,#bigxW,#bigx,#lftW,#lft,#syrW,#syr,#chBW,#chB,#chFW,#chF',{svgOrigin:'0 0'});gsap.set('#msplat',{svgOrigin:'120 -30'});gsap.set('.brpl',{svgOrigin:'0 0'});
gsap.set('#chLid',{svgOrigin:'0 -206'});gsap.set('#chLock',{svgOrigin:'0 -130'});
resetStage();
gsap.set('#seaSet,#junSet,#skySet,#raceSet,#gateW,#ptrIn,#ptrOut,#bushW,#chbW,#fckW,#wndW,#achW,#isleW,#thW',{opacity:0});gsap.set('#canSet,#brdgW',{opacity:1});
gsap.set('#bigxW,#lftW,#syrW,#msplat,#chBW,#chFW,#chGlow',{opacity:0});gsap.set('.bx1,.bx2',{strokeDashoffset:1});
gsap.set('#mapW',{opacity:0,x:2250,y:1450});gsap.set('#map',{scale:.5,rotation:0,y:0});gsap.set('#mapSc',{scaleY:1});gsap.set('#depthLayer',{y:0});
// the three line-ups: left rim (start), right rim (after the crossing), and gathered round the X (the chest stands at (2300,1980))
const LFT={gm:[1020,1720,1.05],zp:[1050,ROWF+30,.7],bo:[900,ROWF+BOY+30,.88],tf:[760,ROWF,.74],mc:[600,ROWF,.74],cm:[780,ROWB,.76],pt:[930,ROWB,.7],
           bp:[560,ROWB,.66],rk:[1090,ROWB,.8],nm:[470,ROWF,.54],pan:[690,ROWD-30,.9],nb:[500,ROWD+10,.8],pb:[820,ROWD+24,PBS]};
const RGT={gm:[1990,1700,1.05],zp:[2020,ROWF+20,.7],bo:[2160,ROWF+BOY,.88],tf:[2300,ROWF,.74],mc:[2440,ROWF,.74],cm:[2360,ROWB,.76],pt:[2330,ROWD,.7],
           bp:[2500,ROWB,.66],rk:[2620,ROWB,.8],nm:[2570,ROWF,.54],pan:[2250,ROWD-30,.9],nb:[2690,ROWD+10,.8],pb:[2060,ROWD+14,PBS]};
const GAT={gm:[2000,ROWB,1.05],rk:[2200,ROWB,.8],cm:[2420,ROWB,.76],bp:[2640,ROWB,.66],nm:[2800,ROWB,.54],tf:[2570,ROWF,.74],mc:[2790,ROWF,.74],pan:[2040,ROWF-50,.9],
           bo:[2030,ROWF+BOY,.88],pt:[1920,ROWD,.7],zp:[2640,ROWD,.7],pb:[2520,ROWD+14,PBS],nb:[2780,ROWD+10,.8]};
const CH0=[2300,1980,.8];                                   // the chest
gsap.set('#chBW',{opacity:0,x:CH0[0],y:CH0[1]-2,scale:CH0[2]});gsap.set('#chFW',{opacity:0,x:CH0[0],y:CH0[1]+2,scale:CH0[2]});
setMarks(Object.fromEntries(Object.entries(LFT).filter(([p])=>p!=='pb')));
gsap.set('#pb',{opacity:1,x:LFT.pb[0],y:LFT.pb[1],scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW,#snkW',{opacity:0});gsap.set('#rkSq',{y:0});
gsap.set('#gh',{opacity:1,x:640,y:1030,scale:.75});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});

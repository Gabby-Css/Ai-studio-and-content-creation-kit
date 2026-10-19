/* ---- starting state of #40 (Season 8 finale): the end of #39 - the crew stands round the big X on the right rim of the canyon, the chest sits in the sand, locked tight ----
   new here: Grandma Pancake (#gma, helper GMAN), a heap of coins in the chest, floating Zs, a depth key so Grandma can sit INSIDE the chest (between its back and front halves) */
DEPTH.lay.insertAdjacentHTML('beforeend',`<g id="gmaMount">${panSVG('gma')}</g>`);
document.getElementById('gmaSq').insertAdjacentHTML('beforeend',GMA_ACC);
document.getElementById('chB').insertAdjacentHTML('beforeend',COINS_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',ZZ_HTML);
document.getElementById('setMount').insertAdjacentHTML('beforeend','<g id="gmaK"></g>');
DEPTH.items.push({g:document.getElementById('gmaMount'),el:document.getElementById('gmaK'),i:67});
EYE.gma=[0,-62];EH.gma=62;
gsap.set('#gma,#gmaSq,#gmaShake,#gmaLegL,#gmaLegR,#gmaArmL,#gmaArmR,.gmaEye,.gmaEyeW,.gmaPupil,#gmaBrowL,#gmaBrowR,#gmaCap,#gmaBlk,#zzW,#zz0,#zz1,#zz2,#chCoins',{svgOrigin:'0 0'});
const GMAN=mkPan('gma');
const GMAIN=[2300,1832,.55], GMAOUT=[2500,2020,.55];        // Grandma inside the chest / standing beside it
resetStage();
gsap.set('#seaSet,#junSet,#skySet,#raceSet,#gateW,#ptrIn,#ptrOut,#bushW,#chbW,#fckW,#wndW,#achW,#isleW,#thW,#mapW,#lftW,#syrW,#msplat',{opacity:0});gsap.set('#canSet,#brdgW,#bigxW',{opacity:1});
gsap.set('.bx1,.bx2',{strokeDashoffset:0});gsap.set('#bigxW',{x:2300,y:2090});
gsap.set('#depthLayer',{y:0});gsap.set('#brdg',{y:0});
setMarks(Object.fromEntries(Object.entries(GAT).filter(([p])=>p!=='pb')));
gsap.set('#pb',{opacity:1,x:GAT.pb[0],y:GAT.pb[1],scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW,#snkW',{opacity:0});gsap.set('#rkSq',{y:0});
gsap.set('#gh',{opacity:1,x:2480,y:1180,scale:.75});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
// the chest, closed and locked; Grandma asleep inside (hidden until the lid opens)
gsap.set('#chBW',{opacity:1,x:CH0[0],y:CH0[1]-2,scale:CH0[2]});gsap.set('#chFW',{opacity:1,x:CH0[0],y:CH0[1]+2,scale:CH0[2]});
gsap.set('#chLid',{y:0,scaleY:1,rotation:0});gsap.set('#chLock',{opacity:1,y:0,rotation:0,scale:1});gsap.set('#chGlow,#chCoins',{opacity:0});
gsap.set('#gmaK',{y:CH0[1]});gsap.set('#gmaMount',{opacity:1});gsap.set('#gma',{opacity:0,x:GMAIN[0],y:GMAIN[1],scale:GMAIN[2]});gsap.set('#gmaArmL,#gmaArmR',{rotation:0});gsap.set('#gmaSq',{y:0});
GMAN.eyes(0,false);GMAN.pm(0,'Sm');
gsap.set('#gpanW',{opacity:0});gsap.set('#night,#nStars',{opacity:0});gsap.set('#duskR',{opacity:0});

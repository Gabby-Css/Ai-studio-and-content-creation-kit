/* ---- starting state of #38 (Season 8, "The Riddle Gate"): the crew has landed on the island and stands on the jungle trail; the giant gate is NOT there yet (it drops in during scene 1) ----
   new shared bits (bodies #38-#40 must not redeclare them): Flapjack (#pan) and Nibbles (#nb) join the depth layer, EYE.pan/EYE.nb */
const SM=document.getElementById('setMount');
SM.insertAdjacentHTML('beforeend',JUN_HTML+PTRI_HTML+GATE_HTML+PTRO_HTML+BUSH_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',CHB_HTML+FCK_HTML);
DEPTH.items.push({g:document.getElementById('panMount'),el:document.getElementById('pan'),i:63},{g:document.getElementById('nbMount'),el:document.getElementById('nb'),i:64});
EYE.pan=[0,-62];EYE.nb=[0,-300];EH.pan=62;EH.nb=300;
gsap.set('#gateW,#gate,#ptrIn,#ptrOut,#bushW,#bush,#chbW,#chb,#fckW,#fck',{svgOrigin:'0 0'});
gsap.set('#gtL',{svgOrigin:'-310 0'});gsap.set('#gtR',{svgOrigin:'310 0'});gsap.set('#gtSign',{svgOrigin:'0 -1060'});
gsap.set('#sgR',{svgOrigin:'-190 -1070'});gsap.set('#sgG',{svgOrigin:'130 -1070'});gsap.set('#sgF',{svgOrigin:'0 -1002'});
resetStage();
gsap.set('#seaSet,#skySet,#raceSet,#wndW,#achW,#isleW,#mapW',{opacity:0});gsap.set('#junSet',{opacity:1});
const GS38=1.35;                                            // the gate is 1.35x its drawn size: it must look GIANT next to the crew
gsap.set('#gateW',{opacity:1,x:1300,y:1560,scale:GS38});gsap.set('#gtOpen,#ptrIn,#ptrOut',{opacity:0});gsap.set('#gtL,#gtR',{scaleX:1});
gsap.set('#bushW',{opacity:1,x:1900,y:1790,scale:1.1});gsap.set('#bush',{scale:1,rotation:0});
gsap.set('#chbW,#fckW',{opacity:0});
const M38={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],cm:[1700,ROWB,.76],bp:[2000,ROWB,.66],rk:[2400,ROWB,.8],
           tf:[820,ROWF,.74],mc:[1780,ROWF,.74],nm:[2100,ROWF,.54],pan:[1180,ROWF-50,.9],
           bo:[1480,ROWD+BOY,.88],zp:[1900,ROWD,.7],nb:[2250,ROWD+10,.8]};
setMarks(M38);
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW,#snkW',{opacity:0});
gsap.set('#rkSq',{y:0});
gsap.set('#pb',{opacity:1,x:1080,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:2150,y:1150,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#depthLayer',{y:0});

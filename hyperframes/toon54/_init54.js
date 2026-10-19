/* ---- starting state of #54 ("The Message in a Bottle"): the sunny beach, the crew on the sand; a bottle will float in from the sea, a welcome sign will be built, an iceberg approaches ---- */
resetStage();
gsap.set(S11_OFF,{opacity:0});
gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2',{opacity:0});gsap.set('#beachSet',{opacity:1});
const M54={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],rk:[1250,ROWB,.8],nm:[2350,ROWB,.54],
           tf:[820,ROWF,.74],mc:[1120,ROWF,.74],cm:[1790,ROWF,.76],bp:[2000,ROWF,.66],zp:[2250,ROWF,.7],
           bo:[640,ROWD+BOY,.88],pan:[1240,ROWD-50,.9],nb:[2150,ROWD+10,.8]};
const PB54=[950,ROWD+14,PBS], WD54=[1560,ROWD-50,.9], BTT54=[1560,1760,.9], SGN54=[1500,1770,1.0];
setMarks(M54);
gsap.set('#wd',{opacity:1,x:WD54[0],y:WD54[1],scale:WD54[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB54[0],y:PB54[1],scale:PB54[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:760,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#bttW',{opacity:0,x:1300,y:1180,scale:.3});gsap.set('#btt',{rotation:0});gsap.set('#bttCork',{svgOrigin:'0 -304',x:0,y:0,rotation:0,opacity:1});
gsap.set('#ltrW',{opacity:0,x:1560,y:1560});gsap.set('#ltr',{scale:.05,rotation:0});
gsap.set('#sgnW',{opacity:0,x:SGN54[0],y:SGN54[1],scale:SGN54[2]});gsap.set('#sgnPL,#sgnPR',{scaleY:.05});gsap.set('#sgnB',{y:-600,opacity:0});
gsap.set('#icbW',{opacity:0,x:1500,y:1140,scale:.18});
// the five cups of #50 become coconut cups (cream coloured)
for(let i=0;i<5;i++){document.querySelectorAll(`#mgW${i} [fill="#E8483F"]`).forEach(e=>e.setAttribute('fill','#F4E6C8'));document.querySelectorAll(`#mgW${i} [stroke="#E8483F"]`).forEach(e=>e.setAttribute('stroke','#F4E6C8'));}
gsap.set('#depthLayer',{y:0});

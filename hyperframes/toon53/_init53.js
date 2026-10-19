/* ---- starting state of #53 ("The Sandcastle Contest"): the sunny beach; five builders in the front row (Bo, Munch, Mochi, Zap, Coco), each with a spot for a sand tower right behind them; the big castle spot in the middle ---- */
resetStage();
gsap.set(S11_OFF,{opacity:0});
gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2',{opacity:0});gsap.set('#beachSet',{opacity:1});
const M53={gm:[560,ROWB,1.05],rk:[1000,ROWB,.8],nm:[2350,ROWB,.54],nb:[2060,ROWB,.8],
           tf:[820,ROWF,.74],bp:[1620,ROWF,.66],pt:[1660,ROWB,.7],
           bo:[600,ROWD+BOY,.88],mc:[1420,ROWD,.74],zp:[1810,ROWD,.7],cm:[2200,ROWD,.76]};
const MN53=[1010,ROWD-20,1.0], WD53=[1400,ROWB-50,.9], PAN53=[1840,ROWB-50,.9], PB53=[1130,ROWF+50,PBS];
const TWP=[[600,2070,1.35],[1010,2000,1.25],[1420,2000,1.6],[1810,2000,1.4],[2200,2000,1.5]];     // tower bases (behind each builder): Bo, Munch, Mochi, Zap, Coco
const SC53=[1400,2020];                                                                         // where the big castle rises
setMarks(M53);
gsap.set('#mn',{opacity:1,x:MN53[0],y:MN53[1],scale:MN53[2]});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});gsap.set('#mnSq',{y:0});
gsap.set('#wd',{opacity:1,x:WD53[0],y:WD53[1],scale:WD53[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pan',{opacity:1,x:PAN53[0],y:PAN53[1],scale:PAN53[2]});
gsap.set('#pb',{opacity:1,x:PB53[0],y:PB53[1],scale:PB53[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:760,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
TWP.forEach(([x,y,s],i)=>{gsap.set(`#tw${i}W`,{opacity:0,x,y,scale:s});gsap.set('#tw'+i,{scaleY:.05});});
gsap.set('#scW',{opacity:0,x:SC53[0],y:SC53[1]});gsap.set('#sc',{scale:.05,rotation:0});gsap.set('#scTop',{svgOrigin:'0 0',opacity:1});
gsap.set('#wvW',{opacity:0,x:0,y:1330});gsap.set('#wv',{scaleY:.2});
[[0,640,2180],[1,1000,2200],[2,1560,2210],[3,1920,2200]].forEach(([i,x,y])=>gsap.set(`#bk${i}W`,{opacity:0,x,y,scale:.7}));
gsap.set('#depthLayer',{y:0});

/* ---- starting state of #60 ("The Grand Finale", Season 12 finale): show day. The tent is full (the crowd is on the bleachers), the banner hangs, Dad the ringmaster stands in the middle, Munch behind him,
   Bo and Zap on the left with the pancakes, Mochi + the magic table on the right, Coco hangs from the trapeze ---- */
const HAT60=[1990,1900,.8], HATT=[HAT60[0],HAT60[1]-434*HAT60[2]], RK60=[2230,1950];
const M60={gm:[560,ROWB,1.05],pt:[880,ROWB,.7],mn:[1400,ROWB,1.0],bp:[1900,ROWB,.66],nm:[2350,ROWB,.54],
           tf:[780,ROWF,.74],mc:[1650,ROWF,.74],
           bo:[620,ROWD+BOY,.88],zp:[1000,ROWD,.7],wd:[1200,ROWD-50,.9],pd:[1400,ROWD-50,1.05],pm:[1640,ROWD-50,.95],pk:[1840,ROWD-30,.62],nb:[2340,ROWD+10,.8],
           pb:[860,ROWD+14,PBS],gh:[1500,700,.7]};
startCircus(M60);
gsap.set('#ldrW',{opacity:0});gsap.set('#crcCrowd',{opacity:1});
gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});
// Coco hangs from the trapeze (parked on the platform side)
gsap.set('#cm',{opacity:1,scale:TRP.S});{const [hx,hy,hr]=hangXYR(TRP.A0);setCm(hx,hy,hr);}gsap.set('#cmArmL',{rotation:150});gsap.set('#cmArmR',{rotation:-150});
gsap.set('#trpW',{opacity:1,x:TRP.P[0],y:TRP.P[1]});gsap.set('#trp',{rotation:-TRP.A0});
// the banner (re-worded) hangs from the start
document.getElementById('bnrT1').textContent='PANCAKE';document.getElementById('bnrT2').textContent='CIRCUS!';
gsap.set('#bnrW',{opacity:1,x:1400,y:110,scale:1.5});gsap.set('#bnr',{rotation:0});
// the magic table with the hat, Mochi's wand, Rocky hidden inside
gsap.set('#mtbW',{opacity:1,x:HAT60[0],y:HAT60[1],scale:HAT60[2]});gsap.set('#mtb',{scale:1});gsap.set('#mhat',{rotation:0,scale:1});
gsap.set('#wandW',{opacity:1,x:M60.mc[0]+150,y:M60.mc[1]-150,scale:1,rotation:0});gsap.set('#wand',{rotation:15});
gsap.set('#rk',{opacity:0,x:HATT[0],y:HATT[1],scale:.25});gsap.set('#rkArmL,#rkArmR',{rotation:0});gsap.set('#rkSq',{y:0,rotation:0});
// Munch's pancake tower waits (hidden)
gsap.set('#twrW',{opacity:0,x:M60.mn[0],y:960,scale:1.2});gsap.set('#twr',{scale:1});
gsap.set('#jpcW0,#jpcW1,#jpcW2,#jpcW3,#jpcW4,#jpcW5,#jpcW6,#jpcW7,#jpcW8,#jpcW9,#jpcW10,#jpcW11',{opacity:0});

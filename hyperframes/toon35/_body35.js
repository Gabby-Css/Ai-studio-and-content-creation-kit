/* ===== this episode's key moments (all derived from the voice timings) ===== */
// shot logic: scenes 1-6 are a TRACKING shot (the scenery scrolls, then slows down for the photo finish, the finish line and the crowd roll in as ground objects);
// from scene 7 the camera is a still shot at the finish: the King judges, Munch arrives with the Golden Pan, a giant pancake tower goes up, dusk + fireworks.
const PBU=1/PBS;
const tF=W(6,2)+.02;                                       // the five karts cross the line together
const V0=1500;
const SPD=scrollProfile([[0,V0],[8.4,V0],[10.1,320],[tF,260],[tF+1.5,0],[30,0]],30);
const LU=[1620,1520,1420,1320,1220];                       // line-up x per lane at the photo finish (the line leans: 100 px per lane)
const XL=1878+SPD.dist(tF);                                // the finish pole (world x at t=0): the slanted line meets the karts' bumpers at tF
gsap.set('#finW',{opacity:1});SPD.ground('#finW',XL);
const LF=XL-SPD.D;                                         // ... and where it ends up
// the crowd stands around the finish line (final world x relative to the line)
[['gm',LF-590],['pt',LF-330],['nm',LF-170],['j2',LF-700],['j1',LF+60],['kg',LF+190],['bp',LF+410],['j3',LF+520],['j4',LF+640]].forEach(([p,fx])=>SPD.ground('#'+p,fx+SPD.D));
const KGX=LF+190, MUN=[2310,1640];
const WIDE35=[960,470,.66];                               // y0 470: Munch's horns stay inside the frame
const CAM={wide:RACE, wide2:WIDE35,
 mc:camE(P35.mc,EYEY('mc',.6),1.15,540,680), bo1:camE(1150,EYEY('bo',.6),1.1,540,680), bo2:camE(1650,EYEY('bo',.6),1.1,540,680),
 zp1:camE(1450,EYEY('zp',.58),1.15,540,680), zp2:camE(1800,EYEY('zp',.58),1.15,540,680), king:camE(KGX,1640-342,.95,540,640)};
const tStk=L[11]+DU[11]+.35;
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}

/* ================= SCENE 1: "The finish line was just ahead!" ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','Big');lookAll2(0,34,0);
wheels(0,tF,6);speedLines(.2,8.6);
['cm','tf','zp','mc'].forEach((p,i)=>bumpKart(p,.3+i*.05,tF,6,.2+i*.02));bumpKart('bo',.3,tF,6,.22);
for(let t=.5;t<8.4;t+=.55){trail(t,P35.mc-130,LANE[3]+6,1.0);trail(t+.17,P35.zp-130,LANE[2]+6,1.0);}
tl.set('#kmcW .kfl',{opacity:1},.4);tl.fromTo('#kmcW .kfl',{scaleX:.6},{scaleX:1.3,duration:.07,yoyo:true,repeat:60},.4);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:30,ease:'sine.inOut'},0);

/* ================= SCENE 2: Mochi: "Hmph. I will win. Obviously." ================= */
camTo(L[2]-.4,.7,...CAM.mc,'power2.inOut');
MC.m(L[2]+.1,'mFr');MC.talk(L[2]+.12,L[2]+DU[2]-.08,'mOp','mFr',.16);mcEyes(L[2]+.15,'lids');MC.brows(L[2]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-50,duration:.25},W(2,3));
tl.fromTo('#kmcS',{rotation:0},{rotation:-4,duration:.15,yoyo:true,repeat:5,ease:'sine.inOut'},W(2,1));
lookAll2(L[2]+.3,20,-6);

/* ================= SCENE 3: Bo: "No, I will win!" — his kart surges up through the pack ================= */
camTo(L[3]-.45,.45,...CAM.bo1,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[3]-.2);
bTalk(L[3]+.02,L[3]+DU[3]-.04);brows(L[3]+.05,14,-14,-4,.15);eyesMode(L[3]+.05,'wide');look(L[3]+.05,30,0,.12);
driveBo(L[3]-.2,1.4,1650,'power2.inOut');
camTo(L[3]+.3,.55,...CAM.bo2,'power2.inOut');
tl.to('#boArmL',{rotation:-100,duration:.2},L[3]+.1);tl.to('#boArmR',{rotation:100,duration:.2},L[3]+.1);
PB.eyes(L[3],'wide');PB.m(L[3],'mBg');
for(let k=0;k<5;k++) trail(L[3]+.1+k*.2,1000+(1650-1000)*Math.min(1,(k*.2+.1)/1.4)-120,LANE[4]+6,1.2);
lookAll2(L[3]+.3,-24,4);

/* ================= SCENE 4: Zap: "Beep boop! Maximum speed!" — a rocket surge ================= */
camTo(L[4]-.4,.45,...CAM.zp1,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[4]);tl.to('#boArmR',{rotation:0,duration:.2},L[4]);
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:11},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
tl.set('#kzpW .kfl',{opacity:1},W(4,2)-.1);tl.fromTo('#kzpW .kfl',{scaleX:.5},{scaleX:1.6,duration:.06,yoyo:true,repeat:40},W(4,2)-.1);
drive('zp',W(4,2)-.1,1.3,1800,'power2.inOut');camTo(W(4,2)-.1,.6,...CAM.zp2,'power2.inOut');
shake(W(4,2),8,5);sparks(W(4,2),1400,LANE[2]-30,6,100);
for(let k=0;k<5;k++) trail(W(4,2)+k*.2,1400+(1800-1400)*Math.min(1,(k*.2)/1.3)-130,LANE[2]+6,1.3);

/* ================= SCENE 5: "Closer and closer they zoomed!" — slow-motion, they converge into a line ================= */
camTo(L[5]-.4,.7,...CAM.wide,'power2.inOut');
tl.set('.kfl',{opacity:0},L[5]);
['mc','zp','cm','tf'].forEach((p,i)=>drive(p,L[5]-.1+i*.05,1.9,LU[KRC[p].L],'sine.inOut'));
driveBo(L[5]-.1,1.9,LU[4],'sine.inOut');
faces2(L[5]+.2,'wide','O');lookAll2(L[5]+.2,34,0);
tl.set('#kmcW .kfl,#kzpW .kfl',{opacity:1},L[5]+.9);tl.fromTo('#kmcW .kfl,#kzpW .kfl',{scaleX:.5},{scaleX:1.2,duration:.12,yoyo:true,repeat:12},L[5]+.9);
speedLines(L[5],tF+.5);
for(let k=0;k<4;k++) sparks(L[5]+.6+k*.35,1500,LANE[2]-120,3,80);

/* ================= SCENE 6: "And they crossed together!" — the photo flash ================= */
tl.fromTo('#flash',{opacity:0},{opacity:.95,duration:.08},tF-.05);tl.to('#flash',{opacity:0,duration:.6},tF+.05);
tl.set('#phoW',{opacity:1,x:1380,y:1190},tF+.05);tl.fromTo('#pho',{scale:.2,rotation:-12},{scale:.85,rotation:-3,duration:.4,ease:'back.out(2.4)'},tF+.05);tl.to('#phoW',{opacity:0,duration:.3},tF+1.5);
['mc','zp','cm','tf'].forEach((p,i)=>drive(p,tF+.05,1.2,LU[KRC[p].L]+70,'power2.out'));driveBo(tF+.05,1.2,LU[4]+70,'power2.out');
tl.set('.kfl',{opacity:0},tF+.2);
armsUp(tF+.4,.15);faces2(tF+.3,'happy','Big');eyesMode(tF+.3,'hearts');lookAll2(tF+.3,0,-10);
SQC.forEach((s,i)=>hop(s,tF+.5+i*.05,44,.12,.16));hearts(tF+.7,1500,1650,5,140,280);
tl.to('#pbArmL',{rotation:150,duration:.15},tF+.4);tl.to('#pbArmR',{rotation:-150,duration:.15},tF+.4);
confetti(tF+.3,700,2300,700,2640,34,.9);
speedLines(tF-.2,tF+.4);

/* ================= SCENE 7: the King: "A tie! Everybody wins!" ================= */
camTo(L[7]-.45,.8,...CAM.king,'power2.inOut');
KG.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.14);KG.eyes(L[7],'happy');
tl.to('#kgArmL',{rotation:140,duration:.3,ease:'back.out(2)'},L[7]+.1);tl.to('#kgArmR',{rotation:-140,duration:.3,ease:'back.out(2)'},L[7]+.1);
hearts(W(7,3),KGX,1640-460,5,120,260);sparks(W(7,1),KGX,1640-500,6,150);
lookAll2(L[7]+.2,-10,-20);

/* ================= SCENE 8: Munch: "Share the golden pan!" — he strides in with the Golden Pan ================= */
camTo(L[8]-.5,.9,...CAM.wide2,'power2.inOut');
tl.to('#kgArmL',{rotation:0,duration:.2},L[8]);tl.to('#kgArmR',{rotation:0,duration:.2},L[8]);
tl.set('#mn',{opacity:1,x:3600,y:1640,scale:1.5},L[8]-1.9);MN.eyes(L[8]-1.9,'happy');MN.m(L[8]-1.9,'mSm');   // Munch walks in during the King's line, so he is on screen when HE speaks
tl.to('#mn',{x:MUN[0],duration:1.7,ease:'sine.inOut'},L[8]-1.85);cycle(['#mnLegL','#mnLegR'],['#mnArmL','#mnArmR'],L[8]-1.85,L[8]-.15,.7,14,8,'#mnSq',14);
[0,1].forEach(i=>{shake(L[8]-1.5+i*.7,10,5);dust(L[8]-1.35+i*.7,MUN[0]+420-i*100,1650,3);});
MN.talk(L[8]+.02,L[8]+DU[8]-.05,'mBg','mSm',.2);MN.eyes(L[8]+.02,'happy');
tl.to('#mnArmL',{rotation:-120,duration:.3},L[8]+1.2);
tl.set('#gpanW',{opacity:1,x:MUN[0]-120,y:1230},W(8,2));tl.fromTo('#gpan',{scale:.2,rotation:-20},{scale:.8,rotation:-6,duration:.5,ease:'back.out(2.2)'},W(8,2));
tl.fromTo('#gpan',{y:0},{y:-20,duration:.5,yoyo:true,repeat:6,ease:'sine.inOut'},W(8,2)+.5);
for(let k=0;k<3;k++) sparks(W(8,3)+k*.3,MUN[0]-120,1180,6,140);
lookAll2(L[8]+.3,34,-10);

/* ================= SCENE 9: "Munch made giant pancakes in it!" — a giant pancake tower goes up ================= */
tl.to('#mnArmL',{rotation:-80,duration:.2},L[9]);tl.fromTo('#mnArmL',{rotation:-80},{rotation:-130,duration:.2,yoyo:true,repeat:7},L[9]+.2);
tl.fromTo('#gpan',{rotation:-6},{rotation:6,duration:.2,yoyo:true,repeat:7},L[9]+.2);
const TW0=L[9]+.45;
tl.set('#stk',{opacity:1},TW0-.01);
for(let i=0;i<NSL;i++){const t=TW0+i*.075;tl.set('#stl'+i,{opacity:1},t);tl.fromTo('#stl'+i,{y:-1100},{y:0,duration:.26,ease:'power2.in'},t);}
tl.set('#stkTop',{opacity:1},TW0+NSL*.075+.12);sparks(TW0+NSL*.075+.12,1850,2740-480,8,170);
hearts(TW0+NSL*.075+.2,1850,2740-560,5,100,240);
faces2(L[9]+.3,'wide','O');lookAll2(L[9]+.3,0,20);
SQC.forEach((s,i)=>hop(s,TW0+.3+i*.05,40,.12,.16));
tl.to('#gh',{x:1650,y:900,duration:1.3,ease:'sine.inOut'},L[9]);

/* ================= SCENE 10: everybody: "Yummy pancakes!" ================= */
armsUp(L[10],.15);faces2(L[10],'happy','Big');eyesMode(L[10],'hearts');lookAll2(L[10],0,0);
['bo','mc','zp','cm','tf'].forEach((p,i)=>kslice(L[10]+.1+i*.12,1850,2740-420,LU[KRC[p].L]+70+(i%2?40:-30),LANE[KRC[p].L]-320,.5,.8));
SQC.forEach((s,i)=>hop(s,L[10]+.2+i*.05,44,.12,.16));JQ.forEach((s,i)=>hop(s,L[10]+.3+i*.08,60,.14,.18));
hearts(L[10]+.4,1560,1650,6,150,300);

/* ================= SCENE 11: "And that was the end of Season seven!" — dusk and fireworks ================= */
tl.fromTo('#night',{opacity:0},{opacity:.45,duration:1.0},L[11]-.2);tl.fromTo('#nStars',{opacity:0},{opacity:1,duration:1.0},L[11]);
tl.fromTo('.nst',{opacity:.3},{opacity:1,duration:.5,yoyo:true,repeat:7,stagger:.01},L[11]);
[0,.3,.6,.9,1.2,1.5].forEach((d,i)=>burst(L[11]+d,1100+i*280,700+(i%3)*160,1.8));
confetti(L[11]+.3,700,2400,700,2640,40,1.4);
SQC.forEach((s,i)=>hop(s,L[11]+.8+i*.05,44,.12,.18));
[0,.5,1.0,1.5,2.0].forEach((d,i)=>burst(tStk+d,1000+i*320,760+(i%2)*170,1.8));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:6,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

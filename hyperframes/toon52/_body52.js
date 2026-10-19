/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the sunny beach; Truffle's ice-cream stand pops up with four cones; Zap says it is melting (95 degrees), the scoops droop into puddles, Waddles blows cold air and everything freezes again,
// Gumdrop runs over and eats all the cones (they fly into his mouth), brain freeze, Mochi's smug cone, everybody shares the rest
const GMX=[1340,1860,1.05];
const CAM={wide:[380,-220,.53], tf:ECAM('tf',M52.tf), zp:ECAM('zp',M52.zp), stand:camE(1500,1600,.72,540,800), wd:ECAM('wd',WD52,1.2), gm:ECAM('gm',GMX,.85), mc:ECAM('mc',M52.mc), end:camE(1400,1750,.6,540,830)};
const tPop=L[1]+.15, tHot=W(3,3)-.1, tFrz=W(6,3), tEat=L[8]+.05, tFreeze=W(9,2);
const tStk=L[11]+DU[11]+.45;
beachLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
const meltTo=(t,sc,dur)=>{for(let i=0;i<4;i++)for(let j=1;j<=3;j++)tl.to(`#cn${i}S${j}`,{scale:sc,duration:dur,ease:'sine.inOut'},t);};

/* ================= SCENE 1: "Truffle opened an ice cream stand!" — the stand pops up, four cones appear on the counter ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,0,0);
tl.set('#standW',{opacity:1},tPop);tl.fromTo('#standW',{scale:.15},{scale:STD52[2],duration:.5,ease:'back.out(1.8)'},tPop);dust(tPop+.3,STD52[0],STD52[1]+30,2.4);sparks(tPop+.35,STD52[0],STD52[1]-300,12,260);
CNP.forEach((p,i)=>{const t=tPop+.8+i*.2;tl.set('#cnW'+i,{opacity:1},t);tl.fromTo('#cn'+i,{scale:.1},{scale:1,duration:.3,ease:'back.out(2.4)'},t);sparks(t+.2,p[0],p[1]-220,3,50);});
hop('#tfSq',tPop+.5,60,.14,.18);tl.to('#tfArmL',{rotation:150,duration:.18},tPop+.5);tl.to('#tfArmR',{rotation:-150,duration:.18},tPop+.5);

/* ================= SCENE 2: Truffle: "Fresh ice cream, everybody!" ================= */
camTo(L[2]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.13);TF.eyes(L[2],'happy');
hearts(W(2,3),M52.tf[0],M52.tf[1]-330,4,70,200);SQC.forEach((s,i)=>hop(s,W(2,3)+i*.04,36,.12,.16));faces2(W(2,3),'happy','Big');

/* ================= SCENE 3: Zap: "Beep boop! It's melting fast!" — a 95-degree sign, the scoops start to droop ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mO',.13);ZP.eyes(L[3],'wide');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[3]/.14)-1},L[3]);tl.set('#zpAnt',{rotation:0},L[3]+DU[3]);
tl.set('#thermW',{opacity:1},tHot);tl.fromTo('#therm',{scale:.1},{scale:.8,duration:.4,ease:'back.out(2.2)'},tHot);tl.to('#thermW',{opacity:0,duration:.25},L[4]-.2);
meltTo(tHot+.2,.75,.9);for(let i=0;i<4;i++) tl.to('#cn'+i+'D',{opacity:1,duration:.4},tHot+.5);

/* ================= SCENE 4: "Ice cream dripped everywhere!" — the scoops melt away into puddles ================= */
camTo(L[4]-.45,.7,...CAM.stand,'power2.inOut');
meltTo(L[4]+.15,.3,1.4);
PDP.forEach(([x,y],i)=>{const t=L[4]+.4+i*.25;tl.set(`#pud${i}W`,{opacity:1},t);tl.fromTo('#pud'+i,{scale:.1},{scale:1,duration:.9,ease:'power1.out'},t);});
faces2(L[4]+.3,'wide','O');lookAll2(L[4]+.3,0,10);

/* ================= SCENE 5: Waddles: "Penguins know cold. I'll help!" ================= */
camTo(L[5]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[5]-.1,'Gr');WDN.eyes(L[5],true);WDN.talk(L[5]+.02,L[5]+DU[5]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[5]+.3);tl.to('#wdArmR',{rotation:-140,duration:.2},L[5]+.3);hop('#wdSq',W(5,3),50,.14,.18);

/* ================= SCENE 6: "He blew, and it froze!" — a cold puff, everything is whole again ================= */
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.stand,'power2.inOut');
for(let k=0;k<5;k++) dust(W(6,1)+k*.12,WD52[0]-50-k*50,WD52[1]-280-k*40,1.4);
tl.fromTo('#coldR',{opacity:0},{opacity:.22,duration:.2,yoyo:true,repeat:1},tFrz);
meltTo(tFrz+.1,1,.5);for(let i=0;i<4;i++) tl.to('#cn'+i+'D',{opacity:0,duration:.3},tFrz);
PDP.forEach((p,i)=>{tl.to('#pud'+i,{scale:.1,duration:.5},tFrz+.1);tl.set(`#pud${i}W`,{opacity:0},tFrz+.62);});
CNP.forEach((p,i)=>{sparks(tFrz+.3+i*.12,p[0],p[1]-200,5,70);pingAt(tFrz+.25+i*.1,p[0],p[1]-200);});

/* ================= SCENE 7: Gumdrop: "Roar! I want ten scoops!" — he runs over to the stand ================= */
camTo(L[7]-.45,.7,...CAM.gm,'power2.inOut');
runTo('gm',GMX[0],GMX[1],L[7]-.5,1.0,GMX[2],20);
GM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);GM.eyes(L[7],'wide');
tl.to('#gmArmL',{rotation:110,duration:.2},L[7]+.6);tl.to('#gmArmR',{rotation:-110,duration:.2},L[7]+.6);

/* ================= SCENE 8: "Gumdrop ate them all, fast!" — the cones fly into his mouth, his belly grows ================= */
[0,1,2,3].forEach(i=>{const t=tEat+i*.5;tl.to('#cnW'+i,{x:GMX[0],y:GMX[1]-430,scale:.25,duration:.35,ease:'power2.in'},t);tl.set('#cnW'+i,{opacity:0},t+.36);sparks(t+.36,GMX[0],GMX[1]-430,5,70);
 tl.fromTo('#gmSq',{scaleY:1},{scaleY:1.07,duration:.1,yoyo:true,repeat:1},t+.34);tl.to('#gmSq',{scaleX:1+.045*(i+1),duration:.15},t+.4);});
hearts(tEat+1.6,GMX[0],GMX[1]-600,3,60,150);

/* ================= SCENE 9: Gumdrop: "Ow! My head is frozen!" — brain freeze ================= */
tl.to('#gmArmL',{rotation:150,duration:.15},L[9]+.1);tl.to('#gmArmR',{rotation:-150,duration:.15},L[9]+.1);
GM.talk(L[9]+.02,L[9]+DU[9]-.06,'mO','mBg',.12);GM.eyes(L[9],'wide');
for(let k=0;k<3;k++) pingAt(tFreeze+k*.22,GMX[0],GMX[1]-560);
tl.fromTo('#coldR',{opacity:0},{opacity:.2,duration:.25,yoyo:true,repeat:1},tFreeze);sparks(tFreeze,GMX[0],GMX[1]-620,10,180);
shiver('#gmSq',L[9]+.3,L[9]+DU[9],4);

/* ================= SCENE 10: Mochi: "Hmph. Brain freeze. Obviously." — she holds her own cone ================= */
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.mc,'power2.inOut');
tl.set('#cnW7',{opacity:1,x:M52.mc[0]+120,y:M52.mc[1]-30,scale:.42},L[10]-.2);tl.fromTo('#cn7',{scale:.1},{scale:1,duration:.3,ease:'back.out(2.4)'},L[10]-.2);
MC.m(L[10]+.1,'mFr');MC.talk(L[10]+.12,L[10]+DU[10]-.08,'mOp','mFr',.16);mcEyes(L[10]+.15,'lids');MC.brows(L[10]+.1,8,-8,2,.2);
tl.to('#mcArmL',{rotation:50,duration:.2},L[10]+.4);

/* ================= SCENE 11: "And everyone shared the rest!" — cones for Bo, Pebble and Flapjack, hearts everywhere ================= */
tl.to('#mcArmL',{rotation:0,duration:.2},L[11]-.3);
camTo(L[11]-.4,.8,...CAM.end,'power2.inOut');
[[4,M52.bo[0]+120,M52.bo[1]-30],[5,PB52[0]+90,PB52[1]-20],[6,M52.pan[0]+130,M52.pan[1]+10]].forEach(([i,x,y],k)=>{const t=L[11]+.15+k*.2;tl.set('#cnW'+i,{opacity:1,x,y,scale:.42},t);tl.fromTo('#cn'+i,{scale:.1},{scale:1,duration:.3,ease:'back.out(2.4)'},t);sparks(t+.2,x,y-150,4,60);});
faces2(L[11]+.1,'happy','Big');SQC.forEach((s,i)=>hop(s,L[11]+.5+i*.05,40,.14,.18));hearts(L[11]+.4,1250,1500,7,300,260);confetti(L[11]+.5,900,2300,1000,2000,26,.8);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:4,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

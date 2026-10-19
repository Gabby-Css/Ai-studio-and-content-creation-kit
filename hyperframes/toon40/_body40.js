/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the same spot as the end of #39 (everybody round the X, the chest locked); Truffle slots the Golden Pan's handle into the lock like a key, the lid pops open,
// Grandma Pancake is asleep inside; Flapjack finds her, Mochi says the line, Truffle cooks for everybody, a big cheer with fireworks while the sky turns to evening
const ECAM=(p,m,s=.95,sx=540,sy=780)=>camE(m[0]+EYE[p][0]*m[2],m[1]+EYE[p][1]*m[2],s,sx,sy);
const LOCKW=[CH0[0],CH0[1]-130*CH0[2]];                      // the lock (world)
const PANK=[LOCKW[0]+156,LOCKW[1]+19];                       // where the pan hangs so its handle tip touches the lock (the pan is mirrored: the handle points left)
const FJ2=[2200,ROWD-50];                                    // Flapjack's spot next to the chest
const CAM={wide:[1360,-100,.52], lock:camE(LOCKW[0],LOCKW[1]-10,1.25,540,740), chest:camE(2300,1800,.95,540,800), gmaIn:camE(2300,1790,1.5,540,780),
 bo:ECAM('bo',GAT.bo), tf:ECAM('tf',GAT.tf), mc:ECAM('mc',GAT.mc), fj:camE(2230,1900,.82,540,780), gma:ECAM('gma',GMAOUT,1.15,540,760), tfk:camE(2500,1800,.75,540,780)};
const tClick=L[4]+.05, tKey=W(3,5), tStk=L[11]+DU[11]+.5;
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}

/* ---- ambient ---- */
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#brp0 .brpl',{y:-6},{y:6,duration:.34,yoyo:true,repeat:85,ease:'sine.inOut'},0);
for(let i=1;i<BRG.n;i++) tl.fromTo('#brp'+i+' .brpl',{y:-6},{y:6,duration:.34,yoyo:true,repeat:85,ease:'sine.inOut'},i*.035);
tl.to('#canFog',{x:-140,duration:30,ease:'none'},0);tl.to('#canClouds',{x:-260,duration:30,ease:'none'},0);

/* ================= SCENE 1: "The lock looked like a pan handle!" — we start on the lock; the keyhole glows like a frying pan ================= */
camSet(0,...camE(LOCKW[0],LOCKW[1]-10,.9,540,780));camTo(.2,1.8,...CAM.lock,'sine.inOut');
faces2(0,'normal','Sm');lookAll2(0,-10,10);
tl.fromTo('#chLock',{scale:1},{scale:1.1,duration:.18,yoyo:true,repeat:3},W(1,5));sparks(W(1,5)+.05,LOCKW[0],LOCKW[1]+20,6,80);

/* ================= SCENE 2: Bo: "Truffle, the Golden Pan!" ================= */
camTo(L[2]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);eyesMode(L[2]+.02,'wide');brows(L[2]+.05,14,-14,-4,.15);
tl.to('#boArmR',{rotation:-82,duration:.2},L[2]+.15);hop('#boSq',L[2]+.2,50,.12,.16);hop('#boSq',W(2,3),60,.12,.16);
faces2(L[2]+.1,'wide','Big');lookAll2(L[2]+.1,34,-6);

/* ================= SCENE 3: Truffle: "Here you go! One golden key!" — she slots the pan's handle into the lock ================= */
tl.to('#boArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.13);TF.eyes(L[3],'happy');
tl.set('#gpanW',{opacity:1,x:GAT.tf[0]-40,y:GAT.tf[1]-330,scaleX:-.55,scaleY:.55},L[3]-.25);tl.fromTo('#gpan',{scale:.2},{scale:1,duration:.4,ease:'back.out(2.2)'},L[3]-.25);sparks(L[3]-.1,GAT.tf[0]-40,GAT.tf[1]-330,6,100);
tl.to('#tfArmL',{rotation:110,duration:.2},L[3]+.2);
tl.to('#gpanW',{x:PANK[0],y:PANK[1],duration:.6,ease:'power2.inOut'},W(3,3));
camTo(W(3,3)-.1,.7,...CAM.tfk,'power2.inOut');

/* ================= SCENE 4: "Click! The chest popped open!" ================= */
camTo(L[4]-.4,.6,...CAM.chest,'power2.inOut');
tl.fromTo('#chLock',{rotation:0},{rotation:-12,duration:.05,yoyo:true,repeat:3},tClick-.1);
tl.to('#chLock',{y:70,rotation:30,opacity:0,duration:.35,ease:'power2.in'},tClick);
tl.to('#chLid',{y:-60,scaleY:.7,rotation:-3,duration:.4,ease:'back.out(2.2)'},tClick+.05);
tl.to('#chGlow',{opacity:.9,duration:.3},tClick+.05);tl.set('#chCoins',{opacity:1},tClick+.05);
tl.set('#gma',{opacity:1},tClick+.1);tl.fromTo('#gma',{y:GMAIN[1]+60},{y:GMAIN[1],duration:.35,ease:'back.out(1.6)'},tClick+.1);
sparks(tClick+.1,2300,1760,12,260);shake(tClick,10,6);dust(tClick+.1,2150,1990,1.6);dust(tClick+.12,2450,1990,1.6);
tl.to('#gpanW',{opacity:0,duration:.3},tClick+.3);tl.to('#tfArmL',{rotation:0,duration:.2},tClick+.3);
faces2(tClick,'wide','O');lookAll2(tClick,0,-12);hearts(tClick+.3,2300,1600,5,120,260);

/* ================= SCENE 5: "Inside, a tiny pancake was napping!" — a close-up on sleepy Grandma ================= */
camTo(L[5]-.4,.7,...CAM.gmaIn,'power2.inOut');
tl.set('#zzW',{opacity:1,x:2330,y:1700},L[5]);
for(let i=0;i<3;i++) for(let r=0;r<2;r++) tl.fromTo('#zz'+i,{y:0,opacity:0},{y:-60,opacity:1,duration:.6,yoyo:true,repeat:1,ease:'sine.inOut'},L[5]+.1+i*.3+r*1.5);
tl.fromTo('#gmaSq',{y:0},{y:-6,duration:.7,yoyo:true,repeat:5,ease:'sine.inOut'},L[5]);
faces2(L[5]+.2,'normal','Sm');lookAll2(L[5]+.2,0,-8);
runTo('pan',FJ2[0],FJ2[1],L[5]+.5,1.0,.9,16);

/* ================= SCENE 6: Flapjack: "Grandma? Is that you?" ================= */
camTo(L[6]-.45,.7,...CAM.fj,'power2.inOut');
FJ.pm(L[6],'Oh');FJ.eyes(L[6],true);FJ.talk(L[6]+.1,L[6]+DU[6]-.05,'Gr','Sm',.13);
tl.to('#panArmR',{rotation:70,duration:.2},L[6]+.2);hop('#panSq',W(6,3),30,.1,.14);hearts(W(6,3),FJ2[0],FJ2[1]-170,3,60,160);
lookAll2(L[6]+.2,10,-6);

/* ================= SCENE 7: Grandma: "Who woke me? Is it Sunday?" — she wakes up, yawns and stretches ================= */
camTo(L[7]-.45,.7,...ECAM('gma',[GMAIN[0],GMAIN[1]-50,GMAIN[2]],1.3,540,780),'power2.inOut');
tl.to('#panArmR',{rotation:0,duration:.2},L[7]-.3);
tl.to('#zzW',{opacity:0,duration:.2},L[7]-.3);
GMAN.eyes(L[7]-.2,true);GMAN.pm(L[7]-.2,'Oh');GMAN.talk(L[7]+.1,L[7]+DU[7]-.05,'Gr','Sm',.15);
tl.to('#gma',{y:GMAIN[1]-50,duration:.4,ease:'power2.out'},L[7]-.15);
tl.to('#gmaArmL',{rotation:140,duration:.25},L[7]+.2);tl.to('#gmaArmR',{rotation:-140,duration:.25},L[7]+.2);
tl.to('#gmaBlk',{y:50,opacity:0,duration:.35},L[7]+.1);tl.fromTo('#gmaCap',{rotation:-6},{rotation:6,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},L[7]+.2);
faces2(L[7]+.2,'wide','Big');lookAll2(L[7]+.2,0,-10);

/* ================= SCENE 8: Mochi: "Hmph. The treasure is family. Obviously." ================= */
camTo(L[8]-.45,.7,...CAM.mc,'power2.inOut');
tl.to('#gmaArmL,#gmaArmR',{rotation:0,duration:.2},L[8]-.2);
MC.m(L[8]+.1,'mFr');MC.talk(L[8]+.12,L[8]+DU[8]-.08,'mOp','mFr',.16);mcEyes(L[8]+.15,'lids');MC.brows(L[8]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.25},W(8,2));mcEyes(W(8,4),'happy');hearts(W(8,4),GAT.mc[0],GAT.mc[1]-330,4,80,220);
faces2(W(8,4),'happy','Sm');

/* ================= SCENE 9: Truffle: "Pancakes for everybody!" — she flips pancakes to the whole crew ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.13);TF.eyes(L[9],'happy');
tl.set('#gpanW',{opacity:1,x:GAT.tf[0]-100,y:GAT.tf[1]-150,scaleX:.6,scaleY:.6},L[9]-.2);
tl.to('#tfArmL',{rotation:110,duration:.2},L[9]);
const TGT=[[FJ2[0],FJ2[1]-170],[2300,1700],[GAT.bo[0],GAT.bo[1]-300],[GAT.mc[0],GAT.mc[1]-300],[GAT.cm[0],GAT.cm[1]-300]];
TGT.forEach(([x,y],k)=>{const t=L[9]+.15+k*.3;
 tl.set('#fckW',{opacity:1,x:GAT.tf[0]-100,y:GAT.tf[1]-170},t);tl.fromTo('#fck',{scale:.7,rotation:0},{scale:1,rotation:360,duration:.5,ease:'none'},t);
 tl.to('#fckW',{x,duration:.5,ease:'power1.inOut'},t);tl.fromTo('#fckW',{y:GAT.tf[1]-170},{y:y-60,duration:.25,ease:'power2.out'},t);tl.to('#fckW',{y,duration:.25,ease:'power2.in'},t+.25);
 tl.set('#fckW',{opacity:0},t+.52);sparks(t+.5,x,y,4,60);hearts(t+.5,x,y-40,2,50,120);});
tl.to('#gma',{x:GMAOUT[0],y:GMAOUT[1],duration:.55,ease:'power1.inOut'},L[9]+.7);tl.to('#gmaK',{y:GMAOUT[1],duration:.1},L[9]+.7);
tl.fromTo('#gmaSq',{y:0},{y:-60,duration:.28,yoyo:true,repeat:1,ease:'sine.inOut'},L[9]+.7);
tl.to('#chCoins',{opacity:1},L[9]);

/* ================= SCENE 10: everybody: "Happy pancake treasure day!" — cheers, confetti and fireworks ================= */
camTo(L[10]-.45,.8,...CAM.wide,'power2.inOut');
tl.to('#gpanW',{opacity:0,duration:.3},L[10]-.3);tl.to('#tfArmL',{rotation:0,duration:.2},L[10]-.3);
faces2(L[10]-.1,'happy','Big');lookAll2(L[10],0,-14);armsUp(L[10]+.05,.15);GMAN.eyes(L[10],true);GMAN.pm(L[10],'Gr');
tl.to('#gmaArmL',{rotation:140,duration:.2},L[10]+.05);tl.to('#gmaArmR',{rotation:-140,duration:.2},L[10]+.05);tl.to('#panArmL',{rotation:140,duration:.2},L[10]+.05);tl.to('#panArmR',{rotation:-140,duration:.2},L[10]+.05);
SQC.forEach((s,i)=>hop(s,L[10]+.1+i*.05,60,.14,.2));JQ.forEach((s,i)=>hop(s,L[10]+.2+i*.08,50,.12,.16));hop('#gmaSq',L[10]+.2,50,.14,.2);hop('#panSq',L[10]+.25,50,.14,.2);
confetti(L[10]+.1,1600,3000,1000,2400,44,1.0);hearts(L[10]+.3,2300,1500,6,140,260);
tl.to('#duskR',{opacity:.3,duration:1.4},L[10]);
burst(L[10]+.5,1950,1000,1.6);burst(L[10]+1.0,2700,900,1.8);burst(L[10]+1.4,2300,760,2.0);

/* ================= SCENE 11: "And that was the end of Season eight!" — evening falls, everybody waves, fireworks ================= */
tl.to('#night',{opacity:.36,duration:1.3},L[11]-.2);tl.to('#nStars',{opacity:1,duration:1.3},L[11]);tl.to('#duskR',{opacity:.12,duration:1.0},L[11]);
for(let i=0;i<5;i++) burst(L[11]+.2+i*.55,1900+(i*379)%1100,800+(i*173)%500,1.6+(i%3)*.2);
burst(tStk-.1,2300,820,2.2);
tl.to('#cam',{x:-(1300*.54),y:-(-80*.54),scale:.54,duration:3.0,ease:'sine.inOut'},L[11]);camCur=[1300,-80,.54];
['bo','tf','mc','zp','cm','nm','pt','bp'].forEach((p,i)=>{tl.fromTo(`#${p}ArmL`,{rotation:150},{rotation:100,duration:.25,yoyo:true,repeat:5,ease:'sine.inOut'},L[11]+.3+i*.04);});
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

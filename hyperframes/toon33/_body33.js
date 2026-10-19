/* ===== this episode's key moments (all derived from the voice timings) ===== */
// shot logic: scenes 1-4 tracking shot (scenery scrolls; it slows to a stop as Mochi's kart limps), then a still wide shot while the friends gather and fix the wheel,
// finally the scenery speeds up again and everybody races off together.
const PBU=1/PBS;
const V0=1500;
const tPop=W(3,4);                                         // "...POP!"
const tStop=L[4]+1.6;                                      // the scenery is completely still from here
const tGoAgain=W(11,0)-.1;                                 // ... and starts again
const WIDE3=[700,560,.66];                                 // the still wide shot (view x 700..2336): Bo is already in it at the left edge when he speaks
const MX=P33.mc, MWH=gsap.utils.toArray('#kmcW .wh');       // Mochi's kart x; MWH[0] = rear wheel, MWH[1] = front wheel
const tFix=W(9,3), tOK=L[10];
const CAM={wide:RACE, wide3:WIDE3,
 mc:camE(MX,EYEY('mc',.6),1.15,540,660), wheel:camE(MX-80,LANE[3]-60,1.7,540,780),
 tf:camE(P33.tf,EYEY('tf',.6),1.2,540,680), roll:camE(1700,LANE[3]-120,.95,540,820), zp:camE(P33.zp,EYEY('zp',.58),1.2,540,680),
 mc2:camE(1960,EYEY('mc',.6),1.15,540,660), out:RACE};
const tStk=L[11]+DU[11]+.35;
scrollProfile([[0,V0],[tPop+.2,V0],[tStop,0],[tGoAgain,0],[tGoAgain+1.2,V0],[30,V0]],30);

/* ================= SCENE 1: "Mochi was winning the race!" ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','Big');lookAll2(0,30,0);
wheels(0,tPop+.2,6);speedLines(.2,tPop);
['cm','tf','zp','mc'].forEach((p,i)=>bumpKart(p,.3+i*.05,tPop,6,.2+i*.02));bumpKart('bo',.3,tPop,6,.22);
PB.eyes(.2,'wide');PB.m(.2,'mBg');
tl.set('#kmcW .kfl',{opacity:1},.4);tl.fromTo('#kmcW .kfl',{scaleX:.6},{scaleX:1.3,duration:.07,yoyo:true,repeat:40},.4);
for(let t=.5;t<tPop;t+=.5){trail(t,P33.mc-130,LANE[3]+6,1.0);trail(t+.17,P33.zp-130,LANE[2]+6,1.0);}

/* ================= SCENE 2: Mochi: "Nobody can catch me. Obviously." ================= */
camTo(L[2]-.4,.7,...CAM.mc,'power2.inOut');
MC.m(L[2]+.1,'mFr');MC.talk(L[2]+.12,L[2]+DU[2]-.08,'mOp','mFr',.16);mcEyes(L[2]+.15,'lids');MC.brows(L[2]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-50,duration:.25},W(2,3));
tl.fromTo('#kmcS',{rotation:0},{rotation:-4,duration:.15,yoyo:true,repeat:5,ease:'sine.inOut'},W(2,0));
lookAll2(L[2]+.3,20,-10);

/* ================= SCENE 3: "Then her wheel went pop!" — a pancake wheel bursts off the kart ================= */
camTo(L[3]-.4,.5,...CAM.wheel,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[3]);mcEyes(L[3]+.1,'wide');MC.m(L[3]+.1,'mO');
tl.set('#popW',{opacity:1,x:MX-90,y:LANE[3]-110},tPop-.03);tl.fromTo('#pop',{scale:.1,rotation:-12},{scale:.8,rotation:4,duration:.3,ease:'back.out(2.6)'},tPop-.03);tl.to('#popW',{opacity:0,duration:.25},tPop+.65);
tl.to(MWH[0],{x:420,y:-620,rotation:900,duration:.7,ease:'power2.out'},tPop);tl.to(MWH[0],{x:760,y:260,rotation:1500,opacity:0,duration:.7,ease:'power2.in'},tPop+.7);
tl.to('#kmcS',{rotation:-11,duration:.25,ease:'back.out(2)'},tPop);tl.to('#mcLean',{rotation:9,duration:.25},tPop);
bits(tPop,MX-90,LANE[3]-60,8);sparks(tPop,MX-90,LANE[3]-60,8,120);shake(tPop,10,6);
tl.set('.kfl',{opacity:0},tPop);

/* ================= SCENE 4: Mochi: "Meow! My wheel!" ================= */
camTo(L[4]-.3,.5,...CAM.mc,'power2.inOut');
MC.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mOp',.14);mcEyes(L[4],'wide');MC.brows(L[4],-10,10,2,.12);
tl.fromTo('#mcSq',{y:0},{y:-18,duration:.1,yoyo:true,repeat:5},L[4]);
tl.fromTo('#kmcS',{rotation:-11},{rotation:-8,duration:.12,yoyo:true,repeat:9},L[4]);
for(let k=0;k<7;k++) sparks(L[4]+k*.2,MX-100,LANE[3]-6,3,50);
tl.to('#mcArmL',{rotation:140,duration:.15},L[4]+.4);tl.to('#mcArmR',{rotation:-140,duration:.15},L[4]+.4);
// the others coast to a halt while Bo (far behind) charges in from the left
[['tf',P33.tf],['zp',P33.zp],['cm',P33.cm]].forEach(([p,x],i)=>{wheels(L[4]+.8,tStop,2.5);});
// Bo and Pebble drop back (unseen in the close-up) so that they can zoom in again
tl.set('#kboW',{x:150},L[4]+.55);tl.set('#bo',{x:bx(150)},L[4]+.55);tl.set('#pb',{x:150+PK[0]},L[4]+.55);
driveBo(L[4]+.65,.95,900,'power2.out');                    // ... and he drives back in while the camera is still on Mochi: he is in the wide shot BEFORE his line starts

/* ================= SCENE 5: Bo: "Stop! Mochi needs help!" — a still wide shot, Bo zooms in from the left ================= */
camTo(L[5]-.5,.8,...CAM.wide3,'power2.inOut');
tl.to('#mcArmL',{rotation:0,duration:.2},L[5]-.2);tl.to('#mcArmR',{rotation:0,duration:.2},L[5]-.2);tl.to('#mcLean',{rotation:0,duration:.2},L[5]-.2);
bTalk(L[5]+.02,L[5]+DU[5]-.06);brows(L[5]+.05,14,-14,-4,.15);eyesMode(L[5]+.05,'wide');look(L[5]+.05,30,-6,.12);
driveBo(L[5]+.05,1.3,1200,'sine.out');wheels(L[5]-.1,L[5]+1.5,6);speedLines(L[5]+.05,L[5]+1.4);
tl.to('#boArmL',{rotation:-110,duration:.2},L[5]+.1);tl.to('#boArmR',{rotation:110,duration:.2},L[5]+.1);
PB.eyes(L[5],'wide');PB.m(L[5],'mO');
for(let k=0;k<5;k++) trail(L[5]+.1+k*.2,900+(1200-900)*Math.min(1,(k*.2+.1)/1.3)-120,LANE[4]+6,1.1);
// the pack waits (still), they all look at Mochi's kart
lookAll2(L[5]+.3,30,0);

/* ================= SCENE 6: "Bo skidded to a stop." ================= */
driveBo(L[6]-.1,1.1,1500,'power3.out');
tl.fromTo('#kboS',{rotation:0},{rotation:14,duration:.25,ease:'power2.out'},L[6]-.05);tl.to('#kboS',{rotation:-6,duration:.3},L[6]+.25);tl.to('#kboS',{rotation:0,duration:.3},L[6]+.55);
tl.to('#boLean',{rotation:-12,duration:.25},L[6]-.05);tl.to('#boLean',{rotation:0,duration:.4},L[6]+.4);
for(let k=0;k<5;k++) dust(L[6]+k*.14,1220+k*60,LANE[4]+10,1.8);
shake(L[6]+.8,8,5);tl.to('#boArmL',{rotation:0,duration:.2},L[6]+.6);tl.to('#boArmR',{rotation:0,duration:.2},L[6]+.6);
faces2(L[6]+.9,'normal','Sm');lookAll2(L[6]+.9,30,0);
tl.to('#mcArmR',{rotation:-60,duration:.25},L[6]+.9);

/* ================= SCENE 7: Truffle: "Use a pancake wheel!" ================= */
camTo(L[7]-.4,.6,...CAM.tf,'power2.inOut');
TF.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);TF.eyes(L[7],'happy');
tl.to('#tfArmL',{rotation:140,duration:.2},L[7]+.1);tl.fromTo('#tfArmL',{rotation:140},{rotation:100,duration:.18,yoyo:true,repeat:5},L[7]+.3);
tl.fromTo('#ktfS',{rotation:0},{rotation:-3,duration:.12,yoyo:true,repeat:7},L[7]+.4);
hearts(W(7,2),P33.tf,FEET('tf')-300,4,80,220);

/* ================= SCENE 8: "Pebble rolled a pancake over!" — he hops out and rolls a big pancake wheel to Mochi ================= */
camTo(L[8]-.4,.7,...CAM.roll,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[8]);
const GX=1560;
tl.set('#whlW',{opacity:1,x:1590,y:LANE[4]-30,scale:.8},L[8]+.2);
arc('#pb',L[8]+.1,.6,FEET('bo')+PK[1],380,LANE[4]+20);tl.to('#pb',{x:1650,duration:.6,ease:'none'},L[8]+.1);
PB.eyes(L[8]+.1,'happy');PB.m(L[8]+.1,'mBg');
tl.to('#whlW',{x:MX-80,y:LANE[3]+4,duration:1.15,ease:'sine.inOut'},L[8]+.65);tl.to('#whlR',{rotation:-760,duration:1.15,ease:'sine.inOut'},L[8]+.65);
tl.to('#pb',{x:MX-190,y:LANE[3]+30,duration:1.15,ease:'sine.inOut'},L[8]+.65);
cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],L[8]+.7,L[8]+1.8,.24,22,16,'#pbSq',22);
tl.to('#pbArmL',{rotation:-70,duration:.2},L[8]+.65);tl.to('#pbArmR',{rotation:-70,duration:.2},L[8]+.65);
dust(L[8]+.8,1750,LANE[4]+10,1.0);dust(L[8]+1.3,1900,LANE[3]+10,1.0);
lookAll2(L[8]+.3,30,10);

/* ================= SCENE 9: Zap: "Beep boop! Wheel fixed!" ================= */
camTo(L[9]-.45,.6,...CAM.zp,'power2.inOut');
ZP.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.13);ZP.eyes(L[9],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[9]);tl.set('#zpAnt',{rotation:0},L[9]+DU[9]);
tl.to('#zpArmL',{rotation:100,duration:.2},L[9]+.15);
for(let k=0;k<3;k++) pingAt(L[9]+.15+k*.3,P33.zp+60,LANE[2]-140);
// the new wheel goes on (the loose one disappears, the repaired kart pops back up)
tl.set('#whlW',{opacity:0},tFix-.02);tl.set(MWH[0],{x:0,y:0,rotation:0,opacity:1},tFix-.02);
tl.to('#kmcS',{rotation:0,duration:.25,ease:'back.out(2.4)'},tFix);
tl.fromTo('#mcSq',{y:0},{y:-24,duration:.12,yoyo:true,repeat:1},tFix);
sparks(tFix,MX-90,LANE[3]-60,8,120);

/* ================= SCENE 10: Mochi: "Hmph. Thank you. Obviously." ================= */
camTo(L[10]-.4,.7,...CAM.mc2,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.2},L[10]);tl.to('#pbArmL',{rotation:0,duration:.2},L[10]);tl.to('#pbArmR',{rotation:0,duration:.2},L[10]);
MC.m(L[10]+.1,'mFr');MC.talk(L[10]+.12,L[10]+DU[10]-.08,'mOp','mFr',.17);mcEyes(L[10]+.15,'lids');MC.brows(L[10]+.1,8,-8,2,.2);
mcEyes(W(10,1),'happy');MC.m(W(10,1),'mSm');
hearts(W(10,2),1960,EYEY('mc',.6)-100,4,70,200);
tl.to('#mcArmR',{rotation:-40,duration:.25},W(10,1));

/* ================= SCENE 11: "Now they all raced together!" — everybody lines up and zooms off ================= */
camTo(tGoAgain-.3,.9,...CAM.out,'power2.inOut');
tl.set('.kfl',{opacity:1},tGoAgain);tl.fromTo('.kfl',{scaleX:.5},{scaleX:1.3,duration:.07,yoyo:true,repeat:30},tGoAgain);
armsDown(tGoAgain,.2);faces2(tGoAgain,'happy','Big');lookAll2(tGoAgain,34,0);
wheels(tGoAgain,tStk+2,6);speedLines(tGoAgain+.4,tStk+2);
// they tuck back into the pack positions (screen: scenery moves, they stay)
const GO33={mc:1800,tf:1550,zp:1350,cm:1150};
Object.entries(GO33).forEach(([p,x],i)=>drive(p,tGoAgain+.05+i*.04,.9,x,'power2.inOut'));
driveBo(tGoAgain+.1,.9,950,'power2.inOut');tl.to('#pb',{y:FEET('bo')+PK[1],duration:.6},tGoAgain);
tl.set('#spdW',{opacity:1},tGoAgain+.5);
for(let t=tGoAgain+.4;t<tStk+1.5;t+=.5){trail(t,P33.mc-130,LANE[3]+6,1.0);trail(t+.17,P33.zp-130,LANE[2]+6,1.0);}
['cm','tf','zp','mc'].forEach((p,i)=>bumpKart(p,tGoAgain+.6+i*.05,tStk+1.5,6,.2+i*.02));bumpKart('bo',tGoAgain+.6,tStk+1.5,6,.22);
tl.to('#boArmL',{rotation:-150,duration:.2},W(11,4));tl.to('#boArmR',{rotation:150,duration:.2},W(11,4));
tl.to('#pbArmL',{rotation:150,duration:.2},W(11,4));tl.to('#pbArmR',{rotation:-150,duration:.2},W(11,4));eyesMode(W(11,4),'hearts');
confetti(W(11,4),600,2300,600,2640,30,.9);hearts(W(11,4)+.1,1500,1650,5,140,280);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

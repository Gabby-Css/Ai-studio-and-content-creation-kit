/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: night on the lawn, the gang in a ring round the glowing egg (Mochi left, Bo right, Truffle+Zap further right, the Jiggles in front);
// the egg cracks, splits along its seam (cap flies off), baby Pebble peeks out of the shell, hops over to Bo, eats a pancake and turns pink
const tH=W(4,2);                                           // the third CRACK: the egg splits open
const EGC=EGY-262*EGS;                                     // world y of the egg's centre
const BB=[1430,EGY+100];                                   // where the baby waits by Bo's feet
const BMOUTH=[BB[0],BB[1]-410*PBS];                         // his mouth, world coords (head at -400, mouth at -10, scale .3)
const CAM={wide:[380,-220,.53], mid:[1000,740,.75],
 mc:camOn(...eyeAt('mc',800,ROWD,.74),.95,540,780), egg:[689,1026,1.1],
 bo:camOn(...eyeAt('bo',1500,ROWD+BOY,.88),.85,700,780), baby:[939,971,1.1],
 tf:camOn(...eyeAt('tf',1790,ROWD,.74),.95,640,780), fin:[760,700,.7]};
const tStk=L[11]+DU[11]+1.0;
const PBU=1/PBS;                                            // baby Pebble is drawn at scale .3: his own (#pbSq) offsets are in unscaled units

/* ================= SCENE 1: "That night, the egg began to glow!" ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,-6,10);
camTo(.3,2.2,...CAM.mid,'sine.inOut');
tl.to('#egFxW',{opacity:.42,duration:2.0},.4);tl.to('#eggGlow',{opacity:.7,duration:1.6},.3);
eggWobble(1.0,3,5);eggWobble(W(1,6)-.1,5,6,.08);
hearts(W(1,6),EGX,EGC-300,4,100,240);

/* ================= SCENE 2: the Jiggles: "It's cracking! It's cracking!" — the first cracks ================= */
['j1','j2','j3','j4'].forEach((j,i)=>{const J=[J1,J2,J3,J4][i];J.talk(L[2]+.02+i*.03,L[2]+DU[2]-.05,'mBg','mSm',.13);J.eyes(L[2],'wide');
 tl.to(`#${j}ArmL`,{rotation:150,duration:.12},L[2]);tl.to(`#${j}ArmR`,{rotation:-150,duration:.12},L[2]);});
JQ.forEach((s,i)=>hop(s,L[2]+.1+i*.08,70,.12,.16));
crack('ecr0',W(2,1)-.05,1,.25);crack('ecr1',W(2,3)-.05,1,.25);
eggWobble(W(2,1),5,6,.07);eggWobble(W(2,3),6,6,.07);
sparks(W(2,1),EGX,EGC-250,6,160);

/* ================= SCENE 3: Mochi: "Hmph. Stand back. Obviously." — everybody takes a step back ================= */
camTo(L[3]-.45,.8,...CAM.mc,'power2.inOut');
MC.m(L[3]+.1,'mFr');MC.talk(L[3]+.12,L[3]+DU[3]-.08,'mOp','mFr',.16);mcEyes(L[3]+.15,'lids');MC.brows(L[3]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-100,duration:.25},W(3,1)-.1);
tl.to('#mc',{x:730,duration:.5,ease:'power2.out'},W(3,1));tl.to('#bo',{x:1560,duration:.5,ease:'power2.out'},W(3,1));tl.to('#tf',{x:1850,duration:.5,ease:'power2.out'},W(3,1));
crack('ecr2',W(3,1),1,.3);eggWobble(W(3,3)-.3,8,10,.06);
lookAll2(L[3]+.3,0,10);

/* ================= SCENE 4: "Crack, crack, CRACK!" — the egg splits along its seam, the cap flies off ================= */
camTo(L[4]-.35,.5,...CAM.egg,'power2.in');
[0,1,2].forEach(i=>{const t=W(4,i);crack('ecr3',t,[.34,.67,1][i],.12);tl.fromTo('#flash',{opacity:.45},{opacity:0,duration:.25},t);shake(t,9,5);eggBump(t,26+i*10);sparks(t,EGX+(i-1)*90,EGC-60+i*20,6,150);});
tl.to('#egFxW',{opacity:.7,duration:.3},tH-.2);
// the egg falls apart into a cap and a base; the inside of the shell shows, the baby pops up inside
tl.set('#eggFull',{opacity:0},tH);tl.set('#eggBase,#eggCap',{opacity:1},tH);tl.set('.ecr',{opacity:0},tH);
tl.to('#eggCap',{y:-430,x:170,rotation:38,duration:.5,ease:'power2.out'},tH);tl.to('#eggCap',{y:210,x:320,rotation:84,opacity:0,duration:.6,ease:'power2.in'},tH+.5);
tl.set('#eggBackW',{opacity:1},tH);
tl.set('#pb',{opacity:1,x:EGX,y:EGY-12,scale:PBS},tH);tl.fromTo('#pbSq',{y:-40*PBU},{y:-140*PBU,duration:.35,ease:'back.out(2.2)'},tH+.05);
PB.eyes(tH,'wide');PB.m(tH,'mO');PB.look(tH,0,10,.1);
bits(tH,EGX-120,EGC-100,8);bits(tH+.03,EGX+120,EGC-100,8);sparks(tH,EGX,EGC-200,12,260);
tl.set('#raysW',{opacity:1},tH);tl.fromTo('#rays',{scale:.2,rotation:0},{scale:1.4,rotation:40,duration:.9,ease:'power2.out'},tH);tl.to('#raysW',{opacity:0,duration:.5},tH+.5);
tl.to('#egFxW',{opacity:.2,duration:.8},tH+.4);tl.to('#eggGlow',{opacity:.2,duration:.8},tH+.4);
faces2(tH+.1,'wide','O');lookAll2(tH+.1,-10,6);

/* ================= SCENE 5: Bo: "It's a baby Munch!" ================= */
camTo(L[5]-.4,.7,...CAM.bo,'power2.inOut');
bTalk(L[5]+.02,L[5]+DU[5]-.08);brows(L[5]+.05,0,0,-4,.15);eyesMode(L[5]+.05,'wide');look(L[5]+.05,-30,24,.12);
tl.to('#boArmL',{rotation:-120,duration:.2},L[5]+.3);tl.to('#boArmR',{rotation:120,duration:.2},L[5]+.3);
hop('#boSq',L[5]+.35,50,.15,.2);
PB.eyes(L[5]+.1,'normal');PB.m(L[5]+.1,'mSm');PB.look(L[5]+.1,34,6,.15);

/* ================= SCENE 6: the baby: "Bo-bo! Bo-bo!" — he hops out of the shell and waddles over to Bo ================= */
camTo(L[6]-.35,.7,...CAM.baby,'power2.inOut');
PB.talk(L[6]+.02,L[6]+DU[6]-.05,'mBg','mSm',.14);PB.eyes(L[6],'happy');
tl.fromTo('#pbSq',{y:-140*PBU},{y:0,duration:.5,ease:'bounce.out'},L[6]);
tl.to('#pb',{x:EGX+90,y:EGY+100,duration:.45,ease:'power1.inOut'},L[6]);
tl.to('#pb',{x:BB[0],y:BB[1],duration:.8,ease:'sine.inOut'},L[6]+.55);cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],L[6]+.55,L[6]+1.35,.24,22,10,'#pbSq',30);
tl.to('#boArmL',{rotation:0,duration:.2},L[6]);tl.to('#boArmR',{rotation:0,duration:.2},L[6]);
tl.to('#pbArmL',{rotation:150,duration:.2},L[6]+1.4);tl.to('#pbArmR',{rotation:-150,duration:.2},L[6]+1.4);

/* ================= SCENE 7: Bo: "Aww! He knows my name!" ================= */
bTalk(L[7]+.02,L[7]+DU[7]-.08);eyesMode(L[7]+.05,'hearts');
tl.to('#boLean',{rotation:10,duration:.3},L[7]+.1);
hearts(L[7]+.3,1467,1320,5,90,260);hop('#pbSq',L[7]+.2,40*PBU,.12,.16);hop('#pbSq',L[7]+.6,40*PBU,.12,.16);
PB.eyes(L[7],'happy');PB.m(L[7],'mBg');

/* ================= SCENE 8: Truffle: "He must be hungry! Pancakes!" ================= */
camTo(L[8]-.4,.8,...CAM.tf,'power2.inOut');
tl.to('#boLean',{rotation:0,duration:.3},L[8]);
TF.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);TF.eyes(L[8],'happy');
tl.to('#tfArmL',{rotation:100,duration:.2},W(8,4)-.1);
tl.set('#pileW',{opacity:1},W(8,4));tl.fromTo('#pile',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.2)'},W(8,4));
sparks(W(8,4)+.1,1500,2200,8,140);
PB.m(L[8],'mSm');PB.eyes(L[8],'wide');PB.look(L[8],30,-10,.12);

/* ================= SCENE 9: "The baby took one tiny bite..." ================= */
camTo(L[9]-.4,.8,...CAM.baby,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[9]);
PB.m(W(9,3),'mBg');
kslice(W(9,5)-.55,1500,2230,BMOUTH[0],BMOUTH[1],.55,.7);
tl.set('#pileW',{opacity:0},W(9,5)+.3);
PB.talk(W(9,5)+.05,L[10]-.08,'mBg','mSm',.17);PB.eyes(W(9,5),'happy');
sparks(W(9,5),BMOUTH[0],BMOUTH[1]-40,5,80);

/* ================= SCENE 10: the baby: "Yum, yum, yummy!" ================= */
PB.talk(L[10]+.02,L[10]+DU[10]-.05,'mBg','mSm',.14);
[0,1,2].forEach(i=>hop('#pbSq',W(10,i),(50+i*20)*PBU,.12,.16));
tl.to('#pbArmL',{rotation:150,duration:.12},L[10]);tl.to('#pbArmR',{rotation:-150,duration:.12},L[10]);

/* ================= SCENE 11: "...and turned pink and sparkly!" — the colour floods in ================= */
tl.to('#fSatM',{attr:{values:1},duration:1.0,ease:'power1.inOut'},W(11,1)-.1);
tl.to('#night',{opacity:.12,duration:1.4},W(11,1));
[0,.2,.4,.6].forEach((d,i)=>sparks(W(11,1)+d,BB[0]+(i%2?50:-50),BB[1]-360+i*30,8,170+i*20));
hearts(W(11,2),BB[0],BB[1]-420,6,110,300);
camTo(L[11]-.15,1.0,...CAM.fin,'power2.inOut');
armsUp(W(11,3),.15);faces2(W(11,3),'happy','Big');eyesMode(W(11,3),'hearts');lookAll2(W(11,3),0,0);
SQC.forEach((s,i)=>hop(s,W(11,3)+.1+i*.05,44,.12,.16));JQ.forEach((s,i)=>hop(s,W(11,3)+.15+i*.08,60,.14,.18));
hop('#pbSq',W(11,3)+.1,70*PBU,.14,.2);hop('#pbSq',W(11,3)+.7,70*PBU,.14,.2);
confetti(W(11,3),700,2300,ROWB-1500,ROWJ+160,34,.9);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

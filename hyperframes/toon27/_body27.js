/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: Truffle's campfire next to the egg, Mochi stares it out, Zap reads "37°", Gumdrop hugs the egg from behind (too hard!),
// the egg rolls away along the front of the stage, the pack chases it, Bo races ahead, Boo drapes over the egg, Bo catches it
const TR0=W(6,5)-.1, RD=6.8, ENDX=2430, ENDY=2200;       // the egg rolls from its mark to (ENDX,ENDY), faster and faster (power2.in)
const eggP=(t)=>{const u=Math.min(1,Math.max(0,(t-TR0)/RD));return u*u;};
const eggPos=(t)=>[EGX+(ENDX-EGX)*eggP(t), EGY+(ENDY-EGY)*eggP(t)];
const BOF=[2690,2290];                                     // where Bo waits to catch it
const CAM={wide:[380,-220,.53],
 tf:camOn(...eyeAt('tf',1560,ROWD,.74),.95,640,780),
 mc:camOn(...eyeAt('mc',800,ROWD,.74),.95,540,780),
 zap:[800,840,.8], gm:[425,394,.8], egg:[560,700,.75],
 bo:camOn(...eyeAt('bo',BOF[0],BOF[1],.88),.85,700,780), boo:[1709,665,.7], fin:[1825,820,.8]};
const EGC=EGY-262*EGS;
const tStk=L[11]+DU[11]+.35;
let smn=0;
function smoke(t,x,y,n=1){for(let k=0;k<n;k++){const i=(smn++)%8,tt=t+k*.1;
 tl.set('#smw'+i,{x:x,y:y},tt);
 tl.fromTo('#sm'+i,{opacity:.9,scale:.4,y:0},{opacity:0,scale:1.6,y:-60,duration:.8,ease:'power1.out'},tt);}}
// run behind the rolling egg (dx behind it) on row y
function follow(p,t0,t1,dx,y,legAmp=22,step=.3){const id='#'+p;
 for(let t=t0;t<t1-1e-6;t+=step){const e=eggPos(Math.min(t+step,t1));tl.to(id,{x:e[0]-dx,y:y,duration:step,ease:'none'},t);}
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t1,.24,legAmp,10,`${id}Sq`,8);}

/* ================= SCENE 1: "Everybody wanted to keep the egg warm!" — the blanket is whisked off, everybody has an idea ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,0,8);
tl.to('#blanket',{x:-380,y:60,rotation:-14,duration:.5,ease:'power2.in'},.5);tl.set('#blanketW',{opacity:0},1.05);
eggWobble(1.0,4,5);
armsUp(1.2,.15);faces2(1.2,'happy','Big');SQC.forEach((s,i)=>hop(s,1.3+i*.05,44,.12,.16));

/* ================= SCENE 2: Truffle: "I'll toast it! Hot, hot, hot!" — a little campfire next to the egg ================= */
camTo(L[2]-.45,.8,...CAM.tf,'power2.inOut');
armsDown(L[2]-.1,.2);faces2(L[2]+.1,'wide','O');
TF.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);TF.eyes(L[2],'happy');
tl.to('#tfArmL',{rotation:100,duration:.2},L[2]+.2);
tl.set('#fireW',{opacity:1},W(2,1)-.1);tl.fromTo('#fire',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.4)'},W(2,1)-.1);
tl.fromTo('.cfl',{scaleY:.82},{scaleY:1.16,duration:.11,yoyo:true,repeat:50,ease:'sine.inOut',stagger:.03},W(2,1));
sparks(W(2,1),1340,ROWD-130,6,120);
tl.to('#eggHeat',{opacity:.55,duration:.6},W(2,3)-.1);eggWobble(W(2,3),5,8,.07);
drops(W(2,4),EGX+60,EGC-140,5);smoke(W(2,3)+.2,EGX+20,EGC-300,3);
lookAll2(L[2]+.3,-30,14);

/* ================= SCENE 3: Mochi: "Hmph. Too hot. Obviously." — her stare puts the fire out ================= */
camTo(L[3]-.45,.8,...CAM.mc,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[3]);
MC.m(L[3]+.1,'mFr');MC.talk(L[3]+.12,L[3]+DU[3]-.08,'mOp','mFr',.16);mcEyes(L[3]+.15,'lids');MC.brows(L[3]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-80,duration:.2},W(3,2)-.2);
tl.to('#fire',{scale:.05,duration:.5,ease:'power2.in'},W(3,2));tl.set('#fireW',{opacity:0},W(3,2)+.55);
smoke(W(3,2)+.1,1340,ROWD-60,4);
tl.to('#eggHeat',{opacity:0,duration:.8},W(3,2)+.1);
tl.to('#mcArmR',{rotation:0,duration:.3},W(3,3)+.2);

/* ================= SCENE 4: Zap: "Beep boop! Thirty-seven degrees. Perfect!" ================= */
camTo(L[4]-.45,.8,...CAM.zap,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.to('#zpArmL',{rotation:100,duration:.25},L[4]+.2);
for(let k=0;k<4;k++) pingAt(L[4]+.25+k*.3,EGX+40,EGC-40);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
tl.set('#thermW',{opacity:1},W(4,2));tl.fromTo('#therm',{scale:.2},{scale:1,duration:.4,ease:'back.out(2.4)'},W(4,2));
tl.set('#thermOk',{opacity:1},W(4,4));
sparks(W(4,4),960,1440,8,160);tl.to('#eggGlow',{opacity:.6,duration:.4},W(4,4));
tl.to('#thermW',{opacity:0,duration:.25},L[4]+DU[4]+.2);

/* ================= SCENE 5: Gumdrop: "Roar! I'll give it a cuddle!" — he steps up behind the egg and squeezes it ================= */
runTo('gm',1100,ROWF,L[5]-1.0,.9,1.05,14);
camTo(L[5]-.5,.9,...CAM.gm,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.2},L[5]);
GM.talk(L[5]+.02,L[5]+DU[5]-.05,'mBg','mOp',.14);GM.eyes(L[5],'happy');
tl.to('#gmArmL',{rotation:-55,duration:.25,ease:'back.out(1.6)'},W(5,3));tl.to('#gmArmR',{rotation:55,duration:.25,ease:'back.out(1.6)'},W(5,3));
tl.fromTo('#eggRoll',{scaleX:1,scaleY:1},{scaleX:.84,scaleY:1.12,duration:.22,yoyo:true,repeat:3,ease:'sine.inOut'},W(5,5)-.1);
hearts(W(5,5),1100,1150,5,100,260);sparks(W(5,5),1100,EGC-100,8,200);
lookAll2(L[5]+.3,0,10);

/* ================= SCENE 6: "But the egg wiggled and rolled away!" — it pops out of the hug and rolls along the front of the stage ================= */
camTo(L[6]-.45,.8,...CAM.egg,'power2.inOut');
tl.to('#gmArmL',{rotation:150,duration:.12},W(6,3)+.1);tl.to('#gmArmR',{rotation:-150,duration:.12},W(6,3)+.1);
faces2(W(6,3),'wide','O');
eggWobble(W(6,3),7,6,.07);
tl.to('#eggW',{x:ENDX,y:ENDY,duration:RD,ease:'power2.in'},TR0);
tl.fromTo('#eggRoll',{rotation:0},{rotation:900,duration:RD,ease:'power2.in'},TR0);
for(let t=TR0+.2;t<TR0+RD-.3;t+=.45){const e=eggPos(t);dust(t,e[0]-150,e[1]+8,1.3);tl.fromTo('#eggHop',{y:0},{y:-18-14*(t-TR0)/RD*3,duration:.12,yoyo:true,repeat:1,ease:'power1.out'},t);}
// the whole pack runs after it (the egg is faster and faster: they stay on their own rows behind it)
follow('bo',TR0+.1,L[9]-.6,300,ROWF+BOY,24);
follow('mc',TR0+.2,TR0+RD,430,ROWD,22);
follow('tf',TR0+.3,TR0+RD,800,ROWD+70,20);
follow('gm',TR0+.4,TR0+RD,780,ROWF,14);
// the camera follows the egg
for(let t=TR0-.4;t<L[9]-.4;t+=.4){const e=eggPos(t+.4);camTo(t,.4,Math.max(0,e[0]-760),e[1]-262*EGS-1075,.75,'none');}

/* ================= SCENE 7: Coco: "Ooh-ooh! Stop that egg!" — those ahead of it hop out of the way ================= */
CM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.12);cmEyes(L[7],'wide');
tl.to('#cmArmL',{rotation:150,duration:.12},L[7]);tl.to('#cmArmR',{rotation:-150,duration:.12},L[7]);
hop('#cmSq',L[7]+.2,120,.2,.24);hop('#cmSq',L[7]+.9,120,.2,.24);
faces2(L[7]+.3,'wide','O');lookAll2(L[7]+.3,-32,12);
[['#zpSq',19.6],['#ptSq',19.2],['#nmSq',20.4],['#bpSq',20.7],['#j1Sq',20.5],['#j2Sq',20.7],['#j3Sq',21.0],['#j4Sq',21.2]].forEach(([s,t])=>hop(s,t,60,.14,.18));

/* ================= SCENE 8: "Down, down, down the hill it rolled!" ================= */
tl.to('#cmArmL',{rotation:0,duration:.2},L[8]);tl.to('#cmArmR',{rotation:0,duration:.2},L[8]);
[0,1,2].forEach(i=>shake(W(8,i)+.05,6,3));

/* ================= SCENE 9: Bo: "I'll catch it!" — he sprints past the egg and waits for it ================= */
runTo('bo',BOF[0],BOF[1],L[9]-.55,1.0,.88,26);
camTo(L[9]-.4,.9,...CAM.bo,'power2.inOut');
bTalk(L[9]+.02,L[9]+DU[9]-.08);brows(L[9]+.05,14,-14,-4,.15);eyesMode(L[9]+.05,'wide');look(L[9]+.05,-30,20,.12);
tl.to('#boArmL',{rotation:-110,duration:.2},L[9]+.45);tl.to('#boArmR',{rotation:110,duration:.2},L[9]+.45);

/* ================= SCENE 10: Boo: "I... I'll help. Boo." — he drapes himself over the top of the egg, Bo stops it ================= */
camTo(L[10]-.55,.9,...CAM.boo,'power2.inOut');
tl.to('#gh',{x:ENDX-50,y:1830,scale:.85,duration:1.5,ease:'sine.inOut'},L[9]+.2);
GH.talk(L[10]+.02,L[10]+DU[10]-.06,'mOp','mSm',.2);GH.eyes(L[10],'normal');GH.brows(L[10],-10,10,0,.2);
tl.fromTo('#ghGlow',{opacity:.3},{opacity:.8,duration:.4,yoyo:true,repeat:3},L[10]);
tl.to('#ghArmL',{rotation:-40,duration:.3},L[10]);tl.to('#ghArmR',{rotation:40,duration:.3},L[10]);
// the egg arrives (end of the roll): Bo skids back a little and stops it
tl.fromTo('#eggRoll',{scaleX:1,scaleY:1},{scaleX:.88,scaleY:1.08,duration:.14,yoyo:true,repeat:1},TR0+RD-.05);
tl.to('#bo',{x:BOF[0]+40,duration:.3,ease:'power2.out'},TR0+RD-.05);
shake(TR0+RD-.05,8,4);dust(TR0+RD,ENDX+80,ENDY+14,1.8);sparks(TR0+RD,ENDX+120,ENDY-260,8,150);

/* ================= SCENE 11: "And together, they caught it just in time!" — hugs all round, the egg glows ================= */
camTo(L[11]-.4,1.0,...CAM.fin,'power2.inOut');
tl.to('#boArmL',{rotation:-60,duration:.2},W(11,3));tl.to('#boArmR',{rotation:60,duration:.2},W(11,3));
eyesMode(W(11,3),'hearts');bTalk(L[11]+.02,L[11]+DU[11]-.08);
armsUp(W(11,3)+.2,.15);faces2(W(11,3)+.1,'happy','Big');lookAll2(W(11,3)+.2,0,0);
hearts(W(11,3),ENDX+120,ENDY-560,6,120,300);sparks(W(11,3),ENDX+60,ENDY-300,10,220);
confetti(W(11,3)+.2,1700,3300,ROWB-1500,ROWJ+160,36,.9);
SQC.forEach((s,i)=>hop(s,W(11,3)+.3+i*.05,44,.12,.16));JQ.forEach((s,i)=>hop(s,W(11,3)+.4+i*.08,60,.14,.18));
tl.to('#eggGlow',{opacity:.55,duration:.6},W(11,3));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

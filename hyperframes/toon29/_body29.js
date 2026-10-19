/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: day on the lawn. Pebble plays hide and seek (behind Gumdrop), then crawls all the way across the back of the cast to the big pancake pile at the far right,
// Zap's scanner finds him, Mochi walks over; at the end the ground shakes and a giant gray shape steps in from the right (Munch, in #30)
const PBU=1/PBS;                                           // baby Pebble is drawn at scale PBS: his own (#pbSq) offsets are in unscaled units
const PILE=[2250,2120];                                    // the pancake pile (front right)
const HIDE=[2250,2100];                                    // where the baby sleeps, just behind the pile
const BABY=[1250,ROWD+100];                                // where he stands at the start
const tName=W(1,4), tHide=W(4,3), tSeek=W(4,5), tCome=W(5,3), tArrow=W(8,3);
const CAM={wide:[380,-220,.53],
 baby:camOn(BABY[0],BABY[1]-544*PBS,1.0,540,820),
 pt:camOn(...eyeAt('pt',1100,ROWD+30,.7),.9,540,780),
 gm:[200,420,.8], bo:camOn(...eyeAt('bo',1360,ROWD+BOY,.88),.9,540,780),
 crawl:[1150,640,.7], bp:[1100,560,.7],
 zap:camOn(...eyeAt('zp',1900,ROWD,.7),.9,540,780),
 pile:[1650,972,.9], mc:camOn(...eyeAt('mc',2040,2140,.74),.9,560,780), fin:[700,-120,.6]};
const tStk=L[11]+DU[11]+.35;
function crawl(t0,t1,x1,y1){tl.to('#pb',{x:x1,y:y1,duration:t1-t0,ease:'sine.inOut'},t0);tl.to('#pbLean',{rotation:68,duration:.25},t0);
 cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],t0,t1,.3,24,28,'#pbSq',22);tl.to('#pbLean',{rotation:0,duration:.25},t1);}

/* ================= SCENE 1: "They named the baby Pebble!" ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Big');lookAll2(0,0,16);PB.eyes(0,'happy');PB.m(0,'mBg');
camTo(.3,1.6,...CAM.baby,'power2.inOut');
hop('#pbSq',.9,50*PBU,.14,.18);hearts(1.0,BABY[0],BABY[1]-380,5,90,240);
tl.set('#nameW',{opacity:1},tName);tl.fromTo('#nameS',{scale:.2,rotation:-8},{scale:1,rotation:-3,duration:.4,ease:'back.out(2.2)'},tName);
tl.to('#nameW',{opacity:0,duration:.3},L[2]+DU[2]+.2);
sparks(tName+.2,1250,1640,10,200);

/* ================= SCENE 2: Pebble: "Pebble! Pebble!" ================= */
PB.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.14);PB.eyes(L[2],'happy');
tl.to('#pbArmL',{rotation:150,duration:.12},L[2]);tl.to('#pbArmR',{rotation:-150,duration:.12},L[2]);
hop('#pbSq',W(2,0),60*PBU,.12,.16);hop('#pbSq',W(2,1),60*PBU,.12,.16);

/* ================= SCENE 3: Peanut: "Oops! He's so tiny!" — he tiptoes over, wobbles, and peers down ================= */
runTo('pt',1100,ROWD+30,L[3]-.9,.8,.7,16);
camTo(L[3]-.45,.8,...CAM.pt,'power2.inOut');
tl.to('#pbArmL',{rotation:0,duration:.2},L[3]);tl.to('#pbArmR',{rotation:0,duration:.2},L[3]);
PT.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);PT.eyes(L[3],'wide');PT.look(L[3],20,30,.12);
tl.fromTo('#ptLean',{rotation:0},{rotation:-16,duration:.12,yoyo:true,repeat:3},L[3]+.05);
tl.fromTo('#ptTrunk',{rotation:0},{rotation:-35,duration:.25,yoyo:true,repeat:3},L[3]+.4);
hop('#pbSq',L[3]+.6,40*PBU,.12,.16);

/* ================= SCENE 4: "Pebble loved playing hide and seek!" — he scoots behind Gumdrop and peeks out ================= */
camTo(L[4]-.3,.8,...CAM.gm,'power2.inOut');
tl.to('#pb',{x:700,y:1618,duration:tHide-L[4]-.05,ease:'sine.inOut'},L[4]+.05);
cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],L[4]+.05,tHide,.26,22,10,'#pbSq',22);
PB.eyes(L[4],'happy');PB.m(L[4],'mBg');
tl.to('#pb',{x:860,duration:.25,ease:'back.out(2)'},tSeek);tl.to('#pb',{x:700,duration:.3,ease:'power2.in'},tSeek+.6);
PB.eyes(tSeek,'wide');PB.m(tSeek,'mBg');hop('#pbSq',tSeek+.05,50*PBU,.12,.16);
GM.eyes(L[4],'wide');lookAll2(L[4]+.2,-30,0);

/* ================= SCENE 5: Bo: "Ready or not, here I come!" ================= */
camTo(L[5]-.4,.7,...CAM.bo,'power2.inOut');
tl.to('.boEye',{scaleY:.1,duration:.1},L[5]-.2);tl.to('.boEye',{scaleY:1,duration:.1},tCome);
bTalk(L[5]+.02,L[5]+DU[5]-.08);brows(L[5]+.05,0,0,-2,.15);
tl.to('#boArmL',{rotation:-100,duration:.2},tCome);tl.to('#boArmR',{rotation:100,duration:.2},tCome);
lookAll2(tCome,-24,4);look(tCome,-30,6,.12);
runTo('bo',1080,ROWD+BOY,tCome+.25,.8,.88,22);
GM.eyes(L[5]+.5,'normal');PB.eyes(L[5]+.5,'wide');

/* ================= SCENE 6: "But Pebble crawled away, all alone." — across the back of the cast to the pancake pile ================= */
camTo(L[6]-.4,2.6,...CAM.crawl,'sine.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[6]);tl.to('#boArmR',{rotation:0,duration:.2},L[6]);
crawl(tCome+.45,L[7]-.25,HIDE[0],HIDE[1]);
PB.eyes(tCome+.45,'normal');PB.m(tCome+.45,'mSm');

/* ================= SCENE 7: Blip: "Where did he go?" — everybody looks around ================= */
camTo(L[7]-.4,.7,...CAM.bp,'power2.inOut');
BP.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);BP.eyes(L[7],'wide');
tl.to('#bpArmL',{rotation:150,duration:.12},L[7]);tl.to('#bpArmR',{rotation:-150,duration:.12},L[7]);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[7]);tl.set('#bpAntL',{rotation:0},L[7]+DU[7]+.1);
faces2(L[7]+.1,'wide','O');lookAll2(L[7]+.1,-34,4);lookAll2(L[7]+.65,34,4);lookAll2(L[7]+1.1,-20,10);
tl.to('#bpArmL',{rotation:0,duration:.2},L[8]);tl.to('#bpArmR',{rotation:0,duration:.2},L[8]);

/* ================= SCENE 8: Zap: "Beep boop! Scanning... pancake pile!" ================= */
camTo(L[8]-.4,.8,...CAM.zap,'power2.inOut');
ZP.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);ZP.eyes(L[8],'happy');
tl.to('#zpArmL',{rotation:100,duration:.25},L[8]+.2);
for(let k=0;k<5;k++) pingAt(L[8]+.55+k*.28,PILE[0],PILE[1]-150);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:13},L[8]);tl.set('#zpAnt',{rotation:0},L[8]+DU[8]);
tl.set('#arrW',{x:PILE[0],y:1790,opacity:1},tArrow);tl.fromTo('#arr',{scale:.2,y:-40},{scale:1,y:0,duration:.35,ease:'back.out(2)'},tArrow);
tl.fromTo('#arr',{y:0},{y:-24,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},tArrow+.4);
faces2(L[8]+.3,'wide','O');lookAll2(L[8]+.3,30,0);

/* ================= SCENE 9: "Pebble was fast asleep in the pancakes!" ================= */
camTo(L[9]-.45,.9,...CAM.pile,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.2},L[9]);tl.to('#arrW',{opacity:0,duration:.25},L[9]+.2);
tl.fromTo('#pbSq',{y:0},{y:-330,duration:.6,ease:'power2.out'},L[9]-.05);                 // his head comes up over the stack
PB.eyes(L[9]+.4,'happy');PB.m(L[9]+.4,'mSm');
tl.set('#zzzW',{opacity:1,x:PILE[0]+110,y:1760},W(9,3));tl.fromTo('#zzz',{y:0,opacity:0,scale:.6},{y:-70,opacity:1,scale:1,duration:.7,ease:'sine.out'},W(9,3));
tl.fromTo('#zzz',{y:-70},{y:-120,duration:1.1,yoyo:true,repeat:2,ease:'sine.inOut'},W(9,3)+.7);
faces2(L[9]+.2,'happy','Sm');lookAll2(L[9]+.2,30,6);

/* ================= SCENE 10: Mochi: "Hmph. Found him. Obviously." ================= */
runTo('mc',2040,2140,L[10]-1.1,1.0,.74,18);
camTo(L[10]-.5,.8,...CAM.mc,'power2.inOut');
MC.m(L[10]+.1,'mFr');MC.talk(L[10]+.12,L[10]+DU[10]-.08,'mOp','mFr',.16);mcEyes(L[10]+.15,'lids');MC.brows(L[10]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-90,duration:.25},W(10,1));
tl.to('#zzzW',{opacity:0,duration:.2},W(10,1));
PB.eyes(W(10,1)+.1,'wide');PB.m(W(10,1)+.1,'mBg');hop('#pbSq',W(10,1)+.15,60*PBU,.12,.16);tl.to('#pbSq',{y:0,duration:.35,ease:'power2.in'},W(10,1)+.55);
tl.to('#pbArmL',{rotation:150,duration:.12},W(10,1)+.2);tl.to('#pbArmR',{rotation:-150,duration:.12},W(10,1)+.2);
sparks(W(10,1),HIDE[0],1800,8,170);hearts(W(10,2),HIDE[0],1760,4,90,240);

/* ================= SCENE 11: "But then the ground began to shake!" — something huge is coming from the right ================= */
camTo(L[11]-.35,.8,...CAM.fin,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[11]);
faces2(L[11]+.2,'wide','O');lookAll2(L[11]+.6,36,-6);
tl.set('#mn',{opacity:1,x:3300,y:1640,scale:1.8},L[11]-.2);MN.eyes(L[11]-.2,'normal');MN.m(L[11]-.2,'mSm');
tl.to('#mn',{x:2580,duration:2.2,ease:'sine.inOut'},L[11]);
cycle(['#mnLegL','#mnLegR'],['#mnArmL','#mnArmR'],L[11],L[11]+2.2,.7,14,8,'#mnSq',14);
for(let t=L[11]+.3;t<L[11]+2.2;t+=.7){shake(t,12,6);dust(t+.05,2900-(t-L[11])*300,1650,3);}
tl.fromTo('#pile',{y:0},{y:-10,duration:.1,yoyo:true,repeat:11},L[11]+.3);
[0,1,2,3].forEach(i=>hop(JQ[i],L[11]+.4+i*.1,34,.1,.14));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

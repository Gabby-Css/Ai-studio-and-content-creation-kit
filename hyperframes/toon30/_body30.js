/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging (finale): the gang clusters at the centre-right of the lawn, the pile and sleepy Pebble at the front right, Munch (a giant!) steps in from the right
// and stands behind them. Pebble runs to his papa, hugs Bo goodbye, rides on Munch's head for the party, a big banner pops up for "Happy hatching day!"
const MUN=[2670,1640];                                     // where Munch stands (scale 1.5)
const MHEAD=[2670,630];                                    // the top of Munch's head (where Pebble sits)
const PBU=1/PBS;
const tHug=W(4,5);
const CAM={wide:[1120,-100,.6], mun:[1770,-480,.6], two:[1600,200,.65],
 bo:camOn(...eyeAt('bo',1760,ROWD+BOY,.88),.9,540,780), gum:[1345,194,.8],
 zap:camOn(...eyeAt('zp',2190,ROWD,.7),.85,540,780), fin:[950,-200,.55]};
const tStk=L[11]+DU[11]+.35;
function toMunch(t0,t1){tl.to('#pb',{x:MUN[0]-110,y:1745,duration:t1-t0,ease:'sine.inOut'},t0);
 cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],t0,t1,.26,24,14,'#pbSq',24);}

/* ================= SCENE 1: "Thump, thump! Munch was back!" ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,34,-4);PB.eyes(0,'wide');PB.m(0,'mO');
tl.to('#mn',{x:MUN[0],duration:2.0,ease:'sine.inOut'},.4);
cycle(['#mnLegL','#mnLegR'],['#mnArmL','#mnArmR'],.4,2.4,.7,14,8,'#mnSq',14);
MN.eyes(.4,'normal');MN.m(.4,'mSm');
[W(1,0),W(1,1),W(1,2)+.3].forEach((t,i)=>{shake(t,12,6);dust(t+.05,3000-i*250,1650,3);});
faces2(W(1,2),'wide','O');lookAll2(W(1,2),36,-8);
tl.to('#mnArmR',{rotation:-130,duration:.3},W(1,4));tl.fromTo('#mnArmR',{rotation:-130},{rotation:-95,duration:.22,yoyo:true,repeat:5},W(1,4)+.3);
faces2(W(1,4)+.15,'happy','Big');eyesMode(W(1,4)+.15,'hearts');MN.eyes(W(1,4),'happy');MN.m(W(1,4),'mBg');

/* ================= SCENE 2: Munch: "Pebble! My little Pebble!" ================= */
camTo(L[2]-.4,.7,...CAM.mun,'power2.inOut');
MN.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.2);MN.eyes(L[2],'happy');
tl.to('#mnArmL',{rotation:120,duration:.35,ease:'back.out(1.6)'},L[2]+.2);tl.to('#mnArmR',{rotation:-120,duration:.35,ease:'back.out(1.6)'},L[2]+.2);
tl.set('#mnTear',{opacity:1},W(2,3));
PB.eyes(L[2]+.4,'wide');PB.m(L[2]+.4,'mO');tl.to('#pbSq',{y:0,duration:.3},L[2]+.4);
hearts(W(2,3),MUN[0],1000,4,160,300);

/* ================= SCENE 3: Pebble: "Papa! Papa!" — he runs up to Munch's feet ================= */
camTo(L[3]-.4,.6,...CAM.two,'power2.inOut');
PB.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.14);PB.eyes(L[3],'happy');
toMunch(L[3]+.05,L[3]+.95);
tl.to('#pbArmL',{rotation:150,duration:.15},L[3]+.95);tl.to('#pbArmR',{rotation:-150,duration:.15},L[3]+.95);
hop('#pbSq',L[3]+.98,60*PBU,.14,.18);
tl.to('#mnLean',{rotation:-10,duration:.5},L[3]+.7);hearts(L[3]+.9,MUN[0]-80,1100,5,120,300);
tl.to('#mnArmL',{rotation:0,duration:.25},L[3]+.3);tl.to('#mnArmR',{rotation:0,duration:.25},L[3]+.3);

/* ================= SCENE 4: "Pebble gave Bo one last hug." — he runs all the way over to Bo ================= */
camTo(L[4]-.3,.8,...CAM.wide,'power2.inOut');
tl.to('#mnLean',{rotation:0,duration:.4},L[4]);tl.to('#pbArmL',{rotation:0,duration:.1},L[4]);tl.to('#pbArmR',{rotation:0,duration:.1},L[4]);
tl.to('#pb',{x:1900,y:2260,duration:W(4,4)-L[4]-.1,ease:'sine.inOut'},L[4]+.1);
cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],L[4]+.1,W(4,4)-.05,.26,24,14,'#pbSq',24);
camTo(W(4,3),.7,...CAM.bo,'power2.inOut');
tl.to('#pbArmL',{rotation:150,duration:.15},tHug);tl.to('#pbArmR',{rotation:-150,duration:.15},tHug);
tl.to('#boLean',{rotation:10,duration:.35},tHug);eyesMode(tHug,'hearts');hearts(tHug+.1,1727,1480,5,100,260);hop('#pbSq',tHug+.1,40*PBU,.12,.16);

/* ================= SCENE 5: Bo: "Goodbye, Pebble! We'll miss you!" ================= */
bTalk(L[5]+.02,L[5]+DU[5]-.08);brows(L[5]+.05,-14,14,-2,.2);eyesMode(L[5]+.05,'normal');look(L[5]+.05,30,22,.12);
tl.to('#boArmL',{rotation:-40,duration:.2},W(5,2));tl.to('#boArmR',{rotation:40,duration:.2},W(5,2));
tl.fromTo('#boArmR',{rotation:40},{rotation:80,duration:.2,yoyo:true,repeat:5},W(5,2)+.2);
PB.eyes(L[5]+.3,'normal');PB.m(L[5]+.3,'mSm');
// he trots back to Munch while everybody waves
toMunch(W(5,3)+.2,L[6]-.1);
tl.to('#pbArmL',{rotation:150,duration:.12},L[6]-.1);
tl.to('#boLean',{rotation:0,duration:.3},W(5,3));

/* ================= SCENE 6: Munch: "Thank you, my tiny friends." — a big bow ================= */
camTo(L[6]-.45,.8,...CAM.mun,'power2.inOut');
MN.talk(L[6]+.02,L[6]+DU[6]-.05,'mSm','mBg',.24);MN.eyes(L[6],'happy');
tl.to('#mnLean',{rotation:-12,duration:.6,ease:'power2.inOut'},L[6]+.4);tl.to('#mnLean',{rotation:0,duration:.6,ease:'power2.inOut'},L[6]+1.8);
tl.to('#mnArmL',{rotation:40,duration:.4},L[6]+.4);tl.to('#mnArmR',{rotation:-40,duration:.4},L[6]+.4);
hearts(W(6,4),MUN[0],1100,6,160,320);
tl.to('#mnTear',{opacity:0,duration:.3},L[6]+2.4);

/* ================= SCENE 7: Gumdrop: "Roar! Party time!" — and Pebble hops up on Munch's head ================= */
camTo(L[7]-.45,.8,...CAM.gum,'power2.inOut');
tl.to('#mnArmL',{rotation:0,duration:.25},L[7]);tl.to('#mnArmR',{rotation:0,duration:.25},L[7]);
GM.talk(L[7]+.02,L[7]+DU[7]-.05,'mBg','mOp',.14);GM.eyes(L[7],'happy');
tl.to('#gmArmL',{rotation:150,duration:.15},L[7]);tl.to('#gmArmR',{rotation:-150,duration:.15},L[7]);
hop('#gmSq',W(7,1),60,.18,.22);
confetti(W(7,1),1300,3000,ROWB-1700,ROWJ+160,40,1.0);
arc('#pb',W(7,2)-.2,.9,1745,300,MHEAD[1]);tl.to('#pb',{x:MHEAD[0],duration:.9,ease:'none'},W(7,2)-.2);

/* ================= SCENE 8: "Big friends and little friends danced!" ================= */
camTo(L[8]-.45,.9,...CAM.wide,'power2.inOut');
armsUp(L[8]+.1,.15);faces2(L[8]+.1,'happy','Big');eyesMode(L[8]+.1,'hearts');lookAll2(L[8]+.1,0,0);
for(let k=0;k<6;k++){const t=L[8]+.15+k*.32;
 SQC.forEach((s,i)=>hop(s,t+(i%3)*.06,34,.1,.14));JQ.forEach((s,i)=>hop(s,t+.05+i*.04,50,.1,.14));hop('#pbSq',t,40*PBU,.1,.14);
 tl.to('#mnLean',{rotation:k%2?7:-7,duration:.3,ease:'sine.inOut'},t);}
tl.to('#mnArmL',{rotation:110,duration:.25},L[8]+.1);tl.to('#mnArmR',{rotation:-110,duration:.25},L[8]+.1);
tl.fromTo('#mnArmL',{rotation:110},{rotation:70,duration:.32,yoyo:true,repeat:5},L[8]+.4);tl.fromTo('#mnArmR',{rotation:-70},{rotation:-110,duration:.32,yoyo:true,repeat:5},L[8]+.4);
confetti(L[8]+.2,1300,2800,ROWB-1700,ROWJ+160,40,1.2);hearts(L[8]+.8,1800,1500,6,160,320);
[0,1,2].forEach(i=>hop('#ghSq',L[8]+.5+i*.45,60,.18,.22));

/* ================= SCENE 9: Zap: "Beep boop! Best party ever!" ================= */
camTo(L[9]-.45,.8,...CAM.zap,'power2.inOut');
tl.to('#mnLean',{rotation:0,duration:.3},L[9]);
ZP.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.13);ZP.eyes(L[9],'happy');
tl.fromTo('#zpAnt',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:13},L[9]);tl.set('#zpAnt',{rotation:0},L[9]+DU[9]);
[0,.3,.6,.9,1.2].forEach(d=>tl.fromTo('#flash',{opacity:.22},{opacity:0,duration:.25},L[9]+.1+d));
sparks(W(9,4),2190,1700,8,200);

/* ================= SCENE 10: everybody: "Happy hatching day!" ================= */
camTo(L[10]-.4,.7,...CAM.wide,'power2.inOut');
tl.set('#hbW',{opacity:1},L[10]);tl.fromTo('#hb',{scale:.2,rotation:-6},{scale:1.05,rotation:-2,duration:.45,ease:'back.out(2.2)'},L[10]);
armsUp(L[10],.15);faces2(L[10],'happy','Big');eyesMode(L[10],'hearts');
tl.to('#mnArmL',{rotation:140,duration:.2},L[10]);tl.to('#mnArmR',{rotation:-140,duration:.2},L[10]);
confetti(L[10]+.05,1100,2900,ROWB-1900,ROWJ+160,56,1.2);hearts(L[10]+.4,1700,1500,8,170,340);
[0,.2,.4,.6].forEach((d,i)=>sparks(L[10]+d,1500+i*300,700+(i%2)*250,10,230));
SQC.forEach((s,i)=>hop(s,L[10]+.1+i*.05,50,.12,.18));JQ.forEach((s,i)=>hop(s,L[10]+.15+i*.08,70,.14,.18));hop('#pbSq',L[10]+.1,70*PBU,.14,.2);

/* ================= SCENE 11: "And that was the end of Season six!" ================= */
camTo(L[11]-.2,1.2,...CAM.fin,'power2.inOut');
SQC.forEach((s,i)=>hop(s,L[11]+.6+i*.05,44,.12,.18));
tl.fromTo('#mnArmR',{rotation:-140},{rotation:-100,duration:.3,yoyo:true,repeat:7},L[11]+.3);
confetti(L[11]+.3,1100,2900,ROWB-1900,ROWJ+160,40,1.4);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:6,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

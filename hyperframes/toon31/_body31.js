/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the racers stand on the track in front of the START gantry, the spectators behind the fence; Zap hands out the karts, close-ups for Bo / Mochi / Truffle,
// Pebble waddles in and rides with Bo, three lights, and the karts zoom off to the right
const KINGP=[1990,1640];                                   // the King (spectator row)
const EYEY=(p,x,feet,s)=>[x,feet-EH[p]*s];                 // a racer's eyes (x, y) given the feet position
const FEET=(p)=>KRC[p].L>=0?LANE[KRC[p].L]-34:0;           // feet of a seated racer
const CAM={wide:RACE,
 king:camE(KINGP[0],KINGP[1]-342,.95,540,560), pan:camE(KINGP[0],KINGP[1]-342,.85,540,640),
 kart:camE(1200,2280,.6,540,880), bo:camE(ST.bo,FEET('bo')-EH.bo*.6,1.15,500,640), mc:camE(ST.mc,FEET('mc')-EH.mc*.6,1.15,540,640),
 tf:camE(ST.tf,FEET('tf')-EH.tf*.6,1.15,540,640), zp:camE(ST.zp,FEET('zp')-EH.zp*.58,1.15,540,640),
 peb:camE(640,2560-EH.pb*PBS,1.2,540,700), duo:camE(ST.bo+40,FEET('bo')-EH.bo*.6,1.0,520,660)};
const tPan=W(2,4);                                         // "...GOLDEN PAN!"
const tKart=W(3,5);                                        // "...KART!"
const PBU=1/PBS;                                           // baby Pebble is drawn at scale PBS
const PBK=[ST.bo+105,FEET('bo')+4];                        // Pebble's seat in Bo's kart
const tGo=W(10,3);                                         // "...GO!"
const tStk=L[11]+DU[11]+.35;

/* ================= SCENE 1: "The King announced the Great Pancake Race!" ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Big');lookAll2(0,34,-6);
tl.to('#kgArmL',{rotation:140,duration:.3,ease:'back.out(2)'},.5);tl.to('#kgArmR',{rotation:-140,duration:.3,ease:'back.out(2)'},.5);
KG.talk(L[1]+.02,L[1]+DU[1]-.05,'mBg','mSm',.13);KG.eyes(L[1],'happy');
armsUp(L[1]+.9,.15);SQC.forEach((s,i)=>hop(s,L[1]+1.0+i*.05,40,.12,.16));JQ.forEach((s,i)=>hop(s,L[1]+1.1+i*.08,50,.12,.16));
confetti(W(1,5),600,2150,800,2640,36,.9);
tl.fromTo('#startW',{y:-90},{y:0,duration:.5,ease:'bounce.out'},.2);

/* ================= SCENE 2: the King: "The winner gets the golden pan!" ================= */
camTo(L[2]-.45,.8,...CAM.king,'power2.inOut');
KG.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);KG.eyes(L[2],'happy');
tl.set('#gpanW',{opacity:1,x:KINGP[0]-30,y:1060},tPan);tl.fromTo('#gpan',{scale:.2,rotation:-20},{scale:.7,rotation:-8,duration:.5,ease:'back.out(2.2)'},tPan);
tl.fromTo('#gpan',{y:0},{y:-24,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tPan+.5);
for(let k=0;k<4;k++) sparks(tPan+.2+k*.3,KINGP[0]-30,1000,6,140);
tl.to('#kgArmL',{rotation:100,duration:.3},L[2]+.2);tl.to('#kgArmR',{rotation:-100,duration:.3},L[2]+.2);
lookAll2(L[2]+.3,-12,-30);

/* ================= SCENE 3: Zap: "Beep boop! Everybody gets a kart!" — the five karts drop in ================= */
camTo(L[3]-.45,.8,...CAM.kart,'power2.inOut');
ZP.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);ZP.eyes(L[3],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:13},L[3]);tl.set('#zpAnt',{rotation:0},L[3]+DU[3]);
tl.to('#zpArmL',{rotation:120,duration:.25,ease:'back.out(2)'},L[3]+.2);
['cm','tf','zp','mc','bo'].forEach((p,i)=>{const r=KRC[p],t=tKart+i*.14,y1=LANE[r.L]+r.b;
 tl.set('#'+r.k+'W',{opacity:1,y:y1-1500},t);tl.fromTo('#'+r.k+'W',{y:y1-1500},{y:y1,duration:.55,ease:'bounce.out'},t);
 dust(t+.5,ST[p]-60,LANE[r.L]+10,1.2);sparks(t+.5,ST[p],LANE[r.L]-120,5,100);
 hop('#'+p+'Sq',t+.5,40,.12,.16);});
armsUp(tKart+.5,.15);faces2(tKart+.1,'happy','Big');
confetti(tKart+.6,700,1900,900,2640,26,.8);
tl.to('#gpanW',{opacity:0,duration:.3},tKart+1.0);

/* ================= SCENE 4: Bo: "Wow! Mine is orange!" ================= */
camTo(L[4]-.4,.7,...CAM.bo,'power2.inOut');
armsDown(L[4]-.05,.2);
bTalk(L[4]+.02,L[4]+DU[4]-.08);brows(L[4]+.05,0,0,-4,.15);eyesMode(L[4]+.05,'hearts');
tl.to('#boArmL',{rotation:-120,duration:.2},L[4]+.3);tl.to('#boArmR',{rotation:120,duration:.2},L[4]+.3);
hop('#boSq',L[4]+.35,40,.12,.16);bumpKart('bo',L[4]+.35,L[4]+1.0,12,.2);hearts(L[4]+.5,ST.bo,FEET('bo')-340,4,80,200);
wheels(L[4],L[4]+DU[4]+.2,.3);

/* ================= SCENE 5: Mochi: "Hmph. Mine is faster. Obviously." ================= */
camTo(L[5]-.45,.8,...CAM.mc,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[5]-.2);tl.to('#boArmR',{rotation:0,duration:.2},L[5]-.2);
MC.m(L[5]+.1,'mFr');MC.talk(L[5]+.12,L[5]+DU[5]-.08,'mOp','mFr',.16);mcEyes(L[5]+.15,'lids');MC.brows(L[5]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.25},W(5,2));
tl.fromTo('#kmcS',{rotation:0},{rotation:-3,duration:.12,yoyo:true,repeat:5,ease:'sine.inOut'},W(5,2));
tl.set('#kmcW .kfl',{opacity:1},W(5,3));tl.fromTo('#kmcW .kfl',{scaleX:.6},{scaleX:1.2,duration:.07,yoyo:true,repeat:13},W(5,3));tl.set('#kmcW .kfl',{opacity:0},W(5,3)+1.0);
sparks(W(5,3)+.1,ST.mc-220,FEET('mc')-30,5,70);
lookAll2(L[5]+.3,-20,6);

/* ================= SCENE 6: Truffle: "Mine runs on pancakes!" ================= */
camTo(L[6]-.45,.8,...CAM.tf,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[6]);
TF.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mSm',.13);TF.eyes(L[6],'happy');
tl.to('#tfArmL',{rotation:100,duration:.2},L[6]+.2);tl.fromTo('#tfArmL',{rotation:100},{rotation:70,duration:.18,yoyo:true,repeat:5},L[6]+.4);
bumpKart('tf',L[6]+.2,L[6]+1.4,10,.22);hearts(W(6,3),ST.tf,FEET('tf')-300,4,80,220);
kslice(W(6,3)-.1,ST.tf-40,FEET('tf')-300,ST.tf+90,FEET('tf')+10,.5,.7);
wheels(L[6],L[6]+DU[6]+.2,.4);
lookAll2(L[6]+.3,10,10);

/* ================= SCENE 7: "Little Pebble wanted to race, too!" — he waddles in along the bottom of the track ================= */
camTo(L[7]-.45,.8,...CAM.wide,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[7]);
tl.set('#pb',{opacity:1,x:300,y:2570,scale:PBS},L[7]);PB.eyes(L[7],'normal');PB.m(L[7],'mSm');
tl.to('#pb',{x:640,duration:1.6,ease:'sine.inOut'},L[7]+.1);
cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],L[7]+.1,L[7]+1.7,.28,22,12,'#pbSq',22);
lookAll2(L[7]+.4,-30,14);

/* ================= SCENE 8: Pebble: "Me too! Me too!" ================= */
camTo(L[8]-.4,.7,...CAM.peb,'power2.inOut');
PB.talk(L[8]+.02,L[8]+DU[8]-.04,'mBg','mSm',.14);PB.eyes(L[8],'happy');
tl.to('#pbArmL',{rotation:150,duration:.12},L[8]);tl.to('#pbArmR',{rotation:-150,duration:.12},L[8]);
hop('#pbSq',W(8,0),60*PBU,.12,.16);hop('#pbSq',W(8,2),60*PBU,.12,.16);
lookAll2(L[8]+.1,-20,20);

/* ================= SCENE 9: "So Bo made room for him." — Bo shuffles over, Pebble hops into the kart ================= */
camTo(L[9]-.4,.8,...CAM.duo,'power2.inOut');
tl.to('#pbArmL',{rotation:0,duration:.15},L[9]);tl.to('#pbArmR',{rotation:0,duration:.15},L[9]);
const BOS7=chPos('bo',ST.bo-52,0)[0];
tl.to('#bo',{x:BOS7,duration:.35,ease:'back.out(1.6)'},L[9]+.1);
arc('#pb',L[9]+.35,.7,2570,380,PBK[1]);tl.to('#pb',{x:PBK[0],duration:.7,ease:'none'},L[9]+.35);
tl.fromTo('#kboS',{rotation:0},{rotation:-4,duration:.15,yoyo:true,repeat:3,ease:'sine.inOut'},L[9]+1.0);
hearts(L[9]+1.0,ST.bo+30,FEET('bo')-330,5,90,240);sparks(L[9]+1.0,ST.bo+60,FEET('bo')-120,6,120);
eyesMode(L[9]+.3,'hearts');
PB.eyes(L[9]+.8,'happy');PB.m(L[9]+.8,'mBg');

/* ================= SCENE 10: Zap: "Three, two, one... go!" — the start lights ================= */
camTo(L[10]-.5,.9,...CAM.wide,'power2.inOut');
ZP.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.12);ZP.eyes(L[10],'wide');
lights(0,0,0,0);
[['ltA',W(10,0),1],['ltB',W(10,1),1]].forEach(([id,t])=>{tl.set('#'+id,{fill:'#FF3B3B'},t);tl.fromTo('#'+id,{scale:1.5},{scale:1,duration:.2,ease:'power2.out'},t);sparks(t,1960+(id==='ltA'?-110:0),960,4,60);});
tl.set('#ltA,#ltB',{fill:'#5a2a2a'},tGo);tl.set('#ltC',{fill:'#5CFF7A'},tGo);tl.fromTo('#ltC',{scale:1.8},{scale:1,duration:.25,ease:'power2.out'},tGo);
sparks(tGo,2070,960,10,200);
['cm','tf','zp','mc','bo'].forEach((p,i)=>{tl.fromTo('#'+KRC[p].k+'S',{rotation:0},{rotation:-3,duration:.2,ease:'power2.out'},W(10,2)+.05);tl.to('#'+KRC[p].k+'S',{rotation:0,duration:.25},tGo+.1);});
faces2(W(10,0),'wide','O');lookAll2(W(10,0),34,2);
tl.set('.kfl',{opacity:1},W(10,2)+.1);tl.fromTo('.kfl',{scaleX:.5},{scaleX:1.3,duration:.07,yoyo:true,repeat:9},W(10,2)+.1);

/* ================= SCENE 11: "And they zoomed away!" — the karts shoot off to the right ================= */
const GOX=3400;
['zp','cm','mc','tf','bo'].forEach((p,i)=>{const t=tGo+.12+i*.1;drive(p,t,1.9-i*.07,GOX,'power2.in');
 wheels(t,t+2.0,6);for(let k=0;k<7;k++) trail(t+.15+k*.2,ST[p]+(GOX-ST[p])*Math.pow((k*.2+.15)/(1.9-i*.07),2)-120,LANE[KRC[p].L]+6,1.1);});
tl.to('#pb',{x:GOX+PBK[0]-ST.bo,duration:1.7,ease:'power2.in'},tGo+.52);tl.to('#pb',{y:PBK[1]-14,duration:.15,yoyo:true,repeat:11},tGo+.55);
speedLines(tGo+.2,tGo+2.2);
shake(tGo+.15,8,6);
camTo(tGo+.1,2.0,RACE[0]+300,RACE[1],RACE[2],'power1.inOut');
SQC.forEach((s,i)=>hop(s,tGo+.4+i*.05,40,.12,.16));JQ.forEach((s,i)=>hop(s,tGo+.5+i*.08,50,.12,.16));
armsUp(tGo+.4,.15);faces2(tGo+.3,'happy','Big');
confetti(tGo+.2,900,2400,800,2640,36,1.0);hearts(tGo+.8,1500,1500,5,140,300);
tl.to('#kgArmL',{rotation:140,duration:.2},tGo+.2);tl.to('#kgArmR',{rotation:-140,duration:.2},tGo+.2);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

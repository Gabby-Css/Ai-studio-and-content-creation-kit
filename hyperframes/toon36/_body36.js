/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the gang stands in a ring round the Golden Pan on the lawn; whoever speaks gets a close-up (Truffle steps up to the pan, Zap and Mochi stay on their marks),
// the pan goes on a campfire, a treasure map pops out of it, the camera pushes in on the map for "far away", then the pancake boat is built in the free space in front
const PX=1300, PY=1930;                                    // the Golden Pan's spot on the lawn
const FIRE_Y=ROWD-110;                                     // the campfire under the pan
const MAPP=[1300,1470];                                    // where the map floats
const TFP=[1120,ROWF+60];                                  // Truffle steps up to the pan
const BTP=[1520,2000];                                     // the boat's centre (deck) on the lawn
const ZBP=[960,ROWD];                                      // Zap's building spot
const CAM={wide:[380,-220,.53],
 pan:camE(PX,PY-130,.8,540,900), tf:camOn(...eyeAt('tf',TFP[0],TFP[1],.74),.95,540,780),
 fire:camE(PX,1790,.85,540,860), zap:camE(1420,1580,.8,540,800), mc:camOn(...eyeAt('mc',2060,ROWF,.74),.95,540,780),
 bo:camOn(...eyeAt('bo',620,ROWD+BOY,.88),.95,540,780), peb:camE(800,ROWD+14-EH.pb*PBS,1.2,540,700),
 map:camE(MAPP[0],MAPP[1],.8,540,780), build:camE(1250,1700,.6,540,800)};
const tM=W(3,4), tX=W(4,2), tI=W(9,4), tSun=L[11]+.1;
const tStk=L[11]+DU[11]+.35;

/* ================= SCENE 1: "Munch left the Golden Pan outside!" — Munch trots away, the pan glows in the grass ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,34,-4);
runTo('mn',3000,1520,.05,2.7,.5,16);MN.eyes(.05,'happy');MN.m(.05,'mSm');
tl.fromTo('#ghSq',{y:0},{y:-14,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#gpan',{y:0},{y:-12,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},.2);
tl.fromTo('#gpan',{scale:1},{scale:1.12,duration:.2,yoyo:true,repeat:1},W(1,3));sparks(W(1,3)+.05,PX,PY-30,6,150);
camTo(L[1]+.3,1.1,...CAM.pan,'power2.inOut');

/* ================= SCENE 2: Truffle: "Wow! Let's cook in it!" — she steps up and holds the pan high ================= */
runTo('tf',TFP[0],TFP[1],L[1]+.5,1.7,.74,20);
camTo(L[2]-.45,.75,...CAM.tf,'power2.inOut');
TF.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.13);TF.eyes(L[2],'happy');
hop('#tfSq',L[2]+.1,50,.14,.18);lookAll2(L[2]+.2,-6,-14);
tl.to('#tfArmL',{rotation:150,duration:.18},W(2,2)-.1);tl.to('#tfArmR',{rotation:-150,duration:.18},W(2,2)-.1);
tl.to('#gpanW',{x:TFP[0]+10,y:TFP[1]-520,scale:.55,duration:.4,ease:'power2.out'},W(2,2)-.2);
hearts(W(2,2),TFP[0],TFP[1]-330,4,70,200);

/* ================= SCENE 3: "Sizzle, sizzle... and a map appeared!" — pan on the fire, steam, the map pops out ================= */
camTo(L[3]-.5,.7,...CAM.fire,'power2.inOut');
tl.to('#gpanW',{x:PX,y:FIRE_Y-70,scale:.9,duration:.45,ease:'power2.in'},L[3]-.7);
tl.to('#tfArmL',{rotation:0,duration:.2},L[3]-.45);tl.to('#tfArmR',{rotation:0,duration:.2},L[3]-.45);
tl.set('#fireW',{opacity:1},L[3]-.25);tl.fromTo('#fire',{scale:.3},{scale:1,duration:.3,ease:'back.out(2)'},L[3]-.25);
tl.fromTo('.cfl',{scaleY:.88},{scaleY:1.12,duration:.12,yoyo:true,repeat:60},L[3]-.2);
[0,.4,.8].forEach((d,i)=>{dust(L[3]+d,PX-70+i*40,FIRE_Y-190,.7);sparks(L[3]+d,PX,FIRE_Y-120,4,90);});
tl.fromTo('#gpan',{rotation:-2},{rotation:2,duration:.07,yoyo:true,repeat:9},L[3]);tl.set('#gpan',{rotation:0},L[3]+.8);
lookAll2(L[3]+.2,8,-12);
tl.set('#mapW',{opacity:1,x:PX,y:FIRE_Y-170},tM);tl.fromTo('#map',{scale:.04,rotation:-25},{scale:.4,rotation:0,duration:.45,ease:'back.out(2.2)'},tM);
tl.fromTo('#mapSc',{scaleY:.12},{scaleY:1,duration:.5,ease:'power2.out'},tM+.1);
tl.to('#mapW',{x:MAPP[0],y:MAPP[1],duration:.7,ease:'power2.inOut'},tM+.4);
sparks(tM+.05,PX,FIRE_Y-230,10,200);faces2(tM,'wide','O');lookAll2(tM+.1,0,-22);
tl.fromTo('#map',{y:0},{y:-14,duration:.7,yoyo:true,repeat:11,ease:'sine.inOut'},tM+1.2);
tl.to('#fire',{opacity:.55,duration:.3},L[6]-.3);tl.to('#fireW,#gpanW',{opacity:0,duration:.3},L[6]-.1);

/* ================= SCENE 4: Zap: "Beep boop! X marks the spot!" — his scanner rings, a red X is drawn on the island ================= */
camTo(L[4]-.45,.8,...CAM.zap,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
tl.to('#zpArmL',{rotation:110,duration:.25},L[4]+.2);
for(let k=0;k<3;k++) pingAt(L[4]+.3+k*.3,MAPP[0],MAPP[1]);
tl.to('.mx1',{strokeDashoffset:0,duration:.16,ease:'none'},tX);tl.to('.mx2',{strokeDashoffset:0,duration:.16,ease:'none'},tX+.18);
sparks(tX+.36,MAPP[0]+290*.4,MAPP[1]-70*.4,8,70);faces2(L[4]+.2,'happy','Big');lookAll2(L[4]+.2,-8,-6);

/* ================= SCENE 5: Mochi: "Hmph. Treasure map. Obviously." ================= */
camTo(L[5]-.45,.8,...CAM.mc,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.25},L[5]-.2);
MC.m(L[5]+.1,'mFr');MC.talk(L[5]+.12,L[5]+DU[5]-.08,'mOp','mFr',.16);mcEyes(L[5]+.15,'lids');MC.brows(L[5]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-70,duration:.25},W(5,1));tl.to('#mcArmR',{rotation:-20,duration:.2},W(5,3));
lookAll2(L[5]+.3,-18,-6);

/* ================= SCENE 6: Bo: "Treasure! Let's go find it!" ================= */
camTo(L[6]-.45,.7,...CAM.bo,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[6]-.2);
bTalk(L[6]+.02,L[6]+DU[6]-.08);brows(L[6]+.05,14,-14,-4,.15);eyesMode(L[6]+.05,'wide');look(L[6]+.1,0,-6,.12);
tl.to('#boArmL',{rotation:-160,duration:.18},L[6]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[6]+.2);
hop('#boSq',L[6]+.25,70,.15,.2);eyesMode(W(6,2),'hearts');hearts(W(6,2),620,ROWD+BOY-480,5,90,240);
tl.to('#boArmL',{rotation:0,duration:.2},L[7]-.3);tl.to('#boArmR',{rotation:0,duration:.2},L[7]-.3);

/* ================= SCENE 7: Pebble: "Me too! Me too!" ================= */
camTo(L[7]-.4,.7,...CAM.peb,'power2.inOut');
PB.talk(L[7]+.02,L[7]+DU[7]-.05,'mBg','mSm',.12);PB.eyes(L[7],'happy');
hop('#pbSq',L[7]+.02,60,.12,.16);hop('#pbSq',W(7,2),60,.12,.16);hearts(W(7,2),800,ROWD-170,3,60,160);
eyesMode(L[7],'wide');

/* ================= SCENE 8: "But the island was far away!" — we push in on the map and a dotted path crawls out to sea ================= */
camTo(L[8]-.4,.75,...CAM.map,'power2.inOut');
tl.to('#map',{scale:1.0,duration:.7,ease:'power2.inOut'},L[8]-.4);
for(let i=0;i<15;i++) tl.fromTo('#mdot'+i,{opacity:0,scale:.2},{opacity:1,scale:1,duration:.12,ease:'back.out(2)'},L[8]+.2+i*.055);
tl.fromTo('#mapIsl',{scale:1},{scale:1.1,duration:.15,yoyo:true,repeat:3},W(8,5));sparks(W(8,5)+.05,MAPP[0]+300,MAPP[1]-80,8,160);
faces2(L[8]+.3,'wide','O');lookAll2(L[8]+.3,10,-6);

/* ================= SCENE 9: Truffle: "Then we need a pancake boat!" — her idea bubble ================= */
tl.to('#mapW',{opacity:0,duration:.3},L[9]-.4);
runTo('zp',ZBP[0],ZBP[1],L[9]+.1,1.5,.7,20);
camTo(L[9]-.45,.75,...CAM.tf,'power2.inOut');
TF.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.13);TF.eyes(L[9],'normal');
tl.to('#tfArmL',{rotation:100,duration:.2},L[9]+.3);hop('#tfSq',tI-.1,40,.12,.16);
tl.set('#thW',{opacity:1,x:TFP[0]+90,y:TFP[1]-422*.74-90},tI);tl.fromTo('#th',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.2)'},tI);
tl.fromTo('#thW',{rotation:0},{rotation:2,duration:.4,yoyo:true,repeat:5,ease:'sine.inOut'},tI+.5);
sparks(tI+.25,TFP[0]+150,TFP[1]-520,7,110);faces2(L[9]+.3,'happy','Big');lookAll2(L[9]+.3,6,-12);
tl.to('#thW',{opacity:0,duration:.2},L[10]-.3);tl.to('#tfArmL',{rotation:0,duration:.2},L[10]-.3);

/* ================= SCENE 10: Zap: "Beep boop! Building the boat!" — three pancakes drop in, the mast goes up ================= */
camTo(L[10]-.45,.7,...CAM.build,'power2.inOut');
ZP.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);ZP.eyes(L[10],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[10]);tl.set('#zpAnt',{rotation:0},L[10]+DU[10]);
tl.to('#zpArmL',{rotation:130,duration:.2},L[10]+.15);
tl.set('#btW',{opacity:1,x:BTP[0],y:BTP[1],scale:.5},L[10]-.1);
const SLT=[L[10]+.1,W(10,2),W(10,4)];
SLT.forEach((t,k)=>{tl.set('#btS'+k,{opacity:1},t);tl.fromTo('#btS'+k,{y:-1500},{y:0,duration:.5,ease:'bounce.out'},t);
 dust(t+.42,BTP[0]-300+k*300,BTP[1]+170,1.4);sparks(t+.45,BTP[0],BTP[1]-30,5,160);shake(t+.4,7,4);hop('#zpSq',t+.4,30,.1,.14);});
tl.set('#btDr,#btBut',{opacity:1},SLT[2]+.5);tl.fromTo('#btBut',{scale:.1},{scale:1,duration:.3,ease:'back.out(2.4)'},SLT[2]+.5);tl.fromTo('#btDr',{scaleY:.1},{scaleY:1,duration:.4,ease:'power2.out'},SLT[2]+.5);
tl.set('#btMast',{opacity:1},L[11]-.25);tl.fromTo('#btMast',{scaleY:.02},{scaleY:1,duration:.5,ease:'power2.out'},L[11]-.25);

/* ================= SCENE 11: "By sunset, the boat was ready!" — the sail unfurls, the flag pops, everybody cheers while the sky turns orange ================= */
camTo(L[11]-.35,1.0,...CAM.wide,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.2},L[11]);
tl.set('#btSail',{opacity:1},L[11]+.1);tl.fromTo('#btSail',{scaleY:.02,scaleX:.4},{scaleY:1,scaleX:1,duration:.6,ease:'back.out(1.6)'},L[11]+.1);
tl.set('#btFlag',{opacity:1},W(11,5));tl.fromTo('#btFlag',{scale:.1,rotation:-30},{scale:1,rotation:0,duration:.35,ease:'back.out(2.4)'},W(11,5)-.1);
tl.fromTo('#btFlag',{skewY:-6},{skewY:6,duration:.2,yoyo:true,repeat:9,ease:'sine.inOut'},W(11,5)+.3);
tl.fromTo('#btSail',{skewY:0},{skewY:3,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},L[11]+.9);
tl.to('#duskR',{opacity:.28,duration:1.4},tSun);
faces2(W(11,5)-.1,'happy','Big');lookAll2(W(11,5),0,-10);armsUp(W(11,5),.15);
SQC.forEach((s,i)=>hop(s,W(11,5)+.05+i*.05,50,.14,.2));JQ.forEach((s,i)=>hop(s,W(11,5)+.2+i*.08,50,.12,.16));
confetti(W(11,5),600,2100,1300,2300,36,.9);hearts(W(11,5)+.1,1520,1500,5,120,260);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

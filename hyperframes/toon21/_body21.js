/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: back row gm/tf/pt/cm + the King at the fridge, front row mc/bo/zp/nm/bp in the gaps; the Golden Spatula is rolled to the front of the stage
const PEDX=1040, PEDY=ROWD, PEDS=.85;                      // where the Golden Spatula stands (front of the stage, left of Bo)
const PEDTOP=PEDY-560*PEDS;                                // the middle of the spatula's blade
// close-ups: the speaker's eyes sit ~40% down the frame, the frame edges fall in the gaps between characters
const CAM={open:[460,-170,.55], wide:[380,-220,.53],
 king:camOn(...eyeAt('kg',2170,ROWB,1.5),.9,600,780), bo:camOn(...eyeAt('bo',1300,ROWF+BOY,.88),.98,540,780),
 tru:[293,507,.95], coco:[1400,452,.9], ped:camOn(1100,1650,.85,540,900)};
const LX=880;
const tTable=.8;
const tSpat=W(7,3);                                        // "...the PRIZE for the best flipper!"
const tBlack=L[9]+.15;                                     // the lights go out
const tLights=L[11]-.05;                                   // ... and come back
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];

/* ================= SCENE 1: "Today was the Great Pancake Festival!" — the little saucer leaves, the festival table pops up ================= */
camSet(0,...CAM.open);
faces(0,'happy','Big');eyesMode(0,'hearts');lookAll(0,-10,0);
tl.to('#ufoLRamp',{scaleY:.05,duration:.2},.1);tl.to('#ufoL',{x:1500,y:-1800,duration:.9,ease:'power3.in'},.3);
dust(.3,LX-110,FLOOR+6,2);dust(.32,LX+110,FLOOR+6,2);shake(.3,8,6);
camTo(.5,1.8,...CAM.wide,'power2.inOut');
tl.fromTo('#fTable',{opacity:0,y:260},{opacity:1,y:0,duration:.5,ease:'back.out(1.6)'},tTable);
tl.fromTo('#fStacks > g',{opacity:0,y:-160},{opacity:1,y:0,duration:.35,stagger:.1,ease:'bounce.out'},tTable+.4);
tl.fromTo('#banner,#banner2',{y:-60},{y:0,duration:.5,ease:'bounce.out'},tTable);
sparks(tTable+.9,1350,1150,10,320);
armsDown(1.4,.3);faces(1.5,'happy','Big');

/* ================= SCENE 2: the King: "Welcome, everybody! Let the games begin!" — close on the King, then the whole room cheers ================= */
camTo(L[2]-.45,.8,...CAM.king,'power2.inOut');
KG.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);KG.eyes(L[2],'happy');
tl.to('#kgArmL',{rotation:120,duration:.3,ease:'back.out(2)'},L[2]);tl.to('#kgArmR',{rotation:-120,duration:.3,ease:'back.out(2)'},L[2]);
tl.fromTo('#kgBelly',{scale:1},{scale:1.08,duration:.16,yoyo:true,repeat:7},L[2]+.3);
lookAll(L[2]+.2,30,-16);
camTo(W(2,2)-.25,.8,...CAM.wide,'power2.inOut');                 // "...LET the games begin!"
confetti(W(2,2)+.1,500,2400,FLOOR-1300,ROWD+60,40,1.0);hearts(W(2,2),2170,900,5,120,300);
armsUp(W(2,2)+.1,.15);SQC.forEach((s,i)=>hop(s,W(2,2)+.3+i*.05,44,.12,.16));

/* ================= SCENE 3: Bo: "Wow! So many pancakes!" ================= */
camTo(L[3]-.45,.8,...CAM.bo,'power2.inOut');
armsDown(L[3]-.2,.2);
bTalk(L[3]+.02,L[3]+DU[3]-.08);look(L[3]+.05,-24,-14,.12);eyesMode(L[3]+.05,'hearts');
tl.to('#boArmL',{rotation:-140,duration:.2},L[3]+.4);tl.to('#boArmR',{rotation:140,duration:.2},L[3]+.4);
hop('#boSq',L[3]+.5,60,.15,.2);hearts(L[3]+.6,1267,1150,4,90,240);
lookAll(L[3]+.3,0,-20);

/* ================= SCENE 4: Truffle: "Free samples! Get them while they're hot!" ================= */
camTo(L[4]-.4,.8,...CAM.tru,'power2.inOut');
TF.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);TF.eyes(L[4],'happy');
tl.to('#tfArmL',{rotation:100,duration:.2,ease:'back.out(2)'},L[4]);tl.fromTo('#tfArmL',{rotation:100},{rotation:70,duration:.18,yoyo:true,repeat:9},L[4]+.2);
// warm slices fly from the table to everybody's mouth
[[1267,1470],[760,1585],[660,1135],[1560,1400]].forEach(([x,y],i)=>kslice(L[4]+.6+i*.28,1100,1060,x,y,.6,.9));
sparks(L[4]+.5,1100,1020,6,120);faces(L[4]+.3,'happy','Big');

/* ================= SCENE 5: Coco: "Ooh-ooh, banana pancakes!" ================= */
camTo(L[5]-.4,.8,...CAM.coco,'power2.inOut');
CM.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.12);cmEyes(L[5],'happy');
tl.to('#cmArmL',{rotation:150,duration:.12},L[5]);tl.to('#cmArmR',{rotation:-150,duration:.12},L[5]);
hop('#cmSq',L[5]+.1,200,.28,.3);hop('#cmSq',L[5]+.8,200,.28,.3);hearts(L[5]+.4,1880,1080,4,90,260);
// Zap slips out to the right to fetch the prize
runTo('zp',2720,PEDY,L[6]-1.05,.8,.7,20);

/* ================= SCENE 6: "Then Zap rolled out the Golden Spatula!" — he pushes it to the front of the stage ================= */
camTo(L[6]-.5,.8,...CAM.wide,'power2.inOut');
tl.set('#pedW',{opacity:1,x:2720-190,y:PEDY,scale:PEDS},L[6]-.25);
tl.fromTo('#pedW',{x:2720-190},{x:PEDX,duration:1.5,ease:'power1.out'},L[6]-.2);
runTo('zp',PEDX+190,PEDY,L[6]-.2,1.5,.7,20);
tl.fromTo('#pedW',{rotation:-2},{rotation:2,duration:.14,yoyo:true,repeat:9},L[6]-.2);tl.set('#pedW',{rotation:0},L[6]+1.3);
for(let k=0;k<4;k++) sparks(L[6]+.5+k*.32,PEDX+(4-k)*120,PEDTOP-80,5,90);
armsDown(L[6],.2);faces(L[6]+.5,'wide','O');lookAll(L[6]+.5,-30,14);
camTo(L[6]+1.25,.9,...CAM.ped,'power2.inOut');

/* ================= SCENE 7: Zap: "Beep boop! The prize for the best flipper!" ================= */
ZP.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);ZP.eyes(L[7],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:13},L[7]);tl.set('#zpAnt',{rotation:0},L[7]+DU[7]);
tl.to('#zpArmL',{rotation:120,duration:.25,ease:'back.out(2)'},L[7]+.3);
for(let k=0;k<3;k++) sparks(tSpat+k*.3,PEDX,PEDTOP-60,6,110);
tl.fromTo('#spat',{y:0},{y:-14,duration:.4,yoyo:true,repeat:5,ease:'sine.inOut'},L[7]);
faces(L[7]+.4,'happy','Big');lookAll(L[7]+.4,-20,20);

/* ================= SCENE 8: Mochi: "Hmph. It's shiny. Obviously." — she strolls up for a closer look ================= */
runTo('mc',PEDX-220,PEDY,L[8]-.6,.8,.74,20);
MC.m(L[8]+.1,'mFr');MC.talk(L[8]+.12,L[8]+DU[8]-.08,'mOp','mFr',.16);mcEyes(L[8]+.15,'lids');MC.brows(L[8]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.2},L[8]+.5);
sparks(L[8]+.3,PEDX,PEDTOP-80,5,90);

/* ================= SCENE 9: "But suddenly, all the lights went out!" ================= */
camTo(L[9]-.3,.8,...CAM.wide,'power2.inOut');
tl.fromTo('#night',{opacity:0},{opacity:.93,duration:.18},tBlack);
tl.fromTo('#night',{opacity:.93},{opacity:.6,duration:.1,yoyo:true,repeat:3},tBlack+.3);tl.set('#night',{opacity:.93},tBlack+.75);
faces(tBlack,'wide','O');lookAll(tBlack,0,-20);shake(tBlack,8,6);
tl.to('#tfSq,#nmSq,#cmSq,#mcSq,#bpSq,#zpSq,#ptSq,#gmSq,#boSq',{x:2,duration:.05,yoyo:true,repeat:11},tBlack+.2);tl.set('#tfSq,#nmSq,#cmSq,#mcSq,#bpSq,#zpSq,#ptSq,#gmSq,#boSq',{x:0},tBlack+.9);
// something takes the spatula in the dark... two little eyes slip away behind the pancake table
tl.set('#spat',{opacity:0},tBlack+.55);sparks(tBlack+.55,PEDX,PEDTOP-60,6,100);
tl.set('#sneak',{opacity:1},tBlack+.5);tl.fromTo('#sneakW',{x:PEDX,y:PEDTOP},{x:1850,y:1380,duration:1.6,ease:'none'},tBlack+.5);tl.set('#sneak',{opacity:0},tBlack+2.1);
tl.fromTo('#sneak',{scaleY:1},{scaleY:.1,duration:.08,yoyo:true,repeat:5},tBlack+1.0);

/* ================= SCENE 10: Blip: "Whoa! Who turned off the lights?" ================= */
BP.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);BP.eyes(L[10],'wide');
tl.to('#bpArmL',{rotation:150,duration:.12},L[10]);tl.to('#bpArmR',{rotation:-150,duration:.12},L[10]);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[10]);tl.set('#bpAntL',{rotation:0},L[10]+DU[10]+.1);
GH.eyes(L[10],'wide');tl.to('#ghGlow',{opacity:.9,duration:.2},L[10]);

/* ================= SCENE 11: "And the Golden Spatula was gone!" — lights on, an empty pedestal ================= */
tl.fromTo('#night',{opacity:.93},{opacity:0,duration:.25},tLights);
tl.fromTo('#flash',{opacity:.5},{opacity:0,duration:.3},tLights);
faces(tLights,'wide','O');lookAll(tLights,-30,14);GH.eyes(tLights,'wide');tl.to('#ghGlow',{opacity:.3,duration:.4},tLights+.3);
armsUp(tLights+.1,.12);SQC.forEach((s,i)=>hop(s,tLights+.2+i*.04,40,.12,.16));
KG.eyes(tLights,'wide');KG.m(tLights,'mO');tl.to('#kgArmL',{rotation:20,duration:.3},tLights);tl.to('#kgArmR',{rotation:-20,duration:.3},tLights);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

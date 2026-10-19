/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging (contest stage): one FLIP SPOT at the front of the stage; Truffle and Mochi each walk onto it for their turn and back to their mark after,
// Zap hosts from the front, the Jiggles watch from the front-right row, Bo flips from his own mark in the middle, the King judges at the fridge
const FLX=1150, FLY=ROWD;                                  // the flip spot
const K24={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
           mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1560,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
const SPH=[K24.bo[0]+90,K24.bo[1]-380];                    // where Bo holds the Golden Spatula
const CAM={sky:[380,-220,.53], wide:[380,-220,.53], zap:[790,889,.9],
 flip:camOn(...eyeAt('tf',FLX,FLY,.74),.95,540,820), ceil:[530,-420,.7], coco:[1400,560,.9], spin:[430,520,.75],
 bo:[860,778,1.1]};
const tCut=L[1]+.55;                                       // back into the kitchen
const tT=W(3,3);                                           // "...FLIP it high!"
const tHit=tT+1.0;                                         // the pancake hits the ceiling
const tM=L[7]+.1;                                          // Mochi's pancake takes off
const tB=W(8,5);                                           // "...tiny FLIP!"
const tF=W(9,3);                                           // "...FLAPJACK..."
const tScore=L[11]+.2;
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
// a pancake flips: spin + flat/edge-on flicker
const spin=(i,t,d,turns=2)=>{tl.fromTo('#pcq'+i,{rotation:0},{rotation:360*turns,duration:d,ease:'none'},t);tl.fromTo('#pcs'+i,{scaleY:1},{scaleY:-1,duration:d/(turns*2),repeat:turns*2-1,yoyo:true,ease:'sine.inOut'},t);};

/* ================= SCENE 1: "Now the Great Flip-Off could begin!" — back in the kitchen, everybody on their marks ================= */
camSet(0,...CAM.sky);
faces(0,'happy','Big');lookAll(0,0,-10);
tl.fromTo('#flash',{opacity:.9},{opacity:0,duration:.5},tCut);
tl.set('#skySet,#mcHat,#mcMag',{opacity:0},tCut);tl.set('#fTable,#table,#plate,#oven,#kg,#kcrnW,#kcrn',{opacity:1},tCut);
camSet(tCut,...CAM.wide);
for(const [p,[x,y,s]] of Object.entries(K24)) tl.set('#'+p,{x,y,scale:s},tCut);
tl.set('#mcArmR',{rotation:0},tCut);
tl.set('#gh',{x:1650,y:330},tCut);
tl.set('#flyW',{x:SPH[0],y:SPH[1]},tCut);
tl.set('#kgArmL',{rotation:120},tCut);tl.set('#kgArmR',{rotation:-120},tCut);KG.eyes(tCut,'happy');KG.m(tCut,'mBg');
armsDown(tCut+.1,.3);faces(tCut+.3,'happy','Big');
confetti(tCut+.2,500,2400,ROWB-1300,ROWJ+60,30,.8);

/* ================= SCENE 2: Zap: "Beep boop! First up, Truffle!" ================= */
tl.set('#sbW',{x:1560,y:430},L[2]-.3);
tl.fromTo('#sbW',{opacity:0,scale:.2},{opacity:1,scale:.8,duration:.4,ease:'back.out(2)'},L[2]-.3);
camTo(L[2]-.3,.9,...CAM.zap,'power2.inOut');
ZP.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);ZP.eyes(L[2],'happy');
tl.to('#zpArmL',{rotation:120,duration:.25,ease:'back.out(2)'},L[2]+.2);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[2]);tl.set('#zpAnt',{rotation:0},L[2]+DU[2]);
hop('#tfSq',L[2]+.9,50,.14,.2);TF.eyes(L[2]+.9,'happy');lookAll(L[2]+.9,-30,0);
// Truffle steps up to the flip spot
runTo('tf',FLX,FLY,L[2]+1.3,.8,.74,20);

/* ================= SCENE 3: Truffle: "Watch me flip it high!" ================= */
camTo(L[3]-.45,.8,...CAM.flip,'power2.inOut');
TF.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);
tl.to('#tfArmR',{rotation:-60,duration:.25},L[3]);
tl.to('#tfArmR',{rotation:-170,duration:.12,ease:'power2.in'},tT-.12);tl.to('#tfArmR',{rotation:0,duration:.3},tT+.1);
sparks(tT,FLX+40,FLY-250,6,80);
lookAll(L[3]+.2,-20,10);

/* ================= SCENE 4: "The pancake flew up, up, up!" — and sticks to the ceiling ================= */
tl.set('#pcw0',{opacity:1,x:FLX+40,y:FLY-250,scale:.9},tT-.02);
tl.fromTo('#pcw0',{y:FLY-250},{y:-70,duration:1.0,ease:'power2.out'},tT);tl.fromTo('#pcw0',{x:FLX+40},{x:FLX+150,duration:1.0,ease:'none'},tT);
spin(0,tT,1.0,2);
camTo(tT+.1,.9,...CAM.ceil,'power2.inOut');
tl.set('#pcw0',{opacity:0},tHit);
tl.set('#splatW',{opacity:1,x:FLX+150,y:-62,scale:.9},tHit);tl.fromTo('#splat',{scaleY:.2},{scaleY:1,duration:.3,ease:'back.out(2)'},tHit);
tl.fromTo('#drips',{y:-30},{y:0,duration:.5},tHit+.2);
bits(tHit,FLX+150,-30,8);shake(tHit,8,5);sparks(tHit,FLX+150,-40,6,90);
faces(tHit+.1,'wide','O');lookAll(tHit+.1,10,-50);

/* ================= SCENE 5: Coco: "Ooh-ooh! It hit the ceiling!" ================= */
camTo(L[5]-.3,.8,...CAM.coco,'power2.inOut');
CM.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.12);cmEyes(L[5],'happy');
tl.to('#cmArmL',{rotation:150,duration:.12},L[5]);tl.to('#cmArmR',{rotation:-150,duration:.12},L[5]);
hop('#cmSq',L[5]+.1,180,.26,.3);hop('#cmSq',L[5]+.8,180,.26,.3);
tl.fromTo('#drips',{y:0},{y:50,duration:1.6},L[5]);
runTo('tf',K24.tf[0],K24.tf[1],L[5]+.1,.9,.74,18);                 // Truffle goes back to her mark

/* ================= SCENE 6: Mochi: "Hmph. My turn. Obviously." ================= */
runTo('mc',FLX,FLY,L[6]-.6,.8,.74,20);
camTo(L[6]-.4,.8,...CAM.flip,'power2.inOut');
MC.m(L[6]+.1,'mFr');MC.talk(L[6]+.12,L[6]+DU[6]-.08,'mOp','mFr',.16);mcEyes(L[6]+.15,'lids');MC.brows(L[6]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-120,duration:.25},L[6]+.8);
lookAll(L[6]+.2,-20,10);

/* ================= SCENE 7: "Mochi's pancake spun like a spaceship!" ================= */
camTo(L[7]-.3,.8,...CAM.spin,'power2.inOut');
tl.set('#pcw1',{opacity:1,x:FLX,y:FLY-380,scale:.8},tM-.02);
const NSP=20,CX=FLX,CY=1000;
tl.fromTo('#pcw1',{y:FLY-380},{y:CY,duration:.5,ease:'power2.out'},tM);
for(let k=0;k<NSP;k++){const a0=(k/NSP)*Math.PI*2*1.5,a1=((k+1)/NSP)*Math.PI*2*1.5,t0=tM+.5+k*(1.7/NSP);
 tl.to('#pcw1',{x:CX+Math.sin(a1)*330,y:CY-Math.cos(a1)*70,duration:1.7/NSP,ease:'none'},t0);sparks(t0,CX+Math.sin(a0)*330,CY-Math.cos(a0)*70+20,1,40);}
tl.fromTo('#pcq1',{rotation:-8},{rotation:8,duration:.2,yoyo:true,repeat:11},tM);
tl.to('#pcw1',{x:CX,y:FLY-420,duration:.5,ease:'power2.in'},tM+2.2);tl.set('#pcw1',{opacity:0},tM+2.75);sparks(tM+2.75,CX,FLY-420,8,100);
faces(tM+.3,'wide','O');lookAll(tM+.3,0,-40);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:11},tM);tl.set('#zpAnt',{rotation:0},tM+1.6);
runTo('mc',K24.mc[0],K24.mc[1],tM+2.3,.7,.74,18);                  // Mochi goes back to her mark

/* ================= SCENE 8: Bo: "Here goes. Just one tiny flip!" — from his own mark in the middle ================= */
camTo(L[8]-.3,.8,...CAM.bo,'power2.inOut');
bTalk(L[8]+.02,L[8]+DU[8]-.08);brows(L[8]+.05,14,-14,-4,.15);eyesMode(L[8]+.05,'wide');look(L[8]+.05,0,-20,.15);
tl.to('#gspIn',{rotation:215,duration:.4},L[8]+.2);
tl.to('#gspIn',{rotation:100,duration:.12,ease:'power2.in'},tB-.12);tl.to('#gspIn',{rotation:180,duration:.35},tB+.1);
const PB=[K24.bo[0]+60,K24.bo[1]-330];
tl.set('#pcw2',{opacity:1,x:PB[0],y:PB[1],scale:.9},tB-.02);
tl.fromTo('#pcw2',{y:PB[1]},{y:PB[1]-820,duration:.8,ease:'power2.out'},tB);tl.fromTo('#pcw2',{x:PB[0]},{x:PB[0]+40,duration:.8,ease:'none'},tB);spin(2,tB,.8,2);
sparks(tB,PB[0]+20,PB[1]-10,6,80);
lookAll(L[8]+.3,0,-20);

/* ================= SCENE 9: "But Bo flipped Flapjack, too!" ================= */
tl.to('#bh',{y:-900,rotation:720,duration:.9,ease:'power2.out'},tF);
tl.fromTo('#pcw2',{y:PB[1]-820},{y:PB[1]+30,duration:.9,ease:'power2.in'},tB+.8);tl.set('#pcw2',{opacity:0},tB+1.7);
FB.pm(tF,'Oh');faces(tF+.1,'wide','O');lookAll(tF+.1,0,-40);
sparks(tF,K24.bo[0],K24.bo[1]-800,8,120);

/* ================= SCENE 10: Flapjack: "Wheee! Catch me if you can!" ================= */
FB.talk(L[10]+.02,L[10]+DU[10]-.06,'Gr','Sm',.13);
tl.to('#bh',{y:0,rotation:1440,duration:.9,ease:'bounce.out'},L[10]+.9);
tl.fromTo('#boSq',{y:0},{y:20,duration:.1,yoyo:true,repeat:1},L[10]+1.7);
faces(L[10]+.6,'happy','Big');

/* ================= SCENE 11: "Everybody got a perfect ten!" — pull back to the whole room and the scoreboard ================= */
camTo(L[11]-.35,1.0,...CAM.wide,'power2.inOut');
[0,1,2].forEach(i=>{const t=tScore+i*.45;tl.set('#sbq'+i,{opacity:0},t);tl.fromTo('#sbt'+i,{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(2.6)'},t);sparks(t,1560+(i-1)*117,430,6,110);});
tl.fromTo('#sb',{rotation:-1.5},{rotation:1.5,duration:.25,yoyo:true,repeat:9},tScore);tl.set('#sb',{rotation:0},tScore+2.6);
confetti(tScore+.8,500,2400,ROWB-1300,ROWJ+60,40,1.0);hearts(tScore+1.0,1267,1150,6,140,300);
armsUp(tScore+.9,.15);SQC.forEach((s,i)=>hop(s,tScore+1.0+i*.05,44,.12,.16));
['j1','j2','j3','j4'].forEach((j,i)=>hop(`#${j}Sq`,tScore+1.0+i*.08,60,.14,.18));
KG.m(tScore+.8,'mBg');KG.eyes(tScore+.8,'happy');
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

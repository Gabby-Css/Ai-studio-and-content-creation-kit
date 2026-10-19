
/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={fr:[1480,420,.95], wide:[1250,300,.82], duel:[1450,360,.92], tru:[1000,330,1.0], deal:[1330,250,.9], pile:[1500,330,.9], end:[830,-540,.62]};
const KX=2170, KS=1.9, K=KS/1.5, KMOUTH=FLOOR-414*K;                   // the crowned King stands where the fridge is
const tPop=W(1,4);                                         // "...POPPED..."
const tBulb=L[6]+.35;
const tSun=W(7,3);                                         // "...EVERY Sunday!"
const tDeal=W(8,3);                                        // "...DEAL!"
const tSlice=W(10,5)-.2;                                   // "...for EVERYBODY!"
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const landSq=(sq,t,s=.62)=>tl.fromTo(sq,{scaleY:s,scaleX:1.32},{scaleY:1,scaleX:1,duration:.42,ease:'elastic.out(1,.4)'},t);
let trn=0;
function tears(t,x,y,n=3,dx=26,fall=260){for(let k=0;k<n;k++){const i=(trn++)%8,tt=t+k*.22,sx=(k%2?1:-1)*dx;
 tl.set('#trw'+i,{x:x+sx,y:y},tt);
 tl.fromTo('#tr'+i,{opacity:0,y:0,scale:.5},{opacity:1,y:fall*.12,scale:1,duration:.15},tt);
 tl.to('#tr'+i,{y:fall,opacity:0,duration:.65,ease:'power2.in'},tt+.15);}}
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}

/* ================= SCENE 1: "Out of the fridge popped... the Gloop King!" ================= */
camSet(0,...CAM.fr);
faces(0,'wide','O');lookAll(0,40,-6);J1.eyes(0,'wide');J1.m(0,'mO');
tl.fromTo('#kdPup',{x:-14},{x:14,duration:.45,yoyo:true,repeat:9,ease:'sine.inOut'},0);
tl.fromTo('#fridgeBack,#fridgeInner,#fridgeDoor',{x:0},{x:8,duration:.04,yoyo:true,repeat:17},tPop-.75);shake(tPop-.75,5,8);
// POP — he squeezes out of the fridge and grows!
tl.fromTo('#flash',{opacity:.85},{opacity:0,duration:.35},tPop);
tl.set('#kg',{opacity:1,x:KX,y:1330,scale:.12},tPop);
tl.fromTo('#kg',{scale:.12,y:1330},{scale:KS,y:FLOOR,duration:.6,ease:'back.out(1.8)'},tPop);
tl.set('#kcrnW',{x:KX,y:1330-505*.12},tPop);tl.set('#kcrn',{opacity:1,scale:.12},tPop);
tl.fromTo('#kcrnW',{y:1330-505*.12},{y:FLOOR-505*KS,duration:.6,ease:'back.out(1.8)'},tPop);
tl.fromTo('#kcrn',{scale:.12},{scale:K,duration:.6,ease:'back.out(1.8)'},tPop);
tl.set('#kdPeek',{opacity:0},tPop+.05);
sparks(tPop,KX,1330,10,200);sparks(tPop+.25,KX,FLOOR-300,10,320);dust(tPop+.5,KX-150,FLOOR+6,1.8);dust(tPop+.52,KX+150,FLOOR+6,1.8);shake(tPop+.5,12,6);
KG.eyes(tPop,'wide');KG.m(tPop,'mBg');KG.brows(tPop,0,0,0,.1);
tl.to('#kgArmL',{rotation:60,duration:.3},tPop+.6);tl.to('#kgArmR',{rotation:-60,duration:.3},tPop+.6);
faces(tPop+.1,'wide','O');lookAll(tPop+.1,0,-30);
tl.to('#pt',{x:1740,duration:.35,ease:'power2.out'},tPop+.1);tl.to('#j1',{x:1640,duration:.35,ease:'power2.out'},tPop+.1);
tl.fromTo('#kgBelly',{scale:1},{scale:1.08,duration:.14,yoyo:true,repeat:5},tPop+.7);
camTo(tPop+.1,1.0,...CAM.wide,'power2.inOut');
KG.eyes(tPop+1.0,'normal');KG.m(tPop+1.0,'mSm');

/* ================= SCENE 2: King: "Jiggle! Time to come home!" ================= */
KG.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.14);KG.eyes(L[2],'normal');
tl.to('#kgArmL',{rotation:115,duration:.25,ease:'back.out(2)'},W(2,0));tl.to('#kgArmL',{rotation:60,duration:.3},L[2]+DU[2]);
runTo('j1',1635,FLOOR+20,L[2]+.3,.6,.62,18);
J1.eyes(L[2]+.2,'wide');J1.m(L[2]+.2,'mO');
tl.to('#j1ArmL',{rotation:40,duration:.2},L[2]+.95);tl.to('#j1ArmR',{rotation:-40,duration:.2},L[2]+.95);
faces(L[2]+.2,'wide','O');look(L[2]+.2,40,-6,.15);

/* ================= SCENE 3: Jiggle (sad): "But I like it here..." ================= */
J1.eyes(L[3],'normal');J1.brows(L[3],-18,18,0,.2);J1.talk(L[3]+.02,L[3]+DU[3]-.05,'mFr','mO',.3);
tears(L[3]+.15,1635,FLOOR-190,4,24,150);
tl.fromTo('#j1Lean',{rotation:0},{rotation:-6,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},L[3]);
tl.fromTo('#j1Sq',{scaleY:1},{scaleY:.95,duration:.4,yoyo:true,repeat:4},L[3]);
KG.eyes(L[3],'normal');KG.m(L[3],'mFr');KG.brows(L[3],-12,12,0,.2);
look(L[3]+.1,-24,10,.2);brows(L[3],-10,10,-4,.2);bm(L[3]+.1,'mFrown');

/* ================= SCENE 4: Bo: "Wait! Jiggle is our friend!" ================= */
camTo(L[4]-.3,.9,...CAM.duel,'power2.inOut');
tl.to('#bo',{x:1810,duration:.5,ease:'back.out(1.4)'},L[4]-.15);
cycle(['#boLegL','#boLegR'],[],L[4]-.15,L[4]+.35,.3,18,0,'#boSq',6);
tl.to('#boArmL',{rotation:-95,duration:.2,ease:'back.out(2)'},L[4]+.4);tl.to('#boArmR',{rotation:95,duration:.2,ease:'back.out(2)'},L[4]+.4);
bTalk(L[4]+.02,L[4]+DU[4]-.08);brows(L[4]+.05,14,-14,-4,.15);look(L[4]+.05,34,-8,.15);eyesMode(L[4]+.05,'wide');
KG.eyes(L[4],'wide');KG.m(L[4],'mO');KG.brows(L[4],0,0,0,.1);tl.to('#kgArmL',{rotation:0,duration:.3},L[4]);
tl.to('#j1ArmL',{rotation:0,duration:.2},L[4]+.4);tl.to('#j1ArmR',{rotation:0,duration:.2},L[4]+.4);J1.eyes(L[4]+.6,'normal');J1.m(L[4]+.6,'mSm');
tl.fromTo('#boLean',{rotation:-3},{rotation:3,duration:.2,yoyo:true,repeat:5},L[4]+.5);

/* ================= SCENE 5: King (sad): "But I miss him. The palace is so quiet." ================= */
KG.talk(L[5]+.02,L[5]+DU[5]-.08,'mFr','mO',.3);KG.eyes(L[5],'normal');KG.brows(L[5],-18,18,0,.2);
tl.to('#kcrnW',{y:FLOOR-505*KS+40,duration:.5},L[5]+.3);tl.to('#kcrn',{rotation:-12,duration:.5},L[5]+.3);
tl.to('#kgArmL',{rotation:20,duration:.4},L[5]);tl.to('#kgArmR',{rotation:-20,duration:.4},L[5]);
tl.fromTo('#kgSq',{scaleY:1},{scaleY:.96,duration:.8,yoyo:true,repeat:3},L[5]);
tears(L[5]+.25,KX,FLOOR-480*K,7,87*K,330);
faces(L[5]+.2,'normal','Fr');eyesMode(L[5]+.2,'normal');brows(L[5]+.2,-10,10,-4,.2);bm(L[5]+.2,'mFrown');
tl.to('#boArmL',{rotation:-20,duration:.3},L[5]+.4);tl.to('#boArmR',{rotation:20,duration:.3},L[5]+.4);

/* ================= SCENE 6: "So Truffle had a delicious idea!" ================= */
camTo(L[6]-.3,.9,...CAM.tru,'power2.inOut');
tl.set('#bulb',{x:1225,y:1040},tBulb-.3);
tl.fromTo('#bulb',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},tBulb);
tl.fromTo('#bulbIn',{scale:1},{scale:1.12,duration:.15,yoyo:true,repeat:5},tBulb+.3);
sparks(tBulb+.2,1225,980,6,90);tl.to('#bulb',{opacity:0,duration:.25},tBulb+1.6);
TF.eyes(tBulb,'happy');TF.m(tBulb,'mBg');
tl.to('#tfArmL',{rotation:150,duration:.12},tBulb);tl.to('#tfArmR',{rotation:-150,duration:.12},tBulb);
hop('#tfSq',tBulb+.2,60,.14,.2);hop('#tfSq',tBulb+.8,60,.14,.2);
look(tBulb,-14,-20,.2);brows(tBulb,0,0,0,.2);

/* ================= SCENE 7: Truffle: "Come for pancakes every Sunday!" ================= */
camTo(L[7]-.45,.9,...CAM.deal,'power2.inOut');
TF.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);TF.eyes(L[7],'happy');
runTo('tf',1960,FLOOR+80,L[7]-.25,.75,.8,20);
tl.to('#tf',{scale:.8,duration:.7},L[7]-.25);
tl.set('#sunTag',{x:1960,y:FLOOR-470},tSun);
tl.fromTo('#sunTag',{opacity:0,scale:.2,rotation:-12},{opacity:1,scale:.75,rotation:-3,duration:.35,ease:'back.out(2.4)'},tSun);
tl.fromTo('#sunTagIn',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tSun+.35);
sparks(tSun+.1,1960,FLOOR-470,8,150);
tl.to('#sunTag',{opacity:0,scale:.3,duration:.25},L[8]+.55);
KG.eyes(L[7]+.4,'wide');KG.m(L[7]+.4,'mO');KG.brows(L[7]+.4,6,-6,0,.15);

/* ================= SCENE 8: King: "Pancakes every Sunday? Deal!" ================= */
KG.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);KG.eyes(L[8],'happy');KG.brows(L[8],0,0,0,.15);
tl.to('#kcrnW',{y:FLOOR-505*KS,duration:.4,ease:'back.out(2)'},L[8]);tl.to('#kcrn',{rotation:0,duration:.4},L[8]);
tl.to('#kgArmL',{rotation:100,duration:.3,ease:'back.out(2)'},tDeal-.3);
tl.fromTo('#boArmL',{rotation:-95},{rotation:-80,duration:.12,yoyo:true,repeat:7},tDeal);
tl.fromTo('#kgArmL',{rotation:100},{rotation:85,duration:.12,yoyo:true,repeat:7},tDeal);
tl.fromTo('#kgBelly',{scale:1},{scale:1.1,duration:.14,yoyo:true,repeat:5},tDeal);
hearts(tDeal,KX,FLOOR-720*K,6,110,260);sparks(tDeal,KX,FLOOR-500*K,10,260);
faces(L[8]+.2,'happy','Big');eyesMode(L[8]+.2,'hearts');bm(L[8]+.2,'mBig');
J1.eyes(L[8]+.3,'happy');J1.brows(L[8]+.3,0,0,0,.2);J1.m(L[8]+.3,'mBg');
hop('#j1Flip',tDeal,70,.16,.2);hop('#tfSq',tDeal+.1,70,.16,.2);

/* ================= SCENE 9: "Everybody hugged the King!" ================= */
camTo(L[9]-.3,1.0,...CAM.pile,'power2.inOut');
const HUG=[['mc',1800,FLOOR+30,.68],['cm',1880,FLOOR+60,.76],['nm',1960,FLOOR+90,.5],['bo',2060,FLOOR+130,.88],['pt',2230,FLOOR+90,.7],['tf',2330,FLOOR+90,.8],['zp',2410,FLOOR+90,.68],['bp',2480,FLOOR+40,.62],['gm',2600,FLOOR,1.5]];
HUG.forEach(([p,x,y,s],i)=>{const t0=L[9]+.05+i*.04,dur=1.3-i*.03;
 runTo(p,x,y,t0,dur,s,24);
 tl.to(`#${p}ArmL`,{rotation:p==='bo'?-160:150,duration:.2},t0+dur);tl.to(`#${p}ArmR`,{rotation:p==='bo'?160:-150,duration:.2},t0+dur);
 hop(`#${p}Sq`,t0+dur+.05+i*.04,40,.12,.16);});
tl.to('#boArmL',{rotation:-160,duration:.2},L[9]+1.4);tl.to('#boArmR',{rotation:160,duration:.2},L[9]+1.4);
runTo('j1',KX,FLOOR-790*K,L[9]+.1,.9,.62,0);arc('#j1',L[9]+.1,.9,FLOOR+20,260,FLOOR-790*K);
landSq('#j1Sq',L[9]+1.0,.8);
KG.eyes(L[9],'happy');KG.m(L[9],'mBg');tl.to('#kgArmL',{rotation:140,duration:.3},L[9]+.9);tl.to('#kgArmR',{rotation:-140,duration:.3},L[9]+.9);
tl.fromTo('#kgBelly',{scale:1},{scale:1.12,duration:.16,yoyo:true,repeat:9},L[9]+1.0);
tl.fromTo('#kgSq',{y:0},{y:-24,duration:.16,yoyo:true,repeat:7},L[9]+1.0);
hearts(L[9]+1.0,KX,FLOOR-700*K,7,130,300);hearts(L[9]+1.6,KX-190,FLOOR-500*K,5,110,260);hearts(L[9]+2.0,KX+190,FLOOR-500*K,5,110,260);
sparks(L[9]+1.4,KX,FLOOR-400*K,10,300);
faces(L[9]+1.4,'happy','Big');eyesMode(L[9]+1.4,'hearts');
J1.eyes(L[9]+1.0,'happy');J1.m(L[9]+1.0,'mBg');

/* ================= SCENE 10: Bo: "Just one tiny bite... for everybody!" ================= */
tl.set('#feastPc',{opacity:1,x:1960,y:FLOOR+160,scale:.2},L[10]-.15);
tl.fromTo('#feastPc',{scale:.2},{scale:1.4,duration:.5,ease:'back.out(2.4)'},L[10]-.15);
sparks(L[10]+.1,1960,FLOOR-40,8,160);
bTalk(L[10]+.02,L[10]+DU[10]-.08);
const SLC=HUG.filter(h=>h[0]!=='bo').map(([p,x,y,s])=>[x,y-330*s]);
SLC.forEach(([x,y],i)=>kslice(tSlice+i*.1,1960,FLOOR+20,x,y,.55,.9));
kslice(tSlice+.2,1960,FLOOR+20,KX,KMOUTH,.75,1.3);
KG.m(tSlice+.8,'mBg');KG.m(tSlice+1.1,'mSm');KG.eyes(tSlice+.9,'happy');
tl.to('#feastPc',{scale:.02,duration:.8,ease:'power1.in'},tSlice+1.0);tl.set('#feastPc',{opacity:0},tSlice+1.85);
confetti(tSlice+.5,1850,2600,FLOOR-1050,FLOOR+60,36,.9);
SQALL.forEach((s,i)=>hop(s,tSlice+.9+i*.05,40,.12,.16));
tl.fromTo('#kgBelly',{scale:1},{scale:1.25,duration:.4,ease:'back.out(2)'},tSlice+.9);

/* ================= SCENE 11: "And that was only the beginning!" ================= */
camTo(L[11]-.3,1.3,...CAM.end,'power2.inOut');
lookAll(L[11]+.3,-40,0);KG.look(L[11]+.3,-40,0,.2);J1.look(L[11]+.3,-40,0,.2);
tl.fromTo('#ufoLIn',{scale:1},{scale:1.06,duration:.18,yoyo:true,repeat:9},L[11]+.4);
sparks(L[11]+.5,880,FLOOR-230,6,100);sparks(L[11]+1.1,880,FLOOR-260,6,130);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:15},L[11]+.4);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:11},L[11]+.4);
tl.to('#bpArmR',{rotation:-85,duration:.25,ease:'back.out(2)'},L[11]+.5);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

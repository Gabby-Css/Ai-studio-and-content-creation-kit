/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={win:[200,260,1.45], main:[700,-150,.72], blip:[1000,-40,.86]};
const LX=880;                                              // where the little saucer lands
const tSwish1=.45;                                         // away from the window shot
const tDesc=W(1,1)-.1, tLand=W(1,3)+.25;                   // the saucer comes down / touches the floor
const tRamp=tLand+.35, tBlipOut=tLand+.75, tZapOut=tLand+1.45;
const tFJ=L[3]-.1;                                         // Flapjack leaps off Bo's head
const tZapGo=L[5]-.4;                                      // Zap walks to the gang
const tPop=W(6,4)-.05;                                     // "HEAD": Zap's head pops off
const tFound=L[7]+DU[7]+.15;                               // ...and goes back on
const tBeep=[W(8,4),W(8,5),W(8,6)];                        // Blip's scanner: beep, beep, beep
const tCake=W(9,2)-.1;                                     // "BIRTHDAY!" cake icon
const tWow=L[10];
const tSwish2=L[11]-.55;                                   // swish back to the window: Peanut!
const tStk=L[11]+DU[11]+.35;

/* --- small helpers --- */
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const cmEyes=(t,mode)=>{
 tl.set('#cmEyes',{opacity:(mode==='happy'||mode==='dizzy')?0:1},t);
 tl.set('#cmEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#cmEyesDizzy',{opacity:mode==='dizzy'?1:0},t);
 if(mode==='normal'||mode==='wide'){tl.to('.cmEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.cmPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const run=(id,sq,legs,arms,x0,x1,t0,dur,amp,bob,ease='none')=>{tl.fromTo(id,{x:x0},{x:x1,duration:dur,ease},t0);cycle(legs,arms,t0,t0+dur,.2,amp,amp*.8,sq,bob);};
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);
 ['tf','nm','mc','cm','gm','bp','zp'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let rgn=0;
function ring(t,x,y,sc=1){const i=(rgn++)%4;tl.set('#rgw'+i,{x,y},t);tl.fromTo('#rg'+i,{opacity:.95,scale:.3*sc},{opacity:0,scale:2.4*sc,duration:.6,ease:'power1.out'},t);}

/* ================= SCENE 0: the last frame of video #8 — the window, the UFO and a little alien in its beam ================= */
camSet(0,...CAM.win);
eyesMode(0,'wide');bm(0,'mO');brows(0,-14,14,-10,.01);look(0,-30,-8,.01);FB.pm(0,'Oh');
TF.eyes(0,'wide');TF.m(0,'mO');NN.eyes(0,'wide');NN.m(0,'mO');cmEyes(0,'wide');CM.m(0,'mO');mcEyes(0,'wide');MC.m(0,'mO');
GM.eyes(0,'wide');GM.m(0,'mO');GH.eyes(0,'wide');GH.m(0,'mO');GH.look(0,-26,-8,.01);
tl.fromTo('#ufoIn',{y:0},{y:-6,duration:.3,yoyo:true,repeat:1},0);
tl.fromTo('#ufoBlip',{rotation:-8},{rotation:8,duration:.2,yoyo:true,repeat:1},0);
// swish back into the kitchen: the window saucer leaves, the lights come up
camTo(tSwish1,.7,...CAM.main,'power3.inOut');
tl.to('#ufo',{opacity:0,duration:.3},tSwish1);
tl.to('#night',{opacity:0,duration:.8},tSwish1+.3);
tl.to('#discoIn',{y:-420,duration:.7,ease:'power2.in'},tSwish1+.2);tl.set('#disco',{opacity:0},tSwish1+.95);
for(let i=0;i<12;i++) tl.to('#pf'+i,{opacity:0,duration:.4},tSwish1+.2);
tl.to('#gh',{x:1260,y:880,duration:.9,ease:'sine.inOut'},tSwish1);tl.to('#ghGlow',{scale:1.2,opacity:.55,duration:.6},tSwish1);
tl.fromTo('#ghSq',{y:0},{y:-18,duration:.7,yoyo:true,repeat:35,ease:'sine.inOut'},tSwish1+.9);
lookAll(tSwish1+.4,-12,-30);

/* ================= SCENE 1: "A tiny spaceship landed on the floor!" ================= */
tl.set('#ufoL',{opacity:1},tDesc);
tl.fromTo('#ufoLIn',{y:-1100,rotation:-12},{y:0,rotation:0,duration:tLand-tDesc,ease:'power2.in'},tDesc);
tl.fromTo('#ufoLIn',{scaleY:1,scaleX:1},{scaleY:.9,scaleX:1.06,duration:.12,yoyo:true,repeat:1},tLand);
dust(tLand,LX-170,FLOOR+6,1.4);dust(tLand+.03,LX+170,FLOOR+6,1.4);shake(tLand,9,5);
sparks(tLand+.05,LX,FLOOR-250,6,150);
// everybody stares, then crowds in
lookAll(tDesc,-22,-30);
tl.fromTo('#gmSq',{scaleY:1},{scaleY:1.04,duration:.2,yoyo:true,repeat:1},tLand);
eyesMode(tLand+.2,'wide');look(tLand+.2,-26,-4,.12);
// the ramp opens and Blip + Zap step out
tl.set('#ufoLRamp',{svgOrigin:'52 -120'},0);
tl.fromTo('#ufoLRamp',{scaleY:0},{scaleY:1,duration:.3,ease:'back.out(1.6)'},tRamp);
const RX=LX+60, RX2=LX+150;                                // top / bottom of the ramp
tl.set('#bp',{opacity:1,x:RX,y:FLOOR-110},tBlipOut);
tl.fromTo('#bp',{x:RX},{x:RX2+40,duration:.55,ease:'none'},tBlipOut);
tl.fromTo('#bp',{y:FLOOR-110},{y:FLOOR,duration:.55,ease:'none'},tBlipOut);
BP.m(tBlipOut,'mBg');BP.eyes(tBlipOut,'wide');BP.look(tBlipOut,-20,6,.1);
tl.set('#zp',{opacity:1,x:RX,y:FLOOR-110},tZapOut);
tl.fromTo('#zp',{x:RX},{x:RX2+130,duration:.6,ease:'none'},tZapOut);
tl.fromTo('#zp',{y:FLOOR-110},{y:FLOOR,duration:.6,ease:'none'},tZapOut);
ZP.m(tZapOut,'mSm');ZP.eyes(tZapOut,'normal');
cycle(['#zpLegL','#zpLegR'],['#zpArmL','#zpArmR'],tZapOut,tZapOut+.6,.3,14,10,'#zpSq',6);
tl.fromTo('#zpAnt',{rotation:-10},{rotation:10,duration:.2,yoyo:true,repeat:7},tZapOut);

/* ================= SCENE 2: Blip: "Greetings, Earth! Is this... a sandwich?" ================= */
const tBw=L[2]-.1, dBw=2.7;
tl.fromTo('#bp',{x:RX2+40},{x:1560,duration:dBw,ease:'sine.inOut'},tBw);
cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],tBw,tBw+dBw,.34,22,10,'#bpSq',9);
BP.talk(L[2]+.02,L[2]+DU[2]-.1,'mOp','mSm',.14);BP.eyes(L[2],'normal');BP.look(L[2],26,-14,.2);BP.brows(L[2],-6,6,-4,.15);
tl.fromTo('#bpAntL',{rotation:-8},{rotation:8,duration:.25,yoyo:true,repeat:9},L[2]);tl.fromTo('#bpAntR',{rotation:8},{rotation:-8,duration:.25,yoyo:true,repeat:9},L[2]);
tl.to('#bpArmR',{rotation:-120,duration:.2,ease:'back.out(2)'},W(2,4));tl.fromTo('#bpArmR',{rotation:-120},{rotation:-95,duration:.14,yoyo:true,repeat:5},W(2,4)+.2);
BP.m(WE(2,4)+.1,'mSm');
// the gang stares, confused; Bo sweats
eyesMode(L[2],'normal');bm(L[2],'mO');brows(L[2],-8,8,-6,.15);look(L[2],-24,-4,.2);FB.pm(L[2],'Wo');
TF.eyes(L[2],'normal');NN.eyes(L[2],'normal');CM.m(L[2],'mFr');cmEyes(L[2],'normal');mcEyes(L[2],'lids');MC.m(L[2],'mFr');GM.eyes(L[2],'normal');GM.m(L[2],'mSm');
tl.set('#boSweat',{opacity:1},W(2,4));

/* ================= SCENE 3/4: Flapjack: "Catch me if you can!" — the chase ================= */
tl.set('#bh',{opacity:0},tFJ);
tl.set('#pan',{opacity:1,x:1740,y:1112,scale:.78},tFJ);
FJ.pm(tFJ,'Gr');FJ.look(tFJ,20,0,.1);FJ.eyes(tFJ,true);
tl.to('#boArmL',{rotation:-120,duration:.1},tFJ);tl.to('#boArmR',{rotation:120,duration:.1},tFJ);tl.to('#boArmL',{rotation:0,duration:.3},tFJ+.4);tl.to('#boArmR',{rotation:0,duration:.3},tFJ+.4);
const P=[[tFJ,1740,1800,.5,'arc'],[tFJ+.55,1800,1150,1.05],[tFJ+1.6,1150,1900,1.15],[tFJ+2.75,1900,1300,1.1],[tFJ+3.85,1300,1740,1.0,'up']];
tl.fromTo('#pan',{x:1740},{x:1800,duration:.5,ease:'none'},tFJ);arc('#pan',tFJ,.5,1112,120,FLOOR);
P.slice(1).forEach(([t,a,b,d,k],i)=>{
 tl.fromTo('#pan',{x:a},{x:b,duration:d,ease:'none'},t);
 cycle(['#panLegL','#panLegR'],['#panArmL','#panArmR'],t,t+d,.18,36,30,'#panSq',16);
 if(k==='up'){arc('#pan',t+d-.5,.5,FLOOR,200,1112);}
 FJ.pm(t,i%2?'Sm':'Gr');
 dust(t+.05,a,FLOOR+6,.7);});
tl.set('#bh',{opacity:1},tFJ+4.85);tl.set('#pan',{opacity:0},tFJ+4.85);
// Blip chases (a step behind, getting tired)
const B=[[tFJ+.45,1560,1780,.6],[tFJ+1.15,1780,1250,1.1],[tFJ+2.35,1250,1850,1.25],[tFJ+3.7,1850,1380,1.15],[tFJ+4.95,1380,1700,.9]];
B.forEach(([t,a,b,d])=>{tl.fromTo('#bp',{x:a},{x:b,duration:d,ease:'none'},t);cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],t,t+d,.2,30,26,'#bpSq',12);});
BP.m(tFJ+.4,'mBg');BP.eyes(tFJ+.4,'wide');BP.brows(tFJ+.4,10,-10,-4,.1);BP.look(tFJ+.4,-26,10,.1);
BP.talk(tFJ+1.2,tFJ+4.8,'mBg','mOp',.18);
tl.fromTo('#bpAntL',{rotation:-18},{rotation:18,duration:.1,yoyo:true,repeat:30},tFJ+.4);tl.fromTo('#bpAntR',{rotation:18},{rotation:-18,duration:.1,yoyo:true,repeat:30},tFJ+.4);
tl.set('#bpAntL,#bpAntR',{rotation:0},tFJ+3.6);
// the audience follows the chase with their eyes
[[tFJ+.6,-26],[tFJ+1.7,28],[tFJ+2.9,-26],[tFJ+4.0,28]].forEach(([t,dx])=>lookAll(t,dx,-6));
eyesMode(tFJ,'wide');bm(tFJ,'mBig');tl.set('#boSweat',{opacity:0},tFJ);
TF.m(tFJ,'mBg');NN.m(tFJ,'mBg');CM.m(tFJ,'mBg');MC.m(tFJ,'mO');mcEyes(tFJ,'wide');GM.m(tFJ,'mBg');GM.eyes(tFJ,'happy');
// Zap quietly records everything
tl.fromTo('#zpAnt',{rotation:-12},{rotation:12,duration:.3,yoyo:true,repeat:11},tFJ);tl.set('#zpAnt',{rotation:0},tFJ+3.9);

/* ================= SCENE 5: Zap: "Beep boop! Processing fun!" ================= */
camTo(tZapGo-.3,.8,...CAM.blip,'power2.inOut');
{const t0=tZapGo,d=.9;
 tl.fromTo('#zp',{x:RX2+130},{x:1450,duration:d,ease:'sine.inOut'},t0);
 cycle(['#zpLegL','#zpLegR'],['#zpArmL','#zpArmR'],t0,t0+d,.3,16,10,'#zpSq',6);}
ZP.m(L[5]-.05,'mBg');ZP.talk(L[5]+.02,L[5]+DU[5]-.1,'mBg','mSm',.13);ZP.eyes(L[5],'happy');ZP.brows(L[5],8,-8,-4,.1);
for(let k=0;k<6;k++){const t=L[5]+.1+k*.28,odd=k%2;
 tl.to('#zpArmL',{rotation:odd?30:150,duration:.14},t);tl.to('#zpArmR',{rotation:odd?-150:-30,duration:.14},t);
 hop('#zpSq',t,22,.1,.14);tl.to('#zpLean',{rotation:odd?5:-5,duration:.14},t);}
tl.to('#zpArmL',{rotation:0,duration:.2},L[5]+DU[5]);tl.to('#zpArmR',{rotation:0,duration:.2},L[5]+DU[5]);tl.set('#zpLean',{rotation:0},L[5]+DU[5]+.05);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[5]);tl.set('#zpAnt',{rotation:0},L[5]+DU[5]);
// everybody relaxes (Flapjack is back safe on Bo's head)
eyesMode(L[5],'normal');bm(L[5],'mSmile');brows(L[5],6,-6,-4,.15);FB.pm(L[5],'Gr');look(L[5],-18,-2,.2);
TF.m(L[5],'mSm');TF.eyes(L[5],'happy');NN.m(L[5],'mSm');NN.eyes(L[5],'happy');CM.m(L[5],'mSm');cmEyes(L[5],'happy');MC.m(L[5],'mSm');mcEyes(L[5],'lids');GM.m(L[5],'mSm');
BP.m(L[5],'mSm');BP.eyes(L[5],'happy');BP.brows(L[5],6,-6,-4,.1);
tl.to('#bpArmR',{rotation:0,duration:.2},L[5]);

/* ================= SCENE 6: Mochi: "Hmph. Don't lose your head. Obviously." — and Zap's head falls off ================= */
MC.m(L[6]-.05,'mFr');MC.talk(L[6],L[6]+DU[6]-.05,'mOp','mFr',.15);mcEyes(L[6],'lids');MC.brows(L[6],8,-8,2,.2);
tl.to('#mcArmR',{rotation:-95,duration:.25,ease:'back.out(1.8)'},W(6,3));
tl.to('#mcArmR',{rotation:0,duration:.3},WE(6,4)+.3);
// POP — the head flies off and rolls away
tl.fromTo('#zpHead',{y:0,x:0,rotation:0},{y:-250,x:-110,rotation:-200,duration:.3,ease:'power2.out'},tPop);
tl.to('#zpHead',{y:272,x:-230,rotation:-440,duration:.36,ease:'power2.in'},tPop+.3);
tl.to('#zpHead',{y:180,x:-290,rotation:-620,duration:.18,ease:'power2.out'},tPop+.66);
tl.to('#zpHead',{y:272,x:-340,rotation:-760,duration:.2,ease:'power2.in'},tPop+.84);
tl.to('#zpHead',{x:-370,rotation:-820,duration:.5,ease:'power2.out'},tPop+1.04);
sparks(tPop+.02,1450,1250,6,90);
shake(tPop+.95,6,4);dust(tPop+.98,1450-0.6*230,FLOOR+6,.8);
ZP.eyes(tPop,'wide');ZP.m(tPop,'mO');
// the headless body flails
tl.to('#zpArmL',{rotation:150,duration:.12},tPop+.05);tl.to('#zpArmR',{rotation:-150,duration:.12},tPop+.05);
tl.fromTo('#zpArmL',{rotation:150},{rotation:60,duration:.22,yoyo:true,repeat:11,ease:'sine.inOut'},tPop+.2);
tl.fromTo('#zpArmR',{rotation:-60},{rotation:-150,duration:.22,yoyo:true,repeat:11,ease:'sine.inOut'},tPop+.2);
// the others gasp
eyesMode(tPop,'wide');bm(tPop,'mO');brows(tPop,-16,16,-10,.08);FB.pm(tPop,'Oh');
TF.eyes(tPop,'wide');TF.m(tPop,'mO');NN.eyes(tPop,'wide');NN.m(tPop,'mBg');cmEyes(tPop,'wide');CM.m(tPop,'mBg');GM.eyes(tPop,'wide');GM.m(tPop,'mO');BP.eyes(tPop,'wide');BP.m(tPop,'mO');
GH.eyes(tPop,'wide');GH.m(tPop,'mO');
['#boSq','#tfSq','#nmSq','#cmSq'].forEach((s,i)=>hop(s,tPop+i*.03,70,.14,.2));

/* ================= SCENE 7: Zap's head, on the floor: "Head not found. Beep." ================= */
ZP.m(L[7]-.05,'mBg');ZP.talk(L[7]+.02,L[7]+DU[7]-.08,'mBg','mOp',.16);ZP.eyes(L[7],'wide');ZP.brows(L[7],-10,10,-4,.1);
ZP.look(L[7],-20,-6,.1);ZP.look(L[7]+.7,24,6,.15);ZP.look(L[7]+1.2,-14,10,.15);
tl.fromTo('#zpHead',{rotation:-820},{rotation:-800,duration:.2,yoyo:true,repeat:7},L[7]);
// the headless body wanders around
tl.to('#zp',{x:1380,duration:.8,ease:'sine.inOut'},L[7]);tl.to('#zp',{x:1520,duration:.9,ease:'sine.inOut'},L[7]+.8);
cycle(['#zpLegL','#zpLegR'],[],L[7],L[7]+1.7,.4,14,0,'#zpSq',5);
// the audience giggles
eyesMode(L[7],'normal');bm(L[7],'mBig');brows(L[7],6,-6,-4,.1);FB.pm(L[7],'Gr');
TF.m(L[7],'mBg');TF.eyes(L[7],'happy');NN.m(L[7],'mBg');NN.eyes(L[7],'happy');CM.m(L[7],'mBg');cmEyes(L[7],'happy');GM.m(L[7],'mSm');GM.eyes(L[7],'happy');BP.m(L[7],'mBg');BP.eyes(L[7],'happy');GH.m(L[7],'mBg');GH.eyes(L[7],'happy');
['#boSq','#nmSq','#cmSq'].forEach((s,i)=>tl.fromTo(s,{y:0},{y:-24,duration:.12,yoyo:true,repeat:5},L[7]+.3+i*.05));
// Mochi puts the head back (obviously)
tl.to('#mcArmR',{rotation:-60,duration:.2},tFound-.3);
tl.to('#zpHead',{x:0,y:0,rotation:0,duration:.4,ease:'back.out(1.6)'},tFound);
sparks(tFound+.35,1520,1250,8,100);
tl.to('#zp',{x:1450,duration:.3},tFound);
ZP.eyes(tFound+.35,'happy');ZP.m(tFound+.35,'mSm');ZP.brows(tFound+.35,6,-6,-4,.1);
tl.to('#zpArmL',{rotation:0,duration:.2},tFound-.1);tl.to('#zpArmR',{rotation:0,duration:.2},tFound-.1);
tl.set('#zpHead',{rotation:0},tFound+.45);

/* ================= SCENE 8: "Then Blip's scanner went beep, beep, beep!" ================= */
camTo(L[8]-.3,.8,...CAM.blip,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[8]);
BP.eyes(L[8],'wide');BP.m(L[8],'mO');BP.look(L[8],0,-20,.2);BP.brows(L[8],-8,8,-4,.1);
tl.to('#bp',{x:1640,duration:.7,ease:'sine.inOut'},L[8]-.2);
cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],L[8]-.2,L[8]+.5,.3,18,8,'#bpSq',6);
tBeep.forEach((t,i)=>{
 ring(t,1640,FLOOR-.62*430,1.2);
 tl.fromTo('#bpAntL',{rotation:-24},{rotation:0,duration:.25,ease:'elastic.out(1,.4)'},t);tl.fromTo('#bpAntR',{rotation:24},{rotation:0,duration:.25,ease:'elastic.out(1,.4)'},t);
 hop('#bpSq',t,34,.1,.14);BP.m(t,'mO');BP.m(t+.2,'mOp');});
sparks(tBeep[2]+.05,1640,FLOOR-330,6,120);
lookAll(L[8],12,-14);

/* ================= SCENE 9: Blip: "It is somebody's birthday!" ================= */
BP.eyes(L[9],'happy');BP.m(L[9]-.05,'mBg');BP.talk(L[9]+.02,L[9]+DU[9]-.1,'mBg','mSm',.14);BP.brows(L[9],6,-6,-4,.1);
tl.set('#feastCk',{opacity:1,x:1640,y:FLOOR-.62*450,scale:.2},tCake);
tl.fromTo('#feastCk',{scale:.2},{scale:.62,duration:.4,ease:'back.out(2.4)'},tCake);
tl.fromTo('#feastCkIn',{rotation:-6},{rotation:6,duration:.25,yoyo:true,repeat:7,ease:'sine.inOut'},tCake+.3);
sparks(tCake+.2,1640,FLOOR-.62*600,6,110);hearts(tCake+.4,1640,FLOOR-.62*660,3,70,160);
tl.to('#bpArmL',{rotation:140,duration:.2},tCake);tl.to('#bpArmR',{rotation:-140,duration:.2},tCake);
tl.to('#feastCk',{opacity:0,duration:.3},L[9]+DU[9]+.2);
// everybody perks up and looks at Bo
eyesMode(L[9],'normal');bm(L[9],'mBig');look(L[9],6,-8,.2);
TF.eyes(L[9],'wide');TF.m(L[9],'mBg');NN.eyes(L[9],'wide');NN.m(L[9],'mBg');cmEyes(L[9],'wide');CM.m(L[9],'mBg');GM.eyes(L[9],'wide');GM.m(L[9],'mBg');mcEyes(L[9],'happy');MC.m(L[9],'mSm');
GH.eyes(L[9],'happy');
tl.fromTo('#gmBelly',{scale:1},{scale:1.06,duration:.12,yoyo:true,repeat:7},L[9]);

/* ================= SCENE 10: Bo: "Wait... it's MY birthday?" ================= */
tl.to('#boArmL',{rotation:-150,duration:.12},tWow);tl.to('#boArmR',{rotation:150,duration:.12},tWow);
eyesMode(tWow-.05,'wide');bm(tWow-.05,'mO');brows(tWow-.05,-18,18,-12,.08);FB.pm(tWow-.05,'Oh');
tl.fromTo('#boSq',{y:0},{y:-50,duration:.16,yoyo:true,repeat:3,ease:'power1.out'},tWow);
bm(W(10,2),'mBig');eyesMode(W(10,2),'hearts');
hearts(W(10,2),1740,1000,6,100,260);
tl.to('#boArmL',{rotation:0,duration:.25},tWow+DU[10]+.1);tl.to('#boArmR',{rotation:0,duration:.25},tWow+DU[10]+.1);

/* ================= SCENE 11: Peanut at the window: "I remember everything!" ================= */
camTo(tSwish2,.7,...CAM.win,'power3.inOut');
tl.to('#gh',{x:870,y:1110,duration:.7,ease:'power2.inOut'},tSwish2);tl.to('#ghGlow',{scale:1.6,opacity:1,duration:.4},tSwish2);
tl.to('#night',{opacity:.3,duration:.5},tSwish2);
GH.eyes(tSwish2+.6,'wide');GH.m(tSwish2+.6,'mO');GH.look(tSwish2+.6,-26,-14,.1);
tl.set('#peanutG',{opacity:1},L[11]-.15);
tl.fromTo('#peanutIn',{y:260},{y:0,duration:.55,ease:'back.out(1.8)'},L[11]-.15);
tl.fromTo('#peanutIn',{rotation:-1.5},{rotation:1.5,duration:.35,yoyo:true,repeat:7,ease:'sine.inOut'},L[11]+.4);
sparks(L[11]+.3,550,520,6,120);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

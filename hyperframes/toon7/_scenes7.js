/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={open:[1500,520,1.18], burst:[1350,200,.95], wide:[900,-270,.72], rum:[1420,260,1.0], moch:[1250,150,.9], feast:[1000,0,.84], hug:[1280,120,.9], dark:[1100,0,.84]};
const tBang=.38;                                           // the door slams open, Gumdrop bursts out
const tHuge=W(1,5)-.15;                                    // "HUGE!"
const tMon=W(2,0), tRun=W(2,1)-.05;                        // "Monster!" / "Run!"
const tWait=L[3];                                          // "Wait! I'm only hungry!"
const tRum=L[4]-.2;                                        // the tummy rumbles
const tHmph=W(5,0), tPoke=tHmph+1.5;                       // Mochi walks up and pokes the belly
const tHop=W(6,1)-.1;                                      // Truffle jumps up on the table
const tOven=W(6,2), tDing=W(6,5)-.05;                      // the oven glows / DING
const tLove=W(7,3)-.1;                                     // hearts on the dishes
const tEat=[L[8]-.05, L[8]+.55, L[8]+1.0];                 // the three dishes land in Gumdrop's mouth
const tBurp=WE(8,3)+.12;
const tTear=L[9]+.1, tHug=W(9,3)-.15;
const tFlick=W(10,2), tOut=W(10,3)+.05;                    // the lights flicker, then go out
const tBooIn=tOut+.3;
const tScare=L[11]+DU[11]+.08;
const tStk=tScare+1.5;
const MX=GX, MY=FLOOR-410*GS;                              // Gumdrop's mouth in the world
const ST={tf:1160,nm:1290,cm:1400,bo:1530,mc:1690};        // where everybody stands for the feast
const HG={cm:1540,mc:1620,tf:1710,bo:1810,nm:1880};        // ...and in the group hug
const DPX=[1070,1200,1305];                                // pizza / pancakes / cupcake on the table

/* --- small helpers --- */
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const cmEyes=(t,mode)=>{   // 'normal' | 'wide' | 'happy' | 'dizzy'
 tl.set('#cmEyes',{opacity:(mode==='happy'||mode==='dizzy')?0:1},t);
 tl.set('#cmEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#cmEyesDizzy',{opacity:mode==='dizzy'?1:0},t);
 if(mode==='normal'||mode==='wide'){tl.to('.cmEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.cmPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const run=(id,sq,legs,arms,x0,x1,t0,dur,amp,bob,ease='power1.in')=>{tl.fromTo(id,{x:x0},{x:x1,duration:dur,ease},t0);cycle(legs,arms,t0,t0+dur,.2,amp,amp*.8,sq,bob);};
const tfx=(x0,x1,t0,dur,ease='none')=>{tl.fromTo('#tf',{x:x0},{x:x1,duration:dur,ease},t0);tl.fromTo('#pizza',{x:x0},{x:x1,duration:dur,ease},t0);};   // the pizza rides on Truffle's hat
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
const gmArms=(t,l,r,d=.2)=>{tl.to('#gmArmL',{rotation:l,duration:d},t);tl.to('#gmArmR',{rotation:r,duration:d},t);};
const ghArms=(t,l,r,d=.2)=>{tl.to('#ghArmL',{rotation:l,duration:d},t);tl.to('#ghArmR',{rotation:r,duration:d},t);};
const armsUp=(t,d=.1)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);
 ['tf','nm','mc','cm'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);
 ['tf','nm','mc','cm'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};

/* ================= SCENE 0: the last frame of video #6 — the gang, Coco dizzy, Gumdrop's eye in the half-open door ================= */
camSet(0,...CAM.open);
eyesMode(0,'normal');bm(0,'mOpen');look(0,24,-6,.01);brows(0,-10,10,-8,.01);
FB.pm(0,'Wo');FB.look(0,14,-4,.01);
MC.m(0,'mFr');mcEyes(0,'lids');MC.look(0,24,-6,.01);
NN.eyes(0,'normal');NN.m(0,'mFr');NN.look(0,24,-6,.01);
TF.eyes(0,'normal');TF.m(0,'mFr');TF.look(0,24,-6,.01);
cmEyes(0,'dizzy');CM.m(0,'mO');CM.brows(0,0,0,0,.01);
tl.fromTo('.cmSwirl',{rotation:0},{rotation:1080,duration:3.6,ease:'none'},0);
GM.eyes(0,'normal');GM.m(0,'mSm');GM.brows(0,-12,12,-4,.01);GM.look(0,0,14,.01);
tl.to('#gdEyeG',{scaleY:.1,duration:.07},.12);tl.to('#gdEyeG',{scaleY:1.08,duration:.08},.19);
tl.to('#gdPupil',{x:-16,y:14,duration:.18},.22);

/* ================= SCENE 1: BANG! "Out stepped Gumdrop. He was huge!" ================= */
camTo(tBang-.05,1.0,...CAM.burst,'power2.out');
tl.to('#fridgeDoor',{scaleX:.08,duration:.1,ease:'power3.in'},tBang-.1);
tl.to('#fridgeDoor',{scaleX:.16,duration:.35,ease:'bounce.out'},tBang+.0);
tl.fromTo('#flash',{opacity:.6},{opacity:0,duration:.28},tBang);
shake(tBang,22,8);
sparks(tBang,2030,1180,8,170);
tl.set('#gdPeek',{opacity:0},tBang);
tl.set('#gm',{opacity:1,x:2088,y:FLOOR,scale:1},tBang);
tl.fromTo('#gmSq',{scaleY:1.2,scaleX:.84},{scaleY:1,scaleX:1,duration:.4,ease:'elastic.out(1,.4)'},tBang);
tl.fromTo('#gm',{x:2088},{x:GX,duration:1.0,ease:'power2.out'},tBang+.05);
tl.fromTo('#gm',{scale:1},{scale:GS,duration:1.0,ease:'back.out(1.4)'},tBang+.05);
cycle(['#gmLegL','#gmLegR'],['#gmArmL','#gmArmR'],tBang+.15,tBang+1.05,.5,14,10,'#gmSq',10);
[[tBang+.3,2040],[tBang+.62,1996],[tBang+.92,1968]].forEach(([t,x])=>{dust(t,x,FLOOR+8,1.2);shake(t,7,4);});
GM.eyes(tBang+.2,'normal');GM.look(tBang+.2,-26,16,.2);GM.m(tBang+.4,'mSm');GM.brows(tBang+.2,-14,14,-6,.1);
GM.look(W(1,2),0,22,.2);                                   // "Gumdrop": a shy glance down
// the gang is blown back
[['#bo',1680,1590,'#boSq'],['#tf',1460,1410,'#tfSq'],['#mc',1380,1370,'#mcSq'],['#nm',1245,1215,'#nmSq']].forEach(([id,x0,x1,sq],i)=>{
 if(id==='#tf')tfx(x0,x1,tBang+i*.03,.3,'power2.out');else tl.fromTo(id,{x:x0},{x:x1,duration:.3,ease:'power2.out'},tBang+i*.03);
 hop(sq,tBang+i*.03,60+i*10,.12,.2);});
eyesMode(tBang,'wide');bm(tBang,'mO');brows(tBang,-18,18,-12,.08);FB.pm(tBang,'Oh');
TF.eyes(tBang,'wide');TF.m(tBang,'mO');NN.eyes(tBang,'wide');NN.m(tBang,'mO');mcEyes(tBang,'wide');MC.m(tBang,'mO');
lookAll(tBang+.3,28,-34);
['#boSq','#tfSq','#nmSq'].forEach(s=>tl.fromTo(s,{scaleY:1},{scaleY:.93,duration:.06,yoyo:true,repeat:11},tBang+.5));
tl.fromTo('#tfHat',{rotation:-6},{rotation:6,duration:.07,yoyo:true,repeat:9},tBang+.5);
// HUGE!
camTo(tHuge-.35,.9,...CAM.wide,'power2.inOut');
tl.to('#gmSq',{scaleY:1.07,duration:.15},tHuge);tl.to('#gmSq',{scaleY:1,duration:.3,ease:'bounce.out'},tHuge+.15);
gmArms(tHuge,150,-150,.2);gmArms(tHuge+.9,0,0,.3);
GM.m(tHuge,'mOp');GM.m(tHuge+.8,'mSm');
tl.fromTo('#gm',{scale:GS},{scale:GS*1.07,duration:.2,yoyo:true,repeat:1},tHuge);
shake(tHuge+.05,10,6);

/* ================= SCENE 2: Bo: "Monster! Run!" ================= */
armsUp(tMon);
bm(tMon,'mBig');eyesMode(tMon,'wide');FB.pm(tMon,'Oh');
TF.m(tMon,'mBg');NN.m(tMon,'mBg');MC.m(tMon,'mFr');mcEyes(tMon,'wide');
['#boSq','#tfSq','#nmSq'].forEach((s,i)=>hop(s,tMon+i*.04,90,.15,.2));
// Coco wakes up in the bananas and bolts
cmEyes(tMon,'wide');CM.m(tMon,'mBg');tl.to('#cmSq',{scaleY:1,duration:.15},tMon);tl.to('#cm',{y:FLOOR,duration:.2},tMon);
hop('#cmSq',tMon+.05,120,.2,.2);
// everybody runs away (except Mochi, who is unimpressed)
armsDown(tRun-.05,.1);
bm(tRun,'mBig');
run('#bo','#boSq',['#boLegL','#boLegR'],['#boArmL','#boArmR'],1590,1060,tRun,.95,36,16);
{const t0=tRun+.05;tfx(1410,1230,t0,.7,'power1.in');cycle(['#tfLegL','#tfLegR'],['#tfArmL','#tfArmR'],t0,t0+.7,.2,28,20,'#tfSq',12);}
run('#nm','#nmSq',['#nmLegL','#nmLegR'],['#nmArmL','#nmArmR'],1215,930,tRun+.05,.8,38,10);
run('#cm','#cmSq',['#cmLegL','#cmLegR'],['#cmArmL','#cmArmR'],1980,1150,tRun+.08,1.0,34,14);
dust(tRun+.1,1560,FLOOR+8,.9);dust(tRun+.3,1480,FLOOR+8,.8);
tl.fromTo('#bananasIn',{scaleY:.5,scaleX:1.2},{scaleY:.7,scaleX:1.1,duration:.2},tMon+.1);
// Gumdrop reaches out
GM.eyes(tRun,'wide');GM.m(tRun,'mFr');GM.brows(tRun,-18,18,-8,.1);GM.look(tRun,-30,6,.15);
// Mochi just sighs
MC.m(tRun+.4,'mFr');mcEyes(tRun+.4,'lids');

/* ================= SCENE 3: Gumdrop: "Wait! I'm only hungry!" ================= */
GM.m(tWait-.05,'mOp');GM.talk(tWait+.02,tWait+DU[3]-.12,'mOp','mFr',.13);
GM.brows(tWait-.05,-18,18,-8,.1);GM.eyes(tWait,'normal');GM.look(tWait,-24,6,.12);
gmArms(tWait,0,-120,.25);
tl.fromTo('#gmArmR',{rotation:-120},{rotation:-92,duration:.16,yoyo:true,repeat:7},tWait+.28);
tl.fromTo('#gmHead',{rotation:-3},{rotation:3,duration:.2,yoyo:true,repeat:9,ease:'sine.inOut'},tWait+.1);tl.to('#gmHead',{rotation:0,duration:.1},tWait+2.2);
// the fleeing gang skids to a stop and looks back
eyesMode(tWait+.05,'normal');bm(tWait+.05,'mOpen');look(tWait+.05,26,-14,.12);brows(tWait+.05,-10,10,-8,.1);FB.pm(tWait+.05,'Wo');
TF.m(tWait+.05,'mFr');TF.eyes(tWait+.05,'normal');NN.m(tWait+.05,'mFr');NN.eyes(tWait+.05,'normal');
cmEyes(tWait+.05,'normal');CM.m(tWait+.05,'mFr');
lookAll(tWait+.1,26,-16);

/* ================= SCENE 4: "His tummy rumbled like thunder!" ================= */
camTo(tRum-.4,.7,...CAM.rum,'power2.inOut');
gmArms(tRum-.1,-35,35,.2);
tl.fromTo('#gmBelly',{scale:1},{scale:1.1,duration:.07,yoyo:true,repeat:13,ease:'sine.inOut'},tRum);
tl.fromTo('#gmBody',{rotation:-1.4},{rotation:1.4,duration:.05,yoyo:true,repeat:21},tRum);tl.set('#gmBody',{rotation:0},tRum+1.15);
shake(tRum,8,8);shake(tRum+.55,10,8);
tl.fromTo('#flash',{opacity:.38},{opacity:0,duration:.32},tRum+.05);
GM.m(tRum,'mO');GM.eyes(tRum,'normal');GM.look(tRum,0,28,.12);GM.brows(tRum,-12,12,-4,.1);
GM.m(tRum+1.2,'mSm');GM.look(tRum+1.2,-14,10,.2);

/* ================= SCENE 5: Mochi: "Hmph. He's a softie. Obviously." ================= */
camTo(L[5]-.7,.9,...CAM.moch);
MC.m(tHmph-.05,'mFr');MC.talk(tHmph,WE(5,4)-.05,'mOp','mFr',.15);MC.brows(tHmph-.05,8,-8,2,.2);
tl.fromTo('#mc',{x:1370},{x:ST.mc,duration:1.4,ease:'sine.inOut'},tHmph+.1);
cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],tHmph+.1,tHmph+1.5,.34,16,8,'#mcSq',5);
tl.to('#mcArmR',{rotation:-100,duration:.2,ease:'back.out(2)'},tPoke);
tl.fromTo('#gmBelly',{scale:1},{scale:.9,duration:.1,yoyo:true,repeat:1},tPoke+.15);
tl.fromTo('#gmBelly',{scale:1},{scale:1.06,duration:.12,yoyo:true,repeat:7},tPoke+.45);
gmArms(tPoke+.1,0,0,.2);
GM.eyes(tPoke+.25,'happy');GM.m(tPoke+.25,'mSm');GM.brows(tPoke+.25,6,-6,-4,.15);
tl.fromTo('#gmHead',{rotation:-4},{rotation:4,duration:.18,yoyo:true,repeat:5,ease:'sine.inOut'},tPoke+.3);tl.to('#gmHead',{rotation:0,duration:.1},tPoke+1.5);
hearts(tPoke+.35,GX,FLOOR-(520+168)*GS-10,3,80,180);
// the others tiptoe back
{const t0=tHmph+.5, d=1.9;
 tl.fromTo('#bo',{x:1060},{x:ST.bo,duration:d,ease:'sine.inOut'},t0);cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],t0,t0+d,.5,22,12,'#boSq',8);
 tfx(1230,ST.tf,t0,d,'sine.inOut');cycle(['#tfLegL','#tfLegR'],['#tfArmL','#tfArmR'],t0,t0+d,.5,18,8,'#tfSq',6);
 tl.fromTo('#nm',{x:930},{x:ST.nm,duration:d,ease:'sine.inOut'},t0);cycle(['#nmLegL','#nmLegR'],['#nmArmL','#nmArmR'],t0,t0+d,.4,22,8,'#nmSq',5);
 tl.fromTo('#cm',{x:1150},{x:ST.cm,duration:d,ease:'sine.inOut'},t0);cycle(['#cmLegL','#cmLegR'],['#cmArmL','#cmArmR'],t0,t0+d,.4,22,10,'#cmSq',5);
 eyesMode(t0,'normal');bm(t0,'mSmile');brows(t0,6,-6,-2,.15);look(t0,26,-4,.15);FB.pm(t0,'Sm');
 TF.m(t0,'mSm');NN.m(t0,'mSm');CM.m(t0,'mSm');
 eyesMode(tPoke+.3,'normal');bm(tPoke+.3,'mBig');TF.eyes(tPoke+.3,'happy');NN.eyes(tPoke+.3,'happy');cmEyes(tPoke+.3,'happy');}

/* ================= SCENE 6: "So Truffle cooked a giant feast!" ================= */
camTo(L[6]-.6,.9,...CAM.feast);
// Truffle (pizza on his hat) hops up on the table
const tHopD=.7;
tfx(ST.tf,1120,tHop,tHopD);
arc('#tf',tHop,tHopD,FLOOR,200,TT-10);
tl.fromTo('#tf',{scale:.74},{scale:TFS,duration:tHopD,ease:'none'},tHop);
arc('#pizza',tHop,tHopD,1138.2,200,692);
tl.fromTo('#pizza',{scale:.46},{scale:.42,duration:tHopD,ease:'none'},tHop);
tl.fromTo('#tfSq',{scaleY:.82},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tHop+tHopD);
TF.eyes(tHop,'happy');TF.m(tHop,'mBg');TF.talk(tHop+.15,WE(6,5)-.05,'mBg','mSm',.13);
tl.to('#tfArmL',{rotation:150,duration:.15},tHop);tl.to('#tfArmR',{rotation:-150,duration:.15},tHop);
tl.to('#tfArmL',{rotation:0,duration:.2},tHop+tHopD);
tl.set('#tfLadle',{opacity:1},tHop+tHopD);tl.to('#tfArmR',{rotation:-40,duration:.2},tHop+tHopD);
tl.fromTo('#tfArmR',{rotation:-40},{rotation:-75,duration:.2,yoyo:true,repeat:9,ease:'sine.inOut'},tHop+tHopD+.25);
// the pizza slides off his hat onto the counter
{const t1=tHop+tHopD+.15;
 tl.fromTo('#pizza',{x:1120},{x:DPX[0],duration:.5,ease:'none'},t1);
 tl.fromTo('#pizza',{y:692},{y:520,duration:.22,ease:'power2.out'},t1).to('#pizza',{y:1139,duration:.28,ease:'power2.in'},t1+.22);
 tl.fromTo('#pizza',{scale:.42},{scale:.5,duration:.5,ease:'none'},t1);
 tl.fromTo('#pizza',{rotation:0},{rotation:-360,duration:.5,ease:'none'},t1);}
// the gang cheers him on
armsUp(tHop+.2,.15);armsDown(tHop+.9,.3);
eyesMode(tHop,'normal');bm(tHop,'mBig');FB.pm(tHop,'Gr');
['#boSq','#nmSq','#cmSq','#mcSq'].forEach((s,i)=>hop(s,tHop+.1+i*.05,60,.15,.2));
// oven
tl.fromTo('#ovenGlow',{opacity:0},{opacity:.75,duration:.12,yoyo:true,repeat:11},tOven);
tl.to('#ovenGlow',{opacity:.9,duration:.2},tOven+1.4);
tl.fromTo('#ovenIn',{scaleY:1},{scaleY:1.03,duration:.08,yoyo:true,repeat:9},tOven+.3);
steam(tOven,tDing);
// DING! the dishes pop out of the oven
tl.to('#ovenGlow',{opacity:0,duration:.1},tDing);
tl.fromTo('#ovenDing',{opacity:0},{opacity:1,duration:.06,yoyo:true,repeat:5},tDing);
const pop=(id,x1,t,sc)=>{tl.set(id,{opacity:1,x:OVX,y:TT-96,scale:.15},t);tl.fromTo(id,{x:OVX},{x:x1,duration:.45,ease:'none'},t);
 tl.fromTo(id,{y:TT-96},{y:TT-340,duration:.2,ease:'power2.out'},t).to(id,{y:TT-2,duration:.25,ease:'power2.in'},t+.2);
 tl.fromTo(id,{scale:.15},{scale:sc,duration:.3,ease:'back.out(2)'},t);sparks(t+.45,x1,TT-60,5,70);};
pop('#feastPc',DPX[1],tDing+.05,.8);pop('#feastCk',DPX[2],tDing+.2,.75);
TF.m(tDing,'mBg');
// Gumdrop watches, tummy rumbling again
GM.look(tHop,-30,-4,.2);GM.eyes(tHop,'normal');GM.brows(tHop,8,-8,-4,.2);GM.m(tHop,'mSm');
tl.fromTo('#gmBelly',{scale:1},{scale:1.07,duration:.09,yoyo:true,repeat:5},tDing+.2);

/* ================= SCENE 7: Truffle: "Needs a pinch more love!" ================= */
tl.to('#tfArmL',{rotation:150,duration:.15},L[7]);tl.fromTo('#tfArmL',{rotation:150},{rotation:110,duration:.14,yoyo:true,repeat:7},L[7]+.15);
tl.set('#tfLadle',{opacity:0},L[7]);
TF.m(L[7]-.05,'mBg');TF.talk(L[7]+.02,L[7]+DU[7]-.08,'mBg','mSm',.13);TF.eyes(L[7],'happy');
hearts(tLove,1090,1020,5,70,230);hearts(tLove+.1,1250,1020,4,70,230);
tl.fromTo('#feastPcIn',{scaleY:1},{scaleY:1.06,duration:.1,yoyo:true,repeat:3},tLove+.15);
tl.fromTo('#feastCkIn',{scaleY:1},{scaleY:1.07,duration:.1,yoyo:true,repeat:3},tLove+.25);
tl.to('#tfArmL',{rotation:0,duration:.2},L[7]+DU[7]);
// Gumdrop drools with his eye glued on the food
GM.eyes(L[7],'wide');GM.look(L[7],-34,-6,.2);GM.m(L[7]+.2,'mOp');
tl.fromTo('#gmHead',{y:0},{y:6,duration:.2,yoyo:true,repeat:7},L[7]);

/* ================= SCENE 8: Gumdrop: "Yum! Thank you, friends!" ================= */
tl.to('#tfArmR',{rotation:-150,duration:.15},tEat[0]-.7);
function toss(id,x0,y0,tL,dur,sc0,spin){const t0=tL-dur;
 tl.fromTo(id,{x:x0},{x:MX,duration:dur,ease:'none'},t0);
 tl.fromTo(id,{y:y0},{y:y0-320,duration:dur*.45,ease:'power2.out'},t0).to(id,{y:MY,duration:dur*.55,ease:'power2.in'},t0+dur*.45);
 tl.fromTo(id,{rotation:0},{rotation:spin,duration:dur,ease:'none'},t0);
 tl.fromTo(id,{scale:sc0},{scale:sc0*.45,duration:dur,ease:'none'},t0);
 tl.set(id,{opacity:0},tL);}
toss('#pizza',DPX[0],1139,tEat[0],.6,.5,-540);
toss('#feastPc',DPX[1],TT-2,tEat[1],.6,.8,540);
toss('#feastCk',DPX[2],TT-2,tEat[2],.6,.75,-540);
tEat.forEach((t,i)=>{
 GM.m(t-.28,'mBg');GM.eyes(t-.28,'wide');GM.m(t+.04,'mSm');GM.eyes(t+.06,'happy');
 tl.fromTo('#gmHead',{y:0},{y:12,duration:.08,yoyo:true,repeat:3},t+.05);
 tl.to('#gmBelly',{scale:1+.1*(i+1),duration:.18,ease:'back.out(2)'},t+.02);
 tl.fromTo('#gmSq',{scaleY:1},{scaleY:1.03,duration:.1,yoyo:true,repeat:1},t);
 sparks(t+.02,MX,MY-60,5,90);
 tl.to('#tfArmR',{rotation:-60,duration:.15},t-.55);tl.to('#tfArmR',{rotation:-150,duration:.12},t-.38);
 hop('#tfSq',t-.62,24,.1,.12);});
tl.to('#tfArmR',{rotation:0,duration:.25},tEat[2]+.3);
GM.talk(tEat[2]+.1,WE(8,3)-.05,'mOp','mSm',.14);
tl.to('#gmArmL',{rotation:-35,duration:.2},tEat[0]);tl.to('#gmArmR',{rotation:35,duration:.2},tEat[0]);
hearts(W(8,3),MX,MY-120,4,90,200);
// burp
GM.m(tBurp,'mO');tl.fromTo('#gmBelly',{scale:1.3},{scale:1.2,duration:.15},tBurp);sparks(tBurp,MX-30,MY+10,4,60);GM.m(tBurp+.25,'mSm');
// everybody laughs
eyesMode(L[8],'normal');bm(L[8],'mBig');TF.m(tEat[2]+.2,'mBg');NN.m(L[8],'mBg');CM.m(L[8],'mBg');FB.pm(L[8],'Gr');
tl.fromTo('#boSq',{y:0},{y:-34,duration:.14,yoyo:true,repeat:7,ease:'power1.out'},L[8]+.1);
tl.fromTo('#nmSq',{y:0},{y:-28,duration:.13,yoyo:true,repeat:7,ease:'power1.out'},L[8]+.2);
tl.fromTo('#cmSq',{y:0},{y:-30,duration:.12,yoyo:true,repeat:7,ease:'power1.out'},L[8]+.15);

/* ================= SCENE 9: "He had never had friends before." — a tear, then a group hug ================= */
camTo(L[9]-.4,1.0,...CAM.hug,'power2.inOut');
GM.eyes(tTear,'normal');GM.brows(tTear,-14,14,-6,.2);GM.look(tTear,0,20,.2);GM.m(tTear,'mFr');
tl.fromTo('#gmTear',{opacity:0,y:0},{opacity:1,y:0,duration:.15},tTear+.2);
tl.fromTo('#gmTear',{y:0},{y:80,duration:.9,ease:'power1.in'},tTear+.35);tl.set('#gmTear',{opacity:0},tTear+1.25);
gmArms(tTear,-35,35,.3);
eyesMode(tTear,'normal');bm(tTear,'mSmile');
// the group hug
const tHD=.7;
tl.fromTo('#bo',{x:ST.bo},{x:HG.bo,duration:tHD,ease:'sine.inOut'},tHug);cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tHug,tHug+tHD,.3,28,14,'#boSq',12);
tl.fromTo('#nm',{x:ST.nm},{x:HG.nm,duration:tHD,ease:'sine.inOut'},tHug);cycle(['#nmLegL','#nmLegR'],['#nmArmL','#nmArmR'],tHug,tHug+tHD,.26,28,10,'#nmSq',9);
tl.fromTo('#cm',{x:ST.cm},{x:HG.cm,duration:tHD,ease:'sine.inOut'},tHug);cycle(['#cmLegL','#cmLegR'],['#cmArmL','#cmArmR'],tHug,tHug+tHD,.26,28,10,'#cmSq',9);
tl.fromTo('#mc',{x:ST.mc},{x:HG.mc,duration:tHD,ease:'sine.inOut'},tHug);cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],tHug,tHug+tHD,.3,16,8,'#mcSq',6);
// Truffle jumps down from the table into the hug
tl.fromTo('#tf',{x:1120},{x:HG.tf,duration:.65,ease:'none'},tHug);
arc('#tf',tHug,.65,TT-10,90,FLOOR);
tl.fromTo('#tf',{scale:TFS},{scale:.74,duration:.65,ease:'none'},tHug);
tl.fromTo('#tfSq',{scaleY:.84},{scaleY:1,duration:.35,ease:'elastic.out(1,.4)'},tHug+.65);
armsUp(tHug+tHD,.2);
tl.to('#mcArmR',{rotation:-60,duration:.2},tHug+tHD);
eyesMode(tHug+tHD,'hearts');bm(tHug+tHD,'mBig');
TF.eyes(tHug+tHD,'happy');TF.m(tHug+tHD,'mBg');NN.eyes(tHug+tHD,'happy');NN.m(tHug+tHD,'mBg');cmEyes(tHug+tHD,'happy');CM.m(tHug+tHD,'mBg');mcEyes(tHug+tHD,'happy');MC.m(tHug+tHD,'mSm');FB.pm(tHug+tHD,'Gr');
hearts(tHug+tHD,1740,1080,6,120,260);hearts(tHug+tHD+.3,1700,1100,5,120,260);
GM.eyes(tHug+tHD,'happy');GM.m(tHug+tHD,'mSm');gmArms(tHug+tHD,-35,35,.2);
tl.fromTo('#gmSq',{scaleY:1},{scaleY:.97,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},tHug+tHD);

/* ================= SCENE 10: "But then... the lights went out!" ================= */
camTo(tFlick-.3,.9,...CAM.dark,'power2.inOut');
[[tOut-.5,.55],[tOut-.4,0],[tOut-.3,.7],[tOut-.2,.05],[tOut-.1,.6],[tOut-.04,0]].forEach(([t,o])=>tl.set('#night',{opacity:o},t));
tl.to('#night',{opacity:.8,duration:.08},tOut);
shake(tOut,6,4);
// everybody freezes mid-hug
armsDown(tOut,.1);
eyesMode(tOut,'wide');bm(tOut,'mO');brows(tOut,-18,18,-12,.1);FB.pm(tOut,'Oh');
TF.eyes(tOut,'wide');TF.m(tOut,'mO');NN.eyes(tOut,'wide');NN.m(tOut,'mO');cmEyes(tOut,'wide');CM.m(tOut,'mO');mcEyes(tOut,'wide');MC.m(tOut,'mO');
GM.eyes(tOut,'wide');GM.m(tOut,'mO');GM.brows(tOut,-18,18,-8,.1);gmArms(tOut,-35,35,.1);
lookAll(tOut+.1,-26,-6);GM.look(tOut+.1,-30,4,.15);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq'].forEach(s=>tl.fromTo(s,{scaleY:1},{scaleY:.9,duration:.06,yoyo:true,repeat:13},tOut+.4));

/* ================= SCENE 11: Boo floats in: "B-boo?" ================= */
tl.set('#gh',{opacity:1,x:960,y:1540,scale:.9},tBooIn);
tl.fromTo('#ghGlow',{opacity:0},{opacity:1,duration:.6},tBooIn);
tl.fromTo('#gh',{x:960},{x:1340,duration:1.7,ease:'sine.out'},tBooIn);
tl.fromTo('#ghSq',{y:0},{y:-20,duration:.7,yoyo:true,repeat:7,ease:'sine.inOut'},tBooIn);
tl.fromTo('#ghGlow',{scale:1},{scale:1.1,duration:.8,yoyo:true,repeat:6,ease:'sine.inOut'},tBooIn+.6);
GH.eyes(tBooIn,'normal');GH.m(tBooIn,'mFr');GH.brows(tBooIn,-12,12,-4,.1);GH.look(tBooIn,18,6,.2);
ghArms(tBooIn+.3,-35,35,.3);
tl.fromTo('#ghHead',{rotation:-3},{rotation:3,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tBooIn);
GH.talk(L[11]+.02,L[11]+DU[11]-.08,'mOp','mFr',.2);GH.look(L[11],-20,8,.2);
// the gang stares, trembling
lookAll(tBooIn,-30,-10);GM.look(tBooIn,-34,-6,.2);
// SCREAM — everybody, including the ghost
const tSc=tScare;
armsUp(tSc,.08);
eyesMode(tSc,'wide');bm(tSc,'mBig');brows(tSc,-18,18,-12,.08);FB.pm(tSc,'Oh');
TF.m(tSc,'mBg');NN.m(tSc,'mBg');CM.m(tSc,'mBg');MC.m(tSc,'mBg');
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq'].forEach((s,i)=>hop(s,tSc+i*.03,110,.16,.22));
GM.m(tSc,'mBg');GM.eyes(tSc,'wide');gmArms(tSc,150,-150,.1);hop('#gmSq',tSc,160,.2,.25);shake(tSc+.2,14,8);dust(tSc+.45,GX,FLOOR+8,1.4);
GH.m(tSc,'mBg');GH.eyes(tSc,'wide');GH.brows(tSc,-16,16,-6,.08);ghArms(tSc,150,-150,.1);
tl.to('#gh',{x:700,duration:.6,ease:'power3.in'},tSc+.2);
tl.to('#gh',{opacity:0,duration:.1},tSc+.8);
armsDown(tSc+.9,.3);
tl.to('#night',{opacity:.55,duration:.5},tSc+.8);
eyesMode(tSc+1.0,'normal');bm(tSc+1.0,'mOpen');
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

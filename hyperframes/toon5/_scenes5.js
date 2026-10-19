/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const WIDE=[345,215,.97], WINC=[213,250,1.6];
const BOX2=BOX+90;                                        // Bo creeps towards the pizza
const tReveal=W(1,2)-.1;                                  // silhouette -> colour at "PIG"
const tSqz=W(1,3), tOut=W(1,6)+.3, tLand=tOut+.7;         // "SQUEEZED" ... out of the window ... lands
const tBase=W(2,3);                                       // "GIANT": the pizza base pops in
const tSauce=W(3,0)+.05, tCheese=W(3,1)+.05, tTopP=W(3,3)+.05;
const tTaste=[W(3,6),W(3,7),W(3,8),W(3,9)];               // "TASTED EVERY SINGLE ONE"
const tBo=W(4,0);
const tNot=W(5,0), tPinch=W(5,4);                         // "NOT YET!" / "...A PINCH more love"
const tBake=W(6,0)+.05, tDing=W(6,5), tOutPz=tDing+.2;
const tSl=[W(7,1)-.05,W(7,2),W(7,3)+.1,W(7,3)+.35,W(7,4)+.25];   // the slices fly
const tSw0=W(8,2)-.1, tGrab=tSw0+.55;                     // Coco swings in and snatches the pizza
const tPeel=W(9,1)-.15;
const tStk=L[10]+DU[10]+.2;

/* --- small helpers --- */
let ccn=0;
function chunk(t,x0,y0,x1,y1,dur=.6,hgt=220){const i=(ccn++)%6;
 tl.set('#cw'+i,{x:x0,y:y0},t);
 tl.fromTo('#cc'+i,{opacity:1,x:0,rotation:0,scale:1},{x:x1-x0,rotation:380,duration:dur,ease:'none'},t);
 tl.fromTo('#cc'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#cc'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#cc'+i,{opacity:0},t+dur);}
let sln=0;
function slice(t,x0,y0,x1,y1,dur=.6,hgt=200){const i=(sln++)%6;
 tl.set('#slw'+i,{x:x0,y:y0},t);
 tl.fromTo('#sl'+i,{opacity:1,x:0,rotation:-30,scale:.9},{x:x1-x0,rotation:330,duration:dur,ease:'none'},t);
 tl.fromTo('#sl'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#sl'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#sl'+i,{opacity:0},t+dur);}
function rain(t,x,y,n=7){for(let k=0;k<n;k++){const i=(cnt.h++)%NH,tt=t+k*.07,dx=(k-(n-1)/2)*44;
 tl.set('#hw'+i,{x:x+dx,y:y+(k%2)*22},tt);
 tl.fromTo('#hr'+i,{opacity:0,y:0,scale:.3},{opacity:1,y:60,scale:.8,duration:.25,ease:'power1.out'},tt);
 tl.to('#hr'+i,{y:170,opacity:0,duration:.45,ease:'power1.in'},tt+.25);}}
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);};

/* ================= SCENE 1: the silhouette is Truffle! He squeezes through the window ================= */
camSet(0,...WINC);
tl.fromTo('#pigSnout',{scale:1},{scale:1.2,duration:.1,yoyo:true,repeat:11},.1);
tl.fromTo('#pigIn',{y:0},{y:-12,duration:.12,yoyo:true,repeat:7},.15);
// colour reveal
tl.to('#pigG',{opacity:0,duration:.2},tReveal);
tl.set('#tw',{opacity:1},tReveal);
tl.fromTo('#tw',{scale:.82},{scale:.95,duration:.3,ease:'back.out(2.4)'},tReveal);
TW.m(tReveal,'mBg');TW.eyes(tReveal,'wide');TW.look(tReveal,0,6,.1);TW.brows(tReveal,-8,8,-6,.1);
sparks(tReveal+.1,550,640,7,170);
TW.eyes(tReveal+.45,'normal');TW.m(tReveal+.45,'mSm');TW.blink(tReveal+.9);
// "SQUEEZED THROUGH THE WINDOW": wriggles through the narrow frame
const nS=Math.round((tOut-tSqz)/.22);
tl.fromTo('#twSq',{scaleX:1,scaleY:1},{scaleX:.74,scaleY:1.14,duration:.11,yoyo:true,repeat:nS,ease:'sine.inOut'},tSqz);
tl.to('#tw',{y:1135,duration:tOut-tSqz,ease:'sine.in'},tSqz);
tl.fromTo('#twHead',{rotation:-6},{rotation:6,duration:.11,yoyo:true,repeat:nS},tSqz);
TW.m(tSqz,'mO');TW.eyes(tSqz,'wide');TW.m(tOut-.3,'mBg');
shake(tSqz+.1,4,3);shake(tSqz+.6,4,3);
// pops out onto the sill and hops down onto the table
tl.set('#tw',{opacity:0},tOut);
tl.set('#tf',{opacity:1,x:560,y:772,scale:.5},tOut);
camTo(tOut-.3,.9,...WIDE);
tl.fromTo('#tf',{x:560},{x:880,duration:.7,ease:'none'},tOut);
arc('#tf',tOut,.7,772,110,TT-10);
tl.fromTo('#tf',{scale:.5},{scale:TFS,duration:.7,ease:'none'},tOut);
tl.fromTo('#tfSq',{scaleX:.8,scaleY:1.25},{scaleX:1,scaleY:1,duration:.3,ease:'back.out(2)'},tOut);
TF.m(tOut,'mO');TF.eyes(tOut,'wide');TF.look(tOut,0,10,.1);
sparks(tOut+.05,560,780,6,90);
tl.fromTo('#tfSq',{scaleX:1.25,scaleY:.78},{scaleX:1,scaleY:1,duration:.5,ease:'elastic.out(1,.4)'},tLand);
shake(tLand,6,3);
TF.m(tLand,'mBg');TF.eyes(tLand,'normal');TF.look(tLand,0,0,.1);
// the kitchen gang is watching: everyone is wide-eyed for a second
eyesMode(tLand,'wide');bm(tLand,'mO');look(tLand,26,-10,.1);
FB.pm(tLand,'Oh');FB.look(tLand,16,-6,.1);
MC.m(tLand,'mFr');
NN.eyes(tLand,'wide');NN.look(tLand,-16,-6,.1);
// waddles to his cooking spot
const tW0=tLand+.2, tW1=L[2]-.1;
tl.fromTo('#tf',{x:880},{x:PZX,duration:tW1-tW0,ease:'sine.inOut'},tW0);
cycle(['#tfLegL','#tfLegR'],[],tW0,tW1,.34,24,0,'#tfSq',7);
TF.m(tW0,'mSm');
tl.fromTo('#board',{opacity:0,scale:.6},{opacity:1,scale:1,duration:.35,ease:'back.out(1.8)'},tW1-.2);

/* ================= SCENE 2: "Let's make a giant pizza!" ================= */
tl.set('#tf',{y:TT-10},L[2]);
TF.m(L[2],'mBg');TF.talk(L[2]+.03,L[2]+DU[2]-.08,'mBg','mSm',.13);
tl.to('#tfArmL',{rotation:150,duration:.2,ease:'back.out(2)'},W(2,2));tl.to('#tfArmR',{rotation:-150,duration:.2,ease:'back.out(2)'},W(2,2));
tl.fromTo('#tfHat',{y:0},{y:-14,duration:.12,yoyo:true,repeat:3},W(2,3));
tl.fromTo('#pizza',{opacity:0,scale:.2,y:PZY-140},{opacity:1,scale:1,y:PZY,duration:.45,ease:'back.out(2)'},tBase);
sparks(tBase+.2,PZX,PZY-20,8,210);
// everybody cheers
eyesMode(W(2,3),'hearts');bm(W(2,3),'mBig');
tl.fromTo('#boSq',{y:0},{y:-40,duration:.13,yoyo:true,repeat:5,ease:'power1.out'},W(2,3));
FB.pm(W(2,3),'Gr');tl.to('#bhArmL',{rotation:-150,duration:.2},W(2,3));tl.to('#bhArmR',{rotation:150,duration:.2},W(2,3));
MC.m(W(2,3),'mSm');MC.look(W(2,3),20,0,.15);
NN.eyes(W(2,3),'happy');NN.m(W(2,3),'mBg');
tl.fromTo('#nm',{y:TT},{y:TT-34,duration:.12,yoyo:true,repeat:5,ease:'power1.out'},W(2,3));
hearts(W(2,4),BOX,1000,3,70,220);

/* ================= SCENE 3: sauce, cheese, toppings ... and he tastes every single one ================= */
tl.to('#tfArmL',{rotation:0,duration:.25},tSauce-.35);
tl.set('#tfLadle',{opacity:1},tSauce-.3);
tl.to('#tfArmR',{rotation:-75,duration:.18,ease:'back.out(2)'},tSauce-.25);
tl.to('#tfArmR',{rotation:-25,duration:.2},tSauce+.1);
tl.fromTo('#pzSauce',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.4,ease:'back.out(1.8)'},tSauce+.1);
sparks(tSauce+.15,PZX,PZY-40,5,120);
TF.m(tSauce,'mBg');TF.eyes(tSauce,'happy');
// cheese: Nibbles shoots cubes onto the pizza
NN.eyes(tCheese-.1,'normal');NN.m(tCheese-.1,'mBg');
tl.to('#nmArmR',{rotation:-110,duration:.1},tCheese-.1);tl.to('#nmArmR',{rotation:38,duration:.25},tCheese+.35);
for(let k=0;k<3;k++){chunk(tCheese+k*.13,NIX+20,1000,PZX+(k-1)*60,PZY-10,.5,190);tl.to('#nmWedgeG',{scale:1.55-.16*(k+1),duration:.1},tCheese+k*.13);}
tl.fromTo('#pzCheese',{opacity:0,scale:.4},{opacity:1,scale:1,duration:.4,ease:'back.out(1.8)'},tCheese+.55);
tl.to('#tfArmR',{rotation:0,duration:.3},tCheese);
NN.m(tCheese+.6,'mSm');
// toppings rain down
tl.fromTo('#pzTop',{opacity:0,y:-130,scale:1.2},{opacity:1,y:0,scale:1,duration:.55,ease:'bounce.out'},tTopP);
sparks(tTopP+.5,PZX,PZY-30,6,150);
tl.fromTo('#tfHat',{rotation:-8},{rotation:8,duration:.13,yoyo:true,repeat:5},tTopP);
TF.eyes(tTopP,'normal');TF.m(tTopP,'mO');
// he tastes every single one (his belly grows each time)
tTaste.forEach((t,i)=>{
 TF.m(t-.06,'mBg');TF.eyes(t-.06,'happy');TF.m(t+.2,'mSm');
 tl.fromTo('#tfHead',{y:0},{y:16,duration:.1,yoyo:true,repeat:1},t);
 tl.to('#tfBelly',{scale:1.1+.1*i,duration:.2,ease:'back.out(2)'},t+.1);
 tl.to('#tfSq',{scaleX:1.04+.035*i,duration:.2},t+.1);
 sparks(t+.1,PZX,PZY-70,3,70);});
tl.fromTo('#tfHat',{y:0},{y:-20,duration:.12,yoyo:true,repeat:1},tTaste[3]+.15);       // burp!
bubbles(tTaste[3]+.2,PZX+60,880,3);

/* ================= SCENE 4: Bo: "Just one tiny bite!" ================= */
tl.to('#bo',{x:BOX2,duration:.9,ease:'sine.inOut'},tBo-.2);
cycle(['#boLegL','#boLegR'],[],tBo-.2,tBo+.7,.34,22,0,'#boSq',8);
tl.to('#boArmL',{rotation:-95,duration:.3,ease:'back.out(1.6)'},tBo);tl.to('#boArmR',{rotation:-100,duration:.3,ease:'back.out(1.6)'},tBo);
tl.to('#boLean',{rotation:12,duration:.3},tBo+.5);
eyesMode(tBo,'hearts');[0,1,2,3].forEach(i=>bm(W(4,i),['mOpen','mBig','mOpen','mBig'][i]));bm(WE(4,3)+.12,'mSmile');
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.14,duration:.2,yoyo:true,repeat:5},tBo);
FB.pm(tBo,'Wo');FB.brows(tBo,true,-14,14);FB.look(tBo,-18,6,.1);
tl.fromTo('#bhShake',{rotation:-5},{rotation:5,duration:.07,yoyo:true,repeat:10},tBo);tl.set('#bhShake',{rotation:0},tBo+.9);
TF.m(tBo+.5,'mO');TF.eyes(tBo+.5,'wide');TF.look(tBo+.5,-20,4,.1);
MC.look(tBo,-18,6,.1);MC.m(tBo,'mSm');

/* ================= SCENE 5: "Not yet! Needs a pinch more love!" ================= */
tl.to('#tfArmR',{rotation:-150,duration:.15,ease:'back.out(2)'},tNot);
tl.fromTo('#tfArmR',{rotation:-150},{rotation:-120,duration:.12,yoyo:true,repeat:5},tNot+.15);       // wagging finger
TF.brows(tNot,12,-12,-6,.1);TF.m(tNot,'mBg');TF.talk(tNot+.03,tNot+DU[5]*.2,'mBg','mFr',.12);
tl.fromTo('#tfHead',{rotation:-6},{rotation:6,duration:.12,yoyo:true,repeat:5},tNot);
TF.brows(tNot+.7,-6,6,0,.15);TF.m(tNot+.7,'mSm');TF.talk(tNot+.7,L[5]+DU[5]-.1,'mBg','mSm',.13);
// the pinch of love
tl.to('#tfArmR',{rotation:-60,duration:.2},tPinch-.25);tl.to('#tfArmL',{rotation:70,duration:.2},tPinch-.25);
rain(tPinch,PZX,PZY-230,8);
tl.fromTo('#pzLove',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.45,ease:'back.out(2)'},tPinch+.4);
hearts(tPinch+.55,PZX,PZY-80,4,90,200);sparks(tPinch+.5,PZX,PZY-40,8,190);
tl.to('#tfArmR',{rotation:0,duration:.3},tPinch+.9);tl.to('#tfArmL',{rotation:0,duration:.3},tPinch+.9);
// Bo sulks, Mochi rolls her eyes
eyesMode(tNot,'normal');bm(tNot,'mFrown');brows(tNot,-14,14,-8,.15);look(tNot,22,6,.1);
tl.to('#boArmL',{rotation:0,duration:.3},tNot);tl.to('#boArmR',{rotation:0,duration:.3},tNot);tl.to('#boLean',{rotation:0,duration:.3},tNot);
FB.pm(tNot,'Wo');
MC.look(tPinch,-24,-24,.15);MC.look(tPinch+.5,20,-20,.2);MC.m(tPinch,'mFr');
eyesMode(tPinch+.5,'hearts');bm(tPinch+.5,'mBig');

/* ================= SCENE 6: into the oven ... DING! ================= */
camTo(L[6]-.45,.7,560,330,1.15);
TF.m(L[6],'mBg');
tl.to('#tfArmL',{rotation:150,duration:.2},tBake-.1);tl.to('#tfArmR',{rotation:-150,duration:.2},tBake-.1);
tl.to('#pizza',{x:OVX,y:TT-96,scale:.4,duration:.7,ease:'power2.inOut'},tBake);
tl.to('#pizza',{opacity:0,duration:.1},tBake+.65);
tl.set('#ovenPz',{opacity:1},tBake+.65);
tl.to('#ovenGlow',{opacity:.75,duration:.3},tBake+.7);
tl.fromTo('#ovenGlow',{opacity:.55},{opacity:.95,duration:.14,yoyo:true,repeat:Math.max(1,Math.round((tDing-tBake-1)/.14))},tBake+1.0);
tl.fromTo('#ovenIn',{x:-3},{x:3,duration:.05,yoyo:true,repeat:Math.max(1,Math.round((tDing-tBake-.8)/.05))},tBake+.8);
tl.set('#ovenIn',{x:0},tDing);
tl.to('#tfArmL',{rotation:0,duration:.25},tBake+.4);tl.to('#tfArmR',{rotation:0,duration:.25},tBake+.4);
TF.look(tBake+.8,26,0,.2);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.04,duration:.2,yoyo:true,repeat:6},tBake+.9);
// DING!
tl.set('#ovenDing',{opacity:1},tDing);tl.to('#ovenDing',{opacity:0,duration:.45},tDing+.1);
tl.fromTo('#ovenIn',{y:0},{y:-18,duration:.08,yoyo:true,repeat:1},tDing);
shake(tDing,6,3);
tl.to('#ovenGlow',{opacity:0,duration:.3},tOutPz);
tl.set('#ovenPz',{opacity:0},tOutPz);tl.set('#pzBaked',{opacity:1},tOutPz);
tl.fromTo('#pizza',{opacity:0,x:OVX,y:TT-96,scale:.4},{opacity:1,x:PZX,y:PZY,scale:1,duration:.5,ease:'back.out(1.6)'},tOutPz);
sparks(tOutPz+.35,PZX,PZY-50,9,230);steam(tOutPz+.2,tOutPz+3);
TF.eyes(tOutPz,'happy');TF.m(tOutPz,'mBg');
tl.fromTo('#tfSq',{scaleY:.9},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tOutPz+.1);
eyesMode(tOutPz,'hearts');bm(tOutPz,'mBig');FB.pm(tOutPz,'Gr');
NN.eyes(tOutPz,'happy');MC.m(tOutPz,'mSm');

/* ================= SCENE 7: everyone gets a slice ================= */
camTo(L[7]-.4,.7,...WIDE);
const SL=[[BOX2,1287],[MCX,935],[NIX,1000],[BOX2,1097],[PZX,936]];   // Bo, Mochi, Nibbles, Flapjack, Truffle himself
tSl.forEach((t,i)=>slice(t,PZX+(i-2)*30,PZY-40,SL[i][0],SL[i][1],.62,260));
tl.to('#tfArmR',{rotation:-90,duration:.12},tSl[0]-.1);
for(let i=0;i<5;i++){tl.fromTo('#pzBaked',{scale:1},{scale:1.03,duration:.08,yoyo:true,repeat:1},tSl[i]);}
// Bo catches his
bm(tSl[0]+.5,'mBig');look(tSl[0]+.2,0,-30,.15);bm(tSl[0]+.7,'mSmile');
tl.fromTo('#boHead',{rotation:0},{rotation:-6,duration:.12,yoyo:true,repeat:5},tSl[0]+.7);
// Mochi
MC.m(tSl[1]+.45,'mOp');MC.m(tSl[1]+.6,'mFr');MC.talk(tSl[1]+.6,tSl[1]+1.3,'mSm','mFr',.13);mcEyes(tSl[1]+.9,'happy');
// Nibbles
NN.m(tSl[2]+.45,'mBg');NN.m(tSl[2]+.6,'mSm');NN.talk(tSl[2]+.6,tSl[2]+1.3,'mOp','mSm',.12);
// Flapjack on Bo's head
FB.pm(tSl[3]+.45,'Gr');FB.talk(tSl[3]+.6,tSl[3]+1.2,'Gr','Sm',.13);
// Truffle
TF.m(tSl[4]+.45,'mBg');TF.eyes(tSl[4]+.5,'happy');tl.to('#tfBelly',{scale:1.5,duration:.2},tSl[4]+.5);
// "DELICIOUS!"
hearts(W(7,7),PZX,PZY-100,5,100,260);hearts(W(7,7)+.1,BOX2,1000,3,80,240);
sparks(W(7,7),PZX,PZY-120,9,260);
tl.fromTo('#boSq',{y:0},{y:-36,duration:.13,yoyo:true,repeat:3},W(7,7));
tl.fromTo('#nm',{y:TT},{y:TT-30,duration:.12,yoyo:true,repeat:3},W(7,7)+.05);

/* ================= SCENE 8: "But then... something swung by!"  Coco snatches the pizza ================= */
// everybody freezes at "BUT THEN..."
const tFz=W(8,1)-.05;
eyesMode(tFz,'wide');bm(tFz,'mO');look(tFz,24,-18,.1);brows(tFz,-16,16,-12,.1);
FB.pm(tFz,'Oh');FB.look(tFz,16,-10,.1);
mcEyes(tFz,'wide');MC.m(tFz,'mO');MC.look(tFz,22,-18,.1);
NN.eyes(tFz,'wide');NN.m(tFz,'mO');NN.look(tFz,24,-12,.1);
TF.eyes(tFz,'wide');TF.m(tFz,'mO');TF.look(tFz,26,-14,.1);TF.brows(tFz,-14,14,-10,.1);
tl.fromTo('#boSq',{y:0},{y:-34,duration:.12,ease:'power2.out'},tFz).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},tFz+.12);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.08,duration:.12,yoyo:true,repeat:1},tFz);
// the swing: in from the right, snatch at the bottom of the arc, out to the left
tl.set('#cocoSwing',{opacity:1},tSw0-.02);
tl.fromTo('#cocoSwing',{rotation:-44},{rotation:0,duration:.55,ease:'power1.in'},tSw0);
tl.to('#cocoSwing',{rotation:52,duration:.7,ease:'power1.out'},tGrab);
tl.set('#cocoSwing',{opacity:0},tGrab+.72);
tl.to('#pizza',{scale:.36,duration:.07},tGrab-.07);
tl.set('#pizza',{opacity:0},tGrab);tl.set('#cocoPz',{opacity:1},tGrab);
tl.set('#pzBaked',{opacity:0},tGrab);
shake(tGrab,12,5);
// heads whip round to follow him
[tGrab+.05].forEach(t=>{lookAll(t,-30,-4);});
tl.to('#tfSq',{scaleX:.9,duration:.1},tGrab);tl.to('#tfSq',{scaleX:1.12,duration:.3},tGrab+.1);
tl.fromTo('#tfHat',{y:0},{y:-40,duration:.15,ease:'power2.out'},tGrab).to('#tfHat',{y:0,duration:.25,ease:'bounce.out'},tGrab+.15);

/* ================= SCENE 9/10: "Ooh-ooh, bananas!" ... a banana peel ... "My pizza!" ================= */
// everyone is frozen, jaws open
eyesMode(tGrab+.4,'wide');bm(tGrab+.4,'mBig');
tl.set('#peel',{opacity:1,x:PZX+20,y:150},tPeel);
tl.fromTo('#peel',{y:150,rotation:-200},{y:PZY-6,rotation:20,duration:.5,ease:'power2.in'},tPeel);
tl.fromTo('#peelIn',{scaleY:1,scaleX:1},{scaleY:.8,scaleX:1.12,duration:.15,yoyo:true,repeat:1},tPeel+.5);
sparks(tPeel+.5,PZX,PZY-20,5,80);
// "MY PIZZA!"
camTo(L[10]-.4,.7,500,260,1.1);
TF.m(L[10]-.05,'mBg');TF.eyes(L[10]-.05,'wide');TF.brows(L[10]-.05,-18,18,-14,.1);
tl.to('#tfArmL',{rotation:150,duration:.15,ease:'back.out(2)'},L[10]-.05);tl.to('#tfArmR',{rotation:-150,duration:.15,ease:'back.out(2)'},L[10]-.05);
TF.talk(L[10],L[10]+DU[10]-.05,'mBg','mO',.12);
tl.set('#tfSweat',{opacity:1},L[10]);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.08,duration:.1,yoyo:true,repeat:6},L[10]);
tl.fromTo('#tfHat',{rotation:-10},{rotation:10,duration:.08,yoyo:true,repeat:9},L[10]);
shake(L[10],8,4);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

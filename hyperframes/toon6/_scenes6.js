/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const TAB=[500,260,1.1];                                   // last camera of video #5
const SLIPC=[1450,120,1.0];                                // close camera for the slip
const PKX=2095, PKY=1656, BNX=1990, BNY=1664;              // banana peel + banana bait on the floor
const CMX=2170, CMY=424;                                   // Coco's seat on top of the fridge
const FL={bo:[1740,.88], tf:[1520,.74], mc:[1380,.68], nm:[1245,.5]};   // where the gang stands in front of the fridge
const tPan=W(1,3)-.2;                                      // "SWUNG": swish-pan to the fridge
const tPeel0=L[2]+.15;                                     // Coco drops a peel
const tJB=W(4,0)+.05, tJT=W(4,2)+.05, tJN=W(4,4)-.05;      // Bo jumps / Truffle jumps / everybody jumps
const tHmph=W(5,0), tIdea=W(5,3);
const tBan=W(6,2);                                         // the bait appears
const tSniff=L[7], tLeap=W(8,1)-.05, tSlip=W(8,4)-.02;
const tPzFly=tSlip+.02, tPzLand=tPzFly+.95;
const tFz=W(10,1)-.02, tCreak=W(10,4)-.1, tOpen=W(10,5);
const tRoar=L[11]+.02, tSweet=W(11,1)-.05;
const tStk=L[11]+DU[11]+.25;

/* --- small helpers --- */
let sln=0;
function slice(t,x0,y0,x1,y1,dur=.6,hgt=200){const i=(sln++)%6;
 tl.set('#slw'+i,{x:x0,y:y0},t);
 tl.fromTo('#sl'+i,{opacity:1,x:0,rotation:-30,scale:.9},{x:x1-x0,rotation:330,duration:dur,ease:'none'},t);
 tl.fromTo('#sl'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#sl'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#sl'+i,{opacity:0},t+dur);}
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
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
// runs along the table top to its right end, drops onto the floor and skids to its spot
function dash(id,sq,legs,arms,x0,xEdge,xF,s0,s1,tS,spd,amp,bob){
 const tA=(xEdge-x0)/spd, tB=.55, tC=.35;
 tl.fromTo(id,{x:x0},{x:xEdge,duration:tA,ease:'none'},tS);
 cycle(legs,arms,tS,tS+tA,.22,amp,amp*.8,sq,bob);
 tl.fromTo(id,{x:xEdge},{x:xF-70,duration:tB,ease:'none'},tS+tA);
 arc(id,tS+tA,tB,TT,90,FLOOR);
 tl.fromTo(id,{scale:s0},{scale:s1,duration:tB,ease:'none'},tS+tA);
 tl.to(id,{x:xF,duration:tC,ease:'power2.out'},tS+tA+tB);
 return tS+tA+tB+tC;}

/* ================= SCENE 0: the last frame of video #5 — everybody frozen, the pizza is gone ================= */
camSet(0,...TAB);
eyesMode(0,'wide');bm(0,'mBig');look(0,24,-18,.01);brows(0,-16,16,-12,.01);
FB.pm(0,'Oh');FB.look(0,16,-10,.01);
MC.m(0,'mO');mcEyes(0,'wide');MC.look(0,22,-18,.01);
NN.eyes(0,'wide');NN.m(0,'mO');NN.look(0,24,-12,.01);
TF.eyes(0,'wide');TF.m(0,'mBg');TF.look(0,26,-14,.01);TF.brows(0,-18,18,-14,.01);
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.06,duration:.1,yoyo:true,repeat:5},.05);
tl.fromTo('#tfHat',{rotation:-8},{rotation:8,duration:.09,yoyo:true,repeat:5},.05);
tl.set('#tfSweat',{opacity:1},0);
// they all start to move: the monkey went up!
lookAll(.55,24,-26);
tl.to('#tfArmL',{rotation:60,duration:.25},.6);tl.to('#tfArmR',{rotation:-60,duration:.25},.6);

/* ================= SCENE 1: swish-pan to the fridge: Coco is munching the pizza up there ================= */
tl.set('#peel',{opacity:0},tPan);
tl.set('#cm',{opacity:1},tPan);
cmEyes(tPan,'happy');CM.m(tPan,'mSm');
tl.set('#pizza',{opacity:1,x:CMX,y:CMY-14,scale:.5,rotation:0},tPan);
tl.set('#pzBaked',{opacity:1},tPan);tl.set('#pzSauce,#pzCheese,#pzTop,#pzLove',{opacity:1},tPan);
tl.to('#cmArmL',{rotation:-42,duration:.2},tPan);tl.to('#cmArmR',{rotation:42,duration:.2},tPan);
camTo(tPan,.75,...FRIDGE,'power3.inOut');
// Coco munches slice after slice
const mouthY=CMY-209;
const munches=[];for(let t=tPan+.85;t<L[2]-.35;t+=.62)munches.push(t);
munches.forEach((t,i)=>{
 slice(t,CMX-26,CMY-26,CMX,mouthY+10,.34,70);
 CM.m(t+.32,'mBg');CM.m(t+.5,'mSm');
 tl.fromTo('#cmHead',{y:0},{y:10,duration:.09,yoyo:true,repeat:3},t+.36);
 bits(t+.4,CMX,mouthY+16,3);
 tl.to('#pizza',{scale:.5-.012*(i+1),duration:.1},t+.36);});
tl.fromTo('#cmTail',{rotation:-8},{rotation:10,duration:.3,yoyo:true,repeat:12,ease:'sine.inOut'},tPan);
// the gang dashes over the table and drops down in front of the fridge
tl.to('#tfArmL',{rotation:0,duration:.1},tPan);tl.to('#tfArmR',{rotation:0,duration:.1},tPan);tl.set('#tfSweat',{opacity:0},tPan);
const aTf=dash('#tf','#tfSq',['#tfLegL','#tfLegR'],[],PZX,1470,FL.tf[0],TFS,FL.tf[1],tPan+.0,520,26,6);
const aNm=dash('#nm','#nmSq',['#nmLegL','#nmLegR'],[],NIX,1470,FL.nm[0],NSC,FL.nm[1],tPan+.05,800,34,4);
const aMc=dash('#mc','#mcSq',['#mcLegL','#mcLegR'],[],MCX,1470,FL.mc[0],MCS,FL.mc[1],tPan+.1,900,34,6);
tl.fromTo('#bo',{x:BOX2},{x:FL.bo[0],duration:1.5,ease:'power1.inOut'},tPan+.05);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tPan+.05,tPan+1.55,.26,34,46,'#boSq',14);
tl.to('#boLean',{rotation:14,duration:.1},tPan+.05);tl.to('#boLean',{rotation:-8,duration:.2},tPan+1.45);tl.to('#boLean',{rotation:0,duration:.25},tPan+1.65);
tl.set('#boSweat',{opacity:0},0);
TF.m(tPan+.3,'mSm');TF.eyes(tPan+.3,'normal');TF.look(tPan+.3,10,0,.1);TF.brows(tPan+.3,12,-12,-6,.1);
NN.eyes(tPan+.3,'normal');NN.m(tPan+.3,'mBg');
MC.m(tPan+.3,'mFr');mcEyes(tPan+.3,'lids');
eyesMode(tPan+.3,'normal');bm(tPan+.3,'mBig');brows(tPan+.3,14,-14,-6,.1);look(tPan+.3,20,-24,.1);
FB.pm(tPan+.3,'Wo');
// when they stop, everybody glares up at the thief
const tArr=Math.max(aTf,aNm,aMc,tPan+1.9);
lookAll(tArr,22,-30);

/* ================= SCENE 2: "Finders keepers!" Coco taunts and drops a banana peel ================= */
CM.m(L[2]-.05,'mBg');CM.talk(L[2]+.03,L[2]+DU[2]-.08,'mBg','mSm',.12);cmEyes(L[2]-.05,'normal');CM.brows(L[2]-.05,-8,8,-4,.1);
tl.fromTo('#cmHead',{rotation:-8},{rotation:8,duration:.22,yoyo:true,repeat:Math.round(DU[2]/.22),ease:'sine.inOut'},L[2]);
tl.to('#cmArmR',{rotation:-135,duration:.2,ease:'back.out(2)'},L[2]);tl.fromTo('#cmArmR',{rotation:-135},{rotation:-105,duration:.14,yoyo:true,repeat:5},L[2]+.2);
CM.look(L[2],-24,10,.12);
// the peel falls from his hand to the floor
tl.set('#peel',{opacity:1,x:CMX-110,y:CMY-60,rotation:-40},tPeel0);
tl.fromTo('#peel',{x:CMX-110,rotation:-40},{x:PKX,rotation:25,duration:.9,ease:'none'},tPeel0);
tl.fromTo('#peel',{y:CMY-60},{y:PKY,duration:.9,ease:'power2.in'},tPeel0);
tl.fromTo('#peelIn',{scaleY:1,scaleX:1},{scaleY:.7,scaleX:1.15,duration:.12,yoyo:true,repeat:1},tPeel0+.9);
// the gang fumes
eyesMode(L[2]+.1,'normal');bm(L[2]+.1,'mFrown');brows(L[2]+.1,16,-16,-6,.1);
TF.brows(L[2]+.1,16,-16,-6,.1);TF.m(L[2]+.1,'mFr');
NN.brows(L[2]+.1,16,-16,-6,.1);NN.m(L[2]+.1,'mFr');

/* ================= SCENE 3: Bo: "Give it back!" ================= */
const tG=L[3];
bm(tG-.02,'mBig');eyesMode(tG-.02,'normal');look(tG,20,-26,.1);
tl.to('#boArmR',{rotation:-165,duration:.2,ease:'back.out(2.5)'},tG);tl.fromTo('#boArmR',{rotation:-165},{rotation:-135,duration:.1,yoyo:true,repeat:5},tG+.2);
tl.fromTo('#boSq',{y:0},{y:-28,duration:.1,yoyo:true,repeat:5,ease:'power1.out'},tG);
bm(tG+DU[3]+.05,'mOpen');
FB.pm(tG,'Gr');tl.to('#bhArmL',{rotation:-150,duration:.15},tG);tl.to('#bhArmR',{rotation:150,duration:.15},tG);
TF.m(tG,'mBg');tl.to('#tfArmR',{rotation:-120,duration:.2},tG);

/* ================= SCENE 4: Bo jumped. Truffle jumped. Nobody could reach! ================= */
tl.to('#boArmR',{rotation:0,duration:.2},tG+.9);tl.to('#tfArmR',{rotation:0,duration:.2},tG+.9);
// Bo
tl.to('#boArmL',{rotation:-160,duration:.12},tJB-.1);tl.to('#boArmR',{rotation:160,duration:.12},tJB-.1);
tl.fromTo('#boSq',{scaleY:1},{scaleY:.82,duration:.1},tJB-.12).to('#boSq',{scaleY:1,duration:.08},tJB-.02);
hop('#boSq',tJB,430,.36,.36);
eyesMode(tJB,'wide');bm(tJB,'mBig');
tl.fromTo('#bhShake',{rotation:-8},{rotation:8,duration:.06,yoyo:true,repeat:11},tJB);tl.set('#bhShake',{rotation:0},tJB+.8);
tl.fromTo('#boSq',{scaleY:.86},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tJB+.72);
shake(tJB+.72,6,3);
tl.to('#boArmL',{rotation:0,duration:.25},tJB+.8);tl.to('#boArmR',{rotation:0,duration:.25},tJB+.8);
bm(tJB+.85,'mFrown');look(tJB+.85,20,-26,.15);
// Truffle
tl.fromTo('#tfSq',{scaleY:1},{scaleY:.8,duration:.1},tJT-.12).to('#tfSq',{scaleY:1,duration:.08},tJT-.02);
tl.to('#tfArmL',{rotation:150,duration:.12},tJT-.08);tl.to('#tfArmR',{rotation:-150,duration:.12},tJT-.08);
hop('#tfSq',tJT,330,.34,.34);
TF.m(tJT,'mBg');TF.eyes(tJT,'wide');
tl.fromTo('#tfBelly',{scale:1},{scale:1.2,duration:.14,yoyo:true,repeat:3},tJT+.1);
tl.fromTo('#tfSq',{scaleY:.84},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tJT+.68);
shake(tJT+.68,6,3);
tl.to('#tfArmL',{rotation:0,duration:.25},tJT+.75);tl.to('#tfArmR',{rotation:0,duration:.25},tJT+.75);
TF.m(tJT+.8,'mFr');
// "NOBODY COULD REACH!": everybody hops at once and flops
[['#nmSq',160],['#mcSq',90],['#boSq',380],['#tfSq',280]].forEach(([s,h],i)=>hop(s,tJN+i*.05,h,.3,.3));
tl.to('#nmArmL',{rotation:150,duration:.1},tJN);tl.to('#nmArmR',{rotation:-150,duration:.1},tJN);
tl.to('#mcArmL',{rotation:140,duration:.1},tJN+.1);tl.to('#mcArmR',{rotation:-140,duration:.1},tJN+.1);
tl.to('#boArmL',{rotation:-160,duration:.1},tJN);tl.to('#boArmR',{rotation:160,duration:.1},tJN);
tl.to('#tfArmL',{rotation:150,duration:.1},tJN);tl.to('#tfArmR',{rotation:-150,duration:.1},tJN);
const tFlop=tJN+.8;
['#boArmL','#boArmR','#tfArmL','#tfArmR','#nmArmL','#nmArmR','#mcArmL','#mcArmR'].forEach(a=>tl.to(a,{rotation:0,duration:.3},tFlop));
['#boSq','#tfSq','#nmSq','#mcSq'].forEach(s=>tl.fromTo(s,{scaleY:1},{scaleY:.88,duration:.35,yoyo:true,repeat:3,ease:'sine.inOut'},tFlop+.1));
tl.set('#boSweat',{opacity:1},tFlop);
eyesMode(tFlop,'normal');bm(tFlop,'mOpen');
NN.m(tFlop,'mFr');TF.m(tFlop,'mFr');MC.m(tFlop,'mFr');
// Coco giggles at them
CM.m(tJB,'mBg');CM.talk(tJB,tJB+.5,'mBg','mSm',.12);CM.m(tJN+.7,'mBg');
tl.fromTo('#cmSq',{scaleY:.84},{scaleY:.9,duration:.12,yoyo:true,repeat:5},tJN+.7);

/* ================= SCENE 5: Mochi: "Hmph. Banana peel. Obviously." ================= */
mcEyes(tHmph-.05,'lids');MC.m(tHmph-.05,'mFr');MC.brows(tHmph-.05,8,-8,2,.2);
tl.to('#mcHead',{rotation:-9,duration:.25},tHmph);
MC.look(tHmph,24,14,.2);
tl.to('#mcArmR',{rotation:-95,duration:.25,ease:'back.out(1.8)'},W(5,2)-.15);
lookAll(W(5,2)-.1,26,16);
MC.m(W(5,3),'mSm');tl.to('#mcHead',{rotation:6,duration:.3},W(5,3));
MC.talk(W(5,3),WE(5,3)-.05,'mOp','mSm',.14);
// light bulb!
tl.set('#bulb',{x:FL.mc[0]-6,y:1150},tIdea-.3);
tl.fromTo('#bulb',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},tIdea-.2);
tl.fromTo('#bulbIn',{scale:1},{scale:1.12,duration:.15,yoyo:true,repeat:5},tIdea+.1);
sparks(tIdea,FL.mc[0]-6,1090,6,90);
tl.to('#bulb',{opacity:0,duration:.25},tIdea+1.2);
// the gang gets it
['#boSq','#tfSq','#nmSq'].forEach((s,i)=>hop(s,tIdea+.1+i*.06,70,.15,.15));
eyesMode(tIdea+.1,'normal');bm(tIdea+.1,'mBig');brows(tIdea+.1,-6,6,-4,.1);look(tIdea+.1,26,16,.12);
TF.m(tIdea+.1,'mBg');TF.eyes(tIdea+.1,'happy');NN.m(tIdea+.1,'mBg');NN.eyes(tIdea+.1,'happy');
FB.pm(tIdea+.1,'Gr');
tl.set('#boSweat',{opacity:0},tIdea);
tl.to('#mcArmR',{rotation:28,duration:.3},tIdea+.8);
// Coco keeps munching, unaware
for(let t=W(5,0)+.4;t<L[6]-.3;t+=.7){slice(t,CMX-26,CMY-26,CMX,mouthY+10,.34,70);CM.m(t+.32,'mBg');CM.m(t+.5,'mSm');tl.fromTo('#cmHead',{y:0},{y:10,duration:.09,yoyo:true,repeat:3},t+.36);bits(t+.4,CMX,mouthY+16,3);}
cmEyes(tHmph,'happy');

/* ================= SCENE 6: "So they set a slippery trap!" ================= */
tl.fromTo('#bananas',{opacity:0,scale:.3,y:BNY-240},{opacity:1,scale:1.35,y:BNY,duration:.45,ease:'back.out(2)'},tBan);
sparks(tBan+.3,BNX,BNY-60,6,110);
tl.fromTo('#bananasIn',{scaleY:1},{scaleY:1.06,duration:.18,yoyo:true,repeat:3},tBan+.5);
// everybody tiptoes into a crouch and grins
['#boSq','#tfSq','#nmSq','#mcSq'].forEach(s=>tl.to(s,{scaleY:.8,duration:.3,ease:'sine.inOut'},W(6,4)-.2));
eyesMode(W(6,4)-.2,'normal');bm(W(6,4)-.2,'mSmile');brows(W(6,4)-.2,10,-10,-6,.15);look(W(6,4)-.2,26,-14,.15);
TF.m(W(6,4)-.2,'mSm');TF.brows(W(6,4)-.2,10,-10,-6,.15);NN.m(W(6,4)-.2,'mSm');MC.m(W(6,4)-.2,'mSm');MC.brows(W(6,4)-.2,10,-10,-4,.15);
FB.pm(W(6,4)-.2,'Sm');
// Coco still munching, grinning down
cmEyes(tBan,'normal');CM.look(tBan,-20,16,.15);CM.brows(tBan,-6,6,-4,.1);

/* ================= SCENE 7: "Ooh-ooh, bananas!" Coco spots the bait ================= */
camTo(tSniff-.5,.6,...FRIDGE);
cmEyes(tSniff-.05,'wide');CM.m(tSniff-.05,'mO');CM.look(tSniff-.05,-26,20,.1);
tl.to('#cmSq',{scaleY:.95,duration:.15},tSniff);
tl.fromTo('#cmHead',{rotation:-6},{rotation:6,duration:.1,yoyo:true,repeat:Math.round(DU[7]/.2)},tSniff);
CM.talk(tSniff+.05,tSniff+DU[7]-.05,'mBg','mSm',.12);
tl.fromTo('#cmArmR',{rotation:-80},{rotation:-150,duration:.12,yoyo:true,repeat:7},tSniff);
hearts(W(7,1),CMX-60,CMY-190,3,70,200);
cmEyes(W(7,1),'happy');
tl.to('#cmTail',{rotation:20,duration:.1,yoyo:true,repeat:11},tSniff);
// they hold their breath
['#boSq','#tfSq','#nmSq','#mcSq'].forEach(s=>tl.to(s,{scaleY:.74,duration:.2},tSniff));

/* ================= SCENE 8: "He leaped down... and slipped!" ================= */
camTo(tLeap-.25,.6,...SLIPC);
// crouch, then leap with the pizza under his arm
tl.to('#cmSq',{scaleY:.7,duration:.12},tLeap-.12);
tl.to('#cmSq',{scaleY:1.06,duration:.12},tLeap);
CM.m(tLeap,'mBg');cmEyes(tLeap,'wide');
const dLeap=tSlip-tLeap;
tl.fromTo('#cm',{x:CMX},{x:PKX,duration:dLeap,ease:'none'},tLeap);
tl.fromTo('#cm',{y:CMY},{y:PKY,duration:dLeap,ease:'power2.in'},tLeap);
tl.fromTo('#cm',{scale:.7},{scale:.82,duration:dLeap,ease:'none'},tLeap);
tl.to('#cmArmL',{rotation:-150,duration:.15},tLeap);tl.to('#cmArmR',{rotation:150,duration:.15},tLeap);
tl.fromTo('#pizza',{x:CMX,y:CMY-14},{x:PKX-20,y:PKY-210,duration:dLeap,ease:'none'},tLeap);
tl.to('#pizza',{scale:.42,duration:.2},tLeap);
// SLIP!
tl.fromTo('#cmFlip',{rotation:0},{rotation:560,duration:.85,ease:'power1.out'},tSlip);
tl.fromTo('#cm',{x:PKX},{x:BNX-10,duration:.85,ease:'none'},tSlip);
tl.fromTo('#cm',{y:PKY},{y:PKY-340,duration:.4,ease:'power2.out'},tSlip).to('#cm',{y:PKY,duration:.45,ease:'power2.in'},tSlip+.4);
tl.fromTo('#cm',{scale:.82},{scale:.8,duration:.85,ease:'none'},tSlip);
CM.m(tSlip,'mO');cmEyes(tSlip,'wide');CM.brows(tSlip,-18,18,-14,.1);
tl.to('#cmArmL',{rotation:140,duration:.15},tSlip);tl.to('#cmArmR',{rotation:-140,duration:.15},tSlip);
tl.fromTo('#peel',{opacity:1,x:PKX,y:PKY,rotation:25},{opacity:1,x:PKX+130,y:PKY-90,rotation:380,duration:.35,ease:'power2.out'},tSlip);
tl.set('#peel',{opacity:0},tSlip+.4);
// the pizza flies up and over to Truffle (hat landing)
tl.fromTo('#pizza',{x:PKX-20,y:PKY-210},{x:FL.tf[0],duration:tPzLand-tPzFly,ease:'none'},tPzFly);
tl.fromTo('#pizza',{y:PKY-210},{y:PKY-700,duration:(tPzLand-tPzFly)*.45,ease:'power2.out'},tPzFly).to('#pizza',{y:1640-.74*(318+270+55)-30,duration:(tPzLand-tPzFly)*.55,ease:'power2.in'},tPzFly+(tPzLand-tPzFly)*.45);
tl.fromTo('#pizza',{rotation:0},{rotation:-720,duration:tPzLand-tPzFly,ease:'none'},tPzFly);
tl.to('#pizza',{scale:.5,duration:.4},tPzFly);
// Coco crash-lands in the bananas, dizzy
const tCrash=tSlip+.85;
tl.fromTo('#cmFlip',{rotation:560},{rotation:720,duration:.01},tCrash-.01);tl.set('#cmFlip',{rotation:0},tCrash+.01);
tl.fromTo('#cmSq',{scaleY:.7,scaleX:1.2},{scaleY:.84,scaleX:1,duration:.5,ease:'elastic.out(1,.4)'},tCrash);
tl.to('#cm',{scale:.76,duration:.1},tCrash);
tl.fromTo('#bananasIn',{scaleY:1,scaleX:1},{scaleY:.5,scaleX:1.2,duration:.1,ease:'power2.out'},tCrash);
shake(tCrash,14,6);
cmEyes(tCrash,'dizzy');CM.m(tCrash,'mO');CM.brows(tCrash,0,0,0,.1);
tl.to('#cmArmL',{rotation:-30,duration:.3},tCrash);tl.to('#cmArmR',{rotation:30,duration:.3},tCrash);
tl.fromTo('.cmSwirl',{rotation:0},{rotation:720,duration:2.4,ease:'none'},tCrash);
sparks(tCrash+.05,BNX-10,PKY-330,6,80);sparks(tCrash+.35,BNX-10,PKY-330,6,80);
// the whole kitchen jolts: the fridge door pops ajar
tl.to('#fridgeDoor',{scaleX:.95,duration:.15,ease:'back.out(3)'},tCrash+.05);
// the gang watches the pizza sail over
lookAll(tSlip+.1,10,-30);
['#boSq','#tfSq','#nmSq','#mcSq'].forEach(s=>tl.to(s,{scaleY:1,duration:.15},tSlip-.1));
eyesMode(tSlip,'wide');bm(tSlip,'mO');
TF.eyes(tSlip,'wide');TF.m(tSlip,'mO');NN.eyes(tSlip,'wide');MC.m(tSlip,'mO');mcEyes(tSlip,'wide');FB.pm(tSlip,'Oh');

/* ================= SCENE 9: "Pizza saved!" ================= */
camTo(tPzLand-.45,.7,...FRIDGE);
const tHatY=1640-.74*(318+270+55);
tl.set('#pizza',{x:FL.tf[0],y:tHatY-26,rotation:0,scale:.5},tPzLand);
tl.fromTo('#pizza',{scale:.5},{scale:.46,duration:.2,yoyo:true,repeat:1},tPzLand);
tl.fromTo('#tfSq',{scaleY:.88},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tPzLand);
tl.to('#tfArmL',{rotation:150,duration:.15},tPzLand-.1);tl.to('#tfArmR',{rotation:-150,duration:.15},tPzLand-.1);
tl.fromTo('#tfHat',{y:0},{y:-18,duration:.1,yoyo:true,repeat:1},tPzLand);
TF.eyes(L[9]-.05,'happy');TF.m(L[9]-.05,'mBg');TF.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.12);
sparks(tPzLand+.05,FL.tf[0],tHatY-20,8,140);hearts(L[9]+.2,FL.tf[0],tHatY,4,80,220);
// everybody cheers
eyesMode(L[9]-.05,'hearts');bm(L[9]-.05,'mBig');
tl.fromTo('#boSq',{y:0},{y:-40,duration:.13,yoyo:true,repeat:5,ease:'power1.out'},L[9]);
FB.pm(L[9],'Gr');tl.to('#bhArmL',{rotation:-150,duration:.2},L[9]);tl.to('#bhArmR',{rotation:150,duration:.2},L[9]);
NN.eyes(L[9],'happy');NN.m(L[9],'mBg');tl.fromTo('#nmSq',{y:0},{y:-34,duration:.12,yoyo:true,repeat:5,ease:'power1.out'},L[9]);
MC.m(L[9],'mSm');mcEyes(L[9],'happy');
tl.set('#boSweat',{opacity:0},L[9]);
// Coco, dazed
tl.fromTo('#cmHead',{rotation:-8},{rotation:8,duration:.3,yoyo:true,repeat:10,ease:'sine.inOut'},L[9]);

/* ================= SCENE 10: "But then... the fridge creaked open!" ================= */
// freeze, everybody stares at the fridge
const tZ=tFz;
eyesMode(tZ,'wide');bm(tZ,'mO');look(tZ,30,-8,.1);brows(tZ,-16,16,-12,.1);
FB.pm(tZ,'Oh');FB.look(tZ,18,-4,.1);
mcEyes(tZ,'wide');MC.m(tZ,'mO');MC.look(tZ,30,-8,.1);
NN.eyes(tZ,'wide');NN.m(tZ,'mO');NN.look(tZ,30,-8,.1);
TF.eyes(tZ,'wide');TF.m(tZ,'mO');TF.look(tZ,30,-8,.1);
['#boSq','#tfSq','#nmSq','#mcSq'].forEach(s=>tl.fromTo(s,{y:0},{y:-30,duration:.12,ease:'power2.out'},tZ).to(s,{y:0,duration:.2,ease:'bounce.out'},tZ+.12));
tl.to('#tfArmL',{rotation:0,duration:.2},tZ);tl.to('#tfArmR',{rotation:0,duration:.2},tZ);
// the slow creak
camTo(tCreak-.4,1.6,1500,520,1.18,'sine.inOut');
tl.to('#fridgeDoor',{scaleX:.8,duration:.45,ease:'sine.inOut'},tCreak);
tl.to('#fridgeDoor',{scaleX:.74,duration:.1},tCreak+.55);tl.to('#fridgeDoor',{scaleX:.62,duration:.4,ease:'sine.inOut'},tCreak+.7);
tl.to('#fridgeDoor',{scaleX:.56,duration:.1},tCreak+1.2);tl.to('#fridgeDoor',{scaleX:.44,duration:.35,ease:'sine.inOut'},tCreak+1.35);
// the eye blinks and looks around
tl.fromTo('#gdEyeG',{scaleY:1},{scaleY:.1,duration:.08,yoyo:true,repeat:1},tOpen+.1);
tl.fromTo('#gdPupil',{x:0},{x:-26,duration:.2},tOpen+.4);tl.to('#gdPupil',{x:26,duration:.3},tOpen+.8);tl.to('#gdPupil',{x:0,y:8,duration:.25},tOpen+1.3);

/* ================= SCENE 11: "Roar! ...Did that work?" ================= */
const dRoar=tSweet-tRoar;
tl.set('#gdSmile',{opacity:0},tRoar);tl.set('#gdRoar',{opacity:1},tRoar);
tl.fromTo('#gdBody',{scale:1},{scale:1.1,duration:.2,ease:'back.out(3)'},tRoar);
tl.fromTo('#gdBrow',{rotation:0,y:0},{rotation:10,y:6,duration:.15},tRoar);
tl.fromTo('#gdEyeG',{scale:1},{scale:.82,duration:.15},tRoar);
shake(tRoar,12,8);
// everybody recoils
['#boSq','#tfSq','#nmSq','#mcSq'].forEach(s=>tl.fromTo(s,{y:0},{y:-70,duration:.15,ease:'power2.out'},tRoar).to(s,{y:0,duration:.25,ease:'bounce.out'},tRoar+.15));
tl.to('#bo',{x:FL.bo[0]-60,duration:.2},tRoar);tl.to('#tf',{x:FL.tf[0]-60,duration:.2},tRoar);
tl.fromTo('#tfHat',{y:0},{y:-60,duration:.2,yoyo:true,repeat:1},tRoar);
eyesMode(tRoar,'wide');bm(tRoar,'mBig');
tl.fromTo('#cmSq',{y:0},{y:-60,duration:.15,yoyo:true,repeat:1},tRoar);
cmEyes(tRoar,'wide');CM.m(tRoar,'mBg');
// ...did that work?  (a very small, hopeful monster)
tl.set('#gdRoar',{opacity:0},tSweet);tl.set('#gdSmile',{opacity:1},tSweet);
tl.fromTo('#gdBody',{scale:1.1},{scale:1,duration:.25},tSweet);
tl.fromTo('#gdBrow',{rotation:10,y:6},{rotation:-12,y:-4,duration:.25},tSweet);
tl.fromTo('#gdEyeG',{scale:.82},{scale:1.08,duration:.25},tSweet);
tl.to('#gdPupil',{x:-18,y:10,duration:.3},tSweet+.1);tl.to('#gdPupil',{x:14,y:12,duration:.4},tSweet+.6);
// the gang peeks back, confused
eyesMode(tSweet+.2,'normal');bm(tSweet+.2,'mOpen');brows(tSweet+.2,-10,10,-8,.15);
TF.m(tSweet+.2,'mFr');TF.eyes(tSweet+.2,'normal');MC.m(tSweet+.2,'mFr');mcEyes(tSweet+.2,'lids');
NN.eyes(tSweet+.2,'normal');
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

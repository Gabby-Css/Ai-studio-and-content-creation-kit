/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={dark:[1100,0,.84], party:[900,-150,.72], win:[200,260,1.45]};
const BEAT=.5;
const DX={cm:1090,nm:1250,tf:1410,mc:1570,bo:1740};        // where everybody dances
const HG={cm:1540,mc:1620,tf:1710,bo:1810,nm:1880};        // the end of video #7
const tPeek=L[1]-.2;                                       // Boo peeks in
const tDisco=W(4,2)-.1;                                    // "PARTY!": the disco ball drops
const tShuf=W(4,3);                                        // everybody moves to the dance floor
const tGlow=L[5]+.05;                                      // Boo lights up the room
const tD0=Math.round((W(6,0)-.05)/BEAT)*BEAT;              // first dance beat (on the music's beat grid)
const tD1=L[9]-.35;                                        // the dance ends (record scratch)
const tFreeze=tD1;
const tUfo=W(9,2), tSwish=W(9,4)-.1;
const tBlip=L[11]-.1;
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
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const gmArms=(t,l,r,d=.2)=>{tl.to('#gmArmL',{rotation:l,duration:d},t);tl.to('#gmArmR',{rotation:r,duration:d},t);};
const ghArms=(t,l,r,d=.2)=>{tl.to('#ghArmL',{rotation:l,duration:d},t);tl.to('#ghArmR',{rotation:r,duration:d},t);};
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);
 ['tf','nm','mc','cm'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};

/* ================= SCENE 0: the last frame of video #7 — the gang screaming in the dark, Gumdrop's arms up ================= */
camSet(0,...CAM.dark);
eyesMode(0,'wide');bm(0,'mBig');brows(0,-18,18,-12,.01);look(0,-28,-6,.01);FB.pm(0,'Oh');
TF.eyes(0,'wide');TF.m(0,'mBg');NN.eyes(0,'wide');NN.m(0,'mBg');cmEyes(0,'wide');CM.m(0,'mBg');mcEyes(0,'wide');MC.m(0,'mBg');
GM.eyes(0,'wide');GM.m(0,'mBg');
tl.set('#bo,#tf,#mc,#nm,#cm',{y:FLOOR},0);
const sBo=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq'];
sBo.forEach((s,i)=>tl.fromTo(s,{y:0},{y:-40,duration:.14,yoyo:true,repeat:3},.02+i*.03));
['tf','nm','mc','cm'].forEach(p=>{tl.set(`#${p}ArmL`,{rotation:150},0);tl.set(`#${p}ArmR`,{rotation:-150},0);});
tl.set('#boArmL',{rotation:-160},0);tl.set('#boArmR',{rotation:160},0);
armsDown(.55,.25);gmArms(.55,0,0,.3);

/* ================= SCENE 1: "The ghost was scared too!" ================= */
tl.set('#gh',{opacity:1,x:1010,y:1540,scale:.9},tPeek);
tl.fromTo('#ghGlow',{opacity:0},{opacity:1,duration:.4},tPeek);
tl.fromTo('#gh',{x:1010},{x:1150,duration:1.2,ease:'sine.out'},tPeek);
tl.fromTo('#ghSq',{y:0},{y:-14,duration:.6,yoyo:true,repeat:5,ease:'sine.inOut'},tPeek);
tl.fromTo('#ghBody',{rotation:-2.5},{rotation:2.5,duration:.07,yoyo:true,repeat:15},tPeek);tl.set('#ghBody',{rotation:0},tPeek+1.2);
GH.eyes(tPeek,'wide');GH.m(tPeek,'mFr');GH.brows(tPeek,-16,16,-6,.1);GH.look(tPeek,24,4,.2);
ghArms(tPeek+.2,-35,35,.3);
// the gang calms down and looks at her
eyesMode(.7,'normal');bm(.7,'mO');brows(.7,-10,10,-6,.15);FB.pm(.7,'Wo');
TF.eyes(.7,'normal');TF.m(.7,'mO');NN.eyes(.7,'normal');NN.m(.7,'mO');cmEyes(.7,'normal');CM.m(.7,'mO');mcEyes(.7,'normal');MC.m(.7,'mO');GM.eyes(.7,'normal');GM.m(.7,'mO');
lookAll(.8,-30,-4);

/* ================= SCENE 2: Boo: "Hi... can I play too?" ================= */
tl.to('#gh',{x:1290,duration:1.1,ease:'sine.inOut'},L[2]-.3);
GH.m(L[2]-.05,'mOp');GH.talk(L[2]+.02,L[2]+DU[2]-.08,'mOp','mFr',.2);GH.eyes(L[2],'normal');GH.brows(L[2],-10,10,-4,.15);
tl.fromTo('#ghHead',{rotation:-4},{rotation:4,duration:.4,yoyo:true,repeat:5,ease:'sine.inOut'},L[2]);tl.to('#ghHead',{rotation:0,duration:.1},L[2]+2.5);
// everybody melts
eyesMode(L[2]+.3,'normal');bm(L[2]+.3,'mSmile');brows(L[2]+.3,8,-8,-4,.2);FB.pm(L[2]+.3,'Sm');
TF.eyes(L[2]+.3,'happy');TF.m(L[2]+.3,'mSm');NN.eyes(L[2]+.3,'happy');NN.m(L[2]+.3,'mSm');cmEyes(L[2]+.3,'happy');CM.m(L[2]+.3,'mSm');
mcEyes(L[2]+.3,'lids');MC.m(L[2]+.3,'mSm');GM.eyes(L[2]+.3,'happy');GM.m(L[2]+.3,'mSm');
hearts(L[2]+.6,1450,1250,3,90,200);

/* ================= SCENE 3: Gumdrop: "Roar! ...I mean, hello!" ================= */
GM.eyes(L[3]-.05,'wide');GM.m(L[3]-.05,'mBg');GM.brows(L[3]-.05,12,-12,-4,.08);
gmArms(L[3]-.05,150,-150,.1);
tl.fromTo('#gm',{scale:GS},{scale:GS*1.06,duration:.15,yoyo:true,repeat:1},L[3]);
shake(L[3],8,5);
GH.eyes(L[3],'wide');GH.m(L[3],'mO');
GM.m(W(3,1),'mSm');GM.eyes(W(3,1),'happy');GM.brows(W(3,1),0,0,0,.1);GM.talk(W(3,1),L[3]+DU[3]-.05,'mOp','mSm',.14);
gmArms(W(3,1),0,-120,.2);
tl.fromTo('#gmArmR',{rotation:-120},{rotation:-85,duration:.18,yoyo:true,repeat:7},W(3,1)+.2);tl.to('#gmArmR',{rotation:0,duration:.2},L[3]+DU[3]+.4);
GH.m(W(3,1),'mOp');GH.eyes(W(3,1)+.1,'happy');ghArms(W(3,1)+.1,0,0,.2);

/* ================= SCENE 4: Bo: "A glow party! Just one dance!" ================= */
tl.to('#boArmL',{rotation:-160,duration:.12},L[4]);tl.to('#boArmR',{rotation:160,duration:.12},L[4]);
bm(L[4]-.05,'mBig');eyesMode(L[4]-.05,'wide');
tl.fromTo('#boSq',{y:0},{y:-60,duration:.14,yoyo:true,repeat:5,ease:'power1.out'},L[4]);
FB.pm(L[4],'Gr');
// the disco ball drops from the ceiling
tl.set('#disco',{opacity:1},tDisco);
tl.fromTo('#discoIn',{y:-420},{y:0,duration:.9,ease:'bounce.out'},tDisco);
camTo(tDisco-.2,1.0,...CAM.party,'power2.inOut');
tl.fromTo('#discoIn',{rotation:-4},{rotation:4,duration:.8,yoyo:true,repeat:9,ease:'sine.inOut'},tDisco+.9);
sparks(tDisco+.85,1400,150,6,110);
// everybody hops onto the dance floor
{const t=tShuf;
 [['#cm','cm',HG.cm,DX.cm],['#nm','nm',HG.nm,DX.nm],['#tf','tf',HG.tf,DX.tf],['#mc','mc',HG.mc,DX.mc],['#bo','bo',HG.bo,DX.bo]].forEach(([id,p,x0,x1],i)=>{
  tl.fromTo(id,{x:x0},{x:x1,duration:.7,ease:'power2.inOut'},t+i*.04);
  hop(`#${p}Sq`,t+i*.04,50,.2,.25);});}
armsDown(tShuf-.3,.2);
eyesMode(tShuf,'normal');bm(tShuf,'mBig');brows(tShuf,6,-6,-4,.15);
TF.eyes(tShuf,'happy');TF.m(tShuf,'mBg');NN.eyes(tShuf,'happy');NN.m(tShuf,'mBg');cmEyes(tShuf,'happy');CM.m(tShuf,'mBg');mcEyes(tShuf,'happy');MC.m(tShuf,'mSm');
GM.eyes(tShuf,'happy');GM.m(tShuf,'mBg');

/* ================= SCENE 5: "Boo made the whole room glow!" ================= */
tl.fromTo('#ghFlip',{rotation:0},{rotation:720,duration:1.1,ease:'power2.inOut'},tGlow);
tl.fromTo('#ghGlow',{scale:1},{scale:2.4,duration:.9,ease:'power2.out'},tGlow);
tl.to('#gh',{x:1400,y:1030,duration:1.0,ease:'sine.inOut'},tGlow);
tl.to('#night',{opacity:.4,duration:.8},tGlow);
GH.eyes(tGlow,'happy');GH.m(tGlow,'mBg');GH.brows(tGlow,6,-6,-4,.1);ghArms(tGlow,150,-150,.2);
sparks(tGlow+.1,1400,900,8,200);sparks(tGlow+.5,1400,900,8,260);
for(let i=0;i<12;i++) tl.fromTo('#pf'+i,{opacity:0},{opacity:.95,duration:.2},tGlow+.1+i*.06);
tl.fromTo('#beams',{opacity:0},{opacity:1,duration:.6},tGlow);
tl.fromTo('#flash',{opacity:.45},{opacity:0,duration:.35},tGlow);

/* ================= SCENE 6-8: the dance (every move is on the 120-BPM beat grid of the music) ================= */
tl.fromTo('#beams',{rotation:-14},{rotation:14,duration:1.0,yoyo:true,repeat:Math.ceil((tD1-tGlow)/1.0),ease:'sine.inOut'},tGlow+.6);
tl.to('#night',{opacity:.3,duration:.3},tD0);
// faces
eyesMode(tD0,'normal');bm(tD0,'mBig');brows(tD0,6,-6,-4,.1);FB.pm(tD0,'Gr');
tl.set('.boEye',{scaleY:1},tD0);
for(let k=0,t=tD0;t<tD1-.25;k++,t+=BEAT){
 const odd=k%2;
 // the floor chases through the colours
 for(let i=0;i<12;i++) tl.set('#pf'+i,{opacity:((i+k)%3===0)?1:.28},t);
 // Bo: hops, alternate disco-point
 hop('#boSq',t,34,.12,.2);
 tl.to('#boArmL',{rotation:odd?-20:-150,duration:.14},t);tl.to('#boArmR',{rotation:odd?150:20,duration:.14},t);
 tl.to('#boHead',{rotation:odd?5:-5,duration:.2},t);
 // Mochi: a lazy sway
 tl.to('#mcLean',{rotation:odd?4:-4,duration:.4,ease:'sine.inOut'},t);
 tl.to('#mcArmR',{rotation:odd?-40:10,duration:.25},t);
 // Nibbles: tiny fast hops (twice per beat)
 hop('#nmSq',t,22,.1,.12);hop('#nmSq',t+BEAT/2,22,.1,.12);
 tl.to('#nmArmL',{rotation:odd?140:20,duration:.12},t);tl.to('#nmArmR',{rotation:odd?-20:-140,duration:.12},t);
 // Truffle: shimmy + belly pulse
 tl.to('#tfLean',{rotation:odd?6:-6,duration:.2},t);
 tl.fromTo('#tfBelly',{scale:1},{scale:1.14,duration:.12,yoyo:true,repeat:1},t);
 tl.to('#tfArmL',{rotation:odd?20:150,duration:.14},t);tl.to('#tfArmR',{rotation:odd?-150:-20,duration:.14},t);
 tl.to('#tfHat',{rotation:odd?8:-8,duration:.2},t);
 // Coco: bounces, a backflip every 4 beats
 if(k%4===3){tl.fromTo('#cmFlip',{rotation:0},{rotation:360,duration:.42,ease:'power1.inOut'},t);hop('#cmSq',t,90,.2,.22);}
 else hop('#cmSq',t,30,.12,.2);
 tl.to('#cmArmL',{rotation:odd?150:20,duration:.14},t);tl.to('#cmArmR',{rotation:odd?-20:-150,duration:.14},t);
 // Gumdrop: a big stomping step
 tl.to('#gmLegL',{rotation:odd?0:-14,duration:.15},t);tl.to('#gmLegR',{rotation:odd?14:0,duration:.15},t);
 tl.fromTo('#gmSq',{scaleY:1},{scaleY:.95,duration:.12,yoyo:true,repeat:1},t);
 tl.to('#gmArmL',{rotation:odd?40:110,duration:.2},t);tl.to('#gmArmR',{rotation:odd?-110:-40,duration:.2},t);
 tl.fromTo('#gmBelly',{scale:1},{scale:1.08,duration:.12,yoyo:true,repeat:1},t);
 if(k%2===0)shake(t,3,2);
 // Boo floats a figure-eight and glows on the beat
 tl.to('#gh',{x:1400+(odd?80:-80),y:1030+(odd?-30:20),duration:.5,ease:'sine.inOut'},t);
 tl.fromTo('#ghGlow',{scale:2.4},{scale:2.7,duration:.15,yoyo:true,repeat:1},t);
 if(k%4===0)tl.fromTo('#ghFlip',{rotation:0},{rotation:360,duration:.6,ease:'power1.inOut'},t);
 // Flapjack grooves
 FB.pm(t,odd?'Gr':'Sm');
 if(k%4===0)sparks(t,1400+(odd?80:-80),900,4,160);
}
// "Everybody danced!" — a burst of hearts and sparks
hearts(W(6,1),1400,1000,6,130,260);
// Truffle: "Needs a pinch more disco!" — a spin
TF.m(L[7]-.05,'mBg');TF.talk(L[7]+.02,L[7]+DU[7]-.08,'mBg','mSm',.13);
tl.fromTo('#tfFlip',{rotation:0},{rotation:360,duration:.7,ease:'power2.inOut'},W(7,3)-.15);
sparks(W(7,4),DX.tf,1150,8,140);hearts(W(7,4),DX.tf,1100,3,80,200);
// Mochi: "Hmph. Not bad. Obviously."
mcEyes(L[8]-.05,'happy');MC.talk(L[8],L[8]+DU[8]-.05,'mOp','mSm',.15);
tl.fromTo('#mcHead',{rotation:-5},{rotation:5,duration:.25,yoyo:true,repeat:7,ease:'sine.inOut'},L[8]);

/* ================= SCENE 9: the music scratches to a stop — a strange light outside ================= */
// freeze
for(let i=0;i<12;i++) tl.set('#pf'+i,{opacity:.12},tFreeze);
tl.to('#beams',{opacity:0,duration:.3},tFreeze);
tl.to('#night',{opacity:.62,duration:.3},tFreeze);
tl.to('#night',{opacity:.32,duration:.5},tSwish);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#gmSq'].forEach(s=>tl.set(s,{y:0},tFreeze+.01));
tl.set('#mcLean,#tfLean',{rotation:0},tFreeze);tl.set('#boHead,#tfHat,#mcHead',{rotation:0},tFreeze);
armsDown(tFreeze,.12);gmArms(tFreeze,0,0,.12);
tl.to('#gh',{x:1400,y:1050,duration:.3},tFreeze);tl.set('#ghFlip',{rotation:0},tFreeze+.3);
eyesMode(tFreeze,'wide');bm(tFreeze,'mO');brows(tFreeze,-14,14,-10,.1);FB.pm(tFreeze,'Oh');
TF.eyes(tFreeze,'wide');TF.m(tFreeze,'mO');NN.eyes(tFreeze,'wide');NN.m(tFreeze,'mO');cmEyes(tFreeze,'wide');CM.m(tFreeze,'mO');mcEyes(tFreeze,'wide');MC.m(tFreeze,'mO');
GM.eyes(tFreeze,'wide');GM.m(tFreeze,'mO');GH.eyes(tFreeze,'wide');GH.m(tFreeze,'mO');
lookAll(tFreeze+.1,-34,-8);GH.look(tFreeze+.1,-26,-4,.1);
// the flying saucer appears in the window
tl.set('#ufo',{opacity:1},tUfo);
tl.fromTo('#ufoIn',{y:-330},{y:0,duration:1.1,ease:'power2.out'},tUfo);
tl.fromTo('#ufoBeam',{opacity:0},{opacity:.55,duration:.3},tUfo+.9);
tl.fromTo('#ufoBeam',{opacity:.55},{opacity:.3,duration:.12,yoyo:true,repeat:7},tUfo+1.3);
tl.set('#ufoBlip',{opacity:0},0);
// swish over to the window
camTo(tSwish,.7,...CAM.win,'power3.inOut');
tl.to('#gh',{x:800,y:1090,duration:.9,ease:'power2.inOut'},tSwish);
tl.fromTo('#ghGlow',{scale:2.4},{scale:1.6,duration:.6},tSwish);

/* ================= SCENE 10: Boo: "B-boo? What's that?" ================= */
GH.m(L[10]-.05,'mOp');GH.talk(L[10]+.02,L[10]+DU[10]-.08,'mOp','mFr',.18);GH.brows(L[10],-14,14,-6,.1);GH.eyes(L[10],'wide');
tl.fromTo('#ghBody',{rotation:-2},{rotation:2,duration:.08,yoyo:true,repeat:11},L[10]);tl.set('#ghBody',{rotation:0},L[10]+1.0);
ghArms(L[10],-35,35,.2);

/* ================= SCENE 11: a little alien in the beam: "Is this... a sandwich?" ================= */
tl.set('#ufoBlip',{opacity:1},tBlip);
tl.fromTo('#ufoBlip',{scale:.2,y:20},{scale:1.35,y:0,duration:.4,ease:'back.out(2.2)'},tBlip);
tl.fromTo('#ufoBlip',{rotation:-8},{rotation:8,duration:.25,yoyo:true,repeat:9,ease:'sine.inOut'},tBlip+.4);
tl.fromTo('#ufoIn',{y:0},{y:-8,duration:.4,yoyo:true,repeat:7,ease:'sine.inOut'},tBlip);
sparks(tBlip+.2,UFX,640,6,90);
GH.m(L[11],'mFr');GH.eyes(L[11],'wide');
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

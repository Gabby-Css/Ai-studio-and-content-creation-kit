/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={fin:[220,-470,.58], wide:[480,-260,.66], cock:[640,0,.74], mochi:[600,300,1.1], port:[760,120,.95]};
const LX=880, RAMP_B=1070, DOOR=945;                       // the little saucer: ramp bottom / the doorway
const CAST={cm:{x0:560,s0:.76,cx:880,cs:.76}, nm:{x0:690,s0:.5,cx:1000,cs:.5}, mc:{x0:820,s0:.68,cx:720,cs:.68}, tf:{x0:1510,s0:.74,cx:1120,cs:.74},
 zp:{x0:1620,s0:.6,cx:1230,cs:.6}, bp:{x0:1100,s0:.62,cx:1340,cs:.62}, bo:{x0:1360,s0:.88,cx:1470,cs:.88}, pt:{x0:1290,s0:.7,cx:1620,cs:.7}, gm:{x0:1960,s0:1.5,cx:1860,cs:1.25}};
const tEnter={cm:3.6,nm:3.85,mc:4.1,tf:4.35,pt:4.6,gm:3.9,zp:4.8,bo:5.0,bp:5.3};   // when each one starts walking to the saucer
const tCut=L[3]-.1;                                        // the cut to the inside
const tCd=[W(5,0),W(5,1),W(5,2)], tLaunch=W(5,3);          // 3 .. 2 .. 1 .. BLAST OFF
const tMoon=L[7]+.2;
const tComet=L[9]-.25;
const tPlanet=L[10]+.1;
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
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);BP.look(t,dx,dy,.12);ZP.look(t,dx,dy,.12);PT.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const ghArms=(t,l,r,d=.2)=>{tl.to('#ghArmL',{rotation:l,duration:d},t);tl.to('#ghArmR',{rotation:r,duration:d},t);};
const gmArms=(t,l,r,d=.2)=>{tl.to('#gmArmL',{rotation:l,duration:d},t);tl.to('#gmArmR',{rotation:r,duration:d},t);};
const ALL=['tf','nm','mc','cm','gm','bp','zp','pt'];
const SQ=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
const armsUp=(t,d=.15)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
const faces=(t,eyes,mouth)=>{                              // eyes: wide|normal|happy   mouth: O|Big|Sm|Fr
 const m={O:['mO','mO'],Big:['mBg','mBig'],Sm:['mSm','mSmile'],Fr:['mFr','mFrown']}[mouth];
 eyesMode(t,eyes==='happy'?'hearts':eyes);bm(t,m[1]);FB.pm(t,{O:'Oh',Big:'Gr',Sm:'Sm',Fr:'Wo'}[mouth]);
 TF.eyes(t,eyes);TF.m(t,m[0]);NN.eyes(t,eyes);NN.m(t,m[0]);cmEyes(t,eyes);CM.m(t,m[0]);mcEyes(t,eyes);MC.m(t,m[0]);
 GM.eyes(t,eyes);GM.m(t,m[0]);BP.eyes(t,eyes);BP.m(t,m[0]);ZP.eyes(t,eyes);ZP.m(t,m[0]);PT.eyes(t,eyes);PT.m(t,m[0]);GH.eyes(t,eyes);GH.m(t,m[0]);};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
// a character walks to the ramp, shrinks and disappears into the doorway
function enter(p,t0,spd=600){const c=CAST[p],id='#'+p,d1=Math.max(.05,Math.abs(c.x0-RAMP_B)/spd);
 tl.fromTo(id,{x:c.x0},{x:RAMP_B,duration:d1,ease:'none'},t0);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0,t0+d1,.26,24,12,`#${p}Sq`,9);
 const t1=t0+d1;
 tl.fromTo(id,{x:RAMP_B},{x:DOOR,duration:.55,ease:'power1.in'},t1);
 tl.fromTo(id,{y:FLOOR},{y:FLOOR-110,duration:.55,ease:'none'},t1);
 tl.fromTo(id,{scale:c.s0},{scale:c.s0*.07,duration:.55,ease:'power2.in'},t1);
 tl.set(id,{opacity:0},t1+.55);sparks(t1+.5,DOOR,FLOOR-130,3,40);
 return t1+.55;}

/* ================= SCENE 0: the last frame of video #10 — the party is over, everybody cheers ================= */
camSet(0,...CAM.fin);
tl.set('#cd0,#cd1,#cd2,#cd3',{svgOrigin:'1400 130',opacity:0},0);
camTo(.3,1.4,...CAM.wide,'power2.inOut');
armsDown(.45,.3);faces(.5,'normal','Sm');
tl.to('#gh',{x:980,y:FLOOR-740,duration:1.6,ease:'sine.inOut'},.5);tl.to('#ghGlow',{opacity:.3,scale:1,duration:.6},.5);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.7,yoyo:true,repeat:11,ease:'sine.inOut'},.5);
// "After the party, Blip had a surprise!"
tl.fromTo('#bp',{x:1710},{x:CAST.bp.x0,duration:2.1,ease:'sine.inOut'},.9);
cycle(['#bpLegL','#bpLegR'],['#bpArmL','#bpArmR'],.9,3.0,.3,22,10,'#bpSq',8);
BP.eyes(.9,'happy');BP.m(.9,'mBg');BP.brows(.9,6,-6,-4,.1);
tl.fromTo('#bpAntL',{rotation:-14},{rotation:14,duration:.2,yoyo:true,repeat:17},.9);tl.fromTo('#bpAntR',{rotation:14},{rotation:-14,duration:.2,yoyo:true,repeat:17},.9);tl.set('#bpAntL,#bpAntR',{rotation:0},4.6);
lookAll(1.0,28,-8);

/* ================= SCENE 2: Blip: "Come inside my spaceship!" — one by one they walk up the ramp, shrinking ================= */
BP.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.13);BP.eyes(L[2],'happy');
tl.to('#bpArmR',{rotation:-130,duration:.2,ease:'back.out(2)'},L[2]);tl.fromTo('#bpArmR',{rotation:-130},{rotation:-100,duration:.16,yoyo:true,repeat:9},L[2]+.2);tl.to('#bpArmR',{rotation:0,duration:.2},L[2]+DU[2]+.1);
faces(L[2]+.3,'normal','Big');BP.m(L[2]+DU[2],'mSm');
let tEnd=0;
['cm','nm','mc','tf','pt','gm','zp','bo'].forEach(p=>{tEnd=Math.max(tEnd,enter(p,tEnter[p],p==='gm'?900:600));});
tl.fromTo('#gmSq',{scaleX:1,scaleY:1},{scaleX:1.4,scaleY:.8,duration:.15,yoyo:true,repeat:3},tEnter.gm+1.0);   // Gumdrop squeezes through the door
shake(tEnter.gm+1.4,8,4);dust(tEnter.gm+1.4,RAMP_B,FLOOR+6,1.2);
tl.fromTo('.cmEye',{scaleY:1},{scaleY:1,duration:.1},0);
// Blip goes in last and Boo floats after him
const tB=enter('bp',tEnter.bp);
tl.to('#gh',{x:DOOR,y:FLOOR-150,scale:.05,duration:.6,ease:'power2.in'},tEnter.bp+.2);tl.set('#gh',{opacity:0},tEnter.bp+.85);
sparks(tEnter.bp+.8,DOOR,FLOOR-140,4,40);

/* ================= SCENE 3: the cut to the inside: "Whoa! It's bigger on the inside!" ================= */
tl.fromTo('#flash',{opacity:.9},{opacity:0,duration:.45},tCut);
tl.set('#cockpit',{opacity:1},tCut);
tl.set('#table,#plate,#oven,#ck,#ufoL',{opacity:0},tCut);
camSet(tCut,...CAM.cock);
Object.entries(CAST).forEach(([p,c],i)=>{const id='#'+p;
 tl.set(id,{opacity:1,x:c.cx,y:FLOOR,scale:c.cs*.02},tCut);
 tl.fromTo(id,{scale:c.cs*.02},{scale:c.cs,duration:.55,ease:'back.out(1.7)'},tCut+.02+i*.03);
 tl.set(`#${p}ArmL`,{rotation:0},tCut);tl.set(`#${p}ArmR`,{rotation:0},tCut);});
tl.set('#boArmL',{rotation:0},tCut);tl.set('#boArmR',{rotation:0},tCut);
tl.set('#gh',{opacity:1,x:880,y:600,scale:.9},tCut);tl.set('#ghGlow',{opacity:.4,scale:1},tCut);
tl.fromTo('#ghSq',{y:0},{y:-14,duration:.7,yoyo:true,repeat:30,ease:'sine.inOut'},tCut+.3);
faces(tCut+.1,'wide','O');lookAll(tCut+.2,8,-32);
tl.fromTo('.blk',{opacity:.25},{opacity:1,duration:.18,yoyo:true,repeat:90,stagger:.05},tCut);
sparks(tCut+.2,1400,700,10,300);
// Bo says it out loud
tl.to('#boArmL',{rotation:-160,duration:.15},L[3]);tl.to('#boArmR',{rotation:160,duration:.15},L[3]);
bm(L[3]-.05,'mBig');tl.fromTo('#boSq',{y:0},{y:-40,duration:.14,yoyo:true,repeat:5,ease:'power1.out'},L[3]);
tl.to('#boArmL',{rotation:0,duration:.25},L[3]+DU[3]);tl.to('#boArmR',{rotation:0,duration:.25},L[3]+DU[3]);
['#nmSq','#cmSq','#mcSq','#tfSq','#bpSq','#zpSq','#ptSq'].forEach((s,i)=>hop(s,L[3]+.2+i*.05,44,.12,.18));
tl.fromTo('#stars1',{x:0},{x:-260,duration:6,ease:'none'},tCut);

/* ================= SCENE 4: Zap: "Beep boop! Fasten your seatbelts!" ================= */
camTo(L[4]-.3,2.0,700,60,.84);
ZP.m(L[4]-.05,'mBg');ZP.talk(L[4]+.02,L[4]+DU[4]-.08,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.to('#zpArmL',{rotation:150,duration:.15},L[4]);tl.fromTo('#zpArmL',{rotation:150},{rotation:60,duration:.18,yoyo:true,repeat:7},L[4]+.15);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:13},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
tl.to('#bpArmL',{rotation:150,duration:.15},W(4,2));tl.fromTo('#bpArmL',{rotation:150},{rotation:100,duration:.14,yoyo:true,repeat:5},W(4,2)+.15);
// everybody grabs a handle: click!
faces(W(4,2),'normal','Fr');
armsUp(W(4,4),.15);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq'].forEach((s,i)=>tl.fromTo(s,{scaleY:1},{scaleY:.93,duration:.1,yoyo:true,repeat:1},W(4,4)+i*.03));
sparks(W(4,4)+.1,1400,1200,8,350);

/* ================= SCENE 5: "Three... two... one... blast off!" ================= */
camTo(L[5]-.3,.8,...CAM.cock,'power2.inOut');
tCd.forEach((t,i)=>{tl.fromTo('#cd'+i,{opacity:1,scale:.3},{scale:1,duration:.2,ease:'back.out(2.5)'},t);tl.to('#cd'+i,{opacity:0,duration:.12},t+.5);});
tl.fromTo('#cd3',{opacity:1,scale:.3},{scale:1.1,duration:.25,ease:'back.out(2.5)'},tLaunch);tl.to('#cd3',{opacity:0,duration:.25},tLaunch+1.0);
tCd.forEach((t,i)=>{FB.pm(t,'Wo');hop('#boSq',t,16,.08,.1);});
// LIFT-OFF
shake(tLaunch,18,12);for(let k=0;k<7;k++) shake(tLaunch+.6+k*.5,7,6);
tl.fromTo('#portFlash',{opacity:.9},{opacity:0,duration:.6},tLaunch);
SQ.forEach((s,i)=>tl.fromTo(s,{scaleY:1},{scaleY:.86,duration:.25,ease:'power2.out'},tLaunch+i*.01));SQ.forEach(s=>tl.to(s,{scaleY:1,duration:.5,ease:'elastic.out(1,.5)'},tLaunch+1.8));
faces(tLaunch,'wide','O');
tl.to('#boLean',{rotation:-8,duration:.3},tLaunch);tl.to('#boLean',{rotation:0,duration:.5},tLaunch+1.8);
tl.fromTo('#stars1',{x:-260},{x:-1900,duration:14,ease:'none'},tLaunch);
tl.fromTo('#stars2',{x:0},{x:-2800,duration:14,ease:'none'},tLaunch-.1);
tl.fromTo('#earthW',{scale:1.1,y:0,x:0},{scale:.04,y:-150,x:-130,duration:3.4,ease:'power2.out'},tLaunch);
dust(tLaunch,1100,FLOOR+6,1.6);dust(tLaunch+.05,1700,FLOOR+6,1.6);

/* ================= SCENE 6: Mochi: "Hmph. I'm not scared. Obviously." ================= */
camTo(L[6]-.5,.9,...CAM.mochi,'power2.inOut');
faces(L[6]-.1,'wide','O');
MC.m(L[6]-.05,'mFr');MC.talk(L[6]+.02,L[6]+DU[6]-.08,'mOp','mFr',.16);mcEyes(L[6],'lids');MC.brows(L[6],8,-8,2,.2);
tl.fromTo('#mcLean',{rotation:-1.5},{rotation:1.5,duration:.05,yoyo:true,repeat:49},L[6]);tl.set('#mcLean',{rotation:0},L[6]+DU[6]);
tl.to('#mcSweat',{opacity:1,duration:.1},L[6]+.5);tl.to('#mcSweat',{opacity:0,duration:.2},L[6]+DU[6]);
['#nmSq','#cmSq'].forEach((s,i)=>tl.fromTo(s,{x:-2},{x:2,duration:.05,yoyo:true,repeat:39},L[6]+i*.02));tl.set('#nmSq,#cmSq',{x:0},L[6]+DU[6]);
tl.to('#mcArmR',{rotation:-60,duration:.2},WE(6,3));          // she brushes off the idea of being scared...
tl.to('#mcArmR',{rotation:-150,duration:.2},WE(6,4)+.1);      // ...and grabs the handle again

/* ================= SCENE 7/8: Gumdrop: "Roar! ...Are we there yet?" — and the moon floats by ================= */
camTo(L[7]-.3,.9,...CAM.cock,'power2.inOut');
GM.m(L[7]-.05,'mBg');GM.eyes(L[7],'wide');tl.fromTo('#gm',{scale:CAST.gm.cs},{scale:CAST.gm.cs*1.06,duration:.15,yoyo:true,repeat:1},L[7]);shake(L[7],8,5);
GM.m(W(7,1),'mOp');GM.talk(W(7,1),L[7]+DU[7]-.05,'mOp','mFr',.15);GM.eyes(W(7,1),'normal');GM.brows(W(7,1),-14,14,-6,.1);
tl.fromTo('#gmHead',{rotation:-4},{rotation:4,duration:.2,yoyo:true,repeat:9,ease:'sine.inOut'},W(7,1));tl.to('#gmHead',{rotation:0,duration:.1},L[7]+DU[7]+.1);
faces(W(7,1),'normal','Sm');GM.eyes(W(7,1),'normal');
tl.fromTo('#moonW',{x:0,y:0,scale:1},{x:-1700,y:-60,scale:1.35,duration:5,ease:'none'},tMoon);
lookAll(tMoon,-18,-30);
// "They zoomed past the moon and the stars!"
camTo(L[8]-.2,1.2,...CAM.port,'power2.inOut');
faces(L[8],'happy','Big');
tl.fromTo('#stars2',{opacity:1},{opacity:.55,duration:.3,yoyo:true,repeat:9},L[8]);
sparks(W(8,4),1400,700,8,330);sparks(W(8,7),1500,600,8,330);

/* ================= SCENE 9: Coco: "Ooh-ooh, bananas!" — a banana comet ================= */
tl.fromTo('#cometW',{x:0,y:0},{x:-2250,y:-460,duration:2.6,ease:'power1.inOut'},tComet);
CM.m(L[9]-.05,'mO');cmEyes(L[9]-.05,'wide');CM.talk(L[9]+.02,L[9]+DU[9]-.08,'mBg','mSm',.12);
tl.to('#cmArmL',{rotation:150,duration:.12},L[9]-.05);tl.to('#cmArmR',{rotation:-150,duration:.12},L[9]-.05);
hop('#cmSq',L[9],230,.28,.3);hop('#cmSq',L[9]+.7,230,.28,.3);
hearts(W(9,1),720,1100,3,70,200);cmEyes(W(9,1),'happy');
// Truffle and Bo hold his tail
tl.to('#tfArmL',{rotation:90,duration:.2},L[9]+.2);tl.to('#boArmL',{rotation:-100,duration:.2},L[9]+.2);
tl.to('#tfArmL',{rotation:150,duration:.3},L[9]+1.6);tl.to('#boArmL',{rotation:-160,duration:.3},L[9]+1.6);

/* ================= SCENE 10: "Then... a giant jelly planet appeared!" ================= */
camTo(L[10]-.1,2.0,820,140,.9,'power1.inOut');
faces(L[10]+.4,'wide','O');
tl.fromTo('#gloopW',{scale:.02,x:0,y:0},{scale:1.05,duration:2.5,ease:'power2.in'},tPlanet);
sparks(tPlanet+1.6,1400,640,8,260);sparks(tPlanet+2.2,1400,640,10,330);
tl.fromTo('#portFlash',{opacity:0},{opacity:.35,duration:.4},tPlanet+2.0);tl.to('#portFlash',{opacity:0,duration:.5},tPlanet+2.5);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq'].forEach((s,i)=>tl.fromTo(s,{y:0},{y:-20,duration:.12,yoyo:true,repeat:3},tPlanet+2.2+i*.03));

/* ================= SCENE 11: Blip: "Welcome to Planet Gloop!" ================= */
camTo(L[11]-.3,.9,...CAM.cock,'power2.inOut');
BP.m(L[11]-.05,'mBg');BP.talk(L[11]+.02,L[11]+DU[11]-.05,'mBg','mSm',.13);BP.eyes(L[11],'happy');
tl.to('#bpArmL',{rotation:150,duration:.15},L[11]);tl.to('#bpArmR',{rotation:-150,duration:.15},L[11]);
tl.fromTo('#bpSq',{y:0},{y:-60,duration:.16,yoyo:true,repeat:9,ease:'power1.out'},L[11]);
tl.fromTo('#bpAntL',{rotation:-18},{rotation:18,duration:.14,yoyo:true,repeat:15},L[11]);tl.fromTo('#bpAntR',{rotation:18},{rotation:-18,duration:.14,yoyo:true,repeat:15},L[11]);
faces(W(11,2),'happy','Big');BP.eyes(W(11,2),'happy');
armsUp(W(11,2),.15);
hearts(W(11,3),1400,1250,6,160,260);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

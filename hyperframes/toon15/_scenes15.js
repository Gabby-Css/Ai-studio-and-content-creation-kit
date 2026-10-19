/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

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
const GS4=[J1,J2,J3,J4];
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);BP.look(t,dx,dy,.12);ZP.look(t,dx,dy,.12);PT.look(t,dx,dy,.12);GS4.forEach(g=>g.look(t,dx,dy,.12));RK.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const ALL=['tf','nm','mc','cm','gm','bp','zp','pt'];
const GN=['j1','j2','j3','j4'];
const SQALL=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
const armsUp=(t,d=.15)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
const faces=(t,eyes,mouth)=>{                              // eyes: wide|normal|happy   mouth: O|Big|Sm|Fr
 const m={O:['mO','mO'],Big:['mBg','mBig'],Sm:['mSm','mSmile'],Fr:['mFr','mFrown']}[mouth];
 eyesMode(t,eyes==='happy'?'hearts':eyes);bm(t,m[1]);FB.pm(t,{O:'Oh',Big:'Gr',Sm:'Sm',Fr:'Wo'}[mouth]);
 TF.eyes(t,eyes);TF.m(t,m[0]);NN.eyes(t,eyes);NN.m(t,m[0]);cmEyes(t,eyes);CM.m(t,m[0]);mcEyes(t,eyes);MC.m(t,m[0]);
 GM.eyes(t,eyes);GM.m(t,m[0]);BP.eyes(t,eyes);BP.m(t,m[0]);ZP.eyes(t,eyes);ZP.m(t,m[0]);PT.eyes(t,eyes);PT.m(t,m[0]);GH.eyes(t,eyes);GH.m(t,m[0]);
 GS4.forEach(g=>{g.eyes(t,eyes);g.m(t,m[0]);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let spn=0;
function sprinkle(t,x,yt,yb,n=8){for(let k=0;k<n;k++){const i=(spn++)%18,xx=x+((k*37)%160)-80,tt=t+k*.07;
 tl.set('#spw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#spr'+i,{opacity:1,y:0,rotation:0},{y:yb-yt,rotation:360+(k%3)*90,duration:.7,ease:'power1.in'},tt);
 tl.set('#spr'+i,{opacity:0},tt+.7);}}
let ksn=0;
function kslice(t,x0,y0,x1,y1,dur=.6,sc=1){const i=(ksn++)%8;
 tl.set('#ksw'+i,{x:x0,y:y0},t);
 tl.fromTo('#ks'+i,{opacity:1,x:0,rotation:-20,scale:sc*.9},{x:x1-x0,rotation:340,duration:dur,ease:'none'},t);
 tl.fromTo('#ks'+i,{y:0},{y:-220,duration:dur*.45,ease:'power2.out'},t).to('#ks'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#ks'+i,{opacity:0},t+dur);}

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={line:[1130,480,1.1], mochi:[560,330,1.0], fr:[1480,420,.95]};
const PNX=1620;                                            // where the pancake test happens (just right of Bo)
const GJ={j1:J1,j2:J2,j3:J3,j4:J4}, TG={j1:1,j2:2,j3:3,j4:4};
const tTag=[W(2,1)-.1, W(2,1)+.25, W(2,3)-.05, W(2,4)-.15];   // name tags: j2, j1, j3, j4 (left to right)
const tScan=W(4,2)-.25, dScan=1.6;                         // "Beep boop! SCANNING all four Jiggles"
const tPct=W(5,3);                                         // "...TWENTY-FIVE percent..."
const tPancake=L[7]+1.25;                                  // Truffle poofs up a pancake
const tJump=W(9,2), tM=W(9,6)-.05;                         // "All four JUMPED ... and SQUISH!"
const tBack=L[10]-.05;
const tK1=W(11,4), tK2=W(11,5);                            // "...knock, KNOCK!"
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const landSq=(sq,t,s=.62)=>tl.fromTo(sq,{scaleY:s,scaleX:1.32},{scaleY:1,scaleX:1,duration:.42,ease:'elastic.out(1,.4)'},t);

/* ================= SCENE 1: the last frame of #14 — four Jiggles in a row ================= */
camSet(0,...CAM.line);
tl.set('#boSweat',{opacity:0},0);
tl.to('#boArmL',{rotation:0,duration:.3},.2);faces(.2,'normal','Sm');
JT.forEach(([p,x],i)=>{const J=GJ[p];
 tl.fromTo(`#${p}Sq`,{scaleY:1},{scaleY:1.04,duration:.28+i*.03,yoyo:true,repeat:110,ease:'sine.inOut'},0);
 tl.fromTo(`#${p}AntL`,{rotation:-12},{rotation:12,duration:.16+i*.01,yoyo:true,repeat:150},0);tl.fromTo(`#${p}AntR`,{rotation:12},{rotation:-12,duration:.16+i*.01,yoyo:true,repeat:150},0);
 J.eyes(0,'happy');J.m(0,'mBg');J.eyes(.5,'normal');J.m(.5,'mSm');
 J.look(.6,(i<2?30:-30),0,.2);J.look(1.6,0,-6,.2);});
look(.8,0,10,.2);brows(.9,-6,6,-4,.2);

/* ================= SCENE 2: "I'm Jiggle! No, I'm Jiggle!" — everybody claims the name ================= */
JT.forEach(([p,x],i)=>{const J=GJ[p],n=TG[p],t=tTag[i];
 J.talk(L[2]+.02+i*.08,L[2]+DU[2]-.05,'mBg','mOp',.12);J.eyes(t-.1,'wide');
 tl.set(`#jt${n}`,{x:x,y:JY-350-(i%2)*45},t);
 tl.fromTo(`#jt${n}`,{opacity:0,scale:.2,rotation:-12},{opacity:1,scale:.62,rotation:(i%2?5:-5),duration:.3,ease:'back.out(2.6)'},t);
 hop(`#${p}Flip`,t,90,.16,.2);landSq(`#${p}Sq`,t+.36,.78);
 tl.fromTo(`#${p}ArmL`,{rotation:150},{rotation:100,duration:.14,yoyo:true,repeat:5},t);tl.fromTo(`#${p}ArmR`,{rotation:-100},{rotation:-150,duration:.14,yoyo:true,repeat:5},t);
 sparks(t+.1,x,JY-330,4,70);});
tl.to('#jt1,#jt2,#jt3,#jt4',{opacity:0,scale:.3,duration:.25},L[3]+.55);
look(L[2]+.1,-30,10,.2);look(L[2]+.9,30,10,.2);

/* ================= SCENE 3: Bo: "Zap, can you help?" ================= */
bTalk(L[3]+.02,L[3]+DU[3]-.08);look(L[3]+.05,-34,6,.15);brows(L[3],-8,8,-4,.15);
ZP.eyes(L[3]+.1,'wide');
tl.to('#zp',{x:1190,y:FLOOR+90,scale:.68,duration:.8,ease:'sine.inOut'},L[3]+.35);
cycle(['#zpLegL','#zpLegR'],['#zpArmL','#zpArmR'],L[3]+.35,L[3]+1.15,.3,22,10,'#zpSq',8);

/* ================= SCENE 4: "Beep boop! Scanning all four Jiggles!" — each is 25% Jiggle ================= */
camTo(L[4]-.3,.8,...CAM.line,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.08,'mBg','mSm',.13);ZP.eyes(L[4],'normal');
tl.to('#zpArmR',{rotation:-85,duration:.2,ease:'back.out(2)'},L[4]);tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:30},L[4]);
tl.set('#scan',{x:1230,y:JY+90},tScan-.02);
tl.fromTo('#scan',{opacity:0},{opacity:1,duration:.12},tScan);
tl.fromTo('#scan',{x:1230},{x:1900,duration:dScan,ease:'none'},tScan);
tl.to('#scan',{opacity:0,duration:.15},tScan+dScan-.1);
JT.forEach(([p,x],i)=>{const J=GJ[p],ts=tScan+(x-1230)/670*dScan;
 J.eyes(ts-.05,'wide');J.m(ts-.05,'mO');hop(`#${p}Flip`,ts-.05,36,.1,.12);
 tl.fromTo(`#${p}Lean`,{scale:1},{scale:1.1,duration:.12,yoyo:true,repeat:1},ts-.05);
 J.eyes(ts+.5,'normal');J.m(ts+.5,'mSm');});
ZP.talk(L[5]+.02,L[5]+DU[5]-.08,'mBg','mSm',.13);
JT.forEach(([p,x],i)=>{const n=TG[p],t=tPct+i*.14;
 tl.set(`#pc${n}`,{x:x,y:JY-360-(i%2)*50},t);
 tl.fromTo(`#pc${n}`,{opacity:0,scale:.2,rotation:-8},{opacity:1,scale:.6,rotation:(i%2?4:-4),duration:.28,ease:'back.out(2.6)'},t);
 sparks(t+.1,x,JY-340,3,60);});
tl.to('#pc1,#pc2,#pc3,#pc4',{opacity:0,scale:.3,duration:.25},L[6]);
tl.to('#zpArmR',{rotation:0,duration:.3},L[6]);

/* ================= SCENE 5: Mochi: "Hmph. They are all Jiggle. Obviously." ================= */
camTo(L[6]-.35,.8,...CAM.mochi,'power2.inOut');
tl.to('#mc',{x:760,duration:.7,ease:'sine.inOut'},L[6]-.5);cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],L[6]-.5,L[6]+.2,.34,16,8,'#mcSq',5);
MC.m(L[6]-.05,'mFr');MC.talk(L[6]+.02,L[6]+DU[6]-.1,'mOp','mFr',.15);mcEyes(L[6],'lids');MC.brows(L[6],8,-8,2,.2);
tl.to('#mcArmL',{rotation:60,duration:.3},L[6]);tl.to('#mcArmR',{rotation:-60,duration:.3},L[6]);   // arms folded-ish
tl.fromTo('#nmSq',{y:0},{y:-20,duration:.2,yoyo:true,repeat:3},L[6]+1.0);
tl.fromTo('#cmSq',{y:0},{y:-24,duration:.2,yoyo:true,repeat:3},L[6]+1.4);
camTo(L[7]-.2,.9,...CAM.line,'power2.inOut');
tl.to('#mcArmL',{rotation:150,duration:.2},L[7]+.2);tl.to('#mcArmR',{rotation:-150,duration:.2},L[7]+.2);

/* ================= SCENE 6: "So Bo tried a sneaky pancake test!" — "Who wants a pancake?" ================= */
look(L[7]+.1,0,0,.2);brows(L[7]+.1,10,-10,-2,.2);bm(L[7]+.1,'mSmile');
tl.fromTo('#boLean',{rotation:0},{rotation:-4,duration:.3,yoyo:true,repeat:3},L[7]+.3);
tl.to('#tfArmR',{rotation:-110,duration:.2},tPancake-.2);tl.to('#tfArmR',{rotation:0,duration:.3},tPancake+.8);
tl.set('#feastPc',{opacity:1,x:PNX,y:FLOOR+170,scale:.2},tPancake);
tl.fromTo('#feastPc',{scale:.2},{scale:.8,duration:.4,ease:'back.out(2.4)'},tPancake);
sparks(tPancake+.15,PNX,FLOOR+40,7,110);
bTalk(L[8]+.02,L[8]+DU[8]-.08);look(L[8]+.05,20,24,.15);brows(L[8],0,0,0,.15);
tl.to('#boArmL',{rotation:-55,duration:.2,ease:'back.out(2)'},L[8]);tl.to('#boArmL',{rotation:0,duration:.3},L[9]+.4);
JT.forEach(([p,x],i)=>{const J=GJ[p];
 J.eyes(L[8]+.05+i*.04,'wide');J.m(L[8]+.05+i*.04,'mBg');J.look(L[8]+.05,(PNX-x)/6,10,.1);
 tl.fromTo(`#${p}Lean`,{rotation:0},{rotation:(PNX>x?7:-7),duration:.25,ease:'back.out(2)'},L[8]+.1+i*.04);
 tl.fromTo(`#${p}Flip`,{x:-3},{x:3,duration:.05,yoyo:true,repeat:11},L[8]+.5+i*.03);});

/* ================= SCENE 7: "All four jumped at once... and SQUISH!" ================= */
JT.forEach(([p,x],i)=>{const id='#'+p,dx=PNX+(i-1.5)*34;
 tl.fromTo(id,{x:x},{x:dx,duration:tM-tJump,ease:'none'},tJump);
 tl.fromTo(id,{y:JY},{y:FLOOR-330,duration:tM-tJump,ease:'power2.out'},tJump);
 tl.fromTo(id,{scale:JS},{scale:.62,duration:tM-tJump,ease:'none'},tJump);
 tl.fromTo(`#${p}Lean`,{rotation:(PNX>x?7:-7)},{rotation:(i%2?35:-35),duration:tM-tJump,ease:'none'},tJump);
 tl.set(`#${p}Lean`,{rotation:0},tM);
 GJ[p].eyes(tJump,'wide');GJ[p].m(tJump,'mBg');
 tl.fromTo(`#${p}ArmL`,{rotation:150},{rotation:60,duration:.2},tJump);tl.fromTo(`#${p}ArmR`,{rotation:-150},{rotation:-60,duration:.2},tJump);});
tl.set('#j2,#j3,#j4',{opacity:0},tM);
tl.fromTo('#j1',{scale:.62},{scale:1.0,duration:.2,ease:'back.out(3)'},tM);
tl.fromTo('#flash',{opacity:.7},{opacity:0,duration:.3},tM);
sparks(tM,PNX,FLOOR-330,10,170);sparks(tM+.1,PNX,FLOOR-330,10,260);bits(tM,PNX,FLOOR-330,8);
tl.set('#squish',{x:PNX,y:FLOOR-620},tM);
tl.fromTo('#squish',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:4,duration:.3,ease:'back.out(2.6)'},tM);tl.to('#squish',{opacity:0,y:FLOOR-690,duration:.4},tM+.9);
J1.eyes(tM,'wide');J1.m(tM,'mBg');
// the big merged Jiggle lands on the pancake and gobbles it
tl.fromTo('#j1',{y:FLOOR-330},{y:FLOOR+120,duration:.4,ease:'power2.in'},tM+.15);
landSq('#j1Sq',tM+.55,.55);dust(tM+.58,PNX,FLOOR+126,1.2);shake(tM+.55,8,5);
J1.talk(tM+.7,tM+1.5,'mBg','mSm',.12);J1.eyes(tM+.7,'happy');
tl.to('#feastPc',{scale:.02,y:FLOOR+120,duration:.6,ease:'power1.in'},tM+.75);tl.set('#feastPc',{opacity:0},tM+1.4);
tl.fromTo('#j1Lean',{scale:1},{scale:1.08,duration:.12,yoyo:true,repeat:5},tM+.8);
faces(tM+.25,'wide','O');

/* ================= SCENE 8: "Hee hee! I'm back together!" ================= */
tl.to('#j1',{scale:.62,x:1700,duration:.5,ease:'elastic.out(1,.5)'},tBack);
tl.fromTo('#j1Sq',{scaleY:.8,scaleX:1.2},{scaleY:1,scaleX:1,duration:.4,ease:'elastic.out(1,.4)'},tBack);
J1.eyes(tBack,'happy');J1.talk(L[10]+.02,L[10]+DU[10]-.05,'mBg','mOp',.13);
hop('#j1Flip',W(10,2),70,.16,.2);hop('#j1Flip',W(10,4),80,.16,.2);
tl.fromTo('#j1ArmL',{rotation:150},{rotation:100,duration:.16,yoyo:true,repeat:9},L[10]);tl.fromTo('#j1ArmR',{rotation:-100},{rotation:-150,duration:.16,yoyo:true,repeat:9},L[10]);
hearts(W(10,1),1700,FLOOR-330,6,80,260);sparks(tBack+.2,1700,FLOOR-250,8,120);
faces(L[10]+.1,'happy','Big');armsUp(L[10]+.2,.15);
hop('#boSq',L[10]+.3,60,.14,.18);

/* ================= SCENE 9: "Then the fridge went... knock, knock!" ================= */
camTo(L[11]-.5,1.1,...CAM.fr,'power2.inOut');
armsDown(L[11]-.3,.25);tl.to('#j1ArmL',{rotation:0,duration:.2},L[11]-.3);tl.to('#j1ArmR',{rotation:0,duration:.2},L[11]-.3);
lookAll(L[11]-.2,40,-4);J1.look(L[11]-.2,40,-4,.2);
faces(L[11]+.3,'wide','O');
// knock #1 — the fridge thumps, Gumdrop squeals and scoots away
tl.fromTo('#fridgeBack,#fridgeInner,#fridgeDoor',{x:0},{x:7,duration:.04,yoyo:true,repeat:7},tK1);
shake(tK1,7,5);
GM.m(tK1,'mO');GM.eyes(tK1,'wide');
tl.to('#gm',{x:2650,duration:.5,ease:'power2.in'},tK1+.12);hop('#gmSq',tK1+.12,50,.2,.25);
tl.to('#pt',{x:1820,duration:.45,ease:'power2.inOut'},tK1+.15);
// knock #2 — two glowing eyes appear in the dark fridge
tl.fromTo('#fridgeBack,#fridgeInner,#fridgeDoor',{x:0},{x:9,duration:.04,yoyo:true,repeat:9},tK2);
shake(tK2,9,6);
tl.set('#kdPeek',{opacity:1},tK2+.08);
tl.fromTo('#kdEyes',{opacity:0},{opacity:1,duration:.35},tK2+.08);
tl.fromTo('#kdPup',{x:-14},{x:14,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},tK2+.3);
tl.fromTo('#kdFace',{opacity:0},{opacity:1,duration:.5},tK2+.7);
sparks(tK2+.9,2170,980,6,90);
J1.eyes(tK2,'wide');J1.m(tK2,'mO');
tl.fromTo('#boSq',{scaleY:1},{scaleY:.96,duration:.1,yoyo:true,repeat:5},tK2);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

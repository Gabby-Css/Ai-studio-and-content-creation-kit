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
const CAM={fin:[880,50,.86], up:[800,-330,.8], near:[1200,320,.95], line:[1180,300,.95]};
const JX=KITX.bo+185, CEX=1620, CEY=-244;                  // Jiggle's start spot / where he sticks to the ceiling
const RKY=FLOOR+70, RKS=.62;                               // Rocky tiptoes in front of the crowd
const HEADY=RKY-380, STK=HEADY-50;                         // top of Rocky's cap / top of the pancake stack on it
const tA=L[4]+.1, tB=L[4]+.75, tC=L[4]+1.3;                // table, oven, ceiling
const tRk0=L[5]+1.1;                                       // Rocky starts tiptoeing in from the left
const tFreeze=L[5]+3.2, tGo=L[6]+.1;                       // Bo glances down: Rocky freezes, then carries on
const tPick=L[7]-.25;                                      // Rocky grabs the stack and balances it on his head
const tPeel=L[8]+.1, tLand=W(8,5)+.05, tDrop=tLand-.4;    // "...very, very STICKY!"
const tHic=[W(9,0),W(9,1),W(9,2)];
const tPop=W(10,2);
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const landSq=(sq,t,s=.62)=>tl.fromTo(sq,{scaleY:s,scaleX:1.32},{scaleY:1,scaleX:1,duration:.42,ease:'elastic.out(1,.4)'},t);
const stretchOut=(t)=>{tl.fromTo('#rkSq',{scaleY:.8},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},t);};

/* ================= SCENE 0/1: the last frame of #13 — Bo's new friend needs a name ================= */
camSet(0,...CAM.fin);
armsDown(.45,.3);faces(.45,'normal','Sm');
tl.set('#boSweat',{opacity:0},0);
tl.fromTo('#j1Sq',{scaleY:1},{scaleY:1.04,duration:.3,yoyo:true,repeat:90,ease:'sine.inOut'},0);
J1.eyes(0,'happy');J1.m(0,'mBg');J1.m(.6,'mSm');J1.eyes(.7,'normal');
tl.fromTo('#j1ArmL',{rotation:150},{rotation:100,duration:.2,yoyo:true,repeat:5},.6);
tl.fromTo('#j1AntL',{rotation:-12},{rotation:12,duration:.16,yoyo:true,repeat:120},0);tl.fromTo('#j1AntR',{rotation:12},{rotation:-12,duration:.16,yoyo:true,repeat:120},0);
look(.8,30,10,.2);brows(.9,-6,6,-4,.2);                      // Bo studies his new friend
look(2.0,0,-26,.2);                                          // ...thinking
/* L2: "How about... Jiggle?" */
bTalk(L[2]+.02,L[2]+DU[2]-.1);look(L[2]+.05,30,6,.15);
tl.to('#boArmR',{rotation:100,duration:.2,ease:'back.out(2)'},W(2,2)-.1);tl.to('#boArmR',{rotation:0,duration:.3},L[3]+.2);
tl.set('#jgTag',{x:JX,y:FLOOR-370},W(2,2));
tl.fromTo('#jgTag',{opacity:0,scale:.2,rotation:-14},{opacity:1,scale:.8,rotation:-4,duration:.35,ease:'back.out(2.4)'},W(2,2));
tl.fromTo('#jgTagIn',{y:0},{y:-10,duration:.5,yoyo:true,repeat:7,ease:'sine.inOut'},W(2,2)+.35);
sparks(W(2,2)+.1,JX,FLOOR-330,8,150);
/* L3: Jiggle: "Jiggle! I love it!" */
J1.eyes(L[3]-.05,'happy');J1.m(L[3]-.05,'mBg');J1.talk(L[3]+.02,L[3]+DU[3]-.08,'mBg','mOp',.13);
hop('#j1Flip',W(3,0),70,.16,.2);hop('#j1Flip',W(3,2),90,.18,.22);landSq('#j1Sq',W(3,0)+.34,.8);landSq('#j1Sq',W(3,2)+.4,.75);
tl.fromTo('#j1ArmL',{rotation:150},{rotation:100,duration:.16,yoyo:true,repeat:7},L[3]);tl.fromTo('#j1ArmR',{rotation:-100},{rotation:-150,duration:.16,yoyo:true,repeat:7},L[3]);
hearts(W(3,3),JX,FLOOR-330,5,70,240);
faces(L[3]+.1,'happy','Big');
tl.to('#jgTag',{opacity:0,scale:.3,duration:.25},L[3]+DU[3]);
look(L[3]+.1,26,-6,.15);brows(L[3]+.1,0,0,0,.15);

/* ================= SCENE 2: "He bounced on the table, and up to the ceiling!" ================= */
camTo(L[4]-.35,1.0,...CAM.up,'power2.inOut');
faces(L[4]-.1,'wide','O');lookAll(L[4]-.1,-20,-6);
tl.to('#j1',{scale:.62,duration:.4},L[4]-.1);
// hop 1: onto the table
J1.eyes(tA,'happy');J1.m(tA,'mBg');
tl.fromTo('#j1',{x:JX},{x:1000,duration:.55,ease:'none'},tA);arc('#j1',tA,.55,FLOOR,380,TT);
landSq('#j1Sq',tA+.55,.6);dust(tA+.55,1000,TT+4,.9);
tl.fromTo('#table',{y:0},{y:10,duration:.1,yoyo:true,repeat:1},tA+.55);
lookAll(tA+.5,-10,-14);
// hop 2: onto the oven
tl.fromTo('#j1',{x:1000},{x:OVX,duration:.5,ease:'none'},tB);arc('#j1',tB,.5,TT,300,TT-212);
landSq('#j1Sq',tB+.5,.62);sparks(tB+.55,OVX,TT-212,6,90);
tl.fromTo('#ovenIn',{scaleY:1},{scaleY:.93,duration:.1,yoyo:true,repeat:1},tB+.5);
// hop 3: up, up, up — and he sticks to the ceiling
tl.fromTo('#j1',{x:OVX},{x:CEX,duration:.62,ease:'none'},tC);
tl.fromTo('#j1',{y:TT-212},{y:CEY,duration:.62,ease:'power2.out'},tC);
tl.fromTo('#j1',{rotation:0},{rotation:180,duration:.55,ease:'power1.inOut'},tC+.02);
tl.fromTo('#j1Sq',{scaleY:1},{scaleY:1.3,scaleX:.82,duration:.3,ease:'power1.out'},tC);
landSq('#j1Sq',tC+.62,.55);
sparks(tC+.65,CEX,CEY+90,8,110);
tl.fromTo('#lamp',{rotation:-9},{rotation:9,duration:.45,yoyo:true,repeat:9,ease:'sine.inOut'},tC+.62);tl.to('#lamp',{rotation:0,duration:.5},tC+5.2);
faces(tC+.7,'wide','O');lookAll(tC+.3,24,-40);

/* ================= SCENE 3: Mochi: "Hmph. Stuck on the ceiling. Obviously." ================= */
lookAll(L[5]-.2,24,-40);
MC.m(L[5]-.05,'mFr');MC.talk(L[5]+.02,L[5]+DU[5]-.1,'mOp','mFr',.15);mcEyes(L[5],'lids');MC.brows(L[5],8,-8,2,.2);
J1.eyes(L[5]-.3,'happy');J1.m(L[5]-.3,'mBg');
tl.fromTo('#j1ArmL',{rotation:150},{rotation:90,duration:.2,yoyo:true,repeat:15},L[5]-.2);tl.fromTo('#j1ArmR',{rotation:-90},{rotation:-150,duration:.2,yoyo:true,repeat:15},L[5]-.2);
tl.fromTo('#j1Lean',{rotation:-5},{rotation:5,duration:.45,yoyo:true,repeat:24,ease:'sine.inOut'},L[5]-.2);
tl.fromTo('#j1Sq',{scaleY:1},{scaleY:1.1,duration:.6,yoyo:true,repeat:14,ease:'sine.inOut'},tC+1.2);
tl.fromTo('#ptTrunk',{rotation:0},{rotation:-55,duration:.3,ease:'back.out(2)'},L[5]+.5);tl.to('#ptTrunk',{rotation:0,duration:.3},L[5]+1.6);
hop('#boSq',L[5]+.6,90,.2,.22);hop('#boSq',L[5]+1.1,90,.2,.22);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:11},L[5]+.4);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[5]+.4);

/* ================= SCENE 4: "Then Rocky sneaked in for a snack!" — Rocky tiptoes in front of everybody ================= */
tl.set('#rk',{opacity:1,x:640,y:RKY,scale:RKS},tRk0-.05);
RK.m(tRk0-.05,'mSm');RK.eyes(tRk0-.05,'normal');RK.brows(tRk0,8,-8,0,.2);RK.look(tRk0,24,0,.2);
tl.fromTo('#rkLean',{rotation:0},{rotation:6,duration:.3},tRk0);
tl.to('#rk',{x:1130,duration:tFreeze-tRk0,ease:'none'},tRk0);
cycle(['#rkLegL','#rkLegR'],['#rkArmL','#rkArmR'],tRk0,tFreeze,.56,12,6,'#rkSq',5);
// Bo glances down: Rocky freezes ("whistling"), then Bo looks up again
look(tFreeze+.1,34,40,.15);brows(tFreeze+.1,-10,10,-4,.15);
RK.eyes(tFreeze+.1,'wide');RK.m(tFreeze+.1,'mO');RK.look(tFreeze+.1,-20,-16,.1);
tl.to('#rkLean',{rotation:-4,duration:.15},tFreeze+.1);
tl.fromTo('#rkSq',{y:0},{y:-8,duration:.2,yoyo:true,repeat:1},tFreeze+.15);
look(tGo-.2,10,-34,.15);brows(tGo-.2,0,0,0,.15);
RK.eyes(tGo-.1,'normal');RK.m(tGo-.1,'mSm');RK.look(tGo-.1,24,0,.15);tl.to('#rkLean',{rotation:6,duration:.2},tGo-.1);
tl.to('#rk',{x:1745,duration:tPick-tGo,ease:'none'},tGo);
cycle(['#rkLegL','#rkLegR'],['#rkArmL','#rkArmR'],tGo,tPick,.56,12,6,'#rkSq',5);

/* ================= SCENE 5: "Nobody saw anything." — the pancake stack goes on his head ================= */
tl.fromTo('#feastPc',{x:KITX.bo+310},{x:1745,duration:.4,ease:'none'},tPick);
tl.fromTo('#feastPc',{y:FLOOR},{y:HEADY-80,duration:.18,ease:'power2.out'},tPick).to('#feastPc',{y:HEADY,duration:.22,ease:'power2.in'},tPick+.18);
tl.fromTo('#feastPc',{scale:1.0},{scale:.5,duration:.4,ease:'none'},tPick);
tl.to('#rkArmL',{rotation:110,duration:.2},tPick);tl.to('#rkArmR',{rotation:-110,duration:.2},tPick);
RK.eyes(L[7],'normal');RK.look(L[7],0,0,.2);RK.brows(L[7],-10,10,-2,.2);
RK.talk(L[7]+.02,L[7]+DU[7]-.06,'mOp','mSm',.14);
tl.fromTo('#rkSq',{y:0},{y:-6,duration:.22,yoyo:true,repeat:5},L[7]);
tl.to('#rk,#feastPc',{x:1580,duration:L[8]+.5-tPick-.4,ease:'none'},tPick+.4);
cycle(['#rkLegL','#rkLegR'],[],tPick+.4,L[8]+.5,.6,10,0,'#rkSq',4);

/* ================= SCENE 6: "But Jiggle was very, very sticky!" — he peels off the ceiling and drops on Rocky ================= */
tl.fromTo('#j1Sq',{scaleY:1,scaleX:1},{scaleY:1.9,scaleX:.7,duration:tDrop-tPeel,ease:'sine.in'},tPeel);
J1.eyes(tPeel,'wide');J1.m(tPeel,'mO');
bits(tPeel+.3,CEX,CEY+40,5);
RK.eyes(tDrop-.2,'wide');RK.look(tDrop-.2,0,-40,.1);RK.m(tDrop-.2,'mO');RK.brows(tDrop-.2,-14,14,-6,.1);
tl.fromTo('#j1Sq',{scaleY:1.9,scaleX:.7},{scaleY:1,scaleX:1,duration:.25,ease:'back.out(3)'},tDrop);
tl.fromTo('#j1',{x:CEX},{x:1580,duration:tLand-tDrop,ease:'none'},tDrop);
tl.fromTo('#j1',{y:CEY},{y:STK,duration:tLand-tDrop,ease:'power2.in'},tDrop);
tl.fromTo('#j1',{rotation:180},{rotation:0,duration:tLand-tDrop-.02,ease:'power1.inOut'},tDrop);
landSq('#j1Sq',tLand,.5);stretchOut(tLand);
tl.fromTo('#feastPcIn',{scaleY:.6},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tLand);
sparks(tLand,1580,STK,10,130);shake(tLand,8,5);dust(tLand+.05,1580,RKY+6,1.1);
J1.eyes(tLand,'happy');J1.m(tLand,'mBg');
tl.to('#j1ArmL',{rotation:60,duration:.2},tLand+.1);tl.to('#j1ArmR',{rotation:-60,duration:.2},tLand+.1);
faces(tLand+.15,'wide','O');lookAll(tLand+.15,10,6);
RK.eyes(tLand+.1,'wide');RK.m(tLand+.1,'mBg');RK.brows(tLand+.1,-16,16,-6,.1);RK.look(tLand+.1,0,-24,.1);
// Rocky tries to shake him off — Jiggle just stretches
function rkJump(t0,h=130){
 tl.fromTo('#rk',{y:RKY},{y:RKY-h,duration:.22,ease:'power2.out'},t0).to('#rk',{y:RKY,duration:.22,ease:'power2.in'},t0+.22);
 tl.fromTo('#feastPc',{y:HEADY},{y:HEADY-h,duration:.22,ease:'power2.out'},t0).to('#feastPc',{y:HEADY,duration:.22,ease:'power2.in'},t0+.22);
 tl.fromTo('#j1',{y:STK},{y:STK-h*.82,duration:.24,ease:'power2.out'},t0+.04).to('#j1',{y:STK,duration:.22,ease:'power2.in'},t0+.28);
 tl.fromTo('#j1Sq',{scaleY:1,scaleX:1},{scaleY:1.6,scaleX:.78,duration:.2,ease:'power2.out'},t0+.04).to('#j1Sq',{scaleY:1,scaleX:1,duration:.3,ease:'elastic.out(1,.4)'},t0+.26);}
rkJump(tLand+.55,130);rkJump(tLand+1.15,150);
tl.fromTo('#rkArmL',{rotation:110},{rotation:30,duration:.14,yoyo:true,repeat:9},tLand+.5);tl.fromTo('#rkArmR',{rotation:-30},{rotation:-110,duration:.14,yoyo:true,repeat:9},tLand+.5);
sparks(tLand+.9,1580,STK-60,5,110);
faces(tLand+.9,'happy','Big');hop('#boSq',tLand+.95,60,.14,.18);hop('#tfSq',tLand+1.0,60,.14,.18);hop('#cmSq',tLand+1.05,60,.14,.18);
RK.eyes(tLand+1.7,'wide');RK.m(tLand+1.7,'mFr');RK.brows(tLand+1.7,-18,18,-6,.15);
J1.m(tLand+1.2,'mSm');J1.eyes(tLand+1.2,'happy');

/* ================= SCENE 7: Jiggle: "Hic! Hic! Uh-oh!" ================= */
camTo(L[9]-.6,1.0,...CAM.near,'power2.inOut');
tl.to('#j1Lean',{scale:1.1,duration:.3},tHic[0]-.2);
tHic.forEach((t,i)=>{
 J1.m(t-.05,'mO');J1.eyes(t-.05,i===2?'wide':'normal');
 hop('#j1Flip',t-.03,36+i*16,.09,.13);
 tl.fromTo('#j1Sq',{scaleY:1,scaleX:1},{scaleY:1.2+i*.08,scaleX:.88,duration:.09,yoyo:true,repeat:1},t-.05);
 tl.set('#hic',{x:1700+i*18,y:STK-340-i*20},t);
 tl.fromTo('#hic',{opacity:0,scale:.3,rotation:-10},{opacity:1,scale:.85+i*.18,rotation:6,duration:.13,ease:'back.out(3)'},t);
 tl.to('#hic',{opacity:0,y:STK-420-i*20,duration:.38},t+.3);
 if(i<2) tl.to('#j1Lean',{scale:1.1+(i+1)*.1,duration:.25},t+.1);});
tl.fromTo('#j1Lean',{x:-5},{x:5,duration:.04,yoyo:true,repeat:13},tHic[2]+.05);
RK.eyes(tHic[1],'wide');RK.look(tHic[1],0,-46,.1);RK.m(tHic[1],'mO');
tl.fromTo('#rkSq',{y:0},{y:-6,duration:.04,yoyo:true,repeat:11},tHic[2]);
faces(tHic[0],'wide','O');

/* ================= SCENE 8: "And then... POP! There were four!" ================= */
const JT=[['j2',1300],['j1',1470],['j3',1650],['j4',1810]], JY=FLOOR+110, JS=.55;
tl.fromTo('#flash',{opacity:.9},{opacity:0,duration:.35},tPop);
sparks(tPop,1580,STK-120,10,200);sparks(tPop+.08,1580,STK-120,10,300);
JT.forEach(([p,x],i)=>{
 const id='#'+p,t=tPop+i*.05;
 if(p!=='j1') tl.set(id,{opacity:1,x:1580,y:STK,scale:.45,rotation:0},tPop);
 tl.fromTo(id,{x:1580},{x:x,duration:.6,ease:'none'},t);
 arc(id,t,.6,STK,240+i*30,JY);
 tl.fromTo(id,{scale:p==='j1'?.62:.45},{scale:JS,duration:.6,ease:'none'},t);
 landSq(`#${p}Sq`,t+.6,.65);dust(t+.62,x,JY+6,.8);
 const J=GS4[+p[1]-1];J.eyes(t,'wide');J.m(t,'mO');J.eyes(t+.9,'happy');J.m(t+.9,'mBg');});
tl.set('#j1Lean',{scale:1},tPop);
faces(tPop+.1,'wide','O');armsUp(tPop+.25,.15);
RK.eyes(tPop+.05,'normal');RK.m(tPop+.05,'mSm');RK.brows(tPop+.05,8,-8,0,.2);RK.look(tPop+.05,-30,0,.2);
tl.to('#rkArmL',{rotation:110,duration:.2},tPop);tl.to('#rkArmR',{rotation:-110,duration:.2},tPop);
tl.to('#rk,#feastPc',{x:620,duration:3.6,ease:'none'},tPop+.9);
cycle(['#rkLegL','#rkLegR'],[],tPop+.9,tPop+4.5,.6,10,0,'#rkSq',4);
camTo(tPop+.6,1.2,...CAM.line,'power2.inOut');
// everybody waves "me! me!"
JT.forEach(([p,x],i)=>{
 const J=GS4[+p[1]-1];
 tl.fromTo(`#${p}ArmL`,{rotation:150},{rotation:100,duration:.14,yoyo:true,repeat:23},tPop+.9+i*.07);tl.fromTo(`#${p}ArmR`,{rotation:-100},{rotation:-150,duration:.14,yoyo:true,repeat:23},tPop+.9+i*.07);
 tl.fromTo(`#${p}AntL`,{rotation:-14},{rotation:14,duration:.13,yoyo:true,repeat:30},tPop+.9);tl.fromTo(`#${p}AntR`,{rotation:14},{rotation:-14,duration:.13,yoyo:true,repeat:30},tPop+.9);
 hop(`#${p}Flip`,L[11]+.15+i*.28,70,.16,.2);landSq(`#${p}Sq`,L[11]+.15+i*.28+.36,.8);
 J.talk(L[11]+.2+i*.2,L[11]+DU[11]+.2+i*.2,'mBg','mOp',.13);
 hop(`#${p}Flip`,tStk+.3+i*.25,60,.14,.18);landSq(`#${p}Sq`,tStk+.3+i*.25+.3,.85);});

/* ================= SCENE 9: Bo: "Which one is Jiggle?" ================= */
bTalk(L[11]+.02,L[11]+DU[11]-.1);
look(L[11]+.05,-34,34,.15);look(L[11]+.5,-12,34,.15);look(L[11]+.8,14,34,.15);look(L[11]+1.1,34,34,.15);
brows(L[11],-10,10,-4,.2);
tl.to('#boArmL',{rotation:-130,duration:.25},L[11]);                         // scratches his head
tl.fromTo('#boLean',{rotation:-3},{rotation:3,duration:.3,yoyo:true,repeat:5},L[11]);
MC.m(L[11]+.2,'mFr');mcEyes(L[11]+.2,'lids');
faces(L[11]+DU[11]+.1,'happy','Big');
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

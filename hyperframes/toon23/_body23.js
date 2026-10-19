/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the gang keeps its lawn marks from #22; Bo runs to Gumdrop's open side for the launch (nobody behind him there),
// Zap lands back on his mark, Mochi gets her own close-up, then the wide shot catches Bo landing on his mark at the front
const CAM={sky:[380,-1100,.53], top:[800,-3200,.44], bo:[1119,831,.95], zap:[630,911,.9], zup:[900,-2400,.5],
 gm:[100,316,.85], fall:[800,-2600,.46], mochi:[315,945,.95], wide:[380,-220,.53]};
const SPX=1850;                                            // where the balloons hang
const BOH=[1720,ROWD+BOY];                                 // Bo's mark at the front of the stage
const BOL=[380,ROWF+BOY];                                  // Bo's launch spot, at Gumdrop's side
const ZPX=1230;                                            // Zap's mark
const tFly=W(5,3)-.1;                                      // Gumdrop's "...BO!" -> Bo is launched
const FD=2.2;                                              // Bo's flight time
const tCatch=tFly+FD+.3;                                   // Bo catches the spatula
const tPopB=L[9]+.1;                                       // "POP, POP, POP"
const tDown=L[9]+1.25;                                     // everybody floats back down
const DD=L[11]+1.0-tDown;                                  // ... and lands in Bo's hands
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
let smn=0;
function smoke(t,x,y,n=1){for(let k=0;k<n;k++){const i=(smn++)%8,tt=t+k*.1;
 tl.set('#smw'+i,{x:x,y:y},tt);
 tl.fromTo('#sm'+i,{opacity:.9,scale:.4,y:0},{opacity:0,scale:1.6,y:-60,duration:.8,ease:'power1.out'},tt);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}

/* ================= SCENE 1: "The golden spatula floated higher and higher!" ================= */
camSet(0,...CAM.sky);
faces(0,'wide','O');lookAll(0,0,-40);
camTo(.2,1.8,...CAM.top,'power1.inOut');
tl.to('#flyW',{y:-2750,x:SPX,duration:L[2]+.5,ease:'none'},0);
tl.fromTo('#fly',{rotation:-6},{rotation:6,duration:.5,yoyo:true,repeat:14,ease:'sine.inOut'},0);
tl.fromTo('.bln',{rotation:-5},{rotation:5,duration:.4,yoyo:true,repeat:25,ease:'sine.inOut'},0);
tl.fromTo('.cld',{x:0},{x:-220,duration:L[2]+3,ease:'none'},0);
sparks(1.0,SPX,-2650,6,120);

/* ================= SCENE 2: Bo: "We have to catch it!" ================= */
camTo(L[2]-.5,1.0,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.08);brows(L[2]+.05,14,-14,-4,.15);look(L[2]+.05,24,-34,.15);eyesMode(L[2]+.05,'wide');
tl.to('#boArmL',{rotation:-160,duration:.12},L[2]);tl.to('#boArmR',{rotation:160,duration:.12},L[2]);
[0,.55,1.1].forEach(d=>hop('#boSq',L[2]+.2+d,160,.26,.28));
faces(L[2]+.3,'wide','O');lookAll(L[2]+.3,24,-40);

/* ================= SCENE 3: Zap: "Beep boop! Rocket boots, ready!" ================= */
camTo(L[3]-.35,.7,...CAM.zap,'power2.inOut');
ZP.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);ZP.eyes(L[3],'happy');
tl.set('#zflW',{opacity:1,x:ZPX,y:ROWD+14,scale:.5},L[3]+.5);
tl.fromTo('.zf',{scaleY:.6},{scaleY:1.2,duration:.07,yoyo:true,repeat:60},L[3]+.5);
tl.to('#zpArmL',{rotation:100,duration:.2},L[3]+.2);tl.to('#zpArmR',{rotation:-100,duration:.2},L[3]+.2);
for(let k=0;k<3;k++) tl.fromTo('#zpSq',{y:0},{y:-6,duration:.05,yoyo:true,repeat:5},L[3]+.6+k*.3);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[3]);tl.set('#zpAnt',{rotation:0},L[3]+DU[3]);
lookAll(L[3]+.3,-20,10);

/* ================= SCENE 4: "Zap blasted off into the sky!" ================= */
const ZT0=L[4]+.2,ZD=2.0,ZY=-1900,ZX1=ZPX+230;
camTo(L[4]+.5,2.2,...CAM.zup,'power2.inOut');
tl.fromTo('#zp',{y:ROWD},{y:ZY,duration:ZD,ease:'power2.in'},ZT0);tl.fromTo('#zp',{x:ZPX},{x:ZX1,duration:ZD,ease:'none'},ZT0);
tl.fromTo('#zflW',{y:ROWD+14},{y:ZY+14,duration:ZD,ease:'power2.in'},ZT0);tl.fromTo('#zflW',{x:ZPX},{x:ZX1,duration:ZD,ease:'none'},ZT0);tl.to('#zflW',{scale:.9,duration:.4},ZT0);
for(let k=0;k<16;k++){const t=ZT0+k*.12,u=Math.min(1,(t-ZT0)/ZD),q=u*u;smoke(t,ZPX+230*q,ROWD+120+(ZY-ROWD)*q);}
dust(ZT0,ZPX-50,ROWD+10,2.4);dust(ZT0+.03,ZPX+50,ROWD+10,2.4);shake(ZT0,10,8);
tl.set('#streaks',{opacity:1},ZT0+.6);tl.fromTo('.stk',{y:-300},{y:2200,duration:.5,repeat:6,ease:'none',stagger:.04},ZT0+.6);tl.set('#streaks',{opacity:0},ZT0+2.0);
tl.set('#zpArmL',{rotation:-60},ZT0);tl.set('#zpArmR',{rotation:60},ZT0);
// meanwhile Bo dashes over to Gumdrop (off camera)
runTo('bo',BOL[0],BOL[1],L[5]-.95,1.0,.88,20);

/* ================= SCENE 5: Gumdrop: "Roar! Here comes Bo!" ================= */
camTo(L[5]-.5,1.0,...CAM.gm,'power2.inOut');
GM.talk(L[5]+.02,L[5]+DU[5]-.05,'mBg','mOp',.14);GM.eyes(L[5],'happy');GM.brows(L[5],10,-10,-4,.1);
tl.to('#gmArmR',{rotation:-110,duration:.2},L[5]);tl.to('#boArmL',{rotation:-160,duration:.15},L[5]+.4);tl.to('#boArmR',{rotation:160,duration:.15},L[5]+.4);
hop('#boSq',L[5]+.45,260,.2,.2);
tl.to('#gmArmR',{rotation:-170,duration:.12,ease:'power2.in'},tFly-.15);tl.to('#gmArmR',{rotation:0,duration:.4},tFly+.1);
shake(tFly,12,6);sparks(tFly,BOL[0]+40,BOL[1]-500,8,160);
lookAll(L[5]+.3,-30,-10);

/* ================= SCENE 6: Bo: "Wheeee! I'm flying!" ================= */
camTo(tFly,FD+.2,...CAM.top,'power2.inOut');
bTalk(L[6]+.02,L[6]+DU[6]-.08,'mBig','mOpen',.1);eyesMode(L[6],'wide');
tl.fromTo('#bo',{x:BOL[0]},{x:1750,duration:FD,ease:'power1.out'},tFly);
arc('#bo',tFly,FD,BOL[1],560,-1900);
tl.set('#streaks',{opacity:1},tFly+.1);tl.fromTo('.stk',{y:2200},{y:-300,duration:.45,repeat:3,ease:'none',stagger:.03},tFly+.1);tl.set('#streaks',{opacity:0},tFly+1.5);
for(let k=0;k<8;k++) sparks(tFly+k*.2,BOL[0]+(1750-BOL[0])*(k/8),BOL[1]-(BOL[1]+1900)*Math.sin(Math.PI*(k/8)*.5)*.8,2,50);
// Bo hangs in the air, bobbing, while the others catch up
tl.to('#bo',{y:-1860,duration:.6,yoyo:true,repeat:8,ease:'sine.inOut'},tFly+FD);
// Zap's boots sputter and he drops back onto his mark
tl.to('#zflW',{opacity:0,duration:.2},L[6]+.2);
tl.to('#zp',{y:ROWD,x:ZPX,duration:1.4,ease:'power2.in'},L[6]+.3);dust(L[6]+1.7,ZPX,ROWD+10,2);
tl.to('#zpArmL',{rotation:150,duration:.2},L[6]+1.7);tl.to('#zpArmR',{rotation:-150,duration:.2},L[6]+1.7);

/* ================= SCENE 7: "Boo floated up to help, too!" ================= */
camTo(L[7]-.3,1.2,...CAM.top,'power2.inOut');
tl.to('#gh',{x:2200,y:-2300,scale:.75,duration:2.0,ease:'sine.inOut'},L[7]-.2);   // beside Bo, not on top of him
tl.fromTo('#ghSq',{y:0},{y:-18,duration:.5,yoyo:true,repeat:9,ease:'sine.inOut'},L[7]);
for(let k=0;k<6;k++) sparks(L[7]+k*.3,1660+k*90,200-k*420,2,70);

/* ================= SCENE 8: Boo: "I... I'll help. Boo." ================= */
GH.talk(L[8]+.02,L[8]+DU[8]-.06,'mOp','mSm',.2);GH.eyes(L[8],'normal');GH.brows(L[8],-10,10,0,.2);
tl.fromTo('#ghGlow',{opacity:.3},{opacity:.8,duration:.4,yoyo:true,repeat:5},L[8]);

/* ================= SCENE 9: "Pop, pop, pop! The balloons burst!" ================= */
camTo(L[9]-.4,.8,...CAM.top,'power2.inOut');
[0,1,2,3].forEach(i=>{const t=tPopB+i*.24;
 tl.to(`.bln:nth-of-type(${i+1})`,{scale:1.5,opacity:0,duration:.14,ease:'power2.out'},t);   // (the 4 .bln inside #bals)
 sparks(t,SPX+[-86,0,84,-36][i],-2750-[300,360,290,250][i]*.8,6,90);shake(t,6,3);});
// the spatula drops (blade down), Bo reaches up and catches it
tl.to('#gspIn',{rotation:0,duration:.1},tPopB);tl.to('#bals path',{opacity:0,duration:.2},tPopB+.7);
tl.to('#flyW',{x:1780,y:-2000,duration:.75,ease:'power2.in'},tPopB+.45);
tl.to('#boArmL',{rotation:-160,duration:.1},tPopB);tl.to('#boArmR',{rotation:160,duration:.1},tPopB);
tl.fromTo('#boSq',{y:0},{y:-30,duration:.2,yoyo:true,repeat:1},tPopB+1.1);
tl.to('#gspIn',{rotation:180,duration:.25,ease:'back.out(2)'},tPopB+1.2);sparks(tPopB+1.2,1780,-2000,8,120);

/* ================= SCENE 10: Mochi: "Hmph. Somebody catch it. Obviously." — everybody floats back down ================= */
tl.to('#flyW',{x:BOH[0]+90,y:BOH[1]-390,duration:DD,ease:'sine.inOut'},tDown);
tl.fromTo('#bo',{x:1750},{x:BOH[0],duration:DD,ease:'sine.inOut'},tDown);tl.fromTo('#bo',{y:-1900},{y:BOH[1],duration:DD,ease:'sine.inOut'},tDown);
tl.to('#gh',{x:2120,y:1000,duration:DD,ease:'sine.inOut'},tDown);              // stays clear of Bo's head on the way down
camTo(tDown,L[10]-.25-tDown,...CAM.fall,'sine.inOut');
camSet(L[10]-.2,...CAM.mochi);                                     // cut to Mochi down on the lawn
MC.m(L[10]+.1,'mFr');MC.talk(L[10]+.12,L[10]+DU[10]-.08,'mOp','mFr',.16);mcEyes(L[10]+.15,'lids');MC.brows(L[10]+.1,8,-8,2,.2);
tl.fromTo('#mcMag',{rotation:-6},{rotation:6,duration:.3,yoyo:true,repeat:7},L[10]);
faces(L[10]+.8,'normal','Sm');lookAll(L[10]+.8,10,-30);

/* ================= SCENE 11: "And it landed right in Bo's hands!" — the camera pulls back as Bo touches down on his mark ================= */
camTo(L[11]-.35,1.1,...CAM.wide,'power2.inOut');
tl.to('#boArmL',{rotation:-140,duration:.2},L[11]+.9);tl.to('#boArmR',{rotation:140,duration:.2},L[11]+.9);
tl.set('#boSq',{y:0},L[11]+1.0);hop('#boSq',L[11]+1.05,40,.12,.18);dust(L[11]+1.0,BOH[0]-60,ROWD+10,1.6);
tl.set('#flyW',{x:BOH[0]+90,y:BOH[1]-390},L[11]+1.0);
faces(L[11]+1.0,'happy','Big');eyesMode(L[11]+1.0,'hearts');
confetti(L[11]+1.0,500,2400,ROWB-1300,ROWJ+60,36,.9);hearts(L[11]+1.1,BOH[0]-30,BOH[1]-760,6,120,300);sparks(L[11]+1.0,BOH[0]+90,BOH[1]-520,10,200);
armsUp(L[11]+1.2,.15);SQC.forEach((s,i)=>hop(s,L[11]+1.3+i*.05,44,.12,.16));
['j1','j2','j3','j4'].forEach((j,i)=>hop(`#${j}Sq`,L[11]+1.3+i*.08,60,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={king:[440,-440,.6], mid:[380,100,.95], grid:[340,140,1.0], wide2:[380,-330,.6], bo:[1100,150,1.0], fin:[880,50,.86]};
const DOORG=620, RAMPG=750;                                // the saucer on Planet Gloop (x=560): doorway / ramp bottom
const DOORK=945, RAMPK=1070;                               // the saucer in the kitchen (x=880)
const GRX=1150, KX=1400, KS=1.5;                           // the griddle, the King
const CKS={mc:.68,cm:.76,nm:.5,tf:.74,zp:.6,bp:.62,bo:.88,pt:.7,gm:1.5};
const KITX={mc:960,cm:1050,nm:1135,tf:1225,zp:1315,bp:1400,bo:1530,pt:1960,gm:2030};     // where everybody stands back home
const SX={mc:900,cm:678,nm:784,tf:840,zp:896,bp:970,bo:1830,pt:1940,gm:2100};              // ... and on Gloop at the start
const tPopG=L[1]+.5;                                       // the Gloopians pop up next to the King
const tBulb=W(2,3)-.3;                                     // Truffle's big idea
const tGrid=L[3]-.2;                                       // the griddle + the montage
const tEat=L[6]-.35;                                       // the pancake flies to the King's mouth
const tGo={gm:17.0,bo:17.1,pt:17.2,mc:17.35,cm:17.45,nm:17.55,tf:17.65,zp:17.75,bp:17.85};     // everyone walks into the saucer
const tLift=19.0;
const tKit=L[8]-.1;                                        // home!
const tOut={mc:tKit+.4,cm:tKit+.55,nm:tKit+.7,tf:tKit+.85,zp:tKit+1.0,bp:tKit+1.15,pt:tKit+1.3,gm:tKit+1.45,bo:tKit+.2};
const tStow=L[9];
const tHopOut=L[10]-.2;
const tPlate=L[10]+.4, tBite=W(11,4)-.5;
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
const GS4=[G1,G2,G3,G4];
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);BP.look(t,dx,dy,.12);ZP.look(t,dx,dy,.12);PT.look(t,dx,dy,.12);GS4.forEach(g=>g.look(t,dx,dy,.12));KG.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const ALL=['tf','nm','mc','cm','gm','bp','zp','pt'];
const GN=['g1','g2','g3','g4'];
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
function popUp(g,x,t){const id='#'+g;
 tl.set(id,{opacity:1,x,y:FLOOR+300,scale:.5},t);
 tl.fromTo(id,{y:FLOOR+300},{y:FLOOR,duration:.5,ease:'back.out(2.2)'},t);
 tl.fromTo(`#${g}Sq`,{scaleY:1.3,scaleX:.8},{scaleY:1,scaleX:1,duration:.45,ease:'elastic.out(1,.4)'},t+.3);
 sparks(t+.3,x,FLOOR-20,4,70);}
// walk to the saucer, shrink, disappear in the doorway
function enterG(p,t0,spd=800){const id='#'+p,s=CKS[p],x0=SX[p],d1=Math.max(.05,Math.abs(x0-RAMPG)/spd);
 tl.fromTo(id,{x:x0},{x:RAMPG,duration:d1,ease:'none'},t0);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0,t0+d1,.26,24,12,`#${p}Sq`,9);
 const t1=t0+d1;
 tl.fromTo(id,{x:RAMPG},{x:DOORG,duration:.55,ease:'power1.in'},t1);
 tl.fromTo(id,{y:FLOOR},{y:FLOOR-110,duration:.55,ease:'none'},t1);
 tl.fromTo(id,{scale:s},{scale:s*.07,duration:.55,ease:'power2.in'},t1);
 tl.set(id,{opacity:0},t1+.55);sparks(t1+.5,DOORG,FLOOR-130,3,40);return t1+.55;}
// step out of the saucer in the kitchen
function exitK(p,t0,spd=800){const id='#'+p,s=CKS[p],x1=KITX[p],d=Math.abs(x1-RAMPK)/spd;
 tl.set(id,{opacity:1,x:DOORK,y:FLOOR-110,scale:s*.07},t0);
 tl.fromTo(id,{x:DOORK},{x:RAMPK,duration:.45,ease:'power1.out'},t0);
 tl.fromTo(id,{y:FLOOR-110},{y:FLOOR,duration:.45,ease:'none'},t0);
 tl.fromTo(id,{scale:s*.07},{scale:s,duration:.45,ease:'back.out(1.8)'},t0);
 tl.fromTo(id,{x:RAMPK},{x:x1,duration:d,ease:'sine.out'},t0+.45);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0+.45,t0+.45+d,.28,22,10,`#${p}Sq`,8);
 sparks(t0+.05,DOORK,FLOOR-120,3,40);return t0+.45+d;}

/* ================= SCENE 0/1: the last frame of video #12 — the Gloop King wants pancakes forever ================= */
camSet(0,...CAM.king);
faces(0,'wide','Fr');KG.eyes(0,'normal');KG.m(0,'mSm');KG.brows(0,-8,8,-4,.01);
tl.to('#kgArmL',{rotation:0,duration:.4},.3);tl.to('#kgArmR',{rotation:0,duration:.4},.3);
tl.fromTo('#kgSq',{scaleY:1},{scaleY:1.03,duration:.25,yoyo:true,repeat:30},0);
tl.fromTo('#kgBelly',{scale:1},{scale:1.1,duration:.14,yoyo:true,repeat:11},L[1]+.4);shake(L[1]+.4,5,6);
KG.m(L[1]+.4,'mOp');KG.eyes(L[1]+.4,'wide');
[['g1',1230],['g2',1290],['g3',1510],['g4',1570]].forEach(([g,x],i)=>popUp(g,x,tPopG+i*.15));
GS4.forEach((g,i)=>{g.eyes(tPopG+.5+i*.15,'wide');g.m(tPopG+.5+i*.15,'mFr');});
tl.set('#kcrn',{scale:1},0);
tl.set('#boSweat',{opacity:1},0);

/* ================= SCENE 2: Truffle: "I have a plan! The biggest pancake ever!" ================= */
camTo(L[2]-.5,1.0,...CAM.mid,'power2.inOut');
tl.set('#bulb',{x:SX.tf,y:1040},tBulb-.3);
tl.fromTo('#bulb',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},tBulb);
tl.fromTo('#bulbIn',{scale:1},{scale:1.12,duration:.15,yoyo:true,repeat:5},tBulb+.3);
sparks(tBulb+.2,SX.tf,980,6,90);tl.to('#bulb',{opacity:0,duration:.25},tBulb+1.6);
TF.m(L[2]-.05,'mBg');TF.talk(L[2]+.02,L[2]+DU[2]-.08,'mBg','mSm',.13);TF.eyes(L[2],'happy');
tl.to('#tfArmL',{rotation:150,duration:.12},tBulb);tl.to('#tfArmR',{rotation:-150,duration:.12},tBulb);
hop('#tfSq',tBulb+.2,60,.14,.2);hop('#tfSq',tBulb+.8,60,.14,.2);
faces(W(2,4),'normal','Sm');TF.eyes(W(2,4),'happy');TF.m(W(2,4),'mBg');
GS4.forEach((g,i)=>{g.eyes(W(2,4),'normal');g.m(W(2,4),'mO');});
tl.to('#boArmL',{rotation:0,duration:.3},W(2,4));tl.to('#boArmR',{rotation:0,duration:.3},W(2,4));tl.set('#boSweat',{opacity:0},W(2,4));
tl.set('#tfSweat',{opacity:0},W(2,4));armsDown(W(2,4),.3);
KG.eyes(W(2,6),'normal');KG.m(W(2,6),'mSm');

/* ================= SCENE 3: "Everybody helped to cook it!" — the montage ================= */
camTo(L[3]-.5,.9,...CAM.grid,'power2.inOut');
tl.set('#griddle',{opacity:1,x:GRX,y:FLOOR},tGrid);
tl.fromTo('#griddle',{scale:.2},{scale:1,duration:.4,ease:'back.out(2)'},tGrid);
tl.fromTo('.gfl',{scaleY:.8},{scaleY:1.3,duration:.16,yoyo:true,repeat:70,stagger:.03},tGrid+.2);
faces(tGrid,'happy','Big');
// Peanut remembers the recipe
tl.to('#ptArmR',{rotation:-150,duration:.15},tGrid+.05);tl.fromTo('#ptTrunk',{rotation:0},{rotation:-35,duration:.3,ease:'back.out(2)'},tGrid+.1);tl.to('#ptTrunk',{rotation:0,duration:.3},tGrid+.7);
// Gumdrop stirs the air with enormous arms, Zap measures, Boo lights the flames
tl.fromTo('#gmArmL',{rotation:60},{rotation:150,duration:.16,yoyo:true,repeat:7},tGrid+.1);tl.fromTo('#gmArmR',{rotation:-150},{rotation:-60,duration:.16,yoyo:true,repeat:7},tGrid+.1);
tl.to('#zpArmL',{rotation:150,duration:.12},tGrid+.2);tl.to('#zpArmR',{rotation:-100,duration:.12},tGrid+.2);tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:9},tGrid+.2);
tl.to('#gh',{x:GRX-60,y:FLOOR-620,duration:.6,ease:'sine.inOut'},tGrid);ghFlame(tGrid+.6);
function ghFlame(t){tl.fromTo('.gfl',{scaleY:1},{scaleY:1.9,duration:.2,yoyo:true,repeat:1},t);sparks(t+.1,GRX,FLOOR-140,8,160);}
// Coco flips the batter, Nibbles sprinkles, Blip scans
tl.fromTo('#cmFlip',{rotation:0},{rotation:360,duration:.45,ease:'power1.inOut'},tGrid+.4);hop('#cmSq',tGrid+.4,140,.22,.25);
sprinkle(tGrid+.3,GRX,FLOOR-760,FLOOR-130,9);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:11},tGrid+.2);tl.fromTo('#bpAntR',{rotation:16},{rotation:-16,duration:.12,yoyo:true,repeat:11},tGrid+.2);
SQALL.forEach((s,i)=>hop(s,tGrid+.3+i*.05,36,.12,.16));
// the batter hits the griddle and the first pancake appears
for(let k=0;k<3;k++) drops(tGrid+.6+k*.22,GRX+(k-1)*70,FLOOR-110,5);
tl.set('#feastPc',{opacity:1,x:GRX,y:FLOOR-80,scale:.3},tGrid+1.0);
tl.fromTo('#feastPc',{scale:.3},{scale:.9,duration:.45,ease:'back.out(2.4)'},tGrid+1.0);
sparks(tGrid+1.1,GRX,FLOOR-200,8,150);

/* ================= SCENE 4: Mochi: "Hmph. Needs more syrup. Obviously." ================= */
tl.to('#mc',{x:900,duration:.8,ease:'sine.inOut'},L[4]-.5);cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],L[4]-.5,L[4]+.3,.34,16,8,'#mcSq',5);
MC.m(L[4]-.05,'mFr');MC.talk(L[4]+.02,L[4]+DU[4]-.08,'mOp','mFr',.15);mcEyes(L[4],'lids');MC.brows(L[4],8,-8,2,.2);
tl.to('#mcArmR',{rotation:-100,duration:.25,ease:'back.out(1.8)'},W(4,3)-.2);
for(let k=0;k<5;k++){const t=W(4,3)-.1+k*.45;drops(t,GRX+(k%3-1)*90,FLOOR-380,6);
 tl.fromTo('#feastPc',{scale:.9+k*.2},{scale:1.1+k*.22,duration:.3,ease:'back.out(2)'},t+.25);}
tl.fromTo('#feastPcIn',{scaleY:1},{scaleY:1.08,duration:.12,yoyo:true,repeat:9},L[4]+1.0);
tl.to('#mcArmR',{rotation:0,duration:.3},L[4]+DU[4]);
GS4.forEach((g,i)=>{g.eyes(L[4]+.5,'happy');g.m(L[4]+.5,'mBg');hop(`#${GN[i]}Sq`,L[4]+.6+i*.1,50,.14,.2);});

/* ================= SCENE 5: "It was the biggest pancake in the universe!" ================= */
camTo(L[5]-.3,1.4,...CAM.wide2,'power2.inOut');
tl.fromTo('#feastPc',{scale:2.0},{scale:3.2,duration:1.2,ease:'power2.out'},L[5]);
tl.fromTo('#feastPc',{x:GRX},{x:GRX-170,duration:1.2,ease:'power2.out'},L[5]);   // slides left so the King's face stays visible
tl.fromTo('#feastPcIn',{scaleY:1},{scaleY:1.06,duration:.2,yoyo:true,repeat:7},L[5]+1.0);
sparks(L[5]+.3,GRX,FLOOR-300,10,260);sparks(L[5]+1.0,GRX,FLOOR-380,10,300);hearts(L[5]+.6,GRX,FLOOR-520,6,130,260);
faces(L[5]+.2,'wide','O');faces(L[5]+1.1,'happy','Big');
KG.eyes(L[5]+.3,'wide');KG.m(L[5]+.3,'mBg');KG.brows(L[5]+.3,12,-12,-6,.1);
tl.fromTo('#kgArmL',{rotation:0},{rotation:60,duration:.2},L[5]+.4);tl.fromTo('#kgArmR',{rotation:0},{rotation:-60,duration:.2},L[5]+.4);
armsUp(L[5]+1.1,.15);

/* ================= SCENE 6: the Gloop King eats it: "Yum! You may go home, friends!" ================= */
tl.fromTo('#feastPc',{x:GRX-170},{x:KX,duration:.7,ease:'none'},tEat);
tl.fromTo('#feastPc',{y:FLOOR-80},{y:FLOOR-80-520,duration:.3,ease:'power2.out'},tEat).to('#feastPc',{y:FLOOR-414+40,duration:.4,ease:'power2.in'},tEat+.3);
tl.fromTo('#feastPc',{scale:3.2},{scale:.5,duration:.7,ease:'none'},tEat);
tl.fromTo('#feastPc',{rotation:0},{rotation:-720,duration:.7,ease:'none'},tEat);
tl.set('#feastPc',{opacity:0},tEat+.7);
KG.m(tEat+.3,'mBg');KG.eyes(tEat+.3,'wide');
KG.m(tEat+.75,'mSm');KG.eyes(tEat+.8,'happy');
tl.to('#kgBelly',{scale:1.4,duration:.35,ease:'back.out(2)'},tEat+.75);
tl.fromTo('#kgSq',{y:0},{y:-24,duration:.12,yoyo:true,repeat:5},tEat+.8);
sparks(tEat+.75,KX,FLOOR-420,8,140);hearts(tEat+.9,KX,FLOOR-760,5,100,260);
KG.talk(L[6]+.02,L[6]+DU[6]-.1,'mBg','mSm',.14);KG.eyes(L[6]+.05,'happy');
tl.to('#kgArmL',{rotation:100,duration:.3},W(6,3));tl.to('#kgArmR',{rotation:0,duration:.2},W(6,3));
GS4.forEach((g,i)=>hop(`#${GN[i]}Sq`,tEat+.9+i*.08,90,.2,.25));
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq'].forEach((s,i)=>hop(s,tEat+1.0+i*.04,60,.14,.2));
tl.set('#griddle',{opacity:0},tEat+.9);

/* ================= SCENE 7: "They waved goodbye and flew back to Earth." ================= */
GS4.forEach((g,i)=>{tl.fromTo(`#${GN[i]}ArmL`,{rotation:60},{rotation:150,duration:.2,yoyo:true,repeat:11},L[7]+i*.05);g.m(L[7],'mSm');g.eyes(L[7],'happy');});
tl.fromTo('#kgArmL',{rotation:100},{rotation:150,duration:.24,yoyo:true,repeat:9},L[7]);
armsDown(tGo.gm-.05,.2);tl.set('#boSweat',{opacity:0},tGo.gm);
let tEnd=0;
Object.keys(tGo).forEach(p=>{tEnd=Math.max(tEnd,enterG(p,tGo[p],p==='gm'||p==='bo'||p==='pt'?1000:700));});
tl.to('#gh',{x:DOORG,y:FLOOR-140,scale:.05,duration:.8,ease:'power2.in'},17.9);tl.set('#gh',{opacity:0},18.75);
faces(tGo.gm,'happy','Big');
// lift-off
tl.to('#ufoLIn',{y:-1000,scale:.25,rotation:10,duration:.45,ease:'power2.in'},tLift);
dust(tLift,500,FLOOR+6,1.6);dust(tLift+.03,640,FLOOR+6,1.6);shake(tLift,10,6);

/* ================= SCENE 8: home — "Home sweet kitchen!" ================= */
tl.fromTo('#flash',{opacity:.85},{opacity:0,duration:.4},tKit);
tl.set('#gloopSet',{opacity:0},tKit);tl.set('#table,#plate,#oven',{opacity:1},tKit);
tl.set('#kg,#kcrn,#g1,#g2,#g3,#g4,#litter,#griddle,#feastPc',{opacity:0},tKit);
camSet(tKit,...CAM.wide2);
tl.set('#ufoL',{x:880,y:FLOOR,opacity:1},tKit);
tl.fromTo('#ufoLIn',{y:-1100,scale:1,rotation:-8},{y:0,scale:1,rotation:0,duration:.35,ease:'power2.in'},tKit);
dust(tKit+.35,720,FLOOR+6,1.5);dust(tKit+.37,1040,FLOOR+6,1.5);shake(tKit+.35,9,5);
tl.set('#gh',{opacity:1,x:1200,y:FLOOR-760,scale:.9},tKit+.4);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.7,yoyo:true,repeat:30,ease:'sine.inOut'},tKit+.4);
Object.keys(tOut).forEach(p=>{exitK(p,tOut[p]);});
tl.set('#bh',{opacity:1},tKit);
faces(tKit+.6,'happy','Big');
bm(L[8]-.05,'mBig');tl.fromTo('#boSq',{y:0},{y:-30,duration:.14,yoyo:true,repeat:5,ease:'power1.out'},L[8]+.5);
hearts(L[8]+.7,KITX.bo,FLOOR-600,4,90,220);

/* ================= SCENE 9: "But somebody had sneaked into Bo's scarf!" ================= */
camTo(L[9]-.3,1.2,...CAM.bo,'power2.inOut');
tl.set('#g5',{opacity:1,x:KITX.bo+75,y:FLOOR-215,scale:.34},L[9]-.05);
tl.fromTo('#g5',{rotation:-8},{rotation:8,duration:.1,yoyo:true,repeat:21},L[9]);tl.set('#g5',{rotation:0},L[9]+2.3);
tl.fromTo('#boScarfTail',{rotation:-10},{rotation:10,duration:.1,yoyo:true,repeat:21},L[9]);
tl.fromTo('#g5AntL',{rotation:-20},{rotation:20,duration:.12,yoyo:true,repeat:17},L[9]);tl.fromTo('#g5AntR',{rotation:20},{rotation:-20,duration:.12,yoyo:true,repeat:17},L[9]);
G5.eyes(L[9],'wide');G5.m(L[9],'mSm');
eyesMode(L[9]+.4,'normal');bm(L[9]+.4,'mOpen');look(L[9]+.4,18,22,.2);brows(L[9]+.4,-8,8,-6,.15);
tl.fromTo('#boSq',{scaleY:1},{scaleY:.96,duration:.1,yoyo:true,repeat:9},L[9]+.6);
faces(L[9]+.6,'wide','O');eyesMode(L[9]+.6,'normal');bm(L[9]+.6,'mOpen');

/* ================= SCENE 10: the stowaway: "Pancake, please?" ================= */
tl.fromTo('#g5',{x:KITX.bo+75},{x:KITX.bo+185,duration:.55,ease:'none'},tHopOut);
arc('#g5',tHopOut,.55,FLOOR-215,160,FLOOR);
tl.fromTo('#g5',{scale:.34},{scale:.5,duration:.55,ease:'none'},tHopOut);
tl.fromTo('#g5Sq',{scaleY:.8,scaleX:1.15},{scaleY:1,scaleX:1,duration:.4,ease:'elastic.out(1,.4)'},tHopOut+.55);
dust(tHopOut+.55,KITX.bo+185,FLOOR+6,.6);
G5.m(L[10]-.05,'mBg');G5.talk(L[10]+.02,L[10]+DU[10]-.05,'mBg','mOp',.15);G5.eyes(L[10],'wide');G5.look(L[10],0,-26,.2);
tl.to('#g5ArmL',{rotation:150,duration:.2},L[10]);tl.to('#g5ArmR',{rotation:-150,duration:.2},L[10]);
tl.fromTo('#g5AntL',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[10]);tl.fromTo('#g5AntR',{rotation:14},{rotation:-14,duration:.14,yoyo:true,repeat:11},L[10]);
look(tHopOut+.5,28,12,.2);eyesMode(tHopOut+.6,'normal');bm(tHopOut+.6,'mSmile');
hearts(L[10]+.3,KITX.bo+185,FLOOR-300,3,60,160);
['tf','nm','cm','mc','zp','bp','pt','gm'].forEach(p=>{const m=({tf:TF,nm:NN,cm:CM,mc:MC,zp:ZP,bp:BP,pt:PT,gm:GM})[p];m.eyes(L[10]+.2,'happy');m.m(L[10]+.2,'mSm');});

/* ================= SCENE 11: Bo: "Okay... just one tiny bite!" — he shares ================= */
camTo(L[11]-.6,1.0,...CAM.fin,'power2.inOut');
tl.set('#feastPc',{opacity:1,x:KITX.bo+310,y:FLOOR,scale:.2},tPlate);
tl.fromTo('#feastPc',{scale:.2},{scale:1.0,duration:.4,ease:'back.out(2.4)'},tPlate);sparks(tPlate+.2,KITX.bo+310,FLOOR-160,6,110);
bm(L[11]-.05,'mBig');tl.fromTo('#boSq',{y:0},{y:-30,duration:.14,yoyo:true,repeat:5,ease:'power1.out'},L[11]);
kslice(tBite,KITX.bo+310,FLOOR-120,KITX.bo+185,FLOOR-190,.5,1.0);
G5.m(tBite+.5,'mBg');G5.eyes(tBite+.5,'happy');G5.m(tBite+.85,'mSm');hop('#g5Sq',tBite+.55,50,.12,.16);
hearts(tBite+.7,KITX.bo+185,FLOOR-330,6,110,260);sparks(tBite+.6,KITX.bo+185,FLOOR-250,8,120);
armsUp(tBite+.7,.15);faces(tBite+.7,'happy','Big');
tl.fromTo('#boSq',{y:0},{y:-40,duration:.14,yoyo:true,repeat:7,ease:'power1.out'},tBite+.8);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

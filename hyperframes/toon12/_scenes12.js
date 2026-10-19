/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={cock:[640,0,.74], wide:[480,-260,.66], par:[1000,-150,.8], king:[440,-440,.6], wide2:[380,-330,.6]};
const LEFTX={mc:640,cm:720,nm:790,tf:870,zp:950,bp:1030}, RIGHTX={pt:1900,gm:2050};   // the gang splits in two so the middle is free for the parade and the King
const DOOR=620, RAMP_B=750;                                // the landed saucer (x=560): doorway / bottom of the ramp
const GLX={mc:900,cm:1010,nm:1100,tf:1210,zp:1310,bp:1420,bo:1530,pt:1650,gm:1830};      // where everybody stands on Gloop
const CKS={mc:.68,cm:.76,nm:.5,tf:.74,zp:.6,bp:.62,bo:.88,pt:.7,gm:1.5};
const tCut=.85;                                            // the cut from the cockpit to the planet surface
const tExit={bp:1.0,zp:1.25,bo:1.5,mc:1.75,tf:2.0,cm:2.25,nm:2.5,pt:2.75,gm:3.0};
const tPop=W(2,3);                                         // Gloopians pop out of the ground: "EVERYTHING"
const tJump=L[3];
const tCrown=W(7,1);                                       // the crowning
const tPar0=W(7,3), tPar1=L[8]+.2;                         // the parade
const tCook=L[8];
const tQuake=L[9]+.4;
const tKing=L[10]-.5;
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
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
const armsUp=(t,d=.15)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
const gArms=(t,l,r,d=.2)=>GN.forEach(g=>{tl.to(`#${g}ArmL`,{rotation:l,duration:d},t);tl.to(`#${g}ArmR`,{rotation:r,duration:d},t);});
const faces=(t,eyes,mouth)=>{                              // eyes: wide|normal|happy   mouth: O|Big|Sm|Fr
 const m={O:['mO','mO'],Big:['mBg','mBig'],Sm:['mSm','mSmile'],Fr:['mFr','mFrown']}[mouth];
 eyesMode(t,eyes==='happy'?'hearts':eyes);bm(t,m[1]);FB.pm(t,{O:'Oh',Big:'Gr',Sm:'Sm',Fr:'Wo'}[mouth]);
 TF.eyes(t,eyes);TF.m(t,m[0]);NN.eyes(t,eyes);NN.m(t,m[0]);cmEyes(t,eyes);CM.m(t,m[0]);mcEyes(t,eyes);MC.m(t,m[0]);
 GM.eyes(t,eyes);GM.m(t,m[0]);BP.eyes(t,eyes);BP.m(t,m[0]);ZP.eyes(t,eyes);ZP.m(t,m[0]);PT.eyes(t,eyes);PT.m(t,m[0]);GH.eyes(t,eyes);GH.m(t,m[0]);
 GS4.forEach(g=>{g.eyes(t,eyes);g.m(t,m[0]);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let ksn=0;
function kslice(t,x0,y0,x1,y1,dur=.6,sc=1){const i=(ksn++)%8;
 tl.set('#ksw'+i,{x:x0,y:y0},t);
 tl.fromTo('#ks'+i,{opacity:1,x:0,rotation:-20,scale:sc*.9},{x:x1-x0,rotation:340,duration:dur,ease:'none'},t);
 tl.fromTo('#ks'+i,{y:0},{y:-260,duration:dur*.45,ease:'power2.out'},t).to('#ks'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#ks'+i,{opacity:0},t+dur);}
// a friend steps out of the saucer: tiny at the doorway, normal size at the bottom of the ramp, then walks to its spot
function exitS(p,t0,spd=700){const id='#'+p,s=CKS[p],x1=GLX[p],d=Math.abs(x1-RAMP_B)/spd;
 tl.set(id,{opacity:1,x:DOOR,y:FLOOR-110,scale:s*.07},t0);
 tl.fromTo(id,{x:DOOR},{x:RAMP_B,duration:.5,ease:'power1.out'},t0);
 tl.fromTo(id,{y:FLOOR-110},{y:FLOOR,duration:.5,ease:'none'},t0);
 tl.fromTo(id,{scale:s*.07},{scale:s,duration:.5,ease:'back.out(1.8)'},t0);
 tl.fromTo(id,{x:RAMP_B},{x:x1,duration:d,ease:'sine.out'},t0+.5);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0+.5,t0+.5+d,.28,22,10,`#${p}Sq`,8);
 sparks(t0+.05,DOOR,FLOOR-120,3,40);return t0+.5+d;}
// a Gloopian pops out of the jelly ground
function popUp(g,x,t){const id='#'+g;
 tl.set(id,{opacity:1,x,y:FLOOR+300,scale:.5},t);
 tl.fromTo(id,{y:FLOOR+300},{y:FLOOR,duration:.5,ease:'back.out(2.2)'},t);
 tl.fromTo(`#${g}Sq`,{scaleY:1.3,scaleX:.8},{scaleY:1,scaleX:1,duration:.45,ease:'elastic.out(1,.4)'},t+.3);
 sparks(t+.3,x,FLOOR-20,4,70);}

/* ================= SCENE 0: the last frame of video #11 — the cockpit, the jelly planet fills the porthole ================= */
camSet(0,...CAM.cock);
faces(0,'happy','Big');
tl.fromTo('#gloopW',{scale:1.05},{scale:1.12,duration:.4,yoyo:true,repeat:1},0);
// the cut: out into the sunshine of Planet Gloop
tl.fromTo('#flash',{opacity:.9},{opacity:0,duration:.5},tCut);
tl.set('#cockpit',{opacity:0},tCut);tl.set('#gloopSet',{opacity:1},tCut);
tl.set('#ufoL',{opacity:1},tCut);
camSet(tCut,...CAM.wide);
ALL.concat(['bo']).forEach(p=>tl.set('#'+p,{opacity:0},tCut));
tl.set('#gh',{x:700,y:FLOOR-680,scale:.9},tCut);
armsDown(tCut-.02,.01);tl.set('#boArmL',{rotation:0},tCut);tl.set('#boArmR',{rotation:0},tCut);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.7,yoyo:true,repeat:30,ease:'sine.inOut'},tCut);
tl.fromTo('.mush',{rotation:-1.5},{rotation:1.5,duration:1.2,yoyo:true,repeat:25,ease:'sine.inOut'},tCut);
tl.fromTo('.fb',{y:0},{y:-140,duration:3.5,repeat:8,ease:'sine.inOut',yoyo:true},tCut);
faces(tCut+.1,'normal','Sm');

/* ================= SCENE 1: "They stepped out onto Planet Gloop!" — one by one they step out of the saucer and grow back to size ================= */
let tEnd=0;
['bp','zp','bo','mc','tf','cm','nm','pt'].forEach(p=>{tEnd=Math.max(tEnd,exitS(p,tExit[p]));});
// Gumdrop squeezes out last with a POP
exitS('gm',tExit.gm,900);
tl.fromTo('#gmSq',{scaleX:1.5,scaleY:.7},{scaleX:1,scaleY:1,duration:.5,ease:'elastic.out(1,.4)'},tExit.gm+.5);shake(tExit.gm+.45,8,4);dust(tExit.gm+.5,RAMP_B,FLOOR+6,1.3);
// Boo floats out through the roof
tl.to('#gh',{x:1000,y:FLOOR-760,scale:.9,duration:1.4,ease:'sine.inOut'},tExit.bo);
faces(tExit.bo+.5,'wide','O');lookAll(tExit.bo+.5,6,-14);
faces(tExit.pt+.5,'happy','Big');

/* ================= SCENE 2: Blip: "Hello, my friends! Everything here is jelly!" — and the Gloopians pop out ================= */
BP.m(L[2]-.05,'mBg');BP.talk(L[2]+.02,L[2]+DU[2]-.08,'mBg','mSm',.13);BP.eyes(L[2],'happy');
tl.to('#bpArmL',{rotation:150,duration:.15},L[2]);tl.to('#bpArmR',{rotation:-150,duration:.15},L[2]);tl.to('#bpArmL',{rotation:0,duration:.25},L[2]+DU[2]);tl.to('#bpArmR',{rotation:0,duration:.25},L[2]+DU[2]);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.16,yoyo:true,repeat:19},L[2]);tl.fromTo('#bpAntR',{rotation:16},{rotation:-16,duration:.16,yoyo:true,repeat:19},L[2]);tl.set('#bpAntL,#bpAntR',{rotation:0},L[2]+3.3);
tl.fromTo('#bpSq',{y:0},{y:-40,duration:.14,yoyo:true,repeat:9,ease:'power1.out'},L[2]);
// jelly: everything wobbles, kids pop out
['mc','cm','nm','tf','zp','bo'].forEach((p,i)=>{tl.fromTo(`#${p}Sq`,{scaleY:1},{scaleY:.85,duration:.12,yoyo:true,repeat:1},tPop+i*.05);hop(`#${p}Sq`,tPop+.2+i*.05,50,.15,.2);});
[['g1',1100],['g2',1360],['g3',1590],['g4',1760]].forEach(([g,x],i)=>popUp(g,x,tPop+i*.18));
faces(tPop,'wide','O');
GS4.forEach((g,i)=>{g.eyes(tPop+.4+i*.18,'happy');g.m(tPop+.4+i*.18,'mBg');});gArms(tPop+.5,150,-150,.2);
GS4.forEach((g,i)=>{tl.fromTo(`#${g.id||GN[i]}Sq`,{y:0},{y:-60,duration:.16,yoyo:true,repeat:7,ease:'power1.out'},tPop+.8+i*.1);});
GS4.forEach((g,i)=>{tl.fromTo(`#${GN[i]}AntL`,{rotation:-18},{rotation:18,duration:.14,yoyo:true,repeat:15},tPop+.6);tl.fromTo(`#${GN[i]}AntR`,{rotation:18},{rotation:-18,duration:.14,yoyo:true,repeat:15},tPop+.6);});
sparks(tPop+.5,1400,FLOOR-300,8,420);

/* ================= SCENE 3: Bo: "Boing! I can jump so high!" — low gravity ================= */
armsUp(tJump-.05,.1);
[['bo',900],['nm',760],['cm',820],['tf',420],['zp',600],['bp',700]].forEach(([p,h],i)=>{
 for(let k=0;k<2;k++) {const t=tJump+i*.04+k*1.35;tl.fromTo(`#${p}Sq`,{scaleY:1},{scaleY:.8,duration:.1},t-.1).to(`#${p}Sq`,{scaleY:1,duration:.05},t);hop(`#${p}Sq`,t,h,.62,.7);}});
hop('#mcSq',tJump+.1,140,.3,.35);
faces(tJump,'happy','Big');bm(tJump-.05,'mBig');
tl.set('#boSweat',{opacity:0},0);
for(let k=0;k<2;k++) {dust(tJump+1.3+k*1.35,GLX.bo,FLOOR+6,1.1);dust(tJump+1.32+k*1.35,GLX.nm,FLOOR+6,.8);}
GS4.forEach((g,i)=>hop(`#${GN[i]}Sq`,tJump+.2+i*.1,140,.4,.45));
armsDown(tJump+2.9,.3);
BP.m(L[3]+.1,'mBg');

/* ================= SCENE 4: "The little Gloopians had never seen a pancake!" ================= */
camTo(L[4]-.3,1.2,...CAM.par,'power2.inOut');
[['g1',1360],['g2',1430],['g3',1640],['g4',1710]].forEach(([g,x],i)=>{tl.fromTo(`#${g}`,{x:[1100,1360,1590,1760][i]},{x,duration:.8,ease:'sine.inOut'},L[4]+i*.05);
 cycle([`#${g}LegL`,`#${g}LegR`],[`#${g}ArmL`,`#${g}ArmR`],L[4]+i*.05,L[4]+.8+i*.05,.3,24,10,`#${g}Sq`,8);});
GS4.forEach((g,i)=>{g.look(L[4]+.5,26-i*14,-30,.2);g.eyes(L[4]+.5,'wide');g.m(L[4]+.5,'mO');});
gArms(L[4]+.9,0,0,.3);
look(L[4],0,0,.1);bm(L[4],'mOpen');eyesMode(L[4],'wide');tl.set('#boSweat',{opacity:1},L[4]+.8);FB.pm(L[4]+.5,'Wo');
['tf','nm','cm','mc','zp','bp','pt','gm'].forEach(p=>{const m=({tf:TF,nm:NN,cm:CM,mc:MC,zp:ZP,bp:BP,pt:PT,gm:GM})[p];m.eyes(L[4]+.2,'normal');m.m(L[4]+.2,'mO');});

/* ================= SCENE 5: the Gloopians: "Ooh! The Great Round One!" — they bow ================= */
GS4.forEach((g,i)=>{g.m(L[5]-.05,'mBg');g.talk(L[5]+.02,L[5]+DU[5]-.05,'mBg','mOp',.13);g.eyes(L[5],'happy');});
GN.forEach((g,i)=>{tl.to(`#${g}Sq`,{scaleY:.7,duration:.25,ease:'power2.out'},L[5]+.3+i*.06);tl.to(`#${g}Sq`,{scaleY:1,duration:.3},L[5]+1.2);});
gArms(L[5]+.3,150,-150,.2);gArms(L[5]+1.3,0,0,.3);
GN.forEach((g,i)=>{tl.fromTo(`#${g}AntL`,{rotation:-24},{rotation:24,duration:.12,yoyo:true,repeat:9},L[5]);tl.fromTo(`#${g}AntR`,{rotation:24},{rotation:-24,duration:.12,yoyo:true,repeat:9},L[5]);});
hearts(L[5]+.5,1530,FLOOR-520,4,80,200);

/* ================= SCENE 6: Flapjack: "Um... I'm just a pancake?" ================= */
FB.pm(L[6]-.05,'Wo');tl.to('#bhArmL',{rotation:-100,duration:.15},L[6]);tl.to('#bhArmR',{rotation:100,duration:.15},L[6]);
tl.fromTo('#bhShake',{rotation:-6},{rotation:6,duration:.08,yoyo:true,repeat:15},L[6]);tl.set('#bhShake',{rotation:0},L[6]+1.4);
tl.to('#bhArmL',{rotation:-40,duration:.2},L[6]+DU[6]);tl.to('#bhArmR',{rotation:40,duration:.2},L[6]+DU[6]);
tl.to('.boEye',{scaleY:1},L[6]);brows(L[6],-10,10,-4,.15);
tl.to('#boLean',{rotation:5,duration:.3},L[6]);tl.to('#boLean',{rotation:0,duration:.3},L[6]+DU[6]);
GS4.forEach(g=>{g.eyes(L[6],'happy');g.m(L[6],'mSm');});

/* ================= SCENE 7: "They crowned him king of the jelly!" — a parade on a litter ================= */
const LX0=1250, LX1=1520;
const tSplit=tCrown-.7;
camTo(tSplit-.2,.9,...CAM.wide2,'power2.inOut');
Object.entries(LEFTX).forEach(([p,x],i)=>{tl.to(`#${p}`,{x,duration:.9,ease:'sine.inOut'},tSplit+i*.03);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],tSplit+i*.03,tSplit+i*.03+.9,.3,20,8,`#${p}Sq`,7);});
Object.entries(RIGHTX).forEach(([p,x],i)=>{tl.to(`#${p}`,{x,duration:.9,ease:'sine.inOut'},tSplit+i*.03);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],tSplit+i*.03,tSplit+i*.03+.9,.3,20,8,`#${p}Sq`,7);});
tl.to('#bo',{x:1800,duration:.8,ease:'sine.inOut'},tCrown+.4);cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tCrown+.4,tCrown+1.2,.3,22,10,'#boSq',8);
tl.set('#litter',{opacity:1,x:LX0,y:FLOOR-235},tCrown-.4);
[[ 'g1',-135],['g2',-45],['g3',45],['g4',135]].forEach(([g,off],i)=>{
 tl.fromTo(`#${g}`,{x:[1360,1430,1640,1710][i]},{x:LX0+off,duration:.5,ease:'sine.inOut'},tCrown-.5);
 tl.to(`#${g}ArmL`,{rotation:150,duration:.2},tCrown-.1);tl.to(`#${g}ArmR`,{rotation:-150,duration:.2},tCrown-.1);});
// Flapjack hops from Bo's head onto the litter
tl.set('#bh',{opacity:0},tCrown);
tl.set('#pan',{opacity:1,x:GLX.bo,y:1112,scale:.78},tCrown);
tl.fromTo('#pan',{x:GLX.bo},{x:LX0,duration:.6,ease:'none'},tCrown);arc('#pan',tCrown,.6,1112,230,FLOOR-235-14);tl.fromTo('#pan',{scale:.78},{scale:1.4,duration:.6,ease:'none'},tCrown);
FJ.pm(tCrown,'Gr');FJ.look(tCrown,-10,0,.1);
tl.set('#crwn',{opacity:1},tCrown+.62);tl.set('#crwnW',{x:LX0,y:FLOOR-235-14-250},tCrown+.62);
tl.fromTo('#crwn',{scale:.2,y:-120},{scale:1.5,y:0,duration:.35,ease:'back.out(2.4)'},tCrown+.62);
sparks(tCrown+.7,LX0,FLOOR-520,8,140);hearts(tCrown+.8,LX0,FLOOR-540,4,80,200);
eyesMode(tCrown,'happy');bm(tCrown,'mBig');
// the parade: the litter bobs along to the right
const dPar=tPar1-tPar0;
tl.fromTo('#litter',{x:LX0},{x:LX1,duration:dPar,ease:'sine.inOut'},tPar0);
tl.fromTo('#pan',{x:LX0},{x:LX1,duration:dPar,ease:'sine.inOut'},tPar0);
tl.fromTo('#crwnW',{x:LX0},{x:LX1,duration:dPar,ease:'sine.inOut'},tPar0);
[['g1',-135],['g2',-45],['g3',45],['g4',135]].forEach(([g,off])=>{tl.fromTo(`#${g}`,{x:LX0+off},{x:LX1+off,duration:dPar,ease:'sine.inOut'},tPar0);
 cycle([`#${g}LegL`,`#${g}LegR`],[],tPar0,tPar0+dPar,.32,22,0,`#${g}Sq`,12);});
for(let k=0,t=tPar0;t<tPar1-.2;k++,t+=.42){tl.fromTo('#litterIn',{y:0},{y:-12,duration:.2,yoyo:true,repeat:1},t);tl.fromTo('#pan',{scaleY:1.4},{scaleY:1.32,duration:.1,yoyo:true,repeat:1},t);}
confetti12(tPar0,1000,2100);
// the rest of the gang cheers and follows
faces(tPar0,'happy','Big');GS4.forEach(g=>{g.eyes(tPar0,'happy');g.m(tPar0,'mBg');});
['mc','cm','nm','tf','zp','bp','pt','gm'].forEach((p,i)=>hop(`#${p}Sq`,tPar0+.1+i*.05,34,.12,.18));
FJ.pm(tPar0,'Sm');
function confetti12(t0,xa,xb){for(let k=0;k<16;k++){const tt=t0+k*.2;sparks(tt,xa+((k*137)%100)/100*(xb-xa),FLOOR-500-((k*53)%7)*30,2,60);}}

/* ================= SCENE 8: Truffle: "Pancakes for everybody!" ================= */
tl.set('#tfLadle',{opacity:1},tCook-.2);tl.to('#tfArmR',{rotation:-60,duration:.2},tCook-.2);tl.fromTo('#tfArmR',{rotation:-60},{rotation:-110,duration:.15,yoyo:true,repeat:9},tCook);
TF.m(tCook-.05,'mBg');TF.talk(tCook+.02,tCook+DU[8]-.08,'mBg','mSm',.13);TF.eyes(tCook,'happy');
tl.fromTo('#tfSq',{scaleY:1},{scaleY:1.05,duration:.12,yoyo:true,repeat:11},tCook);
for(let i=0;i<5;i++){const t=tCook+.5+i*.28;
 const tx=1620+((i*131)%4)*80;
 kslice(t,GLX.tf,FLOOR-340,tx,FLOOR-170,.6,1);
 const g=GS4[i%4];g.m(t+.55,'mBg');g.m(t+.9,'mSm');hop(`#${GN[i%4]}Sq`,t+.58,40,.1,.15);}
hearts(tCook+.6,GLX.tf,FLOOR-520,4,80,200);
tl.to('#tfArmR',{rotation:0,duration:.25},tCook+2.0);tl.set('#tfLadle',{opacity:0},tCook+2.0);
// the parade ends; Flapjack gets a slice, too
tl.fromTo('#pan',{scaleY:1.4},{scaleY:1.32,duration:.12,yoyo:true,repeat:5},tCook);
BP.eyes(tCook,'happy');BP.m(tCook,'mBg');

/* ================= SCENE 9: "But then... the ground began to wobble!" ================= */
camTo(tQuake-.3,1.2,...CAM.wide2,'power2.inOut');
shake(tQuake,10,10);for(let k=1;k<7;k++) shake(tQuake+k*.45,8+k,8);
tl.fromTo('#gloopSet',{y:0},{y:14,duration:.09,yoyo:true,repeat:29,ease:'sine.inOut'},tQuake);tl.set('#gloopSet',{y:0},tQuake+2.8);
tl.fromTo('.mush',{rotation:-8},{rotation:8,duration:.14,yoyo:true,repeat:21,ease:'sine.inOut'},tQuake);
['bo','tf','nm','cm','mc','zp','bp','pt','gm'].forEach((p,i)=>tl.fromTo(`#${p}Sq`,{x:-5},{x:5,duration:.06,yoyo:true,repeat:35},tQuake+i*.02));tl.set(SQ_ALL(),{x:0},tQuake+2.5);
function SQ_ALL(){return ['bo','tf','nm','cm','mc','zp','bp','pt','gm'].map(p=>`#${p}Sq`).join(',');}
faces(tQuake,'wide','O');armsUp(tQuake+.2,.15);
GS4.forEach(g=>{g.eyes(tQuake,'wide');g.m(tQuake,'mBg');});gArms(tQuake+.1,150,-150,.15);
tl.set('#litter',{opacity:0},tQuake+.3);tl.set('#pan',{opacity:0},tQuake+.3);tl.set('#crwn',{opacity:0},tQuake+.3);tl.set('#bh',{opacity:1},tQuake+.3);
tl.fromTo('#crack',{opacity:0},{opacity:1,duration:.4},tQuake+1.0);
GN.forEach((g,i)=>{tl.to(`#${g}`,{y:FLOOR+300,duration:.35,ease:'power2.in'},tQuake+1.6+i*.08);});    // the Gloopians dive back into the ground
sparks(tQuake+1.2,1500,FLOOR-20,6,120);

/* ================= SCENE 10: the Gloop King: "Pancakes? Then you must stay forever!" ================= */
camTo(tKing-.4,1.4,...CAM.king,'power2.inOut');
const KX=1400, KS=1.5;
tl.set('#kg',{opacity:1,x:KX,y:FLOOR+800,scale:KS},tKing);
tl.to('#kg',{y:FLOOR,duration:1.1,ease:'power3.out'},tKing);
tl.set('#kcrnW',{x:KX,y:FLOOR+800-505*KS},tKing);tl.set('#kcrn',{opacity:1},tKing);
tl.to('#kcrnW',{y:FLOOR-505*KS,duration:1.1,ease:'power3.out'},tKing);
sparks(tKing+.3,KX,FLOOR-30,10,200);sparks(tKing+.8,KX,FLOOR-30,10,260);shake(tKing+.1,14,10);shake(tKing+.9,12,8);
dust(tKing+.9,KX-130,FLOOR+6,2);dust(tKing+.95,KX+130,FLOOR+6,2);
KG.eyes(tKing+.6,'wide');KG.m(tKing+.6,'mBg');KG.brows(tKing+.6,12,-12,-4,.1);
tl.to('#kgArmL',{rotation:150,duration:.2},tKing+.9);tl.to('#kgArmR',{rotation:-150,duration:.2},tKing+.9);
KG.talk(L[10]+.02,L[10]+DU[10]-.08,'mBg','mOp',.15);KG.look(L[10],-30,10,.2);
tl.fromTo('#kgSq',{scaleY:1},{scaleY:1.04,duration:.18,yoyo:true,repeat:15},L[10]);
tl.fromTo('#kgAntL',{rotation:-14},{rotation:14,duration:.2,yoyo:true,repeat:15},L[10]);tl.fromTo('#kgAntR',{rotation:14},{rotation:-14,duration:.2,yoyo:true,repeat:15},L[10]);
// everybody cowers
faces(tKing+.7,'wide','O');['tf','nm','cm','mc','zp','bp'].forEach((p,i)=>tl.to(`#${p}`,{x:`-=${30+i*6}`,duration:.4,ease:'power2.out'},tKing+.9));
['bo','pt','gm'].forEach((p,i)=>tl.to(`#${p}`,{x:`+=${30+i*10}`,duration:.4,ease:'power2.out'},tKing+.9));
tl.set('#boSweat',{opacity:1},tKing+1.0);tl.to('#tfSweat',{opacity:1,duration:.1},tKing+1.0);
tl.to('#crack',{opacity:0,duration:.3},tKing+.6);

/* ================= SCENE 11: Bo: "Uh-oh... just one tiny problem!" ================= */
camTo(L[11]-.3,1.0,...[600,-380,.62],'power2.inOut');
bm(L[11]-.05,'mBig');tl.fromTo('#boSq',{y:0},{y:-12,duration:.1,yoyo:true,repeat:11},L[11]);
tl.to('#boLean',{rotation:-6,duration:.2},L[11]);
tl.fromTo('#kgSq',{scaleY:1},{scaleY:1.03,duration:.3,yoyo:true,repeat:9},L[11]);KG.m(L[11],'mSm');KG.eyes(L[11],'happy');KG.brows(L[11],0,0,0,.1);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

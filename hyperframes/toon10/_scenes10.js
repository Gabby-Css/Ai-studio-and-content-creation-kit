/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={win:[200,260,1.45], wide:[480,-260,.66], tab:[420,420,.95], fin:[220,-470,.58]};
const CKX=1060, CS=1.15, TBX=1010;                          // the cake on the floor / on the table
const PARTY={cm:560,nm:690,mc:820,pt:1290,tf:1510,zp:1620,bp:1710,bo:1400};   // where everybody stands round the cake
const OLD={cm:1090,nm:1250,mc:1570,tf:1410,zp:1450,bp:1640,bo:1740};
const tSw=.4;                                              // swish from the window shot
const tSq=W(1,2), tTaDa=W(1,6);                            // Peanut squeezes in / the cake pops onto the table
const tHB=W(2,2), tRem=W(2,4);                             // "BO!" trumpet / "I remember"
const tGather=W(4,1), tPush=W(4,4);                        // everyone gathers / the cake slides off the table
const tSpr=W(5,4)-.5;                                      // sprinkles
const tCandles=W(6,3);                                     // candles light up
const tWish=L[7]+.1, tBite=W(7,3), tBlow=L[7]+DU[7]-.05;
const tCousins=W(8,3);
const tShare=L[9]+.1;
const tYum=L[10]+.05;
const tFin=L[11];
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
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const run=(id,sq,legs,arms,x0,x1,t0,dur,amp,bob,ease='none')=>{tl.fromTo(id,{x:x0},{x:x1,duration:dur,ease},t0);cycle(legs,arms,t0,t0+dur,.2,amp,amp*.8,sq,bob);};
const ghArms=(t,l,r,d=.2)=>{tl.to('#ghArmL',{rotation:l,duration:d},t);tl.to('#ghArmR',{rotation:r,duration:d},t);};
const gmArms=(t,l,r,d=.2)=>{tl.to('#gmArmL',{rotation:l,duration:d},t);tl.to('#gmArmR',{rotation:r,duration:d},t);};
const ALL=['tf','nm','mc','cm','gm','bp','zp','pt'];
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
const armsUp=(t,d=.15)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let spn=0;
function sprinkle(t,x,yt,yb,n=8){for(let k=0;k<n;k++){const i=(spn++)%18,xx=x+((k*37)%160)-80,tt=t+k*.07;
 tl.set('#spw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#spr'+i,{opacity:1,y:0,rotation:0},{y:yb-yt,rotation:360+(k%3)*90,duration:.7,ease:'power1.in'},tt);
 tl.set('#spr'+i,{opacity:0},tt+.7);}}
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
let ksn=0;
function kslice(t,x0,y0,x1,y1,dur=.6,sc=1){const i=(ksn++)%8;
 tl.set('#ksw'+i,{x:x0,y:y0},t);
 tl.fromTo('#ks'+i,{opacity:1,x:0,rotation:-20,scale:sc*.9},{x:x1-x0,rotation:340,duration:dur,ease:'none'},t);
 tl.fromTo('#ks'+i,{y:0},{y:-200,duration:dur*.45,ease:'power2.out'},t).to('#ks'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#ks'+i,{opacity:0},t+dur);}

/* ================= SCENE 0: the last frame of video #9 — the window shot, Peanut's silhouette with balloons ================= */
camSet(0,...CAM.win);
GH.eyes(0,'wide');GH.m(0,'mO');GH.look(0,-26,-14,.01);
eyesMode(0,'wide');bm(0,'mO');look(0,-20,-10,.01);
tl.fromTo('#peanutIn',{rotation:-1.5},{rotation:1.5,duration:.3,yoyo:true,repeat:1},0);
camTo(tSw,.7,...CAM.wide,'power3.inOut');
tl.to('#night',{opacity:0,duration:.8},tSw+.2);
tl.to('#gh',{x:CKX,y:760,duration:1.0,ease:'sine.inOut'},tSw);tl.to('#ghGlow',{scale:1.1,opacity:.5,duration:.6},tSw);
tl.fromTo('#ghSq',{y:0},{y:-18,duration:.7,yoyo:true,repeat:60,ease:'sine.inOut'},tSw+1.0);
GH.eyes(tSw+.7,'happy');GH.m(tSw+.7,'mSm');
// everybody is already smiling: it is a party
eyesMode(tSw,'normal');bm(tSw,'mSmile');brows(tSw,6,-6,-4,.15);FB.pm(tSw,'Gr');
TF.eyes(tSw,'happy');TF.m(tSw,'mSm');NN.eyes(tSw,'happy');NN.m(tSw,'mSm');cmEyes(tSw,'happy');CM.m(tSw,'mSm');mcEyes(tSw,'lids');MC.m(tSw,'mSm');GM.eyes(tSw,'happy');GM.m(tSw,'mSm');BP.eyes(tSw,'happy');BP.m(tSw,'mSm');ZP.eyes(tSw,'happy');ZP.m(tSw,'mSm');
lookAll(tSw+.3,-22,-26);

/* ================= SCENE 1: "Peanut squeezed through the window with a giant cake!" ================= */
tl.set('#peanutG',{opacity:0},tSq);
tl.set('#pt',{opacity:1,x:550,y:790,scale:.45},tSq);
PT.eyes(tSq,'wide');PT.m(tSq,'mO');PT.brows(tSq,-10,10,-4,.1);
tl.fromTo('#ptSq',{scaleX:.3,scaleY:1.5},{scaleX:1,scaleY:1,duration:.45,ease:'elastic.out(1,.4)'},tSq);
tl.fromTo('#pt',{x:550},{x:790,duration:.95,ease:'none'},tSq+.05);
tl.fromTo('#pt',{y:790},{y:TT-8,duration:.95,ease:'power2.in'},tSq+.05);
tl.fromTo('#pt',{scale:.45},{scale:.5,duration:.95,ease:'none'},tSq+.05);
tl.fromTo('#ptSq',{scaleY:.8,scaleX:1.15},{scaleY:1,scaleX:1,duration:.4,ease:'elastic.out(1,.4)'},tSq+1.0);
dust(tSq+1.0,790,TT+4,.9);shake(tSq+1.0,7,4);
PT.eyes(tSq+1.0,'happy');PT.m(tSq+1.0,'mSm');
tl.fromTo('#ptHat',{rotation:-8},{rotation:8,duration:.2,yoyo:true,repeat:5},tSq+1.0);
// ta-da! the giant cake pops onto the table
tl.set('#ck',{opacity:1,x:TBX,y:TT-6,scale:.2},tTaDa);
tl.fromTo('#ck',{scale:.2},{scale:.62,duration:.4,ease:'back.out(2.2)'},tTaDa);
sparks(tTaDa+.1,TBX,TT-160,8,130);confetti(tTaDa+.05,700,1300,TT-700,TT-100,14,.4);
tl.to('#ptArmR',{rotation:-130,duration:.2,ease:'back.out(2)'},tTaDa);
PT.m(tTaDa,'mBg');
lookAll(tTaDa,-22,-34);

/* ================= SCENE 2: Peanut: "Happy birthday, Bo! I remember everything!" ================= */
camTo(L[2]-.35,.9,...CAM.tab,'power2.inOut');
PT.talk(L[2]+.02,L[2]+DU[2]-.08,'mBg','mSm',.14);PT.eyes(L[2],'happy');
tl.fromTo('#ptTrunk',{rotation:0},{rotation:-35,duration:.3,ease:'back.out(2)'},tHB-.1);tl.to('#ptTrunk',{rotation:0,duration:.35},tHB+.5);
tl.fromTo('#ptEarL',{rotation:0},{rotation:-10,duration:.18,yoyo:true,repeat:9},L[2]);tl.fromTo('#ptEarR',{rotation:0},{rotation:10,duration:.18,yoyo:true,repeat:9},L[2]);
confetti(tHB,500,1500,TT-900,TT+300,22,.5);sparks(tHB,790,TT-300,8,150);
tl.to('#ptArmR',{rotation:0,duration:.2},L[2]+.4);
tl.fromTo('#ptSq',{scaleY:1},{scaleY:1.04,duration:.2,yoyo:true,repeat:9},L[2]);
// the party-goers on the floor cheer up at the table
armsUp(tHB,.12);armsDown(tHB+.8,.3);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq'].forEach((s,i)=>hop(s,tHB+i*.03,50,.14,.2));
eyesMode(tHB,'wide');bm(tHB,'mBig');FB.pm(tHB,'Gr');
BP.m(tHB,'mBg');ZP.m(tHB,'mBg');TF.m(tHB,'mBg');NN.m(tHB,'mBg');CM.m(tHB,'mBg');MC.m(tHB,'mSm');GM.m(tHB,'mBg');

/* ================= SCENE 3: Bo: "You remembered my birthday!" ================= */
tl.fromTo('#bo',{x:OLD.bo},{x:1500,duration:.9,ease:'sine.inOut'},L[3]-.2);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],L[3]-.2,L[3]+.7,.3,28,14,'#boSq',12);
eyesMode(L[3],'hearts');bm(L[3]-.05,'mBig');
tl.fromTo('#boSq',{y:0},{y:-40,duration:.14,yoyo:true,repeat:7,ease:'power1.out'},L[3]+.7);
hearts(L[3]+.4,1500,1000,6,110,260);
tl.to('#boArmL',{rotation:-150,duration:.15},L[3]+.7);tl.to('#boArmR',{rotation:150,duration:.15},L[3]+.7);
PT.eyes(L[3],'happy');PT.m(L[3],'mSm');
tl.to('#boArmL',{rotation:0,duration:.25},L[3]+DU[3]+.2);tl.to('#boArmR',{rotation:0,duration:.25},L[3]+DU[3]+.2);

/* ================= SCENE 4: "Everybody gathered around the big pancake cake." ================= */
camTo(tGather-.3,.9,...CAM.wide,'power2.inOut');
// the gang walks to the dance... I mean party spots
[['#cm','cm',OLD.cm],['#nm','nm',OLD.nm],['#mc','mc',OLD.mc],['#tf','tf',OLD.tf],['#zp','zp',OLD.zp],['#bp','bp',OLD.bp]].forEach(([id,p,x0],i)=>{
 const x1=PARTY[p],d=.9+i*.04;
 tl.fromTo(id,{x:x0},{x:x1,duration:d,ease:'sine.inOut'},tGather+i*.03);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],tGather+i*.03,tGather+i*.03+d,.3,22,10,`#${p}Sq`,8);});
tl.fromTo('#bo',{x:1500},{x:PARTY.bo,duration:.9,ease:'sine.inOut'},tGather);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tGather,tGather+.9,.3,24,12,'#boSq',10);
eyesMode(tGather,'normal');bm(tGather,'mBig');
// Peanut shoves the cake off the table: it drops to the floor with a big bounce
tl.to('#ptArmL',{rotation:-120,duration:.15},tPush-.15);
tl.fromTo('#ck',{x:TBX},{x:CKX,duration:.7,ease:'none'},tPush);
tl.fromTo('#ck',{y:TT-6},{y:FLOOR,duration:.7,ease:'power2.in'},tPush);
tl.fromTo('#ck',{scale:.62},{scale:CS,duration:.7,ease:'none'},tPush);
tl.fromTo('#ckIn',{scaleY:1,scaleX:1},{scaleY:.8,scaleX:1.14,duration:.1,yoyo:true,repeat:1},tPush+.7);
tl.fromTo('#ckIn',{scaleY:1},{scaleY:1.07,duration:.12,yoyo:true,repeat:3},tPush+.92);
dust(tPush+.7,CKX-150,FLOOR+6,1.3);dust(tPush+.72,CKX+150,FLOOR+6,1.3);shake(tPush+.7,10,5);
arc('#pt',tPush+.1,.75,TT-8,170,FLOOR);tl.fromTo('#pt',{x:790},{x:PARTY.pt,duration:.75,ease:'none'},tPush+.1);tl.fromTo('#pt',{scale:.5},{scale:.7,duration:.75,ease:'none'},tPush+.1);
tl.fromTo('#ptSq',{scaleY:.8},{scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tPush+.85);
tl.to('#ptArmL',{rotation:0,duration:.2},tPush+.4);
dust(tPush+.85,PARTY.pt,FLOOR+6,1.1);

/* ================= SCENE 5: Truffle: "Needs a pinch more sprinkles!" ================= */
TF.m(L[5]-.05,'mBg');TF.talk(L[5]+.02,L[5]+DU[5]-.08,'mBg','mSm',.13);TF.eyes(L[5],'happy');
tl.to('#tfArmL',{rotation:150,duration:.12},L[5]);tl.fromTo('#tfArmL',{rotation:150},{rotation:100,duration:.12,yoyo:true,repeat:11},L[5]+.12);tl.to('#tfArmL',{rotation:0,duration:.2},L[5]+1.6);
sprinkle(tSpr,CKX,FLOOR-900,FLOOR-420,10);sprinkle(tSpr+.7,CKX,FLOOR-900,FLOOR-420,10);sprinkle(tSpr+1.4,CKX,FLOOR-900,FLOOR-420,8);
hearts(W(5,4),PARTY.tf,FLOOR-520,3,70,200);
tl.fromTo('#ckIn',{scaleY:1},{scaleY:1.04,duration:.1,yoyo:true,repeat:3},tSpr+.8);
lookAll(L[5],-6,-34);

/* ================= SCENE 6: "Boo made the candles glow!" ================= */
tl.to('#gh',{x:CKX+60,y:FLOOR-760,duration:.7,ease:'sine.inOut'},L[6]-.2);
GH.eyes(L[6],'happy');GH.m(L[6],'mBg');ghArms(L[6],150,-150,.2);
tl.to('#night',{opacity:.35,duration:.5},tCandles-.3);
for(let i=0;i<5;i++){
 const t=tCandles+i*.12;
 tl.fromTo('#ckF'+i,{opacity:0,scale:.2},{opacity:1,scale:1,duration:.25,ease:'back.out(2.4)'},t);
 tl.fromTo('#ckG'+i,{opacity:0,scale:.3},{opacity:.5,scale:1.4,duration:.4},t);
 tl.fromTo('#ckF'+i,{scaleY:1},{scaleY:1.2,duration:.13+i*.01,yoyo:true,repeat:60,ease:'sine.inOut'},t+.3);
 tl.fromTo('#ckG'+i,{scale:1.4},{scale:1.7,duration:.3,yoyo:true,repeat:30,ease:'sine.inOut'},t+.4);
 sparks(t+.1,CKX+[-92,-46,0,46,92][i]*CS,FLOOR-386*CS,3,50);}
sparks(tCandles+.6,CKX,FLOOR-430,8,170);
eyesMode(tCandles,'wide');bm(tCandles,'mO');
['#nmSq','#cmSq','#mcSq','#tfSq','#bpSq','#zpSq'].forEach((s,i)=>hop(s,tCandles+.1+i*.04,34,.1,.14));

/* ================= SCENE 7: Bo: "I wish for... just one tiny bite!" ================= */
tl.fromTo('#bo',{x:PARTY.bo},{x:PARTY.bo-40,duration:.7,ease:'sine.inOut'},L[7]-.5);cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],L[7]-.5,L[7]+.2,.3,20,10,'#boSq',8);
tl.to('.boEye',{scaleY:.1,duration:.1},tWish);                       // eyes squeezed shut
tl.to('#boArmL',{rotation:-60,duration:.2},tWish);tl.to('#boArmR',{rotation:60,duration:.2},tWish);
bm(tWish,'mSmile');brows(tWish,10,-10,-6,.15);
tl.to('.boEye',{scaleY:1,duration:.12},tBite);                       // ...and open
eyesMode(tBite,'wide');bm(tBite,'mBig');brows(tBite,8,-8,-8,.1);
tl.to('#boLean',{rotation:-12,duration:.3,ease:'back.out(2)'},tBite+.2);
tl.to('#boArmL',{rotation:0,duration:.2},tBite);tl.to('#boArmR',{rotation:0,duration:.2},tBite);
// he takes a deep breath and blows the candles out
tl.to('#boLean',{rotation:-18,duration:.2},tBlow-.3);bm(tBlow-.3,'mO');
for(let i=0;i<5;i++){tl.to('#ckF'+i,{opacity:0,scale:.1,duration:.15},tBlow+i*.05);tl.to('#ckG'+i,{opacity:0,duration:.2},tBlow+i*.05);dust(tBlow+i*.05,CKX+[-92,-46,0,46,92][i]*CS,FLOOR-400*CS,.3);}
tl.to('#night',{opacity:0,duration:.4},tBlow+.1);
tl.to('#boLean',{rotation:0,duration:.3},tBlow+.3);bm(tBlow+.3,'mBig');
// the others lean in, watching
lookAll(L[7],10,-4);

/* ================= SCENE 8: Flapjack: "Hey! Those are my cousins!" ================= */
FB.pm(L[8]-.05,'Gr');tl.to('#bhArmL',{rotation:-150,duration:.12},L[8]);tl.to('#bhArmR',{rotation:150,duration:.12},L[8]);
tl.fromTo('#bhShake',{rotation:-8},{rotation:8,duration:.06,yoyo:true,repeat:15},L[8]);tl.set('#bhShake',{rotation:0},L[8]+1.0);
tl.to('#bhArmL',{rotation:-40,duration:.2},L[8]+DU[8]);tl.to('#bhArmR',{rotation:40,duration:.2},L[8]+DU[8]);
// the cake's top pancake opens its eyes: it is full of cousins!
tl.set('#ckEyes',{opacity:1},tCousins+.1);
tl.fromTo('#ckPL',{x:-6},{x:6,duration:.25,yoyo:true,repeat:5},tCousins+.1);tl.fromTo('#ckPR',{x:6},{x:-6,duration:.25,yoyo:true,repeat:5},tCousins+.1);
tl.fromTo('#ckIn',{rotation:-2},{rotation:2,duration:.07,yoyo:true,repeat:13},tCousins+.15);tl.set('#ckIn',{rotation:0},tCousins+1.2);
tl.set('#ckEyes',{opacity:0},L[9]+.05);
eyesMode(L[8],'wide');bm(L[8],'mOpen');tl.set('#boSweat',{opacity:1},L[8]);
CM.m(L[8],'mBg');cmEyes(L[8],'happy');NN.m(L[8],'mBg');NN.eyes(L[8],'happy');TF.m(L[8],'mBg');BP.m(L[8],'mBg');ZP.m(L[8],'mBg');GM.m(L[8],'mBg');
['#cmSq','#nmSq','#zpSq'].forEach((s,i)=>tl.fromTo(s,{y:0},{y:-24,duration:.12,yoyo:true,repeat:7},L[8]+.3+i*.05));

/* ================= SCENE 9: "So they shared the cake with everyone." ================= */
tl.set('#boSweat',{opacity:0},L[9]);eyesMode(L[9],'normal');bm(L[9],'mSmile');
tl.to('#ptArmR',{rotation:-100,duration:.2},L[9]);
const SL=[['cm',PARTY.cm,.76],['nm',PARTY.nm,.5],['mc',PARTY.mc,.68],['tf',PARTY.tf,.74],['zp',PARTY.zp,.6],['bp',PARTY.bp,.62],['bo',PARTY.bo-40,.88]];
SL.forEach(([p,x,s],i)=>{const t=tShare+i*.22;kslice(t,CKX,FLOOR-300,x,FLOOR-s*330,.55,.9);
 const m=(p==='bo')?()=>{bm(t+.55,'mBig');bm(t+.8,'mSmile');}:()=>{({cm:CM,nm:NN,mc:MC,tf:TF,zp:ZP,bp:BP})[p].m(t+.55,'mBg');({cm:CM,nm:NN,mc:MC,tf:TF,zp:ZP,bp:BP})[p].m(t+.85,'mSm');};m();
 tl.fromTo(`#${p}Sq`,{y:0},{y:-18,duration:.1,yoyo:true,repeat:3},t+.58);});
kslice(tShare+1.6,CKX,FLOOR-300,GX-40,FLOOR-GS*380,.7,2);
tl.to('#ckIn',{scaleY:.55,scaleX:.92,duration:1.4,ease:'sine.inOut'},tShare);
hearts(tShare+.6,CKX,FLOOR-520,5,140,240);
cmEyes(tShare+.5,'happy');mcEyes(tShare+.5,'happy');TF.eyes(tShare+.5,'happy');NN.eyes(tShare+.5,'happy');BP.eyes(tShare+.5,'happy');ZP.eyes(tShare+.5,'happy');
tl.to('#ptArmR',{rotation:0,duration:.25},tShare+1.5);

/* ================= SCENE 10: Gumdrop: "Roar! ...I mean, yummy!" ================= */
GM.m(tYum-.05,'mBg');GM.eyes(tYum-.05,'wide');
tl.fromTo('#gm',{scale:GS},{scale:GS*1.05,duration:.15,yoyo:true,repeat:1},tYum);shake(tYum,6,4);
GM.m(W(10,2),'mSm');GM.eyes(W(10,2),'happy');GM.talk(W(10,2),L[10]+DU[10]-.05,'mOp','mSm',.14);
tl.to('#gmArmL',{rotation:-35,duration:.2},W(10,2));tl.to('#gmArmR',{rotation:35,duration:.2},W(10,2));
tl.fromTo('#gmBelly',{scale:1},{scale:1.12,duration:.12,yoyo:true,repeat:7},W(10,2));
hearts(W(10,3),GX,FLOOR-GS*620,5,110,260);
tl.to('#gmArmR',{rotation:0,duration:.2},L[10]+DU[10]);tl.to('#gmArmL',{rotation:0,duration:.2},L[10]+DU[10]);

/* ================= SCENE 11: the finale — "It was the best birthday ever!" ================= */
camTo(tFin-.3,2.2,...CAM.fin,'sine.inOut');
armsUp(tFin+.15,.15);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq'].forEach((s,i)=>tl.fromTo(s,{y:0},{y:-60-(i%3)*16,duration:.16,yoyo:true,repeat:9,ease:'power1.out'},tFin+.2+i*.05));
tl.fromTo('#gmSq',{y:0},{y:-70,duration:.2,yoyo:true,repeat:7,ease:'power1.out'},tFin+.3);
eyesMode(tFin+.1,'hearts');bm(tFin+.1,'mBig');FB.pm(tFin+.1,'Gr');
TF.eyes(tFin+.1,'happy');TF.m(tFin+.1,'mBg');NN.eyes(tFin+.1,'happy');NN.m(tFin+.1,'mBg');cmEyes(tFin+.1,'happy');CM.m(tFin+.1,'mBg');mcEyes(tFin+.1,'happy');MC.m(tFin+.1,'mSm');GM.eyes(tFin+.1,'happy');GM.m(tFin+.1,'mBg');
BP.eyes(tFin+.1,'happy');BP.m(tFin+.1,'mBg');ZP.eyes(tFin+.1,'happy');ZP.m(tFin+.1,'mBg');PT.eyes(tFin+.1,'happy');PT.m(tFin+.1,'mBg');GH.eyes(tFin+.1,'happy');GH.m(tFin+.1,'mBg');
confetti(tFin,300,1900,FLOOR-1500,FLOOR+50,30,.9);confetti(tFin+1.0,300,1900,FLOOR-1500,FLOOR+50,24,.9);
sparks(tFin+.3,CKX,FLOOR-700,10,320);sparks(tFin+.9,1500,FLOOR-760,10,320);hearts(tFin+.4,CKX,FLOOR-600,8,200,300);
tl.to('#gh',{x:1180,y:FLOOR-860,duration:1.2,ease:'sine.inOut'},tFin);tl.fromTo('#ghFlip',{rotation:0},{rotation:360,duration:.9,ease:'power1.inOut'},tFin+.3);
tl.fromTo('#ptTrunk',{rotation:0},{rotation:-35,duration:.3,ease:'back.out(2)'},tFin+.3);
tl.fromTo('#ptEarL',{rotation:0},{rotation:-12,duration:.15,yoyo:true,repeat:15},tFin);tl.fromTo('#ptEarR',{rotation:0},{rotation:12,duration:.15,yoyo:true,repeat:15},tFin);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

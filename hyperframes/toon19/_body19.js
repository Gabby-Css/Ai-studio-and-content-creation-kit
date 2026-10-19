/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={w0:[700,-150,.6], wide:[700,-380,.56], pile:[520,-60,.78], tru:[1150,-40,.92], eat:[900,-300,.6], fin:[500,-450,.55]};
const HIDE={cm:700,bp:770,tf:850,mc:930,bo:1000,nm:1060,zp:1120,pt:1180};       // who hides where (behind / beside Gumdrop)
const ZH={z1:740,z2:820,z3:900,z4:980};
const GMX=1240, MNX=2150, MNS=2.0, MMY=FLOOR-380*MNS, MEY=FLOOR-544*MNS;       // Gumdrop's spot, Munch's spot / scale / mouth y / eye y
const HOTX=1520;                                            // the hot rock + the last pancake
const tBulb=L[6]+.3;
const tPlace=W(7,1)-.2;                                    // the pancake lands on the rock
const tSizz=W(7,2);                                        // "...CRISPY..."
const tThrow=L[9]-.5;                                      // the burnt pancake flies to Munch
const tCatch=tThrow+.7;
const tBurp=W(11,2);                                       // "...RAINBOW..."
const tStk=L[11]+DU[11]+.35;
const RP=mkRock('rkp');
const ZN=['z1','z2','z3','z4'], ZZ={z1:mkRock('z1'),z2:mkRock('z2'),z3:mkRock('z3'),z4:mkRock('z4')}, MN=mkRock('mn');
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
let trn=0;
function tears(t,x,y,n=3,dx=26,fall=260){for(let k=0;k<n;k++){const i=(trn++)%8,tt=t+k*.22,sx=(k%2?1:-1)*dx;
 tl.set('#trw'+i,{x:x+sx,y:y},tt);
 tl.fromTo('#tr'+i,{opacity:0,y:0,scale:.5},{opacity:1,y:fall*.12,scale:1,duration:.15},tt);
 tl.to('#tr'+i,{y:fall,opacity:0,duration:.65,ease:'power2.in'},tt+.15);}}
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
let smn=0;
function smoke(t,x,y,n=6){for(let k=0;k<n;k++){const i=(smn++)%8,tt=t+k*.22;
 tl.set('#smw'+i,{x:x+((k%3)-1)*22,y},tt);
 tl.fromTo('#sm'+i,{opacity:.9,scale:.4,y:0},{opacity:0,scale:1.8,y:-240,duration:1.1,ease:'power1.out'},tt);}}
const FLEE=(p,x,t0)=>{const cur=OUT0[p]?OUT0[p][0]:ZX0[p];runTo(p,x,FLOOR,t0,Math.max(.8,Math.abs(cur-x)/1000),.6,24);};

/* ================= SCENE 1: "A giant gray monster stomped over the hill!" — the silhouette steps into view ================= */
camSet(0,...CAM.w0);
faces(0,'wide','O');lookAll(0,30,-34);ZN.forEach(z=>{ZZ[z].eyes(0,'wide');ZZ[z].m(0,'mO');ZZ[z].look(0,30,-30,.1);});
for(let k=0;k<6;k++) shake(.05+k*.35,9+k,5);
tl.to('#zorpGiant',{y:1760,duration:.5,ease:'power2.in'},.2);tl.set('#zorpGiant',{opacity:0},.75);
camTo(.5,1.8,...CAM.wide,'power2.inOut');
// Munch walks in from the right, one earth-shaking step at a time
tl.set('#mn',{opacity:1},.4);MN.eyes(.4,'normal');MN.m(.4,'mFr');MN.brows(.4,14,-14,-4,.1);
tl.fromTo('#mn',{x:3600},{x:MNX,duration:2.0,ease:'none'},.4);
cycle(['#mnLegL','#mnLegR'],['#mnArmL','#mnArmR'],.4,2.4,.66,16,8,'#mnSq',26);
[.75,1.4,2.05].forEach((t,i)=>{shake(t,12+i*4,6);dust(t,3600-1450*(t-.4)/2.0-120,FLOOR+10,2.6);});
// the Zorpians scatter to the left
ZN.forEach((z,i)=>{FLEE(z,ZH[z],1.2+i*.08);});

/* ================= SCENE 2: Munch: "Who took my gray?!" — everybody runs for cover ================= */
MN.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mOp',.18);MN.eyes(L[2],'wide');MN.brows(L[2],16,-16,-6,.12);
tl.to('#mnArmL',{rotation:140,duration:.2},L[2]);tl.to('#mnArmR',{rotation:-140,duration:.2},L[2]);
tl.fromTo('#mnHead',{rotation:-4},{rotation:4,duration:.18,yoyo:true,repeat:9},L[2]);tl.set('#mnHead',{rotation:0},L[2]+DU[2]+.2);
tl.to('#mnArmL',{rotation:60,duration:.3},L[2]+DU[2]);tl.to('#mnArmR',{rotation:-60,duration:.3},L[2]+DU[2]);
shake(L[2],14,8);shake(L[2]+.8,10,6);
['bo','cm','nm','tf','mc','pt','zp','bp'].forEach((p,i)=>FLEE(p,HIDE[p],L[2]-.2+i*.06));
runTo('gm',GMX,FLOOR,L[2]+.1,.9,1.25,16);
faces(L[2]-.2,'wide','O');lookAll(L[2]-.2,36,-28);

/* ================= SCENE 3: "Everybody hid behind Gumdrop!" — Gumdrop trembles in front, the rest peek ================= */
tl.set('#gmSweat',{opacity:1},L[3]);tl.fromTo('#gmSq',{x:-5},{x:5,duration:.05,yoyo:true,repeat:31},L[3]);tl.set('#gmSq',{x:0},L[3]+1.7);
GM.eyes(L[3],'wide');GM.m(L[3],'mO');
faces(L[3],'wide','O');lookAll(L[3]+.1,34,-12);ZN.forEach(z=>{ZZ[z].look(L[3]+.1,34,-10,.1);});
['#cmSq','#bpSq','#tfSq','#mcSq','#nmSq','#ptSq','#zpSq','#z1Sq','#z2Sq','#z3Sq','#z4Sq'].forEach((s,i)=>tl.fromTo(s,{x:-2},{x:2,duration:.05,yoyo:true,repeat:27},L[3]+i*.02));
tl.set('#cmSq,#bpSq,#tfSq,#mcSq,#nmSq,#ptSq,#zpSq,#z1Sq,#z2Sq,#z3Sq,#z4Sq',{x:0},L[3]+1.6);
MN.look(L[3],-30,6,.2);

/* ================= SCENE 4: Gumdrop: "Roar! ...I mean, hello?" ================= */
tl.to('#gm',{x:1520,duration:.5,ease:'back.out(1.5)'},L[4]-.1);
GM.talk(L[4]+.02,W(4,1)-.05,'mBg','mOp',.12);GM.eyes(L[4],'wide');GM.brows(L[4],12,-12,-4,.1);
tl.to('#gmArmL',{rotation:150,duration:.12},L[4]);tl.to('#gmArmR',{rotation:-150,duration:.12},L[4]);
shake(W(4,0)+.05,12,6);
GM.m(W(4,1),'mO');tl.set('#gmSweat',{opacity:1},W(4,1));
tl.to('#gmArmL',{rotation:20,duration:.2},W(4,1));tl.to('#gmArmR',{rotation:-100,duration:.2},W(4,1));
tl.fromTo('#gmArmR',{rotation:-100},{rotation:-70,duration:.16,yoyo:true,repeat:5},W(4,3));       // a shy little wave
GM.talk(W(4,2),L[4]+DU[4]-.05,'mOp','mSm',.18);
MN.eyes(L[4]+.1,'wide');MN.m(L[4]+.1,'mO');MN.brows(L[4]+.1,0,0,0,.1);tl.fromTo('#mnHead',{rotation:0},{rotation:-8,duration:.4},L[4]+.5);   // Munch tilts his head

/* ================= SCENE 5: Munch (sad): "Sniff. I just love gray." ================= */
tl.to('#gm',{x:GMX,duration:.5},L[5]-.1);tl.set('#gmSweat',{opacity:0},L[5]);GM.m(L[5],'mSm');
MN.talk(L[5]+.02,L[5]+DU[5]-.05,'mFr','mO',.3);MN.eyes(L[5],'normal');MN.brows(L[5],-20,20,0,.2);
tl.to('#mnHead',{rotation:0,duration:.3},L[5]);tl.to('#mnArmL',{rotation:20,duration:.4},L[5]);tl.to('#mnArmR',{rotation:-20,duration:.4},L[5]);
tl.set('#mnTear',{opacity:1},L[5]+.1);
tears(L[5]+.15,MNX,MEY+60,8,150*MNS/2,620);
tl.fromTo('#mnSq',{scaleY:1},{scaleY:.94,duration:.4,yoyo:true,repeat:7,ease:'sine.inOut'},L[5]);
tl.fromTo('#mnBelly',{scale:1},{scale:1.06,duration:.2,yoyo:true,repeat:5},L[5]+.3);
faces(L[5]+.3,'normal','Fr');lookAll(L[5]+.3,30,-6);ZN.forEach(z=>{ZZ[z].m(L[5]+.3,'mFr');ZZ[z].eyes(L[5]+.3,'normal');ZZ[z].look(L[5]+.3,30,-6,.1);});

tl.to('#gm',{x:900,duration:.6,ease:'sine.inOut'},L[6]-.2);
/* ================= SCENE 6: "Then Truffle had a crunchy idea!" ================= */
camTo(L[6]-.35,.9,...CAM.pile,'power2.inOut');
tl.set('#bulb',{x:HIDE.tf,y:FLOOR-430},tBulb-.3);
tl.fromTo('#bulb',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},tBulb);
tl.fromTo('#bulbIn',{scale:1},{scale:1.12,duration:.15,yoyo:true,repeat:5},tBulb+.3);
sparks(tBulb+.2,HIDE.tf,FLOOR-480,6,90);tl.to('#bulb',{opacity:0,duration:.25},tBulb+1.2);
TF.eyes(tBulb,'happy');TF.m(tBulb,'mBg');
tl.to('#tfArmL',{rotation:150,duration:.12},tBulb);tl.to('#tfArmR',{rotation:-150,duration:.12},tBulb);
hop('#tfSq',tBulb+.2,60,.14,.2);hop('#tfSq',tBulb+.7,60,.14,.2);
faces(tBulb+.5,'normal','Sm');TF.eyes(tBulb+.5,'happy');
runTo('tf',HOTX-110,FLOOR,L[6]+1.3,.9,.74,20);

/* ================= SCENE 7: Truffle: "One extra crispy pancake!" — the last pancake gets burnt on a hot space rock ================= */
camTo(L[7]-.55,.9,...CAM.tru,'power2.inOut');
tl.fromTo('#hotRock',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},tPlace-.1);
tl.fromTo('#hrGlow',{opacity:.3},{opacity:.6,duration:.3,yoyo:true,repeat:9},tPlace);
sparks(tPlace,HOTX,FLOOR-60,8,140);
tl.to('#stl0',{y:-100,duration:.3,ease:'back.out(2)'},tPlace+.1);
TF.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);TF.eyes(L[7],'happy');
tl.to('#tfArmL',{rotation:105,duration:.25,ease:'back.out(2)'},L[7]);
tl.to('#stl0 path',{fill:'#454550',duration:1.7},tSizz);tl.to('#stl0 ellipse',{fill:'#6A6A78',duration:1.7},tSizz);
smoke(tSizz,HOTX,FLOOR-170,8);
RP.eyes(L[7]+.2,'wide');RP.look(L[7]+.2,24,-4,.1);
MN.eyes(L[7]+.2,'normal');MN.look(L[7]+.2,-34,18,.2);

/* ================= SCENE 8: Mochi: "Hmph. It's burnt. Obviously." ================= */
runTo('mc',HOTX+150,FLOOR,L[8]-.6,.9,.68,20);
MC.m(L[8]+.1,'mFr');MC.talk(L[8]+.12,L[8]+DU[8]-.08,'mOp','mFr',.16);mcEyes(L[8]+.15,'lids');MC.brows(L[8]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.2},WE(8,3));
smoke(L[8],HOTX,FLOOR-170,6);
RP.look(L[8]+.3,-20,0,.1);

/* ================= SCENE 9: Munch: "Crunchy gray! My favorite!" — the burnt pancake flies into his mouth ================= */
camTo(tThrow-.35,.9,...CAM.eat,'power2.inOut');
tl.to('#tfArmL',{rotation:-130,duration:.18},tThrow-.15);tl.to('#tfArmL',{rotation:30,duration:.15},tThrow+.05);
tl.fromTo('#stl0',{x:0},{x:MNX-HOTX,duration:.7,ease:'none'},tThrow);
arc('#stl0',tThrow,.7,-100,360,MMY-(FLOOR+40));
tl.fromTo('#stl0',{scale:1},{scale:.55,duration:.7},tThrow);tl.set('#stl0',{opacity:0},tCatch);
MN.m(tThrow,'mBg');MN.eyes(tThrow,'wide');MN.brows(tThrow,0,0,0,.1);tl.set('#mnTear',{opacity:0},tThrow);
tl.to('#mnHead',{rotation:-6,duration:.2},tThrow);
MN.talk(L[9]+.02,L[9]+DU[9]-.06,'mOp','mSm',.17);MN.eyes(tCatch,'happy');MN.brows(tCatch,0,0,0,.15);
tl.to('#mnArmL',{rotation:140,duration:.2},tCatch);tl.to('#mnArmR',{rotation:-140,duration:.2},tCatch);
tl.fromTo('#mnBelly',{scale:1},{scale:1.1,duration:.18,yoyo:true,repeat:9},tCatch);
tl.fromTo('#mnHead',{rotation:-5},{rotation:5,duration:.2,yoyo:true,repeat:9},tCatch+.1);tl.set('#mnHead',{rotation:0},tCatch+2.2);
hearts(tCatch,MNX,MMY-120,6,120,360);sparks(tCatch,MNX,MMY,12,320);
[0,.5,1.0,1.5].forEach((d,i)=>{hop('#mnSq',tCatch+.2+d,70,.16,.2);shake(tCatch+.2+d+.36,10,5);});
faces(tCatch,'wide','Big');ZN.forEach(z=>{ZZ[z].eyes(tCatch,'wide');ZZ[z].m(tCatch,'mBg');});RP.eyes(tCatch,'happy');

/* ================= SCENE 10: Bo: "He's not scary. He's just hungry!" — everybody comes out of hiding ================= */
camTo(L[10]-.4,.9,...CAM.wide,'power2.inOut');
const COME={bo:1830,tf:1600,mc:1520,cm:1420,nm:1330,pt:1700,zp:1760,bp:1250};
Object.entries(COME).forEach(([p,x],i)=>runTo(p,x,FLOOR,L[10]-.35+i*.07,1.1,.7,22));
const ZCOME={z1:1960,z2:1900,z3:1560,z4:1640};ZN.forEach((z,i)=>runTo(z,ZCOME[z],FLOOR,L[10]-.2+i*.08,1.1,.62,18));
runTo('gm',1300,FLOOR,L[10]-.2,.9,1.25,16);
bTalk(L[10]+.1,L[10]+DU[10]-.08);brows(L[10]+.1,0,0,0,.2);look(L[10]+.1,30,-10,.15);eyesMode(L[10]+.1,'normal');
tl.to('#boArmL',{rotation:-60,duration:.2},L[10]+.5);tl.to('#boArmR',{rotation:60,duration:.2},L[10]+.5);
faces(L[10]+.6,'happy','Big');ZN.forEach(z=>{ZZ[z].eyes(L[10]+.6,'happy');ZZ[z].m(L[10]+.6,'mBg');});GM.eyes(L[10]+.6,'happy');
MN.eyes(L[10]+.2,'happy');MN.m(L[10]+.2,'mSm');MN.look(L[10]+.2,-26,26,.2);
tl.fromTo('#mnSq',{scaleY:1},{scaleY:1.04,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},L[10]);

/* ================= SCENE 11: "And his rainbow burp lit the way home!" ================= */
camTo(L[11]-.4,1.0,...CAM.fin,'power2.inOut');
armsDown(L[11]-.3,.2);
tl.fromTo('#mnBelly',{scale:1},{scale:1.22,duration:.5,ease:'power2.in'},tBurp-.6);tl.to('#mnBelly',{scale:1,duration:.3},tBurp);
MN.m(tBurp-.1,'mO');MN.eyes(tBurp-.5,'happy');
shake(tBurp,12,6);dust(tBurp,MNX-160,MMY+150,2);sparks(tBurp,MNX,MMY,10,260);
tl.set('#rainbow',{opacity:1},tBurp);
tl.to('.rbp',{strokeDashoffset:0,duration:2.0,ease:'power1.out'},tBurp);
confetti(tBurp+.6,900,2300,FLOOR-1500,FLOOR+60,36,1.0);
faces(tBurp+.2,'happy','Big');lookAll(tBurp+.2,-14,-34);ZN.forEach(z=>{ZZ[z].eyes(tBurp+.2,'happy');ZZ[z].m(tBurp+.2,'mBg');ZZ[z].look(tBurp+.2,-14,-30,.1);});
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'].forEach((s,i)=>{hop(s,tBurp+.7+i*.05,48,.12,.18);hop(s,tBurp+1.5+i*.05,48,.12,.18);});
armsUp(tBurp+.6,.15);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

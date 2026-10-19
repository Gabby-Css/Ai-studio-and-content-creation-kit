/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={end:[830,-540,.62], sauc:[460,-300,.6], holo:[380,430,1.0], holo2:[560,430,.9], tru:[960,250,.9], board:[460,-160,.62], cock:[440,0,.74], fin:[70,700,1.2]};
const LX=880, RAMP_B=1070, DOOR=945;                       // the little saucer: centre / ramp bottom / the doorway
const ST={bp:[520,.62],zp:[650,.68],tf:[1160,.8],mc:[1620,.68],cm:[1730,.76],nm:[1820,.5],pt:[1920,.7],bo:[2040,.88],gm:[2200,1.5]};   // where they stand once they have run to the saucer
const CK={cm:[880,.76],nm:[1000,.5],mc:[720,.68],tf:[1120,.74],zp:[1230,.68],bp:[1340,.62],bo:[1470,.88],pt:[1620,.7],gm:[1860,1.25]};      // ... and inside it
const STKX=1390;                                           // the tower's spot (next to the ramp)
const tRun=.85;
const tHoloOn=W(2,2);                                      // "...INCOMING message!"
const tCmd=L[3]+DU[3]-.12;                                 // the Commander flickers in
const tHoloOff=L[5]+DU[5]+.12;                             // the call ends
const tS0=L[6]-.05;                                        // the first pancake drops
const tFifty=W(7,2);                                       // "...FIFTY pancakes!"
const tObv=W(8,4);                                         // "...OBVIOUSLY."
const tBoard=L[9]-.55;
const tZoom=W(9,4)-.1;                                     // "...ZOOM!"
const tCut=L[10]-.2;                                       // the cut to the inside
const tHide=W(11,3);                                       // "...HIDING..."
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const HL=mkRock('hl'), RP=mkRock('rkp');
let trn=0;
function tears(t,x,y,n=3,dx=26,fall=260){for(let k=0;k<n;k++){const i=(trn++)%8,tt=t+k*.22,sx=(k%2?1:-1)*dx;
 tl.set('#trw'+i,{x:x+sx,y:y},tt);
 tl.fromTo('#tr'+i,{opacity:0,y:0,scale:.5},{opacity:1,y:fall*.12,scale:1,duration:.15},tt);
 tl.to('#tr'+i,{y:fall,opacity:0,duration:.65,ease:'power2.in'},tt+.15);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
let rgn=0;
const ping=(t)=>{tl.fromTo('#ufoLIn',{scale:1},{scale:1.07,duration:.1,yoyo:true,repeat:1},t);sparks(t,LX,FLOOR-250,5,90);
 const i=(rgn++)%4;tl.set('#rgw'+i,{x:LX,y:FLOOR-250},t);tl.fromTo('#rg'+i,{opacity:1,scale:.3},{opacity:0,scale:3.6,duration:.8,ease:'power1.out'},t);};
// the tower sways: the higher the pancake the wider the swing
function stkWob(t0,dur,amp,per=.5){const n=Math.max(1,Math.round(dur/(per/2))),end=t0+(n+1)*(per/2)+.05;
 for(let i=2;i<NSL;i++){const a=amp*Math.pow(i/(NSL-1),1.6),ph=i*.028;
  tl.fromTo('#stl'+i,{x:-a},{x:a,duration:per/2,ease:'sine.inOut',yoyo:true,repeat:n},t0+ph);
  tl.to('#stl'+i,{x:0,duration:.18,ease:'power2.out'},end+ph);}
 const a=amp;tl.fromTo('#stkTop,#stkRkW',{x:-a},{x:a,duration:per/2,ease:'sine.inOut',yoyo:true,repeat:n},t0+(NSL-1)*.028);tl.to('#stkTop,#stkRkW',{x:0,duration:.18,ease:'power2.out'},end+(NSL-1)*.028);
 return end;}
// a character walks to the ramp, shrinks and disappears into the doorway
const CAST={};Object.entries(ST).forEach(([p,[x,s]])=>{CAST[p]={x0:x,s0:s,cx:CK[p][0],cs:CK[p][1]};});CAST.bo.x0=2040;
function enter(p,t0,spd=650,xs=null){const c=CAST[p],id='#'+p,x0=xs==null?c.x0:xs,d1=Math.max(.05,Math.abs(x0-RAMP_B)/spd);
 tl.fromTo(id,{x:x0},{x:RAMP_B,duration:d1,ease:'none'},t0);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0,t0+d1,.26,24,12,`#${p}Sq`,9);
 const t1=t0+d1;
 tl.fromTo(id,{x:RAMP_B},{x:DOOR,duration:.55,ease:'power1.in'},t1);
 tl.fromTo(id,{y:FLOOR},{y:FLOOR-110,duration:.55,ease:'none'},t1);
 tl.fromTo(id,{scale:c.s0},{scale:c.s0*.07,duration:.55,ease:'power2.in'},t1);
 tl.set(id,{opacity:0},t1+.55);sparks(t1+.5,DOOR,FLOOR-130,3,40);
 return t1+.55;}

/* ================= SCENE 1: "Season four began with a beep from the spaceship!" — the saucer pings, everybody runs over ================= */
camSet(0,...CAM.end);
faces(0,'happy','Big');lookAll(0,-40,0);KG.eyes(0,'happy');KG.m(0,'mBg');J1.eyes(0,'happy');J1.m(0,'mBg');
[.15,.5,.85,1.2,1.55].forEach(ping);
faces(.2,'wide','O');lookAll(.2,-40,-4);KG.eyes(.2,'wide');KG.m(.2,'mO');J1.eyes(.2,'wide');J1.m(.2,'mO');
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.7,yoyo:true,repeat:11,ease:'sine.inOut'},.5);
tl.to('#gh',{x:1560,y:FLOOR-1010,duration:1.6,ease:'sine.inOut'},.9);
['bp','zp','gm','pt','bo','nm','cm','mc','tf'].forEach((p,i)=>{const [x]=ST[p],h=HUG0[p],t0=tRun+i*.05,dur=Math.max(.9,Math.abs(h[0]-x)/900);
 runTo(p,x,FLOOR,t0,dur,ST[p][1],22);});
camTo(.75,1.5,...CAM.sauc,'power2.inOut');
// the King and Jiggle watch from home
tl.to('#kgArmL',{rotation:20,duration:.4},tRun);tl.to('#kgArmR',{rotation:-20,duration:.4},tRun);
KG.look(tRun,-30,0,.2);J1.look(tRun,-30,0,.2);KG.eyes(tRun+.6,'normal');KG.m(tRun+.6,'mSm');J1.eyes(tRun+.6,'normal');J1.m(tRun+.6,'mSm');
faces(tRun+1.8,'normal','Sm');

/* ================= SCENE 2: Zap: "Beep boop! Incoming message!" — the saucer rings, a hologram beam switches on ================= */
camTo(L[2]-.55,1.1,...CAM.holo,'power2.inOut');
ZP.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);ZP.eyes(L[2],'happy');
tl.to('#zpArmL',{rotation:150,duration:.15},L[2]);tl.fromTo('#zpArmL',{rotation:150},{rotation:60,duration:.18,yoyo:true,repeat:7},L[2]+.15);tl.to('#zpArmL',{rotation:0,duration:.2},L[2]+DU[2]+.05);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:13},L[2]);tl.set('#zpAnt',{rotation:0},L[2]+DU[2]+.05);
for(let k=0;k<5;k++) ping(L[2]+.1+k*.36);
tl.fromTo('#holo',{opacity:0,scaleY:.05},{opacity:1,scaleY:1,duration:.4,ease:'back.out(1.7)'},tHoloOn);
tl.fromTo('#holoStat',{opacity:0},{opacity:.95,duration:.05,yoyo:true,repeat:39},tHoloOn);
sparks(tHoloOn+.1,LX,1330,8,180);
faces(tHoloOn,'wide','O');lookAll(tHoloOn,-6,-28);ZP.eyes(tHoloOn,'wide');

/* ================= SCENE 3: Blip: "It's from my home planet!" — the Commander flickers in ================= */
faces(L[3],'normal','Sm');
BP.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.13);BP.eyes(L[3]+.02,'happy');
tl.to('#bpArmL',{rotation:150,duration:.12},L[3]);tl.to('#bpArmR',{rotation:-150,duration:.12},L[3]);
[.12,.6,1.08].forEach(d=>hop('#bpSq',L[3]+d,76,.15,.2));
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:11},L[3]);tl.fromTo('#bpAntR',{rotation:16},{rotation:-16,duration:.12,yoyo:true,repeat:11},L[3]);tl.set('#bpAntL,#bpAntR',{rotation:0},L[3]+DU[3]+.1);
hearts(L[3]+.3,520,FLOOR-430,3,60,200);
HL.eyes(tCmd,'normal');HL.m(tCmd,'mFr');HL.brows(tCmd,-14,14,0,.1);
tl.fromTo('#holoMan',{opacity:0},{opacity:1,duration:.05,yoyo:true,repeat:4},tCmd);tl.set('#holoMan',{opacity:1},tCmd+.32);tl.set('#holoStat',{opacity:0},tCmd+.32);
sparks(tCmd+.1,LX,1000,8,170);

/* ================= SCENE 4: the Commander (sad): "Help! We ran out of pancakes!" ================= */
HL.talk(L[4]+.02,L[4]+DU[4]-.05,'mO','mFr',.22);HL.eyes(L[4],'normal');HL.brows(L[4],-26,26,-4,.15);
tl.to('#hlArmL',{rotation:150,duration:.2},L[4]);tl.to('#hlArmR',{rotation:-150,duration:.2},L[4]);
tl.fromTo('#hlArmL',{rotation:150},{rotation:118,duration:.16,yoyo:true,repeat:7},L[4]+.2);tl.fromTo('#hlArmR',{rotation:-150},{rotation:-118,duration:.16,yoyo:true,repeat:7},L[4]+.2);
tl.fromTo('#hlBelly',{scale:1},{scale:1.09,duration:.18,yoyo:true,repeat:7},L[4]+.4);                    // his tummy rumbles
tl.to('#hlAntL',{rotation:-32,duration:.4},L[4]+.2);tl.to('#hlAntR',{rotation:32,duration:.4},L[4]+.2);   // the antennae droop
tears(L[4]+.3,LX,1040,5,44,230);
faces(L[4]+.1,'normal','Fr');lookAll(L[4]+.1,-10,-26);

/* ================= SCENE 5: Bo: "Don't worry! We'll bring some!" ================= */
camTo(L[5]-.4,.9,...CAM.holo2,'power2.inOut');
runTo('bo',1330,FLOOR,L[5]-.75,.95,.88,22);
tl.to('#boArmL',{rotation:-95,duration:.2,ease:'back.out(2)'},L[5]+.3);tl.to('#boArmR',{rotation:95,duration:.2,ease:'back.out(2)'},L[5]+.3);
bTalk(L[5]+.02,L[5]+DU[5]-.08);brows(L[5]+.05,14,-14,-4,.15);look(L[5]+.05,-34,-10,.15);eyesMode(L[5]+.05,'wide');
tl.fromTo('#boLean',{rotation:-3},{rotation:3,duration:.2,yoyo:true,repeat:5},L[5]+.4);
HL.eyes(L[5]+.3,'happy');HL.m(L[5]+.3,'mBg');HL.brows(L[5]+.3,0,0,0,.2);
tl.to('#hlAntL,#hlAntR',{rotation:0,duration:.25},L[5]+.3);
tl.fromTo('#hlArmL',{rotation:118},{rotation:150,duration:.2,yoyo:true,repeat:5},L[5]+.4);
hearts(L[5]+.5,LX,880,5,90,260);sparks(L[5]+.5,LX,1000,8,200);
faces(L[5]+.5,'happy','Big');
// the call ends
tl.to('#holo',{opacity:0,scaleY:.05,duration:.28,ease:'power2.in'},tHoloOff);sparks(tHoloOff,LX,1330,6,160);
armsUp(tHoloOff+.05,.15);[ '#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'].forEach((s,i)=>hop(s,tHoloOff+.1+i*.04,40,.12,.16));

/* ================= SCENE 6: "Truffle flipped the biggest stack ever!" — the tower of pancakes goes up ================= */
camTo(L[6]-.4,.9,...CAM.tru,'power2.inOut');
armsDown(L[6]-.3,.25);faces(L[6]-.2,'normal','Sm');
runTo('bo',2040,FLOOR,L[6]-.5,1.0,.88,22);
tl.set('#stk',{opacity:1},tS0-.01);tl.set('#stkRkW,#stkTop',{opacity:1},tS0+NSL*.075+.12);
for(let i=0;i<NSL;i++){const t=tS0+i*.075;
 tl.set('#stl'+i,{opacity:1},t);tl.fromTo('#stl'+i,{y:-860},{y:0,duration:.24,ease:'power2.in'},t);
 if(i%3===2) tl.fromTo('#stkIn',{scaleY:1,scaleX:1},{scaleY:.985,scaleX:1.01,duration:.07,yoyo:true,repeat:1},t+.24);}
TF.eyes(tS0,'happy');TF.m(tS0,'mBg');
tl.to('#tfArmL',{rotation:150,duration:.12},tS0);tl.to('#tfArmR',{rotation:-150,duration:.12},tS0);
for(let k=0;k<5;k++) hop('#tfSq',tS0+k*.28,48,.12,.16);
sparks(tS0+NSL*.075,STKX,FLOOR-480,8,170);

/* ================= SCENE 7: Truffle: "Order up! Fifty pancakes!" ================= */
TF.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);TF.eyes(L[7],'happy');
tl.to('#tfArmL',{rotation:105,duration:.25,ease:'back.out(2)'},L[7]);
tl.set('#fiftyTag',{x:1560,y:1050},tFifty);
tl.fromTo('#fiftyTag',{opacity:0,scale:.2,rotation:-14},{opacity:1,scale:.9,rotation:-6,duration:.32,ease:'back.out(2.4)'},tFifty);
tl.fromTo('#fiftyIn',{y:0},{y:-10,duration:.45,yoyo:true,repeat:5,ease:'sine.inOut'},tFifty+.32);
sparks(tFifty+.1,1560,1050,8,150);
tl.to('#fiftyTag',{opacity:0,scale:.3,duration:.25},L[8]+.1);
stkWob(L[7]+.25,1.5,7,.8);
faces(L[7]+.3,'happy','Big');hearts(tFifty+.2,STKX,FLOOR-640,4,90,240);

/* ================= SCENE 8: Mochi: "Hmph. Don't drop them. Obviously." — the tower wobbles ================= */
faces(L[8]+.05,'wide','O');
MC.m(L[8]+.1,'mFr');MC.talk(L[8]+.12,L[8]+DU[8]-.08,'mOp','mFr',.16);mcEyes(L[8]+.15,'lids');MC.brows(L[8]+.1,8,-8,2,.2);
const eW=stkWob(L[8]+.2,2.1,30,.6);
shake(L[8]+.3,5,4);
['#boLean','#tfLean','#cmLean','#nmLean','#ptLean'].forEach((s,i)=>tl.fromTo(s,{rotation:-4},{rotation:4,duration:.3,yoyo:true,repeat:6},L[8]+.2+i*.03));
tl.set('#boLean,#tfLean,#cmLean,#nmLean,#ptLean',{rotation:0},L[8]+2.4);
tl.to('#boArmL',{rotation:-120,duration:.2},L[8]+.4);tl.to('#boArmR',{rotation:120,duration:.2},L[8]+.4);     // Bo and Truffle reach out to steady it
tl.to('#tfArmL',{rotation:60,duration:.2},L[8]+.5);tl.to('#tfArmR',{rotation:-60,duration:.2},L[8]+.5);
tl.to('#stkRk',{y:120,duration:.1},tObv-.1);tl.to('#stkRk',{y:170,duration:.1},tObv+.4);                         // two grey ears twitch above the top pancake...
mcEyes(tObv+.5,'normal');

/* ================= SCENE 9: "Everybody climbed aboard, and zoom!" — and the tower walks by itself ================= */
camTo(L[9]-.7,.9,...CAM.board,'power2.inOut');
armsDown(tBoard-.2,.2);faces(tBoard-.1,'happy','Big');
const tEn={gm:tBoard,pt:tBoard+.05,bo:tBoard+.1,cm:tBoard+.2,nm:tBoard+.25,mc:tBoard+.3,tf:tBoard+.35,zp:tBoard+.85,bp:tBoard+.95};
let tLast=0;Object.entries(tEn).forEach(([p,t])=>{tLast=Math.max(tLast,enter(p,t,p==='gm'?950:700,p==='bo'?2040:null));});
tl.fromTo('#gmSq',{scaleX:1,scaleY:1},{scaleX:1.4,scaleY:.8,duration:.15,yoyo:true,repeat:3},tBoard+1.3);shake(tBoard+1.6,8,4);dust(tBoard+1.6,RAMP_B,FLOOR+6,1.2);
// Boo floats in after them
tl.to('#gh',{x:DOOR,y:FLOOR-150,scale:.05,duration:.6,ease:'power2.in'},tEn.bp+.1);tl.set('#gh',{opacity:0},tEn.bp+.75);sparks(tEn.bp+.7,DOOR,FLOOR-140,4,40);
// the tower waddles to the saucer on two little grey feet
const tSw=tBoard+.35,swD=Math.abs(STKX-RAMP_B)/300;
tl.set('#stkFeet',{opacity:1},tSw-.05);
tl.fromTo('#stkW',{x:STKX},{x:RAMP_B,duration:swD,ease:'none'},tSw);
tl.fromTo('#stkFootL',{y:0},{y:-18,duration:.12,yoyo:true,repeat:Math.round(swD/.12)},tSw);tl.fromTo('#stkFootR',{y:-18},{y:0,duration:.12,yoyo:true,repeat:Math.round(swD/.12)},tSw);
tl.fromTo('#stkIn',{rotation:-2.5},{rotation:2.5,duration:.18,yoyo:true,repeat:Math.round(swD/.18)},tSw);tl.set('#stkIn',{rotation:0},tSw+swD+.2);
const tS1=tSw+swD+.2;
tl.fromTo('#stkW',{x:RAMP_B},{x:DOOR,duration:.55,ease:'power1.in'},tS1);
tl.fromTo('#stkW',{y:FLOOR+40},{y:FLOOR-70,duration:.55,ease:'none'},tS1);
tl.fromTo('#stkW',{scale:1},{scale:.07,duration:.55,ease:'power2.in'},tS1);
tl.set('#stk',{opacity:0},tS1+.55);sparks(tS1+.5,DOOR,FLOOR-110,4,50);
// ZOOM!
shake(tZoom-.45,8,6);tl.fromTo('#ufoLIn',{scale:1},{scale:1.1,duration:.12,yoyo:true,repeat:3},tZoom-.45);
tl.to('#ufoLRamp',{scaleY:.05,duration:.2},tZoom-.35);
dust(tZoom-.1,LX-110,FLOOR+6,2);dust(tZoom-.08,LX+110,FLOOR+6,2);
tl.to('#ufoL',{x:1500,y:-1900,duration:.9,ease:'power3.in'},tZoom);
tl.fromTo('#flash',{opacity:.55},{opacity:0,duration:.3},tZoom);

/* ================= SCENE 10: Blip: "Next stop, Planet Zorp!" — inside the saucer ================= */
tl.fromTo('#flash',{opacity:.9},{opacity:0,duration:.45},tCut);
tl.set('#cockpit',{opacity:1},tCut);
tl.set('#table,#plate,#oven,#ck,#ufoL,#kg,#kcrnW,#kcrn,#j1,#ghGlow',{opacity:0},tCut);
camSet(tCut,...CAM.cock);
Object.entries(CAST).forEach(([p,c],i)=>{const id='#'+p;
 tl.set(id,{opacity:1,x:c.cx,y:FLOOR,scale:c.cs*.02},tCut);
 tl.fromTo(id,{scale:c.cs*.02},{scale:c.cs,duration:.55,ease:'back.out(1.7)'},tCut+.02+i*.03);
 tl.set(`#${p}ArmL`,{rotation:0},tCut);tl.set(`#${p}ArmR`,{rotation:0},tCut);});
tl.set('#gh',{opacity:1,x:880,y:600,scale:.9},tCut);tl.set('#ghGlow',{opacity:.4,scale:1},tCut);
tl.fromTo('#ghSq',{y:0},{y:-14,duration:.7,yoyo:true,repeat:10,ease:'sine.inOut'},tCut+.3);
tl.set('#stkW',{x:470,y:FLOOR+70,scale:.02},tCut);tl.set('#stk',{opacity:1},tCut);tl.set('#stkFeet',{opacity:0},tCut);
tl.fromTo('#stkW',{scale:.02},{scale:.8,duration:.55,ease:'back.out(1.7)'},tCut+.2);
faces(tCut+.1,'wide','O');lookAll(tCut+.2,10,-30);
tl.fromTo('.blk',{opacity:.25},{opacity:1,duration:.18,yoyo:true,repeat:60,stagger:.05},tCut);
sparks(tCut+.2,1400,700,10,300);
tl.fromTo('#stars1',{x:0},{x:-1900,duration:12,ease:'none'},tCut);
tl.fromTo('#stars2',{x:0},{x:-2800,duration:12,ease:'none'},tCut);
for(let k=0;k<5;k++) shake(tCut+.5+k*.8,5,4);
// Blip announces the destination
BP.talk(L[10]+.02,L[10]+DU[10]-.05,'mBg','mSm',.13);BP.eyes(L[10],'happy');
tl.to('#bpArmR',{rotation:-100,duration:.25,ease:'back.out(2)'},L[10]);tl.fromTo('#bpArmR',{rotation:-100},{rotation:-80,duration:.15,yoyo:true,repeat:7},L[10]+.3);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:11},L[10]);tl.set('#bpAntL',{rotation:0},L[10]+DU[10]+.1);
// Planet Zorp grows in the porthole
tl.set('#zorpW',{opacity:1,scale:.02},tCut+.4);
tl.fromTo('#zorpW',{scale:.02},{scale:.95,duration:L[11]+.2-(tCut+.4),ease:'power2.in'},tCut+.4);
faces(W(10,2),'happy','Big');
['#nmSq','#cmSq','#mcSq','#tfSq','#zpSq','#ptSq','#boSq'].forEach((s,i)=>hop(s,W(10,2)+.05+i*.05,44,.12,.18));
hearts(W(10,2)+.2,1400,1100,4,100,240);

/* ================= SCENE 11: "But somebody was hiding in the pancakes!" — Rocky! ================= */
camTo(L[11]-.35,1.0,...CAM.fin,'power2.inOut');
tl.to('#stkRk',{y:0,duration:.35,ease:'back.out(2.2)'},tHide);
RP.eyes(tHide,'wide');RP.m(tHide,'mSm');RP.brows(tHide,10,-10,0,.15);
RP.look(tHide+.05,-26,2,.1);RP.look(tHide+.45,26,-2,.1);RP.look(tHide+.85,-18,4,.1);RP.look(tHide+1.2,0,0,.1);
RP.m(tHide+.9,'mBg');RP.eyes(tHide+1.0,'happy');
tl.fromTo('#stkIn',{rotation:-1.5},{rotation:1.5,duration:.22,yoyo:true,repeat:7},tHide+.3);tl.set('#stkIn',{rotation:0},tHide+2.1);
sparks(tHide+.3,470,FLOOR+70+(STOP-60)*.8,6,100);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

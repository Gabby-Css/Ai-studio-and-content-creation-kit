/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: Mochi + the empty pedestal on the left, Bo follows the footprint trail along the front of the stage,
// the Jiggles pop up in their own row at the front right, Peanut steps into the gap behind them for his line
const PEDX=1040;
const BOD=[1640,ROWD+BOY], BOT=[1720,ROWD+BOY];             // Bo: down to the front of the stage, then a few steps along the trail
const JX={j1:1800,j2:1950,j3:2150,j4:2300}, SPX=2050;       // the Jiggles' row + where the spatula stands between them
const CAM={wide:[380,-220,.53], ped:camOn(1100,1650,.85,540,900), king:camOn(...eyeAt('kg',2170,ROWB,1.5),.9,600,780),
 mochi:[370,885,1.0], bo:[1000,811,1.0], prints0:[820,729,.85], prints1:[1180,729,.85], zap:[680,889,.9], kj:[1400,260,.9], jig:[1100,588,.8], up:[1000,-250,.8], sky:[380,-1100,.53]};
const tPrints=L[5]+.2;                                     // the footprints show up one by one
const tPop=L[8]+.35;                                       // the Jiggles pop out
const tTie=W(10,4);                                        // "...my BALLOONS..."
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
let rgn=0;
const pingAt=(t,x,y)=>{const i=(rgn++)%4;tl.set('#rgw'+i,{x,y},t);tl.fromTo('#rg'+i,{opacity:1,scale:.3},{opacity:0,scale:3.2,duration:.8,ease:'power1.out'},t);};
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
const JN=['j1','j2','j3','j4'], JJ={j1:J1,j2:J2,j3:J3,j4:J4};

/* ================= SCENE 1: "Everybody gasped. The spatula was missing!" ================= */
camSet(0,...CAM.wide);
faces(0,'wide','O');lookAll(0,-30,10);KG.eyes(0,'wide');KG.m(0,'mO');J1.eyes(0,'wide');J1.m(0,'mO');
camTo(.3,1.4,...CAM.ped,'power2.inOut');
tl.fromTo('#ped',{y:0},{y:-6,duration:.3,yoyo:true,repeat:5},.5);
hop('#ptSq',.2,40,.12,.16);

/* ================= SCENE 2: the King: "Find it, or no more pancakes ever!" ================= */
camTo(L[2]-.5,1.0,...CAM.king,'power2.inOut');
KG.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mOp',.16);KG.eyes(L[2],'normal');KG.brows(L[2],14,-14,-6,.12);
tl.to('#kgArmL',{rotation:120,duration:.25},L[2]);tl.to('#kgArmR',{rotation:-120,duration:.25},L[2]);
tl.fromTo('#kgBelly',{scale:1},{scale:1.1,duration:.2,yoyo:true,repeat:9},L[2]);
shake(L[2]+.2,10,6);shake(L[2]+1.5,8,6);
tl.fromTo('#fStacks > g',{y:0},{y:10,duration:.18,yoyo:true,repeat:5,stagger:.04},L[2]+.3);
armsDown(L[2]-.1,.25);faces(L[2]+.2,'wide','O');lookAll(L[2]+.2,30,-20);

/* ================= SCENE 3: Mochi: "Hmph. I will take the case. Obviously." â€” detective hat and magnifying glass ================= */
camTo(L[3]-.4,.9,...CAM.mochi,'power2.inOut');
MC.m(L[3]+.1,'mFr');MC.talk(L[3]+.12,L[3]+DU[3]-.08,'mOp','mFr',.16);mcEyes(L[3]+.15,'lids');MC.brows(L[3]+.1,8,-8,2,.2);
tl.set('#mcHat',{opacity:1},L[3]+.2);tl.fromTo('#mcHat',{y:-260},{y:0,duration:.35,ease:'bounce.out'},L[3]+.2);sparks(L[3]+.5,820,ROWD-520,6,100);
tl.set('#mcMag',{opacity:1},L[3]+.7);tl.to('#mcArmR',{rotation:-100,duration:.3,ease:'back.out(2)'},L[3]+.7);
tl.fromTo('#mcMag',{rotation:-8},{rotation:8,duration:.3,yoyo:true,repeat:5},L[3]+1.0);
lookAll(L[3]+.3,-24,10);

/* ================= SCENE 4: Bo: "I'll help! I can sniff out clues!" â€” he hops down to the front of the stage ================= */
runTo('bo',BOD[0],BOD[1],L[4]-.75,.65,.88,20);
camTo(L[4]-.5,.8,...CAM.bo,'power2.inOut');
bTalk(L[4]+.02,L[4]+DU[4]-.08);brows(L[4]+.05,14,-14,-4,.15);look(L[4]+.05,10,18,.15);eyesMode(L[4]+.05,'wide');
tl.to('#boLean',{rotation:14,duration:.3},L[4]+.5);tl.fromTo('#boSq',{y:0},{y:24,duration:.14,yoyo:true,repeat:11},L[4]+.6);
tl.set('#boLean',{rotation:0},L[4]+DU[4]);
faces(L[4]+.3,'normal','Sm');lookAll(L[4]+.3,20,10);

/* ================= SCENE 5: "They found sticky little footprints." â€” a trail along the front of the stage ================= */
camTo(L[5]-.3,1.9,...CAM.prints1,'sine.inOut');                // ease back and pan along the trail with Bo
tl.set('#boLean',{rotation:0},L[5]-.3);
for(let i=0;i<12;i++){const t=tPrints+i*.14;tl.fromTo('#fp'+i,{opacity:0,scale:.2},{opacity:1,scale:1,duration:.2,ease:'back.out(2.6)'},t);}
for(let i=0;i<12;i+=2) sparks(tPrints+i*.14+.1,1180+i*100,ROWJ+30,3,40);
runTo('bo',BOT[0],BOT[1],L[5]+.3,1.0,.88,16);tl.to('#boLean',{rotation:12,duration:.3},L[5]+.3);tl.to('#boLean',{rotation:0,duration:.3},L[5]+1.4);
faces(L[5]+.2,'wide','O');lookAll(L[5]+.2,20,30);

/* ================= SCENE 6: Zap: "Beep boop! Tiny, round, and very sticky!" â€” he scans the trail ================= */
camTo(L[6]-.4,.8,...CAM.zap,'power2.inOut');
ZP.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mSm',.13);ZP.eyes(L[6],'happy');
for(let k=0;k<4;k++) pingAt(L[6]+.3+k*.4,1380+k*130,ROWJ+30);
tl.to('#zpArmL',{rotation:100,duration:.25},L[6]+.2);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[6]);tl.set('#zpAnt',{rotation:0},L[6]+DU[6]);

/* ================= SCENE 7: Bo: "Tiny and round? It must be Jiggle!" â€” everybody stares at the Jiggle on the King's head ================= */
camTo(L[7]-.4,.9,...CAM.kj,'power2.inOut');
BP.eyes(L[7],'wide');
const BULB=[BOT[0]-40,BOT[1]-830];
tl.set('#bulb',{x:BULB[0],y:BULB[1]},L[7]+.3);tl.fromTo('#bulb',{opacity:0,scale:.2},{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},L[7]+.35);tl.to('#bulb',{opacity:0,duration:.25},L[7]+1.4);sparks(L[7]+.5,BULB[0],BULB[1],5,80);
bTalk(L[7]+.02,L[7]+DU[7]-.08);brows(L[7]+.05,14,-14,-4,.15);eyesMode(L[7]+.05,'wide');look(L[7]+.4,30,-20,.15);
tl.to('#boArmL',{rotation:-100,duration:.2},L[7]+.6);
lookAll(L[7]+.5,36,-30);
J1.eyes(L[7]+.7,'wide');J1.m(L[7]+.7,'mO');J1.look(L[7]+.7,-24,0,.1);tl.set('#j1Sweat',{opacity:1},L[7]+1.0);
KG.eyes(L[7]+.7,'normal');KG.m(L[7]+.7,'mSm');

/* ================= SCENE 8: "Four Jiggles popped out from behind the cake!" â€” they land in a row at the front ================= */
camTo(L[8]-.3,.9,...CAM.jig,'power2.inOut');
tl.set('#j1Sweat',{opacity:0},L[8]);
JN.forEach((j,i)=>{const t=tPop+i*.18,isF=j==='j1';
 if(!isF){tl.set('#'+j,{opacity:1,x:JX[j],y:ROWJ+140,scale:.55},t-.01);tl.set(`#${j}ArmL`,{rotation:0},t);tl.set(`#${j}ArmR`,{rotation:0},t);
   tl.fromTo('#'+j,{y:ROWJ+140},{y:ROWJ,duration:.5,ease:'back.out(1.8)'},t);}
 else{tl.fromTo('#'+j,{y:950},{y:ROWJ,duration:.5,ease:'power2.in'},t);tl.fromTo('#'+j,{x:2170},{x:JX[j],duration:.5,ease:'none'},t);tl.to('#'+j,{scale:.55,duration:.2},t);}
 JJ[j].eyes(t+.3,'normal');JJ[j].m(t+.3,'mSm');
 sparks(t+.4,JX[j],ROWJ-80,4,70);});
faces(tPop+.5,'wide','O');lookAll(tPop+.5,10,20);
['j1','j2','j3','j4'].forEach((j,i)=>hop(`#${j}Sq`,tPop+.9+i*.1,50,.12,.16));

/* ================= SCENE 9: the Jiggles: "We just wanted to play with it!" ================= */
['j1','j2','j3','j4'].forEach((j,i)=>{JJ[j].talk(L[9]+.02+i*.02,L[9]+DU[9]-.06,'mBg','mSm',.14);JJ[j].eyes(L[9],'happy');});
tl.set('#flyW',{opacity:1,x:SPX,y:ROWJ+10,scale:.8},L[9]-.2);tl.set('#gspIn',{rotation:180},L[9]-.2);
tl.fromTo('#flyW',{scale:.2},{scale:.8,duration:.4,ease:'back.out(2)'},L[9]-.2);sparks(L[9],SPX,ROWJ-200,6,100);
['j1','j2','j3','j4'].forEach((j,i)=>{tl.to(`#${j}ArmL`,{rotation:90,duration:.2},L[9]+.2+i*.05);tl.fromTo(`#${j}Sq`,{rotation:-3},{rotation:3,duration:.18,yoyo:true,repeat:7},L[9]+.2);});
faces(L[9]+.3,'normal','Sm');lookAll(L[9]+.3,10,30);
// Peanut steps into the gap behind the Jiggles (Bo's empty mark) for his line
runTo('pt',1350,ROWB,L[9]+.6,.9,.7,18);

/* ================= SCENE 10: Peanut: "Oops! I tied my balloons to it!" ================= */
PT.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);PT.eyes(L[10],'wide');
tl.fromTo('#ptTrunk',{rotation:0},{rotation:-35,duration:.25,yoyo:true,repeat:5},L[10]+.3);
tl.set('#bals',{opacity:1},tTie);tl.fromTo('#bals',{scale:.1},{scale:1,duration:.45,ease:'back.out(2)'},tTie);
sparks(tTie+.2,SPX,ROWJ-520,6,100);
tl.fromTo('.bln',{rotation:-4},{rotation:4,duration:.4,yoyo:true,repeat:11,ease:'sine.inOut'},tTie+.4);
// the balloons lift the spatula (it flips blade-down)
tl.to('#gspIn',{rotation:0,duration:.5,ease:'back.out(1.7)'},tTie+.5);
tl.to('#flyW',{y:ROWJ-520,duration:.6,ease:'power2.in'},tTie+.5);
lookAll(tTie+.5,0,-30);

/* ================= SCENE 11: "And up, up, away it floated!" ================= */
const tSky=L[11]+1.0;
camTo(L[11]-.1,1.0,...CAM.up,'power1.inOut');
tl.to('#flyW',{y:150,x:1720,duration:1.0,ease:'power2.in'},L[11]);            // drifts left, clear of the King's face
tl.fromTo('#fly',{rotation:-6},{rotation:6,duration:.5,yoyo:true,repeat:9,ease:'sine.inOut'},L[11]);
// ...out through the ceiling and into the sunny sky
tl.fromTo('#flash',{opacity:.7},{opacity:0,duration:.35},tSky);
tl.set('#skySet',{opacity:1},tSky);tl.set('#fTable,#table,#plate,#oven,#pedW,#kg,#kcrnW,#kcrn,.fp',{opacity:0},tSky);
camSet(tSky,...CAM.sky);
tl.set('#flyW',{x:1720,y:-450},tSky);tl.to('#flyW',{y:-2300,x:1850,duration:2.6,ease:'none'},tSky);
tl.fromTo('.cld',{x:0},{x:-260,duration:3,ease:'none'},tSky);
faces(L[11],'wide','O');lookAll(L[11],0,-40);
armsUp(L[11]+.2,.15);
['j1','j2','j3','j4'].forEach((j,i)=>{tl.to(`#${j}ArmL`,{rotation:150,duration:.15},L[11]+.2);tl.to(`#${j}ArmR`,{rotation:-150,duration:.15},L[11]+.2);JJ[j].eyes(L[11],'wide');JJ[j].m(L[11],'mO');JJ[j].look(L[11],0,-30,.1);});
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

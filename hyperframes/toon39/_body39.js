/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the crew queues on the left rim of the canyon, crosses the rope bridge two at a time (Gumdrop holds the post, then crosses last, Boo floats over the top),
// on the right rim syrup splashes on the map, Peanut remembers the way and leads everybody to a big X where a treasure chest pops out of the sand - locked tight
const ECAM=(p,m,s=.95,sx=540,sy=780)=>camE(m[0]+EYE[p][0]*m[2],m[1]+EYE[p][1]*m[2],s,sx,sy);   // a close-up on a character's eyes (m = [x,y,scale])
const FOFF={bo:BOY,pan:-50};                                // characters whose y is not their feet
const CAM={wide:[480,-100,.5], bridge:camE(1450,1700,.7,540,800), zp:ECAM('zp',LFT.zp), gm:ECAM('gm',LFT.gm,.9),
 gh1:camE(700,1030+EYE.gh[1]*.75,1.0,540,780), gh2:camE(2000,1180+EYE.gh[1]*.75,1.0,540,780), right:camE(2250,1700,.62,540,800),
 bo:ECAM('bo',RGT.bo), pt:ECAM('pt',RGT.pt), gather:camE(2350,1850,.55,540,800), tf:ECAM('tf',GAT.tf), lock:camE(2300,1840,1.3,540,740)};
const PAIRS=[['zp','bo',L[2]+.35],['tf','mc',L[2]+1.5],['cm','pan',L[3]+.55],['nm','pb',L[3]+1.5],['pt','bp',L[4]-.1],['rk','nb',L[4]+.8]];
const tGum=L[5]+.4, tBoo=L[5]-.1;
const tSyr=W(6,1), tBX=W(9,6)-.1, tCh=W(10,2)-.05;
const tStk=L[11]+DU[11]+.5;
function yAtX(p,x,xs,ys,xe,ye){const f=FOFF[p]||0,dk=BRY(0)-34+f,ek=BRY(1)-34+f;
 if(x<=BRG.x0) return ys+(dk-ys)*Math.min(1,Math.max(0,(x-xs)/Math.max(1,BRG.x0-xs)));
 if(x<=BRG.x1) return BRY((x-BRG.x0)/(BRG.x1-BRG.x0))-34+f;
 return ek+(ye-ek)*Math.min(1,Math.max(0,(x-BRG.x1)/Math.max(1,xe-BRG.x1)));}
function cross(p,t0,dur,K=12){const [xs,ys]=LFT[p],[xe,ye]=RGT[p],id='#'+p;
 tl.to(id,{x:xe,duration:dur,ease:'none'},t0);
 for(let k=0;k<K;k++) tl.to(id,{y:yAtX(p,xs+(xe-xs)*(k+1)/K,xs,ys,xe,ye),duration:dur/K,ease:'none'},t0+k*dur/K);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,16,8,`${id}Sq`,6);}

/* ---- ambient: the planks wobble in a travelling wave, fog and clouds drift, Boo floats ---- */
for(let i=0;i<BRG.n;i++) tl.fromTo('#brp'+i+' .brpl',{y:-6},{y:6,duration:.34,yoyo:true,repeat:85,ease:'sine.inOut'},i*.035);
tl.to('#canFog',{x:-140,duration:30,ease:'none'},0);tl.to('#canClouds',{x:-260,duration:30,ease:'none'},0);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#brdg',{y:0},{y:5,duration:.2,yoyo:true,repeat:40,ease:'sine.inOut'},L[2]+.8);   // the whole bridge sways while people cross

/* ================= SCENE 1: "A wobbly bridge crossed the canyon!" ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,34,-4);
tl.fromTo('#brdgW',{y:-30},{y:0,duration:.5,ease:'bounce.out'},.1);

/* ================= SCENE 2: Zap: "Beep boop! Two at a time!" — he and Bo step on first ================= */
camTo(L[2]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);ZP.eyes(L[2],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[2]);tl.set('#zpAnt',{rotation:0},L[2]+DU[2]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[2]+.2);tl.to('#zpArmL',{rotation:0,duration:.2},L[2]+.9);
faces2(L[2]+.2,'normal','Sm');lookAll2(L[2]+.3,30,0);
camTo(L[2]+.6,.9,...CAM.bridge,'sine.inOut');
PAIRS.forEach(([a,b,t])=>{cross(a,t,2.1);cross(b,t+.15,2.1);});

/* ================= SCENE 3: Gumdrop: "Roar! I'll hold the bridge!" — he grips the rope post ================= */
camTo(L[3]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);GM.eyes(L[3],'wide');
tl.to('#gmArmL',{rotation:110,duration:.2},L[3]+.1);tl.to('#gmArmR',{rotation:-110,duration:.2},L[3]+.1);
tl.fromTo('#gmLean',{x:-3},{x:3,duration:.06,yoyo:true,repeat:15},L[3]+.4);tl.set('#gmLean',{x:0},L[3]+1.4);hop('#gmSq',L[3]+.05,30,.1,.14);

/* ================= SCENE 4: "Step by step, they crossed." — wide montage ================= */
camTo(L[4]-.45,.8,...CAM.wide,'power2.inOut');
faces2(L[4]+.1,'normal','Sm');

/* ================= SCENE 5: Boo: "I'll float across. Boo." — he drifts over the chasm, Gumdrop follows ================= */
camTo(L[5]-.45,.7,...CAM.gh1,'power2.inOut');
GH.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);GH.eyes(L[5],'normal');
tl.to('#gh',{x:2300,duration:2.0,ease:'sine.inOut'},tBoo);tl.to('#ghArmL',{rotation:60,duration:.3},tBoo);tl.to('#ghArmR',{rotation:-60,duration:.3},tBoo);
camTo(L[5]+.5,1.0,...CAM.gh2,'sine.inOut');
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},tGum-.15);cross('gm',tGum,1.5);

/* ================= SCENE 6: "Syrup splashed on the map!" ================= */
camTo(L[6]-.45,.8,...CAM.right,'power2.inOut');
tl.to('#ghArmL,#ghArmR',{rotation:0,duration:.2},L[6]);
tl.set('#mapW',{opacity:1},L[6]-.15);tl.fromTo('#map',{scale:.05,rotation:-20},{scale:.5,rotation:0,duration:.4,ease:'back.out(2)'},L[6]-.15);
tl.fromTo('#map',{y:0},{y:-12,duration:.7,yoyo:true,repeat:9,ease:'sine.inOut'},L[6]+.3);
tl.set('#syrW',{opacity:1,x:2330,y:900},tSyr-.4);tl.to('#syrW',{y:1440,duration:.4,ease:'power2.in'},tSyr-.4);tl.set('#syrW',{opacity:0},tSyr);
tl.set('#msplat',{opacity:1},tSyr);tl.fromTo('#msplat',{scale:.1},{scale:1,duration:.35,ease:'back.out(2)'},tSyr);
sparks(tSyr+.05,2330,1440,8,120);shake(tSyr,9,5);faces2(tSyr,'wide','O');lookAll2(tSyr,0,-24);

/* ================= SCENE 7: Bo: "Oh no! We can't read it!" ================= */
camTo(L[7]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[7]+.02,L[7]+DU[7]-.06);eyesMode(L[7]+.02,'wide');brows(L[7]+.05,-10,10,2,.15);
tl.to('#boArmL',{rotation:-110,duration:.2},L[7]+.2);tl.to('#boArmR',{rotation:110,duration:.2},L[7]+.2);hop('#boSq',L[7]+.3,30,.1,.14);
faces2(L[7]+.1,'wide','Fr');lookAll2(L[7]+.2,-20,6);

/* ================= SCENE 8: Peanut: "I remember the map! Go left!" ================= */
camTo(L[8]-.45,.7,...CAM.pt,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[8]-.3);tl.to('#boArmR',{rotation:0,duration:.2},L[8]-.3);
PT.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);PT.eyes(L[8],'happy');hop('#ptSq',L[8]+.1,40,.12,.16);
tl.to('#ptArmL',{rotation:110,duration:.2},W(8,4)-.15);
tl.set('#lftW',{opacity:1,x:1890,y:1500},W(8,4));tl.fromTo('#lft',{scale:.1},{scale:.7,duration:.3,ease:'back.out(2.2)'},W(8,4));
tl.fromTo('#lft',{x:0},{x:-50,duration:.25,yoyo:true,repeat:5,ease:'sine.inOut'},W(8,4)+.3);tl.to('#lftW',{opacity:0,duration:.25},L[9]+.3);
lookAll2(W(8,4),-30,0);

/* ================= SCENE 9: "Peanut led them to the big X!" — everybody follows him to the sand ================= */
tl.to('#mapW',{opacity:0,duration:.3},L[9]-.3);tl.to('#ptArmL',{rotation:0,duration:.2},L[9]-.2);
camTo(L[9]-.45,.9,...CAM.gather,'power2.inOut');
const ORD=['pt','bo','zp','tf','pan','pb','gm','rk','cm','mc','nm','bp','nb'];
ORD.forEach((p,i)=>{const [x,y]=GAT[p],t=L[9]+.05+i*.07;runTo(p,x,y,t,1.5,.7,16);});
tl.set('#bigxW',{opacity:1,x:2300,y:2090},tBX);tl.to('.bx1',{strokeDashoffset:0,duration:.18,ease:'none'},tBX);tl.to('.bx2',{strokeDashoffset:0,duration:.18,ease:'none'},tBX+.2);
sparks(tBX+.4,2300,2060,8,150);faces2(tBX,'happy','Big');lookAll2(tBX,0,16);

/* ================= SCENE 10: Truffle: "A treasure chest! Open it!" — the chest pops up out of the sand ================= */
camTo(L[10]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);TF.eyes(L[10],'happy');
tl.set('#chBW,#chFW',{opacity:1},tCh);tl.fromTo('#chBW',{scale:.05,y:CH0[1]+120},{scale:CH0[2],y:CH0[1]-2,duration:.45,ease:'back.out(2)'},tCh);
tl.fromTo('#chFW',{scale:.05,y:CH0[1]+120},{scale:CH0[2],y:CH0[1]+2,duration:.45,ease:'back.out(2)'},tCh);
sparks(tCh+.3,2300,1850,10,230);dust(tCh+.3,2150,2000,2);dust(tCh+.32,2450,2000,2);shake(tCh+.3,9,5);hearts(tCh+.4,2300,1650,5,120,260);
tl.to('#tfArmL',{rotation:150,duration:.18},W(10,3)-.1);tl.to('#tfArmR',{rotation:-150,duration:.18},W(10,3)-.1);hop('#tfSq',W(10,3),50,.14,.18);
faces2(tCh+.1,'wide','Big');lookAll2(tCh+.1,-22,10);armsUp(W(10,3),.15);

/* ================= SCENE 11: "But the chest was locked tight!" — the lock rattles ================= */
camTo(L[11]-.4,.7,...CAM.lock,'power2.inOut');
armsDown(L[11]-.2,.2);
tl.fromTo('#chLock',{rotation:-9},{rotation:9,duration:.06,yoyo:true,repeat:11},L[11]+.2);tl.set('#chLock',{rotation:0},L[11]+1.0);
tl.fromTo('#chLid',{y:0},{y:-12,duration:.1,yoyo:true,repeat:3},L[11]+.3);
faces2(L[11]+.2,'normal','Fr');lookAll2(L[11]+.2,-6,12);sparks(L[11]+.25,2300,1870,4,70);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={fin:[500,-450,.55], earth:[-900,-350,.55], cast:[600,-250,.62], sl1:[800,-420,.6], sl2:[-250,-470,.6], kit:[830,-300,.62], feast:[1150,-140,.78], end:[700,-380,.56]};
const LX=880, RAMP_B=1070, DOOR=945;
const COME={bo:[1830,.88],tf:[1600,.74],mc:[1520,.68],cm:[1420,.76],nm:[1330,.5],pt:[1700,.7],zp:[1760,.68],bp:[1250,.62],gm:[1300,1.25]};     // = where #19 ended
const OUTK={gm:[1130,1.25],tf:[1250,.74],mc:[1340,.68],bp:[1430,.62],cm:[1690,.76],nm:[1765,.5],zp:[1825,.68],pt:[1905,.7],bo:[2010,.88]};     // the kitchen
const TWK=1560;                                            // the Sunday tower's spot (between Blip and Coco)
const tBoard=L[4]+.1;                                      // they start boarding while Munch waves bye-bye
const tLift=L[5]-.3;                                       // the saucer lifts off
const tS0=L[5]+.55;                                        // ... and slides down the rainbow
const tEarth=L[7]-.55;                                     // arrives at Earth
const tKit=L[7]-.25;                                       // the cut to the kitchen
const tSun=W(8,1), tTower=W(8,2);                          // "IT'S SUNDAY! PANCAKES..."
const tSl=W(9,0)+.25;                                      // the feast is shared
const tRk=W(10,4);                                         // "...PASS the pancakes!"
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const RP=mkRock('rkp'), MN=mkRock('mn'), ZN=['z1','z2','z3','z4'], ZZ={z1:mkRock('z1'),z2:mkRock('z2'),z3:mkRock('z3'),z4:mkRock('z4')};
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
// a cast member walks to the ramp, shrinks and disappears into the doorway
function enter(p,t0,spd=650){const [x0,s0]=COME[p],id='#'+p,d1=Math.max(.05,Math.abs(x0-RAMP_B)/spd);
 tl.fromTo(id,{x:x0},{x:RAMP_B,duration:d1,ease:'none'},t0);
 tl.set(`#${p}ArmL`,{rotation:0},t0);tl.set(`#${p}ArmR`,{rotation:0},t0);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0,t0+d1,.26,24,12,`#${p}Sq`,9);
 const t1=t0+d1;
 tl.fromTo(id,{x:RAMP_B},{x:DOOR,duration:.55,ease:'power1.in'},t1);
 tl.fromTo(id,{y:FLOOR},{y:FLOOR-110,duration:.55,ease:'none'},t1);
 tl.fromTo(id,{scale:s0},{scale:s0*.07,duration:.55,ease:'power2.in'},t1);
 tl.set(id,{opacity:0},t1+.55);sparks(t1+.5,DOOR,FLOOR-130,3,40);
 return t1+.55;}
// ... and the reverse: stepping out of the saucer door
function walkOut(p,t0,spd=640){const [xf,s]=OUTK[p],id='#'+p;
 tl.set(id,{opacity:1,x:DOOR,y:FLOOR-110,scale:s*.07},t0);tl.set(`#${p}ArmL`,{rotation:0},t0);tl.set(`#${p}ArmR`,{rotation:0},t0);
 tl.fromTo(id,{x:DOOR},{x:RAMP_B,duration:.55,ease:'power1.out'},t0);
 tl.fromTo(id,{y:FLOOR-110},{y:FLOOR,duration:.55,ease:'none'},t0);
 tl.fromTo(id,{scale:s*.07},{scale:s,duration:.55,ease:'power2.out'},t0);
 const d=Math.max(.2,Math.abs(xf-RAMP_B)/spd),t1=t0+.55;
 tl.fromTo(id,{x:RAMP_B},{x:xf,duration:d,ease:'none'},t1);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t1,t1+d,.26,24,12,`#${p}Sq`,9);
 return t1+d;}
// the rainbow's middle stripe (a cubic Bezier, the same curve as the <path>s), sampled for the saucer to ride on
const BZ=(t)=>{const P=[[2120,860],[1750,-330],[520,-420],[-500,330]],u=1-t;
 return [u*u*u*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t*t*t*P[3][0], u*u*u*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t*t*t*P[3][1]];};

/* ================= SCENE 1: "A rainbow stretched from Zorp to Earth!" — the camera follows it across the sky ================= */
camSet(0,...CAM.fin);
faces(0,'happy','Big');lookAll(0,-30,-30);ZN.forEach(z=>{ZZ[z].eyes(0,'happy');ZZ[z].m(0,'mBg');ZZ[z].look(0,-26,-26,.1);});
MN.eyes(0,'happy');MN.m(0,'mSm');MN.look(0,-30,-20,.1);
camTo(.25,2.1,...CAM.earth,'power2.inOut');
sparks(1.6,-420,300,10,300);sparks(2.0,-540,450,10,300);
tl.fromTo('#earthZ',{scale:1},{scale:1.04,duration:.4,yoyo:true,repeat:5},.4);

/* ================= SCENE 2: Blip: "That's the way home!" ================= */
camTo(L[2]-.6,1.3,...CAM.cast,'power2.inOut');
BP.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.13);BP.eyes(L[2],'happy');
tl.to('#bpArmR',{rotation:-100,duration:.25,ease:'back.out(2)'},L[2]);tl.fromTo('#bpArmR',{rotation:-100},{rotation:-75,duration:.15,yoyo:true,repeat:5},L[2]+.3);
hop('#bpSq',L[2]+.1,70,.15,.2);hop('#bpSq',L[2]+.6,70,.15,.2);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[2]);tl.set('#bpAntL',{rotation:0},L[2]+DU[2]);
faces(L[2]+.3,'happy','Big');lookAll(L[2]+.3,-20,-24);

/* ================= SCENE 3: the Commander: "Come back soon, friends!" ================= */
ZZ.z1.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.13);ZZ.z1.eyes(L[3],'happy');
runTo('z1',1900,FLOOR,L[3]-.3,.6,.62,16);
tl.fromTo('#z1ArmL',{rotation:150},{rotation:100,duration:.16,yoyo:true,repeat:9},L[3]);
tl.fromTo('#z2ArmR',{rotation:-150},{rotation:-100,duration:.16,yoyo:true,repeat:9},L[3]+.05);tl.fromTo('#z3ArmL',{rotation:150},{rotation:100,duration:.16,yoyo:true,repeat:9},L[3]+.1);tl.fromTo('#z4ArmR',{rotation:-150},{rotation:-100,duration:.16,yoyo:true,repeat:9},L[3]+.15);
tears(L[3]+.4,1900,FLOOR-190,3,22,160);hearts(L[3]+.5,1850,FLOOR-380,4,90,260);

/* ================= SCENE 4: Munch: "Bye bye, little friends!" — everybody climbs into the saucer ================= */
MN.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.2);MN.eyes(L[4],'happy');MN.look(L[4],-30,24,.2);
tl.fromTo('#mnArmL',{rotation:140},{rotation:90,duration:.22,yoyo:true,repeat:9},L[4]);
tl.set('#mnTear',{opacity:1},L[4]+.2);tears(L[4]+.2,2150,FLOOR-544*2.0+60,6,150,560);
tl.fromTo('#mnHead',{rotation:-4},{rotation:4,duration:.25,yoyo:true,repeat:7},L[4]);tl.set('#mnHead',{rotation:0},L[4]+DU[4]+.1);
const tEn={gm:tBoard,pt:tBoard+.05,bo:tBoard+.1,cm:tBoard+.2,nm:tBoard+.25,mc:tBoard+.3,tf:tBoard+.35,zp:tBoard+.55,bp:tBoard+.65};
let tLast=0;Object.entries(tEn).forEach(([p,t])=>{tLast=Math.max(tLast,enter(p,t,p==='gm'?950:700));});
tl.fromTo('#gmSq',{scaleX:1,scaleY:1},{scaleX:1.4,scaleY:.8,duration:.15,yoyo:true,repeat:3},tBoard+1.4);dust(tBoard+1.7,RAMP_B,FLOOR+6,1.2);
tl.to('#gh',{x:DOOR,y:FLOOR-150,scale:.05,duration:.6,ease:'power2.in'},tEn.bp+.2);tl.set('#gh',{opacity:0},tEn.bp+.85);
armsDown(tBoard-.15,.2);faces(tBoard-.1,'happy','Big');
// the Zorpians wave goodbye
ZN.forEach((z,i)=>{tl.fromTo(`#${z}ArmL`,{rotation:150},{rotation:110,duration:.18,yoyo:true,repeat:13},tBoard+i*.06);tl.fromTo(`#${z}ArmR`,{rotation:-150},{rotation:-110,duration:.18,yoyo:true,repeat:13},tBoard+.1+i*.06);});

/* ================= SCENE 5: "So the saucer slid down the rainbow!" ================= */
camTo(L[5]-.5,1.3,...CAM.sl1,'power2.inOut');
tl.to('#ufoLRamp',{scaleY:.05,duration:.2},tLift-.3);
tl.fromTo('#ufoLIn',{scale:1},{scale:1.08,duration:.12,yoyo:true,repeat:3},tLift-.3);
dust(tLift,LX-110,FLOOR+6,2);dust(tLift+.05,LX+110,FLOOR+6,2);shake(tLift,8,6);
// lift off, fly up to the rainbow, then slide down it (the saucer rides on the top stripe)
const PT0=0.30, PT1=1.0, NSEG=36, SD=L[7]-.3-tS0-.1;           // path parameter range + number of little segments + slide duration
const spf=(f)=>BZ(PT0+(PT1-PT0)*Math.pow(f,1.25));
const [sx0,sy0]=spf(0);
tl.to('#ufoL',{x:sx0,y:sy0-12,rotation:-8,duration:tS0-tLift,ease:'power2.inOut'},tLift);
let prev=[sx0,sy0];
for(let k=1;k<=NSEG;k++){const [x,y]=spf(k/NSEG),[xa,ya]=spf((k-1)/NSEG),ang=Math.max(-32,Math.min(32,(((Math.atan2(y-ya,x-xa)*180/Math.PI+180)+540)%360)-180)),dt=SD/NSEG;
 tl.to('#ufoL',{x:x,y:y-12,rotation:ang,duration:dt,ease:'none'},tS0+(k-1)*dt);}
{const tc=L[5]+.85,dtc=(tS0+SD-tc)/8;
 for(let j=0;j<8;j++){const [px,py]=spf(Math.min(1,(tc+(j+1)*dtc-tS0)/SD));camTo(tc+j*dtc,dtc,px-650,py-650,.6,'none');}}
// rainbow sparkles trailing the saucer
for(let k=0;k<12;k++){const [x,y]=spf((k+1)/13);sparks(tS0+SD*Math.pow((k+1)/13,.8),x,y,3,60);}

/* ================= SCENE 6: Bo: "Wheeee!" ================= */
const BOX_=192,BOY_=522;   // Bo's rig has an offset pivot: at scale .3 GSAP shifts him by (1-.3)*(-274,-746) so we add it back
tl.set('#bo',{opacity:1,x:sx0+BOX_,y:sy0-240+BOY_,scale:.3},tS0-.3);tl.set('#boArmL',{rotation:-160},tS0-.3);tl.set('#boArmR',{rotation:160},tS0-.3);
eyesMode(tS0-.3,'wide');bm(tS0-.3,'mBig');
for(let k=1;k<=NSEG;k++){const [x,y]=spf(k/NSEG),dt=SD/NSEG;tl.to('#bo',{x:x+BOX_,y:y-12-232+BOY_,duration:dt,ease:'none'},tS0+(k-1)*dt);}
tl.fromTo('#boSq',{y:0},{y:-8,duration:.12,yoyo:true,repeat:Math.round(SD/.12)},tS0);
tl.fromTo('#boEarL,#boEarR',{rotation:-8},{rotation:8,duration:.1,yoyo:true,repeat:Math.round(SD/.1)},tS0);
bTalk(L[6]+.02,L[6]+DU[6]+.1,'mBig','mOpen',.1);
// arriving at Earth: the saucer shrinks into the planet
tl.to('#ufoL',{scale:.2,duration:.5,ease:'power2.in'},tEarth);{const [ex,ey]=spf(1);tl.to('#bo',{scale:.06,x:ex+257,y:ey-12-232+701,duration:.5,ease:'power2.in'},tEarth);}
tl.fromTo('#flash',{opacity:0},{opacity:1,duration:.3},tEarth+.3);

/* ================= SCENE 7: "And landed in the kitchen at last!" ================= */
tl.set('#zorpSet,#rainbow,#mn,#z1,#z2,#z3,#z4,#hotRock,#stk,#bo',{opacity:0},tKit);
tl.set('#table,#plate,#oven,#kg,#kcrn,#j1',{opacity:1},tKit);
tl.set('#ufoL',{opacity:1,x:LX,y:-800,rotation:0,scale:1},tKit);tl.set('#ufoLRamp',{scaleY:.05},tKit);tl.set('.stl',{opacity:0},tKit);
tl.set('#gh,#ghGlow',{opacity:0},tKit);
camSet(tKit,...CAM.kit);
tl.fromTo('#flash',{opacity:1},{opacity:0,duration:.5},tKit);
KG.eyes(tKit,'happy');KG.m(tKit,'mBg');J1.eyes(tKit,'happy');J1.m(tKit,'mBg');
tl.set('#kgArmL',{rotation:60},tKit);tl.set('#kgArmR',{rotation:-60},tKit);
tl.fromTo('#ufoL',{y:-800},{y:FLOOR,duration:.7,ease:'power2.in'},tKit);
dust(tKit+.7,LX-110,FLOOR+6,2);dust(tKit+.72,LX+110,FLOOR+6,2);shake(tKit+.7,9,6);
tl.to('#ufoLRamp',{scaleY:1,duration:.3,ease:'back.out(1.6)'},tKit+.75);
const tK0=tKit+1.1;let tKF=0;['bo','tf','mc','cm','nm','zp','bp','pt','gm'].forEach((p,i)=>{tKF=Math.max(tKF,walkOut(p,tK0+i*.1,p==='gm'?820:640));});
tl.set('#gh',{opacity:1,x:DOOR,y:FLOOR-150,scale:.05},tK0+.9);tl.set('#ghGlow',{opacity:.3,scale:1},tK0+.9);tl.to('#gh',{x:1200,y:FLOOR-760,scale:.9,duration:1.2,ease:'sine.out'},tK0+.9);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.7,yoyo:true,repeat:14,ease:'sine.inOut'},tK0+1.2);
faces(tK0,'normal','Sm');

/* ================= SCENE 8: the King: "It's Sunday! Pancakes for everybody!" ================= */
camTo(L[8]-.5,.9,...CAM.feast,'power2.inOut');
KG.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);KG.eyes(L[8],'happy');
tl.to('#kgArmL',{rotation:140,duration:.3,ease:'back.out(2)'},L[8]);tl.to('#kgArmR',{rotation:-140,duration:.3,ease:'back.out(2)'},L[8]);
tl.set('#sunTag',{x:1880,y:FLOOR-1000},tSun);
tl.fromTo('#sunTag',{opacity:0,scale:.2,rotation:-12},{opacity:1,scale:.9,rotation:-3,duration:.35,ease:'back.out(2.4)'},tSun);
tl.fromTo('#sunTagIn',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tSun+.35);
sparks(tSun+.1,1880,FLOOR-1000,8,150);tl.to('#sunTag',{opacity:0,scale:.3,duration:.25},L[8]+DU[8]+.2);
// the tower of pancakes builds itself on the table-side
tl.set('#stkW',{x:TWK,y:FLOOR+40,scale:1},tKit);tl.set('#stk',{opacity:1},tTower-.01);tl.set('#stkRk',{y:170},tKit);tl.set('#stkRkW,#stkTop',{opacity:0},tKit);tl.set('#stkFeet',{opacity:0},tKit);
for(let i=0;i<NSL;i++){const t=tTower+i*.07;tl.set('#stl'+i,{opacity:1},t);tl.fromTo('#stl'+i,{y:-860},{y:0,duration:.24,ease:'power2.in'},t);}
tl.set('#stkTop',{opacity:1},tTower+NSL*.07+.1);sparks(tTower+NSL*.07+.1,TWK,FLOOR-470,8,170);
faces(tTower,'happy','Big');hearts(tTower+.5,1900,FLOOR-700,5,110,300);
['#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq','#boSq'].forEach((s,i)=>hop(s,tTower+.3+i*.05,44,.12,.16));

/* ================= SCENE 9: "They shared the biggest feast ever." ================= */
const KMOUTH=FLOOR-414*K0;
const SLT=[['tf',OUTK.tf[0],.74],['mc',OUTK.mc[0],.68],['bp',OUTK.bp[0],.62],['cm',OUTK.cm[0],.76],['nm',OUTK.nm[0],.5],['zp',OUTK.zp[0],.68],['pt',OUTK.pt[0],.7],['bo',OUTK.bo[0],.88]];
SLT.forEach(([p,x,s],i)=>kslice(tSl+i*.09,TWK,FLOOR-420,x,FLOOR-330*s,.6,.9));kslice(tSl+.3,TWK,FLOOR-420,2170,KMOUTH,.8,1.3);
tl.set('#stkTop',{opacity:0},tSl+.2);
for(let k=0;k<NSL-1;k++) tl.set('#stl'+(NSL-1-k),{opacity:0},tSl+.25+k*.05);
tl.set('#stkRkW',{opacity:1},tSl+.2);tl.to('#stkRk',{y:348,duration:(NSL-1)*.05,ease:'none'},tSl+.25);
confetti(tSl+.5,1100,2300,FLOOR-1100,FLOOR+60,36,.9);
faces(tSl+.7,'happy','Big');eyesMode(tSl+.7,'hearts');KG.m(tSl+.9,'mBg');KG.eyes(tSl+.9,'happy');
['#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq','#boSq'].forEach((s,i)=>hop(s,tSl+.9+i*.05,40,.12,.16));
tl.fromTo('#kgBelly',{scale:1},{scale:1.2,duration:.35,ease:'back.out(2)'},tSl+.9);
RP.eyes(tSl+.3,'wide');RP.m(tSl+.3,'mBg');

/* ================= SCENE 10: Rocky: "Okay, I saw something. Pass the pancakes!" ================= */
camTo(L[10]-.4,.8,...CAM.feast,'power2.inOut');
RP.talk(L[10]+.02,L[10]+DU[10]-.05,'mOp','mSm',.15);RP.eyes(L[10],'normal');RP.brows(L[10],12,-12,0,.15);
tl.set('#rkpSweat',{opacity:1},L[10]+.3);
RP.look(L[10]+.2,24,0,.1);RP.look(L[10]+.8,-24,0,.1);RP.look(L[10]+1.4,0,0,.1);
faces(L[10]+.5,'happy','Big');
// somebody passes him a whole pancake: it flies up to his mouth
kslice(tRk,1750,FLOOR-330,TWK,FLOOR+40-200,.6,1.0);
RP.m(tRk+.5,'mBg');RP.eyes(tRk+.55,'happy');tl.set('#rkpSweat',{opacity:0},tRk+.55);
hearts(tRk+.6,TWK,FLOOR-340,4,70,220);sparks(tRk+.6,TWK,FLOOR-200,6,100);

/* ================= SCENE 11: "And that was the end of Season four!" ================= */
camTo(L[11]-.4,1.0,...CAM.end,'power2.inOut');
armsUp(L[11],.15);faces(L[11]+.1,'happy','Big');
confetti(L[11]+.2,900,2400,FLOOR-1400,FLOOR+60,40,1.2);hearts(L[11]+.6,1500,FLOOR-700,6,160,320);hearts(L[11]+1.0,2100,FLOOR-700,6,160,320);
sparks(L[11]+.5,1400,FLOOR-900,10,320);sparks(L[11]+1.1,2000,FLOOR-900,10,320);
['#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq','#boSq'].forEach((s,i)=>{hop(s,L[11]+.3+i*.05,48,.12,.18);hop(s,L[11]+1.2+i*.05,48,.12,.18);});
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

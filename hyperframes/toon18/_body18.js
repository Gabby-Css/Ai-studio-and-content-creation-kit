/* ===== this episode's key moments (all derived from the voice timings) ===== */
const CAM={fin:[70,700,1.2], cock:[440,0,.74], wide:[700,-150,.6], mid:[1250,-60,.82], close:[1500,40,1.0]};
const LX=880, RAMP_B=1070, DOOR=945;
const OUT={gm:[1130,1.25],tf:[1250,.74],mc:[1340,.68],bp:[1430,.62],cm:[1690,.76],nm:[1765,.5],zp:[1825,.68],pt:[1905,.7],bo:[2010,.88]};   // where everybody stands on Zorp
const ZX={z1:2120,z2:2225,z3:2325,z4:2425};               // the Zorpians (z1 = the Commander)
const TWX=1520;                                            // the tower's spot
const tCut=L[5]-.2;                                        // the cut to the outside
const tOut0=tCut+1.05;                                     // the ramp is open, they come out
const tSl=W(7,2);                                          // "...BITE..."
const tBite=tSl+.7;                                        // the slices arrive
const tWorld=W(9,1);                                       // "...COLOR..."
const tShake=L[11]-.1;
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const RP=mkRock('rkp'), ZZ={z1:mkRock('z1'),z2:mkRock('z2'),z3:mkRock('z3'),z4:mkRock('z4')}, ZN=['z1','z2','z3','z4'];
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
// gray -> colour
const zColor=(i,t,d=.8)=>{const c=ZCOL[i-1];['a','b','c','d'].forEach((k,j)=>tl.to(`.z${i}${k}`,{fill:c[j],duration:d},t));tl.to(`.z${i}bs`,{stroke:c[1],duration:d},t);};
const bloom=(t,d=1.5)=>{tl.to('.zSky',{fill:'#7F63E8',duration:d},t);tl.to('.zMtA',{fill:'#FF9A8B',duration:d},t);tl.to('.zMtB',{fill:'#FFD36B',duration:d},t);tl.to('.zGnd',{fill:'#7DF0B0',duration:d},t);
 tl.to('.zCr',{fill:'#5FD19A',duration:d},t);tl.to('.zMoon',{fill:'#FFE98A',duration:d},t);tl.to('.zPl',{fill:'#FFC95A',duration:d},t);tl.to('.zRing',{stroke:'#FF8FD2',duration:d},t);};
// a cast member steps out of the saucer door, growing, and walks to their spot
function walkOut(p,t0,spd=640){const [xf,s]=OUT[p],id='#'+p;
 tl.set(id,{opacity:1,x:DOOR,y:FLOOR-110,scale:s*.07},t0);tl.set(`#${p}ArmL`,{rotation:0},t0);tl.set(`#${p}ArmR`,{rotation:0},t0);
 tl.fromTo(id,{x:DOOR},{x:RAMP_B,duration:.55,ease:'power1.out'},t0);
 tl.fromTo(id,{y:FLOOR-110},{y:FLOOR,duration:.55,ease:'none'},t0);
 tl.fromTo(id,{scale:s*.07},{scale:s,duration:.55,ease:'power2.out'},t0);
 const d=Math.max(.2,Math.abs(xf-RAMP_B)/spd),t1=t0+.55;
 tl.fromTo(id,{x:RAMP_B},{x:xf,duration:d,ease:'none'},t1);
 cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t1,t1+d,.26,24,12,`#${p}Sq`,9);
 return t1+d;}

/* ================= SCENE 1: "Rocky grinned from the pancake tower!" — everybody stares at the tower ================= */
camSet(0,...CAM.fin);
faces(0,'happy','Big');lookAll(0,-36,0);
RP.eyes(0,'wide');RP.m(0,'mSm');RP.brows(0,10,-10,0,.1);RP.look(.1,-20,0,.1);RP.look(.9,20,0,.1);RP.look(1.6,0,0,.1);
tl.fromTo('#stkIn',{rotation:-1.5},{rotation:1.5,duration:.22,yoyo:true,repeat:9},0);tl.set('#stkIn',{rotation:0},2.3);
camTo(L[1]+DU[1]-.5,.9,...CAM.cock,'power2.inOut');
faces(W(1,4),'wide','O');

/* ================= SCENE 2: Bo: "Rocky! You sneaky snack thief!" ================= */
runTo('bo',1010,FLOOR,L[2]-.25,.7,.88,20);
tl.to('#boArmL',{rotation:-100,duration:.2,ease:'back.out(2)'},L[2]+.45);tl.to('#boArmR',{rotation:60,duration:.2},L[2]+.45);
bTalk(L[2]+.02,L[2]+DU[2]-.08);brows(L[2]+.05,14,-14,-4,.15);look(L[2]+.05,-34,-2,.15);eyesMode(L[2]+.05,'wide');
tl.to('#stkRk',{y:90,duration:.12},L[2]+.35);tl.fromTo('#stkIn',{x:-4},{x:4,duration:.05,yoyo:true,repeat:11},L[2]+.4);tl.set('#stkIn',{x:0},L[2]+1.1);
faces(L[2]+.2,'normal','Sm');lookAll(L[2]+.2,-34,0);

/* ================= SCENE 3: Rocky: "Nobody saw anything." ================= */
tl.to('#stkRk',{y:0,duration:.25,ease:'back.out(2)'},L[3]-.08);
RP.talk(L[3]+.02,L[3]+DU[3]-.05,'mOp','mSm',.16);RP.eyes(L[3],'normal');RP.brows(L[3],12,-12,0,.15);
RP.look(L[3]+.1,26,-4,.1);RP.look(L[3]+.6,-26,-4,.1);RP.look(L[3]+1.1,0,0,.1);
tl.set('#rkpSweat',{opacity:1},L[3]+.35);
bm(L[3]+.1,'mO');brows(L[3]+.1,-6,6,0,.15);eyesMode(L[3]+.1,'normal');
mcEyes(L[3]+.1,'lids');faces(L[3]+.8,'happy','Big');

/* ================= SCENE 4: Blip: "We're landing on Planet Zorp!" ================= */
camTo(L[4]-.3,.9,...CAM.cock,'power2.inOut');
tl.set('#rkpSweat',{opacity:0},L[4]);
BP.talk(L[4]+.02,L[4]+DU[4]-.05,'mBg','mSm',.13);BP.eyes(L[4],'happy');
tl.to('#bpArmR',{rotation:-100,duration:.25,ease:'back.out(2)'},L[4]);tl.fromTo('#bpArmR',{rotation:-100},{rotation:-80,duration:.15,yoyo:true,repeat:7},L[4]+.3);
lookAll(L[4],24,-30);faces(L[4]+.2,'wide','O');BP.eyes(L[4]+.2,'happy');
tl.to('#zorpW',{scale:3.4,duration:DU[4]+.45,ease:'power2.in'},L[4]-.1);
for(let k=0;k<4;k++) shake(L[4]+.2+k*.4,5+k*3,5);
armsUp(L[4]+DU[4]-.35,.15);
tl.fromTo('#portFlash',{opacity:0},{opacity:1,duration:.22},tCut-.3);

/* ================= SCENE 5: "But Zorp was gray and very sad." — the saucer lands, everybody steps out ================= */
shake(tCut-.1,18,10);
tl.set('#cockpit',{opacity:0},tCut);tl.set('#zorpSet',{opacity:1},tCut);
tl.set('#gh,#ghGlow',{opacity:0},tCut);
tl.set('#stk',{opacity:0},tCut);tl.set('#portFlash',{opacity:0},tCut);
Object.keys(OUT).forEach(p=>tl.set('#'+p,{opacity:0},tCut));
camSet(tCut,...CAM.wide);
tl.fromTo('#flash',{opacity:.9},{opacity:0,duration:.5},tCut);
// the saucer drops in, dust, the ramp opens
tl.set('#ufoL',{opacity:1,x:LX,y:-800},tCut);tl.set('#ufoLRamp',{scaleY:.05},tCut);
tl.fromTo('#ufoL',{y:-800},{y:FLOOR,duration:.75,ease:'power2.in'},tCut);
dust(tCut+.75,LX-110,FLOOR+6,2);dust(tCut+.77,LX+110,FLOOR+6,2);shake(tCut+.75,10,6);
tl.to('#ufoLRamp',{scaleY:1,duration:.3,ease:'back.out(1.6)'},tCut+.8);
// the four gray Zorpians sit there, sad
ZN.forEach((z,i)=>{tl.set('#'+z,{opacity:1,x:ZX[z],y:FLOOR,scale:.62},tCut);
 ZZ[z].eyes(tCut,'normal');ZZ[z].m(tCut,'mFr');ZZ[z].brows(tCut,-20,20,0,.1);ZZ[z].look(tCut,-14,10,.1);
 tl.fromTo(`#${z}Sq`,{scaleY:1},{scaleY:.95,duration:.9,yoyo:true,repeat:11,ease:'sine.inOut'},tCut+i*.1);
 tl.set(`#${z}ArmL`,{rotation:0},tCut);tl.set(`#${z}ArmR`,{rotation:0},tCut);
 tears(tCut+1.1+i*.35,ZX[z],FLOOR-190,3,22,140);});
// out they come: Bo first, then the rest, Boo and the tower last
let tFin=0;['bo','tf','mc','cm','nm','zp','bp','pt','gm'].forEach((p,i)=>{tFin=Math.max(tFin,walkOut(p,tOut0+i*.12,p==='gm'?820:640));});
faces(tOut0,'normal','Fr');lookAll(tOut0,26,6);
tl.set('#gh',{opacity:1,x:DOOR,y:FLOOR-150,scale:.05},tOut0+.9);tl.set('#ghGlow',{opacity:.3,scale:1},tOut0+.9);
tl.to('#gh',{x:1600,y:FLOOR-1000,scale:.9,duration:1.4,ease:'sine.out'},tOut0+.9);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.7,yoyo:true,repeat:14,ease:'sine.inOut'},tOut0+1.2);
// the tower waddles out on its little grey feet (Rocky riding on top)
const tTw=tOut0+.5,swD=Math.abs(TWX-RAMP_B)/300;
tl.set('#stk',{opacity:1},tTw);tl.set('#stkW',{x:DOOR,y:FLOOR-70,scale:.07},tTw);tl.set('#stkFeet',{opacity:1},tTw);
tl.fromTo('#stkW',{x:DOOR},{x:RAMP_B,duration:.55,ease:'power1.out'},tTw);tl.fromTo('#stkW',{y:FLOOR-70},{y:FLOOR+40,duration:.55,ease:'none'},tTw);tl.fromTo('#stkW',{scale:.07},{scale:1,duration:.55,ease:'power2.out'},tTw);
tl.fromTo('#stkW',{x:RAMP_B},{x:TWX,duration:swD,ease:'none'},tTw+.55);
tl.fromTo('#stkFootL',{y:0},{y:-18,duration:.12,yoyo:true,repeat:Math.round((swD+.55)/.12)},tTw);tl.fromTo('#stkFootR',{y:-18},{y:0,duration:.12,yoyo:true,repeat:Math.round((swD+.55)/.12)},tTw);
tl.fromTo('#stkIn',{rotation:-2.5},{rotation:2.5,duration:.18,yoyo:true,repeat:Math.round((swD+.55)/.18)},tTw);tl.set('#stkIn',{rotation:0},tTw+.55+swD+.2);tl.set('#stkFeet',{opacity:0},tTw+.55+swD+.1);
RP.eyes(tTw,'normal');RP.m(tTw,'mSm');RP.look(tTw+.3,-24,0,.1);RP.look(tTw+.9,24,0,.1);RP.look(tTw+1.5,0,0,.1);

/* ================= SCENE 6: the Commander: "Pancakes! You really came!" ================= */
camTo(L[6]-.35,.9,...CAM.mid,'power2.inOut');
ZZ.z1.talk(L[6]+.02,L[6]+DU[6]-.05,'mBg','mSm',.13);ZZ.z1.eyes(L[6],'wide');ZZ.z1.brows(L[6],0,0,0,.15);ZZ.z1.m(L[6],'mBg');
tl.to('#z1ArmL',{rotation:150,duration:.15},L[6]+.05);tl.to('#z1ArmR',{rotation:-150,duration:.15},L[6]+.05);
hop('#z1Sq',L[6]+.1,70,.14,.18);hop('#z1Sq',L[6]+.6,70,.14,.18);hop('#z1Sq',L[6]+1.1,70,.14,.18);
tl.fromTo('#z1AntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[6]);tl.fromTo('#z1AntR',{rotation:16},{rotation:-16,duration:.12,yoyo:true,repeat:9},L[6]);
['z2','z3','z4'].forEach((z,i)=>{ZZ[z].eyes(L[6]+.3+i*.1,'wide');ZZ[z].m(L[6]+.3+i*.1,'mO');ZZ[z].brows(L[6]+.3+i*.1,0,0,0,.1);ZZ[z].look(L[6]+.3,-24,-6,.1);});
faces(L[6]+.1,'normal','Sm');lookAll(L[6]+.1,30,-6);

/* ================= SCENE 7: "One tiny bite for every Zorpian!" — the tower is sliced and eaten ================= */
camTo(L[7]-.4,.8,...CAM.mid,'power2.inOut');
tl.to('#tfArmL',{rotation:105,duration:.25,ease:'back.out(2)'},L[7]);tl.to('#boArmL',{rotation:-100,duration:.25},L[7]+.2);
ZN.forEach((z,i)=>kslice(tSl+i*.12,TWX,FLOOR-420,ZX[z],FLOOR-175,.6,.9));
tl.set('#stkTop',{opacity:0},tSl+.2);
for(let k=0;k<NSL-1;k++) tl.set('#stl'+(NSL-1-k),{opacity:0},tSl+.25+k*.05);
tl.to('#stkRk',{y:348,duration:(NSL-1)*.05,ease:'none'},tSl+.25);
RP.eyes(tSl+.3,'wide');RP.m(tSl+.3,'mBg');RP.look(tSl+.4,-10,6,.1);
sparks(tSl+.3,TWX,FLOOR-420,8,170);
ZN.forEach((z,i)=>{ZZ[z].m(tBite-.2+i*.12,'mBg');ZZ[z].eyes(tBite-.2+i*.12,'wide');ZZ[z].look(tBite-.2+i*.12,-30,-16,.1);});

/* ================= SCENE 8: the Zorpians: "Yum yum yum!" — the first colours ================= */
ZN.forEach((z,i)=>{const t=tBite+i*.12;
 zColor(i+1,t,.8);ZZ[z].eyes(t+.2,'happy');ZZ[z].brows(t+.2,0,0,0,.2);ZZ[z].m(t+.2,'mBg');
 tl.to(`#${z}ArmL`,{rotation:150,duration:.15},t+.15);tl.to(`#${z}ArmR`,{rotation:-150,duration:.15},t+.15);
 hop(`#${z}Sq`,L[8]+.1+i*.08,60,.14,.18);hop(`#${z}Sq`,L[8]+.6+i*.08,60,.14,.18);
 hearts(t+.3,ZX[z],FLOOR-300,2,70,200);sparks(t+.2,ZX[z],FLOOR-250,5,100);});
tl.set('#z1,#z2,#z3,#z4',{opacity:1},L[8]);
faces(tBite+.2,'happy','Big');
tl.fromTo('#flash',{opacity:.3},{opacity:0,duration:.4},tBite+.2);

/* ================= SCENE 9: "And color came back to the whole planet!" ================= */
bloom(tWorld,1.6);
tl.fromTo('.zfl',{scaleY:.05},{scaleY:1,duration:.7,ease:'back.out(1.7)',stagger:.12},tWorld+.3);tl.set('#zFlowers',{opacity:1},tWorld+.29);
confetti(tWorld+.4,1300,2500,FLOOR-1050,FLOOR+60,40,1.0);
hearts(tWorld+.8,1900,FLOOR-500,6,120,300);sparks(tWorld+.5,1900,FLOOR-600,10,360);
['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'].forEach((s,i)=>{hop(s,tWorld+.6+i*.05,48,.12,.18);hop(s,tWorld+1.4+i*.05,48,.12,.18);});
armsUp(tWorld+.5,.15);

/* ================= SCENE 10: the Commander: "Thank you, Bo!" ================= */
camTo(L[10]-.35,.8,...CAM.close,'power2.inOut');
ZZ.z1.talk(L[10]+.02,L[10]+DU[10]-.05,'mBg','mSm',.13);
runTo('z1',2065,FLOOR,L[10]-.3,.5,.62,16);
tl.to('#z1ArmL',{rotation:60,duration:.2},L[10]+.3);tl.to('#z1ArmR',{rotation:-60,duration:.2},L[10]+.3);
tl.to('#boArmL',{rotation:-60,duration:.2},L[10]+.25);tl.to('#boArmR',{rotation:60,duration:.2},L[10]+.25);
hearts(L[10]+.4,2040,FLOOR-380,6,100,280);sparks(L[10]+.4,2040,FLOOR-300,8,160);
armsDown(L[10]+.5,.2);['pt','nm','zp','cm'].forEach((p,i)=>{tl.fromTo(`#${p}ArmL`,{rotation:100},{rotation:140,duration:.18,yoyo:true,repeat:5},L[10]+.5+i*.05);});

/* ================= SCENE 11: "But then the ground began to shake!" — something big behind the mountains ================= */
camTo(L[11]-.4,1.2,...CAM.wide,'power2.inOut');
faces(L[11]+.1,'wide','O');lookAll(L[11]+.1,18,-34);
ZN.forEach(z=>{ZZ[z].eyes(L[11]+.1,'wide');ZZ[z].m(L[11]+.1,'mO');ZZ[z].look(L[11]+.1,0,-30,.1);});
tl.set('#zorpGiant',{opacity:1},tShake);tl.to('#gh',{x:900,y:FLOOR-1150,duration:.7,ease:'sine.inOut'},tShake);
tl.fromTo('#zorpGiant',{y:1760},{y:1330,duration:1.9,ease:'power2.out'},tShake+.1);
tl.fromTo('#zgEyes',{scale:1},{scale:1.07,duration:.25,yoyo:true,repeat:7},tShake+1.2);
for(let k=0;k<7;k++) shake(tShake+.1+k*.42,7+k*1.6,6);
['#tfSq','#mcSq','#cmSq','#nmSq','#ptSq','#boSq','#gmSq'].forEach((s,i)=>tl.fromTo(s,{x:-3},{x:3,duration:.05,yoyo:true,repeat:23},tShake+.1+i*.02));
tl.set('#tfSq,#mcSq,#cmSq,#nmSq,#ptSq,#boSq,#gmSq',{x:0},tShake+1.5);
dust(tShake+.4,1500,FLOOR+10,2.4);dust(tShake+.9,1900,FLOOR+10,2.4);dust(tShake+1.3,1300,FLOOR+10,2.4);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

/* ===== this episode's key moments (all derived from the voice timings) ===== */
// shot logic: scenes 1-3 are a TRACKING shot (the camera rides with the pack, the scenery scrolls behind it); from scene 4 the camera is a still wide shot
// and the karts drive across it into the syrup river. Bo's kart carries Pebble the whole episode.
const PBU=1/PBS;
const WIDE=[950,560,.66];                                  // still wide shot for the river (view x 950..2585)
const tCut=L[4]-.15;                                       // the scroll stops while the camera pans right
const tSpill=W(5,2);                                       // "...SPILLED..."
const tSlide=L[6];
const tRock=W(7,3);                                        // "...BOOST!"
const tFlyZ=L[8]+.05, FZ=1.45;                             // Zap's jump over the river
const tStk=L[11]+DU[11]+.35;
const CAM={wide:RACE, wide2:WIDE,
 bo:camE(PX0.bo+30,EYEY('bo',.6),1.1,540,680), mc:camE(1500,EYEY('mc',.6),1.15,540,680), tf:camE(1640,EYEY('tf',.6),1.2,540,680),
 zp:camE(1520,EYEY('zp',.58),1.2,540,680), cm:camE(2420,EYEY('cm',.6),1.2,540,680), push:camE(2200,EYEY('bo',.6)-200,.85,540,760),
 out:[1300,560,.66]};
const bx=(x)=>chPos('bo',x-6,0)[0];                         // Bo's character x for a kart centred at x (same offset as place())
function driveBo(t0,dur,x1,ease='sine.inOut',y1){ // kart + Bo + Pebble together (y1 = new lane, optional)
 const ky=y1===undefined?KY('bo'):y1+KRC.bo.b, by=y1===undefined?chPos('bo',0,FEET('bo'))[1]:chPos('bo',0,y1-34)[1];
 tl.to('#kboW',{x:x1,duration:dur,ease},t0);tl.to('#bo',{x:bx(x1),duration:dur,ease},t0);tl.to('#pb',{x:x1+PK[0],duration:dur,ease},t0);
 if(y1!==undefined){tl.to('#kboW',{y:ky,duration:dur,ease},t0);tl.to('#bo',{y:by,duration:dur,ease},t0);tl.to('#pb',{y:y1-34+PK[1],duration:dur,ease},t0);}}
const rockBo=(t0,dur,rot)=>{tl.to('#kboS',{rotation:rot,duration:dur,ease:'sine.inOut'},t0);};
// a slide: the kart slews one way, then the other, then settles; the driver leans against it
function slide(p,t0,dur,x1,r1,r2){const k='#'+KRC[p].k+'S',ln=p==='bo'?'#boLean':'#'+p+'Lean';
 if(p==='bo')driveBo(t0,dur,x1,'power2.out');else drive(p,t0,dur,x1,'power2.out');
 tl.to(k,{rotation:r1,duration:dur*.3,ease:'sine.inOut'},t0);tl.to(k,{rotation:r2,duration:dur*.35,ease:'sine.inOut'},t0+dur*.3);tl.to(k,{rotation:0,duration:dur*.35,ease:'sine.inOut'},t0+dur*.65);
 tl.to(ln,{rotation:-r1*.9,duration:dur*.3},t0);tl.to(ln,{rotation:-r2*.9,duration:dur*.35},t0+dur*.3);tl.to(ln,{rotation:0,duration:dur*.35},t0+dur*.65);}

/* ---- the scenery scrolls at 1500 px/s through the tracking shot, then eases to a stop under the camera pan ---- */
const TS=tCut+.8, V0=1500;
const sFn=(t)=>t<=TS?V0*t:V0*TS+V0*(t-TS)*0;               // (kept simple: constant, then stop at TS)
const DS=V0*TS;
const LAY=[['#rsDash',300,1],['#rsFence',600,1],['#rsMid',1200,.5],['#rsFar',1800,.22],['#rsCloud',2400,.1]];
LAY.forEach(([id,P,m])=>tl.to(id,{x:-DS*m,duration:TS,ease:'power1.out',modifiers:{x:wrapPx(P)}},0));

/* ================= SCENE 1: "The racers zoomed down the hill!" ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','Big');lookAll2(0,30,4);
wheels(0,tCut+.8,6);speedLines(.2,tCut+.8);
['cm','tf','zp','mc'].forEach((p,i)=>bumpKart(p,.3+i*.05,tCut+.6,6,.2+i*.02));bumpKart('bo',.3,tCut+.6,6,.22);
tl.to('#boArmL',{rotation:-60,duration:.3},.4);tl.to('#boArmR',{rotation:60,duration:.3},.4);
for(let t=.7;t<tCut;t+=.45){trail(t,PX0.zp-130,LANE[2]+6,1.0);trail(t+.12,PX0.cm-130,LANE[0]+6,1.0);}
PB.m(.2,'mBg');PB.eyes(.2,'wide');

/* ================= SCENE 2: Bo: "Wheee! Faster, faster!" ================= */
camTo(L[2]-.35,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);brows(L[2]+.05,0,0,-4,.15);eyesMode(L[2]+.05,'wide');look(L[2]+.05,30,0,.12);
tl.to('#boArmL',{rotation:-150,duration:.2},L[2]+.2);tl.to('#boArmR',{rotation:150,duration:.2},L[2]+.2);
tl.to('#pbArmL',{rotation:150,duration:.2},L[2]+.2);tl.to('#pbArmR',{rotation:-150,duration:.2},L[2]+.2);
PB.talk(L[2]+.1,L[2]+DU[2],'mBg','mSm',.12);
tl.to('#boLean',{rotation:-8,duration:.3},L[2]);hop('#pbSq',W(2,1),40*PBU,.1,.14);hop('#pbSq',W(2,2),40*PBU,.1,.14);

/* ================= SCENE 3: Mochi: "Hmph. Out of my way. Obviously." — she overtakes ================= */
camTo(L[3]-.4,.7,...CAM.mc,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[3]-.2);tl.to('#boArmR',{rotation:0,duration:.2},L[3]-.2);tl.to('#boLean',{rotation:0,duration:.2},L[3]-.2);
tl.to('#pbArmL',{rotation:0,duration:.2},L[3]-.2);tl.to('#pbArmR',{rotation:0,duration:.2},L[3]-.2);
MC.m(L[3]+.1,'mFr');MC.talk(L[3]+.12,L[3]+DU[3]-.08,'mOp','mFr',.16);mcEyes(L[3]+.15,'lids');MC.brows(L[3]+.1,8,-8,2,.2);
drive('mc',W(3,1)-.1,1.5,1640,'power2.inOut');
tl.set('.kfl',{opacity:0},0);tl.set('#kmcW .kfl',{opacity:1},W(3,1)-.1);tl.fromTo('#kmcW .kfl',{scaleX:.6},{scaleX:1.3,duration:.07,yoyo:true,repeat:25},W(3,1)-.1);tl.set('#kmcW .kfl',{opacity:0},W(3,1)+1.9);
tl.fromTo('#kmcS',{rotation:0},{rotation:-6,duration:.3,yoyo:true,repeat:1},W(3,1)-.1);
for(let k=0;k<6;k++) trail(W(3,1)+.1+k*.22,1100+(1640-1100)*Math.min(1,(k*.22+.1)/1.5)-140,LANE[3]+6,1.2);
lookAll2(L[3]+.3,-24,4);

/* ================= SCENE 4: "But a river of syrup blocked the road!" — the scenery stops, the camera pans, the karts drive across the still shot ================= */
camTo(tCut,.8,...CAM.wide2,'power2.inOut');tl.set('#syrupR',{opacity:1},tCut);
tl.set('#spdW',{opacity:0},tCut+.4);
tl.fromTo('.sfl',{y:0},{y:104,duration:1.1,repeat:Math.ceil(TS/1.1),ease:'none'},0);
const AT=[['cm',1760],['tf',1640],['zp',1520],['mc',1860]];
AT.forEach(([p,x],i)=>{drive(p,L[4]+.05+i*.05,1.9,x,'sine.out');wheels(L[4],L[4]+2.2,5);});
driveBo(L[4]+.05,1.9,1400,'sine.out');
for(let k=0;k<8;k++) trail(L[4]+.15+k*.2,1200+k*80,LANE[2]+6,1.0);
tl.set('.kfl',{opacity:0},L[4]+2);
faces2(W(4,2),'wide','O');lookAll2(W(4,2),34,6);

/* ================= SCENE 5: Truffle: "Oops! I spilled my syrup!" ================= */
camTo(L[5]-.4,.6,...CAM.tf,'power2.inOut');
TF.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);TF.eyes(L[5],'wide');
tl.set('#sglobW',{opacity:1,x:1640,y:EYEY('tf',.6)-760},tSpill-.25);tl.fromTo('#sglob',{y:0,scale:.5},{y:640,scale:.8,duration:.35,ease:'power2.in'},tSpill-.25);
tl.fromTo('#sgdrips',{y:0,opacity:1},{y:90,opacity:.9,duration:.8},tSpill+.15);tl.to('#sglobW',{opacity:0,duration:.35},tSpill+1.0);
tl.set('#spillW',{opacity:1},tSpill);tl.fromTo('#spillW',{x:1640,y:2070,scale:.05},{x:1950,y:2200,scale:1,duration:1.4,ease:'power2.out'},tSpill+.1);
drops(tSpill+.15,1640,FEET('tf')-20,5);
tl.to('#tfArmL',{rotation:150,duration:.12},L[5]);tl.to('#tfArmR',{rotation:-150,duration:.12},L[5]);
lookAll2(L[5]+.3,0,16);

/* ================= SCENE 6: "Everybody slid and spun around!" ================= */
camTo(L[6]-.4,.7,...CAM.wide2,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[6]);tl.to('#tfArmR',{rotation:0,duration:.2},L[6]);
faces2(tSlide,'wide','O');lookAll2(tSlide,0,0);
slide('cm',tSlide+.1,1.9,2330,-22,18);slide('tf',tSlide+.15,1.7,2100,20,-16);slide('mc',tSlide+.2,1.9,2250,-18,22);
slide('zp',tSlide+.25,1.5,1740,24,-14);slide('bo',tSlide+.3,1.6,1380,-20,16);
cmEyes(tSlide+.4,'dizzy');
for(let k=0;k<4;k++){const t=tSlide+.4+k*.4;sparks(t,2250+(k%2)*60,LANE[1]-160,4,90);sparks(t+.1,1700,LANE[3]-160,4,90);}
bits(tSlide+.5,2330,LANE[0]-30,8);bits(tSlide+.8,2250,LANE[3]-30,8);
shake(tSlide+.3,8,5);
PB.eyes(tSlide+.4,'wide');PB.m(tSlide+.4,'mO');

/* ================= SCENE 7: Zap: "Beep boop! Rocket boost!" ================= */
camTo(L[7]-.4,.6,...CAM.zp,'power2.inOut');
cmEyes(L[7],'normal');faces2(L[7],'normal','Sm');
ZP.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);ZP.eyes(L[7],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[7]);tl.set('#zpAnt',{rotation:0},L[7]+DU[7]);
tl.to('#zpArmL',{rotation:100,duration:.2},L[7]+.2);
tl.set('#kzpW .kfl',{opacity:1},tRock-.3);tl.fromTo('#kzpW .kfl',{scaleX:.5},{scaleX:1.5,duration:.06,yoyo:true,repeat:35},tRock-.3);
shake(tRock,8,5);sparks(tRock,1330,LANE[2]-30,6,100);

/* ================= SCENE 8: "Zap blasted right over it!" — a big jump over the river ================= */
camTo(L[8]-.4,.7,...CAM.wide2,'power2.inOut');
tl.to('#kzpW',{x:3050,duration:FZ,ease:'power1.in'},tFlyZ);tl.to('#zp',{x:3050-6,duration:FZ,ease:'power1.in'},tFlyZ);
arc('#kzpW',tFlyZ,FZ,LANE[2],760,LANE[2]-80);arc('#zp',tFlyZ,FZ,FEET('zp'),760,FEET('zp')-80);
tl.fromTo('#kzpS',{rotation:0},{rotation:-14,duration:.4,ease:'sine.out'},tFlyZ);tl.to('#kzpS',{rotation:8,duration:.5},tFlyZ+.6);
for(let k=0;k<8;k++) trail(tFlyZ+.05+k*.16,1520+(3050-1520)*Math.pow((k*.16+.05)/FZ,2)-100,LANE[2]-200*Math.sin(Math.PI*Math.min(1,(k*.16+.05)/FZ)),1.1);
tl.set('.kfl',{opacity:0},tFlyZ+FZ);
armsUp(W(8,3),.15);hearts(W(8,3),2400,1600,4,120,240);
faces2(W(8,1),'wide','O');lookAll2(W(8,1),34,-20);
tl.to('#zp',{opacity:0},tFlyZ+FZ);tl.to('#kzpW',{opacity:0},tFlyZ+FZ);

/* ================= SCENE 9: Coco: "Ooh-ooh! I am stuck!" ================= */
camTo(L[9]-.4,.6,...CAM.cm,'power2.inOut');
armsDown(L[9]-.05,.2);
CM.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.12);cmEyes(L[9],'wide');
tl.to('#cmArmL',{rotation:150,duration:.12},L[9]+.2);tl.to('#cmArmR',{rotation:-150,duration:.12},L[9]+.2);
tl.fromTo('#kcmS',{rotation:0},{rotation:-4,duration:.15,yoyo:true,repeat:9,ease:'sine.inOut'},L[9]);
tl.fromTo('#kcmW',{y:LANE[0]},{y:LANE[0]+36,duration:.4,ease:'sine.out'},L[9]);tl.fromTo('#cm',{y:FEET('cm')},{y:FEET('cm')+36,duration:.4,ease:'sine.out'},L[9]);
wheels(L[9],L[9]+1.8,1.2);bubbles(L[9]+.2,2300,LANE[0]-20,5);bubbles(L[9]+1.0,2460,LANE[0]-20,5);
hearts(W(9,3),2400,FEET('cm')-340,3,80,200);

/* ================= SCENE 10: Bo: "Hold on! We'll push you!" — Bo's kart rolls up behind Coco ================= */
camTo(L[10]-.5,.7,...CAM.wide2,'power2.inOut');
tl.to('#cmArmL',{rotation:0,duration:.2},L[10]);tl.to('#cmArmR',{rotation:0,duration:.2},L[10]);
bTalk(L[10]+.02,L[10]+DU[10]-.06);brows(L[10]+.05,14,-14,-4,.15);eyesMode(L[10]+.05,'wide');look(L[10]+.05,30,-6,.12);
tl.to('#boArmL',{rotation:-100,duration:.2},L[10]+.1);tl.to('#boArmR',{rotation:100,duration:.2},L[10]+.1);
driveBo(L[10]-.1,1.4,2000,'sine.inOut',LANE[0]);
tl.to('#kboS',{rotation:0,duration:.2},L[10]-.1);
PB.talk(L[10]+.4,L[10]+DU[10],'mBg','mSm',.12);PB.eyes(L[10]+.3,'happy');
wheels(L[10],L[10]+1.6,3);

/* ================= SCENE 11: "Bo and Pebble pushed Coco out!" ================= */
camTo(L[11]-.3,1.6,...CAM.out,'sine.inOut');
driveBo(W(11,2)-.25,1.5,2420,'power2.inOut');drive('cm',W(11,2)-.1,1.6,2820,'power2.inOut');
tl.to('#kcmW',{y:LANE[0],duration:.9},W(11,2)+.2);tl.to('#cm',{y:FEET('cm'),duration:.9},W(11,2)+.2);
tl.fromTo('#kboS',{rotation:0},{rotation:-3,duration:.12,yoyo:true,repeat:9},W(11,2));
wheels(W(11,2),W(11,2)+1.8,3);bubbles(W(11,2),2300,LANE[0]-20,6);bits(W(11,2)+.2,2300,LANE[0],8);
tl.to('#cmArmL',{rotation:150,duration:.15},W(11,5)-.2);tl.to('#cmArmR',{rotation:-150,duration:.15},W(11,5)-.2);cmEyes(W(11,5),'happy');CM.m(W(11,5),'mBg');
tl.to('#pbArmL',{rotation:150,duration:.15},W(11,5));tl.to('#pbArmR',{rotation:-150,duration:.15},W(11,5));
tl.to('#boArmL',{rotation:-160,duration:.15},W(11,5));tl.to('#boArmR',{rotation:160,duration:.15},W(11,5));eyesMode(W(11,5),'hearts');
confetti(W(11,5),1500,2700,700,2640,28,.9);hearts(W(11,5)+.1,2700,1650,5,140,280);sparks(W(11,5),2500,LANE[0]-120,8,170);
['tf','mc','zp'].forEach((p,i)=>{if(p!=='zp'){tl.to(`#${p}ArmL`,{rotation:150,duration:.15},W(11,5)+i*.05);tl.to(`#${p}ArmR`,{rotation:-150,duration:.15},W(11,5)+i*.05);}});
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

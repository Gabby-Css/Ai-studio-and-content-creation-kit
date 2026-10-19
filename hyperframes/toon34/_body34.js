/* ===== this episode's key moments (all derived from the voice timings) ===== */
// shot logic: one long TRACKING shot - the camera rides with the pack, the cliff and its tunnel scroll past; inside it is dark (night overlay), lit by Pebble's pink glow,
// then Boo floats ahead, a far light grows, and the pack bursts out into the sun (the cliff's back edge passes them).
const PBU=1/PBS;
const tExit=W(11,1);                                       // "...BURST..." - the cliff's back edge reaches the lead kart
const SPD=scrollProfile([[0,1500],[1.9,1500],[2.9,850],[17.2,850],[19.2,1500],[30,1500]],30);
const TX0=4400;                                            // the cliff's front edge at t=0 (world x); it reaches the pack at ~1.7 s
const LEN=Math.round(1800-TX0+SPD.dist(tExit));            // length of the cliff = where the exit is
document.getElementById('rsLand').insertAdjacentHTML('beforeend',TUN_HTML(LEN));
gsap.set('#tunW,#tunI',{svgOrigin:'0 0'});SPD.ground('#tunW',TX0);
const PEB=[P34.bo+PK[0],FEET('bo')-140];                   // Pebble's glow centre
const DARK=.66;
const CAM={wide:RACE,
 cm:camE(P34.cm,EYEY('cm',.6),1.2,540,680), tf:camE(P34.tf,EYEY('tf',.6),1.2,540,680), bo:camE(P34.bo+90,FEET('bo')-230,.95,540,760),
 peb:camE(PEB[0],FEET('bo')+PK[1]-EH.pb*PBS,1.45,540,700), boo:camE(1000,1360,1.15,540,640), zp:camE(P34.zp,EYEY('zp',.58),1.2,540,680)};
const tStk=L[11]+DU[11]+.35;

/* ================= SCENE 1: "The road went into a dark tunnel!" ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Big');lookAll2(0,34,0);
wheels(0,tStk+2,6);speedLines(.2,tExit+2);
['cm','tf','zp','mc'].forEach((p,i)=>bumpKart(p,.3+i*.05,tStk+2,6,.2+i*.02));bumpKart('bo',.3,tStk+2,6,.22);
for(let t=.5;t<1.8;t+=.5){trail(t,P34.mc-130,LANE[3]+6,1.0);trail(t+.17,P34.zp-130,LANE[2]+6,1.0);}
tl.set('#kmcW .kfl',{opacity:1},.4);tl.fromTo('#kmcW .kfl',{scaleX:.6},{scaleX:1.3,duration:.07,yoyo:true,repeat:22},.4);tl.set('#kmcW .kfl',{opacity:0},2.2);
faces2(W(1,5)-.1,'wide','O');lookAll2(W(1,5)-.1,34,-6);
tl.fromTo('#night',{opacity:0},{opacity:DARK,duration:1.0,ease:'sine.in'},1.9);

/* ================= SCENE 2: Coco: "Ooh-ooh! I cannot see!" ================= */
camTo(L[2]-.35,.6,...CAM.cm,'power2.inOut');
CM.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mOp',.14);cmEyes(L[2],'wide');
tl.to('#cmArmL',{rotation:130,duration:.15},L[2]);tl.to('#cmArmR',{rotation:-130,duration:.15},L[2]);
tl.fromTo('#cmSq',{x:0},{x:4,duration:.06,yoyo:true,repeat:20},L[2]);
lookAll2(L[2]+.3,-30,0);

/* ================= SCENE 3: Truffle: "I want to go home!" ================= */
camTo(L[3]-.35,.6,...CAM.tf,'power2.inOut');
tl.to('#cmArmL',{rotation:0,duration:.2},L[3]);tl.to('#cmArmR',{rotation:0,duration:.2},L[3]);tl.set('#cmSq',{x:0},L[3]);
TF.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mFr',.15);TF.eyes(L[3],'wide');TF.brows(L[3],-12,12,2,.12);
tl.to('#tfArmL',{rotation:70,duration:.2},L[3]+.2);tl.to('#tfArmR',{rotation:-70,duration:.2},L[3]+.2);
tl.fromTo('#tfSq',{x:0},{x:3,duration:.06,yoyo:true,repeat:16},L[3]+.2);

/* ================= SCENE 4: "Then Pebble began to sparkle!" — a pink glow switches on ================= */
camTo(L[4]-.4,.7,...CAM.bo,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[4]);tl.to('#tfArmR',{rotation:0,duration:.2},L[4]);tl.set('#tfSq',{x:0},L[4]);
tl.set('#pglW',{x:PEB[0],y:PEB[1],opacity:0},L[4]);
tl.fromTo('#pglW',{opacity:0,scale:.2},{opacity:.85,scale:.9,duration:1.2,ease:'sine.out'},W(4,3)-.2);
sparks(W(4,4),PEB[0],PEB[1]-60,8,150);sparks(W(4,4)+.25,PEB[0]+40,PEB[1]-40,8,180);
PB.eyes(L[4]+.2,'wide');PB.m(L[4]+.2,'mO');PB.eyes(W(4,4),'happy');PB.m(W(4,4),'mBg');
hop('#pbSq',W(4,4),50*PBU,.12,.16);eyesMode(W(4,4),'wide');lookAll2(W(4,4),-10,10);

/* ================= SCENE 5: Pebble: "Sparkle! Sparkle!" ================= */
camTo(L[5]-.4,.6,...CAM.peb,'power2.inOut');
PB.talk(L[5]+.02,L[5]+DU[5]-.04,'mBg','mSm',.14);PB.eyes(L[5],'happy');
tl.to('#pbArmL',{rotation:150,duration:.12},L[5]);tl.to('#pbArmR',{rotation:-150,duration:.12},L[5]);
hop('#pbSq',W(5,0),60*PBU,.12,.16);hop('#pbSq',W(5,1),60*PBU,.12,.16);
tl.fromTo('#pglW',{scale:.9},{scale:1.15,duration:.2,yoyo:true,repeat:3},W(5,0));
sparks(W(5,0),PEB[0],PEB[1]-80,10,200);sparks(W(5,1),PEB[0],PEB[1]-80,10,230);hearts(W(5,1),PEB[0],PEB[1]-100,3,70,180);

/* ================= SCENE 6: "His pink light showed the way!" — the light spreads, the pack looks around ================= */
camTo(L[6]-.4,.8,...CAM.wide,'power2.inOut');
tl.to('#pbArmL',{rotation:0,duration:.2},L[6]);tl.to('#pbArmR',{rotation:0,duration:.2},L[6]);
tl.to('#pglW',{x:1450,y:2250,scale:1.5,duration:1.2,ease:'sine.inOut'},L[6]);
tl.to('#night',{opacity:.52,duration:1.0},L[6]);
faces2(L[6]+.2,'happy','Sm');lookAll2(L[6]+.2,34,0);

/* ================= SCENE 7: Boo: "I'll float ahead. Boo." ================= */
camTo(L[7]-.4,.6,...CAM.boo,'power2.inOut');
tl.set('#gh',{opacity:1,x:900,y:1530,scale:.7},L[7]-.45);tl.fromTo('#gh',{opacity:0,scale:.3},{opacity:1,scale:.7,duration:.35,ease:'back.out(2)'},L[7]-.45);
tl.to('#ghGlow',{opacity:.9,duration:.3},L[7]-.4);
GH.talk(L[7]+.02,L[7]+DU[7]-.06,'mOp','mSm',.2);GH.eyes(L[7],'normal');GH.brows(L[7],-10,10,0,.2);
tl.fromTo('#ghSq',{y:0},{y:-18,duration:.5,yoyo:true,repeat:6,ease:'sine.inOut'},L[7]);
tl.to('#gh',{x:1500,y:1800,duration:1.2,ease:'sine.inOut'},W(7,2));
faces2(L[7],'normal','Sm');lookAll2(L[7],20,-10);

/* ================= SCENE 8: "Boo found the way out!" — far ahead a light appears ================= */
camTo(L[8]-.4,.7,...CAM.wide,'power2.inOut');
tl.to('#gh',{x:2050,y:2020,duration:1.3,ease:'sine.inOut'},L[8]);
GH.talk(L[8]+.1,L[8]+DU[8],'mBg','mSm',.2);GH.eyes(L[8],'happy');
tl.set('#exgW',{x:2330,y:2180,opacity:0},L[8]);tl.fromTo('#exgW',{opacity:0,scale:.1},{opacity:.95,scale:.55,duration:1.2,ease:'sine.out'},W(8,3)-.2);
sparks(W(8,4),2050,1900,8,150);
faces2(W(8,3),'wide','O');lookAll2(W(8,3),34,-4);

/* ================= SCENE 9: Zap: "Beep boop! Exit ahead!" ================= */
camTo(L[9]-.4,.6,...CAM.zp,'power2.inOut');
ZP.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.13);ZP.eyes(L[9],'happy');
tl.to('#zpArmL',{rotation:-100,duration:.2},L[9]+.1);
for(let k=0;k<4;k++) pingAt(L[9]+.15+k*.28,P34.zp+120,LANE[2]-120);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[9]);tl.set('#zpAnt',{rotation:0},L[9]+DU[9]);
tl.fromTo('#exgW',{scale:.55},{scale:.8,duration:1.4,ease:'sine.inOut'},L[9]);
faces2(L[9]+.4,'happy','Big');lookAll2(L[9]+.4,34,0);

/* ================= SCENE 10: everybody: "Hooray for Pebble!" ================= */
camTo(L[10]-.4,.7,...CAM.wide,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.2},L[10]-.1);
armsUp(L[10],.15);faces2(L[10],'happy','Big');eyesMode(L[10],'hearts');lookAll2(L[10],0,0);
PB.talk(L[10],L[10]+DU[10],'mBg','mSm',.12);tl.to('#pbArmL',{rotation:150,duration:.12},L[10]);tl.to('#pbArmR',{rotation:-150,duration:.12},L[10]);
hop('#pbSq',L[10]+.1,70*PBU,.14,.18);hop('#pbSq',L[10]+.6,70*PBU,.14,.18);
SQC.forEach((s,i)=>hop(s,L[10]+.1+i*.04,34,.12,.16));
hearts(L[10]+.3,1500,1650,6,140,260);sparks(L[10],PEB[0],PEB[1],10,230);
tl.fromTo('#pglW',{scale:1.5},{scale:1.8,duration:.3,yoyo:true,repeat:3},L[10]);

/* ================= SCENE 11: "They burst out into the sunshine!" — the cliff ends, the daylight floods in ================= */
tl.fromTo('#exgW',{scale:.8,opacity:.95},{scale:3.2,opacity:.95,duration:.8,ease:'power2.in'},tExit-.9);
tl.fromTo('#flash',{opacity:0},{opacity:.7,duration:.35,ease:'power2.in'},tExit-.35);tl.to('#flash',{opacity:0,duration:.7},tExit+.1);
tl.to('#night',{opacity:0,duration:.8,ease:'sine.out'},tExit-.2);
tl.to('#pglW',{opacity:0,duration:.8},tExit);tl.to('#exgW',{opacity:0,duration:.9},tExit+.1);
tl.to('#gh',{x:1250,y:1500,duration:1.2,ease:'sine.inOut'},tExit);
SQC.forEach((s,i)=>hop(s,tExit+.3+i*.05,44,.12,.16));
tl.to('#kgArmL',{rotation:0,duration:.1},0);
confetti(tExit+.2,700,2300,700,2640,34,.9);hearts(tExit+.5,1500,1650,5,140,280);
armsUp(tExit+.2,.15);faces2(tExit+.2,'happy','Big');eyesMode(tExit+.2,'hearts');lookAll2(tExit+.2,0,-10);
tl.set('.kfl',{opacity:1},tExit);tl.fromTo('.kfl',{scaleX:.5},{scaleX:1.3,duration:.07,yoyo:true,repeat:30},tExit);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

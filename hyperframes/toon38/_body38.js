/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the crew stands on the jungle trail in front of the giant gate (it drops in during scene 1); close-ups for whoever speaks; the sign's three words light up one by one;
// Flapjack gets the answer; the gate swings open and pancake trees pop up; Bo takes a bite; Nibbles pushes aside a bush to show a secret path; everybody follows it to a cliff
const GY=1560;                                              // the gate's base
const NB0=[2250,ROWD+10];                                   // Nibbles' mark
const CLF={gm:[2020,ROWB,1.05],pt:[2330,ROWB,.7],cm:[2620,ROWB,.76],bp:[1760,ROWB,.66],rk:[2480,ROWB,.8],
           tf:[2180,ROWF,.74],mc:[2480,ROWF,.74],nm:[1900,ROWF,.54],pan:[2000,ROWF-50,.9],
           bo:[2330,ROWD+BOY,.88],zp:[2000,ROWD,.7],nb:[2560,ROWD,.8]};   // the line-up at the cliff edge
const CAM={wide:[380,-120,.53], gate:[420,-150,.6], sign:camE(1300,GY-1060*GS38,.8,540,780),
 cm:camOn(...eyeAt('cm',1700,ROWB,.76),.95,540,780), tf:camOn(...eyeAt('tf',820,ROWF,.74),.95,540,780), mc:camOn(...eyeAt('mc',1780,ROWF,.74),.95,540,780),
 pan:camE(1180+EYE.pan[0]*.9,ROWF-50+EYE.pan[1]*.9,1.0,540,780), bo:camOn(...eyeAt('bo',1480,ROWD+BOY,.88),.95,540,780),
 nb:camE(NB0[0],NB0[1]+EYE.nb[1]*.8,1.05,540,780), cliff:[1250,-120,.6], cliff2:[1300,-60,.64]};
const tSg=[W(2,2),W(2,3),W(2,5)];
const tGo=W(7,2), tTr=W(7,5)-.1;
const tStk=L[11]+DU[11]+.5;

/* ---- ambient: Boo floats, the canopy swings a little ---- */
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "A giant gate blocked the jungle!" — the gate drops in ================= */
camSet(0,...CAM.wide);camTo(.2,2.1,...CAM.gate,'sine.inOut');
faces2(0,'normal','Sm');lookAll2(0,0,-20);
tl.fromTo('#gateW',{y:GY-1800},{y:GY,duration:.55,ease:'bounce.out'},.25);
shake(.7,14,7);dust(.72,800,GY+20,2.4);dust(.74,1800,GY+20,2.4);sparks(.75,1300,GY-500,6,260);faces2(.75,'wide','O');

/* ================= SCENE 2: "It said: Round, golden, and flipped!" — the sign lights up word by word ================= */
camTo(L[2]-.45,.7,...CAM.sign,'power2.inOut');
tl.fromTo('#gtSign',{scale:1},{scale:1.04,duration:.25,yoyo:true,repeat:1},L[2]);
[['#sgR',0],['#sgG',1],['#sgF',2]].forEach(([id,i])=>{tl.to(id,{scale:1.22,fill:'#E8303A',duration:.14,ease:'back.out(2)'},tSg[i]);tl.to(id,{scale:1,duration:.2},tSg[i]+.3);
 sparks(tSg[i]+.05,id==='#sgR'?1044:id==='#sgG'?1475:1300,GY-1060*GS38,5,110);});
lookAll2(L[2]+.3,0,-26);

/* ================= SCENE 3: Coco: "Ooh-ooh! Is it a banana?" ================= */
camTo(L[3]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.12);cmEyes(L[3],'happy');
tl.to('#cmArmL',{rotation:150,duration:.12},L[3]);tl.to('#cmArmR',{rotation:-150,duration:.12},L[3]);
hop('#cmSq',L[3]+.1,150,.26,.3);hop('#cmSq',L[3]+.8,150,.26,.3);
tl.set('#bnW',{opacity:1,x:1720,y:1150},W(3,4));tl.fromTo('#bn',{scale:.1},{scale:1,duration:.4,ease:'back.out(2)'},W(3,4));tl.to('#bnW',{opacity:0,duration:.25},L[4]-.25);

/* ================= SCENE 4: Truffle: "Needs a pinch more thinking!" ================= */
camTo(L[4]-.45,.7,...CAM.tf,'power2.inOut');
tl.to('#cmArmL',{rotation:0,duration:.2},L[4]-.3);tl.to('#cmArmR',{rotation:0,duration:.2},L[4]-.3);
TF.talk(L[4]+.02,L[4]+DU[4]-.05,'mBg','mSm',.13);TF.eyes(L[4],'normal');
tl.to('#tfArmL',{rotation:110,duration:.2},L[4]+.2);hop('#tfSq',W(4,2),30,.1,.14);sparks(W(4,2)+.05,820+90,ROWF-250,5,70);
lookAll2(L[4]+.3,-8,-10);

/* ================= SCENE 5: Mochi: "Hmph. It's a pancake. Obviously." ================= */
camTo(L[5]-.45,.7,...CAM.mc,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[5]-.3);
MC.m(L[5]+.1,'mFr');MC.talk(L[5]+.12,L[5]+DU[5]-.08,'mOp','mFr',.16);mcEyes(L[5]+.15,'lids');MC.brows(L[5]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.25},W(5,2));
lookAll2(L[5]+.3,-14,-4);

/* ================= SCENE 6: Flapjack: "Wait... that is me!" ================= */
camTo(L[6]-.45,.7,...CAM.pan,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[6]-.3);
FJ.pm(L[6],'Oh');FJ.eyes(L[6],true);FJ.talk(L[6]+.1,L[6]+DU[6]-.05,'Gr','Sm',.13);
hop('#panSq',W(6,2),50,.14,.18);hop('#panSq',W(6,3),60,.14,.18);sparks(W(6,3)+.05,1180,ROWF-120,8,140);hearts(W(6,3),1180,ROWF-200,4,70,200);
lookAll2(W(6,3),-10,-10);

/* ================= SCENE 7: "The gate rumbled and swung open!" — doors swing away, light pours out, pancake trees pop up ================= */
camTo(L[7]-.45,.8,...CAM.gate,'power2.inOut');
shake(W(7,2)-.1,12,10);shake(W(7,2)+.5,10,8);
tl.set('#gtOpen',{opacity:1},tGo);tl.to('#gtL',{scaleX:.08,duration:.95,ease:'power2.inOut'},tGo);tl.to('#gtR',{scaleX:.08,duration:.95,ease:'power2.inOut'},tGo);
dust(tGo+.1,820,GY+20,2.2);dust(tGo+.15,1780,GY+20,2.2);dust(tGo+.5,1300,GY+30,3.0);
tl.fromTo('#gtSign',{rotation:-1.2},{rotation:1.2,duration:.1,yoyo:true,repeat:7},tGo);tl.set('#gtSign',{rotation:0},tGo+.9);
tl.set('#ptrIn,#ptrOut',{opacity:1},tTr);tl.fromTo('#ptrIn,#ptrOut',{y:260},{y:0,duration:.55,ease:'back.out(1.5)'},tTr);
faces2(tTr,'wide','O');lookAll2(tTr,0,-14);armsUp(W(7,5),.15);
SQC.forEach((s,i)=>hop(s,W(7,5)+.1+i*.05,50,.14,.2));confetti(W(7,5),700,2100,1000,2300,28,.8);

/* ================= SCENE 8: Bo: "Pancake trees! Just one tiny bite!" — a pancake flies to his mouth ================= */
camTo(L[8]-.45,.7,...CAM.bo,'power2.inOut');
armsDown(L[8]-.2,.2);faces2(L[8]-.2,'normal','Sm');
bTalk(L[8]+.02,L[8]+DU[8]-.08);eyesMode(L[8]+.05,'hearts');brows(L[8]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[8]+.25);tl.to('#boArmR',{rotation:160,duration:.18},L[8]+.25);hop('#boSq',L[8]+.3,60,.14,.18);
tl.set('#fckW',{opacity:1,x:2300,y:1100},W(8,3));tl.fromTo('#fck',{scale:.6,rotation:0},{scale:1,rotation:360,duration:.5,ease:'none'},W(8,3));
tl.to('#fckW',{x:1448,duration:.5,ease:'power1.inOut'},W(8,3));tl.to('#fckW',{y:1700,duration:.5,ease:'sine.in'},W(8,3));
tl.to('#fck',{scale:.5,duration:.3},W(8,5));tl.set('#fckW',{opacity:0},W(8,5)+.3);sparks(W(8,5)+.05,1448,1710,8,90);hop('#boSq',W(8,5),30,.08,.1);hearts(W(8,5),1448,1500,4,70,200);

/* ================= SCENE 9: Nibbles: "Squeak! Is that cheese?" ================= */
camTo(L[9]-.45,.7,...CAM.nb,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[9]-.3);tl.to('#boArmR',{rotation:0,duration:.2},L[9]-.3);
NM.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.12);NM.eyes(L[9],'wide');
hop('#nbSq',L[9]+.05,40,.12,.16);hop('#nbSq',W(9,3),40,.12,.16);
tl.set('#chbW',{opacity:1,x:NB0[0]+60,y:NB0[1]-300*.8-80},W(9,3));tl.fromTo('#chb',{scale:.1},{scale:1,duration:.4,ease:'back.out(2)'},W(9,3));tl.to('#chbW',{opacity:0,duration:.25},L[10]-.2);
lookAll2(L[9]+.3,24,4);

/* ================= SCENE 10: "Nibbles found a secret path!" — he shoves a bush aside; everybody follows the path to the right ================= */
runTo('nb',1990,1830,L[10]-.3,.8,.8,16);
camTo(L[10]-.1,.7,...CAM.cliff2,'power2.inOut');
tl.to('#bush',{scale:0,rotation:30,duration:.35,ease:'back.in(2)'},W(10,3));sparks(W(10,3)+.1,1900,1700,8,150);dust(W(10,3)+.1,1900,1800,1.8);
faces2(W(10,3),'wide','Big');lookAll2(W(10,3),30,0);
const FOL=['bo','tf','mc','pan','zp','pb','gm','pt','cm','bp','rk','nm','nb'];
FOL.forEach((p,i)=>{const [x,y]=p==='pb'?[2130,ROWD+14]:[CLF[p][0],CLF[p][1]];tl.to('#'+p,{x,y,duration:2.2,ease:'sine.inOut'},W(10,4)-.2+i*.07);});
['bo','tf','mc','pan','zp','gm','pt','cm','bp','rk','nm'].forEach((p,i)=>cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],W(10,4)-.2+i*.07,W(10,4)+2.0+i*.07,.24,16,8,`#${p}Sq`,8));
cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],W(10,4)-.2,W(10,4)+2.0,.24,16,8,'#pbSq',8);
cycle(['#nbLegL','#nbLegR'],['#nbArmL','#nbArmR'],W(10,4)-.2,W(10,4)+2.0,.24,16,8,'#nbSq',8);

/* ================= SCENE 11: "But the path ended at a cliff!" — they skid to a stop at the edge ================= */
camTo(L[11]-.4,1.0,...CAM.cliff,'power2.inOut');
faces2(L[11]-.1,'wide','O');lookAll2(L[11],36,14);
['bo','tf','mc','pan','zp','gm','pt','cm','bp','rk','nm'].forEach(p=>hop(`#${p}Sq`,L[11]+.15,24,.1,.14));
shake(L[11]+.1,8,5);dust(L[11]+.1,2700,1900,2.4);
[0,1,2,3].forEach(k=>sparks(L[11]+.4+k*.3,2770+(k%2)*20,2000+k*60,3,60));
tl.fromTo('#gh',{rotation:0},{rotation:5,duration:.6,yoyo:true,repeat:3},L[11]);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

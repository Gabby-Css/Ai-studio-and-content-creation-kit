/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: a moonlit night; the moon rises behind the hills (bats cross it); Bo finds the pumpkin patch; Truffle carves a funny face, Zap's laser carves a perfect smile, Mochi a scary face, Coco a round "ooh" face, Gumdrop a giant toothy one;
// candles light up inside all of them; a voice whispers "Boo!" (the faces flare, everybody gasps); the camera tilts up to the moon: a tiny ghost flies across it
const CAM={wide:[380,-220,.53], bo:ECAM('bo',M61.bo), tf:ECAM('tf',M61.tf), zp:ECAM('zp',M61.zp), pz:camE(1140,1900,.95,540,830), mc:ECAM('mc',M61.mc), cm:ECAM('cm',M61.cm), gm:ECAM('gm',M61.gm,.85), patch:camE(1400,1800,.6,540,830), moon:camE(1900,520,.62,540,830)};
const tStk=L[11]+DU[11]+.45;
spkLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
Array.from({length:7},(_,i)=>gsap.set('#pmpF'+i,{svgOrigin:'0 -130'}));
const PC=(i)=>[P61[i][0],P61[i][1]-130*P61[i][2]];                                  // the centre of pumpkin i (where its face is)
// a face is carved: chips fly, the glowing face pops in
function carveFace(i,t,chips=2){const [x,y]=PC(i);for(let k=0;k<chips;k++)bits(t-.5+k*.22,x+(k%2?50:-50),y,6);
 tl.fromTo('#pmpF'+i,{opacity:0,scale:.6},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},t);sparks(t,x,y,8,110*P61[i][2]);}

/* ================= SCENE 1: "One spooky night, the moon rose!" — the moon climbs out from behind the hills, bats cross it ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,16,-22);
tl.fromTo('#spkMoonW',{y:900},{y:0,duration:L[2]-.1,ease:'sine.out'},.1);
batFly(0,.5,3.4,1300,640,2500,300,.8);batFly(1,.9,3.8,1200,720,2450,430,.6);batFly(2,1.3,4.0,1500,560,2480,380,.5);
faces2(W(1,4),'wide','O');faces2(L[1]+DU[1]+.1,'happy','Sm');

/* ================= SCENE 2: Bo: "Look! A giant pumpkin patch!" ================= */
camTo(L[2]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);eyesMode(L[2]+.02,'hearts');brows(L[2]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[2]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[2]+.2);hop('#boSq',W(2,0),50,.12,.16);hop('#boSq',W(2,4),60,.14,.18);
// every pumpkin gets a little hop of its own
for(let i=0;i<5;i++)tl.fromTo('#pmp'+i,{y:0},{y:-30,duration:.16,yoyo:true,repeat:1,ease:'power2.out'},W(2,3)+i*.12);

/* ================= SCENE 3: Truffle: "I will carve funny faces!" — he carves the first pumpkin ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.13);TF.eyes(L[3],'happy');
waveArm('#tfArmL',L[3]+.3,L[4]-.2,40,100,.2);waveArm('#tfArmR',L[3]+.4,L[4]-.2,-40,-100,.2);
carveFace(0,W(3,4)+.1,3);hop('#tfSq',W(3,4)+.15,40,.12,.16);

/* ================= SCENE 4: Zap: "Beep boop! Laser carving, ready!" — his eyes shoot a laser beam down ================= */
camTo(L[4]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[4]/.14)-1},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
const ZX=M61.zp[0],ZY=M61.zp[1]-371*M61.zp[2]+40;
tl.set('#lsrW',{opacity:1,x:ZX,y:ZY,rotation:90},W(4,3));tl.fromTo('#lsr',{scaleX:.01},{scaleX:(PC(1)[1]-ZY)/200,duration:.25,ease:'power2.out'},W(4,3));

/* ================= SCENE 5: "The laser carved a perfect smile!" — the beam sweeps over the pumpkin, the face appears ================= */
camTo(L[5]-.45,.7,...CAM.pz,'power2.inOut');
tl.fromTo('#lsrW',{x:ZX-70},{x:ZX+70,duration:.5,yoyo:true,repeat:2,ease:'sine.inOut'},W(5,1));
for(let k=0;k<5;k++)sparks(W(5,2)+k*.25,ZX+(k%2?40:-40),PC(1)[1]-30,5,60);
tl.fromTo('#pmpF1',{opacity:0,scale:.9},{opacity:1,scale:1,duration:.3,ease:'back.out(2)'},W(5,4));sparks(W(5,5),PC(1)[0],PC(1)[1],10,120);
tl.to('#lsr',{scaleX:.01,duration:.2},W(5,5)+.3);tl.set('#lsrW',{opacity:0},W(5,5)+.55);

/* ================= SCENE 6: Mochi: "Hmph. Mine is scarier. Obviously." ================= */
camTo(L[6]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[6]+.1,'mFr');MC.talk(L[6]+.12,L[6]+DU[6]-.08,'mOp','mFr',.16);mcEyes(L[6]+.15,'lids');MC.brows(L[6]+.1,8,-8,2,.2);
tl.to('#mcArmL',{rotation:50,duration:.2},L[6]+.3);carveFace(2,W(6,3)+.05,2);tl.fromTo('#pmp2',{scale:.85},{scale:.95,duration:.12,yoyo:true,repeat:1},W(6,3)+.05);

/* ================= SCENE 7: Coco: "Ooh-ooh! Mine looks like me!" ================= */
tl.to('#mcArmL',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.12);cmEyes(L[7],'happy');
tl.to('#cmArmL',{rotation:150,duration:.14},L[7]+.3);tl.to('#cmArmR',{rotation:-150,duration:.14},L[7]+.3);carveFace(3,W(7,3)+.05,2);hop('#cmSq',W(7,4),50,.12,.16);

/* ================= SCENE 8: "Candles glowed inside every pumpkin!" — one by one they light up ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.patch,'power2.inOut');
[0,1,2,3].forEach(i=>pmpLit(i,L[8]+.15+i*.28));
faces2(L[8]+.1,'happy','Big');lookAll2(L[8]+.1,0,14);
for(let i=0;i<4;i++)sparks(L[8]+.2+i*.28,PC(i)[0],PC(i)[1]-60,6,100);

/* ================= SCENE 9: Gumdrop: "Roar! Mine is the biggest!" — his giant pumpkin gets a toothy face ================= */
camTo(L[9]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.13);GM.eyes(L[9],'happy');
carveFace(4,W(9,0)+.2,3);pmpLit(4,W(9,0)+.5);shake(W(9,0)+.2,12,8);
tl.to('#gmArmL',{rotation:140,duration:.15},L[9]+.3);tl.to('#gmArmR',{rotation:-140,duration:.15},L[9]+.3);

/* ================= SCENE 10: "Then a voice whispered, Boo!" — the candle lights flicker, faces flare, everybody gasps ================= */
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.patch,'power2.inOut');
faces2(L[10]+.15,'wide','O');lookAll2(L[10]+.15,0,-6);
for(let i=0;i<5;i++){tl.fromTo('#pmpG'+i,{scale:1},{scale:1.5,duration:.12,yoyo:true,repeat:1},W(10,4)+i*.03);}
tl.fromTo('#flash',{opacity:0},{opacity:.35,duration:.1,yoyo:true,repeat:1},W(10,4));shake(W(10,4),14,8);
for(let k=0;k<5;k++)sparks(W(10,2)+k*.2,700+k*350,1700,5,80);
[0,1,2,3,4].forEach(i=>hop('#pmp'+i,W(10,4)+i*.03,0,.1,.1));

/* ================= SCENE 11: "But nobody could see who!" — the camera tilts up: a tiny ghost slips across the moon ================= */
camTo(L[11]-.45,.7,...CAM.moon,'power2.inOut');
faces2(L[11],'normal','Sm');lookAll2(L[11],20,-30);
tl.set('#gh',{opacity:1,x:1500,y:520,scale:.2},L[11]+.1);tl.fromTo('#gh',{x:1500},{x:2400,duration:DU[11]+1.8,ease:'none'},L[11]+.1);tl.to('#ghGlow',{opacity:.9,duration:.4},L[11]+.1);
sparks(W(11,4),1900,520,10,260);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

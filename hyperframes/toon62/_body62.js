/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the friends chat around the glowing pumpkins; Boo (a little ghost) hides behind Gumdrop's giant pumpkin, tries a scary face, leaps out in front of everybody; they gasp, then Bo says he is cute (hearts), Boo is sad,
// Mochi agrees ("cute"), Boo floats away with tears, Bo calls him back and remembers the haunted house on the hill (the house lights up), and the whole group marches off up the hill together
const CAM={wide:[380,-220,.53], gh:ECAM('gh',HID62,.95), bo:ECAM('bo',M62.bo), ghF:ECAM('gh',FRONT62,.9), mc:ECAM('mc',M62.mc), hill:camE(1850,1300,.78,540,830)};
const tStk=L[11]+DU[11]+.45;
spkLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
Array.from({length:7},(_,i)=>gsap.set('#pmpF'+i,{svgOrigin:'0 -130'}));
for(let i=0;i<5;i++){const d=.21+i*.01;tl.fromTo('#pmpG'+i,{scale:.94},{scale:1.06,duration:d,yoyo:true,repeat:Math.floor(29.4/d)-1,ease:'sine.inOut'},0);}
const FR=['tf','zp','mc','cm','bo','pt','bp','nm','gm'];

/* ================= SCENE 1: "Boo wanted to scare his friends!" — the friends chat, a little ghost peeks over the giant pumpkin ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,-10,0);
GH.eyes(.1,'wide');GH.m(.1,'mSm');GH.look(.2,-30,6,.2);GH.brows(W(1,1),12,-12,-2,.2);
FR.forEach((p,i)=>hop('#'+p+'Sq',W(1,2)+i*.09,24,.12,.16));
sparks(W(1,4),HID62[0],HID62[1]-250,6,70);

/* ================= SCENE 2: Boo: "I will be scary. Boo!" — he pops up with his scariest face ================= */
camTo(L[2]-.45,.7,...CAM.gh,'power2.inOut');
GH.eyes(L[2]-.05,'normal');GH.brows(L[2]+.02,-18,18,-8,.12);GH.talk(L[2]+.04,L[2]+DU[2]-.08,'mBg','mO',.14);
tl.to('#ghArmL',{rotation:140,duration:.15},L[2]+.2);tl.to('#ghArmR',{rotation:-140,duration:.15},L[2]+.2);tl.to('#gh',{y:HID62[1]-60,duration:.2,ease:'back.out(2)'},L[2]+.15);
tl.to('#ghGlow',{opacity:.9,duration:.2},L[2]+.2);sparks(W(2,3),HID62[0],HID62[1]-300,10,120);

/* ================= SCENE 3: "He jumped out of nowhere!" — a big leap in front of everybody, they jump with fright ================= */
camTo(L[3]-.45,.7,...CAM.wide,'power2.inOut');
tl.to('#gh',{x:FRONT62[0],scale:FRONT62[2],duration:.7,ease:'sine.inOut'},W(3,1));arc('#gh',W(3,1),.7,HID62[1]-60,420,FRONT62[1]);
tl.to('#ghGlow',{opacity:.35,duration:.3},W(3,1)+.8);
faces2(W(3,1)+.55,'wide','O');lookAll2(W(3,1)+.55,0,0);SQC.forEach((s,i)=>hop(s,W(3,1)+.65+i*.03,60,.1,.16));shake(W(3,1)+.7,12,8);
for(let i=0;i<5;i++)tl.fromTo('#pmpG'+i,{scale:1},{scale:1.4,duration:.1,yoyo:true,repeat:1},W(3,1)+.65);
GH.m(W(3,1)+.8,'mBg');

/* ================= SCENE 4: Bo: "You look so cute, Boo!" ================= */
camTo(L[4]-.45,.7,...CAM.bo,'power2.inOut');
faces2(L[4]-.1,'happy','Big');
bTalk(L[4]+.02,L[4]+DU[4]-.06);eyesMode(L[4]+.02,'hearts');brows(L[4]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[4]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[4]+.2);hop('#boSq',W(4,3),50,.12,.16);
hearts(W(4,2),M62.bo[0]+400,M62.bo[1]-300,6,140,300);GH.eyes(L[4],'happy');GH.m(L[4],'mSm');GH.brows(L[4],0,0,0,.2);

/* ================= SCENE 5: Boo: "But I wanted to be scary!" — his face falls ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.ghF,'power2.inOut');
GH.eyes(L[5]+.02,'normal');GH.brows(L[5]+.02,-14,14,6,.2);GH.talk(L[5]+.04,L[5]+DU[5]-.08,'mFr','mO',.15);
tl.to('#ghArmL',{rotation:20,duration:.2},L[5]+.1);tl.to('#ghArmR',{rotation:-20,duration:.2},L[5]+.1);tl.to('#ghGlow',{opacity:.12,duration:.5},L[5]+.2);

/* ================= SCENE 6: Mochi: "Hmph. Ghosts are cute. Obviously." ================= */
camTo(L[6]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[6]+.1,'mFr');MC.talk(L[6]+.12,L[6]+DU[6]-.08,'mOp','mFr',.16);mcEyes(L[6]+.15,'lids');MC.brows(L[6]+.1,8,-8,2,.2);
tl.to('#mcArmL',{rotation:50,duration:.2},L[6]+.3);

/* ================= SCENE 7: "Boo floated away, feeling sad." — he drifts off to the left, tears fall ================= */
tl.to('#mcArmL',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.wide,'power2.inOut');
GH.m(L[7]+.1,'mFr');GH.eyes(L[7]+.1,'normal');
tl.to('#gh',{x:330,scale:.6,duration:DU[7]+.6,ease:'sine.inOut'},L[7]+.2);arc('#gh',L[7]+.2,DU[7]+.6,FRONT62[1],200,1500);
sweatDrops(L[7]+.4,L[8]+.2,400,1600,.9);faces2(L[7]+.3,'normal','Fr');lookAll2(L[7]+.3,-30,6);

/* ================= SCENE 8: Bo: "Wait, Boo! Come back, please!" ================= */
camTo(L[8]-.45,.7,...CAM.bo,'power2.inOut');
faces2(L[8]-.1,'wide','O');
bTalk(L[8]+.02,L[8]+DU[8]-.06);eyesMode(L[8]+.02,'wide');brows(L[8]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-120,duration:.18},L[8]+.2);tl.to('#boArmR',{rotation:120,duration:.18},L[8]+.2);

/* ================= SCENE 9: Bo: "I know a haunted house!" — a bright idea ================= */
eyesMode(L[9]+.02,'hearts');bTalk(L[9]+.02,L[9]+DU[9]-.06);brows(L[9]+.05,0,0,-4,.15);
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[9]+.05);tl.to('#boArmR',{rotation:-160,duration:.2},L[9]+.3);
sparks(W(9,1),M62.bo[0],M62.bo[1]-600,10,130);hop('#boSq',W(9,2),60,.12,.16);

/* ================= SCENE 10: "Real ghosts live on the hill!" — the camera swings to the far house: its windows flare ================= */
tl.to('#boArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.hill,'power2.inOut');
tl.to('#hse',{scale:1.2,duration:DU[10]+.4,ease:'sine.inOut'},L[10]);
tl.fromTo('#hseWinL',{opacity:1},{opacity:.35,duration:.16,yoyo:true,repeat:Math.floor((DU[10]+.4)/.16)-1},L[10]+.1);tl.fromTo('#hseWinR',{opacity:.4},{opacity:1,duration:.19,yoyo:true,repeat:Math.floor((DU[10]+.4)/.19)-1},L[10]+.1);
sparks(W(10,3),1900,1180,10,200);
for(let k=0;k<3;k++)batFly(k,L[10]+.3+k*.25,L[10]+2.4+k*.25,1960,1160,1300,820,.45);

/* ================= SCENE 11: "So off they went, together!" — Boo comes back, the whole group marches off to the hill ================= */
camTo(L[11]-.45,.7,...CAM.wide,'power2.inOut');
tl.to('#gh',{x:1000,y:1950,scale:.75,duration:.9,ease:'sine.inOut'},L[11]);GH.eyes(L[11],'happy');GH.m(L[11],'mSm');GH.brows(L[11],0,0,0,.2);tl.to('#ghGlow',{opacity:.45,duration:.4},L[11]);
faces2(L[11]+.1,'happy','Big');lookAll2(L[11]+.1,24,-4);hearts(L[11]+.5,1100,1700,5,180,260);
marchAll(L[11]+.5,L[11]+DU[11]+1.5);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

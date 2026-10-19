/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: Mochi practises her magic trick at the starry table: she taps the hat twice with her wand (it jiggles), says the magic words, POOF: a pancake pops out of the hat and lands on its rim; Bo cheers; then the hat starts shaking,
// Zap scans it (rings), Rocky pops out of the hat in a big arc, giggling, lands beside the table: "Surprise!"; Mochi smiles a little
const CAM={wide:[380,-220,.53], mc:ECAM('mc',M59.mc), hat:camE(1640,1600,.85,540,830), bo:ECAM('bo',M59.bo), zp:ECAM('zp',M59.zp), tall:camE(1760,1280,.7,540,830), rk:ECAM('rk',[1960,1930,.7])};
const tPoof=W(5,0), tPop=W(9,1)-.05, RKL=[1960,1930], D9=W(9,3)-tPop+.2;
const tStk=L[11]+DU[11]+.45;
const WB=[M59.mc[0]+150,M59.mc[1]-150];                                  // the wand's handle (in Mochi's hand)
// the wand points from its handle to the hat: rotation (deg) and the tap moves
circusLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
const tap=(t)=>{tl.to('#wand',{rotation:55,duration:.1,ease:'power2.in'},t);tl.to('#wand',{rotation:22,duration:.12,ease:'power2.out'},t+.1);tl.fromTo('#mhat',{rotation:-7},{rotation:7,duration:.07,yoyo:true,repeat:3},t+.1);sparks(t+.1,HATTOP[0],HATTOP[1]-40,6,100);};

/* ================= SCENE 1: "Mochi practiced his magic trick!" ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,18,-6);mcEyes(0,'lids');
tl.fromTo('#wand',{rotation:5},{rotation:40,duration:.4,yoyo:true,repeat:3,ease:'sine.inOut'},W(1,2));
tl.to('#mcArmR',{rotation:-60,duration:.2},L[1]+.3);
sparks(W(1,4),HATTOP[0],HATTOP[1]-60,8,140);

/* ================= SCENE 2: Mochi: "Hmph. Watch closely. Obviously." ================= */
camTo(L[2]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[2]+.1,'mFr');MC.talk(L[2]+.12,L[2]+DU[2]-.08,'mOp','mFr',.16);mcEyes(L[2]+.15,'lids');MC.brows(L[2]+.1,8,-8,2,.2);
tl.fromTo('#wand',{rotation:10},{rotation:50,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},L[2]+.3);

/* ================= SCENE 3: "He tapped the hat twice!" — tap, tap ================= */
camTo(L[3]-.45,.7,...CAM.hat,'power2.inOut');
tap(W(3,3)-.12);tap(W(3,4)-.08);

/* ================= SCENE 4: Mochi: "Magic words! Pancake, appear!" — stars swirl round the hat ================= */
camTo(L[4]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[4]+.1,'mFr');MC.talk(L[4]+.12,L[4]+DU[4]-.08,'mOp','mFr',.16);
tl.fromTo('#wand',{rotation:10},{rotation:50,duration:.28,yoyo:true,repeat:6,ease:'sine.inOut'},L[4]+.2);
for(let k=0;k<5;k++) sparks(W(4,1)+k*.25,HATTOP[0],HATTOP[1]-80,6,150+k*20);
pingAt(W(4,3),HATTOP[0],HATTOP[1]);

/* ================= SCENE 5: "Poof! A pancake popped out!" — a cloud, a flash, a pancake flies out and lands on the hat ================= */
camTo(L[5]-.45,.7,...CAM.hat,'power2.inOut');
dust(tPoof,HATTOP[0]-80,HATTOP[1],2.4);dust(tPoof+.05,HATTOP[0]+80,HATTOP[1],2.4);dust(tPoof+.1,HATTOP[0],HATTOP[1]-60,3);sparks(tPoof,HATTOP[0],HATTOP[1]-100,14,260);pingAt(tPoof,HATTOP[0],HATTOP[1]-60);shake(tPoof,12,8);
tl.set('#jpcW0',{opacity:1,x:HATTOP[0],y:HATTOP[1],scale:.4},tPoof);tl.fromTo('#jpcW0',{scale:.4},{scale:1.25,duration:.4,ease:'back.out(1.6)'},tPoof);
arc('#jpcW0',tPoof,1.0,HATTOP[1],520,HATTOP[1]-90);tl.fromTo('#jpc0',{rotation:0},{rotation:720,duration:1.0,ease:'none'},tPoof);
tl.to('#mcArmR',{rotation:-120,duration:.2},tPoof+.2);faces2(tPoof,'wide','O');lookAll2(tPoof,20,-14);mcEyes(tPoof+.1,'wide');

/* ================= SCENE 6: Bo: "Nice one, Mochi! Again, please!" ================= */
camTo(L[6]-.45,.7,...CAM.bo,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[6]-.2);faces2(L[6]-.1,'happy','Big');mcEyes(L[6]-.1,'lids');MC.m(L[6]-.1,'mFr');
bTalk(L[6]+.02,L[6]+DU[6]-.06);eyesMode(L[6]+.02,'hearts');brows(L[6]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[6]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[6]+.2);hop('#boSq',W(6,0),50,.12,.16);hop('#boSq',W(6,4),60,.14,.18);hearts(W(6,4),M59.bo[0],M59.bo[1]-480,5,90,240);

/* ================= SCENE 7: "Then the hat started shaking!" — it rattles, the table too ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.hat,'power2.inOut');
tl.fromTo('#mhat',{rotation:-9},{rotation:9,duration:.06,yoyo:true,repeat:Math.floor((L[9]+.1-L[7]-.2)/.06)-1,ease:'none'},L[7]+.2);
tl.fromTo('#mtbW',{x:HAT59[0]-6},{x:HAT59[0]+6,duration:.07,yoyo:true,repeat:Math.floor((L[9]+.1-L[7]-.2)/.07)-1,ease:'none'},L[7]+.2);
tl.set('#jpcW0',{opacity:0},L[7]+.1);tl.set('#mtbW',{x:HAT59[0]},L[9]+.12);
faces2(L[7]+.4,'wide','O');lookAll2(L[7]+.4,20,-12);for(let k=0;k<4;k++) sparks(W(7,3)+k*.2,HATTOP[0],HATTOP[1]-60,5,110);

/* ================= SCENE 8: Zap: "Beep boop! Something is inside!" — he scans the hat ================= */
camTo(L[8]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);ZP.eyes(L[8],'wide');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[8]/.14)-1},L[8]);tl.set('#zpAnt',{rotation:0},L[8]+DU[8]);
tl.to('#zpArmL',{rotation:100,duration:.2},L[8]+.4);
[0,1,2].forEach(k=>pingAt(W(8,2)+k*.22,M59.zp[0]+260+k*70,M59.zp[1]-250));

/* ================= SCENE 9: "Out popped Rocky, giggling happily!" — he flies out of the hat in a big arc ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.tall,'power2.inOut');
tl.set('#mhat',{rotation:0},L[9]+.12);
dust(tPop,HATTOP[0],HATTOP[1],2.6);sparks(tPop,HATTOP[0],HATTOP[1]-60,14,260);pingAt(tPop,HATTOP[0],HATTOP[1]-40);shake(tPop,12,8);
tl.set('#rk',{opacity:1,x:HATTOP[0],y:HATTOP[1],scale:.25},tPop);
tl.fromTo('#rk',{x:HATTOP[0],scale:.25},{x:RKL[0],scale:.7,duration:D9,ease:'none'},tPop);arc('#rk',tPop,D9,HATTOP[1],760,RKL[1]);
tl.fromTo('#rkSq',{rotation:0},{rotation:360,duration:D9*.8,ease:'power1.inOut'},tPop+.1);
RK.eyes(tPop,'wide');RK.talk(tPop+.05,tPop+D9,'mBg','mSm',.12);
tl.to('#rkArmL',{rotation:150,duration:.15},tPop+.2);tl.to('#rkArmR',{rotation:-150,duration:.15},tPop+.2);
dust(tPop+D9,RKL[0],RKL[1]+10,2.4);hop('#rkSq',tPop+D9,40,.12,.16);

/* ================= SCENE 10: Rocky: "Surprise! I love magic tricks!" ================= */
camTo(L[10]-.45,.7,...CAM.rk,'power2.inOut');
RK.eyes(L[10],'happy');RK.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);
hop('#rkSq',W(10,0),60,.14,.18);hop('#rkSq',W(10,4),60,.14,.18);confetti(W(10,0),1500,2400,900,2000,26,.7);sparks(W(10,0),RKL[0],RKL[1]-400,10,200);hearts(W(10,3),RKL[0],RKL[1]-380,4,80,220);
faces2(L[10]+.1,'happy','Big');

/* ================= SCENE 11: Mochi: "Hmph. That was fun. Obviously." — a tiny smile ================= */
tl.to('#rkArmL,#rkArmR',{rotation:0,duration:.2},L[11]-.3);
camTo(L[11]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[11]+.1,'mFr');MC.talk(L[11]+.12,L[11]+DU[11]-.08,'mOp','mFr',.16);mcEyes(L[11]+.15,'lids');MC.brows(L[11]+.1,8,-8,2,.2);
mcEyes(W(11,3)-.05,'happy');MC.m(W(11,4)-.05,'mSm');MC.brows(W(11,3)-.05,0,0,0,.2);hearts(W(11,3),M59.mc[0],M59.mc[1]-380,4,70,200);sparks(W(11,3),M59.mc[0],M59.mc[1]-440,8,130);
hop('#mcSq',W(11,3),24,.12,.16);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

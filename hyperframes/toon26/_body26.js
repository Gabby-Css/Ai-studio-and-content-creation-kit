/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the gang stays on its lawn marks around the egg (front of the stage); Mochi steps up to knock on it, Truffle steps up to read the note,
// the camera pushes in on whoever speaks and the egg is always in the frame
const CAM={wide:[380,-220,.53],
 bo:camOn(...eyeAt('bo',1300,ROWF+BOY,.88),.95,540,780),
 mc:camOn(...eyeAt('mc',800,ROWD,.74),.95,540,780),
 zap:camOn(...eyeAt('zp',1700,ROWD,.7),.95,820,780),
 cm:camOn(...eyeAt('cm',2050,ROWB,.76),.95,540,780),
 tf:camOn(...eyeAt('tf',1440,ROWD,.74),.95,540,780),
 egg:[620,700,.8], bp:[880,540,.7], eggClose:[609,1026,1.1]};
const EGC=EGY-262*EGS;                                     // world y of the egg's centre
const tFound=W(6,2), tBlank=W(9,2), tWarm=W(9,7);
const tTap=[W(11,4),W(11,5),W(11,6)];
const tStk=L[11]+DU[11]+.35;

/* ================= SCENE 1: "The next morning, a giant egg appeared!" — Munch tiptoes home over the hill ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,-12,14);MN.eyes(0,'happy');MN.m(0,'mSm');
runTo('mn',2780,1280,.1,2.9,.42,16);
eggWobble(.6,3,4);
tl.fromTo('#eggW',{scale:EGS},{scale:EGS*1.07,duration:.12,yoyo:true,repeat:1},W(1,3));sparks(W(1,3),EGX,EGC-300,6,150);
hop('#ptSq',W(1,3)+.1,40,.12,.16);

/* ================= SCENE 2: Bo: "Wow! What is it?" ================= */
camTo(L[2]-.45,.8,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.08);brows(L[2]+.05,14,-14,-4,.15);eyesMode(L[2]+.05,'wide');look(L[2]+.05,-26,24,.15);
tl.to('#boArmL',{rotation:-70,duration:.2},L[2]+.3);tl.to('#boArmR',{rotation:70,duration:.2},L[2]+.3);
hop('#boSq',L[2]+.2,40,.14,.18);lookAll2(L[2]+.2,-4,18);

/* ================= SCENE 3: Mochi: "Hmph. An egg. Obviously." — she steps up and knocks on the shell ================= */
runTo('mc',800,ROWD,L[3]-.8,.7,.74,18);
camTo(L[3]-.5,.7,...CAM.mc,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.25},L[3]);tl.to('#boArmR',{rotation:0,duration:.25},L[3]);
MC.m(L[3]+.1,'mFr');MC.talk(L[3]+.12,L[3]+DU[3]-.08,'mOp','mFr',.16);mcEyes(L[3]+.15,'lids');MC.brows(L[3]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-70,duration:.2},W(3,2)-.3);tl.to('#mcArmR',{rotation:-20,duration:.15},W(3,2)+.1);
eggWobble(W(3,2)+.1,3,4);

/* ================= SCENE 4: Zap: "Beep boop! Warm and wiggling!" — his scanner rings, the egg glows ================= */
camTo(L[4]-.5,.8,...CAM.zap,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.to('#zpArmL',{rotation:100,duration:.25},L[4]+.2);
for(let k=0;k<4;k++) pingAt(L[4]+.3+k*.35,EGX+40,EGC-40);
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
tl.to('#eggGlow',{opacity:.55,duration:.5},L[4]+.4);
eggWobble(W(4,3),5,6);

/* ================= SCENE 5: Coco: "Ooh-ooh! A giant banana?" ================= */
camTo(L[5]-.45,.8,...CAM.cm,'power2.inOut');
tl.to('#zpArmL',{rotation:0,duration:.25},L[5]);
CM.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.12);cmEyes(L[5],'happy');
tl.to('#cmArmL',{rotation:150,duration:.12},L[5]);tl.to('#cmArmR',{rotation:-150,duration:.12},L[5]);
hop('#cmSq',L[5]+.1,150,.26,.3);hop('#cmSq',L[5]+.8,150,.26,.3);
tl.set('#bnW',{opacity:1},W(5,3));tl.fromTo('#bn',{scale:.1},{scale:1,duration:.4,ease:'back.out(2)'},W(5,3));tl.to('#bnW',{opacity:0,duration:.25},L[5]+DU[5]+.3);
tl.to('#eggGlow',{opacity:.2,duration:.4},L[5]);

/* ================= SCENE 6: "Then they found a tiny note." ================= */
camTo(L[6]-.45,.8,...CAM.egg,'power2.inOut');
tl.to('#cmArmL',{rotation:0,duration:.2},L[6]);tl.to('#cmArmR',{rotation:0,duration:.2},L[6]);
tl.set('#noteW',{opacity:1},tFound);tl.fromTo('#note',{scale:.2,rotation:-30},{scale:1,rotation:0,duration:.4,ease:'back.out(2.2)'},tFound);
sparks(tFound+.25,1163,EGC-4,6,110);lookAll2(tFound,-4,18);

/* ================= SCENE 7: Truffle: "Please keep my egg warm. Love, Munch." — she steps up and reads it ================= */
runTo('tf',1440,ROWD,L[7]-1.0,.8,.74,20);
camTo(L[7]-.55,.8,...CAM.tf,'power2.inOut');
TF.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);TF.eyes(L[7],'normal');
tl.to('#tfArmL',{rotation:100,duration:.2},L[7]+.3);
hearts(W(7,5),1440,1560,5,90,260);
lookAll2(L[7]+.2,-8,14);

/* ================= SCENE 8: Bo: "Munch trusts us! Let's help!" ================= */
camTo(L[8]-.45,.8,...CAM.bo,'power2.inOut');
tl.to('#tfArmL',{rotation:0,duration:.2},L[8]);
bTalk(L[8]+.02,L[8]+DU[8]-.08);brows(L[8]+.05,14,-14,-4,.15);eyesMode(L[8]+.05,'wide');look(L[8]+.1,0,6,.12);
tl.to('#boArmL',{rotation:-160,duration:.18},L[8]+.4);tl.to('#boArmR',{rotation:160,duration:.18},L[8]+.4);
hop('#boSq',L[8]+.45,70,.15,.2);hearts(L[8]+.55,1267,1280,4,90,240);

/* ================= SCENE 9: "So they tucked it in nice and warm." — a gingham blanket with a pancake on top ================= */
camTo(L[9]-.45,.9,...CAM.egg,'power2.inOut');
armsDown(L[9]-.05,.2);faces2(L[9]+.2,'happy','Big');lookAll2(L[9]+.2,0,12);
tl.set('#blanketW',{opacity:1},tBlank);tl.fromTo('#blanket',{y:-640,scale:.92},{y:0,scale:1,duration:.55,ease:'bounce.out'},tBlank);
tl.to('#noteW',{opacity:0,duration:.1},tBlank+.3);
sparks(tBlank+.5,EGX,EGC-260,8,190);dust(tBlank+.5,EGX-120,EGY+8,1.4);dust(tBlank+.52,EGX+120,EGY+8,1.4);
tl.to('#mcArmR',{rotation:-40,duration:.2},tBlank+.6);tl.to('#tfArmL',{rotation:60,duration:.2},tBlank+.6);          // patting the blanket
hearts(tWarm,EGX,EGC-300,6,100,280);

/* ================= SCENE 10: Blip: "Whoa! It wiggled again!" — the blanket shivers ================= */
camTo(L[10]-.45,.8,...CAM.bp,'power2.inOut');
tl.to('#mcArmR',{rotation:0,duration:.2},L[10]);tl.to('#tfArmL',{rotation:0,duration:.2},L[10]);
BP.talk(L[10]+.02,L[10]+DU[10]-.06,'mBg','mSm',.13);BP.eyes(L[10],'wide');
tl.to('#bpArmL',{rotation:150,duration:.12},L[10]);tl.to('#bpArmR',{rotation:-150,duration:.12},L[10]);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[10]);tl.set('#bpAntL',{rotation:0},L[10]+DU[10]+.1);
eggWobble(W(10,2),6,6);tl.fromTo('#blanket',{scaleY:1},{scaleY:1.05,duration:.1,yoyo:true,repeat:5},W(10,2));
faces2(L[10]+.1,'wide','O');lookAll2(L[10]+.1,-24,16);

/* ================= SCENE 11: "And inside, something went tap, tap, tap!" — we push in on the egg ================= */
camTo(L[11]-.35,.9,...CAM.eggClose,'power2.inOut');
tTap.forEach((t,i)=>{eggBump(t,26+i*10);tl.fromTo('#blanket',{scaleY:1,y:0},{scaleY:1.07,y:-14,duration:.09,yoyo:true,repeat:1},t);
 tl.fromTo('#eggGlow',{opacity:.35},{opacity:.95,duration:.1,yoyo:true,repeat:1},t);sparks(t+.02,EGX+(i-1)*80,EGC-300,5,100);});
tl.to('#eggGlow',{opacity:.5,duration:.5},tTap[2]+.3);
JQ.forEach((s,i)=>hop(s,tTap[1]+.1+i*.08,40,.12,.16));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

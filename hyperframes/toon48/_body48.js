/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the sled stands still on the hilltop with its riders; friends wave; Gumdrop pushes and jumps on; then the SCENERY scrolls (the camera stays still) so the sled seems to race down the hill,
// close-ups for the screaming riders; at the end the sled hits a snowman, everybody tumbles, and the snowman ends up wearing Bo's scarf
const CAM={wide:[380,-220,.53], bo:ECAM('bo',RD.bo), wd:ECAM('wd',RD.wd,1.2), gm:ECAM('gm',RD.gm), cm:ECAM('cm',RD.cm), mc:ECAM('mc',RD.mc), gh:ECAM('gh',[1850,1250,.75],.95,540,800), zp:ECAM('zp',RD.zp), end:camE(1900,1780,.6,540,820)};
const tGo=L[5]-.1, tHit=W(10,2)+.05;
const SPD=snowRun([[0,0],[tGo,0],[tGo+.9,1800],[tHit-.1,1800],[tHit+.5,0],[30,0]],30);
const XSN=2250;                                             // where the snowman stands when the sled stops
SPD.ground('#snmW',XSN+SPD.D);['tf','pt','pan','bp'].forEach(p=>SPD.ground('#'+p,HT[p][0]));
const tStk=L[11]+DU[11]+.45;
snowfall();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
// the whole sled "rides": it bumps while moving (deck, riders and the scenery rows share the same bump)
const ride=(t0,t1)=>{for(let t=t0,k=0;t<t1;t+=.18,k++){tl.to('#sld',{y:(k%2?-7:-2),duration:.09,ease:'sine.inOut'},t);}tl.to('#sld',{y:0,duration:.1},t1);};

/* ================= SCENE 1: "The big sled waited on Pancake Hill!" ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,0,0);
['tf','pt','pan','bp'].forEach((p,i)=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.2},.4+i*.1);tl.to(`#${p}ArmR`,{rotation:-140,duration:.2},.4+i*.1);hop(`#${p}Sq`,.6+i*.1,40,.12,.16);});
tl.fromTo('#sld',{scale:.6,opacity:0},{scale:1,opacity:1,duration:.5,ease:'back.out(1.6)'},.2);

/* ================= SCENE 2: Bo: "I'll steer! Hold on tight!" ================= */
camTo(L[2]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);eyesMode(L[2]+.02,'wide');brows(L[2]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-100,duration:.2},L[2]+.2);tl.to('#boArmR',{rotation:100,duration:.2},L[2]+.2);hop('#boSq',L[2]+.25,50,.14,.18);

/* ================= SCENE 3: Waddles: "Everybody on the sled!" ================= */
camTo(L[3]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[3]-.1,'Gr');WDN.eyes(L[3],true);WDN.talk(L[3]+.02,L[3]+DU[3]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[3]+.2);tl.to('#wdArmR',{rotation:-140,duration:.2},L[3]+.2);hop('#wdSq',L[3]+.25,50,.14,.18);

/* ================= SCENE 4: Gumdrop: "Roar! I'll push us off!" — he pushes from behind, then jumps on ================= */
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);GM.eyes(L[4],'wide');
tl.to('#gmArmL',{rotation:100,duration:.2},L[4]+.2);tl.to('#gmArmR',{rotation:-100,duration:.2},L[4]+.2);
tl.fromTo('#gmLean',{x:-4},{x:4,duration:.06,yoyo:true,repeat:11},L[4]+.4);tl.set('#gmLean',{x:0},L[4]+1.15);
tl.to('#sld',{x:-14,duration:.15,yoyo:true,repeat:5},L[4]+.4);

/* ================= SCENE 5: "Whoosh! Down the hill they zoomed!" — the scenery starts to race ================= */
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.wide,'power2.inOut');
tl.to('#gm',{x:RD.gm[0]+120,y:RD.gm[1]+10,duration:.35,ease:'power2.out'},tGo-.2);arc('#gmSq',tGo-.2,.35,0,90,0);
speedLines(tGo+.3,tHit);ride(tGo,tHit);
for(let k=0;k<12;k++) dust(tGo+.2+k*.4,700+(k%3)*40,2040,1.4+(k%2)*.4);
faces2(tGo+.3,'wide','Big');lookAll2(tGo+.3,-34,0);['wd','cm','mc','zp','gm'].forEach(p=>{tl.fromTo(`#${p}Sq`,{rotation:0},{rotation:-8,duration:.4,ease:'power2.out'},tGo+.2);});tl.fromTo('#boSq',{rotation:0},{rotation:-8,duration:.4,ease:'power2.out'},tGo+.2);
tl.to('#gh',{x:2000,y:1350,duration:.9,ease:'power2.out'},tGo);

/* ================= SCENE 6: Coco: "Ooh-ooh! Too fast! Too fast!" ================= */
camTo(L[6]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mO',.12);cmEyes(L[6],'wide');
tl.to('#cmArmL',{rotation:150,duration:.12},L[6]+.1);tl.to('#cmArmR',{rotation:-150,duration:.12},L[6]+.1);shiver('#cmSq',L[6]+.2,L[6]+DU[6],4);

/* ================= SCENE 7: Mochi: "Hmph. Somebody stop this. Obviously." ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
tl.to('#mcArmL',{rotation:120,duration:.2},L[7]+.3);tl.to('#mcArmR',{rotation:-120,duration:.2},L[7]+.3);

/* ================= SCENE 8: Boo: "I'm floating next to you. Boo." ================= */
tl.to('#mcArmL,#mcArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.gh,'power2.inOut');
GH.talk(L[8]+.02,L[8]+DU[8]-.05,'mBg','mSm',.13);GH.eyes(L[8],'wide');
tl.fromTo('#gh',{x:2000},{x:1900,duration:.5,yoyo:true,repeat:3,ease:'sine.inOut'},L[8]);tl.to('#ghArmL',{rotation:60,duration:.2},L[8]+.2);tl.to('#ghArmR',{rotation:-60,duration:.2},L[8]+.2);

/* ================= SCENE 9: Zap: "Beep boop! Brakes not found!" ================= */
tl.to('#ghArmL,#ghArmR',{rotation:0,duration:.2},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mO',.13);ZP.eyes(L[9],'wide');
tl.fromTo('#zpAnt',{rotation:-18},{rotation:18,duration:.1,yoyo:true,repeat:13},L[9]);tl.set('#zpAnt',{rotation:0},L[9]+DU[9]);
tl.to('#zpArmL',{rotation:150,duration:.12},L[9]+.2);tl.to('#zpArmR',{rotation:-150,duration:.12},L[9]+.2);

/* ================= SCENE 10: "Then they crashed into a snowman!" — the snowman rolls into view, BOOM ================= */
tl.to('#zpArmL,#zpArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.end,'power2.inOut');
faces2(L[10]+.3,'wide','O');lookAll2(L[10]+.3,34,0);
shake(tHit,18,9);tl.fromTo('#snm',{rotation:0},{rotation:14,duration:.12,yoyo:true,repeat:3},tHit);
tl.to('#sld',{x:-36,duration:.1,yoyo:true,repeat:1},tHit);
['bo','wd','cm','mc','zp','gm'].forEach((p,i)=>{const dx=[260,200,160,150,230,120][i];tl.to('#'+p,{x:'+='+dx,duration:.35,ease:'power2.out'},tHit+.02);arc('#'+p+'Sq',tHit+.02,.7,0,160+i*20,0);tl.fromTo(`#${p}Sq`,{rotation:0},{rotation:360,duration:.7,ease:'none'},tHit+.02);tl.set(`#${p}Sq`,{rotation:0},tHit+.75);tl.to('#'+p,{x:'-='+Math.round(dx*.55),duration:.4,ease:'sine.inOut'},tHit+.45);});
for(let k=0;k<6;k++) dust(tHit+.05+k*.06,2060+k*70,1960-(k%3)*50,2.4);sparks(tHit+.1,2100,1750,14,330);

/* ================= SCENE 11: "And the snowman wore Bo's scarf!" ================= */
camTo(L[11]-.4,.8,...CAM.end,'power2.inOut');
tl.to('.boScf',{opacity:0,duration:.15},L[11]+.25);tl.set('#scfW',{opacity:1,x:XSN,y:SLY},L[11]+.3);tl.fromTo('#scf',{scale:.1,rotation:-20},{scale:1,rotation:0,duration:.4,ease:'back.out(2.4)'},L[11]+.3);sparks(L[11]+.4,XSN,1500,10,160);
bm(L[11]+.4,'mO');eyesMode(L[11]+.4,'wide');faces2(L[11]+.8,'happy','Big');hearts(L[11]+.9,XSN,1400,6,100,240);SQC.forEach((s,i)=>hop(s,L[11]+.9+i*.05,40,.12,.16));confetti(L[11]+.9,900,2500,1200,2300,30,.8);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

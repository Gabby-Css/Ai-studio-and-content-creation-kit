/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the picnic lawn; Grandma's recipe book has a torn-out gap; Mochi puts on the detective hat and magnifier, Blip finds sticky footprints, they lead to Coco's banana tree
// where the page is stuck in the crown; Bo climbs, the crown wobbles, Boo floats the page down and Grandma gets it back
const CAM={wide:[380,-220,.53], gma:ECAM('gma',GM43,1.35), mc:ECAM('mc',M43.mc), bp:ECAM('bp',M43.bp), zp:ECAM('zp',M43.zp), rk:ECAM('rk',M43.rk), cm:ECAM('cm',M43.cm),
 bo:ECAM('bo',M43.bo), tree:camE(2330,1250,.66,540,800), gh:ECAM('gh',[2080,800,.7],.9,540,800), back:camE(1900,1750,.62,540,800)};
const FTT=Array.from({length:12},(_,i)=>L[4]+.1+i*.1);
const TX=2290, TOPY=1380;                                    // the tree trunk (Bo climbs at x=TX), the height of the crown
const tClimb=L[8]+.9, tWob=L[9]+.05, tGrab=L[10]+.7, tFloat=L[11]+.1;
const tStk=L[11]+DU[11]+.45;
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "Grandma's secret recipe page was missing!" ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,-20,4);
tl.fromTo('#book',{rotation:0},{rotation:-6,duration:.3,yoyo:true,repeat:3},.5);
faces2(W(1,4)-.1,'wide','O');GMAN.pm(W(1,4)-.1,'Oh');hop('#gmaSq',W(1,4),40,.12,.16);sparks(W(1,4)+.05,GM43[0]+150,1740,5,70);

/* ================= SCENE 2: Grandma: "Oh dear! Where did it go?" ================= */
camTo(L[2]-.45,.7,...CAM.gma,'power2.inOut');
GMAN.pm(L[2]-.1,'Oh');GMAN.talk(L[2]+.02,L[2]+DU[2]-.05,'Wo','Oh',.16);GMAN.eyes(L[2],true);
tl.to('#gmaArmL',{rotation:140,duration:.2},L[2]+.3);tl.to('#gmaArmR',{rotation:-140,duration:.2},L[2]+.3);
tl.fromTo('#gmaSq',{x:0},{x:-8,duration:.08,yoyo:true,repeat:7},L[2]+.5);tl.set('#gmaSq',{x:0},L[2]+1.3);

/* ================= SCENE 3: Mochi: "Hmph. Detective Mochi is on it. Obviously." — hat and magnifying glass ================= */
tl.to('#gmaArmL,#gmaArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.mc,'power2.inOut');
tl.set('#mcHat,#mcMag',{opacity:1},L[3]-.1);sparks(L[3]-.05,M43.mc[0],M43.mc[1]-330,7,100);
MC.m(L[3]+.1,'mFr');MC.talk(L[3]+.12,L[3]+DU[3]-.08,'mOp','mFr',.16);mcEyes(L[3]+.15,'lids');MC.brows(L[3]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-80,duration:.25},W(3,2));hop('#mcSq',W(3,3),30,.12,.16);

/* ================= SCENE 4: Blip: "Look! Sticky footprints! Follow me!" — the prints appear one by one ================= */
camTo(L[4]-.45,.7,...CAM.bp,'power2.inOut');
BP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);BP.eyes(L[4],'wide');
tl.to('#bpArmL',{rotation:150,duration:.15},L[4]+.1);tl.to('#bpArmR',{rotation:-150,duration:.15},L[4]+.1);hop('#bpSq',L[4]+.12,60,.14,.18);
FTT.forEach((t,i)=>{tl.set('#ft'+i,{opacity:1},t);tl.fromTo('#ft'+i,{scale:.2},{scale:.9,duration:.2,ease:'back.out(2.4)'},t);});
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:9},L[4]);tl.set('#bpAntL',{rotation:0},L[4]+1.4);
lookAll2(L[4]+.3,34,10);

/* ================= SCENE 5: Zap: "Beep boop! Paper detected nearby!" — his scanner rings point at the tree ================= */
tl.to('#bpArmL,#bpArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);ZP.eyes(L[5],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:9},L[5]);tl.set('#zpAnt',{rotation:0},L[5]+DU[5]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[5]+.2);
for(let k=0;k<4;k++) pingAt(L[5]+.3+k*.3,M43.zp[0]+60+k*60,M43.zp[1]-260-k*20);
lookAll2(L[5]+.3,28,-8);

/* ================= SCENE 6: Rocky: "I did not eat any recipes." — cheeks full of pancake ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.rk,'power2.inOut');
RK.eyes(L[6],'normal');RK.m(L[6],'mSm');RK.talk(L[6]+.1,L[6]+DU[6]-.08,'mOp','mSm',.16);RK.brows(L[6]+.1,-10,10,0,.15);
RK.look(L[6]+.3,-24,2,.14);RK.look(L[6]+.9,24,2,.14);
tl.set('#fckW',{opacity:1,x:M43.rk[0]+40,y:M43.rk[1]-200},L[6]+.05);tl.fromTo('#fck',{scale:.4},{scale:.6,duration:.2},L[6]+.05);
for(let k=0;k<3;k++){hop('#rkSq',L[6]+.5+k*.3,14,.08,.1);sparks(L[6]+.55+k*.3,M43.rk[0]+40,M43.rk[1]-230,3,40);}
tl.set('#fckW',{opacity:0},L[6]+1.4);

/* ================= SCENE 7: Coco: "Ooh-ooh! It's in my banana tree!" ================= */
camTo(L[7]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.12);cmEyes(L[7],'happy');
tl.to('#cmArmL',{rotation:150,duration:.12},L[7]+.1);tl.to('#cmArmR',{rotation:-150,duration:.12},L[7]+.1);hop('#cmSq',L[7]+.15,120,.24,.28);hop('#cmSq',L[7]+.8,120,.24,.28);
tl.fromTo('#pgW',{y:960},{y:940,duration:.4,yoyo:true,repeat:5,ease:'sine.inOut'},L[7]+.2);sparks(W(7,4),2400,950,8,90);

/* ================= SCENE 8: Bo: "I'll climb up and get it!" — he runs to the tree and starts to climb ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[8]+.02,L[8]+DU[8]-.08);eyesMode(L[8]+.05,'wide');brows(L[8]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[8]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[8]+.2);hop('#boSq',L[8]+.25,60,.14,.18);
runTo('bo',TX,ROWD+BOY,L[8]+.6,.9,.88,24);
camTo(L[8]+.7,.9,...CAM.tree,'sine.inOut');
tl.to('#bo',{y:TOPY+BOY,duration:1.2,ease:'power1.inOut'},tClimb);cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tClimb,tClimb+1.2,.3,18,50,'#boSq',8);

/* ================= SCENE 9: "But the branch was very wobbly!" — the crown sways, Bo clings ================= */
tl.fromTo('#btrCrown',{rotation:-5},{rotation:5,duration:.18,yoyo:true,repeat:13,ease:'sine.inOut'},tWob);tl.to('#btrCrown',{rotation:0,duration:.3},tWob+2.6);
tl.fromTo('#bo',{x:TX-6},{x:TX+6,duration:.09,yoyo:true,repeat:21},tWob);tl.set('#bo',{x:TX},tWob+2.0);
tl.to('#boArmL',{rotation:-170,duration:.2},tWob);tl.to('#boArmR',{rotation:170,duration:.2},tWob);bm(tWob,'mFrown');eyesMode(tWob,'wide');
faces2(tWob+.2,'wide','O');lookAll2(tWob+.2,24,-26);shake(tWob+.2,7,5);
tl.to('#gh',{x:2080,y:800,duration:.9,ease:'sine.inOut'},L[9]+.5);

/* ================= SCENE 10: Boo: "Don't worry. I'll float it down. Boo." — he grabs the page ================= */
camTo(L[10]-.45,.7,...CAM.gh,'power2.inOut');
GH.talk(L[10]+.02,L[10]+DU[10]-.05,'mBg','mSm',.13);GH.eyes(L[10],'happy');
tl.to('#gh',{x:2360,y:980,duration:.6,ease:'power2.inOut'},tGrab-.4);tl.to('#ghArmR',{rotation:-110,duration:.2},tGrab-.3);
tl.to('#pgW',{x:2380,y:1040,duration:.4,ease:'power2.inOut'},tGrab);sparks(tGrab+.1,2380,1020,7,80);hearts(tGrab+.1,2360,880,3,60,120);
tl.to('#btrCrown',{rotation:0,duration:.2},tGrab);

/* ================= SCENE 11: "And the page floated into Grandma's hands!" — Boo carries it back, Bo slides down ================= */
camTo(L[11]-.4,.8,...CAM.back,'power2.inOut');
tl.to('#gh',{x:GM43[0]+60,y:1480,duration:1.5,ease:'sine.inOut'},tFloat);tl.to('#pgW',{x:GM43[0]+60,y:1560,duration:1.5,ease:'sine.inOut'},tFloat);
tl.to('#pg',{rotation:0,scale:1.4,duration:1.5},tFloat);tl.to('#pgW',{y:1700,scale:.5,duration:.5,ease:'power1.in'},tFloat+1.5);
tl.to('#bo',{y:ROWD+BOY,duration:.7,ease:'power2.in'},L[11]+.2);tl.to('#boArmL',{rotation:0,duration:.2},L[11]+.5);tl.to('#boArmR',{rotation:0,duration:.2},L[11]+.5);
tl.to('#bo',{x:1300,duration:.9,ease:'sine.inOut'},L[11]+.9);
hearts(tFloat+1.5,GM43[0],1600,6,100,260);sparks(tFloat+1.55,GM43[0],1700,10,150);GMAN.eyes(tFloat+1.4,true);GMAN.pm(tFloat+1.4,'Gr');faces2(tFloat+1.5,'happy','Big');
tl.to('#gmaArmL',{rotation:150,duration:.2},tFloat+1.5);tl.to('#gmaArmR',{rotation:-150,duration:.2},tFloat+1.5);armsUp(tFloat+1.6,.15);
SQC.forEach((s,i)=>hop(s,tFloat+1.7+i*.05,40,.12,.16));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

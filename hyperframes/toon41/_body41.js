/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: a sunny Sunday on the lawn; Grandma Pancake walks in with her recipe book, a FAMILY PICNIC board drops in, close-ups for everybody who speaks,
// a "who are they?" bubble with three shadows, the picnic basket drops in and opens, Coco brings bananas, Boo is the lookout, the blanket floats open
// and at the end three dark pancake shapes hop over the hill
const CAM={wide:[380,-220,.53], gma:ECAM('gma',GM41,1.35), bo:ECAM('bo',M41.bo), tf:ECAM('tf',M41.tf), mc:ECAM('mc',M41.mc), zp:ECAM('zp',M41.zp), cm:ECAM('cm',M41.cm),
 gh:ECAM('gh',[1500,560,.7],.9,540,800), hill:camE(2250,1180,.6,540,820)};
const tBan=W(1,5), tCous=W(6,1), tBsk=W(7,4), tBan2=W(8,4), tOpen=W(10,3), tHop=W(11,2);
const tStk=L[11]+DU[11]+.45;
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "On Sunday, Grandma had a surprise!" — Grandma walks in, the FAMILY PICNIC board drops down ================= */
camSet(0,...CAM.wide);
tl.set('#gma',{x:-300},0);runTo('gma',GM41[0],GM41[1],.05,1.9,.62,12);
faces2(0,'happy','Sm');lookAll2(0,-30,2);
tl.set('#banW',{opacity:1},tBan-.2);tl.fromTo('#banW',{y:-300},{y:400,duration:.6,ease:'bounce.out'},tBan-.2);
sparks(tBan+.35,1300,600,8,260);confetti(tBan+.3,700,1900,300,1500,26,.8);hop('#boSq',tBan+.4,60,.14,.2);

/* ================= SCENE 2: Grandma: "Today is a family picnic!" — she shows her recipe book ================= */
camTo(L[2]-.45,.75,...CAM.gma,'power2.inOut');
GMAN.pm(L[2]-.1,'Gr');GMAN.talk(L[2]+.02,L[2]+DU[2]-.05,'Gr','Sm',.14);
tl.set('#bookW',{opacity:1},L[2]+.1);tl.fromTo('#book',{scale:.1,rotation:-20},{scale:1,rotation:0,duration:.4,ease:'back.out(2.2)'},L[2]+.1);
tl.to('#gmaArmR',{rotation:-60,duration:.25},L[2]+.1);sparks(L[2]+.3,GM41[0]+150,1700,8,110);hearts(L[2]+.5,GM41[0],1600,4,70,200);
hop('#gmaSq',L[2]+.15,30,.12,.16);

/* ================= SCENE 3: Bo: "A picnic? I love picnics!" ================= */
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.06);eyesMode(L[3]+.02,'hearts');brows(L[3]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[3]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[3]+.2);
hop('#boSq',L[3]+.25,70,.15,.2);hop('#boSq',W(3,4),60,.14,.18);hearts(W(3,4),M41.bo[0],ROWD+BOY-480,5,90,240);

/* ================= SCENE 4: Truffle: "I'll bake lots of pancakes!" — she flips three pancakes ================= */
camTo(L[4]-.45,.7,...CAM.tf,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[4]-.3);tl.to('#boArmR',{rotation:0,duration:.2},L[4]-.3);
TF.talk(L[4]+.02,L[4]+DU[4]-.05,'mBg','mSm',.13);TF.eyes(L[4],'happy');
tl.to('#tfArmL',{rotation:110,duration:.2},L[4]+.2);
[0,1,2].forEach(k=>{const t=L[4]+.5+k*.45;tl.set('#fckW',{opacity:1,x:M41.tf[0]+110,y:M41.tf[1]-200},t);tl.fromTo('#fck',{scale:.7,rotation:0},{scale:1,rotation:360,duration:.4,ease:'none'},t);
 tl.fromTo('#fckW',{y:M41.tf[1]-200},{y:M41.tf[1]-520,duration:.2,ease:'power2.out'},t);tl.to('#fckW',{y:M41.tf[1]-200,duration:.2,ease:'power2.in'},t+.2);tl.set('#fckW',{opacity:0},t+.42);sparks(t+.4,M41.tf[0]+110,M41.tf[1]-200,3,50);});
tl.to('#tfArmL',{rotation:0,duration:.2},L[5]-.3);

/* ================= SCENE 5: Mochi: "Hmph. How many cousins?" ================= */
camTo(L[5]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[5]+.1,'mFr');MC.talk(L[5]+.12,L[5]+DU[5]-.08,'mOp','mFr',.16);mcEyes(L[5]+.15,'lids');MC.brows(L[5]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-70,duration:.25},W(5,2));
for(let k=0;k<3;k++) sparks(W(5,3)+.1+k*.28,M41.mc[0]+70,M41.mc[1]-240,3,40);

/* ================= SCENE 6: Grandma: "Three cousins! They love pancakes!" — a bubble with three shadows ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.gma,'power2.inOut');
GMAN.talk(L[6]+.02,L[6]+DU[6]-.05,'Gr','Sm',.14);
tl.set('#cbW',{opacity:1,x:GM41[0]+70,y:GM41[1]-300},tCous-.1);tl.fromTo('#cb',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.2)'},tCous-.1);
[0,1,2].forEach(i=>{tl.set('#cbs'+i,{opacity:1},tCous+.15+i*.28);tl.fromTo('#cbs'+i,{scale:.2},{scale:.62,duration:.25,ease:'back.out(2.4)'},tCous+.15+i*.28);sparks(tCous+.2+i*.28,GM41[0]+40+i*80,GM41[1]-420,4,50);});
tl.to('#cbW',{opacity:0,duration:.25},L[7]-.3);
lookAll2(tCous,6,-16);hearts(W(6,4),GM41[0],GM41[1]-330,4,70,200);

/* ================= SCENE 7: Zap: "Beep boop! Opening the basket!" — the basket drops in, the lid pops, pancakes and cups pop out ================= */
camTo(L[7]-.45,.75,...CAM.zp,'power2.inOut');
ZP.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);ZP.eyes(L[7],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:13},L[7]);tl.set('#zpAnt',{rotation:0},L[7]+DU[7]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[7]+.2);
tl.set('#bskW',{opacity:1},L[7]+.05);tl.fromTo('#bskW',{y:1100},{y:2030,duration:.55,ease:'bounce.out'},L[7]+.05);dust(L[7]+.55,1010,2050,1.2);
tl.to('#bskLid',{rotation:-110,duration:.3,ease:'back.out(2)'},tBsk);
tl.set('#bskPc,#bskCup0,#bskCup1',{opacity:1},tBsk+.05);tl.fromTo('#bskPc,#bskCup0,#bskCup1',{y:60,scale:.3},{y:0,scale:1,duration:.35,ease:'back.out(2.4)'},tBsk+.05);
sparks(tBsk+.1,1010,1830,8,120);
lookAll2(L[7]+.3,-30,6);

/* ================= SCENE 8: Coco: "I will bring the bananas!" ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.12);cmEyes(L[8],'happy');
tl.to('#cmArmL',{rotation:150,duration:.12},L[8]+.1);tl.to('#cmArmR',{rotation:-150,duration:.12},L[8]+.1);hop('#cmSq',L[8]+.15,120,.24,.28);hop('#cmSq',L[8]+.8,120,.24,.28);
tl.set('#bnsW',{opacity:1,x:M41.cm[0],y:M41.cm[1]-480},tBan2-.1);tl.fromTo('#bns',{scale:.1},{scale:.8,duration:.4,ease:'back.out(2.4)'},tBan2-.1);
hearts(tBan2,M41.cm[0],M41.cm[1]-560,4,80,200);

/* ================= SCENE 9: Boo: "I'll watch for the cousins. Boo." — the lookout ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[9]-.3);tl.to('#bnsW',{opacity:0,duration:.2},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.gh,'power2.inOut');
GH.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.13);GH.eyes(L[9],'normal');
tl.to('#ghArmR',{rotation:-130,duration:.2},L[9]+.15);
GH.look(L[9]+.3,-24,0,.15);GH.look(L[9]+.8,24,0,.15);GH.look(L[9]+1.3,30,-6,.15);

/* ================= SCENE 10: "Then the blanket floated open!" — the gingham blanket unrolls and floats down onto the lawn ================= */
tl.to('#ghArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.8,...CAM.wide,'power2.inOut');
tl.set('#pkW',{opacity:1},tOpen-.4);tl.fromTo('#pk',{scaleX:.05},{scaleX:1,duration:.9,ease:'power2.out'},tOpen-.4);
tl.fromTo('#pkW',{y:1700},{y:1990,duration:1.0,ease:'sine.out'},tOpen-.4);
faces2(tOpen-.3,'wide','O');lookAll2(tOpen-.3,0,-12);dust(tOpen+.5,1100,2200,2);dust(tOpen+.55,1900,2200,2);sparks(tOpen+.6,1480,2090,10,300);
faces2(tOpen+.8,'happy','Big');armsUp(tOpen+.85,.15);SQC.forEach((s,i)=>hop(s,tOpen+.9+i*.05,40,.12,.16));

/* ================= SCENE 11: "And three shadows hopped over the hill!" — three dark pancake shapes bounce along the ridge ================= */
armsDown(L[11]-.25,.2);
camTo(L[11]-.4,.9,...CAM.hill,'power2.inOut');
[0,1,2].forEach(i=>{const t=tHop+i*.35;tl.set('#sil'+i+'W',{opacity:1,x:3200+i*140,y:1280-i*30,scale:1.2},t-.5);
 for(let k=0;k<4;k++){const x1=3200+i*140-(k+1)*330;tl.to('#sil'+i+'W',{x:x1,duration:.5,ease:'none'},t+k*.5);arc('#sil'+i,t+k*.5,.5,0,150,0);}
 tl.to('#sil'+i+'W',{opacity:0,duration:.25},t+2.05);});
faces2(L[11]+.3,'wide','O');lookAll2(L[11]+.3,34,-4);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

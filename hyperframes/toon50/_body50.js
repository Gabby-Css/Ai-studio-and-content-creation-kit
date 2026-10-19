/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: sunset on the snowy lawn, the crew around a campfire; Truffle's hot cocoa and warm pancakes, Grandma calls everybody to the fire, Waddles shares his secret (he came to find the warmest friends),
// Bo hugs him, Mochi admits she is a little warm and smiles; "Happy snow day, Waddles!", night falls, notes + stars, fireworks, end card (Season 11 coming soon)
const CAM={wide:[380,-220,.53], tf:ECAM('tf',M50.tf), gma:ECAM('gma',GM50,1.7), hug:camE(1290,1800,.85,540,800), wd:ECAM('wd',WD50,1.2), wd2:ECAM('wd',WD50,1.45), bo:ECAM('bo',M50.bo), mc:ECAM('mc',M50.mc), mc2:ECAM('mc',M50.mc,1.3)};
const tFire=W(1,3), tMug=W(2,1)-.1, tPan=W(2,4)-.1, tNight=L[10]-.3, tBang=W(11,7)-.1;
const tStk=L[11]+DU[11]+.45;
const MGP=[[M50.bo[0]+120,M50.bo[1]+70],[M50.pan[0]+120,M50.pan[1]+80],[WD50[0]+130,WD50[1]+80],[PB50[0]+80,PB50[1]+50],[M50.tf[0]+90,M50.tf[1]+50]];
const PSP=[1700,2110];
snowfall();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}
const steamUp=(sel,t0)=>{const n=Math.max(1,Math.floor((29.4-t0)/.8)-1);tl.fromTo(sel,{opacity:0,y:0},{opacity:.9,y:-26,duration:.8,yoyo:true,repeat:n,ease:'sine.inOut'},t0);};
const waveArm=(sel,t0,t1,a,b,per=.25)=>{const n=Math.max(1,Math.floor((t1-t0)/per));tl.fromTo(sel,{rotation:a},{rotation:b,duration:per,yoyo:true,repeat:n-1,ease:'sine.inOut'},t0);tl.to(sel,{rotation:0,duration:.2},t0+n*per);};
const ALLARMS=(t,d=.15)=>{armsUp(t,d);['wd','pan'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-140,duration:d},t);});['pb','nb','rk'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});tl.to('#gmaArmL',{rotation:140,duration:d},t);tl.to('#gmaArmR',{rotation:-140,duration:d},t);};
const ARMS0=(t,d=.2)=>{['bo','tf','nm','cm','mc','gm','bp','zp','pt','wd','pan','pb','nb','rk','gma'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};

/* ================= SCENE 1: "At sunset, they had a cozy party!" — the sky turns warm, the fire is lit ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,0,-10);
tl.to('#duskR',{opacity:.24,duration:2.2,ease:'sine.inOut'},.2);tl.to('#coldR',{opacity:0,duration:2},.2);
tl.set('#fireW',{opacity:1},tFire-.05);tl.fromTo('#fire',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.4)'},tFire-.05);
tl.fromTo('.cfl',{scaleY:.88},{scaleY:1.12,duration:.12,yoyo:true,repeat:Math.floor((29.5-tFire)/.12)-1},tFire);
tl.set('#dgW',{opacity:1},tFire);tl.fromTo('#dg',{opacity:.12},{opacity:.4,duration:.7,yoyo:true,repeat:Math.floor((29.5-tFire)/.7)-1,ease:'sine.inOut'},tFire);
sparks(tFire+.2,FIRE50[0],FIRE50[1]-200,10,200);
faces2(W(1,5),'happy','Big');confetti(W(1,6),900,2300,1100,2200,24,.7);SQC.forEach((s,i)=>hop(s,W(1,6)+.05+i*.04,36,.12,.16));

/* ================= SCENE 2: Truffle: "Hot cocoa and warm pancakes!" — five steaming mugs and a stack of pancakes pop up ================= */
camTo(L[2]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.13);TF.eyes(L[2],'happy');
tl.to('#tfArmL',{rotation:150,duration:.18},L[2]+.15);tl.to('#tfArmR',{rotation:-150,duration:.18},L[2]+.15);hop('#tfSq',L[2]+.25,50,.14,.18);
MGP.forEach(([x,y],i)=>{const t=tMug+i*.12;tl.set(`#mgW${i}`,{opacity:1,x,y},t);tl.fromTo(`#mg${i}`,{scale:.1},{scale:.8,duration:.3,ease:'back.out(2.4)'},t);steamUp(`#mg${i}S0`,t+.3);steamUp(`#mg${i}S1`,t+.7);sparks(t+.15,x,y-90,3,50);});
tl.set('#pstW',{opacity:1,x:PSP[0],y:PSP[1]},tPan);tl.fromTo('#pst',{scale:.1},{scale:.75,duration:.4,ease:'back.out(2.4)'},tPan);steamUp('#pstS0',tPan+.4);steamUp('#pstS2',tPan+.4);steamUp('#pstS1',tPan+.8);steamUp('#pstS3',tPan+.8);sparks(tPan+.2,PSP[0],PSP[1]-160,8,110);hearts(tPan+.3,M50.tf[0],M50.tf[1]-330,4,70,200);

/* ================= SCENE 3: Grandma: "Come sit by the fire, dears." — she waves everybody in ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.gma,'power2.inOut');
GMAN.pm(L[3]-.1,'Gr');GMAN.talk(L[3]+.02,L[3]+DU[3]-.05,'Gr','Sm',.14);
waveArm('#gmaArmR',L[3]+.2,L[3]+DU[3]-.1,-110,-70,.3);hearts(W(3,5),GM50[0],GM50[1]-300,4,70,200);
lookAll2(L[3]+.3,-18,4);

/* ================= SCENE 4: Waddles: "I have a secret to tell." — everybody leans in ================= */
camTo(L[4]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[4]-.1,'Sm');WDN.eyes(L[4],true);WDN.talk(L[4]+.02,L[4]+DU[4]-.05,'Sm','Gr',.2);
tl.to('#wdSq',{rotation:-5,duration:.3},L[4]+.1);lookAll2(L[4]+.2,26,2);

/* ================= SCENE 5: Waddles: "I came to find the warmest friends!" — the firelight glows and hearts float up ================= */
camTo(L[5]-.45,.7,...CAM.wd2,'power2.inOut');
WDN.pm(L[5]-.1,'Gr');WDN.talk(L[5]+.02,L[5]+DU[5]-.05,'Gr','Sm',.13);
tl.to('#wdSq',{rotation:0,duration:.3},L[5]+.1);tl.to('#wdArmL',{rotation:100,duration:.2},L[5]+.3);tl.to('#wdArmR',{rotation:-100,duration:.2},L[5]+.3);
tl.to('#dg',{scale:1.6,duration:.9,ease:'sine.inOut'},W(5,4));hearts(W(5,5),WD50[0],WD50[1]-300,6,120,260);sparks(W(5,5),FIRE50[0],FIRE50[1]-200,12,260);

/* ================= SCENE 6: Bo: "You found us, Waddles!" — he runs over and hugs him ================= */
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[6]+.02,L[6]+DU[6]-.06);eyesMode(L[6]+.02,'hearts');brows(L[6]+.05,0,0,-4,.15);
runTo('bo',1190,ROWD+BOY,L[6]+.3,.8,.88,22);camTo(L[6]+.4,.8,...CAM.hug,'sine.inOut');
tl.to('#boArmL',{rotation:-160,duration:.18},L[6]+1.15);tl.to('#boArmR',{rotation:160,duration:.18},L[6]+1.15);tl.to('#wdArmL',{rotation:140,duration:.18},L[6]+1.15);tl.to('#wdArmR',{rotation:-140,duration:.18},L[6]+1.15);
hearts(L[6]+1.2,1300,1850,6,120,260);hop('#wdSq',L[6]+1.2,40,.12,.16);

/* ================= SCENE 7: Mochi: "Hmph. Fine. I'm a little warm." ================= */
tl.to('#boArmL,#boArmR,#wdArmL,#wdArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
tl.to('#mcArmL',{rotation:50,duration:.2},L[7]+.3);tl.to('#mcArmR',{rotation:-50,duration:.2},L[7]+.3);

/* ================= SCENE 8: "Mochi smiled, just a tiny bit!" ================= */
tl.to('#mcArmL,#mcArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.mc2,'power2.inOut');
MC.brows(L[8]+.1,0,0,-4,.2);mcEyes(L[8]+.3,'happy');MC.m(L[8]+.5,'mSm');
sparks(W(8,4),M50.mc[0],M50.mc[1]-250,8,100);hearts(W(8,5),M50.mc[0],M50.mc[1]-300,4,60,200);
faces2(W(8,5)+.2,'wide','O');lookAll2(W(8,5)+.2,-10,0);

/* ================= SCENE 9: everybody: "Happy snow day, Waddles!" ================= */
camTo(L[9]-.45,.8,...CAM.wide,'power2.inOut');
faces2(L[9]-.1,'happy','Big');ALLARMS(L[9]+.05);SQC.forEach((s,i)=>hop(s,L[9]+.1+i*.03,45,.14,.18));['#panSq','#wdSq','#pbSq','#nbSq','#rkSq','#gmaSq'].forEach((s,i)=>hop(s,L[9]+.15+i*.03,45,.14,.18));
confetti(L[9]+.1,900,2300,1100,2200,36,.9);hearts(L[9]+.3,WD50[0],WD50[1]-300,6,150,260);

/* ================= SCENE 10: "And they sang under the snowy stars!" — night falls, the stars and music notes appear ================= */
tl.to('#duskR',{opacity:.15,duration:1},tNight);tl.fromTo('#night',{opacity:0},{opacity:.44,duration:1.2,ease:'sine.inOut'},tNight);tl.fromTo('#nStars',{opacity:0},{opacity:1,duration:1.0},tNight+.4);
tl.fromTo('.nst',{scale:.6},{scale:1.1,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tNight+.6);
ARMS0(L[10]-.1);
for(let k=0;k<7;k++){faces2(L[10]+.2+k*.4,'happy',k%2?'Big':'O');}
WDN.talk(L[10]+.2,L[10]+DU[10]-.1,'Gr','Sm',.2);GMAN.talk(L[10]+.2,L[10]+DU[10]-.1,'Gr','Sm',.2);
SQC.concat(['#panSq','#wdSq','#pbSq','#nbSq','#rkSq','#gmaSq']).forEach((s,i)=>tl.fromTo(s,{rotation:-4},{rotation:4,duration:.4+((i%3)*.04),yoyo:true,repeat:Math.floor((L[11]-L[10]+.3)/(.4+((i%3)*.04)))-1,ease:'sine.inOut'},L[10]+.1));
tl.set('#ntW',{opacity:1,x:1400,y:1150},L[10]+.3);
[0,1,2,3,4].forEach(i=>{const t=L[10]+.4+i*.35;tl.set(`#nt${i}`,{opacity:1},t);tl.fromTo(`#nt${i}`,{y:0,scale:.3},{y:-520,scale:1,duration:1.8,ease:'sine.out'},t);tl.to(`#nt${i}`,{opacity:0,duration:.4},t+1.5);tl.fromTo(`#ntg${i}`,{rotation:-10},{rotation:10,duration:.35,yoyo:true,repeat:4,ease:'sine.inOut'},t);});
burst(W(10,6),700,300,1.5);burst(W(10,6)+.5,1900,350,1.4);

/* ================= SCENE 11: "And that was the end of Season ten!" — fireworks, confetti, the end card ================= */
camTo(L[11]-.4,.8,...CAM.wide,'power2.inOut');
[[1400,200,2.0],[800,420,1.6],[2050,450,1.6],[1100,160,1.5],[1750,230,1.6]].forEach(([x,y,s],i)=>burst(L[11]+.1+i*.4,x,y,s));
[0,.18,.36,.54,.72].forEach((d,i)=>burst(tBang+d,700+i*350,160+(i%2)*220,1.8));
confetti(tBang,900,2300,1000,2200,44,1.0);hearts(tBang+.2,WD50[0],WD50[1]-300,8,220,280);
SQC.forEach((s,i)=>hop(s,tBang+.1+i*.05,45,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the green lawn turns white (the snow set fades in, flakes fall all episode); close-ups: Bo, Pebble, Mochi (shivering), Truffle (scarves), Zap (thermometer), Coco (frozen bananas);
// a penguin slides down the hill on his belly, introduces himself, Bo welcomes him, and a big red sled slides in
const WDT=WD46;
const CAM={wide:[380,-220,.53], bo:ECAM('bo',M46.bo), peb:camE(800,ROWD+14-EH.pb*PBS,1.2,540,700), mc:ECAM('mc',M46.mc), tf:ECAM('tf',M46.tf), zp:ECAM('zp',M46.zp), cm:ECAM('cm',M46.cm),
 hill:camE(2500,1500,.6,540,820), wd:ECAM('wd',WDT,1.2), two:camE(1925,1850,.8,540,800), end:[380,-220,.53]};
const tWhite=W(1,4), tSlide=L[8]+.35, tSled=L[11]+.2;
const tStk=L[11]+DU[11]+.45;
snowfall();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
gsap.set('#snf0,#snf1,#snf2',{opacity:0});

/* ================= SCENE 1: "One morning, everything turned white!" — the lawn fades to snow, flakes start to fall ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,0,-18);
tl.to('#snowSet',{opacity:1,duration:1.6,ease:'sine.inOut'},.5);tl.set('#skySet',{opacity:0},2.15);          // the snow fades in ON TOP of the lawn (fading both would show the kitchen behind)
tl.to('#coldR',{opacity:.1,duration:1.6},.5);tl.to('#snf0,#snf1,#snf2',{opacity:.95,duration:.8},.3);
faces2(tWhite-.2,'wide','O');sparks(tWhite,1300,900,10,300);sparks(tWhite+.1,700,1000,6,200);sparks(tWhite+.1,1900,1000,6,200);

/* ================= SCENE 2: Bo: "Wow! The lawn is all snow!" ================= */
camTo(L[2]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);eyesMode(L[2]+.02,'hearts');brows(L[2]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[2]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[2]+.2);hop('#boSq',L[2]+.25,70,.15,.2);hop('#boSq',W(2,5),60,.14,.18);
hearts(W(2,5),M46.bo[0],ROWD+BOY-480,5,90,240);look(L[2]+.1,0,-26,.12);

/* ================= SCENE 3: Pebble: "Snow! Snow! Snow!" ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.4,.7,...CAM.peb,'power2.inOut');
PB.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.12);PB.eyes(L[3],'happy');
[0,.35,.7].forEach(d=>hop('#pbSq',L[3]+.02+d,60,.12,.16));tl.to('#pbArmL',{rotation:150,duration:.15},L[3]+.1);tl.to('#pbArmR',{rotation:-150,duration:.15},L[3]+.1);hearts(L[3]+.3,800,ROWD-170,3,60,150);

/* ================= SCENE 4: Mochi: "Hmph. Snow is cold. Obviously." — she shivers ================= */
tl.to('#pbArmL,#pbArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[4]+.1,'mFr');MC.talk(L[4]+.12,L[4]+DU[4]-.08,'mOp','mFr',.16);mcEyes(L[4]+.15,'lids');MC.brows(L[4]+.1,8,-8,2,.2);
shiver('#mcSq',L[4]+.1,L[4]+DU[4]+.2,3);tl.to('#mcArmL',{rotation:50,duration:.2},L[4]+.2);tl.to('#mcArmR',{rotation:-50,duration:.2},L[4]+.2);
dust(L[4]+.3,M46.mc[0]+30,M46.mc[1]-300,.7);dust(L[4]+1.1,M46.mc[0]+30,M46.mc[1]-300,.7);

/* ================= SCENE 5: Truffle: "Everybody put on your scarves!" ================= */
tl.to('#mcArmL,#mcArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[5]+.02,L[5]+DU[5]-.05,'mBg','mSm',.13);TF.eyes(L[5],'happy');
tl.to('#tfArmL',{rotation:150,duration:.18},L[5]+.2);tl.to('#tfArmR',{rotation:-150,duration:.18},L[5]+.2);hop('#tfSq',W(5,4),50,.14,.18);
['gm','pt','rk','cm','bp','zp','mc','bo','tf'].forEach((p,i)=>sparks(W(5,4)+.1+i*.08,M46[p][0],M46[p][1]-260,4,70));hearts(W(5,4),M46.tf[0],M46.tf[1]-330,4,70,200);

/* ================= SCENE 6: Zap: "Beep boop! Temperature: minus five!" ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mSm',.13);ZP.eyes(L[6],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[6]);tl.set('#zpAnt',{rotation:0},L[6]+DU[6]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[6]+.2);shiver('#zpSq',L[6]+.4,L[6]+DU[6],2);
tl.set('#thermW',{opacity:1},W(6,2));tl.fromTo('#therm',{scale:.1},{scale:.8,duration:.4,ease:'back.out(2.2)'},W(6,2));tl.to('#thermW',{opacity:0,duration:.25},L[7]-.3);

/* ================= SCENE 7: Coco: "Ooh-ooh! My bananas are frozen!" ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.12);cmEyes(L[7],'wide');
tl.to('#cmArmL',{rotation:150,duration:.12},L[7]+.1);tl.to('#cmArmR',{rotation:-150,duration:.12},L[7]+.1);
tl.set('#bnsW',{opacity:1,x:M46.cm[0],y:M46.cm[1]-480},W(7,2)-.1);tl.fromTo('#bns',{scale:.1},{scale:.8,duration:.4,ease:'back.out(2.4)'},W(7,2)-.1);
tl.fromTo('#bns',{rotation:-6},{rotation:6,duration:.08,yoyo:true,repeat:7},W(7,3));sparks(W(7,4),M46.cm[0],M46.cm[1]-560,8,90);hop('#cmSq',W(7,4),60,.12,.16);
tl.to('#bnsW',{opacity:0,duration:.25},L[8]-.3);tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[8]-.3);

/* ================= SCENE 8: "Then something slid down the hill!" — a penguin slides in on his belly ================= */
camTo(L[8]-.45,.7,...CAM.hill,'power2.inOut');
tl.set('#wd',{opacity:1,x:3300,y:1350,rotation:0},tSlide-.1);tl.set('#wdShake',{rotation:-24},tSlide-.1);
tl.to('#wd',{x:WDT[0],duration:1.5,ease:'power2.out'},tSlide);tl.to('#wd',{y:WDT[1],duration:1.5,ease:'power1.in'},tSlide);
for(let k=0;k<6;k++) dust(tSlide+.15+k*.2,3300-(3300-WDT[0])*(k/6)+80,1350+(WDT[1]-1350)*Math.pow(k/6,1.6)+40,1.3);
tl.to('#wdShake',{rotation:0,duration:.3,ease:'back.out(2)'},tSlide+1.45);shake(tSlide+1.5,8,5);sparks(tSlide+1.55,WDT[0],WDT[1]-60,10,170);
faces2(tSlide+1.2,'wide','O');lookAll2(tSlide+1.2,34,6);

/* ================= SCENE 9: Waddles: "I'm Waddles! I love snow!" ================= */
camTo(L[9]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[9]-.1,'Gr');WDN.eyes(L[9],true);WDN.talk(L[9]+.02,L[9]+DU[9]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[9]+.2);hop('#wdSq',L[9]+.3,50,.14,.18);hop('#wdSq',W(9,4),50,.14,.18);hearts(W(9,3),WDT[0],WDT[1]-300,4,70,200);
tl.to('#bo',{x:1720,duration:1.0,ease:'sine.inOut'},L[9]+.3);cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],L[9]+.3,L[9]+1.3,.24,14,8,'#boSq',6);

/* ================= SCENE 10: Bo: "A penguin! Welcome, Waddles!" ================= */
camTo(L[10]-.45,.7,...CAM.two,'power2.inOut');
bTalk(L[10]+.02,L[10]+DU[10]-.06);eyesMode(L[10]+.02,'hearts');brows(L[10]+.05,0,0,-4,.15);
tl.to('#boArmR',{rotation:-80,duration:.2},L[10]+.2);tl.to('#wdArmL',{rotation:80,duration:.2},L[10]+.2);hop('#boSq',W(10,2),60,.14,.18);hearts(W(10,3),1925,1550,5,90,240);

/* ================= SCENE 11: "And he brought a very big sled!" — the red sled slides in from the right ================= */
tl.to('#boArmR',{rotation:0,duration:.2},L[11]-.3);tl.to('#wdArmL',{rotation:0,duration:.2},L[11]-.3);
camTo(L[11]-.4,.8,...CAM.end,'power2.inOut');
tl.set('#sldW',{opacity:1,x:3700,y:1840},tSled);tl.to('#sldW',{x:1700,duration:1.5,ease:'power2.out'},tSled);
for(let k=0;k<6;k++) dust(tSled+.1+k*.2,3700-(2000)*(k/6)+300,2090,1.6);
faces2(tSled+.6,'wide','Big');lookAll2(tSled+.6,34,4);armsUp(tSled+1.4,.15);SQC.forEach((s,i)=>hop(s,tSled+1.5+i*.05,40,.12,.16));confetti(tSled+1.4,700,2400,1300,2300,26,.8);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

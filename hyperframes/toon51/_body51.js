/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the last snowy morning on the lawn; "melted": flash, the snow set fades out (lawn), Waddles sweats, Bo says swimming, Pebble kicks a beach ball, Truffle's basket pops open, Zap's SPF sign, Mochi is itchy;
// "marched": the beach set fades in on top and its layers scroll while everybody marches in place; Coco sees the ocean, glints on the waves, Waddles runs up the beach and splashes into the sea
const CAM={wide:[380,-220,.53], wd:ECAM('wd',WD51,1.2), bo:ECAM('bo',M51.bo), pb:camE(PB51[0],PB51[1]-EH.pb*PBS,1.2,540,700), tf:ECAM('tf',M51.tf), zp:ECAM('zp',M51.zp), mc:ECAM('mc',M51.mc), cm:ECAM('cm',M51.cm), end:camE(1480,1480,.62,540,830)};
const tMelt=W(1,4), tMarch=L[8]-.2, tBeach=L[8]+.1, tRun=L[11]-.6, tSplash=W(11,2);
const SPD=beachRun([[0,0],[tMarch,0],[tMarch+.6,1000],[L[9]-.3,1000],[L[9]+.5,0],[30,0]],30);
const tStk=L[11]+DU[11]+.45;
document.querySelector('#thermW text').textContent='SPF 50';
beachLife();snowfall();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "The sun melted all the snow!" — a bright flash, the snow set fades out and the green lawn shows ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,0,-12);shiver('#mcSq',.2,tMelt-.1,3);
tl.fromTo('#flash',{opacity:0},{opacity:.85,duration:.12},tMelt-.1);tl.to('#flash',{opacity:0,duration:.5},tMelt+.02);
tl.to('#snowSet',{opacity:0,duration:1.1,ease:'sine.inOut'},tMelt);tl.to('#coldR',{opacity:0,duration:1},tMelt);tl.to('#snf0,#snf1,#snf2',{opacity:0,duration:.8},tMelt);
faces2(tMelt+.2,'wide','O');lookAll2(tMelt+.2,26,-30);sparks(tMelt+.1,1900,150,12,300);

/* ================= SCENE 2: Waddles: "Oh no! I am too hot!" — sweat drops, he fans himself ================= */
camTo(L[2]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[2]-.1,'Oh');WDN.eyes(L[2],true);WDN.talk(L[2]+.02,L[2]+DU[2]-.05,'Oh','Gr',.14);
waveArm('#wdArmL',L[2]+.15,L[2]+DU[2]+.4,60,130,.14);waveArm('#wdArmR',L[2]+.15,L[2]+DU[2]+.4,-60,-130,.14);
sweatDrops(L[2]+.1,L[3]-.3,WD51[0],WD51[1]-170*WD51[2],WD51[2]);
faces2(L[2]+.2,'wide','Sm');lookAll2(L[2]+.2,0,-6);

/* ================= SCENE 3: Bo: "Don't worry! Let's go swimming!" ================= */
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.06);eyesMode(L[3]+.02,'hearts');brows(L[3]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[3]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[3]+.2);hop('#boSq',W(3,4)-.1,70,.14,.18);hearts(W(3,4),M51.bo[0],M51.bo[1]-480,5,90,240);

/* ================= SCENE 4: Pebble: "Beach! Beach! Beach!" — she hops, and a beach ball bounces with her ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.pb,'power2.inOut');
PB.talk(L[4]+.02,L[4]+DU[4]-.05,'mBg','mSm',.12);PB.eyes(L[4],'happy');
tl.set('#ballW',{opacity:1,x:PB51[0]+230,y:PB51[1]-80,scale:.9},W(4,0)-.15);tl.fromTo('#ball',{scale:.1},{scale:1,duration:.3,ease:'back.out(2)'},W(4,0)-.15);
[0,1,2].forEach(k=>{hop('#pbSq',W(4,k)+.02,60,.12,.16);arc('#ballW',W(4,k)+.02,.5,PB51[1]-80,230,PB51[1]-80);tl.to('#pbArmL',{rotation:150,duration:.12},W(4,k)+.02);tl.to('#pbArmR',{rotation:-150,duration:.12},W(4,k)+.02);});
hearts(W(4,2),PB51[0],PB51[1]-250,3,60,150);

/* ================= SCENE 5: Truffle: "I packed the picnic basket!" — the basket pops up and opens ================= */
tl.to('#pbArmL,#pbArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[5]+.02,L[5]+DU[5]-.05,'mBg','mSm',.13);TF.eyes(L[5],'happy');
tl.set('#bskW',{opacity:1,x:M51.tf[0]+190,y:M51.tf[1]+70,scale:.6},W(5,3)-.2);tl.fromTo('#bsk',{scale:.1},{scale:1,duration:.35,ease:'back.out(2.4)'},W(5,3)-.2);
tl.to('#bskLid',{rotation:-110,duration:.3,ease:'back.out(2)'},W(5,4)-.05);tl.set('#bskPc,#bskCup0,#bskCup1',{opacity:1},W(5,4)+.15);sparks(W(5,4)+.1,M51.tf[0]+190,M51.tf[1]-120,8,110);
tl.to('#tfArmL',{rotation:150,duration:.18},L[5]+.15);tl.to('#tfArmR',{rotation:-150,duration:.18},L[5]+.15);hop('#tfSq',W(5,4),50,.14,.18);

/* ================= SCENE 6: Zap: "Beep boop! Sunscreen level fifty!" — an SPF 50 sign pops over his head ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mSm',.13);ZP.eyes(L[6],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[6]/.14)-1},L[6]);tl.set('#zpAnt',{rotation:0},L[6]+DU[6]);
tl.set('#thermW',{opacity:1,x:M51.zp[0],y:M51.zp[1]-400},W(6,2));tl.fromTo('#therm',{scale:.1},{scale:.8,duration:.4,ease:'back.out(2.2)'},W(6,2));tl.to('#thermW',{opacity:0,duration:.25},L[7]-.3);
tl.to('#zpArmL',{rotation:110,duration:.2},L[6]+.25);

/* ================= SCENE 7: Mochi: "Hmph. Sand is itchy. Obviously." — she wriggles her feet ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
[0,1,2,3].forEach(k=>hop('#mcSq',W(7,3)+k*.2,18,.07,.09));

/* ================= SCENE 8: "They marched over the hill!" — the beach fades in and scrolls past everybody ================= */
camTo(L[8]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[8]-.1,'happy','Big');lookAll2(L[8]-.1,-30,0);
tl.to('#beachSet',{opacity:1,duration:.9,ease:'sine.inOut'},tBeach);tl.set('#skySet',{opacity:0},tBeach+.95);
marchAll(tMarch,L[9]+.3);

/* ================= SCENE 9: Coco: "Ooh-ooh! I see the ocean!" ================= */
camTo(L[9]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.12);cmEyes(L[9],'wide');
tl.to('#cmArmL',{rotation:150,duration:.14},L[9]+.45);tl.to('#cmArmR',{rotation:-150,duration:.14},L[9]+.45);hop('#cmSq',W(9,4),60,.12,.16);sparks(W(9,4),M51.cm[0],M51.cm[1]-460,8,100);

/* ================= SCENE 10: "Blue waves sparkled in the sun!" — glints dance over the sea ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[10]+.1,'happy','Big');lookAll2(L[10]+.1,0,-16);
for(let k=0;k<8;k++) sparks(W(10,2)-.2+k*.16,800+((k*397)%1300),1120+((k*131)%260),5,60);
armsUp(L[10]+.5,.15);

/* ================= SCENE 11: "And Waddles splashed right in!" — he runs up the beach and dives into the sea ================= */
tl.to('#boArmL,#boArmR,#wdArmL,#wdArmR',{rotation:0,duration:.2},tRun-.45);
tl.to('#wd',{x:WD51[0],y:1380,scale:.62,duration:1.15,ease:'sine.inOut'},tRun);cycle(['#wdLegL','#wdLegR'],['#wdArmL','#wdArmR'],tRun,tRun+1.15,.2,16,10,'#wdSq',8);
camTo(L[11]-.4,.8,...CAM.end,'power2.inOut');
spray(tSplash,WD51[0]-70,1390,1.5);spray(tSplash+.1,WD51[0]+90,1380,1.3);spray(tSplash+.22,WD51[0],1350,1.7);sparks(tSplash+.05,WD51[0],1330,12,260);
tl.to('#wdArmL',{rotation:140,duration:.15},tSplash+.3);tl.to('#wdArmR',{rotation:-140,duration:.15},tSplash+.3);
tl.fromTo('#wdSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tSplash+.6);
faces2(tSplash,'happy','Big');SQC.forEach((s,i)=>hop(s,tSplash+.2+i*.05,45,.14,.18));hearts(tSplash+.3,WD51[0],1280,6,200,240);confetti(tSplash+.2,900,2300,1000,2000,30,.8);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

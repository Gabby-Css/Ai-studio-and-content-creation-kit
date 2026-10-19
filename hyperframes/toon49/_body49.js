/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: Munch (left) builds a giant snow castle (it grows from the ground at "built"); close-ups: Munch invites, Bo + a look-up to the pancake tower, Truffle runs into the castle kitchen,
// Blip starts a snowball fight, snowballs fly everywhere, Mochi dodges, Waddles is the champion, Pebble wants more; then the castle wobbles, falls into a pile, and everybody scatters laughing
const CAM={wide:[380,-220,.53], mn:ECAM('mn',M49.mn), bo:ECAM('bo',M49.bo), top:camE(CX,780,.72,540,800), tf:ECAM('tf',M49.tf), door:camE(CX-120,CY-230,.7,540,800), bp:ECAM('bp',M49.bp), mc:ECAM('mc',M49.mc),
 wd:ECAM('wd',WD49,1.2), pb:camE(PB49[0],PB49[1]-EH.pb*PBS,1.2,540,700), cast:camE(CX,CY-500,.6,540,800)};
const tBuild=W(1,1), tTop=W(3,2), tEnter=L[4]+1.6, tWob=W(10,3)-.1, tOut=W(10,5)+.2, tFall=W(11,2);
const tStk=L[11]+DU[11]+.45;
const ALLSQ=SQC.concat(['#panSq','#pbSq','#wdSq','#rkSq','#nbSq']);
snowfall();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
// an arm that waves between two angles until t1, then drops back to 0 (no tween outlives its scene)
const waveArm=(sel,t0,t1,a,b,per=.25)=>{const n=Math.max(1,Math.floor((t1-t0)/per));tl.fromTo(sel,{rotation:a},{rotation:b,duration:per,yoyo:true,repeat:n-1,ease:'sine.inOut'},t0);tl.to(sel,{rotation:0,duration:.2},t0+n*per);};

/* ================= SCENE 1: "Munch built a giant gray snow castle!" — the castle grows from the ground ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,0,0);MN.eyes(0,'happy');MN.m(0,'mSm');
tl.set('#castW',{opacity:1},tBuild);tl.fromTo('#cast',{scale:.05},{scale:1,duration:1.1,ease:'back.out(1.4)'},tBuild);
for(let k=0;k<6;k++) dust(tBuild+.1+k*.18,CX-420+k*170,CY+10,1.8);
sparks(tBuild+.95,CX,CY-600,12,320);shake(tBuild+.95,10,6);
tl.to('#mnArmL',{rotation:70,duration:.2},tBuild-.3);tl.to('#mnArmR',{rotation:-70,duration:.2},tBuild-.3);
waveArm('#mnArmL',tBuild-.05,tBuild+1.2,70,130,.2);waveArm('#mnArmR',tBuild-.05,tBuild+1.2,-70,-130,.2);
hop('#mnSq',tBuild+.95,40,.12,.16);
faces2(tBuild+.9,'wide','O');lookAll2(tBuild+.9,26,-18);

/* ================= SCENE 2: Munch: "Come inside my snow castle!" — the door glows ================= */
camTo(L[2]-.45,.7,...CAM.mn,'power2.inOut');
MN.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.2);MN.eyes(L[2],'happy');faces2(L[2]+.1,'happy','Sm');
tl.to('#mnArmL',{rotation:120,duration:.25},L[2]+.1);tl.to('#mnArmR',{rotation:-120,duration:.2},L[2]);waveArm('#mnArmR',L[2]+.2,L[2]+DU[2]-.1,-120,-80,.25);
tl.set('#dgW',{opacity:1},L[2]+.5);tl.fromTo('#dg',{opacity:.15},{opacity:.55,duration:.3,yoyo:true,repeat:7},L[2]+.5);
hop('#mnSq',W(2,3),45,.12,.16);

/* ================= SCENE 3: Bo: "Wow! It has a pancake tower!" — look up, the pancake tower pops on top ================= */
tl.to('#mnArmL',{rotation:0,duration:.2},L[3]-.35);
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.06);eyesMode(L[3]+.02,'wide');brows(L[3]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[3]+.15);tl.to('#boArmR',{rotation:160,duration:.18},L[3]+.15);hop('#boSq',L[3]+.2,60,.14,.18);
camTo(Math.max(L[3]+.3,tTop-.35),.7,...CAM.top,'power2.inOut');
tl.set('#castTop',{opacity:1},tTop);tl.fromTo('#castTop',{scale:.1},{scale:1,duration:.45,ease:'back.out(2.4)'},tTop);
sparks(tTop+.1,CX,CY-1120,12,220);hearts(tTop+.3,CX,CY-1150,5,120,260);eyesMode(tTop+.1,'hearts');

/* ================= SCENE 4: Truffle: "I'll bake in the castle kitchen!" — she runs through the door ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[4]-.35);
camTo(L[4]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[4]+.02,L[4]+DU[4]-.05,'mBg','mSm',.13);TF.eyes(L[4],'happy');
tl.to('#tfArmL',{rotation:150,duration:.18},L[4]+.1);tl.to('#tfArmR',{rotation:-150,duration:.18},L[4]+.1);tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.15},L[4]+.5);
runTo('tf',CX,ROWF+90,L[4]+.6,1.0,.74,20);camTo(L[4]+.6,.9,...CAM.door,'sine.inOut');
tl.to('#tf',{scale:.4,opacity:0,duration:.25,ease:'power2.in'},tEnter);sparks(tEnter+.2,CX,CY-120,8,140);
tl.fromTo('#dg',{opacity:.2},{opacity:.75,duration:.25,yoyo:true,repeat:3},tEnter);

/* ================= SCENE 5: Blip: "Snowball fight! Everybody duck!" — the first snowball sails over everybody's heads ================= */
camTo(L[5]-.45,.7,...CAM.bp,'power2.inOut');
BP.talk(L[5]+.02,L[5]+DU[5]-.05,'mBg','mO',.13);BP.eyes(L[5],'wide');
tl.to('#bpArmL',{rotation:150,duration:.15},L[5]+.15);tl.to('#bpArmR',{rotation:-150,duration:.15},L[5]+.15);tl.to('#bpArmL,#bpArmR',{rotation:0,duration:.2},W(5,1)+.4);
throwSb(W(5,1)+.25,M49.bp[0],M49.bp[1]-300,600,ROWD-20-260,1.1,380);
duck(ALLSQ.filter(s=>s!=='#mnSq'),W(5,3)-.05);
faces2(W(5,3)-.1,'wide','O');
tl.fromTo('#mnSq',{rotation:0},{rotation:-10,duration:.1,yoyo:true,repeat:3},W(5,1)+.25+1.1);MN.eyes(W(5,1)+.25+1.1,'wide');MN.m(W(5,1)+.25+1.1,'mO');

/* ================= SCENE 6: "Snowballs flew in every direction!" — eight snowballs criss-cross the lawn ================= */
camTo(L[6]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[6]-.2,'happy','Big');lookAll2(L[6]-.2,0,-6);MN.eyes(L[6]-.2,'happy');MN.m(L[6]-.2,'mBg');
[[2180,1900,900,1700,.9,400],[860,1650,2020,1500,.9,400],[1350,1700,2350,1700,1.0,420],[1160,1900,CX,1300,.7,300],[2060,1700,1180,1500,.9,380],[2400,2000,1420,2000,.8,250],[640,1850,2060,1600,1.2,520],[1420,2000,2350,1700,.9,380]]
 .forEach(([x0,y0,x1,y1,d,h],i)=>throwSb(L[6]+.02+i*.32,x0,y0,x1,y1,d,h));
[1,3,5,7].forEach(i=>hop(SQC[i],L[6]+.4+i*.15,40,.12,.16));
tl.to('#mnArmL',{rotation:100,duration:.2},L[6]);tl.to('#mnArmR',{rotation:-100,duration:.2},L[6]);tl.to('#mnArmL,#mnArmR',{rotation:0,duration:.2},L[7]-.35);

/* ================= SCENE 7: Mochi: "Hmph. Not on my fur. Obviously." — a snowball whizzes just over her head ================= */
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
throwSb(W(7,1)-.4,2060,1660,300,1700,.9,100);
tl.fromTo('#mcSq',{rotation:0},{rotation:12,duration:.15,yoyo:true,repeat:1,ease:'power2.out'},W(7,1)+.05);
tl.to('#mcArmL',{rotation:120,duration:.2},L[7]+.5);tl.to('#mcArmR',{rotation:-120,duration:.2},L[7]+.5);tl.to('#mcArmL,#mcArmR',{rotation:0,duration:.2},L[8]-.35);

/* ================= SCENE 8: Waddles: "I'm the snowball champion!" — three quick throws at Nibbles ================= */
camTo(L[8]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[8]-.1,'Gr');WDN.eyes(L[8],true);WDN.talk(L[8]+.02,L[8]+DU[8]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[8]+.2);
[0,1,2].forEach(k=>{const t=W(8,2)+.1+k*.28;tl.fromTo('#wdArmR',{rotation:-40},{rotation:-150,duration:.14,ease:'power2.out'},t-.12);throwSb(t,WD49[0]+60,WD49[1]-300,2420,ROWD+10-230,.45,90);tl.fromTo('#nbSq',{rotation:0},{rotation:-9,duration:.08,yoyo:true,repeat:1},t+.45);});
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[9]-.35);hop('#wdSq',W(8,3),50,.14,.18);hearts(W(8,3),WD49[0],WD49[1]-300,4,70,200);

/* ================= SCENE 9: Pebble: "Again! Again! Again!" — she hops, three more snowballs splat on Bo ================= */
camTo(L[9]-.45,.7,...CAM.pb,'power2.inOut');
PB.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.12);PB.eyes(L[9],'happy');
[0,1,2].forEach(k=>{hop('#pbSq',W(9,k)+.02,60,.12,.16);throwSb(W(9,k)-.2,1760,1960,1160,ROWD+BOY-250,.5,110);tl.fromTo('#boSq',{rotation:0},{rotation:-9,duration:.08,yoyo:true,repeat:1},W(9,k)+.3);});
tl.to('#pbArmL',{rotation:150,duration:.15},L[9]+.1);tl.to('#pbArmR',{rotation:-150,duration:.15},L[9]+.1);tl.to('#pbArmL,#pbArmR',{rotation:0,duration:.2},L[10]-.35);

/* ================= SCENE 10: "Then the castle began to wobble!" — it sways, chunks fall off, Truffle bursts out of the door ================= */
camTo(L[10]-.45,.8,...CAM.cast,'power2.inOut');
faces2(tWob,'wide','O');lookAll2(tWob,0,-22);
for(let k=0;k<12;k++) tl.to('#cast',{rotation:(k%2?1:-1)*(1+k*.4),duration:.12,ease:'sine.inOut'},tWob+k*.12);
tl.to('#cast',{rotation:0,duration:.1},tWob+1.44);
for(let k=0;k<6;k++){const x=CX-420+k*170,y0=CY-980+(k%2)*220,t=tWob+.25+k*.2;tl.set(`#chk${k}W`,{opacity:1,x:x,y:y0,scale:1},t);tl.fromTo(`#chk${k}W`,{y:y0},{y:CY-40,duration:.7,ease:'power2.in'},t);tl.fromTo(`#chk${k}`,{rotation:0},{rotation:260,duration:.7,ease:'none'},t);tl.set(`#chk${k}W`,{opacity:0},t+.7);dust(t+.7,x,CY+10,1.2);}
tl.fromTo('#castTop',{rotation:-6},{rotation:6,duration:.1,yoyo:true,repeat:11},tWob);tl.set('#castTop',{rotation:0},tWob+1.3);
shake(tWob+.1,6,12);
tl.set('#tf',{opacity:1,scale:.74,x:CX,y:ROWF+90},tOut);tl.to('#tf',{x:1330,y:ROWF+90,duration:.9,ease:'sine.inOut'},tOut+.01);
cycle(['#tfLegL','#tfLegR'],['#tfArmL','#tfArmR'],tOut,tOut+.9,.24,20,10,'#tfSq',8);TF.eyes(tOut,'wide');TF.m(tOut,'mBg');sparks(tOut,CX,CY-120,8,140);

/* ================= SCENE 11: "And everybody ran out laughing!" — the castle falls into a pile of snow, everybody scatters laughing ================= */
camTo(L[11]-.4,.8,...CAM.wide,'power2.inOut');
tl.to('#cast',{scaleY:.06,scaleX:1.12,duration:.5,ease:'power2.in'},tFall);
tl.set('#snpW',{opacity:1},tFall+.3);tl.fromTo('#snp',{scale:.2},{scale:1,duration:.45,ease:'back.out(1.6)'},tFall+.3);tl.set('#castW',{opacity:0},tFall+.6);tl.set('#dgW',{opacity:0},tFall+.4);
for(let k=0;k<7;k++) dust(tFall+.3+k*.08,CX-480+k*160,CY+10,2.2);
shake(tFall+.3,18,10);sparks(tFall+.35,CX,CY-300,16,360);
faces2(L[11]+.05,'happy','Big');lookAll2(L[11]+.05,0,-6);MN.eyes(L[11],'happy');MN.m(L[11],'mBg');TF.eyes(L[11]+.05,'happy');
runTo('wd',2300,WD49[1],L[11]+.2,.8,.9,16);runTo('bp',2180,M49.bp[1],L[11]+.2,.8,.66,16);runTo('pan',1560,M49.pan[1]+40,L[11]+.2,.8,.9,16);
tl.to('#mnArmL',{rotation:120,duration:.2},L[11]+.2);tl.to('#mnArmR',{rotation:-120,duration:.2},L[11]+.2);
[0,1,2,3].forEach(k=>hop('#mnSq',L[11]+.4+k*.4,45,.12,.16));
SQC.forEach((s,i)=>hop(s,L[11]+1.1+i*.05,40,.12,.16));hop('#pbSq',L[11]+1.1,50,.12,.16);
hearts(tFall+.5,CX,CY-300,6,260,260);confetti(tFall+.2,900,2400,1100,2300,40,.9);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

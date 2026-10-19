/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: Bo's birthday morning in the dark, empty circus tent (Flapjack rides on Bo's head). Bo calls "Hello?", glances round, the camera creeps in: LOW POINT = one frown ("everybody forgot"), Flapjack's kind little lie.
// THE TURN is one frame: a black beat, then a hard cut to the wide: spotlights flash, crowd + every friend + the HAPPY BIRTHDAY banner appear, confetti. Bo's joy, Mochi's "Obviously", Munch lifts the cake
// (pancake tower + two candles) and sets it down by Bo, Bo blows the candles out, pancake rain + fireworks, the end card.
const CAM={wide:[380,-220,.53], pair:camE(1250,1760,.8,540,860), bo:camE(1230,1580,1.05,540,800), bo2:camE(1236,1586,1.22,540,800), mc:ECAM('mc',M61.mc), mn:ECAM('mn',M61.mn,.8), cake:camE(1420,1620,.9,540,860)};
const tTurn=W(6,3)-.05, tStk=L[11]+DU[11]+.45;
const CKX=1590, CKY=ROWD+50, CKS=1.0;                                   // where the cake lands (centre of its base), next to Bo
const CND=[CKX-62*CKS,CKX+62*CKS].map(x=>[x,CKY-470*CKS]);              // the two candle flames in world coordinates
const tCake=W(10,4), tCarry=W(10,5)-.1, tBlow=W(11,1), tP=W(11,4)-.1;   // cake pops up over Munch / is carried to Bo / Bo blows / the party
const ARMS=Object.keys(M61).map(p=>`#${p}ArmL,#${p}ArmR`).join(',');
const SQ_ALL=SQC.concat(['#wdSq','#pdSq','#pmSq','#pkSq','#pbSq','#mnSq']);
const revealAt=(t)=>{for(const [p,[x,y,s]] of Object.entries(M61)){if(p==='bo')continue;tl.set('#'+p,{opacity:1,x,y,scale:s},t);tl.set(`#${p}ArmL,#${p}ArmR`,{rotation:0},t);}};
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}
circusLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#bnr',{rotation:-2},{rotation:2,duration:1.2,yoyo:true,repeat:23,ease:'sine.inOut'},0);
// the crowd bobs, row by row, from the turn on
['crcRow0','crcRow1','crcRow2'].forEach((r,i)=>tl.fromTo('#'+r,{y:0},{y:-14,duration:.3,yoyo:true,repeat:Math.floor((29.4-tTurn)/.3)-1,ease:'sine.inOut'},tTurn+.1+i*.07));

/* ================= SCENE 1: "It was Bo's birthday morning!" — the dark empty ring, a slow push-in ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,0,0);
camTo(.3,L[3]-.55-.3,...CAM.pair,'sine.inOut');
lookAll2(L[1]+.3,-26,-6);lookAll2(L[1]+1.4,26,-6);

/* ================= SCENE 2: Bo: "Hello? Is anybody here?" ================= */
lookAll2(L[2]-.05,0,-4);bTalk(L[2]+.12,L[2]+DU[2]-.08,'mOpen','mSmile',.13);
lookAll2(W(2,2),30,-6);pingAt(L[2]+.15,M61.bo[0]-250,M61.bo[1]-420);pingAt(L[2]+.45,M61.bo[0]+250,M61.bo[1]-420);

/* ================= SCENE 3: "But the big tent was empty." — he looks left, right, then down ================= */
lookAll2(L[3]+.15,-34,-8);lookAll2(L[3]+1.0,34,-8);lookAll2(L[3]+DU[3]-.25,0,22);

/* ================= SCENE 4: Bo: "Maybe everybody forgot my birthday." — THE LOW POINT: one frown, Flapjack worried above him ================= */
camTo(L[4]-.45,.7,...CAM.bo,'power2.inOut');
faces2(L[4]-.1,'normal','Fr');lookAll2(L[4]-.05,0,28);
tl.to('#boSq',{rotation:-4,duration:.6,ease:'sine.out'},L[4]);
bTalk(L[4]+.12,L[4]+DU[4]-.08,'mOpen','mFrown',.2);bm(L[4]+DU[4]-.02,'mFrown');

/* ================= SCENE 5: Flapjack: "Maybe they are just late, Bo." — the kind little lie; the camera creeps closer ================= */
camTo(L[4]+DU[4]+.05,(L[5]+DU[5])-(L[4]+DU[4]+.05),...CAM.bo2,'sine.inOut');
FB.pm(L[5]-.1,'Sm');FB.look(L[5],0,14);FB.talk(L[5]+.1,L[5]+DU[5]-.05,'Gr','Sm',.13);
FB.pm(L[5]+DU[5]+.08,'Wo');

/* ================= SCENE 6: "Then the spotlights flashed on!" — THE TURN: a black beat, then one frame ================= */
tl.set('#crcBlkW',{opacity:1},tTurn-.3);
camSet(tTurn,...CAM.wide);
tl.set('#crcBlkW,#crcDarkW',{opacity:0},tTurn);tl.set('#crcCrowd',{opacity:1},tTurn);
[[.35,0],[1,.08],[.5,.16],[1,.24]].forEach(([o,d])=>tl.set('#crcSpotW',{opacity:o},tTurn+d));
revealAt(tTurn);tl.to('#boSq',{rotation:0,duration:.12},tTurn);
faces2(tTurn,'wide','O');FB.pm(tTurn,'Oh');FB.eyes(tTurn,true);[WDN,PDN,PMN,PKN].forEach(P=>{P.pm(tTurn,'Gr');P.eyes(tTurn,true);});MN.eyes(tTurn,'happy');MN.m(tTurn,'mBg');lookAll2(tTurn,0,0);
SQ_ALL.forEach((s,i)=>hop(s,tTurn+.05+i*.03,40,.12,.16));
tl.set('#bnrW',{opacity:1,x:1400,y:-760,scale:1.5},tTurn);tl.to('#bnrW',{y:110,duration:.55,ease:'bounce.out'},tTurn);
confetti(tTurn+.05,900,2300,500,1900,40,.9);sparks(tTurn+.1,1400,600,16,520);

/* ================= SCENE 7: everybody: "Surprise! Happy birthday, Bo!" ================= */
faces2(L[7]-.05,'happy','Big');
armsUp(L[7]+.05,.15);['wd','pd','pm','pk','mn','pb'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.15},L[7]+.05);tl.to(`#${p}ArmR`,{rotation:-140,duration:.15},L[7]+.05);});
SQ_ALL.forEach((s,i)=>hop(s,L[7]+.1+i*.03,50,.14,.18));
confetti(L[7]+.1,700,2500,500,1900,36,.8);hearts(L[7]+.3,M61.bo[0],M61.bo[1]-560,7,320,260);sparks(L[7]+.2,1250,1400,14,420);

/* ================= SCENE 8: Bo: "You did not forget me!" — close-up, heart eyes ================= */
tl.to(ARMS,{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.bo,'power2.inOut');
faces2(L[8]-.1,'happy','Sm');
bTalk(L[8]+.12,L[8]+DU[8]-.08,'mBig','mSmile',.14);
hearts(L[8]+.3,M61.bo[0],M61.bo[1]-520,6,200,240);

/* ================= SCENE 9: Mochi: "Hmph. We planned it. Obviously." — deadpan, then her rare little smile ================= */
camTo(L[9]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[9]+.1,'mFr');MC.talk(L[9]+.12,L[9]+DU[9]-.08,'mOp','mFr',.16);mcEyes(L[9]+.15,'lids');MC.brows(L[9]+.1,8,-8,2,.2);
MC.m(L[9]+DU[9]+.02,'mSm');mcEyes(L[9]+DU[9]+.02,'happy');

/* ================= SCENE 10: "Munch carried in a giant cake!" — Munch lifts the cake over his head, then sets it down next to Bo ================= */
camTo(L[10]-.45,.7,...CAM.mn,'power2.inOut');
MN.eyes(L[10],'happy');
tl.to('#mnArmL',{rotation:125,duration:.3,ease:'back.out(1.6)'},W(10,1));tl.to('#mnArmR',{rotation:-125,duration:.3,ease:'back.out(1.6)'},W(10,1));
tl.set('#twrW',{opacity:1},tCake);tl.fromTo('#twr',{scale:.1},{scale:1,duration:.45,ease:'back.out(2)'},tCake);sparks(tCake+.2,M61.mn[0],600,12,300);shake(tCake+.2,12,8);hop('#mnSq',tCake+.2,30,.12,.16);
tl.fromTo('.cdFl',{scaleY:.92,rotation:-4},{scaleY:1.12,rotation:4,duration:.16,yoyo:true,repeat:Math.floor((tBlow-.1-tCake)/.16)-1,ease:'sine.inOut'},tCake);
camTo(tCarry-.2,.8,...CAM.cake,'power2.inOut');
tl.to('#mnArmL,#mnArmR',{rotation:0,duration:.3,ease:'power2.in'},tCarry);
tl.to('#twrW',{x:CKX,y:CKY,scale:CKS,duration:.85,ease:'power2.inOut'},tCarry);
{const tL=tCarry+.85;dust(tL,CKX,CKY,2.4);shake(tL,10,6);tl.fromTo('#twr',{scaleY:1},{scaleY:.94,duration:.1,yoyo:true,repeat:1},tL);sparks(tL,CKX,CKY-300,10,200);}
hearts(tCarry+.5,CKX,CKY-420,5,200,200);

/* ================= SCENE 11: "Bo blew, and the party began!" — a breath, a puff, the candles go out, then everything explodes ================= */
tl.to('#boSq',{rotation:6,duration:.3,ease:'sine.inOut'},tBlow-.45);bm(tBlow-.3,'mO');
tl.to('.cdFl',{rotation:38,scaleY:.45,duration:.2,ease:'power1.in'},tBlow);tl.set('.cdFl',{opacity:0},tBlow+.22);
CND.forEach(([x,y],i)=>dust(tBlow+.22+i*.04,x,y-30,1.0));
tl.to('#boSq',{rotation:0,duration:.25},tBlow+.3);bm(tBlow+.35,'mBig');
camTo(tP-.3,.8,...CAM.wide,'power2.inOut');
faces2(tP,'happy','Big');armsUp(tP+.05,.15);['wd','pd','pm','pk','mn','pb'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.15},tP+.05);tl.to(`#${p}ArmR`,{rotation:-140,duration:.15},tP+.05);});
SQ_ALL.forEach((s,i)=>hop(s,tP+.1+i*.03,50,.14,.18));
[[1400,300,2.0],[800,520,1.6],[2050,540,1.6],[1100,260,1.5],[1750,400,1.6],[1400,650,1.5]].forEach(([x,y,s],i)=>burst(tP+.1+i*.38,x,y,s));
confetti(tP+.1,900,2300,500,2000,40,1.0);hearts(tP+.3,1500,ROWD-330,8,400,280);
for(let k=0;k<12;k++){const t0=tP+.5+k*.09,x=500+((k*397)%1800),yl=1750+((k*131)%330),dur=.75+(k%3)*.1;
 tl.set('#jpcW'+k,{opacity:1,x,y:-300,scale:1.25},t0);tl.fromTo('#jpcW'+k,{y:-300},{y:yl,duration:dur,ease:'power1.in'},t0);tl.fromTo('#jpc'+k,{rotation:0},{rotation:(k%2?-1:1)*540,duration:dur,ease:'none'},t0);
 sparks(t0+dur,x,yl-30,4,70);tl.to('#jpcW'+k,{opacity:0,duration:.3},t0+dur+.5);}
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

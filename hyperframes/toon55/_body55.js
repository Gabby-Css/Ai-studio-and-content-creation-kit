/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the iceberg (with Mom, Dad and little sister on it) slides up to the shore; the family slides down on their bellies, Waddles hugs them, Dad says thanks, Bo welcomes everybody, Waddles introduces his friends,
// Mochi admits penguins are cool, everybody climbs the dune and slides down on their bellies, "Happy beach day!", sunset (the sun sinks into the sea), fireworks and the Season-12 end card
const CAM={wide:[380,-220,.53], wd:ECAM('wd',WD55,1.2), pm:ECAM('pm',FAM55.pm,1.3), pd:ECAM('pd',FAM55.pd,1.25), bo:ECAM('bo',M55.bo), mc:ECAM('mc',M55.mc), dune:camE(1800,1800,.56,540,830)};
const tStk=L[11]+DU[11]+.45;
const FAMP=['pd','pm','pk'], GO=[1370,1500,1640];
beachLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}
// belly slide of a penguin from its current spot to (x,y,s): tilt onto the belly, glide, snap upright (the dust trail follows)
function bellySlide(p,x0,y0,x,y,s,t0,dur){tl.set(`#${p}Shake`,{rotation:-24},t0-.02);tl.to('#'+p,{x,duration:dur,ease:'power2.out'},t0);tl.to('#'+p,{y,scale:s,duration:dur,ease:'power1.in'},t0);
 for(let k=0;k<5;k++){const f=Math.pow((k+1)/6,.7);dust(t0+.1+k*dur/6,x0+(x-x0)*f,y0+(y-y0)*Math.pow((k+1)/6,1.6)+30,1.1);}tl.to(`#${p}Shake`,{rotation:0,duration:.3,ease:'back.out(2)'},t0+dur-.05);sparks(t0+dur,x,y-40,5,90);}

/* ================= SCENE 1: "The iceberg slid up to shore!" — it grows as it comes closer, the penguins wave ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,0,-18);
tl.to('#icbW',{y:1580,scale:.95,duration:1.3,ease:'power2.out'},L[1]+.05);
[['pd',1380,1513,1.05],['pm',1500,1519,.95],['pk',1620,1537,.62]].forEach(([p,x,y,s])=>{tl.to('#'+p,{x,duration:1.3,ease:'power2.out'},L[1]+.05);tl.to('#'+p,{y,scale:s,duration:1.3,ease:'power2.out'},L[1]+.05);waveArm(`#${p}ArmL`,L[1]+.3,L[2]-.3,60,130,.3);});
spray(L[1]+1.2,1500,1590,1.6);sparks(L[1]+1.25,1500,1500,10,260);faces2(L[1]+.8,'happy','Big');

/* ================= SCENE 2: Waddles: "Mom and Dad, you came!" — the family slides down the beach on their bellies ================= */
camTo(L[2]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[2]-.1,'Gr');WDN.eyes(L[2],true);WDN.talk(L[2]+.02,L[2]+DU[2]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[2]+.2);tl.to('#wdArmR',{rotation:-140,duration:.2},L[2]+.2);hop('#wdSq',L[2]+.3,60,.14,.18);
[['pd',0,1380,1513],['pm',.18,1500,1519],['pk',.34,1620,1537]].forEach(([p,d,x0,y0])=>bellySlide(p,x0,y0,FAM55[p][0],FAM55[p][1],FAM55[p][2],L[2]-.15+d,1.15));
hearts(W(2,3),WD55[0],WD55[1]-300,5,90,240);

/* ================= SCENE 3: Mom: "We missed you, little one!" — a big family hug ================= */
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[3]-.35);
camTo(L[3]-.45,.7,...CAM.pm,'power2.inOut');
PMN.pm(L[3]-.1,'Gr');PMN.eyes(L[3],true);PMN.talk(L[3]+.02,L[3]+DU[3]-.05,'Gr','Sm',.14);
tl.to('#pmArmL',{rotation:140,duration:.2},L[3]+.15);tl.to('#pmArmR',{rotation:-140,duration:.2},L[3]+.15);
tl.to('#wd',{x:1670,y:ROWD-50,duration:.6,ease:'sine.inOut'},L[3]+.35);cycle(['#wdLegL','#wdLegR'],['#wdArmL','#wdArmR'],L[3]+.35,L[3]+.95,.22,14,8,'#wdSq',6);
hearts(W(3,3),1700,ROWD-330,7,150,260);hop('#wdSq',L[3]+1.0,40,.12,.16);

/* ================= SCENE 4: Dad: "Thank you for being his friends!" ================= */
tl.to('#pmArmL,#pmArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.pd,'power2.inOut');
PDN.pm(L[4]-.1,'Sm');PDN.eyes(L[4],true);PDN.talk(L[4]+.02,L[4]+DU[4]-.05,'Sm','Gr',.2);
tl.fromTo('#pdSq',{rotation:-4},{rotation:4,duration:.3,yoyo:true,repeat:Math.max(1,Math.floor(DU[4]/.3)-1),ease:'sine.inOut'},L[4]+.1);tl.to('#pdSq',{rotation:0,duration:.2},L[4]+.1+.3*Math.max(2,Math.floor(DU[4]/.3)));
tl.to('#pdArmR',{rotation:-100,duration:.25},L[4]+.4);hearts(W(4,5),FAM55.pd[0],FAM55.pd[1]-300,4,80,200);

/* ================= SCENE 5: Bo: "Welcome to Pancake Beach!" ================= */
tl.to('#pdArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[5]+.02,L[5]+DU[5]-.06);eyesMode(L[5]+.02,'hearts');brows(L[5]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[5]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[5]+.2);hop('#boSq',W(5,3),60,.14,.18);
sparks(W(5,3),SGN55[0],SGN55[1]-420,12,260);confetti(W(5,3),900,2300,1000,2100,24,.7);

/* ================= SCENE 6: "Waddles introduced all his best friends!" — handshakes and waves all round ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[6]+.1,'happy','Big');lookAll2(L[6]+.1,10,6);
hop('#wdSq',W(6,0),55,.14,.18);tl.to('#wdArmR',{rotation:-120,duration:.2},W(6,0));
[['pd',2],['pm',3],['pk',4]].forEach(([p,k])=>{hop(`#${p}Sq`,W(6,k)+.05,50,.14,.18);tl.to(`#${p}ArmL`,{rotation:120,duration:.2},W(6,k)+.05);hearts(W(6,k)+.15,FAM55[p][0],FAM55[p][1]-300,3,70,200);});
SQC.forEach((s,i)=>hop(s,W(6,5)+i*.05,38,.12,.16));

/* ================= SCENE 7: Mochi: "Hmph. Penguins are cool. Obviously." — meanwhile everybody runs to the dune top ================= */
tl.to('#wdArmL,#wdArmR,#pdArmL,#pmArmL,#pkArmL',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
tl.to('#mcArmL',{rotation:50,duration:.2},L[7]+.3);sparks(W(7,3),M55.mc[0],M55.mc[1]-300,6,90);
tl.set('#duneW',{opacity:1},L[7]-.1);tl.fromTo('#dune',{scaleY:.05},{scaleY:1,duration:.8,ease:'back.out(1.4)'},L[7]-.1);
[['wd',TOP55.wd],['pd',TOP55.pd],['pm',TOP55.pm],['pk',TOP55.pk]].forEach(([p,[x,y,s]],i)=>{const t=L[7]+.5+i*.12;tl.to('#'+p,{x,y,scale:s,duration:1.3,ease:'sine.inOut'},t);cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t,t+1.3,.22,14,8,`#${p}Sq`,6);});

/* ================= SCENE 8: "The penguins slid down the sandy dunes!" — whee, four belly slides ================= */
tl.to('#mcArmL',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.dune,'power2.inOut');
[['wd',WD55,0],['pk',FAM55.pk,.28],['pm',FAM55.pm,.56],['pd',FAM55.pd,.84]].forEach(([p,f,d])=>bellySlide(p,TOP55[p][0],TOP55[p][1],f[0],f[1],f[2],L[8]+.35+d,1.0));
faces2(L[8]+.3,'happy','Big');lookAll2(L[8]+.3,-20,10);

/* ================= SCENE 9: everybody: "Happy beach day, everybody!" ================= */
camTo(L[9]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[9]-.1,'happy','Big');armsUp(L[9]+.05,.15);['wd','pan','pd','pm','pk'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.15},L[9]+.05);tl.to(`#${p}ArmR`,{rotation:-140,duration:.15},L[9]+.05);});
SQC.concat(['#panSq','#wdSq','#pdSq','#pmSq','#pkSq','#pbSq']).forEach((s,i)=>hop(s,L[9]+.1+i*.03,45,.14,.18));
tl.set('#ballW',{opacity:1,x:1150,y:ROWD-120,scale:.9},L[9]);tl.fromTo('#ball',{scale:.1},{scale:1,duration:.3,ease:'back.out(2)'},L[9]);[0,1,2].forEach(k=>arc('#ballW',L[9]+.2+k*.45,.5,ROWD-120,300,ROWD-120));
confetti(L[9]+.1,900,2300,1000,2200,34,.9);hearts(L[9]+.3,1500,ROWD-330,7,320,260);

/* ================= SCENE 10: "And the golden sun set on the sea!" — the sun sinks, the sky glows ================= */
tl.to('#duskR',{opacity:.3,duration:DU[10]+1.2,ease:'sine.inOut'},L[10]);tl.to('#bcSunM',{y:900,duration:DU[10]+2.4,ease:'sine.in'},L[10]);
faces2(L[10]+.2,'happy','Sm');lookAll2(L[10]+.2,26,-14);

/* ================= SCENE 11: "And that was the end of Season eleven!" — fireworks over the dusk beach ================= */
camTo(L[11]-.4,.8,...CAM.wide,'power2.inOut');
[[1400,200,2.0],[800,380,1.6],[2050,420,1.6],[1100,120,1.5],[1750,260,1.6],[1400,500,1.5]].forEach(([x,y,s],i)=>burst(L[11]+.1+i*.38,x,y,s));
confetti(L[11]+.3,900,2300,900,2200,40,1.0);hearts(L[11]+.4,1500,ROWD-330,8,400,280);
SQC.forEach((s,i)=>hop(s,L[11]+.5+i*.05,40,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

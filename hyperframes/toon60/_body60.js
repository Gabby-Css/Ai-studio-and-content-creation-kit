/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: show day: the lights flash, the crowd cheers (bobbing rows), Dad welcomes everybody (close-up), Bo and Zap juggle five pancakes, Coco (a pendulum on the trapeze, one giant turn round the bar) flies above the crowd,
// Mochi taps the hat and Rocky pops out, Munch (behind Dad) lifts a pancake tower, Dad announces the grand finale (drum roll), pancakes rain from the ceiling, everybody bows, the crowd cheers, fireworks + confetti and the Season-13 end card
const CAM={wide:[380,-220,.53], dad:ECAM('pd',M60.pd,1.25), pair:camE(810,1760,.95,540,830), hat:camE(1920,1600,.8,540,830), mn:ECAM('mn',M60.mn,.8), top:camE(1400,700,.55,540,830), crowd:camE(1400,1200,.6,540,830)};
const BHR=M60.bo[0]+100, ZHL=M60.zp[0]-100, HY=1860;
const tC0=L[3]-.2, tC1=L[11]+DU[11]+1.0, TPEN=2.4, tTurn=W(4,3)-.1, tPop=W(5,2)-.05, D5=L[6]-.25-tPop;
const tStk=L[11]+DU[11]+.45;
circusLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#bnr',{rotation:-2},{rotation:2,duration:1.2,yoyo:true,repeat:23,ease:'sine.inOut'},0);
// the crowd bobs, row by row (louder from "cheered")
['crcRow0','crcRow1','crcRow2'].forEach((r,i)=>tl.fromTo('#'+r,{y:0},{y:-12,duration:.34,yoyo:true,repeat:Math.floor((L[10]-.2)/.34)-1,ease:'sine.inOut'},.15+i*.09));
['crcRow0','crcRow1','crcRow2'].forEach((r,i)=>{tl.set('#'+r,{y:0},L[10]-.2);tl.fromTo('#'+r,{y:0},{y:-30,duration:.22,yoyo:true,repeat:Math.floor((29.6-L[10])/.22)-1,ease:'sine.inOut'},L[10]-.1+i*.05);});
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}
const tap=(t)=>{tl.to('#wand',{rotation:55,duration:.1,ease:'power2.in'},t);tl.to('#wand',{rotation:22,duration:.12,ease:'power2.out'},t+.1);tl.fromTo('#mhat',{rotation:-7},{rotation:7,duration:.07,yoyo:true,repeat:3},t+.1);sparks(t+.1,HATT[0],HATT[1]-40,6,100);};

/* ================= Coco's pendulum: parked on the platform side, it swings wider, one giant turn round the bar at "above the crowd" ================= */
proxyTween(tC0,tC1-tC0,u=>{const t=u*(tC1-tC0),t5=L[5]-tC0,A=t<t5?26+12*(t/t5):Math.max(8,38-30*Math.min(1,(t-t5)/(L[7]-L[5]))),a=-A*Math.cos(2*Math.PI*t/TPEN);
 let phi=0;const tt=t-(tTurn-tC0);if(tt>0&&tt<1.1){const s=tt/1.1;phi=360*(s*s*(3-2*s));}
 const ar=a*Math.PI/180,b=(a+phi)*Math.PI/180,bx=TRP.P[0]+TRP.LR*Math.sin(ar),by=TRP.P[1]+TRP.LR*Math.cos(ar);
 setCm(bx+TRP.HS*Math.sin(b),by+TRP.HS*Math.cos(b),-(a+phi));trpR(-a);});

/* ================= SCENE 1: "It was finally show time!" — lights flash, confetti, the crowd cheers ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Big');lookAll2(0,0,-8);
tl.set('#crcSpotW',{opacity:.35},.1);tl.set('#crcSpotW',{opacity:1},.2);tl.set('#crcSpotW',{opacity:.5},.3);tl.set('#crcSpotW',{opacity:1},.4);
confetti(L[1]+.2,900,2300,500,1900,28,.8);sparks(W(1,4),1400,500,16,520);
SQC.forEach((s,i)=>hop(s,W(1,4)+i*.04,36,.12,.16));

/* ================= SCENE 2: Dad: "Ladies and gentlemen, welcome!" — he opens his arms ================= */
camTo(L[2]-.45,.7,...CAM.dad,'power2.inOut');
PDN.pm(L[2]-.1,'Gr');PDN.eyes(L[2],true);PDN.talk(L[2]+.02,L[2]+DU[2]-.05,'Gr','Sm',.14);
tl.to('#pdArmL',{rotation:125,duration:.25,ease:'back.out(2)'},L[2]+.2);tl.to('#pdArmR',{rotation:-125,duration:.25,ease:'back.out(2)'},L[2]+.2);
tl.fromTo('#pdSq',{rotation:0},{rotation:-6,duration:.3,yoyo:true,repeat:1},W(2,3));sparks(W(2,3),M60.pd[0],M60.pd[1]-520,10,220);hop('#pdSq',W(2,3),36,.12,.16);

/* ================= SCENE 3: "Bo and Zap juggled pancakes!" — five pancakes fly between them ================= */
tl.to('#pdArmL,#pdArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.pair,'power2.inOut');
waveArm('#boArmL',L[3]+.2,L[4]-.05,-40,-90,.22);waveArm('#boArmR',L[3]+.3,L[4]-.05,40,90,.22);waveArm('#zpArmL',L[3]+.2,L[4]-.05,30,100,.22);waveArm('#zpArmR',L[3]+.3,L[4]-.05,-30,-100,.22);
juggle(L[3]+.15,L[4]-.1,BHR,ZHL,HY,[0,1,2,3,4],400,.44,1.25);
hop('#boSq',W(3,0),40,.12,.16);hop('#zpSq',W(3,2),40,.12,.16);sparks(W(3,4),(BHR+ZHL)/2,HY-420,12,240);

/* ================= SCENE 4: "Coco flew above the crowd!" — the trapeze swings wide, one giant turn ================= */
camTo(L[4]-.45,.7,...CAM.wide,'power2.inOut');
tl.set('#cmArmL',{rotation:150},L[4]);tl.set('#cmArmR',{rotation:-150},L[4]);cmEyes(L[4],'happy');
sparks(tTurn+.5,1500,900,8,260);sparks(tTurn+.9,1300,1000,8,260);faces2(L[4]+.2,'wide','Big');lookAll2(L[4]+.2,10,-30);

/* ================= SCENE 5: "Mochi pulled out Rocky!" — tap, tap, poof: Rocky flies out of the hat ================= */
camTo(L[5]-.45,.7,...CAM.hat,'power2.inOut');
tl.to('#mcArmR',{rotation:-60,duration:.2},L[5]-.2);
tap(L[5]+.1);tap(L[5]+.4);
dust(tPop,HATT[0],HATT[1],2.6);sparks(tPop,HATT[0],HATT[1]-60,14,260);pingAt(tPop,HATT[0],HATT[1]-40);shake(tPop,12,8);
tl.set('#rk',{opacity:1,x:HATT[0],y:HATT[1],scale:.25},tPop);
tl.fromTo('#rk',{x:HATT[0],scale:.25},{x:RK60[0],scale:.7,duration:D5,ease:'none'},tPop);arc('#rk',tPop,D5,HATT[1],700,RK60[1]);
tl.fromTo('#rkSq',{rotation:0},{rotation:360,duration:D5*.8,ease:'power1.inOut'},tPop+.1);
RK.eyes(tPop,'wide');RK.talk(tPop+.05,tPop+D5,'mBg','mSm',.12);tl.to('#rkArmL',{rotation:150,duration:.15},tPop+.2);tl.to('#rkArmR',{rotation:-150,duration:.15},tPop+.2);
dust(tPop+D5,RK60[0],RK60[1]+10,2.4);hop('#rkSq',tPop+D5,40,.12,.16);

/* ================= SCENE 6: "Munch lifted a pancake tower!" — Munch (behind Dad) raises the tower over his head ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[6]-.3);tl.to('#rkArmL,#rkArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.mn,'power2.inOut');
MN.eyes(L[6],'happy');
tl.to('#mnArmL',{rotation:125,duration:.3,ease:'back.out(1.6)'},W(6,1));tl.to('#mnArmR',{rotation:-125,duration:.3,ease:'back.out(1.6)'},W(6,1));
tl.set('#twrW',{opacity:1},W(6,3));tl.fromTo('#twr',{scale:.1},{scale:1,duration:.45,ease:'back.out(2)'},W(6,3));sparks(W(6,4),M60.mn[0],600,12,300);shake(W(6,4),12,8);hop('#mnSq',W(6,4),30,.12,.16);
tl.fromTo('#twrW',{x:M60.mn[0]-10},{x:M60.mn[0]+10,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},W(6,4)+.2);

/* ================= SCENE 7: Dad: "Now, the grand finale!" — he points up, drum roll, the spotlights pulse ================= */
tl.to('#mnArmL,#mnArmR',{rotation:0,duration:.25},L[7]-.35);tl.set('#twrW',{opacity:0},L[7]-.1);
camTo(L[7]-.45,.7,...CAM.dad,'power2.inOut');
PDN.pm(L[7]-.1,'Gr');PDN.eyes(L[7],true);PDN.talk(L[7]+.02,L[7]+DU[7]-.05,'Gr','Sm',.14);
tl.to('#pdArmR',{rotation:-160,duration:.25,ease:'back.out(2)'},L[7]+.2);hop('#pdSq',W(7,3),50,.12,.16);
for(let k=0;k<4;k++){tl.to('#crcSpotW',{opacity:.55,duration:.1},L[7]+.3+k*.3);tl.to('#crcSpotW',{opacity:1,duration:.1},L[7]+.4+k*.3);}
sparks(W(7,3),M60.pd[0],M60.pd[1]-540,14,260);

/* ================= SCENE 8: "Pancakes rained down on everybody!" — twelve pancakes fall from the ceiling ================= */
tl.to('#pdArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.top,'power2.inOut');
for(let k=0;k<12;k++){const t0=L[8]+.35+k*.09,x=500+((k*397)%1800),yl=1750+((k*131)%330),dur=.75+(k%3)*.1;
 tl.set('#jpcW'+k,{opacity:1,x,y:-300,scale:1.25},t0);tl.fromTo('#jpcW'+k,{y:-300},{y:yl,duration:dur,ease:'power1.in'},t0);tl.fromTo('#jpc'+k,{rotation:0},{rotation:(k%2?-1:1)*540,duration:dur,ease:'none'},t0);
 sparks(t0+dur,x,yl-30,4,70);tl.to('#jpcW'+k,{opacity:0,duration:.3},t0+dur+.5);}
faces2(L[8]+.2,'wide','Big');lookAll2(L[8]+.2,0,-34);confetti(L[8]+.3,900,2300,500,1900,30,.9);armsUp(L[8]+.7,.15);

/* ================= SCENE 9: everybody: "Thank you for coming, everybody!" — a big bow ================= */
camTo(L[9]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[9]-.05,'happy','Big');
['wd','pd','pm','pk','mn','pb'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.15},L[9]+.05);tl.to(`#${p}ArmR`,{rotation:-140,duration:.15},L[9]+.05);});
SQC.concat(['#wdSq','#pdSq','#pmSq','#pkSq','#pbSq','#mnSq']).forEach((s,i)=>{tl.to(s,{rotation:16,duration:.25,ease:'sine.inOut'},W(9,4)+i*.02);tl.to(s,{rotation:0,duration:.3,ease:'back.out(2)'},W(9,4)+.4+i*.02);});
hearts(L[9]+.3,1500,ROWD-330,8,340,260);

/* ================= SCENE 10: "The crowd cheered and cheered!" — the crowd goes wild ================= */
camTo(L[10]-.45,.7,...CAM.crowd,'power2.inOut');
confetti(L[10]+.1,700,2500,500,1700,36,.8);hearts(L[10]+.2,1400,1100,8,360,260);sparks(L[10]+.3,1400,900,16,600);
armsUp(L[10]+.1,.15);

/* ================= SCENE 11: "And that was the end of Season twelve!" — fireworks over the ring ================= */
camTo(L[11]-.4,.8,...CAM.wide,'power2.inOut');
[[1400,300,2.0],[800,520,1.6],[2050,540,1.6],[1100,260,1.5],[1750,400,1.6],[1400,650,1.5]].forEach(([x,y,s],i)=>burst(L[11]+.1+i*.38,x,y,s));
confetti(L[11]+.3,900,2300,500,2000,40,1.0);hearts(L[11]+.4,1500,ROWD-330,8,400,280);
SQC.forEach((s,i)=>hop(s,L[11]+.5+i*.05,40,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

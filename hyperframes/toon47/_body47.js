/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: snowy lawn, a frozen syrup bottle on a stump; Truffle is sad, Zap zaps it and the bottle bursts (syrup everywhere), Gumdrop sits on the geyser, Waddles blows cold air and the syrup drips
// freeze into amber icicles on the waffle stand; Bo breaks one off, icicle waffles pop up, Rocky licks an icicle (nobody saw)
const CAM={wide:[380,-220,.53], tf:ECAM('tf',M47.tf), zp:ECAM('zp',M47.zp), btl:camE(1480,1750,.7,540,800), gm:ECAM('gm',M47.gm), gmf:camE(1300,1800,.65,540,800),
 wd:ECAM('wd',[1760,ROWD-50,.9],1.2), pt:ECAM('pt',M47.pt), bo:ECAM('bo',M47.bo), stand:camE(2150,1750,.62,540,800), rk:ECAM('rk',[2050,ROWB,.8])};
const tBurst=W(4,5), tZap=W(3,3), tIce=L[6]+.5, tBreak=W(8,3);
const tStk=L[11]+DU[11]+.45;
snowfall();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
gsap.set('#sys',{svgOrigin:'0 0'});

/* ================= SCENE 1: "But the syrup bottle froze solid!" ================= */
camSet(0,...CAM.wide);camTo(.3,1.5,...CAM.btl,'sine.inOut');
faces2(0,'normal','Sm');lookAll2(0,10,6);
tl.set('#btlW',{opacity:1},W(1,3)-.2);tl.fromTo('#btl',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.2)'},W(1,3)-.2);
tl.fromTo('#btlIce',{opacity:.75},{opacity:1,duration:.25,yoyo:true,repeat:5},W(1,4));sparks(W(1,4),BTL47[0],BTL47[1]-200,8,120);
shiver('#mcSq',W(1,4),L[2]-.3,3);

/* ================= SCENE 2: Truffle: "Oh no! No syrup for pancakes!" ================= */
camTo(L[2]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[2]+.02,L[2]+DU[2]-.05,'mO','mFr',.14);TF.eyes(L[2],'wide');
tl.to('#tfArmL',{rotation:140,duration:.2},L[2]+.2);tl.to('#tfArmR',{rotation:-140,duration:.2},L[2]+.2);shiver('#tfSq',L[2]+.3,L[2]+1.2,3);
tl.fromTo('#btl',{rotation:-5},{rotation:5,duration:.1,yoyo:true,repeat:7},L[2]+.5);

/* ================= SCENE 3: Zap: "Beep boop! I'll warm it up!" — a lightning beam hits the bottle ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[3]-.3);tl.set('#btl',{rotation:0},L[3]);
camTo(L[3]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);ZP.eyes(L[3],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:13},L[3]);tl.set('#zpAnt',{rotation:0},L[3]+DU[3]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[3]+.25);
tl.set('#zbW',{opacity:1,x:M47.zp[0]+70,y:M47.zp[1]-280,scale:.62,rotation:24},tZap);tl.fromTo('#zb',{opacity:.2},{opacity:1,duration:.05,yoyo:true,repeat:13},tZap);tl.set('#zbW',{opacity:0},tZap+.75);
tl.to('#btlIce',{opacity:.35,duration:.7},tZap);for(let k=0;k<3;k++) pingAt(tZap+.1+k*.2,BTL47[0],BTL47[1]-200);

/* ================= SCENE 4: "He zapped it, and syrup splashed everywhere!" — the bottle bursts ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.btl,'power2.inOut');
tl.fromTo('#btl',{scale:1},{scale:1.12,duration:.12,yoyo:true,repeat:5},W(4,1));
tl.to('#btlCap',{y:-1200,rotation:900,duration:.9,ease:'power2.out'},tBurst);tl.set('#btlIce',{opacity:0},tBurst);
tl.set('#shdW',{opacity:1,x:BTL47[0],y:BTL47[1]-200},tBurst);for(let i=0;i<7;i++){const a=i/7*Math.PI*2;tl.fromTo('#shd'+i,{x:0,y:0,opacity:1,scale:.8},{x:Math.cos(a)*300,y:Math.sin(a)*260-60,opacity:0,rotation:300,duration:.8,ease:'power2.out'},tBurst);}
tl.set('#sysW',{opacity:1,x:BTL47[0],y:BTL47[1]+30},tBurst);tl.fromTo('#sys',{scale:.2},{scale:1,duration:.4,ease:'back.out(2)'},tBurst);
[[-380,-120,1.5],[330,-200,1.4],[0,-420,1.7],[-160,-60,1.2],[210,-40,1.2]].forEach(([dx,dy,s],i)=>spray(tBurst+i*.08,BTL47[0]+dx,BTL47[1]+dy,s));
shake(tBurst,14,8);faces2(tBurst,'wide','O');lookAll2(tBurst,0,-24);sparks(tBurst,BTL47[0],BTL47[1]-260,12,300);

/* ================= SCENE 5: Gumdrop: "Roar! I'll sit on it!" — he plugs the geyser ================= */
camTo(L[5]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);GM.eyes(L[5],'wide');
runTo('gm',BTL47[0],BTL47[1]+60,L[5]+.35,.9,1.05,20);camTo(L[5]+.4,.9,...CAM.gmf,'sine.inOut');
tl.set('#btlW',{opacity:0},L[5]+1.2);tl.fromTo('#gmSq',{scaleY:1},{scaleY:.78,duration:.3,ease:'power2.in'},L[5]+1.2);dust(L[5]+1.25,BTL47[0],BTL47[1]+80,2.4);shake(L[5]+1.25,9,5);
spray(L[5]+1.35,BTL47[0]+120,BTL47[1],.8);spray(L[5]+1.45,BTL47[0]-140,BTL47[1],.8);

/* ================= SCENE 6: Waddles: "Penguins know cold. Let me help!" — cold breath freezes the drips into amber icicles ================= */
tl.to('#sys',{opacity:.7,duration:.3},L[6]-.2);
camTo(L[6]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[6]-.1,'Gr');WDN.eyes(L[6],true);WDN.talk(L[6]+.02,L[6]+DU[6]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[6]+.2);tl.to('#wdArmR',{rotation:-140,duration:.2},L[6]+.2);tl.fromTo('#wdArmL',{rotation:140},{rotation:100,duration:.15,yoyo:true,repeat:7},L[6]+.45);
for(let k=0;k<5;k++) dust(L[6]+.45+k*.25,1700-k*60,ROWD-120,1.3);
for(let i=0;i<9;i++){tl.to('#ic'+i+' path:first-child',{fill:'#E39A3A',duration:.3},tIce+i*.08);}
tl.to('#gmSq',{scaleY:1,duration:.3},L[6]+.2);

/* ================= SCENE 7: Peanut: "Look! The icicles look like candy!" ================= */
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.pt,'power2.inOut');
PT.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);PT.eyes(L[7],'happy');
tl.to('#ptArmR',{rotation:-110,duration:.2},L[7]+.25);hop('#ptSq',L[7]+.3,40,.12,.16);
for(let k=0;k<4;k++) sparks(W(7,3)+k*.2,2060+k*120,1560,4,60);

tl.to('#sys',{opacity:0,duration:.5},L[8]-.5);   // the syrup puddle has frozen/been used up: fade it
/* ================= SCENE 8: Bo: "Icicle waffles! Let's make some!" — he runs to the stand and snaps off an icicle ================= */
tl.to('#ptArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[8]+.02,L[8]+DU[8]-.06);eyesMode(L[8]+.02,'hearts');brows(L[8]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[8]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[8]+.2);hop('#boSq',L[8]+.25,60,.14,.18);
runTo('bo',2020,ROWD+BOY,L[8]+.55,.9,.88,24);camTo(L[8]+.55,.9,...CAM.stand,'sine.inOut');
tl.to('#ic3',{y:160,opacity:0,duration:.4,ease:'power2.in'},tBreak);sparks(tBreak,2260-240+3*80,1480,6,70);
tl.set('#wf0W',{opacity:1,x:2060,y:1640},tBreak+.4);tl.fromTo('#wf0',{scale:.1},{scale:1,duration:.3,ease:'back.out(2.4)'},tBreak+.4);

/* ================= SCENE 9: "They baked crunchy icicle waffles!" — four icicle waffles pop up on the counter ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.stand,'power2.inOut');
[1,2,3].forEach(i=>{const t=L[9]+.15+i*.28;tl.set('#wf'+i+'W',{opacity:1,x:2060+i*150,y:1640},t);tl.fromTo('#wf'+i,{scale:.1},{scale:1,duration:.3,ease:'back.out(2.4)'},t);sparks(t+.15,2060+i*150,1560,5,70);});
faces2(L[9]+.3,'happy','Big');lookAll2(L[9]+.3,30,6);hearts(L[9]+.8,2250,1500,5,100,220);
runTo('rk',2050,ROWB,L[9]+.1,1.4,.8,16);

/* ================= SCENE 10: Rocky: "Nobody saw me lick the icicles." ================= */
camTo(L[10]-.45,.7,...CAM.rk,'power2.inOut');
RK.eyes(L[10],'normal');RK.m(L[10],'mSm');RK.talk(L[10]+.1,L[10]+DU[10]-.06,'mOp','mSm',.14);RK.brows(L[10]+.1,-10,10,0,.15);RK.look(L[10]+.3,-24,2,.14);RK.look(L[10]+.9,24,2,.14);
tl.set('#rkicW',{opacity:1,x:2050+60,y:ROWB-330,rotation:-20},L[10]+.05);tl.fromTo('#rkic',{scale:.2},{scale:.9,duration:.25,ease:'back.out(2)'},L[10]+.05);
for(let k=0;k<4;k++){hop('#rkSq',L[10]+.5+k*.28,12,.07,.09);sparks(L[10]+.55+k*.28,2110,ROWB-300,3,40);}
tl.to('#rkicW',{opacity:0,duration:.2},L[11]-.3);

/* ================= SCENE 11: "And the snow day got even better!" ================= */
camTo(L[11]-.4,.9,...CAM.stand,'power2.inOut');
faces2(L[11]+.1,'happy','Big');armsUp(L[11]+.3,.15);SQC.forEach((s,i)=>hop(s,L[11]+.35+i*.05,40,.12,.16));confetti(L[11]+.3,1500,2800,1200,2200,34,.9);hearts(L[11]+.5,2250,1500,6,110,240);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

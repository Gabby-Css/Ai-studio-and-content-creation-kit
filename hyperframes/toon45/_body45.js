/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the picnic lawn, the camera on its tripod at the front-left; the King says "say pancakes", everybody squeezes into a tight group, Gumdrop is too tall for the viewfinder, Zap sets a 10 s timer,
// Mochi moves left, Boo floats away and gets pulled back, Rocky sneaks in at the last second, three beeps, FLASH - and the family photo pops out of the camera
const CAM={wide:[480,-220,.53], kg:ECAM('kg',M45.kg), bo:ECAM('bo',M45.bo), gm:ECAM('gm',F45.gm), zp:camE(800,2150,.75,540,820), mc:ECAM('mc',F45.mc), gh:ECAM('gh',[1400,1000,.7],.95,540,800),
 rk:ECAM('rk',F45.rk), grp:[480,-220,.53], end:camE(1560,1700,.55,540,860)};
const TF_X=1560, TF_Y=1560;                                  // the middle of the photo
const tMove=L[3]+.15, tBeep=[L[9]+.15,L[9]+.65,L[9]+1.15], tFlash=L[10]+.9, tPol=tFlash+.4;
const tStk=L[11]+DU[11]+.45;
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "Time for the big family photo!" — the camera pops in ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,-24,4);
tl.set('#cmrW',{opacity:1},.4);tl.fromTo('#cmrW',{y:2000},{y:2400,duration:.6,ease:'bounce.out'},.4);sparks(W(1,5),600,2150,8,150);dust(1.0,600,2430,2);
tl.fromTo('#cmrLed',{fill:'#5a2a2a'},{fill:'#FF3B3B',duration:.25,yoyo:true,repeat:5},1.2);

/* ================= SCENE 2: the King: "Say pancakes, everybody!" ================= */
camTo(L[2]-.45,.7,...CAM.kg,'power2.inOut');
KG.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);KG.eyes(L[2],'happy');
tl.to('#kgArmL',{rotation:140,duration:.2},L[2]+.2);tl.to('#kgArmR',{rotation:-140,duration:.2},L[2]+.2);hop('#kgSq',L[2]+.3,40,.14,.18);
hearts(W(2,1),M45.kg[0],M45.kg[1]-520,4,90,220);

/* ================= SCENE 3: Bo: "Everybody squeeze in tight!" — they all run into the tight group ================= */
tl.to('#kgArmL,#kgArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.08);eyesMode(L[3]+.05,'wide');brows(L[3]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[3]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[3]+.2);hop('#boSq',L[3]+.25,60,.14,.18);
const MOVERS=['kg','gm','pt','cm','nm','tf','mc','bp','bo','pan','nb','cz1','cz2','cz3'];   // Zap stays by the camera until his line is over
MOVERS.forEach((p,i)=>{const [x,y]=F45[p];if(p==='bo'){tl.to('#bo',{x,y,duration:1.0,ease:'sine.inOut'},tMove+.8+i*.03);return;}tl.to('#'+p,{x,y,duration:1.1,ease:'sine.inOut'},tMove+.5+i*.04);
 if(p!=='kg')cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],tMove+.5+i*.04,tMove+1.5+i*.04,.24,14,8,`#${p}Sq`,6);});
tl.to('#pb',{x:1430,y:ROWD+14,duration:1.0,ease:'sine.inOut'},tMove+.6);tl.to('#gma',{x:GF45[0],y:GF45[1],duration:1.0,ease:'sine.inOut'},tMove+.6);
tl.set('#vfW',{opacity:1},L[3]+.9);tl.fromTo('#vf',{scale:1.6},{scale:1,duration:.5,ease:'power2.out'},L[3]+.9);

/* ================= SCENE 4: Gumdrop: "Roar! I'm too big for it!" — his head sticks out of the viewfinder, he crouches ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);GM.eyes(L[4],'wide');
tl.fromTo('#gmSq',{scaleY:1},{scaleY:.8,duration:.4,ease:'power2.inOut'},W(4,4));
tl.to('#gmArmL',{rotation:60,duration:.2},L[4]+.2);tl.to('#gmArmR',{rotation:-60,duration:.2},L[4]+.2);

/* ================= SCENE 5: Zap: "Beep boop! Camera timer: ten seconds!" ================= */
camTo(L[5]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);ZP.eyes(L[5],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[5]);tl.set('#zpAnt',{rotation:0},L[5]+DU[5]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[5]+.2);
tl.set('#cntW',{opacity:1},W(5,4));tl.set('#cnt10',{opacity:1},W(5,4));tl.fromTo('#cnt10',{scale:.2},{scale:1,duration:.4,ease:'back.out(2.4)'},W(5,4));tl.to('#cnt10',{opacity:0,duration:.25},L[6]-.2);
tl.fromTo('#cmrLed',{fill:'#5a2a2a'},{fill:'#FF3B3B',duration:.2,yoyo:true,repeat:9},L[5]+.4);
tl.to('#zp',{x:F45.zp[0],y:F45.zp[1],duration:.9,ease:'sine.inOut'},L[5]+DU[5]+.2);
cycle(['#zpLegL','#zpLegR'],['#zpArmL','#zpArmR'],L[5]+DU[5]+.2,L[5]+DU[5]+1.1,.24,14,8,'#zpSq',6);

/* ================= SCENE 6: Mochi: "Hmph. I look better from the left." — she steps to the left end ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[6]+.1,'mFr');MC.talk(L[6]+.12,L[6]+DU[6]-.08,'mOp','mFr',.16);mcEyes(L[6]+.15,'lids');MC.brows(L[6]+.1,8,-8,2,.2);
tl.to('#mc',{x:960,duration:.6,ease:'sine.inOut'},W(6,5)-.1);cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],W(6,5)-.1,W(6,5)+.5,.24,14,8,'#mcSq',6);
tl.to('#mcArmR',{rotation:-60,duration:.25},W(6,5)+.5);

/* ================= SCENE 7: Boo: "I keep floating away. Boo." — he drifts off and comes back ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.gh,'power2.inOut');
GH.talk(L[7]+.02,L[7]+DU[7]-.05,'mBg','mSm',.13);GH.eyes(L[7],'normal');
tl.to('#gh',{x:1700,y:560,duration:.9,ease:'sine.inOut'},L[7]+.3);tl.to('#gh',{x:1400,y:1000,duration:.7,ease:'sine.inOut'},W(7,3));
tl.to('#ghArmL',{rotation:60,duration:.2},L[7]+.3);tl.to('#ghArmR',{rotation:-60,duration:.2},L[7]+.3);

/* ================= SCENE 8: Rocky: "Nobody saw me sneak in!" — he tiptoes into the back of the photo ================= */
tl.to('#ghArmL,#ghArmR',{rotation:0,duration:.2},L[8]-.3);
tl.to('#rk',{x:F45.rk[0],duration:1.1,ease:'sine.inOut'},L[8]-1.5);cycle(['#rkLegL','#rkLegR'],['#rkArmL','#rkArmR'],L[8]-1.5,L[8]-.4,.3,14,8,'#rkSq',6);
camTo(L[8]-.45,.7,...CAM.rk,'power2.inOut');
RK.eyes(L[8],'normal');RK.m(L[8],'mSm');RK.talk(L[8]+.1,L[8]+DU[8]-.05,'mOp','mSm',.14);RK.brows(L[8]+.1,-10,10,0,.15);RK.look(L[8]+.3,-24,2,.14);RK.look(L[8]+.9,24,2,.14);

/* ================= SCENE 9: "Then the timer went beep, beep, beep!" — countdown 3-2-1, the LED blinks ================= */
camTo(L[9]-.45,.8,...CAM.grp,'power2.inOut');
['cnt3','cnt2','cnt1'].forEach((id,i)=>{const t=tBeep[i];tl.set('#cntW',{opacity:1},t);tl.set('#'+id,{opacity:1},t);tl.fromTo('#'+id,{scale:.3},{scale:1,duration:.3,ease:'back.out(2.4)'},t);tl.to('#'+id,{opacity:0,duration:.15},t+.4);
 tl.set('#cmrLed',{fill:'#FF3B3B'},t);tl.set('#cmrLed',{fill:'#5a2a2a'},t+.25);});
faces2(L[9]+.1,'wide','Sm');lookAll2(L[9]+.1,0,26);

/* ================= SCENE 10: everybody: "Say pancakes, everybody!" — big smiles, FLASH, the photo pops out ================= */
faces2(L[10]-.1,'happy','Big');armsUp(L[10]+.1,.15);SQC.forEach((s,i)=>hop(s,L[10]+.15+i*.03,36,.12,.16));tl.to('#kgArmL',{rotation:140,duration:.15},L[10]+.1);tl.to('#kgArmR',{rotation:-140,duration:.15},L[10]+.1);
tl.fromTo('#gmaSq',{y:0},{y:-30,duration:.14,yoyo:true,repeat:1},L[10]+.2);
tl.fromTo('#flash',{opacity:0},{opacity:1,duration:.07},tFlash);tl.to('#flash',{opacity:0,duration:.45},tFlash+.07);tl.set('#vfW',{opacity:0},tFlash+.05);
tl.set('#polW',{opacity:1,x:600,y:2250,scale:.2},tFlash+.1);tl.to('#polW',{x:1560,y:1500,scale:.78,duration:.7,ease:'back.out(1.4)'},tPol);tl.fromTo('#pol',{rotation:-12},{rotation:3,duration:.7,ease:'back.out(1.4)'},tPol);

/* ================= SCENE 11: "And that was the end of Season nine!" — the photo floats, everybody cheers ================= */
camTo(L[11]-.4,1.0,...CAM.end,'power2.inOut');
tl.to('#polW',{y:1470,duration:.6,yoyo:true,repeat:5,ease:'sine.inOut'},L[11]+.4);
confetti(L[11],900,2300,1100,2300,40,1.0);hearts(L[11]+.2,TF_X,1300,6,170,280);sparks(L[11]+.3,TF_X,1480,12,330);
SQC.forEach((s,i)=>hop(s,L[11]+.5+i*.05,40,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

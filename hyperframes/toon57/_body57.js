/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: day one of rehearsals: Bo and Zap toss two pancakes, Zap juggles three, Bo takes them over and flings them up to the ceiling, they float down and land in a stack on Gumdrop's head, Gumdrop roars and flicks them back,
// Zap and Bo pass them to each other, then five pancakes fly at once and the whole cast claps
const CAM={wide:[380,-220,.53], zp:ECAM('zp',M57.zp), bo:ECAM('bo',M57.bo), mid:camE(700,1000,.62,540,830), gm:ECAM('gm',M57.gm,.8), pair:camE(840,1760,.95,540,830)};
const bhx=M57.bo[0]-20, bhy=M57.bo[1]-340, zhx=M57.zp[0], zhy=M57.zp[1]-260;       // hand centres of Bo / Zap
const BHR=M57.bo[0]+100, ZHL=M57.zp[0]-100, HY=1860;                              // Bo's right hand / Zap's left hand while they pass pancakes
const tThrow=W(3,4)-.05, tLand=W(6,1)+.05, tToss=L[8]-.1, tJug=W(8,3)+.05, GHD=[M57.gm[0],960];  // GHD = the top of Gumdrop's head
const tStk=L[11]+DU[11]+.45;
circusLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "Bo and Zap practiced juggling!" — two pancakes fly between them ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,10,-4);
juggle(W(1,3),L[2]-.1,BHR,ZHL,HY,[3,4],300,.6,1.25);
hop('#boSq',W(1,3),30,.12,.16);hop('#zpSq',W(1,3)+.3,30,.12,.16);

/* ================= SCENE 2: Zap: "Beep boop! Three pancakes. Easy!" — he juggles three ================= */
camTo(L[2]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);ZP.eyes(L[2],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[2]/.14)-1},L[2]);tl.set('#zpAnt',{rotation:0},L[2]+DU[2]);
waveArm('#zpArmL',W(2,2)-.1,L[3]+.1,40,100,.26);waveArm('#zpArmR',W(2,2)+.03,L[3]+.1,-40,-100,.26);
juggle(W(2,2)-.1,L[3]+.1,zhx-110,zhx+110,zhy,[0,1,2],360,.5,1.25);
hop('#zpSq',W(2,4),40,.12,.16);

/* ================= SCENE 3: Bo: "Watch me juggle them all!" — he takes the three pancakes over ================= */
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.06);eyesMode(L[3]+.02,'wide');brows(L[3]+.05,14,-14,-4,.15);
waveArm('#boArmL',L[3]+.2,tThrow-.05,-60,-110,.26);waveArm('#boArmR',L[3]+.33,tThrow-.05,60,110,.26);
juggle(L[3]+.3,tThrow-.08,bhx-90,bhx+90,bhy,[0,1,2],360,.5,1.25);

/* ================= SCENE 4: "Up, up, up they flew!" — all three fly up to the ceiling and float down toward Gumdrop ================= */
tl.to('#boArmL',{rotation:-160,duration:.15},tThrow);tl.to('#boArmR',{rotation:160,duration:.15},tThrow);hop('#boSq',tThrow,40,.12,.16);
camTo(L[4]-.45,.7,...CAM.mid,'power2.inOut');
[0,1,2].forEach(k=>{const t0=tThrow+k*.05,dur=tLand-t0+k*.1,y1=GHD[1]-k*32;
 tl.set(`#jpcW${k}`,{opacity:1,x:bhx+(k-1)*70,y:bhy,scale:1.25},t0);
 tl.fromTo(`#jpcW${k}`,{x:bhx+(k-1)*70},{x:GHD[0]+(k-1)*34,duration:dur,ease:'sine.inOut'},t0);
 arc(`#jpcW${k}`,t0,dur,bhy,y1-150,y1);
 tl.fromTo(`#jpc${k}`,{rotation:0},{rotation:(k%2?-1:1)*720,duration:dur,ease:'none'},t0);});
sparks(tThrow+.05,bhx,bhy-80,8,120);

/* ================= SCENE 5: Bo: "Oh no! They are falling!" ================= */
bTalk(L[5]+.02,L[5]+DU[5]-.06);eyesMode(L[5]+.02,'wide');brows(L[5]+.05,14,-14,-4,.15);
faces2(L[5],'wide','O');lookAll2(L[5],0,-36);
tl.to('#boArmL',{rotation:-120,duration:.12},L[5]+.1);tl.to('#boArmR',{rotation:120,duration:.12},L[5]+.1);shiver('#boSq',L[5]+.2,L[5]+DU[5]+.4,4);

/* ================= SCENE 6: "They landed on Gumdrop's head!" — plop, plop, plop: a stack on his head ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.gm,'power2.inOut');
[0,1,2].forEach(k=>{const t=tLand+k*.1;tl.fromTo(`#jpc${k}`,{scaleY:1},{scaleY:.55,duration:.06,yoyo:true,repeat:1},t);tl.to('#gmSq',{y:14,duration:.06,yoyo:true,repeat:1},t);sparks(t,GHD[0],GHD[1]-k*32-20,4,70);});
GM.eyes(tLand,'wide');GM.m(tLand,'mO');faces2(tLand+.2,'happy','Big');lookAll2(tLand+.2,-20,-20);hearts(tLand+.5,GHD[0],GHD[1]-160,4,70,180);

/* ================= SCENE 7: Gumdrop: "Roar! I like this game!" — the stack wobbles on his head ================= */
GM.eyes(L[7],'happy');GM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);
shake(L[7]+.05,10,6);
[0,1,2].forEach(k=>tl.fromTo(`#jpcW${k}`,{x:GHD[0]+(k-1)*34},{x:GHD[0]+(k-1)*34+(k%2?14:-14),duration:.16,yoyo:true,repeat:Math.floor((tToss-.1-L[7]-.1)/.16)-1,ease:'sine.inOut'},L[7]+.1));
tl.to('#gmArmL',{rotation:140,duration:.15},L[7]+.3);tl.to('#gmArmR',{rotation:-140,duration:.15},L[7]+.3);

/* ================= SCENE 8: Zap: "Beep boop! Let's juggle together!" — Gumdrop flicks the pancakes over and they start passing ================= */
camTo(L[8]-.45,.7,...CAM.zp,'power2.inOut');
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},tToss);
ZP.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);ZP.eyes(L[8],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[8]/.14)-1},L[8]);tl.set('#zpAnt',{rotation:0},L[8]+DU[8]);
[0,1,2].forEach(k=>{const t0=tToss+k*.06,dur=tJug-t0,xe=k%2?ZHL:BHR;
 tl.set(`#jpcW${k}`,{y:GHD[1]-k*32},t0-.01);
 tl.fromTo(`#jpcW${k}`,{x:GHD[0]+(k-1)*34},{x:xe,duration:dur,ease:'none'},t0);arc(`#jpcW${k}`,t0,dur,GHD[1]-k*32,420,HY);
 tl.fromTo(`#jpc${k}`,{rotation:0},{rotation:360,duration:dur,ease:'none'},t0);});
waveArm('#boArmL',tJug,L[10]-.05,-40,-80,.3);waveArm('#boArmR',tJug+.15,L[10]-.05,40,80,.3);waveArm('#zpArmL',tJug,L[10]-.05,40,90,.3);waveArm('#zpArmR',tJug+.15,L[10]-.05,-40,-90,.3);
juggle(tJug,L[10]-.09,BHR,ZHL,HY,[0,1,2],330,.5,1.25);

/* ================= SCENE 9: "Bo tossed, then Zap caught!" — a pass across, a catch ================= */
camTo(L[9]-.45,.7,...CAM.pair,'power2.inOut');
hop('#boSq',W(9,1),40,.12,.16);sparks(W(9,1),BHR,HY-60,6,90);
hop('#zpSq',W(9,4),44,.12,.16);pingAt(W(9,4),ZHL,HY);sparks(W(9,4),ZHL,HY-60,8,110);hearts(W(9,4),zhx,zhy-220,3,70,200);

/* ================= SCENE 10: "Soon they juggled five at once!" — five pancakes fly ================= */
juggle(L[10],L[11]+DU[11]-.1,BHR,ZHL,HY,[0,1,2,3,4],400,.44,1.25);
waveArm('#boArmL',L[10],L[11]-.05,-30,-90,.22);waveArm('#boArmR',L[10]+.1,L[11]-.05,30,90,.22);waveArm('#zpArmL',L[10],L[11]-.05,30,100,.22);waveArm('#zpArmR',L[10]+.1,L[11]-.05,-30,-100,.22);
sparks(W(10,3),(BHR+ZHL)/2,HY-420,14,260);pingAt(W(10,3),(BHR+ZHL)/2,HY-300);faces2(L[10]+.1,'wide','Big');lookAll2(L[10]+.1,-14,-14);
[0,1,2].forEach(i=>hop(SQC[(i*3)%9],W(10,5)+i*.05,40,.12,.16));

/* ================= SCENE 11: "And the whole tent clapped loudly!" ================= */
camTo(L[11]-.4,.8,...CAM.wide,'power2.inOut');
faces2(L[11]+.05,'happy','Big');armsUp(L[11]+.25,.15);['wd','pan','pd','pm','pk'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.15},L[11]+.25);tl.to(`#${p}ArmR`,{rotation:-140,duration:.15},L[11]+.25);});
SQC.concat(['#panSq','#wdSq','#pdSq','#pmSq','#pkSq','#pbSq']).forEach((s,i)=>hop(s,L[11]+.3+i*.03,45,.14,.18));
confetti(L[11]+.3,900,2300,900,2200,34,.9);hearts(L[11]+.4,1500,ROWD-330,7,320,260);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

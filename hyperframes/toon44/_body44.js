/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the page glows (its secret ingredient is a big heart = sharing); Truffle: let's cook; Munch walks in carrying the giant bowl and sets it on the blanket; Zap stirs with a giant spoon,
// the three cousins throw in eggs, chocolate chips and strawberries, Pebble wants MORE; smell waves; a tower of golden pancakes for everybody
const BWL=[1480,2230];                                       // where the giant bowl ends up
const CAM={wide:[380,-220,.53], page:camE(1500,1560,.8,540,800), gma:ECAM('gma',GM43,1.35), tf:ECAM('tf',M44.tf), zp:ECAM('zp',M44.zp),
 cz1:ECAM('cz1',CZ44.cz1,1.3), cz2:ECAM('cz2',CZ44.cz2,1.3), cz3:ECAM('cz3',CZ44.cz3,1.3), peb:camE(880,ROWD+14-EH.pb*PBS,1.2,540,700), two:camE(1800,1750,.55,540,820)};
const tMun=L[4]-.2, tSet=L[4]+1.6;
const tEgg=W(6,3), tChip=W(7,4), tStr=W(8,3), tTow=L[11]+.4;
const tStk=L[11]+DU[11]+.45;
gsap.set('#pgHeart',{svgOrigin:'0 72'});
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "The page had one secret ingredient!" — it floats up, glowing ================= */
camSet(0,...CAM.wide);camTo(.3,1.2,...CAM.page,'sine.inOut');
faces2(0,'normal','Sm');lookAll2(0,0,-14);
tl.fromTo('#pgW',{y:1700},{y:1480,duration:.6,ease:'back.out(1.8)'},.2);tl.fromTo('#pg',{scale:.6},{scale:1.7,duration:.6,ease:'back.out(1.8)'},.2);
tl.fromTo('#pgHeart',{scale:1},{scale:1.3,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},W(1,5)-.3);sparks(W(1,5),GM43[0],1560,10,200);hearts(W(1,5)+.1,GM43[0],1500,5,100,260);

/* ================= SCENE 2: Grandma: "The secret is sharing together!" ================= */
camTo(L[2]-.45,.7,...CAM.gma,'power2.inOut');
GMAN.pm(L[2]-.1,'Gr');GMAN.talk(L[2]+.02,L[2]+DU[2]-.05,'Gr','Sm',.14);
tl.to('#gmaArmL',{rotation:140,duration:.2},L[2]+.3);tl.to('#gmaArmR',{rotation:-140,duration:.2},L[2]+.3);hop('#gmaSq',W(2,3),40,.12,.16);hearts(W(2,3),GM43[0],1600,5,90,240);
tl.fromTo('#pgHeart',{scale:1},{scale:1.3,duration:.3,yoyo:true,repeat:3},W(2,3));

/* ================= SCENE 3: Truffle: "Then let's cook it all together!" ================= */
tl.to('#gmaArmL,#gmaArmR',{rotation:0,duration:.2},L[3]-.3);tl.to('#pgW',{opacity:0,duration:.3},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[3]+.02,L[3]+DU[3]-.05,'mBg','mSm',.13);TF.eyes(L[3],'happy');
tl.to('#tfArmL',{rotation:150,duration:.18},L[3]+.2);tl.to('#tfArmR',{rotation:-150,duration:.18},L[3]+.2);hop('#tfSq',W(3,4),50,.14,.18);hearts(W(3,4),M44.tf[0],M44.tf[1]-330,4,70,200);
lookAll2(L[3]+.3,-10,-6);

/* ================= SCENE 4: "Munch carried the biggest bowl ever!" — Munch walks in with the giant bowl and sets it on the blanket ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[4]-.4);
camTo(L[4]-.45,.8,...CAM.wide,'power2.inOut');
MN.eyes(tMun,'happy');MN.m(tMun,'mSm');
runTo('mn',2330,ROWB+20,tMun,1.9,1.4,12);
tl.set('#gbwW',{opacity:1},tMun);tl.to('#gbwW',{x:2090,duration:1.9,ease:'sine.inOut'},tMun);tl.to('#gbwW',{x:BWL[0],y:BWL[1],duration:.75,ease:'power2.inOut'},tSet);tl.fromTo('#gbw',{scaleY:1},{scaleY:.9,duration:.12,yoyo:true,repeat:1},tSet+.7);
[0,1].forEach(i=>{shake(tMun+.3+i*.7,9,5);dust(tMun+.4+i*.7,3000-i*500,ROWB+40,3);});
dust(tSet+.75,1300,2250,2.2);dust(tSet+.78,1700,2250,2.2);sparks(tSet+.8,BWL[0],2090,8,200);
faces2(tMun+.5,'wide','Big');lookAll2(tMun+.5,36,-6);

/* ================= SCENE 5: Zap: "Beep boop! Mixing speed: super fast!" — a giant spoon whirls through the batter ================= */
camTo(L[5]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);ZP.eyes(L[5],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.12,yoyo:true,repeat:13},L[5]);tl.set('#zpAnt',{rotation:0},L[5]+DU[5]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[5]+.2);
tl.set('#gspW',{opacity:1,x:1560,y:2160},L[5]+.1);tl.fromTo('#gsp',{rotation:-30},{rotation:30,duration:.12,yoyo:true,repeat:17,ease:'sine.inOut'},L[5]+.3);
tl.fromTo('#gbwSwirl',{rotation:0},{rotation:720,duration:1.8,ease:'none'},L[5]+.3);
for(let k=0;k<4;k++) sparks(L[5]+.5+k*.35,BWL[0]+(k%2?60:-60),2090,4,90);

/* ================= SCENE 6: Blueberry: "I'll crack the eggs!" ================= */
tl.to('#gsp',{rotation:0,duration:.2},L[6]-.4);tl.set('#gspW',{opacity:0},L[6]-.2);tl.to('#zpArmL',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.cz1,'power2.inOut');
CZ1.pm(L[6]-.1,'Gr');CZ1.eyes(L[6],true);CZ1.talk(L[6]+.02,L[6]+DU[6]-.05,'Gr','Sm',.13);
hop('#cz1Sq',L[6]+.2,50,.14,.18);
tl.set('#igEgW',{opacity:1,x:CZ44.cz1[0]+60,y:CZ44.cz1[1]-300},tEgg-.2);tl.fromTo('#igEgW',{x:CZ44.cz1[0]+60},{x:BWL[0]-80,duration:.5,ease:'power1.inOut'},tEgg-.2);
tl.fromTo('#igEgW',{y:CZ44.cz1[1]-300},{y:CZ44.cz1[1]-480,duration:.25,ease:'power2.out'},tEgg-.2);tl.to('#igEgW',{y:2080,duration:.3,ease:'power2.in'},tEgg+.05);
tl.set('#igEgW',{opacity:0},tEgg+.36);sparks(tEgg+.38,BWL[0]-80,2080,10,130);tl.fromTo('#gbw',{scaleY:1},{scaleY:.92,duration:.1,yoyo:true,repeat:1},tEgg+.36);

/* ================= SCENE 7: Choco: "I'll sprinkle the chocolate chips!" ================= */
camTo(L[7]-.45,.7,...CAM.cz2,'power2.inOut');
CZ2.pm(L[7]-.1,'Gr');CZ2.eyes(L[7],true);CZ2.talk(L[7]+.02,L[7]+DU[7]-.05,'Gr','Sm',.13);
tl.to('#cz2ArmL',{rotation:140,duration:.2},L[7]+.2);hop('#cz2Sq',L[7]+.25,40,.12,.16);
for(let k=0;k<4;k++){const t=tChip-.1+k*.14;tl.set('#igChW',{opacity:1,x:BWL[0]-120+k*70,y:1760},t);tl.fromTo('#igChW',{y:1760},{y:2090,duration:.3,ease:'power2.in'},t);tl.set('#igChW',{opacity:0},t+.31);sparks(t+.32,BWL[0]-120+k*70,2090,3,60);}
tl.to('#cz2ArmL',{rotation:0,duration:.2},L[8]-.3);

/* ================= SCENE 8: Berry: "I'll add the strawberries!" ================= */
camTo(L[8]-.45,.7,...CAM.cz3,'power2.inOut');
CZ3.pm(L[8]-.1,'Gr');CZ3.eyes(L[8],true);CZ3.talk(L[8]+.02,L[8]+DU[8]-.05,'Gr','Sm',.13);
hop('#cz3Sq',L[8]+.2,60,.14,.18);tl.to('#cz3',{x:CZ44.cz3[0]-90,duration:.2,ease:'power2.out'},tStr-.3);tl.to('#cz3',{x:CZ44.cz3[0],duration:.3},tStr+.3);
tl.set('#igStW',{opacity:1,x:CZ44.cz3[0]-40,y:CZ44.cz3[1]-300},tStr-.1);tl.fromTo('#igStW',{x:CZ44.cz3[0]-40},{x:BWL[0]+70,duration:.5,ease:'power1.inOut'},tStr-.1);
tl.fromTo('#igStW',{y:CZ44.cz3[1]-300},{y:CZ44.cz3[1]-480,duration:.25,ease:'power2.out'},tStr-.1);tl.to('#igStW',{y:2080,duration:.3,ease:'power2.in'},tStr+.15);
tl.set('#igStW',{opacity:0},tStr+.46);sparks(tStr+.48,BWL[0]+70,2080,10,130);

/* ================= SCENE 9: Pebble: "More! More! More!" ================= */
camTo(L[9]-.4,.7,...CAM.peb,'power2.inOut');
PB.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.12);PB.eyes(L[9],'happy');
[0,.4,.8].forEach(d=>{hop('#pbSq',L[9]+.02+d,60,.12,.16);hearts(L[9]+.1+d,880,ROWD-170,2,60,140);});
tl.to('#pbArmL',{rotation:150,duration:.15},L[9]+.1);tl.to('#pbArmR',{rotation:-150,duration:.15},L[9]+.1);

/* ================= SCENE 10: "Soon the whole lawn smelled amazing!" — smell waves rise and everybody sniffs ================= */
tl.to('#pbArmL,#pbArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.8,...CAM.wide,'power2.inOut');
tl.set('#smlW',{opacity:1,x:BWL[0],y:1960},L[10]);
for(let i=0;i<3;i++) for(let r=0;r<2;r++) tl.fromTo('#sml'+i,{y:0,opacity:0},{y:-120,opacity:.9,duration:.7,yoyo:true,repeat:1,ease:'sine.inOut'},L[10]+.1+i*.25+r*.9);
faces2(L[10]+.2,'happy','Sm');lookAll2(L[10]+.2,0,-20);hearts(L[10]+.5,1500,1500,6,160,260);SQC.forEach((s,i)=>hop(s,L[10]+.6+i*.07,26,.14,.18));

/* ================= SCENE 11: Grandma: "Now everyone gets a golden pancake!" — a tower of golden pancakes drops in ================= */
tl.to('#smlW',{opacity:0,duration:.3},L[11]-.2);
camTo(L[11]-.4,.7,...CAM.two,'power2.inOut');
GMAN.pm(L[11]-.1,'Gr');GMAN.talk(L[11]+.02,L[11]+DU[11]-.05,'Gr','Sm',.14);
tl.set('#stkW',{opacity:1},tTow-.02);tl.set('#stk',{opacity:1},tTow-.01);
for(let i=0;i<18;i++){const t=tTow+i*.075;tl.set('#stl'+i,{opacity:1},t);tl.fromTo('#stl'+i,{y:-1100},{y:0,duration:.26,ease:'power2.in'},t);}
tl.set('#stkTop',{opacity:1},tTow+18*.075+.12);sparks(tTow+18*.075+.12,2150,1750,8,170);hearts(tTow+18*.075+.2,2150,1700,5,100,240);
faces2(tTow+1.5,'happy','Big');armsUp(tTow+1.5,.15);confetti(tTow+1.5,700,2400,1300,2300,34,.9);SQC.forEach((s,i)=>hop(s,tTow+1.6+i*.05,40,.12,.16));
tl.to('#gmaArmL',{rotation:140,duration:.2},tTow+1.5);tl.to('#gmaArmR',{rotation:-140,duration:.2},tTow+1.5);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

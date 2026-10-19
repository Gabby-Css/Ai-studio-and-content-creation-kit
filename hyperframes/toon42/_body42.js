/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the picnic is laid out; the three pancake cousins bounce in over the hill and line up in front of the blanket (Blueberry, Choco, Berry); each introduces
// himself in a close-up; Bo gets confused (shell-game shuffle); Flapjack hugs them; name tags prove they are different; a flipping contest; the recipe page blows away
const CAM={wide:[380,-220,.53], cous:camE(1560,1900,.62,540,800),
 cz1:ECAM('cz1',CZM.cz1,1.3), cz2:ECAM('cz2',CZM.cz2,1.3), cz3:ECAM('cz3',CZM.cz3,1.3), shuf:camE(1250,1880,.62,540,800), pan:ECAM('pan',M42.pan,1.2),
 mc:ECAM('mc',M42.mc), three:camE(1560,1850,.7,540,800), tf:ECAM('tf',M42.tf), flip:camE(1560,1720,.55,540,830), gma:ECAM('gma',GM41,1.35)};
const SLOT=[1080,1330,1560,1790];                           // Flapjack + the three cousins stand on these four slots
const tTag=W(8,2), tFlip=L[10]+.5, tPage=L[11]+.55;
const tStk=L[11]+DU[11]+.45;
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "Three pancake cousins bounced in!" ================= */
camSet(0,...CAM.wide);camTo(.5,1.6,...CAM.cous,'sine.inOut');
faces2(0,'normal','Sm');lookAll2(0,34,-4);
['cz1','cz2','cz3'].forEach((p,i)=>{const t=.35+i*.28;hopIn(p,3300+i*120,CZM[p][0],CZM[p][1],t,1.7,5,170);
 PB.eyes(0,'happy');});
faces2(1.9,'wide','Big');lookAll2(1.9,6,-6);confetti(1.9,1100,2000,1300,2300,24,.7);

/* ================= SCENE 2: Blueberry: "I'm Blueberry, the bouncy one!" ================= */
camTo(L[2]-.45,.7,...CAM.cz1,'power2.inOut');
CZ1.pm(L[2]-.1,'Gr');CZ1.eyes(L[2],true);CZ1.talk(L[2]+.02,L[2]+DU[2]-.05,'Gr','Sm',.13);
for(let k=0;k<3;k++) hop('#cz1Sq',L[2]+.15+k*.4,70,.15,.2);
sparks(W(2,1),CZM.cz1[0],CZM.cz1[1]-260,8,120);hearts(W(2,3),CZM.cz1[0],CZM.cz1[1]-300,3,60,160);

/* ================= SCENE 3: Choco: "I'm Choco, the sweet one!" ================= */
camTo(L[3]-.45,.7,...CAM.cz2,'power2.inOut');
CZ2.pm(L[3]-.1,'Gr');CZ2.eyes(L[3],true);CZ2.talk(L[3]+.02,L[3]+DU[3]-.05,'Gr','Sm',.13);
hop('#cz2Sq',L[3]+.2,50,.14,.18);tl.to('#cz2ArmL',{rotation:-70,duration:.2},W(3,3));tl.to('#cz2ArmR',{rotation:70,duration:.2},W(3,3));
hearts(W(3,3),CZM.cz2[0],CZM.cz2[1]-300,5,70,200);

/* ================= SCENE 4: Berry: "I'm Berry, the speedy one!" — she zips to the left and back ================= */
tl.to('#cz2ArmL,#cz2ArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.cz3,'power2.inOut');
CZ3.pm(L[4]-.1,'Gr');CZ3.eyes(L[4],true);CZ3.talk(L[4]+.02,L[4]+DU[4]-.05,'Gr','Sm',.13);
tl.to('#cz3',{x:1180,duration:.22,ease:'power3.in'},W(4,3)-.05);tl.to('#cz3',{x:CZM.cz3[0],duration:.3,ease:'power3.out'},W(4,3)+.35);
for(let k=0;k<5;k++) dust(W(4,3)+k*.07,1790-k*120,ROWD-30,1.0);

/* ================= SCENE 5: Bo: "Wow! Three Flapjacks! Which is which?" — the four pancakes swap places ================= */
camTo(L[5]-.45,.7,...CAM.shuf,'power2.inOut');
bTalk(L[5]+.02,L[5]+DU[5]-.06);eyesMode(L[5]+.02,'wide');brows(L[5]+.05,14,-14,-4,.15);look(L[5]+.1,24,-4,.12);
const ORDS=['pan','cz1','cz2','cz3'];let slot=[0,1,2,3];
[[0,2],[1,3],[0,2],[1,3]].forEach(([a,b],k)=>{const t=L[5]+.35+k*.4;const ia=slot.indexOf(a),ib=slot.indexOf(b);
 // a and b are SLOT numbers: whoever stands on slot a swaps with whoever stands on slot b
 const pa=ORDS[ia],pb2=ORDS[ib];tl.to('#'+pa,{x:SLOT[b],duration:.38,ease:'sine.inOut'},t);tl.to('#'+pb2,{x:SLOT[a],duration:.38,ease:'sine.inOut'},t);
 arc('#'+pa+'Sq',t,.38,0,70,0);arc('#'+pb2+'Sq',t,.38,0,50,0);[slot[ia],slot[ib]]=[slot[ib],slot[ia]];});
tl.to('#boArmR',{rotation:-60,duration:.2},L[5]+.3);

/* ================= SCENE 6: Flapjack: "Cousins! I missed you so much!" ================= */
tl.to('#boArmR',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.pan,'power2.inOut');
FJ.pm(L[6],'Gr');FJ.eyes(L[6],true);FJ.talk(L[6]+.1,L[6]+DU[6]-.05,'Gr','Sm',.13);
tl.to('#panArmL',{rotation:140,duration:.2},L[6]+.2);tl.to('#panArmR',{rotation:-140,duration:.2},L[6]+.2);
hop('#panSq',L[6]+.25,50,.14,.18);hop('#panSq',W(6,3),50,.14,.18);hearts(W(6,3),SLOT[0],ROWD-250,6,100,240);
['cz1','cz2','cz3'].forEach((p,i)=>{hop(`#${p}Sq`,L[6]+.5+i*.12,40,.12,.16);tl.to(`#${p}ArmL`,{rotation:140,duration:.2},L[6]+.5);tl.to(`#${p}ArmR`,{rotation:-140,duration:.2},L[6]+.5);});

/* ================= SCENE 7: Mochi: "Hmph. They all look the same." ================= */
tl.to('#panArmL,#panArmR,#cz1ArmL,#cz1ArmR,#cz2ArmL,#cz2ArmR,#cz3ArmL,#cz3ArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
tl.to('#mcArmR',{rotation:-60,duration:.25},W(7,2));

/* ================= SCENE 8: Blueberry: "We do not look the same!" — name tags pop up ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.three,'power2.inOut');
CZ1.pm(L[8]-.1,'Gr');CZ1.eyes(L[8],true);CZ1.talk(L[8]+.02,L[8]+DU[8]-.05,'Gr','Wo',.13);CZ1.brows(L[8],true,16,-16);
['cz1','cz2','cz3'].forEach((p,i)=>{const t=tTag+i*.3;tl.set('#tg'+i+'W',{opacity:1,x:CZM[p][0],y:ROWD-50-62*.9-260},t);tl.fromTo('#tg'+i,{scale:.1},{scale:1.5,duration:.35,ease:'back.out(2.4)'},t);
 hop(`#${p}Sq`,t,40,.12,.16);sparks(t+.2,CZM[p][0],ROWD-50-62*.9-240,5,60);});
tl.to('#tg0W,#tg1W,#tg2W',{opacity:0,duration:.25},L[9]-.35);

/* ================= SCENE 9: Truffle: "Let's play a pancake flipping game!" ================= */
camTo(L[9]-.45,.7,...CAM.tf,'power2.inOut');
CZ1.brows(L[9],false);
TF.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.13);TF.eyes(L[9],'happy');
tl.set('#gpanW',{opacity:1,x:M42.tf[0]+20,y:M42.tf[1]-470,scaleX:.55,scaleY:.55},L[9]+.2);tl.fromTo('#gpan',{scale:.2},{scale:1,duration:.4,ease:'back.out(2.2)'},L[9]+.2);
tl.to('#tfArmL',{rotation:150,duration:.18},L[9]+.2);tl.to('#tfArmR',{rotation:-150,duration:.18},L[9]+.2);hop('#tfSq',W(9,4),40,.12,.16);sparks(L[9]+.4,M42.tf[0]+20,M42.tf[1]-470,6,100);

/* ================= SCENE 10: "Everybody flipped, and Berry flipped highest!" ================= */
tl.to('#gpanW',{opacity:0,duration:.25},L[10]-.3);tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.flip,'power2.inOut');
[['cz1',300,.0],['cz2',380,.55],['cz3',560,1.1]].forEach(([p,h,d])=>{const t=tFlip+d;
 tl.to(`#${p}`,{y:CZM[p][1]-h,duration:.42,ease:'power2.out'},t);tl.to(`#${p}`,{y:CZM[p][1],duration:.42,ease:'power2.in'},t+.42);   // the jump is on the OUTER group (a y on Sq would be rotated by the flip)
 tl.fromTo(`#${p}Shake`,{rotation:0},{rotation:720,duration:.84,ease:'none'},t);tl.set(`#${p}Shake`,{rotation:0},t+.85);
 sparks(t+.85,CZM[p][0],CZM[p][1]-30,6,100);dust(t+.85,CZM[p][0],CZM[p][1]+30,1.4);});
lookAll2(tFlip,0,-30);faces2(tFlip+.3,'wide','Big');hearts(tFlip+1.9,CZM.cz3[0],CZM.cz3[1]-340,5,90,240);
tl.fromTo('#cz3Sq',{scaleY:1},{scaleY:1.15,duration:.2,yoyo:true,repeat:1},tFlip+1.1+.84);

/* ================= SCENE 11: "Then Grandma's recipe page flew away!" — a gust takes the page out of the book ================= */
camTo(L[11]-.45,.7,...CAM.gma,'power2.inOut');
GMAN.pm(L[11]+.1,'Oh');GMAN.talk(L[11]+.4,L[11]+DU[11]-.05,'Gr','Oh',.15);
tl.set('#wndW',{opacity:1},tPage-.3);tl.fromTo('.gust',{x:0,opacity:.9},{x:3300,opacity:.9,duration:1.1,ease:'none',stagger:.07},tPage-.3);tl.set('#wndW',{opacity:0},tPage+1.6);
tl.set('#pgW',{opacity:1,x:GM41[0]+150,y:1780,scale:.5,rotation:0},tPage-.05);
tl.to('#pgW',{x:3500,duration:1.5,ease:'power1.in'},tPage);tl.to('#pgW',{y:760,duration:1.5,ease:'power2.out'},tPage);tl.to('#pg',{rotation:900,scale:.6,duration:1.5,ease:'none'},tPage);
tl.to('#gmaArmL',{rotation:150,duration:.2},tPage+.2);tl.to('#gmaArmR',{rotation:-150,duration:.2},tPage+.2);
faces2(tPage,'wide','O');lookAll2(tPage+.1,34,-24);shake(tPage+.1,6,4);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

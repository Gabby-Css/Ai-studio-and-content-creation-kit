/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: a bottle bobs in from the sea and lands on the sand; Boo floats over to it, Bo pops the cork (a letter pops out), Zap scans it (rings), the letter is from Waddles' family (the penguin doodles bounce),
// Waddles is overjoyed, Bo plans a party, the welcome sign is built (posts rise, board drops in), Coco makes coconut juice (cups pop up), and a big iceberg floats closer and closer over the sea
const CAM={wide:[380,-220,.53], gh:ECAM('gh',[1400,1450,.75],.95,540,800), bo:ECAM('bo',M54.bo), zp:ECAM('zp',M54.zp), ltr:camE(1560,1560,.85,540,800), wd:ECAM('wd',WD54,1.2), sgn:camE(1500,1750,.65,540,830), cm:ECAM('cm',M54.cm)};
const tLand=W(1,5)+.2, tCork=W(3,4), tSign=W(8,1)-.1;
const tStk=L[11]+DU[11]+.45;
beachLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "A shiny bottle floated up onto the beach!" — it bobs in from the sea ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,0,-10);
tl.set('#bttW',{opacity:1},L[1]+.1);tl.to('#bttW',{x:BTT54[0],duration:tLand-L[1]-.1,ease:'sine.inOut'},L[1]+.1);tl.to('#bttW',{y:BTT54[1],scale:BTT54[2],duration:tLand-L[1]-.1,ease:'power1.in'},L[1]+.1);
tl.fromTo('#btt',{rotation:-14},{rotation:14,duration:.3,yoyo:true,repeat:Math.floor((tLand-L[1]-.1)/.3)-1,ease:'sine.inOut'},L[1]+.1);tl.set('#btt',{rotation:0},tLand);
spray(tLand,BTT54[0]-40,BTT54[1]+10,1.0);sparks(tLand+.05,BTT54[0],BTT54[1]-200,8,110);faces2(tLand,'wide','O');lookAll2(tLand,12,16);

/* ================= SCENE 2: Boo: "I found something strange. Boo." ================= */
camTo(L[2]-.45,.7,...CAM.gh,'power2.inOut');
tl.to('#gh',{x:1400,y:1450,duration:.8,ease:'sine.inOut'},L[2]-.4);
GH.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mSm',.13);GH.eyes(L[2],'wide');
tl.to('#ghArmL',{rotation:60,duration:.2},L[2]+.3);tl.to('#ghArmR',{rotation:-60,duration:.2},L[2]+.3);

/* ================= SCENE 3: Bo: "There is a letter inside the bottle!" — the cork pops, a letter pops out ================= */
tl.to('#ghArmL,#ghArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.06);eyesMode(L[3]+.02,'wide');brows(L[3]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[3]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[3]+.2);
tl.to('#bttCork',{y:-380,rotation:540,duration:.55,ease:'power2.out'},tCork);tl.to('#bttCork',{opacity:0,duration:.2},tCork+.45);
tl.set('#ltrW',{opacity:1},tCork+.15);tl.fromTo('#ltr',{scale:.05,rotation:-30},{scale:.75,rotation:0,duration:.55,ease:'back.out(1.8)'},tCork+.15);sparks(tCork+.2,1560,1560,10,200);

/* ================= SCENE 4: Zap: "Beep boop! Scanning the letter!" — scan rings over the letter ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[4]/.14)-1},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
camTo(L[4]+.55,.7,...CAM.ltr,'power2.inOut');
for(let k=0;k<3;k++) pingAt(W(4,3)+k*.2,1560,1500);

/* ================= SCENE 5: "It came from Waddles' family!" — the little penguins on the letter bounce ================= */
tl.fromTo('#ltr',{rotation:-2},{rotation:2,duration:.22,yoyo:true,repeat:Math.floor((DU[5]+.2)/.22)-1,ease:'sine.inOut'},L[5]);tl.set('#ltr',{rotation:0},L[5]+DU[5]+.25);
hearts(W(5,3),1560,1380,5,120,260);sparks(W(5,3),1560,1500,8,200);

/* ================= SCENE 6: Waddles: "My family is coming to visit!" ================= */
camTo(L[6]-.45,.7,...CAM.wd,'power2.inOut');
tl.to('#ltrW',{opacity:0,duration:.3},L[6]-.2);
WDN.pm(L[6]-.1,'Gr');WDN.eyes(L[6],true);WDN.talk(L[6]+.02,L[6]+DU[6]-.05,'Gr','Sm',.13);
tl.to('#wdArmL',{rotation:140,duration:.2},L[6]+.2);tl.to('#wdArmR',{rotation:-140,duration:.2},L[6]+.2);hop('#wdSq',L[6]+.3,60,.14,.18);hop('#wdSq',W(6,4),60,.14,.18);hearts(W(6,3),WD54[0],WD54[1]-300,6,100,240);

/* ================= SCENE 7: Bo: "Let's get ready for a party!" ================= */
tl.to('#wdArmL,#wdArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[7]+.02,L[7]+DU[7]-.06);eyesMode(L[7]+.02,'hearts');brows(L[7]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[7]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[7]+.2);hop('#boSq',W(7,5),60,.14,.18);
confetti(W(7,5),900,2300,1000,2100,26,.7);SQC.forEach((s,i)=>hop(s,W(7,5)+.1+i*.04,36,.12,.16));

/* ================= SCENE 8: "They built a big welcome sign!" — the posts rise, the board drops in ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[8]-.3);
camTo(L[8]-.45,.7,...CAM.sgn,'power2.inOut');
tl.set('#sgnW',{opacity:1},tSign);tl.fromTo('#sgnPL',{scaleY:.05},{scaleY:1,duration:.45,ease:'back.out(1.6)'},tSign);tl.fromTo('#sgnPR',{scaleY:.05},{scaleY:1,duration:.45,ease:'back.out(1.6)'},tSign+.12);
tl.fromTo('#sgnB',{y:-600,opacity:0},{y:0,opacity:1,duration:.55,ease:'bounce.out'},tSign+.5);dust(tSign+.95,SGN54[0],SGN54[1]+20,2.2);sparks(tSign+1.0,SGN54[0],SGN54[1]-420,12,250);
SQC.forEach((s,i)=>hop(s,tSign+.6+i*.05,30,.1,.14));

/* ================= SCENE 9: Coco: "Ooh-ooh! I'll make coconut juice!" — five cups pop up ================= */
camTo(L[9]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[9]+.02,L[9]+DU[9]-.06,'mBg','mSm',.12);cmEyes(L[9],'happy');
tl.to('#cmArmL',{rotation:150,duration:.14},L[9]+.3);tl.to('#cmArmR',{rotation:-150,duration:.14},L[9]+.3);
[0,1,2,3,4].forEach(i=>{const t=W(9,3)+i*.12,x=M54.cm[0]-250+i*125,y=M54.cm[1]+90;tl.set(`#mgW${i}`,{opacity:1,x,y},t);tl.fromTo(`#mg${i}`,{scale:.1},{scale:.7,duration:.3,ease:'back.out(2.4)'},t);sparks(t+.15,x,y-90,3,50);});

/* ================= SCENE 10: "Then something big floated closer and closer!" — an iceberg grows on the horizon ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.wide,'power2.inOut');
tl.set('#icbW',{opacity:1},L[10]+.05);tl.fromTo('#icbW',{scale:.18,y:1140},{scale:.85,y:1390,duration:DU[10]+DU[11]+.9,ease:'sine.in'},L[10]+.05);
tl.fromTo('#icb',{rotation:-1.5},{rotation:1.5,duration:.8,yoyo:true,repeat:Math.floor((DU[10]+DU[11]+.9)/.8)-1,ease:'sine.inOut'},L[10]+.05);
faces2(L[10]+.3,'wide','O');lookAll2(L[10]+.3,0,-22);

/* ================= SCENE 11: "And it was a giant iceberg!" ================= */
sparks(W(11,4),1500,1250,14,320);pingAt(W(11,4),1500,1250);
hop('#wdSq',W(11,4),70,.14,.18);tl.to('#wdArmL',{rotation:140,duration:.2},W(11,4));tl.to('#wdArmR',{rotation:-140,duration:.2},W(11,4));hearts(W(11,4),WD54[0],WD54[1]-300,6,100,240);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

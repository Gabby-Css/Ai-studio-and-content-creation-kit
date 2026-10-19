/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: five builders (Bo, Munch, Mochi, Zap, Coco) each raise a sand tower behind them (each in their own line); Peanut spots a giant wave (it rises over the sea), the wave crashes down the beach and
// flattens every tower (each collapses when the foam reaches it), Coco is sad, Bo suggests building ONE together, four buckets hop and the big sandcastle (with the pancake tower) rises in four steps
const CAM={wide:[380,-220,.53], bo:ECAM('bo',M53.bo), mn:ECAM('mn',MN53), mc:ECAM('mc',M53.mc), zp:ECAM('zp',M53.zp), pt:ECAM('pt',M53.pt), cm:ECAM('cm',M53.cm), site:camE(1400,1500,.52,540,830), end:camE(1400,1450,.5,540,830)};
const tCrash=W(7,2)-.3, WVU=2300, WVD=1330;
const tStk=L[11]+DU[11]+.45;
beachLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "Then the sandcastle contest began!" — every builder starts a sand tower ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,0,0);
TWP.forEach(([x,y,s],i)=>{const t=L[1]+.45+i*.22;tl.set(`#tw${i}W`,{opacity:1},t);tl.to('#tw'+i,{scaleY:.3,duration:.8,ease:'power2.out'},t);dust(t+.1,x,y-10,1.6);hop('#'+['bo','mn','mc','zp','cm'][i]+'Sq',t,40,.12,.16);});

/* ================= SCENE 2: Bo: "I'll build the tallest tower!" ================= */
camTo(L[2]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);eyesMode(L[2]+.02,'wide');brows(L[2]+.05,14,-14,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[2]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[2]+.2);
tl.to('#tw0',{scaleY:1,duration:1.4,ease:'power1.out'},L[2]+.35);sparks(L[2]+1.6,TWP[0][0],TWP[0][1]-620,8,100);hop('#boSq',W(2,4),60,.14,.18);

/* ================= SCENE 3: Munch: "My castle will be gigantic!" ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.mn,'power2.inOut');
MN.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.2);MN.eyes(L[3],'happy');
tl.to('#mnArmL',{rotation:120,duration:.25},L[3]+.2);tl.to('#mnArmR',{rotation:-120,duration:.25},L[3]+.2);
tl.to('#tw1',{scaleY:1,duration:1.4,ease:'power1.out'},L[3]+.3);dust(L[3]+1.5,TWP[1][0],TWP[1][1]-10,3);shake(L[3]+1.6,10,6);

/* ================= SCENE 4: Mochi: "Hmph. Mine is neat. Obviously." ================= */
tl.to('#mnArmL,#mnArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[4]+.1,'mFr');MC.talk(L[4]+.12,L[4]+DU[4]-.08,'mOp','mFr',.16);mcEyes(L[4]+.15,'lids');MC.brows(L[4]+.1,8,-8,2,.2);
tl.to('#tw2',{scaleY:1,duration:1.4,ease:'power1.out'},L[4]+.4);sparks(L[4]+1.8,TWP[2][0],TWP[2][1]-340,6,70);

/* ================= SCENE 5: Zap: "Beep boop! Perfect square towers!" ================= */
camTo(L[5]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);ZP.eyes(L[5],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[5]/.14)-1},L[5]);tl.set('#zpAnt',{rotation:0},L[5]+DU[5]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[5]+.25);
tl.to('#tw3',{scaleY:1,duration:1.4,ease:'power1.out'},L[5]+.3);tl.to('#tw4',{scaleY:1,duration:1.6,ease:'power1.out'},L[5]+.5);pingAt(L[5]+1.7,TWP[3][0],TWP[3][1]-350);

/* ================= SCENE 6: Peanut: "Look! A giant wave is coming!" — a big wave rises over the sea ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[6]-.3);
camTo(L[6]-.45,.7,...CAM.pt,'power2.inOut');
PT.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mO',.13);PT.eyes(L[6],'wide');
tl.to('#ptArmR',{rotation:-120,duration:.2},L[6]+.2);
tl.set('#wvW',{opacity:1,x:0,y:WVD},W(6,2)-.2);tl.fromTo('#wv',{scaleY:.2},{scaleY:1,duration:1.0,ease:'power2.out'},W(6,2)-.2);
faces2(W(6,3),'wide','O');lookAll2(W(6,3),0,-28);

/* ================= SCENE 7: "The wave crashed over everything!" — it sweeps down the beach, every tower collapses ================= */
tl.to('#ptArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.wide,'power2.inOut');
tl.to('#wvW',{y:WVU,duration:1.2,ease:'power2.in'},tCrash);
TWP.forEach(([x,y,s],i)=>{const t=tCrash+1.2*Math.sqrt((y-WVD)/(WVU-WVD));tl.to('#tw'+i,{scaleY:.12,scaleX:1.25,duration:.3,ease:'power2.in'},t);spray(t,x,y-70,1.5);dust(t+.1,x,y,2.4);});
tl.to('#wvW',{y:WVD,duration:1.4,ease:'sine.inOut'},tCrash+1.45);tl.set('#wvW',{opacity:0},tCrash+2.9);
faces2(tCrash+.4,'wide','O');SQC.forEach((s,i)=>hop(s,tCrash+.6+i*.03,45,.14,.18));shake(tCrash+.9,12,8);

/* ================= SCENE 8: Coco: "Ooh-ooh! My tower is gone!" ================= */
camTo(L[8]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mFr',.12);cmEyes(L[8],'wide');
tl.to('#cmArmL',{rotation:150,duration:.14},L[8]+.3);tl.to('#cmArmR',{rotation:-150,duration:.14},L[8]+.3);shiver('#cmSq',L[8]+.5,L[8]+DU[8],4);

/* ================= SCENE 9: Bo: "Let's build one together!" — the foundation of the big castle appears ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[9]+.02,L[9]+DU[9]-.06);eyesMode(L[9]+.02,'hearts');brows(L[9]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[9]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[9]+.2);hop('#boSq',W(9,3),60,.14,.18);
tl.set('#scW',{opacity:1},W(9,3));tl.fromTo('#sc',{scale:.05},{scale:.34,duration:.5,ease:'back.out(1.8)'},W(9,3));dust(W(9,3)+.2,SC53[0],SC53[1],2);hearts(W(9,3),M53.bo[0],M53.bo[1]-480,5,90,240);

/* ================= SCENE 10: "They stacked sand, bucket by bucket!" — four buckets hop, the castle grows in steps ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.site,'power2.inOut');
[0,1,2,3].forEach(i=>{const t=W(10,1)+i*.38;tl.set(`#bk${i}W`,{opacity:1},t-.1);tl.fromTo('#bk'+i,{scale:.1},{scale:1,duration:.25,ease:'back.out(2.4)'},t-.1);tl.fromTo('#bk'+i,{rotation:0},{rotation:-70,duration:.18,yoyo:true,repeat:1},t+.15);
 tl.to('#sc',{scale:[.5,.68,.84,1.0][i],duration:.35,ease:'back.out(1.6)'},t+.2);dust(t+.25,SC53[0]+(i-1.5)*140,SC53[1],1.6);sparks(t+.3,SC53[0]+(i-1.5)*100,SC53[1]-500-i*100,5,80);hop('#'+['bo','mc','zp','cm'][i]+'Sq',t,36,.12,.16);});
tl.to('#bk0W,#bk1W,#bk2W,#bk3W',{opacity:0,duration:.25},L[11]-.1);

/* ================= SCENE 11: "And one giant castle stood tall!" ================= */
camTo(L[11]-.4,.8,...CAM.end,'power2.inOut');
faces2(L[11]+.05,'happy','Big');armsUp(L[11]+.2,.15);SQC.forEach((s,i)=>hop(s,L[11]+.3+i*.05,40,.14,.18));
tl.fromTo('#scTop',{rotation:-4},{rotation:4,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},L[11]+.3);hearts(L[11]+.3,SC53[0],SC53[1]-700,7,300,260);confetti(L[11]+.3,900,2300,900,2200,34,.9);sparks(L[11]+.2,SC53[0],SC53[1]-1000,14,360);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the group climbs the dark hill (the scenery scrolls, everybody marches, the haunted house grows on the right); Peanut sees the glowing house; the iron gate swings open with a squeak; Zap scans (spooky level high);
// bats burst from the chimney; Coco grabs Bo's hand; the big door opens slowly; cut to black, then the dark hall: Blip is scared, Boo says he will glow (his glow grows), the hall lights up (candles, portraits, moonlit window), and a big shadow moves on the far wall
const H63=Object.assign({},M63,{gh:[1300,1980,.85],cm:CM63});
const CAM={wide:[380,-220,.53], pt:ECAM('pt',M63.pt), zp:ECAM('zp',M63.zp), cm:ECAM('cm',CM63), door:camE(1760,1500,.7,540,830), bp:ECAM('bp',M63.bp), gh:ECAM('gh',H63.gh,.9), hall:camE(1400,1100,.58,540,830)};
const tCut=L[8]-.25, tStk=L[11]+DU[11]+.45;
spkLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
const SP=spkRun([[0,0],[.3,0],[.9,900],[L[2]-.2,900],[L[2]+.5,0],[30,0]],30);

/* ================= SCENE 1: "They climbed the dark hill!" — the scenery scrolls, everybody marches, the house grows ================= */
camSet(0,...CAM.wide);
faces2(0,'normal','Sm');lookAll2(0,24,-10);
marchAll(.3,L[2]+.4);
tl.to('#hseW',{x:HSE63[0],y:HSE63[1],scale:HSE63[2],duration:L[2]-.1,ease:'sine.inOut'},.2);
tl.fromTo('#hseWinL',{opacity:1},{opacity:.4,duration:.2,yoyo:true,repeat:Math.floor(28/.2)-1,ease:'sine.inOut'},.3);tl.fromTo('#hseWinR',{opacity:.5},{opacity:1,duration:.26,yoyo:true,repeat:Math.floor(28/.26)-1,ease:'sine.inOut'},.3);
batFly(0,1.2,3.4,1500,620,300,300,.45);

/* ================= SCENE 2: Peanut: "Look! The house is glowing!" ================= */
camTo(L[2]-.45,.7,...CAM.pt,'power2.inOut');
PT.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.13);PT.eyes(L[2],'wide');
tl.to('#ptArmR',{rotation:-120,duration:.2},L[2]+.2);sparks(W(2,3),HSE63[0],HSE63[1]-700,8,200);

/* ================= SCENE 3: "The gate opened with a squeak!" — the iron gate pops up in front of the house and swings open ================= */
tl.to('#ptArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.door,'power2.inOut');
tl.set('#hgtW',{opacity:1},L[3]-.1);tl.fromTo('#hgt',{scale:.1},{scale:1,duration:.4,ease:'back.out(2)'},L[3]-.1);dust(L[3]+.2,GATE63[0],GATE63[1]+20,2.4);
tl.to('#hgtL',{scaleX:.12,duration:.7,ease:'power2.inOut'},W(3,4));tl.to('#hgtR',{scaleX:.12,duration:.7,ease:'power2.inOut'},W(3,4));
faces2(L[3]+.2,'wide','O');lookAll2(L[3]+.2,24,-10);

/* ================= SCENE 4: Zap: "Beep boop! Spooky level: high!" — scan rings fly toward the house ================= */
camTo(L[4]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);ZP.eyes(L[4],'wide');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[4]/.14)-1},L[4]);tl.set('#zpAnt',{rotation:0},L[4]+DU[4]);
tl.to('#zpArmL',{rotation:110,duration:.2},L[4]+.3);
[0,1,2].forEach(k=>pingAt(W(4,3)+k*.22,M63.zp[0]+240+k*80,M63.zp[1]-330));

/* ================= SCENE 5: "Bats flew from the chimney!" — eight bats burst out and sweep across the sky ================= */
tl.to('#zpArmL',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.wide,'power2.inOut');
const CHM=[HSE63[0]+345*HSE63[2],HSE63[1]-1015*HSE63[2]];
for(let k=0;k<7;k++)batFly(k+1,W(5,3)+k*.15,W(5,3)+2.2+k*.15,CHM[0],CHM[1],700+k*210,260+(k%3)*140,.55);
faces2(W(5,2),'wide','O');lookAll2(W(5,2),10,-34);

/* ================= SCENE 6: Coco: "Ooh-ooh! Hold my hand, please!" — she runs to Bo and clutches his hand, shivering ================= */
runTo('cm',CM63[0],CM63[1],L[6]-1.0,.8,CM63[2]);
CM.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mO',.12);cmEyes(L[6],'wide');
camTo(L[6]-.45,.7,...CAM.cm,'power2.inOut');
shiver('#cmSq',L[6]+.2,L[7]-.2,4);tl.to('#cmArmL',{rotation:60,duration:.2},L[6]+.3);hearts(W(6,4),CM63[0]+200,CM63[1]-300,3,70,200);

/* ================= SCENE 7: "The big door opened slowly." — the door swings open, warm light spills out ================= */
tl.to('#cmArmL',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.door,'power2.inOut');
tl.fromTo('#hseDoor',{scaleX:1},{scaleX:.12,duration:1.0,ease:'power2.in'},W(7,3));tl.fromTo('#hseIn',{opacity:0},{opacity:1,duration:.8},W(7,3));
sparks(W(7,4),HSE63[0],HSE63[1]-200,10,220);faces2(L[7]+.2,'wide','O');lookAll2(L[7]+.2,24,0);

/* ================= SCENE 8: Blip: "It is so dark inside!" — a quick cut to black, then the dark hall ================= */
tl.fromTo('#crcBlkW',{opacity:0},{opacity:1,duration:.22},tCut-.25);
tl.set('#spkSet,#hseW,#hgtW',{opacity:0},tCut);tl.set('#hallSet',{opacity:1},tCut);placeAt(H63,tCut);tl.set('#cmSq',{y:0},tCut);
tl.to('#crcBlkW',{opacity:.55,duration:.35},tCut+.02);
camTo(L[8]-.45,.7,...CAM.bp,'power2.inOut');
BP.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mO',.13);BP.eyes(L[8],'wide');faces2(tCut+.1,'wide','O');lookAll2(tCut+.1,0,-6);
shiver('#bpSq',L[8]+.3,L[9]-.2,3);

/* ================= SCENE 9: Boo: "Do not worry. I will glow!" — his glow swells and lights the dark ================= */
camTo(L[9]-.45,.7,...CAM.gh,'power2.inOut');
GH.eyes(L[9]+.02,'happy');GH.talk(L[9]+.04,L[9]+DU[9]-.08,'mBg','mSm',.13);GH.brows(L[9]+.02,0,0,-4,.15);
tl.to('#ghArmL',{rotation:100,duration:.2},L[9]+.3);tl.to('#ghArmR',{rotation:-100,duration:.2},L[9]+.3);
tl.to('#ghGlow',{opacity:1,scale:3.2,duration:.7,ease:'sine.inOut'},W(9,4));sparks(W(9,5),H63.gh[0],H63.gh[1]-300,12,220);

/* ================= SCENE 10: "Boo lit up the hall!" — the darkness lifts: candles, portraits, the moonlit window ================= */
camTo(L[10]-.45,.7,...CAM.hall,'power2.inOut');
tl.to('#crcBlkW',{opacity:0,duration:.9,ease:'sine.out'},L[10]);
tl.to('.ptP',{x:7,duration:.4,yoyo:true,repeat:5,ease:'sine.inOut'},L[10]+.2);
faces2(L[10]+.1,'happy','Big');lookAll2(L[10]+.1,8,-4);sparks(L[10]+.2,1400,900,16,520);hearts(L[10]+.4,H63.gh[0],H63.gh[1]-400,5,160,260);

/* ================= SCENE 11: "And something big moved ahead!" — a giant shadow slides onto the far wall ================= */
tl.set('#wsdW',{opacity:1},L[11]-.1);tl.fromTo('#wsd',{scale:.5},{scale:1.15,duration:DU[11]+.8,ease:'power1.in'},L[11]-.1);
tl.to('#ghGlow',{opacity:.35,scale:1,duration:.5},L[11]+.2);
faces2(W(11,2),'wide','O');lookAll2(W(11,2),0,-24);shake(W(11,2),12,8);SQC.forEach((s,i)=>hop(s,W(11,3)+i*.03,40,.1,.14));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

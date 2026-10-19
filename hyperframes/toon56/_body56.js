/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the morning after, on the beach: a giant striped tent grows out of the sand, Dad (the ringmaster) welcomes everybody, Bo cheers, Mom says everyone gets an act, everybody hurries in (a quick fade to black = the cut),
// inside the dark circus: Zap juggles three pancakes, Coco looks up at the trapeze, Mochi taps the magic hat, Truffle's popcorn pops, the spotlights switch on, a banner drops: SHOW IN 3 DAYS!
const M56i={gm:[520,ROWB,1.05],pt:[880,ROWB,.7],rk:[1700,ROWB,.8],bp:[2000,ROWB,.66],nm:[2350,ROWB,.54],
            tf:[760,ROWF,.74],zp:[1280,ROWF,.7],mc:[1560,ROWF,.74],cm:[2150,ROWF,.76],
            bo:[600,ROWD+BOY,.88],pan:[900,ROWD-50,.9],wd:[1170,ROWD-50,.9],pd:[1450,ROWD-50,1.05],pm:[1740,ROWD-50,.95],pk:[1980,ROWD-30,.62],nb:[2300,ROWD+10,.8],pb:[820,ROWD+14,PBS]};
const CAM={wide:[380,-220,.53], dad:ECAM('pd',FAM56.pd,1.25), bo:ECAM('bo',M56.bo), pm:ECAM('pm',FAM56.pm,1.3), door:camE(1400,1250,.62,540,830),
           zp:ECAM('zp',M56i.zp), cm:ECAM('cm',M56i.cm), mc:ECAM('mc',M56i.mc), tf:ECAM('tf',M56i.tf), top:camE(1400,700,.55,540,830)};
const tTent=W(1,3)-.25, tCut=L[5]+1.0, tLights=W(10,3)-.1, tBnr=W(11,2)-.25;
const tStk=L[11]+DU[11]+.45;
beachLife();circusLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
const P56={zp:M56i.zp,cm:M56i.cm,mc:M56i.mc,tf:M56i.tf};
// popcorn puffs fly out of the cart and drop around it
function popcornBurst(t,cx,cy){for(let k=0;k<8;k++){const dx=(k-3.5)*85,t0=t+k*.06;
  tl.set('#pckW'+k,{opacity:1,x:cx,y:cy,scale:.9},t0);tl.fromTo('#pckW'+k,{x:cx},{x:cx+dx,duration:.9,ease:'none'},t0);arc('#pckW'+k,t0,.9,cy,380+(k%3)*110,cy+520);tl.fromTo('#pck'+k,{rotation:0},{rotation:(k%2?1:-1)*360,duration:.9,ease:'none'},t0);tl.set('#pckW'+k,{opacity:0},t0+.92);}}

/* ================= SCENE 1: "Next morning, a giant tent appeared!" â€” the big top grows out of the sand ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,0,-10);
tl.set('#tentW',{opacity:1},tTent);tl.fromTo('#tentW',{scale:.05},{scale:TENT56[2],duration:.95,ease:'back.out(1.4)'},tTent);
[-700,-350,0,350,700].forEach((dx,i)=>dust(tTent+.25+i*.1,TENT56[0]+dx,TENT56[1]+30,3));
sparks(tTent+.8,TENT56[0],TENT56[1]-1000,14,380);shake(tTent+.7,14,8);
faces2(tTent+.1,'wide','O');lookAll2(tTent+.1,0,-34);faces2(L[1]+1.7,'happy','Big');

/* ================= SCENE 2: Dad: "Welcome to the Penguin Circus!" â€” he sweeps his arm toward the tent ================= */
camTo(L[2]-.45,.7,...CAM.dad,'power2.inOut');
PDN.pm(L[2]-.1,'Gr');PDN.eyes(L[2],true);PDN.talk(L[2]+.02,L[2]+DU[2]-.05,'Gr','Sm',.14);
tl.to('#pdArmR',{rotation:-130,duration:.25,ease:'back.out(2)'},L[2]+.15);tl.fromTo('#pdSq',{rotation:0},{rotation:-6,duration:.3,yoyo:true,repeat:1},L[2]+.2);
hop('#pdSq',W(2,4),40,.12,.16);sparks(W(2,4),FAM56.pd[0],FAM56.pd[1]-520,10,220);

/* ================= SCENE 3: Bo: "A real circus? That's amazing!" ================= */
tl.to('#pdArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[3]+.02,L[3]+DU[3]-.06);eyesMode(L[3]+.02,'hearts');brows(L[3]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[3]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[3]+.2);hop('#boSq',W(3,4),60,.14,.18);hearts(W(3,4),M56.bo[0],M56.bo[1]-480,5,90,240);

/* ================= SCENE 4: Mom: "Everyone gets a special act!" â€” she opens her arms to all of them ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.pm,'power2.inOut');
PMN.pm(L[4]-.1,'Gr');PMN.eyes(L[4],true);PMN.talk(L[4]+.02,L[4]+DU[4]-.05,'Gr','Sm',.14);
tl.to('#pmArmL',{rotation:120,duration:.2},L[4]+.2);tl.to('#pmArmR',{rotation:-120,duration:.2},L[4]+.2);hop('#pmSq',W(4,4),40,.12,.16);
sparks(W(4,3),FAM56.pm[0],FAM56.pm[1]-520,8,200);hearts(W(4,4),FAM56.pm[0],FAM56.pm[1]-420,4,80,200);

/* ================= SCENE 5: "They hurried into the big tent!" â€” everybody marches to the door, quick fade to black, then the dark circus ================= */
tl.to('#pmArmL,#pmArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.door,'power2.inOut');
faces2(L[5]-.1,'happy','Big');lookAll2(L[5]-.1,10,-6);
marchAll(L[5]+.05,tCut);['pd','pm','pk'].forEach((p,i)=>cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],L[5]+.05+i*.03,tCut,.24,14,8,`#${p}Sq`,6));
tl.fromTo('#crcBlkW',{opacity:0},{opacity:1,duration:.3},tCut-.3);
tl.set('#crcSet',{opacity:1},tCut+.02);tl.set('#beachSet,#tentW',{opacity:0},tCut+.02);tl.set('#crcDarkW',{opacity:1},tCut+.02);placeAt(M56i,tCut+.02);
tl.to('#crcBlkW',{opacity:0,duration:.35},tCut+.1);

/* ================= SCENE 6: Zap: "Beep boop! I will juggle!" â€” three pancakes fly over his head ================= */
camTo(L[6]-.45,.7,...CAM.zp,'power2.inOut');
ZP.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mSm',.13);ZP.eyes(L[6],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:Math.floor(DU[6]/.14)-1},L[6]);tl.set('#zpAnt',{rotation:0},L[6]+DU[6]);
waveArm('#zpArmL',W(6,2)-.1,L[7]+.3,40,100,.26);waveArm('#zpArmR',W(6,2)+.03,L[7]+.3,-40,-100,.26);
juggle(W(6,2)-.1,L[7]+.3,P56.zp[0]-110,P56.zp[0]+110,P56.zp[1]-250,[0,1,2],380,.5);

/* ================= SCENE 7: Coco: "Ooh-ooh! I will fly!" â€” the trapeze is lowered from the ceiling and swings above her ================= */
camTo(L[7]-.45,.7,...CAM.cm,'power2.inOut');
CM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.12);cmEyes(L[7],'wide');CM.look(L[7]+.05,0,-20,.2);
tl.set('#trpW',{opacity:1,x:P56.cm[0]},L[7]-.35);tl.fromTo('#trpW',{y:-1500},{y:-420,duration:.55,ease:'back.out(1.4)'},L[7]-.35);
tl.fromTo('#trp',{rotation:-14},{rotation:14,duration:.9,yoyo:true,repeat:13,ease:'sine.inOut'},L[7]+.2);
tl.to('#cmArmL',{rotation:150,duration:.14},L[7]+.3);tl.to('#cmArmR',{rotation:-150,duration:.14},L[7]+.3);hop('#cmSq',W(7,3),60,.12,.16);sparks(W(7,3),P56.cm[0],P56.cm[1]-480,8,110);

/* ================= SCENE 8: Mochi: "Hmph. I do magic. Obviously." â€” a starry table with a black hat; she taps it with her wand ================= */
tl.to('#cmArmL,#cmArmR',{rotation:0,duration:.2},L[8]-.3);tl.to('#zpArmL,#zpArmR',{rotation:0,duration:.2},L[8]-.3);CM.look(L[8]-.2,0,0,.2);
camTo(L[8]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[8]+.1,'mFr');MC.talk(L[8]+.12,L[8]+DU[8]-.08,'mOp','mFr',.16);mcEyes(L[8]+.15,'lids');MC.brows(L[8]+.1,8,-8,2,.2);
tl.set('#mtbW',{opacity:1},L[8]-.3);tl.fromTo('#mtb',{scale:.1},{scale:1,duration:.4,ease:'back.out(2)'},L[8]-.3);
tl.set('#wandW',{opacity:1,x:P56.mc[0]+150,y:P56.mc[1]-150,scale:.6,rotation:0},L[8]+.3);tl.fromTo('#wand',{rotation:-35},{rotation:30,duration:.5,ease:'sine.inOut'},L[8]+.3);
tl.to('#mcArmR',{rotation:-60,duration:.2},L[8]+.3);
[0,1].forEach(k=>{const t=W(8,4)+k*.28;tl.to('#wand',{rotation:70,duration:.12},t);tl.to('#wand',{rotation:10,duration:.14},t+.12);tl.fromTo('#mhat',{rotation:-7},{rotation:7,duration:.07,yoyo:true,repeat:3},t+.1);sparks(t+.1,1850,1553,6,100);});

/* ================= SCENE 9: Truffle: "And I make the popcorn!" â€” the cart pops up and the popcorn bursts out ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[9]-.3);tl.to('#wandW,#mtbW',{opacity:0,duration:.25},L[9]-.3);
camTo(L[9]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.13);TF.eyes(L[9],'happy');
tl.set('#pcnW',{opacity:1},L[9]-.2);tl.fromTo('#pcn',{scale:.1},{scale:1,duration:.4,ease:'back.out(2.2)'},L[9]-.2);
tl.to('#tfArmL',{rotation:150,duration:.18},L[9]+.2);tl.to('#tfArmR',{rotation:-150,duration:.18},L[9]+.2);hop('#tfSq',W(9,4),50,.14,.18);
popcornBurst(W(9,4),1030,1556);

/* ================= SCENE 10: "The golden spotlights switched on!" â€” the dark tent lights up ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[10]-.3);tl.to('#pcnW',{opacity:0,duration:.3},L[10]-.2);
camTo(L[10]-.45,.7,...CAM.top,'power2.inOut');
tl.set('#crcSpotW',{opacity:.3},tLights);tl.set('#crcSpotW',{opacity:0},tLights+.07);tl.set('#crcSpotW',{opacity:1},tLights+.14);
tl.to('#crcDarkW',{opacity:0,duration:.5},tLights+.12);sparks(tLights+.15,1400,500,16,520);
faces2(tLights,'wide','O');lookAll2(tLights,0,-30);faces2(tLights+.6,'happy','Big');armsUp(tLights+.7,.15);

/* ================= SCENE 11: "The big show was three days away!" â€” a banner drops from the ceiling ================= */
camTo(L[11]-.4,.8,...CAM.top,'power2.inOut');
tl.to('#gh',{x:2150,y:820,duration:.6,ease:'sine.inOut'},tBnr-.6);tl.set('#bnrW',{opacity:1},tBnr);tl.fromTo('#bnrW',{y:-1100},{y:250,duration:.7,ease:'bounce.out'},tBnr);
tl.fromTo('#bnr',{rotation:-3},{rotation:3,duration:.6,yoyo:true,repeat:4,ease:'sine.inOut'},tBnr+.7);
tl.fromTo('#bnr',{scale:1},{scale:1.1,duration:.18,yoyo:true,repeat:1},W(11,5));sparks(W(11,5),1400,520,12,360);confetti(W(11,5),900,2300,300,1600,26,.6);
SQC.forEach((s,i)=>hop(s,W(11,5)+i*.04,40,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

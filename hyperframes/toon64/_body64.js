/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: in the lit hall a huge monster shadow fills the far wall and grows; the friends gasp and huddle, Truffle asks, Gumdrop roars (but his knees shake), Mochi says she is not scared (she shivers), Boo bravely floats toward the shadow;
// "It is only little Pebble!": the monster shadow turns into Pebble's silhouette, Pebble walks in with her tiny candle; the candle makes a giant shadow of her; everybody laughs, Boo smiles
const CAM={wide:[380,-220,.53], tf:ECAM('tf',M64.tf), gm:ECAM('gm',M64.gm,.85), mc:ECAM('mc',M64.mc), gh:ECAM('gh',BOO64,.9), ghB:ECAM('gh',BOO64b,.9), pb:ECAM('pb',PB64,.95), hall:camE(1400,1100,.58,540,830)};
const tStk=L[11]+DU[11]+.45;
spkLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
const FR=['tf','zp','mc','cm','bo','pt','bp','nm','gm'];

/* ================= SCENE 1: "A huge shadow filled the wall!" — it slides onto the far wall and swells; the friends gasp and huddle ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,0,-30);
tl.fromTo('#wsd',{scale:.9},{scale:1.8,duration:DU[1]+.9,ease:'power1.in'},.1);
shiver('#bpSq',.6,L[2]-.2,3);shiver('#ptSq',.7,L[2]-.2,3);shake(W(1,2),10,8);

/* ================= SCENE 2: Truffle: "Is it a giant monster?" ================= */
camTo(L[2]-.45,.7,...CAM.tf,'power2.inOut');
TF.talk(L[2]+.02,L[2]+DU[2]-.05,'mBg','mO',.13);TF.eyes(L[2],'wide');
shiver('#tfSq',L[2]+.1,L[3]-.2,4);tl.to('#tfArmL',{rotation:120,duration:.2},L[2]+.2);tl.to('#tfArmR',{rotation:-120,duration:.2},L[2]+.2);

/* ================= SCENE 3: Gumdrop: "Roar! I am not scared!" — brave words, shaking knees ================= */
tl.to('#tfArmL,#tfArmR',{rotation:0,duration:.2},L[3]-.3);
camTo(L[3]-.45,.7,...CAM.gm,'power2.inOut');
GM.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mO',.13);GM.eyes(L[3],'wide');
shiver('#gmSq',L[3]+.3,L[4]+.4,5);tl.to('#gmArmL',{rotation:140,duration:.15},L[3]+.2);tl.to('#gmArmR',{rotation:-140,duration:.15},L[3]+.2);shake(L[3]+.1,12,8);

/* ================= SCENE 4: "The shadow grew bigger and bigger!" — the monster fills the wall, its arms wave, the lights flicker ================= */
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},L[4]-.3);
camTo(L[4]-.45,.7,...CAM.hall,'power2.inOut');
tl.fromTo('#wsd',{scale:1.8},{scale:2.6,duration:DU[4]+.4,ease:'sine.inOut'},L[4]);tl.fromTo('#wsdM',{rotation:-3},{rotation:3,duration:.25,yoyo:true,repeat:Math.floor((DU[4]+.4)/.25)-1,ease:'sine.inOut'},L[4]);
tl.to('#crcBlkW',{opacity:.35,duration:.1},L[4]+.3);tl.to('#crcBlkW',{opacity:0,duration:.1},L[4]+.45);tl.to('#crcBlkW',{opacity:.4,duration:.1},L[4]+.8);tl.to('#crcBlkW',{opacity:0,duration:.15},L[4]+.95);
faces2(L[4]+.1,'wide','O');lookAll2(L[4]+.1,0,-34);shake(L[4]+.5,14,8);

/* ================= SCENE 5: Mochi: "Hmph. I am not scared. Obviously." — she trembles ================= */
camTo(L[5]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[5]+.1,'mFr');MC.talk(L[5]+.12,L[5]+DU[5]-.08,'mOp','mFr',.16);mcEyes(L[5]+.15,'lids');MC.brows(L[5]+.1,8,-8,2,.2);
shiver('#mcSq',L[5]+.25,L[6]-.2,4);

/* ================= SCENE 6: Boo: "I will go and look!" — his glow swells, he squares up ================= */
camTo(L[6]-.45,.7,...CAM.gh,'power2.inOut');
GH.eyes(L[6]+.02,'normal');GH.brows(L[6]+.02,10,-10,-6,.15);GH.talk(L[6]+.04,L[6]+DU[6]-.08,'mBg','mSm',.13);
tl.to('#ghGlow',{opacity:.9,scale:2.6,duration:.5},L[6]+.2);tl.to('#ghGlow',{opacity:.28,scale:1.2,duration:.3},L[7]+.2);tl.to('#ghArmL',{rotation:100,duration:.2},L[6]+.3);tl.to('#ghArmR',{rotation:-100,duration:.2},L[6]+.3);hop('#ghSq',W(6,3),40,.12,.16);

/* ================= SCENE 7: "Brave Boo floated toward the shadow!" ================= */
camTo(L[7]-.45,.7,...CAM.wide,'power2.inOut');
tl.to('#gh',{x:BOO64b[0],y:BOO64b[1],duration:DU[7]+.6,ease:'sine.inOut'},L[7]+.1);
tl.to('#wsdM',{opacity:.7,duration:.3},L[7]);sparks(L[7]+.6,BOO64b[0],BOO64b[1]-300,8,200);
faces2(L[7]+.2,'wide','Sm');lookAll2(L[7]+.2,22,-10);

/* ================= SCENE 8: Boo: "It is only little Pebble!" — the monster turns into Pebble's silhouette, Pebble walks in with her candle ================= */
camTo(L[8]-.45,.7,...CAM.ghB,'power2.inOut');
GH.eyes(L[8]+.02,'happy');GH.brows(L[8]+.02,0,0,0,.2);GH.talk(L[8]+.04,L[8]+DU[8]-.08,'mBg','mSm',.13);
tl.to('#wsdM',{opacity:0,duration:.25},W(8,3));tl.to('#wsdP',{opacity:.88,duration:.25},W(8,3));
tl.set('#pb',{opacity:1,x:2700,y:PB64[1],scale:PB64[2]},L[8]-.1);tl.set('#cndW',{opacity:1,x:2700,y:PB64[1]-110,scale:.7},L[8]-.1);
tl.to('#pb',{x:PB64[0],duration:1.2,ease:'sine.out'},W(8,3));tl.to('#cndW',{x:PB64[0]+70,duration:1.2,ease:'sine.out'},W(8,3));
cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],W(8,3),W(8,3)+1.2,.24,14,6,'#pbSq',5);PB.eyes(W(8,3),'happy');PB.m(W(8,3),'mSm');
faces2(W(8,3),'normal','Sm');

/* ================= SCENE 9: Pebble: "I have a candle!" ================= */
camTo(L[9]-.45,.7,...CAM.pb,'power2.inOut');
PB.talk(L[9]+.02,L[9]+DU[9]-.05,'mBg','mSm',.12);PB.eyes(L[9],'happy');
tl.to('#pbArmR',{rotation:-110,duration:.2},L[9]+.2);hop('#pbSq',W(9,2),40,.12,.16);hearts(W(9,2),PB64[0],PB64[1]-300,3,70,200);

/* ================= SCENE 10: "Her tiny candle made a giant shadow!" — the shadow copies her ================= */
tl.to('#pbArmR',{rotation:0,duration:.2},L[10]-.3);
camTo(L[10]-.45,.7,...CAM.hall,'power2.inOut');
tl.fromTo('#wsd',{scale:2.6},{scale:2.2,duration:DU[10]+.4,ease:'sine.inOut'},L[10]);
tl.fromTo('#wsdP',{rotation:-4},{rotation:4,duration:.4,yoyo:true,repeat:Math.floor((DU[10]+1.2)/.4)-1,ease:'sine.inOut'},L[10]);
hop('#pbSq',L[10]+.3,40,.12,.16);hop('#pbSq',L[10]+.8,40,.12,.16);tl.to('#cndW',{y:PB64[1]-150,duration:.3},L[10]+.3);
faces2(L[10]+.1,'happy','Sm');lookAll2(L[10]+.1,-14,-24);

/* ================= SCENE 11: "Everybody laughed, and Boo smiled!" ================= */
camTo(L[11]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[11]+.05,'happy','Big');lookAll2(L[11]+.05,10,0);armsUp(L[11]+.2,.15);
FR.concat(['pb']).forEach((p,i)=>hop('#'+p+'Sq',L[11]+.15+i*.05,50,.14,.18));hearts(L[11]+.3,BOO64b[0],BOO64b[1]-380,6,200,260);confetti(L[11]+.3,900,2300,500,1900,30,.9);
tl.to('#ghGlow',{opacity:.7,duration:.4},L[11]+.3);GH.eyes(L[11],'happy');GH.m(L[11],'mBg');
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

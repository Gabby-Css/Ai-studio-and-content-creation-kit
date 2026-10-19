/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the whole crew stands on the deck of the pancake boat (the deck bobs, the sea scrolls behind it); close-ups for Bo / Gumdrop / Blip / Boo / the crate / Rocky,
// a map pinned to the mast blows away over the sea and snags on Blip's antenna, a sneeze in the snack crate, and at the end an island grows on the horizon
const CAM={wide:[380,-120,.53], push:[470,-20,.575],
 bo:camOn(...eyeAt('bo',1130,ROWD+BOY,.88),.95,540,780),
 gm:camOn(...eyeAt('gm',700,ROWB,1.05),.9,540,780),
 mast:camE(1500,1400,.6,540,780),
 bp:camOn(...eyeAt('bp',1880,ROWB,.66),.95,540,780),
 gh:camE(1050+EYE.gh[0]*.8,1250+EYE.gh[1]*.8,1.0,540,780),
 duo:camE(1250,1600,.85,540,780),
 snk:camE(1830,1760,.75,540,800),
 rk:camE(1830,1890-EH.rk*.8,1.0,540,780),
 two:camE(1480,1790,.6,540,800),
 end:[640,-60,.56]};
const tFly=W(4,2)-.2, tG=W(4,1)-.1, tSnag=W(5,1)+.6;
const tSn=W(8,2);
const tStk=L[11]+DU[11]+1.0;
function rowing(t0,t1,per=.6){let k=0;for(let t=t0;t<t1-1e-6;t+=per,k++){const a=k%2?1:-1;
 tl.to('#oarL',{rotation:22*a,duration:per,ease:'sine.inOut'},t);tl.to('#oarR',{rotation:-22*a,duration:per,ease:'sine.inOut'},t);
 tl.to('#gmArmL',{rotation:55*a,duration:per,ease:'sine.inOut'},t);tl.to('#gmArmR',{rotation:-55*a,duration:per,ease:'sine.inOut'},t);}
 tl.to('#oarL,#oarR',{rotation:0,duration:.25},t1);}

/* ---- ambient (all 30 s): the deck and the crew bob, the sea scrolls, clouds drift, the flag and sail flutter, Boo floats ---- */
tl.fromTo('#bg',{y:0},{y:-9,duration:.95,yoyo:true,repeat:30,ease:'sine.inOut'},0);
tl.fromTo('#depthLayer',{y:0},{y:-9,duration:.95,yoyo:true,repeat:30,ease:'sine.inOut'},0);
SEA_ROWS.forEach((r,i)=>tl.to('#swr'+i,{x:-(14+i*6)*30,duration:30,ease:'none',modifiers:{x:wrapPx(400)}},0));
tl.to('#seaClouds',{x:-300,duration:30,ease:'none',modifiers:{x:wrapPx(2400)}},0);
tl.fromTo('#bgFlag',{skewY:-7},{skewY:7,duration:.25,yoyo:true,repeat:117,ease:'sine.inOut'},0);
tl.fromTo('#bgSail',{skewY:0},{skewY:2,duration:.8,yoyo:true,repeat:35,ease:'sine.inOut'},0);
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
tl.fromTo('#foam',{scale:1},{scale:1.03,duration:.9,yoyo:true,repeat:30,ease:'sine.inOut'},0);
gsap.set('#foam',{svgOrigin:'1300 2215'});
tl.fromTo('#map',{rotation:-4},{rotation:4,duration:.45,yoyo:true,repeat:15,ease:'sine.inOut'},0);        // the map flaps on its pin until the wind takes it

/* ================= SCENE 1: "The pancake boat sailed out to sea!" ================= */
camSet(0,...CAM.wide);camTo(.3,2.0,...CAM.push,'sine.inOut');
faces2(0,'happy','Big');lookAll2(0,30,-6);
armsUp(.9,.2);armsDown(L[2]-.3,.25);
spray(1.0,520,2190,1.1);spray(1.6,2090,2190,1.1);

/* ================= SCENE 2: Bo: "Wheee! I love the waves!" ================= */
camTo(L[2]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[2]+.02,L[2]+DU[2]-.06);eyesMode(L[2]+.02,'hearts');brows(L[2]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[2]+.15);tl.to('#boArmR',{rotation:160,duration:.18},L[2]+.15);
hop('#boSq',L[2]+.2,60,.14,.18);hop('#boSq',W(2,4),70,.14,.18);hearts(W(2,4),1130,ROWD+BOY-500,4,90,220);
spray(W(2,4),520,2190,1.3);spray(W(2,4)+.1,2090,2190,1.3);

/* ================= SCENE 3: Gumdrop: "Roar! I'll row the boat!" ================= */
camTo(L[3]-.45,.7,...CAM.gm,'power2.inOut');
tl.to('#boArmL',{rotation:0,duration:.2},L[3]-.2);tl.to('#boArmR',{rotation:0,duration:.2},L[3]-.2);
GM.talk(L[3]+.02,L[3]+DU[3]-.06,'mBg','mSm',.13);GM.eyes(L[3],'wide');brows(L[3],0,0,0,.1);
rowing(L[3]+.35,L[5]+.3,.62);
for(let t=L[3]+.5,k=0;t<L[5];t+=1.2,k++) spray(t,k%2?2040:560,2200,.9);
lookAll2(L[3]+.2,-20,0);

/* ================= SCENE 4: "Then the wind blew the map away!" — gusts, the sail billows, the map tears off its pin and flies out to sea ================= */
camTo(L[4]-.45,.7,...CAM.mast,'power2.inOut');
tl.set('#wndW',{opacity:1},tG);tl.fromTo('.gust',{x:0,opacity:.9},{x:3300,opacity:.9,duration:1.1,ease:'none',stagger:.07},tG);tl.set('#wndW',{opacity:0},tG+1.9);
tl.to('#bgSail',{scaleX:1.14,duration:.3,ease:'power2.out'},tG);tl.to('#bgSail',{scaleX:1,duration:.6},L[5]);
faces2(tG,'wide','O');lookAll2(tFly,36,-24);
tl.to('#mapW',{x:2750,duration:.95,ease:'power1.in'},tFly);tl.to('#map',{rotation:540,scale:.16,duration:.95,ease:'none'},tFly);
tl.to('#map',{y:-480,duration:.45,ease:'power2.out'},tFly);tl.to('#map',{y:-200,duration:.5,ease:'power2.in'},tFly+.45);

/* ================= SCENE 5: Blip: "Look! My antenna caught it!" — the map swoops back in and hangs on his antenna ================= */
camTo(L[5]-.45,.7,...CAM.bp,'power2.inOut');
tl.to('#gmArmL,#gmArmR',{rotation:0,duration:.2},L[5]+.4);
BP.talk(L[5]+.02,L[5]+DU[5]-.06,'mBg','mSm',.13);BP.eyes(L[5],'wide');
tl.set('#mapW',{x:2750,y:1000},L[5]-.2);tl.set('#map',{y:0,scale:.2,rotation:200},L[5]-.2);
tl.to('#mapW',{x:1880,y:1235,duration:.6,ease:'power2.out'},W(5,1));tl.to('#map',{rotation:-10,scale:.3,duration:.6,ease:'power2.out'},W(5,1));
tl.fromTo('#map',{rotation:-12},{rotation:12,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tSnag);
tl.fromTo('#bpAntL',{rotation:-16},{rotation:16,duration:.12,yoyo:true,repeat:7},tSnag);tl.set('#bpAntL',{rotation:0},tSnag+1.0);
BP.eyes(tSnag,'happy');sparks(tSnag,1880,1260,8,100);hop('#bpSq',tSnag,50,.14,.18);
tl.to('#bpArmL',{rotation:150,duration:.15},W(5,2));tl.to('#bpArmR',{rotation:-150,duration:.15},W(5,2));
faces2(tSnag+.1,'happy','Big');lookAll2(tSnag+.1,34,-20);

/* ================= SCENE 6: Boo: "Waves! I'm scared. Boo." ================= */
camTo(L[6]-.45,.7,...CAM.gh,'power2.inOut');
tl.to('#bpArmL,#bpArmR',{rotation:0,duration:.2},L[6]-.3);
GH.talk(L[6]+.02,L[6]+DU[6]-.05,'mO','mFr',.14);GH.eyes(L[6],'wide');faces2(L[6]+.05,'wide','Fr');lookAll2(L[6]+.1,-10,6);
tl.fromTo('#ghLean',{x:-7},{x:7,duration:.05,yoyo:true,repeat:23},L[6]+.05);tl.set('#ghLean',{x:0},L[6]+1.3);
tl.to('#ghArmL',{rotation:140,duration:.2},L[6]);tl.to('#ghArmR',{rotation:-140,duration:.2},L[6]);
spray(L[6]+.1,520,2190,1.5);spray(L[6]+.25,2090,2190,1.5);shake(L[6]+.15,9,5);

/* ================= SCENE 7: Bo: "Hold my hand, Boo!" — Boo drifts down, they hold hands ================= */
tl.to('#gh',{x:1330,y:1720,duration:.6,ease:'power2.inOut'},L[7]-.7);
camTo(L[7]-.4,.7,...CAM.duo,'power2.inOut');
faces2(L[7]+.3,'normal','Sm');bTalk(L[7]+.02,L[7]+DU[7]-.06);eyesMode(L[7]+.02,'normal');brows(L[7]+.05,0,0,-2,.15);
tl.to('#boArmR',{rotation:-82,duration:.22},L[7]+.1);tl.to('#ghArmL',{rotation:85,duration:.22},L[7]+.1);
GH.m(L[7]+.2,'mSm');GH.eyes(W(7,3),'happy');hearts(W(7,3),1230,1560,5,70,220);sparks(W(7,3),1235,1690,8,90);
tl.to('#ghArmR',{rotation:0,duration:.2},L[7]);

/* ================= SCENE 8: "Then somebody sneezed in the snacks!" — the crate shakes, ACHOO! ================= */
camTo(L[8]-.45,.7,...CAM.snk,'power2.inOut');
tl.to('#boArmR',{rotation:0,duration:.2},L[8]-.3);tl.to('#ghArmL',{rotation:0,duration:.2},L[8]-.3);
tl.fromTo('#snk',{x:-6},{x:6,duration:.05,yoyo:true,repeat:11},W(8,1));tl.set('#snk',{x:0},W(8,1)+.65);
tl.fromTo('#snk',{scaleY:1},{scaleY:1.08,duration:.08,yoyo:true,repeat:1},tSn);
tl.set('#achW',{opacity:1,x:1830,y:1520},tSn);tl.fromTo('#ach',{scale:.2,rotation:-10},{scale:1,rotation:-4,duration:.3,ease:'back.out(2.5)'},tSn);tl.to('#achW',{opacity:0,duration:.25},tSn+.95);
tl.fromTo('#snkLid',{rotation:0,y:0},{rotation:-35,y:-30,duration:.12,ease:'power2.out'},tSn);tl.to('#snkLid',{rotation:0,y:0,duration:.3,ease:'bounce.out'},tSn+.35);
sparks(tSn+.05,1830,1720,10,170);dust(tSn,1830,1760,1.2);shake(tSn,8,5);
faces2(tSn+.1,'wide','O');lookAll2(tSn+.1,28,8);

/* ================= SCENE 9: Rocky: "Nobody saw anything." — his head pops out of the crate ================= */
camTo(L[9]-.45,.7,...CAM.rk,'power2.inOut');
tl.set('#rk',{opacity:1},L[9]-.25);tl.to('#rkSq',{y:0,duration:.25,ease:'back.out(1.8)'},L[9]-.25);
RK.eyes(L[9]-.25,'normal');RK.m(L[9]-.25,'mSm');RK.talk(L[9]+.02,L[9]+DU[9]-.05,'mOp','mSm',.14);
RK.look(L[9]+.25,-22,2,.15);RK.look(L[9]+.8,22,2,.15);RK.brows(L[9]+.05,-10,10,0,.15);
lookAll2(L[9]+.1,30,0);

/* ================= SCENE 10: Bo: "Rocky! You stowed away again!" ================= */
camTo(L[10]-.45,.7,...CAM.two,'power2.inOut');
bTalk(L[10]+.02,L[10]+DU[10]-.06);eyesMode(L[10]+.02,'wide');brows(L[10]+.05,14,-14,-4,.15);
tl.to('#boArmR',{rotation:-82,duration:.2},L[10]+.15);hop('#boSq',L[10]+.2,40,.12,.16);
RK.eyes(L[10]+.4,'happy');RK.m(L[10]+.4,'mSm');tl.to('#rkArmL',{rotation:70,duration:.2},L[10]+.5);
faces2(L[10]+.1,'wide','Big');lookAll2(L[10]+.1,26,0);

/* ================= SCENE 11: "And then... land ahoy!" — an island grows on the horizon, everybody cheers ================= */
camTo(L[11]-.4,1.0,...CAM.wide,'power2.inOut');
tl.to('#boArmR',{rotation:0,duration:.2},L[11]-.2);tl.to('#rkArmL',{rotation:0,duration:.2},L[11]-.2);
tl.to('#mapW',{opacity:0,duration:.35},L[11]-.1);tl.set('#isleW',{opacity:1},W(11,2)-.1);tl.fromTo('#isleW',{scale:.1},{scale:1.35,duration:3.2,ease:'power1.out'},W(11,2)-.1);
camTo(L[11]+1.0,2.6,...CAM.end,'sine.inOut');
faces2(W(11,2),'wide','Big');lookAll2(W(11,2),34,-8);armsUp(W(11,3),.15);tl.to('#rkArmL',{rotation:150,duration:.15},W(11,3));
SQC.forEach((s,i)=>hop(s,W(11,3)+.05+i*.05,50,.14,.2));
confetti(W(11,3),600,2100,1200,2300,36,.9);hearts(W(11,3)+.1,1300,1500,5,120,260);
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

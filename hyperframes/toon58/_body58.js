/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: Coco climbs the rope ladder to the launch platform, looks down (scared), Waddles encourages her (penguins cannot fly), Bo promises to catch her, Bo / Zap / Truffle / Waddles run to hold a pancake net (the trampoline),
// Coco grabs the trapeze bar and swings higher and higher (a pendulum), lets go at the top, floats down doing three somersaults and lands softly in the net (it squashes, she bounces twice), "I can really fly!"
const PLAT=[650,1100], NETC=[2040,2150,.8], LAND=[2040,2131];
const HOLD={bo:[1690,ROWD+BOY,.88],zp:[1850,2030,.7],tf:[2230,2040,.74],wd:[2390,2090,.9]};          // the net holders' marks
const CAM={wide:[380,-220,.53], cmTop:ECAM('cm',[PLAT[0],PLAT[1],TRP.S]), wd:ECAM('wd',M58.wd,1.2), bo:ECAM('bo',M58.bo), flight:camE(2000,1350,.62,540,830), net:camE(2040,1850,.85,540,830), cmNet:ECAM('cm',[LAND[0],LAND[1],TRP.S])};
const tClimb=W(1,1), tNet=W(5,3)-.1, tGo=W(6,3)+.05, tRel=W(8,3), tFl0=L[9]+.05, tFl1=W(10,1)-.4, tLand=W(10,1)+.02;
const tStk=L[11]+DU[11]+.45;
circusLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);

/* ================= SCENE 1: "Coco climbed the trapeze ladder!" — she climbs 740 px up to the platform ================= */
camSet(0,...CAM.wide);
faces2(0,'happy','Sm');lookAll2(0,-10,-24);
tl.to('#cm',{x:PLAT[0],y:PLAT[1],duration:L[2]-.35-tClimb,ease:'none'},tClimb);
cycle(['#cmLegL','#cmLegR'],['#cmArmL','#cmArmR'],tClimb,L[2]-.35,.4,18,40,'#cmSq',0);
tl.set('#cmArmL',{rotation:150},L[2]-.3);tl.set('#cmArmR',{rotation:-150},L[2]-.3);

/* ================= SCENE 2: Coco: "Ooh-ooh! It is so high!" — she looks down and shivers ================= */
camTo(L[2]-.45,.7,...CAM.cmTop,'power2.inOut');
CM.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mO',.13);cmEyes(L[2],'wide');CM.look(L[2]+.05,0,22,.2);
shiver('#cmSq',L[2]+.4,L[3]+.2,4);

/* ================= SCENE 3: Waddles: "Penguins can't fly, but we try!" — he flaps his flippers ================= */
camTo(L[3]-.45,.7,...CAM.wd,'power2.inOut');
WDN.pm(L[3]-.1,'Gr');WDN.eyes(L[3],true);WDN.talk(L[3]+.02,L[3]+DU[3]-.05,'Gr','Sm',.13);
waveArm('#wdArmL',L[3]+.3,L[3]+DU[3],60,140,.2);waveArm('#wdArmR',L[3]+.3,L[3]+DU[3],-60,-140,.2);hop('#wdSq',W(3,5),50,.14,.18);hearts(W(3,5),M58.wd[0],M58.wd[1]-300,4,80,200);

/* ================= SCENE 4: Bo: "We will catch you, Coco!" ================= */
camTo(L[4]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[4]+.02,L[4]+DU[4]-.06);eyesMode(L[4]+.02,'hearts');brows(L[4]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[4]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[4]+.2);hop('#boSq',W(4,4),50,.14,.18);

/* ================= SCENE 5: "They held a pancake net!" — four friends run to the spot, the net pops up between them ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[5]-.3);
camTo(L[5]-.45,.7,...CAM.wide,'power2.inOut');
for(const [p,[x,y,s]] of Object.entries(HOLD)){runTo(p,x,y,L[5]-.2,tNet+.4-(L[5]-.2),s);tl.to('#'+p,{scale:s,duration:.1},L[5]+.2);}
tl.set('#trmW',{opacity:1},tNet);tl.fromTo('#trm',{scale:.1},{scale:1,duration:.4,ease:'back.out(2)'},tNet);dust(tNet+.2,NETC[0],NETC[1]+20,2.4);sparks(tNet+.3,NETC[0],NETC[1]-60,10,220);
for(const p of Object.keys(HOLD)){tl.to(`#${p}ArmL`,{rotation:p==='bo'?-120:120,duration:.18},tNet+.45);tl.to(`#${p}ArmR`,{rotation:p==='bo'?120:-120,duration:.18},tNet+.45);}
faces2(L[5]+.2,'happy','Big');lookAll2(L[5]+.2,10,-8);

/* ================= SCENE 6: Coco: "Ooh-ooh! Here I go!" — she grabs the bar and steps off the platform ================= */
camTo(L[6]-.45,.7,...CAM.cmTop,'power2.inOut');
CM.talk(L[6]+.02,L[6]+DU[6]-.06,'mBg','mSm',.13);cmEyes(L[6],'wide');CM.look(L[6]+.02,0,0,.15);
hop('#cmSq',W(6,2),24,.1,.12);

/* ================= SCENE 7-8: the swing: a pendulum (bar angle a, from the platform side), Coco hangs on it; she lets go at the forward top ================= */
const nHalf=1, TP=(tRel-tGo)/(nHalf+.5);
proxyTween(tGo,tRel-tGo,u=>{const t=u*(tRel-tGo),A=26+4*u,a=-A*Math.cos(2*Math.PI*t/TP),w=Math.min(1,t/.4),w2=w*w*(3-2*w);
 const [hx,hy,hr]=hangXYR(a);setCm(lerp(PLAT[0],hx,w2),lerp(PLAT[1],hy,w2),lerp(0,hr,w2));trpR(-a);});
tl.set('#cmArmL',{rotation:150},tGo);tl.set('#cmArmR',{rotation:-150},tGo);
CM.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);cmEyes(L[7],'happy');
camTo(L[7]-.45,.7,...CAM.wide,'power2.inOut');
sparks(W(7,4),1550,950,8,200);
// the release: she opens her arms and flies
CM.talk(L[8]+.02,L[8]+DU[8]-.06,'mBg','mSm',.13);
{const [fx,fy,fr]=hangXYR(30),HC=TRP.HC*TRP.S,Cr=[fx+HC*Math.sin(fr*Math.PI/180),fy-HC*Math.cos(fr*Math.PI/180)],Cn=[LAND[0],LAND[1]-HC],D=tLand-tRel;
 tl.set('#cmArmL',{rotation:115},tRel);tl.set('#cmArmR',{rotation:-115},tRel);tl.set('#cmArmL',{rotation:40},tFl0);tl.set('#cmArmR',{rotation:-40},tFl0);tl.set('#cmArmL',{rotation:150},tFl1+.05);tl.set('#cmArmR',{rotation:-150},tFl1+.05);
 proxyTween(tRel,D,u=>{const t=u*D,cx=lerp(Cr[0],Cn[0],u*u*(3-2*u)),cy=Cr[1]+(Cn[1]-Cr[1])*u*u-400*Math.sin(Math.PI*u);
  let r;if(t<tFl0-tRel){const s=t/(tFl0-tRel);r=lerp(fr,0,s*s*(3-2*s));}else if(t<tFl1-tRel){const s=(t-(tFl0-tRel))/(tFl1-tFl0);r=-1080*(s*s*(3-2*s));}else r=-1080;
  const A=r*Math.PI/180;setCm(cx-HC*Math.sin(A),cy+HC*Math.cos(A),r);});}
tl.set('#trp',{rotation:-30},tRel);  // (the empty bar keeps swinging back)
tl.fromTo('#trp',{rotation:-30},{rotation:30,duration:2.4,yoyo:true,repeat:3,ease:'sine.inOut'},tRel+.05);

/* ================= SCENE 9: "She did three big somersaults!" ================= */
camTo(L[9]-.45,.7,...CAM.flight,'power2.inOut');
cmEyes(L[9]+.1,'dizzy');sparks(tFl0+.3,2000,1300,6,260);sparks(tFl0+.9,2050,1500,6,260);sparks(tFl0+1.5,2050,1700,6,260);
faces2(L[9]+.1,'wide','Big');lookAll2(L[9]+.1,14,-26);

/* ================= SCENE 10: "She landed softly on the net!" — the net squashes, she bounces twice ================= */
camTo(L[10]-.45,.7,...CAM.net,'power2.inOut');
cmEyes(tLand,'happy');CM.m(tLand,'mBg');
tl.fromTo('#trm',{scaleY:1},{scaleY:.5,duration:.12,ease:'power2.out'},tLand);tl.to('#trm',{scaleY:1.12,duration:.2,ease:'power2.inOut'},tLand+.12);tl.to('#trm',{scaleY:1,duration:.16},tLand+.32);
tl.fromTo('#trm',{scaleY:1},{scaleY:.8,duration:.1},tLand+.78);tl.to('#trm',{scaleY:1,duration:.14},tLand+.88);
arc('#cm',tLand+.12,.62,LAND[1],210,LAND[1]);arc('#cm',tLand+.82,.4,LAND[1],80,LAND[1]);
dust(tLand,LAND[0],LAND[1]+10,3);shake(tLand,12,8);hearts(tLand+.3,LAND[0],LAND[1]-380,6,100,260);sparks(tLand+.1,LAND[0],LAND[1]-300,10,200);
for(const p of Object.keys(HOLD)) hop(`#${p}Sq`,tLand+.1,40,.14,.18);

/* ================= SCENE 11: Coco: "Ooh-ooh! I can really fly!" ================= */
camTo(L[11]-.4,.8,...CAM.cmNet,'power2.inOut');
CM.talk(L[11]+.02,L[11]+DU[11]-.06,'mBg','mSm',.12);
tl.to('#cmArmL',{rotation:150,duration:.14},L[11]+.3);tl.to('#cmArmR',{rotation:-150,duration:.14},L[11]+.3);hop('#cmSq',W(11,4),60,.14,.18);
confetti(L[11]+.3,1500,2400,900,2200,34,.9);hearts(L[11]+.5,LAND[0],LAND[1]-380,7,200,260);
faces2(L[11]+.1,'happy','Big');
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

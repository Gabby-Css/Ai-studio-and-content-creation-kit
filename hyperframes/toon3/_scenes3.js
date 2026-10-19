/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const NBEE=7;
const tK1=.14, tK2=.42;                              // knock-knock replay of video #2's last frame
const tRev=W(1,4)-.12;                               // "BARNABY": silhouette -> colour
const tJarUp=W(1,9)-.2;                              // "HONEY": his paw lifts the jar
const rel=L[2]-.5, spl=rel+.62;                      // jar leaves the paw / lands in the bath ("SPLASH!")
const tB1=L[3]-.45;                                  // Bo sneaks toward the tub
const tFJ=L[8]-.3;                                   // Flapjack hops onto Bo's head
const bee0=L[4]-.1;                                  // bees pour out of the window
const ch0=W(5,1)-.35, ch1=L[9]+DU[9]+.1;             // the chase
const tJump=W(6,0)-.4;                               // Rocky leaps onto the table
const tPick=W(6,1)-.05, tThrow=W(6,3)-.05;           // lifts / throws the jar
const bf0=W(6,5)-.15;                                // the bees follow the jar
const tSq=W(10,1), tNb=tSq+.5, nbEnd=L[11]+DU[11];   // "SQUEAK?" -> Nibbles

/* --- bee helpers --- */
function flyBee(i,t0,pts,durs){const w='#bee'+i+'w',b='#bee'+i;let t=t0;
 tl.set(w,{x:pts[0][0],y:pts[0][1],opacity:1},t0);
 for(let k=1;k<pts.length;k++){const dx=pts[k][0]-pts[k-1][0];
  tl.set(b,{scaleX:dx>0?-1:1},t);tl.to(w,{x:pts[k][0],y:pts[k][1],duration:durs[k-1],ease:'none'},t);t+=durs[k-1];}
 tl.to(w,{opacity:0,duration:.12},t);return t;}
function flapBee(i,t0,t1){const n=Math.max(1,Math.floor((t1-t0)/.05));
 tl.fromTo('#bee'+i+'Wl',{scaleY:1},{scaleY:.25,duration:.05,yoyo:true,repeat:n,ease:'none'},t0);
 tl.fromTo('#bee'+i+'Wr',{scaleY:1},{scaleY:.25,duration:.05,yoyo:true,repeat:n,ease:'none'},t0);}

/* ================= SCENE 1: knock-knock -> Barnaby brought honey ================= */
camSet(0,335,215,.97);camTo(0,rel-.25,350,230,1.0,'sine.inOut');
bm(0,'mO');eyesMode(0,'wide');look(0,-20,-26,.01);brows(0,-18,18,-16,.01);
RK.m(0,'mO');RK.eyes(0,'wide');RK.look(0,-16,-20,.01);RK.brows(0,-20,20,-12,.01);
tl.set('#panEyesClosed',{opacity:0},0);tl.set('#panEyes',{opacity:1},0);FJ.pm(0,'Oh');FJ.look(0,-10,-12,.01);
[tK1,tK2].forEach(t=>{tl.set('#knockFx',{opacity:1},t);tl.set('#knockFx',{opacity:0},t+.12);tl.fromTo('#barnIn',{y:0},{y:-14,duration:.06,yoyo:true,repeat:1},t);shake(t,6,3);});
// the silhouette turns into Barnaby
tl.to('#barnG',{opacity:0,duration:.25},tRev);
tl.fromTo('#bw',{opacity:0,scale:.7},{opacity:1,scale:.8,duration:.3,ease:'back.out(2.2)'},tRev);
BW.m(tRev,'mSm');BW.look(tRev,0,8,.05);BW.brows(tRev,-6,6,-4,.1);BW.blink(tRev+1.1);
tl.fromTo('#bwHead',{rotation:-3},{rotation:3,duration:.6,yoyo:true,repeat:Math.max(1,Math.round((L[7]-tRev)/.6)-1),ease:'sine.inOut'},tRev);
// friends relax: it is a visitor, not a monster
eyesMode(tRev+.1,'normal');bm(tRev+.1,'mOpen');look(tRev+.1,0,-14,.1);brows(tRev+.1,0,0,0,.1);
RK.eyes(tRev+.1,'normal');RK.m(tRev+.1,'mSm');RK.brows(tRev+.1,0,0,0,.1);RK.look(tRev+.1,-14,-14,.1);
FJ.pm(tRev+.1,'Sm');FJ.look(tRev+.1,-8,-12,.1);
// "...he brought honey!": paw lifts the jar, Bo gets heart eyes
tl.to('#bwArmR',{rotation:-150,duration:.35,ease:'back.out(2)'},tJarUp);
sparks(tJarUp+.25,705,650,6,90);
eyesMode(tJarUp+.1,'hearts');bm(tJarUp+.1,'mBig');
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.16,duration:.3,yoyo:true,repeat:Math.max(1,Math.round((rel-tJarUp)/.3)),ease:'sine.inOut'},tJarUp+.1);
RK.eyes(tJarUp+.1,'happy');RK.m(tJarUp+.1,'mBg');
tl.fromTo('#panSq',{scaleY:1},{scaleY:1.06,duration:.35,yoyo:true,repeat:Math.max(1,Math.round((rel-tJarUp)/.35)),ease:'sine.inOut'},tJarUp);
hearts(tJarUp+.2,560,1000,4,70,260);
// Barnaby: "Is it snack time yet?"
BW.talk(L[7],L[7]+DU[7]-.08,'mOp','mSm');
tl.fromTo('#bwHead',{rotation:-5},{rotation:5,duration:.25,yoyo:true,repeat:6,ease:'sine.inOut'},L[7]);
tl.fromTo('#boSq',{y:0},{y:-46,duration:.14,yoyo:true,repeat:5,ease:'power1.out'},L[7]+.15);
tl.to('#boArmL',{rotation:-30,duration:.2},L[7]+.1).to('#boArmR',{rotation:30,duration:.2},L[7]+.1);
tl.to('#boArmL,#boArmR',{rotation:0,duration:.25},L[7]+1.3);
hearts(L[7]+.3,880,1000,3,70,240);

/* ================= SCENE 2: the jar flies into Flapjack's bath ================= */
tl.to('#bwArmR',{rotation:-178,duration:.2,ease:'power2.out'},rel-.28);
tl.to('#bwArmR',{rotation:-40,duration:.16,ease:'power3.in'},rel-.08);
BW.m(rel-.28,'mBg');BW.brows(rel-.28,-14,14,-8,.1);
tl.set('#bwJarG',{opacity:0},rel);
tl.set('#jar',{opacity:1,x:716,y:655,scale:.7,rotation:0},rel);
tl.fromTo('#jar',{x:716},{x:TUBX+5,duration:spl-rel,ease:'none'},rel);
tl.fromTo('#jar',{y:655},{y:470,duration:.22,ease:'power2.out'},rel).to('#jar',{y:1075,duration:spl-rel-.22,ease:'power2.in'},rel+.22);
tl.fromTo('#jar',{rotation:0},{rotation:300,duration:spl-rel,ease:'none'},rel);
tl.fromTo('#jar',{scale:.7},{scale:1,duration:spl-rel,ease:'none'},rel);
// SPLASH!
tl.to('#jar',{rotation:392,x:TUBX+28,y:1068,duration:.3,ease:'back.out(2)'},spl);
drops(spl,TUBX,1050,8);bubbles(spl+.05,TUBX,1040,5);
tl.to('#honeyPool',{opacity:1,duration:.3},spl);
shake(spl,9,4);
camTo(spl-.3,.9,470,430,1.15);
tl.fromTo('#panSq',{scaleX:1.16,scaleY:.84},{scaleX:1,scaleY:1,duration:.45,ease:'elastic.out(1,.4)'},spl);
tl.set('#panEyesClosed',{opacity:0},spl);tl.set('#panEyes',{opacity:1},spl);FJ.pm(spl,'Oh');FJ.look(spl,0,-10,.1);
tl.to('#panGlaze',{opacity:1,duration:.5},spl+.1);
tl.to('#panArmL',{rotation:-60,duration:.2},spl+.2);tl.to('#panArmR',{rotation:60,duration:.2},spl+.2);
FJ.pm(spl+.9,'Gr');
eyesMode(spl,'hearts');bm(spl,'mBig');
RK.eyes(spl,'wide');RK.look(spl,10,6,.1);RK.m(spl+.1,'mBg');
BW.eyes(spl,'happy');BW.m(spl,'mBg');BW.brows(spl,0,0,0,.1);
tl.to('#bwArmR',{rotation:0,duration:.3},spl);
sparks(spl+.3,TUBX,980,7,130);

/* ================= SCENE 3: "Just one tiny bite!"  /  "Catch me if you can!" ================= */
tl.to('#bowl',{y:1595,duration:.25,ease:'bounce.out'},tB1-.05);
tl.to('#spoon',{x:BX+190,y:1585,rotation:30,duration:.25},tB1-.05);
tl.fromTo('#bo',{x:BX},{x:780,duration:.7,ease:'sine.inOut'},tB1);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tB1,tB1+.7,.34,22,12,'#boSq',8);
camTo(tB1,.9,470,430,1.15);
tl.to('#boLean',{rotation:13,duration:.3,ease:'sine.in'},tB1+.65);
eyesMode(tB1+.3,'normal');brows(tB1+.3,-10,10,-10,.1);look(tB1+.3,20,6,.1);
bm(W(3,0),'mOpen');bm(W(3,1),'mSmile');bm(W(3,2),'mOpen');bm(W(3,3),'mBig');bm(WE(3,3)+.12,'mSmile');
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.1,duration:.2,yoyo:true,repeat:3},tB1+.5);
// Bo's chomp (the pancake is in danger!)
tl.fromTo('#boHead',{rotation:0},{rotation:-6,duration:.12,yoyo:true,repeat:3},W(3,3));
// Flapjack worries
FJ.pm(L[3],'Wo');FJ.brows(L[3],true,-14,14);FJ.look(L[3],-16,2,.1);
tl.fromTo('#panShake',{rotation:-3},{rotation:3,duration:.07,yoyo:true,repeat:Math.max(1,Math.round((tFJ-L[3])/.07))},L[3]);
tl.set('#panShake',{rotation:0},tFJ);
// ... she hops onto Bo's head, out of reach
tl.set('#panLegs',{opacity:1},tFJ);
tl.fromTo('#pan',{x:TUBX-8},{x:780,duration:.45,ease:'none'},tFJ);
tl.fromTo('#pan',{y:TUBY},{y:760,duration:.22,ease:'power2.out'},tFJ).to('#pan',{y:1052,duration:.23,ease:'power2.in'},tFJ+.22);
tl.fromTo('#panArmL',{rotation:-60},{rotation:-150,duration:.15,yoyo:true,repeat:2},tFJ);tl.fromTo('#panArmR',{rotation:60},{rotation:150,duration:.15,yoyo:true,repeat:2},tFJ);
FJ.brows(tFJ,false);
tl.set('#pan',{opacity:0},tFJ+.45);tl.set('#bh',{opacity:1},tFJ+.45);tl.set('#bhGlaze',{opacity:1},tFJ+.45);
FB.pm(tFJ+.45,'Gr');FB.eyes(tFJ+.45,true);FB.look(tFJ+.45,0,10,.1);
tl.set('#bhArmL',{rotation:-130},tFJ+.45);tl.set('#bhArmR',{rotation:130},tFJ+.45);
// Bo looks up, cross-eyed
tl.to('#boLean',{rotation:0,duration:.2},tFJ+.45);
eyesMode(tFJ+.45,'wide');bm(tFJ+.45,'mO');look(tFJ+.45,0,-30,.1);brows(tFJ+.45,-14,14,-14,.1);
// Flapjack: "Catch me if you can!"
FB.talk(L[8]+.1,L[8]+DU[8],'Gr','Sm');
tl.fromTo('#bhSq',{scaleY:1},{scaleY:.86,duration:.1,yoyo:true,repeat:11},L[8]+.1);
tl.fromTo('#bhArmL',{rotation:-130},{rotation:-165,duration:.16,yoyo:true,repeat:9},L[8]+.1);tl.fromTo('#bhArmR',{rotation:130},{rotation:165,duration:.16,yoyo:true,repeat:9},L[8]+.18);
tl.fromTo('#bhShake',{rotation:-7},{rotation:7,duration:.2,yoyo:true,repeat:7,ease:'sine.inOut'},L[8]+.1);
hearts(L[8]+.3,780,780,3,80,200);
// Rocky watches
RK.eyes(tB1,'normal');RK.look(tB1,-10,2,.1);RK.m(tB1,'mSm');

/* ================= SCENE 4: the sweet smell calls the bees ================= */
camTo(bee0-.35,.9,350,230,1.0);
const orb0=bee0+1.6, orb1=bf0;
const chPts=[[0,780]];
{let tt=0,dir=1;const span=ch1-ch0-.5;while(tt<span){tt+=.55;chPts.push([tt,dir>0?1090:650]);dir=-dir;}chPts.push([Math.max(tt+.45,ch1-ch0),780]);}
const chEnd=ch0+chPts[chPts.length-1][0];
const boXAt=(t)=>{const r=t-ch0;if(r<=0)return 780;for(let k=1;k<chPts.length;k++){if(r<=chPts[k][0]){const a=chPts[k-1],b=chPts[k];return a[1]+(b[1]-a[1])*((r-a[0])/(b[0]-a[0]));}}return 780;};
for(let i=0;i<NBEE;i++){
 const t0=bee0+i*.11, wx=480+i*38, wy=430+(i%3)*50;
 const pts=[[wx,wy]], durs=[];
 [[wx+50,wy+70],[640+i*12,650],[760,860]].forEach(p=>{pts.push(p);durs.push(.3);});
 const R=130+(i%3)*42, ph=i*.9, om=7+(i%2)*1.6;
 let t=t0+.9;
 const tOrb=Math.max(t,orb0);
 // approach the orbit start
 const startA=ph;pts.push([boXAt(tOrb)+R*Math.cos(startA),985+.45*R*Math.sin(startA)]);durs.push(Math.max(.1,tOrb-t));t=tOrb;
 for(;t<orb1;t+=.1){const a=ph+om*(t+.1-orb0);pts.push([boXAt(t+.1)+R*Math.cos(a),985+.45*R*Math.sin(a)]);durs.push(.1);}
 // streaming out of the window after the jar
 [[boXAt(orb1)-200,780],[640,620],[548+(i-3)*12,520]].forEach((p,k)=>{pts.push(p);durs.push([.4,.4,.3][k]);});
 const tEnd=flyBee(i,t0,pts,durs);flapBee(i,t0,tEnd);
}
// everybody hears the buzzing
eyesMode(bee0,'wide');bm(bee0,'mO');look(bee0,-22,-16,.1);brows(bee0,-18,18,-14,.1);
tl.set('#boSweat',{opacity:1},bee0+.3);
FB.pm(bee0+.2,'Oh');FB.look(bee0+.2,-18,-8,.1);
RK.eyes(bee0,'wide');RK.m(bee0,'mO');RK.look(bee0,-14,-14,.1);tl.set('#rkSweat',{opacity:1},bee0+.3);
tl.fromTo('#bhShake',{rotation:-9},{rotation:9,duration:.06,yoyo:true,repeat:Math.max(1,Math.round((ch0-bee0)/.06))},bee0+.2);
shake(bee0+.9,6,4);

/* ================= SCENE 5: the chase around the kitchen ================= */
tl.set('#bhShake',{rotation:0},ch0);
for(let k=1;k<chPts.length;k++){const a=chPts[k-1],b=chPts[k];
 tl.fromTo('#bo',{x:a[1]},{x:b[1],duration:b[0]-a[0],ease:'sine.inOut'},ch0+a[0]);
 tl.to('#boLean',{rotation:b[1]>a[1]?14:-14,duration:.15},ch0+a[0]);}
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],ch0,chEnd,.26,34,46,'#boSq',14);
cycle(['#bhLegL','#bhLegR'],[],ch0,chEnd,.24,40,0,'#bhSq',6);
tl.fromTo('#boTail',{rotation:-12},{rotation:12,duration:.13,yoyo:true,repeat:Math.round((chEnd-ch0)/.13)},ch0);
tl.fromTo('#boScarfTail',{rotation:-20},{rotation:25,duration:.12,yoyo:true,repeat:Math.round((chEnd-ch0)/.12)},ch0);
bm(ch0,'mBig');brows(ch0,16,-16,0,.1);look(ch0,16,-6,.1);
FB.pm(ch0,'Wo');
tl.fromTo('#bhShake',{rotation:-6},{rotation:6,duration:.12,yoyo:true,repeat:Math.round((chEnd-ch0)/.12)},ch0);
shake(ch0+.5,5,3);shake(ch0+1.6,5,3);shake(ch0+2.7,5,3);
// Rocky dives under the table (his cap peeks out)
tl.to('#rk',{y:1600,duration:.18,ease:'power2.in'},ch0-.05);
// Rocky: "Nobody saw anything."
tl.to('#rk',{y:1500,duration:.2,ease:'back.out(2)'},L[9]-.12);
RK.m(L[9]-.1,'mSm');RK.eyes(L[9]-.1,'normal');RK.brows(L[9]-.1,-10,10,-6,.1);RK.look(L[9],-14,-4,.1);RK.look(L[9]+.6,14,-4,.2);
RK.talk(L[9],L[9]+DU[9]-.1);
tl.set('#rkSweat',{opacity:1},L[9]);
tl.to('#rk',{y:1600,duration:.2,ease:'power2.in'},L[9]+DU[9]-.05);
// Bo runs out of breath at the end
tl.to('#boLean',{rotation:0,duration:.3},chEnd);
bm(chEnd,'mOpen');tl.fromTo('#boBody',{scaleY:1},{scaleY:1.05,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},chEnd);

/* ================= SCENE 6: Rocky throws the jar out of the window ================= */
tl.fromTo('#rk',{y:1600},{y:900,duration:.25,ease:'power2.out'},tJump).to('#rk',{y:RKT,duration:.25,ease:'power2.in'},tJump+.25);
tl.fromTo('#rk',{x:1235,scale:.85},{x:1210,scale:.78,duration:.5,ease:'none'},tJump);
RK.m(tJump,'mO');RK.brows(tJump,0,0,0,.1);RK.look(tJump,-16,-6,.1);
tl.to('#rkArmL',{rotation:140,duration:.2,ease:'back.out(2)'},tPick-.15);tl.to('#rkArmR',{rotation:-140,duration:.2,ease:'back.out(2)'},tPick-.15);
// the jar floats up over Rocky's head
tl.to('#jar',{x:1210,y:610,rotation:360,scale:.9,duration:.4,ease:'power2.out'},tPick);
sparks(tPick+.3,1210,610,5,110);
RK.m(tPick,'mBg');RK.eyes(tPick,'normal');RK.look(tPick,-20,-10,.1);
// throw!
tl.to('#rkArmL',{rotation:-20,duration:.12,ease:'power3.in'},tThrow-.05);tl.to('#rkArmR',{rotation:20,duration:.12,ease:'power3.in'},tThrow-.05);
tl.to('#jar',{x:640,duration:.55,ease:'none'},tThrow);
tl.to('#jar',{y:470,duration:.25,ease:'power2.out'},tThrow).to('#jar',{y:600,duration:.3,ease:'power2.in'},tThrow+.25);
tl.to('#jar',{rotation:720,scale:.55,duration:.55,ease:'none'},tThrow);
tl.set('#jar',{opacity:0},tThrow+.55);
// Barnaby catches it
tl.set('#bwJarG',{opacity:1},tThrow+.55);
tl.to('#bwArmR',{rotation:-150,duration:.3,ease:'back.out(2)'},tThrow+.45);
BW.eyes(tThrow+.5,'happy');BW.m(tThrow+.55,'mBg');
sparks(tThrow+.6,690,640,6,90);
BW.talk(tThrow+.9,L[10]-.1,'mBg','mOp',.22);
tl.fromTo('#bwHead',{rotation:-4},{rotation:4,duration:.3,yoyo:true,repeat:Math.max(1,Math.round((L[10]-tThrow)/.3)),ease:'sine.inOut'},tThrow+.9);
RK.m(tThrow+.6,'mO');RK.eyes(tThrow+.6,'normal');RK.look(tThrow+.6,-20,-6,.1);
// the bees follow the jar outside, everyone relaxes
FB.pm(bf0+.4,'Sm');FB.look(bf0+.4,0,6,.2);
eyesMode(bf0+.5,'normal');bm(bf0+.5,'mSmile');brows(bf0+.5,0,0,0,.15);look(bf0+.5,0,0,.2);tl.set('#boSweat',{opacity:0},bf0+.6);
RK.m(bf0+.8,'mSm');tl.set('#rkSweat',{opacity:0},bf0+.8);
hearts(bf0+1.0,780,780,4,80,220);

/* ================= SCENE 7: "Then... squeak?" -> Nibbles ================= */
// freeze: ears up, everybody looks to the right
eyesMode(tSq-.1,'wide');bm(tSq-.1,'mO');look(tSq-.1,26,0,.08);brows(tSq-.1,-18,18,-16,.1);
RK.eyes(tSq-.1,'wide');RK.m(tSq-.1,'mO');RK.look(tSq-.1,20,0,.08);
FB.pm(tSq-.1,'Oh');FB.look(tSq-.1,16,0,.08);
tl.fromTo('#boSq',{y:0},{y:-50,duration:.14,ease:'power2.out'},tSq-.1).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},tSq+.04);
// whip over to the little hole in the wall
camTo(tSq+.1,.8,1370,900,2.0,'power2.inOut');
tl.to('#nb',{y:1476,duration:.35,ease:'back.out(1.8)'},tNb);
NM.m(tNb,'mO');NM.eyes(tNb,'wide');NM.look(tNb,-14,6,.15);NM.look(tNb+.5,14,6,.2);NM.brows(tNb,-14,14,-10,.1);
tl.fromTo('#nbHead',{rotation:-4},{rotation:4,duration:.4,yoyo:true,repeat:Math.max(1,Math.round((L[11]-tNb)/.4)),ease:'sine.inOut'},tNb+.3);
tl.fromTo('#nbEarL',{rotation:0},{rotation:-12,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},tNb+.3);
tl.fromTo('#nbEarR',{rotation:0},{rotation:12,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},tNb+.4);
NM.blink(tNb+.8);
// "Squeak! Cheese?"
NM.m(L[11]-.05,'mSm');NM.eyes(L[11]-.05,'normal');NM.brows(L[11]-.05,-8,8,-6,.1);
NM.talk(L[11],nbEnd-.05,'mOp','mSm',.11);
tl.fromTo('#nbCheese',{y:64},{y:50,duration:.12,yoyo:true,repeat:7},L[11]);
tl.to('#nb',{y:1462,duration:.12,yoyo:true,repeat:5},L[11]);
sparks(L[11]+.2,1700,1230,5,80);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},nbEnd+.12);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},nbEnd+.55);
// final button: little hop on the last chord
tl.to('#nb',{y:1436,duration:.15,ease:'power2.out'},29.4).to('#nb',{y:1476,duration:.2,ease:'bounce.out'},29.55);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

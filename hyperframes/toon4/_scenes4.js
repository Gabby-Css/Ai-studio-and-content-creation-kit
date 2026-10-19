/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const WIDE=[305,215,.97];
const NBY=1448;                                          // Nibbles' standing height in the hole
const TRA=700, TRB=1020;                                   // Flapjack's running track on the table top
const tBite=[W(1,1),W(1,2)+.04,W(1,3),W(1,4)];           // 4 bites of his last cheese ("GOBBLED HIS LAST BITE")
const tWant=W(1,9);                                      // "WANTED"
const tHop=L[4]-.5;                                      // Flapjack hops off Bo's head onto the table
const tWake=L[5]-.55;                                    // Mochi stirs
const tDown=L[6]-.5;                                     // Mochi steps down off the cheese
const tch0=L[6]-.1;                                      // the chase
const tN0=L[6]+.9;                                      // Nibbles slips out of his hole
const tPickN=L[8]-.35;                                   // Nibbles takes the wedge
const tToss=[W(9,0)+.1,W(9,1)+.2,W(9,1)+.5];           // cheese cubes fly: Mochi, Bo, Flapjack
const tHush=W(10,0)-.05, tPig=W(10,2)-.35;                 // "BUT THEN..." / "SNIFF, SNIFF"
const tStk=L[11]+DU[11]+.15;

/* --- small helpers --- */
let ccn=0;
function chunk(t,x0,y0,x1,y1,dur=.6,hgt=220){const i=(ccn++)%6;
 tl.set('#cw'+i,{x:x0,y:y0},t);
 tl.fromTo('#cc'+i,{opacity:1,x:0,rotation:0,scale:1},{x:x1-x0,rotation:380,duration:dur,ease:'none'},t);
 tl.fromTo('#cc'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#cc'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#cc'+i,{opacity:0},t+dur);}
let zzn=0;
function zzz(t0,t1,x,y){let k=0;for(let t=t0;t<t1;t+=.95,k++){const i=(zzn++)%4;
 tl.set('#zw'+i,{x:x+(k%2)*26,y},t);
 tl.fromTo('#zz'+i,{opacity:0,scale:.4,y:0},{opacity:1,scale:1,y:-60,duration:.35,ease:'back.out(2)'},t);
 tl.to('#zz'+i,{y:-150,opacity:0,scale:1.25,duration:.6,ease:'sine.in'},t+.35);}}
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};

/* ================= SCENE 1: Nibbles gobbles his last bite of cheese ================= */
camSet(0,1370,900,2.0);
tl.to('#nb',{y:NBY,duration:.3,ease:'back.out(2)'},.05);
NM.m(0,'mSm');NM.eyes(0,'normal');NM.look(0,0,10,.01);NM.brows(0,0,0,0,.01);
tl.fromTo('#nbHead',{rotation:-2},{rotation:2,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},0);
tBite.forEach((t,i)=>{
 tl.to('#nbCheese',{scale:[.76,.5,.26,.001][i],duration:.09,ease:'power2.out'},t);
 NM.m(t-.04,'mBg');NM.m(t+.11,'mSm');
 tl.fromTo('#nbHead',{y:0},{y:5,duration:.07,yoyo:true,repeat:1},t);});
tl.set('#nbCheese',{opacity:0},tBite[3]+.1);
sparks(tBite[3]+.12,1640,1330,5,100);
NM.eyes(tBite[3]+.2,'happy');
// licks his lips, then notices the cheese is gone
NM.eyes(tWant-.25,'normal');NM.m(tWant-.25,'mFr');NM.brows(tWant-.25,-16,16,-8,.15);NM.look(tWant-.2,0,-16,.15);
tl.fromTo('#nbHead',{y:0},{y:-10,duration:.12,yoyo:true,repeat:3},tWant+.1);     // sniff, sniff
tl.fromTo('#nbEarL',{rotation:0},{rotation:-14,duration:.25,yoyo:true,repeat:3},tWant);
tl.fromTo('#nbEarR',{rotation:0},{rotation:14,duration:.25,yoyo:true,repeat:3},tWant+.1);
NM.look(W(1,10)+.1,34,-6,.25);                        // looks toward the table: something smells good over there

/* ================= SCENE 2: Mochi is napping on the big cheese ================= */
camTo(L[2]-.8,.95,760,480,1.3);
mcEyes(0,'sleep');MC.m(0,'mSm');
tl.set('#mcHead',{rotation:13},0);tl.set('#mcSq',{scaleY:.86},0);
tl.set('#mcArmL',{rotation:-28},0);tl.set('#mcArmR',{rotation:28},0);
tl.fromTo('#mcSq',{scaleY:.86},{scaleY:.91,duration:1.15,yoyo:true,repeat:Math.ceil((tWake-.1)/1.15),ease:'sine.inOut'},0);
tl.fromTo('#mcTail',{rotation:-5},{rotation:7,duration:1.4,yoyo:true,repeat:Math.ceil(tWake/1.4),ease:'sine.inOut'},0);
zzz(L[2]-.7,tWake,1262,800);
tl.fromTo('#mcEarL',{rotation:0},{rotation:-8,duration:.1,yoyo:true,repeat:1},W(2,5));
sparks(W(2,9)-.05,CHX,1000,7,170);                      // "the BIG CHEESE" glitters
camTo(W(2,8)-.1,.7,780,470,1.38);

/* ================= SCENE 3: Bo: "Operation Cheese is a go!" ================= */
camTo(L[3]-.55,.8,...WIDE);
look(L[3]-.5,22,-12,.2);brows(L[3]-.5,12,-12,-6,.15);bm(L[3]-.5,'mSmile');
[0,1,2,3,4].forEach(i=>bm(W(3,i),['mOpen','mBig','mOpen','mSmile','mBig'][i]));bm(WE(3,4)+.12,'mSmile');
tl.to('#boArmR',{rotation:-165,duration:.22,ease:'back.out(2.5)'},W(3,2));
tl.fromTo('#boArmR',{rotation:-165},{rotation:-135,duration:.14,yoyo:true,repeat:3},W(3,4)-.1);
tl.fromTo('#boSq',{y:0},{y:-30,duration:.12,yoyo:true,repeat:3,ease:'power1.out'},W(3,4)-.1);
FB.pm(L[3]-.3,'Sm');FB.look(L[3]-.3,18,-4,.15);FB.brows(L[3]-.3,true,14,-14);
tl.fromTo('#bhSq',{scaleY:1},{scaleY:.9,duration:.12,yoyo:true,repeat:3},W(3,4)-.1);
hearts(W(3,1)+.05,520,1000,3,70,200);

/* ================= SCENE 4: Flapjack bounces up as bait: "Catch me if you can!" ================= */
tl.set('#bh',{opacity:0},tHop);tl.set('#pan',{opacity:1,x:BOX,y:1122},tHop);
tl.fromTo('#pan',{x:BOX},{x:740,duration:.5,ease:'none'},tHop);
arc('#pan',tHop,.5,1122,200,FJY);
tl.to('#boArmR',{rotation:0,duration:.3},tHop+.1);
eyesMode(tHop+.3,'normal');look(tHop+.3,26,-16,.15);bm(tHop+.3,'mOpen');brows(tHop+.3,-14,14,-12,.1);
FJ.pm(tHop,'Gr');FJ.brows(tHop,true,14,-14);FJ.look(tHop,18,0,.1);
tl.fromTo('#panSq',{scaleX:1.14,scaleY:.84},{scaleX:1,scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tHop+.5);
tl.set('#panGlaze',{opacity:1},tHop);
FJ.talk(L[4]+.05,L[4]+DU[4]-.05,'Gr','Sm');
tl.fromTo('#panSq',{scaleY:1},{scaleY:.88,duration:.1,yoyo:true,repeat:Math.round(DU[4]/.2)},L[4]+.1);
tl.fromTo('#panArmL',{rotation:-60},{rotation:-150,duration:.15,yoyo:true,repeat:Math.round(DU[4]/.3)},L[4]);
tl.fromTo('#panArmR',{rotation:60},{rotation:150,duration:.15,yoyo:true,repeat:Math.round(DU[4]/.3)},L[4]+.07);
tl.to('#pan',{x:840,duration:DU[4],ease:'sine.inOut'},L[4]);
hearts(L[4]+.3,760,950,2,70,180);
// Mochi's ear twitches
tl.fromTo('#mcEarL',{rotation:0},{rotation:-12,duration:.1,yoyo:true,repeat:1},L[4]+.3);
tl.fromTo('#mcEarR',{rotation:0},{rotation:12,duration:.1,yoyo:true,repeat:1},L[4]+.9);

/* ================= SCENE 5: Mochi wakes up: "Hmph. Obviously." ================= */
camTo(tWake-.2,.7,640,430,1.25);
mcEyes(tWake,'lids');MC.m(tWake,'mOp');
tl.to('#mcHead',{rotation:0,duration:.4,ease:'sine.out'},tWake);
tl.to('#mcSq',{scaleY:1,duration:.55,ease:'back.out(1.6)'},tWake+.1);
tl.to('#mcArmL',{rotation:140,duration:.35,ease:'sine.out'},tWake);tl.to('#mcArmR',{rotation:-140,duration:.35,ease:'sine.out'},tWake);      // big stretch
MC.m(tWake+.15,'mBg');MC.m(tWake+.55,'mFr');
tl.to('#mcArmL',{rotation:0,duration:.3},tWake+.5);tl.to('#mcArmR',{rotation:0,duration:.3},tWake+.5);
MC.brows(tWake+.5,8,-8,2,.2);MC.look(tWake+.55,-26,0,.25);
// "HMPH." turns her nose up, "OBVIOUSLY." rolls her eyes
tl.to('#mcHead',{rotation:-9,duration:.25},W(5,0));MC.m(W(5,0),'mFr');
MC.look(W(5,1),-22,-24,.18);MC.look(W(5,1)+.45,18,-22,.25);MC.look(W(5,1)+.8,-24,6,.2);
MC.talk(W(5,1),WE(5,1)-.05,'mOp','mFr',.15);
tl.to('#mcHead',{rotation:7,duration:.35,ease:'sine.inOut'},W(5,1));
tl.to('#mcHead',{rotation:0,duration:.25},L[5]+DU[5]-.2);
mcEyes(L[5]+DU[5]-.15,'open');MC.m(L[5]+DU[5],'mSm');MC.brows(L[5]+DU[5],10,-10,0,.1);
// Flapjack realises what she has done
FJ.pm(tWake+.1,'Oh');FJ.look(tWake+.1,22,-6,.1);FJ.brows(tWake+.1,true,-16,16);
tl.fromTo('#panShake',{rotation:-4},{rotation:4,duration:.06,yoyo:true,repeat:Math.round((L[5]+DU[5]-tWake)/.06)},tWake+.4);
tl.set('#panShake',{rotation:0},L[5]+DU[5]);
FJ.pm(L[5]+DU[5]-.15,'Wo');
// Bo cannot look
eyesMode(tWake,'wide');bm(tWake,'mO');look(tWake,26,-10,.1);
tl.set('#boSweat',{opacity:1},tWake+.4);

/* ================= SCENE 6: the chase on the table top ================= */
camTo(tDown-.2,.6,...WIDE);
// Mochi steps down off the cheese
tl.fromTo('#mc',{x:CHX},{x:1010,duration:.45,ease:'none'},tDown);
arc('#mc',tDown,.45,CHTOP,120,TT);
tl.to('#mcArmL',{rotation:90,duration:.2},tDown);tl.to('#mcArmR',{rotation:-90,duration:.2},tDown);
tl.to('#mcArmL',{rotation:0,duration:.2},tDown+.4);tl.to('#mcArmR',{rotation:0,duration:.2},tDown+.4);
MC.m(tDown,'mBg');MC.m(tDown+.5,'mSm');
// Flapjack path (F) and Mochi's chasing path (M)
const fk=[], mk=[];                       // keyframes [t, x, kind]
fk.push([0,830,'run']);
let t=.45;fk.push([t,TRA,'run']);
const hopsF=[];
const cycles=Math.ceil((L[8]-tch0+.5)/2);
for(let c=0;c<cycles;c++){
 hopsF.push([t,t+.5,TRA,TRA+200]);fk.push([t+.5,TRA+200,'hop']);t+=.5;fk.push([t+.5,TRB,'run']);t+=.5;
 hopsF.push([t,t+.5,TRB,TRB-200]);fk.push([t+.5,TRB-200,'hop']);t+=.5;fk.push([t+.5,TRA,'run']);t+=.5;}
const tA=(()=>{let x=.45;while(tch0+x<L[7]+.2||false)x+=2;return x;})();      // the moment Mochi finally catches her (first arrival at the left end after the camera left)
// M: lunges under every hop, overshoots, turns
mk.push([0,1010]);let mt=.7,left=true;
while(mt<tA+.2){mk.push([mt,left?TRA+100:TRB-100]);mk.push([mt+.25,left?TRA+50:TRB+(-100)+60]);mt+=1.0;left=!left;}
const mAt=(arr,tt)=>{if(tt<=arr[0][0])return arr[0][1];for(let k=1;k<arr.length;k++)if(tt<=arr[k][0]){const a=arr[k-1],b=arr[k];return a[1]+(b[1]-a[1])*((tt-a[0])/(b[0]-a[0]));}return arr[arr.length-1][1];};
// Flapjack tweens
for(let k=1;k<fk.length;k++){const a=fk[k-1],b=fk[k];if(a[0]>=tA)break;const d=Math.min(b[0],tA)-a[0];if(d<=0)continue;
 tl.fromTo('#pan',{x:a[1]},{x:a[1]+(b[1]-a[1])*(d/(b[0]-a[0])),duration:d,ease:'none'},tch0+a[0]);}
hopsF.forEach(h=>{if(h[0]<tA)arc('#pan',tch0+h[0],h[1]-h[0],FJY,220,FJY);});
// the legs and arms of the runner
tl.set('#panLegs',{opacity:1},tch0);
cycle(['#panLegL','#panLegR'],[],tch0,tch0+tA,.22,42,0,'#panSq',5);
tl.fromTo('#panArmL',{rotation:-120},{rotation:-40,duration:.12,yoyo:true,repeat:Math.round(tA/.12)},tch0);
tl.fromTo('#panArmR',{rotation:120},{rotation:40,duration:.12,yoyo:true,repeat:Math.round(tA/.12)},tch0+.06);
FJ.pm(tch0,'Wo');FJ.look(tch0,-18,0,.1);
hopsF.forEach(h=>{if(h[0]<tA){FJ.pm(tch0+h[0],'Gr');FJ.pm(tch0+h[1],'Wo');}});
// Mochi tweens (lazy cat, but fast when it counts)
for(let k=1;k<mk.length;k++){const a=mk[k-1],b=mk[k];if(a[0]>=tA)break;const d=Math.min(b[0],tA)-a[0];
 tl.fromTo('#mc',{x:a[1]},{x:a[1]+(b[1]-a[1])*(d/(b[0]-a[0])),duration:d,ease:'none'},tch0+a[0]);
 tl.to('#mcLean',{rotation:b[1]>a[1]?10:-10,duration:.15},tch0+a[0]);}
cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],tch0,tch0+tA,.28,30,40,'#mcSq',10);
tl.fromTo('#mcTail',{rotation:-12},{rotation:14,duration:.14,yoyo:true,repeat:Math.round(tA/.14)},tch0);
MC.m(tch0,'mBg');MC.brows(tch0,16,-16,0,.1);MC.look(tch0,0,-22,.1);
mcEyes(tch0,'wide');
for(let tt=tch0+.6;tt<tch0+tA-.3;tt+=1.0){tl.to('#mcArmL',{rotation:150,duration:.12},tt);tl.to('#mcArmR',{rotation:-150,duration:.12},tt);}   // pounces
// Bo watches the ping-pong
for(let tt=tch0;tt<tch0+tA;tt+=.5){look(tt,(Math.floor((tt-tch0)/.5)%2)?-26:26,-14,.2);}
shake(tch0+.9,5,3);shake(tch0+2.9,5,3);

/* ================= SCENE 7: Nibbles tiptoes up to the cheese ================= */
camTo(L[7]-.75,.9,950,270,1.0);
tl.set('#nb',{opacity:0},tN0);tl.set('#nm',{opacity:1,x:1640,y:NBY,scale:NSC},tN0);
NN.m(tN0,'mSm');NN.eyes(tN0,'wide');NN.look(tN0,-20,6,.1);NN.brows(tN0,-12,12,-8,.1);
tl.set('#nmCheese',{opacity:0},tN0);
sparks(tN0,1640,1380,4,70);
// hop out to the floor, tiptoe to the table leg
const tN1=tN0+.3, tN2=tN1+.8, tN3=tN2+.9, tN4=tN3+.35;
tl.fromTo('#nm',{x:1640},{x:1590,duration:.3,ease:'none'},tN0);arc('#nm',tN0,.3,NBY,50,1580);
tl.fromTo('#nm',{x:1590},{x:1470,duration:tN2-tN1,ease:'none'},tN1);
cycle(['#nmLegL','#nmLegR'],[],tN1,tN2,.4,22,0,'#nmSq',5);
tl.to('#nmArmL',{rotation:-22,duration:.2},tN1);tl.to('#nmArmR',{rotation:22,duration:.2},tN1);
NN.look(tN1+.2,-24,0,.15);NN.look(tN1+.6,-24,-18,.15);
// climb the table leg
tl.to('#nm',{x:1458,duration:.2},tN2);
tl.fromTo('#nm',{y:1580},{y:1190,duration:tN3-tN2,ease:'none'},tN2);
cycle(['#nmLegL','#nmLegR'],[],tN2,tN3,.3,32,0,'#nmSq',3);
for(let tt=tN2,k=0;tt<tN3-.05;tt+=.15,k++){tl.to('#nmArmL',{rotation:k%2?150:60,duration:.15,ease:'none'},tt);tl.to('#nmArmR',{rotation:k%2?-60:-150,duration:.15,ease:'none'},tt);}
NN.look(tN2,-10,-26,.1);NN.m(tN2,'mO');tl.set('#nmBrowL',{rotation:-10},tN2);
// over the edge
tl.to('#nm',{x:1432,y:TT,duration:.35,ease:'power2.out'},tN3);
tl.to('#nmArmL',{rotation:-20,duration:.2},tN3+.15);tl.to('#nmArmR',{rotation:20,duration:.2},tN3+.15);
NN.m(tN3+.2,'mSm');NN.look(tN3+.2,-26,4,.15);
// the slow, suspicious tiptoe past the cheese wheel
const tTip0=Math.max(tN4,W(7,2)-.1), tTip1=tPickN-.1, XP=1222;
tl.fromTo('#nm',{x:1432},{x:XP,duration:tTip1-tTip0,ease:'none'},tTip0);
cycle(['#nmLegL','#nmLegR'],[],tTip0,tTip1,.62,14,0,'#nmSq',7);
for(let tt=tTip0,k=0;tt<tTip1;tt+=.55,k++){NN.look(tt,k%2?-26:12,k%2?4:-6,.18);}
NN.eyes(tTip0,'wide');NN.brows(tTip0,-14,14,-10,.1);
tl.fromTo('#nmTail',{rotation:-8},{rotation:10,duration:.35,yoyo:true,repeat:Math.round((tTip1-tTip0)/.35)},tTip0);
// grab the wedge
tl.set('#wedgeBig',{opacity:0},tPickN);
tl.set('#nmWedgeG',{opacity:1},tPickN);
tl.fromTo('#nmWedgeG',{scale:1.15},{scale:1.55,duration:.25,ease:'back.out(3)'},tPickN);
tl.to('#nmArmL',{rotation:-38,duration:.15},tPickN);tl.to('#nmArmR',{rotation:38,duration:.15},tPickN);
NN.m(tPickN,'mBg');NN.eyes(tPickN,'wide');NN.look(tPickN,0,10,.1);
sparks(tPickN+.1,XP,1050,6,110);

/* ================= SCENE 8: "Squeak! Cheese!" ================= */
camTo(L[8]-.45,.5,880,560,1.6);
NN.eyes(L[8]-.05,'normal');NN.m(L[8]-.05,'mSm');NN.brows(L[8]-.05,-8,8,-6,.1);NN.look(L[8],0,0,.1);
NN.talk(L[8],L[8]+DU[8]-.05,'mOp','mSm',.11);
tl.fromTo('#nm',{y:TT},{y:TT-46,duration:.13,yoyo:true,repeat:5,ease:'power1.out'},L[8]);
tl.to('#nmArmL',{rotation:-150,duration:.2,ease:'back.out(2)'},W(8,1));tl.to('#nmArmR',{rotation:150,duration:.2,ease:'back.out(2)'},W(8,1));
hearts(L[8]+.2,XP-215,1040,2,60,240);hearts(L[8]+.3,XP+215,1040,2,60,240);sparks(W(8,1),XP,1020,8,210);
tl.fromTo('#nmHead',{rotation:-5},{rotation:5,duration:.12,yoyo:true,repeat:5},L[8]);

/* ================= SCENE 9: cheese for everyone! ... sniff, sniff ================= */
camTo(L[9]-.25,.6,...WIDE);
// Mochi has caught the pancake (offscreen): she holds her like a plush toy
tl.set('#pan',{x:775,y:FJY},tch0+tA);tl.set('#mc',{x:830,y:TT},tch0+tA);
tl.set('#mcLean',{rotation:0},tch0+tA);
tl.set('#panLegs',{opacity:0},tch0+tA);
tl.to('#panSq',{scaleX:1.12,scaleY:.7,duration:.15},tch0+tA);
tl.set('#panEyes',{opacity:0},tch0+tA);tl.set('#panEyesClosed',{opacity:1},tch0+tA);
tl.to('#mcArmL',{rotation:-45,duration:.2},tch0+tA);tl.to('#mcArmR',{rotation:45,duration:.2},tch0+tA);
mcEyes(tch0+tA,'lids');MC.m(tch0+tA,'mFr');MC.brows(tch0+tA,10,-10,0,.1);MC.look(tch0+tA,26,0,.1);
tl.to('#mcTail',{rotation:0,duration:.2},tch0+tA);
// everybody had looked right: Bo calms down
eyesMode(L[9]-.2,'normal');bm(L[9]-.2,'mSmile');brows(L[9]-.2,0,0,0,.15);look(L[9]-.2,26,-6,.2);tl.set('#boSweat',{opacity:0},L[9]);
// Nibbles tosses cheese cubes
const NIX=XP, NIY=980;
chunk(tToss[0],NIX,NIY,830,930,.55,150);                // to Mochi
chunk(tToss[1],NIX,NIY,BOX,1286,.8,330);               // to Bo
chunk(tToss[2],NIX,NIY,775,1070,.62,200);              // to Flapjack
[tToss[0],tToss[1],tToss[2]].forEach((t,i)=>{tl.to('#nmArmR',{rotation:-110,duration:.1},t-.1);tl.to('#nmArmR',{rotation:38,duration:.2},t+.1);tl.to('#nmWedgeG',{scale:1.55-.1*(i+1),duration:.1},t);});
NN.eyes(tToss[0]-.1,'happy');NN.m(tToss[0]-.1,'mBg');
// Mochi catches hers; the cheese melts her heart
MC.m(tToss[0]+.45,'mOp');tl.set('#mcLids',{opacity:0},tToss[0]+.45);mcEyes(tToss[0]+.45,'open');
MC.m(tToss[0]+.6,'mFr');
MC.talk(tToss[0]+.62,tToss[0]+1.35,'mSm','mFr',.13);
mcEyes(tToss[0]+.9,'happy');MC.m(tToss[0]+1.4,'mSm');
sparks(tToss[0]+.9,830,900,5,90);hearts(tToss[0]+1.0,830,900,3,70,200);
// she lets Flapjack go
tl.to('#panSq',{scaleX:1,scaleY:1,duration:.3,ease:'elastic.out(1,.4)'},tToss[0]+1.1);
tl.set('#panEyesClosed',{opacity:0},tToss[0]+1.1);tl.set('#panEyes',{opacity:1},tToss[0]+1.1);
// Bo catches his in the mouth
bm(tToss[1]+.55,'mBig');bm(tToss[1]+.72,'mSmile');look(tToss[1]+.2,0,-30,.15);
tl.fromTo('#boHead',{rotation:0},{rotation:-6,duration:.12,yoyo:true,repeat:3},tToss[1]+.75);
eyesMode(tToss[1]+.8,'hearts');hearts(tToss[1]+.85,BOX,1100,3,70,220);
// Flapjack's cube
FJ.pm(tToss[2]+.45,'Gr');FJ.look(tToss[2]+.4,10,-14,.1);
tl.fromTo('#panSq',{scaleY:1},{scaleY:.86,duration:.1,yoyo:true,repeat:5},tToss[2]+.6);
FJ.pm(tToss[2]+1.0,'Sm');
// Nibbles keeps the biggest piece and munches
NN.m(tToss[2]+.3,'mSm');
// ---- "BUT THEN...": everybody freezes and looks up at the window
eyesMode(tHush,'wide');bm(tHush,'mO');look(tHush,-22,-30,.1);brows(tHush,-18,18,-14,.1);
FB.pm(tHush,'Oh');
FJ.pm(tHush,'Oh');FJ.look(tHush,-20,-20,.1);
mcEyes(tHush,'wide');MC.m(tHush,'mO');MC.look(tHush,-20,-26,.1);MC.brows(tHush,-14,14,-10,.1);
tl.fromTo('#mcSq',{y:0},{y:-24,duration:.14,ease:'power2.out'},tHush).to('#mcSq',{y:0,duration:.2,ease:'bounce.out'},tHush+.14);
NN.eyes(tHush,'wide');NN.m(tHush,'mO');NN.look(tHush,-26,-30,.1);
tl.fromTo('#boSq',{y:0},{y:-40,duration:.14,ease:'power2.out'},tHush).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},tHush+.14);
// smell lines drift from the cheese towards the window
steam(tHush+.2,L[11]+DU[11]);
// the silhouette of a chef rises in the window and sniffs
tl.fromTo('#pigG',{opacity:0},{opacity:1,duration:.25},tPig);
tl.fromTo('#pigIn',{y:260,x:70,rotation:8},{y:0,x:0,rotation:0,duration:.6,ease:'back.out(1.5)'},tPig);
tl.fromTo('#pigSnout',{scale:1},{scale:1.22,duration:.1,yoyo:true,repeat:7},tPig+.6);
tl.fromTo('#pigIn',{y:0},{y:-14,duration:.11,yoyo:true,repeat:5},tPig+.65);
// "Needs a pinch more love!"
tl.fromTo('#pigIn',{scaleY:1},{scaleY:.94,duration:.14,yoyo:true,repeat:Math.max(1,Math.round(DU[11]/.28))},L[11]);
tl.fromTo('#pigIn',{rotation:-3},{rotation:3,duration:.3,yoyo:true,repeat:Math.max(1,Math.round(DU[11]/.6))},L[11]);
// ---- sticker
camTo(tHush+.3,5.5,290,200,1.06,'sine.inOut');
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);
tl.to('#pigIn',{y:-10,duration:.2,yoyo:true,repeat:3},29.0);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
</script>
</body></html>

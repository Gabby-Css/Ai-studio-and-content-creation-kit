/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: everybody keeps the marks from #24; the giant pancake goes up on the flip spot (front, between Mochi and Bo);
// at dusk the same marks stand on the lawn, fireworks burst in the open sky above the back row, Munch waves from the far hill on the right
const CAM={wide:[380,-220,.53], king:[1400,560,.9], tow:[480,560,.75], tru:[560,602,.95], bo:[860,778,1.1],
 zap:camOn(...eyeAt('zp',1560,ROWD,.7),.85,540,900), jig:[1460,450,.8], mun:[1680,500,.85]};
const TWK=1150, TWY=ROWD, TWS=.9, TWTOP=TWY-530*TWS;      // the giant pancake (flip spot) and the top of the stack
const BOS2=[1390,ROWF+BOY-380];                            // where Bo holds the Golden Spatula
const MN=mkRock('mn');
const tTower=L[3]+.05;                                     // the giant pancake goes up
const tBite=W(5,3);                                        // "...tiny BITE!"
const tNight=L[6]-.35;                                     // the cut to the dusk lawn
const tBoom=W(7,5);                                        // "...ONE, BOOM!"
const tMunch=L[9]+.1;
const tAll=L[10];
const tStk=L[11]+DU[11]+.35;
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const JQ=['#j1Sq','#j2Sq','#j3Sq','#j4Sq'];
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}

/* ================= SCENE 1: "Nobody could pick just one winner!" ================= */
camSet(0,...CAM.wide);
faces(0,'normal','Sm');lookAll(0,-20,-6);
['tf','mc','bo','cm','zp'].forEach((p,i)=>{lookAll(.4+i*.4,(i%2?-1:1)*30,-4);});
tl.fromTo('#sb',{rotation:-1},{rotation:1,duration:.3,yoyo:true,repeat:5},.2);tl.set('#sb',{rotation:0},2.1);
armsDown(.1,.3);

/* ================= SCENE 2: the King: "Then everybody wins the Golden Spatula!" ================= */
camTo(L[2]-.45,.8,...CAM.king,'power2.inOut');
KG.talk(L[2]+.02,L[2]+DU[2]-.06,'mBg','mSm',.14);KG.eyes(L[2],'happy');
tl.to('#kgArmL',{rotation:140,duration:.3,ease:'back.out(2)'},L[2]);tl.to('#kgArmR',{rotation:-140,duration:.3,ease:'back.out(2)'},L[2]);
tl.to('#flyW',{y:1000,x:1640,duration:.6,ease:'back.out(1.6)'},W(2,3));           // the Golden Spatula floats up beside the King
for(let k=0;k<4;k++) sparks(W(2,3)+.3+k*.4,1640,860,6,110);
tl.to('#boArmL',{rotation:-170,duration:.2},W(2,3));tl.to('#boArmR',{rotation:170,duration:.2},W(2,3));
hearts(L[2]+1.2,1640,900,5,120,300);faces(L[2]+1.2,'happy','Big');lookAll(L[2]+.3,30,-20);
armsUp(L[2]+1.6,.15);SQC.forEach((s,i)=>hop(s,L[2]+1.7+i*.05,44,.12,.16));

/* ================= SCENE 3: "So they cooked one giant pancake together." ================= */
camTo(L[3]-.45,.9,...CAM.tow,'power2.inOut');
tl.to('#flyW',{y:BOS2[1],x:BOS2[0],duration:.4},L[3]);tl.to('#gspIn',{rotation:180,duration:.1},L[3]);
tl.set('#stk',{opacity:1},tTower-.01);
for(let i=0;i<NSL;i++){const t=tTower+i*.075;tl.set('#stl'+i,{opacity:1},t);tl.fromTo('#stl'+i,{y:-860},{y:0,duration:.24,ease:'power2.in'},t);}
tl.set('#stkTop',{opacity:1},tTower+NSL*.075+.12);sparks(tTower+NSL*.075+.12,TWK,TWTOP+40,8,170);
armsDown(L[3]-.1,.2);faces(L[3],'happy','Big');lookAll(L[3]+.1,-10,-10);
for(let k=0;k<5;k++) hop('#tfSq',tTower+k*.28,48,.12,.16);
JQ.forEach((s,i)=>hop(s,tTower+.2+i*.1,70,.14,.18));

/* ================= SCENE 4: Truffle: "Needs a pinch more love!" ================= */
camTo(L[4]-.35,.7,...CAM.tru,'power2.inOut');
TF.talk(L[4]+.02,L[4]+DU[4]-.06,'mBg','mSm',.13);TF.eyes(L[4],'happy');
tl.to('#tfArmL',{rotation:140,duration:.2},L[4]);tl.fromTo('#tfArmL',{rotation:140},{rotation:100,duration:.14,yoyo:true,repeat:9},L[4]+.2);
hearts(L[4]+.4,TWK,TWTOP-60,7,100,220,.12);for(let k=0;k<7;k++) tl.fromTo('#stkTop',{scale:1},{scale:1.01,duration:.1,yoyo:true,repeat:1},L[4]+.4+k*.12);
sparks(L[4]+.6,TWK,TWTOP+20,8,150);

/* ================= SCENE 5: Bo: "Just one tiny bite!" ================= */
camTo(L[5]-.3,.6,...CAM.bo,'power2.inOut');
bTalk(L[5]+.02,L[5]+DU[5]-.08);brows(L[5]+.05,0,0,0,.15);eyesMode(L[5]+.05,'happy');look(L[5]+.05,-20,10,.12);
tl.to('#boArmL',{rotation:-90,duration:.2},L[5]);tl.to('#boArmR',{rotation:90,duration:.2},L[5]);
kslice(tBite-.1,TWK,TWTOP+30,1262,1475,.55,1.0);
for(let k=0;k<5;k++) tl.set('#stl'+(NSL-1-k),{opacity:0},tBite+.1+k*.08);tl.set('#stkTop',{opacity:0},tBite+.1);
tl.fromTo('#boSq',{y:0},{y:-30,duration:.12,yoyo:true,repeat:3},tBite+.5);hearts(tBite+.6,1267,1250,4,90,240);

/* ================= SCENE 6: "Fireworks lit up the sky!" — dusk on the lawn, the same marks ================= */
tl.fromTo('#flash',{opacity:.8},{opacity:0,duration:.5},tNight);
tl.set('#skySet',{opacity:1},tNight);tl.set('#fTable,#table,#plate,#oven,#kg,#kcrnW,#kcrn,#sbW,#splatW,#stk',{opacity:0},tNight);
tl.fromTo('#night',{opacity:0},{opacity:.52,duration:.5},tNight);tl.fromTo('#nStars',{opacity:0},{opacity:1,duration:.8},tNight+.2);
tl.fromTo('.nst',{opacity:.3},{opacity:1,duration:.5,yoyo:true,repeat:11,stagger:.07},tNight);
camSet(tNight,...CAM.wide);
tl.set('#flyW',{x:BOS2[0],y:BOS2[1]},tNight);
tl.set('#gh,#ghGlow',{opacity:1},tNight);tl.to('#ghGlow',{opacity:.8,duration:.4},tNight);
faces(tNight+.1,'wide','O');lookAll(tNight+.1,0,-40);armsUp(tNight+.3,.15);
burst(L[6]+.4,900,250,1.5);burst(L[6]+1.1,1900,320,1.4);

/* ================= SCENE 7: Zap: "Beep boop! Three, two, one, boom!" — close on Zap for the countdown, wide for the boom ================= */
camTo(L[7]-.3,.7,...CAM.zap,'power2.inOut');
ZP.talk(L[7]+.02,L[7]+DU[7]-.06,'mBg','mSm',.13);ZP.eyes(L[7],'happy');
tl.fromTo('#zpAnt',{rotation:-14},{rotation:14,duration:.14,yoyo:true,repeat:11},L[7]);tl.set('#zpAnt',{rotation:0},L[7]+DU[7]);
camTo(tBoom-.3,.5,...CAM.wide,'power2.out');
burst(tBoom,1400,150,2.0);burst(tBoom+.18,800,380,1.6);burst(tBoom+.34,2050,420,1.6);
shake(tBoom,8,5);confetti(tBoom+.2,500,2400,ROWB-1500,ROWJ+60,26,.8);

/* ================= SCENE 8: the Jiggles: "Ooh, pretty colors!" ================= */
camTo(L[8]-.3,.8,...CAM.jig,'power2.inOut');
['j1','j2','j3','j4'].forEach((j,i)=>{const J=[J1,J2,J3,J4][i];J.talk(L[8]+.02+i*.03,L[8]+DU[8]-.05,'mBg','mSm',.15);J.eyes(L[8],'happy');tl.to(`#${j}ArmL`,{rotation:150,duration:.15},L[8]);tl.to(`#${j}ArmR`,{rotation:-150,duration:.15},L[8]);});
JQ.forEach((s,i)=>hop(s,L[8]+.1+i*.1,70,.14,.18));
burst(L[8]+.2,1750,700,1.5);burst(L[8]+.7,2200,640,1.5);burst(L[8]+1.2,1950,780,1.3);

/* ================= SCENE 9: "Even Munch waved from far away." — on the far hill, everybody waves back ================= */
camTo(L[9]-.4,1.0,...CAM.mun,'power2.inOut');
tl.set('#mn',{opacity:1},tMunch-.2);MN.eyes(tMunch-.2,'happy');MN.m(tMunch-.2,'mBg');
tl.fromTo('#mn',{y:1360},{y:1280,duration:.5,ease:'back.out(2)'},tMunch-.2);
tl.to('#mnArmR',{rotation:-130,duration:.3},tMunch);tl.fromTo('#mnArmR',{rotation:-130},{rotation:-90,duration:.25,yoyo:true,repeat:9},tMunch+.3);
tl.fromTo('#mnHead',{rotation:-4},{rotation:4,duration:.3,yoyo:true,repeat:7},tMunch);tl.set('#mnHead',{rotation:0},tMunch+2.6);
hearts(tMunch+.4,2280,1000,4,70,200);
lookAll(tMunch,36,-4);
armsDown(tMunch+.1,.2);tl.to('#bpArmR',{rotation:-120,duration:.2},tMunch+.6);tl.fromTo('#bpArmR',{rotation:-120},{rotation:-90,duration:.2,yoyo:true,repeat:7},tMunch+.8);
['j1','j2','j3','j4'].forEach((j,i)=>tl.fromTo(`#${j}ArmR`,{rotation:-150},{rotation:-100,duration:.2,yoyo:true,repeat:7},tMunch+.5+i*.05));
burst(L[9]+1.4,1950,720,1.4);

/* ================= SCENE 10: everybody: "Happy Pancake Festival!" ================= */
camTo(L[10]-.4,.9,...CAM.wide,'power2.inOut');
tl.to('#mnArmR',{rotation:-150,duration:.2},tAll);
armsUp(tAll,.15);faces(tAll,'happy','Big');eyesMode(tAll,'hearts');
SQC.forEach((s,i)=>hop(s,tAll+.1+i*.05,50,.12,.18));JQ.forEach((s,i)=>hop(s,tAll+.15+i*.08,70,.14,.18));
[0,.25,.5,.75,1.0].forEach((d,i)=>burst(tAll+d,700+i*380,120+(i%2)*200,1.8));
confetti(tAll+.1,500,2400,ROWB-1700,ROWJ+60,46,1.2);hearts(tAll+.5,1267,1000,7,160,320);

/* ================= SCENE 11: "And that was the end of Season five!" ================= */
[0,.3,.6,.9,1.2,1.5].forEach((d,i)=>burst(L[11]+d,600+i*320,100+(i%3)*160,1.7));
confetti(L[11]+.3,500,2400,ROWB-1700,ROWJ+60,40,1.4);
SQC.forEach((s,i)=>hop(s,L[11]+.8+i*.05,44,.12,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:6,ease:'sine.inOut'},tStk+.45);
[0,.5,1.0,1.5,2.0].forEach((d,i)=>burst(tStk+d,700+i*350,120+(i%2)*170,1.7));

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

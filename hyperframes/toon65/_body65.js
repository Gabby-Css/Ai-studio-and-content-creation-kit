/* ===== this episode's key moments (all derived from the voice timings) ===== */
// staging: the dark hall; the lights switch on (flash, the dark veil lifts) and Boo's ghost parents are there; Boo is overjoyed; Mama welcomes everybody, Papa starts the party; candy rains from the ceiling; Bo shouts trick-or-treat,
// Mochi grudgingly accepts a lollipop; everybody dances with the ghosts; Boo is happy to be a ghost; "Happy Halloween, everybody!" with fireworks over the hall; the Season-14 end card
const CAM={wide:[380,-220,.53], gh:ECAM('gh',BOO65,.9), gfm:camE(GFM65[0],GFM65[1]-280*GFM65[2],.95,540,780), gfd:camE(GFD65[0],GFD65[1]-280*GFD65[2],.95,540,780), bo:ECAM('bo',M65.bo), mc:ECAM('mc',M65.mc), top:camE(1400,700,.55,540,830), hall:camE(1400,1100,.58,540,830)};
const tStk=L[11]+DU[11]+.45;
spkLife();
tl.fromTo('#ghSq',{y:0},{y:-16,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);
const FR=['tf','zp','mc','cm','bo','pt','bp','nm','gm','wd','pb'];
let fwn=0;
function burst(t,x,y,s=1.5){const i=(fwn++)%6;tl.set('#fwW'+i,{x,y,opacity:1},t);tl.set('#fw'+i,{opacity:1},t);tl.fromTo('#fw'+i,{scale:.15},{scale:s,duration:1.0,ease:'power2.out'},t);tl.to('#fw'+i,{opacity:0,duration:.4},t+.7);tl.set('#fwW'+i,{opacity:0},t+1.12);sparks(t,x,y,6,120);}
// a ghost parent talks: the open-mouth overlay flickers
function ghoTalk(id,t0,t1,st=.14){let k=0;for(let t=t0;t<t1;t+=st,k++)tl.set(`#${id}M`,{opacity:k%2?0:1},t);tl.set(`#${id}M`,{opacity:0},t1);}
const tOn=W(1,3);

/* ================= SCENE 1: "Suddenly, the lights switched on!" — a flash, the dark veil lifts, Boo's parents are standing there ================= */
camSet(0,...CAM.wide);
faces2(0,'wide','O');lookAll2(0,0,-8);shiver('#bpSq',.2,tOn,3);shiver('#ptSq',.3,tOn,3);
tl.fromTo('#flash',{opacity:0},{opacity:.7,duration:.12},tOn-.05);tl.to('#flash',{opacity:0,duration:.5},tOn+.07);tl.to('#crcBlkW',{opacity:0,duration:.35},tOn);
['gfm','gfd'].forEach((g,i)=>{tl.set(`#${g}W`,{opacity:1},tOn+.05+i*.08);tl.fromTo(`#${g}`,{scale:.1},{scale:1,duration:.5,ease:'back.out(2)'},tOn+.05+i*.08);});
dust(tOn+.1,GFM65[0],GFM65[1]+20,2.6);dust(tOn+.18,GFD65[0],GFD65[1]+20,2.6);sparks(tOn+.2,1400,500,16,520);
faces2(tOn+.2,'wide','Big');lookAll2(tOn+.2,24,0);
[['gfm',GFM65],['gfd',GFD65]].forEach(([g,P],i)=>tl.fromTo(`#${g}W`,{y:P[1]},{y:P[1]-26,duration:.9+i*.1,yoyo:true,repeat:Math.floor((29.4-tOn-.6)/(.9+i*.1))-1,ease:'sine.inOut'},tOn+.6));

/* ================= SCENE 2: Boo: "Mama! Papa! You are here!" ================= */
camTo(L[2]-.45,.7,...CAM.gh,'power2.inOut');
GH.eyes(L[2]+.02,'wide');GH.talk(L[2]+.04,L[2]+DU[2]-.08,'mBg','mSm',.13);GH.brows(L[2]+.02,12,-12,-4,.15);
tl.to('#ghArmL',{rotation:140,duration:.2},L[2]+.2);tl.to('#ghArmR',{rotation:-140,duration:.2},L[2]+.2);tl.to('#ghGlow',{opacity:.9,scale:2.4,duration:.4},L[2]+.2);tl.to('#ghGlow',{opacity:.28,scale:1.2,duration:.3},L[3]);hop('#ghSq',W(2,3),50,.12,.16);hearts(W(2,4),BOO65[0]+200,BOO65[1]-400,6,160,260);

/* ================= SCENE 3: Mama: "Welcome, Boo, and welcome friends!" ================= */
camTo(L[3]-.45,.7,...CAM.gfm,'power2.inOut');
ghoTalk('gfm',L[3]+.04,L[3]+DU[3]-.06);tl.fromTo('#gfmB',{rotation:-3},{rotation:3,duration:.4,yoyo:true,repeat:Math.floor(DU[3]/.4)+1,ease:'sine.inOut'},L[3]);
hearts(W(3,4),GFM65[0],GFM65[1]-420,5,100,240);

/* ================= SCENE 4: Papa: "Happy Halloween! Let's party!" ================= */
camTo(L[4]-.45,.7,...CAM.gfd,'power2.inOut');
ghoTalk('gfd',L[4]+.04,L[4]+DU[4]-.06);tl.fromTo('#gfdB',{rotation:-3},{rotation:3,duration:.4,yoyo:true,repeat:Math.floor(DU[4]/.4)+1,ease:'sine.inOut'},L[4]);
confetti(W(4,2),900,2300,500,1800,30,.8);sparks(W(4,2),GFD65[0],GFD65[1]-460,12,240);

/* ================= SCENE 5: "Candy rained down from the ceiling!" — twelve candies fall and bounce ================= */
camTo(L[5]-.45,.7,...CAM.top,'power2.inOut');
for(let k=0;k<12;k++){const t0=L[5]+.25+k*.09,x=520+((k*389)%1800),yl=1960+((k*127)%200),dur=.8+(k%3)*.1;
 tl.set('#cdyW'+k,{opacity:1,x,y:-300,scale:1.2},t0);tl.fromTo('#cdyW'+k,{y:-300},{y:yl,duration:dur,ease:'power1.in'},t0);tl.fromTo('#cdy'+k,{rotation:0},{rotation:(k%2?-1:1)*480,duration:dur,ease:'none'},t0);
 arc('#cdyW'+k,t0+dur,.4,yl,60,yl);sparks(t0+dur,x,yl-30,3,60);tl.to('#cdyW'+k,{opacity:0,duration:.4},t0+dur+1.6+(k%4)*.15);}
faces2(L[5]+.3,'wide','Big');lookAll2(L[5]+.3,0,-34);armsUp(L[5]+.6,.15);

/* ================= SCENE 6: Bo: "Trick or treat! Who wants candy?" ================= */
camTo(L[6]-.45,.7,...CAM.bo,'power2.inOut');
bTalk(L[6]+.02,L[6]+DU[6]-.06);eyesMode(L[6]+.02,'hearts');brows(L[6]+.05,0,0,-4,.15);
tl.to('#boArmL',{rotation:-160,duration:.18},L[6]+.2);tl.to('#boArmR',{rotation:160,duration:.18},L[6]+.2);hop('#boSq',W(6,0),50,.12,.16);hop('#boSq',W(6,3),60,.14,.18);hearts(W(6,3),M65.bo[0],M65.bo[1]-480,5,90,240);

/* ================= SCENE 7: Mochi: "Hmph. Candy is acceptable. Obviously." — she holds a lollipop ================= */
tl.to('#boArmL,#boArmR',{rotation:0,duration:.2},L[7]-.3);
camTo(L[7]-.45,.7,...CAM.mc,'power2.inOut');
MC.m(L[7]+.1,'mFr');MC.talk(L[7]+.12,L[7]+DU[7]-.08,'mOp','mFr',.16);mcEyes(L[7]+.15,'lids');MC.brows(L[7]+.1,8,-8,2,.2);
tl.set('#cdyW0',{opacity:1,x:M65.mc[0]+150,y:M65.mc[1]-140,scale:1.1},L[7]);tl.fromTo('#cdy0',{rotation:20},{rotation:-10,duration:.4,yoyo:true,repeat:5,ease:'sine.inOut'},L[7]);tl.to('#mcArmR',{rotation:-70,duration:.2},L[7]+.3);
mcEyes(W(7,4)+.4,'happy');MC.m(W(7,4)+.4,'mSm');MC.brows(W(7,4)+.4,0,0,0,.2);sparks(W(7,4)+.5,M65.mc[0],M65.mc[1]-440,6,110);

/* ================= SCENE 8: "The ghosts danced with everybody!" — everybody sways, the ghosts float in loops ================= */
tl.to('#mcArmR',{rotation:0,duration:.2},L[8]-.3);tl.set('#cdyW0',{opacity:0},L[8]-.2);
camTo(L[8]-.45,.7,...CAM.hall,'power2.inOut');
mcEyes(L[8]-.1,'happy');faces2(L[8]-.05,'happy','Big');lookAll2(L[8]-.05,10,0);
FR.forEach((p,i)=>{tl.fromTo(`#${p}Sq`,{rotation:-6},{rotation:6,duration:.34,yoyo:true,repeat:Math.floor((L[9]-L[8]+.4)/.34)-1,ease:'sine.inOut'},L[8]+i*.03);hop(`#${p}Sq`,L[8]+.3+i*.04,0,.1,.1);});
['gfm','gfd'].forEach((g,i)=>{tl.fromTo(`#${g}B`,{rotation:-9},{rotation:9,duration:.4+i*.04,yoyo:true,repeat:Math.floor((L[9]-L[8]+.4)/(.4+i*.04))-1,ease:'sine.inOut'},L[8]+.1);hop(`#${g}`,L[8]+.4+i*.2,70,.18,.22);hop(`#${g}`,L[8]+1.3+i*.2,70,.18,.22);});
tl.fromTo('#gh',{rotation:0},{rotation:360,duration:.9,ease:'sine.inOut'},L[8]+.4);confetti(L[8]+.3,900,2300,500,1800,34,.9);hearts(L[8]+.5,1400,1700,6,320,260);

/* ================= SCENE 9: Boo: "Being a ghost is great!" ================= */
camTo(L[9]-.45,.7,...CAM.gh,'power2.inOut');
tl.to('#gh',{rotation:0,duration:.01},L[9]-.3);
GH.eyes(L[9]+.02,'happy');GH.talk(L[9]+.04,L[9]+DU[9]-.08,'mBg','mSm',.13);GH.brows(L[9]+.02,0,0,0,.2);
tl.to('#ghArmL',{rotation:140,duration:.2},L[9]+.2);tl.to('#ghArmR',{rotation:-140,duration:.2},L[9]+.2);tl.to('#ghGlow',{opacity:1,scale:2.8,duration:.4},L[9]+.1);tl.to('#ghGlow',{opacity:.28,scale:1.2,duration:.3},L[10]);
hearts(W(9,3),BOO65[0],BOO65[1]-420,6,180,260);sparks(W(9,4),BOO65[0],BOO65[1]-300,10,200);

/* ================= SCENE 10: everybody: "Happy Halloween, everybody!" — fireworks over the hall ================= */
camTo(L[10]-.45,.7,...CAM.wide,'power2.inOut');
faces2(L[10]-.05,'happy','Big');armsUp(L[10]+.05,.15);['wd','pb'].forEach(p=>{tl.to(`#${p}ArmL`,{rotation:140,duration:.15},L[10]+.05);tl.to(`#${p}ArmR`,{rotation:-140,duration:.15},L[10]+.05);});
SQC.concat(['#wdSq','#pbSq']).forEach((s,i)=>hop(s,L[10]+.1+i*.03,45,.14,.18));
[[1400,200,2.0],[800,360,1.6],[2050,380,1.6]].forEach(([x,y,s],i)=>burst(L[10]+.1+i*.3,x,y,s));confetti(L[10]+.1,900,2300,500,2000,40,1.0);

/* ================= SCENE 11: "And that was the end of Season thirteen!" — the big finale ================= */
camTo(L[11]-.4,.8,...CAM.wide,'power2.inOut');
[[1100,150,1.8],[1750,300,1.8],[1400,480,1.5],[600,300,1.5],[2200,200,1.6],[1400,120,2.1]].forEach(([x,y,s],i)=>burst(L[11]+.1+i*.36,x,y,s));
confetti(L[11]+.3,900,2300,500,2000,40,1.0);hearts(L[11]+.4,1500,ROWD-330,8,400,280);
SQC.forEach((s,i)=>hop(s,L[11]+.5+i*.05,40,.14,.18));
// the sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);

window.__timelines=window.__timelines||{};window.__timelines.main=wrapDepth(tl);
</script>
</body></html>

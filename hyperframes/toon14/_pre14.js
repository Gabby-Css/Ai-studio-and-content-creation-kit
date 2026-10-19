/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* --- small helpers --- */
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const cmEyes=(t,mode)=>{
 tl.set('#cmEyes',{opacity:(mode==='happy'||mode==='dizzy')?0:1},t);
 tl.set('#cmEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#cmEyesDizzy',{opacity:mode==='dizzy'?1:0},t);
 if(mode==='normal'||mode==='wide'){tl.to('.cmEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.cmPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const GS4=[J1,J2,J3,J4];
const lookAll=(t,dx,dy)=>{look(t,dx,dy,.12);FB.look(t,dx*.6,dy*.5,.12);MC.look(t,dx,dy,.12);NN.look(t,dx,dy,.12);TF.look(t,dx,dy,.12);CM.look(t,dx,dy,.12);GM.look(t,dx,dy,.12);GH.look(t,dx,dy,.12);BP.look(t,dx,dy,.12);ZP.look(t,dx,dy,.12);PT.look(t,dx,dy,.12);GS4.forEach(g=>g.look(t,dx,dy,.12));RK.look(t,dx,dy,.12);};
const hop=(sq,t0,h,up=.3,down=.3)=>{tl.fromTo(sq,{y:0},{y:-h,duration:up,ease:'power2.out'},t0).to(sq,{y:0,duration:down,ease:'power2.in'},t0+up);};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};
const ALL=['tf','nm','mc','cm','gm','bp','zp','pt'];
const GN=['j1','j2','j3','j4'];
const SQALL=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const armsDown=(t,d=.25)=>{tl.to('#boArmL',{rotation:0,duration:d},t);tl.to('#boArmR',{rotation:0,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:0,duration:d},t);tl.to(`#${p}ArmR`,{rotation:0,duration:d},t);});};
const armsUp=(t,d=.15)=>{tl.to('#boArmL',{rotation:-160,duration:d},t);tl.to('#boArmR',{rotation:160,duration:d},t);ALL.forEach(p=>{tl.to(`#${p}ArmL`,{rotation:150,duration:d},t);tl.to(`#${p}ArmR`,{rotation:-150,duration:d},t);});};
const faces=(t,eyes,mouth)=>{                              // eyes: wide|normal|happy   mouth: O|Big|Sm|Fr
 const m={O:['mO','mO'],Big:['mBg','mBig'],Sm:['mSm','mSmile'],Fr:['mFr','mFrown']}[mouth];
 eyesMode(t,eyes==='happy'?'hearts':eyes);bm(t,m[1]);FB.pm(t,{O:'Oh',Big:'Gr',Sm:'Sm',Fr:'Wo'}[mouth]);
 TF.eyes(t,eyes);TF.m(t,m[0]);NN.eyes(t,eyes);NN.m(t,m[0]);cmEyes(t,eyes);CM.m(t,m[0]);mcEyes(t,eyes);MC.m(t,m[0]);
 GM.eyes(t,eyes);GM.m(t,m[0]);BP.eyes(t,eyes);BP.m(t,m[0]);ZP.eyes(t,eyes);ZP.m(t,m[0]);PT.eyes(t,eyes);PT.m(t,m[0]);GH.eyes(t,eyes);GH.m(t,m[0]);
 GS4.forEach(g=>{g.eyes(t,eyes);g.m(t,m[0]);});};
let dsn=0;
function dust(t,x,y,sc=1){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.95,scale:.3*sc,y:0},{opacity:0,scale:1.1*sc,y:-40,duration:.5,ease:'power2.out'},t);}
let spn=0;
function sprinkle(t,x,yt,yb,n=8){for(let k=0;k<n;k++){const i=(spn++)%18,xx=x+((k*37)%160)-80,tt=t+k*.07;
 tl.set('#spw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#spr'+i,{opacity:1,y:0,rotation:0},{y:yb-yt,rotation:360+(k%3)*90,duration:.7,ease:'power1.in'},tt);
 tl.set('#spr'+i,{opacity:0},tt+.7);}}
let ksn=0;
function kslice(t,x0,y0,x1,y1,dur=.6,sc=1){const i=(ksn++)%8;
 tl.set('#ksw'+i,{x:x0,y:y0},t);
 tl.fromTo('#ks'+i,{opacity:1,x:0,rotation:-20,scale:sc*.9},{x:x1-x0,rotation:340,duration:dur,ease:'none'},t);
 tl.fromTo('#ks'+i,{y:0},{y:-220,duration:dur*.45,ease:'power2.out'},t).to('#ks'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#ks'+i,{opacity:0},t+dur);}

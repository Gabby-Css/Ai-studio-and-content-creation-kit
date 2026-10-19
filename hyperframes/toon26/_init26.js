/* ---- starting state of #26 = the last frame of #25, the morning after: the gang on their lawn marks, Munch is walking away over the hill, and Munch's giant gray egg sits on the lawn ----
   Season-6 shared helpers live here (bodies #26-#30 must not redeclare them): runTo, confetti, bTalk, SQC, JQ, pingAt, eggWobble, eggBump, crack, lookAll2, faces2, EGX/EGY/EGS, MN, PB */
const EGX=1100, EGY=ROWD, EGS=.95, PBS=.42;                        // the egg's mark: front of the stage, between Mochi and Zap
const SQC=['#boSq','#tfSq','#nmSq','#cmSq','#mcSq','#bpSq','#zpSq','#ptSq','#gmSq'];
const JQ=['#j1Sq','#j2Sq','#j3Sq','#j4Sq'];
const bTalk=(t0,t1,a='mOpen',b='mSmile',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)bm(t,k%2?b:a);bm(t1,'mSmile');};
let cfn=0;
function confetti(t,x0,x1,yt,yb,n=20,spread=.5){for(let k=0;k<n;k++){const i=(cfn++)%40,xx=x0+((k*97)%100)/100*(x1-x0),tt=t+((k*13)%10)/10*spread;
 tl.set('#cfw'+i,{x:xx,y:yt},tt);
 tl.fromTo('#cf'+i,{opacity:1,y:0,x:0,rotation:0},{y:yb-yt,x:((k%5)-2)*40,rotation:360*((k%3)+1),duration:1.6+((k*7)%5)*.15,ease:'sine.in'},tt);
 tl.set('#cf'+i,{opacity:0},tt+2.2);}}
function runTo(p,x,y,t0,dur,s,legAmp=22){const id='#'+p;
 tl.to(id,{x:x,y:y,duration:dur,ease:'sine.inOut'},t0);
 cycle([`${id}LegL`,`${id}LegR`],[`${id}ArmL`,`${id}ArmR`],t0,t0+dur,.24,legAmp,10,`${id}Sq`,8);}
let rgn=0;
const pingAt=(t,x,y)=>{const i=(rgn++)%4;tl.set('#rgw'+i,{x,y},t);tl.fromTo('#rg'+i,{opacity:1,scale:.3},{opacity:0,scale:3.2,duration:.8,ease:'power1.out'},t);};
// the egg rocks around its ground point / hops / grows a crack (dash-reveal, `to` = how much of the crack is drawn)
function eggWobble(t,amp=4,n=6,d=.09){tl.fromTo('#eggWob',{rotation:-amp},{rotation:amp,duration:d,yoyo:true,repeat:n-1,ease:'sine.inOut'},t);tl.to('#eggWob',{rotation:0,duration:.1},t+n*d);}
function eggBump(t,h=36){tl.fromTo('#eggHop',{y:0},{y:-h,duration:.1,ease:'power2.out'},t);tl.to('#eggHop',{y:0,duration:.14,ease:'power2.in'},t+.1);}
const crack=(id,t,to=1,d=.35)=>{tl.set('#'+id,{opacity:1},t);tl.to('#'+id,{strokeDashoffset:1-to,duration:d,ease:'power1.out'},t);};

// ---- new props go into the depth layer so they sort with the characters (the egg, its inner back wall, baby Pebble)
DEPTH.lay.insertAdjacentHTML('beforeend',EGG_HTML+EGGBACK_HTML+`<g id="pbMount" filter="url(#fSat)">${tintGum('pb',PBC)}</g>`);
DEPTH.lay.insertAdjacentHTML('beforeend',BN_HTML);
DEPTH.items.push({g:document.getElementById('eggW'),el:document.getElementById('eggW'),i:20},{g:document.getElementById('eggBackW'),el:document.getElementById('eggBackW'),i:21},{g:document.getElementById('pbMount'),el:document.getElementById('pb'),i:22});
gsap.set('#eggW,#eggHop,#eggWob,#eggRoll,#eggCap,#eggBase,#blanket,#note',{svgOrigin:'0 0'});gsap.set('#eggBackW,#eggBackIn',{svgOrigin:'0 0'});
gsap.set('#eggW',{opacity:1,x:EGX,y:EGY,scale:EGS});gsap.set('#eggFull',{opacity:1});gsap.set('#eggBase,#eggCap,#eggGlow,#eggHeat,#noteW,#blanketW,.ecr',{opacity:0});gsap.set('#eggBackW',{opacity:0,x:EGX,y:EGY-30,scale:EGS});
gsap.set('#bnW',{opacity:0,x:2070,y:1180});gsap.set('#bn',{svgOrigin:'0 0'});
// baby Pebble: tiny, hidden until the egg hatches
for(const p of ['pb']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#pb',{opacity:0,x:EGX,y:EGY-20,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});gsap.set('#pbTear,#pbSweat',{opacity:0});
const MN=mkRock('mn'), PB=mkRock('pb');
const lookAll2=(t,dx,dy)=>{lookAll(t,dx,dy);PB.look(t,dx,dy,.12);MN.look(t,dx,dy,.12);};
const faces2=(t,eyes,mouth)=>{faces(t,eyes,mouth);PB.eyes(t,eyes);PB.m(t,{O:'mO',Big:'mBg',Sm:'mSm',Fr:'mFr'}[mouth]);};

// ---- the gang on their marks (the same marks as the end of #25), arms down; the Jiggles in their row
const END25={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1700,ROWB,.7],cm:[2050,ROWB,.76],
             mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1700,ROWD,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(END25)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
for(const [j,x] of Object.entries({j1:1800,j2:1950,j3:2150,j4:2300})){gsap.set('#'+j,{opacity:1,x,y:ROWJ,scale:.55});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.3});
// the lawn by day (the kitchen, the scoreboard, the fireworks and the night are gone)
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#fwW0,#fwW1,#fwW2,#fwW3,#fwW4,#fwW5',{opacity:0});
gsap.set('#fTable,#table,#plate,#oven,#kg,#kcrnW,#kcrn,#sbW,#splatW,#stk,#flyW,#mcHat,#mcMag',{opacity:0});
// Munch, tiny and far away on the right-hand hill (walking home)
gsap.set('#mn',{opacity:1,x:2280,y:1280,scale:.42});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});

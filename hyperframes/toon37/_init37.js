/* ---- starting state of #37 (Season 8, "Rough Seas"): the pancake boat on the open sea, the crew on deck, the treasure map pinned to the mast; Rocky is hidden in the snack crate ----
   shared helpers of the sea scenes (bodies #37-#40 must not redeclare them): spray, EYE.rk/EH.rk, the Rocky adoption into the depth layer */
document.getElementById('setMount').insertAdjacentHTML('beforeend',SEA_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',WND_HTML+WSP_HTML+ACH_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',SNK_HTML);
DEPTH.items.push({g:document.getElementById('snkW'),el:document.getElementById('snkW'),i:61},{g:document.getElementById('rkMount'),el:document.getElementById('rk'),i:62});
EYE.rk=[0,-400];EH.rk=400;                                  // Rocky's eye height (measured by the preflight)
gsap.set('#bgW,#bg,#bgS0,#bgS1,#bgS2,#bgBut,#oarL,#oarR,#snkW,#snk,#achW,#ach,#isleW',{svgOrigin:'0 0'});gsap.set('#bgDr',{svgOrigin:'0 100'});gsap.set('#isle',{svgOrigin:'0 40'});
gsap.set('#bgMast',{svgOrigin:'0 20'});gsap.set('#bgSail',{svgOrigin:'18 -940'});gsap.set('#bgFlag',{svgOrigin:'18 -974'});gsap.set('#snkLid',{svgOrigin:'-166 -226'});
gsap.set('.gust',{svgOrigin:'0 0'});
let wspn=0;
// a fountain of water drops at (x,y)
function spray(t,x,y,s=1){const g=(wspn++)%3;tl.set('#wspW'+g,{x,y,opacity:1},t);
 for(let k=0;k<7;k++){const dx=(k-3)*62*s,h=(170+(k%3)*80)*s;
  tl.fromTo(`#wsp${g}_${k}`,{x:0,y:0,opacity:1,scale:.6},{x:dx*.6,y:-h,duration:.28,ease:'power2.out'},t);
  tl.to(`#wsp${g}_${k}`,{x:dx,y:50*s,opacity:0,scale:.9,duration:.34,ease:'power2.in'},t+.28);}
 tl.set('#wspW'+g,{opacity:0},t+.75);}
resetStage();
gsap.set('#skySet,#raceSet,#isleW,#fireW,#btW,#thW,#wndW,#achW',{opacity:0});gsap.set('#seaSet',{opacity:1});
gsap.set('#bgW',{x:1300,y:1830,scale:1});gsap.set('#bgS0,#bgS1,#bgS2,#bgMast,#bgSail,#bgFlag,#bgDr,#bgBut',{opacity:1});
gsap.set('#isleW',{x:1950,y:1180,scale:.1});
// ---- the crew on deck (the deck is an ellipse around (1300,1830), 1800 wide, 600 deep: every mark below stands on it)
const M37={gm:[700,ROWB,1.05],pt:[1080,ROWB,.7],cm:[1500,ROWB,.76],bp:[1880,ROWB,.66],
           tf:[930,ROWF,.74],mc:[1300,ROWF,.74],nm:[1790,ROWF,.54],bo:[1130,ROWD+BOY,.88],zp:[1620,ROWD,.7]};
setMarks(M37);
gsap.set('#j1,#j2,#j3,#j4,#mn,#fireW',{opacity:0});
gsap.set('#pb',{opacity:1,x:900,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1050,y:1250,scale:.8});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#snkW',{opacity:1,x:1830,y:1930,scale:.9});gsap.set('#snkLid',{rotation:0,y:0});
gsap.set('#rk',{opacity:0,x:1830,y:1890,scale:.8});gsap.set('#rkSq',{y:260});gsap.set('#rkArmL',{rotation:0});gsap.set('#rkArmR',{rotation:0});
gsap.set('#mapW',{opacity:1,x:1300,y:1250});gsap.set('#map',{scale:.3,rotation:0,y:0});gsap.set('#mapSc',{scaleY:1});gsap.set('.mdot',{opacity:1,scale:1});gsap.set('.mx1,.mx2',{strokeDashoffset:0});

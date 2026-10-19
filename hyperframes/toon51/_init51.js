/* ---- starting state of #51 ("Beach Day", Season 11 opener): the last snowy morning on the lawn; the sun melts the snow (the snow set fades out), later the crew marches to the beach (the beach set fades in).
   Season-11 shared bits (bodies #51-#55 must not redeclare them): beachRun(), beachLife(), sweatDrops(), S11_OFF, the props from _defs51, the penguin family (pm, pd, pk + PMN/PDN/PKN), EYE.mn/EYE.pb ---- */
const BSET=document.getElementById('setMount');
BSET.insertAdjacentHTML('beforeend',BEACH_HTML+UMB_HTML+SANDC_HTML+TW_HTML+SIGN_HTML+ICB_HTML+DUNE_HTML);
BSET.appendChild(document.getElementById('standW'));          // the stand must sit ABOVE the beach background
document.getElementById('fxMount').insertAdjacentHTML('beforeend',BALL_HTML+SWD_HTML+CONE_HTML+WAVE_HTML+BOTTLE_HTML+LETTER_HTML+PUD_HTML+BK_HTML);
const S11_FX=['bttCork','umb','sc','scTop','tw0','tw1','tw2','tw3','tw4','sgn','sgnPL','sgnPR','sgnB','icb','dune','ball','wv','btt','ltr','stand'].concat([0,1,2].map(i=>'swd'+i),[0,1,2,3,4,5].map(i=>'pud'+i),[0,1,2,3].map(i=>'bk'+i));
gsap.set(S11_FX.map(id=>'#'+id).join(',')+','+S11_FX.map(id=>'#'+id+'W').join(',')+',#bcSun,#bcSunR,#bcSunM,#bcShore,#bcWv,#bcCloudW,#bcFar,#bcMid,#bcGnd',{svgOrigin:'0 0'});
gsap.set(S11_FX.map(id=>'#'+id+'W').join(','),{opacity:0});gsap.set('#beachSet',{opacity:0});
gsap.set([0,1,2,3,4,5,6,7].map(i=>`#cnW${i},#cn${i}`).join(','),{svgOrigin:'0 0'});gsap.set([0,1,2,3,4,5,6,7].map(i=>`#cnW${i}`).join(','),{opacity:0});
gsap.set('#wspW0 circle,#wspW1 circle,#wspW2 circle',{fill:'#EAFBFF'});                // the spray drops are water again (they were syrup in #47)
// the penguin family (Waddles' recolour of the Flapjack rig): mom pm, dad pd, little sister pk
['pm','pd','pk'].forEach((p,i)=>{DEPTH.lay.insertAdjacentHTML('beforeend',`<g id="${p}Mount">${penguinSVG(p)}</g>`);document.getElementById(p+'Sq').insertAdjacentHTML('beforeend',PG_ACC[p]);
 DEPTH.items.push({g:document.getElementById(p+'Mount'),el:document.getElementById(p),i:93+i});
 gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});EYE[p]=[0,-62];EH[p]=62;gsap.set('#'+p,{opacity:0,x:3400,y:2000,scale:.9});});
const PMN=mkPan('pm'),PDN=mkPan('pd'),PKN=mkPan('pk');
EYE.mn=[0,-544];EH.mn=544;EYE.pb=[0,-544];                    // measured with eyeprobe.cjs (Munch + Pebble share Gumdrop's rock rig)
// Munch joins the depth layer (so characters in front of him really are drawn in front)
if(!document.getElementById('mnMount')){const m=document.createElementNS('http://www.w3.org/2000/svg','g');m.id='mnMount';DEPTH.lay.appendChild(m);m.appendChild(document.getElementById('mn'));DEPTH.items.push({g:m,el:document.getElementById('mn'),i:91});}
// everything of the older seasons that must be off on a beach day
const S11_OFF='#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#cmrW,#polW,#pkW,#vfW,#cntW,#sldW,#snmW,#sysW,#btlW,#zbW,#rkicW,#shdW,#wf0W,#wf1W,#wf2W,#wf3W,#scfW,#sbW,#mgW,#ntW,#castW,#snpW,#dgW,#pstW,#mgW0,#mgW1,#mgW2,#mgW3,#mgW4,#bskW,#fireW,#cz1,#cz2,#cz3,#kg,#gma,#mn,#thermW,#flash,#night,#nStars,#duskR,#coldR';
// the beach scenery scrolls behind a still camera (#51 march): same speed-profile trick as the snow run of #48
function beachRun(pts,T){const N=600,s=[0];
 const v=(t)=>{for(let i=1;i<pts.length;i++)if(t<=pts[i][0]){const [t0,v0]=pts[i-1],[t1,v1]=pts[i];return v0+(v1-v0)*(t-t0)/Math.max(1e-6,t1-t0);}return pts[pts.length-1][1];};
 for(let i=1;i<=N;i++){const t=T*i/N;s.push(s[i-1]+(v(t-T/N/2))*T/N);}
 const D=s[N],ease=(p)=>{const f=p*N,i=Math.min(N-1,Math.floor(f));return (s[i]+(s[i+1]-s[i])*(f-i))/D;};
 [['#bcGnd',600,1],['#bcMid',1200,.5],['#bcFar',1800,.22]].forEach(([id,P,m])=>tl.to(id,{x:-D*m,duration:T,ease,modifiers:{x:wrapPx(P)}},0));
 return {D,ease,T,dist:(t)=>ease(t/T)*D};}
// the living beach: foam, clouds, spinning sun rays, lapping shore (call once per episode)
function beachLife(){tl.to('#bcWv',{x:60,duration:2.2,yoyo:true,repeat:12,ease:'sine.inOut'},0);tl.to('#bcCloudW',{x:-400,duration:30,ease:'none'},0);tl.to('#bcSunR',{rotation:360,duration:30,ease:'none'},0);tl.to('#bcShore',{y:14,duration:1.6,yoyo:true,repeat:17,ease:'sine.inOut'},0);}
// sweat drops running down a hot character (x,y = where the drops start)
function sweatDrops(t0,t1,x,y,s=1){let k=0;for(let t=t0;t<t1-.5;t+=.45,k++){const i=k%3,dx=(k%2?1:-1)*(30+(k%3)*18)*s;tl.set(`#swd${i}W`,{opacity:1,x:x+dx,y,scale:s},t);tl.fromTo(`#swd${i}`,{scale:.3,y:0,opacity:1},{scale:1,y:110*s,opacity:.1,duration:.5,ease:'power1.in'},t);tl.set(`#swd${i}W`,{opacity:0},t+.52);}}
// an arm that waves between two angles until t1, then drops back to 0 (no tween outlives its scene)
const waveArm=(sel,t0,t1,a,b,per=.25)=>{const n=Math.max(1,Math.floor((t1-t0)/per));tl.fromTo(sel,{rotation:a},{rotation:b,duration:per,yoyo:true,repeat:n-1,ease:'sine.inOut'},t0);tl.to(sel,{rotation:0,duration:.2},t0+n*per);};
const ALLC=['bo','tf','mc','cm','gm','bp','zp','pt','nm','rk','pan','nb','wd','pb'];     // everybody who can march
const marchAll=(t0,t1)=>ALLC.forEach((p,i)=>cycle([`#${p}LegL`,`#${p}LegR`],[`#${p}ArmL`,`#${p}ArmR`],t0+i*.02,t1,.24,14,8,`#${p}Sq`,6));
document.querySelector('#thermW text').setAttribute('font-size','62');
resetStage();
gsap.set(S11_OFF,{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#snowSet',{opacity:1});gsap.set('#coldR',{opacity:.1});gsap.set('#snf0,#snf1,#snf2',{opacity:.95});
const M51={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],rk:[1240,ROWB,.8],cm:[1640,ROWB,.76],nm:[1960,ROWB,.54],
           tf:[840,ROWF,.74],mc:[1120,ROWF,.74],bp:[1440,ROWF,.66],zp:[1800,ROWF,.7],
           bo:[640,ROWD+BOY,.88],pan:[1180,ROWD-50,.9],nb:[2240,ROWD+10,.8]};
const PB51=[920,ROWD+14,PBS], WD51=[1480,ROWD-50,.9];
setMarks(M51);
gsap.set('#wd',{opacity:1,x:WD51[0],y:WD51[1],scale:WD51[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB51[0],y:PB51[1],scale:PB51[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:700,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#depthLayer',{y:0});

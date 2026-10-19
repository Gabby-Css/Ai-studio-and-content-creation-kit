/* ---- starting state of #61 ("The Pumpkin Patch", Season 13 "The Spooky Pancake Night" opener): a moonlit night lawn, five carvers on their marks each with an uncarved pumpkin in front of them, Gumdrop's giant pumpkin behind;
   the haunted house is a tiny glowing silhouette on the far hill. Season-13 shared bits (bodies #61-#65 must not redeclare them): the props of _defs61, S13_OFF, startSpooky(M), spkRun(), spkLife(), pmpLit(), batFly() ---- */
document.getElementById('setMount').insertAdjacentHTML('beforeend',SPK_HTML+HOUSE_HTML+HGT_HTML+HALL_HTML+WSD_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',LSR_HTML+BAT_HTML+CND_HTML+CDY_HTML);
PMP_ITEMS.forEach((h,i)=>{DEPTH.lay.insertAdjacentHTML('beforeend',`<g id="pmpM${i}">${h}</g>`);DEPTH.items.push({g:document.getElementById('pmpM'+i),el:document.getElementById('pmpW'+i),i:80+i});});
dz('gfm',GHFM_HTML,88);dz('gfd',GHFD_HTML,89);
const S13_IDS=['hse','hgt','lsr','wsd','cnd','gfm','gfd','spkMoon'].concat(Array.from({length:7},(_,i)=>'pmp'+i),Array.from({length:8},(_,i)=>'bat'+i),Array.from({length:12},(_,i)=>'cdy'+i));
gsap.set(S13_IDS.map(id=>'#'+id).join(',')+','+S13_IDS.map(id=>'#'+id+'W').join(',')+','+Array.from({length:8},(_,i)=>`#batL${i},#batR${i}`).join(','),{svgOrigin:'0 0'});
gsap.set('#spkMoonW,#spkCloudW,#spkFog',{svgOrigin:'0 0'});
gsap.set('#hseDoor',{svgOrigin:'-130 0'});gsap.set('#hgtL',{svgOrigin:'-208 0'});gsap.set('#hgtR',{svgOrigin:'208 0'});
const S13_OFF=S12_OFF+',#ldrW,#spkSet,#hallSet,#hseW,#hgtW,#lsrW,#wsdW,#cndW,#gfmW,#gfdW,'+Array.from({length:7},(_,i)=>'#pmpW'+i).join(',')+','+Array.from({length:8},(_,i)=>'#batW'+i).join(',')+','+Array.from({length:12},(_,i)=>'#cdyW'+i).join(',');
const CAST13=['bo','tf','mc','cm','gm','bp','zp','pt','nm','rk','pan','nb','wd','pb','mn','pm','pd','pk','gh'];
// the night lawn on its marks: M = {id:[x,y,scale]}; everybody not listed is hidden
function startSpooky(M){
 resetStage();gsap.set(S13_OFF,{opacity:0});
 gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2,#beachSet,#crcSet,#tentW',{opacity:0});gsap.set('#spkSet',{opacity:1});
 CAST13.forEach(p=>{if(!M[p])gsap.set('#'+p,{opacity:0});});
 setMarks(M);
 gsap.set('#wdShake,#pdShake,#pmShake,#pkShake,#panShake',{rotation:0});gsap.set('#cmSq',{rotation:0});
 gsap.set('#ghGlow',{opacity:.25});gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
 gsap.set('#spkMoonW',{y:0});gsap.set('#spkCloudW,#spkFog',{x:0});
 if(M.pb){PB.eyes(0,'happy');PB.m(0,'mSm');}
 gsap.set('#depthLayer',{y:0});}
// the night scenery scrolls behind a still camera (the climb to the house, #63): same speed-profile trick as beachRun
function spkRun(pts,T){const N=600,s=[0];
 const v=(t)=>{for(let i=1;i<pts.length;i++)if(t<=pts[i][0]){const [t0,v0]=pts[i-1],[t1,v1]=pts[i];return v0+(v1-v0)*(t-t0)/Math.max(1e-6,t1-t0);}return pts[pts.length-1][1];};
 for(let i=1;i<=N;i++){const t=T*i/N;s.push(s[i-1]+(v(t-T/N/2))*T/N);}
 const D=s[N],ease=(p)=>{const f=p*N,i=Math.min(N-1,Math.floor(f));return (s[i]+(s[i+1]-s[i])*(f-i))/D;};
 [['#spkGnd',600,1],['#spkMid',1200,.5],['#spkFar',1800,.22]].forEach(([id,P,m])=>tl.to(id,{x:-D*m,duration:T,ease,modifiers:{x:wrapPx(P)}},0));
 return {D,ease,T,dist:(t)=>ease(t/T)*D};}
// the living night: drifting clouds + fog, candle flames flicker (every loop <= 30 s)
function spkLife(){tl.to('#spkCloudW',{x:-500,duration:30,ease:'none'},0);tl.to('#spkFog',{x:300,duration:5,yoyo:true,repeat:5,ease:'sine.inOut'},0);tl.to('.flm',{scaleY:1.2,duration:.17,yoyo:true,repeat:171,ease:'sine.inOut'},0);}
// the candle inside pumpkin i lights up (glow fades in and flickers) and its carved face glows
function pmpLit(i,t,flick=true){tl.to('#pmpG'+i,{opacity:1,duration:.4},t);if(flick)tl.fromTo('#pmpG'+i,{scale:.94},{scale:1.06,duration:.21,yoyo:true,repeat:Math.floor((29.2-t)/.21)-1,ease:'sine.inOut'},t+.4);}
// a bat flies from (x0,y0) to (x1,y1) between t0 and t1, flapping its wings
function batFly(i,t0,t1,x0,y0,x1,y1,s=.8){tl.set('#batW'+i,{opacity:1,x:x0,y:y0,scale:s},t0);tl.fromTo('#batW'+i,{x:x0},{x:x1,duration:t1-t0,ease:'none'},t0);tl.fromTo('#batW'+i,{y:y0},{y:y1,duration:t1-t0,ease:'sine.inOut'},t0);
 const n=Math.max(2,Math.floor((t1-t0)/.14));tl.fromTo(`#batL${i}`,{rotation:-30},{rotation:30,duration:.14,yoyo:true,repeat:n,ease:'sine.inOut'},t0);tl.fromTo(`#batR${i}`,{rotation:30},{rotation:-30,duration:.14,yoyo:true,repeat:n,ease:'sine.inOut'},t0);tl.set('#batW'+i,{opacity:0},t1+.05);}
const M61={pt:[900,ROWB,.7],bp:[1300,ROWB,.66],nm:[1680,ROWB,.54],gm:[2250,ROWB,1.05],
           tf:[800,ROWF,.74],zp:[1140,ROWF,.7],mc:[1480,ROWF,.74],cm:[1820,ROWF,.76],bo:[470,ROWD+BOY,.88]};
const P61=[[800,ROWD,.85],[1140,ROWD,.8],[1480,ROWD,.85],[1820,ROWD,.8],[2000,ROWB,1.5]];    // pumpkins: in front of the four carvers + Gumdrop's giant one
startSpooky(M61);
P61.forEach(([x,y,s],i)=>{gsap.set('#pmpW'+i,{opacity:1,x,y,scale:s});gsap.set('#pmpF'+i,{opacity:0});gsap.set('#pmpG'+i,{opacity:0,scale:1});});
gsap.set('#hseW',{opacity:1,x:1900,y:1385,scale:.3});gsap.set('#hse',{scale:1});gsap.set('#hseDoor',{scaleX:1});gsap.set('#hseIn',{opacity:0});
gsap.set('#spkMoonW',{y:900});
gsap.set('#lsrW',{opacity:0});gsap.set('#cndW',{opacity:0});

/* ---- starting state of #56 ("The Big Top", Season 12 opener): the morning after, the sunny beach, the crew + the penguin family on the sand; a giant striped tent appears, then everybody hurries inside
   (the dark circus: the lights come on at the end).
   Season-12 shared bits (bodies #56-#60 must not redeclare them): the props of _defs56 (circus set, tent, pancakes jpc0-11, trapeze, trampoline, magic table, wand, popcorn cart, banner, tower), S12_OFF, proxyTween(), bodyAt(), circusLife(), juggle(), place() ---- */
document.getElementById('setMount').insertAdjacentHTML('beforeend',CIRCUS_HTML+TENT_HTML+TRP_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',JPC_HTML+WAND_HTML+PCK_HTML+BNR_HTML+TWR_HTML+DARK_HTML);
// floor props live in the depth layer, so characters in front of / behind them are drawn correctly
const dz=(id,html,i)=>{DEPTH.lay.insertAdjacentHTML('beforeend',`<g id="${id}Mount">${html}</g>`);DEPTH.items.push({g:document.getElementById(id+'Mount'),el:document.getElementById(id+'W'),i});};
dz('pcn',POPC_HTML,70);dz('mtb',MTB_HTML,71);
DEPTH.lay.insertAdjacentHTML('beforeend',`<g id="trmMount">${TRM_HTML}<g id="trmK"></g></g>`);          // the trampoline's depth key is a dummy at y 2000: whoever lands on it is drawn in front
DEPTH.items.push({g:document.getElementById('trmMount'),el:document.getElementById('trmK'),i:72});
const S12_FX=['trp','trm','mtb','mhat','wand','pcn','bnr','twr','tent','tentFlag'].concat(Array.from({length:12},(_,i)=>'jpc'+i),Array.from({length:8},(_,i)=>'pck'+i));
gsap.set(S12_FX.map(id=>'#'+id).join(',')+','+S12_FX.map(id=>'#'+id+'W').join(',')+',#crcSpL,#crcSpR,#trmK',{svgOrigin:'0 0'});
gsap.set('#crcSpL',{svgOrigin:'700 -380'});gsap.set('#crcSpR',{svgOrigin:'2100 -380'});
gsap.set('#mhatW',{svgOrigin:'0 0'});gsap.set('#bnr',{svgOrigin:'0 130'});
const S12_OFF=S11_OFF+',#umbW,#scW,#tw0W,#tw1W,#tw2W,#tw3W,#tw4W,#sgnW,#icbW,#duneW,#ballW,#wvW,#bttW,#ltrW,#standW,#pm,#pd,#pk,#beachSet,#crcSet,#crcSpotW,#crcCrowd,#crcDarkW,#tentW,#trpW,#trmW,#mtbW,#wandW,#pcnW,#bnrW,#twrW,'
 +[0,1,2,3,4,5,6,7].map(i=>'#cnW'+i).join(',')+','+[0,1,2].map(i=>'#swd'+i+'W').join(',')+','+[0,1,2,3,4,5].map(i=>'#pud'+i+'W').join(',')+','+[0,1,2,3].map(i=>'#bk'+i+'W').join(',')
 +','+Array.from({length:12},(_,i)=>'#jpcW'+i).join(',')+','+Array.from({length:8},(_,i)=>'#pckW'+i).join(',');
// run fn(u), u = 0..1, while the timeline passes [t0,t0+dur]: a setter-driven tween, so it is exact whichever way the playhead moves (same trick as the depth sort)
function proxyTween(t0,dur,fn,ease='none'){const z={_v:0};Object.defineProperty(z,'v',{get(){return this._v;},set(u){this._v=u;fn(u);}});tl.to(z,{v:1,duration:dur,ease},t0);}
// pose a rig so that its BODY CENTRE (Hc*s above the feet, in unscaled units Hc) sits at (cx,cy) and it is turned by r degrees (clockwise)
const bodyAt=(p,s,Hc)=>{const sx=gsap.quickSetter('#'+p,'x','px'),sy=gsap.quickSetter('#'+p,'y','px'),sr=gsap.quickSetter('#'+p+'Sq','rotation','deg');
 return (cx,cy,r)=>{const a=r*Math.PI/180;sx(cx-Hc*s*Math.sin(a));sy(cy+Hc*s*Math.cos(a));sr(r);};};
// put a whole cast on new marks at time t (hidden behind a cut / flash)
const placeAt=(M,t)=>{for(const [p,[x,y,s]] of Object.entries(M)) tl.set('#'+p,{x,y,scale:s},t);};
// the living circus: sweeping spotlights, swaying bunting, a fluttering flag on the tent (total length of every loop <= 30 s)
function circusLife(){tl.to('#crcSpL',{rotation:4,duration:2.0,yoyo:true,repeat:13,ease:'sine.inOut'},0);tl.to('#crcSpR',{rotation:-4,duration:2.3,yoyo:true,repeat:12,ease:'sine.inOut'},0);
 tl.to('#crcBuntG',{x:18,duration:1.7,yoyo:true,repeat:16,ease:'sine.inOut'},0);tl.to('#tentFlag',{rotation:8,duration:.5,yoyo:true,repeat:58,ease:'sine.inOut'},0);}
// juggling: the pancakes ids[] (numbers of jpc0-11) fly between two hands (xl,xr at height y) in arcs of height h, one throw every d seconds, from t0 until t1
function juggle(t0,t1,xl,xr,y,ids,h=330,d=.52,sc=.9){ids.forEach((id,i)=>{let t=t0+i*d/ids.length*1.0,k=(i%2);
  tl.set('#jpcW'+id,{opacity:1,x:k?xr:xl,y,scale:sc},t0);
  while(t<t1-d*.2){const a=k%2?xr:xl,b=k%2?xl:xr;tl.fromTo('#jpcW'+id,{x:a},{x:b,duration:d,ease:'none'},t);arc('#jpcW'+id,t,d,y,h,y);tl.fromTo('#jpc'+id,{rotation:0},{rotation:k%2?-360:360,duration:d,ease:'none'},t);t+=d;k++;}
  tl.set('#jpcW'+id,{opacity:0},t1+.05);});}
resetStage();
gsap.set(S12_OFF,{opacity:0});
gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2',{opacity:0});gsap.set('#beachSet',{opacity:1});gsap.set('#bcSunM',{y:0});
const M56={gm:[560,ROWB,1.05],pt:[880,ROWB,.7],rk:[1240,ROWB,.8],nm:[2350,ROWB,.54],
           tf:[820,ROWF,.74],mc:[1090,ROWF,.74],bp:[1420,ROWF,.66],zp:[1720,ROWF,.7],cm:[2000,ROWF,.76],
           bo:[600,ROWD+BOY,.88],pan:[1010,ROWD-50,.9],nb:[2260,ROWD+10,.8]};
const PB56=[830,ROWD+14,PBS], WD56=[1290,ROWD-50,.9];
const FAM56={pd:[1550,ROWD-50,1.05],pm:[1790,ROWD-50,.95],pk:[2010,ROWD-30,.62]};
const TENT56=[1400,1600,.95];
setMarks(M56);
gsap.set('#wd',{opacity:1,x:WD56[0],y:WD56[1],scale:WD56[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0,rotation:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB56[0],y:PB56[1],scale:PB56[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:700,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
for(const p of ['pd','pm','pk']){gsap.set('#'+p,{opacity:1,x:FAM56[p][0],y:FAM56[p][1],scale:FAM56[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0,rotation:0});gsap.set(`#${p}Shake`,{rotation:0});}
// the tent is still hidden (it grows out of the sand), the circus props wait at their places
gsap.set('#tentW',{opacity:0,x:TENT56[0],y:TENT56[1],scale:.05});gsap.set('#tent',{scaleY:1});
gsap.set('#trpW',{opacity:0,x:2000,y:-420});gsap.set('#trp',{rotation:0});
gsap.set('#pcnW',{opacity:0,x:1030,y:1900,scale:.8});gsap.set('#mtbW',{opacity:0,x:1850,y:1900,scale:.8});gsap.set('#mhat',{rotation:0,scale:1});
gsap.set('#bnrW',{opacity:0,x:1400,y:-120,scale:1.5});gsap.set('#wandW',{opacity:0});gsap.set('#trmK',{y:2000});gsap.set('#trmW',{opacity:0,x:1400,y:2150,scale:1});gsap.set('#twrW',{opacity:0});
gsap.set('#depthLayer',{y:0});

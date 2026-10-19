/* ---- starting state of #46 (Season 10 opener "Snow Day"): the green lawn - and then the snow arrives (the snow set fades in during scene 1) ----
   Season-10 shared bits (bodies #46-#50 must not redeclare them): snowfall(), snowRun(), shiver(), WD/WDN (Waddles), M46/WD46 marks, the props from _defs46 */
document.getElementById('setMount').insertAdjacentHTML('beforeend',SNOW_HTML+SLED_HTML+STAND_HTML+SNM_HTML+CASTLE_HTML);
const FXS=document.getElementById('fxMount');
FXS.insertAdjacentHTML('afterbegin',SNF_HTML+COLD_HTML);
FXS.insertAdjacentHTML('beforeend',BTL_HTML+SYS_HTML+WAF_HTML+SCF_HTML+SNB_HTML+MUG_HTML+NOTE_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',`<g id="wdMount">${penguinSVG('wd')}</g>`);
document.getElementById('wdSq').insertAdjacentHTML('beforeend',WD_ACC);
DEPTH.items.push({g:document.getElementById('wdMount'),el:document.getElementById('wd'),i:90});
gsap.set('#wd,#wdSq,#wdShake,#wdLegL,#wdLegR,#wdArmL,#wdArmR,.wdEye,.wdEyeW,.wdPupil,#wdBrowL,#wdBrowR',{svgOrigin:'0 0'});EYE.wd=[0,-62];EH.wd=62;
const WDN=mkPan('wd');
gsap.set('#snowSet,#sldW,#sld,#standW,#stand,#snmW,#snm,#castW,#cast,#btlW,#btl,#sysW,#sys,#wfW,#wf,#scfW,#scf,#sbW,#sb,#mgW,#mg,#ntW,#snf0,#snf1,#snf2',{svgOrigin:'0 0'});
gsap.set('#sldW,#standW,#snmW,#castW,#btlW,#sysW,#wfW,#scfW,#sbW,#mgW,#ntW',{opacity:0});gsap.set('#coldR',{opacity:0});
document.querySelector('#thermW text').textContent='-5°';
// falling flakes: three layers that scroll down for the whole episode (wrap every 4000 px so it never ends)
function snowfall(){[[0,1.0],[1,1.6],[2,2.6]].forEach(([k,c])=>tl.to('#snf'+k,{y:4000*c,duration:30,ease:'none',modifiers:{y:wrapPx(4000)}},0));}
// the snow scenery scrolls behind a still camera (#48): one tween per layer, driven by a speed profile pts=[[t,speed],...]
function snowRun(pts,T){const N=600,s=[0];
 const v=(t)=>{for(let i=1;i<pts.length;i++)if(t<=pts[i][0]){const [t0,v0]=pts[i-1],[t1,v1]=pts[i];return v0+(v1-v0)*(t-t0)/Math.max(1e-6,t1-t0);}return pts[pts.length-1][1];};
 for(let i=1;i<=N;i++){const t=T*i/N;s.push(s[i-1]+(v(t-T/N/2))*T/N);}
 const D=s[N],ease=(p)=>{const f=p*N,i=Math.min(N-1,Math.floor(f));return (s[i]+(s[i+1]-s[i])*(f-i))/D;};
 [['#snGnd',600,1],['#snMid',1200,.5],['#snFar',1800,.22]].forEach(([id,P,m])=>tl.to(id,{x:-D*m,duration:T,ease,modifiers:{x:wrapPx(P)}},0));
 return {D,ease,T,dist:(t)=>ease(t/T)*D,ground:(id,x0)=>tl.fromTo(id,{x:x0},{x:x0-D,duration:T,ease},0)};}
const shiver=(sel,t0,t1,a=5)=>{for(let t=t0,k=0;t<t1;t+=.06,k++) tl.set(sel,{x:(k%2?a:-a)},t);tl.set(sel,{x:0},t1);};
function hopInW(p,x0,x1,y,t0,dur,n=4,h=150){tl.fromTo('#'+p,{x:x0},{x:x1,duration:dur,ease:'none'},t0);for(let k=0;k<n;k++)arc('#'+p,t0+k*dur/n,dur/n,y,h,y);}
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#mn,#cmrW,#polW,#pkW,#bskW,#vfW,#cntW',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#duskR',{opacity:0});
const M46={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],rk:[1250,ROWB,.8],cm:[1700,ROWB,.76],nm:[1960,ROWB,.54],
           tf:[880,ROWF,.74],mc:[1150,ROWF,.74],bp:[1500,ROWF,.66],zp:[1850,ROWF,.7],bo:[560,ROWD+BOY,.88],pan:[1080,ROWD-50,.9],nb:[2330,ROWF,.8]};
const CZ46={cz1:[1300,ROWD-50,.9],cz2:[1520,ROWD-50,.9],cz3:[1740,ROWD-50,.9]};
const WD46=[2150,ROWD-50,.9];                                // Waddles' mark
setMarks(M46);
for(const p of ['cz1','cz2','cz3']){gsap.set('#'+p,{opacity:1,x:CZ46[p][0],y:CZ46[p][1],scale:CZ46[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0});gsap.set(`#${p}Shake`,{rotation:0});}
gsap.set('#gma',{opacity:0});gsap.set('#gmaK',{y:ROWF});
gsap.set('#wd',{opacity:0,x:3300,y:WD46[1],scale:WD46[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:800,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#sldW',{opacity:0,x:1500,y:1840});gsap.set('#depthLayer',{y:0});
gsap.set('#thermW',{opacity:0,x:1850,y:1450});gsap.set('#bnsW',{opacity:0});

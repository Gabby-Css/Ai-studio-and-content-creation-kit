/* ---- starting state of #33 = the race goes on down the Pancake Road: a pack of five karts (Mochi in front, Pebble in Bo's kart), scenery scrolling, the syrup river is far behind ----
   shared helper for the scrolling scenes (#33-#35): scrollProfile(pts,T,Dmax) - ONE tween per scenery layer driven by a speed profile pts=[[t,speed],...] (piecewise linear) */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',WHL_HTML+POP_HTML+WRN_HTML);
gsap.set('#whlW,#whl,#whlR,#popW,#pop,#wrnW,#wrn',{svgOrigin:'0 0'});gsap.set('#whlW,#popW,#wrnW',{opacity:0});
function scrollProfile(pts,T){const N=600,s=[0];let tp=0;
 const v=(t)=>{for(let i=1;i<pts.length;i++)if(t<=pts[i][0]){const [t0,v0]=pts[i-1],[t1,v1]=pts[i];return v0+(v1-v0)*(t-t0)/Math.max(1e-6,t1-t0);}return pts[pts.length-1][1];};
 for(let i=1;i<=N;i++){const t=T*i/N;s.push(s[i-1]+(v(t-T/N/2))*T/N);}
 const D=s[N],ease=(p)=>{const f=p*N,i=Math.min(N-1,Math.floor(f));return (s[i]+(s[i+1]-s[i])*(f-i))/D;};
 const LAY=[['#rsDash',300,1],['#rsFence',600,1],['#rsMid',1200,.5],['#rsFar',1800,.22],['#rsCloud',2400,.1]];
 LAY.forEach(([id,P,m])=>tl.to(id,{x:-D*m,duration:T,ease,modifiers:{x:wrapPx(P)}},0));
 return {D,ease,T,dist:(t)=>ease(t/T)*D,ground:(id,x0)=>tl.fromTo(id,{x:x0},{x:x0-D,duration:T,ease},0)};}      // ground(id,x0): a ground object that moves with the scenery
// (FEET, KY, EYEY, PK come from #32's init)
const bx=(x)=>chPos('bo',x-6,0)[0];                        // Bo's character x for a kart centred at x
function driveBo(t0,dur,x1,ease='sine.inOut',y1){          // Bo's kart + Bo + Pebble together (y1 = new lane, optional)
 const ky=y1===undefined?KY('bo'):y1+KRC.bo.b, by=y1===undefined?chPos('bo',0,FEET('bo'))[1]:chPos('bo',0,y1-34)[1];
 tl.to('#kboW',{x:x1,duration:dur,ease},t0);tl.to('#bo',{x:bx(x1),duration:dur,ease},t0);tl.to('#pb',{x:x1+PK[0],duration:dur,ease},t0);
 if(y1!==undefined){tl.to('#kboW',{y:ky,duration:dur,ease},t0);tl.to('#bo',{y:by,duration:dur,ease},t0);tl.to('#pb',{y:y1-34+PK[1],duration:dur,ease},t0);}}
// ---- the stage: the road with no river, the whole pack in a tracking pose
gsap.set('#syrupR,#spillW,#sglobW,#gpanW,#startW',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#skySet',{opacity:0});
gsap.set('#gm,#pt,#nm,#bp,#kg,#j1,#j2,#j3,#j4,#gh',{opacity:0});
const P33={mc:1800,tf:1550,zp:1350,cm:1150,bo:950};
for(const p of Object.keys(KRC)){place(p,P33[p]);gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});gsap.set('#'+KRC[p].k+'S',{rotation:0});}
gsap.set('#kfl,.kfl',{opacity:0});
gsap.set('#pb',{opacity:1,x:P33.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});gsap.set('#pbSq,#pbLean',{y:0,rotation:0});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});
PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#fSatM',{attr:{values:1}});

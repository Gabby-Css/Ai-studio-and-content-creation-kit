/* ---- starting state of #58 ("The Flying Coco"): the lit circus; the trapeze bar is parked next to a launch platform high on the left (a rope ladder leads up), the cast watches from the floor.
   Season-12 shared trapeze rig (bodies #58, #60 must not redeclare it): TRP, hangXYR(), setCm(), lerp ---- */
document.getElementById('setMount').insertAdjacentHTML('beforeend',LDR_HTML);
gsap.set('#ldrW,#ldr',{svgOrigin:'0 0'});
// the trapeze: pivot P (above the frame), rope length LR, hang HS (hands -> feet, at Coco's scale S), body centre HC (unscaled units above her feet), A0 = the angle the bar is parked at (negative = toward the platform)
const TRP={P:[1221,-420],LR:1302,HS:350,HC:250,S:.76,A0:-26};
const lerp=(a,b,u)=>a+(b-a)*u;
// where Coco's feet are (and how her body is turned) while she hangs from the bar at swing angle a (degrees, positive = bar to the right)
const hangXYR=(a)=>{const A=a*Math.PI/180,d=TRP.LR+TRP.HS;return [TRP.P[0]+d*Math.sin(A),TRP.P[1]+d*Math.cos(A),-a];};
const trpR=gsap.quickSetter('#trp','rotation','deg'),cmX=gsap.quickSetter('#cm','x','px'),cmY=gsap.quickSetter('#cm','y','px'),cmR=gsap.quickSetter('#cmSq','rotation','deg');
const setCm=(x,y,r)=>{cmX(x);cmY(y);cmR(r);};
const M58={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],rk:[1250,ROWB,.8],bp:[1550,ROWB,.66],nm:[2350,ROWB,.54],
           cm:[640,ROWF,TRP.S],tf:[1000,ROWF,.74],mc:[1300,ROWF,.74],zp:[1620,ROWF,.7],
           bo:[880,ROWD+BOY,.88],wd:[1150,ROWD-50,.9],pan:[1380,ROWD-50,.9],pd:[1600,ROWD-50,1.05],
           pb:[760,ROWD+14,PBS],gh:[1500,700,.7]};
startCircus(M58);
gsap.set('#ldrW',{opacity:1,x:640,y:1840});
gsap.set('#trpW',{opacity:1,x:TRP.P[0],y:TRP.P[1]});gsap.set('#trp',{rotation:-TRP.A0});
gsap.set('#trmW',{opacity:0,x:2040,y:2150,scale:.8});gsap.set('#trmK',{y:2000});gsap.set('#trm',{scaleY:1,scale:1});

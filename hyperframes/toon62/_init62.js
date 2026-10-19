/* ---- starting state of #62 ("Boo's Big Scare"): the carved pumpkins glow on the night lawn, the friends chat, Boo hides behind Gumdrop's giant pumpkin (only his head peeks over it) ---- */
const HID62=[1935,1525,.55], FRONT62=[1300,2000,.85];
const M62={pt:[900,ROWB,.7],bp:[1300,ROWB,.66],nm:[1680,ROWB,.54],gm:[2250,ROWB,1.05],
           tf:[800,ROWF,.74],zp:[1140,ROWF,.7],mc:[1480,ROWF,.74],cm:[1820,ROWF,.76],bo:[470,ROWD+BOY,.88],gh:HID62};
startSpooky(M62);
P61.forEach(([x,y,s],i)=>{gsap.set('#pmpW'+i,{opacity:1,x,y,scale:s});gsap.set('#pmpF'+i,{opacity:1});gsap.set('#pmpG'+i,{opacity:1,scale:1});});
gsap.set('#hseW',{opacity:1,x:1900,y:1385,scale:.3});gsap.set('#hse',{scale:1});gsap.set('#hseDoor',{scaleX:1});gsap.set('#hseIn',{opacity:0});
gsap.set('#ghGlow',{opacity:.35});

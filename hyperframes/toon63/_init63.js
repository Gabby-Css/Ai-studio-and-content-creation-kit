/* ---- starting state of #63 ("The Haunted House"): the group on a dark path, the haunted house small and far on the right hill (it grows as they climb); the iron gate and the hall interior wait hidden ---- */
const M63={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],bp:[1260,ROWB,.66],nm:[1620,ROWB,.54],
           tf:[780,ROWF,.74],zp:[1120,ROWF,.7],mc:[1460,ROWF,.74],cm:[1800,ROWF,.76],bo:[620,ROWD+BOY,.88],gh:[2060,1930,.7]};
const CM63=[880,2070,.76], HSE63=[1760,1560,.85], GATE63=[1760,1740,.95];
startSpooky(M63);
gsap.set('#hseW',{opacity:1,x:1900,y:1385,scale:.3});gsap.set('#hse',{scale:1});gsap.set('#hseDoor',{scaleX:1});gsap.set('#hseIn',{opacity:0});gsap.set('#hseWinL,#hseWinR',{opacity:1});
gsap.set('#hgtW',{opacity:0,x:GATE63[0],y:GATE63[1],scale:GATE63[2]});gsap.set('#hgtL,#hgtR',{scaleX:1});
gsap.set('#hallSet',{opacity:0});gsap.set('#wsdW',{opacity:0,x:1400,y:1440,scale:.4});gsap.set('#wsdM',{opacity:.88});gsap.set('#wsdP',{opacity:0});
gsap.set('#crcBlkW',{opacity:0});gsap.set('#ghGlow',{opacity:.3,scale:1});

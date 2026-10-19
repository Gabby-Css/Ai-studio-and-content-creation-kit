/* ---- starting state of #64 ("The Giant Shadow"): inside the lit hall (candles, moonlit window, portraits); Boo's soft glow; the monster shadow is still small on the far wall; Pebble is not there yet (she walks in with her candle) ---- */
const BOO64=[1300,1980,.85], BOO64b=[1980,1900,.85], PB64=[1560,2100,PBS];
const M64={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],bp:[1260,ROWB,.66],nm:[1620,ROWB,.54],
           tf:[780,ROWF,.74],zp:[1120,ROWF,.7],mc:[1460,ROWF,.74],cm:[1800,ROWF,.76],bo:[620,ROWD+BOY,.88],gh:BOO64};
startSpooky(M64);
gsap.set('#spkSet,#hseW,#hgtW',{opacity:0});gsap.set('#hallSet',{opacity:1});gsap.set('#crcBlkW',{opacity:0});
gsap.set('#wsdW',{opacity:1,x:1400,y:1440,scale:.9});gsap.set('#wsdM',{opacity:.88});gsap.set('#wsdP',{opacity:0});
gsap.set('#ghGlow',{opacity:.28,scale:1.2});
gsap.set('#cndW',{opacity:0,x:2700,y:2090,scale:.6});gsap.set('#cnd',{scale:1});

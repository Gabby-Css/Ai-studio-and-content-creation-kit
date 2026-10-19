/* ---- starting state of #57 ("The Juggling Act"): day one of rehearsals inside the lit circus. Bo and Zap practise with pancakes, Gumdrop stands behind Bo (the pancakes will land on his head), the others watch.
   Season-12 shared start: startCircus(M,ex) (bodies #57-#60 must not redeclare it) ---- */
// the lit circus on its marks: M = {id:[x,y,scale]} (setMarks), everybody else hidden; ex = extra gsap.set calls for the episode
function startCircus(M){
 resetStage();gsap.set(S12_OFF,{opacity:0});
 gsap.set('#skySet,#snowSet,#snf0,#snf1,#snf2,#beachSet,#tentW',{opacity:0});gsap.set('#crcSet,#crcSpotW',{opacity:1});gsap.set('#crcDarkW,#crcBlkW',{opacity:0});
 setMarks(M);
 gsap.set('#wdShake,#pdShake,#pmShake,#pkShake,#panShake',{rotation:0});
 gsap.set('#ghGlow',{opacity:.25});gsap.set('#j1,#j2,#j3,#j4',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
 if(M.pb){PB.eyes(0,'happy');PB.m(0,'mSm');}
 gsap.set('#depthLayer',{y:0});}
const M57={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],rk:[1250,ROWB,.8],bp:[1600,ROWB,.66],nm:[2350,ROWB,.54],
           tf:[1500,ROWF,.74],mc:[1800,ROWF,.74],cm:[2100,ROWF,.76],
           bo:[620,ROWD+BOY,.88],zp:[1060,ROWD,.7],pan:[1330,ROWD-50,.9],wd:[1580,ROWD-50,.9],pd:[1830,ROWD-50,1.05],pm:[2060,ROWD-50,.95],pk:[2250,ROWD-30,.62],nb:[2390,ROWD+10,.8],
           pb:[860,ROWD+14,PBS],gh:[1500,700,.7]};
startCircus(M57);

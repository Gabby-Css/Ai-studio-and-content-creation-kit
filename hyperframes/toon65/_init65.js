/* ---- starting state of #65 ("The Ghost Party", Season 13 finale): the dark hall (a dark veil over it), the friends huddled together; Boo's ghost parents are hidden until the lights switch on ---- */
const GFM65=[2010,2040,.78], GFD65=[2270,2020,.78], BOO65=[1760,1990,.85];
const M65={gm:[560,ROWB,1.05],pt:[880,ROWB,.7],bp:[1200,ROWB,.66],nm:[1520,ROWB,.54],
           tf:[780,ROWF,.74],zp:[1030,ROWF,.7],mc:[1280,ROWF,.74],cm:[1530,ROWF,.76],bo:[600,ROWD+BOY,.88],pb:[900,ROWD+14,PBS],wd:[1250,ROWD-50,.9],gh:BOO65};
startSpooky(M65);
gsap.set('#spkSet,#hseW,#hgtW',{opacity:0});gsap.set('#hallSet',{opacity:1});gsap.set('#crcBlkW',{opacity:.55});
gsap.set('#wsdW',{opacity:0});gsap.set('#ghGlow',{opacity:.28,scale:1.2});gsap.set('#cndW',{opacity:0});
gsap.set('#gfmW',{opacity:0,x:GFM65[0],y:GFM65[1],scale:GFM65[2]});gsap.set('#gfdW',{opacity:0,x:GFD65[0],y:GFD65[1],scale:GFD65[2]});gsap.set('#gfmM,#gfdM',{opacity:0});
gsap.set(Array.from({length:12},(_,i)=>'#cdyW'+i).join(','),{opacity:0});
PB.eyes(0,'wide');PB.m(0,'mO');

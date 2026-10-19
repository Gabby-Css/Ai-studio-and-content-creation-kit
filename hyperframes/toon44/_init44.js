/* ---- starting state of #44 ("The Secret Ingredient"): the recipe page is back in Grandma's hands; the picnic lawn; Munch is still far away (he walks in with the giant bowl in scene 4) ---- */
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#duskR',{opacity:0});
const M44={gm:[560,ROWB,1.05],pt:[860,ROWB,.7],rk:[1250,ROWB,.8],cm:[1700,ROWB,.76],nm:[1960,ROWB,.54],
           tf:[780,ROWF,.74],mc:[1100,ROWF,.74],bp:[1850,ROWF,.66],bo:[600,ROWD+BOY,.88],pan:[1010,ROWD-50,.9],zp:[1900,ROWD,.7],nb:[2200,ROWD+10,.8]};
const CZ44={cz1:[1250,ROWD-50,.9],cz2:[1480,ROWD-50,.9],cz3:[1710,ROWD-50,.9]};
setMarks(M44);
for(const p of ['cz1','cz2','cz3']){gsap.set('#'+p,{opacity:1,x:CZ44[p][0],y:CZ44[p][1],scale:CZ44[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0});gsap.set(`#${p}Shake`,{rotation:0});}
gsap.set('#gma',{opacity:1,x:GM43[0],y:GM43[1],scale:GM43[2]});gsap.set('#gmaK',{y:ROWF});gsap.set('#gmaArmL',{rotation:0});gsap.set('#gmaArmR',{rotation:0});gsap.set('#gmaSq',{y:0});gsap.set('#gmaCap,#gmaBlk',{opacity:0});GMAN.eyes(0,true);GMAN.pm(0,'Sm');
gsap.set('#pb',{opacity:1,x:880,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#mn',{opacity:1,x:3700,y:ROWB+20,scale:1.4});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});
// the picnic; the book (page back in it), the giant bowl waits off-screen with Munch, the pancake tower for the end
gsap.set('#pkW',{opacity:1,x:1480,y:1990});gsap.set('#pk',{scaleX:1});gsap.set('#bskW',{opacity:1,x:1010,y:2030,scale:.65});gsap.set('#bskLid',{rotation:-110});gsap.set('#bskPc,#bskCup0,#bskCup1',{opacity:1});
gsap.set('#bookW',{opacity:0});gsap.set('#pgW',{opacity:1,x:GM43[0]+10,y:1560,scale:.45});gsap.set('#pg',{rotation:0,scale:1});
gsap.set('#gbwW',{opacity:0,x:3560,y:1960,scale:.6});gsap.set('#gspW',{opacity:0,x:1620,y:2160,scale:.6});gsap.set('#gsp',{rotation:0});
gsap.set('#igEgW,#igChW,#igStW,#smlW',{opacity:0});
gsap.set('#stkW',{opacity:0,x:2150,y:2250,scale:.5});gsap.set('#stk,.stl,#stkTop,#stkRkW,#stkFeet,#stkRk',{opacity:0});
gsap.set('#depthLayer',{y:0});

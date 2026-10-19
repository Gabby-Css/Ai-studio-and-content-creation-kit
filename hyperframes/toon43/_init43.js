/* ---- starting state of #43 ("The Lost Recipe"): the picnic is still laid out, Grandma holds her book - with a torn-out gap; the banana tree stands on the right with the lost page stuck in its crown ---- */
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#duskR',{opacity:0});
const M43={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],rk:[1650,ROWB,.8],cm:[2080,ROWB,.76],nm:[2560,ROWB,.54],
           tf:[780,ROWF,.74],mc:[1240,ROWF,.74],bp:[1760,ROWF,.66],zp:[1990,ROWF,.7],nb:[2400,ROWF+10,.8],
           bo:[900,ROWD+BOY,.88],pan:[1260,ROWD-50,.9]};
const CZ43={cz1:[1480,ROWD-50,.9],cz2:[1700,ROWD-50,.9],cz3:[1920,ROWD-50,.9]};
const GM43=[1500,ROWF-34,.62];
setMarks(M43);
for(const p of ['cz1','cz2','cz3']){gsap.set('#'+p,{opacity:1,x:CZ43[p][0],y:CZ43[p][1],scale:CZ43[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0});gsap.set(`#${p}Shake`,{rotation:0});}
gsap.set('#gma',{opacity:1,x:GM43[0],y:GM43[1],scale:GM43[2]});gsap.set('#gmaK',{y:ROWF});gsap.set('#gmaArmL',{rotation:0});gsap.set('#gmaArmR',{rotation:-60});gsap.set('#gmaSq',{y:0});gsap.set('#gmaCap,#gmaBlk',{opacity:0});GMAN.eyes(0,true);GMAN.pm(0,'Sm');
gsap.set('#pb',{opacity:1,x:1060,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#mn,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});
gsap.set('#mcHat,#mcMag',{opacity:0});
// the picnic stays; the book beside Grandma; the banana tree with the page in its crown
gsap.set('#pkW',{opacity:1,x:1480,y:1990});gsap.set('#pk',{scaleX:1});gsap.set('#bskW',{opacity:1,x:1010,y:2030,scale:.65});gsap.set('#bskLid',{rotation:-110});gsap.set('#bskPc,#bskCup0,#bskCup1',{opacity:1});
gsap.set('#bookW',{opacity:1,x:GM43[0]+150,y:1790,scale:.5});
gsap.set('#btrW',{opacity:1,x:2330,y:1560});gsap.set('#btrCrown',{rotation:0});
gsap.set('#pgW',{opacity:1,x:2400,y:960,scale:.38});gsap.set('#pg',{rotation:14,scale:1});
// sticky footprints from the picnic to the banana tree
const FTP=Array.from({length:12},(_,i)=>{const u=i/11;return [1620+(2290-1620)*u+(i%2?16:-16),2140+(1660-2140)*u+(i%2?-10:10)];});
gsap.set('#footW',{opacity:1,x:0,y:0});FTP.forEach(([x,y],i)=>{gsap.set('#ft'+i,{svgOrigin:'0 0'});gsap.set('#ft'+i,{x,y,opacity:0,scale:.9,rotation:-28});});
gsap.set('#depthLayer',{y:0});

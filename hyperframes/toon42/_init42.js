/* ---- starting state of #42 ("The Three Cousins"): the picnic is laid out (blanket, open basket), Grandma holds her recipe book; the cousins are still behind the hill ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',['cz1','cz2','cz3'].map((p,i)=>{const c=[['#5E7BFF','BLUEBERRY'],['#8F5530','CHOCO'],['#E0516F','BERRY']][i];
 return `<g id="tg${i}W" opacity="0"><g id="tg${i}"><path d="M-14,40 L0,64 L14,40Z" fill="${c[0]}" ${sw(5)}/><rect x="-118" y="-22" width="236" height="64" rx="26" fill="${c[0]}" ${sw(7)}/><text x="0" y="22" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="40" fill="#fff" stroke="${OL}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">${c[1]}</text></g></g>`;}).join(''));
gsap.set('#tg0W,#tg0,#tg1W,#tg1,#tg2W,#tg2',{svgOrigin:'0 0'});
gsap.set('#cz1Shake,#cz2Shake,#cz3Shake',{svgOrigin:'0 -60'});      // a pancake flips around its middle
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#duskR',{opacity:0});
// the cast; the cousins come in from the right during scene 1 (they start off-screen)
const M42={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],cm:[1660,ROWB,.76],bp:[1960,ROWB,.66],rk:[2300,ROWB,.8],nm:[2460,ROWB,.54],
           tf:[880,ROWF,.74],mc:[2000,ROWF,.74],bo:[560,ROWD+BOY,.88],pan:[1080,ROWD-50,.9],zp:[2260,ROWD,.7],nb:[2150,ROWD+10,.8]};
const CZM={cz1:[1330,ROWD-50,.9],cz2:[1560,ROWD-50,.9],cz3:[1790,ROWD-50,.9]};
setMarks(M42);
gsap.set('#gma',{opacity:1,x:GM41[0],y:GM41[1],scale:GM41[2]});gsap.set('#gmaK',{y:ROWF});gsap.set('#gmaArmL',{rotation:0});gsap.set('#gmaArmR',{rotation:-60});gsap.set('#gmaSq',{y:0});gsap.set('#gmaCap,#gmaBlk',{opacity:0});GMAN.eyes(0,true);GMAN.pm(0,'Sm');
for(const p of ['cz1','cz2','cz3']){gsap.set('#'+p,{opacity:1,x:3300,y:CZM[p][1],scale:CZM[p][2]});gsap.set(`#${p}ArmL,#${p}ArmR`,{rotation:0});gsap.set(`#${p}Sq`,{y:0});gsap.set(`#${p}Shake`,{rotation:0});}
gsap.set('#cz1EyesClosed,#cz2EyesClosed,#cz3EyesClosed',{opacity:0});
gsap.set('#pb',{opacity:1,x:800,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#mn,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});
// the picnic: blanket spread, basket open with its pancakes and cups, Grandma's book (the loose page tucked in)
gsap.set('#pkW',{opacity:1,x:1480,y:1990});gsap.set('#pk',{scaleX:1});gsap.set('#bskW',{opacity:1,x:1010,y:2030,scale:.65});gsap.set('#bskLid',{rotation:-110});gsap.set('#bskPc,#bskCup0,#bskCup1',{opacity:1});
gsap.set('#bookW',{opacity:1,x:GM41[0]+150,y:1790,scale:.5});gsap.set('#pgW',{opacity:0});
gsap.set('#depthLayer',{y:0});

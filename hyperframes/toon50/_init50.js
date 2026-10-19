/* ---- starting state of #50 ("The Snow Day Party", Season 10 finale): the snowy lawn in the late afternoon, the crew standing around the (unlit) fire spot, Grandma beside the fire, Waddles in the middle ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',MUG5_HTML+PSTK_HTML);
gsap.set('#pstW,#pst,'+[0,1,2,3,4].map(i=>`#mgW${i},#mg${i}`).join(','),{svgOrigin:'0 0'});
gsap.set('#pstW,'+[0,1,2,3,4].map(i=>`#mgW${i}`).join(','),{opacity:0});
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#cmrW,#polW,#pkW,#bskW,#vfW,#cntW,#sldW,#snmW,#sysW,#btlW,#zbW,#rkicW,#shdW,#wf0W,#wf1W,#wf2W,#wf3W,#standW,#scfW,#sbW,#mgW,#ntW,#castW,#snpW,#dgW,#mn,#cz1,#cz2,#cz3,#kg',{opacity:0});
gsap.set('#skySet',{opacity:0});gsap.set('#snowSet',{opacity:1});gsap.set('#coldR',{opacity:.1});gsap.set('#snf0,#snf1,#snf2',{opacity:.95});gsap.set('#night,#nStars,#duskR',{opacity:0});
const M50={gm:[560,ROWB,1.05],pt:[860,ROWB,.7],rk:[1180,ROWB,.8],cm:[1660,ROWB,.76],nm:[1960,ROWB,.54],
           tf:[1140,ROWF,.74],mc:[860,ROWF,.74],bp:[2000,ROWF,.66],zp:[2300,ROWF,.7],
           bo:[700,ROWD+BOY,.88],pan:[1000,ROWD-50,.9],nb:[2250,ROWD+10,.8]};
const GM50=[1700,ROWF-34,.62], WD50=[1400,ROWD-50,.9], PB50=[1870,ROWD+14,PBS], FIRE50=[1400,ROWF+30,.95];
setMarks(M50);
gsap.set('#gma',{opacity:1,x:GM50[0],y:GM50[1],scale:GM50[2]});gsap.set('#gmaK',{y:ROWF});gsap.set('#gmaArmL',{rotation:0});gsap.set('#gmaArmR',{rotation:0});gsap.set('#gmaSq',{y:0});gsap.set('#gmaCap,#gmaBlk',{opacity:0});GMAN.eyes(0,true);GMAN.pm(0,'Sm');
gsap.set('#wd',{opacity:1,x:WD50[0],y:WD50[1],scale:WD50[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB50[0],y:PB50[1],scale:PB50[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1400,y:900,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#fireW',{opacity:0,x:FIRE50[0],y:FIRE50[1],scale:FIRE50[2]});
gsap.set('#dgW',{opacity:0,x:FIRE50[0],y:FIRE50[1]});gsap.set('#dg',{opacity:.45,scale:.8});
gsap.set('#ntW',{opacity:0,x:1400,y:1150});
gsap.set('#thermW',{opacity:0});gsap.set('#depthLayer',{y:0});

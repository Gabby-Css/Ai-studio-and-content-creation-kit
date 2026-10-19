/* ---- starting state of #47 ("The Frozen Syrup"): the snowy lawn, the waffle stand with icicles at the back right, the crew around a stump with a frozen syrup bottle ---- */
document.getElementById('fxMount').insertAdjacentHTML('beforeend',ZAPB_HTML+RKIC_HTML+SHARD_HTML+[0,1,2,3].map(i=>WAF_HTML.replace('id="wfW"',`id="wf${i}W"`).replace('id="wf"',`id="wf${i}"`)).join(''));
gsap.set('#zbW,#zb,#rkicW,#rkic,#shdW,#wf0W,#wf0,#wf1W,#wf1,#wf2W,#wf2,#wf3W,#wf3',{svgOrigin:'0 0'});gsap.set('#zbW,#rkicW,#shdW,#wf0W,#wf1W,#wf2W,#wf3W',{opacity:0});
gsap.set('#wspW0 circle,#wspW1 circle,#wspW2 circle',{fill:'#E39A3A'});                // the water drops of #37's spray become syrup drops
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#mn,#cmrW,#polW,#pkW,#bskW,#vfW,#cntW,#sldW,#snmW,#castW,#sysW,#btlW',{opacity:0});
gsap.set('#skySet',{opacity:0});gsap.set('#snowSet',{opacity:1});gsap.set('#coldR',{opacity:.1});gsap.set('#snf0,#snf1,#snf2',{opacity:.95});gsap.set('#night,#nStars,#duskR',{opacity:0});
const M47={gm:[560,ROWB,1.05],pt:[980,ROWB,.7],rk:[1330,ROWB,.8],cm:[1650,ROWB,.76],nm:[1900,ROWB,.54],
           tf:[830,ROWF,.74],mc:[1130,ROWF,.74],bp:[1470,ROWF,.66],zp:[1250,ROWD,.7],bo:[560,ROWD+BOY,.88],pan:[980,ROWD-50,.9],nb:[2100,ROWD+10,.8]};
const BTL47=[1480,1960];                                   // the stump with the bottle
setMarks(M47);
gsap.set('#wd',{opacity:1,x:1760,y:ROWD-50,scale:.9});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#cz1,#cz2,#cz3,#gma',{opacity:0});
gsap.set('#pb',{opacity:1,x:800,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#standW',{opacity:1,x:2260,y:1700,scale:.9});gsap.set('#btlW',{opacity:0,x:BTL47[0],y:BTL47[1]});gsap.set('#btlIce',{opacity:1});gsap.set('#btlCap',{y:0,rotation:0,opacity:1});
gsap.set('#thermW',{opacity:0});gsap.set('#depthLayer',{y:0});

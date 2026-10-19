/* ---- starting state of #48 ("The Big Sled"): the top of Pancake Hill, the big red sled with the riders on its deck, friends waving from the hilltop; the snow scenery will scroll behind a still camera ---- */
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#mn,#cmrW,#polW,#pkW,#bskW,#vfW,#cntW,#castW,#sysW,#btlW,#zbW,#rkicW,#shdW,#wf0W,#wf1W,#wf2W,#wf3W,#standW,#cz1,#cz2,#cz3,#gma,#rk,#nm,#nb,#pb',{opacity:0});
gsap.set('#skySet',{opacity:0});gsap.set('#snowSet',{opacity:1});gsap.set('#coldR',{opacity:.1});gsap.set('#snf0,#snf1,#snf2',{opacity:.95});gsap.set('#night,#nStars,#duskR',{opacity:0});
const SLX=1300, SLY=1840;                                  // the sled's centre (its deck top face spans y 1630..2010, x 540..2060)
const RD={cm:[1020,1700,.76],mc:[1330,1700,.74],wd:[1580,1785,.9],zp:[1780,1860,.7],bo:[2000,2020,.88],gm:[560,1820,1.05]};   // riders (gm pushes from behind first)
const HT={tf:[330,ROWF,.74],pt:[200,ROWB,.7],pan:[520,ROWD-50,.9],bp:[700,ROWB,.66]};                                    // friends waving on the hilltop (they scroll away)
setMarks(RD);setMarks(HT);
gsap.set('#wd',{opacity:1});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#sldW',{opacity:1,x:SLX,y:SLY});gsap.set('#sld',{y:0,rotation:0});
gsap.set('#gh',{opacity:1,x:1850,y:1250,scale:.75});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#mcHat,#mcMag',{opacity:0});gsap.set('#thermW',{opacity:0});
gsap.set('#snmW',{opacity:1,x:14400,y:SLY,scale:.62});gsap.set('#scfW',{opacity:0,x:2300,y:SLY,scale:.62});
gsap.set('#depthLayer',{y:0});
// Bo's scarf = the green collar + dots + tail; tag them so the scarf can be handed to the snowman in the last scene
{const t=document.getElementById('boScarfTail').parentNode;[t,t.previousElementSibling,t.previousElementSibling.previousElementSibling].forEach(e=>e.classList.add('boScf'));}

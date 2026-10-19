/* ---- starting state of #41 (Season 9 opener "Grandma's Picnic"): a bright Sunday morning on the lawn; Grandma Pancake stands among the gang with her recipe book ----
   Season-9 shared bits (bodies #41-#45 must not redeclare them): M41/GM41 marks, the cousins cz1-cz3 (CZ1..CZ3 helpers, CZS), hopIn, the props from _defs41 */
const SM9=document.getElementById('setMount');
SM9.insertAdjacentHTML('beforeend',PICNIC_HTML+BTREE_HTML);
const FX9=document.getElementById('fxMount');
FX9.insertAdjacentHTML('beforeend',PICBAN_HTML+COUSB_HTML+SIL_HTML+BANANAS_HTML+BOOK_HTML+PAGE_HTML+FOOT_HTML+POL_HTML+GBOWL_HTML+SPOON_HTML+ING_HTML+SMELL_HTML);
DEPTH.lay.insertAdjacentHTML('beforeend',BASKET_HTML+CMR_HTML+['cz1','cz2','cz3'].map(p=>`<g id="${p}Mount">${cousinSVG(p)}</g>`).join(''));
['cz1','cz2','cz3'].forEach(p=>document.getElementById(p+'Sq').insertAdjacentHTML('beforeend',CZ_ACC[p]));
DEPTH.items.push({g:document.getElementById('bskW'),el:document.getElementById('bskW'),i:70},{g:document.getElementById('cmrW'),el:document.getElementById('cmrW'),i:71},
 {g:document.getElementById('cz1Mount'),el:document.getElementById('cz1'),i:80},{g:document.getElementById('cz2Mount'),el:document.getElementById('cz2'),i:81},{g:document.getElementById('cz3Mount'),el:document.getElementById('cz3'),i:82});
for(const p of ['cz1','cz2','cz3']){gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});EYE[p]=[0,-62];EH[p]=62;}
const CZ1=mkPan('cz1'), CZ2=mkPan('cz2'), CZ3=mkPan('cz3'), CZS=[CZ1,CZ2,CZ3];
gsap.set('#banW,#ban,#pkW,#pk,#bskW,#bsk,#bnsW,#bns,#bookW,#book,#pgW,#pg,#btrW,#btr,#cmrW,#cmr,#polW,#pol,#gbwW,#gbw,#gspW,#gsp,#igEgW,#igEg,#igChW,#igCh,#igStW,#igSt,#smlW,#cbW,#cb,#sil0W,#sil1W,#sil2W,#sil0,#sil1,#sil2,#footW',{svgOrigin:'0 0'});
gsap.set('#bskLid',{svgOrigin:'-150 -126'});gsap.set('#btrCrown',{svgOrigin:'2 -650'});gsap.set('#pk',{svgOrigin:'-640 100'});gsap.set('#gbwSwirl',{svgOrigin:'0 -120'});
const ECAM=(p,m,s=.95,sx=540,sy=780)=>camE(m[0]+EYE[p][0]*m[2],m[1]+EYE[p][1]*m[2],s,sx,sy);   // a close-up on a character's eyes (m = [x,y,scale])
function hopIn(p,x0,x1,y,t0,dur,n=4,h=150){tl.fromTo('#'+p,{x:x0},{x:x1,duration:dur,ease:'none'},t0);for(let k=0;k<n;k++)arc('#'+p,t0+k*dur/n,dur/n,y,h,y);}
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#chLid',{opacity:0});
gsap.set('#skySet',{opacity:1});gsap.set('#night,#nStars,#duskR',{opacity:0});
// ---- the lawn: a ring round the middle (the blanket will cover the front-centre); Grandma and Flapjack in the middle row
const M41={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],cm:[1660,ROWB,.76],bp:[1960,ROWB,.66],rk:[2300,ROWB,.8],nm:[2460,ROWB,.54],
           tf:[880,ROWF,.74],mc:[2000,ROWF,.74],pan:[1180,ROWF-50,.9],bo:[560,ROWD+BOY,.88],zp:[2050,ROWD,.7],nb:[2250,ROWD+10,.8]};
setMarks(M41);
const GM41=[1500,ROWF-34,.62];                              // Grandma Pancake's mark (middle row, middle of the lawn)
gsap.set('#gma',{opacity:1,x:GM41[0],y:GM41[1],scale:GM41[2]});gsap.set('#gmaK',{y:ROWF});gsap.set('#gmaArmL,#gmaArmR',{rotation:0});gsap.set('#gmaSq',{y:0});
gsap.set('#gmaCap,#gmaBlk',{opacity:0});GMAN.eyes(0,true);GMAN.pm(0,'Sm');
gsap.set('#pb',{opacity:1,x:860,y:ROWD+14,scale:PBS});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#mn,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});
gsap.set('#cz1,#cz2,#cz3',{opacity:0,x:3300,y:ROWD-50,scale:.9});
// props (all hidden until their scene)
gsap.set('#banW',{opacity:0,x:1300,y:400});gsap.set('#pkW',{opacity:0,x:1480,y:1990});gsap.set('#bskW',{opacity:0,x:1010,y:2030,scale:.65});gsap.set('#bnsW',{opacity:0});
gsap.set('#bookW',{opacity:0,x:GM41[0]+150,y:1790,scale:.5});gsap.set('#pgW',{opacity:0});gsap.set('#btrW',{opacity:0,x:2330,y:1560});gsap.set('#cmrW,#polW,#gbwW,#gspW,#smlW,#footW,#cbW',{opacity:0});
gsap.set('#sil0W,#sil1W,#sil2W',{opacity:0});
gsap.set('#depthLayer',{y:0});

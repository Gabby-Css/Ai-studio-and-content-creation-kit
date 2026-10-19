/* ---- starting state of #49 ("Munch's Snow Castle"): the snowy lawn, Munch on the left, friends around; the castle is built during scene 1 (it grows from the ground at CX) ---- */
document.getElementById('setMount').insertAdjacentHTML('beforeend',SNPILE_HTML+`<g id="dgW" opacity="0"><ellipse id="dg" cx="0" cy="-110" rx="340" ry="270" fill="#FFE79A" opacity=".45"/></g>`);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',SBK_HTML+CHUNK_HTML);
gsap.set('#snpW,#snp,#dgW,#dg,'+Array.from({length:8},(_,i)=>`#sbk${i}W,#sbk${i}`).join(',')+','+Array.from({length:6},(_,i)=>`#chk${i}W,#chk${i}`).join(','),{svgOrigin:'0 0'});
gsap.set('#snpW,#dgW,'+Array.from({length:8},(_,i)=>`#sbk${i}W`).join(',')+','+Array.from({length:6},(_,i)=>`#chk${i}W`).join(','),{opacity:0});
resetStage();
gsap.set('#seaSet,#junSet,#canSet,#brdgW,#gateW,#bigxW,#chBW,#chFW,#mapW,#lftW,#msplat,#syrW,#isleW,#btW,#snkW,#zzW,#thW,#banW,#cbW,#bnsW,#sil0W,#sil1W,#sil2W,#tg0W,#tg1W,#tg2W,#wndW,#gpanW,#btrW,#footW,#gbwW,#gspW,#igEgW,#igChW,#igStW,#smlW,#stkW,#pgW,#bookW,#cmrW,#polW,#pkW,#bskW,#vfW,#cntW,#sldW,#snmW,#sysW,#btlW,#zbW,#rkicW,#shdW,#wf0W,#wf1W,#wf2W,#wf3W,#standW,#scfW,#sbW,#mgW,#ntW,#cz1,#cz2,#cz3,#gma',{opacity:0});
gsap.set('#skySet',{opacity:0});gsap.set('#snowSet',{opacity:1});gsap.set('#coldR',{opacity:.1});gsap.set('#snf0,#snf1,#snf2',{opacity:.95});gsap.set('#night,#nStars,#duskR',{opacity:0});
// Munch joins the depth layer (so characters in front of him really are drawn in front)
{const m=document.createElementNS('http://www.w3.org/2000/svg','g');m.id='mnMount';DEPTH.lay.appendChild(m);m.appendChild(document.getElementById('mn'));DEPTH.items.push({g:m,el:document.getElementById('mn'),i:91});}
EYE.mn=[0,-544];EH.mn=544;EYE.pb=[0,-544];                    // measured with eyeprobe.cjs
const CX=1650, CY=1800;                                     // the castle's centre / ground line
const M49={gm:[560,ROWB,1.05],pt:[880,ROWB,.7],rk:[1180,ROWB,.8],cm:[2020,ROWB,.76],nm:[2320,ROWB,.54],
           tf:[870,ROWF,.74],mc:[1350,ROWF,.74],bp:[2060,ROWF,.66],zp:[2350,ROWF,.7],
           bo:[1160,ROWD+BOY,.88],pan:[1560,ROWD-50,.9],nb:[2400,ROWD+10,.8],mn:[600,ROWD-20,1.0]};
const PB49=[1400,ROWD+14,PBS], WD49=[2180,ROWD-50,.9];
setMarks(M49);
gsap.set('#mn',{opacity:1,x:M49.mn[0],y:M49.mn[1],scale:M49.mn[2]});gsap.set('#mnArmL',{rotation:0});gsap.set('#mnArmR',{rotation:0});gsap.set('#mnTear',{opacity:0});gsap.set('#mnLean',{rotation:0});gsap.set('#mnSq',{y:0});
gsap.set('#wd',{opacity:1,x:WD49[0],y:WD49[1],scale:WD49[2]});gsap.set('#wdArmL,#wdArmR',{rotation:0});gsap.set('#wdSq',{y:0});gsap.set('#wdShake',{rotation:0});
gsap.set('#pb',{opacity:1,x:PB49[0],y:PB49[1],scale:PB49[2]});gsap.set('#pbArmL',{rotation:0});gsap.set('#pbArmR',{rotation:0});PB.eyes(0,'happy');PB.m(0,'mSm');
gsap.set('#gh',{opacity:1,x:1500,y:560,scale:.7});gsap.set('#ghGlow',{opacity:.25});gsap.set('#ghArmL',{rotation:0});gsap.set('#ghArmR',{rotation:0});
gsap.set('#j1,#j2,#j3,#j4,#kg,#fireW,#chbW,#fckW',{opacity:0});gsap.set('#rkSq',{y:0});gsap.set('#mcHat,#mcMag',{opacity:0});
gsap.set('#castTop',{svgOrigin:'0 0',opacity:0});gsap.set('#castW',{opacity:0,x:CX,y:CY});gsap.set('#cast',{scale:.05,rotation:0});gsap.set('#snpW',{opacity:0,x:CX,y:CY});gsap.set('#dgW',{opacity:0,x:CX,y:CY});
gsap.set('#thermW',{opacity:0});gsap.set('#depthLayer',{y:0});
// a thrown snowball (k = 0..7): flies from (x0,y0) to (x1,y1) on an arc, spins, and puffs on landing
let sbkN=0;
function throwSb(t0,x0,y0,x1,y1,dur=.7,h=260,sc=1.7){const k=(sbkN++)%8,W='#sbk'+k+'W',B='#sbk'+k;
 tl.set(W,{opacity:1,x:x0,y:y0,scale:sc},t0);tl.fromTo(W,{x:x0},{x:x1,duration:dur,ease:'none'},t0);
 tl.fromTo(W,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0);tl.to(W,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);
 tl.fromTo(B,{rotation:0},{rotation:540,duration:dur,ease:'none'},t0);tl.set(W,{opacity:0},t0+dur);
 sparks(t0+dur,x1,y1,5,70);dust(t0+dur,x1,y1+30,.7);}
// a "duck": the characters' squash groups dip and come back
const duck=(sqs,t0)=>{sqs.forEach(s=>{tl.to(s,{y:70,duration:.12,ease:'power2.out'},t0);tl.to(s,{y:0,duration:.2,ease:'power2.inOut'},t0+.45);});};

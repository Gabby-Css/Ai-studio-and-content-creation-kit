/* ---- starting state of #31 (Season 7 opener): the race track by the lawn - the five racers' karts line up behind the START line, the spectators stand behind the fence ----
   Season-7 shared helpers (bodies #31-#35 must not redeclare them): LANE, KRC, place, chPos, drive, wheels, scrollBy, scrollLand, groundMove, trail, bumpKart, lights, RACE */
const RACE=[560,560,.66];                                   // the camera for the race scenes (x0,y0,scale)
// camera that puts a point (ex,ey) at screen (sx,sy) - no clamping, the race world is 14000 wide
const camE=(ex,ey,s,sx=540,sy=640)=>[Math.round(ex-sx/s),Math.round(ey-sy/s),s];
const EH={bo:465,tf:422,mc:426,cm:422,zp:371,nm:422,bp:342,pt:432,gm:544,kg:342,pb:544};   // eye height above the feet at scale 1 (Bo is measured at his real scale)
const LANE=[1920,2060,2200,2340,2480];
const KRC={cm:{k:'kcm',L:0,c:['#FFD84A','#E0A52E'],cs:.6,b:0},tf:{k:'ktf',L:1,c:['#FF8FC8','#E0529F'],cs:.6,b:0},zp:{k:'kzp',L:2,c:['#C7D0E0','#7C879B'],cs:.58,b:0},
          mc:{k:'kmc',L:3,c:['#6C8CFF','#3F57D8'],cs:.6,b:0},bo:{k:'kbo',L:4,c:['#FF8A2B','#D9561A'],cs:.6,b:300}};
const chPos=(p,x,y)=>p==='bo'?[x+(1-KRC.bo.cs)*274,y+(1-KRC.bo.cs)*746]:[x,y];   // Bo's rig is scaled around an offset pivot
const wrapPx=(P)=>gsap.utils.unitize(v=>parseFloat(v)%P);
// ---- the set, the start gantry, the karts, the speed lines
document.getElementById('setMount').insertAdjacentHTML('beforeend',RS_HTML);
document.getElementById('rsLand').insertAdjacentHTML('beforeend',START_HTML);
document.getElementById('fxMount').insertAdjacentHTML('beforeend',SPD_HTML+GP_HTML);
for(const p of Object.keys(KRC)){const r=KRC[p];
 DEPTH.lay.insertAdjacentHTML('beforeend',KART_HTML(r.k,r.c[0],r.c[1],r.b/r.cs));
 DEPTH.items.push({g:document.getElementById(r.k+'W'),el:document.getElementById(r.k+'W'),i:40+r.L});}
gsap.set('.wh,.kfl,#spdW,.spl,#startW,#startG,#raceSet',{svgOrigin:'0 0'});gsap.set('#raceSet,#startW,#spdW,#gpanW',{opacity:0});gsap.set('#gpanW,#gpan',{svgOrigin:'0 0'});
for(const p of Object.keys(KRC)) gsap.set(`#${KRC[p].k}W,#${KRC[p].k}`,{svgOrigin:'0 0'});
for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'S',{svgOrigin:'0 -100'});
gsap.set('#rsDash,#rsFence,#rsMid,#rsFar,#rsCloud,#startG',{x:0});
function place(p,x,lane){const r=KRC[p],y=lane===undefined?LANE[r.L]:lane,[cx,cy]=chPos(p,x-6,y-34);
 gsap.set('#'+r.k+'W',{opacity:1,x,y:y+r.b,scale:r.cs});gsap.set('#'+r.k,{y:0});gsap.set('#'+r.k+'S',{rotation:0});
 gsap.set('#'+p,{opacity:1,x:cx,y:cy,scale:r.cs});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
// drive char + kart to x1 (kart centre)
function drive(p,t0,dur,x1,ease='sine.inOut'){const r=KRC[p],[cx]=chPos(p,x1-6,0);tl.to('#'+r.k+'W',{x:x1,duration:dur,ease},t0);tl.to('#'+p,{x:cx,duration:dur,ease},t0);}
function driveY(p,t0,dur,y1,ease='sine.inOut'){const r=KRC[p],[,cy]=chPos(p,0,y1-34);tl.to('#'+r.k+'W',{y:y1+r.b,duration:dur,ease},t0);tl.to('#'+p,{y:cy,duration:dur,ease},t0);}
const wheels=(t0,t1,rps=4)=>tl.fromTo('.wh',{rotation:0},{rotation:360*rps*(t1-t0),duration:t1-t0,ease:'none'},t0);
function bumpKart(p,t0,t1,amp=7,per=.16){const k='#'+KRC[p].k;for(let t=t0,j=0;t<t1-1e-6;t+=per,j++)tl.fromTo(k,{y:0},{y:-amp*(j%2?.6:1),duration:per/2,yoyo:true,repeat:1,ease:'sine.inOut'},t);}
// scenery scrolls behind the still racers: each layer wraps at its own tile width, D = near-layer distance
function scrollBy(t0,T,D,ease='none'){
 tl.to('#rsDash',{x:-D,duration:T,ease,modifiers:{x:wrapPx(300)}},t0);tl.to('#rsFence',{x:-D,duration:T,ease,modifiers:{x:wrapPx(600)}},t0);
 tl.to('#rsMid',{x:-D*.5,duration:T,ease,modifiers:{x:wrapPx(1200)}},t0);tl.to('#rsFar',{x:-D*.22,duration:T,ease,modifiers:{x:wrapPx(1800)}},t0);
 tl.to('#rsCloud',{x:-D*.1,duration:T,ease,modifiers:{x:wrapPx(2400)}},t0);}
// things that stand on the ground (landmarks, spectators) move with the near layer
function groundMove(ids,t0,T,D,ease='none'){ids.forEach(id=>tl.to(id,{x:'-='+D,duration:T,ease},t0));}
function trail(t,x,y,sc=1.2){const i=(dsn++)%8;tl.set('#dsw'+i,{x,y},t);tl.fromTo('#ds'+i,{opacity:.9,scale:.3*sc,x:0,y:0},{opacity:0,scale:1.0*sc,x:-420,y:-30,duration:.6,ease:'power1.out'},t);}
const lights=(t,a,b,c)=>{tl.set('#ltA',{fill:a?'#FF3B3B':'#5a2a2a'},t);tl.set('#ltB',{fill:b?'#FF3B3B':'#5a2a2a'},t);tl.set('#ltC',{fill:c?'#5CFF7A':'#2a4a2f'},t);};
const speedLines=(t0,t1)=>{tl.set('#spdW',{opacity:1},t0);tl.fromTo('.spl',{x:900},{x:-1900,duration:.42,repeat:Math.ceil((t1-t0)/.77),ease:'none',stagger:.05},t0);tl.set('#spdW',{opacity:0},t1);};

// ---- the stage at the START line
gsap.set('#skySet',{opacity:0});gsap.set('#raceSet',{opacity:1});gsap.set('#night,#nStars',{opacity:0});
gsap.set('#startW',{opacity:1});gsap.set('#startG',{x:1960});
gsap.set('#eggW,#eggBackW,#egFxW,#raysW,#fireW,#thermW,#bnW,#pileW,#nameW,#zzzW,#arrW,#hbW',{opacity:0});
gsap.set('#mn,#pb',{opacity:0});
const ST={cm:1560,tf:1380,zp:1200,mc:1020,bo:840};
for(const p of Object.keys(KRC)) place(p,ST[p]);
for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'W',{opacity:0});            // the karts arrive in scene 3 of #31
// the spectators stand behind the fence on the grass
const SPEC={gm:[880,1640,1.05],pt:[1180,1640,.7],nm:[1370,1640,.54],bp:[1540,1640,.66],kg:[1990,1640,1.0]};
for(const [p,[x,y,s]] of Object.entries(SPEC)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:0});gsap.set(`#${p}ArmR`,{rotation:0});}
gsap.set('#kgArmL',{rotation:0});gsap.set('#kgArmR',{rotation:0});
for(const [j,x] of Object.entries({j1:640,j2:760,j3:1700,j4:1800})){gsap.set('#'+j,{opacity:1,x,y:1700,scale:.5});gsap.set(`#${j}ArmL`,{rotation:0});gsap.set(`#${j}ArmR`,{rotation:0});}
gsap.set('#gh',{opacity:1,x:1300,y:1080,scale:.7});gsap.set('#ghGlow',{opacity:.3});
gsap.set('#fTable,#table,#plate,#oven,#kcrnW,#kcrn,#sbW,#splatW,#stk,#flyW,#mcHat,#mcMag',{opacity:0});

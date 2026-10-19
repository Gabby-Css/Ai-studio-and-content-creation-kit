/* ---- starting state of #21: festival morning in the kitchen, the gang on their marks, the little saucer is parked, the King stands at the fridge ---- */
/* ===== Season 5 staging (ep21-25) =====
   - every character stands on a depth row: back (ROWB), front (ROWF), downstage (ROWD/ROWJ, featured characters + the Jiggles)
   - the front row stands in the gaps of the back row, so every face stays visible
   - depthSort(): whoever stands lower on the floor (closer to the camera) is drawn in front, re-sorted on every rendered frame
   - camOn(): frames a character's eyes at a fixed spot on screen (upper third), captions stay clear below */
const ROWB=FLOOR, ROWF=FLOOR+200, ROWD=FLOOR+420, ROWJ=FLOOR+530, BOY=70;      // Bo's rig stands ~70 higher than the others: add BOY to his y
const EYE={bo:[-37,-567],tf:[0,-422],mc:[0,-426],cm:[0,-422],nm:[0,-422],zp:[0,-371],bp:[0,-342],pt:[0,-432],gm:[0,-544],kg:[0,-342],gh:[0,-266],j1:[-18,-342],j2:[-18,-342],j3:[-18,-342],j4:[-18,-342]};
const eyeAt=(p,x,y,s)=>[x+EYE[p][0]*s,y+EYE[p][1]*s];
const camOn=(ex,ey,s,sx=540,sy=640)=>[Math.round(Math.max(0,Math.min(2600-1080/s,ex-sx/s))),Math.round(ey-sy/s),s];
const DEPTH=(()=>{const NSv='http://www.w3.org/2000/svg',lay=document.createElementNS(NSv,'g');lay.id='depthLayer';
 document.getElementById('boMount').before(lay);
 const items=['gm','tf','pt','cm','mc','nm','zp','bp','bo','j1','j2','j3','j4'].map((c,i)=>{const el=document.getElementById(c);let g;
  if(c[0]==='j'){g=document.createElementNS(NSv,'g');g.id=c+'DZ';el.before(g);g.appendChild(el);}else g=el.closest('[id$="Mount"]');
  lay.appendChild(g);return {g,el,i};});
 return {lay,items};})();
function depthSort(){const a=DEPTH.items.map(o=>({o,y:+gsap.getProperty(o.el,'y')||0}));a.sort((p,q)=>p.y-q.y||p.o.i-q.o.i);
 const kids=DEPTH.lay.children;let same=kids.length===a.length;for(let k=0;same&&k<a.length;k++)if(kids[k]!==a[k].o.g)same=false;
 if(!same)for(const {o} of a)DEPTH.lay.appendChild(o.g);}
// the scene timeline is wrapped so the depth sort runs after every render, whichever way the playhead moves
function wrapDepth(t){const m=gsap.timeline({paused:true}),mk=()=>{const z={_v:0};Object.defineProperty(z,'v',{get(){return this._v;},set(x){this._v=x;depthSort();}});return z;};
 m.to(mk(),{v:1,duration:t.duration(),ease:'none'},0);t.paused(false);m.add(t,0);m.to(mk(),{v:1,duration:t.duration(),ease:'none'},0);depthSort();return m;}
// home marks in the kitchen
const HOME21={gm:[660,ROWB,1.05],tf:[950,ROWB,.74],pt:[1560,ROWB,.7],cm:[1880,ROWB,.76],
              mc:[760,ROWF,.74],bo:[1300,ROWF+BOY,.88],zp:[1730,ROWF,.7],nm:[1970,ROWF,.54],bp:[2150,ROWF,.66]};
for(const [p,[x,y,s]] of Object.entries(HOME21)){gsap.set('#'+p,{opacity:1,x,y,scale:s});gsap.set(`#${p}ArmL`,{rotation:p==='bo'?-160:150});gsap.set(`#${p}ArmR`,{rotation:p==='bo'?160:-150});}
gsap.set('#zorpSet,#rainbow,#mn,#z1,#z2,#z3,#z4,#hotRock,#stk,#sunTag',{opacity:0});
gsap.set('#table,#plate,#oven,#kg,#kcrn,#j1',{opacity:1});gsap.set('#kg',{x:2170,y:ROWB,scale:1.5});gsap.set('#kgArmL',{rotation:140});gsap.set('#kgArmR',{rotation:-140});
gsap.set('#j1',{x:2170,y:950,scale:.5});
gsap.set('#gh',{opacity:1,x:1650,y:330,scale:.75});gsap.set('#ghGlow',{opacity:.3,scale:1});   // Boo floats up high: whole in the wide shots, out of the close-ups
gsap.set('#ufoL',{opacity:1,x:880,y:FLOOR,rotation:0,scale:1});gsap.set('#ufoLRamp',{scaleY:1});
// ---- new in #21
gsap.set('#fTable,#pedW,#sneak',{opacity:0});gsap.set('#pedW,#ped,#sneakW',{svgOrigin:'0 0'});gsap.set('#sneakW',{x:900,y:1000});

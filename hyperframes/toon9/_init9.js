gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,.slc,.dst,.rgc,#wedgeBigIn,#pizza,#pizzaIn,#oven,#ovenIn,#peel,#peelIn,#bananas,#bananasIn,#pzTop,#pzSauce,#pzCheese,#pzLove,#pzBaked,#feastPc,#feastPcIn,#feastCk,#feastCkIn,#ufoIn,#beams,#ufoLIn,#peanutIn',{svgOrigin:'0 0'});
gsap.set('#discoIn',{svgOrigin:'1400 -600'});gsap.set('#ufoBlip',{svgOrigin:'0 0'});
gsap.set('#fridgeDoor',{svgOrigin:'2360 0'});gsap.set('#gdPupil,#gdEyeG,#gdBrow',{svgOrigin:'2088 1090'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm','tw','tf','cm','gm','gh','bp','zp']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Hat,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Snout,#${p}AntL,#${p}AntR,#${p}Ant,.${p}Eye,.${p}EyeW,.${p}Pupil,.${p}Swirl,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#cmFlip',{svgOrigin:'0 -170'});
gsap.set('#gmBelly',{svgOrigin:'0 -205'});gsap.set('#gmBody',{svgOrigin:'0 -250'});
gsap.set('#ghBody',{svgOrigin:'0 -200'});gsap.set('#ghHead',{svgOrigin:'0 -260'});gsap.set('#ghGlow',{svgOrigin:'0 -200'});gsap.set('#ghFlip',{svgOrigin:'0 -200'});
gsap.set('#zpHead',{svgOrigin:'0 0'});gsap.set('#bpBelly',{svgOrigin:'0 -112'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #8 (window shot: the UFO with a little alien in its beam, Boo floating, the gang frozen mid-party)
const MCS=.66, NSC=.46, BOX=500, BOS=.88, TFS=.68;
const FRIDGE=[1150,0,.84];
const GX=1960, GS=1.5;
gsap.set('#bo',{x:1740,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:1740,y:1112,scale:.78});gsap.set('#panGlaze',{opacity:1});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#cheeseWheel,#wedgeBig',{opacity:0});
gsap.set('#mc',{x:1570,y:FLOOR,scale:.68});gsap.set('#mcSq',{scaleY:1});gsap.set('#mcLids',{opacity:0});gsap.set('#mcArmL',{rotation:0});gsap.set('#mcArmR',{rotation:0});
gsap.set('#nb',{opacity:0});
gsap.set('#nm',{opacity:1,x:1250,y:FLOOR,scale:.5});gsap.set('#nmWedgeG',{opacity:1});gsap.set('#nmArmL',{rotation:0});gsap.set('#nmArmR',{rotation:0});
gsap.set('#tw',{opacity:0});
gsap.set('#tf',{opacity:1,x:1410,y:FLOOR,scale:.74});gsap.set('#tfArmL',{rotation:0});gsap.set('#tfArmR',{rotation:0});gsap.set('#tfSweat',{opacity:0});
gsap.set('#pizza',{opacity:0,x:1070,y:1139});
gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});
gsap.set('#oven',{x:OVX,y:TT});
gsap.set('#cocoSwing',{opacity:0});gsap.set('#peel',{opacity:0});
gsap.set('#pigG',{opacity:0});
gsap.set('#cm',{opacity:1,x:1090,y:FLOOR,scale:.76});gsap.set('#cmSq',{scaleY:1});gsap.set('#cmArmL',{rotation:0});gsap.set('#cmArmR',{rotation:0});
gsap.set('#bananas',{opacity:1,x:1990,y:1664,scale:1.35});gsap.set('#bananasIn',{scaleY:.7,scaleX:1.1});
gsap.set('#fridgeDoor',{scaleX:.16});
gsap.set('#gdPeek',{opacity:0});
gsap.set('#gm',{opacity:1,x:GX,y:FLOOR,scale:GS});gsap.set('#gmArmL',{rotation:0});gsap.set('#gmArmR',{rotation:0});
gsap.set('#gh',{opacity:1,x:800,y:1090,scale:.9});gsap.set('#ghGlow',{opacity:1,scale:1.6});
gsap.set('#feastPc,#feastCk',{opacity:0});
gsap.set('#night',{opacity:.32});
// party props as they were left
gsap.set('#disco',{opacity:1});gsap.set('#discoIn',{y:0});gsap.set('#beams',{opacity:0});
for(let i=0;i<12;i++) gsap.set('#pf'+i,{opacity:.12});
// the window saucer + alien
gsap.set('#ufo',{opacity:1});gsap.set('#ufoBeam',{opacity:.5});gsap.set('#ufoBlip',{opacity:1,scale:1.35});
gsap.set('#peanutG',{opacity:0});
// the new arrivals start hidden
gsap.set('#bp',{opacity:0,x:880,y:FLOOR,scale:.62});gsap.set('#zp',{opacity:0,x:880,y:FLOOR,scale:.6});
gsap.set('#ufoL',{opacity:0,x:880,y:FLOOR});

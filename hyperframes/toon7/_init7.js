gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,.slc,.dst,#wedgeBigIn,#pizza,#pizzaIn,#oven,#ovenIn,#peel,#peelIn,#bananas,#bananasIn,#pzTop,#pzSauce,#pzCheese,#pzLove,#pzBaked,#feastPc,#feastPcIn,#feastCk,#feastCkIn',{svgOrigin:'0 0'});
gsap.set('#fridgeDoor',{svgOrigin:'2360 0'});gsap.set('#gdPupil,#gdEyeG,#gdBrow',{svgOrigin:'2088 1090'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm','tw','tf','cm','gm','gh']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Hat,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Snout,.${p}Eye,.${p}EyeW,.${p}Pupil,.${p}Swirl,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#cmFlip',{svgOrigin:'0 -170'});
gsap.set('#gmBelly',{svgOrigin:'0 -205'});gsap.set('#gmBody',{svgOrigin:'0 -250'});
gsap.set('#ghBody',{svgOrigin:'0 -200'});gsap.set('#ghHead',{svgOrigin:'0 -260'});gsap.set('#ghGlow',{svgOrigin:'0 -200'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #6 (the gang in front of the fridge, Gumdrop's eye in the half-open door, Coco dizzy in the bananas)
const MCS=.66, NSC=.46, BOX=500, BOS=.88, TFS=.68;
const FRIDGE=[1150,0,.84];                       // fridge camera / floor line
const GX=1960, GS=1.5;                         // Gumdrop's spot in front of the fridge, and his size once he is out
gsap.set('#bo',{x:1680,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:BOX,y:1122});gsap.set('#panGlaze',{opacity:1});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#cheeseWheel,#wedgeBig',{opacity:0});
gsap.set('#mc',{x:1380,y:FLOOR,scale:.68});gsap.set('#mcSq',{scaleY:1});gsap.set('#mcLids',{opacity:1});gsap.set('#mcArmL',{rotation:-28});gsap.set('#mcArmR',{rotation:28});
gsap.set('#nb',{opacity:0});
gsap.set('#nm',{opacity:1,x:1245,y:FLOOR,scale:.5});gsap.set('#nmWedgeG',{opacity:1});gsap.set('#nmArmL',{rotation:-38});gsap.set('#nmArmR',{rotation:38});
gsap.set('#tw',{opacity:0});
gsap.set('#tf',{opacity:1,x:1460,y:FLOOR,scale:.74});gsap.set('#tfArmL',{rotation:0});gsap.set('#tfArmR',{rotation:0});gsap.set('#tfSweat',{opacity:0});
gsap.set('#pzSauce,#pzCheese,#pzTop,#pzLove,#pzBaked',{opacity:1});
gsap.set('#pizza',{opacity:1,x:1460,y:1138.2,scale:.46,rotation:0});
gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});
gsap.set('#oven',{x:OVX,y:TT});
gsap.set('#cocoSwing',{opacity:0});gsap.set('#peel',{opacity:0});
gsap.set('#pigG',{opacity:0});
gsap.set('#cm',{opacity:1,x:1980,y:1656,scale:.76});gsap.set('#cmSq',{scaleY:.84});gsap.set('#cmArmL',{rotation:-30});gsap.set('#cmArmR',{rotation:30});
gsap.set('#bananas',{opacity:1,x:1990,y:1664,scale:1.35});gsap.set('#bananasIn',{scaleY:.5,scaleX:1.2});
gsap.set('#fridgeDoor',{scaleX:.44});
gsap.set('#gdPupil',{x:14,y:12});gsap.set('#gdBrow',{rotation:-12,y:-4});gsap.set('#gdEyeG',{scale:1.08});
gsap.set('#gm',{opacity:0,x:2088,y:FLOOR,scale:1});
gsap.set('#gh',{opacity:0,x:1240,y:1560,scale:.9});gsap.set('#ghGlow',{opacity:0});
gsap.set('#feastPc,#feastCk',{opacity:0});
gsap.set('#night',{opacity:0});

gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,.slc,#wedgeBigIn,#pizza,#pizzaIn,#oven,#ovenIn,#peel,#peelIn,#bananas,#bananasIn,#pzTop,#pzSauce,#pzCheese,#pzLove,#pzBaked',{svgOrigin:'0 0'});
gsap.set('#fridgeDoor',{svgOrigin:'2360 0'});gsap.set('#gdPupil,#gdEyeG,#gdBrow',{svgOrigin:'2088 1090'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm','tw','tf','cm']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Hat,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Snout,.${p}Eye,.${p}EyeW,.${p}Pupil,.${p}Swirl,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#cmFlip',{svgOrigin:'0 -170'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #5 (everyone frozen at the table, the pizza gone, a banana peel on the board)
const MCS=.66, NSC=.46, BOX=500, BOS=.88, TFS=.68, MCX=690, NIX=840, BOX2=BOX+90;
const FRIDGE=[1150,0,.84];                       // fridge camera / floor line
gsap.set('#bo',{x:BOX2,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:BOX,y:1122});gsap.set('#panGlaze',{opacity:1});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#cheeseWheel,#wedgeBig',{opacity:0});
gsap.set('#mc',{x:MCX,y:TT,scale:MCS});gsap.set('#mcSq',{scaleY:.94});gsap.set('#mcLids',{opacity:0});gsap.set('#mcArmL',{rotation:-28});gsap.set('#mcArmR',{rotation:28});
gsap.set('#nb',{opacity:0});
gsap.set('#nm',{opacity:1,x:NIX,y:TT,scale:NSC});gsap.set('#nmWedgeG',{opacity:1});gsap.set('#nmArmL',{rotation:-38});gsap.set('#nmArmR',{rotation:38});
gsap.set('#tw',{opacity:0});
gsap.set('#tf',{opacity:1,x:PZX,y:TT-10,scale:TFS});gsap.set('#tfArmL',{rotation:150});gsap.set('#tfArmR',{rotation:-150});gsap.set('#tfSweat',{opacity:1});
gsap.set('#pizza',{opacity:0,x:PZX,y:PZY});
gsap.set('#board',{opacity:1,svgOrigin:PZX+' '+PZY});
gsap.set('#oven',{x:OVX,y:TT});
gsap.set('#cocoSwing',{opacity:0});gsap.set('#peel',{opacity:1,x:PZX+20,y:PZY-6,rotation:20});
gsap.set('#pigG',{opacity:0});
gsap.set('#cm',{opacity:0,x:2170,y:424,scale:.7});gsap.set('#cmSq',{scaleY:.84});
gsap.set('#bananas',{opacity:0,x:1990,y:1664});

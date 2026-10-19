gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,#bowlIn,#bowl2In,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,#wedgeBigIn',{svgOrigin:'0 0'});
gsap.set('#pigIn',{svgOrigin:'550 736'});gsap.set('#pigSnout',{svgOrigin:'550 716'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Body,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
gsap.set('.steam',{attr:{stroke:'#FFE27A'}});
// ---- starting state = the last frame of video #3 (Nibbles in his hole); everything else waits off-screen
const MCS=.66, NSC=.46, BOX=500, BOS=.88, FJY=TT-PL;
gsap.set('#bo',{x:BOX,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:BOX,y:1122});gsap.set('#panLegs',{opacity:1});gsap.set('#panEyesClosed',{opacity:0});gsap.set('#panEyes',{opacity:1});
gsap.set('#panGlaze',{opacity:1});gsap.set('#panArmL',{rotation:-30});gsap.set('#panArmR',{rotation:30});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#mc',{x:CHX,y:CHTOP,scale:MCS});
gsap.set('#nb',{x:1640,y:1476,scale:NSC});gsap.set('#nbCheese',{opacity:1});
gsap.set('#nm',{opacity:0,x:1640,y:1476,scale:NSC});
gsap.set('#pigG',{opacity:0});

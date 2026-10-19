gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,#bowlIn,#bowl2In,.spk,.hrt,.drp,.bit,.bub,.beeB,#duck,#jar,#jarIn,#bwJarIn',{svgOrigin:'0 0'});
gsap.set('#duck',{svgOrigin:'1092 1066'});gsap.set('#barnIn',{svgOrigin:'550 736'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['rk','bw']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Body,#${p}Head,#${p}Belly,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#nb,#nbSq,#nbLean,#nbHead,#nbEarL,#nbEarR,.nbEye,.nbEyeW,.nbPupil,#nbBrowL,#nbBrowR',{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #2 (everyone frozen, Barnaby's silhouette in the window)
gsap.set('#bo',{x:BX,y:FLOOR});
gsap.set('#bowl',{opacity:1,x:BX+130,y:1500});gsap.set('#spoon',{opacity:1,x:BX+210,y:1470});gsap.set('#bowl2',{opacity:1,x:1235,y:1095});
gsap.set('#pan',{x:TUBX-8,y:TUBY});gsap.set('#panLegs',{opacity:0});gsap.set('#panEyes',{opacity:0});gsap.set('#panEyesClosed',{opacity:1});
gsap.set('#panArmL',{rotation:-82});gsap.set('#panArmR',{rotation:82});
gsap.set('#bh',{opacity:0});gsap.set('#bhArmL',{rotation:-120});gsap.set('#bhArmR',{rotation:120});
gsap.set('#rk',{x:1235,y:RKB,scale:.85,opacity:1});
gsap.set('#bw',{x:550,y:973,scale:.8,opacity:0});
gsap.set('#barnG',{opacity:1});
gsap.set('#jar',{opacity:0,x:716,y:655,scale:.7});
gsap.set('#nb',{x:1640,y:1620,scale:.46});

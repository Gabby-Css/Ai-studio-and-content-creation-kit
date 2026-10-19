PAIRS = [
    ("gsap.set('#eggWob,#eggRoll,#eggCap,#eggBase,#blanket,#note',{svgOrigin:'0 0'});",
     "gsap.set('#eggW,#eggHop,#eggWob,#eggRoll,#eggCap,#eggBase,#blanket,#note',{svgOrigin:'0 0'});"),
    ("gsap.set('#pb',{opacity:0,x:EGX,y:EGY-20,scale:.3});",
     "for(const p of ['pb']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Flip,#${p}Body,#${p}Belly,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,#${p}Ant,#${p}AntL,#${p}AntR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});\ngsap.set('#pb',{opacity:0,x:EGX,y:EGY-20,scale:.3});"),
]

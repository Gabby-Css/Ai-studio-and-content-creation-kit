PAIRS = [
    ("const BMOUTH=[BB[0],BB[1]-410*.3];", "const BMOUTH=[BB[0],BB[1]-410*PBS];"),
    ("const PBU=1/.3;", "const PBU=1/PBS;"),
    ("baby:[939,1037,1.1],", "baby:[939,971,1.1],"),
    ("tl.set('#pb',{opacity:1,x:EGX,y:EGY-12,scale:.3},tH);", "tl.set('#pb',{opacity:1,x:EGX,y:EGY-12,scale:PBS},tH);"),
    ("{y:-40*PBU},{y:-175*PBU,duration:.35,ease:'back.out(2.2)'}", "{y:-40*PBU},{y:-140*PBU,duration:.35,ease:'back.out(2.2)'}"),
    ("tl.fromTo('#pbSq',{y:-175*PBU},{y:0,duration:.5,ease:'bounce.out'},L[6]);", "tl.fromTo('#pbSq',{y:-140*PBU},{y:0,duration:.5,ease:'bounce.out'},L[6]);"),
]

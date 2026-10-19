PAIRS = [
    ("tl.to('#pbSq',{y:230,duration:.3,ease:'power2.in'},L[7]-.25);                   // he sinks down behind the pile\n", ""),
    ("tl.fromTo('#pbSq',{y:230},{y:-120,duration:.6,ease:'power2.out'},L[9]-.05);", "tl.fromTo('#pbSq',{y:0},{y:-330,duration:.6,ease:'power2.out'},L[9]-.05);                 // his head comes up over the stack"),
    ("runTo('pt',1130,ROWF,L[3]-.9,.8,.7,16);", "runTo('pt',1100,ROWD+30,L[3]-.9,.8,.7,16);"),
    ("pt:camOn(...eyeAt('pt',1130,ROWF,.7),.9,540,780),", "pt:camOn(...eyeAt('pt',1100,ROWD+30,.7),.9,540,780),"),
    ("tl.to('#pbSq',{y:0,duration:.3,ease:'power2.in'}", "tl.to('#pbSq',{y:0,duration:.3,ease:'power2.in'}", 0),
    ("hop('#pbSq',W(10,1)+.15,60*PBU,.12,.16);", "hop('#pbSq',W(10,1)+.15,60*PBU,.12,.16);tl.to('#pbSq',{y:0,duration:.35,ease:'power2.in'},W(10,1)+.55);"),
]

PAIRS = [
    ("const tStk=L[11]+DU[11]+1.0;", "const tStk=L[11]+DU[11]+1.0;\nconst PBU=1/.3;                                            // baby Pebble is drawn at scale .3: his own (#pbSq) offsets are in unscaled units"),
    ("tl.fromTo('#pbSq',{y:-40},{y:-175,duration:.35,ease:'back.out(2.2)'},tH+.05);", "tl.fromTo('#pbSq',{y:-40*PBU},{y:-175*PBU,duration:.35,ease:'back.out(2.2)'},tH+.05);"),
    ("tl.fromTo('#pbSq',{y:-175},{y:0,duration:.5,ease:'bounce.out'},L[6]);", "tl.fromTo('#pbSq',{y:-175*PBU},{y:0,duration:.5,ease:'bounce.out'},L[6]);"),
    ("runTo('pb',BB[0],BB[1],L[6]+.55,.8,.3,20);", "tl.to('#pb',{x:BB[0],y:BB[1],duration:.8,ease:'sine.inOut'},L[6]+.55);cycle(['#pbLegL','#pbLegR'],['#pbArmL','#pbArmR'],L[6]+.55,L[6]+1.35,.24,22,10,'#pbSq',30);"),
    ("hop('#pbSq',L[7]+.2,40,.12,.16);hop('#pbSq',L[7]+.6,40,.12,.16);", "hop('#pbSq',L[7]+.2,40*PBU,.12,.16);hop('#pbSq',L[7]+.6,40*PBU,.12,.16);"),
    ("[0,1,2].forEach(i=>hop('#pbSq',W(10,i),50+i*20,.12,.16));", "[0,1,2].forEach(i=>hop('#pbSq',W(10,i),(50+i*20)*PBU,.12,.16));"),
    ("hop('#pbSq',W(11,3)+.1,70,.14,.2);hop('#pbSq',W(11,3)+.7,70,.14,.2);", "hop('#pbSq',W(11,3)+.1,70*PBU,.14,.2);hop('#pbSq',W(11,3)+.7,70*PBU,.14,.2);"),
    ("kslice(W(9,5)-.55,1680,ROWD-10,BMOUTH[0],BMOUTH[1],.55,.7);", "kslice(W(9,5)-.55,1500,2230,BMOUTH[0],BMOUTH[1],.55,.7);"),
    ("sparks(W(8,4)+.1,1680,ROWD-60,8,140);", "sparks(W(8,4)+.1,1500,2200,8,140);"),
    ("tl.to('#night',{opacity:.16,duration:1.4},W(11,1));", "tl.to('#night',{opacity:.12,duration:1.4},W(11,1));"),
]

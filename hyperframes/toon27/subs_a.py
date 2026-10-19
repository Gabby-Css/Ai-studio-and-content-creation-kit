PAIRS = [
    ("const BOF=[2570,2300];", "const BOF=[2690,2290];"),
    ("boo:[1709,665,.7], fin:[1380,-120,.53]};", "boo:[1709,665,.7], fin:[1650,500,.62]};"),
    ("follow('bo',TR0+.1,L[9]-.6,460,ROWF+BOY,24);", "follow('bo',TR0+.1,L[9]-.6,300,ROWF+BOY,24);"),
    ("follow('mc',TR0+.2,TR0+RD,560,ROWD,22);", "follow('mc',TR0+.2,TR0+RD,400,ROWD,22);"),
    ("follow('tf',TR0+.3,TR0+RD,690,ROWD+70,20);", "follow('tf',TR0+.3,TR0+RD,540,ROWD+70,20);"),
    ("follow('gm',TR0+.4,TR0+RD,980,ROWF,14);", "follow('gm',TR0+.4,TR0+RD,780,ROWF,14);"),
    ("camTo(t,.4,Math.max(0,e[0]-560),e[1]-262*EGS-1075,.75,'none');", "camTo(t,.4,Math.max(0,e[0]-760),e[1]-262*EGS-1075,.75,'none');"),
    ("tl.to('#gh',{x:ENDX+10,y:1850,scale:.85,duration:1.5,ease:'sine.inOut'},L[9]+.2);", "tl.to('#gh',{x:ENDX-100,y:1830,scale:.85,duration:1.5,ease:'sine.inOut'},L[9]+.2);"),
    ("tl.to('#bo',{x:BOF[0]+60,duration:.3,ease:'power2.out'},TR0+RD-.05);", "tl.to('#bo',{x:BOF[0]+40,duration:.3,ease:'power2.out'},TR0+RD-.05);"),
    ("hearts(W(11,3),ENDX,ENDY-520,6,120,300);sparks(W(11,3),ENDX,ENDY-300,10,220);", "hearts(W(11,3),ENDX+120,ENDY-560,6,120,300);sparks(W(11,3),ENDX+60,ENDY-300,10,220);"),
    ("confetti(W(11,3)+.2,1500,3300,ROWB-1500,ROWJ+160,36,.9);", "confetti(W(11,3)+.2,1700,3300,ROWB-1500,ROWJ+160,36,.9);"),
    ("sparks(W(4,4),1100,1160,8,160);", "sparks(W(4,4),960,1440,8,160);"),
]

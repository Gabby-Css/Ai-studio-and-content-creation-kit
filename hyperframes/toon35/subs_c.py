PAIRS = [
    ("gsap.set('#gh',{opacity:1,x:1250,y:1380,scale:.7});", "gsap.set('#gh',{opacity:1,x:1250,y:880,scale:.7});"),
    ("const XL=1500+SPD.dist(tF);                                // the finish line (world x at t=0): it reaches the pack (x=1500) at tF",
     "const LU=[1620,1520,1420,1320,1220];                       // line-up x per lane at the photo finish (the line leans: 100 px per lane)\nconst XL=1878+SPD.dist(tF);                                // the finish pole (world x at t=0): the slanted line meets the karts' bumpers at tF"),
    ("const LINEUP=1500;\n['mc','zp','cm','tf'].forEach((p,i)=>drive(p,L[5]-.1+i*.05,1.9,LINEUP,'sine.inOut'));\ndriveBo(L[5]-.1,1.9,LINEUP,'sine.inOut');",
     "['mc','zp','cm','tf'].forEach((p,i)=>drive(p,L[5]-.1+i*.05,1.9,LU[KRC[p].L],'sine.inOut'));\ndriveBo(L[5]-.1,1.9,LU[4],'sine.inOut');"),
    ("['mc','zp','cm','tf'].forEach((p,i)=>drive(p,tF+.05,1.2,1580,'power2.out'));driveBo(tF+.05,1.2,1580,'power2.out');",
     "['mc','zp','cm','tf'].forEach((p,i)=>drive(p,tF+.05,1.2,LU[KRC[p].L]+70,'power2.out'));driveBo(tF+.05,1.2,LU[4]+70,'power2.out');"),
    ("SQC.forEach((s,i)=>hop(s,tF+.5+i*.05,44,.12,.16));hearts(tF+.7,1560,1650,5,140,280);", "SQC.forEach((s,i)=>hop(s,tF+.5+i*.05,44,.12,.16));hearts(tF+.7,1500,1650,5,140,280);"),
    ("[['bo',1580],['mc',1580],['zp',1580],['cm',1580],['tf',1580]].forEach(([p,x],i)=>kslice(L[10]+.1+i*.12,1850,2740-420,x+(i%2?40:-30),LANE[KRC[p].L]-320,.5,.8));",
     "['bo','mc','zp','cm','tf'].forEach((p,i)=>kslice(L[10]+.1+i*.12,1850,2740-420,LU[KRC[p].L]+70+(i%2?40:-30),LANE[KRC[p].L]-320,.5,.8));"),
    ("tl.to('#gh',{x:1750,y:1250,duration:1.3,ease:'sine.inOut'},L[9]);", "tl.to('#gh',{x:1650,y:900,duration:1.3,ease:'sine.inOut'},L[9]);"),
    ("confetti(tF+.3,700,2300,700,2640,34,.9);", "confetti(tF+.3,700,2300,700,2640,34,.9);\nspeedLines(tF-.2,tF+.4);"),
]

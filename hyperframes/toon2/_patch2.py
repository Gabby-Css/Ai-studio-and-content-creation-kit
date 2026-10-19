p='build/template.tpl'
s=open(p,encoding='utf-8').read()
def rep(a,b,cnt=1):
    global s
    c=s.count(a)
    assert c==cnt,(a[:80],c)
    s=s.replace(a,b)

# 1. captions a bit smaller so 20-char chunks stay on one line
rep("font-size:92px;line-height:1.0;letter-spacing:0;color:#fff;opacity:0}","font-size:86px;line-height:1.0;letter-spacing:0;color:#fff;opacity:0}")
rep(".cg .w{display:inline-block;margin:0 14px;",".cg .w{display:inline-block;margin:0 12px;")
# 2. sticker smaller / lower so it doesn't hide Bo
rep("#sticker{position:absolute;left:50%;bottom:120px;","#sticker{position:absolute;left:50%;bottom:90px;")
rep("padding:26px 20px 20px;font-size:112px;line-height:.98;","padding:22px 20px 16px;font-size:98px;line-height:.98;")
rep("padding:8px 34px 12px;font-size:56px;","padding:6px 30px 10px;font-size:48px;")

# 3. tub moves right (+90) and its front wall gets the heart decal lower
rep('<g id="tubBack">','<g id="tubBack" transform="translate(90,0)">')
rep('<g id="tubFront">','<g id="tubFront" transform="translate(90,0)">')
rep('stroke-linejoin="round" transform="translate(0,12)"/>','stroke-linejoin="round" transform="translate(0,40) scale(.8)" />')
rep("translate(${950+i*50},1030)","translate(${1040+i*50},1030)")
rep("TT=1165, PL=68, RKT=TT, RKB=1400, RKF=1600, TUBX=1000, TUBY=1110;","TT=1165, PL=68, RKT=TT, RKB=1400, RKF=1600, TUBX=1090, TUBY=1110, RKX=1370;")

# 4. z-order: pancake + Rocky behind the tub's front wall, Bo in front of everything (he runs past the tub)
rep('<g id="boMount"></g>\n<g id="panMount"></g>\n<g id="rkClip" clip-path="url(#cpNoTable)"><g id="rkMount"></g></g>\n<g id="bowlMount"></g>\n<g id="tubFront" transform="translate(90,0)">',
    '<g id="panMount"></g>\n<g id="rkClip" clip-path="url(#cpNoTable)"><g id="rkMount"></g></g>\n<g id="tubFront" transform="translate(90,0)">')
rep('</g>\n<g id="fxMount"></g>','</g>\n<g id="boMount"></g>\n<g id="bowlMount"></g>\n<g id="fxMount"></g>')

# 5. Flapjack's table spots (Bo is now in front of her)
rep("gsap.set('#pan',{x:700,y:TT-PL});","gsap.set('#pan',{x:790,y:TT-PL});")
rep("tl.fromTo('#pan',{x:700},{x:775,duration:.4,ease:'none'},W(1,10)-.1);","tl.fromTo('#pan',{x:790},{x:840,duration:.4,ease:'none'},W(1,10)-.1);")
rep("hearts(W(1,11)-.05,760,990,6,56,330);","hearts(W(1,11)-.05,800,990,6,56,330);")
rep("sparks(W(1,7)+.1,700,980,7,130);","sparks(W(1,7)+.1,790,980,7,130);")
rep("tl.fromTo('#pan',{x:775},{x:TUBX-8,duration:.55,ease:'none'},hop);","tl.fromTo('#pan',{x:840},{x:TUBX-8,duration:.55,ease:'none'},hop);")

# 6. cameras
rep("camSet(0,190,380,1.15);camTo(0,S2,230,420,1.24,'sine.inOut');","camSet(0,200,380,1.15);camTo(0,S2,250,420,1.22,'sine.inOut');")
rep("camSet(S2,250,500,1.15);camTo(S2,S3-S2,310,520,1.2,'sine.inOut');","camSet(S2,335,500,1.13);camTo(S2,S3-S2,350,520,1.15,'sine.inOut');")
rep("camSet(S4,470,380,1.1);camTo(gT+.35,1.0,560,390,1.1);","camSet(S4,430,360,1.0);camTo(gT+.35,1.0,560,390,1.05);")
rep("camSet(S6,330,150,1.0);camTo(S6,L9E-S6+.4,350,170,1.05,'sine.inOut');","camSet(S6,335,215,.97);camTo(S6,L9E-S6+.4,350,230,1.0,'sine.inOut');")

# 7. Rocky's route (table end is closer to the tub now) and standoff spot
rep("gsap.set('#rk',{x:1290,y:RKT,scale:.78,opacity:0});","gsap.set('#rk',{x:1420,y:RKT,scale:.78,opacity:0});")
rep("tl.set('#rk',{x:1290,y:RKT,scale:.78,opacity:1},S4);","tl.set('#rk',{x:1420,y:RKT,scale:.78,opacity:1},S4);")
rep("tl.fromTo('#rk',{x:1290},{x:1215,duration:gT-S4,ease:'sine.inOut'},S4);","tl.fromTo('#rk',{x:1420},{x:RKX,duration:gT-S4,ease:'sine.inOut'},S4);")
rep("tl.fromTo('#pan',{x:TUBX-8},{x:1215,duration:.4,ease:'none'},gT);","tl.fromTo('#pan',{x:TUBX-8},{x:RKX,duration:.4,ease:'none'},gT);")
rep("tl.fromTo('#rk',{x:1215},{x:1455,duration:rB-rA,ease:'power1.in'},rA);","tl.fromTo('#rk',{x:RKX},{x:1455,duration:rB-rA,ease:'power1.in'},rA);")
rep("tl.fromTo('#rk',{x:1625},{x:1830,duration:rD-rC,ease:'none'},rC);","tl.fromTo('#rk',{x:1625},{x:1860,duration:rD-rC,ease:'none'},rC);")
rep("bits(t+.1,1830,1300,4);","bits(t+.1,1860,1300,4);")
rep("tl.fromTo('#bowl2',{x:1700,y:1500},{x:1830,y:1345,duration:.4,ease:'power2.inOut'},W(5,8));","tl.fromTo('#bowl2',{x:1695,y:1500},{x:1860,y:1345,duration:.4,ease:'power2.inOut'},W(5,8));")
rep("tl.set('#bowl2',{opacity:1,x:1700,y:1500},bw);","tl.set('#bowl2',{opacity:1,x:1695,y:1500},bw);")
rep("sparks(bw+.1,1700,1440,6,100);","sparks(bw+.1,1695,1440,6,100);")
rep("tl.fromTo('#bo',{x:1540},{x:1600,duration:.4,ease:'sine.inOut'},bw);","tl.fromTo('#bo',{x:1540},{x:1565,duration:.4,ease:'sine.inOut'},bw);")

# 8. Bo carries his cereal bowl while he chases and shuffles (bowl+spoon follow him)
rep("tl.fromTo('#bo',{x:BX},{x:1480,duration:bB-bA,ease:'power1.in'},bA);",
    "tl.fromTo('#bo',{x:BX},{x:1480,duration:bB-bA,ease:'power1.in'},bA);\n"
    "tl.fromTo('#bowl',{x:BX+130,y:1500},{x:1480+130,y:1500,duration:bB-bA,ease:'power1.in'},bA);\n"
    "tl.fromTo('#spoon',{x:BX+210,y:1470},{x:1480+210,y:1470,duration:bB-bA,ease:'power1.in'},bA);\n"
    "[.3,.55,.8].forEach(f=>bits(bA+f*(bB-bA),BX+(1480-BX)*f*f+130,1480,3));")
rep("tl.fromTo('#bo',{x:1480},{x:1540,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);",
    "tl.fromTo('#bo',{x:1480},{x:1540,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);\n"
    "tl.fromTo('#bowl',{x:1610},{x:1670,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);\n"
    "tl.fromTo('#spoon',{x:1690},{x:1750,duration:rumble-tB-.1,ease:'sine.inOut'},tB+.1);")
rep("tl.fromTo('#bo',{x:1540},{x:1565,duration:.4,ease:'sine.inOut'},bw);",
    "tl.fromTo('#bo',{x:1540},{x:1565,duration:.4,ease:'sine.inOut'},bw);\n"
    "tl.fromTo('#bowl',{x:1670},{x:1695,duration:.4,ease:'sine.inOut'},bw);\n"
    "tl.fromTo('#spoon',{x:1750},{x:1775,duration:.4,ease:'sine.inOut'},bw);")
# S6 resets
rep("tl.set('#bowl',{opacity:1},S6);","tl.set('#bowl',{opacity:1,x:BX+130,y:1500},S6);")
rep("tl.set('#bowl2',{opacity:1,x:1260,y:1095},S6);","tl.set('#bowl2',{opacity:1,x:1235,y:1095},S6);")
rep("tl.set('#rk',{x:1260,y:RKB,scale:.85,opacity:1},S6);","tl.set('#rk',{x:1235,y:RKB,scale:.85,opacity:1},S6);")
rep("gsap.set('#bowl2',{x:1260,y:1095});","gsap.set('#bowl2',{x:1235,y:1095});")
open(p,'w',encoding='utf-8').write(s)
print('patched OK')

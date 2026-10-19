import re
HERE = __file__.rsplit('\\', 1)[0] if '\\' in __file__ else '.'
p = HERE + '/_scenes4.js'
s = open(p, encoding='utf-8').read()


def rep(a, b, cnt=1):
    global s
    assert s.count(a) == cnt, (a[:70], s.count(a))
    s = s.replace(a, b)


rep("const WIDE=[335,215,.97];", "const WIDE=[305,215,.97];\nconst NBY=1448;                                          // Nibbles' standing height in the hole")
rep("const tToss=[W(9,0)+.1,W(9,1)+.15,W(9,2)-.05];", "const tToss=[W(9,0)+.1,W(9,1)+.2,W(9,1)+.5];")
rep("const tHush=W(9,3)-.05, tPig=W(9,5)-.35;", "const tHush=W(10,0)-.05, tPig=W(10,2)-.35;")
rep("const tStk=L[10]+DU[10]+.15;", "const tStk=L[11]+DU[11]+.15;")
rep("camTo(L[9]-.2,.6,...WIDE);", "camTo(L[9]-.25,.6,...WIDE);")
rep("steam(tHush+.2,L[10]+DU[10]);", "steam(tHush+.2,L[11]+DU[11]);")
rep("repeat:Math.max(1,Math.round(DU[10]/.28))},L[10]);", "repeat:Math.max(1,Math.round(DU[11]/.28))},L[11]);")
rep("repeat:Math.max(1,Math.round(DU[10]/.6))},L[10]);", "repeat:Math.max(1,Math.round(DU[11]/.6))},L[11]);")
# Nibbles stands a bit higher so the cheese in his paws shows above the hole's lip
rep("camSet(0,1370,900,2.0);", "camSet(0,1370,900,2.0);\ntl.to('#nb',{y:NBY,duration:.3,ease:'back.out(2)'},.05);")
rep("tl.set('#nb',{opacity:0},tN0);tl.set('#nm',{opacity:1,x:1640,y:1476,scale:NSC},tN0);", "tl.set('#nb',{opacity:0},tN0);tl.set('#nm',{opacity:1,x:1640,y:NBY,scale:NSC},tN0);")
rep("arc('#nm',tN0,.3,1476,50,1580);", "arc('#nm',tN0,.3,NBY,50,1580);")
# sparks off his face
rep("hearts(L[8]+.2,XP,1000,5,70,240);sparks(W(8,1),XP,960,8,150);", "hearts(L[8]+.2,XP,1000,5,70,240);sparks(W(8,1),XP,1020,8,210);")
open(p, 'w', encoding='utf-8').write(s)

# template: captions for 11 lines
p2 = HERE + '/mk_template4.py'
t = open(p2, encoding='utf-8').read()
t = t.replace("new Set([1,2,3,4,5,6,7,8,9,10]);", "new Set([1,2,3,4,5,6,7,8,9,10,11]);").replace("for(const ln of [1,2,3,4,5,6,7,8,9,10]){let idx=0;", "for(const ln of [1,2,3,4,5,6,7,8,9,10,11]){let idx=0;")
open(p2, 'w', encoding='utf-8').write(t)

pl = HERE + '/plan.json'
open(pl, 'w').write('{\n  "LINE_T": { "1": 0.20, "2": 3.90, "3": 7.40, "4": 9.40, "5": 11.40, "6": 13.95, "7": 16.65, "8": 19.05, "9": 20.30, "10": 22.55, "11": 24.90 }\n}\n')
print('patched')

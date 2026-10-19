import os
HERE = os.path.dirname(os.path.abspath(__file__))


def patch(path, pairs):
    s = open(os.path.join(HERE, path), encoding='utf-8').read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, a[:70], s.count(a))
        s = s.replace(a, b)
    open(os.path.join(HERE, path), 'w', encoding='utf-8').write(s)


patch('_scenes4.js', [
    ("const tN0=L[6]+.15;", "const tN0=L[6]+.9;"),
    ("const tN1=tN0+.3, tN2=tN1+.95, tN3=tN2+1.05, tN4=tN3+.35;", "const tN1=tN0+.3, tN2=tN1+.8, tN3=tN2+.9, tN4=tN3+.35;"),
    ("camTo(L[7]-.5,.9,950,270,1.0);", "camTo(L[7]-.75,.9,950,270,1.0);"),
    ("hearts(L[8]+.2,XP,1000,5,70,240);", "hearts(L[8]+.2,XP-215,1040,2,60,240);hearts(L[8]+.3,XP+215,1040,2,60,240);"),
    ("tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8}",
     "camTo(tHush+.3,5.5,290,200,1.06,'sine.inOut');\ntl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8}"),
])
patch('mk_audio4.py', [
    ("tN0 = L[6] + .15; tN1 = tN0 + .3; tN2 = tN1 + .95; tN3 = tN2 + 1.05; tN4 = tN3 + .35",
     "tN0 = L[6] + .9; tN1 = tN0 + .3; tN2 = tN1 + .8; tN3 = tN2 + .9; tN4 = tN3 + .35"),
])
open(os.path.join(HERE, 'plan.json'), 'w').write(
    '{\n  "LINE_T": { "1": 0.20, "2": 3.90, "3": 7.40, "4": 9.40, "5": 11.40, "6": 13.95, "7": 16.65, "8": 19.45, "9": 20.70, "10": 22.95, "11": 24.95 }\n}\n')
print('ok')

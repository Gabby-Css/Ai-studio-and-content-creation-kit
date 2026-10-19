import os
HERE = os.path.dirname(os.path.abspath(__file__))


def patch(path, pairs):
    s = open(os.path.join(HERE, path), encoding='utf-8').read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, a[:70], s.count(a))
        s = s.replace(a, b)
    open(os.path.join(HERE, path), 'w', encoding='utf-8').write(s)


patch('_defs5.js', [
    ('const boardSVG=`<g transform="translate(${PZX},${PZY})"><ellipse cx="0" cy="22" rx="214" ry="54" fill="#B4733A" ${sw(6)}/></g>`;',
     'const boardSVG=`<g id="board" opacity="0"><g transform="translate(${PZX},${PZY})"><ellipse cx="0" cy="22" rx="214" ry="54" fill="#D9A25B" ${sw(6)}/><ellipse cx="-30" cy="14" rx="150" ry="30" fill="#E8BC7A" opacity=".7"/></g></g>`;'),
])
patch('_scenes5.js', [
    ("tl.fromTo('#cocoSwing',{rotation:44},{rotation:0,duration:.55,ease:'power1.in'},tSw0);",
     "tl.fromTo('#cocoSwing',{rotation:-44},{rotation:0,duration:.55,ease:'power1.in'},tSw0);"),
    ("tl.to('#cocoSwing',{rotation:-52,duration:.7,ease:'power1.out'},tGrab);",
     "tl.to('#cocoSwing',{rotation:52,duration:.7,ease:'power1.out'},tGrab);"),
    ("eyesMode(tFz,'wide');bm(tFz,'mO');look(tFz,-22,-26,.1);brows(tFz,-16,16,-12,.1);",
     "eyesMode(tFz,'wide');bm(tFz,'mO');look(tFz,24,-18,.1);brows(tFz,-16,16,-12,.1);"),
    ("FB.pm(tFz,'Oh');FB.look(tFz,-16,-12,.1);", "FB.pm(tFz,'Oh');FB.look(tFz,16,-10,.1);"),
    ("mcEyes(tFz,'wide');MC.m(tFz,'mO');MC.look(tFz,-22,-20,.1);", "mcEyes(tFz,'wide');MC.m(tFz,'mO');MC.look(tFz,22,-18,.1);"),
    ("NN.eyes(tFz,'wide');NN.m(tFz,'mO');NN.look(tFz,-24,-12,.1);", "NN.eyes(tFz,'wide');NN.m(tFz,'mO');NN.look(tFz,24,-12,.1);"),
    ("TF.eyes(tFz,'wide');TF.m(tFz,'mO');TF.look(tFz,-26,-14,.1);", "TF.eyes(tFz,'wide');TF.m(tFz,'mO');TF.look(tFz,26,-14,.1);"),
    ("TF.m(tW0,'mSm');", "TF.m(tW0,'mSm');\ntl.fromTo('#board',{opacity:0,scale:.6},{opacity:1,scale:1,duration:.35,ease:'back.out(1.8)'},tW1-.2);"),
])
patch('_init5.js', [
    ("gsap.set('#pigG',{opacity:1});", "gsap.set('#pigG',{opacity:1});gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});"),
])
print('patched')

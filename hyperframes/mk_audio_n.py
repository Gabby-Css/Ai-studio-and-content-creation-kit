"""python mk_audio_n.py N  ->  toonN/audio.py  (toon3 audio engine + the sfx library accumulated up to toon(N-1) + toonN/_audioN.py cues: moments/extra/events/music)"""
import os, sys
n = int(sys.argv[1])
ROOT = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(ROOT, f"toon{n}")
v3 = open(os.path.join(ROOT, "toon3", "audio.py"), encoding="utf-8").read()
head = v3[:v3.index("# ---- key moments")]
parts = {}
exec(open(os.path.join(D, f"_audio{n}.py"), encoding="utf-8").read(), parts)
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", repr(parts["TITLE"])).replace("_scenes3.js", f"_body{n}.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]
prev = open(os.path.join(ROOT, f"toon{n-1}", "audio.py"), encoding="utf-8").read()
lib = prev[prev.index("def sfx_beep"):prev.index("SFX = []")]
open(os.path.join(D, "audio.py"), "w", encoding="utf-8").write(head + parts["moments"] + inst + lib + parts["extra"] + parts["events"] + parts["music"] + tail)
print("audio.py written for toon", n)

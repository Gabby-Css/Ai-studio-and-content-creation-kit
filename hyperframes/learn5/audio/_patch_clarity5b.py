# second clarity pass: the kids' number shout is a "drop" (music thins out, effects duck away), and the one-syllable 'twelve' is not held for 1.5 s
p = "song.py"; s = open(p, encoding="utf8").read()
old = 'if k == 1: say = f"~{sy[0]}!:C5:6 _:2"'
assert old in s; s = s.replace(old, 'if k == 1: say = f"~{sy[0]}!:C5:4 _:4"')
open(p, "w", encoding="utf8").write(s)

p = "music5_tail.py"; s = open(p, encoding="utf8").read()
old = '''                elif b == 1:
                    groove(bt, ch, nr, tr, 1.0)'''
new = '''                elif b == 1:                                                  # the kids' number shout: the band thins out (kick, shakers, soft bass) so every word is heard
                    groove(bt, ch, nr, tr, .6, kick4=False, claps=False, chops=False, synth=True)'''
assert old in s; s = s.replace(old, new)
# game answer bar: no strums / claps under "Yes! It's fifteen!"
old = '''                    for e in (2, 6): DR(T(e), "clap", 90)
                    for e in range(8): DR(T(e), "shaker", 54 + (8 if e % 2 else 0))
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 84 if d else 62, d, .45)'''
new = '''                    for e in (2, 6): DR(T(e), "clap", 50)
                    for e in range(8): DR(T(e), "shaker", 54 + (8 if e % 2 else 0))
                    for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 60, d, .45)'''
assert old in s; s = s.replace(old, new)
open(p, "w", encoding="utf8").write(s)

p = "sfx.py"; s = open(p, encoding="utf8").read()
old = '''    for t, k, v, gmul in keep:
        fn = KIND.get(k)'''
new = '''    # the kids' number shouts and the game answers must not be covered: every effect that starts in their first 0.9 s is 70% quieter
    D = song.build(); quiet = [(ln["t0"] - .03, ln["t0"] + .9) for ln in D["lines"] if not ln.get("hidden") and ln["words"][0]["who"] == "kids" and ln["meta"].get("part") in ("say", "a")]
    for e in keep:
        if any(a <= e[0] < b for a, b in quiet): e[3] *= .3
    for t, k, v, gmul in keep:
        fn = KIND.get(k)'''
assert old in s; s = s.replace(old, new)
open(p, "w", encoding="utf8").write(s)
print("patched")

"""Season 6 ("The Mystery Egg") setup:  python mk_s6_setup.py
 - creates toon26..toon30 (vendor/gsap, fonts, build.cjs) and writes each episode's tts.py (voice lines) from the toon25 one.
 - python mk_s6_setup.py plan N   ->  toonN/plan.json (line start times from the real voice durations in words.json)"""
import os, re, sys, shutil, json
ROOT = os.path.dirname(os.path.abspath(__file__))

HEAD = "'af_heart', 1.0, "
N = lambda text, ch: (1, text, ch)          # narrator marker (voice below)

# ln: (voice, speed, text, caption chunks, speaker tag, pitch factor, extra ffmpeg filter)
NAR = lambda text, ch: ("'af_heart'", 1.0, text, ch, '', 1.0, None)
BO = lambda text, ch: ("'am_puck'", 1.05, text, ch, 'BO', 1.0, None)
MOCHI = lambda text, ch: ("'bf_emma'", 0.9, text, ch, 'MOCHI', 1.0, None)
ZAP = lambda text, ch: ("'am_michael'", 1.0, text, ch, 'ZAP', 0.9, "ROBOT")
COCO = lambda text, ch: ("'am_echo'", 1.08, text, ch, 'COCO', 1.18, None)
TRUF = lambda text, ch: ("'bm_george'", 0.92, text, ch, 'TRUFFLE', 1.0, None)
BLIP = lambda text, ch: ("'af_sky'", 1.0, text, ch, 'BLIP', 1.35, None)
GUM = lambda text, ch: ("'am_onyx'", 0.88, text, ch, 'GUMDROP', 0.9, None)
BOO = lambda text, ch: ("'af_sky'", 0.95, text, ch, 'BOO', 1.0, None)
PEAN = lambda text, ch: ("'af_bella'", 0.95, text, ch, 'PEANUT', 1.08, None)
JIG = lambda text, ch: ("'af_sky'", 1.0, text, ch, 'JIGGLES', 1.7, None)
BABY = lambda text, ch, tag='PEBBLE': ("'af_bella'", 1.0, text, ch, tag, 1.75, None)
MUNCH = lambda text, ch: ("'am_onyx'", 0.8, text, ch, 'MUNCH', 0.72, "HUGE")
EVERY = lambda text, ch: ("'am_puck'", 1.1, text, ch, 'EVERYBODY', 1.1, None)

EPS = {
    26: ("The Big Gray Egg", {}, {
        1: NAR('The next morning, a giant egg appeared!', ['THE NEXT MORNING,', 'A GIANT EGG', 'APPEARED!']),
        2: BO('Wow! What is it?', ['WOW! WHAT', 'IS IT?']),
        3: MOCHI('Hmph. An egg. Obviously.', ['HMPH. AN', 'EGG. OBVIOUSLY.']),
        4: ZAP('Beep boop! Warm and wiggling!', ['BEEP BOOP!', 'WARM AND', 'WIGGLING!']),
        5: COCO('Ooh-ooh! A giant banana?', ['OOH-OOH! A', 'GIANT', 'BANANA?']),
        6: NAR('Then they found a tiny note.', ['THEN THEY', 'FOUND A', 'TINY NOTE.']),
        7: TRUF('Please keep my egg warm. Love, Munch.', ['PLEASE KEEP', 'MY EGG WARM.', 'LOVE, MUNCH.']),
        8: BO("Munch trusts us! Let's help!", ['MUNCH TRUSTS US!', "LET'S HELP!"]),
        9: NAR('So they tucked it in nice and warm.', ['SO THEY TUCKED', 'IT IN NICE', 'AND WARM.']),
        10: BLIP('Whoa! It wiggled again!', ['WHOA! IT', 'WIGGLED AGAIN!']),
        11: NAR('And inside, something went tap, tap, tap!', ['AND INSIDE,', 'SOMETHING WENT', 'TAP, TAP, TAP!']),
    }),
    27: ("Keep It Warm", {}, {
        1: NAR('Everybody wanted to keep the egg warm!', ['EVERYBODY WANTED', 'TO KEEP THE', 'EGG WARM!']),
        2: TRUF("I'll toast it! Hot, hot, hot!", ["I'LL TOAST IT!", 'HOT, HOT,', 'HOT!']),
        3: MOCHI('Hmph. Too hot. Obviously.', ['HMPH. TOO', 'HOT. OBVIOUSLY.']),
        4: ZAP('Beep boop! Thirty-seven degrees. Perfect!', ['BEEP BOOP!', 'THIRTY-SEVEN', 'DEGREES. PERFECT!']),
        5: GUM("Roar! I'll give it a cuddle!", ["ROAR! I'LL", 'GIVE IT', 'A CUDDLE!']),
        6: NAR('But the egg wiggled and rolled away!', ['BUT THE EGG', 'WIGGLED AND', 'ROLLED AWAY!']),
        7: COCO('Ooh-ooh! Stop that egg!', ['OOH-OOH!', 'STOP THAT', 'EGG!']),
        8: NAR('Down, down, down the hill it rolled!', ['DOWN, DOWN,', 'DOWN THE HILL', 'IT ROLLED!']),
        9: BO("I'll catch it!", ["I'LL CATCH", 'IT!']),
        10: BOO("I... I'll help. Boo.", ["I... I'LL", 'HELP. BOO.']),
        11: NAR('And together, they caught it just in time!', ['AND TOGETHER,', 'THEY CAUGHT IT', 'JUST IN TIME!']),
    }),
    28: ("Crack", {}, {
        1: NAR('That night, the egg began to glow!', ['THAT NIGHT,', 'THE EGG BEGAN', 'TO GLOW!']),
        2: JIG("It's cracking! It's cracking!", ["IT'S CRACKING!", "IT'S CRACKING!"]),
        3: MOCHI('Hmph. Stand back. Obviously.', ['HMPH. STAND', 'BACK. OBVIOUSLY.']),
        4: NAR('Crack, crack, CRACK!', ['CRACK,', 'CRACK,', 'CRACK!']),
        5: BO("It's a baby Munch!", ["IT'S A", 'BABY MUNCH!']),
        6: BABY('Bo! Bo!', ['BO!', 'BO!'], 'BABY'),
        7: BO('Look! He knows my name!', ['LOOK! HE', 'KNOWS MY', 'NAME!']),
        8: TRUF('He must be hungry! Pancakes!', ['HE MUST BE', 'HUNGRY!', 'PANCAKES!']),
        9: NAR('The baby took one tiny bite...', ['THE BABY', 'TOOK ONE', 'TINY BITE...']),
        10: BABY('Yum, yum, yummy!', ['YUM, YUM,', 'YUMMY!'], 'BABY'),
        11: NAR('...and turned pink and sparkly!', ['...AND TURNED', 'PINK AND', 'SPARKLY!']),
    }),
    29: ("Pebble's Big Day", {}, {
        1: NAR('They named the baby Pebble!', ['THEY NAMED', 'THE BABY', 'PEBBLE!']),
        2: BABY('Pebble! Pebble!', ['PEBBLE!', 'PEBBLE!']),
        3: PEAN("Oops! He's so tiny!", ["OOPS! HE'S", 'SO TINY!']),
        4: NAR('Pebble loved playing hide and seek!', ['PEBBLE LOVED', 'PLAYING HIDE', 'AND SEEK!']),
        5: BO('Ready or not, here I come!', ['READY OR NOT,', 'HERE I', 'COME!']),
        6: NAR('But Pebble crawled away, all alone.', ['BUT PEBBLE', 'CRAWLED AWAY,', 'ALL ALONE.']),
        7: BLIP('Where did he go?', ['WHERE DID', 'HE GO?']),
        8: ZAP('Beep boop! Scanning... pancake pile!', ['BEEP BOOP!', 'SCANNING...', 'PANCAKE PILE!']),
        9: NAR('Pebble was fast asleep in the pancakes!', ['PEBBLE WAS', 'FAST ASLEEP IN', 'THE PANCAKES!']),
        10: MOCHI('Hmph. Found him. Obviously.', ['HMPH. FOUND', 'HIM. OBVIOUSLY.']),
        11: NAR('But then the ground began to shake!', ['BUT THEN THE', 'GROUND BEGAN', 'TO SHAKE!']),
    }),
    30: ("Happy Hatching Day", {}, {
        1: NAR('Thump, thump! Munch was back!', ['THUMP, THUMP!', 'MUNCH WAS', 'BACK!']),
        2: MUNCH('Pebble! My little Pebble!', ['PEBBLE! MY', 'LITTLE', 'PEBBLE!']),
        3: BABY('Papa! Papa!', ['PAPA!', 'PAPA!']),
        4: NAR('Pebble gave Bo one last hug.', ['PEBBLE GAVE', 'BO ONE', 'LAST HUG.']),
        5: BO("Goodbye, Pebble! We'll miss you!", ['GOODBYE, PEBBLE!', "WE'LL MISS", 'YOU!']),
        6: MUNCH('Thank you, my tiny friends.', ['THANK YOU,', 'MY TINY', 'FRIENDS.']),
        7: GUM('Roar! Party time!', ['ROAR!', 'PARTY', 'TIME!']),
        8: NAR('Big friends and little friends danced!', ['BIG FRIENDS', 'AND LITTLE', 'FRIENDS DANCED!']),
        9: ZAP('Beep boop! Best party ever!', ['BEEP BOOP!', 'BEST PARTY', 'EVER!']),
        10: EVERY('Happy hatching day!', ['HAPPY', 'HATCHING', 'DAY!']),
        11: NAR('And that was the end of Season six!', ['AND THAT WAS', 'THE END OF', 'SEASON SIX!']),
    }),
}


def lines_block(lines):
    out = ["LINES = {"]
    for ln, (v, sp, text, ch, tag, pf, filt) in lines.items():
        out.append(f"    {ln}: ({v}, {sp}, {text!r}, {ch!r}, {tag!r}, {pf}, {filt}),")
    out.append("}")
    return "\n".join(out)


def setup():
    base = open(os.path.join(ROOT, "toon25", "tts.py"), encoding="utf-8").read()
    for n, (title, synth, lines) in EPS.items():
        d = os.path.join(ROOT, f"toon{n}")
        os.makedirs(os.path.join(d, "assets", "fonts"), exist_ok=True)
        os.makedirs(os.path.join(d, "vendor"), exist_ok=True)
        os.makedirs(os.path.join(d, "build"), exist_ok=True)
        for rel in ("vendor/gsap.min.js", "assets/fonts/baloo-2-latin-800-normal.woff2", "build.cjs"):
            shutil.copy(os.path.join(ROOT, "toon25", *rel.split("/")), os.path.join(d, *rel.split("/")))
        s = re.sub(r"LINES = \{.*?\n\}\n", lambda m: lines_block(lines) + "\n", base, count=1, flags=re.S)
        s = s.replace("'Bo and the Pancake 25: Festival Finale'", f"'Bo and the Pancake {n}: {title}'")
        s = re.sub(r"SYNTH = \{\}", "SYNTH = " + repr(synth), s, count=1)
        open(os.path.join(d, "tts.py"), "w", encoding="utf-8", newline="\n").write(s)
        print("toon", n, "tts.py written;", len(lines), "lines")


GAPS = {57: .62, 58: .62, 60: .62, 61: .3, 62: .62, 63: .55, 65: .3}          # per-episode pause between the lines (default .36): short scripts get longer beats so line 11 ends near 25 s


def plan(n):
    w = json.load(open(os.path.join(ROOT, f"toon{n}", "words.json"), encoding="utf-8"))
    dur = {int(k): v for k, v in w["dur"].items()}
    t = 0.6
    lt = {}
    gaps = {2: .3}
    for ln in range(1, 12):
        lt[str(ln)] = round(t, 2)
        t += dur[ln] + GAPS.get(n, .36)
    end = lt["11"] + dur[11]
    json.dump({"LINE_T": lt}, open(os.path.join(ROOT, f"toon{n}", "plan.json"), "w"))
    print("plan", n, lt, "ends", round(end, 2))
    if end > 26.6:
        print("WARNING: line 11 ends after 26.6 s - shorten lines")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "plan":
        for a in sys.argv[2:]:
            plan(int(a))
    else:
        setup()

"""Season 9 ("Flapjack's Family Reunion", ep41-45) setup:  python mk_s9_setup.py -> toon41..toon45 folders + tts.py from the LINES below
   python mk_s6_setup.py plan N  -> plan.json (line start times from the real voice durations)
Script rules learned from seasons 5-8 (see voice_lessons.py): 11 lines, 4-7 words each, a real word next to every interjection,
no stand-alone onomatopoeia, the pitched-up baby only says plain words ("More! More!"), avoid words Whisper garbles ('canyon', 'creaked')."""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
ROOT = S6.ROOT
ROCKY = lambda text, ch: ("'am_adam'", 0.92, text, ch, 'ROCKY', 1.0, None)
FLAP = lambda text, ch: ("'af_nova'", 1.10, text, ch, 'FLAPJACK', 1.0, None)
GRAN = lambda text, ch: ("'bf_isabella'", 0.93, text, ch, 'GRANDMA', 0.9, None)
# the three pancake cousins (Flapjack's family): new voices
BLUEB = lambda text, ch: ("'af_nicole'", 1.08, text, ch, 'BLUEBERRY', 1.0, None)
CHOCO = lambda text, ch: ("'am_liam'", 0.95, text, ch, 'CHOCO', 1.0, None)
BERRY = lambda text, ch: ("'af_jessica'", 1.12, text, ch, 'BERRY', 1.0, None)
KINGV = lambda text, ch: ("'bm_daniel'", 0.85, text, ch, 'KING', 1.0, None)

EPS = {
    41: ("Grandmas Picnic", {}, {
        1: NAR('On Sunday, Grandma had a surprise!', ['ON SUNDAY,', 'GRANDMA HAD', 'A SURPRISE!']),
        2: GRAN('Today is a family picnic!', ['TODAY IS A', 'FAMILY', 'PICNIC!']),
        3: BO('A picnic? I love picnics!', ['A PICNIC?', 'I LOVE', 'PICNICS!']),
        4: TRUF("I'll bake lots of pancakes!", ["I'LL BAKE", 'LOTS OF', 'PANCAKES!']),
        5: MOCHI('Hmph. How many cousins?', ['HMPH. HOW', 'MANY', 'COUSINS?']),
        6: GRAN('Three cousins! They love pancakes!', ['THREE COUSINS!', 'THEY LOVE', 'PANCAKES!']),
        7: ZAP('Beep boop! Opening the basket!', ['BEEP BOOP!', 'OPENING THE', 'BASKET!']),
        8: COCO('I will bring the bananas!', ['I WILL BRING', 'THE', 'BANANAS!']),
        9: BOO("I'll watch for the cousins. Boo.", ["I'LL WATCH FOR", 'THE COUSINS.', 'BOO.']),
        10: NAR('Then the blanket floated open!', ['THEN THE', 'BLANKET FLOATED', 'OPEN!']),
        11: NAR('And three shadows hopped over the hill!', ['AND THREE', 'SHADOWS HOPPED', 'OVER THE HILL!']),
    }),
    42: ("The Three Cousins", {}, {
        1: NAR('Three pancake cousins bounced in!', ['THREE PANCAKE', 'COUSINS', 'BOUNCED IN!']),
        2: BLUEB("I'm Blueberry, the bouncy one!", ["I'M BLUEBERRY,", 'THE BOUNCY', 'ONE!']),
        3: CHOCO("I'm Choco, the sweet one!", ["I'M CHOCO,", 'THE SWEET', 'ONE!']),
        4: BERRY("I'm Berry, the speedy one!", ["I'M BERRY,", 'THE SPEEDY', 'ONE!']),
        5: BO('Wow! Three Flapjacks! Which is which?', ['WOW! THREE', 'FLAPJACKS!', 'WHICH IS WHICH?']),
        6: FLAP('Cousins! I missed you so much!', ['COUSINS!', 'I MISSED YOU', 'SO MUCH!']),
        7: MOCHI('Hmph. They all look the same.', ['HMPH. THEY', 'ALL LOOK', 'THE SAME.']),
        8: BLUEB('We do not look the same!', ['WE DO NOT', 'LOOK THE', 'SAME!']),
        9: TRUF("Let's play a pancake flipping game!", ["LET'S PLAY A", 'PANCAKE', 'FLIPPING GAME!']),
        10: NAR('Everybody flipped, and Berry flipped highest!', ['EVERYBODY FLIPPED,', 'AND BERRY', 'FLIPPED HIGHEST!']),
        11: NAR("Then Grandma's recipe page flew away!", ["THEN GRANDMA'S", 'RECIPE PAGE', 'FLEW AWAY!']),
    }),
    43: ("The Lost Recipe", {}, {
        1: NAR("Grandma's recipe page was missing!", ["GRANDMA'S", 'RECIPE PAGE', 'WAS MISSING!']),
        2: GRAN('Oh dear! Where did it go?', ['OH DEAR!', 'WHERE DID', 'IT GO?']),
        3: MOCHI("Hmph. I'll investigate. Obviously.", ["HMPH. I'LL", 'INVESTIGATE.', 'OBVIOUSLY.']),
        4: BLIP('Look! Sticky footprints! Follow me!', ['LOOK! STICKY', 'FOOTPRINTS!', 'FOLLOW ME!']),
        5: ZAP('Beep boop! Paper nearby!', ['BEEP BOOP!', 'PAPER', 'NEARBY!']),
        6: ROCKY('I did not eat any recipes.', ['I DID NOT', 'EAT ANY', 'RECIPES.']),
        7: COCO('Ooh-ooh! In my banana tree!', ['OOH-OOH!', 'IN MY', 'BANANA TREE!']),
        8: BO("I'll climb up and get it!", ["I'LL CLIMB", 'UP AND', 'GET IT!']),
        9: NAR('But the branch was very wobbly!', ['BUT THE', 'BRANCH WAS', 'VERY WOBBLY!']),
        10: BOO("Don't worry. I'll float it down. Boo.", ["DON'T WORRY.", "I'LL FLOAT IT", 'DOWN. BOO.']),
        11: NAR("The page floated to Grandma's hands!", ['THE PAGE', 'FLOATED TO', "GRANDMA'S HANDS!"]),
    }),
    44: ("The Secret Ingredient", {}, {
        1: NAR('The page had one secret ingredient!', ['THE PAGE HAD', 'ONE SECRET', 'INGREDIENT!']),
        2: GRAN('The secret is sharing together!', ['THE SECRET IS', 'SHARING', 'TOGETHER!']),
        3: TRUF("Then let's cook it all together!", ["THEN LET'S COOK", 'IT ALL', 'TOGETHER!']),
        4: NAR('Munch carried the biggest bowl ever!', ['MUNCH CARRIED', 'THE BIGGEST', 'BOWL EVER!']),
        5: ZAP('Beep boop! Mixing speed: super fast!', ['BEEP BOOP!', 'MIXING SPEED:', 'SUPER FAST!']),
        6: BLUEB("I'll crack the eggs!", ["I'LL CRACK", 'THE EGGS!']),
        7: CHOCO("I'll sprinkle the chocolate chips!", ["I'LL SPRINKLE", 'THE CHOCOLATE', 'CHIPS!']),
        8: BERRY("I'll add the strawberries!", ["I'LL ADD THE", 'STRAWBERRIES!']),
        9: BABY('More! More! More!', ['MORE!', 'MORE!', 'MORE!']),
        10: NAR('Soon the whole lawn smelled amazing!', ['SOON THE', 'WHOLE LAWN', 'SMELLED AMAZING!']),
        11: GRAN('Now everyone gets a golden pancake!', ['NOW EVERYONE', 'GETS A GOLDEN', 'PANCAKE!']),
    }),
    45: ("The Family Photo", {}, {
        1: NAR('Time for the big family photo!', ['TIME FOR THE', 'BIG FAMILY', 'PHOTO!']),
        2: KINGV('Say pancakes, everybody!', ['SAY PANCAKES,', 'EVERYBODY!']),
        3: BO('Everybody squeeze in tight!', ['EVERYBODY', 'SQUEEZE IN', 'TIGHT!']),
        4: GUM("Roar! I'm too big for it!", ["ROAR! I'M", 'TOO BIG', 'FOR IT!']),
        5: ZAP('Beep boop! Camera timer: ten seconds!', ['BEEP BOOP!', 'CAMERA TIMER:', 'TEN SECONDS!']),
        6: MOCHI('Hmph. I look better from the left.', ['HMPH. I LOOK', 'BETTER FROM', 'THE LEFT.']),
        7: BOO('I keep floating away. Boo.', ['I KEEP', 'FLOATING AWAY.', 'BOO.']),
        8: ROCKY('Nobody saw me sneak in!', ['NOBODY SAW', 'ME SNEAK', 'IN!']),
        9: NAR('Then the timer went beep, beep, beep!', ['THEN THE', 'TIMER WENT', 'BEEP, BEEP, BEEP!']),
        10: EVERY('Say pancakes, everybody!', ['SAY PANCAKES,', 'EVERYBODY!']),
        11: NAR('And that was the end of Season nine!', ['AND THAT WAS', 'THE END OF', 'SEASON NINE!']),
    }),
}


def setup():
    base = open(os.path.join(ROOT, "toon25", "tts.py"), encoding="utf-8").read()
    for n, (title, synth, lines) in EPS.items():
        d = os.path.join(ROOT, f"toon{n}")
        for sub in ("assets/fonts", "vendor", "build"):
            os.makedirs(os.path.join(d, *sub.split("/")), exist_ok=True)
        for rel in ("vendor/gsap.min.js", "assets/fonts/baloo-2-latin-800-normal.woff2", "build.cjs"):
            shutil.copy(os.path.join(ROOT, "toon25", *rel.split("/")), os.path.join(d, *rel.split("/")))
        s = re.sub(r"LINES = \{.*?\n\}\n", lambda m: S6.lines_block(lines) + "\n", base, count=1, flags=re.S)
        s = s.replace("'Bo and the Pancake 25: Festival Finale'", f"'Bo and the Pancake {n}: {title}'")
        s = re.sub(r"SYNTH = \{\}", "SYNTH = " + repr(synth), s, count=1)
        open(os.path.join(d, "tts.py"), "w", encoding="utf-8", newline="\n").write(s)
        print("toon", n, "tts.py written;", len(lines), "lines")


if __name__ == "__main__":
    setup()

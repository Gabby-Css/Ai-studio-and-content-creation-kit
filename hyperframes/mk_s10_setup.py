"""Season 10 ("The Great Snow Day", ep46-50) setup:  python mk_s10_setup.py -> toon46..toon50 folders + tts.py from the LINES below
   python mk_s6_setup.py plan N  -> plan.json (line start times from the real voice durations)
Script rules learned from seasons 5-9 (see 10_SEASON8_9_AND_LESSONS.md): 11 lines, 4-7 words each, total <= ~55 words so line 11 ends <= 25.5 s,
a real word next to every interjection, no stand-alone onomatopoeia, the pitched-up baby only says plain words, slow voices (Grandma) at speed 0.93."""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
ROOT = S6.ROOT
ROCKY = lambda text, ch: ("'am_adam'", 0.92, text, ch, 'ROCKY', 1.0, None)
GRAN = lambda text, ch: ("'bf_isabella'", 0.93, text, ch, 'GRANDMA', 0.9, None)
WADD = lambda text, ch: ("'am_eric'", 1.0, text, ch, 'WADDLES', 1.12, None)

EPS = {
    46: ("Snow Day", {}, {
        1: NAR('One morning, everything turned white!', ['ONE MORNING,', 'EVERYTHING', 'TURNED WHITE!']),
        2: BO('Wow! The lawn is all snow!', ['WOW! THE', 'LAWN IS', 'ALL SNOW!']),
        3: BABY('Snow! Snow! Snow!', ['SNOW!', 'SNOW!', 'SNOW!']),
        4: MOCHI('Hmph. Snow is cold. Obviously.', ['HMPH. SNOW', 'IS COLD.', 'OBVIOUSLY.']),
        5: TRUF('Everybody put on your scarves!', ['EVERYBODY PUT', 'ON YOUR', 'SCARVES!']),
        6: ZAP('Beep boop! Temperature: minus five!', ['BEEP BOOP!', 'TEMPERATURE:', 'MINUS FIVE!']),
        7: COCO('Ooh-ooh! My bananas are frozen!', ['OOH-OOH! MY', 'BANANAS ARE', 'FROZEN!']),
        8: NAR('Then something slid down the hill!', ['THEN SOMETHING', 'SLID DOWN', 'THE HILL!']),
        9: WADD("I'm Waddles! I love snow!", ["I'M WADDLES!", 'I LOVE', 'SNOW!']),
        10: BO('A penguin! Welcome, Waddles!', ['A PENGUIN!', 'WELCOME,', 'WADDLES!']),
        11: NAR('And he brought a very big sled!', ['AND HE BROUGHT', 'A VERY', 'BIG SLED!']),
    }),
    47: ("The Frozen Syrup", {}, {
        1: NAR('But the syrup bottle froze solid!', ['BUT THE SYRUP', 'BOTTLE FROZE', 'SOLID!']),
        2: TRUF('Oh no! No more syrup!', ['OH NO!', 'NO MORE', 'SYRUP!']),
        3: ZAP("Beep boop! I'll warm it up!", ['BEEP BOOP!', "I'LL WARM", 'IT UP!']),
        4: NAR('He zapped it, and syrup splashed everywhere!', ['HE ZAPPED IT,', 'AND SYRUP SPLASHED', 'EVERYWHERE!']),
        5: GUM("Roar! I'll sit on it!", ["ROAR! I'LL", 'SIT ON', 'IT!']),
        6: WADD('Penguins know cold. Let me help!', ['PENGUINS KNOW', 'COLD. LET', 'ME HELP!']),
        7: PEAN('Look! Icicles look like candy!', ['LOOK! ICICLES', 'LOOK LIKE', 'CANDY!']),
        8: BO("Icicle waffles! Let's make some!", ['ICICLE WAFFLES!', "LET'S MAKE", 'SOME!']),
        9: NAR('They baked crunchy icicle waffles!', ['THEY BAKED', 'CRUNCHY ICICLE', 'WAFFLES!']),
        10: ROCKY('Nobody saw me lick the icicles.', ['NOBODY SAW', 'ME LICK THE', 'ICICLES.']),
        11: NAR('And the snow day got even better!', ['AND THE SNOW', 'DAY GOT', 'EVEN BETTER!']),
    }),
    48: ("The Big Sled", {}, {
        1: NAR('The big sled waited on Pancake Hill!', ['THE BIG SLED', 'WAITED ON', 'PANCAKE HILL!']),
        2: BO("I'll steer! Hold on tight!", ["I'LL STEER!", 'HOLD ON', 'TIGHT!']),
        3: WADD('Everybody on the sled!', ['EVERYBODY', 'ON THE', 'SLED!']),
        4: GUM("Roar! I'll push us off!", ["ROAR! I'LL", 'PUSH US', 'OFF!']),
        5: NAR('Whoosh! Down the hill they zoomed!', ['WHOOSH! DOWN', 'THE HILL', 'THEY ZOOMED!']),
        6: COCO('Ooh-ooh! Too fast! Too fast!', ['OOH-OOH!', 'TOO FAST!', 'TOO FAST!']),
        7: MOCHI('Hmph. Somebody stop this. Obviously.', ['HMPH. SOMEBODY', 'STOP THIS.', 'OBVIOUSLY.']),
        8: BOO("I'm floating next to you. Boo.", ["I'M FLOATING", 'NEXT TO YOU.', 'BOO.']),
        9: ZAP('Beep boop! Brakes not found!', ['BEEP BOOP!', 'BRAKES', 'NOT FOUND!']),
        10: NAR('Then they crashed into a snowman!', ['THEN THEY', 'CRASHED INTO', 'A SNOWMAN!']),
        11: NAR("And the snowman wore Bo's scarf!", ['AND THE SNOWMAN', "WORE BO'S", 'SCARF!']),
    }),
    49: ("Munchs Snow Castle", {}, {
        1: NAR('Munch built a giant snow castle!', ['MUNCH BUILT', 'A GIANT', 'SNOW CASTLE!']),
        2: MUNCH('Welcome to my castle!', ['WELCOME', 'TO MY', 'CASTLE!']),
        3: BO('Look! A pancake tower!', ['LOOK! A', 'PANCAKE', 'TOWER!']),
        4: TRUF("I'll bake in the kitchen!", ["I'LL BAKE", 'IN THE', 'KITCHEN!']),
        5: BLIP('Snowball fight! Everybody duck!', ['SNOWBALL FIGHT!', 'EVERYBODY', 'DUCK!']),
        6: NAR('Snowballs flew everywhere!', ['SNOWBALLS', 'FLEW', 'EVERYWHERE!']),
        7: MOCHI('Hmph. Not on my fur. Obviously.', ['HMPH. NOT', 'ON MY FUR.', 'OBVIOUSLY.']),
        8: WADD("I'm the snowball champion!", ["I'M THE", 'SNOWBALL', 'CHAMPION!']),
        9: BABY('Again! Again! Again!', ['AGAIN!', 'AGAIN!', 'AGAIN!'], 'PEBBLE'),
        10: NAR('Then the castle began to wobble!', ['THEN THE', 'CASTLE BEGAN', 'TO WOBBLE!']),
        11: NAR('And everybody ran out laughing!', ['AND EVERYBODY', 'RAN OUT', 'LAUGHING!']),
    }),
    50: ("The Snow Day Party", {}, {
        1: NAR('At sunset, they had a cozy party!', ['AT SUNSET,', 'THEY HAD A', 'COZY PARTY!']),
        2: TRUF('Hot cocoa and warm pancakes!', ['HOT COCOA', 'AND WARM', 'PANCAKES!']),
        3: GRAN('Come sit by the fire, dears.', ['COME SIT BY', 'THE FIRE,', 'DEARS.']),
        4: WADD('I have a secret to tell.', ['I HAVE A', 'SECRET', 'TO TELL.']),
        5: WADD('I came to find the warmest friends!', ['I CAME TO FIND', 'THE WARMEST', 'FRIENDS!']),
        6: BO('Yes! You found us, Waddles!', ['YES! YOU', 'FOUND US,', 'WADDLES!']),
        7: MOCHI("Hmph. Fine. I'm a little warm.", ['HMPH. FINE.', "I'M A LITTLE", 'WARM.']),
        8: NAR('Mochi smiled, just a tiny bit!', ['MOCHI SMILED,', 'JUST A', 'TINY BIT!']),
        9: EVERY('Happy snow day, Waddles!', ['HAPPY SNOW', 'DAY,', 'WADDLES!']),
        10: NAR('And they sang under the snowy stars!', ['AND THEY SANG', 'UNDER THE', 'SNOWY STARS!']),
        11: NAR('And that was the end of Season ten!', ['AND THAT WAS', 'THE END OF', 'SEASON TEN!']),
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

"""Season 12 ("The Pancake Circus", ep56-60) setup:  python mk_s12_setup.py -> toon56..toon60 folders + tts.py from the LINES below
   python mk_s6_setup.py plan N  -> plan.json (line start times from the real voice durations)
Script rules learned from seasons 5-11 (see 10_SEASON8_9_AND_LESSONS.md): 11 lines, 4-7 words each, total <= ~57 words so line 11 ends <= 25.8 s,
a real word next to every interjection, no stand-alone onomatopoeia, the pitched-up baby only says plain words (no sibilant shouts), slow voices at speed 0.93."""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
from mk_s11_setup import ROCKY, GRAN, WADD, MOM, DAD
ROOT = S6.ROOT

EPS = {
    56: ("The Big Top", {}, {
        1: NAR('Next morning, a giant tent appeared!', ['NEXT MORNING,', 'A GIANT TENT', 'APPEARED!']),
        2: DAD('Welcome to the Penguin Circus!', ['WELCOME TO', 'THE PENGUIN', 'CIRCUS!']),
        3: BO("A real circus? That's amazing!", ['A REAL CIRCUS?', "THAT'S", 'AMAZING!']),
        4: MOM('Everyone gets a special act!', ['EVERYONE', 'GETS A', 'SPECIAL ACT!']),
        5: NAR('They hurried into the big tent!', ['THEY HURRIED', 'INTO THE', 'BIG TENT!']),
        6: ZAP('Beep boop! I will juggle!', ['BEEP BOOP!', 'I WILL', 'JUGGLE!']),
        7: COCO('Ooh-ooh! I will fly!', ['OOH-OOH!', 'I WILL', 'FLY!']),
        8: MOCHI('Hmph. I do magic. Obviously.', ['HMPH. I DO', 'MAGIC.', 'OBVIOUSLY.']),
        9: TRUF('And I make the popcorn!', ['AND I MAKE', 'THE', 'POPCORN!']),
        10: NAR('The golden spotlights switched on!', ['THE GOLDEN', 'SPOTLIGHTS', 'SWITCHED ON!']),
        11: NAR('The big show was three days away!', ['THE BIG SHOW', 'WAS THREE', 'DAYS AWAY!']),
    }),
    57: ("The Juggling Act", {}, {
        1: NAR('Bo and Zap practiced juggling!', ['BO AND ZAP', 'PRACTICED', 'JUGGLING!']),
        2: ZAP('Beep boop! Three pancakes. Easy!', ['BEEP BOOP!', 'THREE PANCAKES.', 'EASY!']),
        3: BO('Watch me juggle them all!', ['WATCH ME', 'JUGGLE', 'THEM ALL!']),
        4: NAR('Up, up, up they flew!', ['UP, UP, UP', 'THEY', 'FLEW!']),
        5: BO('Oh no! They are falling!', ['OH NO!', 'THEY ARE', 'FALLING!']),
        6: NAR("They landed on Gumdrop's head!", ['THEY LANDED', "ON GUMDROP'S", 'HEAD!']),
        7: GUM('Roar! I like this game!', ['ROAR!', 'I LIKE', 'THIS GAME!']),
        8: ZAP("Beep boop! Let's juggle together!", ['BEEP BOOP!', "LET'S JUGGLE", 'TOGETHER!']),
        9: NAR('Bo tossed, then Zap caught!', ['BO TOSSED,', 'THEN ZAP', 'CAUGHT!']),
        10: NAR('Soon they juggled five at once!', ['SOON THEY', 'JUGGLED FIVE', 'AT ONCE!']),
        11: NAR('And the whole tent clapped loudly!', ['AND THE', 'WHOLE TENT', 'CLAPPED LOUDLY!']),
    }),
    58: ("The Flying Coco", {}, {
        1: NAR('Coco climbed the trapeze ladder!', ['COCO CLIMBED', 'THE TRAPEZE', 'LADDER!']),
        2: COCO('Ooh-ooh! It is so high!', ['OOH-OOH!', 'IT IS', 'SO HIGH!']),
        3: WADD("Penguins can't fly, but we try!", ['PENGUINS', "CAN'T FLY,", 'BUT WE TRY!']),
        4: BO('We will catch you, Coco!', ['WE WILL', 'CATCH YOU,', 'COCO!']),
        5: NAR('They held a pancake net!', ['THEY HELD', 'A PANCAKE', 'NET!']),
        6: COCO('Ooh-ooh! Here I go!', ['OOH-OOH!', 'HERE', 'I GO!']),
        7: NAR('She swung higher and higher!', ['SHE SWUNG', 'HIGHER AND', 'HIGHER!']),
        8: NAR('Then she let go and flew!', ['THEN SHE', 'LET GO', 'AND FLEW!']),
        9: NAR('She did three big somersaults!', ['SHE DID', 'THREE BIG', 'SOMERSAULTS!']),
        10: NAR('She landed softly on the net!', ['SHE LANDED', 'SOFTLY ON', 'THE NET!']),
        11: COCO('Ooh-ooh! I can really fly!', ['OOH-OOH!', 'I CAN', 'REALLY FLY!']),
    }),
    59: ("The Magic Hat", {}, {
        1: NAR('Mochi practiced his magic trick!', ['MOCHI PRACTICED', 'HIS MAGIC', 'TRICK!']),
        2: MOCHI('Hmph. Watch closely. Obviously.', ['HMPH. WATCH', 'CLOSELY.', 'OBVIOUSLY.']),
        3: NAR('He tapped the hat twice!', ['HE TAPPED', 'THE HAT', 'TWICE!']),
        4: MOCHI('Magic words! Pancake, appear!', ['MAGIC WORDS!', 'PANCAKE,', 'APPEAR!']),
        5: NAR('Poof! A pancake popped out!', ['POOF! A', 'PANCAKE', 'POPPED OUT!']),
        6: BO('Nice one, Mochi! Again, please!', ['NICE ONE,', 'MOCHI!', 'AGAIN, PLEASE!']),
        7: NAR('Then the hat started shaking!', ['THEN THE', 'HAT STARTED', 'SHAKING!']),
        8: ZAP('Beep boop! Something is inside!', ['BEEP BOOP!', 'SOMETHING', 'IS INSIDE!']),
        9: NAR('Out popped Rocky, giggling happily!', ['OUT POPPED', 'ROCKY, GIGGLING', 'HAPPILY!']),
        10: ROCKY('Surprise! I love magic tricks!', ['SURPRISE!', 'I LOVE', 'MAGIC TRICKS!']),
        11: MOCHI('Hmph. That was fun. Obviously.', ['HMPH. THAT', 'WAS FUN.', 'OBVIOUSLY.']),
    }),
    60: ("The Grand Finale", {}, {
        1: NAR('It was finally show time!', ['IT WAS', 'FINALLY', 'SHOW TIME!']),
        2: DAD('Ladies and gentlemen, welcome!', ['LADIES AND', 'GENTLEMEN,', 'WELCOME!']),
        3: NAR('Bo and Zap juggled pancakes!', ['BO AND ZAP', 'JUGGLED', 'PANCAKES!']),
        4: NAR('Coco flew above the crowd!', ['COCO FLEW', 'ABOVE THE', 'CROWD!']),
        5: NAR('Mochi pulled out Rocky!', ['MOCHI', 'PULLED OUT', 'ROCKY!']),
        6: NAR('Munch lifted a pancake tower!', ['MUNCH LIFTED', 'A PANCAKE', 'TOWER!']),
        7: DAD('Now, the grand finale!', ['NOW, THE', 'GRAND', 'FINALE!']),
        8: NAR('Pancakes rained down on everybody!', ['PANCAKES', 'RAINED DOWN', 'ON EVERYBODY!']),
        9: EVERY('Thank you for coming, everybody!', ['THANK YOU', 'FOR COMING,', 'EVERYBODY!']),
        10: NAR('The crowd cheered and cheered!', ['THE CROWD', 'CHEERED AND', 'CHEERED!']),
        11: NAR('And that was the end of Season twelve!', ['AND THAT WAS', 'THE END OF', 'SEASON TWELVE!']),
    }),
}


def setup(only=None):
    base = open(os.path.join(ROOT, "toon25", "tts.py"), encoding="utf-8").read()
    for n, (title, synth, lines) in EPS.items():
        if only and n not in only:
            continue
        d = os.path.join(ROOT, f"toon{n}")
        for sub in ("assets/fonts", "vendor", "build"):
            os.makedirs(os.path.join(d, *sub.split("/")), exist_ok=True)
        for rel in ("vendor/gsap.min.js", "assets/fonts/baloo-2-latin-800-normal.woff2", "build.cjs"):
            shutil.copy(os.path.join(ROOT, "toon25", *rel.split("/")), os.path.join(d, *rel.split("/")))
        s = re.sub(r"LINES = \{.*?\n\}\n", lambda m: S6.lines_block(lines) + "\n", base, count=1, flags=re.S)
        s = s.replace("'Bo and the Pancake 25: Festival Finale'", f"'Bo and the Pancake {n}: {title}'")
        s = re.sub(r"SYNTH = \{\}", "SYNTH = " + repr(synth), s, count=1)
        open(os.path.join(d, "tts.py"), "w", encoding="utf-8", newline="\n").write(s)
        print("toon", n, "tts.py written;", len(lines), "lines,", sum(len(v[2].split()) for v in lines.values()), "words")


if __name__ == "__main__":
    import sys
    setup([int(a) for a in sys.argv[1:]] or None)

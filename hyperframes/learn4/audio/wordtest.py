"""Which pronunciation of a trouble word is most intelligible when SUNG (lead voice)?
usage: python wordtest.py            -> tries the variants below, prints what Whisper (small.en) hears for each, and the winner per word
A variant is an IPA string for Kokoro (singer.PHON); None = the default spelling."""
import re, sys, difflib, numpy as np, soundfile as sf, tempfile, os
sys.stdout.reconfigure(encoding="utf-8")
import singer, song
from faster_whisper import WhisperModel

SR = singer.SR
VOICE, FORMANT = "af_heart", 1.04
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=3)
TMP = os.path.join(tempfile.gettempdir(), "_wordtest_l3.wav")
ALIKE = {"baa": {"baa", "bah", "ba", "baaa", "baah"}, "oink": {"oink", "oinks", "oynk"}, "who": {"who"}, "hop": {"hop", "hope", "hops"}, "moo": {"moo", "mu"},
         "woof": {"woof", "wuff"}, "quack": {"quack", "quak"}}

def render_line(dsl, tr=0, target=None, kw=None):
    words, n = song.parse_line(dsl, 0.6, tr)
    out = np.zeros(int((0.6 + n * song.EIGHTH + 1.2) * SR), np.float32)
    for x in words:
        if x["who"] != "lead": continue
        word = re.sub(r"[^A-Za-z']", "", x["text"]); notes = [(s["note"], s["t0"], s["dur"]) for s in x["syl"]]
        y, ts = singer.sing_syllables(word, VOICE, notes, speed=1.0, formant=FORMANT, rng=np.random.default_rng(3), an_cache={}, **((kw or {}) if word.lower() == target else {}))
        a = max(0, int(round(ts * SR))); k = min(len(y), len(out) - a); out[a:a + k] += y[:k]
    return out

def hear(y):
    sf.write(TMP, y, SR)
    sg, _ = m.transcribe(TMP, language="en", beam_size=5, temperature=0.0, condition_on_previous_text=False, vad_filter=False)
    return " ".join(re.sub(r"[^a-z' ]", "", s.text.lower()) for s in sg).split()

def score(exp, heard):
    h = 0
    for e in exp:
        h += e in heard or any(difflib.SequenceMatcher(None, e, w).ratio() >= .78 for w in heard if len(e) > 3) or (e in ALIKE and any(w in ALIKE[e] for w in heard))
    return h

# (word, [IPA variants]), lines that contain the word (lead words only), expected words
TESTS = [
    ("baa", [None, "bˈɑː", "bˈæ", "bˈæː", "bˈɑ", "bɑːɑː"], ["Who:E4:2 says:G4:2 baa?:C5:4", "baa,:G4:4 baa,:A4:4", "The:G4:2 sheep:A4:2 says:G4:2 baa!:E4:4"]),
    ("oink", [None, "ˈɔɪŋk", "ˈɔɪnk", "ɔɪŋk", "ˈɔɪŋ", "ˈɔːɪŋk", "ˈoɪŋk"], ["Who:E4:2 says:G4:2 oink?:C5:4", "oink,:G4:4 oink,:A4:4", "The:G4:2 pig:A4:2 says:G4:2 oink!:E4:4"]),
    ("who", [None, "hˈuː", "hˈu", "hu", "hˈʊ"], ["Who:E4:2 says:G4:2 moo?:C5:4", "Who:E4:2 says:G4:2 quack?:C5:4", "Who:E4:2 says:G4:2 oink?:C5:4"]),
    ("quack", [None, (None, dict(lead_cap=.14)), (None, dict(lead_cap=.18)), (None, dict(lead_cap=.22))], ["Moo,:G4:2 quack,:G4:2 oink,:A4:2 baa,:A4:2 woof,:C5:2", "Who:E4:2 says:G4:2 quack?:C5:4", "The:G4:2 duck:A4:2 says:G4:2 quack!:E4:4"]),
    ("woof", [None, (None, dict(lead_cap=.14)), (None, dict(lead_cap=.18)), ("wˈʊf", None)], ["baa,:A4:2 woof,:C5:2 meow,:A4:2 neigh,:G4:2", "Who:E4:2 says:G4:2 woof?:C5:4", "The:G4:2 dog:A4:2 says:G4:2 woof!:E4:4"]),
    ("jump", [None, (None, dict(lead_cap=.14))], ["Jump,:A4:2 jump,:A4:2 like:C5:2 a:A4:2 cat!:G4:6 _:2"]),
    ("leap", [None], ["Leap,:A4:2 leap,:A4:2 like:C5:2 a:A4:2 cat!:G4:6 _:2"]),
    ("flap", [None], ["Flap,:G4:2 flap,:G4:2 like:A4:2 a:G4:2 duck!:C5:6 _:2"]),
    ("hop", [None, "hˈɑp", "hˈɑːp", "hˈɔp", "hˈɒp"], ["Hop,:A4:2 hop,:A4:2 like:C5:2 a:A4:2 cat!:G4:6 _:2"]),
]

if __name__ == "__main__":
    only = set(sys.argv[1:])
    for word, variants, lines in TESTS:
        if only and word not in only: continue
        best = None
        print(f"=== {word}", flush=True)
        for v in variants:
            ipa, kw = (v if isinstance(v, tuple) else (v, None))
            if ipa is None: singer.PHON.pop(word, None)
            else: singer.PHON[word] = ipa
            tot = hit = 0; heards = []
            for dsl in lines:
                y = render_line(dsl, target=word, kw=kw); heard = hear(y)
                exp = [re.sub(r"[^a-z']", "", w.split(":")[0].lower()) for w in dsl.split() if not w.startswith("_")]
                tot += len(exp); hit += score(exp, heard); heards.append(" ".join(heard))
            print(f"  {str(v):28s} {hit}/{tot}  | " + "  //  ".join(heards), flush=True)
            if best is None or hit > best[0]: best = (hit, v)
        singer.PHON.pop(word, None)
        print(f"  -> best for {word}: {best[1]}  ({best[0]})", flush=True)

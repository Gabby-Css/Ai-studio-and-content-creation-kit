"""Voice lines for 'Bo and the Pancake 2' (Kokoro, Apache-2.0, local) + word timings for the captions.
Narrator = af_heart @1.0 (same voice as video #1). Quips use the cast catchphrases.
Writes assets/vo/line1..9.wav and words.json  {"words": {ln: [{w,s,e}]}, "chunks": {ln: [...]}, "dur": {ln: sec}}"""
import os, re, json, time, difflib
import numpy as np, soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
M = os.path.expanduser("~/.cache/kokoro-onnx/")

# ln: (voice, speed, text, caption chunks, speaker tag)
LINES = {
    1: ("af_heart", 1.0, "Remember the pancake Bo almost ate? Meet Flapjack, his new best friend!",
        ["REMEMBER THE PANCAKE", "BO ALMOST ATE?", "MEET FLAPJACK,", "HIS NEW", "BEST FRIEND!"], ""),
    2: ("af_heart", 1.0, "Every morning, they share breakfast. Cereal for Bo, and a syrup bath for Flapjack.",
        ["EVERY MORNING,", "THEY SHARE BREAKFAST.", "CEREAL FOR BO,", "AND A SYRUP BATH", "FOR FLAPJACK!"], ""),
    3: ("af_heart", 1.0, "But someone sneaky was watching!",
        ["BUT SOMEONE", "SNEAKY WAS", "WATCHING!"], ""),
    4: ("af_heart", 1.0, "Rocky grabbed Flapjack, and ran! Bo chased him all around the kitchen!",
        ["ROCKY GRABBED", "FLAPJACK, AND RAN!", "BO CHASED HIM ALL", "AROUND THE KITCHEN!"], ""),
    5: ("af_heart", 1.0, "But Rocky was only hungry. So Bo shared his cereal with his new friend!",
        ["BUT ROCKY WAS", "ONLY HUNGRY.", "SO BO SHARED", "HIS CEREAL WITH", "HIS NEW FRIEND!"], ""),
    6: ("af_heart", 1.0, "Then... knock, knock!",
        ["THEN...", "KNOCK, KNOCK!"], ""),
    7: ("am_adam", 0.92, "Nobody saw anything.", ["NOBODY SAW ANYTHING."], "ROCKY"),
    8: ("af_nova", 1.10, "Catch me if you can!", ["CATCH ME IF YOU CAN!"], "FLAPJACK"),
    9: ("am_onyx", 0.92, "Is it snack time yet?", ["IS IT SNACK TIME YET?"], "BARNABY"),
}
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())


def main():
    t0 = time.time()
    import kokoro_onnx
    k = kokoro_onnx.Kokoro(M + "kokoro-v1.0.onnx", M + "voices-v1.0.bin")
    print("kokoro loaded", round(time.time() - t0), "s", flush=True)
    os.makedirs(os.path.join(HERE, "assets", "vo"), exist_ok=True)
    dur = {}
    for ln, (voice, speed, text, _, _) in LINES.items():
        s, sr = k.create(text, voice=voice, speed=speed, lang="en-us")
        s = np.asarray(s, dtype=np.float32)
        sf.write(os.path.join(HERE, "assets", "vo", f"line{ln}.wav"), s, sr)
        dur[ln] = round(len(s) / sr, 3)
        print("tts", ln, voice, dur[ln], "s", round(time.time() - t0), flush=True)
    del k

    from faster_whisper import WhisperModel
    model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
    print("whisper loaded", round(time.time() - t0), "s", flush=True)
    words = {}
    for ln, (voice, speed, text, chunks, _) in LINES.items():
        segs, _ = model.transcribe(os.path.join(HERE, "assets", "vo", f"line{ln}.wav"), language="en", word_timestamps=True,
                                   vad_filter=False, beam_size=5, condition_on_previous_text=False)
        asr = [(norm(w.word), w.start, w.end) for sg in segs for w in sg.words]
        toks = " ".join(chunks).split(" ")                      # display tokens, one per caption word
        assert norm("".join(toks)) == norm(text.replace(" ", "")), (ln, toks)
        a = [x[0] for x in asr]; b = [norm(t) for t in toks]
        sm = difflib.SequenceMatcher(None, b, a, autojunk=False)
        st = [None] * len(toks)
        for blk in sm.get_matching_blocks():
            for i in range(blk.size):
                st[blk.a + i] = (asr[blk.b + i][1], asr[blk.b + i][2])
        # fill gaps by interpolation between known neighbours (or clip bounds)
        end_all = dur[ln]
        for i in range(len(toks)):
            if st[i] is not None: continue
            lo = i - 1
            while lo >= 0 and st[lo] is None: lo -= 1
            hi = i + 1
            while hi < len(toks) and st[hi] is None: hi += 1
            t_lo = st[lo][1] if lo >= 0 else 0.0
            t_hi = st[hi][0] if hi < len(toks) else end_all
            n = hi - lo - 1
            k_ = i - lo - 1
            seg = (t_hi - t_lo) / n
            st[i] = (t_lo + seg * k_, t_lo + seg * (k_ + 1))
        words[ln] = [{"w": toks[i], "s": round(st[i][0], 3), "e": round(st[i][1], 3)} for i in range(len(toks))]
        print("asr", ln, " ".join(x[0] for x in asr), "|| matched", sum(1 for blk in sm.get_matching_blocks() for _ in range(blk.size)), "/", len(toks), flush=True)
    json.dump({"words": words, "chunks": {ln: v[3] for ln, v in LINES.items()}, "tags": {ln: v[4] for ln, v in LINES.items()}, "dur": dur},
              open(os.path.join(HERE, "words.json"), "w"), indent=1)
    print("DONE", round(time.time() - t0), "s", dur, flush=True)


if __name__ == "__main__":
    main()

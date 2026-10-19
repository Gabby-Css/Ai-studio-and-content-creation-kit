"""Voice lines for 'Bo and the Pancake 5: Pizza Party!' (Kokoro, Apache-2.0, local) + word timings for the captions.
Narrator = af_heart @1.0 (same voice as videos #1/#2). Quips use the cast catchphrases.
Writes assets/vo/line<N>.wav and words.json  {"words": {ln: [{w,s,e}]}, "chunks": {ln: [...]}, "tags", "dur"}
Lines already synthesized are reused (so a text tweak only re-runs that line); delete assets/vo/line<N>.wav to force."""
import os, re, json, time, difflib, subprocess
import numpy as np, soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
M = os.path.expanduser("~/.cache/kokoro-onnx/")

# ln: (voice, speed, text, caption chunks, speaker tag, pitch factor)
LINES = {
    1: ("af_heart", 1.0, "Truffle the pig squeezed through the window, ready to cook!",
        ["TRUFFLE THE PIG", "SQUEEZED THROUGH", "THE WINDOW, READY", "TO COOK!"], "", 1.0),
    2: ("bm_george", 0.92, "Let's make a giant pizza!", ["LET'S MAKE A", "GIANT PIZZA!"], "TRUFFLE", 1.0),
    3: ("af_heart", 1.0, "Sauce, cheese, and toppings... and he tasted every single one!",
        ["SAUCE, CHEESE,", "AND TOPPINGS...", "AND HE TASTED", "EVERY SINGLE ONE!"], "", 1.0),
    4: ("am_puck", 1.05, "Just one tiny bite!", ["JUST ONE", "TINY BITE!"], "BO", 1.0),
    5: ("bm_george", 0.92, "Not yet! Needs a pinch more love!", ["NOT YET!", "NEEDS A PINCH", "MORE LOVE!"], "TRUFFLE", 1.0),
    6: ("af_heart", 1.0, "Into the oven it went... ding!", ["INTO THE OVEN", "IT WENT... DING!"], "", 1.0),
    7: ("af_heart", 1.0, "Everyone got a slice, and it was delicious!",
        ["EVERYONE GOT", "A SLICE, AND IT", "WAS DELICIOUS!"], "", 1.0),
    8: ("af_heart", 1.0, "But then... something swung by!", ["BUT THEN...", "SOMETHING", "SWUNG BY!"], "", 1.0),
    9: ("am_echo", 1.08, "Ooh-ooh, bananas!", ["OOH-OOH,", "BANANAS!"], "COCO", 1.18),
    10: ("bm_george", 0.95, "My pizza!", ["MY PIZZA!"], "TRUFFLE", 1.0),
}
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())


def pitch_up(path, factor):
    """Raise pitch by `factor` while keeping the duration (tiny mouse voice)."""
    tmp = path + ".tmp.wav"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", path, "-af",
                    f"asetrate=24000*{factor},aresample=24000,atempo={1/factor:.5f}", tmp], check=True)
    os.replace(tmp, path)


def main():
    t0 = time.time()
    os.makedirs(os.path.join(HERE, "assets", "vo"), exist_ok=True)
    dur = {}
    todo = [ln for ln in LINES if not os.path.exists(os.path.join(HERE, "assets", "vo", f"line{ln}.wav"))]
    if todo:
        import kokoro_onnx
        k = kokoro_onnx.Kokoro(M + "kokoro-v1.0.onnx", M + "voices-v1.0.bin")
        print("kokoro loaded", round(time.time() - t0), "s", flush=True)
        for ln in todo:
            voice, speed, text, _, _, pf = LINES[ln]
            s, sr = k.create(text.replace("Mochi", "Moh-chee"), voice=voice, speed=speed, lang="en-us")
            path = os.path.join(HERE, "assets", "vo", f"line{ln}.wav")
            sf.write(path, np.asarray(s, dtype=np.float32), sr)
            if pf != 1.0: pitch_up(path, pf)
            print("tts", ln, voice, round(len(s) / sr, 3), "s", round(time.time() - t0), flush=True)
        del k
    for ln in LINES:
        d, sr0 = sf.read(os.path.join(HERE, "assets", "vo", f"line{ln}.wav"))
        dur[ln] = round(len(d) / sr0, 3)

    from faster_whisper import WhisperModel
    model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
    print("whisper loaded", round(time.time() - t0), "s", flush=True)
    words = {}
    for ln, (voice, speed, text, chunks, _, _) in LINES.items():
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
        end_all = dur[ln]
        for i in range(len(toks)):                              # interpolate unmatched words between neighbours
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
        print("asr", ln, " ".join(x[0] for x in asr), "|| matched", sum(blk.size for blk in sm.get_matching_blocks()), "/", len(toks), flush=True)
    json.dump({"words": words, "chunks": {ln: v[3] for ln, v in LINES.items()}, "tags": {ln: v[4] for ln, v in LINES.items()}, "dur": dur},
              open(os.path.join(HERE, "words.json"), "w"), indent=1)
    print("DONE", round(time.time() - t0), "s", dur, flush=True)


if __name__ == "__main__":
    main()

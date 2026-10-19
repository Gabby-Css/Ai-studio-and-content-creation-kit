"""Voice lines for 'Bo and the Pancake 27: Keep It Warm' (Kokoro, Apache-2.0, local) + word timings for the captions.
Narrator = af_heart @1.0 (same voice as videos #1-#16). Quips use the cast catchphrases.
Writes assets/vo/line<N>.wav and words.json  {"words": {ln: [{w,s,e}]}, "chunks": {ln: [...]}, "tags", "dur"}
Lines already synthesized are reused (so a text tweak only re-runs that line); delete assets/vo/line<N>.wav to force."""
import os, re, json, time, difflib, subprocess
import numpy as np, soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
M = os.path.expanduser("~/.cache/kokoro-onnx/")

# ln: (voice, speed, text, caption chunks, speaker tag, pitch factor, extra ffmpeg filter)
ROBOT = "aecho=0.8:0.88:7:0.45,highpass=f=150,tremolo=f=28:d=0.35"
HOLO = "highpass=f=260,lowpass=f=4800,aecho=0.8:0.7:35:0.35,tremolo=f=11:d=0.18"
HUGE = "aecho=0.8:0.7:70:0.3,lowpass=f=3800"
LINES = {
    1: ('af_heart', 1.0, 'Everybody wanted to keep the egg warm!', ['EVERYBODY WANTED', 'TO KEEP THE', 'EGG WARM!'], '', 1.0, None),
    2: ('bm_george', 0.92, "I'll toast it! Hot, hot, hot!", ["I'LL TOAST IT!", 'HOT, HOT,', 'HOT!'], 'TRUFFLE', 1.0, None),
    3: ('bf_emma', 0.9, 'Hmph. Too hot. Obviously.', ['HMPH. TOO', 'HOT. OBVIOUSLY.'], 'MOCHI', 1.0, None),
    4: ('am_michael', 1.0, 'Beep boop! Thirty-seven degrees. Perfect!', ['BEEP BOOP!', 'THIRTY-SEVEN', 'DEGREES. PERFECT!'], 'ZAP', 0.9, ROBOT),
    5: ('am_onyx', 0.88, "Roar! I'll give it a cuddle!", ["ROAR! I'LL", 'GIVE IT', 'A CUDDLE!'], 'GUMDROP', 0.9, None),
    6: ('af_heart', 1.0, 'But the egg wiggled and rolled away!', ['BUT THE EGG', 'WIGGLED AND', 'ROLLED AWAY!'], '', 1.0, None),
    7: ('am_echo', 1.08, 'Ooh-ooh! Stop that egg!', ['OOH-OOH!', 'STOP THAT', 'EGG!'], 'COCO', 1.18, None),
    8: ('af_heart', 1.0, 'Down, down, down the hill it rolled!', ['DOWN, DOWN,', 'DOWN THE HILL', 'IT ROLLED!'], '', 1.0, None),
    9: ('am_puck', 1.05, "I'll catch it!", ["I'LL CATCH", 'IT!'], 'BO', 1.0, None),
    10: ('af_sky', 0.95, "I... I'll help. Boo.", ["I... I'LL", 'HELP. BOO.'], 'BOO', 1.0, None),
    11: ('af_heart', 1.0, 'And together, they caught it just in time!', ['AND TOGETHER,', 'THEY CAUGHT IT', 'JUST IN TIME!'], '', 1.0, None),
}
SYNTH = {}
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())


def pitch_up(path, factor):
    """Raise/lower pitch by `factor` while keeping the duration."""
    tmp = path + ".tmp.wav"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", path, "-af",
                    f"asetrate=24000*{factor},aresample=24000,atempo={1/factor:.5f}", tmp], check=True)
    os.replace(tmp, path)


def fx(path, filt):
    tmp = path + ".tmp.wav"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", path, "-af", filt, tmp], check=True)
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
            voice, speed, text, _, _, pf, filt = LINES[ln]
            say = SYNTH.get(ln, text)
            s, sr = k.create(say.replace("Mochi", "Moh-chee"), voice=voice, speed=speed, lang="en-us")
            path = os.path.join(HERE, "assets", "vo", f"line{ln}.wav")
            sf.write(path, np.asarray(s, dtype=np.float32), sr)
            if pf != 1.0: pitch_up(path, pf)
            if filt: fx(path, filt)
            print("tts", ln, voice, round(len(s) / sr, 3), "s", round(time.time() - t0), flush=True)
        del k
    for ln in LINES:
        d, sr0 = sf.read(os.path.join(HERE, "assets", "vo", f"line{ln}.wav"))
        dur[ln] = round(len(d) / sr0, 3)

    from faster_whisper import WhisperModel
    model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
    print("whisper loaded", round(time.time() - t0), "s", flush=True)
    words = {}
    for ln, (voice, speed, text, chunks, _, _, _) in LINES.items():
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

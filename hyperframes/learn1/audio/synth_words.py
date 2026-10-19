"""Batch-synthesize every sung word + spoken line once with Kokoro (Apache-2.0, local). Cached -> safe to re-run."""
import os, sys, json, time
import numpy as np, soundfile as sf
import kokoro_onnx
import song

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
M = os.path.expanduser("~/.cache/kokoro-onnx/")
k = kokoro_onnx.Kokoro(M + "kokoro-v1.0.onnx", M + "voices-v1.0.bin")

SUNG_VOICES = ["af_heart", "af_sky", "bf_emma"]          # lead, gang A, gang B
SPEECH_VOICE = {"kiko": "am_puck", "luma": "af_heart", "gizmo": "af_nova", "all": "af_sky"}
SPEED_SUNG = 0.85
TTS_TEXT = {"a": "uh", "the": "thuh", "to": "tuh", "of": "uv", "i": "I"}   # isolated function words need phonetic spellings


def synth(text, voice, speed, path):
    if os.path.exists(path):
        return False
    os.makedirs(os.path.dirname(path), exist_ok=True)
    s, sr = k.create(text, voice=voice, speed=speed, lang="en-us")
    sf.write(path, np.asarray(s, dtype=np.float32), sr)
    return True


if __name__ == "__main__":
    d = song.build()
    words = {}
    for ln in d["lines"]:
        for w in ln["words"]:
            for x in w.get("subs", [w]):
                words[x["text"]] = 1
    t0 = time.time(); n = 0
    # spoken lines first (small, needed early for QA)
    for i, sp in enumerate(d["speech"]):
        p = os.path.join(CACHE, "speech", f"{i:02d}_{sp['who']}.wav")
        if synth(sp["text"], SPEECH_VOICE[sp["who"]], 1.0, p): n += 1
        print("speech", i, sp["text"], round(time.time() - t0), "s", flush=True)
    for v in SUNG_VOICES:
        for j, w in enumerate(sorted(words)):
            p = os.path.join(CACHE, v, w.replace("'", "_") + ".wav")
            if synth(TTS_TEXT.get(w.lower(), w), v, SPEED_SUNG, p): n += 1
            if j % 10 == 0: print(v, j, "/", len(words), round(time.time() - t0), "s", flush=True)
    print("DONE", n, "new files", round(time.time() - t0), "s", flush=True)

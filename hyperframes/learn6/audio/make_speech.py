"""Spoken character lines only (the singing is SoulX): synthesize the lines whose cached file is missing (Kokoro, Apache-2.0, local),
then render vocals_speech.wav exactly like the first video.   usage: python make_speech.py"""
import os, sys
import numpy as np, soundfile as sf
import kokoro_onnx
import song

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache", "speech")
M = os.path.expanduser("~/.cache/kokoro-onnx/")
VOICE = {"kiko": "am_puck", "luma": "af_heart", "gizmo": "af_nova", "all": "af_sky"}
k = kokoro_onnx.Kokoro(M + "kokoro-v1.0.onnx", M + "voices-v1.0.bin")
d = song.build(); os.makedirs(CACHE, exist_ok=True)
for i, sp in enumerate(d["speech"]):
    p = os.path.join(CACHE, f"{i:02d}_{sp['who']}.wav")
    if os.path.exists(p): continue
    s, sr = k.create(sp["text"], voice=VOICE[sp["who"]], speed=1.0, lang="en-us")
    sf.write(p, np.asarray(s, dtype=np.float32), sr); print("synth", i, sp["who"], sp["text"], flush=True)
import vocals
sp = vocals.render_speech()
sf.write(os.path.join(HERE, "vocals_speech.wav"), sp.astype(np.float32), vocals.SR)
print("vocals_speech.wav written", sp.shape)

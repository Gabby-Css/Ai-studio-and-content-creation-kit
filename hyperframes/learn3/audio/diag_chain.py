"""Which step of the lead-voice mix chain makes a sung word less intelligible?  usage: python diag_chain.py <t0> <t1>
Runs Whisper on the raw lead stem and after every processing step of mix4's lead chain (same order and settings as mix4.py)."""
import sys, os, re, numpy as np, soundfile as sf
sys.stdout.reconfigure(encoding="utf-8")
sys.argv = [sys.argv[0]] + sys.argv[1:3] + ["13"]
import mix4, stages
from mix import compress, SR
from faster_whisper import WhisperModel
t0, t1 = float(sys.argv[1]), float(sys.argv[2])
env = stages.MIXENV; P = lambda k, d: float(os.environ.get(k, env.get(k, d)))
PRES, HFPRES, CV, DSTH = P("M3_PRES", 4.5), P("M3_HFPRES", 0), P("M3_CV", 0), P("M3_DSTH", -34)
n = int((mix4.D["duration"] + 3) * SR)
lead = mix4.load_sx(os.environ.get("STEM", "lead.wav"), n)[int((t0 - .5) * SR):int((t1 + .5) * SR)]
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
TMP = os.path.join(os.environ.get("TEMP", "."), "_diag_l3.wav")
def hear(x, label):
    sf.write(TMP, (x / (np.abs(x).max() + 1e-9) * .5).astype(np.float32), SR)
    sg, _ = m.transcribe(TMP, language="en", beam_size=5, temperature=0.0, condition_on_previous_text=False, vad_filter=False)
    print(f"{label:22s} peak {20 * np.log10(np.abs(x).max() + 1e-9):6.1f} dB | " + " ".join(re.sub(r"[^a-z' ]", "", s.text.lower()) for s in sg), flush=True)
hear(lead, "raw stem")
x = mix4.expander(lead); hear(x, "expander")
x = mix4.filt(x, [("hp", 95, .7, 0), ("peak", 320, .9, -2.5), ("peak", 2900, .8, PRES), ("peak", 5200, 1.2, 1.5), ("hshelf", 9000, .7, 1.5)]); hear(x, "+EQ")
x = mix4.air(x); hear(x, "+air")
if HFPRES: x = mix4.filt(x, [("peak", 6300, .9, HFPRES)]); hear(x, "+HF presence")
if CV: x = mix4.cvr(np.stack([x, x], 1), CV)[:, 0]; hear(x, "+cvr")
x = mix4.deess(np.stack([x, x], 1), 5800, DSTH)[:, 0]; hear(x, "+deess")
x = compress(x[:, None], -24, 3.0, .004, .09, 5.0)[:, 0]; hear(x, "+comp1")
x = compress(x[:, None], -15, 2.0, .02, .35, 1.5)[:, 0]; hear(x, "+comp2")

"""A/B the singing synthesis variants on one hook line: UTMOS naturalness (relative!) + ASR word hits + pitch error"""
import sys, re, numpy as np, soundfile as sf, torch
SP = r"C:\Users\softenic\AppData\Local\Temp\claude\c--Users-softenic-Downloads-ai-video-studio-kit\e8a2cb42-3662-4642-82ca-a9f36c767d13\scratchpad"
sys.path.insert(0, SP + r"\stubs")
import singer, pyworld as pw, parselmouth
from faster_whisper import WhisperModel
pr = torch.hub.load("tarepan/SpeechMOS:v1.2.0", "utmos22_strong", trust_repo=True)
asr = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
def mos(y, sr): return float(pr(torch.from_numpy(np.asarray(y, np.float32)).unsqueeze(0), sr))
BPM = 108; E8 = 60 / BPM / 2
NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]
LINE = [("red", ["G4"], 2), ("and", ["G4"], 2), ("blue", ["A4"], 2), ("and", ["A4"], 2), ("yellow", ["C5", "A4"], 2), ("too", ["G4"], 4)]
EXP = "red and blue and yellow too".split()
def build(voice, **kw):
    out = np.zeros(int(8 * singer.SR), np.float32); t = .4
    for w, ns, ln in LINE:
        notes = []; tt = t
        for n in ns: notes.append((midi(n), tt, ln * E8)); tt += ln * E8
        y, ts = singer.sing_syllables(w, voice, notes, rng=np.random.default_rng(3), **kw)
        a = int(ts * singer.SR); out[a:a + len(y)] += y[: len(out) - a]; t = tt
    return out[: int((t + .5) * singer.SR)]
def score(name, y, sr=singer.SR):
    p = f"proto/ab_{name}.wav"; sf.write(p, y, sr)
    sg, _ = asr.transcribe(p, language="en", beam_size=5, temperature=0.0, condition_on_previous_text=False, vad_filter=False)
    heard = " ".join(re.sub(r"[^a-z' ]", "", s.text.lower()) for s in sg).split()
    hit = sum(w in heard for w in EXP)
    snd = parselmouth.Sound(p); pit = snd.to_pitch_ac(time_step=.01, pitch_floor=75, pitch_ceiling=800).selected_array["frequency"]
    print(f"{name:22s} MOS {mos(y, sr):.2f}  ASR {hit}/{len(EXP)}  heard: {' '.join(heard)}", flush=True)
def build_t(voice, semis=0, **kw):
    out = np.zeros(int(8 * singer.SR), np.float32); t = .4
    for w, ns, ln in LINE:
        notes = []; tt = t
        for n in ns: notes.append((midi(n) + semis, tt, ln * E8)); tt += ln * E8
        y, ts = singer.sing_syllables(w, voice, notes, rng=np.random.default_rng(3), **kw)
        a = int(ts * singer.SR); out[a:a + len(y)] += y[: len(out) - a]; t = tt
    return out[: int((t + .5) * singer.SR)]

if __name__ == "__main__":
    for semis in (0, -3, -5, -7, -12):
        score(f"s100_f106_t{semis}", build_t("af_heart", semis, speed=1.0, formant=1.06))
    score("s100_f100_t-5_clean", build_t("af_heart", -5, speed=1.0, formant=1.0, vib=False, scoop=False, drift=False))
    score("s110_f106_t-5", build_t("af_heart", -5, speed=1.1, formant=1.06))
    score("s100_f112_t-5", build_t("af_heart", -5, speed=1.0, formant=1.12))

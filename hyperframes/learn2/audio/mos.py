import sys, numpy as np, soundfile as sf, torch
sys.path.insert(0, sys.argv[1])
pr = torch.hub.load("tarepan/SpeechMOS:v1.2.0", "utmos22_strong", trust_repo=True)
def mos(y, sr): return float(pr(torch.from_numpy(np.asarray(y, np.float32)).unsqueeze(0), sr))
if __name__ == "__main__":
    import singer
    for p in sys.argv[2:]:
        y, sr = sf.read(p, dtype="float32")
        if y.ndim > 1: y = y.mean(axis=1)
        print("MOS %.2f  %s" % (mos(y, sr), p))
    for t in ("Red and blue and yellow too", "Rainbow colors, big and bright"):
        print("MOS %.2f  kokoro speech: %s" % (mos(singer.speak(t), 24000), t), flush=True)

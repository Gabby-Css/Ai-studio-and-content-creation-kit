"""QA after the singing (run by stages.stage_qa): find sung words whose final hiss (sh/s/f/z...) is placed in the middle of the note with the
voice carrying on afterwards (sx_tail.bad_notes), re-sing just those lines with another random take, rebuild lead_sx.wav.
Limits: 2 rounds, 12 lines per round (worst case about 2 hours).  Old takes are kept in sx/_old/qa<round>/ and restored if a re-render fails."""
import os, sys, json, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import stages as S, sx_tail

HERE = S.HERE; SX = os.path.join(HERE, "sx")

def segs_by_key():
    d = {}
    for s in json.load(open(os.path.join(SX, "lead_all.json"), encoding="utf8")): d.setdefault(sx_tail.key(s), s)
    return d

def flagged(by):
    out = {}
    for k, s in by.items():
        p = os.path.join(SX, "wav_lead", k + ".wav")
        if not os.path.exists(p): continue
        try: bad = sx_tail.bad_notes(p, s)
        except Exception as e: S.log("tail check failed for", k, e); continue
        if bad: out[k] = bad
    return out

def restore(keys, old):
    for k in keys:                                                        # a line without a usable take gets its previous take back
        if not (os.path.exists(os.path.join(SX, "mel_lead", k + ".pt")) and os.path.exists(os.path.join(SX, "wav_lead", k + ".wav"))):
            for sub, ext in (("mel_lead", ".pt"), ("wav_lead", ".wav")):
                src = os.path.join(old, k + ext)
                if os.path.exists(src): shutil.copyfile(src, os.path.join(SX, sub, k + ext)); S.log("restored previous take of", k, ext)

def main():
    by = segs_by_key(); bad = flagged(by)
    S.log(f"QA: {len(bad)} of {len(by)} lines flagged:", {k: v[0][3] for k, v in bad.items()})
    for rnd in (1, 2):
        if not bad: break
        keys = sorted(bad, key=lambda k: by[k]["time"][0])[:12]
        old = os.path.join(SX, "_old", f"qa{rnd}"); os.makedirs(old, exist_ok=True)
        for k in keys:
            for sub, ext in (("mel_lead", ".pt"), ("wav_lead", ".wav")):
                p = os.path.join(SX, sub, k + ext)
                if os.path.exists(p): shutil.move(p, os.path.join(old, k + ext))
        S.status(f"quality check: re-singing {len(keys)} lines (round {rnd})")
        S.sh(S.MEL, cwd=HERE, env=dict(SX_Q8="1", SX_ONLY=",".join(keys), SX_SEEDOFF=str(rnd + 1)), tries=3, wait=60, name=f"QA re-sing round {rnd}")
        S.sh([S.SXPY, "-u", "sx_local.py", "voc", "lead"], cwd=HERE, env=dict(SX_Q8="1"), tries=2, wait=60, name="vocoder (QA)")
        restore(keys, old)
        bad = flagged({k: by[k] for k in keys})
        S.log(f"QA round {rnd}: still flagged {list(bad)}")
    S.log("QA finished; lines left flagged:", list(bad))
    return S.place_vocals()

if __name__ == "__main__": sys.exit(0 if main() else 1)

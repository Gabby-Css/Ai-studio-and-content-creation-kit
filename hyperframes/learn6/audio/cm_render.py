"""Render music_cm.arrange() events with the GeneralUser GS SoundFont (FluidSynth CLI, licence allows commercial use)
into one stem per bus: harm / mel / bass / drums  ->  audio/cm_stems/<bus>.wav  (44.1 kHz stereo float32, unclipped).
usage: python cm_render.py [bus ...]       (default: all)"""
import os, sys, json, time
import numpy as np, soundfile as sf
SFDIR = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "tools", "soundfonts"))
sys.path.insert(0, SFDIR)
import sfrender
import music2 as music_cm

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.environ.get("CM_STEMS") or os.path.join(HERE, "cm_stems"); os.makedirs(OUT, exist_ok=True)
SR = 44100
# (bank, reverb send, chorus send): ukulele lives in GS variation bank 8; mallets get a little room, bass/drums stay dry
VOICE = {"uke": (8, 22, 0), "gtr": (0, 25, 8), "piano": (0, 28, 0), "pizz": (0, 25, 0), "strings": (0, 40, 12),
         "bass": (0, 0, 0), "tuba": (0, 0, 0),
         "glock": (0, 50, 6), "xylo": (0, 38, 0), "marimba": (0, 36, 0), "celesta": (0, 52, 8), "musicbox": (0, 52, 4),
         "harp": (0, 46, 6), "whistle": (0, 42, 0), "steeldr": (0, 40, 6), "drums": (0, 14, 0),
         "flute": (0, 34, 4), "brass": (0, 28, 6), "vibes": (0, 40, 4), "banjo": (0, 20, 0), "synbass": (0, 0, 0),
         "oboe": (0, 24, 0), "bassoon": (0, 12, 0), "sax": (0, 24, 4), "trumpet": (0, 22, 0), "timp": (0, 20, 0), "squarelead": (0, 18, 0)}

def to_sf_events(evs):
    out = []
    for e in evs:
        prog, _bus, _pan = music_cm.INST[e["inst"]]; bank, rev, cho = VOICE[e["inst"]]
        d = dict(t=e["t"], dur=e["dur"], note=e["note"], vel=e["vel"], pan=e["pan"], prog=prog, bank=bank, rev=rev, cho=cho)
        d["ch"] = 9 if e["inst"] == "drums" else 0
        if e["inst"] == "drums": d["prog"] = 0                 # GM standard kit
        out.append(d)
    return out

def main(buses=None):
    evs = music_cm.arrange()
    json.dump(evs, open(os.environ.get("CM_EVENTS") or os.path.join(HERE, "cm_events.json"), "w"))
    allb = sorted({music_cm.INST[e["inst"]][1] for e in evs})
    for bus in (buses or allb):
        t = time.time(); sel = [e for e in evs if music_cm.INST[e["inst"]][1] == bus]
        a = sfrender.render(to_sf_events(sel), sr=SR, gain=.5, tail=3.0)
        sf.write(os.path.join(OUT, bus + ".wav"), a, SR)
        pk = float(np.max(np.abs(a))); rms = float(np.sqrt(np.mean(a ** 2)))
        print(f"{bus:6s} {len(sel):5d} events  {a.shape[0] / SR:6.1f}s  peak {20 * np.log10(pk + 1e-9):6.1f} dB  rms {20 * np.log10(rms + 1e-9):6.1f} dB  ({time.time() - t:.0f}s)", flush=True)

if __name__ == "__main__":
    main(sys.argv[1:] or None)

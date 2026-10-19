"""QA + final mux for one episode:  python qa_episode.py N
 - measures loudness of the raw render, re-muxes (video copied) with a gain to reach about -14.2 LUFS
 - writes a frame contact sheet of the final file (qa/sheet.png) and prints an ASR transcript of its audio."""
import sys, re, os, subprocess, tempfile
n = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
d = os.path.join(HERE, f"toon{n}", "output")
raw = os.path.join(d, f"bo-and-the-pancake-{n}.mp4")
fin = os.path.join(d, f"bo-and-the-pancake-{n}-final.mp4")
qa = os.path.join(HERE, f"toon{n}", "qa")
os.makedirs(qa, exist_ok=True)


def meas(f):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    s = err[err.rfind("Summary"):]
    return float(re.search(r"I:\s+(-?[\d.]+) LUFS", s).group(1)), float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", s).group(1))


pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_name,width,height,r_frame_rate,duration", "-of", "csv=p=0", raw],
                    capture_output=True, text=True).stdout
print("probe:", pr.strip().replace("\n", " | "), flush=True)
I, TP = meas(raw)
gain = round(-14.2 - I, 1)
print(f"raw: {I} LUFS, TP {TP} dBFS -> gain {gain} dB", flush=True)
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", raw, "-c:v", "copy", "-af", f"volume={gain}dB,alimiter=limit=0.84:attack=5:release=50:level=disabled", "-c:a", "aac", "-b:a", "192k", fin], check=True)
I2, TP2 = meas(fin)
print(f"final: {I2} LUFS, TP {TP2} dBFS, {os.path.getsize(fin)/1e6:.1f} MB", flush=True)
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", fin, "-vf", "fps=1/2,scale=270:-1,tile=5x3:padding=4:color=white", "-frames:v", "1",
                os.path.join(qa, "sheet.png")], check=True)
print("sheet ok", flush=True)
wav = os.path.join(tempfile.gettempdir(), f"final{n}.wav")
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", fin, "-vn", "-ac", "1", "-ar", "16000", wav], check=True)
from faster_whisper import WhisperModel
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
segs, _ = m.transcribe(wav, beam_size=1, vad_filter=False)
for s in segs:
    print("%6.2f-%6.2f  %s" % (s.start, s.end, s.text.strip()))
print("[qa done]", flush=True)

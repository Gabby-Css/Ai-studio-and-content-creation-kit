import whisper, json, sys
m = whisper.load_model("base.en")
out = {}
for i in range(1, 7):
    r = m.transcribe(f"assets/vo/line{i}.wav", word_timestamps=True, language="en", fp16=False)
    out[i] = [{"w": w["word"].strip(), "s": round(w["start"], 3), "e": round(w["end"], 3)} for s in r["segments"] for w in s["words"]]
    print(i, " ".join(x["w"] for x in out[i]))
json.dump(out, open("words.json", "w"), indent=1)

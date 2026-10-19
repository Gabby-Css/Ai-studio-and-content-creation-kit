"""SoulX-Singer on this (low-RAM, CPU-only) machine, in two passes so only half the model is ever in memory:
  mel   : note/lyric encoder + flow-matching decoder -> one mel per UNIQUE line (repeated chorus lines are sung once)
  voc   : Vocos vocoder -> 24 kHz wav per unique line
  place : put every line back at all of its song times -> one aligned track
Weights are memory-mapped from model.pt (assign=True), so nothing is copied twice. Every line is saved as soon as it
is done; re-running a pass skips finished lines.
usage: python sx_local.py mel   <voice lead|gang> <prompt_prefix> [seed] [n_steps] [threads]
       python sx_local.py voc   <voice>
       python sx_local.py place <voice> <out.wav>"""
import os, sys, json, time, hashlib
HERE = os.path.dirname(os.path.abspath(__file__))
SX = os.path.normpath(os.path.join(HERE, "..", "..", "..", "tools", "SoulX-Singer"))
sys.path.insert(0, SX)
import numpy as np, soundfile as sf, torch

CKPT = os.path.join(SX, "pretrained_models", "SoulX-Singer", "model.pt")
SR, HOP = 24000, 480

def uniq(voice):
    """unique segments of sx/<voice>_all.json -> list of (key, meta, [song start ms ...])"""
    segs = json.load(open(os.path.join(HERE, "sx", f"{voice}_all.json"), encoding="utf8"))
    u = {}
    for s in segs:
        sig = "|".join((s["phoneme"], s["note_pitch"], s["note_type"], s["duration"]))
        k = hashlib.md5(sig.encode()).hexdigest()[:10]
        if k not in u: u[k] = (dict(s), [])
        u[k][1].append(s["time"][0])
    return [(k, m, ts) for k, (m, ts) in u.items()]

def state_dict():
    return torch.load(CKPT, map_location="cpu", mmap=True, weights_only=False)["state_dict"]

def rebuild_rotary(root):
    """Llama rotary tables are non-persistent buffers (not in model.pt): re-create those tiny modules on the CPU."""
    for name, mod in list(root.named_modules()):
        if type(mod).__name__.endswith("RotaryEmbedding") and any(b.is_meta for b in mod.buffers()):
            new = type(mod)(mod.dim, mod.max_position_embeddings, mod.base, device="cpu", scaling_factor=mod.scaling_factor)
            parent, _, leaf = name.rpartition(".")
            setattr(root.get_submodule(parent) if parent else root, leaf, new)

def no_meta(mod):
    bad = [n for n, t in list(mod.named_parameters()) + list(mod.named_buffers()) if t.is_meta]
    if bad: raise RuntimeError(f"weights not loaded: {bad[:5]}")

def run_mel(voice, prompt, seed=12306, steps=32, threads=4):
    """env SX_Q8=1: int8 dynamic quantisation of every Linear in the decoder (1.8 GB -> ~0.45 GB, fits this RAM).
    env SX_OUT=<dir name> (default mel_<voice>), SX_ONLY=<key,key> to render just those lines (A/B tests)."""
    torch.set_num_threads(threads)
    import gc
    from soulxsinger.utils.file_utils import load_config
    import soulxsinger.models.soulxsinger as sxm
    from soulxsinger.utils.data_processor import DataProcessor

    class NoVocoder(torch.nn.Module):
        def __init__(self, *a, **k): super().__init__()
    real_cfm = sxm.CFMDecoder
    def meta_cfm(cfg):
        with torch.device("meta"): return real_cfm(cfg)
    sxm.Vocoder, sxm.CFMDecoder = NoVocoder, meta_cfm
    cfg = load_config(os.path.join(SX, "soulxsinger", "config", "soulxsinger.yaml"))
    model = sxm.SoulXSinger(cfg); rebuild_rotary(model)
    sd = {k: v for k, v in state_dict().items() if not k.startswith("vocoder.")}
    model.load_state_dict(sd, strict=True, assign=True); no_meta(model); model.eval()
    if os.environ.get("SX_Q8") == "1":
        model.cfm_decoder = torch.ao.quantization.quantize_dynamic(model.cfm_decoder, {torch.nn.Linear}, dtype=torch.qint8)
        model.preflow = torch.ao.quantization.quantize_dynamic(model.preflow, {torch.nn.Linear}, dtype=torch.qint8)
    del sd; gc.collect()
    print("mel model ready", "(int8)" if os.environ.get("SX_Q8") == "1" else "(fp32)", flush=True)

    dp = DataProcessor(hop_size=HOP, sample_rate=SR, phoneset_path=os.path.join(SX, "soulxsinger/utils/phoneme/phone_set.json"), device="cpu")
    pmeta = json.load(open(prompt + ".json", encoding="utf8"))[0]
    out_dir = os.path.join(HERE, "sx", os.environ.get("SX_OUT", f"mel_{voice}")); os.makedirs(out_dir, exist_ok=True)
    todo = uniq(voice); only = [x for x in os.environ.get("SX_ONLY", "").split(",") if x]
    for i, (k, meta, ts) in enumerate(todo):
        p = os.path.join(out_dir, k + ".pt")
        if os.path.exists(p) or (only and k not in only): continue
        t = time.time()
        pt = dp.process(json.loads(json.dumps(pmeta)), prompt + ".wav")
        meta = dict(meta); meta["f0"] = ""
        tg = dp.process(meta, None)
        torch.manual_seed(seed + i)
        with torch.inference_mode():
            mel = infer_mel(model, pt, tg, steps, cfg.infer.cfg)
        torch.save({"mel": mel.clone(), "ts": ts, "dur": sum(float(x) for x in meta["duration"]) if isinstance(meta["duration"], list) else None}, p)
        print(f"[{voice}] {i + 1}/{len(todo)} {k} at {[x / 1000 for x in ts]} -> {mel.shape[1] / 50:.2f}s audio in {time.time() - t:.0f}s", flush=True)
    print("MEL DONE", voice, flush=True)

def infer_mel(model, pt, tg, steps, cfg):
    """SoulXSinger.infer() in score mode, stopping before the vocoder."""
    gt_pitch, pt_pitch = tg["note_pitch"], pt["note_pitch"]
    gt_f0 = torch.zeros_like(tg["mel2note"]).float(); pt_f0 = torch.zeros_like(pt["mel2note"]).float()
    pt_mel = model.mel(pt["waveform"].float())
    len_prompt, len_prompt_mel = pt_pitch.shape[1], pt_f0.shape[1]
    note_pitch = torch.cat([pt_pitch, gt_pitch], 1).clamp(0, 255)
    note_text = torch.cat([pt["phoneme"], tg["phoneme"]], 1)
    note_type = torch.cat([pt["note_type"], tg["note_type"]], 1)
    mel2note = torch.cat([pt["mel2note"], tg["mel2note"] + len_prompt], 1)
    f0c = torch.cat([model.f0_to_coarse(pt_f0), model.f0_to_coarse(gt_f0)], 1)
    h = model.note_pitch_encoder(note_pitch) + model.note_type_encoder(note_type) + model.note_text_encoder(note_text)
    h = model.preflow(h)
    h = model.expand_states(h, mel2note) + model.f0_encoder(f0c)
    return model.cfm_decoder.reverse_diffusion(pt_mel, h[:, :len_prompt_mel], h[:, len_prompt_mel:], n_timesteps=steps, cfg=cfg)

def run_voc(voice, threads=4):
    torch.set_num_threads(threads)
    from soulxsinger.models.modules.vocoder import Vocoder
    with torch.device("meta"): voc = Vocoder()
    sd = {k[len("vocoder."):]: v for k, v in state_dict().items() if k.startswith("vocoder.")}
    voc.load_state_dict(sd, strict=True, assign=True); no_meta(voc); voc.eval()
    print("vocoder ready", flush=True)
    for name in [x for x in os.environ.get("SX_OUT", f"mel_{voice}").split(",") if x]:
        voc_dir(voc, os.path.join(HERE, "sx", name), os.path.join(HERE, "sx", "wav" + name[3:]))
    print("VOC DONE", voice, flush=True)

def voc_dir(voc, src, dst):
    os.makedirs(dst, exist_ok=True)
    for f in sorted(os.listdir(src)):
        p = os.path.join(dst, f[:-3] + ".wav")
        if os.path.exists(p) and os.path.getmtime(p) > os.path.getmtime(os.path.join(src, f)): continue
        mel = torch.load(os.path.join(src, f))["mel"]
        with torch.inference_mode():
            y = voc(mel.transpose(1, 2)[0:1]).float().squeeze().numpy()
        sf.write(p, y.astype(np.float32), SR); print("voc", f, f"{len(y) / SR:.2f}s", flush=True)

def run_place(voice, out):
    segs = uniq(voice)
    total = max(t for _, m, ts in segs for t in ts) / 1000 + 6
    track = np.zeros(int(total * SR), np.float32); missing = []
    for k, m, ts in segs:
        p = os.path.join(HERE, "sx", f"wav_{voice}", k + ".wav")
        if not os.path.exists(p): missing.append((k, ts)); continue
        y, _ = sf.read(p, dtype="float32")
        seg_len = m["time"][1] - m["time"][0]
        n = min(len(y), int(seg_len / 1000 * SR))
        y = y[:n].copy(); f = int(.01 * SR); y[-f:] *= np.linspace(1, 0, f)
        for t in ts:
            i = int(t / 1000 * SR); track[i: i + n] += y[: len(track) - i]
    sf.write(out, track, SR); print("placed", out, "missing:", missing)

if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "mel":
        run_mel(sys.argv[2], sys.argv[3], *(int(x) for x in sys.argv[4:7]))
    elif cmd == "voc": run_voc(sys.argv[2])
    elif cmd == "place": run_place(sys.argv[2], sys.argv[3])

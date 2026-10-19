#!/usr/bin/env python3
"""
GPU-accelerated Whisper transcription tool.

Usage:
    python whisper-transcribe.py <file>              Transcribe a single file
    python whisper-transcribe.py --dir <path>        Scan directory for media files
    python whisper-transcribe.py --status            Show transcription log
    python whisper-transcribe.py --dir <path> --out <path>  Custom output directory

Outputs .txt, .srt, and .json next to each input file (or in --out directory).
Tracks completed files in memory/whisper-log.jsonl to skip duplicates.

Requires: pip install openai-whisper
"""

import argparse
import hashlib
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

try:
    import whisper
except ImportError:
    print("ERROR: openai-whisper not installed. Run: pip install openai-whisper")
    sys.exit(1)

MEDIA_EXTENSIONS = {
    ".mp4", ".mkv", ".avi", ".mov", ".webm", ".flv", ".wmv",  # video
    ".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma",  # audio
}

REPO_ROOT = Path(__file__).resolve().parent.parent
LOG_FILE = REPO_ROOT / "memory" / "whisper-log.jsonl"
MODEL_NAME = "medium"


def file_hash(path: Path) -> str:
    """Fast hash: first 8MB + file size for dedup without reading entire file."""
    h = hashlib.sha256()
    h.update(str(path.stat().st_size).encode())
    with open(path, "rb") as f:
        h.update(f.read(8 * 1024 * 1024))
    return h.hexdigest()[:16]


def load_log() -> dict:
    """Load transcription log. Returns {file_hash: entry}."""
    entries = {}
    if LOG_FILE.exists():
        for line in LOG_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                entry = json.loads(line)
                entries[entry["hash"]] = entry
            except (json.JSONDecodeError, KeyError):
                continue
    return entries


def append_log(entry: dict):
    """Append one entry to the JSONL log."""
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")


def format_timestamp(seconds: float) -> str:
    """Convert seconds to SRT timestamp format HH:MM:SS,mmm."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_srt(segments: list, out_path: Path):
    """Write SRT subtitle file from whisper segments."""
    lines = []
    for i, seg in enumerate(segments, 1):
        start = format_timestamp(seg["start"])
        end = format_timestamp(seg["end"])
        text = seg["text"].strip()
        lines.append(f"{i}")
        lines.append(f"{start} --> {end}")
        lines.append(text)
        lines.append("")
    out_path.write_text("\n".join(lines), encoding="utf-8")


def write_txt(segments: list, out_path: Path):
    """Write clean transcript text, one segment per line."""
    text = "\n".join(seg["text"].strip() for seg in segments)
    out_path.write_text(text, encoding="utf-8")


def write_json(result: dict, source_path: Path, out_path: Path):
    """Write JSON with segments and metadata."""
    output = {
        "source": str(source_path),
        "model": MODEL_NAME,
        "language": result.get("language", "unknown"),
        "transcribed_at": datetime.now(timezone.utc).isoformat(),
        "segments": [
            {
                "id": seg["id"],
                "start": round(seg["start"], 3),
                "end": round(seg["end"], 3),
                "text": seg["text"].strip(),
            }
            for seg in result["segments"]
        ],
        "full_text": result["text"].strip(),
    }
    out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")


def transcribe_file(model, file_path: Path, out_dir: Path | None, log: dict) -> bool:
    """Transcribe a single file. Returns True if transcribed, False if skipped."""
    fhash = file_hash(file_path)

    if fhash in log:
        print(f"  SKIP (already transcribed): {file_path.name}")
        return False

    dest = out_dir if out_dir else file_path.parent
    dest.mkdir(parents=True, exist_ok=True)

    stem = file_path.stem
    txt_path = dest / f"{stem}.txt"
    srt_path = dest / f"{stem}.srt"
    json_path = dest / f"{stem}.json"

    print(f"  Transcribing: {file_path.name} ...")
    t0 = time.time()

    result = model.transcribe(
        str(file_path),
        language=None,       # auto-detect
        verbose=False,
    )

    elapsed = time.time() - t0
    segments = result.get("segments", [])

    write_txt(segments, txt_path)
    write_srt(segments, srt_path)
    write_json(result, file_path, json_path)

    entry = {
        "hash": fhash,
        "file": str(file_path),
        "size_mb": round(file_path.stat().st_size / (1024 * 1024), 2),
        "language": result.get("language", "unknown"),
        "segments": len(segments),
        "duration_s": round(segments[-1]["end"], 1) if segments else 0,
        "elapsed_s": round(elapsed, 1),
        "outputs": [str(txt_path), str(srt_path), str(json_path)],
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    append_log(entry)

    print(f"  Done in {elapsed:.1f}s — {len(segments)} segments, lang={result.get('language')}")
    print(f"    -> {txt_path}")
    print(f"    -> {srt_path}")
    print(f"    -> {json_path}")
    return True


def find_media_files(directory: Path) -> list[Path]:
    """Recursively find media files in a directory."""
    files = []
    for p in sorted(directory.rglob("*")):
        if p.is_file() and p.suffix.lower() in MEDIA_EXTENSIONS:
            files.append(p)
    return files


def show_status():
    """Print transcription log summary."""
    log = load_log()
    if not log:
        print("No transcriptions recorded yet.")
        return

    print(f"Transcription log: {LOG_FILE}")
    print(f"Total files: {len(log)}\n")

    total_duration = 0
    total_elapsed = 0
    for entry in log.values():
        total_duration += entry.get("duration_s", 0)
        total_elapsed += entry.get("elapsed_s", 0)
        ts = entry.get("timestamp", "?")[:19]
        name = Path(entry["file"]).name
        dur = entry.get("duration_s", 0)
        lang = entry.get("language", "?")
        print(f"  [{ts}] {name}  ({dur:.0f}s, {lang})")

    print(f"\nTotal media duration: {total_duration/60:.1f} min")
    print(f"Total processing time: {total_elapsed/60:.1f} min")
    if total_duration > 0:
        print(f"Speed ratio: {total_duration/total_elapsed:.1f}x realtime")


def main():
    parser = argparse.ArgumentParser(
        description="GPU-accelerated Whisper transcription tool"
    )
    parser.add_argument("file", nargs="?", help="Single media file to transcribe")
    parser.add_argument("--dir", help="Directory to scan for media files")
    parser.add_argument("--out", help="Output directory (default: next to input file)")
    parser.add_argument("--status", action="store_true", help="Show transcription log")
    parser.add_argument(
        "--model", default=MODEL_NAME, help=f"Whisper model (default: {MODEL_NAME})"
    )
    parser.add_argument(
        "--cpu", action="store_true", help="Force CPU mode (default: CUDA)"
    )

    args = parser.parse_args()

    if args.status:
        show_status()
        return

    if not args.file and not args.dir:
        parser.print_help()
        sys.exit(1)

    # Resolve output directory
    out_dir = Path(args.out).resolve() if args.out else None

    # Collect files to process
    files = []
    if args.file:
        p = Path(args.file).resolve()
        if not p.exists():
            print(f"ERROR: File not found: {p}")
            sys.exit(1)
        files.append(p)
    if args.dir:
        d = Path(args.dir).resolve()
        if not d.is_dir():
            print(f"ERROR: Directory not found: {d}")
            sys.exit(1)
        files.extend(find_media_files(d))

    if not files:
        print("No media files found.")
        return

    print(f"Found {len(files)} media file(s)")

    # Load model
    device = "cpu" if args.cpu else "cuda"
    model_name = args.model
    print(f"Loading whisper model '{model_name}' on {device} ...")
    try:
        model = whisper.load_model(model_name, device=device)
    except Exception as e:
        if "cuda" in str(e).lower() or "CUDA" in str(e):
            print(f"CUDA error: {e}")
            print("Falling back to CPU ...")
            model = whisper.load_model(model_name, device="cpu")
        else:
            raise

    log = load_log()
    transcribed = 0
    skipped = 0

    for f in files:
        if transcribe_file(model, f, out_dir, log):
            transcribed += 1
            # Update log in memory so subsequent files see it
            log = load_log()
        else:
            skipped += 1

    print(f"\nComplete: {transcribed} transcribed, {skipped} skipped")


if __name__ == "__main__":
    main()

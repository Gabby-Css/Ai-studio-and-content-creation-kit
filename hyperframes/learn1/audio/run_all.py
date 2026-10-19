"""Unattended end-to-end pipeline for KiddoVerse LEARN #1 (survives the Claude session when launched through run_all.cmd / WMI).
Stages (see stages.py, reloaded before each one):  sfx -> picture -> thumbs -> vocals -> qa -> mix -> deliver.
Progress: learn1/deliver/STATUS.txt (one line) and learn1/deliver/run_all.log (everything)."""
import os, sys, ctypes, importlib, traceback, subprocess

HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
try: ctypes.windll.kernel32.SetThreadExecutionState(0x80000001)          # ES_CONTINUOUS | ES_SYSTEM_REQUIRED: the PC does not go to sleep while this runs
except Exception: pass
import stages

STAGES = [("sfx", True), ("picture", True), ("thumbs", False), ("vocals", True), ("qa", False), ("mix", True), ("deliver", True)]   # (name, stop the pipeline if it fails)

DONE_FLAG = os.path.join(stages.DELIVER, "ALL_DONE.flag")
TASK = "KiddoVerseLearn1"

def main():
    if os.path.exists(DONE_FLAG): stages.log("ALL_DONE.flag exists - nothing to do"); return 0       # (the scheduled task also runs at every logon, to resume after a reboot)
    os.makedirs(stages.DESK, exist_ok=True)
    note = os.path.join(stages.DESK, "_IN_PROGRESS.txt")
    if not os.path.exists(os.path.join(stages.DESK, "README_START_HERE.txt")):
        open(note, "w", encoding="utf8").write("Your video is being made on this PC (picture first, then singing, then mixing).\nIt needs about 7-10 hours in total. Keep the PC on and plugged in.\n"
                                               "When it is ready this file disappears and README_START_HERE.txt + the .mp4 files appear here.\nProgress: Downloads\\ai-video-studio-kit\\hyperframes\\learn1\\deliver\\STATUS.txt\n")
    stages.log("=== pipeline started ===", "python", sys.executable)
    for name, fatal in STAGES:
        try: importlib.reload(stages)
        except Exception: stages.log("reload failed (keeping previous code):", traceback.format_exc()[-600:])
        stages.status(f"running stage: {name}"); stages.log(f"--- stage {name} ---")
        try: ok = bool(getattr(stages, "stage_" + name)())
        except Exception: stages.log("EXCEPTION in stage", name, traceback.format_exc()[-1500:]); ok = False
        stages.log(f"--- stage {name}: {'OK' if ok else 'FAILED'} ---")
        if not ok and fatal:
            stages.status(f"STOPPED: stage '{name}' failed - see deliver\\run_all.log"); return 1
    stages.status("ALL DONE - the videos are in Desktop\\KiddoVerse_Learn1"); stages.log("=== ALL DONE ===")
    open(DONE_FLAG, "w").write(stages.now())
    try: subprocess.run(["schtasks", "/Delete", "/TN", TASK, "/F"], capture_output=True, timeout=60)     # remove the helper task again
    except Exception: pass
    return 0

if __name__ == "__main__": sys.exit(main())

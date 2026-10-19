"""Unattended pipeline for KiddoVerse LEARN #6 "Gizmo's Counting Machine": sfx -> picture -> mix -> thumbs -> deliver  (stages.py reloaded before each).
Progress: learn6/deliver/STATUS.txt (one line) + learn6/deliver/run_all.log.  Launch detached via run_all.cmd (WMI Win32_Process Create)."""
import os, sys, ctypes, importlib, traceback
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
try: ctypes.windll.kernel32.SetThreadExecutionState(0x80000001)
except Exception: pass
import stages
STAGES = [("sfx", True), ("picture", True), ("mix", True), ("thumbs", False), ("deliver", True)]
def main():
    os.makedirs(stages.DESK, exist_ok=True); stages.log("=== pipeline started ===", sys.executable)
    for name, fatal in STAGES:
        try: importlib.reload(stages)
        except Exception: stages.log("reload failed (keeping previous code):", traceback.format_exc()[-600:])
        stages.status("running stage: " + name); stages.log(f"--- stage {name} ---")
        try: ok = bool(getattr(stages, "stage_" + name)())
        except Exception: stages.log("EXCEPTION in stage", name, traceback.format_exc()[-1500:]); ok = False
        stages.log(f"--- stage {name}: {'OK' if ok else 'FAILED'} ---")
        if not ok and fatal: stages.status(f"FINAL STOPPED: stage '{name}' failed - see deliver\run_all.log"); return 1
    stages.status("FINAL DONE - videos are in Desktop\KiddoVerse_Learn6"); stages.log("=== ALL DONE ==="); return 0
if __name__ == "__main__": sys.exit(main())

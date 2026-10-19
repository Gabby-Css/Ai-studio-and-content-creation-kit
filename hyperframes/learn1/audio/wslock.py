"""Memory helper for the unattended run: this PC has 7.7 GB RAM shared with many apps, and Windows kept trimming the SoulX-Singer process out of
RAM (singing line = 400-580 s instead of 90 s, disk 500% busy).  This watcher gives every big sx_local.py python process a HARD minimum working
set (stays in RAM) as soon as it starts.  Runs until deliver/ALL_DONE.flag exists, then removes its own scheduled task."""
import ctypes, os, subprocess, time, datetime

HERE = os.path.dirname(os.path.abspath(__file__)); FLAG = os.path.join(os.path.dirname(HERE), "deliver", "ALL_DONE.flag"); LOGF = os.path.join(os.path.dirname(HERE), "deliver", "wslock.log")
k32 = ctypes.windll.kernel32; k32.OpenProcess.restype = ctypes.c_void_p
MIN_MB, MAX_MB = 1600, 3600; done = set()

def log(*a):
    with open(LOGF, "a", encoding="utf8") as f: f.write(f"[{datetime.datetime.now():%Y-%m-%d %H:%M:%S}] " + " ".join(str(x) for x in a) + "\n")

def lock(pid):
    h = k32.OpenProcess(0x0100 | 0x0400, False, pid)             # PROCESS_SET_QUOTA | PROCESS_QUERY_INFORMATION
    if not h: return False
    ok = k32.SetProcessWorkingSetSizeEx(ctypes.c_void_p(h), ctypes.c_size_t(MIN_MB << 20), ctypes.c_size_t(MAX_MB << 20), 0x9)   # HARDWS_MIN_ENABLE | HARDWS_MAX_DISABLE
    k32.CloseHandle(ctypes.c_void_p(h)); return bool(ok)

PS = "Get-Process python -ErrorAction SilentlyContinue | Where-Object { $_.PrivateMemorySize64 -gt 1GB } | ForEach-Object { $_.Id }"      # cheap: no CIM query (that one timed out when the PC was thrashing)

def main():
    log("watcher started")
    t_end = time.time() + 30 * 3600
    while time.time() < t_end and not os.path.exists(FLAG):
        try:
            out = subprocess.run(["powershell", "-NoProfile", "-Command", PS], capture_output=True, text=True, timeout=300).stdout.split()
            for s in out:
                pid = int(s)
                if pid not in done:
                    ok = lock(pid); done.add(pid) if ok else None; log("hard working-set minimum", MIN_MB, "MB for pid", pid, "->", ok)
        except Exception as e: log("error", e)
        time.sleep(20)
    log("finished")
    try: subprocess.run(["schtasks", "/Delete", "/TN", "KiddoVerseWsLock", "/F"], capture_output=True, timeout=60)
    except Exception: pass

if __name__ == "__main__": main()

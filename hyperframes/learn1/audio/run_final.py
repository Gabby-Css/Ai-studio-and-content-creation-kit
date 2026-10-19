"""Final stage runner: re-render the picture if it is older than its sources, then package (mux, 720p, shorts, checks, desktop files)."""
import stages as S
S.log("=== final: picture + deliver ===")
S.status("rendering the final picture (about 40-60 min)")
ok = S.stage_picture(); S.log("picture:", ok)
if not ok:
    S.status("FINAL STOPPED: picture render failed - see run_all.log"); raise SystemExit(1)
S.status("packaging the final videos"); ok2 = S.stage_deliver(); S.log("deliver:", ok2)
S.status("FINAL DONE - videos are in Desktop\KiddoVerse_Learn1" if ok2 else "FINAL STOPPED: deliver failed - see run_all.log")
raise SystemExit(0 if ok2 else 1)

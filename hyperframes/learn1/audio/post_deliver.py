"""Run once AFTER run_final.py has printed FINAL DONE (run_final imported the older stages.py, so its Shorts / README text are the old ones):
re-cut the ABC Short with the current table (190-210 s, clean boundaries) and rewrite README_START_HERE.txt from the current text."""
import os
import stages as S

v1080 = os.path.join(S.DESK, "KiddoVerse_Learn1_1080p.mp4")
abc = os.path.join(S.DESK, "Shorts", "KiddoVerse_Learn1_short_ABC_song.mp4")
if os.path.exists(abc):
    os.remove(abc)
ok = S.make_shorts(v1080, os.path.join(S.DESK, "Shorts"))
S.log("post_deliver: shorts", ok)
rep = [ln.rstrip("\r\n") for ln in open(os.path.join(S.DELIVER, "FINAL_REPORT.txt"), encoding="utf8").read().splitlines() if ln.strip()]
S.write_readme(rep)
S.log("post_deliver: README rewritten")

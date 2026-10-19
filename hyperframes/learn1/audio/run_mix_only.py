import stages as S
S.log("=== manual re-mix (clarity v2) ===")
ok = S.stage_mix()
S.log("manual re-mix result:", ok)
raise SystemExit(0 if ok else 1)

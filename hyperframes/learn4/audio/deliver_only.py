import stages
stages.status("running stage: deliver (final mix)")
ok = stages.stage_deliver()
stages.status("FINAL DONE - videos are in Desktop\KiddoVerse_Learn4" if ok else "FINAL STOPPED: deliver failed")
print("deliver", ok)

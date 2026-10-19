import stages
stages.status("running stage: picture (render only)")
ok = stages.stage_picture()
stages.status("PICTURE RENDERED - mix/deliver still to do" if ok else "PICTURE FAILED - see run_all.log")
print("picture", ok)

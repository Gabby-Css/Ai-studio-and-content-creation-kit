import numpy as np, soundfile as sf, parselmouth, time, os
from parselmouth.praat import call
import kokoro_onnx
M=os.path.expanduser('~/.cache/kokoro-onnx/')
k=kokoro_onnx.Kokoro(M+'kokoro-v1.0.onnx',M+'voices-v1.0.bin')
print(sorted(k.get_voices()))
for v in ['af_heart','af_sky','af_nova','af_bella','af_sarah','bf_emma','am_michael']:
    t=time.time()
    try: s,sr=k.create('Zoom, zoom, Kiddoverse!',voice=v,speed=1.0,lang='en-us')
    except Exception as e: print(v,'ERR',e); continue
    snd=parselmouth.Sound(np.asarray(s,dtype=np.float64),sr)
    p=snd.to_pitch(pitch_floor=75,pitch_ceiling=600)
    f=p.selected_array['frequency']; f=f[f>0]
    print(v,sr,round(len(s)/sr,2),'s  median f0',round(float(np.median(f)),1),'Hz  synth',round(time.time()-t,2),'s')

import numpy as np, soundfile as sf, parselmouth, os, time
from parselmouth.praat import call
import kokoro_onnx
M=os.path.expanduser('~/.cache/kokoro-onnx/')
k=kokoro_onnx.Kokoro(M+'kokoro-v1.0.onnx',M+'voices-v1.0.bin')
def mtof(m): return 440*2**((m-69)/12)
def sing(word,voice,notes,dur,shift=1.0):
    """word -> sung audio. notes: list of midi per syllable (even split). dur: seconds target."""
    s,sr=k.create(word,voice=voice,speed=1.0,lang='en-us')
    s=np.asarray(s,dtype=np.float64)
    # trim silence
    idx=np.where(np.abs(s)>0.01*np.max(np.abs(s)))[0]; s=s[idx[0]:idx[-1]+1]
    snd=parselmouth.Sound(s,sr)
    man=call(snd,'To Manipulation',0.01,75,600)
    # duration tier: scale whole word to dur
    cur=snd.duration; dt=call('Create DurationTier','d',0,cur); call(dt,'Add point',0,dur/cur)
    call([man,dt],'Replace duration tier')
    pt=call('Create PitchTier','p',0,cur)
    n=len(notes)
    for i,m in enumerate(notes):
        t0=cur*i/n; t1=cur*(i+1)/n
        call(pt,'Add point',t0+0.02*cur,mtof(m)); call(pt,'Add point',t1-0.02*cur,mtof(m))
    call([man,pt],'Replace pitch tier')
    out=call(man,'Get resynthesis (overlap-add)')
    if shift!=1.0: out=call(out,'Change gender',75,600,shift,0,1.0,1.0)
    return out.values[0],out.sampling_frequency
t=time.time()
parts=[]
for w,n,d in [('Zoom',[67],0.5),('zoom',[67],0.5),('Kiddoverse',[64,67,72],1.0)]:
    y,sr=sing(w,'af_heart',n,d,1.08); parts.append(y); parts.append(np.zeros(int(sr*.05)))
y=np.concatenate(parts); sf.write('vtest_sung.wav',y,int(sr))
snd=parselmouth.Sound(y,sr); f=snd.to_pitch(pitch_floor=75,pitch_ceiling=700).selected_array['frequency']; f=f[f>0]
print('ok',round(time.time()-t,1),'s; f0 range',round(f.min()),round(f.max()),'median',round(float(np.median(f))))

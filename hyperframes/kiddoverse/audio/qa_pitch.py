import numpy as np, soundfile as sf, parselmouth, song
D = song.build(); y, sr = sf.read('vocals_sung.wav'); y = y.mean(1)
snd = parselmouth.Sound(y, sr); pit = snd.to_pitch(time_step=.01, pitch_floor=150, pitch_ceiling=800)
errs = []; per = {}
for ln in D['lines']:
    if ln['voice'] != 'lead' or ln['kind'] not in ('v1', 'v2', 'v3', 'v4', 'bridge'): continue
    for w in ln['words']:
        for x in w.get('subs', [w]):
            for s in x['syl']:
                if s['dur'] < .3: continue
                a, b = s['t0'] + .3 * s['dur'], s['t0'] + .8 * s['dur']
                ts = np.arange(a, b, .01); f = np.array([pit.get_value_at_time(t) for t in ts], dtype=float); f = f[~np.isnan(f)]
                if len(f) < 3: per.setdefault('unvoiced', []).append(x['text']); continue
                tgt = 440 * 2 ** ((s['note'] - 69) / 12); c = 1200 * np.log2(np.median(f) / tgt); errs.append(c)
errs = np.array(errs); print('syllables measured', len(errs), ' unvoiced/undetected', len(per.get('unvoiced', [])))
print('median abs error cents', round(float(np.median(np.abs(errs))), 1), ' mean abs', round(float(np.mean(np.abs(errs))), 1), ' within 50c', round(float(np.mean(np.abs(errs) < 50) * 100)), '%  within 100c', round(float(np.mean(np.abs(errs) < 100) * 100)), '%')
print('octave errors (>600c):', int(np.sum(np.abs(errs) > 600)))

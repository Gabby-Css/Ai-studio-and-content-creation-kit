import sys, numpy as np, soundfile as sf
from scipy.signal import welch
x, sr = sf.read(sys.argv[1], dtype="float64"); m = x.mean(1)
fr, p = welch(m, sr, nperseg=8192); tot = p[fr < 11025].sum()
b = lambda a, c: round(float(10*np.log10(p[(fr >= a) & (fr < c)].sum()/tot)), 1)
print(sys.argv[2], {"<200": b(0,200), "200-2k": b(200,2000), "2-5k": b(2000,5000), "5-10k": b(5000,11025)})

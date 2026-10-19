"""python contact.py <dir> <cols> <thumbW> [out]  -> tiles f_<t>.jpg in time order with time labels"""
import sys, os, re
from PIL import Image, ImageDraw
d, cols, tw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
out = sys.argv[4] if len(sys.argv) > 4 else os.path.join(d, 'sheet.jpg')
fs = sorted([f for f in os.listdir(d) if re.match(r'f_[\d_]+\.jpg$', f)], key=lambda f: float(f[2:-4].replace('_', '.')))
th = int(tw * 9 / 16); rows = (len(fs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * th), (20, 20, 30)); dr = ImageDraw.Draw(sheet)
for i, f in enumerate(fs):
    im = Image.open(os.path.join(d, f)).resize((tw, th), Image.LANCZOS); x, y = (i % cols) * tw, (i // cols) * th
    sheet.paste(im, (x, y)); dr.rectangle([x, y, x + 74, y + 24], fill=(0, 0, 0)); dr.text((x + 6, y + 5), f[2:-4].replace('_', '.') + 's', fill=(255, 255, 0))
sheet.save(out, quality=82); print(out, len(fs), 'frames')

"""Cut out and align the two character poses (reference renders on black) into public/character/.
Alignment: pupils of both eyes -> similarity transform (uniform scale + rotation + shift), no stretching.
Usage: python3 tools/build-poses.py A.webp B.webp  (needs numpy, scipy, pillow)"""
import sys, json, math, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

A_PATH, B_PATH = sys.argv[1], sys.argv[2]
# Pupil centres (x, y) measured on the source images: left eye, right eye.
PUPILS = {'A': [(631.2, 335.1), (767.3, 262.1)], 'B': [(690.1, 337.8), (814.6, 258.5)]}

def cutout(path, key):
    a = np.asarray(Image.open(path).convert('RGB')).astype(int); H, W = a.shape[:2]
    (x1, y1), (x2, y2) = PUPILS[key]; mx_, my_ = (x1 + x2) / 2, (y1 + y2) / 2
    mx = a.max(2); dark = mx < 26
    lab, k = ndi.label(dark); idx = range(1, k + 1)
    sizes = ndi.sum(dark, lab, idx); coms = ndi.center_of_mass(dark, lab, idx)
    keep = np.zeros(k + 1, bool)
    for i, (s, (cy, cx)) in enumerate(zip(sizes, coms), 1):
        m = lab == i
        if (m[0].any() or m[-1].any() or m[:, 0].any() or m[:, -1].any()) and s > 5000: keep[i] = True; continue
        if s < 120: continue
        if mx_ - 250 < cx < mx_ + 170 and my_ - 150 < cy < my_ + 330: continue  # keep eyelashes, ear, mouth detail
        if cy > H * 0.86: continue  # dark shorts
        keep[i] = True
    kill = keep[lab]; near = ndi.binary_dilation(kill, iterations=5)
    alpha = np.where(kill, 0.0, np.where(near, np.clip((mx - 26) / 45.0, 0, 1), 1.0))
    alpha = ndi.gaussian_filter(alpha, 0.6)
    return Image.fromarray(np.dstack([a.astype(np.uint8), (alpha * 255).astype(np.uint8)]), 'RGBA')

A, B = cutout(A_PATH, 'A'), cutout(B_PATH, 'B')
CW, CH, ox, oy = 2300, 2000, 500, 300
(a1, a2), (b1, b2) = PUPILS['A'], PUPILS['B']
mA = ((a1[0] + a2[0]) / 2 + ox, (a1[1] + a2[1]) / 2 + oy); mB = ((b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2)
s = math.hypot(a2[0] - a1[0], a2[1] - a1[1]) / math.hypot(b2[0] - b1[0], b2[1] - b1[1])
th = math.atan2(a2[1] - a1[1], a2[0] - a1[0]) - math.atan2(b2[1] - b1[1], b2[0] - b1[0])
c, sn = math.cos(-th), math.sin(-th)
m = (c / s, -sn / s, 0, sn / s, c / s, 0)
cx = mB[0] - (m[0] * mA[0] + m[1] * mA[1]); cy = mB[1] - (m[3] * mA[0] + m[4] * mA[1])
cA = Image.new('RGBA', (CW, CH), (0, 0, 0, 0)); cA.paste(A, (ox, oy))
cB = B.transform((CW, CH), Image.AFFINE, (m[0], m[1], cx, m[3], m[4], cy), resample=Image.BICUBIC)
box = Image.alpha_composite(cA, cB).getbbox(); pad = 10
box = (box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad)
fa, fb = cA.crop(box), cB.crop(box)
sc = 1100 / fa.size[1]; size = (round(fa.size[0] * sc), 1100)

def finish(im):
    im = im.resize(size, Image.LANCZOS); arr = np.asarray(im).copy()
    H = size[1]
    # Soft bottom edge (both poses end on the same line, above pose B's rotated lower edge).
    y0, y1 = int(H * 0.86), int(H * 0.945)
    ramp = np.clip((y1 - np.arange(H)) / (y1 - y0), 0, 1)
    arr[:, :, 3] = (arr[:, :, 3] * ramp[:, None]).astype(np.uint8)
    # Bleed colour outward into transparent pixels so texture filtering cannot pull in dark fringes.
    solid = arr[:, :, 3] > 200
    idx = ndi.distance_transform_edt(~solid, return_distances=False, return_indices=True)
    fill = arr[idx[0], idx[1], :3]
    arr[:, :, :3] = np.where(solid[..., None], arr[:, :, :3], fill)
    return Image.fromarray(arr, 'RGBA')

os.makedirs('public/character', exist_ok=True)
fa, fb = finish(fa), finish(fb)
fa.save('public/character/pose-a.webp', quality=86, method=6); fb.save('public/character/pose-b.webp', quality=86, method=6)
eye = ((mA[0] - box[0]) * sc, (mA[1] - box[1]) * sc)
print(json.dumps({'width': size[0], 'height': size[1], 'eyeMid': eye}))

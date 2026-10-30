"""Builds the social promo (1080x1920): phone mockup + background around a screen recording."""
import subprocess, sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
W, H = 1080, 1920
SW, SH = 680, 1184            # screen size on canvas
BZ = 18                       # bezel
PW, PH = SW + 2 * BZ, SH + 2 * BZ
PX, PY = (W - PW) // 2, 400
SR, PR = 74, 92               # screen / body corner radius
S = 3                         # supersampling

# --- background: near-black with purple/blue glows (site palette)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
def glow(cx, cy, r, col, a):
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / r
    g = np.clip(1 - d, 0, 1) ** 2 * a
    return g[..., None] * np.array(col, np.float32)
bg = np.full((H, W, 3), (12, 12, 14), np.float32)
bg += glow(180, 380, 900, (150, 50, 255), 0.55)
bg += glow(950, 1500, 950, (60, 90, 255), 0.5)
bg += glow(540, 1000, 600, (120, 40, 200), 0.18)
bgim = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8))

# --- phone shadow
sh = Image.new("L", (W, H), 0)
ImageDraw.Draw(sh).rounded_rectangle((PX, PY + 30, PX + PW, PY + PH + 30), PR, fill=200)
sh = sh.filter(ImageFilter.GaussianBlur(50))
bgim = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), bgim, sh.point(lambda v: int(v * .8)))

# --- text
d = ImageDraw.Draw(bgim)
def font(sz, w="Bold"): return ImageFont.truetype(f"/usr/share/fonts/opentype/inter/InterDisplay-{w}.otf", sz)
def centered(y, t, f, fill, sp=0):
    if sp:
        wd = sum(d.textlength(c, font=f) + sp for c in t) - sp
        x = (W - wd) / 2
        for c in t:
            d.text((x, y), c, font=f, fill=fill); x += d.textlength(c, font=f) + sp
    else:
        d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=fill)
centered(150, "PORTFOLIO WEBSITE", font(26, "SemiBold"), (190, 170, 255), 8)
centered(205, "Anastasiia", font(104, "Black"), (255, 255, 255))
centered(335, "WEB & UI/UX DESIGNER", font(24, "Medium"), (160, 160, 175), 6)
centered(PY + PH + 80, "Case studies  ·  Concepts  ·  Responsive design", font(28, "Medium"), (200, 200, 215))
bgim.save("bg.png")

# --- phone frame with transparent screen hole (supersampled)
def rr(size, box, r, fill, base=None):
    im = base or Image.new("RGBA", (size[0] * S, size[1] * S), (0, 0, 0, 0))
    ImageDraw.Draw(im).rounded_rectangle([v * S for v in box], r * S, fill=fill)
    return im
fw, fh = W, H
f = Image.new("RGBA", (fw * S, fh * S), (0, 0, 0, 0))
# side buttons
dr = ImageDraw.Draw(f)
for y0, y1, left in ((PY + 210, PY + 270, True), (PY + 300, PY + 400, True), (PY + 430, PY + 530, True), (PY + 340, PY + 500, False)):
    x0 = PX - 5 if left else PX + PW
    dr.rounded_rectangle([x0 * S, y0 * S, (x0 + 5) * S, y1 * S], 2 * S, fill=(70, 70, 82, 255))
# titanium rim (gradient via two rects) + black bezel
rr((fw, fh), (PX - 3, PY - 3, PX + PW + 3, PY + PH + 3), PR + 3, (120, 120, 135, 255), f)
rr((fw, fh), (PX, PY, PX + PW, PY + PH), PR, (14, 14, 18, 255), f)
# cut the screen hole
hole = Image.new("L", f.size, 255)
ImageDraw.Draw(hole).rounded_rectangle([(PX + BZ) * S, (PY + BZ) * S, (PX + BZ + SW) * S, (PY + BZ + SH) * S], SR * S, fill=0)
a = f.getchannel("A"); a = Image.composite(a, Image.new("L", f.size, 0), hole); f.putalpha(a)
# dynamic island
ImageDraw.Draw(f).rounded_rectangle([(W // 2 - 62) * S, (PY + BZ + 22) * S, (W // 2 + 62) * S, (PY + BZ + 22 + 36) * S], 18 * S, fill=(0, 0, 0, 255))
f.resize((fw, fh), Image.LANCZOS).save("frame.png")
print("ok")

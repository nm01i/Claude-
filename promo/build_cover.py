"""Cover image (1080x1920): hero frame of the recording inside the phone mockup."""
from PIL import Image, ImageDraw
S = 3
bg = Image.open("bg.png").convert("RGB")
frame = Image.open("frame.png")
src = Image.open("hero.png").convert("RGB").crop((0, 180, 1206, 2170))
page = Image.new("RGB", (1206, 2100), (12, 12, 12))  # black strip under the Dynamic Island
page.paste(src, (0, 110))
shot = page.resize((680, 1184), Image.LANCZOS)
m = Image.new("L", (680 * S, 1184 * S), 0)
ImageDraw.Draw(m).rounded_rectangle([0, 0, 680 * S - 1, 1184 * S - 1], 74 * S, fill=255)
bg.paste(shot, (200, 418), m.resize((680, 1184), Image.LANCZOS))
bg.paste(frame, (0, 0), frame)
bg.save("cover.png")

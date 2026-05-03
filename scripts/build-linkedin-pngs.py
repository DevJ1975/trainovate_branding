#!/usr/bin/env python3
"""
Render LinkedIn-ready PNG variants of the Trainovate.ai mark with
the wordmark below.

Geometry of the mark matches public/brand/trainovate-mark-*.svg:
  viewBox 100x100, two ellipses rx=40 ry=17 at ±30°, stroke=6,
  nucleus circle r=8.

Wordmark: "Trainovate.ai" — Inter Tight Bold for "Trainovate",
Inter Tight Medium at 50% opacity for ".ai".

Stroked rotated ellipses are drawn as an annulus mask (outer
filled minus inner filled), then rotated and alpha-composited
onto the canvas. This avoids the bristly edges that PIL's
draw.line(width=) produces on tight curves.

Outputs:
  public/downloads/trainovate-logo-linkedin-cobalt-1200.png
  public/downloads/trainovate-logo-linkedin-white-1200.png
  public/downloads/trainovate-logo-linkedin-ink-1200.png
"""

from pathlib import Path
import tempfile
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "public" / "downloads"
FONTS_SRC = ROOT / "public" / "fonts"
DL.mkdir(parents=True, exist_ok=True)

# Brand palette
INK    = (10, 10, 10)
BONE   = (244, 241, 234)
COBALT = (0, 70, 230)
FLARE  = (255, 107, 26)
WHITE  = (255, 255, 255)


def woff2_to_ttf(woff2_path: Path) -> Path:
    """Convert a WOFF2 font to a TTF in /tmp so PIL can load it."""
    out = Path(tempfile.gettempdir()) / (woff2_path.stem + ".ttf")
    if not out.exists() or out.stat().st_mtime < woff2_path.stat().st_mtime:
        f = TTFont(str(woff2_path))
        f.flavor = None
        f.save(str(out))
    return out


FONT_BOLD   = woff2_to_ttf(FONTS_SRC / "InterTight-700.woff2")
FONT_MEDIUM = woff2_to_ttf(FONTS_SRC / "InterTight-500.woff2")


def annulus_layer(W, cx, cy, rx, ry, stroke, color, angle_deg):
    """Transparent RGBA layer holding one rotated stroked ellipse,
    drawn as an annulus (outer filled minus inner filled)."""
    rx_o = rx + stroke / 2
    ry_o = ry + stroke / 2
    rx_i = rx - stroke / 2
    ry_i = ry - stroke / 2

    mask = Image.new("L", (W, W), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse([cx - rx_o, cy - ry_o, cx + rx_o, cy + ry_o], fill=255)
    md.ellipse([cx - rx_i, cy - ry_i, cx + rx_i, cy + ry_i], fill=0)

    r = Image.new("L", (W, W), color[0])
    g = Image.new("L", (W, W), color[1])
    b = Image.new("L", (W, W), color[2])
    layer = Image.merge("RGBA", (r, g, b, mask))

    return layer.rotate(angle_deg, resample=Image.BICUBIC, center=(cx, cy))


def _text_size(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1], bbox[0], bbox[1]


def render(
    bg,
    orbit_color,
    nucleus_color,
    out_path: Path,
    text_color,
    suffix_alpha: int = 128,            # 50% opacity for ".ai"
    size: int = 1200,
    mark_fraction: float = 0.46,        # mark sized to leave room for wordmark
    oversample: int = 4,
):
    W = size * oversample
    img = Image.new("RGBA", (W, W), bg + (255,))

    # Mark sits in the upper-middle of the canvas
    cx = W // 2
    cy = int(W * 0.42)
    R = int(W * mark_fraction / 2)
    unit = (2 * R) / 100
    rx_px = 40 * unit
    ry_px = 17 * unit
    stroke_px = 6 * unit
    nucleus_r = int(round(8 * unit))

    for deg in (30, -30):
        layer = annulus_layer(W, cx, cy, rx_px, ry_px, stroke_px, orbit_color, deg)
        img.alpha_composite(layer)

    draw = ImageDraw.Draw(img)
    draw.ellipse(
        [cx - nucleus_r, cy - nucleus_r, cx + nucleus_r, cy + nucleus_r],
        fill=nucleus_color + (255,),
    )

    # ── Wordmark "Trainovate.ai" ────────────────────────────────
    main_size = int(W * 0.085)
    suffix_size = int(W * 0.085)
    font_main = ImageFont.truetype(str(FONT_BOLD), main_size)
    font_suffix = ImageFont.truetype(str(FONT_MEDIUM), suffix_size)

    main_w, main_h, _, main_top = _text_size(draw, "Trainovate", font_main)
    suffix_w, suffix_h, _, suffix_top = _text_size(draw, ".ai", font_suffix)

    total_w = main_w + suffix_w
    text_y = int(W * 0.78)
    main_x = (W - total_w) // 2
    suffix_x = main_x + main_w

    draw.text(
        (main_x, text_y),
        "Trainovate",
        font=font_main,
        fill=text_color + (255,),
    )
    draw.text(
        (suffix_x, text_y),
        ".ai",
        font=font_suffix,
        fill=text_color + (suffix_alpha,),
    )

    img = img.resize((size, size), Image.LANCZOS).convert("RGB")
    img.save(out_path, "PNG", optimize=True)
    print(f"wrote {out_path.relative_to(ROOT)}  ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    # On cobalt: bone orbits, flare nucleus, bone wordmark
    render(
        bg=COBALT,
        orbit_color=BONE,
        nucleus_color=FLARE,
        text_color=BONE,
        out_path=DL / "trainovate-logo-linkedin-cobalt-1200.png",
    )
    # On white: ink orbits, cobalt nucleus, ink wordmark
    render(
        bg=WHITE,
        orbit_color=INK,
        nucleus_color=COBALT,
        text_color=INK,
        out_path=DL / "trainovate-logo-linkedin-white-1200.png",
    )
    # On ink (black): bone orbits, cobalt nucleus, bone wordmark
    render(
        bg=INK,
        orbit_color=BONE,
        nucleus_color=COBALT,
        text_color=BONE,
        out_path=DL / "trainovate-logo-linkedin-ink-1200.png",
    )

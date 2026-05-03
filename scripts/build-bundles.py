#!/usr/bin/env python3
"""
Bundle the screensaver + Zoom background HTML payloads as ZIP files
suitable for distribution.

Why ZIPs and not .dmg / .scr / .saver?
  - .dmg requires macOS (`hdiutil`) and Apple Developer ID signing +
    notarization to install without Gatekeeper warnings.
  - .scr requires either a signed PE wrapper (e.g. compiled via NSIS
    on Windows) or it triggers SmartScreen.
  - .saver bundles need a compiled Cocoa target.

Building any of those from a Linux container without a signing identity
produces a binary that users will be told to throw away, so we ship the
canonical HTML payload + step-by-step installer instructions for the
two well-maintained FOSS host apps:

  Mac:     WebViewScreenSaver  (https://github.com/liquidx/webviewscreensaver)
  Windows: Plash               (https://sindresorhus.com/plash)
           or HTML5 Screensaver Maker (https://www.screensaver-maker.com)

This script writes:
  public/downloads/trainovate-screensaver.zip
  public/downloads/trainovate-zoom-background.zip
"""

import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "public" / "downloads"
DL.mkdir(parents=True, exist_ok=True)

ATOM = (DL / "atom.html").read_text(encoding="utf-8")

SCREENSAVER_README = """\
# Trainovate Screensaver

A single self-contained HTML file that displays the animated Trainovate
nucleus. Works on macOS, Windows, and Linux through any FOSS HTML
screensaver host. Drop it in, point the host at it, done.

## What's in this archive

- `screensaver.html`  — the screensaver payload. Open it in a browser
                        to preview. The mark drifts slowly across the
                        screen so it can't burn into a panel.
- `INSTALL-mac.md`    — install steps for macOS via WebViewScreenSaver
- `INSTALL-windows.md`— install steps for Windows via Plash
- `LICENSE`           — internal Trainovate brand asset

## Why HTML and not a .saver / .scr installer?

A real .saver bundle on macOS has to be signed with an Apple Developer
ID and notarized, otherwise Gatekeeper will refuse to load it. Same on
Windows — an unsigned .scr triggers SmartScreen. Shipping unsigned
binaries trains users to click past warnings, which is the opposite
of what a brand should do.

Both host apps below are open source, signed by their authors, and let
you point at any URL or local HTML file. Five-step install on each.
"""

INSTALL_MAC = """\
# Install on macOS

We ship the screensaver as HTML and load it through
**WebViewScreenSaver**, an open-source signed `.saver` host.

## 1. Install WebViewScreenSaver

Visit the project's releases page and download the latest signed
`.saver`:

  https://github.com/liquidx/webviewscreensaver/releases

Double-click `WebViewScreenSaver.saver`. macOS will prompt you to
install it for "this user only" — accept that.

## 2. Put the screensaver HTML somewhere stable

Move `screensaver.html` (in this archive) to a path that won't move:

  ~/Library/Application Support/Trainovate/screensaver.html

```bash
mkdir -p ~/Library/Application\\ Support/Trainovate
cp screensaver.html ~/Library/Application\\ Support/Trainovate/
```

## 3. Point WebViewScreenSaver at it

System Settings → Screen Saver → choose **WebViewScreenSaver** →
**Screen Saver Options…**

In the "URL" field, paste:

  file:///Users/YOURNAME/Library/Application%20Support/Trainovate/screensaver.html

(Replace `YOURNAME` with your macOS short name.)

Set "Refresh every" to **0** so the page never reloads.

## 4. Test

Click **Test** in the screen saver settings. You should see the
nucleus drifting slowly across a dark background.

## 5. (Optional) Multi-display

WebViewScreenSaver mirrors the same URL to every display. The
screensaver is responsive and centers the mark on whichever screen
it lands on.

## Uninstall

Right-click `WebViewScreenSaver` in System Settings → Screen Saver
and choose **Remove**. Delete the
`~/Library/Application Support/Trainovate/` folder.
"""

INSTALL_WIN = """\
# Install on Windows

Windows doesn't ship a built-in HTML screensaver host. We recommend
**Plash** (open-source, signed) for full-screen rendering of HTML on
idle, paired with Windows' built-in Screen Timeout to control when it
appears. For a true `.scr` integration, see Option B.

---

## Option A — Plash (recommended)

### 1. Install Plash

Get it from the Microsoft Store or from the project page:

  https://sindresorhus.com/plash

### 2. Put the screensaver HTML somewhere stable

Move `screensaver.html` to:

  C:\\Users\\YOURNAME\\AppData\\Local\\Trainovate\\screensaver.html

### 3. Point Plash at it

Open Plash → **Open URL…** → paste:

  file:///C:/Users/YOURNAME/AppData/Local/Trainovate/screensaver.html

### 4. Trigger on idle

Plash → Preferences → enable **Show on idle** (set to 5 minutes).

---

## Option B — Native .scr via InstantStorm

If you need a real `.scr` for a managed Windows fleet, wrap the HTML
with **InstantStorm** (free, Adobe AIR-based):

  https://www.instantstorm.com

1. Open InstantStorm → **New Project** → choose a project folder
2. Add `screensaver.html` as the source
3. Output → set name to `Trainovate.scr`
4. Build → produces `Trainovate.scr`
5. Right-click the `.scr` → **Install**, or place it in
   `C:\\Windows\\System32\\` and select it via Settings →
   Personalization → Lock screen → Screen saver settings.

InstantStorm's output is unsigned. For a fleet roll-out you'll want
to sign it with your organization's code-signing certificate before
distribution.
"""

LICENSE = """\
Trainovate Brand Asset · Internal Use

This screensaver and the embedded mark are Trainovate brand assets.
Distribute only within the organization. Do not modify the geometry
of the mark. Color may be re-themed via the brand palette only
(ink / bone / cobalt).

Questions: brand@trainovate.com
"""

ZOOM_README = """\
# Trainovate Animated Zoom Background

A self-contained HTML file that loops the animated Trainovate
nucleus on a 1920×1080 canvas. Zoom accepts MP4 / MOV files for
animated backgrounds — convert this HTML to MP4 once, then upload
to Zoom.

## What's in this archive

- `zoom-background.html` — the animated background (open in browser to preview)
- `RECORD-to-mp4.md`     — one-time recording instructions
- `LICENSE`              — internal Trainovate brand asset

## Quick path

1. Open `zoom-background.html` in Chrome.
2. Press **F11** to enter full-screen at 1920×1080.
3. Record the screen for 10 seconds:
   - macOS: QuickTime → File → New Screen Recording
   - Windows: Xbox Game Bar (Win+G) → Capture
4. Upload the resulting `.mp4` to Zoom:
   - Zoom → Settings → Background & Effects → "+" → Add Video
"""

RECORD_GUIDE = """\
# Recording the Animated Zoom Background

Zoom's animated backgrounds accept `.mp4` and `.mov`. The HTML in
this archive is the canonical animation; record it once and reuse
the resulting clip everywhere.

## Recommended specs

  Resolution:  1920 × 1080
  Frame rate:  30 fps (60 fps if your mac is current)
  Duration:    10–15 seconds (Zoom loops automatically)
  Codec:       H.264 (default for QuickTime + Game Bar)

## macOS — QuickTime

1. Open `zoom-background.html` in Safari or Chrome.
2. Press the green ● to enter full-screen.
3. Open **QuickTime Player** → File → **New Screen Recording**.
4. Choose "Record Selected Portion" → drag a 1920×1080 box around
   the screen, OR pick "Record Entire Screen" if your display is
   exactly 1920×1080.
5. Record for ~12 seconds. Stop. Save as `trainovate-zoom-bg.mov`.
6. (Optional) Re-encode to MP4:

   ```bash
   ffmpeg -i trainovate-zoom-bg.mov -c:v libx264 -pix_fmt yuv420p \\
          -crf 18 -preset slow trainovate-zoom-bg.mp4
   ```

## Windows — Xbox Game Bar

1. Open `zoom-background.html` in Edge or Chrome at full-screen.
2. Press **Win + G** to open Xbox Game Bar.
3. Capture widget → click the ● record button.
4. Wait ~12 seconds → stop.
5. The clip lives in `Videos\\Captures\\` as an `.mp4`.

## Upload to Zoom

Zoom desktop client → ⚙ Settings → **Background & Effects** →
**Virtual Backgrounds** → **+** → **Add Video** → select your `.mp4`.

The clip will loop seamlessly because the nucleus animation has no
start/end frame — every electron is mid-orbit at every instant.
"""


def write_screensaver_zip() -> None:
    out = DL / "trainovate-screensaver.zip"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        # The screensaver-mode payload turns drift on and hides the meta strip.
        ss_html = ATOM.replace(
            'document.body.dataset.bg = bg;',
            'document.body.dataset.bg = bg;\n    document.body.dataset.drift = "1";\n    document.body.style.cursor = "none";\n    var __m = document.querySelector("[data-meta]"); if (__m) __m.style.display = "none";'
        )
        z.writestr("screensaver.html", ss_html)
        z.writestr("INSTALL-mac.md", INSTALL_MAC)
        z.writestr("INSTALL-windows.md", INSTALL_WIN)
        z.writestr("README.md", SCREENSAVER_README)
        z.writestr("LICENSE", LICENSE)
    print(f"wrote {out}  ({out.stat().st_size:,} bytes)")


def write_zoom_zip() -> None:
    out = DL / "trainovate-zoom-background.zip"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        # Zoom-mode: ink background, no drift, no meta line, no cursor.
        zoom_html = ATOM.replace(
            'var bg = p.get("bg") || "ink";',
            'var bg = p.get("bg") || "ink";\n    document.body.style.cursor = "none";\n    var __m = document.querySelector("[data-meta]"); if (__m) __m.style.display = "none";'
        )
        z.writestr("zoom-background.html", zoom_html)
        z.writestr("RECORD-to-mp4.md", RECORD_GUIDE)
        z.writestr("README.md", ZOOM_README)
        z.writestr("LICENSE", LICENSE)
    print(f"wrote {out}  ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    write_screensaver_zip()
    write_zoom_zip()

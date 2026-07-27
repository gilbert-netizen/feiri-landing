#!/usr/bin/env python3
"""
FEIRI landing page — image optimisation.

The assets directory was 81 MB. Two separate problems:

  1. blue-5.jpg was a 6000x4000 camera original (11.0 MB) shipped to browsers
     that display it a few hundred pixels wide.
  2. Every lookbook plate was saved as PNG. PNG is lossless and the wrong
     container for photography — 1080x1350 photos were landing at 2-3 MB each
     where JPEG q82 renders them indistinguishably at ~150-250 KB.

This script downsizes to sane delivery dimensions and re-encodes as progressive
JPEG. Lookbook PNGs change extension, so it rewrites the 12 references in
pdp-lookbook.jsx to match.

Originals are committed in git history (and backed up before the first run), so
this is reversible with `git checkout -- feiri-pdp/assets`.

    python3 optimize-images.py            # apply
    python3 optimize-images.py --dry-run  # report only
"""

import sys
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "feiri-pdp" / "assets"
LOOKBOOK_JSX = ROOT / "feiri-pdp" / "pdp-lookbook.jsx"

DRY_RUN = "--dry-run" in sys.argv

QUALITY = 82
# The lookbook renders three-up on desktop (~600 CSS px each) and one-up on
# mobile. 1080px wide covers a 2x display at every breakpoint the CSS defines.
LOOKBOOK_MAX = 1080
# Hero and full-bleed imagery can go edge to edge on a large display.
HERO_MAX = 2000
# Everything else is gallery / card sized.
DEFAULT_MAX = 1600
OWNERS_MAX = 900

HERO_FILES = {"hero-couch-blue.jpg", "hero-blue.jpg", "hero-black.jpg", "blue-5.jpg", "guarantee-couple.jpg"}

# .lb-frame paints #000 behind each plate, so flattening semi-transparent edge
# pixels onto black matches what a visitor already sees.
MATTE = (0, 0, 0)


def human(n: int) -> str:
    return f"{n/1048576:.2f} MB" if n >= 1048576 else f"{n/1024:.0f} KB"


def target_width(path: Path) -> int:
    if path.parent.name == "lookbook":
        return LOOKBOOK_MAX
    if path.parent.name == "owners":
        return OWNERS_MAX
    if path.name in HERO_FILES:
        return HERO_MAX
    return DEFAULT_MAX


def encode(path: Path) -> tuple[int, int, Path]:
    """Re-encode one image. Returns (before, after, new_path)."""
    before = path.stat().st_size
    im = Image.open(path)
    im.load()

    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        flat = Image.new("RGB", im.size, MATTE)
        flat.paste(im, mask=im.split()[-1])
        im = flat
    elif im.mode != "RGB":
        im = im.convert("RGB")

    max_w = target_width(path)
    if im.width > max_w:
        h = round(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)

    out = path.with_suffix(".jpg")

    if DRY_RUN:
        import io
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        return before, buf.tell(), out

    im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    if out != path:
        path.unlink()
    return before, out.stat().st_size, out


def main() -> None:
    targets = sorted(
        p for p in ASSETS.rglob("*")
        if p.suffix.lower() in {".jpg", ".jpeg", ".png"} and p.is_file()
    )
    if not targets:
        print("No images found — is the assets path right?")
        sys.exit(1)

    print(f"\nOptimising {len(targets)} images{' (dry run)' if DRY_RUN else ''}\n")
    total_before = total_after = 0
    renames: dict[str, str] = {}

    for p in targets:
        try:
            before, after, out = encode(p)
        except Exception as exc:  # noqa: BLE001 — report and keep going
            print(f"  !! {p.relative_to(ASSETS)}: {exc}")
            continue

        total_before += before
        total_after += after
        if out.name != p.name:
            renames[p.name] = out.name

        if before >= 400_000 or before / max(after, 1) > 3:
            pct = (1 - after / before) * 100 if before else 0
            print(f"  {str(p.relative_to(ASSETS)):44} {human(before):>9} → {human(after):>9}  −{pct:.0f}%")

    print(f"\n  {'TOTAL':44} {human(total_before):>9} → {human(total_after):>9}  "
          f"−{(1 - total_after/total_before)*100:.1f}%")

    # Lookbook plates are referenced as `A + 'name.png'`; retarget them.
    if renames and not DRY_RUN:
        src = LOOKBOOK_JSX.read_text()
        updated = src
        for old, new in renames.items():
            updated = updated.replace(f"'{old}'", f"'{new}'")
        if updated != src:
            LOOKBOOK_JSX.write_text(updated)
            changed = len(re.findall(r"\.jpg'", updated)) - len(re.findall(r"\.jpg'", src))
            print(f"\n  pdp-lookbook.jsx: retargeted {changed} plate references .png → .jpg")
        else:
            print("\n  pdp-lookbook.jsx: no references needed updating")

    if DRY_RUN:
        print("\n  (dry run — nothing written)")
    print()


if __name__ == "__main__":
    main()

"""Regenerate og-image.png (1200x630) and logob.png from logo.png."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGO_PATH = PUBLIC / "logo.png"
OG_PATH = PUBLIC / "og-image.png"
LOGOB_PATH = PUBLIC / "logob.png"

OG_SIZE = (1200, 630)
OG_BG = (10, 10, 16, 255)  # #0a0a10
LOGOB_BG = (0, 0, 0, 255)  # #000000
LOGO_SIZE = (500, 500)
# Logo height as a fraction of the OG canvas (was ~43%; bump to ~82%).
OG_LOGO_HEIGHT_RATIO = 0.82


def load_logo() -> Image.Image:
    return Image.open(LOGO_PATH).convert("RGBA")


def make_logob(logo: Image.Image) -> Image.Image:
    canvas = Image.new("RGBA", LOGO_SIZE, LOGOB_BG)
    canvas.alpha_composite(logo, (0, 0))
    return canvas.convert("RGB")


def make_og_image(logo: Image.Image) -> Image.Image:
    canvas = Image.new("RGBA", OG_SIZE, OG_BG)
    target_h = int(OG_SIZE[1] * OG_LOGO_HEIGHT_RATIO)
    scale = target_h / logo.height
    target_w = int(logo.width * scale)
    resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    x = (OG_SIZE[0] - target_w) // 2
    y = (OG_SIZE[1] - target_h) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas.convert("RGB")


def main() -> None:
    logo = load_logo()
    logob = make_logob(logo)
    og = make_og_image(logo)
    logob.save(LOGOB_PATH, format="PNG", optimize=True)
    og.save(OG_PATH, format="PNG", optimize=True)
    print(f"Wrote {LOGOB_PATH} ({LOGOB_PATH.stat().st_size} bytes)")
    print(f"Wrote {OG_PATH} ({OG_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()

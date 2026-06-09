import json
import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = Path(r"c:\Users\User\Downloads\kombucha_benefici_article_ with images.docx")
BLOCKS_JSON = ROOT / "scripts" / "docx-blocks.json"
SLUG = "kombucha-benefici"
OUT_MDX = ROOT / "content" / "posts" / f"{SLUG}.mdx"
OUT_IMG_DIR = ROOT / "public" / "blog" / SLUG

FRONTMATTER = """---
title: "Kombucha benefici: cosa dice davvero la scienza"
excerpt: >-
  Guida rigorosa ai benefici dimostrati della kombucha: microbioma, glicemia,
  antiossidanti, antimicrobici e miti da sfatare — con gli studi clinici al 2025–2026.
category: Benefici della Kombucha
draft: false
subtitle: Cosa dice davvero la scienza
readingTime: Circa 20–25 min di lettura
level: Intermedio → Avanzato
---

"""


def is_main_section(text: str) -> bool:
    return bool(re.match(r"^\d+\.\s", text))


def heading_level(text: str, block_type: str) -> str | None:
    if block_type not in {"h2", "h3"}:
        return None
    if is_main_section(text):
        return "##"
    return "###"


def should_skip_paragraph(text: str) -> bool:
    if text.startswith("Categoria:"):
        return True
    if text.startswith("© 2026 Mondo Kombucha"):
        return True
    return False


def extract_images_in_order() -> list[str]:
    blocks = json.loads(BLOCKS_JSON.read_text(encoding="utf-8"))
    targets = [b["target"] for b in blocks if b["type"] == "image"]

    OUT_IMG_DIR.mkdir(parents=True, exist_ok=True)
    saved = []

    with zipfile.ZipFile(DOCX) as archive:
        for index, target in enumerate(targets, start=1):
            source = f"word/{target}"
            ext = Path(target).suffix or ".png"
            dest_name = f"{index:02d}{ext}"
            dest_path = OUT_IMG_DIR / dest_name
            with archive.open(source) as src, dest_path.open("wb") as dst:
                shutil.copyfileobj(src, dst)
            saved.append(dest_name)

    return saved


def build_mdx(image_names: list[str]) -> str:
    blocks = json.loads(BLOCKS_JSON.read_text(encoding="utf-8"))
    lines = [FRONTMATTER.rstrip(), ""]
    image_index = 0

    for block in blocks:
        block_type = block["type"]

        if block_type == "h1":
            continue

        if block_type == "image":
            image_index += 1
            name = image_names[image_index - 1]
            lines.extend(
                [
                    "",
                    f"![Illustrazione](/blog/{SLUG}/{name})",
                    "",
                ]
            )
            continue

        if block_type in {"h2", "h3"}:
            level = heading_level(block["text"], block_type)
            if level:
                lines.extend(["", f"{level} {block['text']}", ""])
            continue

        text = block.get("text", "")
        if not text or should_skip_paragraph(text):
            continue

        lines.extend(["", text, ""])

    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip() + "\n"


def main():
    image_names = extract_images_in_order()
    mdx = build_mdx(image_names)
    OUT_MDX.write_text(mdx, encoding="utf-8")
    print(f"Wrote {OUT_MDX}")
    print(f"Images: {len(image_names)} -> {OUT_IMG_DIR}")


if __name__ == "__main__":
    main()

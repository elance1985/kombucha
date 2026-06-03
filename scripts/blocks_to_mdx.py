"""Convert extracted blocks.json to MDX body with headings."""
import json
import re
import shutil
import sys
from pathlib import Path

NUMBERED_H2 = re.compile(r"^\d+\.\s+")
SKIP_PREFIXES = (
    "© 2026 Mondo Kombucha",
    "Kombucha: cos'è davvero?La guida",
    "Categoria: Cos'è la Kombucha",
)


def is_subsection_heading(text: str, next_text: str | None) -> bool:
    if NUMBERED_H2.match(text):
        return False
    if text.startswith("©") or text.startswith("Prossimi articoli"):
        return False
    if len(text) > 110:
        return False
    if text.endswith(".") and len(text) > 60:
        return False
    if next_text and len(next_text) < 80:
        return False
    if ":" in text and len(text) < 100:
        return True
    if len(text) < 65 and not text.endswith("."):
        return True
    return False


def is_list_item(text: str) -> bool:
    if text.startswith("Kombucha ") and ("+" in text or "plain" in text):
        return True
    if text.startswith("I benefici della") or text.startswith("Come fare la"):
        return True
    if text.startswith("Cos'è lo SCOBY") or text.startswith("Kombucha verde"):
        return True
    if text.startswith("I migliori kit"):
        return True
    return False


def escape_md(text: str) -> str:
    return text.replace("\\", "\\\\")


def blocks_to_mdx(blocks: list[dict]) -> str:
    lines: list[str] = []
    i = 0
    in_recommended = False

    while i < len(blocks):
        block = blocks[i]
        i += 1

        if block["type"] == "image":
            fname = block["file"]
            lines.append("")
            lines.append(
                f'![Illustrazione](/blog/kombucha-cose-davvero/{fname})'
            )
            lines.append("")
            continue

        text = block["text"].strip()
        if any(text.startswith(p) for p in SKIP_PREFIXES):
            continue

        next_text = None
        if i < len(blocks) and blocks[i]["type"] == "text":
            next_text = blocks[i]["text"].strip()

        if text == "Prossimi articoli consigliati:":
            in_recommended = True
            lines.append("")
            lines.append("## Prossimi articoli consigliati")
            lines.append("")
            continue

        if in_recommended:
            if text.startswith("©"):
                continue
            if is_list_item(text):
                lines.append(f"- {escape_md(text)}")
                continue
            in_recommended = False

        if text.startswith("Conclusione:"):
            lines.append("")
            lines.append(f"## {escape_md(text)}")
            lines.append("")
            continue

        if NUMBERED_H2.match(text):
            lines.append("")
            lines.append(f"## {escape_md(text)}")
            lines.append("")
            continue

        if is_subsection_heading(text, next_text):
            lines.append("")
            lines.append(f"### {escape_md(text)}")
            lines.append("")
            continue

        lines.append("")
        lines.append(escape_md(text))
        lines.append("")

    return "\n".join(lines).strip() + "\n"


def main() -> None:
    extract_dir = Path(sys.argv[1])
    public_img = Path(sys.argv[2])
    blocks = json.loads((extract_dir / "blocks.json").read_text(encoding="utf-8"))

    public_img.mkdir(parents=True, exist_ok=True)
    for img in (extract_dir / "images").glob("*"):
        shutil.copy2(img, public_img / img.name)

    body = blocks_to_mdx(blocks)
    out = extract_dir / "body.mdx"
    out.write_text(body, encoding="utf-8")
    print(f"Wrote {out} ({len(body)} chars), images -> {public_img}")


if __name__ == "__main__":
    main()

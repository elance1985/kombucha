"""Extract paragraphs and inline images in document order from a .docx."""
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W_NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
    "pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
}


def load_relationships(z: zipfile.ZipFile) -> dict[str, str]:
    rels_path = "word/_rels/document.xml.rels"
    rels: dict[str, str] = {}
    root = ET.fromstring(z.read(rels_path))
    for rel in root:
        rid = rel.attrib.get("Id")
        target = rel.attrib.get("Target")
        if rid and target:
            rels[rid] = target
    return rels


def text_from_element(el: ET.Element) -> str:
    parts: list[str] = []
    if el.tag.endswith("}t"):
        if el.text:
            parts.append(el.text)
        if el.tail:
            parts.append(el.tail)
    else:
        if el.text:
            parts.append(el.text)
        for child in el:
            parts.append(text_from_element(child))
            if child.tail:
                parts.append(child.tail)
    return "".join(parts)


def image_targets_in_paragraph(p: ET.Element, rels: dict[str, str]) -> list[str]:
    targets: list[str] = []
    for blip in p.iter("{http://schemas.openxmlformats.org/drawingml/2006/main}blip"):
        embed = blip.attrib.get(
            "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed"
        )
        if embed and embed in rels:
            target = rels[embed]
            if not target.startswith("word/"):
                target = f"word/{target.lstrip('/')}"
            targets.append(target)
    return targets


def extract(docx_path: Path, out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    images_dir = out_dir / "images"
    images_dir.mkdir(exist_ok=True)

    blocks: list[dict] = []
    image_index = 0

    with zipfile.ZipFile(docx_path) as z:
        rels = load_relationships(z)
        doc = ET.fromstring(z.read("word/document.xml"))
        body = doc.find("w:body", W_NS)
        if body is None:
            raise SystemExit("No document body found")

        for child in body:
            tag = child.tag.split("}")[-1]
            if tag == "sectPr":
                continue
            if tag != "p":
                continue

            text = text_from_element(child).strip()
            text = re.sub(r"\s+", " ", text)
            img_targets = image_targets_in_paragraph(child, rels)

            for target in img_targets:
                image_index += 1
                ext = Path(target).suffix or ".png"
                filename = f"{image_index:02d}{ext}"
                dest = images_dir / filename
                data = z.read(target)
                dest.write_bytes(data)
                blocks.append({"type": "image", "file": filename, "zip_path": target})

            if text:
                blocks.append({"type": "text", "text": text})

    md_path = out_dir / "extracted.md"
    lines: list[str] = []
    for b in blocks:
        if b["type"] == "text":
            lines.append(b["text"])
            lines.append("")
        else:
            lines.append(f"![image](/blog/kombucha-cose-davvero/{b['file']})")
            lines.append("")

    md_path.write_text("\n".join(lines), encoding="utf-8")

    meta_path = out_dir / "blocks.json"
    import json

    meta_path.write_text(json.dumps(blocks, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(blocks)} blocks to {out_dir}")
    print(f"Images: {image_index}")


if __name__ == "__main__":
    docx = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("tmp/docx-extract")
    extract(docx, out)

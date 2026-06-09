import json
import re
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
}


def para_style(paragraph):
    p_pr = paragraph.find("w:pPr", NS)
    if p_pr is None:
        return None
    p_style = p_pr.find("w:pStyle", NS)
    if p_style is None:
        return None
    return p_style.get(f"{{{NS['w']}}}val")


def para_text(paragraph):
    texts = []
    for node in paragraph.findall(".//w:t", NS):
        if node.text:
            texts.append(node.text)
        if node.tail:
            texts.append(node.tail)
    return "".join(texts).strip()


def image_rid(paragraph):
    for blip in paragraph.findall(".//a:blip", NS):
        return blip.get(f"{{{NS['r']}}}embed")
    return None


def is_bold_run(paragraph):
    runs = paragraph.findall(".//w:r", NS)
    if not runs:
        return False
    meaningful = []
    for run in runs:
        text = "".join(t.text or "" for t in run.findall("w:t", NS)).strip()
        if not text:
            continue
        r_pr = run.find("w:rPr", NS)
        bold = r_pr is not None and r_pr.find("w:b", NS) is not None
        meaningful.append(bold)
    return meaningful and all(meaningful)


def parse_docx(path: str):
    blocks = []
    with zipfile.ZipFile(path) as archive:
        rels = ET.fromstring(archive.read("word/_rels/document.xml.rels"))
        rid_to_target = {
            rel.get("Id"): rel.get("Target") for rel in rels
        }

        doc = ET.fromstring(archive.read("word/document.xml"))
        body = doc.find("w:body", NS)

        for child in body:
            tag = child.tag.split("}")[-1]
            if tag != "p":
                continue

            style = para_style(child)
            text = para_text(child)
            rid = image_rid(child)

            if rid:
                target = rid_to_target.get(rid, "")
                blocks.append({"type": "image", "target": target})

            if not text:
                continue

            block_type = "paragraph"
            if style and re.search(r"(Heading|Titolo|Titulo|heading)", style, re.I):
                level = 2
                if re.search(r"[12]", style):
                    level = int(re.search(r"([12])", style).group(1))
                block_type = f"h{level}"
            elif is_bold_run(child) and len(text) < 120 and not text.endswith("."):
                block_type = "h3"

            blocks.append({"type": block_type, "text": text})

    return blocks


if __name__ == "__main__":
    path = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else None
    blocks = parse_docx(path)
    payload = json.dumps(blocks, ensure_ascii=False, indent=2)
    if out:
        Path(out).write_text(payload, encoding="utf-8")
    else:
        sys.stdout.buffer.write(payload.encode("utf-8"))

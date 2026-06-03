from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
body = (ROOT / "tmp/docx-extract/body.mdx").read_text(encoding="utf-8")
frontmatter = """---
title: "Kombucha: cos'è davvero"
excerpt: >-
  La guida scientifica e completa: storia, SCOBY, chimica, benefici,
  controindicazioni e come berla — senza miti né marketing.
category: Cos'è la Kombucha
draft: false
---

*La guida scientifica e completa · Tempo di lettura: circa 18–22 minuti · Livello: Principiante → Intermedio*

"""
out = ROOT / "content/posts/kombucha-cose-davvero.mdx"
out.write_text(frontmatter + body, encoding="utf-8")
print(f"Wrote {out}")

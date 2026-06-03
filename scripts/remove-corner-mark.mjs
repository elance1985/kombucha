/**
 * Remove Gemini sparkle: replace bottom-right patch with cloned table wood.
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { rename } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagePath = path.join(
  __dirname,
  "../public/blog/kombucha-cose-davvero/07.png"
);
const originalPath = path.join(
  __dirname,
  "../tmp/docx-extract/images/07.png"
);

const input = originalPath;
const { width, height } = await sharp(input).metadata();

const patchW = 54;
const patchH = 54;
const destLeft = width - patchW;
const destTop = height - patchH;

// Dark wood strip (avg lum ~20), same vertical band
const sourceLeft = 820;
const sourceTop = destTop;

const patch = await sharp(input)
  .extract({ left: sourceLeft, top: sourceTop, width: patchW, height: patchH })
  .png()
  .toBuffer();

const tmpPath = imagePath.replace(/\.png$/, ".tmp.png");
await sharp(input).composite([{ input: patch, left: destLeft, top: destTop }]).png().toFile(tmpPath);
await rename(tmpPath, imagePath);

const { data, info } = await sharp(imagePath)
  .extract({ left: 978, top: 510, width: 28, height: 28 })
  .raw()
  .toBuffer({ resolveWithObject: true });
let max = 0;
for (let i = 0; i < data.length; i += 3) {
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  if (lum > max) max = lum;
}
console.log(`Done. Sparkle bbox max lum: ${max.toFixed(1)} (target <35)`);

import sharp from "sharp";
import { existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assetsDir =
  process.env.ASSETS_DIR ||
  join(
    root,
    "..",
    "..",
    ".cursor",
    "projects",
    "c-Users-User-Dropbox-side-projects-kombucha",
    "assets"
  );

const sources = [
  { glob: "PRIMARY_LOCKUP_LOGO", out: "logo.png" },
  { glob: "STANDALONE_LOGO", out: "logo-icon.png" },
  { glob: "SECONDARY_LOCKUP_LOGO", out: "logo-vertical.png" },
];

function findAssetSync(glob) {
  if (!existsSync(assetsDir)) return null;
  const file = readdirSync(assetsDir).find((f) => f.includes(glob));
  return file ? join(assetsDir, file) : null;
}

/** Remove fake transparency grid and near-white JPEG backdrop */
function isBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const lightness = (r + g + b) / 3;

  if (lightness >= 252) return true;
  if (spread <= 18 && lightness >= 165) return true;

  return false;
}

function removeBackgroundBuffer(data) {
  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    if (isBackground(pixels[i], pixels[i + 1], pixels[i + 2])) {
      pixels[i + 3] = 0;
    }
  }
  return pixels;
}

function getOpaqueBounds(pixels, width, height, padding = 2) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = pixels[(y * width + x) * 4 + 3];
      if (a > 24) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX) return null;

  return {
    left: Math.max(0, minX - padding),
    top: Math.max(0, minY - padding),
    width: Math.min(width, maxX - minX + 1 + padding * 2),
    height: Math.min(height, maxY - minY + 1 + padding * 2),
  };
}

async function processLogo(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = removeBackgroundBuffer(data);
  const bounds = getOpaqueBounds(cleaned, info.width, info.height);

  if (!bounds) {
    throw new Error(`No opaque pixels found in ${inputPath}`);
  }

  await sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(bounds)
    .png()
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`✓ ${outputPath} → ${meta.width}x${meta.height}`);
}

async function main() {
  for (const { glob, out } of sources) {
    const input = findAssetSync(glob);
    if (!input) {
      console.warn(`Skip ${out}: no file matching ${glob}`);
      continue;
    }
    await processLogo(input, join(root, "public", out));
  }

  await sharp(join(root, "public", "logo-icon.png"))
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(root, "app", "icon.png"));
  console.log("✓ app/icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

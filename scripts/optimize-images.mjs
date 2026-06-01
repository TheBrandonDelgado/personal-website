// Optimize source images into web-ready WebP derivatives.
//
// The high-res files in src/assets/ are the source-of-truth MASTERS. They are
// intentionally NOT imported anywhere, so Vite never bundles them — only the
// generated .webp files (committed next to them) ship to the browser.
//
// Re-run after changing a master:  bun run optimize:images
//
// Targets are sized ~2x their on-screen display size (retina headroom):
//   - Avatar renders at 208px  -> 512px square
//   - Portfolio cards render at ~528px wide -> 1200px wide (aspect preserved)
import sharp from "sharp";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const assets = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets");

/** @type {{in: string, out: string, width: number, quality: number}[]} */
const JOBS = [
  { in: "Avatar.jpg",    out: "Avatar.webp",    width: 512,  quality: 80 }, // photo
  { in: "Sazmining.png", out: "Sazmining.webp", width: 1200, quality: 82 }, // UI screenshot
  { in: "jan3.png",      out: "jan3.webp",      width: 1200, quality: 82 }, // UI screenshot
];

const kb = (bytes) => (bytes / 1024).toFixed(1) + " KB";

let beforeTotal = 0;
let afterTotal = 0;

for (const job of JOBS) {
  const src = join(assets, job.in);
  const dest = join(assets, job.out);
  const before = statSync(src).size;

  await sharp(src)
    // withoutEnlargement: never upscale a master that's already small enough.
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(dest);

  const after = statSync(dest).size;
  beforeTotal += before;
  afterTotal += after;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(`${job.in} (${kb(before)}) -> ${job.out} (${kb(after)})  −${pct}%`);
}

console.log(
  `\nTotal: ${kb(beforeTotal)} -> ${kb(afterTotal)}  ` +
    `(−${((1 - afterTotal / beforeTotal) * 100).toFixed(1)}%, saved ${kb(beforeTotal - afterTotal)})`,
);

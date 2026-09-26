// Generate committed favicon, manifest, and social images from the avatar master.
//
// Run after replacing src/assets/Avatar.jpg:
//   bun scripts/generate-icons.mjs
//
// Outputs are written to public/ and committed. The site build does not
// regenerate them, so deploys do not depend on system fonts.
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const master = join(root, "src", "assets", "Avatar.jpg");
const publicDir = join(root, "public");

const BG = "#0a0a0a";
const GOLD = "#fbbf24";
const TEXT = "#d1d5db";
const MUTED = "#9ca3af";

/**
 * @param {number} size
 */
async function squareAvatar(size) {
  return sharp(master)
    .resize(size, size, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

/**
 * @param {number} size
 */
async function squarePng(size) {
  return sharp(master)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 })
    .toBuffer();
}

/**
 * ICO container embedding PNG frames (supported by current browsers).
 * @param {{ width: number, buffer: Buffer }[]} images
 */
function packIco(images) {
  const count = images.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const placed = images.map((image) => {
    const entry = { ...image, offset };
    offset += image.buffer.length;
    return entry;
  });
  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);
  placed.forEach((image, index) => {
    const at = 6 + index * 16;
    out.writeUInt8(image.width >= 256 ? 0 : image.width, at);
    out.writeUInt8(image.width >= 256 ? 0 : image.width, at + 1);
    out.writeUInt16LE(1, at + 4);
    out.writeUInt16LE(32, at + 6);
    out.writeUInt32LE(image.buffer.length, at + 8);
    out.writeUInt32LE(image.offset, at + 12);
    image.buffer.copy(out, image.offset);
  });
  return out;
}

const pngSizes = [
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];

for (const [name, size] of pngSizes) {
  writeFileSync(join(publicDir, name), await squarePng(size));
  console.log(`${name} ${size}x${size}`);
}

const icoFrames = [];
for (const size of [16, 32, 48]) {
  icoFrames.push({ width: size, buffer: await squarePng(size) });
}
writeFileSync(join(publicDir, "favicon.ico"), packIco(icoFrames));
console.log(`favicon.ico ${icoFrames.map((frame) => frame.width).join("/")}`);

writeFileSync(join(publicDir, "avatar.jpg"), await squareAvatar(800));
console.log("avatar.jpg 800x800");

const avatarSize = 360;
const avatarPng = await sharp(master)
  .resize(avatarSize, avatarSize, { fit: "cover", position: "centre" })
  .png()
  .toBuffer();
const circle = Buffer.from(
  `<svg width="${avatarSize}" height="${avatarSize}" xmlns="http://www.w3.org/2000/svg"><circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#fff"/></svg>`,
);
const rounded = await sharp(avatarPng)
  .composite([{ input: circle, blend: "dest-in" }])
  .png()
  .toBuffer();

const ring = Buffer.from(
  `<svg width="${avatarSize + 16}" height="${avatarSize + 16}" xmlns="http://www.w3.org/2000/svg"><circle cx="${(avatarSize + 16) / 2}" cy="${(avatarSize + 16) / 2}" r="${avatarSize / 2 + 4}" fill="none" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="3"/></svg>`,
);

const card = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BG}"/>
  <defs>
    <radialGradient id="glow" cx="22%" cy="50%" r="45%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="560" y="275" font-family="Inter, sans-serif" font-size="60" font-weight="700" fill="${GOLD}">Brandon Delgado</text>
  <text x="560" y="340" font-family="Inter, sans-serif" font-size="28" font-weight="500" fill="${TEXT}">Senior Full Stack Software Engineer</text>
  <text x="560" y="400" font-family="Inter, sans-serif" font-size="22" font-weight="400" fill="${MUTED}">TypeScript · React · Node · Postgres · Supabase</text>
</svg>`);

const og = await sharp(card)
  .composite([
    { input: rounded, left: 92, top: 135 },
    { input: ring, left: 84, top: 127 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

writeFileSync(join(publicDir, "og.jpg"), og);
const meta = await sharp(og).metadata();
console.log(`og.jpg ${meta.width}x${meta.height} ${og.length} bytes`);

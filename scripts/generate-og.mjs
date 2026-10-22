/**
 * Generates `public/og.png` — the 1200x630 social share card.
 *
 * The card is drawn from the site's own visual language (dark canvas, teal
 * aurora, hairline grid, mono eyebrow) so a shared link looks like the site
 * rather than a generic banner.
 *
 * Usage: npm run generate:og
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");

const W = 1200;
const H = 630;
const SIZE = 340;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#060911"/>
      <stop offset="100%" stop-color="#080d18"/>
    </linearGradient>
    <radialGradient id="a1" cx="18%" cy="26%" r="55%">
      <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a2" cx="82%" cy="16%" r="48%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a3" cx="58%" cy="72%" r="52%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#94a3b8" stroke-opacity="0.09" stroke-width="1"/>
    </pattern>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0"/>
      <stop offset="50%" stop-color="#2dd4bf" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#a1)"/>
  <rect width="${W}" height="${H}" fill="url(#a2)"/>
  <rect width="${W}" height="${H}" fill="url(#a3)"/>

  <g transform="translate(88, 96)">
    <rect x="0" y="0" width="46" height="46" rx="11" fill="#2dd4bf" fill-opacity="0.12" stroke="#2dd4bf" stroke-opacity="0.45"/>
    <text x="23" y="31" text-anchor="middle" font-family="Consolas, monospace" font-weight="700" font-size="17" fill="#2dd4bf">MA</text>
    <text x="64" y="29" font-family="Segoe UI, system-ui, sans-serif" font-weight="700" font-size="19" fill="#e8eef8">Mahdi Asefi</text>
  </g>

  <text x="88" y="268" font-family="Segoe UI, system-ui, sans-serif" font-weight="700" font-size="78" letter-spacing="-2" fill="#e8eef8">Mahdi Asefi</text>
  <text x="88" y="330" font-family="Consolas, monospace" font-weight="600" font-size="26" letter-spacing="1" fill="#2dd4bf">AI ENGINEER</text>
  <text x="88" y="382" font-family="Segoe UI, system-ui, sans-serif" font-size="27" fill="#a6b4c9">LLM Systems  ·  Computer Vision  ·  Generative AI</text>

  <rect x="88" y="418" width="1024" height="1" fill="url(#rule)"/>

  <text x="88" y="466" font-family="Segoe UI, system-ui, sans-serif" font-size="23" fill="#7e8fa7">4+ years shipping production AI systems — LLM orchestration,</text>
  <text x="88" y="500" font-family="Segoe UI, system-ui, sans-serif" font-size="23" fill="#7e8fa7">computer vision and generative media. Inspectable code, not just claims.</text>

  <g transform="translate(88, 536)" font-family="Consolas, monospace" font-size="17" fill="#7e8fa7">
    <circle cx="5" cy="-5" r="5" fill="#2dd4bf"/>
    <text x="22" y="0">github.com/mahdiAsefi20</text>
  </g>
</svg>`;

const square = await sharp(path.join(root, "public", "profile.png"))
  .resize(SIZE, SIZE, { fit: "cover", position: "top" })
  .png()
  .toBuffer();

const mask = await sharp({
  create: { width: SIZE, height: SIZE, channels: 4, background: "#000000" },
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="26" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const plate = await sharp(square).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();

const border = Buffer.from(
  `<svg width="${W}" height="${H}"><rect x="${W - 76 - SIZE}" y="145" width="${SIZE}" height="${SIZE}" rx="26" fill="none" stroke="#2dd4bf" stroke-opacity="0.40" stroke-width="2"/></svg>`,
);

const out = path.join(root, "public", "og.png");
await sharp(Buffer.from(svg))
  .composite([
    { input: plate, top: 145, left: W - 76 - SIZE },
    { input: border, top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`wrote ${out} (${fs.statSync(out).size} bytes)`);

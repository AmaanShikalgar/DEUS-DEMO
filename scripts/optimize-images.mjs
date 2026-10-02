/**
 * Shrinks photos in public/images and public/products so the site loads fast.
 *   npm run optimize-images
 * Safe to re-run: files that are already small are skipped. Never upscales, skips
 * transparent images (logos). Big PNG photos are converted to JPG (up to 10x smaller)
 * and any references in src/ are rewritten automatically.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const LIMITS = [
  { dir: 'public/images/SocialGrid', max: 1200 },
  { dir: 'public/images', max: 2400 },
  { dir: 'public/products', max: 1600 },
];
const SKIP_UNDER_BYTES = 400 * 1024;
const kb = (n) => `${Math.round(n / 1024)} KB`;

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}
const maxFor = (file) => {
  const f = file.split(path.sep).join('/');
  return LIMITS.find((l) => f.startsWith(l.dir + '/'))?.max ?? 2400;
};

const renames = [];
let before = 0, after = 0;

for (const root of ['public/images', 'public/products']) {
  for await (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const input = await fs.readFile(file);
    const meta = await sharp(input).metadata();
    if (meta.hasAlpha) { console.log(`skip (transparent)  ${file}`); continue; }

    const max = maxFor(file);
    const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
    if (longEdge <= max && input.length < SKIP_UNDER_BYTES) { console.log(`skip (already small) ${file}`); continue; }

    let img = sharp(input).rotate().resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true });
    let outFile = file, output;
    if (ext === '.webp') output = await img.webp({ quality: 80 }).toBuffer();
    else {
      output = await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      if (ext === '.png') outFile = file.slice(0, -ext.length) + '.jpg';
    }
    if (output.length >= input.length && outFile === file) { console.log(`skip (no gain)      ${file}`); continue; }

    await fs.writeFile(outFile, output);
    if (outFile !== file) { await fs.unlink(file); renames.push([file, outFile]); }
    before += input.length; after += output.length;
    console.log(`${kb(input.length).padStart(9)} -> ${kb(output.length).padStart(7)}  ${outFile}`);
  }
}

// keep code in sync with converted file names
if (renames.length) {
  const files = [];
  for await (const f of walk('src')) if (/\.(tsx?|css)$/.test(f)) files.push(f);
  for (const f of files) {
    let text = await fs.readFile(f, 'utf8'), changed = false;
    for (const [from, to] of renames) {
      const a = from.replace(/^public/, '').split(path.sep).join('/');
      const b = to.replace(/^public/, '').split(path.sep).join('/');
      if (text.includes(a)) { text = text.split(a).join(b); changed = true; }
    }
    if (changed) { await fs.writeFile(f, text); console.log(`updated references in ${f}`); }
  }
}
console.log(`\nDone. ${kb(before)} -> ${kb(after)} (${before ? Math.round((1 - after / before) * 100) : 0}% smaller)`);

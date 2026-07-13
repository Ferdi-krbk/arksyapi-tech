// Run: node scripts/optimize-images.js
// Requires GraphicsMagick or ImageMagick installed

import { execSync } from "node:child_process";
import { readdirSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, extname, basename } from "node:path";

const ASSETS_DIR = join(import.meta.dirname, "..", "src", "assets");
const OUTPUT_DIR = join(import.meta.dirname, "..", "public", "assets");
const BREAKPOINTS = [640, 1024, 1600];
const QUALITY = 80;

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

function gmAvailable() {
  try {
    execSync("gm version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function convertImage(input: string, output: string, width: number, format: "webp" | "jpg") {
  const args = format === "webp"
    ? `convert "${input}" -resize ${width}x -quality ${QUALITY} "${output}"`
    : `convert "${input}" -resize ${width}x -quality ${QUALITY} "${output}"`;
  execSync(args, { stdio: "ignore" });
}

function optimize() {
  if (!gmAvailable()) {
    console.log("[image-optimizer] GraphicsMagick bulunamadi, atlaniyor.");
    return;
  }

  const files = readdirSync(ASSETS_DIR).filter((f) =>
    /\.(png|jpe?g)$/i.test(f) && !f.includes("-light") && !f.includes("-dark") && !f.includes("emblem"),
  );

  for (const file of files) {
    const input = join(ASSETS_DIR, file);
    const ext = extname(file);
    const name = basename(file, ext);
    const sizeMB = statSync(input).size / (1024 * 1024);

    if (sizeMB < 0.05) continue;

    console.log(`[image-optimizer] ${file} (${sizeMB.toFixed(1)}MB) → optimize ediliyor...`);

    for (const w of BREAKPOINTS) {
      const webpOut = join(OUTPUT_DIR, `${name}-${w}w.webp`);
      const jpgOut = join(OUTPUT_DIR, `${name}-${w}w.jpg`);
      if (!existsSync(webpOut)) convertImage(input, webpOut, w, "webp");
      if (!existsSync(jpgOut)) convertImage(input, jpgOut, w, "jpg");
    }

    console.log(`[image-optimizer] ${file} → tamam.`);
  }
}

optimize();

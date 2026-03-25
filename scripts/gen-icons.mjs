#!/usr/bin/env node
/**
 * Generate icon-192.png and icon-512.png from icon.svg
 * Run: node scripts/gen-icons.mjs
 * Requires: rsvg-convert (librsvg) or sharp (npm)
 */
import { execSync } from "child_process";
import { existsSync } from "fs";

const sizes = [192, 512];
const svgPath = "public/icon.svg";

if (!existsSync(svgPath)) {
  console.error("Missing", svgPath);
  process.exit(1);
}

// Try rsvg-convert first
try {
  execSync("which rsvg-convert", { stdio: "ignore" });
  for (const size of sizes) {
    execSync(`rsvg-convert -w ${size} -h ${size} ${svgPath} -o public/icon-${size}.png`);
    console.log(`Generated icon-${size}.png`);
  }
  process.exit(0);
} catch { /* not available */ }

// Try convert (ImageMagick)
try {
  execSync("which convert", { stdio: "ignore" });
  for (const size of sizes) {
    execSync(`convert -background none -resize ${size}x${size} ${svgPath} public/icon-${size}.png`);
    console.log(`Generated icon-${size}.png`);
  }
  process.exit(0);
} catch { /* not available */ }

console.error("No SVG converter found. Install librsvg2-bin or imagemagick:");
console.error("  sudo apt install librsvg2-bin");
console.error("Then re-run: node scripts/gen-icons.mjs");
process.exit(1);

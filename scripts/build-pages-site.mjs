#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".pages");

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const files = ["index.html", "manifest.json", "sw.js", "icon-192.png", "icon-512.png"];
for (const file of files) {
  const source = path.join(root, file);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing required file for GitHub Pages export: ${file}`);
  }
  fs.copyFileSync(source, path.join(outDir, file));
}

const touchPath = path.join(outDir, ".nojekyll");
fs.writeFileSync(touchPath, "");

console.log(`Prepared GitHub Pages artifact in ${outDir}`);

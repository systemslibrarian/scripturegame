import fs from 'fs';

// Parse BASE_VERSES from verses-local.ts
const src = fs.readFileSync('src/lib/verses-local.ts', 'utf8');
const baseMatch = src.match(/const BASE_VERSES:\s*Verse\[\]\s*=\s*(\[[\s\S]*?\n\];)/);
let baseVerses = [];
if (baseMatch) {
  baseVerses = eval(baseMatch[1]);
}

// Parse ADDITIONAL_VERSES from verses-additional.ts
const addSrc = fs.readFileSync('src/lib/verses-additional.ts', 'utf8');
const addMatch = addSrc.match(/export const ADDITIONAL_VERSES.*?=\s*(\[[\s\S]*\]);/);
let addVerses = [];
if (addMatch) {
  addVerses = eval(addMatch[1]);
}

const verses = [...baseVerses, ...addVerses];

// Parse kids verses
const kidsSrc = fs.readFileSync('src/lib/kids-verses.ts', 'utf8');
const kidsMatch = kidsSrc.match(/export const KIDS_VERSES.*?=\s*(\[[\s\S]*?\]);/);
const kidsVerses = kidsMatch ? eval(kidsMatch[1]) : [];

// Group adult verses by theme
const themes = {};
for (const v of verses) {
  const label = v.themeLabel || v.themeId || 'Unknown';
  if (!(label in themes)) themes[label] = [];
  themes[label].push(v.reference);
}

const sortedThemes = Object.keys(themes).sort();
for (const t of sortedThemes) {
  themes[t] = [...new Set(themes[t])].sort();
}

// Group kids by theme
const kidsThemes = {};
for (const v of kidsVerses) {
  const label = v.themeLabel || v.themeId || 'Unknown';
  if (!(label in kidsThemes)) kidsThemes[label] = [];
  kidsThemes[label].push(v.reference);
}
const sortedKidsThemes = Object.keys(kidsThemes).sort();
for (const t of sortedKidsThemes) {
  kidsThemes[t] = [...new Set(kidsThemes[t])].sort();
}

// Count books
const bookSet = new Set();
for (const v of verses) {
  const m = v.reference.match(/^(\d?\s?[A-Za-z]+)/);
  if (m) bookSet.add(m[1].trim());
}

// Count unique adult verse references (deduplicated across topics)
const adultUniqueCount = Object.values(themes).reduce((sum, refs) => sum + refs.length, 0);
const kidsUniqueCount = Object.values(kidsThemes).reduce((sum, refs) => sum + refs.length, 0);

let md = `# Hide in Heart — Verse Catalog

> Updated 2026-04-01 from \`src/lib/verses-local.ts\`, \`src/lib/verses-additional.ts\` (adults) and \`src/lib/kids-verses.ts\` (kids).

## Current App Totals

| Audience | Verse count |
|---|---:|
| Adults | ${adultUniqueCount} |
| Kids | ${kidsUniqueCount} |
| **Total** | **${adultUniqueCount + kidsUniqueCount}** |

---

## Adults: Verses by Topic (${adultUniqueCount})

`;

for (const t of sortedThemes) {
  md += `### ${t} (${themes[t].length})\n\n`;
  for (const r of themes[t]) {
    md += `- ${r}\n`;
  }
  md += '\n';
}

md += `---

## Kids: Verses by Topic (${kidsUniqueCount})

`;

for (const t of sortedKidsThemes) {
  md += `### ${t} (${kidsThemes[t].length})\n\n`;
  for (const r of kidsThemes[t]) {
    md += `- ${r}\n`;
  }
  md += '\n';
}

md += `---

## Book Coverage (Adults — ${adultUniqueCount} verses across ${bookSet.size} books)
`;

fs.writeFileSync('docs/verses-catalog.md', md);
console.log(`Catalog written. Adults: ${adultUniqueCount}, Kids: ${kidsUniqueCount}, Topics: ${sortedThemes.length}, Books: ${bookSet.size}`);

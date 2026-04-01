import fs from 'fs';

const src1 = fs.readFileSync('src/lib/verses-local.ts', 'utf8');
const src2 = fs.readFileSync('src/lib/verses-additional.ts', 'utf8');
const combined = src1 + src2;

// Extract references per theme
const refs = {};
const verseBlocks = combined.split(/\n  \{/);
for (const block of verseBlocks) {
  const refMatch = block.match(/reference:\s*"([^"]+)"/);
  const themeMatch = block.match(/themeId:\s*"([^"]+)"/);
  if (refMatch && themeMatch) {
    const t = themeMatch[1];
    if (!refs[t]) refs[t] = [];
    refs[t].push(refMatch[1]);
  }
}

const catalog = fs.readFileSync('docs/verses-catalog.md', 'utf8');
let issues = [];

// Check every source verse appears in catalog
for (const [theme, verseRefs] of Object.entries(refs)) {
  for (const ref of verseRefs) {
    if (!catalog.includes(ref)) {
      issues.push(`MISSING from catalog: ${ref} (theme: ${theme})`);
    }
  }
}

// Check catalog verse counts match source
const themeCounts = {};
for (const [theme, verseRefs] of Object.entries(refs)) {
  themeCounts[theme] = verseRefs.length;
}

// Parse catalog counts
const catalogSections = catalog.matchAll(/### (.+?) \((\d+)\)/g);
for (const m of catalogSections) {
  const label = m[1];
  const catalogCount = parseInt(m[2]);
  // Find matching theme
  const actualRefs = [];
  for (const [theme, vRefs] of Object.entries(refs)) {
    // catalog lines within this section
  }
}

const totalSource = Object.values(themeCounts).reduce((a, b) => a + b, 0);
console.log('Source themes:', Object.keys(refs).length);
console.log('Source total adult verses:', totalSource);
console.log('Themes:', Object.entries(themeCounts).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => `${k}(${v})`).join(', '));

if (issues.length) {
  console.log('\nISSUES:');
  issues.forEach(i => console.log(' ', i));
} else {
  console.log('\nAll source verses found in catalog. ✓');
}

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
if (verses.length === 0) {
  // Fallback: try old-style single export
  const oldMatch = src.match(/export const LOCAL_VERSES.*?=\s*(\[[\s\S]*\]);/);
  if (oldMatch) verses.push(...eval(oldMatch[1]));
}

let errors = 0;
for (const v of verses) {
  if (v.parts.length !== v.answers.length + 1) {
    console.log('NIV MISMATCH:', v.id, v.reference, 'parts=' + v.parts.length, 'answers=' + v.answers.length);
    errors++;
  }
  if (v.kjv) {
    if (v.kjv.parts.length !== v.kjv.answers.length + 1) {
      console.log('KJV MISMATCH:', v.id, v.reference, 'kjv.parts=' + v.kjv.parts.length, 'kjv.answers=' + v.kjv.answers.length);
      errors++;
    }
  }
  if (!v.decoys || v.decoys.length === 0) {
    console.log('NO DECOYS:', v.id, v.reference);
    errors++;
  }
  if (v.kjv && (!v.kjv.decoys || v.kjv.decoys.length === 0)) {
    console.log('NO KJV DECOYS:', v.id, v.reference);
    errors++;
  }
}

// Also validate kids verses
const kidsSrc = fs.readFileSync('src/lib/kids-verses.ts', 'utf8');
const kidsMatch = kidsSrc.match(/export const KIDS_VERSES.*?=\s*(\[[\s\S]*?\]);/);
if (kidsMatch) {
  const kidsVerses = eval(kidsMatch[1]);
  for (const v of kidsVerses) {
    if (v.parts.length !== v.answers.length + 1) {
      console.log('KIDS NIV MISMATCH:', v.id, v.reference, 'parts=' + v.parts.length, 'answers=' + v.answers.length);
      errors++;
    }
    if (v.kjv) {
      if (v.kjv.parts.length !== v.kjv.answers.length + 1) {
        console.log('KIDS KJV MISMATCH:', v.id, v.reference, 'kjv.parts=' + v.kjv.parts.length, 'kjv.answers=' + v.kjv.answers.length);
        errors++;
      }
    }
  }
  console.log('Kids verses:', kidsVerses.length);
}

// Check for duplicate IDs
const allIds = verses.map(v => v.id);
const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
if (dupes.length) {
  console.log('DUPLICATE IDS:', dupes);
  errors += dupes.length;
}

console.log('Adult verses:', verses.length);
console.log('Total errors:', errors);

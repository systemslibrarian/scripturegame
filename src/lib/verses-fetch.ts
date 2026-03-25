/**
 * Client-side verse cache.
 * The first call fetches from /api/verses and stores the result in a module-level
 * variable. All subsequent calls (across page navigations in the same session)
 * return the cached data immediately, eliminating the per-page loading delay.
 */

import type { Verse } from "@/types/domain";

let cachedVerses: Verse[] | null = null;
let inFlight: Promise<Verse[]> | null = null;

export async function fetchVerses(): Promise<Verse[]> {
  if (cachedVerses !== null) return cachedVerses;
  if (inFlight !== null) return inFlight;

  inFlight = (async () => {
    const res = await fetch("/api/verses");
    if (!res.ok) throw new Error("fetch /api/verses failed");
    const data = await res.json();
    const verses: Verse[] = Array.isArray(data) ? data : (data.verses ?? []);
    cachedVerses = verses;
    inFlight = null;
    return verses;
  })();

  return inFlight;
}

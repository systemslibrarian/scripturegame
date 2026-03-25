# Product Suggestions — Hide in Heart

> Generated from a retention/engagement audit on 2026-03-25.

---

## What's Already Built (underutilized)

| Feature | Status |
|---------|--------|
| Streaks table in DB | Tracked but never celebrated in UI |
| Spaced repetition | Tracked in localStorage (`sg_spaced_rep`), nothing surfaces it |
| Daily verse system | Deterministic hash picks a verse per theme per day |
| PWA manifest | Installable today, but no service worker or push notifications |
| Same-day return detection | `sg_lastJourneyDate` exists but not used as a re-engagement hook |
| Reflections | Saved but never shown as a "remember what you wrote" prompt |

---

## Priority Stack

### Tier 1 — High ROI, Low Effort (do now)

| What | Why it matters |
|------|----------------|
| **Show streak prominently on home screen** | DB already tracks it. One API call + a number on the home page is what makes Duolingo sticky. |
| **Streak milestone toast** (7, 30, 100 days) | Already have the streak value — just needs a celebration moment in UI |
| **"Today's verse" as the home CTA** | Replace theme selection with one big button: *Continue today's verse* or *Start today →* — uses existing daily hash logic |
| **Fix the practice modes** (Gentle / Steady / Deep) | Core mechanic must work correctly. If it feels broken, nothing else matters. |

### Tier 2 — Medium Effort, Addresses Drift (do soon)

| What | Why it matters |
|------|----------------|
| **PWA service worker + push notification opt-in** | One daily reminder at a chosen time. Single biggest re-engagement driver for any habit app. Manifest already configured. |
| **Habit calendar** (GitHub-style grid) | Visual proof of consistency. Users hate breaking chains. Schema already has the data. |
| **"You were here yesterday" return CTA** | When `sg_lastJourneyDate` = yesterday, show: *You're on a streak — don't break it.* |
| **Share a verse** (copy / Web Share API) | "I memorized Philippians 4:6 today" — organic discovery. No backend needed. |

### Tier 3 — Larger Lift (later)

| What | Why it matters |
|------|----------------|
| **Email digest** (weekly, opt-in) | "You practiced 4 days this week" — Supabase can trigger this |
| **Verse unlocks / themed sets** | Reason to explore beyond already-memorized verses |
| **Friend leaderboards** | Right now the global leaderboard has no personal stakes |
| **App Store via PWA wrapper** (Capacitor / TWA) | Gets it into the store; solves discoverability if SEO can't |

---

## The Messaging Problem

The homepage says **"No scores. No timers."** but the app has a leaderboard, points system, and best-session tracking. That contradiction will confuse new users. Pick a lane:

- **Lean into the calm / devotional angle** — remove the leaderboard or make it opt-in; use streaks + reflection history as the "progress" story
- **Lean into the game** — gamify harder; add XP levels and daily challenges

The current middle ground serves neither audience well.

---

## Discoverability (honest take)

SEO alone won't move the needle fast. The fastest paths:

1. **Push to Christian communities** — Facebook groups, church newsletters, Reddit r/Christianity, X/Twitter #biblememory
2. **Get it in the App Store** — PWA wrapper via Trusted Web Activity is free and fast
3. **"Share your streak" card** — user-generated sharing on Instagram/X is worth more than any blog post

---

## Critical Gaps Summary

| Gap | Impact |
|-----|--------|
| No push notifications | Users forget to return; no re-engagement mechanism |
| No explicit "today's verse" prompt | Requires active theme selection; not a "show up for today" feature |
| No streak milestones / badges | 7-day, 30-day, 100-day streaks go uncelebrated |
| No habit calendar | No visual grid of completed / missed days |
| No gamification levels | Raw `total_points` only; no progression visual (Level 5, etc.) |
| No social sharing | Cannot share verse or streak with friends |
| No reminder system | No email, SMS, or push notification cadence |
| No friend leaderboards | Global only; no group competition |
| No reward unlocks | No themed verse packs or achievement perks |
| No progress visualization | No charts for attempts/week or accuracy trends |
| No email digest | No "your week in review" or "you missed 2 days" emails |
| No "continue yesterday" CTA | `sg_lastJourneyVerse` exists but not prominently surfaced |

---

## DB Tables Available for Progress Features

| Table | Tracks |
|-------|--------|
| `attempts` | Practice attempt history (points, time, accuracy per attempt) |
| `scores` | Cumulative totals (`total_points`, `best_session`) |
| `streaks` | Current + lifetime streak + `last_played_on` date |
| `reflections` | Written responses tied to verses + emotional tags |
| `verses` | Metadata for daily assignment + difficulty tier |

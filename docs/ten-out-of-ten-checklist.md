# 10/10 Excellence Checklist (31 Items)

This checklist tracks the practical upgrades applied to make Scripture Memory production-grade and mission-ready.

## Product Experience

- [x] 1. Modular Next.js app architecture.
- [x] 2. Dedicated play session route.
- [x] 3. Session score summary UX.
- [x] 4. Profile route for personal progress.
- [x] 5. Leaderboard route for social motivation.
- [x] 6. Admin CMS route for verse maintenance.

## Content and Data

- [x] 7. Verse catalog data model in SQL.
- [x] 8. Seed script for initial catalog.
- [x] 9. API read endpoint for verses.
- [x] 10. API write endpoint for attempts.
- [x] 11. API profile endpoint with score and streak signals.
- [x] 12. API leaderboard endpoint.

## Security and Abuse Resistance

- [x] 13. Server-side score calculation.
- [x] 14. Anti-cheat validation against verse blank counts.
- [x] 15. Correct-count clamping for impossible payloads.
- [x] 16. Attempt endpoint rate limiting.
- [x] 17. Leaderboard endpoint rate limiting.
- [x] 18. Admin endpoint rate limiting.
- [x] 19. Role-based admin authorization via Supabase metadata.
- [x] 20. Authenticated identity enforcement for Supabase attempts.

## Reliability and Operations

- [x] 21. Readiness endpoint at /api/health.
- [x] 22. Preflight environment validation script.
- [x] 23. CI workflow with lint/type/test/build gates.
- [x] 24. Vercel deployment workflow.
- [x] 25. GitHub Pages deployment workflow.
- [x] 26. Build script for Pages artifact generation.

## Quality and Discoverability

- [x] 27. Unit tests for scoring logic.
- [x] 28. Unit tests for anti-cheat validation.
- [x] 29. Sentry instrumentation and global error capture.
- [x] 30. robots.txt metadata route.
- [x] 31. sitemap.xml metadata route.

## Notes

- GitHub Pages deployment publishes the static PWA bundle from root static files.
- Full dynamic API/auth experience remains available in Next runtime deployments.

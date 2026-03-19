#!/usr/bin/env node

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_API_TOKEN",
];

const optional = ["SENTRY_DSN", "SENTRY_AUTH_TOKEN", "SENTRY_ORG", "SENTRY_PROJECT"];

function status(name) {
  return process.env[name] ? "set" : "missing";
}

let missingRequired = 0;

console.log("Preflight environment check\n");
for (const name of required) {
  const s = status(name);
  if (s === "missing") missingRequired += 1;
  console.log(`${name.padEnd(34)} ${s}`);
}

console.log("\nOptional monitoring/deploy vars");
for (const name of optional) {
  console.log(`${name.padEnd(34)} ${status(name)}`);
}

if (missingRequired > 0) {
  console.error(`\nFailed: ${missingRequired} required variable(s) are missing.`);
  process.exit(1);
}

console.log("\nSuccess: required env vars are present.");

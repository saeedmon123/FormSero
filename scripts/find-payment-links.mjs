// Run locally: node scripts/find-payment-links.mjs
// Reads STRIPE_SECRET_KEY from .env.local, lists your Stripe Payment Links,
// and tells you which STRIPE_LIGHT/FULL_PAYMENT_LINK_ID to put in .env.local.
// Your secret key never leaves your machine.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envPath = path.join(root, ".env.local");

function loadEnvLocal() {
  if (!existsSync(envPath)) {
    console.error(`No .env.local found at ${envPath}. Copy .env.example to .env.local first.`);
    process.exit(1);
  }
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("STRIPE_SECRET_KEY is not set in .env.local.");
  process.exit(1);
}

const knownUrls = {
  "https://buy.stripe.com/14AdRb9SS01z1jzaw2cAo00": "light",
  "https://buy.stripe.com/6oU00laWWaGdaU97jQcAo01": "full",
};

const res = await fetch("https://api.stripe.com/v1/payment_links?limit=100", {
  headers: { Authorization: `Bearer ${secretKey}` },
});

if (!res.ok) {
  console.error(`Stripe API error ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const { data } = await res.json();

console.log(`\nFound ${data.length} payment link(s) on this Stripe account:\n`);

let foundLight = null;
let foundFull = null;

for (const link of data) {
  const guess = knownUrls[link.url];
  console.log(`${link.id}  ${link.url}${guess ? `  <-- ${guess}` : ""}`);
  if (guess === "light") foundLight = link.id;
  if (guess === "full") foundFull = link.id;
}

console.log("\nAdd these lines to .env.local:\n");
console.log(`STRIPE_LIGHT_PAYMENT_LINK_ID=${foundLight ?? "<not found — check the list above>"}`);
console.log(`STRIPE_FULL_PAYMENT_LINK_ID=${foundFull ?? "<not found — check the list above>"}`);
console.log("");

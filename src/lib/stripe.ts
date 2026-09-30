import "server-only";
import Stripe from "stripe";

let stripe: Stripe | null = null;

/** Lazily constructed so a missing env var only breaks the webhook route
 *  that actually needs it, not every page that happens to import this file. */
export function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example).");
    }
    stripe = new Stripe(key);
  }
  return stripe;
}

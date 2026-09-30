import "server-only";
import { Resend } from "resend";

let resend: Resend | null = null;

export function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not set. Add it to .env.local (see .env.example).");
    }
    resend = new Resend(key);
  }
  return resend;
}

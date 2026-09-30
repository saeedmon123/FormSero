import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
import { buildPurchaseEmail } from "@/lib/email-templates";

// Needs the Node runtime, not Edge: the Stripe SDK and PDF file reads both
// require Node APIs.
export const runtime = "nodejs";

type EditionId = "light" | "full";

const FILENAME_BY_EDITION: Record<EditionId, string> = {
  light: "Beyond-the-Prompt-Light-Edition.pdf",
  full: "Beyond-the-Prompt-Full-Edition.pdf",
};

function resolveEdition(paymentLinkId: string | null): EditionId | null {
  if (!paymentLinkId) return null;
  if (paymentLinkId === process.env.STRIPE_LIGHT_PAYMENT_LINK_ID) return "light";
  if (paymentLinkId === process.env.STRIPE_FULL_PAYMENT_LINK_ID) return "full";
  return null;
}

// Two fully static readFile calls (rather than building the path from a
// variable) so Next's build-time file tracer can see exactly which files
// this route needs, instead of falling back to tracing — and bundling —
// the entire project.
async function readEditionPdf(edition: EditionId): Promise<Buffer> {
  if (edition === "light") {
    return readFile(path.join(process.cwd(), "private/pdfs/light.pdf"));
  }
  return readFile(path.join(process.cwd(), "private/pdfs/full.pdf"));
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Stripe webhook: missing signature header or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Not configured" }, { status: 400 });
  }

  // Signature verification needs the exact raw request body.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const paymentLinkId =
    typeof session.payment_link === "string" ? session.payment_link : (session.payment_link?.id ?? null);
  const edition = resolveEdition(paymentLinkId);

  if (!edition) {
    console.error("Stripe webhook: could not match payment_link to an edition", {
      paymentLinkId,
      sessionId: session.id,
    });
    // Acknowledge so Stripe doesn't retry forever over a config problem —
    // the fix here is to set STRIPE_LIGHT/FULL_PAYMENT_LINK_ID correctly.
    return NextResponse.json({ received: true });
  }

  const email = session.customer_details?.email;
  if (!email) {
    console.error("Stripe webhook: checkout session has no customer email", session.id);
    return NextResponse.json({ received: true });
  }

  const filename = FILENAME_BY_EDITION[edition];

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await readEditionPdf(edition);
  } catch (err) {
    console.error(`Stripe webhook: could not read PDF for edition "${edition}"`, err);
    // 500 so Stripe retries — this is a real fulfillment failure, not a
    // config mismatch, and the customer is owed their book.
    return NextResponse.json({ error: "PDF unavailable" }, { status: 500 });
  }

  const { subject, html, text } = buildPurchaseEmail(edition);

  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "FORMSERO <onboarding@resend.dev>",
      to: email,
      subject,
      html,
      text,
      attachments: [{ filename, content: pdfBuffer }],
    });
  } catch (err) {
    console.error("Stripe webhook: failed to send purchase email", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

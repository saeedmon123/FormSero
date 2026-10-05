import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export const runtime = "nodejs";

const CONTACT_INBOX = "hello@formsero.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden honeypot field: real visitors never fill it, bots usually do.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please write a message between 10 and 5000 characters." },
      { status: 400 },
    );
  }

  let result: Awaited<ReturnType<ReturnType<typeof getResend>["emails"]["send"]>>;
  try {
    result = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "FORMSERO <onboarding@resend.dev>",
      to: CONTACT_INBOX,
      replyTo: email,
      subject: `Contact form: ${name}`.replace(/[\r\n]+/g, " "),
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (err) {
    console.error("Contact form send threw:", err);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }

  if (result.error) {
    console.error("Contact form send rejected:", result.error);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

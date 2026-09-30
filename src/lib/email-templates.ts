import "server-only";
import { editions } from "@/lib/editions";

type Edition = "light" | "full";

export function buildPurchaseEmail(edition: Edition): {
  subject: string;
  html: string;
  text: string;
} {
  const data = editions.find((e) => e.id === edition)!;
  const subject = `Your copy of Beyond the Prompt (${data.eyebrow}) is attached`;

  const text = [
    `Thanks for picking up Beyond the Prompt — ${data.name}.`,
    "",
    "Your PDF is attached to this email. Everything went through fine — nothing else to do on your end.",
    "",
    "If it doesn't turn up, check spam/promotions first, then just reply to this email and we'll sort it out.",
    "",
    "— FORMSERO",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#0A0A09;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A09;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#171715;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:36px 36px 0 36px;">
                <p style="margin:0;font-family:'Courier New',monospace;font-size:12px;letter-spacing:2px;color:#FF5A1F;text-transform:uppercase;">
                  FORMSERO
                </p>
                <h1 style="margin:16px 0 0 0;font-size:28px;line-height:1.2;color:#F4F0E8;font-weight:800;">
                  You're in. Your book is attached.
                </h1>
                <p style="margin:16px 0 0 0;font-size:15px;line-height:1.6;color:#98948B;">
                  Thanks for picking up <strong style="color:#F4F0E8;">Beyond the Prompt — ${data.name}</strong>.
                  Payment went through fine — the PDF is attached to this email, ready to read.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A09;border-radius:8px;border:1px solid rgba(244,240,232,0.1);">
                  <tr>
                    <td style="padding:20px 24px;">
                      <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1.5px;color:#FF5A1F;text-transform:uppercase;">
                        ${data.eyebrow}
                      </p>
                      <p style="margin:6px 0 0 0;font-size:18px;color:#F4F0E8;font-weight:700;">
                        ${data.name}
                      </p>
                      <p style="margin:8px 0 0 0;font-size:13px;color:#98948B;line-height:1.5;">
                        ${data.tagline}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px 36px;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#98948B;">
                  Don't see the attachment? Check spam or promotions first. Still nothing —
                  just reply to this email and we'll get it to you directly.
                </p>
                <p style="margin:24px 0 0 0;font-size:12px;color:#5c584f;">
                  © ${new Date().getFullYear()} FORMSERO
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

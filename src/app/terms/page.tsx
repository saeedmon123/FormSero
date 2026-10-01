import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | FORMSERO",
  description: "The terms that apply when you purchase Beyond the Prompt from FORMSERO.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms of Service" title="Terms of Service" updated="October 1, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          These terms govern your purchase and use of &ldquo;Beyond the Prompt&rdquo; (the
          &ldquo;Book&rdquo;) sold on formsero.com (&ldquo;FORMSERO,&rdquo; &ldquo;we&rdquo;). By
          completing a purchase, you agree to these terms.
        </p>
      </section>

      <section>
        <h2>The product</h2>
        <p>
          The Book is sold as a digital download (PDF) in two editions, Light and Full, as
          described on our pricing page. No physical product is shipped.
        </p>
      </section>

      <section>
        <h2>License</h2>
        <p>
          When you purchase the Book, we grant you a personal, non-exclusive, non-transferable
          license to use it for your own personal or professional reference. You may not resell,
          redistribute, publish, or share the Book or its contents without our written
          permission.
        </p>
      </section>

      <section>
        <h2>Delivery</h2>
        <p>
          After a successful payment, the Book is delivered by email to the address provided at
          checkout, typically within a few minutes. If you don&rsquo;t receive it, contact us at{" "}
          <a href="mailto:hello@formsero.com">hello@formsero.com</a> and we&rsquo;ll resend it.
        </p>
      </section>

      <section>
        <h2>Payments and sales</h2>
        <p>
          Payments are processed securely by Stripe. Prices are shown in euros and include any
          taxes as displayed at checkout. Because the Book is a digital product delivered
          immediately upon purchase, all sales are final and we do not offer refunds once the
          file has been delivered, except where required by law.
        </p>
      </section>

      <section>
        <h2>Changes to the product or terms</h2>
        <p>
          We may update the content of the Book, these terms, or our pricing at any time. Changes
          will not affect purchases already completed under the terms in place at the time of
          purchase.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email us at{" "}
          <a href="mailto:hello@formsero.com">hello@formsero.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}

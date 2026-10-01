import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | FORMSERO",
  description: "How FORMSERO collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy Policy" title="Privacy Policy" updated="October 1, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          FORMSERO (&ldquo;we,&rdquo; &ldquo;us&rdquo;) sells &ldquo;Beyond the Prompt,&rdquo; a
          digital e-book, through formsero.com. This policy explains what information we collect
          when you buy the book and how it&rsquo;s used. We collect the minimum necessary to
          deliver your purchase and nothing more.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Email address</strong> — collected at checkout so we can send you the e-book
            and order confirmation.
          </li>
          <li>
            <strong>Payment information</strong> — handled entirely by Stripe. We never see or
            store your card details on our own systems.
          </li>
          <li>
            <strong>Basic usage data</strong> — standard, anonymized analytics (e.g. page views)
            from our hosting provider to understand how the site is used.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use your information</h2>
        <p>
          We use your email solely to deliver your purchased e-book and any related purchase
          confirmation or support messages. We do not sell, rent, or share your information with
          advertisers.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>We rely on trusted third parties to run FORMSERO, each bound by their own privacy and security practices:</p>
        <ul>
          <li>
            <strong>Stripe</strong> — payment processing.
          </li>
          <li>
            <strong>Resend</strong> — transactional email delivery (sending your e-book and
            receipt).
          </li>
          <li>
            <strong>Netlify</strong> — website hosting and infrastructure.
          </li>
        </ul>
      </section>

      <section>
        <h2>Data retention</h2>
        <p>
          We retain purchase records (email and order details) only as long as needed to provide
          support, honor our policies, and meet legal or accounting obligations.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can request access to, correction of, or deletion of your personal information at
          any time by contacting us at{" "}
          <a href="mailto:hello@formsero.com">hello@formsero.com</a>.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy? Email us at{" "}
          <a href="mailto:hello@formsero.com">hello@formsero.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/layout/ContactForm";

export const metadata: Metadata = {
  title: "Contact | FORMSERO",
  description: "Get in touch with FORMSERO — questions, support, or feedback.",
};

export default function ContactPage() {
  return (
    <main className="bg-black px-6 pb-28 pt-36 text-ivory md:px-10 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <SectionLabel index="—" label="Contact" />
        <h1 className="mt-6 text-balance font-display text-4xl font-black leading-[1.05] md:text-5xl">
          Get in touch.
        </h1>
        <p className="mt-6 max-w-xl text-ivory/70">
          Questions about the book, a problem with your order, or just feedback — send a message
          below or email us directly at{" "}
          <a
            href="mailto:hello@formsero.com"
            className="text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-ivory"
          >
            hello@formsero.com
          </a>
          .
        </p>

        <div className="mt-14 border-t border-ivory/10 pt-14">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

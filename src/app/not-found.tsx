import type { Metadata } from "next";
import Link from "next/link";
import { primaryCtaHref } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found | FORMSERO",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-28 text-center text-ivory md:px-10">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">404</span>
      <h1 className="mt-6 text-balance font-display text-4xl font-black leading-[1.05] md:text-6xl">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-6 max-w-md text-ivory/70">
        The page you&rsquo;re looking for may have been moved or never existed. Let&rsquo;s get
        you back to somewhere useful.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors hover:bg-ivory"
          data-cursor="interactive"
        >
          Back to Home
        </Link>
        <Link
          href={primaryCtaHref}
          className="inline-flex items-center rounded-full border border-ivory/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ivory transition-colors hover:border-ivory/40"
          data-cursor="interactive"
        >
          Get the Book
        </Link>
      </div>
    </main>
  );
}

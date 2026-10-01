import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, updated, children }: Props) {
  return (
    <main className="bg-black px-6 pb-28 pt-36 text-ivory md:px-10 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <SectionLabel index="—" label={eyebrow} />
        <h1 className="mt-6 text-balance font-display text-4xl font-black leading-[1.05] md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Last updated: {updated}
        </p>

        <div className="mt-14 space-y-10 border-t border-ivory/10 pt-14 text-ivory/80 [&_a]:text-signal [&_a]:underline [&_a]:decoration-signal/40 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:text-ivory [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ivory [&_h2]:md:text-2xl [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </main>
  );
}

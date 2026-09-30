import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function WhoItsFor() {
  return (
    <section className="relative bg-ivory px-6 py-28 text-charcoal md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="08" label="Who It's For" tone="light" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Reveal delay={0.1}>
            <div className="border-t border-charcoal/15 pt-8">
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                Starting with Claude Code?
              </h3>
              <p className="mt-4 max-w-md text-charcoal/70">
                Use the book to avoid months of fragmented experimentation. Start
                with the system, not a pile of disconnected tips.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="border-t border-charcoal/15 pt-8">
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                Already using Claude Code?
              </h3>
              <p className="mt-4 max-w-md text-charcoal/70">
                Turn ordinary AI-assisted development into a structured
                creative workflow — the difference between generic and
                exceptional.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

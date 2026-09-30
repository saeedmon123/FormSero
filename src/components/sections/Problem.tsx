import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <section id="the-problem" className="relative bg-black px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionLabel index="01" label="The Problem" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-balance font-display text-3xl font-bold leading-[1.15] text-ivory sm:text-4xl md:text-5xl">
            Anyone can ask Claude to make a website.
            <span className="block text-muted">That does not mean the result will be exceptional.</span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-lg text-lg text-ivory/70">
            The difference isn&apos;t the model. It&apos;s the system around it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

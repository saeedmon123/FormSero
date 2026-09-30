import { ArrowRight } from "lucide-react";
import { proofProjects } from "@/lib/proof-projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Proof() {
  const [lightProject, fullProject] = proofProjects;

  return (
    <section id="proof" className="relative bg-ivory px-6 py-28 text-charcoal md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="06" label="System to Result" tone="light" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-balance font-display text-4xl font-black leading-[1.05] md:text-6xl">
            From system to result.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-charcoal/70">
            Two live projects, built with the two editions of this system. Not
            proof that every reader gets an identical result — proof of what
            each system can enable.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal delay={0.2}>
            <div className="rounded-2xl bg-[#F6F1E7] p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-charcoal/50">
                First, we built the system.
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-charcoal">
                {lightProject.name}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-charcoal/70">{lightProject.tagline}</p>
              <div className="mt-6">
                <BrowserFrame url={lightProject.url} title={lightProject.name} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {lightProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-charcoal/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-charcoal/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex justify-center py-4 lg:py-0">
              <ArrowRight className="h-8 w-8 rotate-90 text-signal lg:rotate-0" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-2xl bg-charcoal p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-signal">
                Then we pushed it further.
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ivory">{fullProject.name}</h3>
              <p className="mt-2 max-w-sm text-sm text-ivory/70">{fullProject.tagline}</p>
              <div className="mt-6">
                <BrowserFrame url={fullProject.url} title={fullProject.name} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {fullProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ivory/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

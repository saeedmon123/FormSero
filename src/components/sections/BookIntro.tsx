import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const spreads = [
  { src: "/images/book/full/divider-motion.webp", rotate: -6, x: "0%", z: 10 },
  { src: "/images/book/light/divider-design.webp", rotate: 4, x: "22%", z: 20 },
  { src: "/images/book/full/whatsnew.webp", rotate: -2, x: "42%", z: 30 },
];

export function BookIntro() {
  return (
    <section id="the-book" className="relative bg-ivory px-6 py-28 text-charcoal md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel index="03" label="The Book" tone="light" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-balance font-display text-4xl font-black leading-[1.05] md:text-6xl">
              A field guide, not a feature list.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-charcoal/70">
              Beyond the Prompt is a professionally structured system manual — the
              same editorial discipline you&apos;re reading right now, applied to
              every page. It teaches the complete Claude Code workflow: design
              intelligence, component and pattern research, motion architecture,
              and production QA.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 space-y-3">
              {[
                "A repeatable, professional Claude Code foundation",
                "Design-system intelligence and reference-driven direction",
                "Motion and interaction craft, built for purpose",
                "A production audit workflow you run on every project",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-charcoal/80">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mx-auto h-[420px] w-full max-w-md md:h-[520px]">
            {spreads.map((s, i) => (
              <div
                key={s.src}
                className="absolute top-1/2 left-1/2 h-[80%] w-[68%] overflow-hidden rounded-sm shadow-[0_30px_60px_rgba(23,23,21,0.25)] ring-1 ring-charcoal/10 transition-transform duration-500 hover:z-40 hover:-translate-y-2"
                style={{
                  transform: `translate(-50%, -50%) translateX(${s.x}) rotate(${s.rotate}deg)`,
                  zIndex: s.z,
                }}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 340px, 240px"
                  className="object-cover object-top"
                  aria-hidden={i > 0}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

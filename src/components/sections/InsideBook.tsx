import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const pages = [
  { src: "/images/book/light/divider-foundation.webp", caption: "Foundation" },
  { src: "/images/book/light/divider-design.webp", caption: "Design & Connectivity" },
  { src: "/images/book/full/divider-motion.webp", caption: "Motion & Spatial Experience" },
  { src: "/images/book/full/whatsnew.webp", caption: "What's New — Full Edition" },
  { src: "/images/book/full/divider-build.webp", caption: "Building Exceptional Websites" },
  { src: "/images/book/light/appendix.webp", caption: "Appendices" },
];

export function InsideBook() {
  return (
    <section className="relative bg-ivory py-28 text-charcoal md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <SectionLabel index="07" label="Inside the Book" tone="light" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-balance font-display text-4xl font-black leading-[1.05] md:text-6xl">
            A serious professional publication.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-14 flex gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:thin] snap-x snap-mandatory md:px-10">
          {pages.map((page) => (
            <div
              key={page.src}
              className="relative flex-shrink-0 snap-start"
              style={{ width: "min(72vw, 280px)" }}
            >
              <div className="relative aspect-[900/1273] overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(23,23,21,0.2)] ring-1 ring-charcoal/10">
                <Image
                  src={page.src}
                  alt={page.caption}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-charcoal/50">
                {page.caption}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

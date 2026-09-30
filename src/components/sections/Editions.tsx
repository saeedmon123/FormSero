import Image from "next/image";
import { Check } from "lucide-react";
import { editions } from "@/lib/editions";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { cn } from "@/lib/cn";

export function Editions() {
  return (
    <section id="editions" className="relative bg-black px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="04" label="Two Editions" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-balance font-display text-4xl font-black leading-[1.05] text-ivory md:text-6xl">
            One system. Two starting points.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_1.15fr]">
          {editions.map((edition, i) => (
            <Reveal key={edition.id} delay={0.1 * (i + 1)}>
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 md:p-10",
                  edition.recommended
                    ? "border-signal/50 bg-gradient-to-b from-charcoal to-black shadow-[0_0_0_1px_rgba(255,90,31,0.15),0_40px_100px_rgba(255,90,31,0.08)]"
                    : "border-ivory/10 bg-charcoal/40"
                )}
              >
                {edition.recommended && (
                  <span className="absolute right-6 top-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-black">
                    Recommended
                  </span>
                )}

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                      {edition.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-ivory md:text-3xl">
                      {edition.name}
                    </h3>
                  </div>
                  <div className="relative hidden h-28 w-20 flex-shrink-0 sm:block md:h-36 md:w-24">
                    <Image
                      src={edition.cover}
                      alt={`Beyond the Prompt — ${edition.name} cover`}
                      fill
                      sizes="150px"
                      className="rounded-[2px] object-cover shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>

                <p className="mt-4 max-w-sm text-ivory/70">{edition.tagline}</p>

                <div className="mt-8 flex items-baseline gap-3">
                  {edition.priceOld && (
                    <span className="font-mono text-lg text-muted line-through">
                      {edition.currency}
                      {edition.priceOld}
                    </span>
                  )}
                  <span className="font-display text-5xl font-black text-ivory">
                    {edition.currency}
                    {edition.price}
                  </span>
                  {edition.priceOld && (
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                      Launch price
                    </span>
                  )}
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {edition.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3 text-sm text-ivory/80">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal" />
                      {cap}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <CheckoutButton
                    edition={edition.id}
                    label={`${edition.ctaLabel} — ${edition.currency}${edition.price}`}
                    variant={edition.recommended ? "solid" : "outline"}
                    className="w-full"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

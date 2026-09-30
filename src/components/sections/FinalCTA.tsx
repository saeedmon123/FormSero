import Image from "next/image";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Reveal } from "@/components/ui/Reveal";
import { editions } from "@/lib/editions";

export function FinalCTA() {
  const full = editions.find((e) => e.id === "full")!;
  const light = editions.find((e) => e.id === "light")!;

  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 md:px-10 md:py-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,240,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Reveal>
            <h2 className="text-balance font-display text-5xl font-black leading-[0.95] text-ivory md:text-7xl">
              BUILD WHAT YOUR
              <br />
              PROMPTS <span className="text-signal">COULDN&apos;T.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg text-ivory/70">
              The system is the difference. Get the edition that fits where
              you&apos;re starting from.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-4">
              <CheckoutButton edition="full" label={`Get Full — ${full.currency}${full.price}`} />
              <CheckoutButton
                edition="light"
                label={`Get Light — ${light.currency}${light.price}`}
                variant="outline"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto h-[320px] w-[220px] md:h-[420px] md:w-[290px]">
          <Image
            src="/images/book/full/cover.webp"
            alt="Beyond the Prompt — Full Edition"
            fill
            sizes="290px"
            className="rounded-sm object-contain drop-shadow-[0_50px_100px_rgba(255,90,31,0.15)]"
          />
        </Reveal>
      </div>
    </section>
  );
}

import { Check, Minus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

type Row = {
  capability: string;
  light: "full" | "core" | "none";
  full: "full" | "core" | "none";
};

const rows: Row[] = [
  { capability: "Claude Code foundation", light: "full", full: "full" },
  { capability: "Professional design workflow", light: "full", full: "full" },
  { capability: "Component and pattern research", light: "full", full: "full" },
  { capability: "Reference-driven creative direction", light: "none", full: "full" },
  { capability: "Advanced motion architecture", light: "core", full: "full" },
  { capability: "Immersive 3D and GPU experiences", light: "none", full: "full" },
  { capability: "Production QA and audit workflow", light: "core", full: "full" },
  { capability: "Complete, repeatable system", light: "core", full: "full" },
];

function Cell({ value }: { value: Row["light"] }) {
  if (value === "full") return <Check className="mx-auto h-5 w-5 text-signal" />;
  if (value === "core")
    return <span className="font-mono text-xs uppercase tracking-[0.1em] text-charcoal/50">Core</span>;
  return <Minus className="mx-auto h-4 w-4 text-charcoal/25" />;
}

export function Comparison() {
  return (
    <section className="relative bg-ivory px-6 py-28 text-charcoal md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionLabel index="05" label="Light to Full" tone="light" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-balance font-display text-3xl font-black leading-[1.1] md:text-5xl">
            What changes when you go Full.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-charcoal/15">
                  <th className="py-4 pr-4 font-mono text-xs font-normal uppercase tracking-[0.15em] text-charcoal/50">
                    Capability
                  </th>
                  <th className="w-28 py-4 text-center font-mono text-xs font-normal uppercase tracking-[0.15em] text-charcoal/50">
                    Light
                  </th>
                  <th className="w-28 py-4 text-center font-mono text-xs font-normal uppercase tracking-[0.15em] text-signal">
                    Full
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.capability} className="border-b border-charcoal/10">
                    <td className="py-4 pr-4 text-sm text-charcoal/85 md:text-base">
                      {row.capability}
                    </td>
                    <td className="py-4 text-center">
                      <Cell value={row.light} />
                    </td>
                    <td className="py-4 text-center">
                      <Cell value={row.full} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

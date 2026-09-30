import { cn } from "@/lib/cn";

type Props = {
  index: string;
  label: string;
  className?: string;
  tone?: "dark" | "light";
};

export function SectionLabel({ index, label, className, tone = "dark" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]",
        tone === "dark" ? "text-muted" : "text-charcoal/60",
        className
      )}
    >
      <span className="text-signal">{index}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{label}</span>
    </div>
  );
}

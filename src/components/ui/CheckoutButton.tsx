"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { checkoutLinks } from "@/lib/checkout";
import { cn } from "@/lib/cn";

type Props = {
  edition: "light" | "full";
  label: string;
  variant?: "solid" | "outline";
  className?: string;
};

export function CheckoutButton({ edition, label, variant = "solid", className }: Props) {
  const [pending, setPending] = useState(false);
  const href = checkoutLinks[edition];

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-signal text-black hover:bg-ivory"
      : "border border-ivory/25 text-ivory hover:border-signal hover:text-signal";

  if (href) {
    return (
      <a href={href} className={cn(base, styles, className)} data-cursor="interactive">
        {label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(base, styles, className)}
      data-cursor="interactive"
      onClick={() => {
        setPending(true);
        window.setTimeout(() => setPending(false), 2200);
      }}
      aria-live="polite"
    >
      {pending ? "Checkout coming soon" : label}
      {!pending && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
}

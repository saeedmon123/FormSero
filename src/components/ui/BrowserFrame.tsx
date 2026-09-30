"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

type Props = {
  url: string;
  title: string;
  className?: string;
};

export function BrowserFrame({ url, title, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-lg border border-ivory/10 bg-charcoal shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${className ?? ""}`}
      data-cursor="interactive"
    >
      <div className="flex items-center gap-2 border-b border-ivory/10 bg-black/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
        <span className="ml-3 flex-1 truncate rounded-full bg-ivory/5 px-3 py-1 text-center font-mono text-[10px] text-muted">
          {domain}
        </span>
        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted transition-colors group-hover:text-signal" />
      </div>
      <div ref={hostRef} className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        {inView ? (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-charcoal to-black" />
        )}
      </div>
    </a>
  );
}

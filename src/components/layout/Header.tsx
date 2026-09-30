"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, primaryCtaHref } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-ivory/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-display text-lg font-black tracking-tight text-ivory"
          data-cursor="interactive"
        >
          FORM<span className="text-signal">SERO</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ivory/70 transition-colors hover:text-ivory"
              data-cursor="interactive"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={primaryCtaHref}
            className="inline-flex items-center rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors hover:bg-ivory"
            data-cursor="interactive"
          >
            Get the Book
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-cursor="interactive"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[64px] z-40 flex flex-col bg-black md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-ivory/10 py-5 font-display text-3xl font-bold text-ivory"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <a
                href={primaryCtaHref}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-signal px-5 py-4 font-mono text-sm uppercase tracking-[0.15em] text-black"
              >
                Get the Book
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

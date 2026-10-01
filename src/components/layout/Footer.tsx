const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-black px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-2xl font-black tracking-tight text-ivory">
            FORM<span className="text-signal">SERO</span>
          </div>
          <p className="mt-2 max-w-xs font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Beyond the Prompt
          </p>
        </div>

        <div className="flex gap-10 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <a href="/privacy" className="transition-colors hover:text-ivory" data-cursor="interactive">
            Privacy
          </a>
          <a href="/terms" className="transition-colors hover:text-ivory" data-cursor="interactive">
            Terms
          </a>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          © {year} FORMSERO
        </p>
      </div>
    </footer>
  );
}

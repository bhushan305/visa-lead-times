import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b rule bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="display text-2xl text-primary">Visa Case Times</span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-muted-foreground">
            USCIS Processing Tracker
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link to="/" className="hover:text-primary text-muted-foreground">Home</Link>
          <Link to="/forms" className="hover:text-primary text-muted-foreground">Forms</Link>
          <a href="/guides" className="hover:text-primary text-muted-foreground">Guides</a>
          <Link to="/about" className="hover:text-primary text-muted-foreground hidden sm:inline">About</Link>
          <a
            href="https://egov.uscis.gov/processing-times"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline hidden md:inline"
          >
            USCIS.gov ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t rule">
      <div className="mx-auto max-w-6xl px-6 py-10 text-xs text-muted-foreground">
        <p className="display text-base text-foreground">Visa Case Times</p>
        <p className="mt-2 max-w-2xl">
          Independent dashboard tracking publicly-reported USCIS processing times. We are
          not affiliated with USCIS or any government agency. Information is provided for
          general guidance and is not legal advice.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 items-center">
          <Link to="/about" className="hover:text-primary">About</Link>
          <a href="/guides" className="hover:text-primary">Guides</a>
          <Link to="/methodology" className="hover:text-primary">Methodology</Link>
          <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          <Link to="/terms" className="hover:text-primary">Terms</Link>
          <a
            href="https://litwinlaw.com/?utm_source=visa-lead-times&utm_medium=referral&utm_campaign=free_consult&utm_content=footer"
            target="_blank"
            rel="noopener sponsored"
            className="hover:text-primary"
          >
            Need legal help? Free consult at Litwin Law →
          </a>
        </div>
        <p className="mt-5">© {new Date().getFullYear()} Visa Case Times. Source: USCIS.gov.</p>
      </div>
    </footer>
  );
}

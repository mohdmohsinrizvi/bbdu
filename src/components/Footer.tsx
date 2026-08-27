import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-sm font-bold text-foreground">
              BBD Study Hub
            </span>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Student-built academic learning platform for B.Tech students at BBD institutions.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Quick Links
            </span>
            <ul className="mt-2 space-y-1.5">
              <li>
                <Link href="/" className="text-xs text-muted transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-xs text-muted transition-colors hover:text-foreground">
                  Set Up Profile
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-xs text-muted transition-colors hover:text-foreground">
                  My Progress
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-xs text-muted transition-colors hover:text-foreground">
                  Search
                </Link>
              </li>
            </ul>
          </nav>

          {/* Credits */}
          <div className="sm:text-right">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Created &amp; Designed by
            </span>
            <p className="mt-0.5">
              <a
                href="https://mohsin-universe.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-foreground transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Mohd Mohsin
              </a>
            </p>
            <div className="mt-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                Campus Outreach
              </span>
              <p className="mt-0.5 text-[14px] font-medium text-foreground">
                <a
                  href="https://www.instagram.com/aquibb22_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Aquib
                </a>
                {" — BBD University"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                3rd Year · 5th Semester
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-center text-[11px] text-muted">
            &copy; {new Date().getFullYear()} BBD Study Hub. Always verify academic information with official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}

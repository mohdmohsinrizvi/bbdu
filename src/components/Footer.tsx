export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-xs">
            <span className="text-sm font-bold text-foreground">
              BBDU CSE Study Hub
            </span>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              A student-built learning platform for B.Tech CSE.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-right sm:text-right">
            <div>
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
            </div>
            <div>
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
            &copy; 2026 BBDU CSE Study Hub
          </p>
        </div>
      </div>
    </footer>
  );
}

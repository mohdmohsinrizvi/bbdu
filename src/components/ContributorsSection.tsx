"use client";

import { contributors } from "@/data/contributors";

export default function ContributorsSection() {
  if (contributors.length === 0) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Special Thanks
          </p>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto leading-relaxed">
            Built with the support of students who help BBD Study Hub reach more learners.
          </p>
        </div>

        {/* Contributor cards */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {contributors.map((c) => (
            <div
              key={c.name}
              className="group relative w-full max-w-xs rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-foreground/15 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.02)]"
            >
              <div className="flex items-start gap-4">
                {/* Initials avatar */}
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-surface-hover text-xs font-bold tracking-wide text-muted transition-transform duration-200 group-hover:scale-[1.03]">
                  {c.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Community Contributor
                  </p>
                  <p className="mt-1.5 text-[15px] font-bold text-foreground leading-snug">
                    {c.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {c.year} &middot; {c.stream}
                  </p>
                  <p className="text-xs text-muted">
                    {c.institution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <h3 className="text-base font-bold text-foreground">
            Want to contribute?
          </h3>
          <p className="mt-1.5 text-sm text-muted max-w-md mx-auto leading-relaxed">
            Help us make BBD Study Hub better and reach more students.
          </p>
          <a
            href="https://www.instagram.com/mohsin.rizvii"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-[13px] font-semibold text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Want to Contribute?
            <svg className="h-3.5 w-3.5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

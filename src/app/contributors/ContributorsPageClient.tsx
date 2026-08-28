"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { contributors } from "@/data/contributors";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FeaturedContributor({ c, index }: { c: typeof contributors[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const pad = String(index + 1).padStart(2, "0");

  return (
    <div ref={ref} className="group relative">
      {/* Index marker */}
      <div
        className="mb-6 transition-all duration-700 ease-out"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(8px)" }}
      >
        <span className="text-[11px] font-bold tracking-[0.2em] text-border-strong">
          {pad} / <span className="text-muted">CONTRIBUTORS</span>
        </span>
      </div>

      {/* Contributor layout — editorial split */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        {/* Left: initials mark */}
        <div
          className="flex-shrink-0 transition-all duration-700 ease-out delay-100"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(12px)" }}
        >
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-hover lg:h-24 lg:w-24">
            <span className="text-2xl font-extrabold tracking-tight text-muted lg:text-3xl">
              {c.initials}
            </span>
            {/* Subtle corner accent */}
            <div className="absolute right-0 top-0 h-2 w-2 rounded-bl-lg bg-accent/40" />
          </div>
        </div>

        {/* Right: details */}
        <div className="min-w-0 flex-1">
          {/* Name with reveal animation */}
          <div className="overflow-hidden">
            <h2
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: "opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s",
              }}
            >
              {c.name}
            </h2>
          </div>

          {/* Animated underline */}
          <div
            className="mt-3 h-px max-w-[120px] bg-accent/30 transition-all duration-900 ease-out"
            style={{
              width: inView ? "100%" : "0%",
              maxWidth: "120px",
              transitionDelay: "0.5s",
            }}
          />

          {/* Details */}
          <div
            className="mt-5 space-y-1.5 transition-all duration-700 ease-out"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(10px)", transitionDelay: "0.4s" }}
          >
            <p className="text-sm font-semibold text-foreground">
              {c.program}
            </p>
            <p className="text-sm text-muted">
              {c.year} &middot; {c.semester}
            </p>
            <p className="text-sm text-muted">
              {c.group}
            </p>
            <p className="text-sm font-medium text-muted">
              {c.institution}
            </p>
          </div>

          {/* Contributor badge */}
          <div
            className="mt-6 inline-flex items-center gap-2 transition-all duration-700 ease-out"
            style={{ opacity: inView ? 1 : 0, transitionDelay: "0.6s" }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
              Community Contributor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContributorsPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, 0.1);

  return (
    <div className="min-h-screen">
      {/* Back navigation */}
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to BBD Study Hub
        </Link>
      </div>

      {/* Hero */}
      <header ref={heroRef} className="mx-auto max-w-4xl px-4 pt-12 pb-4 sm:px-6 sm:pt-20 sm:pb-6">
        {/* Eyebrow */}
        <p
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted transition-all duration-700 ease-out"
          style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "none" : "translateY(6px)" }}
        >
          The Community Behind the Hub
        </p>

        {/* Title */}
        <h1
          className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl transition-all duration-700 ease-out"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "none" : "translateY(12px)",
            transitionDelay: "0.1s",
          }}
        >
          Contributors
        </h1>

        {/* Description */}
        <p
          className="mt-3 max-w-lg text-sm leading-relaxed text-muted transition-all duration-700 ease-out"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "none" : "translateY(10px)",
            transitionDelay: "0.2s",
          }}
        >
          Built with the help of students who help BBD Study Hub reach more learners.
        </p>

        {/* Divider */}
        <div
          className="mt-8 h-px bg-border transition-all duration-900 ease-out"
          style={{ width: heroInView ? "100%" : "0%", transitionDelay: "0.3s" }}
        />
      </header>

      {/* Contributors list */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <p
          className="mb-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted"
        >
          Special Thanks
        </p>

        <div className="space-y-14">
          {contributors.map((c, i) => (
            <FeaturedContributor key={c.id} c={c} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="border-t border-border pt-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Get Involved
          </p>
          <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
            Want to contribute?
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Supporting BBD Study Hub can be as simple as sharing it with other students, suggesting improvements, reporting issues, or helping the platform reach more learners.
          </p>
          <a
            href="https://www.instagram.com/mohsin.rizvii"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-[13px] font-semibold text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Want to Contribute?
            <svg
              className="h-3.5 w-3.5 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

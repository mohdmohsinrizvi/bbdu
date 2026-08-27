"use client";

import { useEffect, useRef, useState } from "react";
import { usePWA } from "./PWAProvider";
import { trackInstallSectionView, trackInstallButtonClick } from "@/lib/analytics";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import {
  Download,
  Check,
  Share,
  BookOpen,
  Zap,
  WifiOff,
  BarChart3,
} from "lucide-react";

function PhoneMockup() {
  const { progress } = useProgress();
  const firstSubject = subjects[0];

  const getS = (id: string) => {
    const s = subjects.find((sub) => sub.id === id);
    if (!s) return { total: 0, done: 0, pct: 0 };
    const total = s.units.reduce((a, u) => a + u.topics.length, 0);
    const done = s.units
      .flatMap((u) => u.topics)
      .filter((t) => progress.completedTopics.includes(t.id)).length;
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const s1 = firstSubject ? getS(firstSubject.id) : { total: 0, done: 0, pct: 0 };

  return (
    <div className="phone-mockup relative mx-auto w-[260px] sm:w-[280px]">
      {/* Phone frame */}
      <div className="relative rounded-[2rem] border-[3px] border-foreground/10 bg-foreground/[0.03] p-2 shadow-2xl shadow-black/10 dark:shadow-black/30">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 -translate-y-px rounded-b-2xl bg-foreground/10" />

        {/* Screen */}
        <div className="overflow-hidden rounded-[1.5rem] bg-background">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1">
            <span className="text-[9px] font-semibold text-foreground/60">9:41</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-3 rounded-sm border border-foreground/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center gap-2 px-4 pb-2 pt-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-foreground">BBDU CSE</p>
              <p className="text-[7px] text-muted">Study Hub</p>
            </div>
          </div>

          {/* Continue Learning card */}
          <div className="mx-3 rounded-lg border border-border bg-surface p-2.5">
            <p className="text-[7px] font-bold uppercase tracking-wider text-muted">
              Continue Learning
            </p>
            {firstSubject ? (
              <>
                <p className="mt-1 text-[9px] font-bold text-foreground truncate">
                  {firstSubject.units[0]?.title || firstSubject.name}
                </p>
                <p className="text-[7px] text-muted">
                  {firstSubject.name}
                </p>
              </>
            ) : (
              <p className="mt-1 text-[9px] font-bold text-foreground">
                Limits &amp; Continuity
              </p>
            )}
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${s1.pct}%` }}
                />
              </div>
              <span className="text-[7px] font-bold tabular-nums text-muted">
                {s1.pct}%
              </span>
            </div>
          </div>

          {/* Subject list */}
          <div className="px-3 pt-2.5 pb-3 space-y-1.5">
            <p className="text-[7px] font-bold uppercase tracking-wider text-muted px-1">
              Subjects
            </p>
            {subjects.slice(0, 3).map((s, i) => {
              const total = s.units.reduce((a, u) => a + u.topics.length, 0);
              const done = s.units
                .flatMap((u) => u.topics)
                .filter((t) => progress.completedTopics.includes(t.id)).length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-md bg-surface-hover/50 px-2 py-1.5"
                >
                  <span className="text-[7px] font-bold text-muted tabular-nums w-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] font-semibold text-foreground truncate">
                      {s.name}
                    </p>
                    <div className="mt-0.5 h-0.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-accent/60"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[7px] tabular-nums text-muted">{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-around border-t border-border px-2 py-1.5">
            {["Home", "Search", "Progress"].map((label) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <div className="h-3 w-3 rounded-sm bg-foreground/10" />
                <span className="text-[6px] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstallSection() {
  const { isInstallable, isInstalled, installApp, showIOSInstructions, dismissIOSInstructions } = usePWA();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasTrackedView) {
            trackInstallSectionView();
            setHasTrackedView(true);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTrackedView]);

  const handleInstall = async () => {
    trackInstallButtonClick();
    await installApp();
  };

  // Determine what to show
  const showInstallButton = isInstallable && !isInstalled;
  const showInstalledBadge = isInstalled;
  const showIOSGuide = showIOSInstructions;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border bg-surface"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-purple-500/[0.03]" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: Content */}
          <div
            className={`flex-1 text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1">
              <Download className="h-3 w-3 text-accent" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                Get the App
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Your study hub,
              <br />
              one tap away.
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted mx-auto lg:mx-0">
              Keep BBDU CSE Study Hub on your phone. Open your syllabus, track
              progress, and continue learning &mdash; without opening the browser
              every time.
            </p>

            {/* Benefits */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 mx-auto max-w-md lg:mx-0">
              {[
                { icon: Zap, text: "Quick access from home screen" },
                { icon: BarChart3, text: "Saved progress, always synced" },
                { icon: WifiOff, text: "Browse cached content offline" },
                { icon: BookOpen, text: "Full curriculum, always ready" },
              ].map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-2.5 rounded-lg bg-tinted px-3 py-2"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <benefit.icon className="h-3 w-3" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground/80">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Area */}
            <div className="mt-8">
              {/* State: Install available */}
              {showInstallButton && (
                <div className="flex flex-col items-center gap-2 sm:flex-row lg:justify-start">
                  <button
                    onClick={handleInstall}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0"
                    aria-label="Install BBDU CSE Study Hub app"
                  >
                    <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Install App
                  </button>
                  <span className="text-xs text-muted">No Play Store required</span>
                </div>
              )}

              {/* State: Already installed */}
              {showInstalledBadge && (
                <div className="flex items-center gap-2 rounded-xl bg-success/10 px-5 py-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-success">
                    App Installed
                  </span>
                </div>
              )}

              {/* State: iOS Safari */}
              {showIOSGuide && (
                <div className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Share className="h-4 w-4 text-accent" />
                    <span className="text-sm font-bold text-foreground">
                      Install on iPhone
                    </span>
                  </div>
                  <ol className="space-y-2 text-[13px] text-muted">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                        1
                      </span>
                      Tap the <strong className="text-foreground">Share</strong> button in Safari
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                        2
                      </span>
                      Choose <strong className="text-foreground">&quot;Add to Home Screen&quot;</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                        3
                      </span>
                      Tap <strong className="text-foreground">Add</strong>
                    </li>
                  </ol>
                  <button
                    onClick={dismissIOSInstructions}
                    className="mt-3 text-xs text-muted hover:text-foreground transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* State: No install available (not installed, no prompt) */}
              {!showInstallButton && !showInstalledBadge && !showIOSGuide && (
                <div className="flex flex-col items-center gap-2 sm:flex-row lg:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-hover px-5 py-3 text-[13px] text-muted">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      Open in Chrome or Edge to install
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div
            className={`flex-shrink-0 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

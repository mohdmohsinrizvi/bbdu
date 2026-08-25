"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Play,
  ChevronRight,
  Layers,
  FileText,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { trackContinueLearning } from "@/lib/analytics";
import { getSubjectColor } from "@/lib/constants";

const theorySubjects = subjects.filter((s) => s.type === "theory");

export default function HomePage() {
  const { progress } = useProgress();

  useEffect(() => {
    const branch = localStorage.getItem("bbdu-branch");
    const group = localStorage.getItem("bbdu-group");
    if (branch && group) {
      window.location.href = `/btech/${branch}/${group}/semester-1`;
    }
  }, []);

  const allTopics = subjects.flatMap((s) => s.units.flatMap((u) => u.topics));
  const totalTopics = allTopics.length;
  const completedTopics = progress.completedTopics.length;
  const totalUnits = subjects.reduce(
    (acc, s) => acc + s.units.reduce((a, u) => a + u.topics.length, 0),
    0
  );
  const completedUnits = subjects.reduce(
    (acc, s) =>
      acc +
      s.units.filter((u) =>
        u.topics.every((t) => progress.completedTopics.includes(t.id))
      ).length,
    0
  );

  const continueSubject = progress.startedSubjects.length > 0
    ? subjects.find(
        (s) =>
          s.id ===
          progress.startedSubjects[progress.startedSubjects.length - 1]
      )
    : null;

  const continueUnit = continueSubject?.units.find((u) =>
    u.topics.some((t) => !progress.completedTopics.includes(t.id))
  );

  const continueTopic = continueUnit?.topics.find(
    (t) => !progress.completedTopics.includes(t.id)
  );

  const continuePercent = continueSubject
    ? (() => {
        const total = continueSubject.units.reduce(
          (a, u) => a + u.topics.length,
          0
        );
        const done = continueSubject.units
          .flatMap((u) => u.topics)
          .filter((t) => progress.completedTopics.includes(t.id)).length;
        return total > 0 ? Math.round((done / total) * 100) : 0;
      })()
    : 0;

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1 stagger-children">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                B.Tech CSE &middot; Semester 1 &middot; 2026&ndash;27
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your Semester.
                <br />
                Your Syllabus.
                <br />
                <span className="text-gradient bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
                  Your Way to Learn.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                Explore {subjects.length} subjects, {totalUnits} topics, and curated
                video lessons &mdash; all mapped to your B.Tech CSE curriculum.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/select"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[13px] font-semibold text-indigo-900 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/progress"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  View Progress
                </Link>
              </div>
            </div>

            {/* Floating curriculum card */}
            <div className="flex-shrink-0 lg:w-[340px]">
              <div className="animate-float rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                    <GraduationCap className="h-4 w-4 text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Semester 01</p>
                    <p className="text-[10px] text-white/50">
                      Group 1 / Group A
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {theorySubjects.slice(0, 4).map((s, i) => {
                    const total = s.units.reduce(
                      (a, u) => a + u.topics.length,
                      0
                    );
                    const done = s.units
                      .flatMap((u) => u.topics)
                      .filter((t) =>
                        progress.completedTopics.includes(t.id)
                      ).length;
                    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                    return (
                      <div
                        key={s.id}
                        className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2"
                      >
                        <span className="text-[10px] font-bold text-white/40 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-white/90">
                            {s.name}
                          </p>
                          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-indigo-400 transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-white/40 tabular-nums">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/semester-1"
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  View all {subjects.length} subjects
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Strip */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              {
                label: "Subjects",
                value: subjects.length,
                icon: Layers,
                href: "/semester-1",
              },
              {
                label: "Topics",
                value: totalTopics,
                icon: FileText,
                href: "/semester-1",
              },
              {
                label: "Videos",
                value: "50+",
                icon: Play,
                href: "/semester-1",
              },
              {
                label: "Completed",
                value: completedTopics,
                icon: BookOpen,
                href: "/progress",
              },
            ].map((stat, i) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="group flex items-center gap-3 border-r border-border px-4 py-4 last:border-r-0 transition-colors hover:bg-surface-hover"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/8 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <stat.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-bold tabular-nums text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                    {stat.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      {completedTopics > 0 && continueSubject && continueTopic && (
        <section className="section-tinted">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
                Continue Learning
              </h2>
              <Link
                href={`/semester-1/${continueSubject.id}/${continueUnit?.id}/${continueTopic.id}`}
                className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                Skip to topic
              </Link>
            </div>

            <Link
              href={`/semester-1/${continueSubject.id}/${continueUnit?.id}/${continueTopic.id}`}
              onClick={() => trackContinueLearning(continueSubject.name, continueUnit?.title || "", continueTopic.title)}
              className="group card-hover block rounded-xl border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="subject-accent-bar h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      {continueSubject.code}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {continueUnit?.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Next: {continueTopic.title}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-extrabold tabular-nums text-accent">
                      {continuePercent}%
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                      Complete
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Subjects */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                Semester 1
              </h2>
              <p className="mt-1 text-sm text-muted">
                Group 1 / Group A &middot; {subjects.length} subjects
              </p>
            </div>
            <Link
              href="/semester-1"
              className="hidden items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover sm:flex"
            >
              View all
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {theorySubjects.map((subject, i) => {
              const totalTopicsCount = subject.units.reduce(
                (acc, u) => acc + u.topics.length,
                0
              );
              const subjectCompleted = subject.units
                .flatMap((u) => u.topics)
                .filter((t) => progress.completedTopics.includes(t.id))
                .length;
              const pct =
                totalTopicsCount > 0
                  ? Math.round((subjectCompleted / totalTopicsCount) * 100)
                  : 0;
              const colorClass = getSubjectColor(subject.id);

              return (
                <Link
                  key={subject.id}
                  href={`/semester-1/${subject.id}`}
                  className={`group ${colorClass} card-hover relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all`}
                >
                  <div className="subject-accent-bar absolute left-0 top-0 h-full" />
                  <div className="pl-3">
                    <div className="flex items-start justify-between">
                      <span className="editorial-number text-[2.5rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                        {subject.credits} Credits
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-bold text-foreground group-hover:text-accent transition-colors">
                      {subject.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted">
                      {subject.code} &middot; {subject.units.length} Units
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-accent animate-progress transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-muted">
                        {subjectCompleted}/{totalTopicsCount}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-tinted py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-6">
            How It Works
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Choose Subject",
                desc: "Browse all semester subjects with mapped course outcomes.",
                icon: BookOpen,
              },
              {
                step: "02",
                title: "Pick a Unit",
                desc: "Each unit maps to specific course outcomes and contact hours.",
                icon: Layers,
              },
              {
                step: "03",
                title: "Watch Lesson",
                desc: "Curated YouTube videos from verified educational channels.",
                icon: Play,
              },
              {
                step: "04",
                title: "Track Progress",
                desc: "Mark topics as completed and track your semester progress.",
                icon: GraduationCap,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative rounded-xl border border-border bg-surface p-5 transition-all card-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/8 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="mt-3 block text-[10px] font-bold uppercase tracking-widest text-muted">
                  Step {item.step}
                </span>
                <h3 className="mt-1 text-sm font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semester Explorer */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            <div className="hero-gradient-subtle px-6 py-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                Visual Flow
              </p>
              <h2 className="mt-2 text-xl font-extrabold text-white">
                Semester 01
              </h2>
              <p className="mt-1 text-sm text-white/60">
                B.Tech CSE &middot; 2026&ndash;27
              </p>
            </div>

            <div className="px-6 py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                {[
                  {
                    icon: Layers,
                    label: "SUBJECTS",
                    value: `${subjects.length} Subjects`,
                  },
                  {
                    icon: FileText,
                    label: "UNITS",
                    value: `${theorySubjects.reduce((a, s) => a + s.units.length, 0)} Units`,
                  },
                  {
                    icon: BookOpen,
                    label: "TOPICS",
                    value: `${totalTopics} Topics`,
                  },
                  {
                    icon: Play,
                    label: "LESSONS",
                    value: "50+ Videos",
                  },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {i > 0 && (
                      <ChevronRight className="hidden h-4 w-4 text-muted sm:block" />
                    )}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/8 text-accent">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                          {item.label}
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-border py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs text-muted">
            Student-built learning resource. Always verify academic information
            with official BBDU sources.
          </p>
        </div>
      </section>
    </div>
  );
}

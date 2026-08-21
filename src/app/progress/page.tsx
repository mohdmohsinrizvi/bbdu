"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "@/components/ProgressBar";

const subjectColors: Record<string, string> = {
  calculus: "subject-calculus",
  "computer-concepts-programming-c": "subject-programming",
  "quantum-physics": "subject-quantum",
  "engineering-mechanics": "subject-mechanics",
  "basic-electronics": "subject-electronics",
  "environment-ecological-sustainability": "subject-environment",
};

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();

  const allTopics = subjects.flatMap((s) =>
    s.units.flatMap((u) =>
      u.topics.map((t) => ({ ...t, subjectId: s.id, subjectName: s.name }))
    )
  );
  const totalTopics = allTopics.length;
  const completedTopics = progress.completedTopics.length;
  const subjectProgress = subjects
    .filter((s) => s.units.length > 0)
    .map((s) => {
      const total = s.units.reduce((a, u) => a + u.topics.length, 0);
      const done = s.units
        .flatMap((u) => u.topics)
        .filter((t) => progress.completedTopics.includes(t.id)).length;
      return {
        subject: s,
        total,
        done,
        percent: total > 0 ? Math.round((done / total) * 100) : 0,
      };
    })
    .filter((sp) => sp.total > 0);

  const continueItem = subjectProgress.find(
    (sp) => sp.percent > 0 && sp.percent < 100
  );

  return (
    <div>
      {/* Header */}
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Your Progress
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {completedTopics} of {totalTopics} topics completed
          </p>
          <div className="mt-5 max-w-md">
            <ProgressBar
              value={completedTopics}
              max={totalTopics}
              label="Semester Progress"
              size="lg"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Continue */}
        {continueItem && (
          <section className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Continue
            </h2>
            <Link
              href={`/semester-1/${continueItem.subject.id}`}
              className="group card-hover block rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                    {continueItem.subject.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {continueItem.done}/{continueItem.total} topics &middot;{" "}
                    {continueItem.percent}%
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Subject Progress */}
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
            Subject Progress
          </h2>
          <div className="space-y-3">
            {subjectProgress.map(({ subject, done, total, percent }) => {
              const colorClass =
                subjectColors[subject.id] || "subject-calculus";
              return (
                <Link
                  key={subject.id}
                  href={`/semester-1/${subject.id}`}
                  className={`${colorClass} group card-hover block rounded-xl border border-border bg-surface p-5`}
                >
                  <div className="flex items-start gap-4">
                    <div className="subject-accent-bar min-h-[40px]" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[15px] font-bold text-foreground group-hover:text-accent transition-colors">
                          {subject.name}
                        </span>
                        <span className="flex-shrink-0 text-sm font-extrabold tabular-nums text-foreground">
                          {percent}%
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                        <span className="font-medium">{subject.code}</span>
                        <span className="text-border">&middot;</span>
                        <span className="tabular-nums">
                          {done}/{total} topics
                        </span>
                      </div>

                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${
                            percent === 100 ? "bg-success" : "bg-accent"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Reset */}
        <div className="border-t border-border pt-6">
          <button
            onClick={() => {
              if (
                confirm("Reset all progress? This cannot be undone.")
              ) {
                resetProgress();
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-bold text-muted transition-all hover:border-destructive/30 hover:text-destructive hover:bg-destructive/5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset all progress
          </button>
        </div>
      </div>
    </div>
  );
}

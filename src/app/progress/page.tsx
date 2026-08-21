"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "@/components/ProgressBar";

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();

  const allTopics = subjects.flatMap((s) =>
    s.units.flatMap((u) => u.topics.map((t) => ({ ...t, subjectId: s.id, subjectName: s.name })))
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
      return { subject: s, total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
    })
    .filter((sp) => sp.total > 0);

  const continueItem = subjectProgress.find((sp) => sp.percent > 0 && sp.percent < 100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Progress
        </h1>
        <p className="mt-1 text-sm text-muted">
          {completedTopics} of {totalTopics} topics completed
        </p>
      </div>

      {/* Overall */}
      <section className="mb-8">
        <div className="max-w-sm">
          <ProgressBar value={completedTopics} max={totalTopics} label="Semester Progress" size="md" />
        </div>
      </section>

      {/* Continue */}
      {continueItem && (
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Continue
          </h2>
          <div className="border-t border-border">
            <Link
              href={`/semester-1/${continueItem.subject.id}`}
              className="group flex items-center justify-between py-3 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
            >
              <div>
                <p className="text-[15px] font-medium text-foreground group-hover:text-accent">
                  {continueItem.subject.name}
                </p>
                <p className="text-xs text-muted">
                  {continueItem.done}/{continueItem.total} topics &middot; {continueItem.percent}%
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      )}

      {/* Subject Progress */}
      <section className="mb-10">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
          Subject Progress
        </h2>
        <div className="border-t border-border">
          {subjectProgress.map(({ subject, done, total, percent }) => (
            <div key={subject.id} className="border-b border-border">
              <Link
                href={`/semester-1/${subject.id}`}
                className="group flex items-center justify-between py-3 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[15px] font-medium text-foreground group-hover:text-accent">
                      {subject.name}
                    </span>
                    <span className="flex-shrink-0 text-xs tabular-nums text-muted">
                      {done}/{total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        percent === 100 ? "bg-success" : "bg-accent"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reset */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => {
            if (confirm("Reset all progress? This cannot be undone.")) {
              resetProgress();
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-destructive"
        >
          <RotateCcw className="h-3 w-3" />
          Reset all progress
        </button>
      </div>
    </div>
  );
}

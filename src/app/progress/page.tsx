"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useAcademic } from "@/lib/AcademicContext";
import { getSubjects } from "@/lib/branchUtils";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "@/components/ProgressBar";
import { getSubjectColor } from "@/lib/constants";

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();
  const { profile, isSetup } = useAcademic();

  if (!isSetup || !profile) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold text-foreground">Progress</h1>
        <p className="mt-2 text-sm text-muted">
          Set up your study space to track progress.
        </p>
        <Link
          href="/onboarding"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background"
        >
          Get started
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  const semSubjects = getSubjects(
    profile.institutionId,
    profile.programId,
    profile.branchId,
    profile.groupId,
    profile.yearId,
    profile.semesterId,
  );

  const allTopics = semSubjects.flatMap((s) => s.units.flatMap((u) => u.topics));
  const totalTopics = allTopics.length;
  const completedTopics = progress.completedTopics.length;

  const prefix = `/${profile.institutionId}/${profile.programId}/${profile.branchId}/${profile.groupId}/${profile.yearId}/${profile.semesterId}`;

  const subjectProgress = semSubjects
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
        href: `${prefix}/${s.id}`,
      };
    })
    .filter((sp) => sp.total > 0);

  const continueItem = subjectProgress.find(
    (sp) => sp.percent > 0 && sp.percent < 100
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Your Progress
          </h1>
          <p className="mt-2 text-sm text-muted">
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
              href={continueItem.href}
              className="group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-foreground/20 hover:bg-surface-hover"
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
            {subjectProgress.map(({ subject, done, total, percent, href }) => {
              const colorClass = getSubjectColor(subject.id);
              return (
                <Link
                  key={subject.id}
                  href={href}
                  className={`${colorClass} group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-foreground/20 hover:bg-surface-hover`}
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

                      <div className="flex items-center gap-2 text-xs text-muted">
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

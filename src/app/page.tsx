"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";

const theorySubjects = subjects.filter((s) => s.type === "theory");

export default function HomePage() {
  const { progress } = useProgress();

  const allTopics = subjects.flatMap((s) => s.units.flatMap((u) => u.topics));
  const totalTopics = allTopics.length;
  const completedTopics = progress.completedTopics.length;

  const continueSubject = progress.startedSubjects.length > 0
    ? subjects.find((s) => s.id === progress.startedSubjects[progress.startedSubjects.length - 1])
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          B.Tech CSE &middot; Semester 1 &middot; 2026&ndash;27
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Study Hub
        </h1>
        <p className="mt-1 text-[15px] text-muted">
          Choose a subject. Watch the lesson. Track your progress.
        </p>

        <div className="mt-6">
          <Link
            href="/semester-1"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Explore Semester 1
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Continue Learning */}
      {completedTopics > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Continue Learning
          </h2>
          <div className="border-t border-border">
            {continueSubject ? (
              <Link
                href={`/semester-1/${continueSubject.id}`}
                className="group flex items-center justify-between py-3 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
              >
                <div>
                  <p className="text-[15px] font-medium text-foreground group-hover:text-accent">
                    {continueSubject.name}
                  </p>
                  <p className="text-xs text-muted">
                    {continueSubject.code}
                  </p>
                </div>
                <span className="text-xs text-muted tabular-nums">
                  {completedTopics}/{totalTopics} completed
                </span>
              </Link>
            ) : (
              <div className="py-3 text-[13px] text-muted">
                Start with your first subject
              </div>
            )}
          </div>
        </section>
      )}

      {/* Semester 1 Subjects */}
      <section className="mb-10">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
          Semester 1 &middot; Group 1 / Group A
        </h2>
        <div className="border-t border-border">
          {theorySubjects.map((subject, i) => {
            const totalTopics = subject.units.reduce((acc, u) => acc + u.topics.length, 0);
            const subjectCompleted = subject.units
              .flatMap((u) => u.topics)
              .filter((t) => progress.completedTopics.includes(t.id)).length;

            return (
              <Link
                key={subject.id}
                href={`/semester-1/${subject.id}`}
                className="group flex items-center gap-4 border-b border-border py-3 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
              >
                <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="text-[15px] font-medium text-foreground group-hover:text-accent">
                    {subject.name}
                  </span>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                    <span>{subject.code}</span>
                    <span>&middot;</span>
                    <span>{subject.credits} Credits</span>
                    {totalTopics > 0 && (
                      <>
                        <span>&middot;</span>
                        <span>{subjectCompleted}/{totalTopics} completed</span>
                      </>
                    )}
                  </div>
                </div>

                <span className="text-xs text-muted transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-4">
          <Link
            href="/semester-1"
            className="text-xs font-medium text-accent hover:text-accent-hover"
          >
            View all {subjects.length} subjects
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-10 border-t border-border pt-8">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
          How It Works
        </h2>
        <div className="grid grid-cols-2 gap-4 text-[13px] sm:grid-cols-4">
          <div>
            <span className="font-medium text-foreground">Choose subject</span>
            <p className="mt-0.5 text-xs text-muted">Browse all semester subjects</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Pick a unit</span>
            <p className="mt-0.5 text-xs text-muted">Each unit maps to course outcomes</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Watch lesson</span>
            <p className="mt-0.5 text-xs text-muted">Curated YouTube videos</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Track progress</span>
            <p className="mt-0.5 text-xs text-muted">Mark topics as completed</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-border pt-6">
        <p className="text-xs text-muted">
          Student-built learning resource. Always verify academic information with official BBDU sources.
        </p>
      </section>
    </div>
  );
}

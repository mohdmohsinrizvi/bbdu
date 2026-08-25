"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBranch } from "@/data/branches";
import { getSubjectsForGroup, getTheorySubjectsForGroup } from "@/lib/branchUtils";
import { useProgress } from "@/hooks/useProgress";
import { getSubjectColor } from "@/lib/constants";
import ProgressBar from "@/components/ProgressBar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BranchSemesterPage({
  params,
}: {
  params: Promise<{ branch: string; group: string }>;
}) {
  const { branch: branchId, group: groupId } = use(params);
  const branch = getBranch(branchId);
  const group = branch?.groups.find((g) => g.id === groupId);
  const { progress } = useProgress();

  if (!branch || !group) notFound();

  const subjects = getSubjectsForGroup(branchId, groupId);
  const theorySubjects = getTheorySubjectsForGroup(branchId, groupId);

  const totalTopics = subjects.reduce(
    (acc, s) => acc + s.units.reduce((a, u) => a + u.topics.length, 0),
    0
  );
  const completedCount = subjects
    .flatMap((s) => s.units.flatMap((u) => u.topics))
    .filter((t) => progress.completedTopics.includes(t.id)).length;

  return (
    <div>
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/select" },
              { label: branch.shortName, href: `/select` },
              { label: group.name },
            ]}
          />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/50">
            {branch.name} &middot; {group.name} &middot; 2026&ndash;27
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Semester 1
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {subjects.length} subjects &middot; {totalTopics} topics
          </p>
          <div className="mt-5 max-w-sm">
            <ProgressBar
              value={completedCount}
              max={totalTopics}
              label="Overall Progress"
              size="md"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
            All Subjects
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theorySubjects.map((subject, i) => {
            const totalTopicsCount = subject.units.reduce(
              (acc, u) => acc + u.topics.length,
              0
            );
            const subjectCompleted = subject.units
              .flatMap((u) => u.topics)
              .filter((t) => progress.completedTopics.includes(t.id)).length;
            const pct =
              totalTopicsCount > 0
                ? Math.round((subjectCompleted / totalTopicsCount) * 100)
                : 0;
            const colorClass = getSubjectColor(subject.id);

            return (
              <Link
                key={subject.id}
                href={`/btech/${branchId}/${groupId}/semester-1/${subject.id}`}
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
    </div>
  );
}

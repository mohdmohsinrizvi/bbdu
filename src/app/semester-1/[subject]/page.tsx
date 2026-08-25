"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { subjects } from "@/data/subjects";
import { labExperiments } from "@/data/labExperiments";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnitAccordion from "@/components/UnitCard";
import ExperimentRow from "@/components/ExperimentCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { getCategoryLabel } from "@/lib/utils";
import { trackSubjectView } from "@/lib/analytics";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const { progress } = useProgress();

  if (!subject) notFound();

  useEffect(() => {
    trackSubjectView(subject.name, subject.code);
  }, [subject.name, subject.code]);

  const experiments = labExperiments[subjectId] ?? [];
  const totalTopics = subject.units.reduce(
    (a, u) => a + u.topics.length,
    0
  );
  const completedTopics = subject.units
    .flatMap((u) => u.topics)
    .filter((t) => progress.completedTopics.includes(t.id)).length;
  const subjectIndex = subjects.findIndex((s) => s.id === subjectId);

  return (
    <div>
      {/* Header */}
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Semester 1", href: "/semester-1" },
              { label: subject.name },
            ]}
          />

          <div className="mt-6 flex items-start gap-6">
            <span className="editorial-number text-6xl sm:text-8xl">
              {String(subjectIndex + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                  {getCategoryLabel(subject.category)}
                </span>
                <span className="text-xs font-medium text-white/50">
                  {subject.code}
                </span>
                {subject.type === "lab" && (
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-white/70">
                    Lab
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {subject.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/60">
                <span className="font-semibold">
                  {subject.credits} Credits
                </span>
                <span>
                  {subject.lectureHours}L {subject.tutorialHours}T{" "}
                  {subject.practicalHours}P
                </span>
                {totalTopics > 0 && (
                  <span className="tabular-nums">
                    {completedTopics}/{totalTopics} topics completed
                  </span>
                )}
              </div>

              {totalTopics > 0 && (
                <div className="mt-4 max-w-sm">
                  <ProgressBar
                    value={completedTopics}
                    max={totalTopics}
                    size="sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {subject.objectives.length > 0 && (
          <ObjectivesSection objectives={subject.objectives} />
        )}

        {subject.outcomes.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Course Outcomes
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {subject.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-accent/8 text-[10px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <p className="text-[13px] leading-relaxed text-foreground">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {subject.type === "theory" && subject.units.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Course Content
            </h2>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              {subject.units.map((unit) => (
                <UnitAccordion
                  key={unit.id}
                  unit={unit}
                  subjectId={subjectId}
                  completedTopics={progress.completedTopics}
                />
              ))}
            </div>
          </section>
        )}

        {subject.type === "lab" && experiments.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Lab Experiments
            </h2>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              {experiments.map((exp, i) => (
                <ExperimentRow key={exp.id} experiment={exp} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ObjectivesSection({ objectives }: { objectives: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg"
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
          Course Objectives
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">
            {objectives.length} objectives
          </span>
          {open ? (
            <ChevronUp className="h-4 w-4 text-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted" />
          )}
        </div>
      </button>
      {open && (
        <div className="mt-2 grid gap-2 sm:grid-cols-2 animate-fade-in-up">
          {objectives.map((obj, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-accent/8 text-[10px] font-bold text-accent">
                {i + 1}
              </span>
              <p className="text-[13px] leading-relaxed text-foreground">
                {obj}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

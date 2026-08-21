"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { subjects } from "@/data/subjects";
import { labExperiments } from "@/data/labExperiments";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnitCard from "@/components/UnitCard";
import ExperimentCard from "@/components/ExperimentCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { getCategoryLabel } from "@/lib/utils";

export default function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const { progress } = useProgress();

  if (!subject) notFound();

  const experiments = labExperiments[subjectId] ?? [];
  const totalTopics = subject.units.reduce((a, u) => a + u.topics.length, 0);
  const completedTopics = subject.units
    .flatMap((u) => u.topics)
    .filter((t) => progress.completedTopics.includes(t.id)).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Semester 1", href: "/semester-1" },
          { label: subject.name },
        ]}
      />

      {/* Header */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-muted">
            {getCategoryLabel(subject.category)}
          </span>
          <span className="text-muted">&middot;</span>
          <span className="text-xs text-muted">{subject.code}</span>
          {subject.type === "lab" && (
            <>
              <span className="text-muted">&middot;</span>
              <span className="text-xs text-muted">Lab</span>
            </>
          )}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {subject.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
          <span>{subject.credits} Credits</span>
          <span>{subject.lectureHours}L {subject.tutorialHours}T {subject.practicalHours}P</span>
          {totalTopics > 0 && (
            <span>{completedTopics}/{totalTopics} topics completed</span>
          )}
        </div>

        {totalTopics > 0 && (
          <div className="mt-4 max-w-sm">
            <ProgressBar value={completedTopics} max={totalTopics} size="sm" />
          </div>
        )}
      </div>

      {/* Objectives */}
      {subject.objectives.length > 0 && <ObjectivesSection objectives={subject.objectives} />}

      {/* Outcomes */}
      {subject.outcomes.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Course Outcomes
          </h2>
          <div className="border-t border-border">
            {subject.outcomes.map((outcome, i) => (
              <div key={i} className="border-b border-border py-2">
                <p className="text-[13px] text-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Units (theory) */}
      {subject.type === "theory" && subject.units.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Course Content
          </h2>
          <div className="border-t border-border">
            {subject.units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                subjectId={subjectId}
                completedTopics={progress.completedTopics}
              />
            ))}
          </div>
        </section>
      )}

      {/* Experiments (lab) */}
      {subject.type === "lab" && experiments.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Lab Experiments
          </h2>
          <div className="border-t border-border">
            {experiments.map((exp, i) => (
              <ExperimentCard key={exp.id} experiment={exp} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ObjectivesSection({ objectives }: { objectives: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
      >
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
          Course Objectives
        </h2>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted" />
        )}
      </button>
      {open && (
        <div className="border-t border-border">
          {objectives.map((obj, i) => (
            <div key={i} className="border-b border-border py-2">
              <p className="text-[13px] text-foreground">{obj}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

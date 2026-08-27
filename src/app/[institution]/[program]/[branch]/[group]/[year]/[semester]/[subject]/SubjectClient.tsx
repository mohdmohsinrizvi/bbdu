"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getInstitution } from "@/data/institutions";
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
  params: Promise<{
    institution: string;
    program: string;
    branch: string;
    group: string;
    year: string;
    semester: string;
    subject: string;
  }>;
}) {
  const {
    institution: instId,
    program: progId,
    branch: branchId,
    group: groupId,
    year: yearId,
    semester: semId,
    subject: subjectId,
  } = use(params);
  const institution = getInstitution(instId);
  const subject = subjects.find((s) => s.id === subjectId);
  const { progress } = useProgress();

  if (!institution || !subject) notFound();

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

  const base = `/${instId}/${progId}/${branchId}/${groupId}/${yearId}/${semId}`;

  return (
    <div>
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: institution.shortName, href: `/` },
              {
                label: subject.name,
                href: `${base}`,
              },
              { label: subject.name },
            ]}
          />

          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                {getCategoryLabel(subject.category)}
              </span>
              <span className="text-xs font-medium text-muted">
                {subject.code}
              </span>
              {subject.type === "lab" && (
                <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase text-muted">
                  Lab
                </span>
              )}
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {subject.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
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
                  programId={progId}
                  branchId={branchId}
                  groupId={groupId}
                  yearId={yearId}
                  semesterId={semId}
                  institutionId={instId}
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

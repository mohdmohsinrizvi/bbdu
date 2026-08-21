"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { subjects } from "@/data/subjects";
import Breadcrumbs from "@/components/Breadcrumbs";
import TopicRow from "@/components/TopicCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { trackUnitView } from "@/lib/analytics";

export default function UnitPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject: subjectId, unit: unitId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const { progress } = useProgress();

  if (!subject || !unit) notFound();

  useEffect(() => {
    trackUnitView(subject.name, unit.title, unit.number);
  }, [subject.name, unit.title, unit.number]);

  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit =
    unitIndex < subject.units.length - 1
      ? subject.units[unitIndex + 1]
      : null;

  const completedCount = unit.topics.filter((t) =>
    progress.completedTopics.includes(t.id)
  ).length;

  return (
    <div>
      {/* Header */}
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Semester 1", href: "/semester-1" },
              {
                label: subject.name,
                href: `/semester-1/${subjectId}`,
              },
              { label: unit.title },
            ]}
          />

          <div className="mt-6 flex items-start gap-6">
            <span className="editorial-number text-6xl sm:text-8xl">
              {String(unit.number).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 pt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                Unit {String(unit.number).padStart(2, "0")} &middot;{" "}
                {subject.name}
              </p>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {unit.title}
              </h1>

              {unit.description && (
                <p className="mt-2 max-w-2xl text-sm text-white/60 leading-relaxed">
                  {unit.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/60">
                <span className="font-semibold">
                  {unit.contactHours} contact hours
                </span>
                <span className="tabular-nums">
                  {completedCount}/{unit.topics.length} topics
                </span>
                {unit.mappedCO.length > 0 && (
                  <span className="flex flex-wrap items-center gap-1">
                    Maps to:{" "}
                    {unit.mappedCO.map((co) => (
                      <span
                        key={co}
                        className="rounded-md border border-white/20 px-1.5 py-px text-[10px] font-bold text-white/70"
                      >
                        {co}
                      </span>
                    ))}
                  </span>
                )}
              </div>

              <div className="mt-4 max-w-sm">
                <ProgressBar
                  value={completedCount}
                  max={unit.topics.length}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
            Topics
          </h2>
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            {unit.topics.map((topic, i) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                subjectId={subjectId}
                unitId={unitId}
                index={i}
              />
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-6">
          {prevUnit ? (
            <Link
              href={`/semester-1/${subjectId}/${prevUnit.id}`}
              className="group flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-0.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous
                </div>
                <div className="text-[13px] font-semibold text-foreground group-hover:text-accent transition-colors">
                  {prevUnit.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextUnit ? (
            <Link
              href={`/semester-1/${subjectId}/${nextUnit.id}`}
              className="group flex items-center gap-3"
            >
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next
                </div>
                <div className="text-[13px] font-semibold text-foreground group-hover:text-accent transition-colors">
                  {nextUnit.title}
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

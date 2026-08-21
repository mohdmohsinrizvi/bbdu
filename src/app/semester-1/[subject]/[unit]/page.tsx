"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { subjects } from "@/data/subjects";
import Breadcrumbs from "@/components/Breadcrumbs";
import TopicCard from "@/components/TopicCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";

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

  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit = unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

  const completedCount = unit.topics.filter((t) => progress.completedTopics.includes(t.id)).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Semester 1", href: "/semester-1" },
          { label: subject.name, href: `/semester-1/${subjectId}` },
          { label: unit.title },
        ]}
      />

      {/* Header */}
      <div className="mt-6 mb-8">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs font-medium text-muted tabular-nums">
            Unit {String(unit.number).padStart(2, "0")}
          </span>
          <span className="text-muted">&middot;</span>
          <span className="text-xs text-muted">{subject.name}</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {unit.title}
        </h1>

        <p className="mt-2 text-[13px] text-muted">
          {unit.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>{unit.contactHours} contact hours</span>
          <span>{completedCount}/{unit.topics.length} topics completed</span>
          {unit.mappedCO.length > 0 && (
            <span className="flex flex-wrap items-center gap-1">
              Maps to:{" "}
              {unit.mappedCO.map((co) => (
                <span
                  key={co}
                  className="rounded border border-border px-1 py-px text-[10px] font-medium text-muted"
                >
                  {co}
                </span>
              ))}
            </span>
          )}
        </div>

        <div className="mt-4 max-w-sm">
          <ProgressBar value={completedCount} max={unit.topics.length} size="sm" />
        </div>
      </div>

      {/* Topics */}
      <section className="mb-10">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
          Topics
        </h2>
        <div className="border-t border-border">
          {unit.topics.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              subjectId={subjectId}
              unitId={unitId}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        {prevUnit ? (
          <Link
            href={`/semester-1/${subjectId}/${prevUnit.id}`}
            className="group flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-0.5" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-muted">Previous</div>
              <div className="text-[13px] font-medium text-foreground">{prevUnit.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextUnit ? (
          <Link
            href={`/semester-1/${subjectId}/${nextUnit.id}`}
            className="group flex items-center gap-2"
          >
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-muted">Next</div>
              <div className="text-[13px] font-medium text-foreground">{nextUnit.title}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

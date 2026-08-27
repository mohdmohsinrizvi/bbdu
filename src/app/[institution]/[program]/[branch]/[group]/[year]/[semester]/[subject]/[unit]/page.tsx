"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getInstitution } from "@/data/institutions";
import { subjects } from "@/data/subjects";
import Breadcrumbs from "@/components/Breadcrumbs";
import TopicRow from "@/components/TopicCard";

export default function UnitPage({
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
    unit: string;
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
    unit: unitId,
  } = use(params);
  const institution = getInstitution(instId);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);

  if (!institution || !subject || !unit) notFound();

  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit =
    unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

  const base = `/${instId}/${progId}/${branchId}/${groupId}/${yearId}/${semId}`;

  return (
    <div>
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              {
                label: subject.name,
                href: `${base}/${subjectId}`,
              },
              { label: unit.title },
            ]}
          />

          <div className="mt-5">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Unit {String(unit.number).padStart(2, "0")}
            </span>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {unit.title}
            </h1>

            {unit.description && (
              <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">
                {unit.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            {unit.topics.length} Topics
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          {unit.topics.map((topic, i) => (
            <TopicRow
              key={topic.id}
              topic={topic}
              subjectId={subjectId}
              unitId={unitId}
              index={i}
              branchId={branchId}
              groupId={groupId}
              institutionId={instId}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          {prevUnit ? (
            <Link
              href={`${base}/${subjectId}/${prevUnit.id}`}
              className="group flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-0.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous Unit
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
              href={`${base}/${subjectId}/${nextUnit.id}`}
              className="group flex items-center gap-3"
            >
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Unit
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

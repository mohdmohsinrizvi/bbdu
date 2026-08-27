"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getInstitution, getInstitutionBranch, getInstitutionGroup } from "@/data/institutions";
import { subjects } from "@/data/subjects";
import Breadcrumbs from "@/components/Breadcrumbs";
import TopicRow from "@/components/TopicCard";

export default function InstitutionUnitPage({
  params,
}: {
  params: Promise<{
    institution: string;
    branch: string;
    group: string;
    subject: string;
    unit: string;
  }>;
}) {
  const {
    institution: instId,
    branch: branchId,
    group: groupId,
    subject: subjectId,
    unit: unitId,
  } = use(params);
  const institution = getInstitution(instId);
  const instBranch = getInstitutionBranch(instId, branchId);
  const instGroup = getInstitutionGroup(instId, branchId, groupId);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);

  if (!institution || !instBranch || !instGroup || !subject || !unit) notFound();

  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit =
    unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

  const base = `/${instId}/btech/${branchId}/${groupId}/semester-1`;

  return (
    <div>
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
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
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Unit {String(unit.number).padStart(2, "0")}
            </span>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {unit.title}
            </h1>

            {unit.description && (
              <p className="mt-2 max-w-2xl text-sm text-white/60 leading-relaxed">
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

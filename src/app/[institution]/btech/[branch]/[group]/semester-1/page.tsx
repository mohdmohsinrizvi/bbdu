"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  getInstitution,
  getInstitutionBranch,
  getInstitutionGroup,
} from "@/data/institutions";
import { getSubjectsForInstitutionGroup } from "@/lib/branchUtils";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubjectCard from "@/components/SubjectCard";

export default function InstitutionSemesterPage({
  params,
}: {
  params: Promise<{
    institution: string;
    branch: string;
    group: string;
  }>;
}) {
  const { institution: instId, branch: branchId, group: groupId } = use(params);
  const institution = getInstitution(instId);
  const instBranch = getInstitutionBranch(instId, branchId);
  const instGroup = getInstitutionGroup(instId, branchId, groupId);

  if (!institution || !instBranch || !instGroup) notFound();

  const groupSubjects = getSubjectsForInstitutionGroup(
    instId,
    branchId,
    groupId
  );

  const theorySubjects = groupSubjects.filter((s) => s.type === "theory");
  const labSubjects = groupSubjects.filter((s) => s.type === "lab");

  return (
    <div>
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: institution.shortName, href: `/` },
              { label: instBranch.shortName, href: `/` },
              { label: instGroup.name },
            ]}
          />

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70"
                style={{ backgroundColor: `${institution.color}33` }}
              >
                {institution.shortName}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {instBranch.name}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {instGroup.name} &middot; Semester 1 &middot;{" "}
              {groupSubjects.length} subjects
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {theorySubjects.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Theory Subjects
            </h2>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              {theorySubjects.map((subject, i) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={i}
                  branchId={branchId}
                  groupId={groupId}
                  institutionId={instId}
                />
              ))}
            </div>
          </section>
        )}

        {labSubjects.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Lab Subjects
            </h2>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              {labSubjects.map((subject, i) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={i}
                  branchId={branchId}
                  groupId={groupId}
                  institutionId={instId}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

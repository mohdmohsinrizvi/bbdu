"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { getBranch } from "@/data/branches";
import { subjects } from "@/data/subjects";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubjectCard from "@/components/SubjectCard";

export default function BranchSemesterPage({
  params,
}: {
  params: Promise<{ branch: string; group: string }>;
}) {
  const { branch: branchId, group: groupId } = use(params);
  const branch = getBranch(branchId);
  const group = branch?.groups.find((g) => g.id === groupId);

  if (!branch || !group) notFound();

  const groupSubjects = subjects.filter((s) =>
    group.subjects.includes(s.id)
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
              { label: "Home", href: "/select" },
              { label: branch.shortName, href: "/select" },
              { label: group.name },
            ]}
          />

          <div className="mt-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {branch.name}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {group.name} &middot; Semester 1 &middot; {groupSubjects.length} subjects
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
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  getInstitution,
  getProgram,
  getBranch,
  getGroup,
  getYear,
} from "@/data/institutions";
import { getSubjects } from "@/lib/branchUtils";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubjectCard from "@/components/SubjectCard";

export default function SemesterPage({
  params,
}: {
  params: Promise<{
    institution: string;
    program: string;
    branch: string;
    group: string;
    year: string;
    semester: string;
  }>;
}) {
  const { institution: instId, program: progId, branch: branchId, group: groupId, year: yearId, semester: semId } = use(params);
  const institution = getInstitution(instId);
  const program = getProgram(instId, progId);
  const branch = getBranch(instId, progId, branchId);
  const group = getGroup(instId, progId, branchId, groupId);
  const year = getYear(instId, progId, branchId, groupId, yearId);

  if (!institution || !program || !branch || !group || !year) notFound();

  const semester = year.semesters.find((s) => s.id === semId);
  if (!semester) notFound();

  const semSubjects = getSubjects(instId, progId, branchId, groupId, yearId, semId);
  const theorySubjects = semSubjects.filter((s) => s.type === "theory");
  const labSubjects = semSubjects.filter((s) => s.type === "lab");

  return (
    <div>
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: institution.shortName, href: `/` },
              { label: branch.shortName, href: `/` },
              { label: group.name, href: `/` },
              { label: year.label, href: `/` },
              { label: semester.label },
            ]}
          />

          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                {institution.shortName}
              </span>
              <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                {year.label}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {branch.name}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {group.name} &middot; {semester.label} &middot;{" "}
              {semSubjects.length} subjects
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

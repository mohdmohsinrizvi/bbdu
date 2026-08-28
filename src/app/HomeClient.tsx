"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Play, Settings } from "lucide-react";
import { useAcademic } from "@/lib/AcademicContext";
import { getSubjects } from "@/lib/branchUtils";
import { getInstitution, getBranch, getGroup, getYear } from "@/data/institutions";
import { useProgress } from "@/hooks/useProgress";
import { trackContinueLearning } from "@/lib/analytics";
import { getSubjectColor } from "@/lib/constants";
import InstallSection from "@/components/InstallSection";
import { bbduSubjects } from "@/data/subjects";
import { bbniitSubjects } from "@/data/bbniit/subjects";

function HomeContent() {
  const { profile, isSetup } = useAcademic();
  const { progress } = useProgress();

  if (!isSetup || !profile) {
    return <LandingView />;
  }

  return <StudyHubView profile={profile} progress={progress} />;
}

function LandingView() {
  return (
    <div>
      {/* Hero — luxury editorial */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(176,138,90,0.06),transparent)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
              BBD Study Hub
            </p>
            <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Study with clarity.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
              Academic syllabus, curated lectures, and progress tracking for B.Tech students at BBD institutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-[13px] font-semibold text-background transition-all hover:bg-accent-hover"
              >
                Set up your study space
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Institution selection */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted mb-8">
            Where are you studying?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/onboarding"
              className="group relative border-b border-border py-6 transition-all hover:border-accent/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                    BBD University
                  </h3>
                  <p className="mt-1 text-xs text-muted">BBDU</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">
                    University curriculum — B.Tech CSE first year with {bbduSubjects.length} subjects across theory and labs.
                  </p>
                </div>
                <span className="text-lg text-border-strong transition-all group-hover:text-accent group-hover:translate-x-1 mt-1">
                  &rarr;
                </span>
              </div>
            </Link>

            <Link
              href="/onboarding"
              className="group relative border-b border-border py-6 transition-all hover:border-accent/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                    BBDNIIT
                  </h3>
                  <p className="mt-1 text-xs text-muted">AKTU Curriculum</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">
                    AKTU syllabus — B.Tech CSE first year with {bbniitSubjects.length} subjects following the latest AKTU structure.
                  </p>
                </div>
                <span className="text-lg text-border-strong transition-all group-hover:text-accent group-hover:translate-x-1 mt-1">
                  &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <InstallSection />

      <section className="border-t border-border py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs text-muted">
            Student-built learning resource. Always verify academic information with official sources.
          </p>
        </div>
      </section>
    </div>
  );
}

function StudyHubView({
  profile,
  progress,
}: {
  profile: { institutionId: string; programId: string; branchId: string; groupId: string; yearId: string; semesterId: string };
  progress: { completedTopics: string[]; startedSubjects: string[] };
}) {
  const institution = getInstitution(profile.institutionId);
  const branch = getBranch(profile.institutionId, profile.programId, profile.branchId);
  const group = getGroup(profile.institutionId, profile.programId, profile.branchId, profile.groupId);
  const year = getYear(profile.institutionId, profile.programId, profile.branchId, profile.groupId, profile.yearId);
  const semester = year?.semesters.find((s) => s.id === profile.semesterId);

  const semSubjects = getSubjects(
    profile.institutionId,
    profile.programId,
    profile.branchId,
    profile.groupId,
    profile.yearId,
    profile.semesterId,
  );

  const allTopics = semSubjects.flatMap((s) => s.units.flatMap((u) => u.topics));
  const totalTopics = allTopics.length;
  const completedCount = progress.completedTopics.length;

  // Continue learning
  const continueSubject = progress.startedSubjects.length > 0
    ? semSubjects.find((s) => s.id === progress.startedSubjects[progress.startedSubjects.length - 1])
    : null;

  const continueUnit = continueSubject?.units.find((u) =>
    u.topics.some((t) => !progress.completedTopics.includes(t.id))
  );

  const continueTopic = continueUnit?.topics.find(
    (t) => !progress.completedTopics.includes(t.id)
  );

  const continuePercent = continueSubject
    ? (() => {
        const total = continueSubject.units.reduce((a, u) => a + u.topics.length, 0);
        const done = continueSubject.units
          .flatMap((u) => u.topics)
          .filter((t) => progress.completedTopics.includes(t.id)).length;
        return total > 0 ? Math.round((done / total) * 100) : 0;
      })()
    : 0;

  const prefix = `/${profile.institutionId}/${profile.programId}/${profile.branchId}/${profile.groupId}/${profile.yearId}/${profile.semesterId}`;

  return (
    <div>
      {/* Hero — editorial dashboard header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(176,138,90,0.04),transparent)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                  {institution?.shortName}
                </span>
                <span className="text-border">&middot;</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                  {year?.label}
                </span>
                <span className="text-border">&middot;</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                  {semester?.label}
                </span>
              </div>
              <h1 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Study Hub
              </h1>
              <p className="mt-1.5 text-sm text-muted">
                {branch?.name} &middot; {group?.name}
              </p>
            </div>
            <Link
              href="/onboarding"
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted transition-all hover:border-accent/30 hover:text-foreground"
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Change</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      {completedCount > 0 && continueSubject && continueTopic && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
              Continue Learning
            </p>
            <Link
              href={`${prefix}/${continueSubject.id}/${continueUnit?.id}/${continueTopic.id}`}
              onClick={() => trackContinueLearning(continueSubject.name, continueUnit?.title || "", continueTopic.title)}
              className="group block border-b border-border py-4 transition-all hover:border-accent/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      {continueSubject.code}
                    </span>
                  </div>
                  <p className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                    {continueUnit?.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Next: {continueTopic.title}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-display font-semibold tabular-nums text-accent">
                      {continuePercent}%
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                      Complete
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-all group-hover:bg-accent/20">
                    <Play className="ml-0.5 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="px-4 py-4">
              <p className="text-lg font-display font-semibold tabular-nums text-foreground">{semSubjects.length}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">Subjects</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-lg font-display font-semibold tabular-nums text-foreground">{totalTopics}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">Topics</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-lg font-display font-semibold tabular-nums text-accent">{completedCount}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
            Subjects
          </p>
          <div className="border border-border overflow-hidden">
            {semSubjects.map((subject, i) => {
              const totalTopicsCount = subject.units.reduce(
                (acc, u) => acc + u.topics.length,
                0
              );
              const subjectCompleted = subject.units
                .flatMap((u) => u.topics)
                .filter((t) => progress.completedTopics.includes(t.id))
                .length;
              const pct =
                totalTopicsCount > 0
                  ? Math.round((subjectCompleted / totalTopicsCount) * 100)
                  : 0;
              const colorClass = getSubjectColor(subject.id);

              return (
                <Link
                  key={subject.id}
                  href={`${prefix}/${subject.id}`}
                  className={`group ${colorClass} relative flex items-center gap-4 border-b border-border py-4 transition-all hover:bg-surface-hover/50 -mx-px px-4 last:border-b-0`}
                >
                  <div className="subject-accent-bar absolute left-0 top-0 h-full" />
                  <span className="w-10 flex-shrink-0 text-right text-lg font-display font-semibold tabular-nums text-border-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 pl-2">
                    <span className="truncate text-[15px] font-medium text-foreground group-hover:text-accent transition-colors">
                      {subject.name}
                    </span>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                      <span className="font-medium">{subject.code}</span>
                      {subject.type === "lab" && (
                        <span className="rounded-md border border-border px-1.5 py-px text-[10px] font-semibold uppercase text-muted">
                          Lab
                        </span>
                      )}
                      {subject.type === "theory" && (
                        <>
                          <span className="text-border">&middot;</span>
                          <span>{subject.credits} Credits</span>
                          <span className="text-border">&middot;</span>
                          <span>{subject.units.length} Units</span>
                          {totalTopicsCount > 0 && (
                            <>
                              <span className="text-border">&middot;</span>
                              <span className="tabular-nums">
                                {subjectCompleted}/{totalTopicsCount}
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    {totalTopicsCount > 0 && (
                      <div className="mt-2 h-px max-w-[200px] overflow-hidden bg-border">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-lg text-border-strong transition-all group-hover:text-accent group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <InstallSection />

      <section className="border-t border-border py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs text-muted">
            Student-built learning resource. Always verify academic information with official sources.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}

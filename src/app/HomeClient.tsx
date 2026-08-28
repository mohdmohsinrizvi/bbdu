"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Play, Settings, BookOpen } from "lucide-react";
import { useAcademic } from "@/lib/AcademicContext";
import { getSubjects } from "@/lib/branchUtils";
import { getInstitution, getBranch, getGroup, getYear } from "@/data/institutions";
import { useProgress } from "@/hooks/useProgress";
import { trackContinueLearning } from "@/lib/analytics";
import { getSubjectColor } from "@/lib/constants";
import InstallSection from "@/components/InstallSection";
import ContributorsSection from "@/components/ContributorsSection";

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
      {/* Hero — editorial, not marketing */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Study Hub
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted max-w-lg">
              Academic syllabus, curated lectures, and progress tracking for B.Tech students at BBD institutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition-all hover:opacity-90"
              >
                Set up your study space
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Institution cards */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">
            Institutions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/onboarding"
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-foreground/20 hover:bg-surface-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover">
                  <BookOpen className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                    BBD University
                  </h3>
                  <p className="text-xs text-muted">BBDU</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                University curriculum — B.Tech CSE first year with 11 subjects across theory and labs.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">
                Get started
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>

            <Link
              href="/onboarding"
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-foreground/20 hover:bg-surface-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover">
                  <BookOpen className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                    BBDNIIT
                  </h3>
                  <p className="text-xs text-muted">AKTU Curriculum</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                AKTU syllabus — B.Tech CSE first year with 12 subjects following the latest AKTU structure.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">
                Get started
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <InstallSection />

      <ContributorsSection />

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
      {/* Hero — minimal */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  {institution?.shortName}
                </span>
                <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  {year?.label}
                </span>
                <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  {semester?.label}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Study Hub
              </h1>
              <p className="mt-1 text-sm text-muted">
                {branch?.name} &middot; {group?.name}
              </p>
            </div>
            <Link
              href="/onboarding"
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-all hover:border-foreground/20 hover:text-foreground"
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
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
              Continue Learning
            </h2>
            <Link
              href={`${prefix}/${continueSubject.id}/${continueUnit?.id}/${continueTopic.id}`}
              onClick={() => trackContinueLearning(continueSubject.name, continueUnit?.title || "", continueTopic.title)}
              className="group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-foreground/20 hover:bg-surface-hover"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      {continueSubject.code}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {continueUnit?.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Next: {continueTopic.title}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-extrabold tabular-nums text-accent">
                      {continuePercent}%
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                      Complete
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:scale-110">
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
              <p className="text-lg font-bold tabular-nums text-foreground">{semSubjects.length}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Subjects</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-lg font-bold tabular-nums text-foreground">{totalTopics}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Topics</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-lg font-bold tabular-nums text-accent">{completedCount}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-muted">
            Subjects
          </h2>
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
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
                  className={`group ${colorClass} relative flex items-center gap-4 border-b border-border py-4 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6 last:border-b-0`}
                >
                  <div className="subject-accent-bar absolute left-0 top-0 h-full" />
                  <span className="w-10 flex-shrink-0 text-right text-2xl font-extrabold tabular-nums text-border-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 pl-2">
                    <span className="truncate text-[15px] font-bold text-foreground group-hover:text-accent transition-colors">
                      {subject.name}
                    </span>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                      <span className="font-medium">{subject.code}</span>
                      {subject.type === "lab" && (
                        <span className="rounded-md border border-border px-1.5 py-px text-[10px] font-bold uppercase text-muted">
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
                      <div className="mt-2 h-1 max-w-[200px] overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-500"
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

      <ContributorsSection />

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

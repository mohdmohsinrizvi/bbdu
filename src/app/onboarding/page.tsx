"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, ArrowLeft } from "lucide-react";
import {
  institutions,
  type AcademicInstitution,
  type AcademicProgram,
  type AcademicBranch,
  type AcademicGroup,
  type AcademicYear,
  type AcademicSemester,
} from "@/data/institutions";
import { useAcademic } from "@/lib/AcademicContext";
import { cn } from "@/lib/utils";
import {
  trackInstitutionSelected,
  trackCourseSelected,
  trackBranchSelected,
  trackYearSelected,
  trackSemesterSelected,
  trackAcademicProfileComplete,
} from "@/lib/analytics";

type Step = "institution" | "program" | "branch" | "group" | "year" | "semester";

const stepLabels: Record<Step, string> = {
  institution: "Select your college",
  program: "What are you studying?",
  branch: "Choose your branch",
  group: "Choose your group",
  year: "Which year are you in?",
  semester: "Choose semester",
};

export default function OnboardingPage() {
  const router = useRouter();
  const { setProfile } = useAcademic();

  const [step, setStep] = useState<Step>("institution");
  const [institution, setInstitution] = useState<AcademicInstitution | null>(null);
  const [program, setProgram] = useState<AcademicProgram | null>(null);
  const [branch, setBranch] = useState<AcademicBranch | null>(null);
  const [group, setGroup] = useState<AcademicGroup | null>(null);
  const [year, setYear] = useState<AcademicYear | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goNext = (next: Step) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
    }, 200);
  };

  const goBack = () => {
    setTransitioning(true);
    setTimeout(() => {
      if (step === "program") { setStep("institution"); setProgram(null); }
      else if (step === "branch") { setStep("program"); setBranch(null); }
      else if (step === "group") { setStep("branch"); setGroup(null); }
      else if (step === "year") { setStep("group"); setYear(null); }
      else if (step === "semester") { setStep("year"); }
      setTransitioning(false);
    }, 200);
  };

  const skipIfOnly = (inst: AcademicInstitution, prog: AcademicProgram, br: AcademicBranch, grp: AcademicGroup, yr: AcademicYear) => {
    if (yr.semesters.length === 1) {
      trackSemesterSelected(yr.semesters[0].id);
      finish(yr.semesters[0], inst, prog, br, grp, yr);
      return true;
    }
    return false;
  };

  const handleInstitution = (inst: AcademicInstitution) => {
    setInstitution(inst);
    trackInstitutionSelected(inst.id);
    if (inst.programs.length === 1) {
      setProgram(inst.programs[0]);
      trackCourseSelected(inst.programs[0].id);
      if (inst.programs[0].branches.length === 1) {
        setBranch(inst.programs[0].branches[0]);
        trackBranchSelected(inst.programs[0].branches[0].id);
        if (inst.programs[0].branches[0].groups.length === 1) {
          setGroup(inst.programs[0].branches[0].groups[0]);
          goNext("year");
          return;
        }
        goNext("group");
        return;
      }
      goNext("branch");
      return;
    }
    goNext("program");
  };

  const handleProgram = (p: AcademicProgram) => {
    setProgram(p);
    trackCourseSelected(p.id);
    if (p.branches.length === 1) {
      setBranch(p.branches[0]);
      trackBranchSelected(p.branches[0].id);
      if (p.branches[0].groups.length === 1) {
        setGroup(p.branches[0].groups[0]);
        goNext("year");
        return;
      }
      goNext("group");
      return;
    }
    goNext("branch");
  };

  const handleBranch = (b: AcademicBranch) => {
    setBranch(b);
    trackBranchSelected(b.id);
    if (b.groups.length === 1) {
      setGroup(b.groups[0]);
      goNext("year");
      return;
    }
    goNext("group");
  };

  const handleGroup = (g: AcademicGroup) => {
    setGroup(g);
    goNext("year");
  };

  const handleYear = (y: AcademicYear) => {
    setYear(y);
    trackYearSelected(y.id);
    if (!institution || !program || !branch || !group) return;
    if (!skipIfOnly(institution, program, branch, group, y)) {
      goNext("semester");
    }
  };

  const handleSemester = (s: AcademicSemester) => {
    trackSemesterSelected(s.id);
    finish(s);
  };

  const finish = (
    s: AcademicSemester,
    inst?: AcademicInstitution | null,
    prog?: AcademicProgram | null,
    br?: AcademicBranch | null,
    grp?: AcademicGroup | null,
    yr?: AcademicYear | null,
  ) => {
    const i = inst ?? institution;
    const p = prog ?? program;
    const b = br ?? branch;
    const g = grp ?? group;
    const y = yr ?? year;
    if (!i || !p || !b || !g || !y) return;
    trackAcademicProfileComplete(i.id, p.id, b.id, y.id, s.id);
    setProfile({
      institutionId: i.id,
      programId: p.id,
      branchId: b.id,
      groupId: g.id,
      yearId: y.id,
      semesterId: s.id,
    });
    router.push(`/${i.id}/${p.id}/${b.id}/${g.id}/${y.id}/${s.id}`);
  };

  const canGoBack = step !== "institution";

  const totalSteps = 6;
  const stepNum: Record<Step, number> = {
    institution: 1, program: 2, branch: 3, group: 4, year: 5, semester: 6,
  };

  const options = (() => {
    switch (step) {
      case "institution":
        return institutions.map((i) => ({
          id: i.id,
          label: i.name,
          sub: i.description,
          onClick: () => handleInstitution(i),
        }));
      case "program":
        return (institution?.programs ?? []).map((p) => ({
          id: p.id,
          label: p.name,
          sub: `${p.branches.length} branch${p.branches.length > 1 ? "es" : ""}`,
          onClick: () => handleProgram(p),
        }));
      case "branch":
        return (program?.branches ?? []).map((b) => ({
          id: b.id,
          label: b.name,
          sub: b.shortName,
          onClick: () => handleBranch(b),
        }));
      case "group":
        return (branch?.groups ?? []).map((g) => ({
          id: g.id,
          label: g.name,
          sub: `${g.years.length} year${g.years.length > 1 ? "s" : ""}`,
          onClick: () => handleGroup(g),
        }));
      case "year":
        return (group?.years ?? []).map((y) => ({
          id: y.id,
          label: y.label,
          sub: `${y.semesters.length} semester${y.semesters.length > 1 ? "s" : ""}`,
          onClick: () => handleYear(y),
        }));
      case "semester":
        return (year?.semesters ?? []).map((s) => ({
          id: s.id,
          label: s.label,
          sub: `${s.subjects.length} subjects`,
          onClick: () => handleSemester(s),
        }));
    }
  })();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left side — branding */}
          <div className="lg:sticky lg:top-20 lg:w-2/5">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                BBD Study Hub
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s set up your
              <br />
              study space.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Choose your academic details to see the syllabus and resources that match you.
            </p>

            {/* Progress dots */}
            <div className="mt-8 flex items-center gap-2">
              {(["institution", "program", "branch", "group", "year", "semester"] as Step[]).map(
                (s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors duration-300",
                        stepNum[step] > i + 1
                          ? "bg-foreground"
                          : stepNum[step] === i + 1
                          ? "bg-foreground"
                          : "bg-border"
                      )}
                    />
                    {i < 5 && (
                      <div
                        className={cn(
                          "h-px w-6 transition-colors duration-300",
                          stepNum[step] > i + 1 ? "bg-foreground" : "bg-border"
                        )}
                      />
                    )}
                  </div>
                )
              )}
            </div>

            {canGoBack && (
              <button
                onClick={goBack}
                className="mt-6 flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </div>

          {/* Right side — selection */}
          <div className="flex-1 lg:w-3/5">
            {canGoBack && (
              <button
                onClick={goBack}
                className="mb-6 hidden items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground lg:flex"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Step {stepNum[step]} of {totalSteps}
              </span>
              <h2 className="mt-1 text-xl font-extrabold text-foreground">
                {stepLabels[step]}
              </h2>
            </div>

            <div
              className={cn(
                "space-y-3 transition-opacity duration-200",
                transitioning ? "opacity-0" : "opacity-100"
              )}
            >
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={opt.onClick}
                  className="group flex w-full items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-left transition-all hover:border-foreground/20 hover:bg-surface-hover"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      {opt.label}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{opt.sub}</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-all group-hover:border-foreground/20 group-hover:text-foreground">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              ))}
            </div>

            {step === "semester" && institution && program && branch && group && year && (
              <div className="mt-8 rounded-xl border border-border bg-surface p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  Your study space
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground">
                  <span className="font-semibold">{institution.shortName}</span>
                  <span className="text-muted">&middot;</span>
                  <span>{program.name} {branch.shortName}</span>
                  <span className="text-muted">&middot;</span>
                  <span>{group.name}</span>
                  <span className="text-muted">&middot;</span>
                  <span>{year.label}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

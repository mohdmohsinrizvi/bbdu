"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, Layers } from "lucide-react";
import { branches } from "@/data/branches";
import { subjects } from "@/data/subjects";

export default function SelectPage() {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const branch = branches.find((b) => b.id === selectedBranch);

  const handleSelect = (branchId: string, groupId: string) => {
    localStorage.setItem("bbdu-branch", branchId);
    localStorage.setItem("bbdu-group", groupId);
    router.push(`/btech/${branchId}/${groupId}/semester-1`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 text-center stagger-children">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            B.Tech Study Hub
          </h1>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            BBD University &middot; 2026&ndash;27
            <br />
            Choose your branch and group to get started
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Step 1: Branch */}
        <div className="animate-fade-in-up">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-[13px] font-bold text-white">
              1
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-foreground">
                Select Your Branch
              </h2>
              <p className="text-xs text-muted">
                B.Tech 1st Year &middot; 2026&ndash;27
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBranch(b.id)}
                className={`group relative rounded-xl border p-5 text-left transition-all ${
                  selectedBranch === b.id
                    ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                    : "border-border bg-surface hover:border-accent/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                      {b.shortName}
                    </span>
                    <h3 className="mt-2 text-sm font-bold text-foreground">
                      {b.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted">{b.description}</p>
                  </div>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                      selectedBranch === b.id
                        ? "border-accent bg-accent text-white"
                        : "border-border group-hover:border-accent/50"
                    }`}
                  >
                    {selectedBranch === b.id && (
                      <span className="text-[10px] font-bold">&#10003;</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Group */}
        {branch && (
          <div className="mt-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-[13px] font-bold text-white">
                2
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-foreground">
                  Select Your Group
                </h2>
                <p className="text-xs text-muted">
                  {branch.shortName} &middot; Semester 1
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {branch.groups.map((g) => {
                const theorySubjects = g.subjects
                  .map((sId) => subjects.find((s) => s.id === sId))
                  .filter(Boolean);
                return (
                  <button
                    key={g.id}
                    onClick={() => handleSelect(branch.id, g.id)}
                    className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 text-left transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                            <Layers className="h-5 w-5" />
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                          {g.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted leading-relaxed">
                          {g.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {theorySubjects.slice(0, 4).map((subj) => (
                            <span
                              key={subj!.id}
                              className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold text-muted"
                            >
                              {subj!.name.length > 20
                                ? subj!.name.slice(0, 20) + "..."
                                : subj!.name}
                            </span>
                          ))}
                          {g.subjects.length > 4 && (
                            <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold text-muted">
                              +{g.subjects.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-all group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

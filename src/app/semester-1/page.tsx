"use client";

import { useState } from "react";
import { subjects } from "@/data/subjects";
import SubjectCard from "@/components/SubjectCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type FilterType = "all" | "common" | "group1" | "theory" | "lab";
type SortType = "name" | "credits" | "code";

function getFilteredSubjects(filter: FilterType) {
  switch (filter) {
    case "common":
      return subjects.filter((s) => s.category === "BSC");
    case "group1":
      return subjects.filter((s) => s.category === "ESC" || s.category === "GP");
    case "theory":
      return subjects.filter((s) => s.type === "theory");
    case "lab":
      return subjects.filter((s) => s.type === "lab");
    default:
      return subjects;
  }
}

function sortSubjects(list: typeof subjects, sort: SortType) {
  const copy = [...list];
  switch (sort) {
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "credits":
      return copy.sort((a, b) => b.credits - a.credits);
    case "code":
      return copy.sort((a, b) => a.code.localeCompare(b.code));
    default:
      return copy;
  }
}

export default function SemesterPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("name");
  const { progress } = useProgress();

  const filtered = sortSubjects(getFilteredSubjects(filter), sort);
  const totalTopics = subjects.reduce(
    (acc, s) => acc + s.units.reduce((a, u) => a + u.topics.length, 0),
    0
  );
  const completedCount = progress.completedTopics.length;

  return (
    <div>
      {/* Header */}
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            B.Tech CSE &middot; 2026&ndash;27 &middot; Group 1 / Group A
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Semester 1
          </h1>
          <div className="mt-4 max-w-sm">
            <ProgressBar
              value={completedCount}
              max={totalTopics}
              label="Overall Progress"
              size="md"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {(
              ["all", "common", "group1", "theory", "lab"] as FilterType[]
            ).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                  filter === f
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                )}
              >
                {f === "all"
                  ? "All"
                  : f === "common"
                    ? "Common"
                    : f === "group1"
                      ? "Group 1"
                      : f === "theory"
                        ? "Theory"
                        : "Lab"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {(["name", "credits", "code"] as SortType[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                  sort === s
                    ? "text-foreground bg-surface-hover"
                    : "text-muted hover:text-foreground"
                )}
              >
                {s === "name" ? "A-Z" : s === "credits" ? "Credits" : "Code"}
              </button>
            ))}
          </div>
        </div>

        <div id="subjects">
          {filtered.map((subject, i) => (
            <SubjectCard key={subject.id} subject={subject} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-muted">
              No subjects found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

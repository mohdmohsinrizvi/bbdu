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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Semester 1
        </h1>
        <p className="mt-1 text-sm text-muted">
          B.Tech CSE &middot; 2026&ndash;27 &middot; Group 1 / Group A
        </p>

        <div className="mt-5 max-w-sm">
          <ProgressBar
            value={completedCount}
            max={totalTopics}
            label="Overall Progress"
            size="md"
          />
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1">
          {(["all", "common", "group1", "theory", "lab"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                filter === f
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              {f === "all" ? "All" : f === "common" ? "Common" : f === "group1" ? "Group 1" : f === "theory" ? "Theory" : "Lab"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {(["name", "credits", "code"] as SortType[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                sort === s
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {s === "name" ? "A-Z" : s === "credits" ? "Credits" : "Code"}
            </button>
          ))}
        </div>
      </div>

      {/* Subject List */}
      <div className="border-t border-border" id="subjects">
        {filtered.map((subject, i) => (
          <SubjectCard key={subject.id} subject={subject} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No subjects found for this filter.
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Filter, ArrowUpDown } from "lucide-react";
import { subjects } from "@/data/subjects";
import SubjectCard from "@/components/SubjectCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type FilterType = "all" | "common" | "group1" | "theory" | "lab";
type SortType = "name" | "credits" | "code";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

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
  const overallPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const theorySubjects = subjects.filter((s) => s.type === "theory");
  const labSubjects = subjects.filter((s) => s.type === "lab");
  const commonSubjects = subjects.filter((s) => s.category === "BSC");
  const groupSubjects = subjects.filter((s) => s.category === "ESC" || s.category === "GP");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              B.Tech CSE — Semester I
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              2026-27 — Group 1
            </p>
          </div>
        </div>

        <div className="mt-6 max-w-md">
          <ProgressBar
            value={completedCount}
            max={totalTopics}
            label="Overall Progress"
            size="md"
          />
        </div>
      </motion.div>

      {/* Filters & Sort */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {(["all", "common", "group1", "theory", "lab"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              )}
            >
              {f === "all" ? "All" : f === "common" ? "Common" : f === "group1" ? "Group 1" : f === "theory" ? "Theory" : "Lab"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {(["name", "credits", "code"] as SortType[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                sort === s
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              )}
            >
              {s === "name" ? "A-Z" : s === "credits" ? "Credits" : "Code"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Subject Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        id="subjects"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((subject) => (
          <motion.div key={subject.id} variants={fadeUp}>
            <SubjectCard subject={subject} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-gray-500 dark:text-gray-400">
          No subjects found for this filter.
        </p>
      )}

      {/* Categorized Sections */}
      {filter === "all" && (
        <div className="mt-20 space-y-16">
          <section>
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Common Subjects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {commonSubjects.map((s) => (
                <SubjectCard key={s.id} subject={s} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Group 1 / Group A
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupSubjects.map((s) => (
                <SubjectCard key={s.id} subject={s} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

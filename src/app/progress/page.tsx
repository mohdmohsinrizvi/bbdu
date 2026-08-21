"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, BookOpen, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import { subjects } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "@/components/ProgressBar";
import { getCategoryColor, getCategoryLabel, cn } from "@/lib/utils";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();

  const allTopics = subjects.flatMap((s) =>
    s.units.flatMap((u) => u.topics.map((t) => ({ ...t, subjectId: s.id, subjectName: s.name })))
  );
  const totalTopics = allTopics.length;
  const completedTopics = progress.completedTopics.length;
  const overallPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const startedCount = progress.startedSubjects.length;

  const subjectProgress = subjects
    .filter((s) => s.units.length > 0)
    .map((s) => {
      const total = s.units.reduce((a, u) => a + u.topics.length, 0);
      const done = s.units
        .flatMap((u) => u.topics)
        .filter((t) => progress.completedTopics.includes(t.id)).length;
      return { subject: s, total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
    })
    .filter((sp) => sp.total > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Progress
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your learning across all subjects
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mb-10 grid gap-4 sm:grid-cols-3"
      >
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall</div>
          <div className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {overallPercent}%
          </div>
          <div className="mt-3">
            <ProgressBar value={completedTopics} max={totalTopics} size="sm" />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Topics</div>
          <div className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {completedTopics}/{totalTopics}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">completed</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Subjects</div>
          <div className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {startedCount}/{subjects.length}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">started</p>
        </motion.div>
      </motion.div>

      {/* Per-subject progress */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mb-12"
      >
        <motion.h2 variants={fadeUp} className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Subject Progress
        </motion.h2>
        <div className="space-y-4">
          {subjectProgress.map(({ subject, total, done, percent }) => (
            <motion.div
              key={subject.id}
              variants={fadeUp}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", getCategoryColor(subject.category))}>
                      {getCategoryLabel(subject.category)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{subject.code}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {done}/{total} topics completed
                  </p>
                </div>
                <Link
                  href={`/semester-1/${subject.id}`}
                  className="flex-shrink-0 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  View <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-3">
                <ProgressBar value={done} max={total} size="sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reset */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center"
      >
        <button
          onClick={() => {
            if (confirm("Reset all progress? This cannot be undone.")) {
              resetProgress();
            }
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All Progress
        </button>
      </motion.div>
    </div>
  );
}

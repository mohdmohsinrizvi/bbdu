"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Clock, Award, ChevronDown, ChevronUp } from "lucide-react";
import { subjects } from "@/data/subjects";
import { labExperiments } from "@/data/labExperiments";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnitCard from "@/components/UnitCard";
import ExperimentCard from "@/components/ExperimentCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { getCategoryColor, getCategoryLabel, cn } from "@/lib/utils";
import { useState } from "react";
import type { Subject } from "@/data/types";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const { progress } = useProgress();

  if (!subject) notFound();

  const experiments = labExperiments[subjectId] ?? [];
  const totalTopics = subject.units.reduce((a, u) => a + u.topics.length, 0);
  const completedTopics = subject.units
    .flatMap((u) => u.topics)
    .filter((t) => progress.completedTopics.includes(t.id)).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Semester 1", href: "/semester-1" },
          { label: subject.name },
        ]}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-6 mb-10"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", getCategoryColor(subject.category))}>
            {getCategoryLabel(subject.category)}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {subject.code}
          </span>
          {subject.type === "lab" && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              Lab
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {subject.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4" />
            {subject.credits} Credits
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {subject.lectureHours}L {subject.tutorialHours}T {subject.practicalHours}P
          </span>
          {totalTopics > 0 && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {completedTopics}/{totalTopics} topics
            </span>
          )}
        </div>

        {totalTopics > 0 && (
          <div className="mt-6 max-w-md">
            <ProgressBar value={completedTopics} max={totalTopics} label="Subject Progress" size="md" />
          </div>
        )}
      </motion.div>

      {/* Objectives */}
      {subject.objectives.length > 0 && <ObjectivesSection objectives={subject.objectives} />}

      {/* Outcomes */}
      {subject.outcomes.length > 0 && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Course Outcomes
          </motion.h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {subject.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Units (theory) */}
      {subject.type === "theory" && subject.units.length > 0 && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.h2 variants={fadeUp} className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Units
          </motion.h2>
          <motion.div variants={fadeUp} className="space-y-4">
            {subject.units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                subjectId={subjectId}
                completedTopics={progress.completedTopics}
              />
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Experiments (lab) */}
      {subject.type === "lab" && experiments.length > 0 && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.h2 variants={fadeUp} className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Lab Experiments
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {experiments.map((exp, i) => (
              <ExperimentCard key={exp.id} experiment={exp} index={i} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

function ObjectivesSection({ objectives }: { objectives: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Objectives</h2>
        {open ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 dark:border-gray-800">
          <ul className="space-y-2">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

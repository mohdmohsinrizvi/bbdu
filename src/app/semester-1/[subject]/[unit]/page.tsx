"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { subjects } from "@/data/subjects";
import Breadcrumbs from "@/components/Breadcrumbs";
import TopicCard from "@/components/TopicCard";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import type { Subject, Unit } from "@/data/types";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function UnitPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string }>;
}) {
  const { subject: subjectId, unit: unitId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const { progress } = useProgress();

  if (!subject || !unit) notFound();

  const unitIndex = subject.units.findIndex((u) => u.id === unitId);
  const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
  const nextUnit = unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

  const completedCount = unit.topics.filter((t) => progress.completedTopics.includes(t.id)).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Semester 1", href: "/semester-1" },
          { label: subject.name, href: `/semester-1/${subjectId}` },
          { label: unit.title },
        ]}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-6 mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-lg">
            {unit.number}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {unit.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subject.name}</p>
          </div>
        </div>

        <p className="mb-4 text-gray-600 dark:text-gray-400">{unit.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {unit.contactHours} contact hours
          </span>
          <span>{completedCount}/{unit.topics.length} topics completed</span>
          {unit.mappedCO.length > 0 && (
            <span className="flex flex-wrap gap-1">
              Maps to:{" "}
              {unit.mappedCO.map((co) => (
                <span
                  key={co}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {co}
                </span>
              ))}
            </span>
          )}
        </div>

        <div className="mt-6 max-w-md">
          <ProgressBar value={completedCount} max={unit.topics.length} label="Unit Progress" size="sm" />
        </div>
      </motion.div>

      {/* Topics */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="mb-12"
      >
        <motion.h2 variants={fadeUp} className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Topics
        </motion.h2>
        <motion.div variants={fadeUp} className="space-y-3">
          {unit.topics.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              subjectId={subjectId}
              unitId={unitId}
              index={i}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* Prev / Next */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800"
      >
        {prevUnit ? (
          <Link
            href={`/semester-1/${subjectId}/${prevUnit.id}`}
            className="group flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400">Previous</div>
              <div className="font-semibold">{prevUnit.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextUnit ? (
          <Link
            href={`/semester-1/${subjectId}/${nextUnit.id}`}
            className="group flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50"
          >
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">Next</div>
              <div className="font-semibold">{nextUnit.title}</div>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </motion.div>
    </div>
  );
}

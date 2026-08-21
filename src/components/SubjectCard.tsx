"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Video, Layers } from "lucide-react";
import type { Subject } from "@/data/types";
import { cn, getCategoryColor, getCategoryLabel } from "@/lib/utils";

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const totalTopics = subject.units.reduce((acc, unit) => acc + unit.topics.length, 0);
  const hasVideos = subject.units.some((unit) =>
    unit.topics.some((t) => t.id)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/semester-1/${subject.id}`}
        className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-blue-500/5"
      >
        <div className="mb-4 flex items-start justify-between">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              getCategoryColor(subject.category)
            )}
          >
            {getCategoryLabel(subject.category)}
          </span>
          {subject.type === "lab" && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              Lab
            </span>
          )}
        </div>

        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          {subject.name}
        </h3>

        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          {subject.code}
        </p>

        <div className="mb-5 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {subject.credits} Credits
          </span>
          <span className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            {subject.units.length} Units
          </span>
          {totalTopics > 0 && (
            <span className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              {totalTopics} Topics
            </span>
          )}
        </div>

        <div className="flex items-center text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
          Explore Subject
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}

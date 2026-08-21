"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import type { Unit } from "@/data/types";
import { cn } from "@/lib/utils";
import TopicCard from "./TopicCard";

interface UnitCardProps {
  unit: Unit;
  subjectId: string;
  completedTopics: string[];
}

export default function UnitCard({ unit, subjectId, completedTopics }: UnitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const completedCount = unit.topics.filter((t) =>
    completedTopics.includes(t.id)
  ).length;
  const progress = unit.topics.length
    ? Math.round((completedCount / unit.topics.length) * 100)
    : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {unit.number}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {unit.title}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {unit.topics.length} topics &middot; {progress}% complete
          </p>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <motion.div
              className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-gray-100 px-5 pb-5 pt-4 dark:border-gray-800">
              {unit.topics.map((topic, i) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  subjectId={subjectId}
                  unitId={unit.id}
                  index={i}
                />
              ))}

              <Link
                href={`/semester-1/${subjectId}/${unit.id}`}
                className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View full unit
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

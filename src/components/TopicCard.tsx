"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, FileText } from "lucide-react";
import type { Topic } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  topic: Topic;
  subjectId: string;
  unitId: string;
  index: number;
}

export default function TopicCard({ topic, subjectId, unitId, index }: TopicCardProps) {
  const { isTopicCompleted, toggleTopic } = useProgress();
  const completed = isTopicCompleted(topic.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      className={cn(
        "group rounded-xl border p-4 transition-colors",
        completed
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-950/20"
          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleTopic(topic.id);
          }}
          className="mt-0.5 flex-shrink-0"
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-300 transition-colors group-hover:text-gray-400 dark:text-gray-600" />
          )}
        </button>

        <Link
          href={`/semester-1/${subjectId}/${unitId}/${topic.id}`}
          className="min-w-0 flex-1"
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              Topic {topic.orderIndex}
            </span>
          </div>
          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
            {topic.title}
          </h4>
          <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {topic.description}
          </p>
        </Link>

        <FileText className="h-4 w-4 flex-shrink-0 text-gray-300 dark:text-gray-600" />
      </div>
    </motion.div>
  );
}

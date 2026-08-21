"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
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
    <div
      className={cn(
        "flex items-center gap-3 py-2 pl-11 pr-4 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors hover:bg-surface-hover/50",
        completed && "bg-success/5"
      )}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTopic(topic.id);
        }}
        className="flex-shrink-0"
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-success" />
        ) : (
          <Circle className="h-4 w-4 text-muted/40 transition-colors hover:text-muted" />
        )}
      </button>

      <Link
        href={`/semester-1/${subjectId}/${unitId}/${topic.id}`}
        className="min-w-0 flex-1"
      >
        <span className={cn(
          "text-[13px] font-medium transition-colors",
          completed ? "text-muted line-through" : "text-foreground hover:text-accent"
        )}>
          {topic.title}
        </span>
      </Link>

      <span className="text-xs text-muted/50 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

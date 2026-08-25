"use client";

import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import type { Topic } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  topic: Topic;
  subjectId: string;
  unitId: string;
  index: number;
  branchId?: string;
  groupId?: string;
}

export default function TopicRow({
  topic,
  subjectId,
  unitId,
  branchId,
  groupId,
}: TopicCardProps) {
  const { isTopicCompleted, toggleTopic } = useProgress();
  const completed = isTopicCompleted(topic.id);

  const href = branchId && groupId
    ? `/btech/${branchId}/${groupId}/semester-1/${subjectId}/${unitId}/${topic.id}`
    : `/semester-1/${subjectId}/${unitId}/${topic.id}`;

  return (
    <div
      className={cn(
        "group flex items-center gap-3 py-3 pl-12 pr-4 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-all hover:bg-surface-hover/50",
        completed && "bg-success/[0.03]"
      )}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTopic(topic.id);
        }}
        className="flex-shrink-0 transition-transform hover:scale-110"
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-success" />
        ) : (
          <Circle className="h-5 w-5 text-border-strong transition-colors hover:text-muted" />
        )}
      </button>

      <Link
        href={href}
        className="min-w-0 flex-1"
      >
        <span
          className={cn(
            "text-[14px] font-semibold transition-colors",
            completed
              ? "text-muted line-through decoration-border"
              : "text-foreground group-hover:text-accent"
          )}
        >
          {topic.title}
        </span>
        {topic.description && (
          <p className="mt-0.5 text-xs text-muted line-clamp-1">
            {topic.description}
          </p>
        )}
      </Link>

      <ArrowRight className="h-4 w-4 flex-shrink-0 text-border-strong opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-accent" />
    </div>
  );
}

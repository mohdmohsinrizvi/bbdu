"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Unit } from "@/data/types";
import { cn } from "@/lib/utils";
import TopicRow from "./TopicCard";

interface UnitCardProps {
  unit: Unit;
  subjectId: string;
  completedTopics: string[];
}

export default function UnitAccordion({ unit, subjectId, completedTopics }: UnitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const completedCount = unit.topics.filter((t) =>
    completedTopics.includes(t.id)
  ).length;
  const progress = unit.topics.length
    ? Math.round((completedCount / unit.topics.length) * 100)
    : 0;

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
      >
        <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-muted tabular-nums">
          {String(unit.number).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-[15px] font-medium text-foreground">
              {unit.title}
            </h3>
            <span className="flex-shrink-0 text-xs tabular-nums text-muted">
              {completedCount}/{unit.topics.length}
            </span>
          </div>

          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                progress === 100 ? "bg-success" : "bg-accent"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="space-y-0 border-t border-border/50 pb-2">
          {unit.topics.map((topic, i) => (
            <TopicRow
              key={topic.id}
              topic={topic}
              subjectId={subjectId}
              unitId={unit.id}
              index={i}
            />
          ))}

          <Link
            href={`/semester-1/${subjectId}/${unit.id}`}
            className="ml-11 mt-1 flex items-center gap-1 py-2 text-xs font-medium text-accent hover:text-accent-hover"
          >
            View full unit
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

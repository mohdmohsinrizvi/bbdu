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
  programId?: string;
  branchId?: string;
  groupId?: string;
  yearId?: string;
  semesterId?: string;
  institutionId?: string;
}

export default function UnitAccordion({
  unit,
  subjectId,
  completedTopics,
  programId = "btech",
  branchId = "cse",
  groupId = "group-a",
  yearId = "first-year",
  semesterId = "semester-1",
  institutionId = "bbdu",
}: UnitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const completedCount = unit.topics.filter((t) =>
    completedTopics.includes(t.id)
  ).length;
  const progress = unit.topics.length
    ? Math.round((completedCount / unit.topics.length) * 100)
    : 0;

  const unitHref = `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subjectId}/${unit.id}`;

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6 group"
      >
        <span className="w-10 flex-shrink-0 text-right text-2xl font-display font-medium tabular-nums text-border-strong group-hover:text-accent transition-colors">
          {String(unit.number).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate text-[15px] font-semibold text-foreground">
              {unit.title}
            </h3>
            <span className="flex-shrink-0 text-xs font-semibold tabular-nums text-muted">
              {completedCount}/{unit.topics.length}
            </span>
          </div>

          {unit.description && (
            <p className="mt-0.5 text-xs text-muted line-clamp-1">
              {unit.description}
            </p>
          )}

          <div className="mt-2 h-px w-full max-w-md overflow-hidden bg-border">
            <div
              className={cn(
                "h-full transition-all duration-700 ease-out",
                progress === 100 ? "bg-success" : "bg-accent"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-muted transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="space-y-0 border-t border-border/50 pb-2 animate-fade-in-up">
          {unit.topics.map((topic, i) => (
            <TopicRow
              key={topic.id}
              topic={topic}
              subjectId={subjectId}
              unitId={unit.id}
              index={i}
              programId={programId}
              branchId={branchId}
              groupId={groupId}
              yearId={yearId}
              semesterId={semesterId}
              institutionId={institutionId}
            />
          ))}

          <Link
            href={unitHref}
            className="ml-12 mt-2 flex items-center gap-1.5 py-2 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            View full unit
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

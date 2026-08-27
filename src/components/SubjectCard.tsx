"use client";

import Link from "next/link";
import type { Subject } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { getSubjectColor } from "@/lib/constants";

interface SubjectRowProps {
  subject: Subject;
  index: number;
  programId?: string;
  branchId?: string;
  groupId?: string;
  yearId?: string;
  semesterId?: string;
  institutionId?: string;
}

export default function SubjectCard({
  subject,
  index,
  programId = "btech",
  branchId = "cse",
  groupId = "group-a",
  yearId = "first-year",
  semesterId = "semester-1",
  institutionId = "bbdu",
}: SubjectRowProps) {
  const { progress } = useProgress();
  const totalTopics = subject.units.reduce(
    (acc, unit) => acc + unit.topics.length,
    0
  );
  const completedTopics = subject.units
    .flatMap((u) => u.topics)
    .filter((t) => progress.completedTopics.includes(t.id)).length;
  const pct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const colorClass = getSubjectColor(subject.id);

  const href = `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subject.id}`;

  return (
    <Link
      href={href}
      className={`group ${colorClass} relative flex items-center gap-4 border-b border-border py-4 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6`}
    >
      <div className="subject-accent-bar absolute left-0 top-0 h-full" />

      <span className="w-10 flex-shrink-0 text-right text-2xl font-extrabold tabular-nums text-border-strong">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1 pl-2">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-[15px] font-bold text-foreground group-hover:text-accent transition-colors">
            {subject.name}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted">
          <span className="font-medium">{subject.code}</span>
          {subject.type === "lab" && (
            <span className="rounded-md border border-border px-1.5 py-px text-[10px] font-bold uppercase text-muted">
              Lab
            </span>
          )}
          {subject.type === "theory" && (
            <>
              <span className="text-border">&middot;</span>
              <span>{subject.credits} Credits</span>
              <span className="text-border">&middot;</span>
              <span>{subject.units.length} Units</span>
              {totalTopics > 0 && (
                <>
                  <span className="text-border">&middot;</span>
                  <span className="tabular-nums">
                    {completedTopics}/{totalTopics}
                  </span>
                </>
              )}
            </>
          )}
        </div>

        {totalTopics > 0 && (
          <div className="mt-2 h-1 max-w-[200px] overflow-hidden rounded-full bg-border">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                pct === 100 ? "bg-success" : "bg-accent"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      <span className="text-lg text-border-strong transition-all group-hover:text-accent group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}

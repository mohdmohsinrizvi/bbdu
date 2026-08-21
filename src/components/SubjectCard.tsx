"use client";

import Link from "next/link";
import type { Subject } from "@/data/types";

interface SubjectRowProps {
  subject: Subject;
  index: number;
}

export default function SubjectRow({ subject, index }: SubjectRowProps) {
  const totalTopics = subject.units.reduce((acc, unit) => acc + unit.topics.length, 0);

  return (
    <Link
      href={`/semester-1/${subject.id}`}
      className="group flex items-center gap-4 border-b border-border py-3 transition-colors hover:bg-surface-hover/50 -mx-4 px-4 sm:-mx-6 sm:px-6"
    >
      <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-muted tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-[15px] font-medium text-foreground group-hover:text-accent">
            {subject.name}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
          <span>{subject.code}</span>
          {subject.type === "lab" && (
            <span className="rounded border border-border px-1 py-px text-[10px] font-medium uppercase text-muted">
              Lab
            </span>
          )}
          {subject.type === "theory" && (
            <>
              <span>&middot;</span>
              <span>{subject.credits} Credits</span>
              {totalTopics > 0 && (
                <>
                  <span>&middot;</span>
                  <span>{subject.units.length} Units</span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <span className="text-xs text-muted transition-transform group-hover:translate-x-0.5">
        &rarr;
      </span>
    </Link>
  );
}

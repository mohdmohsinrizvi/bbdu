"use client";

import type { Experiment } from "@/data/types";

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

export default function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <div className="border-b border-border py-3">
      <div className="flex items-start gap-3">
        <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-muted tabular-nums">
          {String(experiment.number).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-medium text-foreground">
            {experiment.title}
          </h4>
          <p className="mt-0.5 text-xs text-muted">
            {experiment.description}
          </p>

          {experiment.mappedCO.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {experiment.mappedCO.map((co) => (
                <span
                  key={co}
                  className="rounded border border-border px-1.5 py-px text-[10px] font-medium text-muted"
                >
                  {co}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

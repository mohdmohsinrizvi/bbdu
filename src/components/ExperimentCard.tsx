"use client";

import type { Experiment } from "@/data/types";

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

export default function ExperimentRow({
  experiment,
}: ExperimentCardProps) {
  return (
    <div className="border-b border-border py-4 px-5 last:border-b-0">
      <div className="flex items-start gap-4">
        <span className="w-10 flex-shrink-0 text-right text-2xl font-extrabold tabular-nums text-border-strong">
          {String(experiment.number).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-bold text-foreground">
            {experiment.title}
          </h4>
          <p className="mt-0.5 text-xs text-muted leading-relaxed">
            {experiment.description}
          </p>

          {experiment.mappedCO.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {experiment.mappedCO.map((co) => (
                <span
                  key={co}
                  className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-bold text-muted"
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

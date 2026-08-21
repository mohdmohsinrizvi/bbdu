"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  color?: "accent" | "success";
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  size = "md",
  showPercentage = true,
  color,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const barColor = color || (percentage === 100 ? "success" : "accent");

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-xs font-semibold text-muted">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-extrabold tabular-nums text-foreground">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-border",
          size === "sm" && "h-1",
          size === "md" && "h-2",
          size === "lg" && "h-3"
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out animate-progress",
            barColor === "success" ? "bg-success" : "bg-accent"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

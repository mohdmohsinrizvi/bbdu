"use client";

import { Play, Star } from "lucide-react";
import type { Video } from "@/data/types";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
  isActive?: boolean;
}

export default function VideoCard({ video, onSelect, isActive }: VideoCardProps) {
  return (
    <button
      onClick={() => onSelect(video)}
      className={cn(
        "flex w-full items-start gap-3.5 py-3 text-left transition-all -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg",
        isActive
          ? "bg-accent/8 border border-accent/20"
          : "hover:bg-surface-hover/50 border border-transparent"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg mt-0.5 transition-colors",
          isActive ? "bg-accent text-white" : "bg-foreground/5 text-foreground/60"
        )}
      >
        <Play className={cn("h-3.5 w-3.5", isActive && "ml-0.5 fill-white")} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h4
            className={cn(
              "truncate text-[13px] font-semibold",
              isActive ? "text-accent" : "text-foreground"
            )}
          >
            {video.title}
          </h4>
          {video.recommended && (
            <Star className="h-3 w-3 flex-shrink-0 fill-amber-400 text-amber-400" />
          )}
        </div>

        <p className="mt-0.5 text-xs text-muted">{video.channel}</p>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-surface-hover px-1.5 py-px text-[10px] font-bold text-muted">
            {video.language}
          </span>
          <span className="rounded-md bg-surface-hover px-1.5 py-px text-[10px] font-bold text-muted">
            {video.level}
          </span>
          {video.duration && (
            <span className="rounded-md bg-surface-hover px-1.5 py-px text-[10px] font-bold text-muted tabular-nums">
              {video.duration}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

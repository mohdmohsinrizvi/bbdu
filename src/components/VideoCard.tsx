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
        "flex w-full items-start gap-3 py-2.5 text-left transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6",
        isActive ? "bg-accent/5" : "hover:bg-surface-hover/50"
      )}
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-foreground/5 mt-0.5">
        <Play className="h-3 w-3 text-foreground/60" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h4 className={cn(
            "truncate text-[13px] font-medium",
            isActive ? "text-accent" : "text-foreground"
          )}>
            {video.title}
          </h4>
          {video.recommended && (
            <Star className="h-3 w-3 flex-shrink-0 fill-yellow-500 text-yellow-500" />
          )}
        </div>

        <p className="mt-0.5 text-xs text-muted">
          {video.channel}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="rounded border border-border px-1.5 py-px text-[10px] font-medium text-muted">
            {video.language}
          </span>
          <span className="rounded border border-border px-1.5 py-px text-[10px] font-medium text-muted">
            {video.level}
          </span>
        </div>
      </div>
    </button>
  );
}

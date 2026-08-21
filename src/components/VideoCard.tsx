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
        "w-full rounded border p-3 text-left transition-colors",
        isActive
          ? "border-accent/30 bg-accent/5"
          : "border-border bg-surface hover:border-border/80"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-foreground/5">
          <Play className="h-3.5 w-3.5 text-foreground/60" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate text-[13px] font-medium text-foreground">
              {video.title}
            </h4>
            {video.recommended && (
              <Star className="h-3 w-3 flex-shrink-0 fill-yellow-500 text-yellow-500" />
            )}
          </div>

          <p className="mt-0.5 text-xs text-muted">
            {video.channel}
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded border border-border px-1.5 py-px text-[10px] font-medium text-muted">
              {video.language}
            </span>
            <span className="rounded border border-border px-1.5 py-px text-[10px] font-medium text-muted">
              {video.level}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

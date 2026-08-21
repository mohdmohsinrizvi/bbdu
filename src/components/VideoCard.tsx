"use client";

import { motion } from "framer-motion";
import { Play, Star, Clock } from "lucide-react";
import type { Video } from "@/data/types";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
  isActive?: boolean;
}

export default function VideoCard({ video, onSelect, isActive }: VideoCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(video)}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-colors",
        isActive
          ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/50"
          : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
          <Play className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {video.title}
            </h4>
            {video.recommended && (
              <Star className="h-4 w-4 flex-shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </div>

          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            {video.channel}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              {video.language}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                video.level === "Beginner"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : video.level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {video.level}
            </span>
            {video.duration && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                {video.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  channel: string;
}

export default function VideoPlayer({ youtubeId, title, channel }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
        {loaded ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="relative h-full w-full">
            {inView ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-800">
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-700" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40" />

            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg"
              >
                <Play className="h-7 w-7 fill-white text-white" />
              </motion.div>
              <span className="text-sm font-medium text-white drop-shadow">
                Click to play
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{channel}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <ExternalLink className="h-4 w-4" />
          YouTube
        </a>
      </div>
    </div>
  );
}

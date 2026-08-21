"use client";

import { useState, useRef, useEffect } from "react";
import { Play, ExternalLink } from "lucide-react";

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
      <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-foreground/5">
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
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-10 w-10 animate-pulse rounded-full bg-border" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/30" />

            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg">
                <Play className="h-5 w-5 fill-white text-white" />
              </div>
              <span className="text-xs font-medium text-white/90">
                Click to play
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <p className="text-xs text-muted">{channel}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
          YouTube
        </a>
      </div>
    </div>
  );
}

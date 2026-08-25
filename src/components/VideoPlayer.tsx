"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, ExternalLink, Maximize2 } from "lucide-react";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  channel: string;
}

function youtubeLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  const quality =
    width <= 320
      ? "mqdefault"
      : width <= 640
        ? "hqdefault"
        : "maxresdefault";
  return `https://img.youtube.com/vi/${src}/${quality}.jpg`;
}

export default function VideoPlayer({
  youtubeId,
  title,
  channel,
}: VideoPlayerProps) {
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

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-foreground/5">
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
              <Image
                src={youtubeId}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                loader={youtubeLoader}
                className="object-cover"
                unoptimized
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-border" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-all group-hover:scale-110 group-hover:bg-white">
                <Play className="ml-1 h-6 w-6 fill-accent text-accent" />
              </div>
            </button>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {channel}
              </div>
              <div className="rounded-lg bg-black/50 p-1.5 backdrop-blur-sm">
                <Maximize2 className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted">{channel}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent/30 hover:text-accent hover:bg-accent/5"
        >
          <ExternalLink className="h-3 w-3" />
          YouTube
        </a>
      </div>
    </div>
  );
}

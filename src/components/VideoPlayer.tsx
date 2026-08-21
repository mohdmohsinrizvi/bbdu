"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  channel: string;
}

function youtubeLoader({ src, width }: { src: string; width: number }) {
  const quality = width <= 320 ? "mqdefault" : width <= 640 ? "hqdefault" : "maxresdefault";
  return `https://img.youtube.com/vi/${src}/${quality}.jpg`;
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

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative aspect-video w-full overflow-hidden border border-border bg-foreground/5">
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
                <div className="h-10 w-10 animate-pulse rounded bg-border" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/20" />

            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-90"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/90 backdrop-blur-sm">
                <Play className="ml-0.5 h-5 w-5 fill-background text-background" />
              </div>
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
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
          YouTube
        </a>
      </div>
    </div>
  );
}

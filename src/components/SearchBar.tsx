"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "subject" | "unit" | "topic";
  title: string;
  subtitle: string;
  href: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    for (const subject of subjects) {
      if (
        subject.name.toLowerCase().includes(lower) ||
        subject.code.toLowerCase().includes(lower)
      ) {
        found.push({
          type: "subject",
          title: subject.name,
          subtitle: subject.code,
          href: `/semester-1/${subject.id}`,
        });
      }
      for (const unit of subject.units) {
        if (unit.title.toLowerCase().includes(lower)) {
          found.push({
            type: "unit",
            title: unit.title,
            subtitle: `${subject.name} — Unit ${unit.number}`,
            href: `/semester-1/${subject.id}/${unit.id}`,
          });
        }
        for (const topic of unit.topics) {
          if (topic.title.toLowerCase().includes(lower)) {
            found.push({
              type: "topic",
              title: topic.title,
              subtitle: `${subject.name} — ${unit.title}`,
              href: `/semester-1/${subject.id}/${unit.id}/${topic.id}`,
            });
          }
        }
      }
    }

    setResults(found.slice(0, 8));
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const link = document.querySelector(`[data-result="${activeIndex}"]`) as HTMLAnchorElement;
      if (link) link.click();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            search(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search subjects, units, topics..."
          className="w-full rounded border border-border bg-surface py-2 pl-9 pr-9 text-[13px] text-foreground outline-none transition-colors focus:border-accent/40"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded border border-border bg-surface shadow-sm">
          {results.map((result, index) => (
            <Link
              key={result.href}
              href={result.href}
              data-result={index}
              onClick={() => setOpen(false)}
              className={cn(
                "flex flex-col px-3 py-2 transition-colors",
                index === activeIndex
                  ? "bg-accent/5"
                  : "hover:bg-surface-hover"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="rounded border border-border px-1 py-px text-[9px] font-bold uppercase text-muted">
                  {result.type}
                </span>
                <span className="text-[13px] font-medium text-foreground">
                  {result.title}
                </span>
              </div>
              <span className="mt-0.5 pl-[38px] text-xs text-muted">
                {result.subtitle}
              </span>
            </Link>
          ))}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded border border-border bg-surface p-4 text-center shadow-sm">
          <p className="text-xs text-muted">
            No results for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

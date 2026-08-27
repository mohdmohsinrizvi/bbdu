"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";
import { trackSearch } from "@/lib/analytics";

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
      const instId = subject.id.startsWith("bbniit-") ? "bbniit" : "bbdu";
      const branchId = "cse";
      const groupId =
        instId === "bbniit" ? "cse-stream" : "group-a";
      const base = `/${instId}/btech/${branchId}/${groupId}/semester-1`;

      if (
        subject.name.toLowerCase().includes(lower) ||
        subject.code.toLowerCase().includes(lower)
      ) {
        found.push({
          type: "subject",
          title: subject.name,
          subtitle: `${subject.code} · ${instId === "bbniit" ? "BBDNIIT" : "BBDU"}`,
          href: `${base}/${subject.id}`,
        });
      }
      for (const unit of subject.units) {
        if (unit.title.toLowerCase().includes(lower)) {
          found.push({
            type: "unit",
            title: unit.title,
            subtitle: `${subject.name} — Unit ${unit.number}`,
            href: `${base}/${subject.id}/${unit.id}`,
          });
        }
        for (const topic of unit.topics) {
          if (topic.title.toLowerCase().includes(lower)) {
            found.push({
              type: "topic",
              title: topic.title,
              subtitle: `${subject.name} — ${unit.title}`,
              href: `${base}/${subject.id}/${unit.id}/${topic.id}`,
            });
          }
        }
      }
    }

    if (found.length > 0) {
      trackSearch(q.trim());
    }
    setResults(found.slice(0, 10));
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
      const link = document.querySelector(
        `[data-result="${activeIndex}"]`
      ) as HTMLAnchorElement;
      if (link) link.click();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const typeColors = {
    subject: "bg-accent/10 text-accent",
    unit: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    topic: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
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
          className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-10 text-[14px] text-foreground outline-none transition-all focus:border-accent/40 focus:shadow-lg focus:shadow-accent/5"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-black/5">
          {results.map((result, index) => (
            <Link
              key={result.href}
              href={result.href}
              data-result={index}
              onClick={() => setOpen(false)}
              className={cn(
                "flex flex-col px-4 py-3 transition-colors border-b border-border/50 last:border-0",
                index === activeIndex
                  ? "bg-accent/5"
                  : "hover:bg-surface-hover"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase",
                    typeColors[result.type]
                  )}
                >
                  {result.type}
                </span>
                <span className="text-[13px] font-semibold text-foreground">
                  {result.title}
                </span>
              </div>
              <span className="mt-0.5 pl-[52px] text-xs text-muted">
                {result.subtitle}
              </span>
            </Link>
          ))}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-border bg-surface p-6 text-center shadow-xl shadow-black/5">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-hover">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <p className="text-sm font-medium text-muted">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-0.5 text-xs text-muted/70">
            Try searching for a subject or topic name
          </p>
        </div>
      )}
    </div>
  );
}

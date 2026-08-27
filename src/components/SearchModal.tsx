"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Layers, BookOpen } from "lucide-react";
import { subjects } from "@/data/subjects";
import { bbniitSubjects } from "@/data/bbniit/subjects";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "subject" | "unit" | "topic";
  title: string;
  subtitle: string;
  href: string;
}

const allSubjects = [...subjects, ...bbniitSubjects];

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    for (const subject of allSubjects) {
      const inst = subject.institution || "bbdu";
      const prefix = inst === "bbniit"
        ? "/bbniit/btech/cse/cse-stream/first-year/semester-1"
        : "/bbdu/btech/cse/group-a/first-year/semester-1";

      if (
        subject.name.toLowerCase().includes(lower) ||
        subject.code.toLowerCase().includes(lower)
      ) {
        found.push({
          type: "subject",
          title: subject.name,
          subtitle: `${subject.code} · ${inst === "bbniit" ? "BBDNIIT" : "BBDU"}`,
          href: `${prefix}/${subject.id}`,
        });
      }
      for (const unit of subject.units) {
        if (unit.title.toLowerCase().includes(lower)) {
          found.push({
            type: "unit",
            title: unit.title,
            subtitle: `${subject.name} — Unit ${unit.number}`,
            href: `${prefix}/${subject.id}/${unit.id}`,
          });
        }
        for (const topic of unit.topics) {
          if (topic.title.toLowerCase().includes(lower)) {
            found.push({
              type: "topic",
              title: topic.title,
              subtitle: `${subject.name} — ${unit.title}`,
              href: `${prefix}/${subject.id}/${unit.id}/${topic.id}`,
            });
          }
        }
      }
    }
    setResults(found.slice(0, 8));
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      router.push(results[activeIndex].href);
      setOpen(false);
    }
  };

  const icons = {
    subject: Layers,
    unit: FileText,
    topic: BookOpen,
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => { setOpen(false); setQuery(""); setResults([]); }}
      />
      <div className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2 px-4 animate-scale-in">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                search(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search subjects, units, topics..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
            <kbd className="hidden rounded-md border border-border bg-surface-hover px-1.5 py-0.5 text-[10px] font-bold text-muted sm:inline">
              ESC
            </kbd>
          </div>

          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.map((result, index) => {
                const Icon = icons[result.type];
                return (
                  <button
                    key={result.href}
                    onClick={() => {
                      router.push(result.href);
                      setOpen(false);
                      setQuery("");
                      setResults([]);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      index === activeIndex
                        ? "bg-accent/8 text-accent"
                        : "text-foreground hover:bg-surface-hover"
                    )}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-surface-hover">
                      <Icon className="h-4 w-4 text-muted" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {result.title}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {result.subtitle}
                      </p>
                    </div>
                    <span className="rounded-md bg-surface-hover px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted">
                      {result.type}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted">
                No results for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {!query && (
            <div className="px-4 py-6 text-center">
              <p className="text-xs text-muted">
                Type to search across all subjects, units, and topics
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

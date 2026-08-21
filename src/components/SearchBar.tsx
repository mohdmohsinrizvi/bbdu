"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
            subtitle: `${subject.name} - Unit ${unit.number}`,
            href: `/semester-1/${subject.id}/${unit.id}`,
          });
        }
        for (const topic of unit.topics) {
          if (topic.title.toLowerCase().includes(lower)) {
            found.push({
              type: "topic",
              title: topic.title,
              subtitle: `${subject.name} - ${unit.title}`,
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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            {results.map((result, index) => (
              <Link
                key={result.href}
                href={result.href}
                data-result={index}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex flex-col px-4 py-3 transition-colors",
                  index === activeIndex
                    ? "bg-blue-50 dark:bg-blue-950/50"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                      result.type === "subject"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : result.type === "unit"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    )}
                  >
                    {result.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {result.title}
                  </span>
                </span>
                <span className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {result.subtitle}
                </span>
              </Link>
            ))}
          </motion.div>
        )}

        {open && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No results found for &ldquo;{query}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

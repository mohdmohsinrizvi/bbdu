"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-accent/10" />
            <span className="text-xs font-semibold text-foreground">
              BBDU Study Hub
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>B.Tech CSE 2026&ndash;27</span>
            <span className="h-3 w-px bg-border" />
            <span>Student-built resource</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-[13px] font-medium text-foreground">BBDU Study Hub</p>
          <p className="text-xs text-muted">
            B.Tech CSE &middot; Semester 1 &middot; 2026&ndash;27
          </p>
          <p className="text-xs text-muted">
            Student-built learning resource.
          </p>
          <div className="mt-2">
            <a
              href="https://www.bbdu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              bbdu.ac.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

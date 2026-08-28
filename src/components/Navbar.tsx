"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, BookOpen, Search } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAcademic } from "@/lib/AcademicContext";
import { cn } from "@/lib/utils";

function SearchTrigger() {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
      }}
      className="hidden items-center gap-2 rounded-md border border-border bg-surface-hover px-3 py-1.5 text-xs text-muted transition-all hover:border-accent/30 hover:text-foreground md:flex"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search</span>
      <kbd className="rounded border border-border bg-surface px-1 py-0.5 text-[10px] font-medium text-muted">
        Ctrl+K
      </kbd>
    </button>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const { isSetup } = useAcademic();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navLinks = [
    { label: "Home", href: "/" },
    ...(isSetup ? [{ label: "Progress", href: "/progress" }] : []),
  ];

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all group-hover:bg-accent/15">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              BBD
            </span>
            <span className="text-[13px] font-medium text-muted ml-1.5">
              Study Hub
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-[13px] font-medium transition-all rounded-md",
                  active
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <SearchTrigger />
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 text-muted transition-all hover:bg-surface-hover hover:text-foreground"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted transition-all hover:bg-surface-hover hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden animate-slide-down">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] font-medium transition-all",
                    active
                      ? "text-accent"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

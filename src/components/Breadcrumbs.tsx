"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumbs({ items, light = true }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center overflow-x-auto">
      <ol className="flex items-center gap-1.5 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className={`h-3 w-3 flex-shrink-0 ${light ? "text-white/30" : "text-border-strong"}`} />
              )}
              {index === 0 && (
                <Home className={`h-3 w-3 flex-shrink-0 ${light ? "text-white/50" : "text-muted"}`} />
              )}
              {isLast || !item.href ? (
                <span className={`truncate font-semibold ${light ? "text-white/90" : "text-foreground"}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`truncate transition-colors ${light ? "text-white/50 hover:text-white/80" : "text-muted hover:text-foreground"}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

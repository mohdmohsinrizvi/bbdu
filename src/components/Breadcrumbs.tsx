"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center overflow-x-auto">
      <ol className="flex items-center gap-1.5 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-white/30" />
              )}
              {index === 0 && (
                <Home className="h-3 w-3 flex-shrink-0 text-white/50" />
              )}
              {isLast || !item.href ? (
                <span className="truncate font-semibold text-white/90">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="truncate text-white/50 transition-colors hover:text-white/80"
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAcademic } from "@/lib/AcademicContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { isSetup } = useAcademic();

  const items = [
    { label: "Home", href: "/", icon: Home },
    ...(isSetup ? [{ label: "Progress", href: "/progress", icon: BarChart3 }] : []),
  ];

  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/90 backdrop-blur-xl md:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1.5 text-[10px] font-medium transition-all",
                active ? "text-accent" : "text-muted"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent" />
                )}
              </div>
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

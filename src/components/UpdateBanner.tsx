"use client";

import { usePWA } from "./PWAProvider";
import { RefreshCw, X } from "lucide-react";

export default function UpdateBanner() {
  const { updateAvailable, updateApp, dismissUpdate } = usePWA();

  if (!updateAvailable) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-20 left-4 right-4 z-[80] mx-auto max-w-md animate-slide-up md:bottom-6"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-surface p-4 shadow-lg shadow-accent/5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
          <RefreshCw className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            New version available
          </p>
          <p className="text-xs text-muted">
            Refresh to get the latest updates
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={updateApp}
            className="rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Refresh
          </button>
          <button
            onClick={dismissUpdate}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            aria-label="Dismiss update notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

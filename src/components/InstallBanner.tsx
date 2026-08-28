"use client";

import { usePWA } from "./PWAProvider";
import { Download, X } from "lucide-react";

export default function InstallBanner() {
  const { isInstallable, installApp, dismissInstall } = usePWA();

  if (!isInstallable) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-20 left-4 right-4 z-[70] mx-auto max-w-md animate-slide-up md:bottom-6"
    >
      <div className="flex items-center gap-3 rounded-md border border-border bg-surface p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10">
          <Download className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Install BBDU CSE</p>
          <p className="text-xs text-muted">
            Add to home screen for quick access
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={installApp}
            className="rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Install
          </button>
          <button
            onClick={dismissInstall}
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            aria-label="Dismiss install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

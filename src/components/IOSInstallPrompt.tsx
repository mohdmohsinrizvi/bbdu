"use client";

import { usePWA } from "./PWAProvider";
import { X, Share } from "lucide-react";

export default function IOSInstallPrompt() {
  const { showIOSInstructions, dismissIOSInstructions } = usePWA();

  if (!showIOSInstructions) return null;

  return (
    <div
      role="dialog"
      aria-label="Install instructions"
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={dismissIOSInstructions}
    >
      <div
        className="w-full max-w-md animate-slide-up rounded-2xl bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">
            Install BBDU CSE
          </h3>
          <button
            onClick={dismissIOSInstructions}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-5 text-sm text-muted leading-relaxed">
          Add BBDU CSE Study Hub to your home screen for quick access — just like a native app.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-tinted p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Share className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Step 1: Tap the Share button
              </p>
              <p className="text-xs text-muted">
                Tap the share icon in the Safari toolbar below
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-tinted p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
              2
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Step 2: Add to Home Screen
              </p>
              <p className="text-xs text-muted">
                Scroll down and tap &quot;Add to Home Screen&quot;
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={dismissIOSInstructions}
          className="mt-5 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

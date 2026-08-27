"use client";

import { usePWA } from "./PWAProvider";
import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  const { isOffline } = usePWA();

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-14 left-0 right-0 z-[60] flex items-center justify-center gap-2 bg-amber-500/90 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm md:top-0"
    >
      <WifiOff className="h-3.5 w-3.5" />
      <span>You&apos;re offline — showing saved content</span>
    </div>
  );
}

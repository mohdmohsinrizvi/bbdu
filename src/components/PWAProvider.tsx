"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { trackInstallSuccess, trackInstallDismissed } from "@/lib/analytics";

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  updateAvailable: boolean;
  installApp: () => Promise<void>;
  dismissInstall: () => void;
  updateApp: () => void;
  dismissUpdate: () => void;
  showIOSInstructions: boolean;
  dismissIOSInstructions: () => void;
}

const PWAContext = createContext<PWAContextType | null>(null);

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function usePWA() {
  const ctx = useContext(PWAContext);
  if (!ctx) throw new Error("usePWA must be used within PWAProvider");
  return ctx;
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function getInstallDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("bbdu-pwa-install-dismissed") === "true";
  } catch {
    return false;
  }
}

function setInstallDismissed() {
  try {
    localStorage.setItem("bbdu-pwa-install-dismissed", "true");
  } catch {}
}

function getIOSDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("bbdu-pwa-ios-dismissed") === "true";
  } catch {
    return false;
  }
}

function setIOSDismissed() {
  try {
    localStorage.setItem("bbdu-pwa-ios-dismissed", "true");
  } catch {}
}

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode());
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== "undefined" && !navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Register service worker
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((registration) => {
        const checkUpdate = () => registration.update();
        const interval = setInterval(checkUpdate, 60 * 60 * 1000);

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setUpdateAvailable(true);
            }
          });
        });

        return () => clearInterval(interval);
      })
      .catch(() => {});

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      setUpdateAvailable(false);
    });
  }, []);

  // Detect standalone mode changes via media query
  useEffect(() => {
    const mql = window.matchMedia("(display-mode: standalone)");
    const handler = () => setIsInstalled(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Detect online/offline (subscribe to external events)
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle beforeinstallprompt
  useEffect(() => {
    if (isStandaloneMode() || getInstallDismissed()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Show iOS instructions if applicable
  useEffect(() => {
    if (isIOS() && !isStandaloneMode() && !getIOSDismissed()) {
      const timer = setTimeout(() => setShowIOSInstructions(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Hide install prompt after app is installed
  useEffect(() => {
    const handler = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", handler);
    return () => window.removeEventListener("appinstalled", handler);
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "dismissed") {
      setInstallDismissed();
      trackInstallDismissed();
    } else {
      trackInstallSuccess();
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  }, [deferredPrompt]);

  const dismissInstall = useCallback(() => {
    setInstallDismissed();
    setIsInstallable(false);
  }, []);

  const updateApp = useCallback(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  }, []);

  const dismissUpdate = useCallback(() => {
    setUpdateAvailable(false);
  }, []);

  const dismissIOSInstructions = useCallback(() => {
    setIOSDismissed();
    setShowIOSInstructions(false);
  }, []);

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isOffline,
        updateAvailable,
        installApp,
        dismissInstall,
        updateApp,
        dismissUpdate,
        showIOSInstructions,
        dismissIOSInstructions,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

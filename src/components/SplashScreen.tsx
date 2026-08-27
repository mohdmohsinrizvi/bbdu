"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hide as soon as the document is interactive
    const handleReady = () => {
      // Small delay to ensure paint, then fade out
      requestAnimationFrame(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 300);
      });
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
      return () => window.removeEventListener("load", handleReady);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-hero-start transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* App icon */}
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/30">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-2xl animate-ping bg-accent/20" style={{ animationDuration: "1.5s" }} />
        </div>

        {/* App name */}
        <div className="text-center">
          <h1 className="text-lg font-extrabold tracking-tight text-white">
            BBDU CSE
          </h1>
          <p className="text-xs font-medium text-white/50">Study Hub</p>
        </div>

        {/* Minimal loading indicator */}
        <div className="mt-2 h-0.5 w-16 overflow-hidden rounded-full bg-white/10">
          <div className="splash-bar h-full rounded-full bg-accent/80" />
        </div>
      </div>
    </div>
  );
}

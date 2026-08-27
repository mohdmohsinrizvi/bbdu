"use client";

import { useEffect, useState, useCallback } from "react";

type SplashPhase = "hidden" | "visible" | "fading" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<SplashPhase>("visible");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [error, setError] = useState(false);

  const dismiss = useCallback(() => {
    setPhase("fading");
    setTimeout(() => setPhase("done"), 350);
  }, []);

  // Dismiss when app is ready — no artificial delay
  useEffect(() => {
    if (phase !== "visible") return;

    const readyCheck = () => {
      // Consider ready when document is interactive or complete
      if (document.readyState === "interactive" || document.readyState === "complete") {
        // Give one frame for paint, then dismiss
        requestAnimationFrame(() => requestAnimationFrame(() => dismiss()));
      }
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
      readyCheck();
    } else {
      document.addEventListener("readystatechange", readyCheck);
      return () => document.removeEventListener("readystatechange", readyCheck);
    }
  }, [phase, dismiss]);

  // Safety: dismiss after 4s max to prevent trapping the user
  useEffect(() => {
    if (phase !== "visible") return;
    const timer = setTimeout(dismiss, 4000);
    return () => clearTimeout(timer);
  }, [phase, dismiss]);

  if (phase === "done") return null;

  return (
    <div
      aria-live="polite"
      aria-busy={phase === "visible"}
      className={`splash-container ${phase === "fading" ? "splash-fade-out" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1635",
        transition: "opacity 350ms ease-out",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      {/* Logo */}
      <div className="splash-logo" style={{ marginBottom: 24 }}>
        {error ? (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 700, color: "#818cf8", letterSpacing: "-0.02em" }}>
              B
            </span>
          </div>
        ) : (
          <img
            src="/icons/icon-192x192.png"
            alt=""
            width={72}
            height={72}
            style={{
              borderRadius: 16,
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 400ms ease, transform 400ms ease",
              transform: imgLoaded ? "scale(1)" : "scale(0.92)",
            }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </div>

      {/* Brand name */}
      <div className="splash-brand" style={{ textAlign: "center", marginBottom: 6 }}>
        <h1
          style={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#ffffff",
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          BBD Study Hub
        </h1>
      </div>

      {/* Tagline */}
      <p
        className="splash-tagline"
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.02em",
          marginBottom: 28,
        }}
      >
        Your academic space.
      </p>

      {/* Loading indicator — minimal dot pulse */}
      <div
        className="splash-dots"
        style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="splash-dot" style={{ animationDelay: "0ms" }} />
        <span className="splash-dot" style={{ animationDelay: "200ms" }} />
        <span className="splash-dot" style={{ animationDelay: "400ms" }} />
      </div>

      {/* Error state */}
      {error && (
        <button
          onClick={dismiss}
          style={{
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px 20px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 200ms, color 200ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
}

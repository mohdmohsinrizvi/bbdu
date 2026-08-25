"use client";

import { useState } from "react";
import { MessageSquare, X, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/mohsin.rizvii";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 z-40 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-[12px] font-bold text-foreground shadow-lg transition-all hover:border-accent/30 hover:text-accent hover:shadow-xl md:bottom-8"
        aria-label="Send Feedback"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 animate-scale-in">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20">
              {/* Header */}
              <div className="relative bg-hero-start px-6 py-5">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Send Feedback
                    </h3>
                    <p className="text-xs text-white/60">
                      We&apos;d love to hear from you
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-sm text-muted leading-relaxed">
                  Have a suggestion, found a bug, or want a new feature?
                  Drop us a message on Instagram.
                </p>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:bg-accent/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Message on Instagram
                    </p>
                    <p className="text-[11px] text-muted">
                      @mohsin.rizvii
                    </p>
                  </div>
                </a>

                <p className="mt-4 text-center text-[11px] text-muted/60">
                  Usually replies within 24 hours
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

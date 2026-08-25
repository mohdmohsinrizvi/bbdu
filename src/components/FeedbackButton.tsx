"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/direct/inbox/";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-4 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-purple-500/25 transition-shadow hover:shadow-xl hover:shadow-purple-500/30 md:bottom-8"
        aria-label="Send Feedback"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">Feedback</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute right-3 top-3 rounded-full p-1 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Send Feedback
                      </h3>
                      <p className="text-xs text-white/70">
                        We&apos;d love to hear from you
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <p className="text-sm text-muted leading-relaxed">
                    Have a suggestion, found a bug, or want a new feature?
                    Drop us a message on Instagram and we&apos;ll get back to you!
                  </p>

                  <div className="mt-5 space-y-3">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md dark:hover:bg-purple-950/20"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                        <Send className="h-4 w-4 text-white" />
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
                  </div>

                  <p className="mt-4 text-center text-[11px] text-muted/60">
                    Usually replies within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

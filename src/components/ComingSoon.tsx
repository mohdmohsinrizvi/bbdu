"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Brain, MessageCircle, Trophy } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Study Assistant",
    description: "Get instant doubt clearing and personalized study plans powered by AI.",
  },
  {
    icon: BookOpen,
    title: "Notes & Bookmarks",
    description: "Save important topics, add personal notes, and bookmark resources.",
  },
  {
    icon: Trophy,
    title: "Quizzes & Practice",
    description: "Test your knowledge with topic-wise quizzes and practice questions.",
  },
  {
    icon: MessageCircle,
    title: "Discussion Forums",
    description: "Connect with peers, ask doubts, and share study materials.",
  },
];

export default function ComingSoon() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
              Coming Soon
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            More Features{" "}
            <span className="text-gradient bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
              Dropping Soon
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            We&apos;re building something awesome. These features are in progress and will be available very soon.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group relative rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-sm transition-all hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {feature.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-accent/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                Coming Soon
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

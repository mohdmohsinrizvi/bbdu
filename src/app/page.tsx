"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Video,
  GraduationCap,
  ChevronRight,
  Layers,
  FlaskConical,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import SubjectCard from "@/components/SubjectCard";

const theorySubjects = subjects.filter((s) => s.type === "theory");

const quickLinks = [
  { label: "Semester 1", href: "/semester-1", icon: BookOpen, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "All Subjects", href: "/semester-1#subjects", icon: Layers, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  { label: "C Programming", href: "/semester-1/computer-concepts-programming-c", icon: Video, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { label: "Calculus", href: "/semester-1/calculus", icon: GraduationCap, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
];

const steps = [
  { num: 1, title: "Choose Subject", desc: "Browse all semester subjects with codes, credits, and categories.", icon: BookOpen },
  { num: 2, title: "Select Unit", desc: "Each subject is broken into units mapped to course outcomes.", icon: Layers },
  { num: 3, title: "Pick a Topic", desc: "Deep-dive into individual topics within each unit.", icon: FlaskConical },
  { num: 4, title: "Watch & Learn", desc: "Curated YouTube videos — best ones marked recommended.", icon: Video },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative isolate px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/5" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
          >
            <GraduationCap className="h-4 w-4" />
            B.Tech CSE — 2026-27
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            BBDU CSE{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Study Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            Your comprehensive learning companion for B.Tech CSE Semester I.
            Structured subjects, curated videos, and progress tracking — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/semester-1"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40"
            >
              Explore Semester 1
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/semester-1#subjects"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              View Subjects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Nav - visible immediately */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.div key={link.href} variants={fadeUp}>
                <Link
                  href={link.href}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${link.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-500" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Subject Preview - visible immediately */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Subjects in Semester I
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {theorySubjects.length} theory subjects across BSC, ESC, and PCC categories
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {theorySubjects.map((subject) => (
              <motion.div key={subject.id} variants={fadeUp}>
                <SubjectCard subject={subject} />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 text-center">
            <Link
              href="/semester-1"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all {subjects.length} subjects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="border-t border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white">
              How It Works
            </motion.h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.num} variants={fadeUp} className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                      <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Step {step.num}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          This is a student-built learning resource. Always verify academic information
          with official BBDU sources. Video links are curated from public YouTube channels.
        </p>
      </section>
    </div>
  );
}

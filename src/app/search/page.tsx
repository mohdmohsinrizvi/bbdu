"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Search
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Find subjects, units, topics, and course codes across all Semester I subjects.
        </p>
        <SearchBar />
      </motion.div>
    </div>
  );
}

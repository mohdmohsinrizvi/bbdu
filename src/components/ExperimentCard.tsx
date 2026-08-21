"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import type { Experiment } from "@/data/types";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

export default function ExperimentCard({ experiment, index }: ExperimentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
          <FlaskConical className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            Experiment {experiment.number}
          </span>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {experiment.title}
          </h4>
        </div>
      </div>

      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
        {experiment.description}
      </p>

      {experiment.mappedCO.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {experiment.mappedCO.map((co) => (
            <span
              key={co}
              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {co}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

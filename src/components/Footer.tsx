"use client";

import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              BBDU Study Hub
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            B.Tech CSE - Semester I - 2026-27
          </p>

          <p className="max-w-md text-sm text-gray-500 dark:text-gray-500">
            Student-built learning resource. Always verify academic information with official BBDU
            sources.
          </p>

          <a
            href="https://www.bbdu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            bbdu.ac.in
          </a>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-600">
              &copy; {new Date().getFullYear()} BBDU Study Hub. Built with care by students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

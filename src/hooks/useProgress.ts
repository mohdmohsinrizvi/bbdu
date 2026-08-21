"use client";

import { useState, useCallback } from "react";

interface ProgressData {
  completedTopics: string[];
  completedVideos: string[];
  startedSubjects: string[];
}

const STORAGE_KEY = "bbdu-study-hub-progress";

function getInitialProgress(): ProgressData {
  if (typeof window === "undefined") {
    return { completedTopics: [], completedVideos: [], startedSubjects: [] };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { completedTopics: [], completedVideos: [], startedSubjects: [] };
}

function saveProgress(data: ProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(getInitialProgress);

  const toggleTopic = useCallback((topicId: string) => {
    setProgress((prev) => {
      const completed = prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId];
      const newProgress = { ...prev, completedTopics: completed };
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const markSubjectStarted = useCallback((subjectId: string) => {
    setProgress((prev) => {
      if (prev.startedSubjects.includes(subjectId)) return prev;
      const newProgress = { ...prev, startedSubjects: [...prev.startedSubjects, subjectId] };
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const isTopicCompleted = useCallback(
    (topicId: string) => progress.completedTopics.includes(topicId),
    [progress.completedTopics]
  );

  const getSubjectProgress = useCallback(
    (totalTopics: number, completedCount: number) => {
      if (totalTopics === 0) return 0;
      return Math.round((completedCount / totalTopics) * 100);
    },
    []
  );

  const resetProgress = useCallback(() => {
    const empty: ProgressData = { completedTopics: [], completedVideos: [], startedSubjects: [] };
    saveProgress(empty);
    setProgress(empty);
  }, []);

  return {
    progress,
    toggleTopic,
    markSubjectStarted,
    isTopicCompleted,
    getSubjectProgress,
    resetProgress,
  };
}

"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Save, Trash2, Plus, ExternalLink } from "lucide-react";
import { subjects } from "@/data/subjects";
import { videos as defaultVideos } from "@/data/videos";
import { extractYoutubeId } from "@/lib/utils";
import type { Video } from "@/data/types";

const STORAGE_KEY = "bbdu-admin-videos";

function loadCustomVideos(): Video[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomVideos(v: Video[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AdminPage() {
  const [customVideos, setCustomVideos] = useState<Video[]>(() => loadCustomVideos());
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id ?? "");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [form, setForm] = useState({
    title: "",
    url: "",
    channel: "",
    language: "English",
    level: "Beginner" as Video["level"],
    recommended: false,
  });
  const [saved, setSaved] = useState(false);

  const subject = subjects.find((s) => s.id === selectedSubject);
  const allTopics = useMemo(
    () => subject?.units.flatMap((u) => u.topics) ?? [],
    [subject]
  );
  const topicVideos = useMemo(() => {
    return [
      ...defaultVideos.filter((v) => v.subjectId === selectedSubject && v.topicId === selectedTopic),
      ...customVideos.filter((v) => v.subjectId === selectedSubject && v.topicId === selectedTopic),
    ];
  }, [selectedSubject, selectedTopic, customVideos]);

  const handleAdd = () => {
    const youtubeId = extractYoutubeId(form.url);
    if (!form.title || !youtubeId || !selectedTopic) return;

    const newVideo: Video = {
      id: `custom-${Date.now()}`,
      topicId: selectedTopic,
      subjectId: selectedSubject,
      youtubeId,
      title: form.title,
      channel: form.channel || "Unknown",
      language: form.language,
      level: form.level,
      recommended: form.recommended,
    };

    const updated = [...customVideos, newVideo];
    setCustomVideos(updated);
    saveCustomVideos(updated);
    setForm({ title: "", url: "", channel: "", language: "English", level: "Beginner", recommended: false });
    flash();
  };

  const handleDelete = (id: string) => {
    const updated = customVideos.filter((v) => v.id !== id);
    setCustomVideos(updated);
    saveCustomVideos(updated);
    flash();
  };

  const flash = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add and manage video resources for each topic.
        </p>
      </motion.div>

      {saved && (
        <div className="fixed right-4 top-20 z-50 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          Saved!
        </div>
      )}

      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mt-8 space-y-6">
        {/* Selectors */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTopic(""); }}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select a topic</option>
              {allTopics.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Existing videos */}
        {selectedTopic && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Existing Videos ({topicVideos.length})
            </h3>
            {topicVideos.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No videos yet.</p>
            ) : (
              <div className="space-y-2">
                {topicVideos.map((v) => (
                  <div key={v.id} className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{v.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {v.channel} · {v.language} · {v.level}
                        {v.recommended && " · ★ Recommended"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {v.youtubeId && (
                        <a
                          href={`https://youtube.com/watch?v=${v.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {v.id.startsWith("custom-") && (
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add form */}
        {selectedTopic && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              <Plus className="mr-1 inline h-4 w-4" />
              Add New Video
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Video Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Video title"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">YouTube URL</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Channel</label>
                <input
                  type="text"
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  placeholder="Channel name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Language</label>
                  <select
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bilingual</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Level</label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value as Video["level"] })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={form.recommended}
                  onChange={(e) => setForm({ ...form, recommended: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Recommended
              </label>

              <button
                onClick={handleAdd}
                disabled={!form.title || !form.url}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                Add Video
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

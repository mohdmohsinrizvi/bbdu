"use client";

import { useState, useMemo, useRef } from "react";
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
  const idCounter = useRef(0);

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
      id: `custom-${++idCounter.current}`,
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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Admin
        </h1>
        <p className="mt-1 text-sm text-muted">
          Add and manage video resources for each topic.
        </p>
      </div>

      {saved && (
        <div className="fixed right-4 top-16 z-50 rounded border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
          Saved
        </div>
      )}

      <div className="space-y-6">
        {/* Selectors */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTopic(""); }}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/40"
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
          <div className="rounded-sm border border-border bg-surface p-4">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
              Existing Videos ({topicVideos.length})
            </h3>
            {topicVideos.length === 0 ? (
              <p className="text-xs text-muted">No videos yet.</p>
            ) : (
              <div className="space-y-1">
                {topicVideos.map((v) => (
                  <div key={v.id} className="flex items-center justify-between gap-3 border-b border-border/50 py-2 last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-foreground">{v.title}</p>
                      <p className="text-xs text-muted">
                        {v.channel} &middot; {v.language} &middot; {v.level}
                        {v.recommended && " &middot; Recommended"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {v.youtubeId && (
                        <a
                          href={`https://youtube.com/watch?v=${v.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {v.id.startsWith("custom-") && (
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="text-muted hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
          <div className="rounded-sm border border-border bg-surface p-4">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
              <Plus className="mr-1 inline h-3 w-3" />
              Add Video
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Video title"
                  className="w-full rounded-sm border border-border bg-background px-3 py-1.5 text-[13px] text-foreground outline-none focus:border-accent/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted">YouTube URL</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full rounded-sm border border-border bg-background px-3 py-1.5 text-[13px] text-foreground outline-none focus:border-accent/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted">Channel</label>
                <input
                  type="text"
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  placeholder="Channel name"
                  className="w-full rounded-sm border border-border bg-background px-3 py-1.5 text-[13px] text-foreground outline-none focus:border-accent/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-muted">Language</label>
                  <select
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    className="w-full rounded-sm border border-border bg-background px-3 py-1.5 text-[13px] text-foreground outline-none focus:border-accent/40"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bilingual</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-medium text-muted">Level</label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value as Video["level"] })}
                    className="w-full rounded-sm border border-border bg-background px-3 py-1.5 text-[13px] text-foreground outline-none focus:border-accent/40"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <label className="flex items-center gap-2 text-[13px] text-foreground">
                <input
                  type="checkbox"
                  checked={form.recommended}
                  onChange={(e) => setForm({ ...form, recommended: e.target.checked })}
                  className="rounded border-border"
                />
                Recommended
              </label>

              <button
                onClick={handleAdd}
                disabled={!form.title || !form.url}
                className="ml-auto inline-flex items-center gap-1.5 rounded-sm bg-accent px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

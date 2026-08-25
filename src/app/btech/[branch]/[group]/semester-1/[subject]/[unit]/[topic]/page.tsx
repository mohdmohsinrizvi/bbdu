"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ChevronRight,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import { videos } from "@/data/videos";
import Breadcrumbs from "@/components/Breadcrumbs";
import VideoPlayer from "@/components/VideoPlayer";
import VideoCard from "@/components/VideoCard";
import Confetti from "@/components/Confetti";
import { useProgress } from "@/hooks/useProgress";
import { trackTopicView, trackVideoOpen, trackTopicCompleted } from "@/lib/analytics";
import type { Video } from "@/data/types";

export default function BranchTopicPage({
  params,
}: {
  params: Promise<{ branch: string; group: string; subject: string; unit: string; topic: string }>;
}) {
  const { branch: branchId, group: groupId, subject: subjectId, unit: unitId, topic: topicId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const topic = unit?.topics.find((t) => t.id === topicId);
  const { toggleTopic, isTopicCompleted } = useProgress();

  if (!subject || !unit || !topic) notFound();

  useEffect(() => {
    trackTopicView(subject.name, unit.title, topic.title);
  }, [subject.name, unit.title, topic.title]);

  const topicVideos = videos.filter(
    (v) => v.topicId === topicId && v.subjectId === subjectId
  );

  const [activeVideo, setActiveVideo] = useState<Video | null>(
    topicVideos.find((v) => v.recommended && v.youtubeId) ??
      topicVideos.find((v) => v.youtubeId) ??
      null
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const topicIndex = unit.topics.findIndex((t) => t.id === topicId);
  const prevTopic = topicIndex > 0 ? unit.topics[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < unit.topics.length - 1
      ? unit.topics[topicIndex + 1]
      : null;

  const completed = isTopicCompleted(topicId);

  const handleVideoOpen = (video: Video) => {
    setActiveVideo(video);
    if (video.youtubeId) {
      trackVideoOpen(subject.name, unit.title, topic.title, video.title, video.youtubeId);
    }
  };

  const handleToggleComplete = () => {
    const wasCompleted = isTopicCompleted(topicId);
    toggleTopic(topicId);
    if (!wasCompleted) {
      trackTopicCompleted(subject.name, unit.title, topic.title);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  };

  return (
    <div>
      <Confetti trigger={showConfetti} />

      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/select" },
              { label: subject.name, href: `/btech/${branchId}/${groupId}/semester-1/${subjectId}` },
              { label: unit.title, href: `/btech/${branchId}/${groupId}/semester-1/${subjectId}/${unitId}` },
              { label: topic.title },
            ]}
          />

          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                Unit {String(unit.number).padStart(2, "0")}
              </span>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <span className="text-xs font-medium text-white/50">
                Topic {topicIndex + 1} of {unit.topics.length}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {topic.title}
            </h1>

            {topic.description && (
              <p className="mt-2 max-w-2xl text-sm text-white/60 leading-relaxed">
                {topic.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {activeVideo && activeVideo.youtubeId ? (
              <div className="mb-8">
                <VideoPlayer
                  youtubeId={activeVideo.youtubeId}
                  title={activeVideo.title}
                  channel={activeVideo.channel}
                />
              </div>
            ) : (
              <div className="mb-8 rounded-xl border-2 border-dashed border-border p-12 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-hover">
                  <Circle className="h-6 w-6 text-muted" />
                </div>
                <p className="text-sm font-medium text-muted">
                  No video available for this topic yet.
                </p>
                <p className="mt-1 text-xs text-muted/70">
                  Videos will be added soon.
                </p>
              </div>
            )}

            <div className="mb-8">
              <button
                onClick={handleToggleComplete}
                className={`inline-flex items-center gap-2.5 rounded-xl border px-5 py-2.5 text-[13px] font-bold transition-all ${
                  completed
                    ? "border-success/30 bg-success/10 text-success hover:bg-success/15"
                    : "border-border bg-surface text-muted hover:border-accent/30 hover:text-accent hover:bg-accent/5"
                }`}
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" />
                    Mark as completed
                  </>
                )}
              </button>
            </div>

            {topicVideos.length > 1 && (
              <section className="mb-10">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
                  Related Videos
                </h2>
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                  {topicVideos.map((v) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      onSelect={handleVideoOpen}
                      isActive={activeVideo?.id === v.id}
                    />
                  ))}
                </div>
              </section>
            )}

            <div className="flex items-center justify-between border-t border-border pt-6">
              {prevTopic ? (
                <Link
                  href={`/btech/${branchId}/${groupId}/semester-1/${subjectId}/${unitId}/${prevTopic.id}`}
                  className="group flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                    <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Previous
                    </div>
                    <div className="text-[13px] font-semibold text-foreground group-hover:text-accent transition-colors">
                      {prevTopic.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextTopic ? (
                <Link
                  href={`/btech/${branchId}/${groupId}/semester-1/${subjectId}/${unitId}/${nextTopic.id}`}
                  className="group flex items-center gap-3"
                >
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Next
                    </div>
                    <div className="text-[13px] font-semibold text-foreground group-hover:text-accent transition-colors">
                      {nextTopic.title}
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <div className="rounded-xl border border-border bg-surface p-4">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
                  This Topic
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Status</span>
                    <span className={`font-bold ${completed ? "text-success" : "text-muted"}`}>
                      {completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Videos</span>
                    <span className="font-bold text-foreground tabular-nums">
                      {topicVideos.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Unit</span>
                    <span className="font-bold text-foreground">
                      {unit.title}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                    Unit Topics
                  </h4>
                  <div className="space-y-1">
                    {unit.topics.map((t, i) => (
                      <Link
                        key={t.id}
                        href={`/btech/${branchId}/${groupId}/semester-1/${subjectId}/${unitId}/${t.id}`}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                          t.id === topicId
                            ? "bg-accent/8 text-accent font-semibold"
                            : "text-muted hover:text-foreground hover:bg-surface-hover"
                        }`}
                      >
                        <span className="w-4 text-[10px] font-bold tabular-nums text-border-strong">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate">{t.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

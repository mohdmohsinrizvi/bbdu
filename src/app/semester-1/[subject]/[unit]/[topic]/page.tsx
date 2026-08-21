"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { subjects } from "@/data/subjects";
import { videos } from "@/data/videos";
import Breadcrumbs from "@/components/Breadcrumbs";
import VideoPlayer from "@/components/VideoPlayer";
import VideoCard from "@/components/VideoCard";
import { useProgress } from "@/hooks/useProgress";
import type { Video } from "@/data/types";

export default function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topic: string }>;
}) {
  const { subject: subjectId, unit: unitId, topic: topicId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const topic = unit?.topics.find((t) => t.id === topicId);
  const { toggleTopic, isTopicCompleted } = useProgress();

  if (!subject || !unit || !topic) notFound();

  const topicVideos = videos.filter(
    (v) => v.topicId === topicId && v.subjectId === subjectId
  );

  const [activeVideo, setActiveVideo] = useState<Video | null>(
    topicVideos.find((v) => v.recommended && v.youtubeId) ?? topicVideos.find((v) => v.youtubeId) ?? null
  );

  const topicIndex = unit.topics.findIndex((t) => t.id === topicId);
  const prevTopic = topicIndex > 0 ? unit.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < unit.topics.length - 1 ? unit.topics[topicIndex + 1] : null;

  const completed = isTopicCompleted(topicId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Semester 1", href: "/semester-1" },
          { label: subject.name, href: `/semester-1/${subjectId}` },
          { label: unit.title, href: `/semester-1/${subjectId}/${unitId}` },
          { label: topic.title },
        ]}
      />

      <div className="mt-6 mb-8">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs font-medium text-muted tabular-nums">
            Unit {String(unit.number).padStart(2, "0")}
          </span>
          <span className="text-muted">&middot;</span>
          <span className="text-xs text-muted">{topic.orderIndex}</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {topic.title}
        </h1>

        <p className="mt-2 text-[13px] text-muted">
          {topic.description}
        </p>
      </div>

      {/* Main Video */}
      {activeVideo && activeVideo.youtubeId ? (
        <div className="mb-8">
          <VideoPlayer
            youtubeId={activeVideo.youtubeId}
            title={activeVideo.title}
            channel={activeVideo.channel}
          />
        </div>
      ) : (
        <div className="mb-8 rounded border border-dashed border-border p-10 text-center">
          <p className="text-[13px] text-muted">
            No video available for this topic yet.
          </p>
        </div>
      )}

      {/* Mark as completed */}
      <div className="mb-8">
        <button
          onClick={() => toggleTopic(topicId)}
          className={`inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-[13px] font-medium transition-colors ${
            completed
              ? "border-success/30 bg-success/10 text-success"
              : "border-border bg-surface text-muted hover:text-foreground"
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

      {/* Related Videos */}
      {topicVideos.length > 1 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Related Videos
          </h2>
          <div className="space-y-2">
            {topicVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                onSelect={setActiveVideo}
                isActive={activeVideo?.id === v.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Topic */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        {prevTopic ? (
          <Link
            href={`/semester-1/${subjectId}/${unitId}/${prevTopic.id}`}
            className="group flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-0.5" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-muted">Previous</div>
              <div className="text-[13px] font-medium text-foreground">{prevTopic.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            href={`/semester-1/${subjectId}/${unitId}/${nextTopic.id}`}
            className="group flex items-center gap-2"
          >
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-muted">Next</div>
              <div className="text-[13px] font-medium text-foreground">{nextTopic.title}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

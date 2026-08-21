"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { subjects } from "@/data/subjects";
import { videos } from "@/data/videos";
import Breadcrumbs from "@/components/Breadcrumbs";
import VideoPlayer from "@/components/VideoPlayer";
import VideoCard from "@/components/VideoCard";
import { useProgress } from "@/hooks/useProgress";
import type { Video } from "@/data/types";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topic: string }>;
}) {
  const { subject: subjectId, unit: unitId, topic: topicId } = use(params);
  const subject = subjects.find((s) => s.id === subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const topic = unit?.topics.find((t) => t.id === topicId);
  const { progress, toggleTopic, isTopicCompleted } = useProgress();

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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Semester 1", href: "/semester-1" },
          { label: subject.name, href: `/semester-1/${subjectId}` },
          { label: unit.title, href: `/semester-1/${subjectId}/${unitId}` },
          { label: topic.title },
        ]}
      />

      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mt-6 mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {topic.title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{topic.description}</p>
      </motion.div>

      {/* Main Video */}
      {activeVideo && activeVideo.youtubeId ? (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <VideoPlayer
            youtubeId={activeVideo.youtubeId}
            title={activeVideo.title}
            channel={activeVideo.channel}
          />
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No video available for this topic yet.
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Check back later or explore the videos below.
          </p>
        </motion.div>
      )}

      {/* Mark as completed */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
        <button
          onClick={() => toggleTopic(topicId)}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
            completed
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Completed
            </>
          ) : (
            <>
              <Circle className="h-5 w-5" />
              Mark as completed
            </>
          )}
        </button>
      </motion.div>

      {/* Related Videos */}
      {topicVideos.length > 1 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Related Videos
          </motion.h2>
          <motion.div variants={fadeUp} className="space-y-3">
            {topicVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                onSelect={setActiveVideo}
                isActive={activeVideo?.id === v.id}
              />
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Prev / Next Topic */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800"
      >
        {prevTopic ? (
          <Link
            href={`/semester-1/${subjectId}/${unitId}/${prevTopic.id}`}
            className="group flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400">Previous</div>
              <div className="font-semibold">{prevTopic.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            href={`/semester-1/${subjectId}/${unitId}/${nextTopic.id}`}
            className="group flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50"
          >
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">Next</div>
              <div className="font-semibold">{nextTopic.title}</div>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </motion.div>
    </div>
  );
}

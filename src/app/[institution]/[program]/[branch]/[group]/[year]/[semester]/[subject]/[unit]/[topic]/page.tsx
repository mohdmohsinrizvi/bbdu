import { notFound } from "next/navigation";
import TopicClient from "./TopicClient";
import { buildTopicMetadata, buildTopicBreadcrumbs, buildBreadcrumbStructuredData, getSubjectById } from "@/lib/seo";
import { videos } from "@/data/videos";

type Params = Promise<{
  institution: string;
  program: string;
  branch: string;
  group: string;
  year: string;
  semester: string;
  subject: string;
  unit: string;
  topic: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const p = await params;
  return buildTopicMetadata(p.institution, p.program, p.branch, p.group, p.year, p.semester, p.subject, p.unit, p.topic);
}

export default async function TopicPage({ params }: { params: Params }) {
  const p = await params;
  const subject = getSubjectById(p.subject);
  const unit = subject?.units.find((u) => u.id === p.unit);
  const topic = unit?.topics.find((t) => t.id === p.topic);
  if (!subject || !unit || !topic) notFound();

  const breadcrumbs = buildTopicBreadcrumbs(p.institution, p.program, p.branch, p.group, p.year, p.semester, p.subject, p.unit, p.topic);
  const breadcrumbData = buildBreadcrumbStructuredData(breadcrumbs);

  const topicVideos = videos.filter((v) => v.topicId === p.topic);
  const primaryVideo = topicVideos.find((v) => v.recommended) || topicVideos[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {primaryVideo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: primaryVideo.title,
              description: `${topic.title} — ${subject.name} lecture on BBD Study Hub`,
              thumbnailUrl: `https://img.youtube.com/vi/${primaryVideo.youtubeId}/mqdefault.jpg`,
              uploadDate: "2024-01-01",
              embedUrl: `https://www.youtube.com/embed/${primaryVideo.youtubeId}`,
              contentUrl: `https://www.youtube.com/watch?v=${primaryVideo.youtubeId}`,
              publisher: { "@type": "Organization", name: primaryVideo.channel },
            }),
          }}
        />
      )}
      <TopicClient params={params} />
    </>
  );
}

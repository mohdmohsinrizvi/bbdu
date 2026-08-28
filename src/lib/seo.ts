import type { Metadata } from "next";
import { getInstitution, getProgram, getBranch, getGroup, getYear, getSemester } from "@/data/institutions";
import { subjects as allSubjects } from "@/data/subjects";
import { bbniitSubjects } from "@/data/bbniit/subjects";

export const BASE_URL = "https://bbdu.netlify.app";
export const SITE_NAME = "BBD Study Hub";

export function getSubjectById(id: string) {
  return allSubjects.find((s) => s.id === id) || bbniitSubjects.find((s) => s.id === id);
}

function getSubjectsForSemester(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string
) {
  const sem = getSemester(institutionId, programId, branchId, groupId, yearId, semesterId);
  if (!sem) return [];
  const source = institutionId === "bbniit" ? bbniitSubjects : allSubjects;
  return sem.subjects.map((id) => source.find((s) => s.id === id)).filter(Boolean) as typeof allSubjects;
}

export function buildBreadcrumbStructuredData(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function buildWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Academic syllabus, curated lectures, and progress tracking for B.Tech students at BBD institutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildVideoObjectStructuredData(video: {
  title: string;
  youtubeId: string;
  channel: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`,
    uploadDate: new Date().toISOString().split("T")[0],
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    publisher: {
      "@type": "Organization",
      name: video.channel,
    },
  };
}

// ── Metadata builders for each route level ──

export function buildHomepageMetadata(): Metadata {
  return {
    title: "BBD Study Hub — B.Tech CSE Study Material & Syllabus",
    description:
      "Student-built academic learning platform for B.Tech CSE students at BBD University and BBDNIIT. Access syllabus, curated YouTube lectures, and track your progress.",
    alternates: { canonical: BASE_URL },
    openGraph: {
      title: "BBD Study Hub — B.Tech CSE Study Material & Syllabus",
      description:
        "Student-built academic learning platform for B.Tech CSE students at BBD University and BBDNIIT.",
      url: BASE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/icons/og-image.png`, width: 1200, height: 630, alt: "BBD Study Hub" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "BBD Study Hub — B.Tech CSE Study Material & Syllabus",
      description:
        "Student-built academic learning platform for B.Tech CSE students at BBD University and BBDNIIT.",
      images: [`${BASE_URL}/icons/og-image.png`],
    },
  };
}

export function buildSemesterMetadata(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string
): Metadata {
  const inst = getInstitution(institutionId);
  const prog = getProgram(institutionId, programId);
  const br = getBranch(institutionId, programId, branchId);
  const grp = getGroup(institutionId, programId, branchId, groupId);
  const yr = getYear(institutionId, programId, branchId, groupId, yearId);
  const sem = getSemester(institutionId, programId, branchId, groupId, yearId, semesterId);
  const subjects = getSubjectsForSemester(institutionId, programId, branchId, groupId, yearId, semesterId);

  if (!inst || !prog || !br || !grp || !yr || !sem) {
    return { title: "Page Not Found" };
  }

  const title = `${inst.shortName} ${prog.name} ${br.shortName} ${sem.label} — Syllabus & Subjects`;
  const description = `${inst.name} ${prog.name} ${br.shortName} ${sem.label} syllabus with ${subjects.length} subjects, units, topic-wise lectures and progress tracking on ${SITE_NAME}.`;
  const url = `${BASE_URL}/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/icons/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/icons/og-image.png`],
    },
  };
}

export function buildSubjectMetadata(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string,
  subjectId: string
): Metadata {
  const inst = getInstitution(institutionId);
  const sem = getSemester(institutionId, programId, branchId, groupId, yearId, semesterId);
  const subject = getSubjectById(subjectId);

  if (!inst || !sem || !subject) {
    return { title: "Page Not Found" };
  }

  const title = `${subject.name} — ${inst.shortName} ${sem.label}`;
  const totalTopics = subject.units.reduce((acc, u) => acc + u.topics.length, 0);
  const description = `${subject.name} (${subject.code}) — ${inst.name} ${sem.label} syllabus with ${subject.units.length} units and ${totalTopics} topics. Access curated lectures and track your progress on ${SITE_NAME}.`;
  const url = `${BASE_URL}/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subjectId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/icons/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/icons/og-image.png`],
    },
  };
}

export function buildUnitMetadata(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string,
  subjectId: string,
  unitId: string
): Metadata {
  const inst = getInstitution(institutionId);
  const subject = getSubjectById(subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);

  if (!inst || !subject || !unit) {
    return { title: "Page Not Found" };
  }

  const title = `${unit.title} — ${subject.name} ${inst.shortName}`;
  const description = `Unit ${unit.number}: ${unit.title} — ${subject.name} (${subject.code}) at ${inst.name}. Contains ${unit.topics.length} topics with curated video lectures.`;
  const url = `${BASE_URL}/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subjectId}/${unitId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/icons/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/icons/og-image.png`],
    },
  };
}

export function buildTopicMetadata(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string,
  subjectId: string,
  unitId: string,
  topicId: string
): Metadata {
  const inst = getInstitution(institutionId);
  const subject = getSubjectById(subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const topic = unit?.topics.find((t) => t.id === topicId);

  if (!inst || !subject || !unit || !topic) {
    return { title: "Page Not Found" };
  }

  const title = `${topic.title} — ${subject.name} ${inst.shortName}`;
  const description = `${topic.title} — Unit ${unit.number}: ${unit.title} in ${subject.name} (${subject.code}) at ${inst.name}. Watch curated video lectures and track your progress.`;
  const url = `${BASE_URL}/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subjectId}/${unitId}/${topicId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/icons/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/icons/og-image.png`],
    },
  };
}

// ── Breadcrumb builders ──

export function buildSemesterBreadcrumbs(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string
) {
  const inst = getInstitution(institutionId);
  const br = getBranch(institutionId, programId, branchId);
  const grp = getGroup(institutionId, programId, branchId, groupId);
  const yr = getYear(institutionId, programId, branchId, groupId, yearId);
  const sem = getSemester(institutionId, programId, branchId, groupId, yearId, semesterId);

  // Simplified: Home > Branch > Semester
  return [
    { name: "Home", url: "/" },
    { name: inst?.shortName || institutionId, url: `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}` },
    { name: br?.shortName || branchId, url: `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}` },
    { name: yr?.label || yearId, url: "#" },
    { name: sem?.label || semesterId, url: "#" },
  ];
}

export function buildSubjectBreadcrumbs(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string,
  subjectId: string
) {
  const inst = getInstitution(institutionId);
  const sem = getSemester(institutionId, programId, branchId, groupId, yearId, semesterId);
  const subject = getSubjectById(subjectId);
  const semUrl = `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}`;

  return [
    { name: "Home", url: "/" },
    { name: inst?.shortName || institutionId, url: semUrl },
    { name: sem?.label || semesterId, url: semUrl },
    { name: subject?.name || subjectId, url: "#" },
  ];
}

export function buildUnitBreadcrumbs(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string,
  subjectId: string,
  unitId: string
) {
  const subject = getSubjectById(subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const subjectUrl = `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subjectId}`;

  return [
    { name: "Home", url: "/" },
    { name: subject?.name || subjectId, url: subjectUrl },
    { name: unit?.title || unitId, url: "#" },
  ];
}

export function buildTopicBreadcrumbs(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string,
  subjectId: string,
  unitId: string,
  topicId: string
) {
  const subject = getSubjectById(subjectId);
  const unit = subject?.units.find((u) => u.id === unitId);
  const topic = unit?.topics.find((t) => t.id === topicId);
  const subjectUrl = `/${institutionId}/${programId}/${branchId}/${groupId}/${yearId}/${semesterId}/${subjectId}`;
  const unitUrl = `${subjectUrl}/${unitId}`;

  return [
    { name: "Home", url: "/" },
    { name: subject?.name || subjectId, url: subjectUrl },
    { name: unit?.title || unitId, url: unitUrl },
    { name: topic?.title || topicId, url: "#" },
  ];
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || !GA_ID) return;
  window.gtag(...args);
}

export function pageView(url: string) {
  gtag("config", GA_ID, { page_path: url });
}

export function trackSubjectView(subjectName: string, subjectCode: string) {
  gtag("event", "subject_view", { subject_name: subjectName, subject_code: subjectCode });
}

export function trackUnitView(subjectName: string, unitName: string, unitNumber: number) {
  gtag("event", "unit_view", { subject_name: subjectName, unit_name: unitName, unit_number: unitNumber });
}

export function trackTopicView(subjectName: string, unitName: string, topicName: string) {
  gtag("event", "topic_view", { subject_name: subjectName, unit_name: unitName, topic_name: topicName });
}

export function trackVideoOpen(subjectName: string, unitName: string, topicName: string, videoTitle: string, videoId: string) {
  gtag("event", "video_open", { subject_name: subjectName, unit_name: unitName, topic_name: topicName, video_title: videoTitle, video_id: videoId });
}

export function trackTopicCompleted(subjectName: string, unitName: string, topicName: string) {
  gtag("event", "topic_completed", { subject_name: subjectName, unit_name: unitName, topic_name: topicName });
}

export function trackSearch(searchTerm: string) {
  gtag("event", "search", { search_term: searchTerm });
}

export function trackContinueLearning(subjectName: string, unitName: string, topicName: string) {
  gtag("event", "continue_learning", { subject_name: subjectName, unit_name: unitName, topic_name: topicName });
}

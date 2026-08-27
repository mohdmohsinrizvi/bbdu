export interface Subject {
  id: string;
  code: string;
  name: string;
  category: "BSC" | "ESC" | "GP" | "PCC" | "HSMC";
  type: "theory" | "lab";
  credits: number;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  prerequisite: string;
  objectives: string[];
  outcomes: string[];
  units: Unit[];
  institution?: string;
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  contactHours: number;
  mappedCO: string[];
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
}

export interface Video {
  id: string;
  topicId: string;
  subjectId: string;
  youtubeId: string;
  title: string;
  channel: string;
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  recommended: boolean;
}

export interface Experiment {
  id: string;
  number: number;
  title: string;
  description: string;
  mappedCO: string[];
}

export interface SubjectData {
  subjects: Subject[];
  labExperiments: Record<string, Experiment[]>;
}

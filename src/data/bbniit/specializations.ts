/**
 * BBDNIIT CSE Stream Specializations
 *
 * All 17 CSE-related programs from the AKTU 2026-27 syllabus.
 * All specializations share the same first-year curriculum.
 *
 * Source of truth: AKTU 2026-27 syllabus document.
 */

export interface Specialization {
  id: string;
  name: string;
  shortName: string;
  group: "Computer Science" | "Specialized Computing";
}

export const cseSpecializations: Specialization[] = [
  // ─── COMPUTER SCIENCE ─────────────────────────────────────
  {
    id: "computer-science-engineering",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    group: "Computer Science",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    shortName: "CS",
    group: "Computer Science",
  },
  {
    id: "computer-engineering",
    name: "Computer Engineering",
    shortName: "CE",
    group: "Computer Science",
  },
  {
    id: "information-technology",
    name: "Information Technology",
    shortName: "IT",
    group: "Computer Science",
  },
  {
    id: "computer-science-information-technology",
    name: "Computer Science & Information Technology",
    shortName: "CS & IT",
    group: "Computer Science",
  },
  {
    id: "computer-science-technology",
    name: "Computer Science & Technology",
    shortName: "CS & Tech",
    group: "Computer Science",
  },
  {
    id: "computer-science-design",
    name: "Computer Science & Design",
    shortName: "CS & Design",
    group: "Computer Science",
  },
  {
    id: "computer-science-engineering-hindi",
    name: "Computer Science & Engineering (Hindi)",
    shortName: "CSE (Hindi)",
    group: "Computer Science",
  },

  // ─── SPECIALIZED COMPUTING ────────────────────────────────
  {
    id: "cse-artificial-intelligence",
    name: "CSE (Artificial Intelligence)",
    shortName: "CSE (AI)",
    group: "Specialized Computing",
  },
  {
    id: "cse-artificial-intelligence-machine-learning",
    name: "CSE (Artificial Intelligence & Machine Learning)",
    shortName: "CSE (AI/ML)",
    group: "Specialized Computing",
  },
  {
    id: "artificial-intelligence-machine-learning",
    name: "Artificial Intelligence & Machine Learning",
    shortName: "AI & ML",
    group: "Specialized Computing",
  },
  {
    id: "ai-data-science",
    name: "AI & Data Science",
    shortName: "AI & DS",
    group: "Specialized Computing",
  },
  {
    id: "cse-data-science",
    name: "CSE (Data Science)",
    shortName: "CSE (DS)",
    group: "Specialized Computing",
  },
  {
    id: "cse-cyber-security",
    name: "CSE (Cyber Security)",
    shortName: "CSE (Cyber)",
    group: "Specialized Computing",
  },
  {
    id: "cse-internet-of-things",
    name: "CSE (Internet of Things)",
    shortName: "CSE (IoT)",
    group: "Specialized Computing",
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    shortName: "Cyber Sec",
    group: "Specialized Computing",
  },
  {
    id: "data-science",
    name: "Data Science",
    shortName: "DS",
    group: "Specialized Computing",
  },
];

/**
 * Shared first-year Semester 1 subjects for ALL CSE stream specializations.
 * These are course codes from the AKTU 2026-27 syllabus.
 *
 * Subject alternatives (e.g., Quantum Physics / Applied Chemistry)
 * are represented as course groups. Each group contains one alternative.
 */
export interface CourseGroup {
  id: string;
  label: string;
  subjects: string[];
}

export const semester1CourseGroups: CourseGroup[] = [
  {
    id: "physics-chemistry",
    label: "Physics / Chemistry",
    subjects: ["bbniit-quantum-physics", "bbniit-applied-chemistry"],
  },
  {
    id: "calculus",
    label: "Mathematics",
    subjects: ["bbniit-calculus-linear-algebra"],
  },
  {
    id: "electrical-electronics",
    label: "Electrical / Electronics",
    subjects: ["bbniit-electrical-engineering", "bbniit-electronics-engineering"],
  },
  {
    id: "programming",
    label: "Programming",
    subjects: ["bbniit-programming-languages"],
  },
  {
    id: "iks-communication",
    label: "IKS / Communication",
    subjects: ["bbniit-indian-knowledge-system", "bbniit-professional-communication"],
  },
  {
    id: "ai-mechanical",
    label: "AI / Mechanical",
    subjects: ["bbniit-intro-ai-prompt-engineering", "bbniit-mechanical-engineering"],
  },
];

export const semester2CourseGroups: CourseGroup[] = [
  {
    id: "sem2-core",
    label: "Core",
    subjects: ["bbniit-numerical-methods", "bbniit-data-structures"],
  },
];

/**
 * Get all subject IDs for a given semester (flattened from course groups).
 */
export function getSemester1SubjectIds(): string[] {
  return semester1CourseGroups.flatMap((g) => g.subjects);
}

export function getSemester2SubjectIds(): string[] {
  return semester2CourseGroups.flatMap((g) => g.subjects);
}

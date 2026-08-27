export const subjectColors: Record<string, string> = {
  calculus: "subject-calculus",
  "computer-concepts-programming-c": "subject-programming",
  "quantum-physics": "subject-quantum",
  "engineering-mechanics": "subject-mechanics",
  "basic-electronics": "subject-electronics",
  "environment-ecological-sustainability": "subject-environment",
  "electrical-engineering-concepts": "subject-electronics",
  "sustainable-chemical-sciences": "subject-quantum",
  "professional-workplace-communication": "subject-programming",
  "basics-of-artificial-intelligence": "subject-programming",
  "programming-in-c-lab": "subject-programming",
  "general-proficiency-1": "subject-lab",
  "engineering-mechanics-lab": "subject-mechanics",
  "quantum-physics-lab": "subject-quantum",
  "engineering-graphics-lab": "subject-mechanics",
  "electrical-engineering-lab": "subject-electronics",
  "sustainable-chemical-sciences-lab": "subject-quantum",
  // BBDNIIT subjects
  "bbniit-quantum-physics": "subject-quantum",
  "bbniit-applied-chemistry": "subject-quantum",
  "bbniit-calculus-linear-algebra": "subject-calculus",
  "bbniit-electrical-engineering": "subject-electronics",
  "bbniit-electronics-engineering": "subject-electronics",
  "bbniit-programming-languages": "subject-programming",
  "bbniit-indian-knowledge-system": "subject-environment",
  "bbniit-professional-communication": "subject-programming",
  "bbniit-intro-ai-prompt-engineering": "subject-programming",
  "bbniit-mechanical-engineering": "subject-mechanics",
  "bbniit-numerical-methods": "subject-calculus",
  "bbniit-data-structures": "subject-programming",
};

export function getSubjectColor(subjectId: string): string {
  return subjectColors[subjectId] || "subject-calculus";
}

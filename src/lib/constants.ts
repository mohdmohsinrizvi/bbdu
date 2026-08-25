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
};

export function getSubjectColor(subjectId: string): string {
  return subjectColors[subjectId] || "subject-calculus";
}

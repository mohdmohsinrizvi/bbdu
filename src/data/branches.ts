export interface Branch {
  id: string;
  name: string;
  shortName: string;
  description: string;
  groups: Group[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  subjects: string[];
}

export const branches: Branch[] = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    description: "B.Tech CSE — Software, Algorithms, AI & Systems",
    groups: [
      {
        id: "group-a",
        name: "Group A",
        description: "Physics, Mechanics, Electronics & Environment focus",
        subjects: [
          "calculus",
          "computer-concepts-programming-c",
          "programming-in-c-lab",
          "general-proficiency-1",
          "quantum-physics",
          "engineering-mechanics",
          "basic-electronics",
          "environment-ecological-sustainability",
          "engineering-mechanics-lab",
          "workshop-practices",
          "quantum-physics-lab",
        ],
      },
      {
        id: "group-b",
        name: "Group B",
        description: "Electrical, Chemical Sciences, Communication & AI focus",
        subjects: [
          "calculus",
          "computer-concepts-programming-c",
          "programming-in-c-lab",
          "general-proficiency-1",
          "electrical-engineering-concepts",
          "sustainable-chemical-sciences",
          "professional-workplace-communication",
          "basics-of-artificial-intelligence",
          "electrical-engineering-lab",
          "sustainable-chemical-sciences-lab",
          "engineering-graphics-lab",
        ],
      },
    ],
  },
];

export function getBranch(branchId: string): Branch | undefined {
  return branches.find((b) => b.id === branchId);
}

export function getGroup(branchId: string, groupId: string): Group | undefined {
  return getBranch(branchId)?.groups.find((g) => g.id === groupId);
}

export function getSubjectIdsForGroup(branchId: string, groupId: string): string[] {
  return getGroup(branchId, groupId)?.subjects ?? [];
}

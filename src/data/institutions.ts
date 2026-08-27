export interface Institution {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  branches: InstitutionBranch[];
}

export interface InstitutionBranch {
  id: string;
  name: string;
  shortName: string;
  description: string;
  groups: InstitutionGroup[];
}

export interface InstitutionGroup {
  id: string;
  name: string;
  description: string;
  subjects: string[];
}

export const institutions: Institution[] = [
  {
    id: "bbdu",
    name: "BBD University",
    shortName: "BBDU",
    description: "B.Tech CSE — 2026–27",
    color: "#6366f1",
    branches: [
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
    ],
  },
  {
    id: "bbniit",
    name: "BBDNIIT",
    shortName: "BBDNIIT",
    description: "B.Tech CSE First Year — AKTU Curriculum 2026–27",
    color: "#8b5cf6",
    branches: [
      {
        id: "cse",
        name: "Computer Science & Engineering",
        shortName: "CSE",
        description: "B.Tech CSE — AKTU First Year Curriculum",
        groups: [
          {
            id: "cse-stream",
            name: "CSE Stream",
            description: "AKTU B.Tech First Year CSE — Common for all groups",
            subjects: [
              "bbniit-quantum-physics",
              "bbniit-applied-chemistry",
              "bbniit-calculus-linear-algebra",
              "bbniit-electrical-engineering",
              "bbniit-electronics-engineering",
              "bbniit-programming-languages",
              "bbniit-indian-knowledge-system",
              "bbniit-professional-communication",
              "bbniit-intro-ai-prompt-engineering",
              "bbniit-mechanical-engineering",
              "bbniit-numerical-methods",
              "bbniit-data-structures",
            ],
          },
        ],
      },
    ],
  },
];

export function getInstitution(institutionId: string): Institution | undefined {
  return institutions.find((i) => i.id === institutionId);
}

export function getInstitutionBranch(
  institutionId: string,
  branchId: string
): InstitutionBranch | undefined {
  return getInstitution(institutionId)?.branches.find(
    (b) => b.id === branchId
  );
}

export function getInstitutionGroup(
  institutionId: string,
  branchId: string,
  groupId: string
): InstitutionGroup | undefined {
  return getInstitutionBranch(institutionId, branchId)?.groups.find(
    (g) => g.id === groupId
  );
}

export function getSubjectIdsForInstitutionGroup(
  institutionId: string,
  branchId: string,
  groupId: string
): string[] {
  return getInstitutionGroup(institutionId, branchId, groupId)?.subjects ?? [];
}

export function isValidInstitution(institutionId: string): boolean {
  return institutions.some((i) => i.id === institutionId);
}

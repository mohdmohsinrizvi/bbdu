export interface AcademicInstitution {
  id: string;
  name: string;
  shortName: string;
  description: string;
  programs: AcademicProgram[];
}

export interface AcademicProgram {
  id: string;
  name: string;
  shortName: string;
  branches: AcademicBranch[];
}

export interface AcademicBranch {
  id: string;
  name: string;
  shortName: string;
  groups: AcademicGroup[];
}

export interface AcademicGroup {
  id: string;
  name: string;
  years: AcademicYear[];
}

export interface AcademicYear {
  id: string;
  label: string;
  number: number;
  semesters: AcademicSemester[];
}

export interface AcademicSemester {
  id: string;
  label: string;
  number: number;
  subjects: string[];
}

export const institutions: AcademicInstitution[] = [
  {
    id: "bbdu",
    name: "BBD University",
    shortName: "BBDU",
    description: "University curriculum",
    programs: [
      {
        id: "btech",
        name: "B.Tech",
        shortName: "B.Tech",
        branches: [
          {
            id: "cse",
            name: "Computer Science & Engineering",
            shortName: "CSE",
            groups: [
              {
                id: "group-a",
                name: "Group A",
                years: [
                  {
                    id: "first-year",
                    label: "1st Year",
                    number: 1,
                    semesters: [
                      {
                        id: "semester-1",
                        label: "Semester 1",
                        number: 1,
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
                        id: "semester-2",
                        label: "Semester 2",
                        number: 2,
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
                id: "group-b",
                name: "Group B",
                years: [
                  {
                    id: "first-year",
                    label: "1st Year",
                    number: 1,
                    semesters: [
                      {
                        id: "semester-1",
                        label: "Semester 1",
                        number: 1,
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
                        id: "semester-2",
                        label: "Semester 2",
                        number: 2,
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
    description: "AKTU curriculum",
    programs: [
      {
        id: "btech",
        name: "B.Tech",
        shortName: "B.Tech",
        branches: [
          {
            id: "cse",
            name: "Computer Science & Engineering",
            shortName: "CSE",
            groups: [
              {
                id: "cse-stream",
                name: "CSE Stream",
                years: [
                  {
                    id: "first-year",
                    label: "1st Year",
                    number: 1,
                    semesters: [
                      {
                        id: "semester-1",
                        label: "Semester 1",
                        number: 1,
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
                        ],
                      },
                      {
                        id: "semester-2",
                        label: "Semester 2",
                        number: 2,
                        subjects: [
                          "bbniit-numerical-methods",
                          "bbniit-data-structures",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getInstitution(id: string): AcademicInstitution | undefined {
  return institutions.find((i) => i.id === id);
}

export function getProgram(
  institutionId: string,
  programId: string
): AcademicProgram | undefined {
  return getInstitution(institutionId)?.programs.find(
    (p) => p.id === programId
  );
}

export function getBranch(
  institutionId: string,
  programId: string,
  branchId: string
): AcademicBranch | undefined {
  return getProgram(institutionId, programId)?.branches.find(
    (b) => b.id === branchId
  );
}

export function getGroup(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string
): AcademicGroup | undefined {
  return getBranch(institutionId, programId, branchId)?.groups.find(
    (g) => g.id === groupId
  );
}

export function getYear(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string
): AcademicYear | undefined {
  return getGroup(institutionId, programId, branchId, groupId)?.years.find(
    (y) => y.id === yearId
  );
}

export function getSemester(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string
): AcademicSemester | undefined {
  return getYear(institutionId, programId, branchId, groupId, yearId)
    ?.semesters.find((s) => s.id === semesterId);
}

export function getSubjectIds(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string
): string[] {
  return (
    getSemester(
      institutionId,
      programId,
      branchId,
      groupId,
      yearId,
      semesterId
    )?.subjects ?? []
  );
}

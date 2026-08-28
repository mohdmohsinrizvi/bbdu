export interface Contributor {
  id: number;
  name: string;
  initials: string;
  program: string;
  year: string;
  semester: string;
  group: string;
  institution: string;
}

export const contributors: Contributor[] = [
  {
    id: 1,
    name: "Syed Kazim Husain Rizvi",
    initials: "SK",
    program: "B.Tech CSE (AI/ML)",
    year: "1st Year",
    semester: "1st Semester",
    group: "Chemistry Group",
    institution: "BBDNIIT",
  },
];

import { bbduSubjects } from "@/data/subjects";
import { bbniitSubjects } from "@/data/bbniit/subjects";
import { getSubjectIds } from "@/data/institutions";
import type { Subject } from "@/data/types";

export const allSubjects: Subject[] = [...bbduSubjects, ...bbniitSubjects];

export function getSubjects(
  institutionId: string,
  programId: string,
  branchId: string,
  groupId: string,
  yearId: string,
  semesterId: string
): Subject[] {
  const source =
    institutionId === "bbniit" ? bbniitSubjects : bbduSubjects;
  const ids = getSubjectIds(
    institutionId,
    programId,
    branchId,
    groupId,
    yearId,
    semesterId
  );
  return ids
    .map((id) => source.find((s) => s.id === id))
    .filter((s): s is Subject => s !== undefined);
}

export function getSubjectById(id: string): Subject | undefined {
  return allSubjects.find((s) => s.id === id);
}

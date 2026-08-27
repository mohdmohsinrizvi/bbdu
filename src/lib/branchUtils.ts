import { bbduSubjects } from "@/data/subjects";
import { bbniitSubjects } from "@/data/bbniit/subjects";
import { getSubjectIdsForGroup } from "@/data/branches";
import { getSubjectIdsForInstitutionGroup } from "@/data/institutions";
import type { Subject } from "@/data/types";

export const subjects: Subject[] = [...bbduSubjects, ...bbniitSubjects];

export function getSubjectsForGroup(
  branchId: string,
  groupId: string
): Subject[] {
  const ids = getSubjectIdsForGroup(branchId, groupId);
  return ids
    .map((id) => bbduSubjects.find((s) => s.id === id))
    .filter((s): s is Subject => s !== undefined);
}

export function getSubjectsForInstitutionGroup(
  institutionId: string,
  branchId: string,
  groupId: string
): Subject[] {
  const source =
    institutionId === "bbniit" ? bbniitSubjects : bbduSubjects;
  const ids = getSubjectIdsForInstitutionGroup(institutionId, branchId, groupId);
  return ids
    .map((id) => source.find((s) => s.id === id))
    .filter((s): s is Subject => s !== undefined);
}

export function getTheorySubjectsForGroup(
  branchId: string,
  groupId: string
): Subject[] {
  return getSubjectsForGroup(branchId, groupId).filter(
    (s) => s.type === "theory"
  );
}

export function getLabSubjectsForGroup(
  branchId: string,
  groupId: string
): Subject[] {
  return getSubjectsForGroup(branchId, groupId).filter(
    (s) => s.type === "lab"
  );
}

export function getSubjectsForInstitution(institutionId: string): Subject[] {
  return institutionId === "bbniit" ? bbniitSubjects : bbduSubjects;
}

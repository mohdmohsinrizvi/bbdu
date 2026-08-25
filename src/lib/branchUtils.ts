import { subjects } from "@/data/subjects";
import { getSubjectIdsForGroup } from "@/data/branches";
import type { Subject } from "@/data/types";

export function getSubjectsForGroup(
  branchId: string,
  groupId: string
): Subject[] {
  const ids = getSubjectIdsForGroup(branchId, groupId);
  return ids
    .map((id) => subjects.find((s) => s.id === id))
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

import type { filters } from "../types/filter";
import type { lectureWithApplicantsAmount } from "@/types/lecture";

export function lectureArray2Filter(
  lectures: lectureWithApplicantsAmount[]
): filters {
  let filters: filters = {
    category: {},
    teacher: {},
    targetStudent: {},
  };
  for (const lec of lectures) {
    if (!filters.category[lec.category]) {
      filters.category[lec.category] = true;
    }
    if (!filters.teacher[lec.teacher]) {
      filters.teacher[lec.teacher] = true;
    }
    if (!filters.targetStudent[lec.target]) {
      filters.targetStudent[lec.target] = true;
    }
  }
  return filters;
}

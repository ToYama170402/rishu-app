import type { filters, filterTarget } from "../types/filter";
import type { lectureWithApplicantsAmount } from "@/types/lecture";

export function lectureArray2Filter(
  lectures: lectureWithApplicantsAmount[]
): filters {
  const titleSet = new Set<string>();
  const categorySet = new Set<string>();
  const teacherSet = new Set<string>();
  const targetStudentSet = new Set<string>();

  lectures.forEach((lec) => {
    titleSet.add(lec.title);
    categorySet.add(lec.category);
    teacherSet.add(lec.teacher);
    targetStudentSet.add(lec.target);
  });

  type filterSets = {
    key: keyof filterTarget;
    values: Set<string>;
  }[];

  const filterSets: filterSets = [
    { key: "category", values: categorySet },
    { key: "title", values: titleSet },
    { key: "teacher", values: teacherSet },
    { key: "target", values: targetStudentSet },
  ];

  return filterSets
    .map((set) =>
      Array.from(set.values)
        .sort(new Intl.Collator().compare)
        .map((value) => ({ key: set.key, value: value }))
    )
    .flat();
}

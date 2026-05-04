import type { Filters, FilterTarget } from "@/types/filter";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";

/**
 * LotteryCourseStatus の配列からフィルター選択肢一覧を生成する。
 */
export function lectureArray2Filter(
  lectures: LotteryCourseStatus[]
): Filters {
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

  const filterSets: { key: keyof FilterTarget; values: Set<string> }[] = [
    { key: "category", values: categorySet },
    { key: "title", values: titleSet },
    { key: "teacher", values: teacherSet },
    { key: "target", values: targetStudentSet },
  ];

  return filterSets
    .map((set) =>
      Array.from(set.values)
        .sort(new Intl.Collator().compare)
        .map((value) => ({ key: set.key, value }))
    )
    .flat();
}

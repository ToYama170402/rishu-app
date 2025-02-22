import type { filters } from "../types/filter";
import type { lectureWithApplicantsAmount } from "@/types/lecture";
import type { lecture } from "@/types/lecture";

export function lectureArray2Filter(
  lectures: lectureWithApplicantsAmount[]
): filters {
  const filter: filters = [];
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

  filter.push(
    ...Array.from(categorySet)
      .map((category) => ({
        key: "category" as keyof lecture,
        value: category,
      }))
      .sort((a, b) => a.value.localeCompare(b.value))
  );

  filter.push(
    ...Array.from(titleSet)
      .map((title) => ({
        key: "title" as keyof lecture,
        value: title,
      }))
      .sort((a, b) => a.value.localeCompare(b.value))
  );

  filter.push(
    ...Array.from(teacherSet)
      .map((teacher) => ({
        key: "teacher" as keyof lecture,
        value: teacher,
      }))
      .sort((a, b) => a.value.localeCompare(b.value))
  );
  filter.push(
    ...Array.from(targetStudentSet)
      .map((targetStudent) => ({
        key: "targetStudent" as keyof lecture,
        value: targetStudent,
      }))
      .sort((a, b) => a.value.localeCompare(b.value))
  );

  return filter;
}

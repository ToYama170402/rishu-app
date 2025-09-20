import type { Semester } from "./semester";

export function isSemester(value: unknown): value is Semester {
  const semesters: Semester[] = [1, 2, 3, 4];
  return (
    (typeof value === "number" ||
      (typeof value === "string" && !Number.isNaN(Number(value)))) &&
    semesters.includes(Number(value) as Semester)
  );
}

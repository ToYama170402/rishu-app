import type { Faculty } from "@/course";
import { facultyMap } from "./department";
import { isDepartment } from "./isDepartment";

/**
 * 与えられた値が Faculty 型かどうか判定する型ガード
 */
export function isFaculty(value: unknown): value is Faculty {
  const hasRequiredProperty =
    typeof value === "object" &&
    !Array.isArray(value) &&
    value !== null &&
    "department" in value &&
    "faculty" in value &&
    typeof value.department === "string" &&
    typeof value.faculty === "string";

  if (!hasRequiredProperty) {
    return false;
  }

  // departmentがfacultyMapに存在するかチェック
  if (!isDepartment(value.department)) {
    return false;
  }

  const faculties = facultyMap[value.department as keyof typeof facultyMap];
  return (
    Array.isArray(faculties) &&
    faculties.includes(value.faculty as (typeof faculties)[number])
  );
}

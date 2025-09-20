import type { Department } from "./department";
import { facultyMap } from "./department";

export function isDepartment(value: unknown): value is Department {
  const validDepartment = Object.keys(facultyMap) as Department[];

  return (
    typeof value === "string" && validDepartment.includes(value as Department)
  );
}

import type { Department } from "./department";

export function isDepartment(value: unknown): value is Department {
  const validDepartment = [
    "融合学域",
    "理工学域",
    "人間社会学域",
    "医薬保健学域",
  ];

  return (
    typeof value === "string" && validDepartment.includes(value as Department)
  );
}

import type { Instructor } from "./instructor";

export function isInstructor(value: unknown): value is Instructor {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "name" in value &&
    typeof value.name === "string"
  );
}

import type { Course } from "./course";
export type SyllabusSearchResult = Pick<
  Course,
  | "courseNumber"
  | "japaneseUrl"
  | "englishUrl"
  | "faculty"
  | "title"
  | "instructors"
  | "semester"
  | "schedules"
>;

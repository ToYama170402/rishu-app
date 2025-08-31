import type { Course } from "./course";
import type { Department } from "./department";

export type SyllabusCourse = Pick<
  Course,
  | "title"
  | "instructors"
  | "numbering"
  | "courseNumber"
  | "lectureForm"
  | "numberOfProper"
  | "schedule"
  | "classFormat"
  | "subjectDistinguished"
  | "semester"
  | "numberOfCredits"
  | "max60CreditsFlag"
  | "targetStudents"
  | "keywords"
  | "lectureRoomInfo"
  | "openAccount"
  | "note"
  | "detail"
> & { department: Department };

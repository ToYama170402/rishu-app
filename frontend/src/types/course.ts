import type { DayPeriod } from "./dayPeriod";
import type { Faculty } from "./department";
import type { Instructor } from "./instructor";
import type { Semester } from "./semester";

/** シラバス上の講座情報を保持する型 */
export type Course = {
  id: string;
  year: number;
  title: string;
  numbering: string;
  courseNumber: string;
  numberOfProper: number | null;
  semester: Semester[];
  numberOfCredits: number;
  note: string;
  englishUrl: string;
  japaneseUrl: string;
  keywords: string[];
  openAccount: string;
  max60CreditsFlag: string;
  subjectDistinguished: string;
  courseDescription: string;
  instructors: Instructor[];
  schedules: DayPeriod[];
  classFormat: string;
  lectureForm: string;
  targetStudents: string;
  lectureRoomInfo: string;
  faculty: Faculty;
};

import type { DayPeriod } from "./dayPeriod";
import type { ApplicantsAmount } from "./applicantsAmount";

export type Category =
  | "ＧＳ科目"
  | "自由履修科目"
  | "ＧＳ言語科目"
  | "言語科目Ａ"
  | "言語科目Ｂ";

export type Teacher = string;

export type TargetStudent = string;

/** 講義情報を保持する型 */
export type LotteryCourseInfo = {
  number: string;
  category: Category;
  title: string;
  dateTime: DayPeriod;
  teacher: Teacher;
  target: TargetStudent;
  capacity: number;
};

export type LotteryCourseStatus = LotteryCourseInfo & {
  applicants: ApplicantsAmount;
};

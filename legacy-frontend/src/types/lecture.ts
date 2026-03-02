import { datePeriod } from "./datePeriod";
import { applicantsAmount } from "./applicantsAmount";

export type category =
  | "ＧＳ科目"
  | "自由履修科目"
  | "ＧＳ言語科目"
  | "言語科目Ａ"
  | "言語科目Ｂ";

export type teacher = string;

export type targetStudent = string;

// 講義情報を保持
export type lecture = {
  number: string;
  category: category;
  title: string;
  dateTime: datePeriod;
  teacher: teacher;
  target: targetStudent;
  capacity: number;
};

export type lectureWithApplicantsAmount = lecture & {
  applicants: applicantsAmount;
};

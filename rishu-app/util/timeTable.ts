// 月１みたいな曜日時限のデータを保持
type datePeriod = {
  date: '月' | '火' | '水' | '木' | '金' | '土' | '日';
  period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
// 全志望者数と各志望者数を保持
type applicantsAmount = {
  all: number;
  first: number;
  second: number;
  third: number;
  forth: number;
  fifth: number;
}
// 講義情報を保持
type lecture = {
  number: number;
  category: 'ＧＳ科目' | '自由履修科目' | 'ＧＳ言語科目' | '言語科目Ａ' | '言語科目Ｂ';
  title: string;
  dateTime: datePeriod;
  teacher: string;
  target: string;
  capacity: number;
  applicants: applicantsAmount;
}
// 一日の講義情報を保持
type dateTimeTable = {
  period1: lecture[];
  period2: lecture[];
  period3: lecture[];
  period4: lecture[];
  period5: lecture[];
  period6: lecture[];
  period7: lecture[];
  period8: lecture[];
}
// 一週間の講義情報を保持
type weekTimeTable = {
  monday: dateTimeTable;
  tuesday: dateTimeTable;
  wednesday: dateTimeTable;
  thursday: dateTimeTable;
  friday: dateTimeTable;
}
export type { weekTimeTable, dateTimeTable, lecture, datePeriod, applicantsAmount };
// 月１みたいな曜日時限のデータを保持
export type date = "月" | "火" | "水" | "木" | "金";

export type datePeriod = {
  date: date;
  period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export type DayPeriod =
  | {
      day: "月" | "火" | "水" | "木" | "金" | "土" | "日";
      period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    }
  | {
      day: "集中";
      period: null;
    };

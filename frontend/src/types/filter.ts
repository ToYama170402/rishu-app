import type { LotteryCourseInfo } from "./lotteryCourse";

/** フィルター対象フィールド（dateTime・capacity を除いた講義情報） */
export type FilterTarget = Omit<LotteryCourseInfo, "dateTime" | "capacity">;

/** 単一フィルター要素 */
export type FilterElement = {
  key: keyof FilterTarget;
  value: LotteryCourseInfo[keyof FilterTarget];
};

/** フィルター要素の配列 */
export type Filters = FilterElement[];

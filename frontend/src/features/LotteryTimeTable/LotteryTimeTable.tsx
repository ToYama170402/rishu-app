"use client";

import React, { useState } from "react";
import TimeTable from "@/components/TimeTable/TimeTable";
import AppBar from "@/features/AppBar/AppBar";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import { useAutoRefreshLectures } from "@/hooks/useAutoRefreshLectures";
import Period from "./components/Period";
import TimeTableDayItem from "./components/TimeTableDayItem";
import Filter from "./components/Filter";
import DetailPopup from "@/features/DetailPopup/DetailPopup";

/** 表示する曜日の配列 */
const DAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;

/** 表示する時限の配列 */
const PERIODS = [1, 2, 3, 4, 5] as const;

type LotteryTimeTableProps = {
  /** Server Component で取得した初期抽選データ */
  initialLectures: LotteryCourseStatus[];
};

/**
 * 抽選時間割フィーチャーコンポーネント。
 *
 * - 50秒ごとにデータを自動リフレッシュ
 * - AppBar の children として Filter を注入
 * - 集中講義は時間割下部に別セクションで表示
 */
export default function LotteryTimeTable({
  initialLectures,
}: LotteryTimeTableProps): React.ReactNode {
  const lectures = useAutoRefreshLectures(initialLectures);

  // filteredLectures is kept in sync with lectures via Filter's useEffect
  // (Filter re-applies selected filters whenever lectures changes)
  const [filteredLectures, setFilteredLectures] =
    useState<LotteryCourseStatus[]>(lectures);

  return (
    <div className="flex flex-col h-screen">
      <AppBar>
        <Filter lectures={lectures} applyFilter={setFilteredLectures} />
      </AppBar>
      <main className="flex-1 overflow-hidden">
        <TimeTable<LotteryCourseStatus[], string, number>
          datum={filteredLectures.filter((lec) => lec.dateTime.day !== "集中")}
          rowElements={[...DAYS]}
          columnElements={[...PERIODS]}
          cellGetter={(datum, row, col) =>
            datum.filter(
              (lec) => lec.dateTime.day === row && lec.dateTime.period === col,
            )
          }
          cellRenderer={Period}
          rowRenderer={TimeTableDayItem}
          className="flex justify-around h-full w-full p-1 overflow-x-auto snap-x scroll-smooth"
        />
      </main>
      {filteredLectures.some((lec) => lec.dateTime.day === "集中") && (
        <section className="border-t px-2 py-1">
          <h2 className="text-sm font-bold mb-1">集中講義</h2>
          <div className="flex flex-wrap gap-2">
            {filteredLectures
              .filter((lec) => lec.dateTime.day === "集中")
              .map((lecture) => (
                <IntensiveLectureItem key={lecture.number} lecture={lecture} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

function IntensiveLectureItem({ lecture }: { lecture: LotteryCourseStatus }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        className="text-left rounded border p-1"
        onClick={() => setIsOpen(true)}
        aria-label={`${lecture.title} の詳細を開く`}
      >
        <div className="text-xs font-medium truncate max-w-30">
          {lecture.title}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {lecture.teacher}
        </div>
      </button>
      <DetailPopup
        lecture={lecture}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

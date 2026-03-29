"use client";

import { useState } from "react";
import type React from "react";
import type { RenderCellProps } from "@/components/TimeTable/TimeTable";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import ApplicantsBar from "@/components/ApplicantsBar/ApplicantsBar";
import DetailPopup from "@/features/DetailPopup/DetailPopup";

/**
 * 時限セルレンダラー。
 * ApplicantsBar（定員比）と DetailPopup を表示する。
 * legacy の MUI Box + ApplicantsBar 相当。
 */
export default function Period({
  dataFragment,
}: RenderCellProps<LotteryCourseStatus>): React.ReactNode {
  return (
    <div className="overflow-y-auto snap-y snap-proximity flex-1 px-1 py-0.5 min-h-[3rem]">
      {dataFragment.map((lecture) => (
        <LecturePeriodItem key={lecture.number} lecture={lecture} />
      ))}
    </div>
  );
}

function LecturePeriodItem({ lecture }: { lecture: LotteryCourseStatus }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="w-full text-left"
        onClick={() => setIsOpen(true)}
        aria-label={`${lecture.title} の詳細を開く`}
      >
        <ApplicantsBar lecture={lecture} base="capacity" />
      </button>
      <DetailPopup
        lecture={lecture}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

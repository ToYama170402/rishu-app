"use client";

import { useState } from "react";
import type React from "react";
import type { CellRendererProps } from "@/components/TimeTable/TimeTable";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import ApplicantsBar from "@/components/ApplicantsBar/ApplicantsBar";
import DetailPopup from "@/features/DetailPopup/DetailPopup";

/**
 * 時限セルレンダラー。
 * ApplicantsBar（定員比）と DetailPopup を表示する。
 * legacy の MUI Box + ApplicantsBar 相当。
 */
export default function Period({
  data,
}: CellRendererProps<LotteryCourseStatus[], number>): React.ReactNode {
  return (
    <div className="h-1/5 overflow-y-auto snap-y snap-proximity flex-1 py-1 min-h-12">
      {data.map((lecture) => (
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

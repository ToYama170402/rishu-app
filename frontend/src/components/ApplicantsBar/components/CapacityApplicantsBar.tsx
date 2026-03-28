"use client";

import { useState } from "react";
import type { ApplicantsBarProps } from "../types/applicantsBarProps";
import DetailPopup from "@/features/DetailPopup/DetailPopup";

/** 定員比モードの積み上げ棒グラフ */
const CapacityApplicantsBar = ({
  lecture,
}: Omit<ApplicantsBarProps, "base">) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const applicantsAmount = lecture.applicants;

  function handleOpenPopup() {
    setIsPopupOpen((prev) => !prev);
  }

  const width = (applicantAmount: number, capacity: number) =>
    capacity !== 0 ? (applicantAmount / capacity) * 100 + "%" : "0%";

  return (
    <>
      <div className="relative mt-[2px] flex items-center overflow-hidden text-ellipsis text-nowrap [scroll-snap-align:start]">
        {/* 講義名（クリックでポップアップ） */}
        <button
          type="button"
          className="relative z-10 m-[2px] inline-block cursor-pointer overflow-hidden text-ellipsis border-b border-dashed leading-[1.1]"
          onClick={handleOpenPopup}
        >
          {lecture.title}
        </button>

        {/* 積み上げ棒グラフ（背景） */}
        <div className="absolute inset-0 z-0 opacity-70">
          <div className="flex h-full overflow-hidden">
            {/* primary */}
            <div
              className="shrink-0 bg-amber-100"
              style={{
                width: width(applicantsAmount.primary, lecture.capacity),
              }}
            />
            {/* first（primary 除く） */}
            <div
              className="shrink-0 bg-blue-100"
              style={{
                width: width(
                  applicantsAmount.first - applicantsAmount.primary,
                  lecture.capacity,
                ),
              }}
            />
            {/* second */}
            <div
              className="shrink-0 bg-orange-100"
              style={{
                width: width(applicantsAmount.second, lecture.capacity),
              }}
            />
            {/* third */}
            <div
              className="shrink-0 bg-green-100"
              style={{
                width: width(applicantsAmount.third, lecture.capacity),
              }}
            />
            {/* fourth */}
            <div
              className="shrink-0 bg-purple-100"
              style={{
                width: width(applicantsAmount.fourth, lecture.capacity),
              }}
            />
            {/* fifth */}
            <div
              className="shrink-0 bg-gray-100"
              style={{
                width: width(applicantsAmount.fifth, lecture.capacity),
              }}
            />
          </div>
        </div>
      </div>

      <DetailPopup
        lecture={lecture}
        open={isPopupOpen}
        onClose={handleOpenPopup}
      />
    </>
  );
};

export default CapacityApplicantsBar;

import type React from "react";

/**
 * 抽選時間割の横スクロールコンテナ。
 * legacy の MUI Stack（direction="row", overflowX="auto"）相当。
 */
export default function TimeTableContainer({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="flex flex-row items-start justify-start gap-1 p-1 h-full w-full overflow-x-auto snap-x snap-mandatory">
      {children}
    </div>
  );
}

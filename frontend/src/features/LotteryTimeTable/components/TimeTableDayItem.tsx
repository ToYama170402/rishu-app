import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { RenderColumnProps } from "@/components/TimeTable/TimeTable";

/**
 * 曜日カラムコンポーネント。
 * legacy の MUI Paper/Stack 相当を shadcn Card で実装。
 */
export default function TimeTableDayItem({
  xFragment,
  children,
}: RenderColumnProps): React.ReactNode {
  return (
    <Card className="h-full w-full sm:w-[calc(50%-4px)] md:w-[calc(33.333%-4px)] lg:w-[calc(25%-4px)] xl:w-[calc(20%-4px)] shrink-0 grow-0 snap-start scroll-ml-2 gap-0 py-1 px-0 rounded-lg">
      <div className="text-center font-bold text-sm h-6 flex items-center justify-center border-b px-1">
        {String(xFragment)}
      </div>
      <CardContent className="p-0 flex flex-col divide-y">
        {children}
      </CardContent>
    </Card>
  );
}

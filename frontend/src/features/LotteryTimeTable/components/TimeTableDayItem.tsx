import type React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { rowRendererProps } from "@/components/TimeTable/TimeTable";

/**
 * 曜日カラムコンポーネント。
 * legacy の MUI Paper/Stack 相当を shadcn Card で実装。
 */
export default function TimeTableDayItem({
  row,
  children,
}: rowRendererProps<string>): React.ReactNode {
  return (
    <Card className="mx-[2px] w-[calc(100%-2px)] xl:w-[calc(20%-4px)] lg:w-[calc(33.333%-4px)] md:w-[calc(50%-4px)] sm:w-[calc(100%-2px)] h-full overflow-hidden shrink-0 grow-0 py-1 px-0 snap-start scroll-ml-1">
      <CardHeader className="text-center p-0 border-b h-[20px] font-bold text-sm">
        {String(row)}
      </CardHeader>
      <CardContent className="h-[calc(100%-20px)] p-2 divide-y">
        {children}
      </CardContent>
    </Card>
  );
}

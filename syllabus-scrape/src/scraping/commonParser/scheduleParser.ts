import { type DayPeriod, isDayPeriod } from "@/course";
import { zenToHan } from "@/utils/zenToHan";
import { BaseParser, type ParseResult } from "../core";

export class ScheduleParser extends BaseParser<string, DayPeriod[]> {
  parse(input: string): ParseResult<DayPeriod[]> {
    const { result, duration } = this.measureParseTime(() => {
      return zenToHan(input)
        .trim()
        .split(/[,、　 ]/)
        .flatMap<DayPeriod>((s) => {
          const trimmed = s.trim();

          // 集中講義
          if (trimmed === "集中") {
            const dayPeriod = { day: "集中", period: null };
            if (!isDayPeriod(dayPeriod)) {
              throw new Error(`Invalid day/period format: ${trimmed}`);
            }
            return [dayPeriod];
          }

          // コマをまたぐ場合
          if (trimmed.match(/[~〜-]/)) {
            const [start, end] = trimmed
              .slice(1)
              .split(/[~〜-]/)
              .map(Number);
            if (start === undefined || end === undefined) {
              throw new Error(`Invalid period format: ${trimmed}`);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => ({
              day: trimmed[0],
              period: start + i,
            })).map((dayPeriod) => {
              if (!isDayPeriod(dayPeriod)) {
                throw new Error(
                  `Invalid day/period format: ${dayPeriod.day} ${dayPeriod.period}`
                );
              }
              return dayPeriod;
            });
          }

          // 通常のコマ
          const day = trimmed[0];
          const period = Number(trimmed.slice(1));
          const dayPeriod = { day, period };
          if (!isDayPeriod(dayPeriod)) {
            throw new Error(`Invalid day/period format: ${s}`);
          }
          return [dayPeriod];
        });
    });
    return this.createParseResult(result, duration);
  }
}

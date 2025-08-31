import { type DayPeriod, isDayPeriod } from "@/course";
import { zenToHan } from "@/utils/zenToHan";
import { BaseParser, type ParseResult } from "../core";

export class ScheduleParser extends BaseParser<string, DayPeriod[]> {
  parse(input: string): ParseResult<DayPeriod[]> {
    const { result, duration } = this.measureParseTime(() => {
      return zenToHan(input)
        .trim()
        .split(/[,、　 ]/)
        .map((s) => {
          const trimmed = s.trim();

          if (trimmed === "集中") {
            const dayPeriod = { day: "集中", period: null };
            if (!isDayPeriod(dayPeriod)) {
              throw new Error(`Invalid day/period format: ${trimmed}`);
            }
            return dayPeriod;
          }

          const day = trimmed[0];
          const period = Number(trimmed[1]);
          const dayPeriod = { day, period };
          if (!isDayPeriod(dayPeriod)) {
            throw new Error(`Invalid day/period format: ${s}`);
          }
          return dayPeriod;
        });
    });
    return this.createParseResult(result, duration);
  }
}

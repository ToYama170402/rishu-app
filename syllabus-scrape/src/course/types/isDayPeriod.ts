import type { DayPeriod } from "./dayPeriod";

export function isDayPeriod(value: unknown): value is DayPeriod {
  const validDays = ["月", "火", "水", "木", "金", "土", "日"];
  const hasRequiredProperties =
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "day" in value &&
    "period" in value;

  if (!hasRequiredProperties) return false;

  const isValidDay =
    typeof value.day === "string" && validDays.includes(value.day);

  const isValidPeriod =
    typeof value.period === "number" && value.period > 0 && value.period <= 8;

  const isIntensive = value.day === "集中" && value.period === null;

  return (isValidDay && isValidPeriod) || isIntensive;
}

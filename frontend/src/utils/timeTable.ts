import type { DayPeriod } from "@/types/dayPeriod";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";

/**
 * 2次元文字列配列（TSV パース結果）を LotteryCourseStatus の配列に変換する。
 *
 * 各行の列順:
 * 0: 科目番号, 1: カテゴリ, 2: タイトル, 3: 曜日時限（例: "月1", "集中"）,
 * 4: 担当教員, 5: 対象学生, 6: 定員,
 * 7: 志望者全体, 8: 第一希望, 9: 第一志望, 10: 第二志望,
 * 11: 第三志望, 12: 第四志望, 13: 第五志望
 */
export function array2LectureArray(arr: string[][]): LotteryCourseStatus[] {
  const lectures: LotteryCourseStatus[] = [];
  for (const line of arr) {
    try {
      const dayStr = line[3];
      let dateTime: DayPeriod;
      if (dayStr.startsWith("集中")) {
        dateTime = { day: "集中", period: null };
      } else {
        dateTime = {
          day: dayStr[0] as "月" | "火" | "水" | "木" | "金" | "土" | "日",
          period: Number(dayStr[1]) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
        };
      }

      const lec: LotteryCourseStatus = {
        number: line[0],
        category: line[1] as LotteryCourseStatus["category"],
        title: line[2],
        dateTime,
        teacher: line[4],
        target: line[5],
        capacity: Number(line[6]),
        applicants: {
          all: Number(line[7]),
          primary: Number(line[8]),
          first: Number(line[9]),
          second: Number(line[10]),
          third: Number(line[11]),
          fourth: Number(line[12]),
          fifth: Number(line[13]),
        },
      };
      lectures.push(lec);
    } catch (e) {
      console.error(
        `array2LectureArray: failed to parse line[${arr.indexOf(line)}]`,
        line,
        e,
      );
    }
  }
  return lectures;
}

import type { Semester } from "@/course";
import { isSemester } from "@/course";
import { zenToHan } from "@/utils/zenToHan";
import { BaseParser } from "../core";

export class SemesterParser extends BaseParser<string, Semester[]> {
  parse(input: string) {
    const { result, duration } = this.measureParseTime(() => {
      return zenToHan(input)
        .trim()
        .split(/[,、　 ]/)
        .flatMap((s) => {
          const trimmed = s.trim();
          switch (trimmed) {
            case "前期":
              return [1, 2];
            case "後期":
              return [3, 4];
            default:
              return [Number(trimmed)];
          }
        })
        .map((s) => {
          const semester = Number(s);
          if (!isSemester(semester)) {
            throw new Error(`Invalid semester format: ${s}`);
          }
          return semester;
        });
    });
    return this.createParseResult(result, duration);
  }
}

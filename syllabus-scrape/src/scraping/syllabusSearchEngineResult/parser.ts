import type {
  DayPeriod,
  Faculty,
  Instructor,
  Semester,
  SyllabusSearchResult,
} from "@/course";
import { BaseParser, type ParsingContext } from "../core";

type SyllabusSearchResultParserInput = {
  courseNumber: string;
  japaneseUrl: string;
  englishUrl: string;
  faculty: Faculty;
  title: string;
  instructors: Instructor[];
  semester: Semester[];
  schedule: DayPeriod[];
};

export class SyllabusSearchResultParser extends BaseParser<
  SyllabusSearchResultParserInput,
  SyllabusSearchResult
> {
  parse(input: SyllabusSearchResultParserInput, context?: ParsingContext) {
    const { result, duration } = this.measureParseTime(() => {
      return {
        courseNumber: input.courseNumber,
        japaneseUrl: input.japaneseUrl,
        englishUrl: input.englishUrl,
        faculty: input.faculty,
        title: input.title.replace(/[.*?]/g, ""),
        instructors: input.instructors,
        semester: input.semester,
        schedule: input.schedule,
      };
    });
    return this.createParseResult(result, duration);
  }
}

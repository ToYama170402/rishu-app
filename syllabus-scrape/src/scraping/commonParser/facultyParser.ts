import type { Faculty } from "@/course";
import { isFaculty } from "@/course";
import { isDepartment } from "@/course/types/isDepartment";
import { BaseParser, type ParseResult, type ParsingContext } from "../core";

type Input = { faculty: string; department: string };

export class FacultyParser extends BaseParser<Input, Faculty> {
  parse(input: Input, context?: ParsingContext): ParseResult<Faculty> {
    const { result, duration } = this.measureParseTime(() => {
      const faculty = { faculty: input.faculty, department: input.department };
      if (isFaculty(faculty) && isDepartment(faculty.department)) {
        return faculty;
      }
      throw new Error("Invalid faculty or department");
    });
    return this.createParseResult(result, duration);
  }
}

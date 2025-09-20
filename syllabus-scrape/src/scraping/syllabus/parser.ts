import type {
  DayPeriod,
  Department,
  Instructor,
  Semester,
  SyllabusCourse,
} from "@/course";
import { zenToHan } from "@/utils/zenToHan";
import { BaseParser, type ParsingContext } from "../core";

export type SyllabusParserInput = {
  title: string;
  instructors: Instructor[];
  numbering: string;
  courseNumber: string;
  lectureForm: string;
  numberOfProper: string;
  schedule: DayPeriod[];
  classFormat: string;
  subjectDistinguished: string;
  semester: Semester[];
  numberOfCredits: string;
  max60CreditsFlag: string;
  targetStudents: string;
  keywords: string;
  lectureRoomInfo: string;
  openAccount: string;
  note: string;
  department: Department;
  courseDescription: string;
};

export class SyllabusParser extends BaseParser<
  SyllabusParserInput,
  SyllabusCourse
> {
  parse(input: SyllabusParserInput, context?: ParsingContext) {
    const { result, duration } = this.measureParseTime(() => {
      return {
        title: input.title.replace(/\[.*?\]/g, ""),
        instructors: input.instructors,
        numbering: input.numbering,
        courseNumber: input.courseNumber,
        lectureForm: input.lectureForm,
        numberOfProper: (() => {
          const n = Number(
            zenToHan(input.numberOfProper).replace(/[^0-9]/g, "")
          );
          return Number.isNaN(n) ? null : n;
        })(),
        schedules: input.schedule,
        classFormat: input.classFormat,
        subjectDistinguished: input.subjectDistinguished,
        semester: input.semester,
        numberOfCredits: (() => {
          const n = Number(
            zenToHan(input.numberOfCredits.replace(/[^0-9]/g, ""))
          );
          if (Number.isNaN(n)) {
            this.addWarning("Invalid number of credits");
            return 0;
          }
          return n;
        })(),
        max60CreditsFlag: input.max60CreditsFlag,
        targetStudents: input.targetStudents,
        keywords: input.keywords
          .split(/[,、](?![^()]*\))/)
          .map((kw) => kw.trim()),
        lectureRoomInfo: input.lectureRoomInfo,
        openAccount: input.openAccount,
        note: input.note,
        department: input.department,
        courseDescription: input.courseDescription,
      };
    });
    return this.createParseResult(result, duration);
  }
}

import { lectureWithApplicantsAmount } from "@/types/lecture";
import { datePeriod } from "@/types/datePeriod";
import { filters } from "@/features/TimeTable/types/filter";
import { applicantsAmount } from "@/types/applicantsAmount";

export function array2LectureArray(
  arr: string[][]
): lectureWithApplicantsAmount[] {
  let lectures: lectureWithApplicantsAmount[] = [];
  for (const line of arr) {
    try {
      const lec: lectureWithApplicantsAmount = {
        number: line[0],
        category: line[1] as lectureWithApplicantsAmount["category"],
        title: line[2],
        dateTime: {
          date: line[3][0] as datePeriod["date"],
          period: Number(line[3][1]) as datePeriod["period"],
        },
        teacher: line[4],
        target: line[5],
        capacity: Number(line[6]),
        applicants: {
          all: Number(line[7]),
          primary: Number(line[8]),
          first: Number(line[9]),
          second: Number(line[10]),
          third: Number(line[11]),
          forth: Number(line[12]),
          fifth: Number(line[13]),
        },
      };
      lectures.push(lec);
    } catch (e) {
      console.error(e);
    }
  }
  return lectures;
}

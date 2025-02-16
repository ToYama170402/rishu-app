import { lectureWithApplicantsAmount } from "@/types/lecture";
import { datePeriod } from "@/types/datePeriod";
import { filters } from "@/types/filter";
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

export function lectureArray2Filter(
  lectures: lectureWithApplicantsAmount[]
): filters {
  let filters: filters = {
    category: {},
    teacher: {},
    targetStudent: {},
  };
  for (const lec of lectures) {
    if (!filters.category[lec.category]) {
      filters.category[lec.category] = true;
    }
    if (!filters.teacher[lec.teacher]) {
      filters.teacher[lec.teacher] = true;
    }
    if (!filters.targetStudent[lec.target]) {
      filters.targetStudent[lec.target] = true;
    }
  }
  return filters;
}

export function calcApplicantsRatio(
  capacity: number,
  applicantsAmount: applicantsAmount
): number[] {
  const applicants = [
    applicantsAmount.primary,
    applicantsAmount.first - applicantsAmount.primary,
    applicantsAmount.second,
    applicantsAmount.third,
    applicantsAmount.forth,
    applicantsAmount.fifth,
  ];
  let ratio: number[] = [];
  let excess = capacity;
  applicants.forEach((a) => {
    if (excess >= a && excess > 0) {
      ratio.push(1);
      excess -= a;
    } else {
      ratio.push(a === 0 ? 0 : excess / a);
      excess = 0;
    }
  });
  return ratio;
}

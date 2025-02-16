// 月１みたいな曜日時限のデータを保持
export type date = "月" | "火" | "水" | "木" | "金";

export type datePeriod = {
  date: date;
  period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export type category =
  | "ＧＳ科目"
  | "自由履修科目"
  | "ＧＳ言語科目"
  | "言語科目Ａ"
  | "言語科目Ｂ";

export type teacher = string;

export type targetStudent = string;

// 全志望者数と各志望者数を保持
export type applicantsAmount = {
  all: number;
  primary: number;
  first: number;
  second: number;
  third: number;
  forth: number;
  fifth: number;
};
// 講義情報を保持
export type lecture = {
  number: string;
  category: category;
  title: string;
  dateTime: datePeriod;
  teacher: teacher;
  target: targetStudent;
  capacity: number;
  applicants: applicantsAmount;
};
// 一日の講義情報を保持
export type dateTimeTable = {
  period1: lecture[];
  period2: lecture[];
  period3: lecture[];
  period4: lecture[];
  period5: lecture[];
  period6: lecture[];
  period7: lecture[];
  period8: lecture[];
};
// 一週間の講義情報を保持
export type weekTimeTable = {
  monday: dateTimeTable;
  tuesday: dateTimeTable;
  wednesday: dateTimeTable;
  thursday: dateTimeTable;
  friday: dateTimeTable;
};

export type filterElement = {
  [key: string]: boolean;
};

export type filters = {
  category: filterElement;
  teacher: filterElement;
  targetStudent: filterElement;
};

export const weekTimeTable2Dates = (
  weekTimeTable: weekTimeTable
): dateTimeTable[] => [
  weekTimeTable.monday,
  weekTimeTable.tuesday,
  weekTimeTable.wednesday,
  weekTimeTable.thursday,
  weekTimeTable.friday,
];

export const dateTimeTable2Periods = (
  dateTimeTable: dateTimeTable
): lecture[][] => [
  dateTimeTable.period1,
  dateTimeTable.period2,
  dateTimeTable.period3,
  dateTimeTable.period4,
  dateTimeTable.period5,
  dateTimeTable.period6,
  dateTimeTable.period7,
  dateTimeTable.period8,
];

export function array2LectureArray(arr: string[][]): lecture[] {
  let lectures: lecture[] = [];
  for (const line of arr) {
    try {
      const lec: lecture = {
        number: line[0],
        category: line[1] as lecture["category"],
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

export function lectureArray2Filter(lectures: lecture[]): filters {
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

export function array2WeekTimeTable(arr: string[][]): weekTimeTable {
  let weekTimeTable: weekTimeTable = {
    monday: {
      period1: [],
      period2: [],
      period3: [],
      period4: [],
      period5: [],
      period6: [],
      period7: [],
      period8: [],
    },
    tuesday: {
      period1: [],
      period2: [],
      period3: [],
      period4: [],
      period5: [],
      period6: [],
      period7: [],
      period8: [],
    },
    wednesday: {
      period1: [],
      period2: [],
      period3: [],
      period4: [],
      period5: [],
      period6: [],
      period7: [],
      period8: [],
    },
    thursday: {
      period1: [],
      period2: [],
      period3: [],
      period4: [],
      period5: [],
      period6: [],
      period7: [],
      period8: [],
    },
    friday: {
      period1: [],
      period2: [],
      period3: [],
      period4: [],
      period5: [],
      period6: [],
      period7: [],
      period8: [],
    },
  };
  for (const line of arr) {
    try {
      const lec: lecture = {
        number: line[0],
        category: line[1] as lecture["category"],
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
      if (lec.dateTime.date === "月") {
        if (lec.dateTime.period === 1) weekTimeTable.monday.period1.push(lec);
        if (lec.dateTime.period === 2) weekTimeTable.monday.period2.push(lec);
        if (lec.dateTime.period === 3) weekTimeTable.monday.period3.push(lec);
        if (lec.dateTime.period === 4) weekTimeTable.monday.period4.push(lec);
        if (lec.dateTime.period === 5) weekTimeTable.monday.period5.push(lec);
        if (lec.dateTime.period === 6) weekTimeTable.monday.period6.push(lec);
        if (lec.dateTime.period === 7) weekTimeTable.monday.period7.push(lec);
        if (lec.dateTime.period === 8) weekTimeTable.monday.period8.push(lec);
      }
      if (lec.dateTime.date === "火") {
        if (lec.dateTime.period === 1) weekTimeTable.tuesday.period1.push(lec);
        if (lec.dateTime.period === 2) weekTimeTable.tuesday.period2.push(lec);
        if (lec.dateTime.period === 3) weekTimeTable.tuesday.period3.push(lec);
        if (lec.dateTime.period === 4) weekTimeTable.tuesday.period4.push(lec);
        if (lec.dateTime.period === 5) weekTimeTable.tuesday.period5.push(lec);
        if (lec.dateTime.period === 6) weekTimeTable.tuesday.period6.push(lec);
        if (lec.dateTime.period === 7) weekTimeTable.tuesday.period7.push(lec);
        if (lec.dateTime.period === 8) weekTimeTable.tuesday.period8.push(lec);
      }
      if (lec.dateTime.date === "水") {
        if (lec.dateTime.period === 1)
          weekTimeTable.wednesday.period1.push(lec);
        if (lec.dateTime.period === 2)
          weekTimeTable.wednesday.period2.push(lec);
        if (lec.dateTime.period === 3)
          weekTimeTable.wednesday.period3.push(lec);
        if (lec.dateTime.period === 4)
          weekTimeTable.wednesday.period4.push(lec);
        if (lec.dateTime.period === 5)
          weekTimeTable.wednesday.period5.push(lec);
        if (lec.dateTime.period === 6)
          weekTimeTable.wednesday.period6.push(lec);
        if (lec.dateTime.period === 7)
          weekTimeTable.wednesday.period7.push(lec);
        if (lec.dateTime.period === 8)
          weekTimeTable.wednesday.period8.push(lec);
      }
      if (lec.dateTime.date === "木") {
        if (lec.dateTime.period === 1) weekTimeTable.thursday.period1.push(lec);
        if (lec.dateTime.period === 2) weekTimeTable.thursday.period2.push(lec);
        if (lec.dateTime.period === 3) weekTimeTable.thursday.period3.push(lec);
        if (lec.dateTime.period === 4) weekTimeTable.thursday.period4.push(lec);
        if (lec.dateTime.period === 5) weekTimeTable.thursday.period5.push(lec);
        if (lec.dateTime.period === 6) weekTimeTable.thursday.period6.push(lec);
        if (lec.dateTime.period === 7) weekTimeTable.thursday.period7.push(lec);
        if (lec.dateTime.period === 8) weekTimeTable.thursday.period8.push(lec);
      }
      if (lec.dateTime.date === "金") {
        if (lec.dateTime.period === 1) weekTimeTable.friday.period1.push(lec);
        if (lec.dateTime.period === 2) weekTimeTable.friday.period2.push(lec);
        if (lec.dateTime.period === 3) weekTimeTable.friday.period3.push(lec);
        if (lec.dateTime.period === 4) weekTimeTable.friday.period4.push(lec);
        if (lec.dateTime.period === 5) weekTimeTable.friday.period5.push(lec);
        if (lec.dateTime.period === 6) weekTimeTable.friday.period6.push(lec);
        if (lec.dateTime.period === 7) weekTimeTable.friday.period7.push(lec);
        if (lec.dateTime.period === 8) weekTimeTable.friday.period8.push(lec);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return weekTimeTable;
}

export function weekTimeTable2Filters(weekTimeTable: weekTimeTable): filters {
  let filters: filters = {
    category: {},
    teacher: {},
    targetStudent: {},
  };
  for (const day of weekTimeTable2Dates(weekTimeTable)) {
    for (const period of dateTimeTable2Periods(day)) {
      for (const lec of period) {
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

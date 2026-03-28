import { describe, test, expect } from "vitest";
import { lectureArray2Filter } from "./lectureArray2Filter";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";

function groupByKey(filters: { key: string; value: string }[]) {
  return filters.reduce<Record<string, string[]>>((acc, f) => {
    acc[f.key] = acc[f.key] || [];
    acc[f.key].push(f.value);
    return acc;
  }, {});
}

describe("lectureArray2Filter", () => {
  test("空の配列を渡すと空の配列を返す", () => {
    const res = lectureArray2Filter([]);
    expect(res).toStrictEqual([]);
  });

  test("単一の講義を正しく処理する", () => {
    const lec: LotteryCourseStatus = {
      number: "001",
      category: "自由履修科目",
      title: "Intro to Testing",
      dateTime: {
        day: "月",
        period: 1,
      },
      teacher: "Alice",
      target: "Undergrad",
      capacity: 100,
      applicants: {
        all: 38,
        primary: 10,
        first: 20,
        second: 10,
        third: 5,
        fourth: 2,
        fifth: 1,
      },
    };

    const res = lectureArray2Filter([lec]);
    // expect four entries: category, title, teacher, target
    const grouped = groupByKey(res);
    expect(Object.keys(grouped).sort()).toStrictEqual([
      "category",
      "target",
      "teacher",
      "title",
    ]);
    expect(grouped["title"]).toStrictEqual(["Intro to Testing"]);
    expect(grouped["category"]).toStrictEqual(["自由履修科目"]);
    expect(grouped["teacher"]).toStrictEqual(["Alice"]);
    expect(grouped["target"]).toStrictEqual(["Undergrad"]);
  });

  test("重複を削除し、各キーごとに値をソートしてキーの割り当てを保持する", () => {
    const lectures: LotteryCourseStatus[] = [
      {
        number: "1",
        title: "A",
        category: "自由履修科目",
        dateTime: {
          day: "月",
          period: 1,
        },
        capacity: 30,
        teacher: "t1",
        target: "z",
        applicants: {
          all: 30,
          primary: 10,
          first: 10,
          second: 5,
          third: 3,
          fourth: 1,
          fifth: 1,
        },
      },
      {
        number: "2",
        title: "B",
        category: "言語科目Ａ",
        dateTime: {
          day: "火",
          period: 2,
        },
        capacity: 30,
        teacher: "t2",
        target: "y",
        applicants: {
          all: 30,
          primary: 10,
          first: 10,
          second: 5,
          third: 3,
          fourth: 1,
          fifth: 1,
        },
      },
    ];

    const res = lectureArray2Filter(lectures);
    const grouped = groupByKey(res);

    expect(grouped["category"]).toStrictEqual(["言語科目Ａ", "自由履修科目"]);
    expect(grouped["title"]).toStrictEqual(["A", "B"]);
    expect(grouped["teacher"]).toStrictEqual(["t1", "t2"]);
    expect(grouped["target"]).toStrictEqual(["y", "z"]);
  });

  test("各フィールドの重複を削除し、ソートして返す", () => {
    const lectures: LotteryCourseStatus[] = [
      {
        number: "1",
        title: "X",
        category: "自由履修科目",
        dateTime: {
          day: "月",
          period: 1,
        },
        capacity: 30,
        teacher: "Dr. T",
        target: "Undergrad",
        applicants: {
          all: 30,
          primary: 10,
          first: 10,
          second: 5,
          third: 3,
          fourth: 1,
          fifth: 1,
        },
      },
      {
        number: "2",
        title: "Y",
        category: "自由履修科目",
        dateTime: {
          day: "火",
          period: 2,
        },
        capacity: 30,
        teacher: "Dr. T",
        target: "Grad",
        applicants: {
          all: 30,
          primary: 10,
          first: 10,
          second: 5,
          third: 3,
          fourth: 1,
          fifth: 1,
        },
      },
    ];

    const expectedCategory = ["自由履修科目"];
    const expectedTitle = ["X", "Y"];
    const expectedTeacher = ["Dr. T"];
    const expectedTarget = ["Grad", "Undergrad"];

    const grouped = groupByKey(lectureArray2Filter(lectures));

    expect(grouped["category"]).toStrictEqual(expectedCategory);
    expect(grouped["title"]).toStrictEqual(expectedTitle);
    expect(grouped["teacher"]).toStrictEqual(expectedTeacher);
    expect(grouped["target"]).toStrictEqual(expectedTarget);
  });
});

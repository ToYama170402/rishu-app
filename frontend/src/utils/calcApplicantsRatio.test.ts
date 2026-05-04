import { describe, test, expect } from "vitest";
import { calcApplicantsRatio } from "./calcApplicantsRatio";
import type { ApplicantsAmount } from "@/types/applicantsAmount";

describe("calcApplicantsRatio", () => {
  test("総応募者数がゼロの場合", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 0,
      primary: 0,
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1]);
  });

  test("総応募者数が定員を下回る場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 3,
      primary: 0,
      first: 2,
      second: 1,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1]);
  });

  test("総応募者数が定員を下回る場合（優先指定あり）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 2,
      primary: 1,
      first: 1,
      second: 1,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1]);
  });

  test("優先指定でちょうど定員に達する場合", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 12,
      primary: 10,
      first: 10,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 0, 0, 0, 0, 0]);
  });

  test("第一希望でちょうど定員に達する場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 10,
      primary: 0,
      first: 10,
      second: 3,
      third: 1,
      fourth: 1,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 0, 0, 0, 0]);
  });

  test("第一希望でちょうど定員に達する場合（優先指定あり）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 15,
      primary: 2,
      first: 10,
      second: 3,
      third: 1,
      fourth: 1,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 0, 0, 0, 0]);
  });

  test("第二希望でちょうど定員に達する場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 15,
      primary: 0,
      first: 8,
      second: 2,
      third: 3,
      fourth: 2,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 0, 0, 0]);
  });

  test("第二希望でちょうど定員に達する場合（優先指定あり）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 15,
      primary: 2,
      first: 8,
      second: 2,
      third: 3,
      fourth: 2,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 0, 0, 0]);
  });

  test("第三希望でちょうど定員に達する場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 17,
      primary: 0,
      first: 8,
      second: 1,
      third: 1,
      fourth: 3,
      fifth: 4,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 0, 0]);
  });

  test("第三希望でちょうど定員に達する場合（優先指定あり）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 17,
      primary: 2,
      first: 8,
      second: 1,
      third: 1,
      fourth: 3,
      fifth: 4,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 0, 0]);
  });

  test("第四希望でちょうど定員に達する場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 14,
      primary: 0,
      first: 7,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 4,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 0]);
  });

  test("第四希望でちょうど定員に達する場合（優先指定あり）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 14,
      primary: 2,
      first: 7,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 4,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 0]);
  });

  test("第五希望でちょうど定員に達する場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 10,
      primary: 0,
      first: 6,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 1,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1]);
  });

  test("第五希望でちょうど定員に達する場合（優先指定あり）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 10,
      primary: 2,
      first: 6,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 1,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1]);
  });

  test("第一希望で定員を超える場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 15,
      primary: 0,
      first: 15,
      second: 3,
      third: 1,
      fourth: 1,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 10 / 15, 0, 0, 0, 0]);
  });

  test("第一希望で定員を超える場合（優先指定では定員を超えない）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 20,
      primary: 2,
      first: 15,
      second: 3,
      third: 1,
      fourth: 1,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 8 / 13, 0, 0, 0, 0]);
  });

  test("第一希望で定員を超える場合（優先指定も定員を超える）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 20,
      primary: 12,
      first: 15,
      second: 3,
      third: 1,
      fourth: 1,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([10 / 12, 0, 0, 0, 0, 0]);
  });

  test("第二希望で定員を超える場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 20,
      primary: 0,
      first: 8,
      second: 7,
      third: 3,
      fourth: 2,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 2 / 7, 0, 0, 0]);
  });

  test("第二希望で定員を超える場合（優先指定では定員を超えない）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 20,
      primary: 2,
      first: 8,
      second: 7,
      third: 3,
      fourth: 2,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 2 / 7, 0, 0, 0]);
  });

  test("第三希望で定員を超える場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 19,
      primary: 0,
      first: 8,
      second: 1,
      third: 7,
      fourth: 2,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1 / 7, 0, 0]);
  });

  test("第三希望で定員を超える場合（優先指定では定員を超えない）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 19,
      primary: 2,
      first: 8,
      second: 1,
      third: 7,
      fourth: 2,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1 / 7, 0, 0]);
  });

  test("第四希望で定員を超える場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 18,
      primary: 0,
      first: 7,
      second: 1,
      third: 1,
      fourth: 9,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1 / 9, 0]);
  });

  test("第四希望で定員を超える場合（優先指定では定員を超えない）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 18,
      primary: 2,
      first: 7,
      second: 1,
      third: 1,
      fourth: 9,
      fifth: 0,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1 / 9, 0]);
  });

  test("第五希望で定員を超える場合（優先指定なし）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 15,
      primary: 0,
      first: 6,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 6,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1 / 6]);
  });

  test("第五希望で定員を超える場合（優先指定では定員を超えない）", () => {
    const capacity = 10;
    const applicants: ApplicantsAmount = {
      all: 15,
      primary: 2,
      first: 6,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 6,
    };
    const ratio = calcApplicantsRatio(capacity, applicants);
    expect(ratio).toStrictEqual([1, 1, 1, 1, 1, 1 / 6]);
  });
});

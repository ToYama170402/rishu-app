import type { ApplicantsAmount } from "@/types/applicantsAmount";

/**
 * 定員と志望者数から、志望順位ごとの充足率を計算する。
 *
 * 返り値は [primary, first（primary除く）, second, third, fourth, fifth] の順の比率配列。
 * 各値は 0〜1 の範囲で、1 は全員が充足していることを示す。
 */
export function calcApplicantsRatio(
  capacity: number,
  applicantsAmount: ApplicantsAmount
): number[] {
  const applicants = [
    applicantsAmount.primary,
    applicantsAmount.first - applicantsAmount.primary,
    applicantsAmount.second,
    applicantsAmount.third,
    applicantsAmount.fourth,
    applicantsAmount.fifth,
  ];

  const ratio: number[] = [];
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

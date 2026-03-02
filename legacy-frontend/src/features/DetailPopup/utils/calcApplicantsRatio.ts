import type { applicantsAmount } from "@/types/applicantsAmount";
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

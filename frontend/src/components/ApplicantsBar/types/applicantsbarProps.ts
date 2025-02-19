import { lectureWithApplicantsAmount } from "@/types/lecture";

type ApplicantsBarProps = {
  lecture: lectureWithApplicantsAmount;
  base: "capacity" | "allApplicants";
};
export default ApplicantsBarProps;

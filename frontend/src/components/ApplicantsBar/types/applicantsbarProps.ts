import { lecture } from "@/util/timeTable";

type ApplicantsBarProps = {
  lecture: lecture;
  base: "capacity" | "allApplicants";
};
export default ApplicantsBarProps;

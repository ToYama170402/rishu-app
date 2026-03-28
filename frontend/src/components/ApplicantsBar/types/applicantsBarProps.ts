import type { LotteryCourseStatus } from "@/types/lotteryCourse";

export type ApplicantsBarProps = {
  lecture: LotteryCourseStatus;
  base: "capacity" | "allApplicants";
};

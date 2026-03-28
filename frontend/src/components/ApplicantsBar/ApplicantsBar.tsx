import CapacityApplicantsBar from "./components/CapacityApplicantsBar";
import AllApplicantsBar from "./components/AllApplicantsBar";
import type { ApplicantsBarProps } from "./types/applicantsBarProps";

const ApplicantsBar = ({ lecture, base }: ApplicantsBarProps) => {
  return base === "capacity" ? (
    <CapacityApplicantsBar lecture={lecture} />
  ) : (
    <AllApplicantsBar lecture={lecture} />
  );
};

export default ApplicantsBar;

import ApplicantsBar from "@/components/ApplicantsBar/ApplicantsBar";
import type { RenderCellProps } from "@/components/TimeTable/TimeTable";
import { lectureWithApplicantsAmount } from "@/types/lecture";
import { Box } from "@mui/material";

const Period = ({
  xFragment,
  yFragment,
  dataFragment,
}: RenderCellProps<lectureWithApplicantsAmount>): JSX.Element => (
  <Box
    padding="0 4px"
    sx={{
      overflow: "auto",
      scrollSnapType: "y proximity",
      flex: "1 1 0",
    }}
  >
    {dataFragment &&
      dataFragment.map((lecture) => (
        <ApplicantsBar lecture={lecture} base="capacity" key={lecture.number} />
      ))}
  </Box>
);
export default Period;

import ApplicantsBar from "@/components/ApplicantsBar";
import type { RenderCellProps } from "@/components/TimeTable/TimeTable";
import { lecture } from "@/util/timeTable";
import { Box } from "@mui/material";

const Period = ({
  xFragment,
  yFragment,
  dataFragment,
}: RenderCellProps<lecture>): JSX.Element => (
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

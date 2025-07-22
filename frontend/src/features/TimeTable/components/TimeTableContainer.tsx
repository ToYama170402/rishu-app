import Stack from "@mui/material/Stack";

import type { JSX } from "react";

const TimeTableContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <Stack
    direction={"row"}
    alignItems={"start"}
    justifyContent={"left"}
    spacing={1}
    padding={1}
    height={"100%"}
    width={"100%"}
    sx={{
      overflowX: "auto",
      scrollSnapType: "x mandatory",
    }}
  >
    {children}
  </Stack>
);
export default TimeTableContainer;

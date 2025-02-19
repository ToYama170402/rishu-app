import { RenderColumnProps } from "@/components/TimeTable/TimeTable";
import { Box, Divider, Paper, Stack } from "@mui/material";
import type { JSX } from "react";
const TimeTableDayItem = ({
  xFragment,
  children,
}: RenderColumnProps): JSX.Element => (
  <Paper
    elevation={3}
    sx={{
      height: "100%",
      width: {
        xs: "100%",
        sm: "calc((100% - 8px) / 2)",
        md: "calc((100% - 16px) / 3)",
        lg: "calc((100% - 24px) / 4)",
        xl: "calc((100% - 32px) / 5)",
      },
      flexGrow: 0,
      flexShrink: 0,
      scrollSnapAlign: "start",
      scrollMarginLeft: "8px",
    }}
  >
    <Stack spacing={1} height={"100%"} padding={1} divider={<Divider />}>
      <Box
        sx={{
          height: "1em",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {xFragment}
      </Box>
      {children}
    </Stack>
  </Paper>
);
export default TimeTableDayItem;

"use client";
import { Box, Stack } from "@mui/material";
import { lecture } from "../util/timeTable";
import PcAppBar from "@/features/AppBar/PcAppBar";
import MobileAppBar from "@/features/AppBar/MobileAppBar";

export default function Layout({
  timeTable,
}: {
  timeTable: lecture[];
}): JSX.Element {
  return (
    <Stack
      direction={{ sm: "row", xs: "column" }}
      sx={{ height: "100%", width: "100%" }}
    >
      <PcAppBar />
      <Box
        sx={{
          height: {
            sm: `100%`,
            xs: `calc(100% - 64px)`,
          },
          flex: 1,
          overflow: "auto",
        }}
      >
        <TimeTable
          timeTable={timeTableData}
          filter={filters}
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <MobileAppBar />
    </Stack>
  );
}

"use client";
import { Box, Stack } from "@mui/material";
import { lecture } from "../util/timeTable";
import PcAppBar from "@/features/AppBar/PcAppBar";
import MobileAppBar from "@/features/AppBar/MobileAppBar";

export default function Layout({
  children,
}: {
  timeTable: lecture[];
  children?: React.ReactNode;
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
        {children}
      </Box>
      <MobileAppBar />
    </Stack>
  );
}

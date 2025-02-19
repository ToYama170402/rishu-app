"use client";
import { Box, Stack } from "@mui/material";
import { ReactNode, useState } from "react";
import { lecture } from "../util/timeTable";
import PcAppBar from "@/features/AppBar/PcAppBar";
import MobileAppBar from "@/features/AppBar/MobileAppBar";
import appBarContext from "@/features/AppBar/appBarContext";

export default function Layout({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  const [appBarContents, setAppBarContents] = useState<ReactNode>(null);
  return (
    <Stack
      direction={{ sm: "row", xs: "column" }}
      sx={{ height: "100%", width: "100%" }}
    >
      <PcAppBar>{appBarContents}</PcAppBar>
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
        <appBarContext.Provider value={setAppBarContents}>
          {children}
        </appBarContext.Provider>
      </Box>
      <MobileAppBar>{appBarContents}</MobileAppBar>
    </Stack>
  );
}

"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ReactNode, useState, type JSX } from "react";
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

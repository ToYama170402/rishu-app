"use client";
import { Box, Stack } from "@mui/material";
import { ReactNode, useState, type JSX } from "react";
import AppBar from "@/features/AppBar/AppBar";
import appBarContext from "@/features/AppBar/appBarContext";

export default function Layout({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  const [appBarContents, setAppBarContents] = useState<ReactNode>(null);
  return (
    <Stack direction={{ xs: "column" }} sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: {
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
      <AppBar>{appBarContents}</AppBar>
    </Stack>
  );
}

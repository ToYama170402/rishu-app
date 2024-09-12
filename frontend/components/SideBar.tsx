"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  useMediaQuery,
  AppBar,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar as ToolBar,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import DrawerContents from "./DrawerContents";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const theme = useTheme();
  const isPC = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(isPC);
  const [drawerWidth, setDrawerWidth] = useState("160px");

  const handleDrawerOpen = () => {
    setOpen(!open);
    setDrawerWidth(open ? "160px" : "56px");
  };

  const PcSideBar = (): React.ReactNode => {
    return (
      <>
        <Paper
          sx={{
            width: drawerWidth,
            display: isPC ? "block" : "none",
            overflow: "hidden",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: "0px 4px 4px 0px",
          }}
        >
          <Box p={1} height={"100%"}>
            <Stack direction="row" justifyContent="space-between">
              <IconButton onClick={handleDrawerOpen} sx={{ color: "inherit" }}>
                <MenuIcon sx={{ display: "block" }} />
              </IconButton>
              <Box p={1}>
                <Typography variant="h6" variantMapping={{ h6: "h1" }} noWrap>
                  rishu-app
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              height={"calc(100% - 48px)"}
            >
              <DrawerContents />
              <Box>
                <Button
                  variant={"text"}
                  startIcon={<HelpIcon />}
                  sx={{
                    textWrap: "nowrap",
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  ヘルプ
                </Button>
                <Button
                  variant={"text"}
                  startIcon={<SettingsIcon />}
                  sx={{
                    textWrap: "nowrap",
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  設定
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </>
    );
  };

  const MobileSideBar = (): React.ReactNode => {
    return (
      <>
        <AppBar
          sx={{
            position: "static",
            display: isPC ? "none" : "block",
            color: theme.palette.primary.contrastText,
            borderRadius: "4px 4px 0px 0px",
          }}
        >
          <ToolBar>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box p={1}>
                <Typography variant="h6" variantMapping={{ h6: "h1" }}>
                  rishu-app
                </Typography>
              </Box>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <HelpIcon
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
                <IconButton>
                  <SettingsIcon
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
                <IconButton onClick={handleDrawerOpen}>
                  <MenuOpen
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </ToolBar>
        </AppBar>
        <SwipeableDrawer
          onClose={handleDrawerOpen}
          onOpen={handleDrawerOpen}
          anchor="right"
          open={open}
          sx={{ display: isPC ? "none" : "block", width: "80vw" }}
        >
          <Box p={1} sx={{ width: "80vw" }}>
            <DrawerContents />
          </Box>
        </SwipeableDrawer>
      </>
    );
  };

  return (
    <Stack direction={isPC ? "row" : "column"}>
      <PcSideBar />
      <Box
        sx={{
          width: `calc(100% - ${isPC ? drawerWidth : "0px"})`,
          height: `calc(100vh - ${isPC ? "0px" : "56px"})`,
        }}
      >
        {children}
      </Box>
      <MobileSideBar />
    </Stack>
  );
}

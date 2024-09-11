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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import SettingsIcon from "@mui/icons-material/Settings";
function DrawerContent(): React.ReactNode {
  return <>hello world</>;
}
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const theme = useTheme();
  const isPC = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(`isPC: ${isPC}`);
  const [open, setOpen] = useState(isPC ? true : false);
  const [drawerWidth, setDrawerWidth] = useState("160px");
  const handleDrawerOpen = () => {
    open ? setOpen(false) : setOpen(true);
    setDrawerWidth(open ? "160px" : "48px");
  };
  return (
    <Stack direction={isPC ? "row" : "column"}>
      <Paper sx={{ width: drawerWidth, display: isPC ? "block" : "none" }}>
        <Box p={1}>
          <Stack direction="row" justifyContent="space-between">
            <IconButton onClick={handleDrawerOpen}>
              <MenuIcon sx={{ display: "block" }} />
            </IconButton>
            <Box p={1}>
              <Typography variant="h6" variantMapping={{ h6: "h1" }} noWrap>
                rishu-app
              </Typography>
            </Box>
          </Stack>
          <DrawerContent />
        </Box>
      </Paper>
      <Box
        sx={{
          width: `calc(100% - ${isPC ? drawerWidth : "0px"})`,
          height: `calc(100vh - ${isPC ? "0px" : "56px"})`,
        }}
      >
        {children}
      </Box>
      <AppBar sx={{ position: "static" }}>
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
                <HelpIcon />
              </IconButton>
              <IconButton>
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={handleDrawerOpen}>
                <MenuOpen />
              </IconButton>
            </Stack>
          </Stack>
        </ToolBar>
      </AppBar>
      <SwipeableDrawer
        onClose={() => {}}
        onOpen={() => {}}
        anchor="right"
        open={open}
        onClick={handleDrawerOpen}
        sx={{ display: isPC ? "none" : "block" }}
      >
        <DrawerContent />
      </SwipeableDrawer>
    </Stack>
  );
}

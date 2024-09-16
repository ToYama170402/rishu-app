"use client";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  SwipeableDrawer,
  Toolbar as ToolBar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import {
  filters,
  weekTimeTable,
  weekTimeTable2Filters,
} from "../util/timeTable";
import DrawerContents from "./DrawerContents";
import HelpDialog from "./HelpDialog";
import TimeTable from "./TimeTable";

export default function Layout({
  timeTable,
}: {
  timeTable: weekTimeTable;
}): JSX.Element {
  const theme = useTheme();
  const isPC = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(isPC);
  const drawerWidth = "200px";
  const [currentDrawerWidth, setDrawerWidth] = useState(drawerWidth);

  const handleDrawerOpen = () => {
    setOpen(!open);
    setDrawerWidth(open ? drawerWidth : "56px");
  };

  const [isHelpOpen, setHelpOpen] = useState(false);
  const handleHelpOpen = () => {
    setHelpOpen(!isHelpOpen);
  };

  type isFilterOpen = {
    filter: boolean;
    category: boolean;
    teacher: boolean;
    targetStudent: boolean;
  };
  const [isFilterOpen, setFilerOpen] = useState({
    filter: false,
    category: false,
    teacher: false,
    targetStudent: false,
  });

  const [filters, setFilters] = useState(weekTimeTable2Filters(timeTable));
  const PcSideBar = (): React.ReactNode => {
    return (
      <>
        <Paper
          elevation={3}
          sx={{
            width: currentDrawerWidth,
            overflow: "hidden",
            textWrap: "nowrap",
            borderRadius: "0px 4px 4px 0px",
          }}
        >
          <Box
            p={1}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Stack direction="row">
              <IconButton onClick={handleDrawerOpen} sx={{ color: "inherit" }}>
                <MenuIcon sx={{ display: "block" }} />
              </IconButton>
              <Box p={1}>
                <Typography variant="h6" variantMapping={{ h6: "h1" }} noWrap>
                  rishu-app
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box height={"100%"}>
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              height={"calc(100% - 48px)"}
              sx={{ overflowX: "hidden" }}
            >
              <DrawerContents
                filters={filters}
                setFilters={(filter: filters) => setFilters(filter)}
                isFilterOpen={isFilterOpen}
                setFiltersOpen={setFilerOpen}
              />
              <Stack p={2} mb={1} direction={"column"}>
                <Button
                  variant={"text"}
                  startIcon={<HelpIcon sx={{ marginRight: "16px" }} />}
                  sx={{
                    textWrap: "nowrap",
                    justifyContent: "flex-start",
                  }}
                  onClick={handleHelpOpen}
                >
                  ヘルプ
                </Button>
                <HelpDialog open={isHelpOpen} setOpen={handleHelpOpen} />
                <Button
                  variant={"text"}
                  startIcon={<SettingsIcon sx={{ marginRight: "16px" }} />}
                  sx={{
                    textWrap: "nowrap",
                    justifyContent: "flex-start",
                  }}
                >
                  設定
                </Button>
              </Stack>
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
                <IconButton onClick={handleHelpOpen}>
                  <HelpIcon
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
                <HelpDialog open={isHelpOpen} setOpen={handleHelpOpen} />
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
            <DrawerContents
              filters={filters}
              setFilters={(filter: filters) => setFilters(filter)}
              isFilterOpen={isFilterOpen}
              setFiltersOpen={setFilerOpen}
            />
          </Box>
        </SwipeableDrawer>
      </>
    );
  };

  return (
    <Stack direction={isPC ? "row" : "column"} sx={{ height: "100%" }}>
      {isPC ? <PcSideBar /> : null}
      <Box
        sx={{
          width: `calc(100% - ${isPC ? currentDrawerWidth : "0px"})`,
          height: `calc(100vh - ${isPC ? "0px" : "56px"})`,
        }}
      >
        <TimeTable
          timeTable={timeTable}
          filter={filters}
          width={"100%"}
          height={"100%"}
        />
      </Box>
      {!isPC ? <MobileSideBar /> : null}
    </Stack>
  );
}

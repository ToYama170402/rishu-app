import {
  AppBar,
  Box,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
  Toolbar,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOpen from "@mui/icons-material/MenuOpen";
import { useTheme } from "@mui/material";
import React, { useState, ReactNode } from "react";
import HelpDialog from "@/components/HelpDialog";

const MobileAppBar = ({
  children,
}: {
  children?: ReactNode;
}): React.ReactNode => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const [isHelpOpen, setHelpOpen] = useState(false);
  const handleHelpOpen = () => {
    setHelpOpen(!isHelpOpen);
  };

  return (
    <>
      <AppBar
        sx={{
          position: "static",
          color: theme.palette.primary.contrastText,
          borderRadius: "4px 4px 0px 0px",
          display: { xs: "block", sm: "none" },
        }}
      >
        <Toolbar>
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
                <HelpIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
              <HelpDialog open={isHelpOpen} setOpen={handleHelpOpen} />
              <IconButton>
                <SettingsIcon
                  sx={{ color: theme.palette.primary.contrastText }}
                />
              </IconButton>
              <IconButton onClick={handleDrawerOpen}>
                <MenuOpen sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        onClose={handleDrawerOpen}
        onOpen={handleDrawerOpen}
        anchor="right"
        open={open}
        sx={{ display: { md: "none", sm: "block" }, width: "80vw" }}
      >
        <Box p={1} sx={{ width: "80vw" }}>
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
};
export default MobileAppBar;

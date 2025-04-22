import { useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import useTheme from "@mui/material/styles/useTheme";
import HelpDialog from "@/components/HelpDialog";

const PcAppBar = ({ children }: { children?: ReactNode }): React.ReactNode => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          flex: "0 0 200px",
          flexBasis: open ? "200px" : "56px",
          transition: "flex-basis 0.1s",
          transitionTimingFunction: "ease-out",
          overflow: "hidden",
          textWrap: "nowrap",
          borderRadius: "0px 4px 4px 0px",
          display: { xs: "none", sm: "block" },
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
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{ color: "inherit" }}
            >
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
            <Box sx={{ flex: 1 }}>{children}</Box>
            <Stack p={2} mb={1} direction={"column"}>
              <Button
                variant={"text"}
                startIcon={<HelpIcon sx={{ marginRight: "16px" }} />}
                sx={{
                  textWrap: "nowrap",
                  justifyContent: "flex-start",
                }}
                onClick={() => setHelpOpen(!isHelpOpen)}
              >
                ヘルプ
              </Button>
              <HelpDialog
                open={isHelpOpen}
                setOpen={() => setHelpOpen(!isHelpOpen)}
              />
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
export default PcAppBar;

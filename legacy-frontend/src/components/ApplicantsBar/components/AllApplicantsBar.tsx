import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { colors } from "@mui/material";
import ApplicantsBarProps from "../types/applicantsbarProps";

const AllApplicantsBar = ({ lecture }: Omit<ApplicantsBarProps, "base">) => {
  const applicantsAmount = lecture.applicants;
  return (
    <>
      <Box mt={1} mb={1} sx={{ position: "relative" }}>
        <Box
          width={
            applicantsAmount.all > lecture.capacity
              ? (lecture.capacity / applicantsAmount.all) * 100 + "%"
              : "100%"
          }
          height={"100%"}
          position={"absolute"}
          top={0}
          left={0}
          flexShrink={0}
          border="1px dashed black"
          sx={{ zIndex: 1, backgroundColor: "#00000000" }}
        ></Box>
        <Box
          width={
            applicantsAmount.all > lecture.capacity
              ? (1 - lecture.capacity / applicantsAmount.all) * 100 + "%"
              : "0%"
          }
          height={"100%"}
          position={"absolute"}
          top={0}
          flexShrink={0}
          right={0}
          sx={{
            zIndex: 1,
            opacity: 0.8,
            backgroundImage: `repeating-linear-gradient(60deg, #00000000, ${colors.red[100]} 0px 5px, #00000000 5px 10px)`,
          }}
        ></Box>
        <Stack
          direction={"row"}
          sx={{
            overflow: "visible",
            height: "fit-content",
            textAlign: "center",
            position: "relative",
            top: 0,
            left: 0,
          }}
        >
          <Box
            width={
              applicantsAmount.all > lecture.capacity
                ? (applicantsAmount.first / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.first / lecture.capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.blue[100] }}
          >
            {applicantsAmount.first ? applicantsAmount.first : null}
            <Box
              position={"absolute"}
              top={0}
              left={0}
              height={"50%"}
              fontSize={"0.5rem"}
              width={
                applicantsAmount.all > lecture.capacity
                  ? (applicantsAmount.primary / applicantsAmount.all) * 100 +
                    "%"
                  : (applicantsAmount.primary / lecture.capacity) * 100 + "%"
              }
              flexShrink={0}
              sx={{ textWrap: "nowrap", backgroundColor: colors.amber[100] }}
            >
              優先指定：
              {applicantsAmount.primary ? applicantsAmount.primary : null}
            </Box>
          </Box>
          <Box
            width={
              applicantsAmount.all > lecture.capacity
                ? (applicantsAmount.second / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.second / lecture.capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.orange[100] }}
          >
            {applicantsAmount.second ? applicantsAmount.second : null}
          </Box>
          <Box
            width={
              applicantsAmount.all > lecture.capacity
                ? (applicantsAmount.third / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.third / lecture.capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.green[100] }}
          >
            {applicantsAmount.third ? applicantsAmount.third : null}
          </Box>
          <Box
            width={
              applicantsAmount.all > lecture.capacity
                ? (applicantsAmount.forth / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.forth / lecture.capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.purple[100] }}
          >
            {applicantsAmount.forth ? applicantsAmount.forth : null}
          </Box>
          <Box
            width={
              applicantsAmount.all > lecture.capacity
                ? (applicantsAmount.fifth / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.fifth / lecture.capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.grey[100] }}
          >
            {applicantsAmount.fifth ? applicantsAmount.fifth : null}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default AllApplicantsBar;

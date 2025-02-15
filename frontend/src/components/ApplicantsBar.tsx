import { lecture } from "@/util/timeTable";
import { Stack, Box } from "@mui/system";
import { colors } from "@mui/material";
import { useState } from "react";
import DetailPopup from "@/features/DetailPopup/DetailPopup";

type ApplicantsBarProps = {
  lecture: lecture;
  base: "capacity" | "allApplicants";
};

const CapacityApplicantsBar = ({
  lecture,
}: Omit<ApplicantsBarProps, "base">) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const applicantsAmount = lecture.applicants;
  function handleOpenPopup() {
    setIsPopupOpen(!isPopupOpen);
  }
  return (
    <>
      <Box
        mt={"2px"}
        sx={{
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          textWrap: "nowrap",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            textOverflow: "ellipsis",
            zIndex: 1,
            cursor: "pointer",
            display: "inline-block",
            borderBottom: "1px dashed",
            lineHeight: 1.1,
            height: "fit-content",
            margin: "2px",
          }}
          onClick={handleOpenPopup}
        >
          {lecture.title}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 0.7,
          }}
        >
          <Stack direction={"row"} sx={{ overflow: "hidden", height: "100%" }}>
            <Box
              width={(applicantsAmount.primary / lecture.capacity) * 100 + "%"}
              sx={{ backgroundColor: colors.amber[100], flexShrink: 0 }}
            ></Box>
            <Box
              width={
                ((applicantsAmount.first - applicantsAmount.primary) /
                  lecture.capacity) *
                  100 +
                "%"
              }
              sx={{ bgcolor: colors.blue[100], flexShrink: 0 }}
            ></Box>
            <Box
              width={(applicantsAmount.second / lecture.capacity) * 100 + "%"}
              sx={{ bgcolor: colors.orange[100], flexShrink: 0 }}
            ></Box>
            <Box
              width={(applicantsAmount.third / lecture.capacity) * 100 + "%"}
              sx={{ bgcolor: colors.green[100], flexShrink: 0 }}
            ></Box>
            <Box
              width={(applicantsAmount.forth / lecture.capacity) * 100 + "%"}
              sx={{ bgcolor: colors.purple[100], flexShrink: 0 }}
            ></Box>
            <Box
              width={(applicantsAmount.fifth / lecture.capacity) * 100 + "%"}
              sx={{ bgcolor: colors.grey[100], flexShrink: 0 }}
            ></Box>
          </Stack>
        </Box>
      </Box>
      <DetailPopup
        lecture={lecture}
        open={isPopupOpen}
        onClose={handleOpenPopup}
      />
    </>
  );
};

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

const ApplicantsBar = ({ lecture, base }: ApplicantsBarProps) => {
  return (
    <>
      {base === "capacity" ? (
        <CapacityApplicantsBar lecture={lecture} />
      ) : (
        <AllApplicantsBar lecture={lecture} />
      )}
    </>
  );
};
export default ApplicantsBar;

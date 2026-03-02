import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { colors } from "@mui/material";
import { useState } from "react";
import DetailPopup from "@/features/DetailPopup/DetailPopup";
import ApplicantsBarProps from "../types/applicantsbarProps";

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

export default CapacityApplicantsBar;

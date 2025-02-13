import { applicantsAmount } from "@/util/timeTable";
import { Stack, Box } from "@mui/system";
import { colors } from "@mui/material";

type ApplicantsBarProps = {
  applicantsAmount: applicantsAmount;
  capacity: number;
  base: "capacity" | "allApplicants";
};

const CapacityApplicantsBar = ({
  applicantsAmount,
  capacity,
}: Omit<ApplicantsBarProps, "base">) => {
  return (
    <Stack direction={"row"} sx={{ overflow: "hidden", height: "100%" }}>
      <Box
        width={(applicantsAmount.primary / capacity) * 100 + "%"}
        sx={{ backgroundColor: colors.amber[100], flexShrink: 0 }}
      ></Box>
      <Box
        width={
          ((applicantsAmount.first - applicantsAmount.primary) / capacity) *
            100 +
          "%"
        }
        sx={{ bgcolor: colors.blue[100], flexShrink: 0 }}
      ></Box>
      <Box
        width={(applicantsAmount.second / capacity) * 100 + "%"}
        sx={{ bgcolor: colors.orange[100], flexShrink: 0 }}
      ></Box>
      <Box
        width={(applicantsAmount.third / capacity) * 100 + "%"}
        sx={{ bgcolor: colors.green[100], flexShrink: 0 }}
      ></Box>
      <Box
        width={(applicantsAmount.forth / capacity) * 100 + "%"}
        sx={{ bgcolor: colors.purple[100], flexShrink: 0 }}
      ></Box>
      <Box
        width={(applicantsAmount.fifth / capacity) * 100 + "%"}
        sx={{ bgcolor: colors.grey[100], flexShrink: 0 }}
      ></Box>
    </Stack>
  );
};

const AllApplicantsBar = ({
  applicantsAmount,
  capacity,
}: Omit<ApplicantsBarProps, "base">) => {
  return (
    <>
      <Box mt={1} mb={1} sx={{ position: "relative" }}>
        <Box
          width={
            applicantsAmount.all > capacity
              ? (capacity / applicantsAmount.all) * 100 + "%"
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
            applicantsAmount.all > capacity
              ? (1 - capacity / applicantsAmount.all) * 100 + "%"
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
              applicantsAmount.all > capacity
                ? (applicantsAmount.first / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.first / capacity) * 100 + "%"
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
                applicantsAmount.all > capacity
                  ? (applicantsAmount.primary / applicantsAmount.all) * 100 +
                    "%"
                  : (applicantsAmount.primary / capacity) * 100 + "%"
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
              applicantsAmount.all > capacity
                ? (applicantsAmount.second / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.second / capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.orange[100] }}
          >
            {applicantsAmount.second ? applicantsAmount.second : null}
          </Box>
          <Box
            width={
              applicantsAmount.all > capacity
                ? (applicantsAmount.third / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.third / capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.green[100] }}
          >
            {applicantsAmount.third ? applicantsAmount.third : null}
          </Box>
          <Box
            width={
              applicantsAmount.all > capacity
                ? (applicantsAmount.forth / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.forth / capacity) * 100 + "%"
            }
            flexShrink={0}
            sx={{ bgcolor: colors.purple[100] }}
          >
            {applicantsAmount.forth ? applicantsAmount.forth : null}
          </Box>
          <Box
            width={
              applicantsAmount.all > capacity
                ? (applicantsAmount.fifth / applicantsAmount.all) * 100 + "%"
                : (applicantsAmount.fifth / capacity) * 100 + "%"
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

const ApplicantsBar = ({
  applicantsAmount,
  capacity,
  base,
}: ApplicantsBarProps) => {
  return (
    <>
      {base === "capacity" ? (
        <CapacityApplicantsBar
          applicantsAmount={applicantsAmount}
          capacity={capacity}
        />
      ) : (
        <AllApplicantsBar
          applicantsAmount={applicantsAmount}
          capacity={capacity}
        />
      )}
    </>
  );
};
export default ApplicantsBar;

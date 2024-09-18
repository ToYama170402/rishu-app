// "use client";
import { colors } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ResponsiveStyleValue } from "@mui/system";
import * as React from "react";
import * as TimeTableData from "../util/timeTable";

type sizing = ResponsiveStyleValue<string | number>;

const TimeTableContainer = ({
  children,
  height,
  width,
}: {
  children: React.ReactNode;
  height: sizing;
  width: sizing;
}): JSX.Element => (
  <Stack
    direction={"row"}
    alignItems={"start"}
    justifyContent={"left"}
    spacing={1}
    padding={1}
    height={height}
    width={width}
    sx={{
      overflowX: "auto",
      scrollSnapType: "x mandatory",
    }}
  >
    {children}
  </Stack>
);

const TimeTableDayItem = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <Paper
    elevation={3}
    sx={{
      height: "100%",
      width: {
        xs: "100%",
        sm: "calc((100% - 8px) / 2)",
        md: "calc((100% - 16px) / 3)",
        lg: "calc((100% - 24px) / 4)",
        xl: "calc((100% - 32px) / 5)",
      },
      flexGrow: 0,
      flexShrink: 0,
      scrollSnapAlign: "start",
      scrollMarginLeft: "8px",
    }}
  >
    <Stack spacing={1} height={"100%"} padding={1} divider={<Divider />}>
      {children}
    </Stack>
  </Paper>
);

const TimeTableDateLabel = ({
  date,
}: {
  date: TimeTableData.date;
}): JSX.Element => (
  <Box
    sx={{
      height: "1em",
      textAlign: "center",
      lineHeight: 1,
    }}
  >
    {date}
  </Box>
);

const Period = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <Box
    padding="0 4px"
    sx={{
      height: "calc((100% - 1em) / 5 - 4px)",
      overflow: "auto",
      scrollSnapType: "y proximity",
    }}
  >
    {children}
  </Box>
);

const ApplicantsBar = ({
  applicantsAmount,
  capacity,
}: {
  applicantsAmount: TimeTableData.applicantsAmount;
  capacity: number;
}): JSX.Element => (
  <Stack direction={"row"} sx={{ overflow: "hidden", height: "100%" }}>
    <Box
      width={(applicantsAmount.primary / capacity) * 100 + "%"}
      sx={{ backgroundColor: colors.amber[100], flexShrink: 0 }}
    ></Box>
    <Box
      width={(applicantsAmount.first / capacity) * 100 + "%"}
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
const LectureInfo = ({
  lecture,
  filters,
}: {
  lecture: TimeTableData.lecture;
  filters: TimeTableData.filters;
}): JSX.Element | undefined => {
  if (
    filters.category[lecture.category] &&
    filters.teacher[lecture.teacher] &&
    filters.targetStudent[lecture.target]
  ) {
    return (
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          textWrap: "nowrap",
          scrollSnapAlign: "start",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            textOverflow: "ellipsis",
            zIndex: 1,
          }}
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
          <ApplicantsBar
            applicantsAmount={lecture.applicants}
            capacity={lecture.capacity}
          />
        </Box>
      </Box>
    );
  }
};

export default function TimeTable({
  timeTable,
  filter,
  width,
  height,
}: {
  timeTable: TimeTableData.weekTimeTable;
  filter: TimeTableData.filters;
  width: sizing;
  height: sizing;
}): JSX.Element {
  // const [isDisplayLaterLecture, setIsDisplayLaterLecture] =
  // React.useState(false);
  const isDisplayLaterLecture = false;
  return (
    <TimeTableContainer height={height} width={width}>
      {TimeTableData.weekTimeTable2Dates(timeTable).map((date) => (
        <TimeTableDayItem key={date.period1[0].dateTime.date}>
          <TimeTableDateLabel date={date.period1[0].dateTime.date} />
          {TimeTableData.dateTimeTable2Periods(date).map((period, index) => {
            if (!isDisplayLaterLecture && index < 5) {
              return (
                <Period
                  key={period[0].dateTime.date + period[0].dateTime.period}
                >
                  {period.map((data) => (
                    <LectureInfo
                      key={data.number}
                      lecture={data}
                      filters={filter}
                    />
                  ))}
                </Period>
              );
            }
          })}
        </TimeTableDayItem>
      ))}
    </TimeTableContainer>
  );
}

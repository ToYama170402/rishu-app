"use client";
import { colors } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ResponsiveStyleValue } from "@mui/system";
import * as React from "react";
import * as TimeTableData from "../../util/timeTable";
import DetailPopup from "@/features/DetailPopup/DetailPopup";
import ApplicantsBar from "../../components/ApplicantsBar";
import TimeTable from "@/components/TimeTable/TimeTable";
import type {
  RenderCellProps,
  RenderColumnProps,
} from "@/components/TimeTable/TimeTable";

type sizing = ResponsiveStyleValue<string | number>;

const TimeTableContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <Stack
    direction={"row"}
    alignItems={"start"}
    justifyContent={"left"}
    spacing={1}
    padding={1}
    height={"100%"}
    width={"100%"}
    sx={{
      overflowX: "auto",
      scrollSnapType: "x mandatory",
    }}
  >
    {children}
  </Stack>
);

const TimeTableDayItem = ({
  xFragment,
  children,
}: RenderColumnProps): JSX.Element => (
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
      <Box
        sx={{
          height: "1em",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {xFragment}
      </Box>
      {children}
    </Stack>
  </Paper>
);

const Period = ({
  xFragment,
  yFragment,
  dataFragment,
}: RenderCellProps<TimeTableData.lecture>): JSX.Element => (
  <Box
    padding="0 4px"
    sx={{
      overflow: "auto",
      scrollSnapType: "y proximity",
      flex: "1 1 0",
    }}
  >
    {dataFragment &&
      dataFragment.map((lecture) => (
        <ApplicantsBar lecture={lecture} base="capacity" key={lecture.number} />
      ))}
  </Box>
);

export default function RishuTimeTable({
  timeTable,
  filter,
  width,
  height,
}: {
  timeTable: TimeTableData.lecture[];
  filter: TimeTableData.filters;
  width: sizing;
  height: sizing;
}): JSX.Element {
  const isDisplayLaterLecture = false;
  return (
    <TimeTable
      data={timeTable}
      xArray={["月", "火", "水", "木", "金", "土", "日"]}
      yArray={[1, 2, 3, 4, 5, 6, 7, 8]}
      xKey="dateTime.date"
      yKey="dateTime.period"
      className="timeTable"
      RenderCell={Period}
      RenderColumn={TimeTableDayItem}
      TimeTableContainer={TimeTableContainer}
    />
  );
}

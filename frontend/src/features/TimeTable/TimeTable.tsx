"use client";
import TimeTableLiteral from "@/components/TimeTable/TimeTable";
import appBarContext from "@/features/AppBar/appBarContext";
import React, { useContext, useEffect, useState, type JSX } from "react";
import { lectureWithApplicantsAmount } from "@/types/lecture";
import Period from "./components/Period";
import TimeTableContainer from "./components/TimeTableContainer";
import TimeTableDayItem from "./components/TimeTableDayItem";
import Filter from "./components/Filter";
import useAllApplicantsAmount from "@/hooks/useAllApplicantsAmount";

export default function TimeTable({
  timeTable,
}: {
  timeTable: lectureWithApplicantsAmount[];
}): JSX.Element {
  const applicantsAmount = useAllApplicantsAmount(timeTable);
  const [filteredTimeTable, setFilteredTimeTable] =
    useState<lectureWithApplicantsAmount[]>(timeTable);
  const setAppBar = useContext(appBarContext);
  useEffect(() => {
    setAppBar(
      <Filter lectures={timeTable} applyFilter={setFilteredTimeTable} />
    );
  }, [setAppBar, timeTable]);
  return (
    <TimeTableLiteral
      data={filteredTimeTable}
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

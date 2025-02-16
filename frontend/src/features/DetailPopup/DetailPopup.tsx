"use client";
import { Link } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import React from "react";
import { lecture } from "@/util/timeTable";
import ApplicantsBar from "@/components/ApplicantsBar/ApplicantsBar";
import LectureDetailTable from "./components/LectureDetailTable";

export default function DetailPopup({
  lecture,
  open,
  onClose,
}: {
  lecture: lecture;
  open: boolean;
  onClose: () => void;
}): React.ReactNode {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box>{lecture.title}</Box>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          divider={
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ margin: 1 }}
            />
          }
          sx={{ height: "fit-content", ml: "auto" }}
        >
          <Typography variant="subtitle1">{lecture.number}</Typography>
          <Typography variant="subtitle1">
            {lecture.category.replace(/[Ａ-Ｚ ａ-ｚ ０-９]/g, (s) =>
              String.fromCharCode(s.charCodeAt(0) - 0xfee0)
            )}
            {lecture.category === "ＧＳ科目"
              ? lecture.number.slice(1, 2) + "郡" + lecture.number.slice(2, 3)
              : null}
          </Typography>
          <Typography variant="subtitle1">
            {lecture.dateTime.date + lecture.dateTime.period}
          </Typography>
          <Typography variant="subtitle1">
            {lecture.teacher.replace(/　/g, " ")}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label="詳細" value="1"></Tab>
            <Tab label="推移" value="2"></Tab>
          </TabList>
          <TabPanel
            value="1"
            sx={{ padding: 1, overflow: "auto", height: "calc(100% - 261px)" }}
          >
            <Stack direction={"column"} gap={1}>
              {lecture.applicants.all > 0 ? (
                <ApplicantsBar lecture={lecture} base="allApplicants" />
              ) : null}
              <LectureDetailTable lecture={lecture} />
              <Box>
                <Typography variant="body1">
                  ※当選確率はすべての優先指定が第１希望で指定されているものとして計算されています。
                </Typography>
              </Box>
              <ButtonGroup sx={{ marginTop: 1 }}>
                {/* 確認のためにコメントアウト
                <Button
                  href={`https://eduweb.sta.kanazawa-u.ac.jp/Portal/StudentApp/Regist/RegistSearchResults.aspx?day=${date2number(
                    lecture.dateTime.date
                  )}&dayname=${lecture.dateTime.date}&period=${
                    lecture.dateTime.period
                  }&label=${date2number(lecture.dateTime.date)}&fac_mode=0`}
                  variant="outlined"
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<Link />}
                >
                  追加画面
                </Button> */}

                <Button
                  href={`https://eduweb.sta.kanazawa-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?student=1&lct_year=${new Date().getFullYear()}&lct_cd=${
                    lecture.number
                  }&je_cd=1&ActingAccess=1`}
                  variant="outlined"
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<Link />}
                >
                  シラバス
                </Button>
              </ButtonGroup>
            </Stack>{" "}
          </TabPanel>
          <TabPanel value="2">開発中</TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  );
}

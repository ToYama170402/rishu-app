"use client";
import { fetchDetail } from "@/util/rishu";
import { Link } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  applicantsAmount,
  calcApplicantsRatio,
  lecture,
} from "../util/timeTable";

function date2number(day: string): number {
  switch (day) {
    case "月":
      return 1;
    case "火":
      return 2;
    case "水":
      return 3;
    case "木":
      return 4;
    case "金":
      return 5;
    case "土":
      return 6;
    default:
      return 0;
  }
}

function ApplicantsBar({
  capacity,
  applicantsAmount,
}: {
  capacity: number;
  applicantsAmount: applicantsAmount;
}): React.ReactNode {
  return (
    <>
      <Box mt={1} mb={1} sx={{ position: "relative" }}>
        <Box
          width={(capacity / applicantsAmount.all) * 100 + "%"}
          height={"100%"}
          position={"absolute"}
          top={0}
          left={0}
          border="1px dashed black"
          sx={{ zIndex: 1, backgroundColor: "#00000000" }}
        ></Box>
        <Box
          width={(1 - capacity / applicantsAmount.all) * 100 + "%"}
          height={"100%"}
          position={"absolute"}
          top={0}
          right={0}
          sx={{ zIndex: 1, backgroundColor: colors.red[100], opacity: 0.6 }}
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
              (applicantsAmount.primary / applicantsAmount.all) * 100 + "%"
            }
            sx={{ backgroundColor: colors.amber[100] }}
          >
            {applicantsAmount.primary ? applicantsAmount.primary : null}
          </Box>
          <Box
            width={(applicantsAmount.first / applicantsAmount.all) * 100 + "%"}
            sx={{ bgcolor: colors.blue[100] }}
          >
            {applicantsAmount.first ? applicantsAmount.first : null}
          </Box>
          <Box
            width={(applicantsAmount.second / applicantsAmount.all) * 100 + "%"}
            sx={{ bgcolor: colors.orange[100] }}
          >
            {applicantsAmount.second ? applicantsAmount.second : null}
          </Box>
          <Box
            width={(applicantsAmount.third / applicantsAmount.all) * 100 + "%"}
            sx={{ bgcolor: colors.green[100] }}
          >
            {applicantsAmount.third ? applicantsAmount.third : null}
          </Box>
          <Box
            width={(applicantsAmount.forth / applicantsAmount.all) * 100 + "%"}
            sx={{ bgcolor: colors.purple[100] }}
          >
            {applicantsAmount.forth ? applicantsAmount.forth : null}
          </Box>
          <Box
            width={(applicantsAmount.fifth / applicantsAmount.all) * 100 + "%"}
            sx={{ bgcolor: colors.grey[100] }}
          >
            {applicantsAmount.fifth ? applicantsAmount.fifth : null}
          </Box>
        </Stack>
      </Box>
    </>
  );
}

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
  const [lectureDetail, setLectureDetail] = React.useState(null);
  useEffect(() => {
    fetchDetail(lecture.number).then((data) => {
      console.log(data);
      setLectureDetail(data);
    });
  }, [lecture.number]);

  const applicantsRatio = calcApplicantsRatio(
    lecture.capacity,
    lecture.applicants
  ).map((ratio) => Math.round(ratio * 100) + "%");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box>{lecture.title}</Box>
        <Box sx={{ height: "fit-content", ml: "auto" }}>
          <Typography variant="subtitle1">
            {lecture.number}
            {" | "}
            {lecture.dateTime.date + lecture.dateTime.period}
            {" | "}
            {lecture.teacher}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label="詳細" value="1"></Tab>
            <Tab label="推移" value="2"></Tab>
          </TabList>
          <TabPanel value="1" sx={{ padding: 1 }}>
            <Stack direction={"column"} gap={1}>
              <ApplicantsBar
                capacity={lecture.capacity}
                applicantsAmount={lecture.applicants}
              />
              <TableContainer sx={{ textWrap: "nowrap" }} component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>希望順位</TableCell>
                      <TableCell>人数</TableCell>
                      <TableCell>当選確率</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>優先指定</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.primary}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[0]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>第１希望</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.first}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[1]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>第２希望</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.second}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[2]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>第３希望</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.third}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[3]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>第４希望</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.forth}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[4]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>第５希望</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.fifth}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[5]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <ButtonGroup sx={{ marginTop: 1 }}>
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
                </Button>
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
          <TabPanel value="2">tab2</TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  );
}

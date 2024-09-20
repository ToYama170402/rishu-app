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
  Divider,
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
import { styled } from "@mui/material/styles";
import {
  applicantsAmount,
  calcApplicantsRatio,
  lecture,
} from "../util/timeTable";
import React from "react";

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

  // const [lectureDetail, setLectureDetail] = React.useState(null);
  // useEffect(() => {
  //   fetchDetail(lecture.number).then((data) => {
  //     console.log(data);
  //     setLectureDetail(data);
  //   });
  // }, [lecture.number]);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const applicantsRatio = calcApplicantsRatio(
    lecture.capacity,
    lecture.applicants
  ).map((ratio) => Math.round(ratio * 100) + "%");

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
              <ApplicantsBar
                capacity={lecture.capacity}
                applicantsAmount={lecture.applicants}
              />
              <TableContainer sx={{ textWrap: "nowrap" }} component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>希望順位</TableCell>
                      <TableCell align="right">人数</TableCell>
                      <TableCell align="right">当選確率</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <TableCell>
                        <Box sx={{ position: "relative " }}>
                          <Box position={"relative"} zIndex={1}>
                            優先指定
                          </Box>
                          <Box
                            width={"100%"}
                            height={"50%"}
                            position={"absolute"}
                            top={"50%"}
                            left={0}
                            zIndex={0}
                            sx={{
                              backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${colors.amber[100]} 0px 5px, #00000000 5px 10px)`,
                            }}
                          ></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {lecture.applicants.primary}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[0]}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>
                        <Box sx={{ position: "relative " }}>
                          <Box position={"relative"} zIndex={1}>
                            第１希望
                          </Box>
                          <Box
                            width={"100%"}
                            height={"50%"}
                            position={"absolute"}
                            top={"50%"}
                            left={0}
                            zIndex={0}
                            sx={{
                              backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${colors.blue[100]} 0px 5px, #00000000 5px 10px)`,
                            }}
                          ></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {lecture.applicants.first}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[1]}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>
                        <Box sx={{ position: "relative " }}>
                          <Box position={"relative"} zIndex={1}>
                            第2希望
                          </Box>
                          <Box
                            width={"100%"}
                            height={"50%"}
                            position={"absolute"}
                            top={"50%"}
                            left={0}
                            zIndex={0}
                            sx={{
                              backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${colors.orange[100]} 0px 5px, #00000000 5px 10px)`,
                            }}
                          ></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {lecture.applicants.second}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[2]}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>
                        <Box sx={{ position: "relative " }}>
                          <Box position={"relative"} zIndex={1}>
                            第３希望
                          </Box>
                          <Box
                            width={"100%"}
                            height={"50%"}
                            position={"absolute"}
                            top={"50%"}
                            left={0}
                            zIndex={0}
                            sx={{
                              backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${colors.green[100]} 0px 5px, #00000000 5px 10px)`,
                            }}
                          ></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {lecture.applicants.third}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[3]}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>
                        <Box sx={{ position: "relative " }}>
                          <Box position={"relative"} zIndex={1}>
                            第４希望
                          </Box>
                          <Box
                            width={"100%"}
                            height={"50%"}
                            position={"absolute"}
                            top={"50%"}
                            left={0}
                            zIndex={0}
                            sx={{
                              backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${colors.purple[100]} 0px 5px, #00000000 5px 10px)`,
                            }}
                          ></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {lecture.applicants.forth}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[4]}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>
                        {" "}
                        <Box sx={{ position: "relative " }}>
                          <Box position={"relative"} zIndex={1}>
                            第５希望
                          </Box>
                          <Box
                            width={"100%"}
                            height={"50%"}
                            position={"absolute"}
                            top={"50%"}
                            left={0}
                            zIndex={0}
                            sx={{
                              backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${colors.grey[100]} 0px 5px, #00000000 5px 10px)`,
                            }}
                          ></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {lecture.applicants.fifth}
                      </TableCell>
                      <TableCell align="right">{applicantsRatio[5]}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ borderTopStyle: "double" }}>
                      <TableCell>合計</TableCell>
                      <TableCell align="right">
                        {lecture.applicants.all}
                      </TableCell>
                      <TableCell align="right">-</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>適正人数</TableCell>
                      <TableCell align="right">{lecture.capacity}</TableCell>
                      <TableCell align="right">-</TableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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

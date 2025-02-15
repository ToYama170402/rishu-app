"use client";
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
import React from "react";
import {
  applicantsAmount,
  calcApplicantsRatio,
  lecture,
} from "@/util/timeTable";
import ApplicantsBar from "@/components/ApplicantsBar/ApplicantsBar";

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
              {lecture.applicants.all > 0 ? (
                <ApplicantsBar lecture={lecture} base="allApplicants" />
              ) : null}
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
                        <Box
                          sx={{ position: "relative " }}
                          width={"fit-content"}
                        >
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
                        <Box
                          sx={{ position: "relative " }}
                          width={"fit-content"}
                        >
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
                        <Box
                          sx={{ position: "relative " }}
                          width={"fit-content"}
                        >
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
                        <Box
                          sx={{ position: "relative " }}
                          width={"fit-content"}
                        >
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
                        <Box
                          sx={{ position: "relative " }}
                          width={"fit-content"}
                        >
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
                        <Box
                          sx={{ position: "relative " }}
                          width={"fit-content"}
                        >
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

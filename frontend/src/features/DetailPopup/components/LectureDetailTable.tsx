import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { lecture, calcApplicantsRatio } from "@/util/timeTable";

const LectureDetailTable = ({ lecture }: { lecture: lecture }) => {
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
              <Box sx={{ position: "relative " }} width={"fit-content"}>
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
            <TableCell align="right">{lecture.applicants.primary}</TableCell>
            <TableCell align="right">{applicantsRatio[0]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <Box sx={{ position: "relative " }} width={"fit-content"}>
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
            <TableCell align="right">{lecture.applicants.first}</TableCell>
            <TableCell align="right">{applicantsRatio[1]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <Box sx={{ position: "relative " }} width={"fit-content"}>
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
            <TableCell align="right">{lecture.applicants.second}</TableCell>
            <TableCell align="right">{applicantsRatio[2]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <Box sx={{ position: "relative " }} width={"fit-content"}>
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
            <TableCell align="right">{lecture.applicants.third}</TableCell>
            <TableCell align="right">{applicantsRatio[3]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <Box sx={{ position: "relative " }} width={"fit-content"}>
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
            <TableCell align="right">{lecture.applicants.forth}</TableCell>
            <TableCell align="right">{applicantsRatio[4]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <Box sx={{ position: "relative " }} width={"fit-content"}>
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
            <TableCell align="right">{lecture.applicants.fifth}</TableCell>
            <TableCell align="right">{applicantsRatio[5]}</TableCell>
          </StyledTableRow>
          <StyledTableRow sx={{ borderTopStyle: "double" }}>
            <TableCell>合計</TableCell>
            <TableCell align="right">{lecture.applicants.all}</TableCell>
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
  );
};
export default LectureDetailTable;

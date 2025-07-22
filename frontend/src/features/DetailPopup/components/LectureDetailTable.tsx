import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { colors } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { calcApplicantsRatio } from "../utils/calcApplicantsRatio";
import { lectureWithApplicantsAmount } from "@/types/lecture";
import UnderLinedText from "./UnderLinedText";

const LectureDetailTable = ({
  lecture,
}: {
  lecture: lectureWithApplicantsAmount;
}) => {
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
              <UnderLinedText color={colors.amber[100]}>
                優先指定
              </UnderLinedText>
            </TableCell>
            <TableCell align="right">{lecture.applicants.primary}</TableCell>
            <TableCell align="right">{applicantsRatio[0]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <UnderLinedText color={colors.blue[100]}>第１希望</UnderLinedText>
            </TableCell>
            <TableCell align="right">{lecture.applicants.first}</TableCell>
            <TableCell align="right">{applicantsRatio[1]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <UnderLinedText color={colors.orange[100]}>
                第２希望
              </UnderLinedText>
            </TableCell>
            <TableCell align="right">{lecture.applicants.second}</TableCell>
            <TableCell align="right">{applicantsRatio[2]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <UnderLinedText color={colors.green[100]}>
                第３希望
              </UnderLinedText>
            </TableCell>
            <TableCell align="right">{lecture.applicants.third}</TableCell>
            <TableCell align="right">{applicantsRatio[3]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <UnderLinedText color={colors.purple[100]}>
                第４希望
              </UnderLinedText>
            </TableCell>
            <TableCell align="right">{lecture.applicants.forth}</TableCell>
            <TableCell align="right">{applicantsRatio[4]}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>
              <UnderLinedText color={colors.grey[100]}>第５希望</UnderLinedText>
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

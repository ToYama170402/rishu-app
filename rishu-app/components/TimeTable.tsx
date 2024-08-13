"use client";
import * as React from 'react';
import * as TimeTableData from '../util/timeTable'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import { colors, Divider, Paper } from '@mui/material';
import Stack from '@mui/material/Stack'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import AppRouter from 'next/dist/client/components/app-router';
type timeTableType = { timeTable: TimeTableData.weekTimeTable }
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function TimeTable({ timeTable }: timeTableType): JSX.Element {
  const [isDisplayLaterLecture, setIsDisplayLaterLecture] = React.useState(false);
  function ApplicantsBar({ applicantsAmount, capacity }: { applicantsAmount: TimeTableData.applicantsAmount, capacity: number }): JSX.Element {
    return (
      <Stack direction={'row'} sx={{ overflow: 'hidden', height: '100%' }} >
        <Box width={(applicantsAmount.primary / capacity) * 100 + '%'} sx={{ backgroundColor: colors.amber[100] }}></Box>
        <Box width={(applicantsAmount.first / capacity) * 100 + '%'} sx={{ bgcolor: colors.blue[100] }}></Box>
        <Box width={(applicantsAmount.second / capacity) * 100 + '%'} sx={{ bgcolor: colors.blue[100] }}></Box>
        <Box width={(applicantsAmount.third / capacity) * 100 + '%'} sx={{ bgcolor: colors.green[100] }}></Box>
        <Box width={(applicantsAmount.forth / capacity) * 100 + '%'} sx={{ bgcolor: colors.purple[100] }}></Box>
        <Box width={(applicantsAmount.fifth / capacity) * 100 + '%'} sx={{ bgcolor: colors.grey[100] }}></Box>
      </Stack>);
  }
  return (
    <Grid container columns={5} spacing={1} padding={1} height={'100vh'} width={'100%'} >
      {
        [
          timeTable.monday,
          timeTable.tuesday,
          timeTable.wednesday,
          timeTable.thursday,
          timeTable.friday
        ].map(date => (
          <Grid
            xs={1}
            key={date.period1[0].dateTime.date}
            sx={{ height: '100%' }}
          >
            <Paper elevation={3} sx={{ height: '100%' }}>
              <Stack spacing={1} height={'100%'} padding={1} divider={<Divider />}>
                <Box
                  sx={{
                    textAlign: 'center',
                    height: '1em',
                  }}>
                  {date.period1[0].dateTime.date}
                </Box>
                {
                  [
                    date.period1,
                    date.period2,
                    date.period3,
                    date.period4,
                    date.period5,
                    date.period6,
                    date.period7,
                    date.period8,
                  ].map((period, index) => {
                    if (!isDisplayLaterLecture && index < 5) {
                      return (
                        <Box
                          key={index + 1}
                          padding={1}
                          sx={{
                            overflow: 'auto',
                            height: 'calc((100% - 1em) / 5 - 4px)',
                          }}>
                          {
                            period.map((data, index) => (
                              <Box
                                key={index}
                                sx={{
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  textWrap: 'nowrap',
                                  position: 'relative',
                                  zIndex: 1,
                                }}
                              >
                                <Box sx={{ zIndex: 1 }}>
                                  {data.title}
                                </Box>
                                <Box sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  zIndex: 0,
                                  opacity: 0.5,
                                }}>
                                  <ApplicantsBar applicantsAmount={data.applicants} capacity={data.capacity} />
                                </Box>
                              </Box>
                            ))
                          }
                        </Box>)
                    }
                  })
                }
              </Stack>
            </Paper>
          </Grid>
        ))
      }
    </Grid >
  );
}
export default TimeTable;
"use client";
import * as React from 'react';
import * as TimeTableData from '../util/timeTable'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import { colors, Divider, Paper } from '@mui/material';
import Stack from '@mui/material/Stack'
import AppRouter from 'next/dist/client/components/app-router';
type timeTableType = { timeTable: TimeTableData.weekTimeTable }
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
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={{ xs: 'left', xl: 'center' }}
      spacing={1}
      padding={1}
      height={'100dvh'}
      width={'100%'}
      sx={{
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
      }}
    >
      {
        [
          timeTable.monday,
          timeTable.tuesday,
          timeTable.wednesday,
          timeTable.thursday,
          timeTable.friday
        ].map(date => (
          <Paper
            elevation={3}
            key={date.period1[0].dateTime.date}
            sx={{
              height: '100%',
              width: {
                xs: '100%',
                sm: 'calc((100% - 8px) / 2)',
                md: 'calc((100% - 16px) / 3)',
                lg: 'calc((100% - 24px) / 4)',
                xl: 'calc((100% - 32px) / 5)',
              },
              flexGrow: 0,
              flexShrink: 0,
              scrollSnapAlign: 'start',
              scrollMarginLeft: '8px'
            }}>
            <Stack spacing={1} height={'100%'} padding={1} divider={<Divider />}>
              <Box
                sx={{
                  textAlign: 'center',
                  height: '1em',
                  lineHeight: 1
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
                        padding='0 4px'
                        sx={{
                          overflow: 'auto',
                          height: 'calc((100% - 1em) / 5 - 4px)',
                          scrollSnapType: 'y proximity',
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
                                scrollSnapAlign: 'start',
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
        ))
      }
    </ Stack>
  );
}
export default TimeTable;
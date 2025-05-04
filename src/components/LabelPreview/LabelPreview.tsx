import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import { useStudents } from '../../hooks/useStudents';
import { PaperRenderer } from './PaperRenderer';

const repeat = <T,>(val: T, times: number): T[] => {
  const arr: T[] = [];
  while (arr.length < times) {
    arr.push(val);
  }
  return arr;
};

const LabelPreview: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('labels.pdf');
  };

  const { students, selectedStudentIds } = useStudents();

  const selectedStudents = students
    .filter((student) => selectedStudentIds.includes(student.id))
    .flatMap((student) => repeat(student, student.numCopies));

  return (
    <Stack spacing={2} sx={{ maxHeight: '95vh' }}>
      <Box flexGrow={1} maxHeight={'80vh'} display={'block'}>
        <PaperRenderer ref={printRef} aspectRatio={[8.5, 11]}>
          <Grid container spacing={'0.89vh'} sx={{ py: '3.75vh', px: `1.3vh` }}>
            {selectedStudents.map((student, i) => (
              <Grid size={4} key={i}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: '10px',
                    textAlign: 'center',
                    height: '7.22vh',
                    width: '19.14vh',
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={'bold'}
                    fontSize={18}
                    lineHeight={1.2}
                    sx={{ fontFamily: ['Bubblegum Sans'] }}
                  >
                    {student.first}
                    <br />
                    {student.homeroom}
                    <br />
                    {student.grade}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </PaperRenderer>
      </Box>
      <Box p={2} alignItems={'center'}>
        <Button
          disabled={selectedStudents.length === 0}
          onClick={exportToPDF}
          variant="contained"
          style={{ marginTop: '10px' }}
        >
          Export to PDF
        </Button>
      </Box>
    </Stack>
  );
};

export default LabelPreview;

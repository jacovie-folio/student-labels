import {
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import { useStudents } from '../../hooks/useStudents';
import { Student } from '../../types/Student';
import { PaperRenderer } from './PaperRenderer';

const repeat = <T,>(val: T, times: number): T[] => {
  const arr: T[] = [];
  while (arr.length < times) {
    arr.push(val);
  }
  return arr;
};

const PAGE_SIZE = 30;

const LabelPreview: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'in', format: [8.5, 11] });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('labels.pdf');
  };

  const { students, selectedStudentIds, gap } = useStudents();

  const selectedStudents: Array<Student | null> = [
    ...repeat(null, gap),
    ...selectedStudentIds
      .map((id) => students.find((student) => student.id === id) || null)
      .flatMap((student) => repeat(student, student!.numCopies)),
  ];

  const totalPages = Math.ceil(selectedStudents.length / PAGE_SIZE);

  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <Stack spacing={2} sx={{ maxHeight: '95vh' }}>
      <Box flexGrow={1} maxHeight={'80vh'} display={'block'}>
        <PaperRenderer ref={printRef} aspectRatio={[8.5, 11]}>
          <Grid
            container
            columnSpacing={'0.89vh'}
            rowGap={'0.04vh'}
            sx={{ py: '3.75vh', px: `1.3vh` }}
          >
            {selectedStudents
              .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              .map((student, i) => (
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
                    {student ? (
                      <Typography
                        variant="body1"
                        fontWeight={'bold'}
                        fontSize={`1.7vh`}
                        lineHeight={`2.0vh`}
                        sx={{ fontFamily: ['Bubblegum Sans'] }}
                      >
                        {student.first}
                        <br />
                        {student.homeroom}
                        <br />
                        {student.grade}
                      </Typography>
                    ) : null}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </PaperRenderer>
      </Box>
      <Stack p={2} alignItems={'center'} sx={{ width: '100%' }}>
        <Button
          disabled={selectedStudents.length === 0}
          onClick={exportToPDF}
          variant="contained"
          style={{ marginTop: '10px' }}
        >
          Export to PDF
        </Button>
        {totalPages > 1 ? (
          <Pagination
            count={totalPages}
            onChange={(_, newPage) => setCurrentPage(newPage)}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default LabelPreview;

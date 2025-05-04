import { Stack } from '@mui/material';
import { useStudents } from '../../hooks/useStudents';
import CSVUploader from './CSVUploader';
import StudentTable from './StudentTable';

export const StudentDataManager = () => {
  const { onLoadStudents } = useStudents();
  return (
    <Stack
      spacing={2}
      direction={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
    >
      <CSVUploader onDataLoaded={onLoadStudents} />
      <StudentTable />
    </Stack>
  );
};

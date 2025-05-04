import WarningIcon from '@mui/icons-material/Warning';
import { Chip, Stack } from '@mui/material';
import { useStudents } from '../../hooks/useStudents';
import CSVUploader from './CSVUploader';
import StudentTable from './StudentTable';

export const StudentDataManager = () => {
  const { loadedFromCache, onLoadStudents } = useStudents();
  return (
    <Stack
      spacing={2}
      direction={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
    >
      <Stack spacing={2} direction={'row'}>
        <CSVUploader onDataLoaded={onLoadStudents} />
        {loadedFromCache && (
          <Chip
            icon={<WarningIcon />}
            color="warning"
            label="Using last upload"
          />
        )}
      </Stack>
      <StudentTable />
    </Stack>
  );
};

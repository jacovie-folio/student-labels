import WarningIcon from '@mui/icons-material/Warning';
import { Chip, Stack, TextField } from '@mui/material';
import { useStudents } from '../../hooks/useStudents';
import CSVUploader from './CSVUploader';
import StudentTable from './StudentTable';

export const StudentDataManager = () => {
  const { loadedFromCache, onLoadStudents, gap, setGap } = useStudents();
  return (
    <Stack
      spacing={2}
      direction={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      sx={{ width: '100%' }}
    >
      <Stack spacing={2} direction={'row'} sx={{ width: '100%' }}>
        <CSVUploader onDataLoaded={onLoadStudents} />
        {loadedFromCache && (
          <Chip
            icon={<WarningIcon />}
            color="warning"
            label="Using last upload"
          />
        )}
        <Stack flexGrow={1} direction="row" justifyContent={'flex-end'}>
          <TextField
            label="Gap"
            type="number"
            value={gap}
            onChange={(e) => {
              const newGap = parseInt(e.target.value);
              if (!Number.isNaN(newGap)) {
                setGap(newGap);
              }
            }}
          />
        </Stack>
      </Stack>
      <StudentTable />
    </Stack>
  );
};

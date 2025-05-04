import {
  AppBar,
  createTheme,
  CssBaseline,
  Grid,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import './App.css';
import LabelPreview from './components/LabelPreview/LabelPreview';
import { StudentDataManager } from './components/StudentDataManager';
import { StudentsProvider } from './hooks/useStudents';

const theme = createTheme({ palette: { mode: 'dark' } });

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StudentsProvider>
        <CssBaseline />
        <Stack
          direction="column"
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          spacing={1}
          sx={{ width: '100vw', height: '100vh', p: 4 }}
        >
          <AppBar>
            <Toolbar>
              <Typography flexGrow={1} variant="h4">
                Student Label Generator
              </Typography>
              <Typography variant="subtitle1">by Jacovie Rodriguez</Typography>
            </Toolbar>
          </AppBar>
          <Grid
            container
            spacing={4}
            flexGrow={1}
            sx={{ width: '100vw', pt: '5vh' }}
          >
            <Grid size={6}>
              <StudentDataManager />
            </Grid>
            <Grid size={6}>
              <LabelPreview />
            </Grid>
          </Grid>
        </Stack>
      </StudentsProvider>
    </ThemeProvider>
  );
};

export default App;

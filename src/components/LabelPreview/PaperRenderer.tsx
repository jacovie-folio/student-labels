import { Box, createTheme, Paper, ThemeProvider } from '@mui/material';
import React from 'react';

const theme = createTheme();

export const PaperRenderer: React.FC<{
  ref: React.Ref<HTMLDivElement> | undefined;
  aspectRatio: [number, number];
  children: React.ReactNode;
}> = ({ ref, aspectRatio, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: '80vh',
            maxWidth: `calc(80vh * (${aspectRatio[0]} / ${aspectRatio[1]}))`,
            aspectRatio: `${aspectRatio[0]} / ${aspectRatio[1]}`,
          }}
        >
          <div ref={ref}>{children}</div>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

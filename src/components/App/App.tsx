import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, CssBaseline } from '@mui/material';

import { useState } from 'react';

import Search from '../inputs/Search';
import theme from '../../theme';
import WorkersList from '../workers/Workers';
import type { SortOrder } from '../../entities/Workers';

export default function App() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('name');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header>
          <Typography variant="h5">Search</Typography>
          <Box className="search-container">
            <Search sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </Box>
        </header>
        <main>
          <WorkersList sortOrder={sortOrder} />
        </main>
      </div>
    </ThemeProvider>
  );
}

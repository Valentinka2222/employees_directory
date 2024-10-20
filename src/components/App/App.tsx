import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, CssBaseline } from '@mui/material';

import { useState } from 'react';

import Search from '../inputs/Search';
import theme from '../../theme';
import WorkersList from '../workers/Workers';
import type { SortOrder } from '../../entities/Workers';

export default function App() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header>
          <Typography variant="h5">Search</Typography>
          <Box className="search-container">
            <Search
              setSearchTerm={setSearchTerm}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              searchTerm={searchTerm}
            />
          </Box>
        </header>
        <main>
          <WorkersList
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

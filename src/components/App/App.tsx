import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Box, Typography, CssBaseline } from '@mui/material';

import { useState } from 'react';
import Search from '../inputs/Search';
import theme from '../../theme';
import WorkersList from '../workers/Workers';
import type { SortOrder } from '../../entities/Workers';

import '../../index.css';
import './App.scss';
export default function App() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <header>
            <Typography className="hide" variant="h5">
              Search
            </Typography>

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
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

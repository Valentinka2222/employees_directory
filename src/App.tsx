import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Box, Typography, CssBaseline } from '@mui/material';

import Search from './features/filters/components/inputs/Search';
import theme from './theme';
import WorkersList from './features/Employees_list/workers/Workers';
import WorkerDetails from './features/Employees_details/details/WorkerDetails';
import type { SortOrder } from './entities/Workers';

import './index.scss';
import './App.scss';

export default function App() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const location = useLocation();

  const shouldDisplayHeader = location.pathname === '/';

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />

        <div className="App">
          {shouldDisplayHeader && (
            <header style={{ padding: '16px 16px 0 16px' }}>
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
          )}
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <WorkersList
                    sortOrder={sortOrder}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                }
              />
              <Route path="/workers/:id" element={<WorkerDetails />} />
            </Routes>
          </main>
        </div>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

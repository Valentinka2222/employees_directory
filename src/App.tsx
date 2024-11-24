import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Box, Typography, CssBaseline } from '@mui/material';

import Search from './features/filters/components/inputs/Search';
import theme from './theme';
import EmployeesList from './features/Employees_list/EmployeesList';
import Page404 from './features/errors/Page404';
import EmployeesDetails from './features/Employees_details/details/EmployeesDetails';
import type { SortOrder } from './entities/Employees';

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
          )}
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <EmployeesList
                    sortOrder={sortOrder}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                }
              />
              <Route path="/workers/:id" element={<EmployeesDetails />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

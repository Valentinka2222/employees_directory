import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Box, Typography, CssBaseline } from '@mui/material';

import Search from './features/filters/components/search/index';
import theme from './theme';
import EmployeesList from './features/Employees_list';
import Page404 from './features/errors/components/Page404';
import EmployeesDetails from './features/Employees_list/components/Employees_details/index';

import './index.scss';

const App = () => {
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
                <Search />
              </Box>
            </header>
          )}
          <main>
            <Routes>
              <Route path="/" element={<EmployeesList />} />
              <Route path="/workers/:id" element={<EmployeesDetails />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;

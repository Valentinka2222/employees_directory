import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, CssBaseline } from '@mui/material';

import Search from '../inputs/Search';
import theme from '../../theme';
import WorkersList from '../workers/Workers';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header>
          <Typography variant="h5">Search</Typography>
          <Box className="search-container">
            <Search />
          </Box>
        </header>
        <main>
          <WorkersList />
        </main>
      </div>
    </ThemeProvider>
  );
}

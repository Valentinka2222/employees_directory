import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import Search from '../inputs/Search';
import theme from '../../theme';
import WorkersList from '../workers/Workers';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <Typography sx={{ height: '28px', margin: 'auto 24px', fontWeight: '700' }} variant="h5">
            Search
          </Typography>
          <Box
            sx={{
              display: 'flex',
              height: '40px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
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

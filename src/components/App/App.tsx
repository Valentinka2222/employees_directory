import { ThemeProvider } from '@mui/material/styles';
import Search from '../inputs/Search';
import TabPanel from '../tab/TabPanel';
import theme from '../../theme';
import { Box, Typography } from '@mui/material';

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
          <TabPanel />
        </main>
      </div>
    </ThemeProvider>
  );
}

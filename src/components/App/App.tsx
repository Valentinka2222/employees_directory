import { ThemeProvider } from '@mui/material/styles';
import Search from '../inputs/Search';
import TabPanel from '../tab/TabPanel';
import theme from '../../theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <Search />
        </header>
        <main>
         <TabPanel/>
        </main>
      </div>
    </ThemeProvider>
  );
}

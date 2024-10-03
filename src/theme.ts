// theme.ts
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: purple[500], 
    },
    text: {
      primary: 'black',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif', 
  },
});
export default theme;

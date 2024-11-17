import { createTheme, Theme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

// Create a custom theme with desired overrides
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: purple[500],
    },
    text: {
      primary: 'rgba(5, 5, 16, 1)',
      secondary: '#bdbdbd',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h5: {
      fontWeight: 700,
      height: '28px',
      margin: 'auto 24px',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            height: '40px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            '& input': {
              height: '24px',
              padding: '0',
              '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 1,
              },
            },
            '& fieldset': {
              borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.mode === 'light' ? '#B2BAC2' : '#6F7E8C',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputAdornment-root': {
            height: '24px',
          },
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          margin: 'auto 24px',
        },
        subtitle1: {
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '20px',
          textAlign: 'left',
          color: 'text.primary',
        },
        body2: {
          fontFamily: 'Inter',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          textAlign: 'left',
          color: 'text.secondary',
          display: 'inline',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: 'text.secondary',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
        sizeSmall: {
          padding: '4px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          width: '100%',
          overflow: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',

          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.pxToRem(15),
          marginRight: theme.spacing(1),
          color: theme.palette.text.secondary,
          height: '36px',

          '&.Mui-selected': {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          height: '72px',
          width: '72px',
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '&.worker-stack': {
            height: '80px',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgba(101, 52, 255, 1)',
          textDecoration: 'none',
        },
      },
    },
  },
});

theme.components = {
  ...theme.components,
  MuiCssBaseline: {
    styleOverrides: {
      '.search-container': {
        display: 'flex',
        height: '52px',
        justifyContent: 'center',
        padding: '6px 0',
        alignItems: 'center',
        width: '100%',
      },

      '@media (max-width: 375px)': {
        '.search-container': {
          height: '40px',
          padding: '4px 0',
        },
      },
    },
  },
};

export default theme as Theme;

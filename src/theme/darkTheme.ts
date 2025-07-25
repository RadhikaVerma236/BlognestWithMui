// src/theme/darkTheme.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#14B8A6', // Teal-500
    },
    background: {
      default: '#0F172A', // Slate-900
      paper: '#1E293B',   // Slate-800
    },
    text: {
      primary: '#D1FAE5', // Light Mint
    },
  },
});

export default darkTheme;

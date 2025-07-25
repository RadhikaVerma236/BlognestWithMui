// src/theme/lightTheme.ts
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2DD4BF', // Teal-400
    },
    background: {
      default: '#ECFDF5', // Green-50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#134E4A', // Deep Teal
    },
  },
});

export default lightTheme;

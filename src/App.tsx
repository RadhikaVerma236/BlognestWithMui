import {useMemo, useState} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme, ColorModeContext } from './theme';
import AppRoutes from './routes/Routes';


function App() {
  const [mode, setMode]= useState<'light' | 'dark'>('light');

  const toggleColorMode=()=>{
    setMode(prev=>(prev === 'light' ? 'dark' : 'light'));
  };

  const theme=useMemo(()=>(mode ==='light' ? lightTheme : darkTheme), [mode]);
  
return (
    <ColorModeContext.Provider value={{toggleColorMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppRoutes/>
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App

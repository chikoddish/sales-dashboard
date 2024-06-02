import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0C6470',
    },
    secondary: {
      main: '#DDDDDD',
    },
    background:{
      default: '#D1D1D1',
      sidebar:'#4A4A4A'
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#262D47',
    },
    background: {
      default: '#000',
      paper: '#1e1e1e',
      sidebar:'#000'
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
  },
});


const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // const theme = useMemo(() => createTheme({
  //   palette: {
  //     mode,
  //   },
  // }), [mode]);

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

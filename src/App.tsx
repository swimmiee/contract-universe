import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from 'styles/theme';
import { Router } from './routes';
import GlobalStyle from 'styles/global-style';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

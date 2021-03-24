import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { LocalizationProvider } from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import moment from 'moment';

import { SnackbarProvider } from 'src/providers/snackbar';

import routes from './routes';
import { theme } from './theme';
import history from './utils/history';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <HelmetProvider>
              <Router history={history}>{renderRoutes(routes)}</Router>
            </HelmetProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;

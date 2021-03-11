import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';

import routes from './routes';
import { theme } from './theme';
import history from './utils/history';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

import { createContext } from 'react';

import { SnackbarContextType } from './types';

export const defaultValue: SnackbarContextType = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Called showMessage. Did you forgot to provide a provider?');
  }
};

const SnackbarContext = createContext<SnackbarContextType>(defaultValue);

SnackbarContext.displayName = 'SnackbarContext';

export default SnackbarContext;

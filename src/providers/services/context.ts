import { createContext } from 'react';

import { ServicesContextType } from './types';

export const defaultValue: ServicesContextType = {
  services: [],
  addService: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Called addService. Did you forget to provide a provider?');
    }
  },
  deleteService: (id: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Called deleteService. Did you forget to provide a provider?');
    }
  },
  isLoading: false,
};

const ServicesContext = createContext<ServicesContextType>(defaultValue);
ServicesContext.displayName = 'ServicesContext';

export default ServicesContext;

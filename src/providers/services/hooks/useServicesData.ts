import { useContext } from 'react';

import ServicesContext from '../context';
import { ServicesContextType } from '../types';

/**
 * Hook for convenient way to get Service's context provider props
 */
export default function useServicesData(): ServicesContextType {
  return useContext(ServicesContext);
}

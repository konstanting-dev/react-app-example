import { useContext } from 'react';

import VehiclesContext from '../context';
import { VehiclesContextType } from '../types';

/**
 * Hook for convenient way to get Vehicle's context provider props
 */
export default function useClaim(): VehiclesContextType {
  return useContext(VehiclesContext);
}

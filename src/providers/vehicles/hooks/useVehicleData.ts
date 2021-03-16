import { useContext } from 'react';

import VehiclesContext from '../context';
import { VehiclesContextType } from '../types';

export default function useClaim(): VehiclesContextType {
  return useContext(VehiclesContext);
}

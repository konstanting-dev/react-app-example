import { useContext } from 'react';

import ServicesContext from '../context';
import { ServicesContextType } from '../types';

export default function useServicesData(): ServicesContextType {
  return useContext(ServicesContext);
}

import { useContext } from 'react';

import MembersContext from '../context';
import { MembersContextType } from '../types';

/**
 * Hook for convenient way to get Member's context provider props
 */
export default function useMembersData(): MembersContextType {
  return useContext(MembersContext);
}

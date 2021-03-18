import { useContext } from 'react';

import MembersContext from '../context';
import { MembersContextType } from '../types';

export default function useMembersData(): MembersContextType {
  return useContext(MembersContext);
}

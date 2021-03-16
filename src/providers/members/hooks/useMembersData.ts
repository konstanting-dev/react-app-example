import { useContext } from 'react';

import MembersContext from '../context';
import { MembersContextType } from '../types';

export default function useClaim(): MembersContextType {
  return useContext(MembersContext);
}

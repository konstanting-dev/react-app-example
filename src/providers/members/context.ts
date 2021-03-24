import { createContext } from 'react';

import { MembersContextType } from './types';

export const defaultValue: MembersContextType = {
  members: [],
  addMember: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Called addMember. Did you forget to provide a provider?');
    }
  },
  deleteMember: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Called deleteMember. Did you forget to provide a provider?');
    }
  },
  isLoading: false,
};

const MembersContext = createContext<MembersContextType>(defaultValue);
MembersContext.displayName = 'MembersContext';

export default MembersContext;

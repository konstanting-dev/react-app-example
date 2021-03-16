import { createContext } from 'react';

import { Member, MembersContextType } from './types';

export const defaultValue: MembersContextType = {
  members: [],
  addMember: (newMember: Member) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Called addMember. Did you forget to provide a provider?');
    }
  },
  deleteMember: (id: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Called deleteMember. Did you forget to provide a provider?');
    }
  },
  isLoading: false,
};

const MembersContext = createContext<MembersContextType>(defaultValue);
MembersContext.displayName = 'MembersContext';

export default MembersContext;

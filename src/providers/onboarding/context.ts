import { createContext } from 'react';

import { Member, OnboardingContextType } from './types';

export const defaultValue: OnboardingContextType = {
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

const OnboardingContext = createContext<OnboardingContextType>(defaultValue);
OnboardingContext.displayName = 'OnboardingContext';

export default OnboardingContext;

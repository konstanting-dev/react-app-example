import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getMembers } from 'src/api/members';

import OnboardingContext from './context';
import { Member, OnboardingData } from './types';

export function OnboardingProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoading, data } = useQuery('members', getMembers);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    members: [],
  });

  useEffect(() => {
    setOnboardingData((prev) => ({
      ...prev,
      members: data || [],
    }));
  }, [data]);

  const handleAddMember = useCallback((newMember: Member) => {
    setOnboardingData((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
  }, []);

  const handleDeleteMember = useCallback(async (id: string) => {
    setOnboardingData((prev) => {
      return {
        ...prev,
        members: prev.members.filter((m) => m.id !== id),
      };
    });
  }, []);

  const defaultContext = {
    members: onboardingData.members,
    addMember: handleAddMember,
    deleteMember: handleDeleteMember,
    isLoading,
  };

  return <OnboardingContext.Provider value={defaultContext}>{children}</OnboardingContext.Provider>;
}

export default OnboardingProvider;

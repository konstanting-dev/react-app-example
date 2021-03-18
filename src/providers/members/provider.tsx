import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getMembers } from 'src/api/members';

import MembersContext from './context';
import { Member, MembersData } from './types';

/**
 * Context provider for members state and set state action methods
 * @param children
 * @constructor
 */
export function MembersProvider({ children }: PropsWithChildren<unknown>) {
  // using useQuery hook to manage loading and error state for GET request
  // and also it gives a caching functionality
  const { isLoading, data } = useQuery('members', getMembers);
  const [membersData, setMembersData] = useState<MembersData>({
    members: [],
  });

  useEffect(() => {
    setMembersData((prev) => ({
      ...prev,
      members: data || [],
    }));
  }, [data]);

  const handleAddMember = useCallback((newMember: Member) => {
    setMembersData((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
  }, []);

  const handleDeleteMember = useCallback(async (id: string) => {
    setMembersData((prev) => {
      return {
        ...prev,
        members: prev.members.filter((m) => m.id !== id),
      };
    });
  }, []);

  const defaultContext = {
    members: membersData.members,
    addMember: handleAddMember,
    deleteMember: handleDeleteMember,
    isLoading,
  };

  return <MembersContext.Provider value={defaultContext}>{children}</MembersContext.Provider>;
}

export default MembersProvider;

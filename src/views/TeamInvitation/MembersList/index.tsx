import React, { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Column } from 'react-table';

import { addMemberRequest, getMembers } from 'src/api/members';
import Chips from 'src/components/Chips';
import { Member } from 'src/providers/members/types';
import usePopup from 'src/utils/hooks/usePopup';
import AddMemberModal from 'src/views/TeamInvitation/AddMemberForm';
import { AddMemberFormData } from 'src/views/TeamInvitation/AddMemberForm/types';

import MembersListView from './View';

function MembersTableContainer() {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery('members', getMembers);
  const { handleClose, handleOpen, open } = usePopup();
  const { isLoading: addMemberLoading, mutateAsync } = useMutation('addMember', addMemberRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData<Member[]>(['members'], (prevMembers) => [...(prevMembers || []), data]);
    },
  });

  const columns: Column<Member>[] = useMemo(
    () => [
      {
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'email',
        accessor: 'email',
      },
      {
        Header: 'role',
        accessor: 'roles',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }) => {
          return <Chips values={value} />;
        },
      },
    ],
    [],
  );

  const handleSubmit = useCallback(
    async (data: AddMemberFormData) => {
      const newMember = {
        ...data,
      };
      await mutateAsync(newMember);
      handleClose();
    },
    [handleClose, mutateAsync],
  );

  return (
    <>
      <MembersListView data={data || []} columns={columns} handleAddMemberClick={handleOpen} loading={isLoading} />
      <AddMemberModal open={open} onClose={handleClose} onSubmit={handleSubmit} loading={addMemberLoading} />
    </>
  );
}

export default MembersTableContainer;

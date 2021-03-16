import React, { useCallback, useMemo } from 'react';
import { Column } from 'react-table';

import { addMemberRequest } from 'src/api/members';
import { useMembersData } from 'src/providers/members';
import { Member } from 'src/providers/members/types';
import usePopup from 'src/utils/hooks/usePopup';
import AddMemberModal from 'src/views/TeamInvitation/AddMemberForm';
import { AddMemberFormData } from 'src/views/TeamInvitation/AddMemberForm/types';

import MembersListView from './View';

function MembersTableContainer() {
  const { handleClose, handleOpen, open } = usePopup();
  const { members, addMember, isLoading } = useMembersData();

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
        accessor: 'role',
      },
      {
        accessor: 'id',
      },
    ],
    [],
  );

  const handleSubmit = useCallback(
    async (data: AddMemberFormData) => {
      const newMember = {
        ...data,
      };
      const response = await addMemberRequest(newMember);
      addMember({
        ...newMember,
        id: response.id,
      });
    },
    [addMember],
  );

  return (
    <>
      <MembersListView data={members} columns={columns} handleAddMemberClick={handleOpen} loading={isLoading} />
      <AddMemberModal open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );
}

export default MembersTableContainer;

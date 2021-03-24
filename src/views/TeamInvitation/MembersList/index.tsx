import React, { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Column } from 'react-table';

import { Chip } from '@material-ui/core';

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
  const { isLoading: addMemberLoading, mutateAsync } = useMutation('addMember', addMemberRequest);

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
          return (
            <>
              {value?.map((role) => (
                <Chip key={role} label={role} />
              ))}
            </>
          );
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
      addMember({
        ...newMember,
      });
      handleClose();
    },
    [addMember, handleClose, mutateAsync],
  );

  return (
    <>
      <MembersListView data={members} columns={columns} handleAddMemberClick={handleOpen} loading={isLoading} />
      <AddMemberModal open={open} onClose={handleClose} onSubmit={handleSubmit} loading={addMemberLoading} />
    </>
  );
}

export default MembersTableContainer;

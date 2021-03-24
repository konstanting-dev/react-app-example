import React, { memo, useCallback } from 'react';
import { useMutation } from 'react-query';

import { IconButton, TableCell, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { deleteMemberRequest } from 'src/api/members';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import usePopup from 'src/utils/hooks/usePopup';

interface AccountsListActionsProps {
  className?: string;
  id: string;
  onDelete: (id: string) => void;
}

function Actions({ onDelete, id, className }: AccountsListActionsProps) {
  const { handleOpen, handleClose, open } = usePopup();
  const { isLoading: deleteMemberLoading, mutateAsync } = useMutation('deleteMember', deleteMemberRequest);

  const handleDelete = useCallback(async () => {
    await mutateAsync(id);
    onDelete(id);
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      handleOpen();
    },
    [handleOpen],
  );

  return (
    <TableCell>
      <Tooltip title="Delete">
        <IconButton className={className} aria-label="delete-account" size="small" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        title="Confirm Delete"
        open={open}
        onClose={handleClose}
        onAccept={handleDelete}
        loading={deleteMemberLoading}
      >
        Are you sure you want to delete this member?
      </ConfirmationDialog>
    </TableCell>
  );
}

export default memo(Actions);

import React, { memo, useCallback } from 'react';
import { useMutation } from 'react-query';

import { IconButton, TableCell, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { deleteVehicleRequest } from 'src/api/vehicles';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import usePopup from 'src/utils/hooks/usePopup';

interface AccountsListActionsProps {
  className?: string;
  id: string;
  onDelete: (id: string) => void;
}

function Actions({ id, className, onDelete }: AccountsListActionsProps) {
  const { handleOpen, handleClose, open } = usePopup();
  const { isLoading: deleteVehicleLoading, mutateAsync } = useMutation('deleteVehicle', deleteVehicleRequest);

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
        loading={deleteVehicleLoading}
      >
        Are you sure you want to delete this vehicle?
      </ConfirmationDialog>
    </TableCell>
  );
}

export default memo(Actions);

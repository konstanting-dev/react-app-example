import React, { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { IconButton, TableCell, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { deleteServiceRequest } from 'src/api/services';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import { Service } from 'src/providers/services/types';
import usePopup from 'src/utils/hooks/usePopup';

interface AccountsListActionsProps {
  className?: string;
  id: string;
  onDelete: (id: string) => void;
}

function Actions({ onDelete, id, className }: AccountsListActionsProps) {
  const queryClient = useQueryClient();
  const { handleOpen, handleClose, open } = usePopup();
  const { isLoading: deleteServiceLoading, mutateAsync } = useMutation('deleteService', deleteServiceRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData<Service[]>(
        'services',
        (prevServices) => prevServices?.filter((service) => service.packageId !== data.packageId) || [],
      );
    },
  });

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
        loading={deleteServiceLoading}
      >
        Are you sure you want to delete this service?
      </ConfirmationDialog>
    </TableCell>
  );
}

export default memo(Actions);

import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import LoadingButton from 'src/components/LoadingButton';

interface AlertDialogProps extends DialogProps {
  title: string;
  onClose: () => void;
  onAccept?: (...args: never[]) => void;
  actions?: React.ReactNode;
  loading?: boolean;
}

export default function AlertDialog({
  open,
  children,
  onClose,
  onAccept,
  title,
  actions,
  loading,
  ...rest
}: AlertDialogProps) {
  const handleCancel = useCallback(
    (event) => {
      event.stopPropagation();
      onClose();
    },
    [onClose],
  );

  const handleAccept = useCallback(
    (event) => {
      event.stopPropagation();
      if (onAccept) {
        onAccept();
      }
    },
    [onAccept],
  );

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      onClick={(event) => {
        event.stopPropagation();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
      </DialogContent>
      {actions || (
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton pending={loading} onClick={handleAccept} color="primary">
            Ok
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
}

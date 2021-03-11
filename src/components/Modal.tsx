import React from 'react';

import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  CardProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: (theme as any).shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
  container: {
    marginTop: (theme as any).spacing(3),
    height: 200,
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

interface BaseModalProps extends CardProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

function BaseModal({ open, onClose, className, children, ...rest }: BaseModalProps) {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Simple Modal" />
        <Divider />
        <CardContent>
          {children}
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={onClose}>Dismiss</Button>
          <Button color="primary" onClick={onClose} variant="contained">
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default BaseModal;

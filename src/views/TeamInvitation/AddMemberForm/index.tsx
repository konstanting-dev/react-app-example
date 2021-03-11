import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Modal, Card, CardHeader, CardContent, CardActions, Divider, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as yup from 'yup';

import { useYupValidationResolver } from 'src/utils/hooks/useYupResolver';
import { AddMemberFormData } from 'src/views/TeamInvitation/AddMemberForm/types';

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
  submitButton: {
    marginTop: (theme as any).spacing(2),
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    marginTop: 0,
    marginBottom: 0,
  },
}));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddMemberFormData) => void;
  className?: string;
}

const AddMemberFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  role: yup.string().required(),
});

const memberRoles = ['fleet manager', 'operations manager', 'driver', 'administrator', 'sales'];

const defaultValues = {
  name: '',
  email: '',
  role: 'role1',
};

function AddMemberModal({ open, onClose, className, onSubmit, ...rest }: BaseModalProps) {
  const classes = useStyles();
  const resolver = useYupValidationResolver(AddMemberFormSchema);
  const { handleSubmit, control, errors } = useForm<AddMemberFormData>({
    defaultValues,
    resolver,
  });

  const handleClick = useCallback(
    (data: AddMemberFormData) => {
      onSubmit(data);
      onClose();
    },
    [onClose, onSubmit],
  );

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Add member" />
        <Divider />
        <CardContent>
          <Controller
            as={TextField}
            name="name"
            label="Name"
            margin="normal"
            variant="outlined"
            fullWidth
            control={control}
            error={Boolean(errors?.name)}
            helperText={errors?.name?.message}
          />
          <Controller
            as={TextField}
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            variant="outlined"
            control={control}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
          />
          <div className={classes.fieldGroup}>
            <Controller
              as={TextField}
              control={control}
              className={classes.field}
              fullWidth
              label="Role"
              margin="dense"
              name="role"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              {memberRoles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Controller>
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={onClose}>Dismiss</Button>
          <Button color="primary" onClick={handleSubmit(handleClick)} variant="contained">
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default AddMemberModal;

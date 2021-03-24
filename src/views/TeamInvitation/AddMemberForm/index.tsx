import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
  FormControl,
  capitalize,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as yup from 'yup';

import LoadingButton from 'src/components/LoadingButton';
import { MemberRole } from 'src/providers/members/types';
import { useYupValidationResolver } from 'src/utils/hooks/useYupResolver';
import { AddMemberFormData } from 'src/views/TeamInvitation/AddMemberForm/types';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
  container: {
    marginTop: theme.spacing(3),
    height: 200,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    marginTop: 0,
    marginBottom: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 400,
  },
  okButton: {
    width: 120,
  },
}));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddMemberFormData) => void;
  className?: string;
  loading: boolean;
}

const AddMemberFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  roles: yup.array().required(),
});

const memberRoles = Object.values(MemberRole).map((value) => ({
  value,
  label: capitalize(value.toString().toLowerCase().replace('_', ' ')),
}));

const defaultValues = {
  name: '',
  email: '',
  roles: [MemberRole.ADMIN],
};

function AddMemberModal({ open, onClose, className, onSubmit, loading, ...rest }: BaseModalProps) {
  const classes = useStyles();
  const resolver = useYupValidationResolver(AddMemberFormSchema);
  const { handleSubmit, control, errors, watch } = useForm<AddMemberFormData>({
    defaultValues,
    resolver,
  });

  const watchRoles = watch('roles');

  const handleClick = useCallback(
    (data: AddMemberFormData) => {
      onSubmit(data);
    },
    [onSubmit],
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
          <FormControl className={classes.formControl}>
            <InputLabel id="roles-label">Roles</InputLabel>
            <Controller
              control={control}
              as={
                <Select>
                  {memberRoles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Checkbox checked={watchRoles?.indexOf(role.value) > -1} />
                      <ListItemText primary={role.label} />
                    </MenuItem>
                  ))}
                </Select>
              }
              name="roles"
              labelId="roles-label"
              id="roles"
              multiple
              renderValue={(selected: MemberRole[]) => selected.join(', ')}
              error={Boolean(errors?.roles)}
              input={<Input />}
            />
            {errors?.roles && (
              <FormHelperText>{errors?.roles?.map((field) => field?.message)?.join(', ')}</FormHelperText>
            )}
          </FormControl>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton pending={loading} color="primary" onClick={handleSubmit(handleClick)} variant="contained">
            Add
          </LoadingButton>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default AddMemberModal;

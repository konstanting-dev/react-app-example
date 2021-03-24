import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as yup from 'yup';

import LoadingButton from 'src/components/LoadingButton';
import { Service } from 'src/providers/services/types';
import { useYupValidationResolver } from 'src/utils/hooks/useYupResolver';

import { AddServiceFormData } from './types';
import ValidityPeriods from './ValidityPeriods';

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
  dateRangeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  },
  periodDelim: {
    margin: '0 10px',
  },
  removePeriodButton: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  addPeriod: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 400,
  },
}));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Service) => void;
  className?: string;
  loading: boolean;
}

const AddVehicleFormSchema = yup.object().shape({
  packageId: yup.number().required(),
  packageName: yup.string().required(),
  description: yup.string().required(),
  pricePerMinute: yup.number().required(),
  pricePerKm: yup.number().required(),
  termsConditions: yup.string().required(),
});

const defaultValues: AddServiceFormData = {
  packageId: '',
  packageName: '',
  description: '',
  pricePerMinute: 0,
  pricePerKm: 0,
  termsConditions: '',
  validityPeriods: [],
  requiredUserClaims: [],
  requiredBusinessClaims: [],
};

const userClaims = ['minAge18', 'minAge21', 'minAge25', 'driverLicense'];
const businessClaims = ['company'];

function AddVehicleModal({ open, onClose, className, onSubmit, loading, ...rest }: BaseModalProps) {
  const classes = useStyles();
  const resolver = useYupValidationResolver(AddVehicleFormSchema);
  const { handleSubmit, control, errors, watch } = useForm<AddServiceFormData>({
    defaultValues,
    resolver,
  });

  const watchUserClaims = watch('requiredUserClaims');
  const watchBusinessClaims = watch('requiredBusinessClaims');

  const handleClick = useCallback(
    (data: AddServiceFormData) => {
      const { validityPeriods, ...rest } = data;
      const newService = {
        ...rest,
        validityPeriods: validityPeriods
          ?.filter((p) => p.to && p.from)
          ?.map((p) => ({ to: p.to?.unix() || 0, from: p.from?.unix() || 0 })),
      };
      onSubmit(newService);
    },
    [onSubmit],
  );

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open} disableEnforceFocus>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Add service" />
        <Divider />
        <CardContent>
          <Controller
            as={TextField}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="packageId"
            label="Package ID"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.packageId)}
            helperText={errors?.packageId?.message}
          />
          <Controller
            as={TextField}
            name="packageName"
            label="Package Name"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.packageName)}
            helperText={errors?.packageName?.message}
          />
          <Controller
            as={TextField}
            name="description"
            label="Description"
            margin="normal"
            size="small"
            fullWidth
            variant="outlined"
            control={control}
            error={Boolean(errors?.description)}
            helperText={errors?.description?.message}
          />
          <Controller
            as={TextField}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="pricePerMinute"
            label="Price per minute"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.pricePerMinute)}
            helperText={errors?.pricePerMinute?.message}
          />
          <Controller
            as={TextField}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="pricePerKm"
            label="Price per kilometer"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.pricePerKm)}
            helperText={errors?.pricePerKm?.message}
          />
          <Controller
            as={TextField}
            name="termsConditions"
            label="Terms conditions"
            size="small"
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            placeholder="Paste HTML or a page link"
            fullWidth
            control={control}
            error={Boolean(errors?.termsConditions)}
            helperText={errors?.termsConditions?.message}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="requiredUserClaims-label">User claims</InputLabel>
            <Controller
              control={control}
              as={
                <Select>
                  {userClaims.map((claim) => (
                    <MenuItem key={claim} value={claim}>
                      <Checkbox checked={watchUserClaims?.indexOf(claim) > -1} />
                      <ListItemText primary={claim} />
                    </MenuItem>
                  ))}
                </Select>
              }
              name="requiredUserClaims"
              labelId="requiredUserClaims-label"
              id="requiredUserClaims"
              multiple
              renderValue={(selected: string[]) => selected.join(', ')}
              input={<Input />}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="requiredBusinessClaims-label">Business claims</InputLabel>
            <Controller
              control={control}
              as={
                <Select>
                  {businessClaims.map((claim) => (
                    <MenuItem key={claim} value={claim}>
                      <Checkbox checked={watchBusinessClaims?.indexOf(claim) > -1} />
                      <ListItemText primary={claim} />
                    </MenuItem>
                  ))}
                </Select>
              }
              name="requiredBusinessClaims"
              labelId="requiredBusinessClaims-label"
              id="requiredBusinessClaims"
              multiple
              renderValue={(selected: string[]) => selected.join(', ')}
              input={<Input />}
            />
          </FormControl>
          <ValidityPeriods control={control} />
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

export default AddVehicleModal;

import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Card, CardActions, CardContent, CardHeader, Divider, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as yup from 'yup';

import LoadingButton from 'src/components/LoadingButton';
import { FuelType, Transmission, Vehicle } from 'src/providers/vehicles/types';
import { useYupValidationResolver } from 'src/utils/hooks/useYupResolver';

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
}));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Vehicle) => void;
  className?: string;
  loading: boolean;
}

const AddVehicleFormSchema = yup.object().shape({
  vin: yup.string().required(),
  brand: yup.string().required(),
  model: yup.string().required(),
  color: yup.string().required(),
  fuelType: yup.string().required(),
  numberOfDoors: yup.number().required(),
  numberOfSeats: yup.number().required(),
  transmission: yup.string().required(),
  licensePlate: yup.string().required(),
});

const fuelOptions = Object.values(FuelType).map((value) => (
  <option key={value} value={value}>
    {value}
  </option>
));

const transmissionOptions = Object.values(Transmission).map((value) => (
  <option key={value} value={value}>
    {value}
  </option>
));

const defaultValues: Vehicle = {
  vin: '',
  brand: '',
  model: '',
  color: '',
  numberOfDoors: 0,
  numberOfSeats: 0,
  fuelType: FuelType.DIESEL,
  transmission: Transmission.AUTOMATIC,
  licensePlate: '',
};

function AddVehicleModal({ open, onClose, className, onSubmit, loading, ...rest }: BaseModalProps) {
  const classes = useStyles();
  const resolver = useYupValidationResolver(AddVehicleFormSchema);
  const { handleSubmit, control, errors } = useForm<Vehicle>({
    defaultValues,
    resolver,
  });

  const handleClick = useCallback(
    (data: Vehicle) => {
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
        <CardHeader title="Add vehicle" />
        <Divider />
        <CardContent>
          <Controller
            as={TextField}
            name="vin"
            label="VIN"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.vin)}
            helperText={errors?.['vin']?.message}
          />
          <Controller
            as={TextField}
            name="brand"
            label="Brand"
            margin="normal"
            size="small"
            fullWidth
            variant="outlined"
            control={control}
            error={Boolean(errors?.brand)}
            helperText={errors?.brand?.message}
          />
          <Controller
            as={TextField}
            name="model"
            label="Model"
            margin="normal"
            size="small"
            fullWidth
            variant="outlined"
            control={control}
            error={Boolean(errors?.model)}
            helperText={errors?.model?.message}
          />
          <Controller
            as={TextField}
            name="color"
            label="Color"
            margin="normal"
            size="small"
            fullWidth
            variant="outlined"
            control={control}
            error={Boolean(errors?.color)}
            helperText={errors?.color?.message}
          />
          <div className={classes.fieldGroup}>
            <Controller
              as={TextField}
              control={control}
              className={classes.field}
              fullWidth
              label="Fuel Type"
              margin="dense"
              name="fuelType"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              {fuelOptions}
            </Controller>
          </div>
          <Controller
            as={TextField}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="numberOfDoors"
            label="Number of doors"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.numberOfDoors)}
            helperText={errors?.numberOfDoors?.message}
          />
          <Controller
            as={TextField}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="numberOfSeats"
            label="Number of seats"
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            control={control}
            error={Boolean(errors?.numberOfSeats)}
            helperText={errors?.numberOfSeats?.message}
          />
          <div className={classes.fieldGroup}>
            <Controller
              as={TextField}
              control={control}
              className={classes.field}
              fullWidth
              label="Transmission"
              margin="dense"
              name="transmission"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              {transmissionOptions}
            </Controller>
          </div>
          <Controller
            as={TextField}
            name="licensePlate"
            label="License Plate"
            size="small"
            margin="normal"
            variant="outlined"
            fullWidth
            control={control}
            error={Boolean(errors?.licensePlate)}
            helperText={errors?.licensePlate?.message}
          />
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

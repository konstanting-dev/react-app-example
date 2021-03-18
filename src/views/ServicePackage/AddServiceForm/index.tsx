import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Card, CardActions, CardContent, CardHeader, Divider, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as yup from 'yup';

import { NewService } from 'src/providers/services/types';
import { useYupValidationResolver } from 'src/utils/hooks/useYupResolver';
import Claims from 'src/views/ServicePackage/AddServiceForm/Claims';
import { AddServiceFormData } from 'src/views/ServicePackage/AddServiceForm/types';
import ValidityPeriods from 'src/views/ServicePackage/AddServiceForm/ValidityPeriods';

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
}));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewService) => void;
  className?: string;
}

const AddVehicleFormSchema = yup.object().shape({
  packageName: yup.string().required(),
  description: yup.string().required(),
  pricePerMinute: yup.number().required(),
  pricePerKm: yup.number().required(),
  termsConditions: yup.string().required(),
});

const defaultValues: AddServiceFormData = {
  packageName: '',
  description: '',
  pricePerMinute: 0,
  pricePerKm: 0,
  termsConditions: '',
  validityPeriods: [],
  requiredUserClaims: [],
  requiredBusinessClaims: [],
};

function AddVehicleModal({ open, onClose, className, onSubmit, ...rest }: BaseModalProps) {
  const classes = useStyles();
  const resolver = useYupValidationResolver(AddVehicleFormSchema);
  const { handleSubmit, control, errors } = useForm<AddServiceFormData>({
    defaultValues,
    resolver,
  });

  const handleClick = useCallback(
    (data: AddServiceFormData) => {
      const { validityPeriods, requiredBusinessClaims, requiredUserClaims, ...rest } = data;
      const newService = {
        ...rest,
        validityPeriods: validityPeriods
          .filter((p) => p.to && p.from)
          .map((p) => ({ to: p.to?.unix() || 0, from: p.from?.unix() || 0 })),
        requiredUserClaims: requiredUserClaims.map((item) => item.claim),
        requiredBusinessClaims: requiredBusinessClaims.map((item) => item.claim),
      };
      onSubmit(newService);
      onClose();
    },
    [onClose, onSubmit],
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
          <ValidityPeriods control={control} />
          <Claims control={control} name="requiredUserClaims" heading="Required User Claims" />
          <Claims control={control} name="requiredBusinessClaims" heading="Required Business Claims" />
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

export default AddVehicleModal;

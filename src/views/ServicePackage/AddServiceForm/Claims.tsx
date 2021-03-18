import React from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';

import { Button, TextField, Typography } from '@material-ui/core';
import { Add, RemoveCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { AddServiceFormData } from 'src/views/ServicePackage/AddServiceForm/types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  },
  removeButton: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface ClaimsProps {
  control: Control<AddServiceFormData>;
  name: string;
  heading: string;
}

function Claims({ control, name, heading }: ClaimsProps) {
  const classes = useStyles();
  const { fields: claimsFields, append: appendClaim, remove: removeClaim } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="p" gutterBottom>{heading}</Typography>
      {claimsFields.map((item, index) => (
        <div className={classes.container} key={index}>
          <Controller
            as={TextField}
            name={`${name}[${index}].claim`}
            size="small"
            margin="normal"
            variant="outlined"
            fullWidth
            control={control}
            defaultValue=""
          />
          <RemoveCircle className={classes.removeButton} color="primary" onClick={() => removeClaim(index)} />
        </div>
      ))}
      <div className={classes.addButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => appendClaim({ claim: '' })}
          size="small"
          endIcon={<Add />}
        >
          Add claim
        </Button>
      </div>
    </div>
  );
}

export default Claims;

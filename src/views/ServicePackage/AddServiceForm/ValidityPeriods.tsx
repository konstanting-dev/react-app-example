import React from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';

import { Button, TextField, Typography } from '@material-ui/core';
import { Add, RemoveCircle } from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';

import { AddServiceFormData } from 'src/views/ServicePackage/AddServiceForm/types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0',
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
    display: 'flex',
    alignItems: 'center',
  },
}));

interface ValidityPeriodsProps {
  control: Control<AddServiceFormData>;
}

function ValidityPeriods({ control }: ValidityPeriodsProps) {
  const classes = useStyles();
  const { fields: validityPeriodFields, append: appendValidityPeriod, remove: removeValidityPeriod } = useFieldArray({
    control,
    name: 'validityPeriods',
  });

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="p" gutterBottom>
        Validity periods
      </Typography>
      {validityPeriodFields.map((item, index) => (
        <div className={classes.dateRangeContainer} key={index}>
          <Controller
            render={(props) => (
              <DatePicker
                label="To"
                value={props.value}
                onChange={props.onChange}
                renderInput={(props) => <TextField {...props} />}
              />
            )}
            name={`validityPeriods[${index}].to`}
            control={control}
            defaultValue={null}
          />
          <div className={classes.periodDelim}>{` - `}</div>
          <Controller
            render={(props) => (
              <DatePicker
                label="From"
                value={props.value}
                onChange={props.onChange}
                renderInput={(props) => <TextField {...props} />}
              />
            )}
            name={`validityPeriods[${index}].from`}
            control={control}
            defaultValue={null}
          />
          <RemoveCircle
            className={classes.removePeriodButton}
            color="primary"
            onClick={() => removeValidityPeriod(index)}
          />
        </div>
      ))}
      <div className={classes.addPeriod}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => appendValidityPeriod({ to: null, from: null })}
          size="small"
          endIcon={<Add />}
        >
          Add period
        </Button>
      </div>
    </div>
  );
}

export default ValidityPeriods;

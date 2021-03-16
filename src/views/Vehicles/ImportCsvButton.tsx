import React, { ChangeEvent, useCallback, useState } from 'react';

import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Vehicle } from 'src/providers/vehicles/types';
import { parse } from 'src/utils/csvParser';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  label: {
    paddingLeft: 20,
  },
}));

interface ImportCsvInputProps {
  className?: string;
  onParse: (data: Vehicle[]) => void;
}

function ImportCsvButton({ className, onParse }: ImportCsvInputProps) {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        setSelectedFile(file);
        parse<Vehicle>(file, onParse);
      }
    },
    [onParse],
  );

  return (
    <span className={clsx(className, classes.root)}>
      <Button variant="contained" color="primary" component="label">
        Import from file
        <input onChange={handleFileChange} type="file" hidden />
      </Button>
      <Typography className={classes.label} variant="subtitle1">
        {selectedFile?.name}
      </Typography>
    </span>
  );
}

export default ImportCsvButton;

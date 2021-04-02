import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { addVehiclesBulkRequest } from 'src/api/vehicles';
import LoadingButton from 'src/components/LoadingButton';
import { Vehicle } from 'src/providers/vehicles/types';
import { parse } from 'src/utils/csvParser';

const useStyles = makeStyles(() => ({
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
}

function ImportCsvButton({ className }: ImportCsvInputProps) {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isLoading: addVehicleImportLoading, mutateAsync } = useMutation('addVehicleImport', addVehiclesBulkRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData<Vehicle[]>(['vehicles'], (prevVehicles) => [...(prevVehicles || []), ...data]);
    },
  });

  const handleParse = useCallback(
    async (data: Vehicle[]) => {
      if (data.length) {
        await mutateAsync(data);
      }
    },
    [mutateAsync],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        setSelectedFile(file);
        parse<Vehicle>(file, handleParse);
      }
    },
    [handleParse],
  );

  return (
    <span className={clsx(className, classes.root)}>
      <LoadingButton
        pending={addVehicleImportLoading}
        onClick={() => inputFile.current?.click()}
        variant="contained"
        color="primary"
      >
        Import from file
        <input ref={inputFile} onChange={handleFileChange} type="file" hidden />
      </LoadingButton>
      <Typography className={classes.label} variant="subtitle1">
        {selectedFile?.name}
      </Typography>
    </span>
  );
}

export default ImportCsvButton;

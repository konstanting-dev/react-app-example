import React, { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Column } from 'react-table';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { addVehicleRequest } from 'src/api/vehicles';
import { useVehiclesData } from 'src/providers/vehicles';
import { Vehicle } from 'src/providers/vehicles/types';
import usePopup from 'src/utils/hooks/usePopup';
import ImportCsvButton from 'src/views/Vehicles/ImportCsvButton';

import AddVehicleForm from '../AddVehicleForm';

import VehiclesListView from './View';

const useStyles = makeStyles(() => ({
  actionBar: {
    margin: '0 -10px 20px',
  },
  addButton: {
    margin: '0 10px',
  },
}));

function VehiclesTableContainer() {
  const classes = useStyles();
  const { handleClose, handleOpen, open } = usePopup();
  const { vehicles, addVehicle, isLoading } = useVehiclesData();
  const { isLoading: addVehicleLoading, mutateAsync } = useMutation('addVehicle', addVehicleRequest);

  const columns: Column<Vehicle>[] = useMemo(
    () => [
      {
        Header: 'VIN',
        accessor: 'vin',
      },
      {
        Header: 'Brand',
        accessor: 'brand',
      },
      {
        Header: 'model',
        accessor: 'model',
      },
      {
        accessor: 'color',
        Header: 'color',
      },
      {
        accessor: 'fuelType',
        Header: 'Fuel Type',
      },
      {
        accessor: 'numberOfDoors',
        Header: 'Number of doors',
      },
      {
        accessor: 'numberOfSeats',
        Header: 'Number of seats',
      },
      {
        accessor: 'transmission',
        Header: 'Transmission',
      },
      {
        accessor: 'licensePlate',
        Header: 'License plate',
      },
    ],
    [],
  );

  const handleSubmit = useCallback(
    async (data: Vehicle) => {
      await mutateAsync(data);
      addVehicle(data);
      handleClose();
    },
    [addVehicle, handleClose, mutateAsync],
  );

  return (
    <>
      <div className={classes.actionBar}>
        <Button className={classes.addButton} variant="contained" color="primary" onClick={handleOpen}>
          Add vehicle
        </Button>
        <ImportCsvButton className={classes.addButton} />
      </div>
      <VehiclesListView data={vehicles} columns={columns} loading={isLoading} />
      <AddVehicleForm open={open} onClose={handleClose} onSubmit={handleSubmit} loading={addVehicleLoading} />
    </>
  );
}

export default VehiclesTableContainer;

import React, { useCallback, useMemo } from 'react';
import { Column } from 'react-table';

import { addVehicleRequest, addVehiclesBulkRequest } from 'src/api/vehicles';
import { useVehiclesData } from 'src/providers/vehicles';
import { Vehicle } from 'src/providers/vehicles/types';
import usePopup from 'src/utils/hooks/usePopup';

import AddVehicleForm from '../AddVehicleForm';

import VehiclesListView from './View';

function VehiclesTableContainer() {
  const { handleClose, handleOpen, open } = usePopup();
  const { vehicles, addVehicle, isLoading } = useVehiclesData();

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
      await addVehicleRequest(data);
      addVehicle(data);
    },
    [addVehicle],
  );

  const handleParse = useCallback(
    async (data: Vehicle[]) => {
      await addVehiclesBulkRequest(data);
      addVehicle(data);
    },
    [addVehicle],
  );

  return (
    <>
      <VehiclesListView
        data={vehicles}
        columns={columns}
        handleAddVehicleClick={handleOpen}
        handleVehiclesParsing={handleParse}
        loading={isLoading}
      />
      <AddVehicleForm open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );
}

export default VehiclesTableContainer;

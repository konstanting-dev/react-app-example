import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getVehicles } from 'src/api/vehicles';

import VehiclesContext from './context';
import { Vehicle, VehiclesData } from './types';

export function VehiclesProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoading, data } = useQuery('vehicles', getVehicles);
  const [vehiclesData, setVehiclesData] = useState<VehiclesData>({
    vehicles: [],
  });

  useEffect(() => {
    setVehiclesData((prev) => ({
      ...prev,
      vehicles: data || [],
    }));
  }, [data]);

  const handleAddVehicle = useCallback((newVehicle: Vehicle) => {
    setVehiclesData((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, newVehicle],
    }));
  }, []);

  const handleAddVehicles = useCallback((newVehicles: Vehicle[]) => {
    setVehiclesData((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, ...newVehicles],
    }));
  }, []);

  const handleDeleteVehicle = useCallback(async (vin: string) => {
    setVehiclesData((prev) => {
      return {
        ...prev,
        vehicles: prev.vehicles.filter((m) => m.vin !== vin),
      };
    });
  }, []);

  const defaultContext = {
    vehicles: vehiclesData.vehicles,
    addVehicle: handleAddVehicle,
    addVehicles: handleAddVehicles,
    deleteVehicle: handleDeleteVehicle,
    isLoading,
  };

  return <VehiclesContext.Provider value={defaultContext}>{children}</VehiclesContext.Provider>;
}

export default VehiclesProvider;

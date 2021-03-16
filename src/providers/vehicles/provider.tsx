import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getMembers } from 'src/api/members';

import OnboardingContext from './context';
import { Vehicle, VehiclesData } from './types';

export function VehiclesProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoading, data } = useQuery('members', getMembers);
  const [vehiclesData, setVehiclesData] = useState<VehiclesData>({
    vehicles: [],
  });

  useEffect(() => {
    setVehiclesData((prev) => ({
      ...prev,
      members: data || [],
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

  return <OnboardingContext.Provider value={defaultContext}>{children}</OnboardingContext.Provider>;
}

export default VehiclesProvider;
